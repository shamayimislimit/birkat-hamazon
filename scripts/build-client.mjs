#!/usr/bin/env node
// Build one client Birkat Hamazon for https://shamayimislimit.com/birkat-hamazon/<slug>/
//   node scripts/build-client.mjs <slug>      -> dist-clients/<slug>/
//   node scripts/build-client.mjs --all       -> every folder in clients/ (except _template)
// A client folder holds client.json (what differs from the base config) and one photo (photo.jpg|png|webp).
// The photo becomes the header portrait, the favicons, the home-screen icons and the link preview (og.jpg).
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function build(slug) {
  if (!SLUG.test(slug)) throw new Error(`Invalid slug "${slug}" (lowercase letters, digits and dashes only)`);
  const src = path.join(ROOT, 'clients', slug);
  const client = JSON.parse(fs.readFileSync(path.join(src, 'client.json'), 'utf8'));
  if (!client.dedication?.hebrew) throw new Error(`${slug}: client.json needs dedication.hebrew/french/english`);
  const photo = fs.readdirSync(src).find((f) => /^photo\.(jpe?g|png|webp)$/i.test(f));
  if (!photo) throw new Error(`${slug}: missing photo.jpg|png|webp`);

  // Top-level keys from the client replace the base ones; the dedication and the saying are never inherited
  const base = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/config.json'), 'utf8'));
  const { photoGravity = 'center', ...overrides } = client;
  const config = { ...base, saying: null, ...overrides };
  config.app = { ...base.app, ...(overrides.app || {}) };
  config.settings = { ...base.settings, ...(overrides.settings || {}) };

  const out = path.join(ROOT, '.client-build', slug);
  fs.rmSync(out, { recursive: true, force: true });
  fs.mkdirSync(path.join(out, 'public'), { recursive: true });
  fs.writeFileSync(path.join(out, 'config.json'), JSON.stringify(config, null, 2));

  // Public folder: the base one without the root app's own files, plus icons cut from the client photo
  for (const f of ['robots.txt', 'placeholder.svg']) fs.copyFileSync(path.join(ROOT, 'public', f), path.join(out, 'public', f));
  const p = path.join(src, photo);
  const im = (...args) => execFileSync('convert', args);
  const square = (size, file) => im(p, '-auto-orient', '-resize', `${size}x${size}^`, '-gravity', photoGravity, '-extent', `${size}x${size}`, path.join(out, 'public', file));
  square(512, 'app-icon.png');
  square(192, 'app-icon-192.png');
  square(180, 'apple-touch-icon.png');
  square(32, 'favicon-32.png');
  square(16, 'favicon-16.png');
  im(p, '-auto-orient', '-resize', '48x48^', '-gravity', photoGravity, '-extent', '48x48', '-define', 'icon:auto-resize=48,32,16', path.join(out, 'public', 'favicon.ico'));
  // Link preview: the whole photo (never cropped) on a soft blurred copy of itself
  im('(', p, '-auto-orient', '-resize', '1200x630^', '-gravity', 'center', '-extent', '1200x630', '-blur', '0x24', '-modulate', '92,85', ')',
    '(', p, '-auto-orient', '-resize', '1140x590', ')', '-gravity', 'center', '-composite', '-quality', '85', path.join(out, 'public', 'og.jpg'));
  im(p, '-auto-orient', '-resize', '800x800>', path.join(out, 'photo.png'));

  execFileSync('npx', ['vite', 'build', '--emptyOutDir'], { cwd: ROOT, stdio: 'inherit', env: { ...process.env, BH_CLIENT: slug } });
  console.log(`\n✓ ${slug} -> dist-clients/${slug}/  (https://shamayimislimit.com/birkat-hamazon/${slug}/)`);
}

const arg = process.argv[2];
if (!arg) { console.error('Usage: node scripts/build-client.mjs <slug> | --all'); process.exit(1); }
const slugs = arg === '--all'
  ? fs.readdirSync(path.join(ROOT, 'clients')).filter((d) => !d.startsWith('_') && fs.statSync(path.join(ROOT, 'clients', d)).isDirectory())
  : [arg];
slugs.forEach(build);
