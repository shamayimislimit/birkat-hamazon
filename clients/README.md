# Client Birkat Hamazon

Each folder `clients/<slug>/` is one client, served at `https://shamayimislimit.com/birkat-hamazon/<slug>/`.
The root `/birkat-hamazon/` stays the base app (Yehouda ben Rephael).

- `client.json`: what differs from `src/config.json`. `dedication` is required. `saying` is optional (`null` = no closing seal), using the same shape as the base. `app` / `settings` are merged key by key. `photoGravity` (center, north…) decides how the photo is cropped for the icons and the preview.
- `photo.jpg|png|webp`: the header portrait, also used for the favicons, home-screen icons and WhatsApp preview.

```bash
cp -r clients/_template clients/<slug>   # edit client.json, add photo.jpg
node scripts/build-client.mjs <slug>      # or --all after a liturgy fix in the base
scripts/deploy-client.sh <slug>
```
Nothing to change on the server per client (a generic nginx location serves `/opt/app/html/birkat-hamazon-sub/<slug>/`).
