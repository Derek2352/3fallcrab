// Pure game rules, scoring, silhouettes, verdict titles, and stats helpers shared by the browser
// bundle (window.TFF_CORE) and Node unit tests (via globalThis.TFF_CORE).
(function (root) {
"use strict";

const W = 440, H = 700, PW = 270, FLOOR = 50, WATER_Y = 120;
const GAME_MS = 180000, CARD_MS = 10000, FIRST_CARD = 5000, CARD_GAP = 26000;
const SLOW_CARD_MS = 30000, RESULT_MS = 16000;
const STEP = 1000 / 60;
const FALL = [1.5, 1.8, 2.1, 2.4];
const WARMUP_MS = 45000, WARMUP_FROM = 0.65;
const MAX_DROPS = 3, DROP_GRACE_MS = 1800, ANCHOR_DEPTH = FLOOR * 2.5, ANCHOR_REST = 120;
const VINE_RARE = 0.12, VINE_GRABS = 4, MAX_FUSED = 8;
const LOCK_RARE = 0.04, LOCK_REST = 12, NET_MS = 25000, NET_CATCHES = 3, NET_Y = WATER_Y - 16;
const SLIME_RARE = 0.18, SLIME_GRAB = 0.9, SLIME_SPIN = 0.9;
const JACKPOT_RARE = 0.005, JACKPOT_BONUS = 2000, FRENZY_MS = 15000, FRENZY_X = 1.5;
const SIL_ROW = 12.5, SIL_ROWS = 120;
const ANON = "Anonymous crab 匿名蟹";

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const fmt = n => (n < 0 ? "−" : "") + "HK$" + Math.abs(Math.round(n)).toLocaleString("en-US");
const fmtShort = n => Math.abs(Math.round(n)).toLocaleString("en-US");
const floorTxt = f => f < 1 ? "G/F" : Math.floor(f + 1e-6) + "F";
const mmss = ms => { const s = Math.floor(ms / 1000); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };

function isoWeek(d){
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return t.getUTCFullYear() + "-W" + String(Math.ceil(((t - y0) / 86400000 + 1) / 7)).padStart(2, "0");
}

function stageFor(floors, stages){
  let s = 0;
  (stages || []).forEach((st, i) => { if (floors >= st.at) s = i; });
  return s;
}

function hapticSegments(ms){
  const segs = [];
  if (Array.isArray(ms)){
    let delay = 0;
    for (let i = 0; i < ms.length; i++){
      const v = Math.max(0, Math.round(ms[i] || 0));
      if (i % 2 === 0 && v > 0) segs.push({delay, dur: v});
      delay += v;
    }
  } else {
    const v = Math.max(0, Math.round(ms || 0));
    if (v > 0) segs.push({delay: 0, dur: v});
  }
  return segs;
}

function warmupFactor(playMs){
  return WARMUP_FROM + (1 - WARMUP_FROM) * clamp((playMs || 0) / WARMUP_MS, 0, 1);
}

function fallSpeedFor(stage, playMs, speedUntil){
  let f = (FALL[stage] ?? FALL[0]) * warmupFactor(playMs);
  if (playMs < (speedUntil || 0)) f *= 1.7;
  return f;
}

const canTriggerDrop = (playMs, lastDropAt, graceMs = DROP_GRACE_MS) => playMs - lastDropAt >= graceMs;

function shouldAnchorBody(restN, releasedAt, playMs, stackHeight, bodyMinY){
  return restN >= ANCHOR_REST && playMs - releasedAt > 8000 && stackHeight >= ANCHOR_DEPTH && bodyMinY > -stackHeight + ANCHOR_DEPTH;
}

function computePayout(base, rate, frenzyOn, frenzyX = FRENZY_X){
  const one = Math.round(base * rate / 10) * 10;
  if (!frenzyOn) return [one, 1, 0];
  const gain = Math.round(base * rate * frenzyX / 10) * 10;
  return [gain, frenzyX, gain - one];
}

function rollItemTrait(r){
  if (r < VINE_RARE) return "vine";
  if (r < VINE_RARE + LOCK_RARE) return "lock";
  if (r < VINE_RARE + LOCK_RARE + SLIME_RARE) return "slime";
  return "plain";
}

function encodeSilhouette(parts, worldW = W, rowH = SIL_ROW, maxRows = SIL_ROWS){
  const rows = [];
  for (const part of parts || []){
    const vs = part.vertices, n = vs.length;
    if (!n) continue;
    const i0 = Math.max(0, Math.floor(-part.maxY / rowH));
    const i1 = Math.min(maxRows - 1, Math.floor(-part.minY / rowH));
    for (let i = i0; i <= i1; i++){
      const ya = -(i + 1) * rowH, yb = -i * rowH;
      let l = Infinity, r = -Infinity;
      for (let j = 0; j < n; j++){
        const p = vs[j], q = vs[(j + 1) % n];
        if (p.y >= ya && p.y <= yb){ l = Math.min(l, p.x); r = Math.max(r, p.x); }
        for (const yy of [ya, yb]) if ((p.y - yy) * (q.y - yy) < 0){
          const x = p.x + (q.x - p.x) * (yy - p.y) / (q.y - p.y);
          l = Math.min(l, x); r = Math.max(r, x);
        }
      }
      if (l <= r){
        const row = rows[i] || (rows[i] = [Infinity, -Infinity]);
        row[0] = Math.min(row[0], l); row[1] = Math.max(row[1], r);
      }
    }
  }
  const enc = v => Math.round(clamp(v, 0, worldW)).toString(36).padStart(2, "0");
  let s = "";
  for (let i = 0; i < rows.length; i++) s += rows[i] ? enc(rows[i][0]) + enc(rows[i][1]) : "0000";
  return s || undefined;
}

function decodeSilhouette(sil){
  if (typeof sil !== "string" || !/^(?:[0-9a-z]{4}){1,120}$/.test(sil)) return null;
  const rows = [];
  for (let i = 0; i < sil.length; i += 4){
    const l = parseInt(sil.slice(i, i + 2), 36), r = parseInt(sil.slice(i + 2, i + 4), 36);
    if (l > r || r > W) return null;
    rows.push(r > l ? [l, r] : null);
  }
  return rows;
}

const MEDAL_TIER = {zero: "gold", retire: "gold", lucky: "gold", stacker: "gold", tycoon: "gold", steady: "silver"};
const tierOf = v => (v && MEDAL_TIER[v.id]) || "bronze";

function verdictOf(st, titles, stageCount = 4){
  const f = st.falls || {spend: 0, scam: 0, delay: 0};
  const t = st.troll || {};
  const tests = {
    diver: () => st.over === "drops" && st.stage === 0,
    scamvip: () => (f.scam || 0) >= 2,
    believer: () => (t.invest || 0) >= 2,
    future: () => (f.spend || 0) >= 2,
    tomorrow: () => (f.delay || 0) + (st.missed || 0) >= 2,
    scratch: () => !!t.ticketSeen && (t.tickets || 0) >= 2,
    zero: () => (f.spend || 0) + (f.scam || 0) + (f.delay || 0) === 0 && (st.wise || 0) >= 3,
    retire: () => st.stage === stageCount - 1,
    lucky: () => (st.jpAt ?? -1) >= 0,
    stacker: () => (st.best || 0) / FLOOR >= 12,
    tycoon: () => (st.score || 0) >= 30000,
    steady: () => (st.score || 0) > 0,
    moonlight: () => true
  };
  return (titles || []).find(item => tests[item.id] && tests[item.id]()) || (titles && titles[titles.length - 1]) || null;
}

function sanitizeName(n){
  const v = String(n || "").replace(/[\u0000-\u001f<>]/g, "").trim();
  return !v || v === ANON ? ANON : Array.from(v).slice(0, 16).join("");
}

const zhName = n => /[A-Za-z0-9]$/.test(n) ? n + " " : n;
const zhIn = n => /^[A-Za-z0-9]/.test(n) ? " " + n : n;

function parseChallenge({metaJson, search, storedJson, titles, isValidPersona}){
  let c = null;
  if (metaJson){ try { c = JSON.parse(metaJson); } catch(e){ c = null; } }
  if (!c && search){
    const q = new URLSearchParams(search), sr = q.get("s") || "";
    if (/^-?\d{1,7}$/.test(sr)) c = {s: Number(sr), n: q.get("n") || "", v: q.get("v") || "", p: q.get("p") || "", sil: q.get("sil") || ""};
  }
  if (!c && storedJson){ try { c = JSON.parse(storedJson); } catch(e){ c = null; } }
  if (!c || typeof c.s !== "number" || !Number.isFinite(c.s) || Math.abs(c.s) > 9999999) return null;
  const n = typeof c.n === "string" ? sanitizeName(c.n) : ANON;
  const p = typeof c.p === "string" && (!isValidPersona || isValidPersona(c.p)) ? c.p : "";
  const sil = typeof c.sil === "string" && decodeSilhouette(c.sil) ? c.sil : "";
  return {s: Math.round(c.s), n: n === ANON ? "" : n, v: (titles || []).find(x => x.id === c.v) || null, p, sil};
}

function aggregateStats(games, quizLen = 3, habitNowFn = x => x){
  const a = {games: games.length, wise: 0, risky: 0, missed: 0, falls: {spend: 0, scam: 0, delay: 0}, habits: {}, quizSum: 0, quizN: 0, quizPass: 0, sample: false};
  for (const gm of games){
    a.wise += +gm.wise || 0; a.risky += +gm.risky || 0; a.missed += +gm.missed || 0;
    if (gm.falls) for (const kk in a.falls) a.falls[kk] += +gm.falls[kk] || 0;
    const hb = gm.habit && (habitNowFn(gm.habit) || gm.habit);
    if (hb) a.habits[hb] = (a.habits[hb] || 0) + 1;
    const done = Array.isArray(gm.answers) ? gm.answers.length === quizLen : typeof gm.quiz === "number";
    if (done && typeof gm.quiz === "number"){ a.quizSum += gm.quiz; a.quizN++; if (gm.quiz >= 2) a.quizPass++; }
  }
  return a;
}

function mergeStats(a, b){
  const o = {...a, falls: {...a.falls}, habits: {...a.habits}};
  o.games += b.games; o.wise += b.wise; o.risky += b.risky; o.missed += b.missed;
  o.quizSum += b.quizSum; o.quizN += b.quizN; o.quizPass += b.quizPass || 0;
  for (const kk in o.falls) o.falls[kk] += b.falls[kk] || 0;
  for (const kk in b.habits) o.habits[kk] = (o.habits[kk] || 0) + b.habits[kk];
  return o;
}

root.TFF_CORE = {
  W, H, PW, FLOOR, WATER_Y, GAME_MS, CARD_MS, FIRST_CARD, CARD_GAP,
  SLOW_CARD_MS, RESULT_MS, STEP, FALL, WARMUP_MS, WARMUP_FROM,
  MAX_DROPS, DROP_GRACE_MS, ANCHOR_DEPTH, ANCHOR_REST,
  VINE_RARE, VINE_GRABS, MAX_FUSED, LOCK_RARE, LOCK_REST, NET_MS, NET_CATCHES, NET_Y,
  SLIME_RARE, SLIME_GRAB, SLIME_SPIN, JACKPOT_RARE, JACKPOT_BONUS, FRENZY_MS, FRENZY_X,
  SIL_ROW, SIL_ROWS, ANON, MEDAL_TIER,
  clamp, fmt, fmtShort, floorTxt, mmss, isoWeek, stageFor,
  hapticSegments, warmupFactor, fallSpeedFor, canTriggerDrop, shouldAnchorBody,
  computePayout, rollItemTrait, encodeSilhouette, decodeSilhouette,
  tierOf, verdictOf, sanitizeName, zhName, zhIn, parseChallenge, aggregateStats, mergeStats
};
})(typeof window !== "undefined" ? window : globalThis);
