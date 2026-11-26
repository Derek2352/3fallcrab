// Tests for /daily (Harbour Keep 海傍小天地): content schema, D1 API, streak/shield rules, admin analytics/CSV,
// keyboard modal accessibility, WCAG AA contrast, and headless Chromium E2E flow.
import test, { after, before } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { handle, resetCaches } from "../server/api.js";
import { makeSqliteDB } from "./fake-d1-store.mjs";
import { launchBrowser } from "./e2e/cdp.mjs";
import { startE2EServer } from "./e2e/server.mjs";
import "../src/daily-content.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const TOKEN = "0123456789abcdef";
const AUTH = { authorization: `Bearer ${TOKEN}` };

function collectItemIds() {
  const ids = new Set();
  for (const f of ["src/items/wise.js", "src/items/hk.js", "src/items/risky-b.js"]) {
    const txt = readFileSync(join(root, f), "utf8");
    for (const m of txt.matchAll(/\bid:\s*"([^"]+)"/g)) ids.add(m[1]);
  }
  return ids;
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

test("daily.html and daily.webmanifest pass structural & labelling checks", () => {
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
      // Shift existing rows back 1 day so today is free again
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

test("E2E + A11y + WCAG AA Contrast on /daily (mobile & desktop) and /admin.html#daily", async () => {
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

  // 1. Mobile 390x844: check in via 60s rescue, inspect modals + AXTree + contrast
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844, deviceScaleFactor: 2, mobile: true } });
  try {
    await ctx.goto(`${srv.baseUrl}/daily`);
    await ctx.waitFor(() => document.getElementById("qEn").textContent.includes("balance"));
    assert.equal(await ctx.evalJs("document.documentElement.scrollWidth <= window.innerWidth"), true, "mobile horizontal overflow");
    assert.deepEqual(await ctx.evalJs(DOM_CONTRAST), []);

    // Tap "Not yet" -> 60s rescue opens -> fast-forward unlock -> complete check-in
    await ctx.evalJs("window.__dailyFastRescue = true");
    await ctx.click("#btnNo");
    await ctx.waitFor(() => !document.getElementById("qRescue").hidden);
    assert.deepEqual(await ctx.evalJs(DOM_CONTRAST), []);
    await ctx.click("#btnRescueDone");
    await ctx.waitFor(() => !document.getElementById("qDone").hidden);
    assert.equal(await ctx.evalJs("document.getElementById('streakNum').textContent"), "1");
    assert.equal(await ctx.evalJs("document.getElementById('hudTotal').textContent"), "Day 1");
    assert.deepEqual(await ctx.evalJs(DOM_CONTRAST), []);

    // Open Reminders modal -> inert background + Escape focus restore
    await ctx.click("#remindBtn");
    await ctx.waitFor(() => !document.getElementById("remindModal").hidden);
    assert.equal(await ctx.evalJs("document.getElementById('dailyShell').inert"), true);
    await ctx.cdp("Accessibility.enable");
    const { nodes } = await ctx.cdp("Accessibility.getFullAXTree");
    const unnamed = nodes.filter((n) => !n.ignored && ["button", "link", "textbox", "radio"].includes(n.role?.value) && !(n.name?.value || "").trim());
    assert.deepEqual(unnamed.map((n) => n.role?.value), []);
    await ctx.pressKey("Escape", "Escape", 27);
    await ctx.waitFor(() => document.getElementById("remindModal").hidden);
    assert.equal(await ctx.evalJs("document.activeElement?.id"), "remindBtn");
    assert.deepEqual(ctx.errors, []);
  } finally {
    await ctx.close();
  }

  // 2. Desktop 1280x800: verify /admin.html#daily renders seeded visitor + contrast
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
