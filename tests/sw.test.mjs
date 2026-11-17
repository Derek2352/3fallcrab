// Tests for offline PWA service worker (public/sw.js) and CSP headers (public/_headers).
import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");

test("CSP permits self-hosted service worker and sw.js has valid no-cache headers and precache list", () => {
  const headers = readFileSync(join(pub, "_headers"), "utf8");
  assert.match(headers, /worker-src 'self'/);
  assert.match(headers, /\/sw\.js\r?\n\s+Cache-Control: no-cache/);

  const swPath = join(pub, "sw.js");
  assert.ok(existsSync(swPath), "public/sw.js was not built");
  const swCode = readFileSync(swPath, "utf8");
  assert.equal(swCode.includes("%%"), false, "unreplaced placeholder in public/sw.js");
  assert.doesNotThrow(() => new vm.Script(swCode, { filename: "public/sw.js" }));

  const m = swCode.match(/PRECACHE\s*=\s*(\[[^\]]+\])/);
  assert.ok(m, "PRECACHE array missing in sw.js");
  const list = JSON.parse(m[1]);
  assert.ok(list.includes("/") && list.includes("/manifest.webmanifest"));
  for (const rel of list) {
    const target = rel === "/" ? join(pub, "index.html") : join(pub, rel);
    assert.ok(existsSync(target), "PRECACHE entry missing in public/: " + rel);
    assert.equal(rel.includes("admin") || rel.startsWith("/api/"), false, "should not precache " + rel);
  }
});

test("service worker caches assets immutably, skips /api and /admin, and falls back to / for offline /c challenges", async () => {
  const swCode = readFileSync(join(pub, "sw.js"), "utf8");
  const listeners = new Map();
  const store = new Map([["tff-old", new Map()]]);
  const wait = [];
  let skipped = false, claimed = false;

  const openCache = async (name) => {
    if (!store.has(name)) store.set(name, new Map());
    const bag = store.get(name);
    return {
      addAll: async (urls) => { for (const u of urls) bag.set(u, new Response("cached:" + u, { status: 200 })); },
      put: async (req, res) => bag.set(typeof req === "string" ? req : new URL(req.url).pathname, res),
    };
  };
  const caches = {
    open: openCache,
    keys: async () => [...store.keys()],
    delete: async (k) => store.delete(k),
    match: async (req) => {
      const k = typeof req === "string" ? req : new URL(req.url).pathname;
      for (const bag of store.values()) if (bag.has(k)) return bag.get(k);
      return undefined;
    },
  };
  let fetchedUrls = [];
  let offline = false;
  const selfObj = {
    location: { origin: "https://game.test" },
    addEventListener: (ev, fn) => listeners.set(ev, fn),
    skipWaiting: async () => { skipped = true; },
    clients: { claim: async () => { claimed = true; } },
  };
  vm.runInNewContext(swCode, {
    self: selfObj, caches, URL, Request, Response, Promise,
    fetch: async (req) => {
      const u = typeof req === "string" ? req : req.url;
      fetchedUrls.push(u);
      if (offline) throw new Error("offline");
      return new Response("net:" + u, { status: 200 });
    },
  });

  listeners.get("install")({ waitUntil: (p) => wait.push(p) });
  await Promise.all(wait.splice(0));
  assert.ok(skipped, "install should skipWaiting");

  listeners.get("activate")({ waitUntil: (p) => wait.push(p) });
  await Promise.all(wait.splice(0));
  assert.ok(claimed, "activate should claim clients");
  assert.equal(store.has("tff-old"), false, "old cache was not evicted");

  const dispatch = (url, mode = "cors") => {
    let resp = null;
    listeners.get("fetch")({
      request: { url, method: "GET", mode },
      respondWith: (p) => { resp = p; },
    });
    return resp;
  };

  assert.equal(dispatch("https://game.test/api/scores"), null, "/api should bypass SW");
  assert.equal(dispatch("https://game.test/admin.html"), null, "/admin.html should bypass SW");
  const hit = await dispatch("https://game.test/manifest.webmanifest");
  assert.equal(await hit.text(), "cached:/manifest.webmanifest");

  offline = true;
  const chalOffline = await dispatch("https://game.test/c?s=5000&n=Derek", "navigate");
  assert.equal(await chalOffline.text(), "cached:/");
});
