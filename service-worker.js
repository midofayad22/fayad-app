/*
  FAYAD service worker

  Strategy (deliberately conservative):
  - Same-origin GET requests only. Cross-origin requests (Supabase, CDNs, fonts,
    analytics) and anything under /_vercel/ are never intercepted or cached.
  - Network-first: users always get the newest deployment when online, so a stale
    cache can never break a fresh release. The cache is only an offline fallback.
  - Only successful, non-partial, same-origin responses are stored.
  - Navigations that fail with no cached copy fall back to /offline.html.
  - Bump CACHE_VERSION on any change to this strategy; old caches are deleted.
*/

const CACHE_VERSION = "v2";
const CACHE_NAME = `fayad-static-${CACHE_VERSION}`;
const OFFLINE_URL = "/offline.html";
const PRECACHE = [OFFLINE_URL, "/icons/icon-192.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE)));
  // No automatic skipWaiting: a new worker activates when old tabs close, or when
  // the page asks for it via the SKIP_WAITING message (see js/sw-register.js).
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names.filter((name) => name.startsWith("fayad-") && name !== CACHE_NAME).map((name) => caches.delete(name)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

function isCacheable(request, response) {
  return (
    response &&
    response.ok &&
    response.status === 200 &&
    response.type === "basic" &&
    !request.headers.has("range") &&
    !request.headers.has("authorization")
  );
}

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/_vercel/")) return;
  if (request.headers.has("range") || request.headers.has("authorization")) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (isCacheable(request, response)) {
          const copy = response.clone();
          event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        if (request.mode === "navigate") {
          const offline = await caches.match(OFFLINE_URL);
          if (offline) return offline;
        }
        return Response.error();
      }),
  );
});
