// Offline service worker for 3 Fall Fun.
// Caches the core shell and fingerprinted /assets/* immutably while keeping /api/* and /admin* network-only.
const CACHE = "tff-%%SW_VERSION%%";
const PRECACHE = %%SW_PRECACHE%%;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("tff-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const p = url.pathname;
  if (p === "/sw.js" || p.startsWith("/api/") || p === "/admin" || p.startsWith("/admin.") || p.startsWith("/poster")) return;

  if (req.mode === "navigate") {
    const isDaily = p === "/daily" || p === "/daily.html";
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok && (p === "/" || p === "/index.html" || isDaily)) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(isDaily ? "/daily" : "/", copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => caches.match(isDaily ? "/daily" : "/").then((r) => r || caches.match("/").then((h) => h || new Response("Offline", { status: 503, statusText: "Offline" }))))
    );
    return;
  }

  if (p.startsWith("/assets/") || p.startsWith("/icons/") || p.startsWith("/vendor/") || p === "/manifest.webmanifest" || p === "/daily.webmanifest") {
    event.respondWith(
      caches.match(req).then((hit) => {
        if (hit) return hit;
        return fetch(req).then((res) => {
          if (res.ok && res.type === "basic") {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        });
      })
    );
  }
});
