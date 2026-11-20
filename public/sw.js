const CACHE = "tff-857bac54ab71";
const PRECACHE = ["/","/manifest.webmanifest","/icons/favicon-32.png","/icons/icon-192.png","/icons/icon-512.png","/icons/icon-maskable-512.png","/icons/apple-touch-icon.png","/assets/style.28c45f757d.css","/assets/matter-0.19.0.min.d9be33d851.js","/assets/prelude.552885b01c.js","/assets/game.722aee1c17.js","/assets/intro.5224ec34fd.js","/assets/cast.1b7cde7a64.webp","/assets/ig-qr.2820d8257a.webp","/assets/gluten.5b0fb221b0.woff2","/assets/lxgw-wenkai-tc-bold.f007afccdf.woff2","/assets/lxgw-wenkai-tc-regular.e468588c35.woff2","/assets/noto-sans-hk.ef21e72e0e.woff2","/assets/source-sans-punct-400.f1e8c6c73b.woff2","/assets/source-sans-punct-700.54c4ee4dfe.woff2","/assets/source-sans-punct-900.622c4a765b.woff2"];
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
event.respondWith(
fetch(req)
.then((res) => {
if (res.ok && (p === "/" || p === "/index.html")) {
const copy = res.clone();
caches.open(CACHE).then((c) => c.put("/", copy)).catch(() => {});
}
return res;
})
.catch(() => caches.match("/").then((r) => r || new Response("Offline", { status: 503, statusText: "Offline" })))
);
return;
}
if (p.startsWith("/assets/") || p.startsWith("/icons/") || p.startsWith("/vendor/") || p === "/manifest.webmanifest") {
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
