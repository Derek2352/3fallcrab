(() => {
"use strict";
const {Engine, Bodies, Body, Composite, Events, Sleeping} = Matter;
const K = window.CLAY;

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

// ---------- world ----------
const W = 440, H = 700, PW = 270, FLOOR = 50, WATER_Y = 120;
const GAME_MS = 180000, CARD_MS = 10000, FIRST_CARD = 15000, CARD_GAP = 24000;
const SLOW_CARD_MS = 30000, RESULT_MS = 12000;   // Extra reading time: 30 s per card, results wait for Continue
const STEP = 1000 / 60;
const FALL = [1.5, 1.8, 2.1, 2.4];
const MAX_DROPS = 3;

const {STAGES, TRAPS, CARDS, QUIZ, HABITS} = window.TFF_CONTENT;   // src/content.js
const QUIPS = window.TFF_CONTENT.QUIPS || {};
const TOP_AT = 14;

const SHOCKS = [
  ["Laid off for two months","失業兩個月"],
  ["Medical bill: HK$20,000","醫藥費 HK$20,000"],
  ["Phone stolen, need a new one","手機畀人偷咗，要買過部"],
  ["A family member needs money","屋企人要你幫補"]
];

const DEFS = window.ITEM_DEFS || [];
const POOLS = {wise: DEFS.filter(d => d.kind === "wise"), risky: DEFS.filter(d => d.kind === "risky"), scam: DEFS.filter(d => d.kind === "scam")};
const DEBT = DEFS.find(d => d.kind === "debt") || DEFS.find(d => d.id === "debt");
if (!POOLS.risky.length) POOLS.risky = POOLS.wise.slice();
if (!POOLS.scam.length) POOLS.scam = POOLS.risky.slice();

// ---------- helpers ----------
const $ = id => document.getElementById(id);
const fmt = n => (n < 0 ? "−" : "") + "HK$" + Math.abs(Math.round(n)).toLocaleString("en-US");
const fmtShort = n => Math.abs(Math.round(n)).toLocaleString("en-US");
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function isoWeek(d){
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = t.getUTCDay() || 7; t.setUTCDate(t.getUTCDate() + 4 - day);
  const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return t.getUTCFullYear() + "-W" + String(Math.ceil(((t - y0) / 86400000 + 1) / 7)).padStart(2, "0");
}
function stageFor(floors){ let s = 0; STAGES.forEach((st, i) => { if (floors >= st.at) s = i; }); return s; }
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
function lsGet(k, d){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch(e){ return d; } }
function lsSet(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
const mmss = ms => { const s = Math.floor(ms / 1000); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
// Screen readers read Chinese with an English voice unless it's marked, so every run of Chinese text on the page
// is wrapped in lang="zh-HK" as it appears. Numbers and short codes inside a Chinese phrase (HK$3,600, 18222)
// stay with it; English words don't.
const ZH_RUN = /\p{Script=Han}(?:[\p{Script=Han}、。「」『』（）！？：；，～…]|(?:[0-9$%.,:/+×~\- ]|[A-Za-z](?![A-Za-z]{2})){1,14}(?=[\p{Script=Han}「『（！？。，、：；」』）]))*[、。」』）！？：；，～…]*/gu;
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

// ---------- state ----------
let S, engine, platform;
function newState(){
  return {active:null, targetAngle:0, queue:[], hold:null, canHold:true, scamLock:0, forced:{type:null, n:0}, lastId:null,
    score:0, rate:1, fund:0, falls:{spend:0, scam:0, delay:0}, drops:0, choices:[], wise:0, risky:0, missed:0,
    height:0, best:0, bestFloor:0, stage:0, play:0, acc:0, spawnAt:0, nextEvent:FIRST_CARD, shocks:[60000, 125000],
    speedUntil:0, fastOn:false, quakeUntil:0, pendingDebt:0, used:new Set(), mode:"idle", card:null, cardCount:0, over:null, posted:false,
    quiz:[null, null, null], camTop:-(H - 240), shake:0, splashes:[], dragX:null, steps:0, ledger:[], warned:false,
    mood:{type:"idle", until:0}, lastImpact:new Map(), grabs:[], leaves:[], habit:null, rec:null,
    said:new Set(), streak:0, wiseRun:0, afterCard:null, overKey:null, pb:0};
}
function makeEngine(){
  engine = Engine.create({enableSleeping:true});
  engine.positionIterations = 12; engine.velocityIterations = 10;
  platform = Bodies.rectangle(W/2, 15, PW, 30, {isStatic:true, friction:1, frictionStatic:2, restitution:0, chamfer:{radius:6}, label:"platform"});
  Composite.add(engine.world, platform);
  Events.on(engine, "collisionStart", ev => {
    if (!S) return;
    for (const p of ev.pairs){
      const a = p.bodyA.parent, b = p.bodyB.parent;
      if (S.active && (a === S.active || b === S.active)) release(false);
      if (a.tff) a.tff.capFall = 0; if (b.tff) b.tff.capFall = 0;
      const ia = itemOfPart(p.bodyA), ib = itemOfPart(p.bodyB);
      if (ia && ib && ia !== ib && (ia.tff.vine || ib.tff.vine)) queueGrab(ia, ib, p);
      // impact sound from the normal relative speed
      const n = p.collision && p.collision.normal; if (!n) continue;
      const rv = (a.velocity.x - b.velocity.x) * n.x + (a.velocity.y - b.velocity.y) * n.y;
      const st = clamp((Math.abs(rv) - 0.7) / 6, 0, 1); if (st < 0.06) continue;
      const loud = (a.isStatic ? b : (b.isStatic ? a : (a.mass > b.mass ? a : b)));
      const key = loud.id, now = S.steps;
      if ((S.lastImpact.get(key) || -99) > now - 6) continue; S.lastImpact.set(key, now);
      const mat = (a.isStatic || b.isStatic) && st > 0.5 ? "platform" : ((loud.plugin && loud.plugin.material) || "card");
      A.impact(mat, st, clamp(((a.position.x + b.position.x) / 2) / W * 2 - 1, -1, 1));
    }
  });
}
function addItem(def, x, y, player){
  const b = K.shape.fixInertia(def.make(x, y));   // again here: some items rebuild their parts after shape.body()
  b.tff = {def, player, released:!player, settled:false, at:S.play, eo:{x: x - b.position.x, y: y - b.position.y}, vine: !!def.vine, parts: ownParts(b)};
  for (const pt of b.tff.parts){ pt.plugin = pt.plugin || {}; pt.plugin.item = b; }
  Composite.add(engine.world, b);
  return b;
}
function genItem(){
  let pool;
  if (S.forced.n > 0){ S.forced.n--; pool = POOLS[S.forced.type]; }
  else pool = Math.random() < 0.6 ? POOLS.wise : POOLS.risky;
  let it, guard = 0;
  do { it = pool[Math.floor(Math.random() * pool.length)]; } while (pool.length > 1 && it.id === S.lastId && guard++ < 10);
  S.lastId = it.id;
  return it.kind !== "scam" && Math.random() < VINE_RARE ? vineOf(it) : it;
}
function refill(){ while (S.queue.length < 3) S.queue.push(genItem()); }
function spawn(def){
  S.active = addItem(def, W/2, S.camTop + 85, true); S.targetAngle = 0; A.sfx("spawn");
  if (def.vine){ A.sfx("vineGet"); stamp("Vine-wrapped! It sticks where it lands", "藤蔓物件：掂到就黐住", "good"); }
}
function nextPiece(){ refill(); const it = S.queue.shift(); refill(); spawn(it); S.canHold = true; drawPreviews(); prewarm(); }
function prewarm(){   // pictures the next few seconds will need, made in spare time: the coming items upright
  for (const d of S.queue) wantSprite(d, 0, 1);
  if (S.hold) wantSprite(S.hold, 0, 1);
}
// The next game's first items are picked while the start card or the statement is showing, and their pictures
// made then, so pressing Start or Play again doesn't stutter.
let firstQueue = null;
function planFirst(){   // picked as a fresh game would: the last game's forced run (after a card) doesn't carry over
  const keep = S.forced, keepId = S.lastId; S.forced = {type: null, n: 0}; S.lastId = null;
  firstQueue = [genItem(), genItem(), genItem()];
  S.forced = keep; S.lastId = keepId;
  firstQueue.forEach(d => wantSprite(d, 0, 1));
}
function release(hard){
  const b = S.active; if (!b) return;
  S.active = null; b.tff.released = true; b.tff.at = S.play;
  if (hard){ Body.setVelocity(b, {x: b.velocity.x * 0.3, y: HARD_DROP}); b.tff.capFall = HARD_DROP; A.sfx("harddrop"); }
  S.spawnAt = S.play + 420;
}
function doHold(){
  if (S.mode !== "playing" || !S.active || !S.canHold) return;
  if (S.scamLock > 0){ stamp("Hold locked", "被呃咗，暫存用唔到", "bad"); return; }
  const def = S.active.tff.def; Composite.remove(engine.world, S.active); S.active = null;
  if (S.hold){ const h = S.hold; S.hold = def; spawn(h); } else { S.hold = def; nextPiece(); }
  S.canHold = false; A.sfx("hold"); drawPreviews(); prewarm();
}
function fallSpeed(){ let f = FALL[S.stage]; if (S.play < S.speedUntil) f *= 1.7; return f; }
function dropDebt(){
  if (!DEBT) return;
  const b = addItem(DEBT, W/2 + (Math.random() * 120 - 60), S.camTop + 40, false);
  Body.setVelocity(b, {x: 0, y: 4}); Body.setAngularVelocity(b, (Math.random() - .5) * 0.08);
  A.sfx("debt"); stamp("Debt incoming!", "債務跌緊落嚟！", "bad");
}
function control(){
  const b = S.active; if (!b) return;
  let vx;
  if (S.dragX !== null) vx = clamp((S.dragX - b.position.x) * 0.3, -7, 7);
  else vx = ((keys.right ? 1 : 0) - (keys.left ? 1 : 0)) * 4.5;
  if (b.bounds.min.x < 6 && vx < 0) vx = 0;
  if (b.bounds.max.x > W - 6 && vx > 0) vx = 0;
  if (Math.abs(vx) > 0.5) A.sfx("move");
  Body.setVelocity(b, {x: vx, y: Math.min(fallSpeed() * (softHeld ? 4 : 1), MAX_SOFT)});
  Body.setAngularVelocity(b, 0);
  const da = S.targetAngle - b.angle;
  if (Math.abs(da) > 0.0005) Body.setAngle(b, b.angle + Math.sign(da) * Math.min(Math.abs(da), 0.22));
  Sleeping.set(b, false);
}
// One physics step with two safety nets. A hard-dropped item falls at a steady speed until it first touches
// something (fast impacts sink into thin parts and get shoved out hard). And nothing may spin or fly faster
// than a real knock could make it; in normal play neither limit is reached (stress-tested: peak 0.18 rad and
// 14 px per step), they only catch rare solver blow-ups.
const MAX_SOFT = 10, HARD_DROP = 11, MAX_SPIN = 0.3, MAX_SPEED = 22;
// Physics runs in fixed 60 Hz steps but frames come at the screen's own rate (60, 90 or 120 Hz, never exactly
// even). Each item remembers where it was before the latest step and every frame draws it part of the way from
// there (ALPHA: the share of a step that has passed), so things move a little on every frame instead of
// jumping on some and standing still on others.
let ALPHA = 1;
function snap(){
  for (const b of engine.world.bodies) if (b.tff){ const p = b.tff.prev || (b.tff.prev = {x: 0, y: 0, a: 0}); p.x = b.position.x; p.y = b.position.y; p.a = b.angle; }
}
function lerpPose(B){
  const p = B.tff && B.tff.prev;
  if (!p || ALPHA >= 1) return {x: B.position.x, y: B.position.y, a: B.angle};
  return {x: p.x + (B.position.x - p.x) * ALPHA, y: p.y + (B.position.y - p.y) * ALPHA, a: p.a + (B.angle - p.a) * ALPHA};
}
function drawPose(m){   // where an item is drawn this frame: a fused item goes with its group's drawn pose
  const H = m.tff && m.tff.hostBody;
  if (!H) return lerpPose(m);
  const hp = lerpPose(H), c = Math.cos(hp.a), s = Math.sin(hp.a), r = m.tff.rel;
  return {x: hp.x + r.x * c - r.y * s, y: hp.y + r.x * s + r.y * c, a: hp.a + r.a};
}
function worldStep(){
  for (const b of engine.world.bodies)
    if (b.tff && b.tff.capFall && b.velocity.y > b.tff.capFall) Body.setVelocity(b, {x: b.velocity.x, y: b.tff.capFall});
  Engine.update(engine, STEP); S.steps++;
  if (S.grabs.length) processGrabs();
  for (const b of engine.world.bodies){
    if (!b.tff || b === S.active || b.isSleeping) continue;
    if (Math.abs(b.angularVelocity) > MAX_SPIN) Body.setAngularVelocity(b, Math.sign(b.angularVelocity) * MAX_SPIN);
    if (b.speed > MAX_SPEED) Body.setVelocity(b, {x: b.velocity.x * MAX_SPEED / b.speed, y: b.velocity.y * MAX_SPEED / b.speed});
  }
}
function physicsStep(){
  snap(); control();
  if (S.play < S.quakeUntil){
    const k = Math.sin(S.play / 65);
    for (const b of engine.world.bodies){
      if (!b.tff || b === S.active || b.isStatic) continue;
      Sleeping.set(b, false); Body.applyForce(b, b.position, {x: k * b.mass * 0.00075, y: 0});
    }
  }
  worldStep();
  let h = 0;
  for (const b of engine.world.bodies.slice()){
    if (!b.tff) continue;
    if (b.position.y > WATER_Y + 40){
      Composite.remove(engine.world, b);
      S.splashes.push({x: b.position.x, t: 0, big: b.mass > 8});
      A.sfx("splash");
      if (b === S.active){ S.active = null; S.spawnAt = S.play + 300; }
      for (const m of membersOf(b)){
        if (!m.tff.player) continue;
        S.drops++; const loss = Math.min(S.score, 1000); S.score -= loss;
        ledger(m.tff.def, -loss, "跌落海");
        mood("cover", 1600);
        stamp(m.tff.def.en + " fell in!", "跌咗落海 " + S.drops + "/" + MAX_DROPS, "bad");
        S.streak = 0; if (S.drops === MAX_DROPS - 1) quip("lastDrop", 3); else if (S.drops < MAX_DROPS) quip("drop", 2);
        updateHUD();
        if (S.drops >= MAX_DROPS){ endGame("drops"); return; }
      }
      continue;
    }
    if (b === S.active || !b.tff.released) continue;
    const still = b.speed < 0.35 && b.angularSpeed < 0.03 && b.position.y < 5;
    b.tff.restN = still ? (b.tff.restN || 0) + 1 : 0;
    const resting = b.tff.restN >= 30;
    for (const m of membersOf(b)){
      if (!m.tff.player || m.tff.settled || !resting || S.play - m.tff.at <= 450) continue;
      m.tff.settled = true;
      const k = m.tff.def.kind, base = k === "wise" ? 500 : k === "risky" ? 300 : 0;
      if (base){ const gain = Math.round(base * S.rate / 10) * 10; S.score += gain; ledger(m.tff.def, gain); A.sfx("deposit", {amount: gain}); updateHUD(); }
      if (++S.streak % 4 === 0) quip("steady", 1);   // every 4 items landed in a row without a drop
    }
    if (resting && S.play - b.tff.at > 300) h = Math.max(h, -b.bounds.min.y);
  }
  S.height = h;
  if (h > S.best){
    S.best = h;
    const f = Math.floor(h / FLOOR);
    while (f > S.bestFloor){
      S.bestFloor++;
      const gain = Math.round(2000 * S.rate / 10) * 10; S.score += gain;
      ledger({zh: "第" + S.bestFloor + "層", en: "Floor " + S.bestFloor}, gain);
      A.sfx("floor", {floor: S.bestFloor}); mood("happy", 1200);
      stamp("Floor " + S.bestFloor + " +" + fmt(gain), "第" + S.bestFloor + "層", "good"); quip("floor", 1);
    }
    const ns = stageFor(S.best / FLOOR);
    if (ns > S.stage){
      S.stage = ns; const st = STAGES[ns];
      A.sfx(ns === STAGES.length - 1 ? "win" : "stage", {stage: ns}); A.stage(ns);
      stamp(st.en, st.zh, "gold"); quip("stage" + ns, 3);
      crab("Welcome to " + st.en + ". Items fall faster from here.", "去到「" + st.zh + "」喇！由而家起，啲嘢會跌得快啲。");
    }
    updateHUD();
  }
}

// ---------- vines ----------
// Now and then (and as the reward for a wise answer) an item comes wrapped in vines. A vine-wrapped item grabs
// any block it touches: the two are fused into one rigid compound body right after the physics step. (A joint
// between them would fight the collision solver: stress-tested, joints left welded items creeping ~60% of the
// time; fusing keeps them as still as unwelded ones.) Each item keeps its own sprite, drawn from its pose
// relative to the fused body, and the vine visibly creeps onto whatever it grabbed.
const VINE_RARE = 0.05, VINE_GRABS = 4, MAX_FUSED = 8;
const vineDefs = new Map();
function vineOf(def){
  if (!def || def.vine || def.kind === "debt") return def;
  let v = vineDefs.get(def.id);
  if (!v){
    v = Object.create(def);
    Object.assign(v, {id: def.id + "~vine", vine: true, base: def,
      en: "Vine-wrapped " + (/^[A-Z][a-z]/.test(def.en) ? def.en[0].toLowerCase() + def.en.slice(1) : def.en),
      zh: "藤蔓" + def.zh,
      draw(g){ def.draw(g); drawVineWrap(g, def); }});
    vineDefs.set(def.id, v);
  }
  return v;
}
function ownParts(b){ return b.parts.length > 1 ? b.parts.slice(1) : [b]; }
function membersOf(body){ return (body.tff && body.tff.members) || [body]; }
function hostOf(item){ return item.tff.hostBody || item; }
function itemOfPart(part){ const it = part.plugin && part.plugin.item; return it && it.tff ? it : null; }
function poseOf(m){
  const H = m.tff && m.tff.hostBody;
  if (!H) return {x: m.position.x, y: m.position.y, a: m.angle};
  const c = Math.cos(H.angle), s = Math.sin(H.angle), r = m.tff.rel;
  return {x: H.position.x + r.x * c - r.y * s, y: H.position.y + r.x * s + r.y * c, a: H.angle + r.a};
}
function queueGrab(ia, ib, pair){
  const sp = pair.collision && pair.collision.supports && pair.collision.supports[0];
  const pa = poseOf(ia), pb = poseOf(ib), pre = new Map();
  // how both sides moved just before they touched: this runs before the step's contact forces, so a block
  // resting in the tower is still at rest here, not yet knocked by the item hitting it
  for (const h of [hostOf(ia), hostOf(ib)]) pre.set(h, {v: Body.getVelocity(h), w: Body.getAngularVelocity(h)});
  S.grabs.push({ia, ib, x: sp ? sp.x : (pa.x + pb.x) / 2, y: sp ? sp.y : (pa.y + pb.y) / 2, pre});
}
function processGrabs(){
  const list = S.grabs; S.grabs = [];
  for (const g of list){
    const vm = g.ia.tff.vine ? g.ia : g.ib, other = vm === g.ia ? g.ib : g.ia;
    if (other.tff.def.kind === "debt") continue;                       // vines can't hold the iron debt ball
    const HA = hostOf(g.ia), HB = hostOf(g.ib);
    if (HA === HB || HA === S.active || HB === S.active) continue;
    if (!engine.world.bodies.includes(HA) || !engine.world.bodies.includes(HB)) continue;
    if ((vm.tff.grabs || 0) >= VINE_GRABS || membersOf(HA).length + membersOf(HB).length > MAX_FUSED) continue;
    vm.tff.grabs = (vm.tff.grabs || 0) + 1;
    fuse(HA, HB, g.pre);
    addMark(other, g.x, g.y); if (other.tff.vine) addMark(vm, g.x, g.y);   // the vine creeps onto what it grabbed
    burst(g.x, g.y);
    A.sfx("vine", {pan: clamp(g.x / W * 2 - 1, -1, 1)});
    if (vm.tff.player && !vm.tff.stuckOnce){ vm.tff.stuckOnce = true; stamp("Vines grab on!", "藤蔓黐住咗！", "good"); }
  }
}
function fuse(A1, B1, pre){
  const mem = membersOf(A1).concat(membersOf(B1)), poses = mem.map(poseOf);
  // The vines catch the moving item: the group carries on as the stiller side moved just before they touched
  // (usually a block resting in the tower). Averaged momentum, or the knock that block took from the impact,
  // shoved whole groups across the platform.
  const motion = b => (pre && pre.get(b)) || {v: Body.getVelocity(b), w: Body.getAngularVelocity(b)};
  const stir = m => Math.hypot(m.v.x, m.v.y) + Math.abs(m.w) * 30, ma = motion(A1), mb = motion(B1);
  const {v, w} = stir(ma) <= stir(mb) ? ma : mb;
  const heavy = A1.mass >= B1.mass ? A1 : B1;
  Composite.remove(engine.world, [A1, B1]);
  const H = Body.create({parts: mem.flatMap(m => m.tff.parts), friction: Math.max(A1.friction, B1.friction),
    frictionStatic: Math.max(A1.frictionStatic, B1.frictionStatic), restitution: Math.min(A1.restitution, B1.restitution), frictionAir: Math.max(A1.frictionAir, B1.frictionAir)});
  K.shape.fixInertia(H);
  Body.setVelocity(H, v);
  Body.setAngularVelocity(H, clamp(w, -MAX_SPIN, MAX_SPIN));
  H.plugin = {material: (heavy.plugin && heavy.plugin.material) || "card"};
  H.tff = {host: true, members: mem, released: true, at: S.play, restN: 0};
  mem.forEach((m, i) => { const p = poses[i]; m.tff.hostBody = H; m.tff.rel = {x: p.x - H.position.x, y: p.y - H.position.y, a: p.a - H.angle}; });
  for (const part of H.parts) part.isSleeping = false;   // a sleeping item's flag would stick to it as a part
  Composite.add(engine.world, H);
  // Matter keeps each touching pair of parts with the bodies they belonged to when the touch began, and pushes
  // the contact forces onto those bodies. Repoint every pair at the fused body, or nothing the group already
  // rested on would hold it up or grip it: it sank into the platform and skidded. Contacts are rebuilt too,
  // since they are keyed by the old body's outline.
  for (const pair of engine.pairs.list){
    const col = pair.collision;
    if (col.parentA === col.bodyA.parent && col.parentB === col.bodyB.parent) continue;
    col.parentA = col.bodyA.parent; col.parentB = col.bodyB.parent; pair.contacts = [];
  }
  return H;
}
function addMark(m, x, y){
  const p = poseOf(m), c = Math.cos(-p.a), s = Math.sin(-p.a), dx = x - p.x, dy = y - p.y;
  const lx = dx * c - dy * s, ly = dx * s + dy * c;
  (m.tff.marks = m.tff.marks || []).push({x: lx, y: ly, dir: Math.atan2(-ly, -lx), born: S.steps, seed: (S.steps * 7 + m.id * 13) % 997});
  if (m.tff.marks.length > 4) m.tff.marks.shift();
}
function burst(x, y){
  S.leaves.push({ring: true, x, y, t: 0});
  if (reduceMotion) return;
  for (let i = 0; i < 10; i++){
    const a = Math.random() * Math.PI * 2, v = 1.2 + Math.random() * 2.2;
    S.leaves.push({x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1.2, a: Math.random() * 6.3, va: (Math.random() - 0.5) * 0.3, t: 0, col: i % 3 ? "#4CC36A" : "#B5E04A"});
  }
}
function drawLeaf(c, x, y, ang, len, col){
  if (len <= 0.3) return;
  c.save(); c.translate(x, y); c.rotate(ang);
  c.fillStyle = col || "#4CC36A"; c.beginPath(); c.moveTo(0, 0);
  c.quadraticCurveTo(len * 0.5, -len * 0.5, len, 0); c.quadraticCurveTo(len * 0.5, len * 0.5, 0, 0); c.fill();
  c.strokeStyle = "rgba(30,90,45,0.55)"; c.lineWidth = Math.max(0.4, len * 0.1); c.beginPath(); c.moveTo(0, 0); c.lineTo(len * 0.82, 0); c.stroke();
  c.fillStyle = "rgba(255,255,255,0.4)"; c.beginPath(); c.ellipse(len * 0.42, -len * 0.15, len * 0.2, len * 0.07, 0, 0, 7); c.fill();
  c.restore();
}
// creeping vines on a fused body: drawn over all its items and clipped to their combined outline, so the tendrils
// cross the joint from the vine-wrapped item onto the block it grabbed but never hang in the air
function drawMarks(c, H, T){
  let path = null;
  for (const m of H.tff.members){
    const marks = m.tff.marks; if (!marks || !marks.length) continue;
    if (!path){
      path = new Path2D();
      for (const part of H.parts.slice(1)){ part.vertices.forEach((v, i) => i ? path.lineTo(v.x, v.y) : path.moveTo(v.x, v.y)); path.closePath(); }
      // outline and marks sit at the group's latest physics pose: carry them to where the group is drawn this frame
      const d = lerpPose(H);
      c.save(); c.translate(d.x, d.y); c.rotate(d.a - H.angle); c.translate(-H.position.x, -H.position.y);
      c.clip(path); c.lineCap = "round"; c.lineJoin = "round";
    }
    const p = poseOf(m);
    c.save(); c.translate(p.x, p.y); c.rotate(p.a);
    for (const k of marks){
      const g = clamp((T - k.born) / 50, 0, 1), e = 1 - Math.pow(1 - g, 3), N = 10;
      for (let j = 0; j < 4; j++){
        const rr = ((k.seed * (j + 3) * 9301 + 49297) % 233280) / 233280;
        let ang = k.dir + (j - 1.5) * 0.62 + (rr - 0.5) * 0.35;
        const curl = (j % 2 ? 1 : -1) * (0.8 + rr * 0.9), len = (30 + rr * 22) * e;
        let x = k.x - Math.cos(ang) * 5, y = k.y - Math.sin(ang) * 5; const pts = [[x, y, ang]];   // starts just across the joint
        for (let i = 1; i <= N; i++){ ang += curl / N; x += Math.cos(ang) * len / N; y += Math.sin(ang) * len / N; pts.push([x, y, ang]); }
        for (const [w, col, off] of [[4.4, "#2B6E36", 0], [3, "#4CC36A", 0], [1.1, "rgba(215,255,195,0.85)", -0.6]]){
          c.strokeStyle = col;
          for (let i = 1; i <= N; i++){
            c.lineWidth = w * (1 - 0.55 * i / N); c.beginPath();
            c.moveTo(pts[i - 1][0] + off, pts[i - 1][1] + off); c.lineTo(pts[i][0] + off, pts[i][1] + off); c.stroke();
          }
        }
        for (const [t, side] of [[0.35, 1], [0.65, -1], [0.92, 1]]){        // leaves pop out as the tendril passes
          if (e < t + 0.04) continue;
          const q = pts[Math.round(t * N)];
          drawLeaf(c, q[0], q[1], q[2] + side * 1.0, 6 * Math.min(1, (e - t) * 6), side > 0 ? "#4CC36A" : "#7DD35E");
        }
      }
      c.fillStyle = "#2B6E36"; c.beginPath(); c.arc(k.x, k.y, 3.6 * e, 0, 7); c.fill();
      c.fillStyle = "#8BE09A"; c.beginPath(); c.arc(k.x - 1, k.y - 1, 1.4 * e, 0, 7); c.fill();
    }
    c.restore();
  }
  if (path) c.restore();
}
function drawLeaves(c, f){   // f: this frame's length in 60 Hz steps
  if (!S.leaves.length) return;
  for (const q of S.leaves){
    q.t += f;
    if (q.ring){ const k = Math.min(1, q.t / 16); c.strokeStyle = "rgba(76,195,106," + (1 - k).toFixed(3) + ")"; c.lineWidth = 3 * (1 - k) + 0.5; c.beginPath(); c.arc(q.x, q.y, 4 + 18 * k, 0, 7); c.stroke(); continue; }
    q.vy += 0.09 * f; q.vx *= Math.pow(0.98, f); q.x += q.vx * f; q.y += q.vy * f; q.a += q.va * f;
    c.globalAlpha = Math.max(0, 1 - q.t / 42); drawLeaf(c, q.x, q.y, q.a, 5, q.col); c.globalAlpha = 1;
  }
  S.leaves = S.leaves.filter(q => q.t < (q.ring ? 16 : 42));
  needDraw = true;   // the last frame of the burst clears it
}
// the vine wrap on a vine-wrapped item's sprite: clay strands across the front, leaves rooted on the item
const vineArt = new Map();
function vineShape(def){
  let v = vineArt.get(def.id); if (v) return v;
  const probe = def.make(0, 0), polys = ownParts(probe).map(pt => pt.vertices.map(q => ({x: q.x, y: q.y})));
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const P of polys) for (const q of P){ x0 = Math.min(x0, q.x); y0 = Math.min(y0, q.y); x1 = Math.max(x1, q.x); y1 = Math.max(y1, q.y); }
  v = {polys, x0, y0, w: x1 - x0, h: y1 - y0}; vineArt.set(def.id, v); return v;
}
function drawVineWrap(g, def){
  const V = vineShape(def), r = K.rng([...def.id].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) % 1000003, 7));
  const inside = (x, y) => V.polys.some(P => Matter.Vertices.contains(P, {x, y}));
  const clip = new Path2D();
  for (const P of V.polys){ P.forEach((q, i) => i ? clip.lineTo(q.x, q.y) : clip.moveTo(q.x, q.y)); clip.closePath(); }
  const tall = V.h > V.w * 1.25, n = V.w * V.h > 2400 ? 2 : 1, strands = [];
  for (let i = 0; i < n; i++){
    const f0 = n === 1 ? 0.35 : (i ? 0.74 : 0.26), f1 = n === 1 ? 0.65 : (i ? 0.3 : 0.7);
    const a = tall ? [V.x0 + V.w * f0, V.y0 - 3] : [V.x0 - 3, V.y0 + V.h * f0];
    const b = tall ? [V.x0 + V.w * f1, V.y0 + V.h + 3] : [V.x0 + V.w + 3, V.y0 + V.h * f1];
    const L = Math.hypot(b[0] - a[0], b[1] - a[1]), N = Math.max(10, Math.round(L / 3.5));
    const nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L, amp = 2.4 + r() * 1.4, wl = 15 + r() * 7, ph = r() * 6.28;
    const pts = [];
    for (let k = 0; k <= N; k++){ const t = k / N, wv = Math.sin((t * L / wl) * Math.PI * 2 + ph) * amp; pts.push([a[0] + (b[0] - a[0]) * t + nx * wv, a[1] + (b[1] - a[1]) * t + ny * wv]); }
    strands.push(pts);
  }
  g.save(); g.clip(clip);
  for (const pts of strands) K.blob(g, K.tube(pts, 3.6), "#3E9E4F", {depth: 1.1, soft: 1.5, sheen: false, texture: 0.05, rim: 0.7});
  g.restore();
  for (const pts of strands){
    for (let k = 2; k < pts.length - 1; k += 3){
      const [x, y] = pts[k]; if (!inside(x, y)) continue;
      const [x2, y2] = pts[k + 1], side = (k / 3) % 2 < 1 ? 1 : -1;
      const ang = Math.atan2(y2 - y, x2 - x) + side * (0.75 + r() * 0.5), len = 6 + r() * 2.5;
      g.save(); g.shadowColor = "rgba(40,20,50,0.3)"; g.shadowBlur = 1.2; g.shadowOffsetX = 0.6; g.shadowOffsetY = 0.9;
      drawLeaf(g, x, y, ang, len, r() < 0.7 ? "#4CC36A" : "#9AD84A"); g.restore();
    }
  }
}

// ---------- life events ----------
function pickCard(){
  let c = CARDS.filter(k => k.st === S.stage && !S.used.has(k.id));
  if (!c.length) c = CARDS.filter(k => !S.used.has(k.id));
  if (!c.length){ S.used.clear(); c = CARDS.filter(k => k.st === S.stage); }
  return c[Math.floor(Math.random() * c.length)];
}
// The next card and the items pictured on its two choices are picked a few seconds before it opens, so their
// pictures are made in spare time and the card deals in smoothly.
function planCard(){
  const c = pickCard(), order = Math.random() < 0.5 ? ["w","r"] : ["r","w"];
  const thumbs = order.map(k => { const pool = k === "w" ? POOLS.wise : (c.trap === "scam" ? POOLS.scam : POOLS.risky); return pool[Math.floor(Math.random() * pool.length)]; });
  thumbs.forEach(d => wantSprite(d, 0, 1));
  return {c, order, thumbs, stage: S.stage};
}
function openCard(){
  const plan = S.plan && S.plan.stage === S.stage ? S.plan : planCard(), c = plan.c;
  S.plan = null; S.used.add(c.id);
  S.cardCount++;
  S.card = {c, t:0, flip:false, flipAt:0, order: plan.order, lastTick:4};
  S.mode = "card"; softHeld = false; keys.left = keys.right = false; S.dragX = null;
  A.sfx("cardOpen"); A.mode("card");
  const st = STAGES[S.stage];
  $("cardNo").textContent = "No." + String(S.cardCount).padStart(2, "0");
  document.querySelector(".lc-body").dataset.no = "人生事件 No." + String(S.cardCount).padStart(2, "0");
  $("cardStage").textContent = st.en + " · " + st.zh;
  $("cardTitle").textContent = c.en; $("cardTitleZh").textContent = c.zh;
  $("cardTag").textContent = c.tag ? c.tag[0] + " · " + c.tag[1] : "";   // shown instead of the question once it's answered
  const box = $("cardChoices"); box.replaceChildren(); box.hidden = false;
  S.card.order.forEach((k, i) => {
    const b = document.createElement("button"); b.className = "choice"; b.type = "button";
    const key = document.createElement("span"); key.className = "key"; key.textContent = i === 0 ? "1" : "2";
    const th = document.createElement("canvas"); th.className = "thumb"; th.width = 88; th.height = 88; th.setAttribute("aria-hidden", "true");
    const t = document.createElement("span");
    const be = document.createElement("b"); be.textContent = c[k][0];
    const bz = document.createElement("small"); bz.textContent = c[k][1];
    t.append(be, bz); b.append(key, t, th);
    requestAnimationFrame(() => previewInto(th, plan.thumbs[i]));
    b.addEventListener("click", e => { if (!tapTooSoon(e, 0)) choose(k === "w" ? "wise" : "risky"); });
    box.appendChild(b);
  });
  $("cardOutcome").hidden = true; $("cardBar").style.transform = "scaleX(1)";
  $("cardHint").textContent = "Life Event card. Choose within " + cardMs() / 1000 + " seconds: press 1 or 2, or tap a choice." +
    (slowRead ? "" : " For more time on later cards, pause the game and set the card timer to 30 seconds.");
  $("cardModal").hidden = false;
  const sheet = $("cardSheet"); sheet.classList.remove("done"); sheet.style.animation = "none"; void sheet.offsetWidth; sheet.style.animation = "";
  modalOpen(true); $("cardSheet").focus({preventScroll:true});
}
// A tap meant for the board or the pad can land on a card that has just popped up (or on Continue, where a
// choice was a moment ago): taps in the first 0.45 s are ignored. Keyboard presses (detail 0) always count.
function tapTooSoon(e, since){ return e.detail !== 0 && !!S.card && S.card.t - since < 450; }
function choose(kind){
  if (!S.card || S.card.flip) return;
  const c = S.card.c; S.card.flip = true; S.card.flipAt = S.card.t;
  S.choices.push({card: c.id, pick: kind});
  const head = $("ocHead"); head.replaceChildren();
  const txt = document.createElement("span");
  let en, zh, loss = 0;
  if (kind === "wise"){
    S.wise++; S.rate = Math.min(2, +(S.rate + 0.2).toFixed(1)); S.fund = Math.min(3, S.fund + 1);
    S.forced = {type: "wise", n: 4};
    S.wiseRun++; S.afterCard = S.rate >= 2 && !S.said.has("boost") ? (S.said.add("boost"), "boost") : S.wiseRun === 3 ? "wise3" : "wise";
    head.className = "oc-head good"; head.appendChild(svgUse("i-good")); txt.textContent = "Good call! 揀得好！";
    en = "Next 4 items are stable, the first wrapped in vines · boost ×" + S.rate.toFixed(1) + " · emergency fund +1";
    zh = "之後4件平穩，第一件纏住藤蔓·加成×" + S.rate.toFixed(1) + "·應急錢+1";
    $("ocEffect").style.color = "var(--green-t)"; A.sfx("wise");
  } else {
    const trap = kind === "risky" ? c.trap : "delay";
    if (kind === "risky") S.risky++; else S.missed++;
    S.wiseRun = 0; S.afterCard = trap;
    S.falls[trap]++;
    head.className = "oc-head bad"; const ic = svgUse(ICON[trap]); ic.style.background = trap === "spend" ? "var(--orange)" : trap === "scam" ? "var(--purple)" : "var(--blue)"; ic.style.borderRadius = "10px"; ic.style.padding = "3px"; head.appendChild(ic);
    txt.textContent = TRAPS[trap].en + " " + TRAPS[trap].zh;
    [en, zh] = TRAPS[trap].hit;
    if (kind === "none"){ en = "Time ran out, so it was put off · " + en; zh = "諗太耐，即係拖延·" + zh; }
    $("ocEffect").style.color = "var(--red-d)"; A.sfx("risky");
    if (trap === "spend"){ S.rate = Math.max(1, +(S.rate - 0.2).toFixed(1)); S.forced = {type: "risky", n: 3}; S.pendingDebt++; }
    else if (trap === "scam"){ const sl = Math.min(S.score, 5000); loss = sl; S.score -= sl; ledger({zh: "被騙", en: "Scam"}, -sl); S.forced = {type: "scam", n: 3}; S.scamLock = 4; A.sfx("scam"); }
    else { S.speedUntil = S.play + 20000; S.rate = 1; S.forced = {type: "risky", n: 2}; }
  }
  head.appendChild(txt);
  const ez = document.createElement("small"); ez.lang = "zh-HK"; ez.textContent = zh.replace("{loss}", fmt(-loss));
  $("ocEffect").replaceChildren(document.createTextNode(en.replace("{loss}", fmt(-loss))), ez);
  $("cardSheet").classList.add("done");
  const tip = $("ocTip"); tip.replaceChildren(document.createTextNode(c.tip[0]));
  const tz = document.createElement("small"); tz.textContent = c.tip[1]; tip.appendChild(tz);
  crab(c.tip[0], c.tip[1]);
  $("cardChoices").hidden = true; $("cardOutcome").hidden = false;
  $("cardContinue").focus({preventScroll:true});
  S.queue = []; refill();
  if (kind === "wise"){ S.queue[0] = vineOf(S.queue[0]); setTimeout(() => A.sfx("vineGet"), 380); }
  drawPreviews(); updateHUD(); prewarm();
}
function closeCard(){
  if (!S.card) return;
  $("cardModal").hidden = true; S.card = null; modalOpen(false);
  if (S.mode === "card"){
    S.mode = "playing"; S.nextEvent = S.play + CARD_GAP;
    S.fastOn = S.play < S.speedUntil; A.mode(S.fastOn ? "fast" : "normal");
    while (S.pendingDebt > 0){ S.pendingDebt--; dropDebt(); }
    if (S.afterCard){ quip(S.afterCard, 2); S.afterCard = null; }
    if (S.falls.delay && S.fastOn) stamp("Time flies!", "時間加速", "info");
  }
  $("board").focus({preventScroll:true});
}
function shock(){
  const sh = SHOCKS[Math.floor(Math.random() * SHOCKS.length)];
  if (S.fund > 0){
    S.fund--; A.sfx("shield"); stamp(sh[0], sh[1] + "：應急錢頂住咗", "good"); quip("shockOk", 2);
    crab("Life happens: " + (sh[0][0].toLowerCase() + sh[0].slice(1)) + ". Your emergency fund kept the tower steady.", "突發：" + sh[1] + "。好彩有應急錢，座塔企得穩。");
  } else {
    S.quakeUntil = S.play + 1700; if (!reduceMotion) S.shake = 10; A.sfx("quake"); mood("worried", 2200); quip("shockBad", 2);
    stamp(sh[0], sh[1] + "：冇應急錢，座塔震！", "bad");
    crab("Life happens: " + (sh[0][0].toLowerCase() + sh[0].slice(1)) + ". With no emergency fund, everything wobbles.", "突發：" + sh[1] + "。冇應急錢，成座塔都震。");
  }
  updateHUD();
}

// ---------- flow ----------
function startGame(){
  A.unlock();
  flushRecord(S);   // the last game's quiz answers or habit may still be waiting to be saved
  S = newState(); makeEngine(); S.mode = "playing";
  if (firstQueue){ S.queue = firstQueue; S.lastId = firstQueue[2].id; firstQueue = null; }
  $("startOv").hidden = true; $("pauseOv").hidden = true; $("endModal").hidden = true; $("cardModal").hidden = true; $("seeOv").hidden = true; modalOpen(false);
  A.stage(0); A.mode("normal"); A.start();
  renderLedger(); nextPiece();
  crab("Steer each item into place, then let go. Flat things stack; round things roll.", "搵好位置先放手。扁嘅易疊，圓嘅會碌。");
  hush(); S.pb = lsGet("tff_pb", 0); quip(S.pb > 0 ? "startPb" : "start", 2, fmt(S.pb));
  updateHUD(); setPauseUI(); $("board").focus({preventScroll:true});
}
function endGame(reason){
  if (S.mode === "over") return;
  S.mode = "over"; S.over = reason;
  if (S.active){ S.active.tff.released = true; S.active = null; }
  $("cardModal").hidden = true; S.card = null;
  A.mode("over"); setPauseUI();
  A.sfx(reason === "drops" ? "gameOver" : (S.stage === STAGES.length - 1 ? "win" : "timeUp"));
  mood(reason === "drops" ? "cover" : "happy", 4000);
  S.overKey = reason === "drops" ? "overDrops" : "over" + S.stage; quip(S.overKey, 3);
  if (S.score > lsGet("tff_pb", 0)) lsSet("tff_pb", Math.round(S.score));
  updateHUD();
  setTimeout(showEnd, reason === "drops" ? 1200 : 700);
}
function modalOpen(on){ const set = document.querySelector(".set"); if (set) set.inert = !!on; }
function setPauseUI(){ const pb = $("pauseBtn"); const live = S && (S.mode === "playing" || S.mode === "paused"); pb.disabled = !live; document.documentElement.classList.toggle("ingame", !!live); const p = !!(S && S.mode === "paused"); pb.setAttribute("aria-pressed", String(p)); pb.setAttribute("aria-label", p ? "Resume game" : "Pause game"); }
function togglePause(){
  if (S.mode === "playing"){ S.mode = "paused"; $("pauseOv").hidden = false; A.mode("paused"); $("resumeBtn").focus({preventScroll:true}); }
  else if (S.mode === "paused"){ S.mode = "playing"; $("pauseOv").hidden = true; A.resume(); A.mode(S.play < S.speedUntil ? "fast" : "normal"); $("board").focus({preventScroll:true}); }
  setPauseUI();
}

// ---------- input ----------
const keys = {left:false, right:false};
let softHeld = false;
function act(a){
  if (!S || S.mode !== "playing") return;
  if (a === "rotate"){ S.targetAngle += Math.PI/2; if (S.active) A.sfx("rotate"); }
  else if (a === "rotL"){ S.targetAngle -= Math.PI/12; if (S.active) A.sfx("rotate"); }
  else if (a === "rotR"){ S.targetAngle += Math.PI/12; if (S.active) A.sfx("rotate"); }
  else if (a === "drop") release(true);
  else if (a === "hold") doHold();
  if (S.active && a.startsWith("rot")) wantSprite(S.active.tff.def, qOf(S.targetAngle), 0);   // the turn it's heading for
}
function setMuteUI(){ const m = A.muted(); $("muteBtn").setAttribute("aria-pressed", String(m)); $("muteBtn").setAttribute("aria-label", m ? "Unmute sound" : "Mute sound"); }
function toggleMute(){ A.unlock(); A.toggle(); setMuteUI(); }
// ---------- full screen play ----------
// One tap (the ⛶ button, Full screen on the start card, or F) for just the game: the browser goes full screen where
// it can (iPhones can't: there, Add to Home Screen does it), and either way the page hides everything but the game
// and the board grows to fill the screen. A phone is held upright while full screen, where the browser allows it.
const root = document.documentElement;
const fsEl = () => document.fullscreenElement || document.webkitFullscreenElement || null;
const fsApi = !!(root.requestFullscreen || root.webkitRequestFullscreen);
let fsOn = false;
function setFs(on){
  fsOn = on; root.classList.toggle("fs", on);
  const b = $("fsBtn"); b.setAttribute("aria-pressed", String(on)); b.setAttribute("aria-label", on ? "Exit full screen" : "Play full screen");
  lastFit = ""; resize();
  if (on) window.scrollTo(0, 0);
}
function toggleFs(want = !fsOn){
  if (want === fsOn && !!fsEl() === (want && fsApi)) return;
  setFs(want);
  try {
    if (want && fsApi && !fsEl()){
      const p = root.requestFullscreen ? root.requestFullscreen({navigationUI: "hide"}) : root.webkitRequestFullscreen();
      Promise.resolve(p).then(() => {
        if (Math.min(screen.width, screen.height) < 600 && screen.orientation && screen.orientation.lock) screen.orientation.lock("portrait").catch(() => {});
      }, () => {});   // refused: the page-only full screen stays
    } else if (!want && fsEl()) Promise.resolve(document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen()).catch(() => {});
  } catch(e){}
}
for (const ev of ["fullscreenchange", "webkitfullscreenchange"]) document.addEventListener(ev, () => {
  if (!fsEl() && fsOn) setFs(false);   // left with Esc or the phone's back gesture
  else { lastFit = ""; resize(); }     // the screen size changed: fit the board now
});
let endShownAt = 0;
document.addEventListener("keydown", e => {
  if (!S) return;
  if (!$("endModal").hidden){
    if ((e.key === " " || e.key === "Enter") && performance.now() - endShownAt < 900){ e.preventDefault(); return; }
    if (e.key === "Escape"){ $("closeEnd").click(); e.preventDefault(); return; }
  }
  const tag = (e.target && e.target.tagName) || "";
  if (tag === "INPUT" || tag === "TEXTAREA") return;
  const k = e.key;
  if (k === "m" || k === "M"){ toggleMute(); e.preventDefault(); return; }
  if ((k === "f" || k === "F") && !e.ctrlKey && !e.metaKey && !e.altKey){ toggleFs(); e.preventDefault(); return; }
  if (S.mode === "card" && S.card){
    if (!S.card.flip && (k === " " || k === "Enter") && !(e.target && e.target.classList && e.target.classList.contains("choice"))){ e.preventDefault(); return; }
    if (!S.card.flip && ["1","2","a","b","A","B"].includes(k)){
      const idx = (k === "1" || k.toLowerCase() === "a") ? 0 : 1;
      choose(S.card.order[idx] === "w" ? "wise" : "risky"); e.preventDefault();
    } else if (S.card.flip && (k === "Enter" || k === " ")){ closeCard(); e.preventDefault(); }
    return;
  }
  if (S.mode === "idle" && S.viewing && !$("seeOv").hidden && (k === "Escape" || k === "r" || k === "R")){ openResults(); e.preventDefault(); return; }
  if (S.mode === "idle" && (k === "Enter" || k === " ") && (!$("startOv").hidden || !$("seeOv").hidden)){ startGame(); e.preventDefault(); return; }
  if (k === "p" || k === "P" || k === "Escape"){ if (S.mode === "playing" || S.mode === "paused"){ togglePause(); e.preventDefault(); } return; }
  if (S.mode !== "playing") return;
  switch (k){
    case "ArrowLeft": keys.left = true; S.dragX = null; e.preventDefault(); break;
    case "ArrowRight": keys.right = true; S.dragX = null; e.preventDefault(); break;
    case "ArrowDown": softHeld = true; e.preventDefault(); break;
    case "ArrowUp": if (!e.repeat) act("rotate"); e.preventDefault(); break;
    case "z": case "Z": act("rotL"); e.preventDefault(); break;
    case "x": case "X": act("rotR"); e.preventDefault(); break;
    case " ": if (!e.repeat) act("drop"); e.preventDefault(); break;
    case "c": case "C": if (!e.repeat) act("hold"); e.preventDefault(); break;
  }
});
document.addEventListener("keyup", e => {
  if (e.key === "ArrowLeft") keys.left = false;
  if (e.key === "ArrowRight") keys.right = false;
  if (e.key === "ArrowDown") softHeld = false;
});
window.addEventListener("blur", () => { keys.left = keys.right = false; softHeld = false; });
document.addEventListener("visibilitychange", () => {
  if (document.hidden){ if (S && S.mode === "playing") togglePause(); A.suspend(); flushRecord(S, true); }
  else A.resume();
});
$("pad").querySelectorAll("button").forEach(b => {
  const a = b.dataset.act;
  const down = e => { e.preventDefault(); if (S) S.dragX = null;
    if (a === "left") keys.left = true; else if (a === "right") keys.right = true; else if (a === "down") softHeld = true; else act(a); };
  const up = () => { if (a === "left") keys.left = false; if (a === "right") keys.right = false; if (a === "down") softHeld = false; };
  b.addEventListener("pointerdown", down);
  b.addEventListener("click", e => { if (e.detail === 0 && a !== "left" && a !== "right" && a !== "down") act(a); });
  b.addEventListener("pointerup", up); b.addEventListener("pointerleave", up); b.addEventListener("pointercancel", up);
  b.addEventListener("contextmenu", e => e.preventDefault());
});
const cv = $("board");
let drag = null;
function worldX(clientX, r){ r = r || cv.getBoundingClientRect(); return (clientX - r.left) / r.width * W; }
// Board gestures. The first clear movement decides what a touch is: sideways steers (the item follows the finger),
// downward doesn't (a slow drag down makes it fall faster while held). A swipe down drops the item, and so does a
// flick down at the end of steering; a short touch that barely moved turns it. So a swipe down that drifts a
// little no longer pulls the item across the board first, and a tap that rolls a few pixels still turns it.
// (The board's place on screen is measured once per touch: measuring can force a layout.)
const evT = e => e.timeStamp || performance.now();   // when the touch happened, not when the handler got to run
cv.addEventListener("pointerdown", e => { if (!S || S.mode !== "playing") return; const t = evT(e);
  drag = {x:e.clientX, y:e.clientY, t, axis:null, soft:false, r:cv.getBoundingClientRect(), pts:[[t, e.clientX, e.clientY]]}; try { cv.setPointerCapture(e.pointerId); } catch(_){} });
cv.addEventListener("pointermove", e => {
  if (!drag || !S || S.mode !== "playing") return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
  drag.pts.push([evT(e), e.clientX, e.clientY]); if (drag.pts.length > 16) drag.pts.shift();
  if (!drag.axis){
    if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) drag.axis = "x";
    else if (dy > 10 && dy > Math.abs(dx) * 1.2) drag.axis = "y";
  }
  if (drag.axis === "x") S.dragX = worldX(e.clientX, drag.r);
  else if (drag.axis === "y" && dy > 28 && !drag.soft){ drag.soft = true; softHeld = true; }
});
const endDrag = e => {
  if (!drag) return;
  const now = evT(e), dt = now - drag.t, dy = e.clientY - drag.y, dx = e.clientX - drag.x;
  let p0 = drag.pts[drag.pts.length - 1];
  for (const q of drag.pts) if (now - q[0] <= 200){ p0 = q; break; }   // where the finger was 0.2 s ago
  const fy = e.clientY - p0[2], fx = e.clientX - p0[1];
  if (S && S.mode === "playing" && e.type === "pointerup"){
    const swipe = drag.axis !== "x" && dy > 45 && dy > Math.abs(dx) * 1.2 && dt < 450;
    const flick = drag.axis === "x" && fy > 30 && fy > Math.abs(fx) * 1.2;
    if (swipe || flick) act("drop");
    else if (!drag.axis && dt < 300 && Math.abs(dx) < 10 && Math.abs(dy) < 10) act("rotate");
  }
  if (drag.soft) softHeld = false;
  if (S) S.dragX = null; drag = null;
};
cv.addEventListener("pointerup", endDrag); cv.addEventListener("pointercancel", endDrag);
document.addEventListener("click", e => { if (e.target.closest && e.target.closest(".btn,.tab,.choice,.qopt,.iconbtn")) A.sfx("click"); });
$("muteBtn").addEventListener("click", toggleMute);
$("fsBtn").addEventListener("click", () => toggleFs());
$("fsStartBtn").addEventListener("click", () => { toggleFs(true); startGame(); });
$("pauseBtn").addEventListener("click", () => { if (S && (S.mode === "playing" || S.mode === "paused")) togglePause(); });
$("hudHoldBtn").addEventListener("click", () => act("hold"));
$("startBtn").addEventListener("click", startGame);
$("resumeBtn").addEventListener("click", togglePause);
$("cardContinue").addEventListener("click", e => { if (!(S.card && tapTooSoon(e, S.card.flipAt))) closeCard(); });
$("againBtn").addEventListener("click", startGame);
// "See tower" hides the statement without resetting it; "Back to results" (or Esc / R) brings it back as it was.
let endScroll = 0;
function openResults(){
  if (!S || S.mode !== "idle" || !S.viewing) return;
  $("seeOv").hidden = true; S.viewing = false; S.mode = "over";
  $("endModal").hidden = false; $("stScroll").scrollTop = endScroll;
  endShownAt = performance.now(); modalOpen(true); setPauseUI();
  $("closeEnd").focus({preventScroll:true});
}
$("resultsBtn").addEventListener("click", openResults);
$("closeEnd").addEventListener("click", () => { endScroll = $("stScroll").scrollTop; $("endModal").hidden = true; modalOpen(false); S.viewing = true; S.mode = "idle"; S.queue = []; S.hold = null; drawPreviews(true); $("seeOv").hidden = false; setPauseUI(); $("againBtn2").focus(); if (S.overKey) quip(S.overKey, 3); });
$("againBtn2").addEventListener("click", startGame);
cv.tabIndex = 0;

// ---------- rendering: sprites ----------
const ctx = cv.getContext("2d");
let SC = 1, DPR = 1;
const SPR = new Map(), SPR_MAX = 160, QA = Math.PI / 4;
let usedText = false;   // did the sprite being made use lettering (it is made again once the web fonts arrive)
const kText = K.text; K.text = function(){ usedText = true; return kText.apply(this, arguments); };
const kOK = s => !!s && Math.abs(s.k - SC * DPR) <= 0.015 * SC * DPR;   // made at (about) the board's current scale
function spriteFor(def, q){
  q = q || 0;
  const k = SC * DPR, key = def.id + "|" + q; let s = SPR.get(key);
  if (kOK(s)){ SPR.delete(key); SPR.set(key, s); return s; }      // LRU touch
  const ang = q * QA, probe = def.make(0, 0), pad = 10;
  if (ang) Body.rotate(probe, ang, {x: 0, y: 0});
  const bb = probe.bounds;
  const x0 = bb.min.x - pad, y0 = bb.min.y - pad, w = bb.max.x - bb.min.x + pad*2, h = bb.max.y - bb.min.y + pad*2;
  const img = document.createElement("canvas"); img.width = Math.max(2, Math.ceil(w * k)); img.height = Math.max(2, Math.ceil(h * k));
  const g = img.getContext("2d"); g.setTransform(k, 0, 0, k, -x0 * k, -y0 * k); g.rotate(ang);
  usedText = false;
  try { def.draw(g); } catch(e){ g.fillStyle = "#FF5FA2"; g.fillRect(bb.min.x, bb.min.y, bb.max.x - bb.min.x, bb.max.y - bb.min.y); }
  // soft contact shadow: blurred silhouette via the off-canvas shadow trick (Safari-safe)
  const m = 8, sh = document.createElement("canvas"); sh.width = img.width + Math.ceil(m*2*k); sh.height = img.height + Math.ceil(m*2*k);
  const sg = sh.getContext("2d"); const FAR = 10000;
  sg.shadowColor = "rgba(70,30,60,0.32)"; sg.shadowBlur = 5 * k; sg.shadowOffsetX = FAR; sg.drawImage(img, m*k - FAR, m*k);
  s = {img, sh, x0, y0, w, h, m, k, q, text: usedText}; SPR.set(key, s);
  if (SPR.size > SPR_MAX) SPR.delete(SPR.keys().next().value);
  return s;
}
// A sprite takes 15 ms to sculpt on a laptop and up to ten times that on a phone, so the frame never waits for one
// when another will do: if this turn of the item isn't ready at this size yet, the nearest turn that is (or the
// same turn made before a resize) is drawn rotated into place, and the right one is made in spare time.
// Only an item never drawn before is made on the spot, and the coming items are made in advance (prewarm).
function spriteNear(def, q, want){
  const s = SPR.get(def.id + "|" + q);
  if (kOK(s)){ SPR.delete(def.id + "|" + q); SPR.set(def.id + "|" + q, s); return s; }
  let near = null;
  for (let d = 1; d <= 4 && !near; d++){
    const a = SPR.get(def.id + "|" + ((q + d) % 8)), b = SPR.get(def.id + "|" + ((q + 8 - d) % 8));
    near = kOK(a) ? a : kOK(b) ? b : null;
  }
  for (let d = 0; d <= 4 && !near; d++) near = SPR.get(def.id + "|" + ((q + d) % 8)) || SPR.get(def.id + "|" + ((q + 8 - d) % 8)) || null;
  if (!near) return spriteFor(def, q);
  if (want) wantSprite(def, q, 0); else needDraw = true;   // passing through a turn mid-rotation: not worth making
  return near;
}
// Spare-time work, most wanted first: one sprite (or scene layer) per idle moment.
const JOBS = new Map();
let jobT = 0;
const onIdle = window.requestIdleCallback ? f => requestIdleCallback(f, {timeout: 500}) : f => setTimeout(() => f({timeRemaining: () => 8, didTimeout: true}), 40);
function addJob(key, pri, run){
  const j = JOBS.get(key);
  if (j){ if (pri < j.pri) j.pri = pri; } else JOBS.set(key, {pri, run});
  if (!jobT) jobT = onIdle(runJob);
}
function wantSprite(def, q, pri){
  if (!kOK(SPR.get(def.id + "|" + q))) addJob(def.id + "|" + q, pri, () => { spriteFor(def, q); });
}
function runJob(dl){
  jobT = 0;
  let key = null, best = null;
  for (const [k, j] of JOBS) if (!best || j.pri < best.pri){ key = k; best = j; }
  if (!best) return;
  if (dl.timeRemaining() >= 6 || dl.didTimeout){ JOBS.delete(key); best.run(); needDraw = true; if (previewsWaiting){ previewsWaiting = false; drawPreviews(true); } }
  if (JOBS.size) jobT = onIdle(runJob);
}
const qOf = a => ((Math.round(a / QA) % 8) + 8) % 8;
let drawN = 0;   // frames drawn
function bodyAnchor(b){ const p = drawPose(b), eo = b.tff.eo, c = Math.cos(p.a), s = Math.sin(p.a); return [p.x + eo.x*c - eo.y*s, p.y + eo.x*s + eo.y*c, p.a]; }
function drawBody(c, b, shadow){
  const [ax, ay, ang] = bodyAnchor(b);
  const q = qOf(ang);
  if (b.tff.q !== q){ b.tff.q = q; b.tff.qAt = drawN; }
  const s = spriteNear(b.tff.def, q, drawN - b.tff.qAt >= 6), rest = ang - s.q * QA;
  c.save();
  if (shadow){ c.translate(ax + 4, ay + 6); c.rotate(rest); c.drawImage(s.sh, s.x0 - s.m, s.y0 - s.m, s.w + s.m*2, s.h + s.m*2); }
  else { c.translate(ax, ay); c.rotate(rest); c.drawImage(s.img, s.x0, s.y0, s.w, s.h); }
  c.restore();
}

// ---------- rendering: scene layers (clay, cached) ----------
const L = {};
function layer(w, h, fn){ const k = SC * DPR; const c = document.createElement("canvas"); c.width = Math.ceil(w * k); c.height = Math.ceil(h * k); const g = c.getContext("2d"); g.setTransform(k, 0, 0, k, 0, 0); fn(g); return c; }
function crabArt(g, mood){
  // a clay crab centred on (0,0), ~64×46 units
  const shell = K.ball(0, 6, 24, 15, {lump:0.6, seed:9});
  const claw = (sx) => {
    const up = mood === "happy" ? -16 : (mood === "cover" ? -4 : 0);
    const cx = sx * 30, cy = -2 + up;
    K.blob(g, K.tube([[sx * 16, 6], [sx * 24, 0 + up*0.5], [cx, cy + 4]], 6), "orange", {depth:1.5, soft:2, sheen:false});
    const pinch = K.merge(K.ball(cx, cy - 2, 8, 7, {lump:0.3, seed:sx + 4}), K.ball(cx + sx * 4, cy - 9, 4.5, 5, {lump:0.2, seed:sx + 8}));
    K.blob(g, pinch, "red", {depth:2, soft:2.6, sheen:false});
  };
  for (const sx of [-1, 1]) for (let i = 0; i < 3; i++) K.blob(g, K.tube([[sx * (12 + i*5), 14], [sx * (19 + i*6), 22], [sx * (21 + i*6), 26]], 3.4), "orange", {depth:1, soft:1.4, sheen:false, rim:0.6});
  claw(-1); claw(1);
  K.blob(g, shell, "red", {sheen:{x:-8, y:0, rx:7, ry:3}});
  for (const sx of [-1, 1]){
    K.blob(g, K.tube([[sx * 6, -2], [sx * 7, -12]], 3), "red", {depth:1, soft:1.4, sheen:false, rim:0.6});
    const look = mood === "worried" ? 0.6 : 0;
    if (mood === "cover") K.press(g, K.ball(sx * 7, -14, 5, 3, {lump:0.1}), "red", {sheen:false});
    else K.eye(g, sx * 7, -15, 4.6, look * sx, mood === "happy" ? -0.4 : 0.2);
  }
  if (mood === "happy") K.groove(g, K.poly([[-6, 9], [0, 13], [6, 9]], false), 1.4);
  else if (mood === "worried"){ K.groove(g, K.poly([[-5, 12], [0, 9], [5, 12]], false), 1.4); K.press(g, K.ball(19, -10, 2.2, 3.2, {lump:0.05}), "sky", {sheen:false, texture:0}); }
  else K.groove(g, K.poly([[-5, 10], [0, 12], [5, 10]], false), 1.3);
  K.press(g, K.ball(-12, 8, 3, 2, {lump:0.05}), "pink", {sheen:false, texture:0}); K.press(g, K.ball(12, 8, 3, 2, {lump:0.05}), "pink", {sheen:false, texture:0});
}
// Scene layers. soft: keep the current ones (drawn stretched for a moment) and remake them one by one in spare time,
// so a resize or the web fonts arriving doesn't freeze the game.
function buildLayers(soft, only){
  const make = {};
  // sun + clouds (screen space, drawn with slow parallax)
  make.sky = () => layer(W, 260, g => {
    for (let i = 0; i < 8; i++){ const a = i * Math.PI / 4 + 0.2, r0 = 36, r1 = 47;
      K.blob(g, K.tube([[110 + r0*Math.cos(a), 95 + r0*Math.sin(a)], [110 + r1*Math.cos(a), 95 + r1*Math.sin(a)]], 6), "orange", {depth:1.4, soft:2, sheen:false, rim:0.5}); }
    K.blob(g, K.ball(110, 95, 30, 30, {lump:0.6, seed:3}), "#FFE45C", {sheen:{x:100, y:83, rx:9, ry:5}});
    K.groove(g, K.poly([[99, 100], [110, 107], [121, 100]], false), 1.4);
    K.press(g, K.ball(100, 90, 2.4, 3, {lump:0.05}), "black", {sheen:false, texture:0}); K.press(g, K.ball(120, 90, 2.4, 3, {lump:0.05}), "black", {sheen:false, texture:0});
    K.press(g, K.ball(94, 99, 3.5, 2.2, {lump:0.05}), "#FF9DBF", {sheen:false, texture:0}); K.press(g, K.ball(126, 99, 3.5, 2.2, {lump:0.05}), "#FF9DBF", {sheen:false, texture:0});
    const cloud = (cx, cy, s, seed) => K.blob(g, K.merge(K.ball(cx, cy, 24*s, 14*s, {lump:0.6, seed}), K.ball(cx + 22*s, cy - 6*s, 18*s, 15*s, {lump:0.6, seed:seed + 1}), K.ball(cx - 22*s, cy + 2*s, 15*s, 11*s, {lump:0.6, seed:seed + 2})), "white", {depth:3, soft:5});
    cloud(300, 78, 1, 11); cloud(215, 180, 0.72, 21); cloud(92, 228, 0.55, 31);
  });
  // skyline: colourful clay towers (parallax)
  make.city = () => layer(W + 60, 260, g => {
    // Lion Rock-ish hill behind the city
    K.blob(g, K.blobPoly([[-20, 260], [-20, 170], [40, 140], [95, 128], [130, 104], [158, 96], [172, 110], [200, 122], [260, 140], [330, 150], [400, 136], [W + 80, 150], [W + 80, 260]], {lump:1.2, seed:4, step:14}), "#3FAE6A", {depth:5, soft:9, sheen:false});
    const r = K.rng(77); const cols = ["pink", "teal", "purple", "orange", "blue", "green", "red", "yellow"];
    let x = -10, i = 0;
    while (x < W + 60){
      const w = 34 + r() * 30, h = (i === 6 ? 175 : 50 + r() * 100), c = cols[i % cols.length]; i++;
      const top = 260 - h;
      if (i === 7){ // a Bank of China-style triangle-facet tower
        K.blob(g, K.blobPoly([[x, 260], [x, top + 70], [x + w*0.5, top + 30], [x + w*0.5, top - 25], [x + w, top + 5], [x + w, 260]], {lump:0.6, seed:i}), "blue", {depth:4, soft:6});
        for (let yy = top + 30; yy < 250; yy += 34){ K.groove(g, K.poly([[x + 2, yy + 34], [x + w - 2, yy]], false), 1.1); K.groove(g, K.poly([[x + 2, yy], [x + w - 2, yy + 34]], false), 1.1); }
      } else if (i % 5 === 3){ // a stepped HK landmark-ish tower
        K.blob(g, K.blobPoly([[x, 260], [x, top + 40], [x + w*0.2, top + 40], [x + w*0.2, top + 10], [x + w*0.5, top - 20], [x + w*0.8, top + 10], [x + w*0.8, top + 40], [x + w, top + 40], [x + w, 260]], {lump:0.8, seed:i}), c, {depth:4, soft:6});
      } else K.blob(g, K.slab(x + w/2, top + h/2 + 10, w, h + 20, 6, {lump:0.9, seed:i * 13}), c, {depth:4, soft:6});
      for (let wy = top + 14; wy < 245; wy += 15) for (let wx = x + 7; wx < x + w - 9; wx += 10)
        if (r() > 0.55) K.press(g, K.rrc(wx + 2, wy, 5, 7, 1.5), r() > 0.25 ? "#FFF3A6" : "cream", {sheen:false, texture:0, depth:0.6, soft:0.8, rim:0.3});
      x += w + 4 + r() * 6;
    }
    // atmospheric haze so the tower of items always reads in front of the city
    g.save(); g.globalCompositeOperation = "source-atop"; g.fillStyle = "rgba(160,220,255,0.42)"; g.fillRect(0, 0, W + 60, 260); g.restore();
  });
  // harbour (world units, wide so it can scroll)
  make.sea = () => layer(W + 120, 220, g => {
    const sea = K.slab((W + 120)/2, 120, W + 160, 240, 0, {lump:0.6, seed:5});
    K.blob(g, sea, "blue", {depth:6, soft:10, sheen:false, texture:0.18});
    for (let row = 0; row < 5; row++){
      const pts = []; for (let x = -10; x <= W + 130; x += 12) pts.push([x, 10 + row*26 + Math.sin(x / 22 + row) * 3.5]);
      K.blob(g, K.tube(pts, 6 - row*0.6), row % 2 ? "#5DB3F5" : "sky", {depth:1.6, soft:2.4, sheen:false, rim:0.5, texture:0.06});
    }
  });
  // platform + pillar
  make.plat = () => layer(PW + 40, 200, g => {
    K.blob(g, K.slab(PW/2 + 20, 120, 74, 190, 8, {lump:0.8, seed:2}), "#3A3F9E", {depth:5, soft:8});
    for (let y = 50; y < 200; y += 22) K.groove(g, K.poly([[PW/2 - 14, y], [PW/2 + 54, y]], false), 1.2);
    K.blob(g, K.slab(PW/2 + 20, 15, PW, 30, 7, {lump:1.0, seed:6}), "yellow", {sheen:{x:70, y:7, rx:30, ry:3}});
    K.text(g, "儲蓄基礎", PW/2 - 52, 16.5, {size:13, font:"zh", color:"#25317A", weight:700});
    K.text(g, "SAVINGS FOUNDATION", PW/2 + 52, 16.5, {size:11.5, font:"display", color:"#25317A", weight:900});
  });
  // a red-sail junk that drifts across the harbour
  make.junk = () => layer(80, 60, g => {
    K.blob(g, K.tube([[40, 6], [40, 44]], 2.4), "brown", {depth:0.8, soft:1, sheen:false, rim:0.4});
    for (const [cx, w, hgt] of [[26, 22, 30], [52, 18, 24]]){
      const sail = K.blobPoly([[cx - w/2, 44 - hgt], [cx + w/2, 40 - hgt], [cx + w/2 + 2, 42], [cx - w/2 - 2, 44]], {lump:0.4, seed:cx});
      K.blob(g, sail, "red", {depth:2, soft:3, sheen:false});
      for (let yy = 44 - hgt + 6; yy < 42; yy += 6) K.groove(g, K.poly([[cx - w/2, yy], [cx + w/2, yy - 1]], false), 0.8);
    }
    K.blob(g, K.blobPoly([[4, 44], [76, 42], [68, 56], [12, 56]], {lump:0.4, seed:8}), "#A0522D", {depth:2, soft:3, sheen:false});
    K.press(g, K.slab(40, 47, 50, 3, 1, {lump:0.1}), "yellow", {sheen:false, texture:0});
  });
  make.crab = () => { const o = {}; for (const m of ["idle", "happy", "worried", "cover"]) o[m] = layer(80, 64, g => { g.translate(40, 30); crabArt(g, m); }); return o; };
  for (const name in make){
    if (only && name !== only) continue;
    if (soft && L[name]) addJob("layer:" + name, 0.5, () => { L[name] = make[name](); });
    else L[name] = make[name]();
  }
}
function drawCrabs(){   // logo + panel crabs (fixed size, drawn once)
  for (const [id, m] of [["crabLogo", "happy"], ["crabSay", "idle"]]){
    const c = $(id); const g = c.getContext("2d"); g.setTransform(1,0,0,1,0,0); g.clearRect(0, 0, c.width, c.height);
    const s = c.width / 80; g.setTransform(s, 0, 0, s, 40*s, 32*s); crabArt(g, m);
  }
}
const PREVIEWS = ["nextCv", "holdCv", "next2Cv", "hudNext", "hudHold"];
let lastFit = "";
function resize(){
  const narrow = matchMedia("(max-width: 899px)").matches, touch = matchMedia("(pointer: coarse)").matches;
  const padOn = getComputedStyle($("pad")).display !== "none";
  const header = document.querySelector(".mast").offsetHeight;
  // Phones and tablets size the board to the screen with the browser's bars showing (it doesn't change as you
  // scroll or type), so the address bar sliding away or the keyboard opening doesn't resize the board and remake
  // every picture mid-game.
  const vh = (narrow || touch) && document.documentElement.clientHeight || window.innerHeight;
  let availH, availW;
  if (narrow){
    const cs = el => getComputedStyle(el), side = parseFloat(cs(document.querySelector(".set")).paddingLeft) + parseFloat(cs($("boardWrap")).paddingLeft);
    availW = document.documentElement.clientWidth - 2 * side; availH = vh - header - 70 - (padOn ? 100 : 0) - 40;
    // full screen on a phone: the board takes all the height the header, the status bar and the pad leave
    if (fsOn) availH = vh - (document.querySelector(".set").offsetHeight - cv.offsetHeight); }
  else { availW = Math.max(260, window.innerWidth - 620); availH = vh - header - 70 - (padOn ? 100 : 0); }
  const fit = [narrow, padOn, availW, availH, window.devicePixelRatio].join();
  if (fit === lastFit) return;
  lastFit = fit;
  const prevSC = SC, prevDPR = DPR;
  SC = Math.max(0.3, Math.min(availH / H, availW / W, 1.25));
  DPR = Math.min(2, window.devicePixelRatio || 1);
  const cw = Math.round(W * SC * DPR), ch = Math.round(H * SC * DPR);
  if (cv.width !== cw || cv.height !== ch){ cv.width = cw; cv.height = ch; needDraw = true; }
  cv.style.width = Math.round(W * SC) + "px"; cv.style.height = Math.round(H * SC) + "px";
  $("pad").style.maxWidth = Math.max(300, W * SC + 20) + "px";
  if (!L.sky) buildLayers();
  else if (Math.abs(SC - prevSC) > 0.015 || DPR !== prevDPR) buildLayers(true);
  const gw = document.querySelector('.col.right').getBoundingClientRect().right - document.querySelector('.col.left').getBoundingClientRect().left; $("info").style.maxWidth = narrow ? "" : Math.round(gw) + "px"; document.querySelector(".mast").style.maxWidth = narrow ? "" : Math.round(gw) + "px";
  for (const id of PREVIEWS) $(id)._sz = null;
  drawPreviews(true);
}
let rzT = 0; window.addEventListener("resize", () => { clearTimeout(rzT); rzT = setTimeout(resize, 220); });

const camTarget = () => Math.min(-(H - 240), -S.height - 330);
let skyDusk = -1, skyFill = null;
// dt: this frame's length in ms. Everything that moves on its own (camera, shake, splashes, leaves, sea, boat, crab)
// moves by time, not by frames, so it runs at the same speed on a 60 Hz or a 120 Hz screen.
function draw(dt){
  const c = ctx, k = SC * DPR, f = (dt || STEP) / STEP, T = S.steps + ALPHA; drawN++;
  const target = camTarget();
  S.camTop += (target - S.camTop) * (1 - Math.pow(0.95, f));
  let sx = 0;
  if (S.shake > 0){ sx = (Math.random() - .5) * S.shake; S.shake = Math.max(0, S.shake - 0.4 * f); }
  const rise = -S.camTop - (H - 240);                    // how far the camera has climbed
  c.setTransform(k, 0, 0, k, 0, 0);
  const dusk = Math.round(clamp((S.best / FLOOR - 5) / 6, 0, 1) * 200) / 200;
  if (dusk !== skyDusk){
    skyDusk = dusk; skyFill = c.createLinearGradient(0, 0, 0, H);
    skyFill.addColorStop(0, mixHex("#3FB4FF", "#FF8E5A", dusk)); skyFill.addColorStop(0.65, mixHex("#8EDBFF", "#FFC36E", dusk)); skyFill.addColorStop(1, mixHex("#C8F0FF", "#FFE7A8", dusk));
  }
  c.fillStyle = skyFill; c.fillRect(0, 0, W, H);
  c.drawImage(L.sky, 0, Math.min(40, rise * 0.05) - 10, W, 260);
  const cityY = Math.min(H - 110, (WATER_Y - S.camTop) - 250 + rise * 0.85);
  c.drawImage(L.city, -30, cityY, W + 60, 260);
  // world
  c.setTransform(k, 0, 0, k, k * sx, -S.camTop * k);
  drawRuler(c);
  c.drawImage(L.plat, W/2 - PW/2 - 20, 0, PW + 40, 200);
  const a = S.active;
  for (const b of engine.world.bodies) if (b.tff) for (const m of membersOf(b)) drawBody(c, m, true);
  if (a && S.mode !== "over"){
    // dashed guide down to where the item will land, with a landing ring. Only bodies under the item can stop it:
    // the scan starts at the highest of them, steps on a fixed 5 px grid (so the ring doesn't shimmer while the
    // item falls), then closes in on the surface.
    const ap = lerpPose(a), x = ap.x, y0 = a.bounds.max.y + (ap.y - a.position.y) + 6, under = [];
    let top = WATER_Y, land = WATER_Y;
    for (const b of engine.world.bodies) if (b !== a && b.bounds.min.x <= x && b.bounds.max.x >= x && b.bounds.max.y >= y0){ under.push(b); top = Math.min(top, b.bounds.min.y); }
    for (let y = Math.ceil(Math.max(y0, top) / 5) * 5; y < WATER_Y; y += 5){
      if (!Matter.Query.point(under, {x, y}).length) continue;
      let lo = y - 5, hi = y;
      for (let i = 0; i < 3; i++){ const mid = (lo + hi) / 2; if (Matter.Query.point(under, {x, y: mid}).length) hi = mid; else lo = mid; }
      land = Math.max(y0, hi); break;
    }
    c.save(); c.strokeStyle = "rgba(255,95,162,0.8)"; c.setLineDash([5, 7]); c.lineWidth = 2.2; c.lineCap = "round";
    c.beginPath(); c.moveTo(x, y0); c.lineTo(x, land - 4); c.stroke(); c.setLineDash([]);
    c.strokeStyle = "rgba(255,95,162,0.9)"; c.lineWidth = 2.4; c.beginPath(); c.ellipse(x, land - 2, 9, 3.2, 0, 0, Math.PI * 2); c.stroke(); c.restore();
  }
  for (const b of engine.world.bodies) if (b.tff && b !== a){ for (const m of membersOf(b)) drawBody(c, m, false); if (b.tff.members) drawMarks(c, b, T); }
  if (a) drawBody(c, a, false);
  drawLeaves(c, f);
  drawLabels(c);
  // harbour in front (anything below the surface sinks behind it)
  const off = (T * 0.35) % 60;
  c.drawImage(L.sea, -60 - off, WATER_Y - 6, W + 120, 220);
  c.fillStyle = "rgba(20,30,90,0.28)"; c.beginPath(); c.ellipse(W/2, WATER_Y + 6, 46, 6, 0, 0, Math.PI * 2); c.fill();
  const jx = ((T * 0.22) % (W + 160)) - 100, jy = WATER_Y - 44 + (reduceMotion ? 0 : Math.sin(T / 22) * 1.6);
  c.drawImage(L.junk, jx, jy, 80, 60);
  for (const sp of S.splashes){
    sp.t += f; const t = sp.t / 45, n = sp.big ? 9 : 6;
    for (let i = 0; i < n; i++){
      const ang = Math.PI * (0.15 + 0.7 * i / (n - 1)), v = (sp.big ? 3.4 : 2.6) * (0.8 + (i % 3) * 0.15);
      const px = sp.x + Math.cos(ang) * v * sp.t * 1.2 * (i % 2 ? 1 : -1), py = WATER_Y - Math.sin(ang) * v * sp.t + 0.09 * sp.t * sp.t;
      if (py > WATER_Y + 4) continue;
      c.fillStyle = "#7FD3FF"; c.beginPath(); c.arc(px, py, 3.2 * (1 - t * 0.5), 0, 7); c.fill();
      c.fillStyle = "rgba(255,255,255,0.85)"; c.beginPath(); c.arc(px - 0.9, py - 0.9, 1.1, 0, 7); c.fill();
    }
  }
  if (S.splashes.length){ S.splashes = S.splashes.filter(sp => sp.t < 45); needDraw = true; }
  // crab mascot by the pillar
  const md = S.mood.until > S.play || S.mode === "over" ? S.mood.type : "idle";
  const bob = reduceMotion ? 0 : Math.sin(T / 14) * 1.5 + (md === "happy" ? -Math.abs(Math.sin(T / 5)) * 4 : 0) + (md === "worried" ? Math.sin(T * 1.3) * 1.5 : 0);
  c.drawImage(L.crab[md] || L.crab.idle, W/2 + 48, WATER_Y - 46 + bob, 80, 64);
  placeTalk(md, bob);
  c.setTransform(k, 0, 0, k, 0, 0);
  if (S.mode === "playing" && S.play < S.speedUntil){ c.fillStyle = "rgba(255,123,53,0.08)"; c.fillRect(0, 0, W, H); }
  if (S.mode === "over" && S.over === "drops"){ c.fillStyle = "rgba(242,70,62,0.12)"; c.fillRect(0, 0, W, H); }
}
function drawRuler(c){
  c.save();
  c.font = "13px " + K.FONTS.dot; c.textBaseline = "middle";
  for (let f = 1; f <= 30; f++){
    const y = -f * FLOOR; if (y < S.camTop - 20 || y > S.camTop + H + 20) continue;
    const st = STAGES.find(s => s.at === f);
    if (st){
      c.strokeStyle = "rgba(255,255,255,0.85)"; c.lineWidth = 2; c.setLineDash([8, 7]);
      c.beginPath(); c.moveTo(40, y); c.lineTo(W, y); c.stroke(); c.setLineDash([]);
    }
    c.fillStyle = st ? "#FFE45C" : "rgba(37,49,122,0.55)";
    roundRect(c, 4, y - 10, 34, 20, 8); c.fill();
    c.fillStyle = st ? "#25317A" : "#FFFFFF"; c.textAlign = "center"; c.fillText(f + "F", 21, y + 1);
  }
  if (S.best > 8 && S.mode !== "idle"){
    const y = -S.best; c.strokeStyle = "rgba(255,95,162,0.9)"; c.lineWidth = 2; c.setLineDash([3, 5]);
    c.beginPath(); c.moveTo(40, y); c.lineTo(W - 8, y); c.stroke(); c.setLineDash([]);
  }
  c.restore();
}
function drawLabels(c){
  c.save(); c.textBaseline = "middle";
  for (const st of STAGES){
    if (!st.at) continue; const y = -st.at * FLOOR; if (y < S.camTop - 30 || y > S.camTop + H + 30) continue;
    const label = st.zh + "  " + st.en;
    c.font = "700 13px " + K.FONTS.zh; const tw = c.measureText(label).width;
    c.fillStyle = "rgba(37,49,122,0.92)"; roundRect(c, W - tw - 22, y - 26, tw + 16, 21, 9); c.fill();
    c.fillStyle = "#FFE45C"; c.textAlign = "left"; c.fillText(label, W - tw - 14, y - 15.5);
  }
  if (S.best > 8 && S.mode !== "idle"){
    const y = -S.best, txt = "BEST " + (S.best / FLOOR).toFixed(1) + "F";
    c.font = "12px " + K.FONTS.dot; const tw = c.measureText(txt).width;
    c.fillStyle = "#FF5FA2"; c.beginPath(); c.moveTo(42, y - 22); c.lineTo(42, y + 2); c.lineTo(38, y + 2); c.lineTo(38, y - 22); c.fill();
    c.beginPath(); c.moveTo(42, y - 22); c.lineTo(58, y - 17); c.lineTo(42, y - 12); c.fill();
    c.fillStyle = "rgba(255,255,255,0.95)"; roundRect(c, 62, y - 24, tw + 14, 18, 9); c.fill();
    c.fillStyle = "#25317A"; c.textAlign = "left"; c.fillText(txt, 69, y - 14.5);
  }
  c.restore();
}
function mixHex(a, b, t){ const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const ch = sh => Math.round(((pa >> sh) & 255) * (1 - t) + ((pb >> sh) & 255) * t);
  return "rgb(" + ch(16) + "," + ch(8) + "," + ch(0) + ")"; }
function roundRect(c, x, y, w, h, r){ c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }

const previewCache = new Map();
let previewsWaiting = false;   // a preview was drawn from a stand-in sprite; redraw it when the right one is made
function previewInto(canvas, def){
  // the size is measured once per layout (resize clears it): measuring forces a layout, and hidden ones are skipped
  const r = canvas._sz || (canvas._sz = canvas.getBoundingClientRect());
  if (!r.width || !r.height) return;
  const g = canvas.getContext("2d");
  const w = Math.max(20, Math.round(r.width * DPR)), h = Math.max(20, Math.round(r.height * DPR));
  if (canvas.width !== w || canvas.height !== h){ canvas.width = w; canvas.height = h; }
  g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, w, h);
  if (!def){
    if (canvas.dataset.slot){ const m = Math.min(w, h) * 0.18; g.strokeStyle = "rgba(91,81,108,0.45)"; g.lineWidth = Math.max(1.5, w * 0.025); g.setLineDash([w * 0.06, w * 0.05]);
      roundRect(g, m, m, w - 2*m, h - 2*m, w * 0.12); g.stroke(); g.setLineDash([]);
      g.fillStyle = "rgba(91,81,108,0.7)"; g.font = "800 " + Math.round(h * 0.2) + "px " + K.FONTS.display; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(canvas.dataset.slot, w/2, h/2 + h*0.02); }
    return;
  }
  let b = previewCache.get(def.id); if (!b){ b = def.make(0, 0); previewCache.set(def.id, b); }
  const bw = b.bounds.max.x - b.bounds.min.x, bh = b.bounds.max.y - b.bounds.min.y;
  const s = Math.min(w, h) * 0.8 / Math.max(bw, bh, 64);
  g.setTransform(s, 0, 0, s, w/2 - (b.bounds.min.x + bw/2) * s, h/2 - (b.bounds.min.y + bh/2) * s);
  // reuse the board sprite (cached) instead of re-sculpting the clay for every ticket and card thumbnail; one made
  // before a resize stands in until the sharp one is ready
  try {
    let sp = SPR.get(def.id + "|0");
    if (!sp) sp = spriteFor(def, 0);
    else if (!kOK(sp)){ wantSprite(def, 0, 0); previewsWaiting = true; }
    g.imageSmoothingQuality = "high"; g.drawImage(sp.img, sp.x0, sp.y0, sp.w, sp.h);
  } catch(e){ try { def.draw(g); } catch(e2){} }
}
function nameInto(el, def, empty){
  el.replaceChildren();
  if (!def){ const s = document.createElement("small"); s.textContent = empty; el.appendChild(s); return; }
  el.append(document.createTextNode(def.en));
  const z = document.createElement("small"); z.textContent = def.zh; el.appendChild(z);
  const chip = document.createElement("span"); chip.className = "kind " + def.kind;
  chip.textContent = def.kind === "wise" ? "Stable 穩陣" : def.kind === "risky" ? "Risky 高危" : "Scam 騙局";
  el.appendChild(chip);
  if (def.vine){ const v = document.createElement("span"); v.className = "kind vine"; v.textContent = "Vine 藤蔓"; el.appendChild(v); }
}
let lastPrev = "";
function drawPreviews(force){
  if (!S) return;
  const n0 = S.queue[0], n1 = S.queue[1];
  const key = [n0 && n0.id, n1 && n1.id, S.hold && S.hold.id, S.scamLock > 0, SC, DPR].join("|");
  if (key === lastPrev && !force) return; lastPrev = key;
  previewInto($("nextCv"), n0); previewInto($("holdCv"), S.hold); previewInto($("next2Cv"), n1);
  previewInto($("hudNext"), n0); previewInto($("hudHold"), S.hold);
  nameInto($("nextName"), n0, "");
  nameInto($("holdName"), S.hold, S.scamLock > 0 ? "Locked by a scam 被呃咗，暫存鎖住" : "Press C to keep one for later 按C暫存");
  if (S.hold && S.scamLock > 0){ const lk = document.createElement("small"); lk.className = "locked"; lk.textContent = "Locked by a scam 被呃咗，暫存鎖住"; $("holdName").appendChild(lk); }
  $("next2Name").textContent = n1 ? "Then 跟住：" + n1.en + " " + n1.zh : "";
}

// ---------- HUD, passbook, stamps ----------
function buildStatic(){
  const dir = $("dir"); dir.replaceChildren();
  STAGES.slice().reverse().forEach((st, ri) => {
    const i = STAGES.length - 1 - ri;
    const li = document.createElement("li"); li.dataset.i = i;
    const fl = document.createElement("span"); fl.className = "fl"; fl.textContent = st.at ? st.at + "F" : "G/F";
    const nm = document.createElement("span"); nm.className = "nm";
    const b = document.createElement("b"); b.textContent = st.zh; const sm = document.createElement("small"); sm.textContent = st.en;
    nm.append(b, sm); const bar = document.createElement("i"); bar.className = "bar";
    li.append(fl, nm, bar); dir.appendChild(li);
  });
  const fl = $("fallsList"); fl.replaceChildren();
  const ch = $("fallsChips"); ch.replaceChildren();
  const SHORT = {spend:"Overspend 過度消費", scam:"Scams 騙局", delay:"Put off 拖延"};
  Object.entries(TRAPS).forEach(([k, t]) => {
    const li = document.createElement("li"); li.className = "tag " + k;
    const tx = document.createElement("span"); const b = document.createElement("b"); b.textContent = t.en + " " + t.zh;
    const sm = document.createElement("small"); sm.textContent = t.d;
    const ef = document.createElement("em"); ef.className = "eff"; ef.textContent = "In the game: " + t.eff;
    tx.append(b, sm, ef); li.append(svgUse(ICON[k]), tx); fl.appendChild(li);
    const c = document.createElement("li"); c.className = "chip " + k; c.title = t.en + " " + t.zh;
    const n = document.createElement("span"); n.className = "n"; n.id = "fall_" + k; n.textContent = "0";
    const lab = document.createElement("small"); lab.textContent = SHORT[k];
    c.append(svgUse(ICON[k]), n, lab); ch.appendChild(c);
  });
}
function ledger(def, amount, note){
  if (!S) return;
  S.ledger.push({t: S.play, zh: (note ? note + " " : "") + (def.zh || ""), en: def.en || "", amt: amount, bal: S.score, fresh: true});
  if (S.ledger.length > 40) S.ledger.shift();
  renderLedger();
}
function renderLedger(){
  const tb = $("ledgerBody"); tb.replaceChildren();
  const rows = S ? S.ledger.slice(-6) : [];
  if (!rows.length){
    const tr = document.createElement("tr"); tr.className = "ledger-empty"; const td = document.createElement("td"); td.colSpan = 5;
    td.textContent = "Entries print here as items settle, floors are reached and money is lost. 每筆存入同支出都會印喺度。"; tr.appendChild(td); tb.appendChild(tr); return;
  }
  for (const r of rows){
    const tr = document.createElement("tr"); if (r.fresh){ tr.className = "new"; r.fresh = false; }
    const cells = [mmss(r.t), r.zh || r.en, r.amt > 0 ? fmtShort(r.amt) : "", r.amt < 0 ? fmtShort(r.amt) : "", fmtShort(r.bal)];
    cells.forEach((v, i) => { const td = document.createElement("td"); td.textContent = v; if (i === 1) td.title = r.en; if (i === 2) td.className = "in"; if (i === 3) td.className = "out"; tr.appendChild(td); });
    tb.appendChild(tr);
  }
}
let lastSec = -1;
function updateTime(){
  const left = Math.max(0, GAME_MS - S.play), sec = Math.ceil(left / 1000);
  if (sec === lastSec) return; lastSec = sec;
  const t = Math.floor(sec / 60) + ":" + String(sec % 60).padStart(2, "0");
  $("timeVal").textContent = t; $("hudTime").textContent = t;
  $("timeVal").classList.toggle("warn", sec <= 30);
  if (sec <= 30 && !S.warned && S.mode === "playing"){ S.warned = true; A.sfx("timeWarn"); stamp("30 seconds left", "仲有30秒", "info"); quip("hurry", 3); }
  statusQuips();
}
function updateHUD(){
  if (!S) return;
  $("nwVal").textContent = fmt(S.score);
  $("hudNw").textContent = (window.innerWidth < 400 && S.score >= 10000) ? "HK$" + (S.score / 1000).toFixed(S.score >= 100000 ? 0 : 1) + "K" : fmt(S.score);
  $("rateVal").textContent = "×" + S.rate.toFixed(1);
  const fl = S.best / FLOOR;
  $("heightVal").textContent = fl.toFixed(1) + "F"; $("hudH").textContent = fl.toFixed(1) + "F";
  $("hudDrops").textContent = S.drops + "/" + MAX_DROPS;
  [...$("fundCoins").children].forEach((p, i) => p.classList.toggle("on", i < S.fund));
  [...$("dropCoins").children].forEach((p, i) => p.classList.toggle("hit", i < S.drops));
  for (const k in S.falls){ const el = $("fall_" + k); if (el.textContent !== String(S.falls[k])){ el.textContent = S.falls[k]; el.classList.remove("hit"); void el.offsetWidth; if (S.falls[k]) el.classList.add("hit"); } }
  $("dir").querySelectorAll("li").forEach(li => {
    const i = +li.dataset.i, st = STAGES[i], nextAt = i < STAGES.length - 1 ? STAGES[i + 1].at : TOP_AT;
    li.querySelector(".bar").style.width = (clamp((fl - st.at) / (nextAt - st.at), 0, 1) * 100) + "%";
    li.classList.toggle("on", i === S.stage && S.mode !== "idle");
    li.classList.toggle("done", fl >= nextAt);
  });
  lastSec = -1; updateTime();
}
function crab(en, zh){ const p = $("crabMsg"); p.replaceChildren(document.createTextNode(en)); const s = document.createElement("small"); s.textContent = zh; p.appendChild(s); }
function mood(type, ms){ if (S) S.mood = {type, until: S.play + ms}; }
let stampN = 0;
function stamp(en, zh, kind){
  const box = $("stamps"); while (box.children.length >= 2) box.firstChild.remove();
  const d = document.createElement("div"); d.className = "stamp " + (kind || "info");
  const slot = stampN++ % 2, a = S && S.active;
  const highItem = a && (a.position.y - S.camTop) < H * 0.45;
  if (highItem) d.style.bottom = "calc(max(" + (WATER_Y - S.camTop > H ? 8 : Math.round((H - (WATER_Y - S.camTop)) / H * 100) + 4) + "%, " + Math.round(talkBand()) + "px) + " + (slot * 50) + "px)";   // above the crab's bubble
  else d.style.top = "calc(10px + " + (slot * 50) + "px)";
  d.style.setProperty("--r", ((stampN % 2 ? -1 : 1) * (2 + (stampN % 3) * 1.5)) + "deg");
  d.textContent = en; const z = document.createElement("small"); z.textContent = zh; d.appendChild(z);
  box.appendChild(d); A.sfx("stamp"); setTimeout(() => d.remove(), 1800);
}
// ---------- the crab's speech bubble ----------
// The crab by the harbour cheers good choices and teases bad ones (lines in content.js). Each moment has a priority:
// 3 always speaks (new stage, last item left, final seconds, game over), 2 cuts in over small talk (card results,
// drops, shocks, money milestones), 1 is small talk, said only after the crab has been quiet for a while. A line
// stays up for game time, so a pause or a Life Event card doesn't use it up (longer with Extra reading time); a
// line that had to give way to a more important one is said right after it, if it's still fresh.
const talk = {el: $("bubble"), say: $("bubbleSay"), face: document.querySelector("#bubble .face"), on: false, pri: 0, until: 0, last: -1e9,
  pick: {}, w: 0, h: 0, x: NaN, y: NaN, docked: null, mood: "", next: null};
function quip(key, pri, n){
  const pool = QUIPS[key]; if (!S || !pool) return;
  const now = S.play, busy = talk.on && (S.mode !== "playing" || now < talk.until);
  if (busy && pri < talk.pri){ if (pri >= 2) talk.next = {key, pri, n, at: now}; return; }   // something more important is being said
  if (pri <= 1 && (busy || now - talk.last < 6000)) return;            // small talk waits for a quiet moment
  let i = Math.floor(Math.random() * pool.length);
  if (pool.length > 1 && i === talk.pick[key]) i = (i + 1) % pool.length;
  talk.pick[key] = i;
  const [en, zh] = pool[i].map(t => t.replace("{n}", n == null ? "" : n));
  const z = document.createElement("small"); z.lang = "zh-HK"; z.textContent = zh;
  talk.say.replaceChildren(document.createTextNode(en), z);
  const b = talk.el; b.style.maxWidth = Math.round(Math.min(250, TALK_TIP * SC - 16)) + "px";
  b.hidden = false; b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
  talk.w = b.offsetWidth; talk.h = b.offsetHeight; talk.x = talk.y = NaN;
  talk.on = true; talk.pri = pri; talk.last = now; talk.until = now + Math.min(5200, 2400 + en.length * 45) * (slowRead ? 1.6 : 1);
  needDraw = true;
}
function hush(){ talk.on = false; talk.pri = 0; talk.until = 0; talk.last = -1e9; talk.next = null; talk.el.hidden = true; }
// shown while playing (until its time is up), and after the game (the verdict stays with the tower); not under a
// card, the pause card or the start card
function syncTalk(){
  if (S.mode === "playing" && talk.on && S.play >= talk.until){
    talk.on = false;
    const q = talk.next; talk.next = null;
    if (q && S.play - q.at < 6000) quip(q.key, q.pri, q.n);
  }
  const show = talk.on && !sideways && (S.mode === "playing" || S.mode === "over" || (S.mode === "idle" && S.viewing));
  if (talk.el.hidden === show){ talk.el.hidden = !show; if (show){ talk.x = NaN; needDraw = true; } }
}
// The bubble sits left of the crab, level with its claws, between the platform and the water, so it never covers the
// tower or where items land. Once the camera has climbed past the harbour it waits at the bottom of the board.
const TALK_TIP = W/2 + 50, TALK_ROOM = 70;   // world x of the tail's tip (the crab's left claw); a tall bubble in px
function placeTalk(md, bob){
  const b = talk.el; if (b.hidden) return;
  const cw = W * SC, ch = H * SC, tipX = TALK_TIP * SC, tipY = (WATER_Y - 30 + bob - S.camTop) * SC;
  const floor = ch - (S.mode === "idle" && S.viewing ? 76 : 14);     // clear of Play again when looking at the tower
  const docked = tipY + talk.h / 2 > floor;
  if (docked !== talk.docked){ talk.docked = docked; b.classList.toggle("docked", docked); talk.w = b.offsetWidth; talk.h = b.offsetHeight; }
  if (docked && talk.mood !== md && L.crab){
    talk.mood = md; const g = talk.face.getContext("2d"); g.clearRect(0, 0, 64, 52); g.drawImage(L.crab[md] || L.crab.idle, 0, 0, 64, 52);
  }
  let x, y;
  if (docked){ x = cw - talk.w - 10; y = floor - talk.h; }
  else { x = tipX - 10 - talk.w; y = Math.max((30 - S.camTop) * SC + 4, tipY - talk.h / 2); }   // never above the platform's underside
  x = Math.round(clamp(x, 6, cw - talk.w - 6)); y = Math.round(Math.max(6, y));
  if (x !== talk.x || y !== talk.y){ talk.x = x; talk.y = y; b.style.transform = "translate(" + x + "px," + y + "px)"; }
}
// how far up from the board's bottom the bubble may reach, in px: stamps placed low stay above it
function talkBand(){
  const ch = H * SC, under = (30 - S.camTop) * SC, tipY = (WATER_Y - 30 - S.camTop) * SC;
  const top = tipY + TALK_ROOM / 2 > ch - 14 ? ch - 14 - TALK_ROOM : Math.min(Math.max(under + 4, tipY - TALK_ROOM / 2), ch - 14 - TALK_ROOM);
  return ch - top + 6;
}
// status and progress, checked once a second and when money changes: money milestones, a new personal best, a slow
// start, a clean run, an emergency fund that's empty just before a shock
function statusQuips(){
  if (!S || S.mode !== "playing") return;
  const once = (k, cond, pri, n) => { if (cond && !S.said.has(k)){ S.said.add(k); quip(k.replace(/\d+$/, ""), pri, n); } };
  for (const v of [10000, 25000, 50000, 100000]) once("rich" + v, S.score >= v, 2, fmt(v));
  once("pb", S.pb > 0 && S.score > S.pb, 2);
  once("poor", S.play > 70000 && S.score < 3000, 1);
  once("clean", S.play > 120000 && S.drops === 0, 1);
  if (S.shocks.length && S.fund === 0 && S.play >= S.shocks[0] - 5000 && !S.said.has("noFund" + S.shocks[0])){ S.said.add("noFund" + S.shocks[0]); quip("noFund", 2); }
}

// ---------- loop ----------
let last = performance.now(), needDraw = true;   // needDraw: the picture changed outside the physics (resize, a new sprite)
// A phone turned sideways mid-game would leave a tiny board: the game pauses (a Life Event card's clock stops too)
// and asks for the phone to be turned back. The statement and the leaderboard work either way.
const SIDEWAYS = matchMedia("(orientation: landscape) and (max-height: 500px) and (pointer: coarse)");
let sideways = false;
const awake = () => engine.world.bodies.some(b => b.tff && !b.isSleeping);
function frame(now){
  const dt = Math.min(50, now - last); last = now;
  if (S){
    const side = SIDEWAYS.matches && (S.mode === "playing" || S.mode === "paused" || S.mode === "card");
    if (side !== sideways){ sideways = side; $("turnOv").hidden = !side; if (side && S.mode === "playing") togglePause(); }
    let live = false;
    if (S.mode === "card" && S.card){
      if (!sideways) S.card.t += dt;
      if (!S.card.flip){
        const left = cardMs() - S.card.t;
        $("cardBar").style.transform = "scaleX(" + Math.max(0, left / cardMs()).toFixed(3) + ")";
        const sec = Math.ceil(left / 1000); if (sec <= 3 && sec < S.card.lastTick && sec > 0){ S.card.lastTick = sec; A.sfx("cardTick"); }
        if (S.card.t >= cardMs()) choose("none");
      } else if (!slowRead && S.card.t - S.card.flipAt > RESULT_MS) closeCard();
    } else if (S.mode === "playing"){ tick(dt); live = true; }
    else if (S.mode === "over" || (S.mode === "idle" && S.viewing)){
      S.acc += dt; let n = 0; while (S.acc >= STEP && n++ < 3){ S.acc -= STEP; snap(); worldStep(); }
      live = S.mode !== "over" || $("endModal").hidden || awake();   // under the statement, a settled tower stays as drawn
    }
    ALPHA = clamp(S.acc / STEP, 0, 1);
    syncTalk();
    // A still scene (start card, Life Event card, pause, statement over a settled tower) isn't redrawn 60 times a
    // second: that saves battery and keeps scrolling and the cards' animations smooth on phones.
    if (live || needDraw || S.shake > 0 || S.splashes.length || S.leaves.length || Math.abs(camTarget() - S.camTop) > 0.05){ needDraw = false; draw(dt); }
  }
  requestAnimationFrame(frame);
}
function tick(dt){
  S.play += dt; updateTime();
  if (S.play >= GAME_MS){ endGame("time"); return; }
  if (S.fastOn && S.play >= S.speedUntil){ S.fastOn = false; A.mode("normal"); }
  if (S.active && S.play >= S.nextEvent){ openCard(); return; }
  if (!S.plan && S.play >= S.nextEvent - 4000) S.plan = planCard();
  if (S.active && S.shocks.length && S.play >= S.shocks[0]){ S.shocks.shift(); shock(); }
  if (!S.active && S.spawnAt && S.play >= S.spawnAt){ S.spawnAt = 0; if (S.scamLock > 0) S.scamLock--; nextPiece(); }
  S.acc += dt; let n = 0;
  while (S.acc >= STEP && n++ < 4){ S.acc -= STEP; physicsStep(); if (S.mode !== "playing") return; }
  if (S.acc > STEP * 4) S.acc = 0;
}

// ---------- end screen ----------
function showEnd(){
  const st = STAGES[S.stage];
  const top = S.stage === STAGES.length - 1;
  $("stDate").textContent = "STATEMENT · " + new Date().toLocaleDateString("en-GB", {day:"2-digit", month:"short", year:"numeric"}).toUpperCase();
  $("endEyebrow").textContent = S.over === "drops" ? "整冧咗！ 3 items fell into the harbour" : "夠鐘！ Time's up";
  $("endTitle").textContent = top ? "You made it to Retirement" : "You reached " + st.en;
  const etz = document.createElement("span"); etz.className = "zh"; etz.textContent = top ? "成功退休！" : "去到「" + st.zh + "」"; $("endTitle").appendChild(etz);
  const ft = S.falls.spend + S.falls.scam + S.falls.delay;
  $("endSub").textContent = ft === 0 ? "No money traps at all! 一次都冇中伏！" : "You fell into " + ft + " money trap" + (ft > 1 ? "s" : "") + ". 中咗" + ft + "次伏。";
  $("rStage").textContent = st.zh + " " + st.en;
  $("rNw").textContent = fmt(S.score);
  $("rHeight").textContent = (S.best / FLOOR).toFixed(1) + "F";
  $("rWise").textContent = S.wise + "/" + (S.wise + S.risky + S.missed);
  const fr = $("fallRep"); fr.replaceChildren();
  const row = (icon, bg, title, sub, count) => {
    const li = document.createElement("li"); const ic = svgUse(icon); ic.style.background = bg; ic.style.borderRadius = "8px"; ic.style.padding = "2px";
    const m = document.createElement("span"); m.textContent = title; const s = document.createElement("small"); s.textContent = sub; m.appendChild(s);
    const c = document.createElement("span"); c.className = "fc"; c.textContent = "×" + count; c.style.color = count ? "var(--red-d)" : "var(--green-t)";
    li.append(ic, m, c); fr.appendChild(li);
  };
  // a row (with what it is) for each Fall the player hit and for drops; the Falls they dodged share one line
  const FALLS = [["spend", "i-spend", "var(--orange)"], ["scam", "i-scam", "var(--purple)"], ["delay", "i-delay", "var(--blue)"]];
  for (const [k, icon, bg] of FALLS) if (S.falls[k]) row(icon, bg, TRAPS[k].en + " " + TRAPS[k].zh, TRAPS[k].d, S.falls[k]);
  if (S.drops) row("i-drop", "#fff", "Items dropped 跌落海", "Each one cost HK$1,000 每件扣HK$1,000", S.drops);
  const dodged = FALLS.filter(([k]) => !S.falls[k]);
  if (dodged.length){
    const li = document.createElement("li"); li.className = "dodged";
    const m = document.createElement("span"); m.textContent = dodged.length === 3 ? "Dodged all 3 Falls" : "Dodged: " + dodged.map(([k]) => TRAPS[k].en).join(", ");
    const z = document.createElement("small"); z.textContent = dodged.length === 3 ? "三大陷阱全部避開" : "避開咗：" + dodged.map(([k]) => TRAPS[k].zh).join("、"); m.appendChild(z);
    li.append(svgUse("i-good"), m); fr.appendChild(li);
  }
  // Quiz: each answer is marked right or wrong the moment it's tapped, with the reason, and then locked.
  const qz = $("quiz"); qz.replaceChildren(); S.quiz = QUIZ.map(() => null);
  const quizScore = () => { $("quizScore").textContent = S.quiz.filter(x => x && x.ok).length + "/" + QUIZ.length; };
  quizScore();
  QUIZ.forEach((q, qi) => {
    const fs = document.createElement("fieldset"); fs.className = "qz";
    const lg = document.createElement("legend"); lg.textContent = (qi + 1) + ". " + q.q[0];
    const lz = document.createElement("small"); lz.textContent = q.q[1]; lg.appendChild(lz);
    const box = document.createElement("div"); box.className = "qopts";
    const fb = document.createElement("p"); fb.className = "qfb"; fb.setAttribute("role", "status");
    q.o.forEach((o, oi) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "qopt";
      b.textContent = o[0]; const z = document.createElement("small"); z.textContent = o[1]; b.appendChild(z);
      b.addEventListener("click", () => {
        if (S.quiz[qi]) return;
        const ok = oi === q.a; S.quiz[qi] = {pick: oi, ok}; A.sfx(ok ? "deposit" : "risky");
        [...box.children].forEach((bb, j) => { bb.disabled = true; bb.classList.add(j === q.a ? "is-right" : j === oi ? "is-wrong" : "is-dim"); });
        b.setAttribute("aria-pressed", "true");
        const head = document.createElement("b");
        head.textContent = ok ? "✓ Correct! 答啱咗！" : "✗ Not quite. It's “" + q.o[q.a][0] + "”. 答錯咗，答案係「" + q.o[q.a][1] + "」。";
        const why = document.createElement("span"); why.textContent = q.why[0];
        const wz = document.createElement("small"); wz.textContent = q.why[1];
        fb.className = "qfb " + (ok ? "ok" : "no"); fb.replaceChildren(head, why, wz);
        quizScore(); saveSoon();
      });
      box.appendChild(b);
    });
    fs.append(lg, box, fb); qz.appendChild(fs);
  });
  // Habit: nothing is ticked until the player picks one, so the analysis only counts real pledges.
  const hb = $("habits"); hb.replaceChildren(); S.habit = null;
  HABITS.forEach(h => {
    const lab = document.createElement("label"); lab.className = "habit";
    const inp = document.createElement("input"); inp.type = "radio"; inp.name = "habit"; inp.value = h.id; inp.id = "habit_" + h.id;
    inp.addEventListener("change", () => { if (inp.checked){ S.habit = h.id; saveSoon(); } });
    const t = document.createElement("span"); t.textContent = h.en; const z = document.createElement("small"); z.textContent = h.zh; t.appendChild(z);
    lab.append(inp, t); hb.appendChild(lab);
  });
  $("nickname").value = lsGet("tff_name", "");
  const live = apiAllowed && !apiGone && dbWritable;
  $("email").value = ""; emailError(false); $("email").closest(".fld").hidden = $("emailNote").closest(".email-note").hidden = !live;   // never kept on the device
  $("postBtn").disabled = false; $("postBtn").firstChild.textContent = "Post score";
  const ps = $("postStatus"); ps.className = "post-status";
  ps.textContent = live ? "Only your nickname and score go on the board. 排行榜只顯示暱稱同分數。" : "Your score will be saved on this device. 分數會存喺呢部機。";
  $("endModal").hidden = false; $("stScroll").scrollTop = 0; endScroll = 0;
  endShownAt = performance.now(); modalOpen(true);
  $("endTitle").focus({preventScroll:true});
  const game = S; game.rec = newRecord();
  saveRecord(game).catch(e => keepForLater(game, e));
  planFirst();
}

// ---------- leaderboard: live board from /api/scores (Cloudflare Pages Function + D1); this device is the fallback ----------
const API = "/api/scores";
const apiAllowed = /^https?:$/.test(location.protocol);
let db = null, dbWritable = true, tab = "week", lbAll = [], lbWeek = [], myLastId = null, myLocalAt = null;
let liveWeek = null, lbSig = "", pollTimer = 0, pollFails = 0, apiGone = false, lbVisible = true, lastFetch = -1e9, fetching = null;
const localWeek = () => isoWeek(new Date());
const curWeek = () => liveWeek || localWeek();
const localScores = () => lsGet("tff_scores_v3", []);
const localList = () => { const wk = localWeek(); return localScores().filter(e => tab === "all" || e.week === wk); };
const myIds = new Set(lsGet("tff_my_ids", []));
let myPost = lsGet("tff_my_post", null);   // last live post {id, rank, week, name, score, height}: shown under the top 10 when it is not in it
const ANON = "Anonymous crab 匿名蟹";
function sanitizeName(n){ const v = String(n || "").replace(/[\u0000-\u001f<>]/g, "").trim(); return !v || v === ANON ? ANON : Array.from(v).slice(0, 16).join(""); }
async function api(url, opts = {}){
  const ctl = typeof AbortController === "function" ? new AbortController() : null;
  const to = ctl ? setTimeout(() => ctl.abort(), 9000) : 0;
  try {
    const r = await fetch(url, {...opts, cache: "no-store", credentials: "same-origin", signal: ctl ? ctl.signal : undefined,
      headers: {accept: "application/json", ...(opts.headers || {})}});
    let j = null;
    try { const t = await r.text(); const v = JSON.parse(t); if (v && typeof v === "object" && "ok" in v) j = v; } catch(e){}
    if (!j){ const e = new Error("no api"); e.status = r.status; e.noApi = true; throw e; }
    if (!r.ok || j.ok !== true){ const e = new Error(j.error || "HTTP " + r.status); e.status = r.status; e.code = j.error; throw e; }
    return j;
  } finally { if (to) clearTimeout(to); }
}
function refreshLB(force){
  if (apiGone || !apiAllowed) return Promise.resolve(false);
  if (fetching) return force ? fetching.then(() => refreshLB()) : fetching;
  lastFetch = performance.now();
  fetching = api(API).then(j => {
    const first = !db;
    db = db || {live: true}; liveWeek = j.week || null; dbWritable = !j.closed;
    lbWeek = (j.weekTop || []).map(e => ({...e, _id: e.id}));
    lbAll = (j.allTop || []).map(e => ({...e, _id: e.id}));
    if (tab !== "insights" || first) renderLB();
    return true;
  }).catch(e => {
    // Static-only hosting answers "static_only" (public/api/scores); a Worker without D1 answers "no_database".
    // Anything else (offline, captive portal, error page) is treated as temporary and retried.
    if (e.code === "no_database" || e.code === "static_only") apiGone = true;
    if (!db && tab !== "insights") renderLB();
    return false;
  }).finally(() => { fetching = null; });
  return fetching;
}
function schedulePoll(ms){
  clearTimeout(pollTimer); if (apiGone || !apiAllowed) return;
  pollTimer = setTimeout(async () => {
    if (document.visibilityState === "visible" && lbVisible){ pollFails = (await refreshLB()) ? 0 : pollFails + 1; }
    schedulePoll(45000 * Math.pow(2, Math.min(pollFails, 3)));
  }, ms);
}
// ---------- this game's record ----------
// Every finished game is saved as soon as the statement opens, anonymously: it feeds the Stats tab and the team's
// survey analysis, not the board. It is saved again as the player answers the quiz, picks a habit and posts. Each
// save sends the whole state with the game's random id and key, so the API keeps one row per game in whatever
// order saves arrive. A save that can't get through waits on this device (without name or email) for the next visit.
const hex = n => { const a = new Uint8Array(n); crypto.getRandomValues(a); return Array.from(a, b => b.toString(16).padStart(2, "0")).join(""); };
const newRecord = () => ({gid: hex(16), key: hex(24), board: false, name: "", email: "", sent: "", last: null, chain: Promise.resolve(), timer: 0});
const answersOf = st => st.quiz.flatMap((x, i) => x ? [{q: QUIZ[i].id, pick: x.pick}] : []);
function recordBody(st){
  const r = st.rec;
  return {gid: r.gid, key: r.key, board: r.board, name: r.board ? r.name : undefined, email: r.board && r.email ? r.email : undefined,
    score: Math.round(st.score), stage: st.stage, height: +(st.best / FLOOR).toFixed(1), drops: st.drops,
    wise: st.wise, risky: st.risky, missed: st.missed, falls: {...st.falls}, choices: st.choices.slice(0, 20), ended: st.over,
    answers: answersOf(st), habit: st.habit || null};
}
// Saves go out one at a time; each sends the latest state, and only if it changed since the last one.
function saveRecord(st, opts = {}){
  const r = st.rec; if (!r) return Promise.resolve(null);
  clearTimeout(r.timer); r.timer = 0;
  const run = async () => {
    if (!db && apiAllowed && !apiGone) await refreshLB();
    if (!db || !dbWritable){ const e = new Error("offline"); e.offline = true; if (db) e.code = "closed"; throw e; }
    const body = JSON.stringify(recordBody(st));
    if (body === r.sent) return r.last;
    const j = await api(API, {method: "POST", headers: {"content-type": "application/json"}, body, keepalive: !!opts.keepalive});
    r.sent = body; r.last = j; dropOutbox(r.gid);
    return j;
  };
  const p = r.chain.then(run);
  r.chain = p.catch(() => {});
  return p;
}
function saveSoon(){
  const st = S, r = st && st.rec; if (!r) return;
  clearTimeout(r.timer);
  r.timer = setTimeout(() => { r.timer = 0; saveRecord(st).catch(e => keepForLater(st, e)); }, 700);
}
function flushRecord(st, leaving){   // send a waiting save now (new game, or the page is being hidden)
  const r = st && st.rec; if (!r || !r.timer) return;
  saveRecord(st, {keepalive: leaving}).catch(e => keepForLater(st, e));
}
const OUTBOX = "tff_outbox";
function keepForLater(st, e){
  if (!apiAllowed || apiGone || !st.rec) return;   // no live board here at all
  if (e && (e.code === "closed" || e.code === "locked" || e.code === "bad_key" || (e.status >= 400 && e.status < 500 && e.status !== 429))) return;
  const body = recordBody(st); body.board = false; delete body.name; delete body.email;   // a later retry never posts to the board
  body.t = Date.now();
  lsSet(OUTBOX, lsGet(OUTBOX, []).filter(x => x.gid !== body.gid).concat([body]).slice(-20));
}
function dropOutbox(gid){ const box = lsGet(OUTBOX, []); if (box.some(x => x.gid === gid)) lsSet(OUTBOX, box.filter(x => x.gid !== gid)); }
async function flushOutbox(){
  const box = lsGet(OUTBOX, []).filter(x => x && x.gid && Date.now() - (x.t || 0) < 2 * 86400000);
  lsSet(OUTBOX, box);
  if (!box.length || !db || !dbWritable) return;
  for (const x of box){
    const body = {...x}; delete body.t;
    try { await api(API, {method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify(body)}); dropOutbox(x.gid); }
    catch(e){ if (e.status >= 400 && e.status < 500 && e.status !== 429) dropOutbox(x.gid); else break; }
  }
}

const EMAIL_OK = /^[^\s@<>()[\]\\,;:"]{1,64}@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:".]{2,}$/;
function emailError(on){   // red outline plus aria-invalid, and the message under the button is read out with the field
  const em = $("email"), notes = ["emailNote", "privacyNote"].filter(id => $(id)).join(" ");
  em.classList.toggle("bad", on);
  if (on) em.setAttribute("aria-invalid", "true"); else em.removeAttribute("aria-invalid");
  em.setAttribute("aria-describedby", (on ? "postStatus " : "") + notes);
}
// the result of posting appears under the button: scroll it into view if it's below the visible part
const showStatus = () => requestAnimationFrame(() => {
  const box = $("stScroll"), over = $("postStatus").getBoundingClientRect().bottom - box.getBoundingClientRect().bottom + 8;
  if (over > 0) box.scrollBy({top: over, behavior: reduceMotion ? "auto" : "smooth"});
});
$("postBtn").addEventListener("click", async () => {
  const st = S; if (st.posted || st.posting) return;
  const ps = $("postStatus"), btn = $("postBtn"), em = $("email");
  const email = em.closest(".fld").hidden ? "" : em.value.trim();
  if (email && (email.length > 254 || !EMAIL_OK.test(email))){
    emailError(true); em.focus(); ps.className = "post-status bad";
    ps.textContent = "That email doesn't look right. Check it, or leave it blank. 電郵地址好似唔啱，請再檢查，或者留空。";
    return;
  }
  emailError(false); st.posting = true;
  const name = sanitizeName($("nickname").value); lsSet("tff_name", name === ANON ? "" : name);
  const answers = answersOf(st), right = st.quiz.filter(x => x && x.ok).length;
  const entry = {name, score: Math.round(st.score), stage: st.stage, height: +(st.best / FLOOR).toFixed(1), drops: st.drops,
    wise: st.wise, risky: st.risky, missed: st.missed, falls: {...st.falls}, choices: st.choices.slice(0, 20), habit: st.habit || null,
    answers, quiz: answers.length ? right : null, ended: st.over, at: new Date().toISOString(), week: localWeek()};   // the device copy never holds the email
  btn.disabled = true; btn.firstChild.textContent = "Posting…"; ps.className = "post-status";
  if (!db && apiAllowed && !apiGone) await refreshLB();
  const saveLocal = () => { const arr = localScores(); arr.push(entry); lsSet("tff_scores_v3", arr.slice(-100)); };
  if (db && dbWritable){
    const r = st.rec || (st.rec = newRecord());
    r.board = true; r.name = name; r.email = email;
    try {
      const j = await saveRecord(st);
      myLastId = j.id; myIds.add(j.id); lsSet("tff_my_ids", [...myIds].slice(-30)); st.posted = true; st.posting = false;
      myPost = {id: j.id, rank: j.rank || (j.rankCap || 500) + 1, week: j.week, name: j.name || name, score: entry.score, height: entry.height}; lsSet("tff_my_post", myPost);
      if (st === S){
        A.sfx("post"); ps.className = "post-status ok";
        ps.textContent = (j.rank ? "You're #" + j.rank + " this week! 今個星期排第" + j.rank + "！ " : "On the live board! 已上榜！ ") +
          (email ? "We'll email you if you win a prize. 如果你得獎，我哋會電郵通知你。" : "Top scorers each week and month win prizes. 每週同每月最高分都有獎！");
        btn.firstChild.textContent = "Posted ✓"; showStatus();
      }
      lbSig = ""; refreshLB(true);
      return;
    } catch(e){
      r.board = false; r.name = ""; r.email = "";   // posting happens only on a tap, so a later survey save mustn't post it
      if (e.code === "bad_email"){
        st.posting = false;
        if (st === S){ btn.disabled = false; btn.firstChild.textContent = "Post score"; emailError(true); em.focus(); ps.className = "post-status bad";
          ps.textContent = "That email doesn't look right. Check it, or leave it blank. 電郵地址好似唔啱，請再檢查，或者留空。"; }
        return;
      }
      if (!e.status || e.status === 429 || (e.status >= 500 && e.code !== "no_database")){
        // Busy or offline: keep the button so they can try again.
        st.posting = false;
        if (st === S){
          btn.disabled = false; btn.firstChild.textContent = "Try again";
          ps.textContent = e.status === 429 ? "Lots of crabs posting at once. Wait a moment, then try again. 太多人同時上榜，等陣再試吓。"
                                            : "Couldn't reach the live board. Check your connection, then try again. 連唔到排行榜，檢查吓網絡再試。";
          showStatus();
        }
        return;
      }
      if (e.code === "closed" || e.code === "no_database" || e.status === 403) dbWritable = false;
      if (st === S) ps.textContent = e.code === "closed" ? "The live board is closed for new scores, so yours was saved on this device. 排行榜已經截止，分數存咗喺呢部機。"
                                                         : "The live board couldn't take this score, so it was saved on this device. 排行榜收唔到呢個分數，已經存咗喺呢部機。";
    }
  } else ps.textContent = "Saved on this device. 已經存咗喺呢部機。";
  saveLocal(); myLocalAt = entry.at; st.posted = true; st.posting = false;
  if (st === S){ A.sfx("post"); ps.className = "post-status ok"; btn.firstChild.textContent = "Saved ✓"; showStatus(); }
  lbSig = ""; renderLB();
});
document.querySelectorAll(".tab").forEach(b => b.addEventListener("click", () => {
  tab = b.dataset.tab; document.querySelectorAll(".tab").forEach(x => x.setAttribute("aria-pressed", String(x === b))); renderLB();
  if (tab !== "insights" && performance.now() - lastFetch > 15000) refreshLB();
}));
function lbRow(e, rank, mine){
  const li = document.createElement("li"); if (mine) li.className = "me";
  const r = document.createElement("span"); r.className = "r"; r.textContent = rank;
  const n = document.createElement("span"); n.className = "n"; n.textContent = sanitizeName(e.name);
  const f = document.createElement("span"); f.className = "fl"; f.textContent = typeof e.height === "number" ? e.height.toFixed(1) + "F" : "";
  const s = document.createElement("span"); s.className = "s"; s.textContent = fmt(Number(e.score) || 0);
  li.append(r, n, f, s); return li;
}
function lbRows(list, extra){
  const body = $("lbBody"); body.replaceChildren();
  if (!list.length){ const p = document.createElement("p"); p.className = "lb-empty"; p.textContent = "No scores yet. Be the first crab on the board. 仲未有人上榜，做第一隻蟹！"; body.appendChild(p); return; }
  const ol = document.createElement("ol"); ol.className = "lb";
  list.slice(0, 10).forEach((e, i) => {
    ol.appendChild(lbRow(e, i + 1, (e._id != null && (e._id === myLastId || myIds.has(e._id))) || (e._id == null && e.at && e.at === myLocalAt)));
  });
  if (extra){
    const sep = document.createElement("li"); sep.className = "sep"; sep.setAttribute("aria-hidden", "true"); sep.textContent = "···"; ol.appendChild(sep);
    const you = lbRow(extra, extra.rank > 500 ? "500+" : extra.rank > 10 ? extra.rank : "10+", true); you.classList.add("you");
    you.title = "Your latest score this week, ranked when you posted 你今個星期最新嘅分數"; ol.appendChild(you);
  }
  body.appendChild(ol);
}
function renderLB(){
  const note = $("lbNote");
  if (tab === "insights"){ lbSig = ""; renderInsights(); return; }
  let list, txt;
  if (db){ list = tab === "week" ? lbWeek : lbAll;
    if (!dbWritable) list = list.concat(localList());
    txt = tab === "week" ? "Week " + curWeek().split("-W")[1] + " · resets every Monday 逢星期一重新計算" : "All-time, every player 所有玩家總排名"; }
  else { list = localList(); txt = "Scores on this device 本機紀錄"; }
  list = list.slice().sort((a, b) => (b.score || 0) - (a.score || 0));
  const extra = db && tab === "week" && myPost && myPost.week === curWeek() && myPost.rank > 0 && !list.slice(0, 10).some(e => e._id === myPost.id) ? myPost : null;
  const sig = tab + "|" + txt + "|" + myLastId + "|" + myLocalAt + "|" + (extra ? extra.id : "") + "|" + list.slice(0, 10).map(e => (e._id != null ? e._id : e.at) + ":" + e.score + ":" + e.name).join(",");
  if (sig === lbSig) return;
  lbSig = sig; lbRows(list, extra); note.textContent = txt;
}
function bar(label, val, max, cls){
  const d = document.createElement("div"); d.className = "bar2" + (cls ? " " + cls : "");
  const l = document.createElement("span"); l.textContent = label;
  const v = document.createElement("b"); v.textContent = String(val);
  const tr = document.createElement("span"); tr.className = "track"; const i = document.createElement("i");
  i.style.width = (max ? Math.round(100 * (parseFloat(val) || 0) / max) : 0) + "%"; tr.appendChild(i);
  d.append(l, v, tr); return d;
}
// Same shape the API's ?view=stats returns, so live and on-device data render through one path.
// Quiz figures count finished quizzes only (older saved games kept just the number right).
function aggregate(games){
  const a = {games: games.length, wise: 0, risky: 0, missed: 0, falls: {spend: 0, scam: 0, delay: 0}, habits: {}, quizSum: 0, quizN: 0, quizPass: 0, sample: false};
  games.forEach(gm => {
    a.wise += +gm.wise || 0; a.risky += +gm.risky || 0; a.missed += +gm.missed || 0;
    if (gm.falls) for (const kk in a.falls) a.falls[kk] += +gm.falls[kk] || 0;
    if (gm.habit) a.habits[gm.habit] = (a.habits[gm.habit] || 0) + 1;
    const done = Array.isArray(gm.answers) ? gm.answers.length === QUIZ.length : typeof gm.quiz === "number";
    if (done && typeof gm.quiz === "number"){ a.quizSum += gm.quiz; a.quizN++; if (gm.quiz >= 2) a.quizPass++; }
  });
  return a;
}
function addAgg(a, b){
  const o = {...a, falls: {...a.falls}, habits: {...a.habits}};
  o.games += b.games; o.wise += b.wise; o.risky += b.risky; o.missed += b.missed; o.quizSum += b.quizSum; o.quizN += b.quizN; o.quizPass += b.quizPass || 0;
  for (const kk in o.falls) o.falls[kk] += b.falls[kk] || 0;
  for (const kk in b.habits) o.habits[kk] = (o.habits[kk] || 0) + b.habits[kk];
  return o;
}
async function renderInsights(){
  const body = $("lbBody"), note = $("lbNote");
  body.replaceChildren(); const p = document.createElement("p"); p.className = "lb-empty"; p.textContent = "Loading… 載入中"; body.appendChild(p);
  let agg, label;
  if (db){
    try { const j = await api(API + "?view=stats"); agg = addAgg(aggregate([]), j.stats); agg.sample = !!j.stats.sample; } catch(e){ agg = aggregate([]); }
    if (!dbWritable) agg = addAgg(agg, aggregate(localScores()));
    label = (agg.sample ? "From the latest " : "From ") + agg.games + " game" + (agg.games === 1 ? "" : "s") + ", anonymised 匿名數據";
  } else { agg = aggregate(localScores()); label = "From games saved on this device 本機數據"; }
  if (tab !== "insights") return;
  note.textContent = label;
  body.replaceChildren();
  if (!agg.games){ const q = document.createElement("p"); q.className = "lb-empty"; q.textContent = "Insights appear once players post scores. 有人上榜後就會見到數據。"; body.appendChild(q); return; }
  const falls = agg.falls, total = agg.wise + agg.risky + agg.missed;
  const wrap = document.createElement("div"); wrap.className = "insight";
  wrap.appendChild(bar("Wise choices 明智選擇", (total ? Math.round(100 * agg.wise / total) : 0) + "%", 100));
  const fmax = Math.max(1, falls.spend, falls.scam, falls.delay);
  for (const kk in falls) wrap.appendChild(bar(TRAPS[kk].en + " " + TRAPS[kk].zh, String(falls[kk]), fmax, "t-" + kk));
  const topFall = Object.entries(falls).sort((a, b) => b[1] - a[1])[0];
  const hl = document.createElement("p"); hl.style.margin = "2px 0 0";
  hl.textContent = topFall[1] ? "Most common fall: " + TRAPS[topFall[0]].en + " · 最多人中嘅陷阱：" + TRAPS[topFall[0]].zh : "No falls recorded yet. 暫時冇人中伏。";
  wrap.appendChild(hl);
  const topHabit = Object.entries(agg.habits).sort((a, b) => b[1] - a[1])[0];
  if (topHabit){ const h = HABITS.find(x => x.id === topHabit[0]); const hp = document.createElement("p"); hp.style.margin = "0"; hp.textContent = "Top habit pledged: " + (h ? h.en : topHabit[0]) + " (" + topHabit[1] + ")" + (h ? " · 最多人揀嘅習慣：" + h.zh : ""); wrap.appendChild(hp); }
  if (agg.quizN){
    const qp = document.createElement("p"); qp.style.margin = "0"; const pass = Math.round(100 * agg.quizPass / agg.quizN);
    qp.textContent = "Quiz: " + pass + "% got 2 or 3 right · average " + (agg.quizSum / agg.quizN).toFixed(1) + "/3 · " + agg.quizN + " player" + (agg.quizN === 1 ? "" : "s") +
      " · 測驗：有" + pass + "%人答啱2題或以上，平均" + (agg.quizSum / agg.quizN).toFixed(1) + "/3，共" + agg.quizN + "人";
    wrap.appendChild(qp);
  }
  body.appendChild(wrap);
}
async function initDB(){
  if (!apiAllowed){ renderLB(); return; }
  const body = $("lbBody"); body.replaceChildren(); const p = document.createElement("p"); p.className = "lb-empty"; p.textContent = "Loading the live board… 載入排行榜中"; body.appendChild(p);
  await refreshLB();
  if (apiGone) return;
  flushOutbox();
  schedulePoll(45000);
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && performance.now() - lastFetch > 20000) refreshLB(); });
  if ("IntersectionObserver" in window){
    new IntersectionObserver(es => {
      lbVisible = es.some(e => e.isIntersecting);
      if (lbVisible && performance.now() - lastFetch > 20000) refreshLB();
    }).observe(document.querySelector(".lbx"));
  }
}

// ---------- boot: a settled sample tower behind the start card ----------
// Where the plan below settles (id, x, y, angle, outline points): running it takes ~600 physics steps at load,
// so the settled tower is placed directly. If an item's shape has changed since, the plan runs as before.
const TOWER = [["lunchbox", 152.06, -21.076, -0.0027, 52], ["textbooks", 261.858, -20.288, 0.0062, 24], ["steamer", 180.307, -68.17, -0.0086, 44],
               ["piggybank", 281.871, -76.162, 0.0083, 62], ["handbag", 224.615, -131.694, -0.0968, 52]];
function sampleTower(){
  S = newState(); makeEngine();
  const pick = id => DEFS.find(d => d.id === id);
  const points = b => b.parts.reduce((s, q, i) => s + (i || b.parts.length === 1 ? q.vertices.length : 0), 0);
  const placed = TOWER.every(([id, x, y, a, n]) => {
    const def = pick(id); if (!def) return false;
    const b = addItem(def, x, y, false); Body.setAngle(b, a); Body.setPosition(b, {x, y}); Sleeping.set(b, true);
    return points(b) === n;
  });
  if (!placed){
    for (const b of engine.world.bodies.slice()) if (b.tff) Composite.remove(engine.world, b);
    const plan = [["lunchbox", -70, -26], ["textbooks", 42, -24], ["steamer", -40, -70], ["piggybank", 60, -75], ["calculator", -80, -120],
                  ["handbag", 10, -125], ["bubbletea", 80, -140], ["football", -30, -175], ["passbook", 40, -190]];
    const fallback = DEFS.filter(d => d.kind !== "debt");
    plan.forEach(([id, x, y], i) => {
      const def = pick(id) || fallback[i % fallback.length]; if (!def) return;
      addItem(def, W/2 + x, y, false); for (let s = 0; s < 45; s++) Engine.update(engine, STEP);
    });
    for (let s = 0; s < 200; s++) Engine.update(engine, STEP);
    for (const b of engine.world.bodies.slice()) if (b.tff && b.position.y > WATER_Y) Composite.remove(engine.world, b);
  }
  let h = 0; for (const b of engine.world.bodies) if (b.tff && b.position.y < 5) h = Math.max(h, -b.bounds.min.y);
  S.height = h; S.camTop = Math.min(-(H - 240), -h - 330);
  S.queue = [pick("football") || fallback[0], pick("textbooks") || fallback[1] || fallback[0], pick("banana") || fallback[2] || fallback[0]];
  crab("Hi! I'm the 3 Fall Crab. Every item you stack is a money decision.", "我係3 Fall Crab！你疊嘅每件嘢，都係一個理財決定。");
}
buildStatic(); sampleTower(); resize(); drawCrabs(); updateHUD(); renderLedger(); setMuteUI(); planFirst();
markZh(document.body); zhWatch.observe(document.body, ZH_WATCH);
// Card timer, 10 s or 30 s: the same choice on the start and pause cards
const syncTimer = () => document.querySelectorAll(".ctime input").forEach(r => { r.checked = r.value === (slowRead ? "30" : "10"); });
document.querySelectorAll(".ctime input").forEach(r => r.addEventListener("change", () => {
  if (!r.checked) return;
  slowRead = r.value === "30"; lsSet("tff_slow_read", slowRead); syncTimer();
}));
syncTimer();
initDB();
// Pictures with lettering are remade once the web fonts have arrived, in spare time; until then the first ones stay up.
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => {
  for (const s of SPR.values()) if (s.text) s.k = -1;
  buildLayers(true, "plat"); needDraw = true; drawPreviews(true);
});
requestAnimationFrame(frame);
})();
