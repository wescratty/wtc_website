/*
  Service worker for the MT Hunting Tag Tracker.

  Goal: once a hunter opens this page with a signal, it keeps working
  with NO connectivity at all afterward - reload, phone restart, tab
  closed and reopened, whatever. Only the app-shell files below are
  precached; every other request on the site passes straight through
  untouched, so this never affects the other calculator pages sharing
  this same /calculators/ scope.

  Bump CACHE_NAME (e.g. v2) whenever the page's data changes so
  returning visitors with a signal pick up the update instead of
  being stuck on a stale cached copy.
*/
const CACHE_NAME = "hunting-tags-v3";

const PRECACHE_PATHS = [
  "/calculators/hunting_tags.html",
  "/calculators/hunting-tags.webmanifest",
  "/css/style.css",
  "/assets/fonts/Rye-Regular.ttf",
  "/assets/logo/wtc-montana-logo-white.png",
  "/assets/logo/favicon-32.png",
  "/assets/logo/favicon-192.png",
  "/assets/logo/favicon-512.png",
  "/assets/hunting/district-map-region2-3.png",
  "/assets/hunting/icons/wtdBuck.png",
  "/assets/hunting/icons/wtdEither.png",
  "/assets/hunting/icons/wtdDoe.png",
  "/assets/hunting/icons/mdBuck.png",
  "/assets/hunting/icons/mdEither.png",
  "/assets/hunting/icons/mdDoe.png",
  "/assets/hunting/icons/elkBull.png",
  "/assets/hunting/icons/elkEither.png",
  "/assets/hunting/icons/elkCow.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_PATHS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(
        names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if(req.method !== "GET") return;

  const url = new URL(req.url);
  if(!PRECACHE_PATHS.includes(url.pathname)) return; // not ours - let it pass through normally

  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req).then((resp) => {
        if(resp && resp.ok){
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resp.clone()));
        }
        return resp;
      }).catch(() => cached);
      // Offline: serve the cached copy immediately. Online: keep the
      // cache fresh in the background for next time, but don't make
      // the hunter wait on a network round trip for a page they
      // already have.
      return cached || network;
    })
  );
});
