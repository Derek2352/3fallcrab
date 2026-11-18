import test from "node:test";
import assert from "node:assert/strict";
import { handle, NAME_DEFAULT, resetCaches } from "../server/api.js";
import worker from "../server/worker.js";
import { makeSqliteDB } from "./fake-d1-store.mjs";

const TOKEN = "0123456789abcdef";
const AUTH = { authorization: `Bearer ${TOKEN}` };
const HDR = { "content-type": "application/json", ...AUTH };

const BASE_HTML = '<!doctype html><html><head><title>3 Fall Fun</title><meta property="og:title" content="base"><meta property="og:description" content="desc"><meta property="og:url" content="https://game.test/"></head><body>ok</body></html>';

function installHtmlRewriterShim() {
  const Prev = globalThis.HTMLRewriter;
  const escText = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const escAttr = (s) => String(s).replace(/"/g, "&quot;");
  globalThis.HTMLRewriter = class {
    constructor() { this._handlers = []; }
    on(sel, h) { this._handlers.push({ sel, h }); return this; }
    async transform(res) {
      let html = await res.text();
      for (const { sel, h } of this._handlers) {
        if (!h || !h.element) continue;
        if (sel === "head") {
          const appended = [];
          h.element({ append: (frag) => appended.push(String(frag)) });
          if (appended.length) html = html.replace("</head>", () => appended.join("") + "</head>");
        } else if (sel === "title") {
          h.element({
            setInnerContent: (val, opts) => {
              const out = opts?.html ? String(val) : escText(val);
              html = html.replace(/<title>[\s\S]*?<\/title>/i, () => `<title>${out}</title>`);
            },
          });
        } else {
          const propMatch = /^meta\[property="([^"]+)"\]$/.exec(sel);
          if (propMatch) {
            const prop = propMatch[1];
            h.element({
              setAttribute: (attr, val) => {
                const escaped = escAttr(val);
                const re = new RegExp(`(<meta\\s+property="${prop}"\\s+${attr}=")([^"]*)(")`, "i");
                html = html.replace(re, (_, a, _old, b) => a + escaped + b);
              },
            });
          }
        }
      }
      return new Response(html, { status: res.status, headers: res.headers });
    }
  };
  return () => {
    if (Prev === undefined) delete globalThis.HTMLRewriter;
    else globalThis.HTMLRewriter = Prev;
  };
}

function assertNo500(res, label) {
  assert.notEqual(res.status, 500, `${label} returned 500`);
}

test("/c challenge route fuzzing: XSS, prototype keys, profanity, bidi, oversized inputs, SQLi, and hidden row isolation", async () => {
  const restore = installHtmlRewriterShim();
  const db = makeSqliteDB({ migrations: "0001+0002" });
  try {
    await handle(new Request("https://game.test/api/health"), { DB: db });
    // Seed row 1 hidden=1 and row 2 posted=0 so g=1 and g=2 must NEVER leak sil/persona
    db._raw.prepare("INSERT INTO scores (name, score, week, month, created_at, hidden, posted, sil, persona) VALUES ('Hidden', 9000, '2026-W46', '2026-11', '2026-11-10T00:00:00Z', 1, 1, '0a1b', 'sub+grind')").run();
    db._raw.prepare("INSERT INTO scores (name, score, week, month, created_at, hidden, posted, sil, persona) VALUES ('Unposted', 9000, '2026-W46', '2026-11', '2026-11-10T00:00:00Z', 0, 0, '0a1b', 'sub+grind')").run();

    const assets = {
      fetch: async () => new Response(BASE_HTML, { status: 200, headers: { "content-type": "text/html; charset=utf-8" } }),
    };

    const fuzzUrls = [
      "/c",
      "/c/",
      "/c?s=",
      "/c?s=abc",
      "/c?s=1e5",
      "/c?s=NaN",
      "/c?s=99999999",
      "/c?s=-99999999",
      "/c?s=0",
      "/c?s=-500",
      "/c?s=100&n=" + encodeURIComponent('<script>alert(1)</script>'),
      "/c?s=100&n=" + encodeURIComponent('"><img src=x onerror=alert(1)>'),
      "/c?s=100&n=" + encodeURIComponent("&copy;$&$$"),
      "/c?s=100&n=__proto__&v=__proto__&p=__proto__",
      "/c?s=100&n=constructor&v=toString&p=hasOwnProperty",
      "/c?s=100&n=f4ck&v=zero",
      "/c?s=100&n=dllm&v=zero",
      "/c?s=100&n=" + encodeURIComponent("Ming\u202Eevil\u0007"),
      "/c?s=100&n=" + encodeURIComponent("X".repeat(50000)),
      "/c?s=100&n=" + encodeURIComponent("a" + "\u0301".repeat(10000)),
      "/c?s=100&n=%E0%A4%A",
      "/c?s=100&sil=" + "0a1b".repeat(10000),
      "/c?s=100&sil=zzzz",
      "/c?s=100&sil=0201",
      "/c?s=100&sil=abc",
      "/c?s=100&g=" + encodeURIComponent("1 OR 1=1"),
      "/c?s=100&g=1",
      "/c?s=100&g=2",
    ];

    for (const path of fuzzUrls) {
      const t0 = performance.now();
      const res = await worker.fetch(new Request("https://game.test" + path), { ASSETS: assets, DB: db });
      const elapsed = performance.now() - t0;
      assertNo500(res, path);
      assert.equal(res.status, 200);
      assert.ok(elapsed < 500, `${path} took too long (${elapsed.toFixed(1)}ms)`);
      const html = await res.text();
      assert.equal(/<script>alert\(1\)/i.test(html), false, `unescaped script in ${path}`);
      assert.equal(/onerror=alert\(1\)/i.test(html), false, `unescaped attr breakout in ${path}`);
      const titleMatch = /<title>([\s\S]*?)<\/title>/i.exec(html);
      assert.ok(titleMatch, `missing <title> for ${path}`);
      assert.equal(titleMatch[1].includes("<"), false, `unescaped < in <title> for ${path}`);
      const metaMatch = /<meta name="tff-chal" content="([^"]*)">/i.exec(html);
      if (metaMatch) {
        const decoded = metaMatch[1].replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
        const chal = JSON.parse(decoded);
        if (chal.n) assert.ok([...chal.n].length <= 16, `name exceeded 16 chars: ${chal.n}`);
        if (path.endsWith("g=1") || path.endsWith("g=2")) {
          assert.equal(chal.sil, undefined, `${path} leaked hidden/unposted sil`);
          assert.equal(chal.p, undefined, `${path} leaked hidden/unposted persona`);
        }
      }
    }

    const headRes = await worker.fetch(new Request("https://game.test/c?s=100&n=Ming", { method: "HEAD" }), { ASSETS: assets, DB: db });
    assertNo500(headRes, "HEAD /c");
    assert.equal(headRes.status, 200);

    const postRes = await worker.fetch(new Request("https://game.test/c?s=100", { method: "POST" }), { ASSETS: assets, DB: db });
    assertNo500(postRes, "POST /c");
    assert.equal(postRes.status, 200);
  } finally {
    restore();
    db.close();
  }
});

test("GET/HEAD/PUT/DELETE/PATCH /api/scores, /api/health, /api/unknown & HTTP downgrade fuzzing", async () => {
  const db = makeSqliteDB({ migrations: "0001+0002" });
  try {
    await handle(new Request("https://game.test/api/health"), { DB: db });

    for (const s of ["null", "", "abc", "1e3", "99999999", "-1", "0"]) {
      const r = await handle(new Request("https://game.test/api/scores?view=pct&score=" + encodeURIComponent(s)), { DB: db });
      assertNo500(r, `pct=${s}`);
      assert.ok(r.status === 200 || r.status === 400);
    }

    for (const m of ["PUT", "DELETE", "PATCH"]) {
      const r = await handle(new Request("https://game.test/api/scores", { method: m }), { DB: db });
      assert.equal(r.status, 405);
      assert.match(r.headers.get("allow") || "", /GET/);
    }

    const hGet = await handle(new Request("http://game.test/api/scores", { headers: { "cf-visitor": '{"scheme":"http"}' } }), { DB: db });
    assert.equal(hGet.status, 301);

    const hPost = await handle(new Request("http://game.test/api/scores", { method: "POST", headers: { "x-forwarded-proto": "http" } }), { DB: db });
    assert.equal(hPost.status, 403);

    const unk = await handle(new Request("https://game.test/api/does-not-exist"), { DB: db });
    assert.equal(unk.status, 404);
  } finally {
    db.close();
  }
});

test("POST /api/scores transport, coercion, prototype-key, gid/key update, and rate-limit fuzzing", async () => {
  const db = makeSqliteDB({ migrations: "0001+0002" });
  resetCaches();
  try {
    const postRaw = (body, headers = {}, envExtra = {}) =>
      handle(new Request("https://game.test/api/scores", {
        method: "POST",
        headers: { "content-type": "application/json", ...headers },
        body,
      }), { DB: db, ...envExtra });

    // Transport & JSON checks
    assert.equal((await postRaw("{}", { "content-type": "text/plain" })).status, 415);
    assert.equal((await postRaw("{}", { origin: "https://evil.test" })).status, 403);
    assert.equal((await postRaw("{}", { "content-length": "999999" })).status, 413);

    // Chunked oversized stream (> 4096 bytes)
    const bigStream = new ReadableStream({
      start(c) {
        c.enqueue(new Uint8Array(3000).fill(65));
        c.enqueue(new Uint8Array(3000).fill(65));
        c.close();
      },
    });
    const rChunked = await handle(new Request("https://game.test/api/scores", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: bigStream,
      duplex: "half",
    }), { DB: db });
    assert.equal(rChunked.status, 413);

    // Errored ReadableStream must return 400 bad_json, never 500
    const errStream = new ReadableStream({
      pull() { throw new Error("boom stream"); },
    });
    const rErr = await handle(new Request("https://game.test/api/scores", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: errStream,
      duplex: "half",
    }), { DB: db });
    assertNo500(rErr, "errored ReadableStream");
    assert.equal(rErr.status, 400);

    for (const badBody of ["{bad", "null", "123", "true", "[]", '"str"']) {
      const r = await postRaw(badBody);
      assertNo500(r, `badBody=${badBody}`);
      assert.equal(r.status, 400);
    }

    // b.score coercion rejection
    for (const badScore of [null, "", "   ", false, true, [], [0], {}, "100", -1, 500001]) {
      const r = await postRaw(JSON.stringify({ score: badScore }));
      assertNo500(r, `badScore=${JSON.stringify(badScore)}`);
      assert.equal(r.status, 400, `score ${JSON.stringify(badScore)} should be 400`);
      assert.equal((await r.json()).error, "bad_score");
    }
    assert.equal((await postRaw(JSON.stringify({ score: 12 }))).status, 422);

    // Prototype keys on habit, answers, choices, mtype, title, persona, and top-level __proto__
    for (const protoKey of ["toString", "constructor", "__proto__", "valueOf", "hasOwnProperty"]) {
      const payload = `{"score":0,"__proto__":{"polluted":true},"habit":"${protoKey}","answers":[{"q":"${protoKey}","pick":0},null,123,{"q":"fakeapp","pick":99},{"q":"fakeapp","pick":true}],"choices":[{"card":"__proto__","pick":"wise","power":"toString"},null,{"card":"newphone","pick":"wise","power":"${protoKey}"}],"mtype":"${protoKey}","title":"${protoKey}","persona":"${protoKey}"}`;
      const r = await postRaw(payload);
      assertNo500(r, `proto=${protoKey}`);
      assert.equal(r.status, 201, `proto=${protoKey} failed`);
      const created = await r.json();
      const row = await db.prepare("SELECT habit, mtype, title, persona FROM scores WHERE id = ?1").bind(created.id).first();
      assert.equal(row.habit, null);
      assert.equal(row.mtype, null);
      assert.equal(row.title, null);
      assert.equal(row.persona, null);
    }
    assert.equal(({}).polluted, undefined, "Object.prototype must not be polluted");

    // Secondary coercions: stage, height, drops, real_ms, email, name
    const rCoerce = await postRaw(JSON.stringify({
      score: 0,
      board: false,
      name: { a: 1 },
      stage: true,
      height: true,
      drops: true,
      real_ms: false,
      choices: [],
    }));
    assert.equal(rCoerce.status, 201);
    const coerceId = (await rCoerce.json()).id;
    const coerceRow = await db.prepare("SELECT name, stage, height, drops, real_ms FROM scores WHERE id = ?1").bind(coerceId).first();
    assert.equal(coerceRow.name, NAME_DEFAULT);
    assert.equal(coerceRow.stage, 0);
    assert.equal(coerceRow.height, 0);
    assert.equal(coerceRow.drops, 0);
    assert.equal(coerceRow.real_ms, null);

    for (const badMail of [123, false, ["a@b.co"], {}]) {
      const r = await postRaw(JSON.stringify({ score: 0, board: true, email: badMail }));
      assert.equal(r.status, 400);
      assert.equal((await r.json()).error, "bad_email");
    }

    // gid + key update fuzzing & MAX_EDITS lock
    const gid = "fuzz-gid-0123456789", key = "fuzz-secret-key-0123456789abcdef";
    assert.equal((await postRaw(JSON.stringify({ score: 0, gid: "bad", key: "bad" }))).status, 400);
    assert.equal((await postRaw(JSON.stringify({ score: 100, height: 1, items: 2, gid, key, board: false }))).status, 201);
    assert.equal((await postRaw(JSON.stringify({ score: 100, gid, key: "wrong-key-0123456789abcdef" }))).status, 403);
    const updProto = await postRaw(JSON.stringify({
      score: 100, gid, key, board: false, habit: "toString",
      answers: [{ q: "toString", pick: 0 }, { q: "fakeapp", pick: 1 }],
    }));
    assertNo500(updProto, "gid update proto");
    assert.equal(updProto.status, 200);

    // Force MAX_EDITS lock -> 409
    db._raw.prepare("UPDATE scores SET edits = 60 WHERE gid = ?").run(gid);
    const locked = await postRaw(JSON.stringify({ score: 100, gid, key, board: true }));
    assert.equal(locked.status, 409);

    // Rate limit IPv4 & IPv6 /64 burst
    assert.equal((await postRaw(JSON.stringify({ score: 0 }), { "cf-connecting-ip": "198.51.100.1" }, { RATE_LIMIT: "1" })).status, 201);
    assert.equal((await postRaw(JSON.stringify({ score: 0 }), { "cf-connecting-ip": "198.51.100.1" }, { RATE_LIMIT: "1" })).status, 429);
    assert.equal((await postRaw(JSON.stringify({ score: 0 }), { "cf-connecting-ip": "2001:db8:abcd:0001::1" }, { RATE_LIMIT: "1" })).status, 201);
    assert.equal((await postRaw(JSON.stringify({ score: 0 }), { "cf-connecting-ip": "2001:db8:abcd:0001::99" }, { RATE_LIMIT: "1" })).status, 429);
  } finally {
    db.close();
  }
});

test("/api/admin/* auth, brute-force lock, SQLi/LIKE filter fuzz, hide/rename coercion, and 100-ID batch compliance", async () => {
  const db = makeSqliteDB({ migrations: "0001+0002" });
  try {
    await handle(new Request("https://game.test/api/health"), { DB: db });
    db._raw.exec("BEGIN");
    const ins = db._raw.prepare("INSERT INTO scores (name, score, week, month, created_at, hidden, posted) VALUES (?, ?, '2026-W46', '2026-11', '2026-11-10T00:00:00Z', 0, 1)");
    for (let i = 1; i <= 105; i++) ins.run(`Player${i}`, i * 10);
    db._raw.exec("COMMIT");

    // Auth & short token
    assert.equal((await handle(new Request("https://game.test/api/admin/scores"), { DB: db })).status, 404);
    assert.equal((await handle(new Request("https://game.test/api/admin/scores"), { DB: db, ADMIN_TOKEN: "short" })).status, 404);
    assert.equal((await handle(new Request("https://game.test/api/admin/scores"), { DB: db, ADMIN_TOKEN: TOKEN })).status, 401);

    // 20 wrong attempts + 21st valid token from same IP -> 429
    const attackerIp = { "cf-connecting-ip": "203.0.113.77" };
    for (let i = 0; i < 20; i++) {
      const r = await handle(new Request("https://game.test/api/admin/scores", {
        headers: { ...attackerIp, authorization: "Bearer wrong-token-0000000" },
      }), { DB: db, ADMIN_TOKEN: TOKEN });
      assert.equal(r.status, 401);
    }
    const r21 = await handle(new Request("https://game.test/api/admin/scores", {
      headers: { ...attackerIp, ...AUTH },
    }), { DB: db, ADMIN_TOKEN: TOKEN });
    assert.equal(r21.status, 429);

    // Filter & query fuzzing across scores, rows, winners, summary, export
    const qPayloads = ["' OR 1=1--", "%_\\", "1; DROP TABLE scores;--", "a".repeat(200)];
    for (const route of ["scores", "rows", "winners", "summary", "export"]) {
      for (const qv of qPayloads) {
        const u = `https://game.test/api/admin/${route}?q=${encodeURIComponent(qv)}&week=bad&month=bad&limit=-1&offset=NaN&before=1e30&after=-5`;
        const r = await handle(new Request(u, { headers: AUTH }), { DB: db, ADMIN_TOKEN: TOKEN });
        assertNo500(r, `${route} q=${qv}`);
        assert.equal(r.status, 200);
        await r.arrayBuffer();
      }
    }

    // hide & rename malformed, oversized, primitive, and coerced IDs
    for (const ep of ["hide", "rename"]) {
      const rBig = await handle(new Request(`https://game.test/api/admin/${ep}`, {
        method: "POST", headers: HDR, body: JSON.stringify({ id: 1, pad: "x".repeat(5000) }),
      }), { DB: db, ADMIN_TOKEN: TOKEN });
      assert.equal(rBig.status, 413);

      for (const badBody of ["{bad", "null", "[]", "123", JSON.stringify({ id: true }), JSON.stringify({ id: [1] }), JSON.stringify({ id: -5 }), JSON.stringify({ id: 0 })]) {
        const r = await handle(new Request(`https://game.test/api/admin/${ep}`, {
          method: "POST", headers: HDR, body: badBody,
        }), { DB: db, ADMIN_TOKEN: TOKEN });
        assertNo500(r, `${ep} ${badBody}`);
        assert.equal(r.status, 400);
      }
    }
    // Verify row 1 is completely untouched
    const row1 = await db.prepare("SELECT name, hidden FROM scores WHERE id = 1").first();
    assert.deepEqual(row1, { name: "Player1", hidden: 0 });

    // batch fuzz + 100 valid IDs (must chunk <= 99 IDs/stmt and succeed without D1_ERROR)
    assert.equal((await handle(new Request("https://game.test/api/admin/batch", {
      method: "POST", headers: HDR, body: JSON.stringify({ action: "hide", ids: [true, -1, "abc"] }),
    }), { DB: db, ADMIN_TOKEN: TOKEN })).status, 400);

    const ids100 = Array.from({ length: 100 }, (_, i) => i + 1);
    const bRes = await handle(new Request("https://game.test/api/admin/batch", {
      method: "POST", headers: HDR, body: JSON.stringify({ action: "hide", ids: ids100 }),
    }), { DB: db, ADMIN_TOKEN: TOKEN });
    assertNo500(bRes, "batch 100 ids");
    assert.equal(bRes.status, 200);
    const bJson = await bRes.json();
    assert.equal(bJson.count, 100);
    assert.equal(bJson.changed, 100);
    assert.equal((await db.prepare("SELECT COUNT(*) AS n FROM scores WHERE hidden = 1").first()).n, 100);
  } finally {
    db.close();
  }
});
