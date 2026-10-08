import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';
import baseConfig from './src/config.json';

// Client builds (scripts/build-client.mjs): BH_CLIENT=<slug> builds the same app for /birkat-hamazon/<slug>/
// from .client-build/<slug>/ (merged config, photo, generated icons). Without it, the root app is built as before.
const CLIENT = process.env.BH_CLIENT;
const CLIENT_DIR = CLIENT ? path.resolve(__dirname, '.client-build', CLIENT) : null;
const config = CLIENT ? JSON.parse(fs.readFileSync(path.join(CLIENT_DIR, 'config.json'), 'utf8')) : baseConfig;
const BASE = CLIENT ? `/birkat-hamazon/${CLIENT}/` : '/birkat-hamazon/';
const SITE = 'https://shamayimislimit.com';

// Client pages get their own title, description, link preview and icons in the static index.html
// (WhatsApp/iOS read the HTML as served, not what the app renders later)
const clientHtml = () => ({
  name: 'client-html',
  // 'pre': runs on the source HTML, before Vite prefixes the bundled assets with the base
  transformIndexHtml: { order: 'pre' as const, handler(html: string) {
    const title = `${config.app.title.hebrew} - ${config.dedication.hebrew}`;
    const description = `${config.app.title.hebrew} ${config.dedication.hebrew}`;
    const image = `${SITE}${BASE}og.jpg`;
    const esc = (v: string) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
    return html
      .replaceAll('/birkat-hamazon/', BASE)
      .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
      .replace(/(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*"/g, `$1${esc(description)}"`)
      .replace(/(<meta (?:property|name)="(?:og:title|twitter:title)" content=")[^"]*"/g, `$1${esc(title)}"`)
      .replace(/(<meta (?:property|name)="(?:og:image|twitter:image)" content=")[^"]*"/g, `$1${image}"`)
      .replace('<meta property="og:type" content="website" />', `<meta property="og:type" content="website" />\n    <meta property="og:url" content="${SITE}${BASE}" />`);
  } },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: BASE,
  publicDir: CLIENT ? path.join(CLIENT_DIR, 'public') : 'public',
  build: { outDir: CLIENT ? `dist-clients/${CLIENT}` : 'dist' },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    CLIENT && clientHtml(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'favicon-16.png', 'favicon-32.png', 'apple-touch-icon.png', 'app-icon-192.png', 'app-icon.png', ...(CLIENT ? [] : ['yehuda.png'])],
      manifest: {
        name: `${config.app.title.hebrew} - ${config.dedication.hebrew}`,
        short_name: 'ברכת המזון',
        description: `${config.app.title.english} - ${config.dedication.english}`,
        theme_color: '#1f2937',
        background_color: '#fafaf9',
        display: 'standalone',
        orientation: 'portrait',
        ...(CLIENT ? { id: BASE } : {}),
        start_url: BASE,
        scope: BASE,
        icons: [
          {
            src: `${BASE}app-icon-192.png`,
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: `${BASE}app-icon.png`,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: `${BASE}apple-touch-icon.png`,
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webmanifest}'],
        navigateFallback: `${BASE}index.html`,
        // Root app: client apps live under /birkat-hamazon/<slug>/ and must reach the network, not this app's index.html
        // (this app has a single route "/", so any extra path segment without a dot is a client)
        navigateFallbackDenylist: CLIENT ? [/^\/api\//] : [/^\/api\//, /^\/birkat-hamazon\/[^/.]+(\/|$)/],
        ...(CLIENT ? {} : { importScripts: ['sw-subapps.js'] }),
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-css',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-files',
              expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          },
          {
            urlPattern: ({ sameOrigin, request }) => sameOrigin && request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'app-images',
              expiration: { maxEntries: 40, maxAgeSeconds: 60 * 60 * 24 * 90 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: [
      // A client build swaps the configuration and the dedication photo
      ...(CLIENT ? [
        { find: '@/config.json', replacement: path.join(CLIENT_DIR, 'config.json') },
        { find: '@/assets/yehuda.png', replacement: path.join(CLIENT_DIR, 'photo.png') },
      ] : []),
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
}));
