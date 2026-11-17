// Opened over plain http (an old link, a typed address): move to https first, since the API saves over https only.
// Only on the site's own address (the canonical link), so local copies still run over http.
(() => { const home = /^https:\/\/([^/]+)/.exec((document.querySelector('link[rel="canonical"]') || {}).href || "");
  if (location.protocol === "http:" && home && (location.host === home[1] || location.host === "www." + home[1])){
    location.replace("https://" + location.host + location.pathname + location.search + location.hash); } })();
const {Engine, Bodies, Body, Composite, Events, Sleeping} = Matter;
const K = window.CLAY;
const CORE = window.TFF_CORE;
const {W, H, PW, FLOOR, WATER_Y, GAME_MS, CARD_MS, FIRST_CARD, CARD_GAP, SLOW_CARD_MS, RESULT_MS, STEP, FALL, WARMUP_MS, WARMUP_FROM,
  MAX_DROPS, DROP_GRACE_MS, ANCHOR_DEPTH, ANCHOR_REST, VINE_RARE, VINE_GRABS, MAX_FUSED, LOCK_RARE, LOCK_REST, NET_MS, NET_CATCHES, NET_Y,
  SLIME_RARE, SLIME_GRAB, SLIME_SPIN, JACKPOT_RARE, JACKPOT_BONUS, FRENZY_MS, FRENZY_X, SIL_ROW, SIL_ROWS, ANON, MEDAL_TIER,
  clamp, fmt, fmtShort, floorTxt, mmss, isoWeek, hapticSegments, fallSpeedFor, canTriggerDrop, shouldAnchorBody, computePayout, rollItemTrait,
  encodeSilhouette, decodeSilhouette, tierOf, sanitizeName, zhName, zhIn, parseChallenge, aggregateStats, mergeStats} = CORE;

// ---------- audio (safe even if audio.js is missing) ----------
const NOOP = () => {};
const GA = window.GameAudio;
const A = {
  unlock(){ try { GA && GA.unlock(); } catch(e){} },
  sfx(n, o){ try { GA && GA.sfx(n, o); } catch(e){} },
  impact(m, s, p){ try { GA && GA.impact(m, s, p); } catch(e){} },
  mode(m){ try { GA && GA.music.setMode(m); } catch(e){} },
  stage(n){ try { GA && GA.music.setStage(n); } catch(e){} },
  start(){ try { GA && GA.music.start(); } catch(e){} },
  suspend(){ try { GA && GA.suspend(); } catch(e){} },
  resume(){ try { GA && GA.resume(); } catch(e){} },
  muted(){ try { return GA ? GA.isMuted() : false; } catch(e){ return false; } },
  toggle(){ try { return GA ? GA.toggleMute() : false; } catch(e){ return false; } }
};
let iosHapticEl = null, iosHapticAt = 0;
function triggerIosHaptic(){
  const now = performance.now();
  if (now - iosHapticAt < 40) return;
  iosHapticAt = now;
  if (!iosHapticEl && document.body){
    const lbl = document.createElement("label");
    lbl.setAttribute("aria-hidden", "true");
    lbl.inert = true;
    lbl.style.cssText = "position:fixed;left:-9999px;top:-9999px;opacity:0;pointer-events:none";
    const inp = document.createElement("input");
    inp.type = "checkbox";
    inp.setAttribute("switch", "");
    inp.tabIndex = -1;
    lbl.appendChild(inp);
    lbl.addEventListener("click", e => e.stopPropagation());
    document.body.appendChild(lbl);
    iosHapticEl = lbl;
  }
  if (iosHapticEl) iosHapticEl.click();
}
function haptic(ms, strong = 0.5, weak = 0.5){
  if (reduceMotion || A.muted()) return;
  const st = clamp(strong, 0, 1), wk = clamp(weak, 0, 1), mag = Math.max(st, wk);
  try { if (navigator.vibrate) navigator.vibrate(ms); } catch(e){}
  try {
    if (typeof IOS !== "undefined" && IOS && !navigator.vibrate && typeof audioOn !== "undefined" && audioOn){
      triggerIosHaptic();
      if (Array.isArray(ms) && ms.length >= 3 && st >= 0.45){
        setTimeout(() => { if (!reduceMotion && !A.muted()) triggerIosHaptic(); }, Math.min(220, (ms[0] || 20) + (ms[1] || 30)));
      }
    }
  } catch(e){}
  try {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    const segs = hapticSegments(ms);
    if (!segs.length) return;
    const runSegs = fn => segs.forEach(s => s.delay > 0 ? setTimeout(() => fn(s.dur), s.delay) : fn(s.dur));
    for (const gp of pads){
      if (!gp || !gp.connected) continue;
      const act = gp.vibrationActuator, ha = Array.isArray(gp.hapticActuators) ? gp.hapticActuators[0] : null;
      if (act && typeof act.playEffect === "function"){
        runSegs(dur => act.playEffect(act.type || "dual-rumble", {startDelay: 0, duration: dur, strongMagnitude: st, weakMagnitude: wk}).catch(() => {}));
      } else {
        const pulser = (act && typeof act.pulse === "function") ? act : ha;
        if (pulser && typeof pulser.pulse === "function") runSegs(dur => Promise.resolve(pulser.pulse(mag, dur)).catch(() => {}));
      }
    }
  } catch(e){}
}

// ---------- world ----------
const {STAGES, TRAPS, CARDS, QUIZ, HABITS, ACTS, ACT_OF_STAGE, POWERS, POWER_OF_TRAP, HATS} = window.TFF_CONTENT;   // src/content.js
const QUIPS = window.TFF_CONTENT.QUIPS || {};
const TITLES = window.TFF_CONTENT.TITLES || [];   // 稱號: the verdict title for each game
const LATER_NONE = window.TFF_CONTENT.LATER_NONE || [], ENDINGS = window.TFF_CONTENT.ENDINGS || [];   // the story: a timed-out card, and how a life ends
const CARD_BY = new Map(CARDS.map(c => [c.id, c]));
let CHAL = null;   // a friend's challenge this visit came with: {s: score, n: nickname, v: title} (see "a friend's challenge")
const TOP_AT = 22;   // the top of the Retirement bar in the directory (Retirement starts at 15F)

const SHOCKS = [
  ["Laid off for two months","失業兩個月"],
  ["Medical bill: HK$20,000","醫藥費 HK$20,000"],
  ["Phone stolen, need a new one","手機畀人偷咗，要買過部"],
  ["A family member needs money","屋企人要你幫補"]
];

const DEFS = window.ITEM_DEFS || [];
const POOLS = {wise: DEFS.filter(d => d.kind === "wise" && !d.jackpot), risky: DEFS.filter(d => d.kind === "risky"), scam: DEFS.filter(d => d.kind === "scam")};
const DEBT = DEFS.find(d => d.kind === "debt") || DEFS.find(d => d.id === "debt");
const JACKPOT = DEFS.find(d => d.jackpot);
if (!POOLS.risky.length) POOLS.risky = POOLS.wise.slice();
if (!POOLS.scam.length) POOLS.scam = POOLS.risky.slice();

// ---------- helpers ----------
const $ = id => document.getElementById(id);
const PRON = {jack: {name:"Jack", he:"he", He:"He", him:"him", his:"his", His:"His"}, jackie: {name:"Jackie", he:"she", He:"She", him:"her", his:"her", His:"Her"}};
const tell = (s, extra) => String(s).replace(/\{(\w+)\}/g, (m, k) => extra && k in extra ? extra[k] : (PRON[WHO] || PRON.jack)[k] ?? m);
const laterOf = (c, pick, n) => pick === "none" ? (LATER_NONE.length ? LATER_NONE[n % LATER_NONE.length] : null) : (c.later && c.later[pick === "wise" ? "w" : "r"]) || null;
const stageFor = floors => CORE.stageFor(floors, STAGES);
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
function lsGet(k, d){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch(e){ return d; } }
function lsSet(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
const ssGet = k => { try { return sessionStorage.getItem(k); } catch(e){ return null; } }, ssSet = (k, v) => { try { sessionStorage.setItem(k, v); } catch(e){} };
const gfxForceHigh = /[?&]gfx=high(&|$)/.test(location.search), gfxForceLow = /[?&]gfx=low(&|$)/.test(location.search);
let lowGfx = !gfxForceHigh && (gfxForceLow || ssGet("tff_low_gfx") === "1" || (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 2) || (navigator.deviceMemory > 0 && navigator.deviceMemory <= 2));
if (lowGfx) document.documentElement.classList.add("low-gfx");
let perfAvg = 16.7, perfN = 0, perfBad = 0;
function enableLowGfx(){
  if (lowGfx) return;
  lowGfx = true;
  document.documentElement.classList.add("low-gfx");
  ssSet("tff_low_gfx", "1");
  if (DPR > 1){ lastFit = ""; resize(); dropCaches(); }
}
function checkPerf(raw){
  if (lowGfx || gfxForceHigh || document.hidden || raw <= 0 || raw > 200) return;
  const active = (S && S.mode === "playing" && S.play > 1500) || (document.documentElement.classList.contains("title") && !(window.TFF_INTRO && TFF_INTRO.on()));
  if (!active) return;
  perfN++;
  perfAvg = perfAvg * 0.92 + raw * 0.08;
  perfBad = raw > 28 ? perfBad + 2 : raw < 20 ? Math.max(0, perfBad - 1) : perfBad;
  if (perfBad >= 36 || (perfN >= 45 && perfAvg > 28)) enableLowGfx();
}
// Screen readers read Chinese with an English voice unless it's marked, so every run of Chinese text on the page
// is wrapped in lang="zh-HK" as it appears. Numbers and short codes inside a Chinese phrase (HK$3,600, 18222)
// stay with it, and so does an opening 「 before it; English words don't.
const ZH_RUN = /[「『（]*\p{Script=Han}(?:[\p{Script=Han}、。「」『』（）！？：；，～…]|(?:[0-9$%.,:/+×~\- ]|[A-Za-z](?![A-Za-z]{2})){1,14}(?=[\p{Script=Han}「『（！？。，、：；」』）]))*[、。」』）！？：；，～…]*/gu;
const HAS_HAN = /\p{Script=Han}/u;
function markZh(root){
  if (!root || (root.nodeType !== 1 && root.nodeType !== 11)) return;
  const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), todo = [];
  for (let n = walk.nextNode(); n; n = walk.nextNode()){
    const p = n.parentElement, l = p && p.closest("[lang]");
    if (p && HAS_HAN.test(n.data) && !/^(SCRIPT|STYLE|TEXTAREA|TITLE)$/.test(p.tagName) && (!l || l.lang === "en")) todo.push(n);
  }
  for (const n of todo){
    const parts = []; let at = 0;
    for (const m of n.data.matchAll(ZH_RUN)){
      if (m.index > at) parts.push(n.data.slice(at, m.index));
      const sp = document.createElement("span"); sp.lang = "zh-HK"; sp.textContent = m[0]; parts.push(sp); at = m.index + m[0].length;
    }
    if (at < n.data.length) parts.push(n.data.slice(at));
    n.replaceWith(...parts);
  }
}
const ZH_WATCH = {childList: true, subtree: true, characterData: true};
const zhWatch = new MutationObserver(list => {
  zhWatch.disconnect();
  for (const m of list){
    if (m.type === "characterData") markZh(m.target.parentNode);
    else for (const n of m.addedNodes) markZh(n.nodeType === 3 ? n.parentNode : n);
  }
  zhWatch.observe(document.body, ZH_WATCH);
});
let slowRead = !!lsGet("tff_slow_read", false);   // card timer set to 30 s (start and pause cards)
const cardMs = () => slowRead ? SLOW_CARD_MS : CARD_MS;
const ICON = {spend:"i-spend", scam:"i-scam", delay:"i-delay"};
const svgUse = (id, cls) => { const s = document.createElementNS("http://www.w3.org/2000/svg", "svg"); s.setAttribute("viewBox", "0 0 32 32"); s.setAttribute("aria-hidden", "true"); if (cls) s.setAttribute("class", cls);
  const u = document.createElementNS("http://www.w3.org/2000/svg", "use"); u.setAttribute("href", "#" + id); s.appendChild(u); return s; };

