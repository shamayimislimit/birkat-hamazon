#!/usr/bin/env bash
# Deploy built client(s) to the Elestio host: /opt/app/html/birkat-hamazon-sub/<slug>/ (served at /birkat-hamazon/<slug>/).
#   scripts/deploy-client.sh <slug> [<slug> ...]
set -euo pipefail
KEY=${ELESTIO_KEY:-/opt/app/data/.ssh/id_ed25519_elestio}
HOST=root@hashamayim-hem-hagvul-u59474.vm.elestio.app
cd "$(dirname "$0")/.."
for slug in "$@"; do
  [ -f "dist-clients/$slug/index.html" ] || { echo "dist-clients/$slug missing: run node scripts/build-client.mjs $slug"; exit 1; }
  tar czf "/tmp/bh-$slug.tgz" -C "dist-clients/$slug" .
  scp -q -i "$KEY" -o StrictHostKeyChecking=no "/tmp/bh-$slug.tgz" "$HOST:/tmp/"
  ssh -i "$KEY" -o StrictHostKeyChecking=no "$HOST" "set -e; d=/opt/app/html/birkat-hamazon-sub/$slug; mkdir -p \$d;
    [ -z \"\$(ls -A \$d)\" ] || tar czf /opt/app/backups/birkat-hamazon-$slug-\$(date +%Y%m%d%H%M).tgz -C \$d .;
    find \$d -mindepth 1 -delete; tar xzf /tmp/bh-$slug.tgz -C \$d"
  rm "/tmp/bh-$slug.tgz"
  echo "✓ https://shamayimislimit.com/birkat-hamazon/$slug/"
done
