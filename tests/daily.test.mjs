// Tests for /daily (Harbour Keep 海傍小天地): content schema, reinvented DailyAudio, D1 API,
// streak/shield rules, admin analytics/CSV, full-screen 3D Three.js engine, 360° swipe orbit,
// individual 3D Thing inspect mode, 60s Forest focus rescue ring, Day-14 3D pass, AXTree a11y,
// and WCAG 2.1 AA contrast across Day/Dusk/Night.
import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { handle, resetCaches } from "../server/api.js";
import { makeSqliteDB } from "./fake-d1-store.mjs";
import { launchBrowser } from "./e2e/cdp.mjs";
import { startE2EServer } from "./e2e/server.mjs";
import "../src/daily-content.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const TOKEN = "0123456789abcdef";
const AUTH = { authorization: `Bearer ${TOKEN}` };

const EXPECTED_DAILY_SFX = [
  "cardClose", "cardOpen", "done", "milestone", "nope", "orbitTick",
  "rescueBloom", "rescueStart", "rescueTick", "select", "shieldCatch",
  "skyShift", "sprint14", "tapProp", "yesBloom",
];

function collectItemIds() {
  const ids = new Set();
  for (const f of ["src/items/wise.js", "src/items/hk.js", "src/items/risky-b.js"]) {
    const txt = readFileSync(join(root, f), "utf8");
    for (const m of txt.matchAll(/\bid:\s*"([^"]+)"/g)) ids.add(m[1]);
  }
  return ids;
}

function createDailyAudioSandbox({ storedMuted = null, hasAudioContext = true } = {}) {
  const src = readFileSync(join(root, "src/daily-audio.js"), "utf8");
  let now = 0;
  let nextId = 1;
  const store = new Map();
  if (storedMuted != null) store.set("tff_daily_muted", storedMuted);
  const intervals = new Map();
  const timeouts = [];
  const ctxInstances = [];
  const createdNodes = [];

  const makeParam = (initial = 0) => {
    let val = initial;
    return {
      get value() { return val; },
      set value(v) { assert.ok(Number.isFinite(v), `non-finite AudioParam value: ${v}`); val = v; },
      setValueAtTime(v, t) { assert.ok(Number.isFinite(v) && Number.isFinite(t) && t >= 0); val = v; },
      linearRampToValueAtTime(v, t) { assert.ok(Number.isFinite(v) && Number.isFinite(t) && t >= 0); val = v; },
      exponentialRampToValueAtTime(v, t) { assert.ok(Number.isFinite(v) && v > 0 && Number.isFinite(t) && t >= 0); val = v; },
      setTargetAtTime(v, t, tau) { assert.ok(Number.isFinite(v) && Number.isFinite(t) && t >= 0 && tau > 0); val = v; },
      cancelScheduledValues(t) { assert.ok(Number.isFinite(t) && t >= 0); },
    };
  };
  const makeNode = (kind, extra = {}) => {
    const n = { kind, connect(dest) { return dest; }, disconnect() {}, ...extra };
    createdNodes.push(n);
    return n;
  };
  class MockAudioContext {
    constructor() {
      this.sampleRate = 44100;
      this.state = "suspended";
      this.destination = makeNode("destination");
      ctxInstances.push(this);
    }
    get currentTime() { return now; }
    resume() { this.state = "running"; return Promise.resolve(); }
    suspend() { this.state = "suspended"; return Promise.resolve(); }
    createGain() { return makeNode("gain", { gain: makeParam(1) }); }
    createBiquadFilter() { return makeNode("filter", { type: "lowpass", frequency: makeParam(350), Q: makeParam(1), gain: makeParam(0) }); }
    createOscillator() {
      return makeNode("osc", {
        type: "sine",
        frequency: makeParam(440),
        detune: makeParam(0),
        start() {},
        stop() {},
      });
    }
    createBuffer(ch, len, sr) {
      const data = Array.from({ length: ch }, () => new Float32Array(len));
      return { numberOfChannels: ch, length: len, sampleRate: sr, duration: len / sr, getChannelData: (i) => data[i] };
    }
    createBufferSource() { return makeNode("bufsrc", { buffer: null, loop: false, start() {}, stop() {} }); }
    createStereoPanner() { return makeNode("panner", { pan: makeParam(0) }); }
    createWaveShaper() { return makeNode("shaper", { curve: null, oversample: "none" }); }
    createDynamicsCompressor() {
      return makeNode("comp", {
        threshold: makeParam(-24), knee: makeParam(30), ratio: makeParam(12),
        attack: makeParam(0.003), release: makeParam(0.25),
      });
    }
    createDelay() { return makeNode("delay", { delayTime: makeParam(0) }); }
  }

  const sandbox = {
    Math, Number, String, Boolean, Array, Object, Promise, Error, Float32Array, Date,
    localStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
    },
    document: { hidden: false, addEventListener() {} },
    setInterval: (fn, ms) => { const id = nextId++; intervals.set(id, { fn, ms }); return id; },
    clearInterval: (id) => { intervals.delete(id); },
    setTimeout: (fn, ms) => { const id = nextId++; timeouts.push({ id, fn, ms }); return id; },
    clearTimeout: () => {},
  };
  if (hasAudioContext) sandbox.AudioContext = MockAudioContext;
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  vm.runInNewContext(src, sandbox, { filename: "src/daily-audio.js" });
  return {
    DailyAudio: sandbox.DailyAudio,
    store,
    ctxInstances,
    createdNodes,
    intervals,
    advance(dt) { now += dt; },
    tickOnce() { for (const { fn } of intervals.values()) fn(); },
    flushTimeouts() { while (timeouts.length) timeouts.shift().fn(); },
  };
}

test("daily-content schema: 40 unique questions, sequential Days 1-14, valid items, infinite milestones", () => {
  const D = globalThis.TFF_DAILY;
  assert.ok(D && Array.isArray(D.QUESTIONS));
  assert.equal(D.QUESTIONS.length, 40);
  const ids = new Set();
  const itemIds = collectItemIds();
  for (const q of D.QUESTIONS) {
    assert.ok(q.id && !ids.has(q.id), "duplicate qid: " + q.id);
    ids.add(q.id);
    assert.ok(D.CATEGORIES[q.cat], "bad cat on " + q.id);
    assert.ok(itemIds.has(q.item), "missing item " + q.item + " on " + q.id);
    assert.ok(q.good === "yes" || q.good === "no");
    assert.ok(q.en && q.zh && q.yesText.length === 2 && q.noText.length === 2 && q.tip.length === 2 && q.rescue.length === 2);
  }
  for (let d = 1; d <= 14; d++) {
    assert.equal(D.QUESTIONS[d - 1].sprintDay, d);
    assert.equal(D.pickQuestion("u1", d - 1, "2026-11-27", []).id, D.QUESTIONS[d - 1].id);
  }
  const inf1 = D.pickQuestion("u1", 14, "2026-11-27", []);
  assert.equal(inf1.sprintDay, null);
  const inf2 = D.pickQuestion("u1", 15, "2026-11-28", [inf1.id]);
  assert.notEqual(inf2.id, inf1.id);
  assert.equal(D.milestoneFor(14).day, 14);
  assert.equal(D.milestoneFor(114).day, 114);
});

test("daily-audio unit: reinvented API, 15 tactile SFX, mute persistence, sky/tier/focus & fail-safe mode", () => {
  // Missing AudioContext fail-safe
  const noAc = createDailyAudioSandbox({ hasAudioContext: false });
  assert.deepEqual(noAc.DailyAudio.listSfx(), EXPECTED_DAILY_SFX);
  assert.doesNotThrow(() => {
    noAc.DailyAudio.unlock();
    noAc.DailyAudio.setSky("dusk");
    noAc.DailyAudio.setTier(2);
    noAc.DailyAudio.setFocusMode(true);
    noAc.DailyAudio.sfx("yesBloom");
    noAc.DailyAudio.startMusic();
    noAc.DailyAudio.stopMusic();
  });
  assert.equal(noAc.ctxInstances.length, 0);

  // Full mock AudioContext lifecycle
  const env = createDailyAudioSandbox();
  assert.equal(env.ctxInstances.length, 0, "must not create AudioContext before unlock()");
  assert.equal(env.DailyAudio.isMuted(), false);
  env.DailyAudio.unlock();
  assert.equal(env.ctxInstances.length, 1);
  assert.equal(env.DailyAudio.getState().playing, true);

  for (const sky of ["day", "dusk", "night"]) {
    assert.equal(env.DailyAudio.setSky(sky), sky);
    assert.equal(env.DailyAudio.getState().sky, sky);
  }
  for (const tier of [0, 1, 2, 3]) {
    assert.equal(env.DailyAudio.setTier(tier), tier);
    assert.equal(env.DailyAudio.getState().tier, tier);
  }
  env.DailyAudio.setFocusMode(true);
  assert.equal(env.DailyAudio.getState().focusMode, true);
  env.advance(0.5);
  env.tickOnce();
  env.DailyAudio.setFocusMode(false);
  assert.equal(env.DailyAudio.getState().focusMode, false);
  env.advance(0.5);
  env.tickOnce();

  // Every reinvented SFX runs cleanly; prototype keys are ignored safely
  for (const name of EXPECTED_DAILY_SFX) {
    env.advance(0.2);
    const beforeNodes = env.createdNodes.length;
    env.DailyAudio.sfx(name);
    assert.ok(env.createdNodes.length > beforeNodes, `SFX ${name} did not create Web Audio nodes`);
  }
  const beforeProto = env.createdNodes.length;
  env.DailyAudio.sfx("constructor");
  env.DailyAudio.sfx("toString");
  env.DailyAudio.sfx("nonexistent");
  assert.equal(env.createdNodes.length, beforeProto);

  // Mute toggle persists under tff_daily_muted
  assert.equal(env.DailyAudio.toggleMute(), true);
  assert.equal(env.store.get("tff_daily_muted"), "1");
  assert.equal(env.DailyAudio.isMuted(), true);
  assert.equal(env.DailyAudio.toggleMute(), false);
  assert.equal(env.store.get("tff_daily_muted"), "0");
  env.DailyAudio.stopMusic();
  env.flushTimeouts();
  assert.equal(env.DailyAudio.getState().playing, false);
});

test("daily.html and daily.webmanifest pass structural, script & labelling checks", () => {
  const html = readFileSync(join(root, "src/static/daily.html"), "utf8");
  const manifest = JSON.parse(readFileSync(join(root, "src/static/daily.webmanifest"), "utf8"));
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const seen = new Set(), dupes = new Set();
  for (const id of ids) (seen.has(id) ? dupes : seen).add(id);
  assert.deepEqual([...dupes], []);
  const inputs = [...html.matchAll(/<(input|textarea|select)\b[^>]*>/g)].map((m) => m[0]);
  for (const tag of inputs) {
    const id = (tag.match(/\sid="([^"]+)"/) || [])[1];
    assert.ok(/\saria-label=/.test(tag) || (id && new RegExp(`for="${id}"`).test(html)), "unlabelled input: " + tag);
  }
  assert.match(html, /%%asset:vendor\/daily3d\.js%%/);
  assert.match(html, /%%asset:daily-audio\.js%%/);
  assert.match(html, /%%asset:daily-content\.js%%/);
  assert.match(html, /%%asset:daily\.js%%/);
  assert.equal(html.includes("daily-prelude.js"), false, "daily.html should not reference removed daily-prelude.js");
  assert.equal(manifest.start_url, "/daily");
  assert.ok(manifest.icons.length >= 2);
});

test("daily API lifecycle: init, direct/rescue/skip check-in, 7-day shield, missed-day reset, Day-14 claim, sync restore & admin", async () => {
  resetCaches();
  const db = makeSqliteDB({ migrations: "0001+0002" });
  const callApi = (path, opts = {}) => handle(new Request("https://3fallcrab.com" + path, opts), { DB: db, ADMIN_TOKEN: TOKEN, TIMEZONE: "Asia/Hong_Kong" });
  const postDaily = (body) => callApi("/api/daily", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });

  try {
    const uid = "0123456789abcdef01234567";
    const key = "secret_key_for_daily_test_123456";
    const h = await (await callApi("/api/daily")).json();
    assert.equal(h.ok, true);
    assert.match(h.today, /^\d{4}-\d{2}-\d{2}$/);

    // Init creates user & syncCode
    const init1 = await (await postDaily({ action: "init", uid, key })).json();
    assert.equal(init1.ok, true);
    assert.match(init1.syncCode, /^CRAB-[A-Z0-9]{4}-[A-Z0-9]{4}$/);
    assert.equal(init1.profile.totalDays, 0);

    // Wrong key rejected
    const badKey = await postDaily({ action: "init", uid, key: "wrong_key_for_daily_test_123456" });
    assert.equal(badKey.status, 403);

    // Skipped -> same-day upgrade to rescued -> double check-in idempotent
    const skipRes = await (await postDaily({ action: "checkin", uid, key, qid: "d01_peek", firstPick: "no", status: "skipped" })).json();
    assert.equal(skipRes.profile.totalDays, 0);
    assert.equal(skipRes.log.status, "skipped");

    const rescRes = await (await postDaily({ action: "checkin", uid, key, qid: "d01_peek", firstPick: "no", status: "rescued" })).json();
    assert.equal(rescRes.profile.totalDays, 1);
    assert.equal(rescRes.profile.streak, 1);
    assert.equal(rescRes.profile.rescues, 1);

    const dupRes = await (await postDaily({ action: "checkin", uid, key, qid: "d01_peek", firstPick: "yes", status: "direct" })).json();
    assert.equal(dupRes.alreadyDone, true);
    assert.equal(dupRes.profile.totalDays, 1);

    // Simulate 13 more sequential days via backdating last_date & day_date to reach Day 14 and earn shields
    const today = init1.today;
    const shiftDate = (iso, deltaDays) => {
      const [y, m, d] = iso.split("-").map(Number);
      return new Date(Date.UTC(y, m - 1, d + deltaDays)).toISOString().slice(0, 10);
    };
    const yesterday = shiftDate(today, -1);
    for (let day = 2; day <= 14; day++) {
      db._raw.prepare("UPDATE daily_users SET last_date = ? WHERE uid = ?").run(yesterday, uid);
      db._raw.prepare("UPDATE daily_logs SET day_date = ? WHERE user_id = 1 AND day_date = ?").run(shiftDate(today, -day), today);
      const q = globalThis.TFF_DAILY.QUESTIONS[day - 1];
      const r = await (await postDaily({ action: "checkin", uid, key, qid: q.id, firstPick: q.good, status: "direct" })).json();
      assert.equal(r.profile.totalDays, day);
      if (day === 7) assert.equal(r.earnedShield, 1);
      if (day === 14) {
        assert.equal(r.earnedShield, 1);
        assert.equal(r.profile.shields, 2);
        assert.equal(r.sprintJustDone, true);
      }
    }

    // Missed 1 day bridged by shield (shields 2 -> 1, streak 14 -> 15)
    db._raw.prepare("UPDATE daily_users SET last_date = ? WHERE uid = ?").run(shiftDate(today, -2), uid);
    db._raw.prepare("UPDATE daily_logs SET day_date = ? WHERE user_id = 1 AND day_date = ?").run(shiftDate(today, -30), today);
    const shielded = await (await postDaily({ action: "checkin", uid, key, qid: "inf01_water", firstPick: "yes", status: "direct" })).json();
    assert.equal(shielded.shieldSaved, 1);
    assert.equal(shielded.profile.shields, 1);
    assert.equal(shielded.profile.streak, 15);
    assert.equal(shielded.profile.totalDays, 15);

    // Missed 3 days with only 1 shield resets streak to 1, but preserves totalDays (16)
    db._raw.prepare("UPDATE daily_users SET last_date = ? WHERE uid = ?").run(shiftDate(today, -4), uid);
    db._raw.prepare("UPDATE daily_logs SET day_date = ? WHERE user_id = 1 AND day_date = ?").run(shiftDate(today, -31), today);
    const broken = await (await postDaily({ action: "checkin", uid, key, qid: "inf02_48h", firstPick: "yes", status: "direct" })).json();
    assert.equal(broken.shieldSaved, 0);
    assert.equal(broken.profile.streak, 1);
    assert.equal(broken.profile.totalDays, 16);

    // Claim Day-14 finisher details (email stays private on public response!)
    const badMail = await postDaily({ action: "claim", uid, key, email: "not-an-email" });
    assert.equal(badMail.status, 400);
    const claimed = await (await postDaily({ action: "claim", uid, key, name: "=CMD()", email: "finisher@example.com", note: "Autopay card", avatar: "jackie", claim: true })).json();
    assert.equal(claimed.ok, true);
    assert.equal(claimed.profile.hasEmail, true);
    assert.equal(claimed.profile.email, undefined);
    assert.ok(claimed.profile.claimedAt);

    // Sync code restore onto a new device + unknown code 404 + brute-force 429
    const uid2 = "fedcba9876543210fedcba98";
    const key2 = "new_device_secret_key_for_test_99";
    const badRestore = await callApi("/api/daily", {
      method: "POST",
      headers: { "content-type": "application/json", "cf-connecting-ip": "203.0.113.9" },
      body: JSON.stringify({ action: "restore", uid: uid2, key: key2, syncCode: "CRAB-9999-9999" }),
    });
    assert.equal(badRestore.status, 404);
    for (let k = 0; k < 11; k++) {
      await callApi("/api/daily", {
        method: "POST",
        headers: { "content-type": "application/json", "cf-connecting-ip": "203.0.113.9" },
        body: JSON.stringify({ action: "restore", uid: uid2, key: key2, syncCode: "CRAB-9999-9999" }),
      });
    }
    const throttled = await callApi("/api/daily", {
      method: "POST",
      headers: { "content-type": "application/json", "cf-connecting-ip": "203.0.113.9" },
      body: JSON.stringify({ action: "restore", uid: uid2, key: key2, syncCode: "CRAB-9999-9999" }),
    });
    assert.equal(throttled.status, 429);

    const rest = await (await postDaily({ action: "restore", uid: uid2, key: key2, syncCode: init1.syncCode })).json();
    assert.equal(rest.ok, true);
    assert.equal(rest.profile.totalDays, 16);

    // Admin daily summary, moderation, and CSV export formula neutralization
    const adm = await (await callApi("/api/admin/daily", { headers: AUTH })).json();
    assert.equal(adm.ok, true);
    assert.equal(adm.overview.starters, 1);
    assert.equal(adm.overview.finishers14, 1);
    assert.equal(adm.overview.beyond14, 1);
    assert.equal(adm.finishers[0].email, "finisher@example.com");
    assert.equal(adm.funnel.find((f) => f.day === 14).users, 1);

    const csvUsers = await (await callApi("/api/admin/daily-export?kind=users", { headers: AUTH })).text();
    assert.ok(csvUsers.includes("'=CMD()"), "CSV must neutralize formula injection");
    const csvLogs = await (await callApi("/api/admin/daily-export?kind=logs", { headers: AUTH })).text();
    assert.ok(csvLogs.includes("d01_peek"));

    const mod = await (await callApi("/api/admin/daily-mod", {
      method: "POST",
      headers: { "content-type": "application/json", ...AUTH },
      body: JSON.stringify({ action: "hide", ids: [1] }),
    })).json();
    assert.equal(mod.changed, 1);
    const admAfterHide = await (await callApi("/api/admin/daily", { headers: AUTH })).json();
    assert.equal(admAfterHide.overview.starters, 0);
  } finally {
    db.close();
  }
});

let browser, srv;
before(async () => {
  srv = await startE2EServer();
  browser = await launchBrowser();
});
after(async () => {
  await browser?.close();
  await srv?.close();
});

const DOM_CONTRAST = `(() => {
  const parse = (s) => {
    const m = /rgba?\\(\\s*([\\d.]+)\\s*,\\s*([\\d.]+)\\s*,\\s*([\\d.]+)(?:\\s*,\\s*([\\d.]+))?\\s*\\)/i.exec(s || "");
    if (!m) return null;
    return { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] };
  };
  const over = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
  const lum = (c) => { const ch = (v) => { const x = v / 255; return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }; return 0.2126 * ch(c.r) + 0.7152 * ch(c.g) + 0.0722 * ch(c.b); };
  const ratio = (a, b) => { const la = lum(a), lb = lum(b); return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05); };
  const resolveBg = (el) => {
    const layers = []; let cur = el;
    while (cur && cur.nodeType === 1) {
      const bg = parse(getComputedStyle(cur).backgroundColor);
      if (bg && bg.a > 0) { layers.push(bg); if (bg.a >= 0.999) break; }
      cur = cur.parentElement;
    }
    let acc = { r: 255, g: 210, b: 63, a: 1 };
    for (let i = layers.length - 1; i >= 0; i--) acc = over(layers[i], acc);
    return acc;
  };
  const fails = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (!node.nodeValue || !node.nodeValue.trim()) continue;
    const el = node.parentElement;
    if (!el || el.closest("[hidden], [aria-hidden='true'], .sr, script, style, noscript, .word")) continue;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || parseFloat(cs.opacity) === 0) continue;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 1 || rect.height <= 1) continue;
    const fg = parse(cs.color); if (!fg || fg.a === 0) continue;
    const bg = resolveBg(el);
    const fs = parseFloat(cs.fontSize) || 14, fw = parseInt(cs.fontWeight, 10) || 400;
    const min = (fs >= 24 || (fs >= 18.67 && fw >= 700)) ? 3.0 : 4.5;
    const r = ratio(fg.a < 1 ? over(fg, bg) : fg, bg);
    if (r < min) fails.push({ text: node.nodeValue.trim().slice(0, 30), cls: el.className, r: +r.toFixed(2), min });
  }
  return fails;
})()`;

async function swipeDrag(ctx, x0, y0, x1, y1, steps = 8) {
  await ctx.cdp("Input.dispatchMouseEvent", { type: "mouseMoved", x: x0, y: y0 });
  await ctx.cdp("Input.dispatchMouseEvent", { type: "mousePressed", x: x0, y: y0, button: "left", clickCount: 1 });
  for (let i = 1; i <= steps; i++) {
    const x = x0 + ((x1 - x0) * i) / steps;
    const y = y0 + ((y1 - y0) * i) / steps;
    await ctx.cdp("Input.dispatchMouseEvent", { type: "mouseMoved", x, y, buttons: 1 });
    await ctx.sleep(16);
  }
  await ctx.cdp("Input.dispatchMouseEvent", { type: "mouseReleased", x: x1, y: y1, button: "left", clickCount: 1 });
  await ctx.sleep(120);
}

async function measureSnapshotVariance(ctx, w = 240, h = 240) {
  return ctx.evalJs(`(async () => {
    const url = window.__dailyStage.snapshot(${w}, ${h});
    if (!url || !url.startsWith("data:image/png;base64,")) return { ok: false, reason: "no png url" };
    const img = await new Promise((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = () => rej(new Error("img load failed"));
      i.src = url;
    });
    const c = document.createElement("canvas");
    c.width = img.width; c.height = img.height;
    const g = c.getContext("2d");
    g.drawImage(img, 0, 0);
    const d = g.getImageData(0, 0, c.width, c.height).data;
    const buckets = new Set();
    let minL = 255, maxL = 0;
    for (let i = 0; i < d.length; i += 16) {
      const r = d[i], gr = d[i + 1], b = d[i + 2];
      const l = 0.299 * r + 0.587 * gr + 0.114 * b;
      if (l < minL) minL = l;
      if (l > maxL) maxL = l;
      buckets.add(((r >> 5) << 6) | ((gr >> 5) << 3) | (b >> 5));
    }
    return { ok: true, len: url.length, width: img.width, height: img.height, colors: buckets.size, range: +(maxL - minL).toFixed(1) };
  })()`);
}

async function seedDay14User(baseUrl, store) {
  const uid = "day14e2euser0123456789ab";
  const key = "day14_e2e_secret_key_for_test_01";
  const post = async (body) => {
    const r = await fetch(`${baseUrl}/api/daily`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    const j = await r.json();
    assert.equal(j.ok, true, "seed post failed: " + JSON.stringify(j));
    return j;
  };
  const init = await post({ action: "init", uid, key });
  const today = init.today;
  const shiftDate = (iso, delta) => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(Date.UTC(y, m - 1, d + delta)).toISOString().slice(0, 10);
  };
  const yesterday = shiftDate(today, -1);
  const userRow = await store.prepare("SELECT id FROM daily_users WHERE uid = ?1").bind(uid).first();
  const userId = userRow.id;

  for (let day = 1; day <= 14; day++) {
    if (day > 1) {
      await store.prepare("UPDATE daily_users SET last_date = ?1 WHERE uid = ?2").bind(yesterday, uid).run();
      await store.prepare("UPDATE daily_logs SET day_date = ?1 WHERE user_id = ?2 AND day_date = ?3").bind(shiftDate(today, -day), userId, today).run();
    }
    const q = globalThis.TFF_DAILY.QUESTIONS[day - 1];
    const r = await post({ action: "checkin", uid, key, qid: q.id, firstPick: q.good, status: "direct" });
    assert.equal(r.profile.totalDays, day);
  }
  return { uid, key, syncCode: init.syncCode };
}

test("E2E 1 (Mobile 390x844): full-screen 3D, swipe orbit, 60s Forest focus ring, skip -> late rescue, DailyAudio, Day/Dusk/Night contrast & AXTree modals", async () => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true } });
  try {
    await ctx.goto(`${srv.baseUrl}/daily`);
    await ctx.waitFor(() => document.getElementById("qEn").textContent.includes("balance") && !!window.__dailyStage);

    // Full-screen viewport check (zero horizontal or vertical scroll overflow + full-bleed WebGL canvas)
    const layout = await ctx.evalJs(`(() => {
      const stage = document.getElementById("stage3d");
      const cv = stage && stage.querySelector("canvas");
      const sr = stage ? stage.getBoundingClientRect() : null;
      const cr = cv ? cv.getBoundingClientRect() : null;
      return {
        supported: !!(window.TFF_DAILY3D && window.TFF_DAILY3D.isSupported()),
        hasStage: !!window.__dailyStage,
        scrollW: document.documentElement.scrollWidth,
        innerW: window.innerWidth,
        scrollH: document.documentElement.scrollHeight,
        innerH: window.innerHeight,
        stageW: sr ? Math.round(sr.width) : 0,
        stageH: sr ? Math.round(sr.height) : 0,
        canvasW: cr ? Math.round(cr.width) : 0,
        canvasH: cr ? Math.round(cr.height) : 0,
        sfxList: window.DailyAudio ? window.DailyAudio.listSfx() : [],
      };
    })()`);
    assert.equal(layout.supported, true, "WebGL TFF_DAILY3D should be supported in SwiftShader Chromium");
    assert.equal(layout.hasStage, true, "window.__dailyStage should be mounted");
    assert.ok(layout.scrollW <= layout.innerW, `mobile horizontal overflow: ${layout.scrollW} > ${layout.innerW}`);
    assert.ok(layout.scrollH <= layout.innerH + 2, `mobile vertical overflow: ${layout.scrollH} > ${layout.innerH}`);
    assert.ok(layout.stageW >= 389 && layout.stageH >= 843, `stage3d should fill mobile viewport: ${layout.stageW}x${layout.stageH}`);
    assert.ok(layout.canvasW >= 389 && layout.canvasH >= 843, `Three.js canvas should fill mobile viewport: ${layout.canvasW}x${layout.canvasH}`);
    assert.deepEqual(layout.sfxList, EXPECTED_DAILY_SFX);
    assert.deepEqual(await ctx.evalJs(DOM_CONTRAST), [], "Mobile initial Day contrast failures");

    // 360° Swipe-to-Orbit verification on mobile center canvas
    const beforeOrbit = await ctx.evalJs("window.__dailyStage.getCameraAngles()");
    await swipeDrag(ctx, 275, 290, 95, 275, 10);
    const afterOrbit = await ctx.evalJs("window.__dailyStage.getCameraAngles()");
    assert.ok(Math.abs(afterOrbit.theta - beforeOrbit.theta) > 0.25, `expected mobile swipe to rotate theta: ${beforeOrbit.theta} -> ${afterOrbit.theta}`);
    assert.equal(await ctx.evalJs("document.getElementById('swipeHint').classList.contains('seen')"), true, "swipeHint should fade after first drag");

    // Tap "Not yet" -> 60s Forest circular Focus Rescue Ring opens, canvas stays swipeable inside ring
    await ctx.click("#btnNo");
    await ctx.waitFor(() => !document.getElementById("qRescue").hidden && !document.getElementById("focusRingOverlay").hidden);
    const rescueInfo = await ctx.evalJs(`(() => ({
      pe: getComputedStyle(document.getElementById("focusRingOverlay")).pointerEvents,
      hasArc: !!document.getElementById("focusRingArc"),
      focusAudio: window.DailyAudio.getState().focusMode,
      checkinHidden: document.getElementById("checkinCard").hidden,
    }))()`);
    assert.equal(rescueInfo.pe, "none", "focusRingOverlay must stay pointer-events:none so 3D swipe works");
    assert.equal(rescueInfo.hasArc, true);
    assert.equal(rescueInfo.focusAudio, true, "DailyAudio focus mode should activate during 60s rescue");
    assert.equal(rescueInfo.checkinHidden, true);
    assert.deepEqual(await ctx.evalJs(DOM_CONTRAST), [], "Mobile 60s focus rescue contrast failures");

    // Swipe still rotates 3D Thing while Focus Ring overlay is open!
    const preRingTheta = await ctx.evalJs("window.__dailyStage.getCameraAngles().theta");
    await swipeDrag(ctx, 110, 290, 270, 290, 8);
    const postRingTheta = await ctx.evalJs("window.__dailyStage.getCameraAngles().theta");
    assert.ok(Math.abs(postRingTheta - preRingTheta) > 0.2, "3D stage must remain swipeable during focus rescue ring");

    // Skip today -> late rescue button appears -> complete 60s late rescue!
    await ctx.click("#btnRescueSkip");
    await ctx.waitFor(() => !document.getElementById("qDone").hidden && !document.getElementById("skipRescueWrap").hidden);
    assert.equal(await ctx.evalJs("window.DailyAudio.getState().focusMode"), false);
    assert.deepEqual(await ctx.evalJs(DOM_CONTRAST), [], "Mobile skipped state contrast failures");

    await ctx.evalJs("window.__dailyFastRescue = true");
    await ctx.click("#btnLateRescue");
    await ctx.waitFor(() => !document.getElementById("qRescue").hidden && !document.getElementById("focusRingOverlay").hidden);
    await ctx.click("#btnRescueDone");
    await ctx.waitFor(() => !document.getElementById("qDone").hidden && document.getElementById("skipRescueWrap").hidden);
    assert.equal(await ctx.evalJs("document.getElementById('streakNum').textContent"), "1");
    assert.equal(await ctx.evalJs("document.getElementById('hudTotal').textContent"), "Day 1");
    assert.equal(await ctx.evalJs("!document.getElementById('inspectTodayBtn').hidden"), true);
    assert.deepEqual(await ctx.evalJs(DOM_CONTRAST), [], "Mobile rescued done state contrast failures");

    // Dock collapse & expand toggle
    await ctx.click("#dockToggle");
    await ctx.waitFor(() => document.getElementById("checkinCard").dataset.collapsed === "true");
    assert.deepEqual(await ctx.evalJs(DOM_CONTRAST), [], "Mobile collapsed pill contrast failures");
    await ctx.click("#dockExpandBtn");
    await ctx.waitFor(() => document.getElementById("checkinCard").dataset.collapsed === "false");

    // Sky mood cycling (Day / Dusk / Night) + WCAG 2.1 AA contrast check on EVERY sky theme!
    const seenSkies = new Set();
    for (let i = 0; i < 3; i++) {
      const sky = await ctx.evalJs("document.body.dataset.sky");
      seenSkies.add(sky);
      assert.equal(await ctx.evalJs("window.DailyAudio.getState().sky"), sky);
      const fails = await ctx.evalJs(DOM_CONTRAST);
      assert.deepEqual(fails, [], `Mobile contrast failure in sky=${sky}: ${JSON.stringify(fails)}`);
      await ctx.click("#skyBtn");
      await ctx.sleep(80);
    }
    assert.deepEqual([...seenSkies].sort(), ["day", "dusk", "night"]);

    // Reinvented DailyAudio mute persistence + SFX smoke in live browser
    const mute1 = await ctx.evalJs(`(() => {
      document.getElementById("dailyMute").click();
      return { muted: window.DailyAudio.isMuted(), ls: localStorage.getItem("tff_daily_muted"), pressed: document.getElementById("dailyMute").getAttribute("aria-pressed") };
    })()`);
    assert.equal(mute1.muted, true);
    assert.equal(mute1.ls, "1");
    assert.equal(mute1.pressed, "true");
    await ctx.click("#dailyMute");
    assert.equal(await ctx.evalJs("window.DailyAudio.isMuted()"), false);
    await ctx.evalJs(`(() => {
      for (const s of window.DailyAudio.listSfx()) window.DailyAudio.sfx(s);
    })()`);

    // Modal accessibility + inert background + AXTree + Escape focus restore across all 3 sheets
    for (const [btnId, modalId] of [["remindBtn", "remindModal"], ["logBtn", "logModal"], ["syncBtn", "syncModal"]]) {
      await ctx.click("#" + btnId);
      await ctx.waitFor(`() => !document.getElementById(${JSON.stringify(modalId)}).hidden`);
      assert.equal(await ctx.evalJs("document.getElementById('dailyShell').inert"), true, `${modalId} must set dailyShell inert`);
      assert.deepEqual(await ctx.evalJs(DOM_CONTRAST), [], `Mobile ${modalId} contrast failures`);
      await ctx.cdp("Accessibility.enable");
      const { nodes } = await ctx.cdp("Accessibility.getFullAXTree");
      const unnamed = nodes.filter((n) => !n.ignored && ["button", "link", "textbox", "radio"].includes(n.role?.value) && !(n.name?.value || "").trim());
      assert.deepEqual(unnamed.map((n) => n.role?.value), [], `Unnamed AXNodes in ${modalId}`);
      await ctx.pressKey("Escape", "Escape", 27);
      await ctx.waitFor(`() => document.getElementById(${JSON.stringify(modalId)}).hidden`);
      assert.equal(await ctx.evalJs("document.activeElement?.id"), btnId, `${modalId} Escape must restore focus to #${btnId}`);
    }

    assert.deepEqual(ctx.errors, [], "Mobile /daily console/WebGL errors: " + ctx.errors.join(" | "));
  } finally {
    await ctx.close();
  }
});

test("E2E 2 (Desktop 1280x800): Day-14 sync restore, claim & 3D snapshot pass, 360° swipe, Individual 3D Thing Inspect mode & /admin#daily", async () => {
  const seeded = await seedDay14User(srv.baseUrl, srv.store);

  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false } });
  try {
    await ctx.goto(`${srv.baseUrl}/daily`);
    await ctx.waitFor(() => !!window.__dailyStage && document.getElementById("qEn").textContent.length > 5);

    // Desktop full-screen check (zero scroll overflow + full viewport 3D stage)
    const deskLayout = await ctx.evalJs(`(() => {
      const cr = document.querySelector("#stage3d canvas")?.getBoundingClientRect();
      return {
        scrollW: document.documentElement.scrollWidth,
        innerW: window.innerWidth,
        scrollH: document.documentElement.scrollHeight,
        innerH: window.innerHeight,
        canvasW: cr ? Math.round(cr.width) : 0,
        canvasH: cr ? Math.round(cr.height) : 0,
      };
    })()`);
    assert.ok(deskLayout.scrollW <= deskLayout.innerW, `desktop horizontal overflow: ${deskLayout.scrollW} > ${deskLayout.innerW}`);
    assert.ok(deskLayout.scrollH <= deskLayout.innerH + 2, `desktop vertical overflow: ${deskLayout.scrollH} > ${deskLayout.innerH}`);
    assert.ok(deskLayout.canvasW >= 1279 && deskLayout.canvasH >= 799, `desktop 3D canvas must fill viewport: ${deskLayout.canvasW}x${deskLayout.canvasH}`);

    // Restore seeded Day-14 user via Sync Code inside #syncModal
    await ctx.click("#syncBtn");
    await ctx.waitFor(() => !document.getElementById("syncModal").hidden);
    await ctx.evalJs(`document.getElementById("restoreInput").value = ${JSON.stringify(seeded.syncCode)}`);
    await ctx.click("#restoreBtn");
    await ctx.waitFor(() => document.getElementById("hudTotal").textContent === "Day 14");
    assert.equal(await ctx.evalJs("document.getElementById('hudFloor').textContent"), "5F");
    assert.equal(await ctx.evalJs("document.getElementById('streakNum').textContent"), "14");
    assert.equal(await ctx.evalJs("document.getElementById('shieldNum').textContent"), "2");
    assert.equal(await ctx.evalJs("!document.getElementById('certBtn').hidden"), true, "Day-14 certBtn should unlock");

    // Submit Day-14 claim form & verify 3D Snapshot Commemorative Pass PNG generation
    await ctx.evalJs(`(() => {
      document.getElementById("claimName").value = "HarbourHero";
      document.getElementById("claimEmail").value = "hero14@example.com";
      document.getElementById("claimNote").value = "Autopay in full every month";
    })()`);
    await ctx.click("#claimSubmitBtn");
    await ctx.waitFor(() => document.getElementById("claimStatus").classList.contains("ok"));

    const passSnap = await measureSnapshotVariance(ctx, 400, 310);
    assert.equal(passSnap.ok, true, "stage.snapshot() must return valid PNG");
    assert.ok(passSnap.colors >= 8 && passSnap.range >= 20, `3D snapshot looks blank: ${JSON.stringify(passSnap)}`);

    // Trigger #certBtn and verify blob PNG download completes without errors
    await ctx.evalJs(`(() => {
      window.__certDownload = null;
      const orig = HTMLAnchorElement.prototype.click;
      HTMLAnchorElement.prototype.click = function () {
        if (this.download && this.download.endsWith(".png")) {
          window.__certDownload = { file: this.download, href: this.href };
          return;
        }
        return orig.call(this);
      };
    })()`);
    await ctx.click("#certBtn");
    await ctx.waitFor(() => !!window.__certDownload);
    assert.match(await ctx.evalJs("window.__certDownload.file"), /^3fallcrab-day14-pass\.png$/);
    await ctx.pressKey("Escape", "Escape", 27);
    await ctx.waitFor(() => document.getElementById("syncModal").hidden);

    // Desktop 360° Swipe-to-Orbit verification + utility orbit buttons
    const dBefore = await ctx.evalJs("window.__dailyStage.getCameraAngles()");
    await swipeDrag(ctx, 820, 290, 420, 270, 10);
    const dAfter = await ctx.evalJs("window.__dailyStage.getCameraAngles()");
    assert.ok(Math.abs(dAfter.theta - dBefore.theta) > 0.3, `desktop swipe failed to orbit theta: ${dBefore.theta} -> ${dAfter.theta}`);
    await ctx.click("#orbitResetBtn");
    await ctx.sleep(250);

    // Verify 3D Gallery click inside #logModal opens Individual 3D Thing Inspect Mode!
    await ctx.click("#logBtn");
    await ctx.waitFor(() => !document.getElementById("logModal").hidden && !document.getElementById("finisherBanner").hidden);
    await ctx.evalJs(`document.querySelectorAll("#sprintTrack .sprint-chip")[5].click()`); // Day 6 Neon Sign!
    await ctx.waitFor(() => document.getElementById("logModal").hidden && !document.getElementById("inspectBar").hidden);
    assert.deepEqual(await ctx.evalJs("window.__dailyStage.getMode()"), { mode: "item", inspectDay: 6 });

    // Individual 3D Thing Inspect Mode verification across Days 1, 6, 10, 14, 30 (locked), 100 (locked)
    for (const day of [1, 6, 10, 14, 30, 100]) {
      await ctx.evalJs(`window.__dailyApp.inspectDay(${day})`);
      await ctx.sleep(100);
      const st = await ctx.evalJs(`(() => ({
        mode: window.__dailyStage.getMode(),
        barVisible: !document.getElementById("inspectBar").hidden,
        cardHidden: document.getElementById("checkinCard").hidden,
        backVisible: !document.getElementById("backIslandBtn").hidden,
        lockedClass: document.getElementById("inspectStatusPill").classList.contains("locked"),
      }))()`);
      assert.deepEqual(st.mode, { mode: "item", inspectDay: day });
      assert.equal(st.barVisible, true);
      assert.equal(st.cardHidden, true);
      assert.equal(st.backVisible, true);
      assert.equal(st.lockedClass, day > 14, `day ${day} lock pill mismatch`);
      const px = await measureSnapshotVariance(ctx, 220, 220);
      assert.equal(px.ok, true, `Inspect Day ${day} snapshot failed`);
      assert.ok(px.colors >= 6 && px.range >= 18, `Inspect Day ${day} rendered blank canvas: ${JSON.stringify(px)}`);
    }
    assert.deepEqual(await ctx.evalJs(DOM_CONTRAST), [], "Desktop Inspect Mode contrast failures");

    // Switch back cleanly to 'island' mode via #inspectBackBtn
    await ctx.click("#inspectBackBtn");
    await ctx.waitFor(() => document.getElementById("inspectBar").hidden && !document.getElementById("checkinCard").hidden);
    assert.deepEqual(await ctx.evalJs("window.__dailyStage.getMode()"), { mode: "island", inspectDay: null });

    // Desktop WCAG 2.1 AA contrast across Day / Dusk / Night
    for (let i = 0; i < 3; i++) {
      const sky = await ctx.evalJs("document.body.dataset.sky");
      const fails = await ctx.evalJs(DOM_CONTRAST);
      assert.deepEqual(fails, [], `Desktop contrast failure in sky=${sky}: ${JSON.stringify(fails)}`);
      await ctx.click("#skyBtn");
      await ctx.sleep(80);
    }

    assert.deepEqual(ctx.errors, [], "Desktop /daily console/WebGL errors: " + ctx.errors.join(" | "));
  } finally {
    await ctx.close();
  }

  // Verify /admin.html#daily renders seeded visitors + WCAG AA contrast
  const admCtx = await browser.newContext({ viewport: { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false } });
  try {
    await admCtx.goto(`${srv.baseUrl}/admin.html`);
    await admCtx.evalJs(`document.getElementById('token').value = ${JSON.stringify(srv.adminToken)}`);
    await admCtx.click("#loginForm button[type=submit]");
    await admCtx.waitFor(() => !document.getElementById("panel").hidden);
    await admCtx.click("#tab-daily");
    await admCtx.waitFor(() => document.querySelectorAll("#dailyTiles .tile").length >= 4);
    assert.equal(await admCtx.evalJs("document.querySelectorAll('#dailyRows tr').length >= 1"), true);
    assert.deepEqual(await admCtx.evalJs(DOM_CONTRAST), []);
    assert.deepEqual(admCtx.errors, []);
  } finally {
    await admCtx.close();
  }
});
