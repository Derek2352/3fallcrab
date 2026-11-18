// The deployable entry points and the transport rules in front of the API: HTTPS only, known methods only, and
// an admin surface that does not advertise itself.
import test from "node:test";
import assert from "node:assert/strict";
import { handle, resetCaches } from "../server/api.js";
import { makeDB } from "./fake-d1.mjs";
import { makeStore } from "./fake-d1-store.mjs";

const call = async (url, opts = {}, env = {}) =>
  handle(new Request(url, opts), { DB: makeDB(), ...env });

test("the Worker exposes a fetch handler", async () => {
  const w = await import("../server/worker.js");
  assert.ok(w.default, "no default export");
  assert.equal(typeof w.default.fetch, "function");
});

test("the Pages function exposes onRequest", async () => {
  const pf = await import("../functions/api/[[path]].js");
  assert.equal(typeof pf.onRequest, "function");
  const pc = await import("../functions/c.js");
  assert.equal(typeof pc.onRequest, "function");
});

test("plain http is redirected for reads", async () => {
  const r = await call("http://game.test/api/health", { headers: { "x-forwarded-proto": "http" } });
  assert.equal(r.status, 301);
  assert.ok((r.headers.get("location") || "").startsWith("https://"), "redirect must go to https");
});

test("plain http refuses writes outright", async () => {
  const r = await call("http://game.test/api/scores", { method: "POST", headers: { "x-forwarded-proto": "http" } });
  assert.equal(r.status, 403);
  assert.equal((await r.json()).error, "https_required");
});

test("an unsupported method is refused with the allowed list", async () => {
  const r = await call("https://game.test/api/scores", { method: "PUT" });
  assert.equal(r.status, 405);
  assert.equal((await r.json()).error, "method_not_allowed");
});

test("HEAD is served like GET", async () => {
  const r = await call("https://game.test/api/scores", { method: "HEAD" });
  assert.equal(r.status, 200);
});

test("the admin surface does not advertise itself without a token", async () => {
  const r = await call("https://game.test/api/admin/scores");
  assert.equal(r.status, 404);
  assert.equal((await r.json()).error, "admin_disabled");
});

test("admin with a configured token but no credentials is unauthorised, not open", async () => {
  const r = await call("https://game.test/api/admin/scores", {}, { ADMIN_TOKEN: "0123456789abcdef" });
  assert.equal(r.status, 401);
  assert.equal((await r.json()).error, "unauthorised");
});

test("JSON answers carry the security headers", async () => {
  const r = await call("https://game.test/api/health");
  assert.equal(r.headers.get("x-content-type-options"), "nosniff");
  assert.ok(r.headers.get("strict-transport-security"), "missing HSTS");
});

test("challenge route passes validated persona and silhouette into tff-chal meta and falls back to DB via g", async () => {
  const w = (await import("../server/worker.js")).default;
  const PrevRewriter = globalThis.HTMLRewriter;
  let appended = [];
  globalThis.HTMLRewriter = class {
    constructor() { this._handlers = []; }
    on(sel, h) { this._handlers.push({ sel, h }); return this; }
    transform(res) {
      appended = [];
      for (const { sel, h } of this._handlers) {
        if (sel === "head" && h.element) h.element({ append: (html) => appended.push(html) });
      }
      return res;
    }
  };
  try {
    const assets = { fetch: async () => new Response("<!doctype html><head><title>x</title></head>", { status: 200, headers: { "content-type": "text/html" } }) };
    await w.fetch(new Request("https://game.test/c?s=5000&n=Ming&v=zero&p=sub%2Bgrind&sil=0a1b2c3d"), { ASSETS: assets });
    const meta1 = appended.find((s) => s.includes('name="tff-chal"')) || "";
    const parsed1 = JSON.parse(/content="([^"]+)"/.exec(meta1)[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
    assert.deepEqual(parsed1, { s: 5000, n: "Ming", v: "zero", p: "sub+grind", sil: "0a1b2c3d" });

    const db = makeStore();
    await handle(new Request("https://game.test/api/scores", {
      method: "POST",
      body: JSON.stringify({ score: 5000, name: "Ming", board: true, stage: 0, height: 1.5, drops: 0, persona: "sub+grind", sil: "0a1b2c3d", choices: [{ card: "newphone", pick: "wise" }], items: 5 }),
      headers: { "content-type": "application/json" },
    }), { DB: db });
    await w.fetch(new Request("https://game.test/c?s=5000&n=Ming&v=zero&g=1"), { ASSETS: assets, DB: db });
    const meta2 = appended.find((s) => s.includes('name="tff-chal"')) || "";
    const parsed2 = JSON.parse(/content="([^"]+)"/.exec(meta2)[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
    assert.deepEqual(parsed2, { s: 5000, n: "Ming", v: "zero", p: "sub+grind", sil: "0a1b2c3d" });

    let seenHeaders = null;
    const condAssets = {
      fetch: async (req) => {
        seenHeaders = req.headers;
        if (req.headers.has("if-none-match") || req.headers.has("if-modified-since")) return new Response(null, { status: 304 });
        return new Response("<!doctype html><head><title>x</title></head>", { status: 200, headers: { "content-type": "text/html" } });
      },
    };
    const pc = await import("../functions/c.js");
    const r3 = await pc.onRequest({
      request: new Request("https://game.test/c/?s=8800&n=Amy&v=retire", { headers: { "if-none-match": '"etag1"', "if-modified-since": "Wed, 21 Oct 2015 07:28:00 GMT" } }),
      env: { ASSETS: condAssets },
    });
    assert.equal(r3.status, 200);
    assert.equal(seenHeaders.has("if-none-match"), false);
    assert.equal(seenHeaders.has("if-modified-since"), false);
    const meta3 = appended.find((s) => s.includes('name="tff-chal"')) || "";
    const parsed3 = JSON.parse(/content="([^"]+)"/.exec(meta3)[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
    assert.deepEqual(parsed3, { s: 8800, n: "Amy", v: "retire" });
  } finally {
    if (PrevRewriter === undefined) delete globalThis.HTMLRewriter;
    else globalThis.HTMLRewriter = PrevRewriter;
  }
});

test("service load balancer /api/queue admits within capacity, holds excess visitors in order, and promotes on leave", async () => {
  resetCaches();
  const db = makeStore();
  const env = { DB: db, QUEUE_CAPACITY: "1" };
  try {
    const r1 = await handle(new Request("https://game.test/api/queue?cid=c1"), env);
    assert.equal(r1.status, 200);
    assert.deepEqual((await r1.json()).onHold, false);

    const r2 = await handle(new Request("https://game.test/api/queue?cid=c2"), env);
    assert.equal(r2.status, 200);
    const j2 = await r2.json();
    assert.equal(j2.onHold, true);
    assert.equal(j2.position, 1);
    assert.ok(Number(r2.headers.get("retry-after")) >= 2);

    const r3 = await handle(new Request("https://game.test/api/queue?cid=c3"), env);
    const j3 = await r3.json();
    assert.equal(j3.onHold, true);
    assert.equal(j3.position, 2);

    const boardRes = await (await handle(new Request("https://game.test/api/scores"), env)).json();
    assert.equal(boardRes.onHold, true);

    const leave1 = await (await handle(new Request("https://game.test/api/queue?cid=c1&leave=1"), env)).json();
    assert.equal(leave1.onHold, false);

    const p2 = await (await handle(new Request("https://game.test/api/queue?cid=c2"), env)).json();
    assert.equal(p2.onHold, false);
    assert.equal(p2.position, 0);

    const p3 = await (await handle(new Request("https://game.test/api/queue?cid=c3"), env)).json();
    assert.equal(p3.onHold, true);
    assert.equal(p3.position, 1);
  } finally {
    resetCaches();
  }
});

test("service load balancer queues in-flight /api/scores load and returns 429 x-on-hold when saturated", async () => {
  resetCaches();
  let releaseDb, slow = false;
  const gate = new Promise((r) => { releaseDb = r; });
  const safety = setTimeout(() => releaseDb?.(), 2000);
  const fastDb = makeDB();
  const slowDb = {
    prepare: (sql) => {
      let stmt = fastDb.prepare(sql);
      const wrap = {
        sql,
        bind: (...args) => { stmt = stmt.bind(...args); return wrap; },
        first: (...args) => stmt.first(...args),
        all: async (...args) => {
          if (slow && /ORDER BY score DESC/.test(sql)) await gate;
          return stmt.all(...args);
        },
        run: (...args) => stmt.run(...args),
      };
      return wrap;
    },
    batch: async (stmts) => {
      if (slow && stmts.some((s) => /ORDER BY score DESC/.test(String(s?.sql || "")))) await gate;
      return fastDb.batch(stmts);
    },
  };
  const env = { DB: slowDb, MAX_CONCURRENT: "1", MAX_QUEUE: "0" };
  try {
    await handle(new Request("https://game.test/api/health"), env);
    slow = true;
    const firstReq = handle(new Request("https://game.test/api/scores?view=ghosts"), env);
    await new Promise((r) => setTimeout(r, 20));
    const overflowRes = await handle(new Request("https://game.test/api/scores"), env);
    assert.equal(overflowRes.status, 429);
    assert.equal(overflowRes.headers.get("x-on-hold"), "1");
    assert.equal((await overflowRes.json()).error, "rate_limited");
    releaseDb();
    assert.equal((await firstReq).status, 200);
    const recoveredRes = await handle(new Request("https://game.test/api/scores"), env);
    assert.equal(recoveredRes.status, 200);
  } finally {
    clearTimeout(safety);
    releaseDb?.();
    resetCaches();
  }
});
