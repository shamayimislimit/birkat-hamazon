// Client apps hosted under /birkat-hamazon/<slug>/ that an older version of this worker wrongly answered
// with this app's index.html ("Page not found"): once this version is active, reload them from the network.
// The reload is fired after activation, never awaited inside it (a navigation waits for activation: deadlock).
const CLIENT_APPS = /^\/birkat-hamazon\/[^/.]+(\/|$)/;
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
  setTimeout(() => {
    self.clients.matchAll({ type: 'window' }).then((windows) => windows
      .filter((w) => CLIENT_APPS.test(new URL(w.url).pathname))
      .forEach((w) => w.navigate(w.url).catch(() => {})));
  }, 500);
});
