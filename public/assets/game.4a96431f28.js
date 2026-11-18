(() => {
"use strict";
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
const {STAGES, TRAPS, CARDS, QUIZ, HABITS, ACTS, ACT_OF_STAGE, POWERS, POWER_OF_TRAP, HATS} = window.TFF_CONTENT;
const QUIPS = window.TFF_CONTENT.QUIPS || {};
const TITLES = window.TFF_CONTENT.TITLES || [];
const LATER_NONE = window.TFF_CONTENT.LATER_NONE || [], ENDINGS = window.TFF_CONTENT.ENDINGS || [];
const CARD_BY = new Map(CARDS.map(c => [c.id, c]));
let CHAL = null;
const TOP_AT = 22;
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
const $ = id => document.getElementById(id);
const PRON = {jack: {name:"Jack", he:"he", He:"He", him:"him", his:"his", His:"His"}, jackie: {name:"Jackie", he:"she", He:"She", him:"her", his:"her", His:"Her"}};
const tell = (s, extra) => String(s).replace(/\{(\w+)\}/g, (m, k) => extra && k in extra ? extra[k] : (PRON[WHO] || PRON.jack)[k] ?? m);
const laterOf = (c, pick, n) => pick === "none" ? (LATER_NONE.length ? LATER_NONE[n % LATER_NONE.length] : null) : (c.later && c.later[pick === "wise" ? "w" : "r"]) || null;
const stageFor = floors => CORE.stageFor(floors, STAGES);
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
function lsGet(k, d){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch(e){ return d; } }
function lsSet(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }
const ssGet = k => { try { return sessionStorage.getItem(k); } catch(e){ return null; } }, ssSet = (k, v) => { try { sessionStorage.setItem(k, v); } catch(e){} };
try { sessionStorage.removeItem("tff_low_gfx"); } catch(e){}
const gfxForceHigh = /[?&]gfx=high(&|$)/.test(location.search), gfxForceLow = /[?&]gfx=low(&|$)/.test(location.search);
let lowGfx = !gfxForceHigh && gfxForceLow;
if (lowGfx) document.documentElement.classList.add("low-gfx");
let perfAvg = 16.7, perfN = 0, perfBad = 0;
function enableLowGfx(){
if (lowGfx) return;
lowGfx = true;
document.documentElement.classList.add("low-gfx");
if (DPR > 2){ lastFit = ""; resize(); dropCaches(); }
}
function checkPerf(raw){
if (lowGfx || gfxForceHigh || document.hidden || raw <= 0 || raw > 200) return;
const active = S && S.mode === "playing" && S.play > 3000;
if (!active) return;
perfN++;
perfAvg = perfAvg * 0.92 + raw * 0.08;
perfBad = raw > 48 ? perfBad + 2 : raw < 34 ? Math.max(0, perfBad - 1) : perfBad;
if (perfBad >= 60 || (perfN >= 90 && perfAvg > 45)) enableLowGfx();
}
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
let slowRead = !!lsGet("tff_slow_read", false);
const cardMs = () => slowRead ? SLOW_CARD_MS : CARD_MS;
const ICON = {spend:"i-spend", scam:"i-scam", delay:"i-delay"};
const svgUse = (id, cls) => { const s = document.createElementNS("http://www.w3.org/2000/svg", "svg"); s.setAttribute("viewBox", "0 0 32 32"); s.setAttribute("aria-hidden", "true"); if (cls) s.setAttribute("class", cls);
const u = document.createElementNS("http://www.w3.org/2000/svg", "use"); u.setAttribute("href", "#" + id); s.appendChild(u); return s; };
let S, engine, platform;
function newState(){
return {active:null, targetAngle:0, queue:[], hold:null, canHold:true, scamLock:0, rotLock:0, rotSaid:-1e9, pw:PW, wides:0, forced:{type:null, n:0}, lastId:null, jackpot:false,
score:0, rate:1, fund:0, falls:{spend:0, scam:0, delay:0}, drops:0, choices:[], wise:0, risky:0, missed:0,
height:0, best:0, bestFloor:0, stage:0, play:0, acc:0, spawnAt:0, nextEvent:FIRST_CARD, shocks:[60000, 125000],
speedUntil:0, fastOn:false, quakeUntil:0, pendingDebt:0, used:new Set(), mode:"idle", card:null, cardCount:0, over:null, posted:false,
quiz:[null, null, null], camTop:-(H - 240), shake:0, splashes:[], dragX:null, steps:0, ledger:[], warned:false,
mood:{type:"idle", until:0}, lastImpact:new Map(), grabs:[], leaves:[], habit:null, rec:null,
said:new Set(), streak:0, wiseRun:0, afterCard:null, overKey:null, pb:0, items:0, realMs:0, endAt:0, prior:0, quizDone:false,
jpAt:-1, frenzyUntil:0, frenzySec:0, jpExtra:0, pops:[], hand:null,
troll:{investAt:0, ticketAt:0, invest:0, tickets:0, ticketSeen:0, revive:0, reviveSeen:0, scamSaid:0}, offer:null, pf:null, revive:null, lost:[],
net:null, netWob:null, rescues:[], afterNet:false, lockSaid:false, netSaid:false, slimeSaid:false, earlyFloors:0, compounded:0, replay:null, lastDropAt:-1e9, lastChanceNet:false};
}
function makeEngine(){
engine = Engine.create({enableSleeping:true});
engine.positionIterations = 12; engine.velocityIterations = 10;
platform = Bodies.rectangle(W/2, 15, PW, 30, platOpt());
Composite.add(engine.world, platform);
Events.on(engine, "collisionStart", ev => {
if (!S) return;
for (const p of ev.pairs){
const a = p.bodyA.parent, b = p.bodyB.parent;
if (S.active && (a === S.active || b === S.active)) release(false);
if (a.tff) a.tff.capFall = 0; if (b.tff) b.tff.capFall = 0;
const ia = itemOfPart(p.bodyA), ib = itemOfPart(p.bodyB);
if (ia && ib && ia !== ib && (ia.tff.vine || ib.tff.vine)) queueGrab(ia, ib, p);
const n = p.collision && p.collision.normal; if (!n) continue;
const rv = (a.velocity.x - b.velocity.x) * n.x + (a.velocity.y - b.velocity.y) * n.y;
const st = clamp((Math.abs(rv) - 0.7) / 6, 0, 1); if (st < 0.06) continue;
const loud = (a.isStatic ? b : (b.isStatic ? a : (a.mass > b.mass ? a : b)));
if (loud.tff && loud.tff.released && !loud.tff.landed && st > 0.08){
loud.tff.landed = true; loud.tff.sqAt = S.steps; loud.tff.sqAmt = clamp(st * 0.14, 0.04, 0.11);
if (!reduceMotion && !lowGfx){
const pt = (p.collision.supports && p.collision.supports[0]) || {x: loud.position.x, y: loud.bounds.max.y};
for (let i = 0; i < 4; i++){
const dir = (i < 2 ? -1 : 1) * (0.6 + Math.random() * 1.1);
S.leaves.push({puff: true, x: pt.x + dir * 4, y: pt.y, vx: dir * (0.9 + st * 1.2), vy: -0.3 - Math.random() * 0.7, r: 2.8 + Math.random() * 2.2, t: 0});
}
}
}
const key = loud.id, now = S.steps;
if ((S.lastImpact.get(key) || -99) > now - 6) continue; S.lastImpact.set(key, now);
const mat = (a.isStatic || b.isStatic) && st > 0.5 ? "platform" : ((loud.plugin && loud.plugin.material) || "card");
A.impact(mat, st, clamp(((a.position.x + b.position.x) / 2) / W * 2 - 1, -1, 1));
if (st > 0.55) haptic(18, st * 0.4, st * 0.6);
}
});
}
function addItem(def, x, y, player){
const b = K.shape.fixInertia(def.make(x, y));
b.tff = {def, player, released:!player, settled:false, at:S.play, eo:{x: x - b.position.x, y: y - b.position.y}, vine: !!def.vine, parts: ownParts(b)};
for (const pt of b.tff.parts){ pt.plugin = pt.plugin || {}; pt.plugin.item = b; if (def.slime) pt.plugin.material = "food"; }
if (def.slime) b.tff.slime = true;
Composite.add(engine.world, b);
return b;
}
function genItem(){
let pool;
if (S.forced.n > 0){ S.forced.n--; pool = POOLS[S.forced.type]; }
else if (JACKPOT && !S.jackpot && Math.random() < JACKPOT_RARE){ S.jackpot = true; S.lastId = JACKPOT.id; return JACKPOT; }
else pool = Math.random() < 0.6 ? POOLS.wise : POOLS.risky;
let it, guard = 0;
do { it = pool[Math.floor(Math.random() * pool.length)]; } while (pool.length > 1 && it.id === S.lastId && guard++ < 10);
S.lastId = it.id;
if (it.kind === "scam") return it;
const tr = rollItemTrait(Math.random()); return tr === "vine" ? vineOf(it) : tr === "lock" ? lockOf(it) : tr === "slime" ? slimeOf(it) : it;
}
function refill(){ while (S.queue.length < 3) S.queue.push(genItem()); }
function spawn(def){
S.active = addItem(def, W/2, S.camTop + 85, true); S.targetAngle = 0; A.sfx("spawn");
if (def.vine){ A.sfx("vineGet"); stamp("Vine-wrapped: it sticks!", "藤蔓：一掂就黐", "good"); }
if (def.lock){ A.sfx("vineGet"); stamp("Fixed deposit: it locks where it lands", "定期鎖：一停低就鎖死", "good"); wantSprite(lockedOf(def), 0, 1); }
if (def.slime){ A.sfx("slime"); stamp("Slime-coated: it grips!", "黏黏：一掂就黐住", "good");
if (!S.slimeSaid){ S.slimeSaid = true; crab("Slime! Like a sticky budget: what lands on it stays put.", "黏黏！好似有紀律嘅預算：放上去就企得穩。"); } }
if (def.jackpot){ if (S.jpAt < 0) jackpotHit(); else stamp("Its claws catch what lands", "對鉗接住跌落嚟嘅嘢", "gold"); }
}
function nextPiece(){ refill(); const it = S.queue.shift(); refill(); spawn(it); S.canHold = true; drawPreviews(); prewarm(); }
function prewarm(){
for (const d of S.queue) wantSprite(d, 0, 1);
if (S.hold) wantSprite(S.hold, 0, 1);
}
let firstQueue = null;
function planFirst(){
const keep = S.forced, keepId = S.lastId, keepJ = S.jackpot; S.forced = {type: null, n: 0}; S.lastId = null; S.jackpot = false;
firstQueue = [genItem(), genItem(), genItem()];
S.forced = keep; S.lastId = keepId; S.jackpot = keepJ;
firstQueue.forEach(d => wantSprite(d, 0, 1));
}
function release(hard){
const b = S.active; if (!b) return;
S.active = null; b.tff.released = true; b.tff.at = S.play;
if (hard){ Body.setVelocity(b, {x: b.velocity.x * 0.3, y: HARD_DROP}); b.tff.capFall = HARD_DROP; A.sfx("harddrop"); haptic(22, 0.45, 0.55); }
S.spawnAt = S.play + 420;
}
function doHold(){
if (S.mode !== "playing" || !S.active || !S.canHold) return;
if (S.scamLock > 0){ stamp("Hold locked", "被呃咗，暫存用唔到", "bad"); haptic([25, 30, 35], 0.5, 0.4); return; }
const def = S.active.tff.def; Composite.remove(engine.world, S.active); S.active = null;
if (S.hold){ const h = S.hold; S.hold = def; spawn(h); } else { S.hold = def; nextPiece(); }
S.canHold = false; A.sfx("hold"); haptic([12, 28, 16], 0.25, 0.35); drawPreviews(); prewarm();
}
function fallSpeed(){
return fallSpeedFor(S.stage, S.play, S.speedUntil);
}
function dropDebt(){
if (!DEBT) return;
const b = addItem(DEBT, W/2 + (Math.random() * 120 - 60), S.camTop + 40, false);
Body.setVelocity(b, {x: 0, y: 4}); Body.setAngularVelocity(b, (Math.random() - .5) * 0.08);
A.sfx("debt"); haptic([30, 30, 50], 0.65, 0.45); stamp("Debt incoming!", "債務跌緊落嚟！", "bad");
}
const NUDGE = 6, NUDGE_MS = 130, keyAt = {left: 0, right: 0};
function setKey(d, v){
if (v && !keys[d]){ keyAt[d] = performance.now();
const b = S && S.mode === "playing" && S.active, dx = d === "left" ? -NUDGE : NUDGE;
if (b && (dx < 0 ? b.bounds.min.x + dx >= 6 : b.bounds.max.x + dx <= W - 6)){ Body.translate(b, {x: dx, y: 0}); A.sfx("move"); haptic(8, 0.12, 0.2); } }
keys[d] = v;
}
const sliding = d => keys[d] && performance.now() - keyAt[d] >= NUDGE_MS;
function control(){
const b = S.active; if (!b) return;
let vx;
if (S.dragX !== null) vx = clamp((S.dragX - b.position.x) * 0.3, -7, 7);
else vx = ((sliding("right") ? 1 : 0) - (sliding("left") ? 1 : 0)) * 4.5;
if (b.bounds.min.x < 6 && vx < 0) vx = 0;
if (b.bounds.max.x > W - 6 && vx > 0) vx = 0;
if (Math.abs(vx) > 0.5) A.sfx("move");
Body.setVelocity(b, {x: vx, y: Math.min(fallSpeed() * (softHeld ? 4 : 1), MAX_SOFT)});
Body.setAngularVelocity(b, 0);
const da = S.targetAngle - b.angle;
if (Math.abs(da) > 0.0005) Body.setAngle(b, b.angle + Math.sign(da) * Math.min(Math.abs(da), 0.22));
Sleeping.set(b, false);
}
const MAX_SOFT = 10, HARD_DROP = 11, MAX_SPIN = 0.3, MAX_SPEED = 22;
let ALPHA = 1;
function snap(){
for (const b of engine.world.bodies) if (b.tff){ const p = b.tff.prev || (b.tff.prev = {x: 0, y: 0, a: 0}); p.x = b.position.x; p.y = b.position.y; p.a = b.angle; }
}
function lerpPose(B){
const p = B.tff && B.tff.prev;
if (!p || ALPHA >= 1) return {x: B.position.x, y: B.position.y, a: B.angle};
return {x: p.x + (B.position.x - p.x) * ALPHA, y: p.y + (B.position.y - p.y) * ALPHA, a: p.a + (B.angle - p.a) * ALPHA};
}
function drawPose(m){
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
slimeGrip();
for (const b of engine.world.bodies){
if (!b.tff || b === S.active || b.isSleeping) continue;
if (Math.abs(b.angularVelocity) > MAX_SPIN) Body.setAngularVelocity(b, Math.sign(b.angularVelocity) * MAX_SPIN);
if (b.speed > MAX_SPEED) Body.setVelocity(b, {x: b.velocity.x * MAX_SPEED / b.speed, y: b.velocity.y * MAX_SPEED / b.speed});
}
}
function physicsStep(){
snap(); control(); if (S.net) netTick();
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
if (b.position.y > NET_Y && b.velocity.y > 0 && !b.isStatic && netUp() && membersOf(b).some(m => m.tff.player)){ catchNet(b); continue; }
if (b.position.y > WATER_Y + 40){
Composite.remove(engine.world, b);
S.splashes.push({x: b.position.x, t: 0, big: b.mass > 8});
A.sfx("splash"); haptic([45, 35, 75], 0.8, 0.6);
if (b === S.active){ S.active = null; S.spawnAt = S.play + 300; }
const pm = membersOf(b).find(m => m.tff.player);
if (pm && canTriggerDrop(S.play, S.lastDropAt)){
S.lastDropAt = S.play;
if (S.drops >= MAX_DROPS - 1 && S.fund > 0){
S.fund--; A.sfx("shield"); haptic([20, 35, 30], 0.5, 0.6);
stamp("Saved by emergency fund!", "應急錢頂住咗！", "good");
crab("Your emergency fund absorbed the fall! Keep stacking.", "好彩有應急錢頂住，冇跌落海！繼續疊！");
updateHUD();
} else {
S.drops++; S.lost.push(pm.tff.def); const loss = Math.min(S.score, 1000); S.score -= loss;
ledger(pm.tff.def, -loss, "落海");
mood("cover", 1600);
stamp(pm.tff.def.en + " fell in!", "跌咗落海 " + S.drops + "/" + MAX_DROPS, "bad");
S.streak = 0;
if (S.drops === MAX_DROPS - 1){
quip("lastDrop", 3);
if (!S.lastChanceNet){ S.lastChanceNet = true; if (!netUp()) setTimeout(() => { if (S && S.mode === "playing" && !netUp()) raiseNet("Last-chance net: falls get caught", "最後保障：保險網", 12000, 2); }, 500); }
} else if (S.drops < MAX_DROPS) quip("drop", 2);
updateHUD();
if (S.drops >= MAX_DROPS){ endGame("drops"); return; }
}
}
continue;
}
if (b === S.active || !b.tff.released) continue;
const still = b.speed < 0.35 && b.angularSpeed < 0.03 && b.position.y < 5;
b.tff.restN = still ? (b.tff.restN || 0) + 1 : 0;
if (!b.isStatic && b.tff.restN >= LOCK_REST && membersOf(b).some(m => m.tff.def.lock)) lockIn(b);
if (!b.isStatic && shouldAnchorBody(b.tff.restN, b.tff.at, S.play, S.height, b.bounds.min.y)){ Body.setStatic(b, true); b.tff.anchored = true; }
const resting = b.tff.restN >= 30;
for (const m of membersOf(b)){
if (!m.tff.player || m.tff.settled || !resting || S.play - m.tff.at <= 450) continue;
m.tff.settled = true;
const k = m.tff.def.kind, base = k === "wise" ? 500 : k === "risky" ? 300 : 0;
if (base){ const [gain, x] = pay(base); S.score += gain; S.items++; ledger(m.tff.def, gain, x > 1 ? "×" + x : ""); A.sfx("deposit", {amount: gain, frenzy: x > 1}); haptic(12, 0.2, 0.3); if (x > 1) popMoney(m, gain); updateHUD(); }
if (++S.streak % 4 === 0) quip("steady", 1);
}
if (resting && S.play - b.tff.at > 300) h = Math.max(h, -b.bounds.min.y);
}
S.height = h;
if (h > S.best){
S.best = h;
const f = Math.floor(h / FLOOR);
while (f > S.bestFloor){
S.bestFloor++;
if (S.stage <= 1) S.earlyFloors++;
const [gain, x] = pay(2000); S.score += gain;
ledger({zh: "第" + S.bestFloor + "層", en: "Floor " + S.bestFloor}, gain, x > 1 ? "×" + x : "");
A.sfx("floor", {floor: S.bestFloor}); haptic([18, 30, 28], 0.45, 0.55); mood("happy", 1200);
stamp("Floor " + S.bestFloor + " +" + fmt(gain) + (x > 1 ? " ×" + x : ""), "第" + S.bestFloor + "層" + (x > 1 ? " · " + x + "倍" : ""), x > 1 ? "gold" : "good"); quip("floor", 1);
}
const ns = stageFor(S.best / FLOOR);
if (ns > S.stage){
S.stage = ns; const st = STAGES[ns];
if (S.earlyFloors > 0){
const [div, dx] = pay(Math.min(S.earlyFloors, 10) * 200);
S.score += div; S.compounded += div;
ledger({zh: "早儲複息", en: "Compound interest"}, div, dx > 1 ? "×" + dx : "");
}
A.sfx(ns === STAGES.length - 1 ? "win" : "stage", {stage: ns}); haptic([35, 40, 45, 40, 80], 0.75, 0.8); A.stage(ns);
const sy = -st.at * FLOOR;
burst(W * 0.24, sy, ["#FFE45C", "#FF5FA2", "#20C1B3", "#FF7B35"], "255,228,92");
burst(W * 0.76, sy, ["#FFE45C", "#FF5FA2", "#8B6CF2", "#4CC36A"], "255,95,162");
stamp(st.en, st.zh, "gold"); quip("stage" + ns, 3);
crab("Welcome to " + st.en + ". Items fall faster from here.", "去到「" + st.zh + "」喇！由而家起，啲嘢會跌得快啲。");
setTimeout(() => { if (S && S.mode === "playing" && S.stage === ns) raiseNet("New stage, new cover: insurance net", "新階段，新保障：保險網"); }, 1100);
}
updateHUD();
}
}
const vineDefs = new Map();
function vineOf(def){
if (!def || def.vine || def.jackpot || def.kind === "debt") return def;
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
const lockDefs = new Map();
function lockOf(def, closed){
if (!def || def.vine || def.jackpot || def.kind === "debt") return def;
const base = def.base || def, key = base.id + (closed ? "~locked" : "~lock");
if (base.lock && !closed) return def;
let v = lockDefs.get(key);
if (!v){
v = Object.create(base);
Object.assign(v, {id: key, lock: !closed, locked: !!closed, base,
en: (closed ? "Locked " : "Fixed-deposit ") + (/^[A-Z][a-z]/.test(base.en) ? base.en[0].toLowerCase() + base.en.slice(1) : base.en),
zh: "定期" + base.zh,
draw(g){ base.draw(g); drawLockWrap(g, base, closed); }});
lockDefs.set(key, v);
}
return v;
}
const lockedOf = def => lockOf(def, true);
const slimeDefs = new Map();
function slimeOf(def){
if (!def || def.slime || def.vine || def.lock || def.locked || def.big || def.jackpot || def.kind === "debt" || def.kind === "scam") return def;
let v = slimeDefs.get(def.id);
if (!v){
v = Object.create(def);
Object.assign(v, {id: def.id + "~slime", slime: true, base: def,
en: "Slimy " + (/^[A-Z][a-z]/.test(def.en) ? def.en[0].toLowerCase() + def.en.slice(1) : def.en), zh: "黏黏" + def.zh,
draw(g){ def.draw(g); drawSlimeWrap(g, def); }});
slimeDefs.set(def.id, v);
}
return v;
}
const slimy = b => !!(b && b.tff && (b.tff.slime || (b.tff.members && b.tff.members.some(m => m.tff.slime))));
(() => { const up = Matter.Pair.update;
Matter.Pair.update = function(pair, collision, ts){
up.apply(this, arguments);
const a = collision.parentA, b = collision.parentB;
if (slimy(a) || slimy(b)){ pair.friction = 1; pair.frictionStatic = 10; pair.restitution = 0; }
};
})();
function slimeGrip(){
for (const pr of engine.pairs.list){
if (!pr.isActive || pr.isSensor) continue;
const c = pr.collision, a = c.parentA, b = c.parentB;
if (!slimy(a) && !slimy(b)) continue;
if (a === S.active || b === S.active) continue;
const n = c.normal;
const rv = (b.velocity.x - a.velocity.x) * n.x + (b.velocity.y - a.velocity.y) * n.y;
if (rv > 0.02){
const dv = rv * SLIME_GRAB * 0.5;
if (!a.isStatic && !a.isSleeping) Body.setVelocity(a, {x: a.velocity.x + n.x * dv, y: a.velocity.y + n.y * dv});
if (!b.isStatic && !b.isSleeping) Body.setVelocity(b, {x: b.velocity.x - n.x * dv, y: b.velocity.y - n.y * dv});
}
for (const o of [a, b]) if (!o.isStatic && !o.isSleeping) Body.setAngularVelocity(o, o.angularVelocity * SLIME_SPIN);
if (!pr.slimeHeard && (slimy(a) || slimy(b))){ pr.slimeHeard = true; const st = Math.hypot(a.velocity.x - b.velocity.x, a.velocity.y - b.velocity.y); if (st > 1.2) A.sfx("slime", {volume: clamp(st / 6, 0.3, 1)}); }
}
}
function drawSlimeWrap(g, def){
const V = vineShape(def), r = K.rng([...def.id].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) % 1000003, 11));
const clip = new Path2D();
for (const P of V.polys){ P.forEach((q, i) => i ? clip.lineTo(q.x, q.y) : clip.moveTo(q.x, q.y)); clip.closePath(); }
g.save(); g.clip(clip);
const top = V.y0, bot = V.y0 + V.h, edge = top + V.h * 0.62;
const coat = new Path2D(); coat.moveTo(V.x0 - 3, top - 3); coat.lineTo(V.x0 + V.w + 3, top - 3);
const waves = Math.max(3, Math.round(V.w / 14));
for (let i = waves; i >= 0; i--){ const x = V.x0 + V.w * i / waves, y = edge + Math.sin(i * 2.1 + r() * 2) * V.h * 0.07; coat.lineTo(x, y); }
coat.closePath();
const gr = g.createLinearGradient(0, top, 0, edge); gr.addColorStop(0, "rgba(160,222,70,.62)"); gr.addColorStop(1, "rgba(120,205,80,.34)");
g.fillStyle = gr; g.fill(coat);
g.fillStyle = "rgba(140,215,80,.16)"; g.fillRect(V.x0 - 2, top - 2, V.w + 4, V.h + 4);
g.fillStyle = "rgba(255,255,255,.55)";
g.beginPath(); g.ellipse(V.x0 + V.w * 0.3, top + V.h * 0.16, V.w * 0.17, Math.max(1.4, V.h * 0.06), -0.2, 0, 7); g.fill();
for (let i = 0; i < 4; i++){ g.beginPath(); g.arc(V.x0 + V.w * (0.15 + r() * 0.7), top + V.h * (0.1 + r() * 0.42), 0.9 + r() * 1.2, 0, 7); g.fill(); }
g.restore();
const sides = [];
for (const P of V.polys) for (const q of P) if (q.y > top + V.h * 0.25 && q.y < bot - V.h * 0.1) sides.push(q);
const left = sides.reduce((m, q) => (!m || q.x < m.x ? q : m), null), right = sides.reduce((m, q) => (!m || q.x > m.x ? q : m), null);
const drops = [];
if (left) drops.push({x: left.x + 2.5, y: Math.min(edge, left.y)}); if (right) drops.push({x: right.x - 2.5, y: Math.min(edge, right.y)});
if (V.w > 60) drops.push({x: V.x0 + V.w * (0.4 + r() * 0.2), y: edge + 1});
for (const d of drops){
const len = 4 + r() * 4, rad = 2 + r() * 0.9;
const p = new Path2D(); p.moveTo(d.x - 1.4, d.y - 2); p.lineTo(d.x - 1.1, d.y + len - rad); p.arc(d.x, d.y + len, rad, Math.PI + 0.45, -0.45, true); p.lineTo(d.x + 1.4, d.y - 2); p.closePath();
g.save(); g.globalAlpha = 0.85; K.blob(g, p, "#8CD24A", {depth: 0.5, soft: 0.7, sheen: false, texture: 0, rim: 0.3}); g.restore();
g.fillStyle = "rgba(255,255,255,.7)"; g.beginPath(); g.arc(d.x - rad * 0.35, d.y + len - rad * 0.3, 0.7, 0, 7); g.fill();
}
}
const BIG = 1.4, bigDefs = new Map();
function bigOf(def){
if (!def || def.big || def.vine || def.lock || def.locked || def.jackpot || def.kind === "debt") return def;
let v = bigDefs.get(def.id);
if (!v){
v = Object.create(def);
Object.assign(v, {id: def.id + "~big", big: true, base: def,
en: "Giant " + (/^[A-Z][a-z]/.test(def.en) ? def.en[0].toLowerCase() + def.en.slice(1) : def.en), zh: "巨型" + def.zh,
make(x, y){ const b = def.make(x, y); Body.scale(b, BIG, BIG, {x, y}); return b; },
draw(g){ g.save(); g.scale(BIG, BIG); def.draw(g); g.restore(); }});
bigDefs.set(def.id, v);
}
return v;
}
const platOpt = () => ({isStatic:true, friction:1, frictionStatic:2, restitution:0, chamfer:{radius:6}, label:"platform"});
const SHED_Y = 24, SHED_H = 112;
const shedW = e => PW/2 + e - 35;
function neonText(g, s, lit){
const n = s.t.length, step = (s.h - 8) / n, size = Math.min(11, step * 0.95);
g.save();
if (lit){ g.shadowColor = s.tube; g.shadowBlur = 6; g.strokeStyle = s.tube; g.lineWidth = 1.4; g.strokeRect(s.x + 1.5, s.y + 1.5, s.w - 3, s.h - 3); }
g.font = "900 " + size + "px " + K.FONTS.zh; g.textAlign = "center"; g.textBaseline = "middle";
g.fillStyle = lit ? "#FFF6E0" : s.tube;
for (let k = 0; k < n; k++) g.fillText(s.t[k], s.x + s.w / 2, s.y + 4 + step * (k + 0.5));
g.restore();
}
function drawShed(g, e){
const w = shedW(e), h = SHED_H, xs = [];
for (let d = 3; d < w - 3; d += 36) xs.push(w - d);
if (xs[xs.length - 1] - 5 > 12) xs.push(5);
const BAM = "#D4B060", rows = [6, 44, 82], o = {depth: 0.8, soft: 1, sheen: false, rim: 0.4};
for (let i = 0; i + 1 < xs.length; i++){ const a = xs[i], b = xs[i + 1], up = i % 2 ? [rows[0], rows[1]] : [rows[1], rows[0]];
K.blob(g, K.tube([[a, up[0]], [b, up[1]]], 2.4), "#C9A24A", o); K.blob(g, K.tube([[a, rows[2]], [b, rows[1]]], 2.4), "#C9A24A", o); }
for (const y of rows) K.blob(g, K.tube([[2, y], [w - 1, y]], 2.8), BAM, o);
for (const x of xs){
K.blob(g, K.tube([[x, 0], [x, h]], 3.4), BAM, {depth: 0.9, soft: 1.1, sheen: {x: x - 0.8, y: h / 2, rx: 0.6, ry: h / 2.5}, rim: 0.4});
for (let y = 13; y < h; y += 15) K.groove(g, K.poly([[x - 1.7, y], [x + 1.7, y]], false), 0.9);
for (const y of rows) K.press(g, K.ball(x, y, 2.6, 2.1, {lump: 0.05}), "black", {sheen: false, texture: 0});
}
}
function drawWide(c){
const e = (S.pw - PW) / 2, prev = e - 20, p = clamp((S.play - (S.wideAt || -1e9)) / 900, 0, 1), ease = 1 - Math.pow(1 - p, 3);
for (const side of [-1, 1]){
c.save(); if (side > 0){ c.translate(W, 0); c.scale(-1, 1); }
const x0 = W/2 - PW/2 - e;
if (prev > 0 && L.shed[prev]) c.drawImage(L.shed[prev], W/2 - PW/2 - prev, SHED_Y, shedW(prev), SHED_H);
const sh = L.shed[e]; if (sh){
const up = SHED_H * ease; c.save(); c.beginPath(); c.rect(x0 - 4, WATER_Y - up, shedW(e) + 8, up + 20); c.clip();
c.drawImage(sh, x0, SHED_Y + (1 - ease) * 30, shedW(e), SHED_H); c.restore(); }
const wl = L.wing[e], slide = (1 - clamp((p - 0.35) / 0.65, 0, 1)) * e;
if (wl) c.drawImage(wl, x0 - 10 + slide, 0, e + 34, 40);
c.restore();
}
}
function widen(){
if (S.wides >= 2) return;
S.wides++; S.pw += 40; S.wideAt = S.play;
Composite.remove(engine.world, platform);
platform = Bodies.rectangle(W/2, 15, S.pw, 30, platOpt()); Composite.add(engine.world, platform);
for (const sx of [-1, 1]) burst(W/2 + sx * (S.pw/2 - 10), 12, ["#FFD23F", "#F2B51C", "#FFF1A8"], "255,200,50");
A.sfx("lock"); haptic(25, 0.45, 0.5); mood("happy", 1500); stamp("Wider base!", "地基加闊咗！", "gold");
}
function topLoose(){
let best = null;
for (const b of engine.world.bodies){
if (!b.tff || b === S.active || !b.tff.released || b.isStatic || b.tff.members || b.tff.hostBody || b.position.y > 5) continue;
const d = b.tff.def; if (d.kind === "debt" || d.jackpot) continue;
if (!best || b.bounds.min.y < best.bounds.min.y) best = b;
}
return best;
}
function undoTop(){
const b = topLoose();
if (!b){ stamp("Nothing to return", "冇嘢可以退", "info"); return; }
Composite.remove(engine.world, b);
burst(b.position.x, b.position.y, ["#9DD8FF", "#FFFFFF", "#5BB2FF"], "157,216,255");
A.sfx("uiDone"); haptic(25, 0.45, 0.5); stamp("Cooling-off: " + b.tff.def.en + " returned", "冷靜期：退返" + b.tff.def.zh, "good");
}
function applyPower(k){
if (k === "vine" || k === "lock"){ const q = S.queue[0], plain = q && (q.vine || q.lock || q.slime) && q.base ? q.base : q;
S.queue[0] = k === "lock" ? lockOf(plain) : vineOf(plain); A.sfx("vineGet"); drawPreviews(true); prewarm(); }
else if (k === "net") raiseNet("Insurance net: falls get caught", "保險網：跌落嚟都接得住");
else if (k === "wide") widen();
else if (k === "undo") undoTop();
}
function showPowers(c){
const own = POWER_OF_TRAP[c.trap] || "vine";
const rest = Object.keys(POWERS).filter(k => k !== own && (k !== "wide" || S.wides < 2) && (k !== "undo" || topLoose()));
for (let i = rest.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [rest[i], rest[j]] = [rest[j], rest[i]]; }
S.card.powers = [own, ...rest.slice(0, 2)]; S.card.power = own;
const box = $("ocPowers"), row = $("ocPowerRow"); row.replaceChildren();
S.card.powers.forEach((k, i) => {
const b = document.createElement("button"); b.type = "button"; b.className = "pw"; b.setAttribute("role", "radio"); b.dataset.k = k;
const key = document.createElement("span"); key.className = "key"; key.textContent = i + 1; key.setAttribute("aria-hidden", "true");
const z = document.createElement("small"); z.lang = "zh-HK"; z.textContent = POWERS[k].zh;
const t = document.createElement("span"); t.append(POWERS[k].en, z); b.append(key, t);
b.addEventListener("click", e => { if (!tapTooSoon(e, S.card.flipAt)) pickPower(i); });
row.appendChild(b);
});
box.hidden = false; pickPower(0, true);
}
function pickPower(i, quiet, focus){
if (!S.card || !S.card.powers || !S.card.powers[i]) return;
const k = S.card.power = S.card.powers[i], P = POWERS[k];
[...$("ocPowerRow").children].forEach((b, j) => { b.setAttribute("aria-checked", String(j === i)); b.tabIndex = j === i ? 0 : -1; });
const d = $("ocPowerWhat"), z = document.createElement("small"); z.lang = "zh-HK"; z.textContent = P.d[1] + "（" + P.m[1] + "）";
d.replaceChildren(P.d[0] + " (" + P.m[0][0].toLowerCase() + P.m[0].slice(1) + ")", z);
if (focus){ const btn = $("ocPowerRow").children[i]; if (btn) btn.focus({preventScroll: true}); }
if (!quiet){ A.sfx("uiSelect"); fitOutcome(); }
}
function lockIn(b){
Body.setStatic(b, true);
let at = null;
for (const m of membersOf(b)){ m.tff.locked = true; if (m.tff.def.lock){ m.tff.def = lockedOf(m.tff.def); at = at || poseOf(m); } }
at = at || {x: b.position.x, y: b.position.y};
burst(at.x, at.y, ["#FFD23F", "#F2B51C", "#FFF1A8"], "255,200,50");
A.sfx("lock", {pan: clamp(at.x / W * 2 - 1, -1, 1)}); haptic([28, 30, 40], 0.6, 0.5); mood("happy", 1500);
stamp("Locked in!", "鎖定！", "gold");
if (!S.lockSaid){ S.lockSaid = true; crab("Locked in, like a fixed deposit: money you can't spend on a whim stays put.", "好似定期存款咁鎖住咗：唔可以心血來潮拎嚟使，就企得穩。"); }
}
const netUp = () => !!(S && S.net && S.play < S.net.until && S.net.left > 0);
function raiseNet(en, zh, ms = NET_MS, catches = NET_CATCHES){
S.net = {until: S.play + ms, left: catches, max: catches, fade: 0, goneSaid: false}; S.netWob = null;
A.sfx("shield"); stamp(en, zh, "good");
if (!S.netSaid){ S.netSaid = true; crab("Insurance doesn't stop the fall, but it catches you. Get it before you need it.", "保險唔會令你唔跌，但會接住你。要喺出事之前買。"); }
}
function catchNet(b){
Composite.remove(engine.world, b);
if (b === S.active){ S.active = null; S.spawnAt = S.play + 300; }
const back = membersOf(b).filter(m => m.tff.player).map(m => m.tff.def).slice(0, 2);
S.queue.unshift(...back);
S.net.left--; S.netWob = {x: b.position.x, t: 0};
for (const d of back) S.rescues.push({def: d, x: clamp(b.position.x, 20, W - 20), y: NET_Y, t: 0});
A.sfx("netCatch", {pan: clamp(b.position.x / W * 2 - 1, -1, 1)}); haptic([20, 40, 30], 0.45, 0.6); setTimeout(() => A.sfx("rescue"), 200);
stamp("Caught by insurance!", "保險接住咗！" + (S.net.left ? "（仲有" + S.net.left + "次）" : ""), "good"); mood("happy", 1400); quip("netCatch", 2);
drawPreviews(true); prewarm(); updateHUD();
}
function netTick(){
const N = S.net; if (!N || N.goneSaid || netUp()) return;
N.goneSaid = true; stamp("Net's gone", "保險網收咗", "info");
}
function drawNet(c, f){
const N = S.net; if (!N) return;
const up = netUp(); if (!up){ N.fade += f; if (N.fade > 24) return; }
const blink = up && N.until - S.play < 4000 ? 0.55 + 0.45 * Math.cos(S.play / 110) : 1;
const wob = S.netWob; if (wob){ wob.t += f; if (wob.t > 90) S.netWob = null; }
const yAt = x => { let y = NET_Y + Math.sin(x / 38 + S.play / 900) * 1.2;
if (wob){ const d = (x - wob.x) / 46; y += Math.exp(-d * d) * 14 * Math.exp(-wob.t / 22) * Math.cos(wob.t / 3.2); } return y; };
const x0 = -XV - 12, x1 = W + XV + 12;
const a0 = (up ? 1 : 1 - N.fade / 24) * blink;
c.save(); c.globalAlpha = a0; c.lineCap = "round"; c.lineJoin = "round";
const glow = c.createLinearGradient(0, NET_Y - 16, 0, WATER_Y);
glow.addColorStop(0, "rgba(160,230,255,0)"); glow.addColorStop(1, "rgba(160,230,255,0.45)");
c.fillStyle = glow; c.fillRect(x0, NET_Y - 16, x1 - x0, WATER_Y - NET_Y + 16);
c.strokeStyle = "rgba(120,78,36,0.75)"; c.lineWidth = 1.5; c.beginPath();
for (let x = x0; x < x1; x += 14){ const y = yAt(x), y2 = yAt(x + 14); c.moveTo(x, y); c.lineTo(x + 7, y + 14); c.lineTo(x + 14, y2); }
c.stroke();
c.beginPath(); for (let x = x0; x <= x1; x += 8){ const y = yAt(x); if (x === x0) c.moveTo(x, y); else c.lineTo(x, y); }
c.strokeStyle = "#7A4B22"; c.lineWidth = 5; c.stroke(); c.strokeStyle = "#F2D49B"; c.lineWidth = 2.6; c.stroke();
if (L.float) for (let x = x0 + 22; x < x1; x += 46) c.drawImage(L.float, x - 7, yAt(x) - 7, 14, 14);
if (L.buoy) for (let i = 0; i < (N.max || NET_CATCHES); i++){ const x = W - 76 + i * 30; c.globalAlpha = a0 * (i < N.left ? 1 : 0.28); c.drawImage(L.buoy, x - 14, yAt(x) - 15, 28, 28); }
c.restore(); needDraw = true;
}
function drawRescues(c, f){
if (!S.rescues.length) return;
for (const r of S.rescues){
r.t += f; const k = Math.min(1, r.t / 60), e = 1 - Math.pow(1 - k, 2);
const y = reduceMotion ? r.y - 34 : r.y - 22 - e * 190, x = r.x + (reduceMotion ? 0 : Math.sin(r.t / 9) * 4), R = 24;
c.save(); c.globalAlpha = k < 0.82 ? 1 : (1 - k) / 0.18;
const sp = spriteNear(r.def, 0, true), sc = Math.min(1, (R * 1.45) / Math.max(sp.w, sp.h, 1));
c.save(); c.translate(x, y); c.scale(sc, sc); c.drawImage(sp.img, sp.x0, sp.y0, sp.w, sp.h); c.restore();
c.fillStyle = "rgba(190,235,255,0.3)"; c.beginPath(); c.arc(x, y, R, 0, 7); c.fill();
c.strokeStyle = "rgba(255,255,255,0.92)"; c.lineWidth = 2; c.stroke();
c.fillStyle = "rgba(255,255,255,0.8)"; c.beginPath(); c.ellipse(x - R * 0.38, y - R * 0.42, R * 0.22, R * 0.1, -0.6, 0, 7); c.fill();
if (k > 0.82){ const q = (k - 0.82) / 0.18; c.globalAlpha = 1 - q; c.beginPath(); c.arc(x, y, R * (1 + q * 0.6), 0, 7); c.stroke(); }
c.restore();
}
S.rescues = S.rescues.filter(r => r.t < 60); needDraw = true;
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
for (const h of [hostOf(ia), hostOf(ib)]) pre.set(h, {v: Body.getVelocity(h), w: Body.getAngularVelocity(h)});
S.grabs.push({ia, ib, x: sp ? sp.x : (pa.x + pb.x) / 2, y: sp ? sp.y : (pa.y + pb.y) / 2, pre});
}
function processGrabs(){
const list = S.grabs; S.grabs = [];
for (const g of list){
const vm = g.ia.tff.vine ? g.ia : g.ib, other = vm === g.ia ? g.ib : g.ia;
if (other.tff.def.kind === "debt") continue;
const HA = hostOf(g.ia), HB = hostOf(g.ib);
if (HA === HB || HA === S.active || HB === S.active || HA.isStatic || HB.isStatic) continue;
if (!engine.world.bodies.includes(HA) || !engine.world.bodies.includes(HB)) continue;
if ((vm.tff.grabs || 0) >= VINE_GRABS || membersOf(HA).length + membersOf(HB).length > MAX_FUSED) continue;
vm.tff.grabs = (vm.tff.grabs || 0) + 1;
fuse(HA, HB, g.pre);
addMark(other, g.x, g.y); if (other.tff.vine) addMark(vm, g.x, g.y);
burst(g.x, g.y);
A.sfx("vine", {pan: clamp(g.x / W * 2 - 1, -1, 1)}); haptic([15, 25, 25], 0.4, 0.5);
if (vm.tff.player && !vm.tff.stuckOnce){ vm.tff.stuckOnce = true; stamp("Vines grab on!", "藤蔓黐住咗！", "good"); }
}
}
function fuse(A1, B1, pre){
const mem = membersOf(A1).concat(membersOf(B1)), poses = mem.map(poseOf);
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
for (const part of H.parts) part.isSleeping = false;
Composite.add(engine.world, H);
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
function burst(x, y, cols, ring){
S.leaves.push({ring: true, x, y, t: 0, rgb: ring});
if (reduceMotion) return;
const n = lowGfx ? 4 : 10;
for (let i = 0; i < n; i++){
const a = Math.random() * Math.PI * 2, v = 1.2 + Math.random() * 2.2;
S.leaves.push({x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1.2, a: Math.random() * 6.3, va: (Math.random() - 0.5) * 0.3, t: 0, col: cols ? cols[i % cols.length] : i % 3 ? "#4CC36A" : "#B5E04A"});
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
function paintMarks(c, H, T){
const path = new Path2D();
for (const part of H.parts.slice(1)){ part.vertices.forEach((v, i) => i ? path.lineTo(v.x, v.y) : path.moveTo(v.x, v.y)); path.closePath(); }
c.save(); c.clip(path); c.lineCap = "round"; c.lineJoin = "round";
for (const m of H.tff.members){
const marks = m.tff.marks; if (!marks || !marks.length) continue;
const p = poseOf(m);
c.save(); c.translate(p.x, p.y); c.rotate(p.a);
for (const k of marks){
const g = clamp((T - k.born) / 50, 0, 1), e = 1 - Math.pow(1 - g, 3), N = 10;
for (let j = 0; j < 4; j++){
const rr = ((k.seed * (j + 3) * 9301 + 49297) % 233280) / 233280;
let ang = k.dir + (j - 1.5) * 0.62 + (rr - 0.5) * 0.35;
const curl = (j % 2 ? 1 : -1) * (0.8 + rr * 0.9), len = (30 + rr * 22) * e;
let x = k.x - Math.cos(ang) * 5, y = k.y - Math.sin(ang) * 5; const pts = [[x, y, ang]];
for (let i = 1; i <= N; i++){ ang += curl / N; x += Math.cos(ang) * len / N; y += Math.sin(ang) * len / N; pts.push([x, y, ang]); }
for (const [w, col, off] of [[4.4, "#2B6E36", 0], [3, "#4CC36A", 0], [1.1, "rgba(215,255,195,0.85)", -0.6]]){
c.strokeStyle = col;
for (let i = 1; i <= N; i++){
c.lineWidth = w * (1 - 0.55 * i / N); c.beginPath();
c.moveTo(pts[i - 1][0] + off, pts[i - 1][1] + off); c.lineTo(pts[i][0] + off, pts[i][1] + off); c.stroke();
}
}
for (const [t, side] of [[0.35, 1], [0.65, -1], [0.92, 1]]){
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
c.restore();
}
function marksSig(H, T){
let sig = 0;
for (const m of H.tff.members) if (m.tff.marks) for (const k of m.tff.marks){ if (T - k.born < 50) return -1; sig += k.born + 1; }
return sig;
}
function drawMarks(c, H, T, paint){
const sig = marksSig(H, T); if (!sig) return;
const d = lerpPose(H);
if (sig < 0 || paint){ c.save(); c.translate(d.x, d.y); c.rotate(d.a - H.angle); c.translate(-H.position.x, -H.position.y); paintMarks(c, H, T); c.restore(); return; }
const k = SC * DPR; let mc = H.tff.mc;
if (!mc || mc.k !== k || mc.sig !== sig){
const ca = Math.cos(-H.angle), sa = Math.sin(-H.angle);
let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
for (const part of H.parts.slice(1)) for (const v of part.vertices){
const dx = v.x - H.position.x, dy = v.y - H.position.y, lx = dx * ca - dy * sa, ly = dx * sa + dy * ca;
x0 = Math.min(x0, lx); y0 = Math.min(y0, ly); x1 = Math.max(x1, lx); y1 = Math.max(y1, ly);
}
x0 -= 3; y0 -= 3; x1 += 3; y1 += 3;
const img = (mc && mc.img) || document.createElement("canvas");
img.width = Math.max(2, Math.ceil((x1 - x0) * k)); img.height = Math.max(2, Math.ceil((y1 - y0) * k));
const g = img.getContext("2d"); g.setTransform(k, 0, 0, k, -x0 * k, -y0 * k); g.rotate(-H.angle); g.translate(-H.position.x, -H.position.y);
paintMarks(g, H, T);
mc = H.tff.mc = {img, k, sig, x0, y0, w: x1 - x0, h: y1 - y0};
}
c.save(); c.translate(d.x, d.y); c.rotate(d.a); c.drawImage(mc.img, mc.x0, mc.y0, mc.w, mc.h); c.restore();
}
function drawLeaves(c, f){
if (!S.leaves.length) return;
for (const q of S.leaves){
q.t += f;
if (q.ring){ const k = Math.min(1, q.t / 16); c.strokeStyle = "rgba(" + (q.rgb || "76,195,106") + "," + (1 - k).toFixed(3) + ")"; c.lineWidth = 3 * (1 - k) + 0.5; c.beginPath(); c.arc(q.x, q.y, 4 + 18 * k, 0, 7); c.stroke(); continue; }
if (q.puff){
const k = Math.min(1, q.t / 18);
q.x += q.vx * f; q.y += q.vy * f; q.vx *= Math.pow(0.92, f);
c.save(); c.globalAlpha = (1 - k) * 0.65; c.fillStyle = "#FFF8EC";
c.beginPath(); c.arc(q.x, q.y, q.r * (0.7 + 0.7 * k), 0, 7); c.fill(); c.restore();
continue;
}
q.vy += 0.09 * f; q.vx *= Math.pow(0.98, f); q.x += q.vx * f; q.y += q.vy * f; q.a += q.va * f;
c.globalAlpha = Math.max(0, 1 - q.t / 42); drawLeaf(c, q.x, q.y, q.a, 5, q.col); c.globalAlpha = 1;
}
S.leaves = S.leaves.filter(q => q.t < (q.ring ? 16 : q.puff ? 18 : 42));
needDraw = true;
}
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
function drawLockWrap(g, def, closed){
const V = vineShape(def), cx = V.x0 + V.w / 2, cy = V.y0 + V.h / 2;
const clip = new Path2D();
for (const P of V.polys){ P.forEach((q, i) => i ? clip.lineTo(q.x, q.y) : clip.moveTo(q.x, q.y)); clip.closePath(); }
const tall = V.h > V.w * 1.25, a = tall ? [V.x0 + V.w * 0.25, V.y0 - 2] : [V.x0 - 2, V.y0 + V.h * 0.32], b = tall ? [V.x0 + V.w * 0.75, V.y0 + V.h + 2] : [V.x0 + V.w + 2, V.y0 + V.h * 0.68];
const L = Math.hypot(b[0] - a[0], b[1] - a[1]), ang = Math.atan2(b[1] - a[1], b[0] - a[0]), n = Math.max(3, Math.round(L / 7.5));
g.save(); g.clip(clip);
for (let i = 0; i <= n; i++){
const t = i / n, x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t, flat = i % 2 === 0;
g.save(); g.translate(x, y); g.rotate(ang); g.beginPath(); g.ellipse(0, 0, 4.4, flat ? 2.6 : 1.1, 0, 0, 7);
g.lineWidth = 2.6; g.strokeStyle = "#A8740A"; g.stroke(); g.lineWidth = 1.3; g.strokeStyle = "#FFD966"; g.stroke(); g.restore();
}
g.restore();
const s = clamp(Math.min(V.w, V.h * 1.4) * 0.42, 11, 20), bw = s, bh = s * 0.78, by = cy + s * 0.12;
const shY = closed ? by - bh * 0.5 : by - bh * 0.5 - s * 0.28, shX = closed ? 0 : s * 0.16;
K.blob(g, K.tube([[cx - bw * 0.3 + shX, by - bh * 0.3], [cx - bw * 0.3 + shX, shY - s * 0.18], [cx + shX, shY - s * 0.42], [cx + bw * 0.3 + shX, shY - s * 0.18], [cx + bw * 0.3 + shX, closed ? by - bh * 0.3 : shY + s * 0.02]], s * 0.17), "#C9CED8", {depth: 1, soft: 1.4, sheen: false, rim: 0.6});
K.blob(g, K.slab(cx, by, bw, bh, s * 0.2, {lump: 0.3, seed: 5}), "#F2B51C", {depth: 1.6, soft: 2.2});
K.press(g, K.ball(cx, by - bh * 0.08, s * 0.11, s * 0.11, {lump: 0.05}), "black", {sheen: false, texture: 0});
K.press(g, K.slab(cx, by + bh * 0.16, s * 0.08, bh * 0.28, 1, {lump: 0.05}), "black", {sheen: false, texture: 0});
}
const OWN_SHARE = 0.75;
const ownCard = k => { const p = S.persona; return !!p && !!k.who && (k.who === p.bg || k.who === p.pe || k.who === p.bg + "+" + p.pe); };
function pickCard(){
const free = CARDS.filter(k => !S.used.has(k.id) && (!k.who || ownCard(k)));
let at = free.filter(k => k.st === S.stage);
if (!at.length) at = free.filter(k => k.st <= S.stage);
if (!at.length) at = free.length ? free : CARDS.filter(k => !k.who);
const own = at.filter(ownCard), general = at.filter(k => !k.who);
const pool = own.length && (!general.length || Math.random() < OWN_SHARE) ? own : general.length ? general : at;
return pool[Math.floor(Math.random() * pool.length)];
}
function planCard(){
const c = pickCard(), order = Math.random() < 0.5 ? ["w","r"] : ["r","w"];
const thumbs = order.map(k => {
const named = c.thumb && c.thumb[k] && DEFS.find(d => d.id === c.thumb[k]); if (named) return named;
const pool = k === "w" ? POOLS.wise : (c.trap === "scam" ? POOLS.scam : POOLS.risky); return pool[Math.floor(Math.random() * pool.length)]; });
thumbs.forEach(d => wantSprite(d, 0, 1));
return {c, order, thumbs, stage: S.stage};
}
function openCard(){
const plan = S.plan && S.plan.stage === S.stage ? S.plan : planCard(), c = plan.c;
S.plan = null; S.used.add(c.id);
S.cardCount++;
S.card = {c, t:0, flip:false, flipAt:0, order: plan.order, lastTick:4};
S.mode = "card"; softHeld = false; keys.left = keys.right = false; S.dragX = null;
A.sfx("cardOpen"); setTimeout(() => { A.sfx("clap"); haptic(22, 0.45, 0.55); }, 300); A.mode("card");
const st = STAGES[S.stage], act = ACTS[ACT_OF_STAGE[S.stage] || 0], sc = String(S.cardCount).padStart(2, "0");
$("cardSlate").replaceChildren("ACT " + act.n + " · SCENE ", Object.assign(document.createElement("b"), {id: "cardNo", textContent: sc}), " · TAKE " + takes);
$("cardSlateZh").textContent = act.z + " · 第" + S.cardCount + "場";
document.querySelector(".lc-body").dataset.no = act.z + " 第" + S.cardCount + "場";
$("cardStage").textContent = st.en + " · " + st.zh;
$("cardTitle").textContent = c.en; $("cardTitleZh").textContent = c.zh;
$("cardTag").textContent = c.tag ? c.tag[0] + " · " + c.tag[1] : "";
const forT = c.who && S.persona ? c.who.split("+").map(k => PERSONAS.bg[k] || PERSONAS.pe[k]).filter(Boolean) : [], fr = $("cardFor");
fr.hidden = !forT.length;
if (forT.length){ const z = document.createElement("span"); z.lang = "zh-HK"; z.textContent = "為你而設 · " + forT.map(t => t.zh).join(" × "); fr.replaceChildren(z, "For you"); fr.title = "For you: " + forT.map(t => t.en).join(" × "); }
const box = $("cardChoices"); box.replaceChildren(); box.hidden = false;
S.card.order.forEach((k, i) => {
const b = document.createElement("button"); b.className = "choice"; b.type = "button";
const key = document.createElement("span"); key.className = "key"; key.textContent = root.classList.contains("gamepad") ? (i === 0 ? "X" : "Y") : (i === 0 ? "1" : "2");
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
$("cardHint").textContent = "Life Event card: Act " + act.n + ", scene " + S.cardCount + ". Choose within " + cardMs() / 1000 + " seconds: press 1 or 2" + (root.classList.contains("gamepad") ? ", or X or Y on the controller" : ", or tap a choice") + "." +
(slowRead ? "" : " For more time on later cards, pause the game and set the card timer to 30 seconds.");
$("cardModal").hidden = false;
const sheet = $("cardSheet"); sheet.classList.remove("done"); sheet.style.animation = "none"; void sheet.offsetWidth; sheet.style.animation = "";
modalOpen(true); $("cardSheet").focus({preventScroll:true});
}
function tapTooSoon(e, since){ return e.detail !== 0 && !!S.card && S.card.t - since < 450; }
function choose(kind){
if (!S.card || S.card.flip) return;
const c = S.card.c; S.card.flip = true; S.card.flipAt = S.card.t;
S.choices.push({card: c.id, pick: kind});
const head = $("ocHead"); head.replaceChildren();
const txt = document.createElement("span"); txt.dataset.fit = 15;
let en, zh, loss = 0;
if (kind === "wise"){
const overflow = S.fund >= 3 && S.best > 0;
S.wise++; S.rate = Math.min(2, +(S.rate + 0.2).toFixed(1)); S.fund = Math.min(3, S.fund + 1); S.hand = "piggy";
let bonus = 0;
if (overflow){ [bonus] = pay(1000); S.score += bonus; S.compounded += bonus; ledger({zh: "應急錢儲滿利息", en: "Full-fund interest"}, bonus); }
S.forced = {type: "wise", n: 4};
S.wiseRun++; S.afterCard = S.rate >= 2 && !S.said.has("boost") ? (S.said.add("boost"), "boost") : S.wiseRun === 3 ? "wise3" : "wise";
head.className = "oc-head good"; head.appendChild(svgUse("i-good")); txt.textContent = "Good call! 揀得好！";
en = "Next 4 items are stable · boost ×" + S.rate.toFixed(1) + " · " + (bonus ? "full-fund interest +" + fmt(bonus) : "emergency fund +1");
zh = "之後4件平穩·加成×" + S.rate.toFixed(1) + "·" + (bonus ? "應急錢儲滿利息+" + fmt(bonus) : "應急錢+1");
$("ocEffect").style.color = "var(--green-t)"; A.sfx("wise"); haptic([15, 30, 25], 0.4, 0.55);
} else {
const trap = kind === "risky" ? c.trap : "delay";
S.hand = trap === "spend" ? "bags" : trap === "scam" ? "phone" : "hourglass";
if (kind === "risky") S.risky++; else S.missed++;
S.wiseRun = 0; S.afterCard = trap;
S.falls[trap]++;
head.className = "oc-head bad"; const ic = svgUse(ICON[trap]); ic.style.background = trap === "spend" ? "var(--orange)" : trap === "scam" ? "var(--purple)" : "var(--blue)"; ic.style.borderRadius = "10px"; ic.style.padding = "3px"; head.appendChild(ic);
txt.textContent = TRAPS[trap].en + " " + TRAPS[trap].zh;
[en, zh] = TRAPS[trap].hit;
if (kind === "none"){ en = "Time ran out, so it was put off · " + en; zh = "諗太耐，即係拖延·" + zh; }
$("ocEffect").style.color = "var(--red-d)"; A.sfx("risky"); haptic([40, 35, 65], 0.75, 0.55);
if (trap === "spend"){ S.rate = Math.max(1, +(S.rate - 0.2).toFixed(1)); S.forced = {type: "risky", n: 3}; S.pendingDebt++; }
else if (trap === "scam"){ const sl = Math.min(S.score, 5000); loss = sl; S.score -= sl; ledger({zh: "被騙", en: "Scam"}, -sl); S.forced = {type: "scam", n: 3}; S.scamLock = 4; A.sfx("scam"); }
else { S.speedUntil = S.play + 20000; S.rate = 1; S.forced = {type: "risky", n: 2}; setRotLock(3); }
}
head.appendChild(txt);
const fxEn = en.replace("{loss}", fmt(-loss)).split(" · "), fxZh = zh.replace("{loss}", fmt(-loss)).split("·"), eff = $("ocEffect");
eff.replaceChildren();
if (fxEn.length === fxZh.length) fxEn.forEach((e, i) => {
const fx = document.createElement("span"); fx.className = "fx"; fx.textContent = e[0].toUpperCase() + e.slice(1);
const z = document.createElement("small"); z.lang = "zh-HK"; z.textContent = fxZh[i]; fx.appendChild(z); eff.appendChild(fx);
});
else { const z = document.createElement("small"); z.lang = "zh-HK"; z.textContent = fxZh.join(" · "); eff.append(fxEn.join(" · "), z); }
$("cardSheet").classList.add("done");
const later = laterOf(c, kind, S.choices.length - 1), os = $("ocStory"); os.hidden = !later; os.replaceChildren();
if (later){ const lab = document.createElement("b"); lab.className = "os-lab"; lab.textContent = "Later ";
const lz = document.createElement("span"); lz.lang = "zh-HK"; lz.textContent = "後來"; lab.appendChild(lz);
const z = document.createElement("small"); z.lang = "zh-HK"; z.textContent = tell(later[1]); os.append(lab, tell(later[0]), z); }
const tip = $("ocTip"); tip.replaceChildren(document.createTextNode(c.tip[0]));
const tz = document.createElement("small"); tz.textContent = c.tip[1]; tip.appendChild(tz);
crab(c.tip[0], c.tip[1]);
$("cardChoices").hidden = true; $("cardOutcome").hidden = false; fitOutcome(); requestAnimationFrame(() => { fitLine(txt); fitOutcome(); });
$("cardContinue").focus({preventScroll:true});
S.queue = []; refill();
if (kind === "wise") showPowers(c);
else { $("ocPowers").hidden = true; if (S.afterCard === "spend") S.queue[0] = bigOf(S.queue[0]); }
fitOutcome();
drawPreviews(); updateHUD(); prewarm();
}
function fitOutcome(){
const oc = $("cardOutcome"); if (oc.hidden) return;
oc.style.maxHeight = "none";
const pad = parseFloat(getComputedStyle($("cardModal")).paddingTop) || 16;
const over = $("cardSheet").offsetHeight - (innerHeight - 2 * pad - 8);
oc.style.maxHeight = over > 0 ? Math.max(150, oc.offsetHeight - over) + "px" : "none";
}
addEventListener("resize", () => { if (S && S.card && S.card.flip) fitOutcome(); });
function outlineOf(){
const parts = [];
for (const b of engine.world.bodies){
if (!b.tff || b === S.active || !b.tff.released || b.position.y > 5) continue;
for (const part of (b.parts.length > 1 ? b.parts.slice(1) : b.parts)){
parts.push({minY: part.bounds.min.y, maxY: part.bounds.max.y, vertices: part.vertices});
}
}
return encodeSilhouette(parts);
}
let GHOSTS = [];
function chalGhost(){
if (!CHAL || CHAL.s <= 0) return null;
const rows = CHAL.sil ? decodeSilhouette(CHAL.sil) : null;
const h = rows ? +(rows.length * SIL_ROW / FLOOR).toFixed(1) : Math.max(1, Math.min(20, Math.round(CHAL.s / 2500)));
return {name: CHAL.n || "Friend 朋友", score: CHAL.s, height: h, rows, chal: true};
}
function loadGhosts(){
fetch("/api/scores?view=ghosts").then(r => r.ok ? r.json() : null).then(j => {
if (!j || !Array.isArray(j.ghosts)) return;
const list = j.ghosts.filter(g => g && typeof g.score === "number" && typeof g.name === "string").map(g => {
const rows = typeof g.sil === "string" ? decodeSilhouette(g.sil) : null;
return {name: g.name, score: g.score, height: +g.height || 0, rows};
});
const cg = chalGhost();
if (cg && !list.some(x => x.score === cg.score && x.name === cg.name)) list.push(cg);
GHOSTS = list.sort((a, b) => a.score - b.score);
}).catch(() => {});
}
function ghostNow(){
const g = GHOSTS.find(x => x.score > S.score) || null;
if (g === S.ghost) return;
if (S.ghost && S.ghost.score <= S.score && S.mode === "playing"){ stamp("Passed " + S.ghost.name + "!", "爬過咗 " + S.ghost.name + "！", "gold"); A.sfx("rival"); haptic([25, 35, 45], 0.6, 0.7); }
S.ghost = g; S.ghostAt = S.play;
}
function drawGhost(c, g){
const a = clamp((S.play - S.ghostAt) / 700, 0, 1); let top = 0, cx = W / 2;
c.save();
if (g.rows){
c.globalAlpha = 0.36 * a; c.fillStyle = "#FFFFFF"; c.beginPath();
g.rows.forEach((r, i) => { if (r){ c.rect(r[0], -(i + 1) * SIL_ROW, r[1] - r[0], SIL_ROW + 0.2); top = -(i + 1) * SIL_ROW; cx = (r[0] + r[1]) / 2; } });
c.fill();
} else {
top = -g.height * FLOOR; c.globalAlpha = 0.75 * a; c.strokeStyle = "#FFFFFF"; c.lineWidth = 2; c.setLineDash([9, 7]);
c.beginPath(); c.moveTo(W/2 - PW/2, top); c.lineTo(W/2 + PW/2, top); c.stroke(); c.setLineDash([]);
}
const t = g.tag || (g.tag = "▲ " + g.name + " · " + fmt(g.score));
c.font = "800 11px " + K.FONTS.sans; c.textAlign = "center"; c.textBaseline = "middle";
const tw = g.tw || (g.tw = c.measureText(t).width + 14), x = clamp(cx, tw / 2 + 4, W - tw / 2 - 4), y = top - 12;
c.globalAlpha = 0.85 * a; c.fillStyle = "#25317A"; roundRect(c, x - tw / 2, y - 9, tw, 18, 9); c.fill();
c.globalAlpha = a; c.fillStyle = "#FFFFFF"; c.fillText(t, x, y + 0.5);
c.restore();
}
function setRotLock(n){ S.rotLock = n; root.classList.toggle("rotlock", n > 0); }
function closeCard(){
if (!S.card) return;
const power = S.card.flip ? S.card.power : null;
if (power && S.choices.length){
const lastCh = S.choices[S.choices.length - 1];
if (lastCh && lastCh.card === S.card.c.id && lastCh.pick === "wise") lastCh.power = power;
}
$("cardModal").hidden = true; S.card = null; modalOpen(false);
if (S.mode === "card"){
if (power) applyPower(power);
S.mode = "playing"; S.nextEvent = S.play + CARD_GAP;
S.fastOn = S.play < S.speedUntil; A.mode(musicMode());
while (S.pendingDebt > 0){ S.pendingDebt--; dropDebt(); }
if (S.afterNet){ S.afterNet = false; raiseNet("Insurance net: falls get caught", "保險網：跌落嚟都接得住"); }
if (S.afterCard){ quip(S.afterCard, 2); S.afterCard = null; }
if (S.falls.delay && S.fastOn) stamp("Time flies!", "時間加速", "info");
}
$("board").focus({preventScroll:true});
}
function shock(){
const sh = SHOCKS[Math.floor(Math.random() * SHOCKS.length)];
if (S.fund > 0){
S.fund--; A.sfx("shield"); haptic([20, 30, 30], 0.45, 0.55); stamp(sh[0], sh[1] + "：應急錢頂住咗", "good"); quip("shockOk", 2);
crab("Life happens: " + (sh[0][0].toLowerCase() + sh[0].slice(1)) + ". Your emergency fund kept the tower steady.", "突發：" + sh[1] + "。好彩有應急錢，座塔企得穩。");
} else {
S.quakeUntil = S.play + 1700; if (!reduceMotion) S.shake = 10; haptic([60, 40, 90], 0.8, 0.6); A.sfx("quake"); mood("worried", 2200); quip("shockBad", 2);
stamp(sh[0], sh[1] + "：冇應急錢，座塔震！", "bad");
crab("Life happens: " + (sh[0][0].toLowerCase() + sh[0].slice(1)) + ". With no emergency fund, everything wobbles.", "突發：" + sh[1] + "。冇應急錢，成座塔都震。");
}
updateHUD();
}
const TR = window.TFF_CONTENT.TROLLS;
const INVEST = 3000, FEE = 1000, TICKET = 500, MAX_TICKETS = 5, PF_MS = 15000, REVIVE_MS = 10000;
const OFFER_MS = {pitch: 6000, fee: 8000, ticket: 8000, again: 6000};
const offerMs = step => (OFFER_MS[step] || 0) * (slowRead ? 2.5 : 1);
const label = (b, [en, zh]) => { const z = document.createElement("span"); z.className = "zh"; z.lang = "zh-HK"; z.textContent = zh; b.replaceChildren(en, z); };
function planTrolls(){
const T = S.troll; T.investAt = 50000 + Math.random() * 60000; T.ticketAt = 45000 + Math.random() * 105000;
if (Math.abs(T.ticketAt - T.investAt) < 20000) T.ticketAt = T.investAt + (T.investAt < 120000 ? 25000 : -25000);
}
function charge(amount, zh, en){ S.score -= amount; ledger({zh, en}, -amount); updateHUD(); }
function trollTick(){
if (S.pf && portfolioTick()) return true;
const T = S.troll;
if (S.play > GAME_MS - 15000) return false;
for (const [k, kind, need] of [["investAt", "invest", INVEST + 1000], ["ticketAt", "ticket", TICKET]]){
if (!T[k] || S.play < T[k]) continue;
if (S.score < need || S.pf || S.nextEvent - S.play < 6000 || frenzyOn() || !$("jpBan").hidden){ T[k] = S.play > 150000 ? 0 : S.play + 8000; continue; }
T[k] = 0; openOffer(kind); return true;
}
return false;
}
function portfolioTick(){
const p = S.pf, k = clamp((S.play - p.at) / PF_MS, 0, 1), gain = Math.floor(INVEST * 0.6 * k / 300) * 300;
if (gain !== p.gain){ p.gain = gain; $("pfVal").textContent = "+" + fmt(gain); $("pfPct").textContent = "▲" + Math.round(gain / INVEST * 100) + "%"; if (gain) A.sfx("profitTick");
p.pts = (p.pts || "0,18") + " " + Math.round(4 + k * 54) + "," + Math.max(2, Math.round(18 - k * 15 + (gain / 300 % 2 ? 2 : 0))); $("pfLine").setAttribute("points", p.pts); }
$("pfChip").style.top = frenzyOn() ? "64px" : "";
if (k >= 1 && S.nextEvent - S.play > 3000 && !p.asked){ p.asked = true; openOffer("fee"); return true; }
return false;
}
function openOffer(kind){
S.mode = "offer"; softHeld = false; keys.left = keys.right = false; S.dragX = null;
S.offer = {kind, t: 0, stepAt: 0, step: "", limit: 0, sec: -1};
if (kind === "invest") S.troll.invest = Math.max(1, S.troll.invest);
if (kind === "ticket") S.troll.ticketSeen = 1;
A.sfx("offerPop"); A.mode("card");
const sh = $("offerSheet"); sh.className = "sheet offer " + (kind === "ticket" ? "lucky" : "ad");
offerStep(kind === "fee" ? "fee" : "pitch");
$("offerModal").hidden = false; modalOpen(true); fitLine($("offerTitle"));
sh.style.animation = "none"; void sh.offsetWidth; sh.style.animation = "";
sh.focus({preventScroll: true});
}
function offerStep(step){
const o = S.offer, I = TR.invest, L = TR.ticket, T = S.troll;
o.step = step; o.stepAt = o.t; o.limit = offerMs(step === "pitch" && o.kind === "ticket" ? "ticket" : step); o.sec = -1; o.sc = 0;
const set = (title, pitch) => { $("offerTitle").textContent = title[0]; $("offerTitleZh").textContent = title[1]; $("offerPitch").replaceChildren(); if (pitch) bi($("offerPitch"), pitch[0], pitch[1]); };
const btns = (yes, no) => { const y = $("offerYes"), n = $("offerNo"); y.hidden = !yes; n.hidden = !no; y.disabled = false; if (yes) label(y, yes); if (no) label(n, no); };
$("offerTag").replaceChildren(); bi($("offerTag"), ...(o.kind === "ticket" ? L.tag : I.tag));
$("offerClock").hidden = !o.limit; $("offerNote").textContent = ""; $("scratch").hidden = o.kind !== "ticket" || step === "pitch" || step === "lesson";
$("offerSheet").classList.toggle("bust", step === "gone" || step === "lesson");
offerArt(o.kind === "ticket" ? "" : step === "pitch" ? "rise" : step === "fee" ? "peak" : step === "wait" ? "crash" : "crash gone");
if (o.kind === "invest"){ set(I.title, I.pitch); btns(I.yes, I.no); }
else if (o.kind === "fee"){
const worth = fmt(INVEST + S.pf.gain), sub = s => s.replace("{n}", worth);
if (step === "fee"){ set(I.feeTitle.map(sub), I.fee); btns(I.feeYes, I.feeNo); if (S.score < FEE){ $("offerYes").disabled = true; $("offerNote").textContent = I.feeShort.join(" "); } }
else if (step === "wait"){ set(I.wait, null); btns(null, null); }
else {
set(I.goneTitle, null); btns(I.ok, null); lessonInto($("offerNote"), I.lesson, I.fact);
S.falls.scam++; T.scamSaid = 1; S.hand = "phone"; updateHUD(); A.sfx("scam"); haptic([50, 35, 80], 0.8, 0.6);
$("pfChip").classList.add("gone"); $("pfVal").textContent = "−" + fmt(INVEST + (T.invest === 3 ? FEE : 0)); $("pfPct").textContent = "▼100%";
$("pfLine").setAttribute("points", (S.pf.pts || "0,18") + " 60,20");
}
} else {
if (step === "pitch"){ set(L.title, L.pitch); btns(L.yes, L.no); }
else if (step === "scratch"){
set(L.title, null); btns(null, null); $("offerNote").textContent = L.scratching.join(" ");
buildScratch();
} else if (step === "again"){
set(L.close, L.closeSub); btns(L.again, L.stop);
if (T.tickets >= MAX_TICKETS || S.score < TICKET){ $("offerYes").hidden = true; $("offerNote").textContent = T.tickets >= MAX_TICKETS ? L.shut.join(" ") : ""; o.limit = 0; $("offerClock").hidden = true; }
} else {
set(L.lessonTitle, null); btns(L.ok, null); lessonInto($("offerNote"), L.lesson, L.fact, fmt(T.tickets * TICKET));
if (T.tickets){ S.falls.spend++; S.hand = "bags"; updateHUD(); A.sfx("risky"); }
}
}
fitLine($("offerTitle"));
const one = $("offerNo").hidden;
$("offerHint").textContent = one ? "Press Enter to continue." : "Press 1 for the first button or 2 (or Esc) for the second" + (root.classList.contains("gamepad") ? "; on the controller, X or Y." : ".");
if (!$("offerModal").hidden){ const f = !$("offerYes").hidden && !$("offerYes").disabled ? $("offerSheet") : !$("offerNo").hidden ? $("offerNo") : $("offerSheet"); if (one && !$("offerYes").hidden) $("offerYes").focus({preventScroll: true}); else f.focus({preventScroll: true}); }
}
function offerAnswer(yes, force){
const o = S.offer; if (!o || (!force && o.t - o.stepAt < 450)) return;
const T = S.troll, I = TR.invest, L = TR.ticket, step = o.kind + ":" + o.step;
if (step === "invest:pitch"){
if (yes){ charge(INVEST, "投資", "Investment"); T.invest = 2; S.pf = {at: S.play, gain: -1, asked: false};
$("pfChip").classList.remove("gone"); $("pfLine").setAttribute("points", "0,18"); $("pfChip").hidden = false; portfolioTick(); quip("invested", 2); }
else { stamp(I.dodged[0], I.dodged[1], "good"); quip("investDodged", 2); }
closeOffer();
} else if (step === "fee:fee"){
if (yes){ if (S.score < FEE) return; charge(FEE, "手續費", "Release fee"); T.invest = 3; }
offerStep("wait");
} else if (step === "fee:gone"){ S.pf = null; $("pfChip").hidden = true; closeOffer(); }
else if (step === "ticket:pitch" || step === "ticket:again"){
if (yes){ if ($("offerYes").hidden || S.score < TICKET || T.tickets >= MAX_TICKETS) return; charge(TICKET, "刮刮卡", "Scratch card"); T.tickets++; offerStep("scratch"); }
else if (o.step === "pitch"){ stamp(L.dodged[0], L.dodged[1], "good"); quip("ticketDodged", 2); closeOffer(); }
else { quip("ticketStop", 2); offerStep("lesson"); }
} else if (step === "ticket:lesson") closeOffer();
}
function lessonInto(el, [en, zh], fact, n){
const sub = t => t.replace("{n}", n || ""), mk = (tag, cls, t) => { const e = document.createElement(tag); if (cls) e.className = cls; e.textContent = sub(t); return e; };
const z = mk("span", "zl", zh); z.lang = "zh-HK";
const f = mk("span", "fact", fact[0]), fz = mk("small", "", fact[1]); fz.lang = "zh-HK"; f.appendChild(fz);
el.replaceChildren(mk("b", "", en), z, f);
}
function closeOffer(){
$("offerModal").hidden = true; S.offer = null; modalOpen(false);
if (S.mode === "offer"){ S.mode = "playing"; A.mode(musicMode()); }
$("board").focus({preventScroll: true});
}
function offerFrame(){
const o = S.offer, el = o.t - o.stepAt;
if (o.limit){
const left = o.limit - el;
$("offerBar").style.transform = "scaleX(" + clamp(left / o.limit, 0, 1).toFixed(3) + ")";
const sec = Math.max(0, Math.ceil(left / 1000));
if (sec !== o.sec){ o.sec = sec; $("offerSec").textContent = sec; if (sec <= 3 && sec > 0) A.sfx("cardTick", {n: sec}); }
if (left <= 0) offerAnswer(false, true);
} else if (o.step === "wait" && el >= 1400) offerStep("gone");
else if (o.step === "scratch"){
const c = $("scratch").children, rm = reduceMotion, at = rm ? [100, 250, 300, 500, 550, 800, 1300] : [100, 600, 700, 1200, 1300, 2750, 3600];
const reveal = (i, sym) => { c[i].dataset.sym = sym; c[i].querySelector(".sym").textContent = sym; c[i].classList.add("on"); };
if (o.sc < at.length && el >= at[o.sc]){
switch (o.sc++){
case 0: c[0].classList.add("scratching"); A.sfx("scratch"); break;
case 1: reveal(0, "💰"); haptic(14, 0.25, 0.35); break;
case 2: c[1].classList.add("scratching"); A.sfx("scratch"); break;
case 3: reveal(1, "💰"); haptic(14, 0.25, 0.35); break;
case 4: c[2].classList.add("scratching", "rolling"); A.sfx("scratch"); break;
case 5: c[2].classList.remove("rolling"); reveal(2, "🦀"); c[2].classList.add("miss"); A.sfx("nearMiss"); haptic([30, 40, 45], 0.6, 0.45); $("offerNote").textContent = TR.ticket.close.join(" "); if (!rm) fizzle(); break;
case 6: offerStep("again"); break;
}
}
}
}
const REEL = ["💎", "🍀", "🦀", "💰", "💎", "🍀", "💰", "🦀", "💎", "💰", "🍀", "💰", "🦀"];
function buildScratch(){
[...$("scratch").children].forEach((c, i) => {
c.className = "sc"; c.dataset.sym = "";
const el = cls => { const e = document.createElement("span"); e.className = cls; return e; }, parts = [];
if (i === 2){ const r = el("reel"); r.style.setProperty("--n", REEL.length - 1); for (const x of REEL){ const e = document.createElement("em"); e.textContent = x; r.appendChild(e); } parts.push(r); }
const coin = el("coin"); coin.textContent = "🪙";
c.replaceChildren(...parts, el("sym"), el("foil"), coin);
for (let d = 0; d < 6; d++){ const g = document.createElement("i"); g.className = "dust"; g.style.cssText = "--dx:" + Math.round(Math.random() * 60 - 30) + "px;--dy:" + Math.round(-10 - Math.random() * 30) + "px;--d:" + (d * 60) + "ms;--x:" + (10 + d * 15) + "%"; c.appendChild(g); }
});
const old = $("scratch").querySelector(".confetti"); if (old) old.remove();
}
function fizzle(){
const box = document.createElement("span"); box.className = "confetti";
const cols = ["#FFE45C", "#FF5FA2", "#20C1B3", "#3A9BF0", "#FF7B35"];
for (let i = 0; i < 22; i++){ const e = document.createElement("i"); e.style.cssText = "--dx:" + Math.round(Math.random() * 260 - 130) + "px;--dy:" + Math.round(-40 - Math.random() * 70) + "px;--r:" + Math.round(Math.random() * 720 - 360) + "deg;--c:" + cols[i % cols.length] + ";--d:" + Math.round(Math.random() * 120) + "ms"; box.appendChild(e); }
$("scratch").appendChild(box);
}
function offerArt(state){
const a = $("offerArt"); a.hidden = !state; if (!state) return;
if (!a.firstChild){
a.innerHTML = '<svg viewBox="0 0 300 100" preserveAspectRatio="none"><path class="grid" d="M0 25H300M0 50H300M0 75H300"/>' +
'<path class="up" pathLength="1" d="M0 92L25 88L45 90L70 78L95 80L120 66L140 70L165 52L190 56L215 38L240 40L265 20L290 8"/>' +
'<path class="down" pathLength="1" d="M290 8L294 40L297 30L300 104"/></svg>' +
'<span class="tag t1">+30%</span><span class="tag t2">+60%</span><span class="rocket">🚀</span>' +
'<span class="susp">SUSPENDED<small>凍結</small></span>' +
Array.from({length: 7}, (_, i) => '<i class="cash" style="--dx:' + Math.round(Math.random() * 240 - 120) + 'px;--dy:' + Math.round(-30 - Math.random() * 45) + 'px;--r:' + Math.round(Math.random() * 90 - 45) + 'deg;--d:' + (i * 70) + 'ms">💸</i>').join("");
}
a.className = "of-art"; void a.offsetWidth; a.className = "of-art " + state;
}
function openRevive(){
if (!S || S.mode !== "over" || S.over !== "drops") return showEnd();
const R = TR.revive;
S.revive = {t: 0, phase: "ask", sec: -1, at: 0}; S.troll.reviveSeen = 1;
$("rvTitle").textContent = R.title[0]; const z = document.createElement("span"); z.className = "zh"; z.lang = "zh-HK"; z.textContent = R.title[1]; $("rvTitle").appendChild(z);
$("rvSub").replaceChildren(); bi($("rvSub"), R.sub[0], R.sub[1]);
label($("rvYes"), ["❤ " + R.yes[0], R.yes[1]]); label($("rvNo"), R.no); label($("rvGo"), R.go);
$("rvActions").hidden = false; $("rvCount").hidden = false; $("rvBarBox").hidden = true; $("rvLesson").hidden = true; $("rvMsg").textContent = "";
$("rvBar").style.transform = "scaleX(0)"; $("rvSheet").classList.remove("glitch", "dead"); $("rvSub").hidden = false;
$("reviveModal").hidden = false; modalOpen(true); $("rvYes").focus({preventScroll: true});
}
function reviveFrame(dt){
const r = S.revive; r.t += dt;
const limit = REVIVE_MS * (slowRead ? 2 : 1);
if (r.phase === "ask"){
const sec = Math.max(0, Math.ceil((limit - r.t) / 1000));
if (sec !== r.sec){ r.sec = sec; $("rvCount").textContent = sec; if (sec > 0){ A.sfx("heartbeat"); haptic([18, 55, 14], 0.35, 0.25); const c = $("rvCount"); c.classList.remove("beat"); void c.offsetWidth; c.classList.add("beat"); } }
if (r.t >= limit) reviveAnswer(false, true);
} else if (r.phase === "busy"){
const k = Math.min(0.99, (r.t - r.at) / 2500);
$("rvBar").style.transform = "scaleX(" + k.toFixed(3) + ")"; $("rvMsg").textContent = TR.revive.busy[0] + " " + Math.round(k * 100) + "% " + TR.revive.busy[1];
if (r.t - r.at >= 2900){
r.phase = "fail"; r.at = r.t; $("rvSheet").classList.add("glitch", "dead"); if (!reduceMotion) $("boardWrap").classList.add("static");
$("rvMsg").textContent = TR.revive.fail.join(" "); A.sfx("reviveFail"); haptic([80, 40, 120], 0.9, 0.7); mood("cover", 4000);
}
} else if (r.phase === "fail" && r.t - r.at >= 1150 && !r.crt && !reduceMotion){ r.crt = true; $("boardWrap").classList.add("crt"); }
else if (r.phase === "fail" && r.t - r.at >= (reduceMotion ? 1200 : 2000)){
r.phase = "lesson"; $("boardWrap").classList.remove("static", "crt"); $("rvSheet").classList.remove("glitch"); $("reviveModal").classList.remove("watch");
lessonInto($("rvLessonText"), TR.revive.lesson, TR.revive.fact);
$("rvLesson").hidden = false; $("rvGo").focus({preventScroll: true});
}
}
function reviveAnswer(yes, force){
const r = S.revive; if (!r || r.phase !== "ask" || (!force && r.t < 600)) return;
if (!yes){ closeRevive(); if (!force) quip("reviveGiveUp", 3); showEnd(); return; }
S.troll.revive = 1; r.phase = "busy"; r.at = r.t; r.splashed = [];
$("rvActions").hidden = true; $("rvCount").hidden = true; $("rvSub").hidden = true; $("rvBarBox").hidden = false;
$("reviveModal").classList.add("watch");
mood("happy", 3000); A.sfx("vineGet"); $("rvSheet").focus({preventScroll: true});
}
function closeRevive(){ $("reviveModal").hidden = true; $("reviveModal").classList.remove("watch"); S.revive = null; $("boardWrap").classList.remove("static", "crt"); }
function drawGhosts(c, k){
const r = S.revive; if (!S.lost.length || (r.phase !== "busy" && r.phase !== "fail")) return;
const items = S.lost.slice(-3), n = items.length, top = -S.height, y0 = WATER_Y + 80;
c.save();
items.forEach((def, i) => {
const x = W / 2 + (i - (n - 1) / 2) * 92, ty = top - 130 - (i % 2) * 34;
let y, a = 0.72;
if (r.phase === "busy"){
const p = clamp((r.t - r.at - i * 250) / 2200, 0, 1), e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(2 - 2 * p, 3) / 2;
y = y0 + (ty - y0) * e + (reduceMotion ? 0 : Math.sin((r.t + i * 300) / 260) * 3 * e);
const g = c.createLinearGradient(0, y, 0, WATER_Y);
g.addColorStop(0, "rgba(255,250,210,0.5)"); g.addColorStop(1, "rgba(255,250,210,0)");
c.globalAlpha = 1; c.shadowBlur = 0; c.fillStyle = g; c.fillRect(x - 24, y, 48, Math.max(0, WATER_Y - y));
} else {
const ft = r.t - r.at, fall = reduceMotion ? 0 : Math.max(0, ft - 350 - i * 120);
y = ty + 0.0016 * fall * fall; a = reduceMotion ? Math.max(0, 0.72 - ft / 600) : ft < 700 && Math.floor(ft / 60) % 2 ? 0.25 : 0.72;
if (!r.splashed[i] && y > WATER_Y){ r.splashed[i] = true; S.splashes.push({x, t: 0, big: true}); A.sfx("splash"); }
if (y > WATER_Y + 90 || a <= 0) return;
}
const s = spriteNear(def, 0, true); if (!s) return;
c.globalAlpha = a; c.shadowColor = "rgba(255,244,190,1)"; c.shadowBlur = 26 * k;
c.save(); c.translate(x, y); c.drawImage(s.img, s.x0, s.y0, s.w, s.h); c.restore();
if (r.phase === "busy" && !reduceMotion){ c.shadowBlur = 0;
for (let j = 0; j < 3; j++) twinkle(c, x + Math.sin(r.t / 170 + i + j * 2.1) * 30, y - 10 + Math.cos(r.t / 210 + j) * 24, 3.5 + Math.sin(r.t / 90 + i * 2 + j) * 2, 0.85); }
});
c.restore();
}
$("offerYes").addEventListener("click", () => offerAnswer(true));
$("offerNo").addEventListener("click", () => offerAnswer(false));
$("rvYes").addEventListener("click", () => reviveAnswer(true));
$("rvNo").addEventListener("click", () => reviveAnswer(false));
$("rvGo").addEventListener("click", () => { if (!S.revive || S.revive.phase !== "lesson") return; closeRevive(); showEnd(); });
const frenzyOn = () => !!S && S.play < S.frenzyUntil;
const musicMode = () => frenzyOn() ? "frenzy" : S.play < S.speedUntil ? "fast" : "normal";
function pay(base){
const [gain, x, extra] = computePayout(base, S.rate, frenzyOn(), FRENZY_X);
if (extra > 0) S.jpExtra += extra;
return [gain, x];
}
function jackpotHit(){
S.jpAt = S.play; S.frenzyUntil = S.play + FRENZY_MS; S.frenzySec = 0;
S.score += JACKPOT_BONUS; ledger({zh: "大獎", en: "Jackpot windfall"}, JACKPOT_BONUS);
A.sfx("jackpot"); A.mode(musicMode());
haptic([70, 50, 70, 50, 180], 0.9, 0.7);
if (!reduceMotion){ const bw = $("boardWrap"); bw.classList.remove("jpshake"); void bw.offsetWidth; bw.classList.add("jpshake"); }
mood("happy", 3500); quip("jackpot", 3);
const sec = FRENZY_MS / 1000;
crab("A " + fmt(JACKPOT_BONUS) + " windfall, and ×" + FRENZY_X + " pay for " + sec + " seconds. Luck pays once; good habits keep paying.",
"意外之財 " + fmt(JACKPOT_BONUS) + "，加" + sec + "秒" + FRENZY_X + "倍收入。好運只係一次，好習慣先會一直有回報。");
moneyRain(); jackpotBanner(); frenzyUI(); updateHUD();
const st = S;
setTimeout(() => { if (S === st && S.mode === "playing") stamp("Its claws catch what lands", "對鉗接住跌落嚟嘅嘢", "gold"); }, 3100);
}
function frenzyTick(){
const left = S.frenzyUntil - S.play;
if (left <= 0){ frenzyEnd(); return; }
const sec = Math.ceil(left / 1000);
if (sec !== S.frenzySec){ S.frenzySec = sec; if (sec <= 3) A.sfx("frenzyTick", {n: sec}); }
frenzyUI();
}
function frenzyEnd(){
S.frenzyUntil = 0; frenzyUI(); A.sfx("frenzyEnd"); A.mode(musicMode());
stamp("Jackpot time is over", "大獎時間完", "info"); quip("frenzyEnd", 2, fmt(JACKPOT_BONUS + S.jpExtra));
}
const FZ = {el: $("frenzy"), sec: $("frenzySec"), bar: $("frenzyBar"), shown: false, s: -1};
$("frenzyX").textContent = "×" + FRENZY_X;
function frenzyUI(){
const on = frenzyOn() && S.mode !== "over";
if (on !== FZ.shown){ FZ.shown = on; FZ.el.hidden = !on; document.documentElement.classList.toggle("jp", on); document.documentElement.classList.remove("jp-end"); FZ.s = -1; }
if (!on) return;
const left = S.frenzyUntil - S.play, sec = Math.ceil(left / 1000);
if (sec !== FZ.s){ FZ.s = sec; FZ.sec.textContent = sec; FZ.el.classList.toggle("ending", sec <= 3); document.documentElement.classList.toggle("jp-end", sec <= 3); }
FZ.bar.style.transform = "scaleX(" + clamp(left / FRENZY_MS, 0, 1).toFixed(3) + ")";
}
let banT = 0;
function jackpotBanner(){
const b = $("jpBan"), sec = FRENZY_MS / 1000; $("jpAmt").textContent = "+" + fmt(JACKPOT_BONUS);
$("jpNote").textContent = "Everything pays ×" + FRENZY_X + " for " + sec + " s · " + sec + "秒內存入" + FRENZY_X + "倍";
b.hidden = false; b.classList.remove("show"); void b.offsetWidth; b.classList.add("show");
clearTimeout(banT); banT = setTimeout(() => { b.hidden = true; b.classList.remove("show"); }, 2400);
}
function popMoney(m, gain){
const p = poseOf(m);
S.pops.push({x: clamp(p.x, 50, W - 50), y: hostOf(m).bounds.min.y - 8, t: 0, txt: "+" + fmt(gain)});
if (S.pops.length > 8) S.pops.shift();
}
function drawPops(c, f){
c.save(); c.textAlign = "center"; c.textBaseline = "middle"; c.lineJoin = "round";
for (const q of S.pops){
q.t += f; const k = q.t / 75, s = reduceMotion ? 1 : Math.min(1, 0.55 + q.t / 9);
const y = q.y - (reduceMotion ? 0 : 30 * (1 - Math.pow(1 - Math.min(1, k), 2)));
c.globalAlpha = k < 0.7 ? 1 : Math.max(0, 1 - (k - 0.7) / 0.3);
c.font = "900 " + (16 * s).toFixed(1) + "px " + K.FONTS.display;
const tw = c.measureText(q.txt).width, x = q.x - 14 * s;
c.lineWidth = 4.5 * s; c.strokeStyle = "rgba(96,52,0,0.9)"; c.strokeText(q.txt, x, y);
c.fillStyle = "#FFE45C"; c.fillText(q.txt, x, y);
c.font = "900 " + (11 * s).toFixed(1) + "px " + K.FONTS.display;
const tag = "×" + FRENZY_X, bx = x + tw / 2 + 4 * s, bw = c.measureText(tag).width + 10 * s, bh = 15 * s;
c.fillStyle = "#C35117"; roundRect(c, bx, y - bh / 2, bw, bh, bh / 2); c.fill();
c.fillStyle = "#fff"; c.fillText(tag, bx + bw / 2, y + 0.5);
}
c.restore();
S.pops = S.pops.filter(q => q.t < 75); needDraw = true;
}
function twinkle(c, x, y, r, a){
if (r < 0.6) return;
c.globalAlpha = a; c.fillStyle = "#FFF7C9"; c.beginPath(); c.moveTo(x, y - r);
c.quadraticCurveTo(x, y, x + r, y); c.quadraticCurveTo(x, y, x, y + r); c.quadraticCurveTo(x, y, x - r, y); c.quadraticCurveTo(x, y, x, y - r);
c.fill(); c.globalAlpha = 1;
}
const RAIN = {cv: null, g: null, parts: [], sparks: [], t0: 0, last: 0, raf: 0, w: 0, h: 0, dpr: 1, spr: null, sprKey: ""};
const NOTES = [["#3B7FD4", "20"], ["#D9433B", "100"], ["#9A5A2C", "500"], ["#E19A26", "1000"]];
function rainSprites(u, dpr){
const key = u + "|" + dpr; if (RAIN.sprKey === key) return RAIN.spr;
const mk = (w, h, fn) => { const c = document.createElement("canvas"); c.width = Math.ceil(w * dpr); c.height = Math.ceil(h * dpr); const g = c.getContext("2d"); g.scale(dpr, dpr); fn(g); return c; };
const nw = u, nh = Math.round(u * 0.5), cr = Math.round(u * 0.22);
const notes = NOTES.map(([col, val]) => [false, true].map(back => mk(nw, nh, g => {
roundRect(g, 0.5, 0.5, nw - 1, nh - 1, nh * 0.12); g.fillStyle = col; g.fill();
g.save(); g.clip(); g.lineWidth = Math.max(1.5, u / 28);
g.strokeStyle = "rgba(255,255,255,0.55)"; roundRect(g, 1.5, 1.5, nw - 1, nh - 1, nh * 0.12); g.stroke();
g.strokeStyle = "rgba(0,0,0,0.18)"; roundRect(g, -0.5, -0.5, nw - 1, nh - 1, nh * 0.12); g.stroke(); g.restore();
const sh = g.createLinearGradient(0, 0, nw, nh); sh.addColorStop(0, "rgba(255,255,255,0.3)"); sh.addColorStop(0.5, "rgba(255,255,255,0.04)"); sh.addColorStop(1, "rgba(0,0,0,0.2)");
g.fillStyle = sh; g.fill();
g.strokeStyle = "rgba(255,255,255,0.6)"; g.lineWidth = Math.max(1, u / 45); roundRect(g, nh * 0.12, nh * 0.12, nw - nh * 0.24, nh * 0.76, nh * 0.08); g.stroke();
g.fillStyle = "rgba(255,255,255,0.3)"; g.beginPath(); g.ellipse(back ? nw * 0.7 : nw * 0.3, nh / 2, nh * 0.25, nh * 0.29, 0, 0, 7); g.fill();
g.fillStyle = "#fff"; g.textBaseline = "middle"; g.textAlign = "center";
g.font = "900 " + (nh * 0.38).toFixed(1) + "px " + K.FONTS.display;
if (back){ g.fillText(val, nw * 0.7, nh * 0.54); return; }
g.fillText("$", nw * 0.3, nh * 0.54);
g.textAlign = "right"; g.font = "900 " + (nh * 0.3).toFixed(1) + "px " + K.FONTS.display; g.fillText(val, nw - nh * 0.24, nh * 0.38);
g.font = "800 " + (nh * 0.17).toFixed(1) + "px " + K.FONTS.display; g.fillText("HK$", nw - nh * 0.24, nh * 0.7);
})));
const coin = mk(cr * 2 + 2, cr * 2 + 2, g => {
const x = cr + 1, y = cr + 1, gr = g.createRadialGradient(x - cr * 0.35, y - cr * 0.4, cr * 0.1, x, y, cr);
gr.addColorStop(0, "#FFF6C2"); gr.addColorStop(0.45, "#FFD23F"); gr.addColorStop(1, "#C98A0E");
g.fillStyle = gr; g.beginPath(); g.arc(x, y, cr, 0, 7); g.fill();
g.strokeStyle = "#A86A08"; g.lineWidth = Math.max(1, cr * 0.12); g.stroke();
g.strokeStyle = "rgba(168,106,8,0.55)"; g.lineWidth = Math.max(0.8, cr * 0.07); g.beginPath(); g.arc(x, y, cr * 0.72, 0, 7); g.stroke();
g.fillStyle = "#A86A08"; g.textAlign = "center"; g.textBaseline = "middle"; g.font = "900 " + (cr * 1.05).toFixed(1) + "px " + K.FONTS.display; g.fillText("$", x, y + cr * 0.06);
});
RAIN.spr = {notes, coin, nw, nh, cr}; RAIN.sprKey = key; return RAIN.spr;
}
function moneyRain(){
if (!RAIN.cv){ const c = RAIN.cv = document.createElement("canvas"); c.className = "rain"; c.setAttribute("aria-hidden", "true"); document.body.appendChild(c); RAIN.g = c.getContext("2d"); }
const c = RAIN.cv; c.hidden = false;
const w = c.clientWidth || window.innerWidth, h = c.clientHeight || window.innerHeight, dpr = lowGfx ? 1 : Math.min(1.5, window.devicePixelRatio || 1);
if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)){ c.width = Math.round(w * dpr); c.height = Math.round(h * dpr); }
Object.assign(RAIN, {w, h, dpr, parts: [], sparks: [], t0: performance.now(), last: 0, box: cv.getBoundingClientRect()});
if (!reduceMotion){
const u = clamp(Math.round(Math.min(w, h) / 9), 36, 84), spr = rainSprites(u, lowGfx ? 1 : Math.min(2, window.devicePixelRatio || 1)), n = Math.round(clamp(w * h / (lowGfx ? 16000 : 6500), lowGfx ? 24 : 60, lowGfx ? 60 : 180));
for (let i = 0; i < n; i++){
const note = Math.random() < 0.68;
RAIN.parts.push({note, imgs: note ? spr.notes[Math.floor(Math.random() * spr.notes.length)] : null, x: Math.random() * w, y: -u - Math.random() * h * 0.2,
vx: (Math.random() - 0.5) * 50, vy: (note ? 0.15 : 0.35) * h + Math.random() * 0.2 * h, delay: Math.random() * 1700 * (0.25 + i / n),
a: (Math.random() - 0.5) * 1.2, va: (Math.random() - 0.5) * (note ? 2.4 : 1), flip: Math.random() * 6.28, vf: (note ? 3 : 9) + Math.random() * 5,
sway: note ? 25 + Math.random() * 45 : 0, sp: Math.random() * 6.28, s: 0.7 + Math.random() * 0.55, term: (0.28 + Math.random() * 0.16) * h});
}
const r = cv.getBoundingClientRect(), bx = r.left + r.width / 2, by = r.top + r.height * 0.42;
const burstN = lowGfx ? 10 : 28, sparkN = lowGfx ? 10 : 30;
for (let i = 0; i < burstN; i++){
const ang = -Math.PI / 2 + (Math.random() - 0.5) * 2.3, v = (0.55 + Math.random() * 0.75) * h;
RAIN.parts.push({note: false, x: bx, y: by, vx: Math.cos(ang) * v, vy: Math.sin(ang) * v, delay: Math.random() * 120, a: 0, va: 0,
flip: Math.random() * 6.28, vf: 10 + Math.random() * 8, sway: 0, sp: 0, s: 0.8 + Math.random() * 0.5, term: 0});
}
for (let i = 0; i < sparkN; i++) RAIN.sparks.push({x: Math.random() * w, y: Math.random() * h, delay: Math.random() * 2600, life: 380 + Math.random() * 320, r: 7 + Math.random() * 11});
}
if (!RAIN.raf) RAIN.raf = requestAnimationFrame(rainFrame);
}
function rainFrame(now){
const R = RAIN, g = R.g, el = now - R.t0, dt = R.last ? Math.min(0.05, (now - R.last) / 1000) : 0.016; R.last = now;
g.setTransform(R.dpr, 0, 0, R.dpr, 0, 0); g.clearRect(0, 0, R.w, R.h);
const fl = reduceMotion ? (el < 300 ? el / 300 : Math.max(0, 1 - (el - 300) / 1400)) * 0.22 : Math.max(0, 1 - el / 480) * 0.55;
if (fl > 0){
const B = reduceMotion ? R.box : {left: 0, top: 0, width: R.w, height: R.h}, cx = B.left + B.width / 2, cy = B.top + B.height / 2;
const gr = g.createRadialGradient(cx, cy, 0, cx, cy, Math.hypot(B.width, B.height) / 2);
gr.addColorStop(0, "rgba(255,246,190," + fl.toFixed(3) + ")"); gr.addColorStop(1, "rgba(255,186,40," + (fl * 0.85).toFixed(3) + ")");
g.fillStyle = gr; g.fillRect(B.left, B.top, B.width, B.height);
}
const spr = R.spr, grav = R.h * 1.7; let left = el < (reduceMotion ? 1700 : 480);
for (const p of R.parts){
if (p.done) continue; left = true;
if (el < p.delay) continue;
if (p.note){ p.vy += (p.term - p.vy) * Math.min(1, dt * 2.2); p.a += Math.sin(el / 420 + p.sp) * p.va * dt; }
else p.vy += grav * dt;
p.x += (p.vx + (p.sway ? Math.cos(el / 330 + p.sp) * p.sway : 0)) * dt; p.y += p.vy * dt; p.flip += p.vf * dt;
if (p.y > R.h + 80 || p.x < -120 || p.x > R.w + 120){ p.done = true; continue; }
const fc = Math.cos(p.flip), D = R.dpr;
if (p.note){
const fy = Math.max(0.08, Math.abs(fc)), ca = Math.cos(p.a), sa = Math.sin(p.a), w = spr.nw * p.s, h = spr.nh * p.s;
g.setTransform(D * ca, D * sa, -D * sa * fy, D * ca * fy, D * p.x, D * p.y);
g.drawImage(p.imgs[fc < 0 ? 1 : 0], -w / 2, -h / 2, w, h);
} else {
const d = (spr.cr * 2 + 2) * p.s;
g.setTransform(D * Math.max(0.12, Math.abs(fc)), 0, 0, D, D * p.x, D * p.y);
g.drawImage(spr.coin, -d / 2, -d / 2, d, d);
}
}
g.setTransform(R.dpr, 0, 0, R.dpr, 0, 0);
for (const s of R.sparks){
const t = el - s.delay; if (t > s.life) continue; left = true; if (t < 0) continue;
const k = Math.sin(t / s.life * Math.PI); twinkle(g, s.x, s.y, s.r * k, k);
}
if (left && el < 8000){ R.raf = requestAnimationFrame(rainFrame); return; }
g.clearRect(0, 0, R.w, R.h); R.cv.hidden = true; R.raf = 0; R.parts = []; R.sparks = [];
}
function startGame(){
clearTimeout(boothTimer);
A.unlock(); A.sfx("go"); closeInfo(true); closePicker(true); closeRoll(true);
pickFromEnd = false; pickReturnTo = null; rollFromEnd = false; rollReturnTo = null;
hideIabTip();
if (root.classList.contains("title")){ played = true; root.classList.remove("title"); enterBrowserFs(); lastFit = ""; resize(); }
played = true;
if (BOOTH){ whoPicked = false; ssSet("tff_picked", ""); }
flushRecord(S);
S = newState(); S.camTop = camTarget(); makeEngine(); S.mode = "playing"; frenzyUI(); $("jpBan").hidden = true;
takes++;
const cg = chalGhost(); GHOSTS = cg ? [cg] : []; loadGhosts();
root.classList.remove("rotlock");
S.persona = ROLL; rollKept = false; showWho();
if (firstQueue){ S.queue = firstQueue; S.lastId = firstQueue[2].id; S.jackpot = firstQueue.some(d => d.jackpot); firstQueue = null; }
$("startOv").hidden = true; $("pauseOv").hidden = true; pauseInert(false); $("endModal").hidden = true; $("cardModal").hidden = true; $("seeOv").hidden = true; modalOpen(false);
$("offerModal").hidden = true; $("reviveModal").hidden = true; $("pfChip").hidden = true; $("boardWrap").classList.remove("glitch"); planTrolls();
A.stage(0); A.mode("normal"); A.start();
renderLedger();
crab("Steer each item into place, then let go. Flat things stack; round things roll.", "搵好位置先放手。扁嘅易疊，圓嘅會碌。");
hush(); S.pb = lsGet("tff_pb", 0); quip(S.pb > 0 ? "startPb" : "start", 2, fmt(S.pb));
nextPiece();
updateHUD(); setPauseUI(); $("board").focus({preventScroll:true});
outfitKey = ""; prevLook = null; avFx.clear(); updateAvatar(true);
clipsSync();
}
function endGame(reason){
if (S.mode === "over") return;
S.mode = "over"; S.over = reason; S.endAt = Date.now();
try { S.sil = outlineOf(); } catch(e){}
if (S.frenzyUntil){ S.frenzyUntil = 0; frenzyUI(); }
if (S.active){ S.active.tff.released = true; S.active = null; }
if (S.card && S.card.flip && S.card.power && S.choices.length){
const lastCh = S.choices[S.choices.length - 1];
if (lastCh && lastCh.card === S.card.c.id && lastCh.pick === "wise") lastCh.power = S.card.power;
}
$("cardModal").hidden = true; S.card = null;
if (S.offer){ $("offerModal").hidden = true; S.offer = null; modalOpen(false); }
if (S.pf){ $("pfChip").hidden = true; S.pf = null; }
if (S.troll.invest >= 2 && !S.troll.scamSaid){ S.troll.scamSaid = 1; S.falls.scam++; }
A.mode("over"); setPauseUI(); clipsSync(); loadPoster(posterFor(S));
A.sfx(reason === "drops" ? "gameOver" : (S.stage === STAGES.length - 1 ? "win" : "timeUp"));
haptic(reason === "drops" ? [60, 40, 100] : [35, 45, 55], 0.8, 0.65);
mood(reason === "drops" ? "cover" : "happy", 4000);
S.overKey = reason === "drops" ? "overDrops" : "over" + S.stage; quip(S.overKey, 3);
if (S.score > lsGet("tff_pb", 0)) lsSet("tff_pb", Math.round(S.score));
$("timeVal").classList.remove("urgent"); $("hudTime").classList.remove("urgent");
updateHUD();
setTimeout(reason === "drops" ? openRevive : showEnd, reason === "drops" ? 1000 : 700);
}
function modalOpen(on){ const set = document.querySelector(".set"); if (set) set.inert = !!on; }
function pauseInert(on){
const set = document.querySelector(".set"), ov = $("pauseOv");
if (!set || !ov) return;
for (let cur = ov; cur && cur !== set; cur = cur.parentElement){
const p = cur.parentElement;
if (!p) break;
for (const sib of p.children) if (sib !== cur) sib.inert = !!on;
}
}
function setPauseUI(){ const pb = $("pauseBtn"); const live = S && (S.mode === "playing" || S.mode === "paused"); pb.disabled = !live; document.documentElement.classList.toggle("ingame", !!live); const p = !!(S && S.mode === "paused"); pb.setAttribute("aria-pressed", String(p)); }
function togglePause(){
if (S.mode === "playing" || S.mode === "paused") A.sfx("uiToggle");
if (S.mode === "playing"){ S.mode = "paused"; $("pauseOv").hidden = false; pauseInert(true); A.mode("paused"); $("resumeBtn").focus({preventScroll:true}); }
else if (S.mode === "paused"){ S.mode = "playing"; $("pauseOv").hidden = true; pauseInert(false); A.resume(); A.mode(musicMode()); $("board").focus({preventScroll:true}); }
setPauseUI();
}
const keys = {left:false, right:false};
let softHeld = false;
function act(a){
if (!S || S.mode !== "playing") return;
if (a.startsWith("rot") && S.rotLock > 0){
if (S.active){ A.sfx("uiNope"); haptic([25, 30, 35], 0.5, 0.4); if (S.play - S.rotSaid > 1500){ S.rotSaid = S.play; stamp("Too late to turn!", "遲咗，轉唔到！", "bad"); } }
return;
}
if (a === "rotate") S.targetAngle += Math.PI/2;
else if (a === "rotL") S.targetAngle -= Math.PI/12;
else if (a === "rotR") S.targetAngle += Math.PI/12;
else if (a === "drop") release(true);
else if (a === "hold") doHold();
if (S.active && a.startsWith("rot")){ A.sfx("rotate"); haptic(10, 0.18, 0.28); wantSprite(S.active.tff.def, qOf(S.targetAngle), 0); }
}
function setMuteUI(){ const m = String(A.muted()); $("muteBtn").setAttribute("aria-pressed", m); $("tsMute").setAttribute("aria-pressed", m); }
function toggleMute(){ A.unlock(); A.toggle(); setMuteUI(); A.sfx("uiToggle"); soundHint(); }
const root = document.documentElement;
const UA = navigator.userAgent || "";
const IOS = /iPhone|iPad|iPod/.test(UA) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const ANDROID = /Android/i.test(UA);
const IAB = (() => {
const apps = [["Instagram", /Instagram/i], ["Threads", /Barcelona/], ["Messenger", /Messenger|FBAN\/Messenger/], ["Facebook", /FBAN|FBAV|FB_IAB|FBIOS|FB4A/],
["LINE", /\bLine\//i], ["WeChat", /MicroMessenger/i], ["TikTok", /musical_ly|BytedanceWebview|TikTok/i], ["Snapchat", /Snapchat/i], ["LinkedIn", /LinkedInApp/i],
["X", /Twitter/i], ["Pinterest", /Pinterest/i], ["KakaoTalk", /KAKAOTALK/i], ["Weibo", /Weibo/i], ["Xiaohongshu", /xhsdiscover|XiaoHongShu/i]];
for (const [n, re] of apps) if (re.test(UA)) return n;
if (ANDROID && /; wv\)/.test(UA)) return "app";
if (IOS && !/Safari\//.test(UA) && !/CriOS|FxiOS|EdgiOS/.test(UA)) return "app";
return "";
})();
if (IAB) root.classList.add("inapp");
const fsEl = () => document.fullscreenElement || document.webkitFullscreenElement || null;
const fsApi = !!(root.requestFullscreen || root.webkitRequestFullscreen);
let fsOn = false, played = false;
function setFs(on){
fsOn = on; root.classList.toggle("fs", on); root.classList.toggle("title", on && !played); needDraw = true;
const b = $("fsBtn"); b.setAttribute("aria-pressed", String(on));
lastFit = ""; resize();
if (on) window.scrollTo(0, 0);
}
function enterBrowserFs(){
if (!fsApi || fsEl()) return;
try {
const p = root.requestFullscreen ? root.requestFullscreen({navigationUI: "hide"}) : root.webkitRequestFullscreen();
Promise.resolve(p).then(() => {
if (Math.min(screen.width, screen.height) < 600 && screen.orientation && screen.orientation.lock) screen.orientation.lock("portrait").catch(() => {});
}, () => {});
} catch(e){}
}
function toggleFs(want = !fsOn){
if (want === fsOn && !!fsEl() === (want && fsApi)) return;
A.unlock(); A.sfx("uiToggle");
lsSet("tff_fs", want);
setFs(want);
if (want) enterBrowserFs();
else if (fsEl()) try { Promise.resolve(document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen()).catch(() => {}); } catch(e){}
}
for (const ev of ["fullscreenchange", "webkitfullscreenchange"]) document.addEventListener(ev, () => { lastFit = ""; resize(); });
let endShownAt = 0;
const DIALOG_IDS = ["igModal", "holdModal", "endModal", "rollModal", "pickModal", "infoModal", "reviveModal", "offerModal", "cardModal", "pauseOv"];
function activeDialog(){
for (const id of DIALOG_IDS){
const el = $(id);
if (el && !el.hidden && !el.inert) return el;
}
return null;
}
function dialogTabbables(dlg){
const raw = [...dlg.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')];
const vis = raw.filter(el => {
if (el.disabled || el.closest("[hidden]") || el.closest("[inert]")) return false;
if (el.tabIndex < 0) return false;
const cs = getComputedStyle(el);
if (cs.display === "none" || cs.visibility === "hidden") return false;
return el.getClientRects().length > 0;
});
const seenRadio = new Set(), out = [];
for (const el of vis){
if (el.tagName === "INPUT" && el.type === "radio" && el.name){
if (seenRadio.has(el.name)) continue;
seenRadio.add(el.name);
const group = vis.filter(x => x.tagName === "INPUT" && x.type === "radio" && x.name === el.name);
out.push(group.find(x => x.checked) || group[0]);
continue;
}
out.push(el);
}
return out;
}
{
const _openCard = openCard, _choose = choose;
openCard = function(...args){
$("cardModal").setAttribute("aria-labelledby", "cardTitle cardTitleZh");
return _openCard.apply(this, args);
};
choose = function(...args){
const res = _choose.apply(this, args);
if (S && S.card && S.card.flip) $("cardModal").setAttribute("aria-labelledby", "ocHead cardTag");
return res;
};
}
document.addEventListener("keydown", e => {
if (BOOTH) bumpBooth();
if (e.key === "Tab"){
const dlg = activeDialog();
if (dlg){
const list = dialogTabbables(dlg);
if (!list.length){ e.preventDefault(); return; }
const first = list[0], last = list[list.length - 1], cur = document.activeElement;
if (!dlg.contains(cur)){ (e.shiftKey ? last : first).focus({preventScroll: true}); e.preventDefault(); return; }
const idx = (cur && cur.tagName === "INPUT" && cur.type === "radio" && cur.name)
? list.findIndex(x => x.tagName === "INPUT" && x.type === "radio" && x.name === cur.name)
: list.indexOf(cur);
if (e.shiftKey){
if (idx <= 0){ last.focus({preventScroll: true}); e.preventDefault(); }
} else {
if (idx === -1 || idx >= list.length - 1){ first.focus({preventScroll: true}); e.preventDefault(); }
}
return;
}
}
if (!$("igModal").hidden){
if (e.key === "Escape"){ closeIg(); e.preventDefault(); }
return;
}
if (!$("holdModal").hidden){
if (e.key === "Escape"){ closeHold(true); e.preventDefault(); }
return;
}
if (!S) return;
if (!$("rollModal").hidden){
if (e.key === "Escape"){ closeRoll(); e.preventDefault(); }
return;
}
if (!$("pickModal").hidden){
const k = e.key;
if (k === "ArrowLeft" || k === "ArrowRight" || k === "ArrowUp" || k === "ArrowDown"){ setPick(pickSel === "jack" ? "jackie" : "jack"); document.querySelector('#pickModal .who[aria-checked="true"]').focus(); e.preventDefault(); }
else if (k === "Escape"){ closePicker(); e.preventDefault(); }
else if ((k === "Enter" || k === " ") && e.target && e.target.classList && e.target.classList.contains("who")){ setPick(e.target.dataset.who); pickGo(); e.preventDefault(); }
return;
}
if (!$("infoModal").hidden){
if (e.key === "Escape"){ closeInfo(); e.preventDefault(); }
else if ((e.key === " " || e.key === "Enter") && !(e.target && e.target.closest && e.target.closest("button, a, input, label, [role=tab]"))) e.preventDefault();
return;
}
if (!$("endModal").hidden){
if ((e.key === " " || e.key === "Enter") && performance.now() - endShownAt < 900){ e.preventDefault(); return; }
if (e.key === "Escape"){ $("closeEnd").click(); e.preventDefault(); return; }
}
if (!$("pauseOv").hidden && e.key === "Escape"){ togglePause(); e.preventDefault(); return; }
const tag = (e.target && e.target.tagName) || "";
if (tag === "INPUT" || tag === "TEXTAREA") return;
const k = e.key;
if (k === "m" || k === "M"){ toggleMute(); e.preventDefault(); return; }
if ((k === "f" || k === "F") && !e.ctrlKey && !e.metaKey && !e.altKey){ toggleFs(); e.preventDefault(); return; }
if (S.revive){
if (S.revive.phase === "ask"){
if (k === "1"){ reviveAnswer(true); e.preventDefault(); }
else if (k === "2" || k === "Escape"){ reviveAnswer(false); e.preventDefault(); }
else if ((k === " " || k === "Enter") && S.revive.t < 600) e.preventDefault();
} else if (S.revive.phase === "lesson" && (k === "Escape" || k === "1" || k === "2")){ $("rvGo").click(); e.preventDefault(); }
return;
}
if (S.mode === "offer" && S.offer){
const onBtn = !!(e.target && e.target.closest && e.target.closest("#offerModal button"));
if (k === "1"){ offerAnswer(true); e.preventDefault(); }
else if (k === "2" || k === "Escape"){ offerAnswer($("offerNo").hidden); e.preventDefault(); }
else if ((k === " " || k === "Enter") && (!onBtn || S.offer.t - S.offer.stepAt < 450)) e.preventDefault();
return;
}
if (S.mode === "card" && S.card){
if (!S.card.flip && (k === " " || k === "Enter") && !(e.target && e.target.classList && e.target.classList.contains("choice"))){ e.preventDefault(); return; }
if (!S.card.flip && ["1","2","a","b","A","B"].includes(k)){
const idx = (k === "1" || k.toLowerCase() === "a") ? 0 : 1;
choose(S.card.order[idx] === "w" ? "wise" : "risky"); e.preventDefault();
} else if (S.card.flip && (k === "Enter" || k === " ")){ if (!(e.target && e.target.classList && e.target.classList.contains("pw"))){ closeCard(); e.preventDefault(); } }
else if (S.card.flip && S.card.powers && ["1", "2", "3"].includes(k)){
const inPow = !!(e.target && e.target.closest && e.target.closest("#ocPowerRow"));
pickPower(+k - 1, false, inPow); e.preventDefault();
}
else if (S.card.flip && S.card.powers && (k === "ArrowLeft" || k === "ArrowRight" || ((k === "ArrowUp" || k === "ArrowDown") && e.target && e.target.closest && e.target.closest("#ocPowerRow")))){
const n = S.card.powers.length, i = S.card.powers.indexOf(S.card.power);
const back = k === "ArrowLeft" || k === "ArrowUp";
pickPower((i + (back ? n - 1 : 1)) % n, false, true); e.preventDefault();
}
return;
}
if (S.mode === "idle" && S.viewing && !$("seeOv").hidden && (k === "Escape" || k === "r" || k === "R")){ openResults(); e.preventDefault(); return; }
const onControl = !!(e.target && e.target.closest && e.target.closest("button, a, label, [role=tab]"));
if (S.mode === "idle" && (k === "Enter" || k === " ") && !onControl && (!$("startOv").hidden || !$("seeOv").hidden)){ if (!$("startOv").hidden) beginGame(); else if (S.flowDone) newLife(); else openResults(); e.preventDefault(); return; }
if (k === "p" || k === "P" || k === "Escape"){ if (S.mode === "playing" || S.mode === "paused"){ togglePause(); e.preventDefault(); } return; }
if (S.mode !== "playing") return;
switch (k){
case "ArrowLeft": setKey("left", true); S.dragX = null; e.preventDefault(); break;
case "ArrowRight": setKey("right", true); S.dragX = null; e.preventDefault(); break;
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
let igHiddenAt = 0;
document.addEventListener("visibilitychange", () => {
if (document.hidden){
igHiddenAt = performance.now();
if (S && S.mode === "playing") togglePause();
A.suspend(); flushRecord(S, true);
} else {
A.resume();
const away = igHiddenAt ? performance.now() - igHiddenAt : 0; igHiddenAt = 0;
if (away > 1200 && performance.now() - outboundAt > 4000 && igEligible()) setTimeout(() => { if (!document.hidden && igEligible()) openIg(true); }, 220);
}
});
$("pad").querySelectorAll("button").forEach(b => {
const a = b.dataset.act;
const down = e => { e.preventDefault(); if (S) S.dragX = null;
if (a === "left") setKey("left", true); else if (a === "right") setKey("right", true); else if (a === "down") softHeld = true; else act(a); };
const up = () => { if (a === "left") keys.left = false; if (a === "right") keys.right = false; if (a === "down") softHeld = false; };
b.addEventListener("pointerdown", down);
b.addEventListener("click", e => { if (e.detail === 0 && a !== "left" && a !== "right" && a !== "down") act(a); });
b.addEventListener("pointerup", up); b.addEventListener("pointerleave", up); b.addEventListener("pointercancel", up);
b.addEventListener("contextmenu", e => e.preventDefault());
});
const AV = window.TFF_AVATAR, AV_IDS = ["hudAvatar", "cardAvatar"];
let WHO = lsGet("tff_who", "jack") === "jackie" ? "jackie" : "jack", whoPicked = ssGet("tff_picked") === "1", pickSel = WHO;
const avKeys = new Map();
let lookKey = "", outfitKey = "", avTick = 0, prevLook = null;
const avFx = new Map();
function lookNow(){
const sc = S.score, tier = sc < 2000 && S.play > 25000 ? 0 : sc < 20000 ? 1 : sc < 60000 ? 2 : 3;
const md = S.mode === "over" ? (S.over === "drops" ? "worried" : "happy") : S.mood.until > S.play ? (S.mood.type === "happy" ? "happy" : S.mood.type === "idle" ? "idle" : "worried") : "idle";
return {who: WHO, stage: S.stage, tier, hand: S.hand, mood: md, drops: Math.min(2, S.drops), boost: S.rate >= 2};
}
function paintAvatar(c, look){
if (avFx.has(c)) return;
const r = c.getBoundingClientRect(); if (!r.width) return;
const dpr = Math.min(3, window.devicePixelRatio || 1), w = Math.round(r.width * dpr), h = Math.round(r.height * dpr), key = AV.keyOf(look) + "|" + w + "x" + h;
if (avKeys.get(c) === key) return; avKeys.set(c, key);
if (c.width !== w || c.height !== h){ c.width = w; c.height = h; }
const g = c.getContext("2d"), s = Math.min(w / AV.W, h / AV.H);
g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, w, h); g.setTransform(s, 0, 0, s, (w - AV.W * s) / 2, h - AV.H * s); AV.draw(g, look);
}
function updateAvatar(force){
if (!S || !AV) return;
const L = lookNow(), k = AV.keyOf(L);
if (k === lookKey && !force) return; lookKey = k;
const ok = [L.who, L.stage, L.tier, L.hand, L.drops, L.boost].join();
if (ok !== outfitKey && outfitKey && prevLook && !reduceMotion){
const kind = L.stage > prevLook.stage ? "level" : L.tier > prevLook.tier ? "rich" : (L.tier < prevLook.tier || L.drops > prevLook.drops) ? "down" : "swap";
for (const id of AV_IDS) avTransition($(id), prevLook, L, kind);
avBurst($("hudAvatar"), kind, L);
}
if (ok !== outfitKey){ outfitKey = ok; prevLook = {...L}; }
for (const id of AV_IDS) paintAvatar($(id), L);
}
const easeBack = p => 1 + 2.2 * Math.pow(p - 1, 3) + 1.2 * Math.pow(p - 1, 2);
function avTransition(c, from, to, kind){
const r = c.getBoundingClientRect(); if (!r.width || !r.height) return;
const dpr = Math.min(3, window.devicePixelRatio || 1), w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
const shot = (look, white) => { const o = document.createElement("canvas"); o.width = w; o.height = h; const g = o.getContext("2d"), s = Math.min(w / AV.W, h / AV.H);
g.setTransform(s, 0, 0, s, (w - AV.W * s) / 2, h - AV.H * s); AV.draw(g, look);
if (white){ g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = "source-atop"; g.fillStyle = "#fff"; g.fillRect(0, 0, w, h); } return o; };
const A0 = shot(from), W0 = shot(from, true), A1 = shot(to), W1 = shot(to, true);
if (c.width !== w || c.height !== h){ c.width = w; c.height = h; }
const fx = {t0: performance.now(), dur: kind === "level" ? 1000 : 720}; avFx.set(c, fx);
const g = c.getContext("2d"), cx = w / 2, cy = h * 0.5, gold = kind === "level" || kind === "rich";
const sparks = Array.from({length: 8}, (_, i) => ({a: i / 8 * Math.PI * 2 + 0.3, v: 0.7 + (i % 3) * 0.2}));
const flip = (img, wimg, sx, white) => { g.save(); g.translate(cx, 0); g.scale(Math.max(0.03, sx), 1); g.translate(-cx, 0); g.drawImage(img, 0, 0); if (white > 0){ g.globalAlpha = white; g.drawImage(wimg, 0, 0); } g.restore(); };
const star = (x, y, rr) => { g.beginPath(); for (let i = 0; i < 8; i++){ const a = i * Math.PI / 4, q = i % 2 ? rr * 0.38 : rr; g.lineTo(x + Math.cos(a) * q, y + Math.sin(a) * q); } g.closePath(); g.fill(); };
const frame = now => {
if (avFx.get(c) !== fx) return;
const t = Math.min(1, (now - fx.t0) / fx.dur);
g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, w, h);
if (t < 0.42){ const p = t / 0.42; flip(A0, W0, Math.cos(p * Math.PI / 2), Math.min(1, p * 1.7)); }
else { const p = Math.min(1, (t - 0.42) / 0.45); flip(A1, W1, easeBack(p), Math.max(0, 1 - p * 1.6)); }
if (t > 0.3 && t < 0.8){
const p = (t - 0.3) / 0.5; g.globalAlpha = 0.9 * (1 - p); g.fillStyle = kind === "down" ? "#C9CED8" : "#fff";
for (let i = 0; i < 7; i++){ const a = i / 7 * Math.PI * 2, d = w * (0.12 + 0.32 * p); g.beginPath(); g.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d * 1.5, w * (0.17 - 0.08 * p), 0, Math.PI * 2); g.fill(); }
g.globalAlpha = 1; }
if (t > 0.4 && kind !== "down"){
const p = (t - 0.4) / 0.6; g.globalAlpha = 1 - p * p; g.fillStyle = gold ? "#FFD23F" : "#FFFFFF";
for (const s of sparks){ const d = w * (0.1 + 0.42 * p * s.v); star(cx + Math.cos(s.a) * d, cy + Math.sin(s.a) * d * 1.6, w * 0.085 * (1 - 0.4 * p)); }
g.globalAlpha = 1; }
if (t < 1) requestAnimationFrame(frame);
else { avFx.delete(c); avKeys.delete(c); paintAvatar(c, S ? lookNow() : to); }
};
requestAnimationFrame(frame);
}
function avBurst(c, kind, look){
const r = c.getBoundingClientRect(); if (!r.width || kind === "swap") return;
const d = document.createElement("div"); d.className = "avfx " + kind; d.setAttribute("aria-hidden", "true");
const cx = r.left + r.width / 2; d.style.left = cx + "px"; d.style.top = (r.top + r.height / 2) + "px"; d.style.setProperty("--s", Math.max(r.width, r.height * 0.6) + "px");
d.style.setProperty("--dx", Math.max(0, 60 - cx) + "px");
d.appendChild(document.createElement("i"));
for (let i = 0; i < 6; i++){ const s = document.createElement("b"); s.style.setProperty("--a", (i * 60 + 15) + "deg"); d.appendChild(s); }
const words = kind === "level" ? ["Level up!", "升級！"] : kind === "rich" ? ["Richer!", "身家升咗！"] : null;
if (words){ const t = document.createElement("span"); t.className = "avfx-t"; t.textContent = words[0]; const z = document.createElement("small"); z.textContent = words[1]; t.appendChild(z); d.appendChild(t); }
document.body.appendChild(d); setTimeout(() => d.remove(), 1500);
}
function setPick(who, quiet){
if (!quiet && who !== pickSel) A.sfx("uiSelect");
pickSel = who;
for (const b of document.querySelectorAll("#pickModal .who")){ const on = b.dataset.who === who; b.setAttribute("aria-checked", String(on)); b.tabIndex = on ? 0 : -1; }
for (const b of document.querySelectorAll("#pickModal .who")) paintAvatar(b.querySelector("canvas"), {who: b.dataset.who, stage: 0, tier: 1, hand: null, mood: b.dataset.who === who ? "happy" : "idle", drops: 0, boost: false});
}
let pickFromEnd = false, pickReturnTo = null;
function openPicker(){
pickFromEnd = !$("endModal").hidden; $("endModal").hidden = true;
pickReturnTo = !pickFromEnd && document.activeElement && document.activeElement !== document.body && !document.activeElement.closest("#pickModal") ? document.activeElement : null;
hideIabTip();
$("pickModal").hidden = false; modalOpen(true); setPick(WHO, true); A.sfx("uiOpen");
fitLine($("pickTitle"));
document.querySelector('#pickModal .who[aria-checked="true"]').focus({preventScroll: true});
}
function closePicker(quiet){
if ($("pickModal").hidden) return;
if (!quiet) A.sfx("uiClose"); $("pickModal").hidden = true; modalOpen(false);
if ((pickFromEnd || ($("startOv").hidden && $("seeOv").hidden)) && !quiet && S && S.mode === "over"){
$("endModal").hidden = false; modalOpen(true);
$(S.step === 4 ? "againBtn" : STEP_FOCUS[S.step - 1]).focus({preventScroll: true});
} else if (!quiet){
if (!played) iabTip();
const fb = !$("startOv").hidden ? $("startBtn") : !$("seeOv").hidden ? $("againBtn2") : null;
const tgt = (pickReturnTo && pickReturnTo.isConnected && !pickReturnTo.closest("[hidden]") && pickReturnTo.getClientRects().length) ? pickReturnTo : fb;
if (tgt) tgt.focus({preventScroll: true});
else if (S && S.mode === "playing") $("board").focus({preventScroll: true});
}
pickFromEnd = false; pickReturnTo = null;
}
function pickGo(){
const fromEnd = pickFromEnd, ret = pickReturnTo;
WHO = pickSel; if (!BOOTH) lsSet("tff_who", WHO); whoPicked = true; ssSet("tff_picked", "1");
closePicker(true);
if (fromEnd) pickFromEnd = true;
if (ret) pickReturnTo = ret;
newLife();
}
let holdAdmitted = false, holdSkipped = false, holdTimer = 0, holdReadyCb = null, holdReturnTo = null;
const HOLD_CID = (() => { let c = ssGet("tff_cid"); if (!c){ c = "c" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36); ssSet("tff_cid", c); } return c; })();
function closeHold(skip){
clearTimeout(holdTimer); holdTimer = 0;
const m = $("holdModal"), cb = holdReadyCb; holdReadyCb = null;
if (skip) holdSkipped = true; else holdAdmitted = true;
if (m && !m.hidden){ m.hidden = true; modalOpen(false); }
if (skip && window.__tffServerHold) try { fetch("/api/queue?leave=1&cid=" + encodeURIComponent(HOLD_CID), { keepalive: true }).catch(() => {}); } catch(e){}
if (cb) cb();
else if (holdReturnTo && holdReturnTo.focus && !holdReturnTo.closest("[hidden]")) holdReturnTo.focus({preventScroll: true});
holdReturnTo = null;
}
function openHold(onReady){
const m = $("holdModal"); if (!m){ if (onReady) onReady(); return; }
clearTimeout(holdTimer); holdReadyCb = onReady || null;
holdReturnTo = document.activeElement;
hideIabTip(); m.hidden = false; modalOpen(true); A.sfx("uiOpen");
const posEl = $("holdPos"), etaEl = $("holdEta"), barEl = $("holdBar");
if ($("holdSkipBtn")) $("holdSkipBtn").focus({preventScroll: true});
const preview = /[?&]hold=1(&|$)/.test(location.search);
let left = 3, pct = 25;
const paint = (pos, eta, w) => { if (posEl) posEl.textContent = "#" + pos; if (etaEl) etaEl.textContent = "~" + eta + "s"; if (barEl) barEl.style.width = w + "%"; };
const step = async () => {
if (m.hidden) return;
if (preview){
paint(Math.max(1, left), left, Math.min(95, pct));
if (left <= 0){ closeHold(false); return; }
left--; pct += 25;
holdTimer = setTimeout(step, 1000);
return;
}
try {
const r = await fetch("/api/queue?cid=" + encodeURIComponent(HOLD_CID), { cache: "no-store" });
const j = await r.json();
if (!j || !j.onHold){ closeHold(false); return; }
pct = Math.min(92, pct + 18);
paint(j.position || 1, j.etaSec || 2, pct);
holdTimer = setTimeout(step, Math.max(1500, Math.min(5000, (j.retryAfter || 2) * 1000)));
} catch(e){ closeHold(false); }
};
step();
}
if ($("holdSkipBtn")) $("holdSkipBtn").addEventListener("click", () => closeHold(true));
window.TFF_HOLD = { open: openHold, close: closeHold };
function proceedBeginGame(){
if (root.classList.contains("title")) enterBrowserFs();
if (whoPicked) newLife(); else openPicker();
}
function beginGame(){
if (!holdAdmitted && !holdSkipped && (/[?&]hold=1(&|$)/.test(location.search) || window.__tffServerHold)){
openHold(proceedBeginGame);
return;
}
proceedBeginGame();
}
for (const b of document.querySelectorAll("#pickModal .who")){
b.addEventListener("click", () => setPick(b.dataset.who));
b.addEventListener("dblclick", pickGo);
}
$("pickGo").addEventListener("click", pickGo);
if ($("pickClose")) $("pickClose").addEventListener("click", () => closePicker());
const PERSONAS = window.TFF_CONTENT.PERSONAS || {bg: {}, pe: {}, combos: {}};
const BG_KEYS = Object.keys(PERSONAS.bg), PE_KEYS = Object.keys(PERSONAS.pe), REPS = 6;
const ROLL_AUTO = /[?&]roll=0(&|$)/.test(location.search) || ssGet("tff_roll_auto") === "1";
const BOOTH = /[?&]booth=1(&|$)/.test(location.search) || ssGet("tff_booth") === "1";
if (/[?&]booth=1(&|$)/.test(location.search)) ssSet("tff_booth", "1");
let ROLL = null, rollKept = false, rollPhase = "", rollTimers = [], boothTimer = 0;
function bumpBooth(){
clearTimeout(boothTimer);
if (!BOOTH || !S || (S.mode !== "over" && !(S.mode === "idle" && S.viewing))) return;
boothTimer = setTimeout(() => {
if (!S || (S.mode !== "over" && !(S.mode === "idle" && S.viewing))) return;
$("endModal").hidden = true; $("seeOv").hidden = true; $("pickModal").hidden = true; $("rollModal").hidden = true;
modalOpen(false);
played = false; whoPicked = false; ssSet("tff_picked", ""); rollKept = false; ROLL = null;
sampleTower(); setFs(fsOn); $("startOv").hidden = false; setPauseUI(); updateHUD(); renderLedger(); drawPreviews(true); iabTip(); needDraw = true;
}, 90000);
}
const rnd = n => Math.floor(Math.random() * n);
const personaKey = p => p ? p.bg + "+" + p.pe : "";
function personaOf(p){
if (!p || !PERSONAS.bg[p.bg] || !PERSONAS.pe[p.pe]) return null;
const b = PERSONAS.bg[p.bg], e = PERSONAS.pe[p.pe], c = PERSONAS.combos[personaKey(p)] || {en: "", zh: "", line: ["", ""]};
return {key: personaKey(p), zh: b.zh + e.zh, en: b.en + " × " + e.en, b, e, c};
}
const rollDice = () => ({bg: BG_KEYS[rnd(BG_KEYS.length)], pe: PE_KEYS[rnd(PE_KEYS.length)]});
function newLife(){
clearTimeout(boothTimer);
if (S) S.replay = null;
if (BOOTH && !whoPicked){ openPicker(); return; }
if (!BG_KEYS.length || !PE_KEYS.length){ ROLL = null; startGame(); return; }
if (ROLL_AUTO){ if (!rollKept) ROLL = rollDice(); startGame(); return; }
openRoll();
}
function buildStrip(strip, keys, set){
if (strip.children.length) return;
for (let r = 0; r < REPS; r++) for (const k of keys){
const t = document.createElement("div"); t.className = "rtile"; t.dataset.k = k;
const cv = document.createElement("canvas"); cv.width = cv.height = 104;
const tx = document.createElement("span"), b = document.createElement("b"), sm = document.createElement("small");
b.lang = "zh-HK"; b.textContent = set[k].zh; sm.textContent = set[k].en; tx.append(b, sm); t.append(cv, tx); strip.appendChild(t);
}
}
const tileH = strip => strip.firstElementChild ? strip.firstElementChild.getBoundingClientRect().height : 84;
function placeStrip(strip, keys, k, cycle){ strip.style.transition = "none"; strip.style.transform = "translateY(" + (-(cycle * keys.length + keys.indexOf(k)) * tileH(strip)) + "px)"; }
let rollFromEnd = false, rollReturnTo = null;
function openRoll(){
const ae = document.activeElement;
const savedReturn = (ae && ae !== document.body && !ae.closest("#pickModal, #infoModal, #rollModal")) ? ae : pickReturnTo;
const wasEnd = !$("endModal").hidden || pickFromEnd;
closeInfo(true); closePicker(true); pickFromEnd = false; pickReturnTo = null; hideIabTip();
rollFromEnd = wasEnd; $("endModal").hidden = true;
rollReturnTo = !rollFromEnd ? savedReturn : null;
buildStrip($("stripBg"), BG_KEYS, PERSONAS.bg); buildStrip($("stripPe"), PE_KEYS, PERSONAS.pe);
const m = $("rollModal"); m.hidden = false; modalOpen(true); A.sfx("uiOpen");
paintAvatar($("rollAvatar"), {who: WHO, stage: 0, tier: 1, hand: null, mood: "happy", drops: 0, boost: false});
for (const cv of m.querySelectorAll(".rtile canvas")){ const k = cv.parentNode.dataset.k, it = (PERSONAS.bg[k] || PERSONAS.pe[k] || {}).item, def = DEFS.find(d => d.id === it); if (def) previewInto(cv, def); }
fitLine($("rollTitle"));
const cs = $("chalSame"), cp = CHAL && CHAL.p ? CHAL.p.split("+") : null, cP = cp && personaOf({ bg: cp[0], pe: cp[1] });
if (rollKept && ROLL){
if (cs) cs.hidden = true;
showRollResult(true);
} else {
rollPhase = "ready"; $("rollRes").hidden = true; $("rollSay").textContent = "";
for (const id of ["reelBg", "reelPe"]) $(id).classList.remove("landed");
placeStrip($("stripBg"), BG_KEYS, BG_KEYS[rnd(BG_KEYS.length)], 0); placeStrip($("stripPe"), PE_KEYS, PE_KEYS[rnd(PE_KEYS.length)], 0);
label($("rollGo"), ["Roll", "抽！"]);
if (cs){
cs.hidden = !cP;
if (cP){
label(cs, ["Same life: " + cP.en, "同命挑戰：" + cP.zh]);
cs.onclick = () => { ROLL = { bg: cp[0], pe: cp[1] }; rollKept = true; A.sfx("uiSelect"); cs.hidden = true; showRollResult(true); };
}
}
}
$("rollGo").focus({preventScroll: true});
}
function closeRoll(quiet){
if ($("rollModal").hidden) return;
if (rollPhase === "spinning") rollFinish(true);
if (!quiet) A.sfx("uiClose"); $("rollModal").hidden = true; modalOpen(false);
if ((rollFromEnd || ($("startOv").hidden && $("seeOv").hidden)) && !quiet && S && S.mode === "over"){
$("endModal").hidden = false; modalOpen(true);
$(S.step === 4 ? "againBtn" : STEP_FOCUS[S.step - 1]).focus({preventScroll: true});
} else if (!quiet){
if (!played) iabTip();
const fb = !$("startOv").hidden ? $("startBtn") : !$("seeOv").hidden ? $("againBtn2") : null;
const tgt = (rollReturnTo && rollReturnTo.isConnected && !rollReturnTo.closest("[hidden]") && rollReturnTo.getClientRects().length) ? rollReturnTo : fb;
if (tgt) tgt.focus({preventScroll: true});
else if (S && S.mode === "playing") $("board").focus({preventScroll: true});
}
rollFromEnd = false; rollReturnTo = null;
}
function spinReel(reel, strip, keys, k, ms){
const target = (REPS - 1) * keys.length + keys.indexOf(k), y = -target * tileH(strip);
if (!ms){ placeStrip(strip, keys, k, REPS - 1); return; }
void strip.offsetWidth; strip.style.transition = "transform " + ms + "ms cubic-bezier(.12,.72,.18,1)"; strip.style.transform = "translateY(" + y + "px)";
let t = 0; for (let gap = 45; t < ms - 120; gap = Math.min(220, gap * 1.09)){ t += gap; rollTimers.push(setTimeout(() => { A.sfx("reel"); haptic(6, 0.08, 0.15); }, t)); }
rollTimers.push(setTimeout(() => { reel.classList.add("landed"); A.sfx("reelStop"); haptic(22, 0.45, 0.5); }, ms));
}
function rollSpin(){
if (rollPhase !== "ready") return;
if ($("chalSame")) $("chalSame").hidden = true;
rollPhase = "spinning"; ROLL = rollDice(); rollKept = true;
label($("rollGo"), ["Rolling…", "抽緊…"]);
const ms = reduceMotion ? 0 : 1;
spinReel($("reelBg"), $("stripBg"), BG_KEYS, ROLL.bg, ms && 1300); spinReel($("reelPe"), $("stripPe"), PE_KEYS, ROLL.pe, ms && 2100);
rollTimers.push(setTimeout(() => showRollResult(), ms ? 2350 : 0));
}
function rollFinish(quiet){
rollTimers.forEach(clearTimeout); rollTimers = [];
placeStrip($("stripBg"), BG_KEYS, ROLL.bg, REPS - 1); placeStrip($("stripPe"), PE_KEYS, ROLL.pe, REPS - 1);
$("reelBg").classList.add("landed"); $("reelPe").classList.add("landed");
if (quiet){ rollPhase = "done"; return; }
A.sfx("reelStop"); showRollResult();
}
function showRollResult(again){
rollTimers.forEach(clearTimeout); rollTimers = [];
rollPhase = "done"; const P = personaOf(ROLL); if (!P) return;
if (again){ placeStrip($("stripBg"), BG_KEYS, ROLL.bg, REPS - 1); placeStrip($("stripPe"), PE_KEYS, ROLL.pe, REPS - 1); $("reelBg").classList.add("landed"); $("reelPe").classList.add("landed"); }
$("rrName").textContent = P.zh; $("rrName").lang = "zh-HK";
const nz = document.createElement("span"); nz.className = "zh"; nz.lang = "zh-HK"; nz.textContent = P.c.zh; $("rrNick").replaceChildren(P.c.en || P.en, nz);
bi($("rrLine"), P.c.line[0], P.c.line[1]);
$("rollRes").hidden = false;
$("rollSay").textContent = "You rolled " + P.en + ": " + P.zh + ", " + (P.c.en || "") + ". " + P.c.line[0];
label($("rollGo"), ["Start my life", "開始人生"]);
if (!again){ A.sfx("rival"); haptic([20, 35, 35], 0.5, 0.6); }
$("rollGo").focus({preventScroll: true});
}
$("rollGo").addEventListener("click", () => {
if (rollPhase === "ready") rollSpin(); else if (rollPhase === "spinning") rollFinish(); else if (rollPhase === "done") startGame();
});
$("rollModal").addEventListener("click", e => { if (e.target === e.currentTarget) closeRoll(); });
if ($("rollClose")) $("rollClose").addEventListener("click", () => closeRoll());
function showWho(){
const P = personaOf(S && S.persona), w = $("hudWho"); w.hidden = !P; if (P){ w.textContent = P.zh; w.title = P.en; }
}
$("pickModal").addEventListener("click", e => { if (e.target === e.currentTarget) closePicker(); });
const INFO = {lb: {t: ["Leaderboard", "排行榜"], q: [".lbx"]}, how: {t: ["How to play", "玩法"], q: [".howto", ".falls"]}, priv: {t: ["Privacy", "私隱聲明"], q: [".foot"]}, wear: {t: ["Crab wardrobe", "蟹仔衣櫃"], q: [".wardrobe"]}};
let infoOpen = null;
function openInfo(kind, from){
closeInfo(true); hideIabTip();
const k = INFO[kind], body = $("infoBody");
infoOpen = {from, moved: k.q.map(sel => { const el = document.querySelector(sel), mark = document.createComment(sel); el.before(mark); body.appendChild(el); return [el, mark]; })};
const t = $("infoTitle"), z = document.createElement("span"); z.className = "zh"; z.lang = "zh-HK"; z.textContent = k.t[1]; t.replaceChildren(k.t[0], z);
$("infoModal").hidden = false; modalOpen(true); body.scrollTop = 0; $("infoClose").focus({preventScroll: true}); A.sfx("uiOpen");
if (kind === "lb") refreshLB(true);
if (kind === "wear") renderWardrobe();
}
function wearHat(id){
HAT = id && hatOwned(id) ? id : null; lsSet("tff_hat", HAT);
buildLayers(false, "crab"); drawCrabs(); talk.mood = null; needDraw = true;
}
function renderWardrobe(){
const box = $("wardrobeList"); if (!box) return; box.replaceChildren();
const have = earnedTitles(), n = HATS.filter(h => have.includes(h.title)).length;
bi($("wardrobeNote"), n + " of " + HATS.length + " unlocked. Earn a title to unlock its look.", "已解鎖 " + n + "／" + HATS.length + "。攞到稱號，就解鎖佢嘅造型。");
[{id: null, en: "None", zh: "冇"}, ...HATS].forEach(h => {
const own = !h.id || have.includes(h.title), t = h.title && TITLES.find(x => x.id === h.title);
const b = document.createElement("button"); b.type = "button"; b.className = "wtile" + (own ? "" : " locked"); b.setAttribute("role", "radio");
const checked = (h.id || null) === HAT;
b.setAttribute("aria-checked", String(checked)); b.tabIndex = checked ? 0 : -1; if (!own) b.setAttribute("aria-disabled", "true");
const cv = document.createElement("canvas"); cv.width = 160; cv.height = 128; cv.setAttribute("aria-hidden", "true");
const g = cv.getContext("2d"); g.setTransform(2, 0, 0, 2, 80, 64); crabArt(g, "happy", h.id);
const nm = document.createElement("span"); nm.className = "wn"; const z = document.createElement("small"); z.lang = "zh-HK"; z.textContent = h.zh; nm.append(h.en, z);
b.append(cv, nm);
if (!own && t){ const w = document.createElement("span"); w.className = "ww"; const wz = document.createElement("small"); wz.lang = "zh-HK"; wz.textContent = "攞到「" + t.zh + "」解鎖"; w.append("Locked: earn " + t.en, wz); b.appendChild(w); }
b.addEventListener("click", () => {
if (!own){ A.sfx("uiNope"); return; }
wearHat(h.id); A.sfx("uiSelect"); [...box.children].forEach(x => { const on = x === b; x.setAttribute("aria-checked", String(on)); x.tabIndex = on ? 0 : -1; });
});
box.appendChild(b);
});
if (box.children.length && ![...box.children].some(x => x.tabIndex === 0)) box.children[0].tabIndex = 0;
if (!box.dataset.kb){
box.dataset.kb = "1";
box.addEventListener("keydown", e => {
const tiles = [...box.children]; if (!tiles.length) return;
const i = tiles.indexOf(document.activeElement); if (i < 0) return;
let ni = -1;
if (e.key === "ArrowRight") ni = (i + 1) % tiles.length;
else if (e.key === "ArrowLeft") ni = (i - 1 + tiles.length) % tiles.length;
else if (e.key === "ArrowDown") ni = i + 3 < tiles.length ? i + 3 : i % 3;
else if (e.key === "ArrowUp") ni = i - 3 >= 0 ? i - 3 : i + Math.floor((tiles.length - 1 - i) / 3) * 3;
else if (e.key === "Home") ni = 0;
else if (e.key === "End") ni = tiles.length - 1;
if (ni < 0) return;
e.preventDefault();
tiles.forEach((x, k) => { x.tabIndex = k === ni ? 0 : -1; });
const next = tiles[ni];
next.focus({preventScroll: true});
if (!next.classList.contains("locked")) next.click();
});
box.addEventListener("focusout", e => {
if (box.contains(e.relatedTarget)) return;
const tiles = [...box.children];
const chk = tiles.find(x => x.getAttribute("aria-checked") === "true") || tiles[0];
tiles.forEach(x => { x.tabIndex = x === chk ? 0 : -1; });
});
}
const wt = $("wardrobeTitles");
if (wt){
wt.replaceChildren();
const pb = BOOTH ? 0 : (+lsGet("tff_pb", 0) || 0), gamesN = BOOTH ? 0 : localScores().length;
const st = document.createElement("p"); st.className = "wt-stats";
bi(st,
"Titles collected: " + have.length + "/" + TITLES.length + (pb > 0 ? " · Best: " + fmt(pb) : "") + (gamesN ? " · Games on device: " + gamesN : ""),
"稱號圖鑑：" + have.length + "／" + TITLES.length + (pb > 0 ? " · 最高紀錄：" + fmt(pb) : "") + (gamesN ? " · 本機局數：" + gamesN : ""));
const grid = document.createElement("div"); grid.className = "wt-grid";
TITLES.forEach(t => {
const got = have.includes(t.id), d = document.createElement("div");
d.className = "wt-chip " + (got ? "on" : "locked");
const b = document.createElement("b"); b.textContent = got ? t.zh + " · " + t.en : "？？？ · Locked 未解鎖";
const sm = document.createElement("small"); sm.textContent = got ? t.line[1] : t.line[0];
d.append(b, sm); grid.appendChild(d);
});
wt.append(st, grid);
}
}
function closeInfo(quiet){
if (!infoOpen) return;
if (!quiet) A.sfx("uiClose");
for (const [el, mark] of infoOpen.moved) mark.replaceWith(el);
const from = infoOpen.from; infoOpen = null;
$("infoModal").hidden = true; modalOpen(false);
if (!quiet && !played) iabTip();
if (from && !from.closest("[hidden]")) from.focus({preventScroll: true});
}
$("infoClose").addEventListener("click", () => closeInfo());
$("infoModal").addEventListener("click", e => { if (e.target === e.currentTarget) closeInfo(); });
for (const [id, kind] of [["tsLb", "lb"], ["tsHow", "how"], ["tsPriv", "priv"], ["tsWear", "wear"]]) $(id).addEventListener("click", e => openInfo(kind, e.currentTarget));
$("tsStory").addEventListener("click", () => { if (window.TFF_INTRO && TFF_INTRO.replay){ A.sfx("uiOpen"); TFF_INTRO.replay(); } });
$("tsMute").addEventListener("click", toggleMute);
$("tsFs").addEventListener("click", () => toggleFs(false));
const igPageAt = performance.now();
let igReturnTo = null, igWasEnd = false, igBackArmed = false, outboundAt = 0;
function igEligible(){
if (BOOTH || lsGet("tff_ig_done", false) || ssGet("tff_ig_seen") === "1") return false;
if (window.TFF_INTRO && TFF_INTRO.on()) return false;
if (S && S.dragX != null) return false;
for (const id of ["igModal", "holdModal", "cardModal", "offerModal", "reviveModal", "pickModal", "rollModal", "infoModal"]){
const el = $(id); if (el && !el.hidden) return false;
}
return true;
}
function openIg(auto){
const m = $("igModal"); if (!m || !m.hidden) return;
if (auto && !igEligible()) return;
hideIabTip();
if (S && S.mode === "playing") togglePause();
igReturnTo = document.activeElement;
igWasEnd = !$("endModal").hidden;
if (igWasEnd) $("endModal").inert = true;
ssSet("tff_ig_seen", "1");
m.hidden = false; modalOpen(true); A.sfx("uiOpen");
($("igGo") || $("igClose")).focus({preventScroll: true});
}
function closeIg(quiet){
const m = $("igModal"); if (!m || m.hidden) return;
if (!quiet) A.sfx("uiClose");
m.hidden = true;
if (igWasEnd) $("endModal").inert = false;
const anyModal = ["holdModal", "cardModal", "offerModal", "reviveModal", "pickModal", "rollModal", "infoModal", "endModal"].some(id => { const el = $(id); return el && !el.hidden; });
if (!anyModal) modalOpen(false);
if (!quiet && !played && (!S || S.mode === "idle") && !anyModal) iabTip();
const back = igReturnTo; igReturnTo = null; igWasEnd = false;
if (back && back.focus && !back.closest("[hidden]")) back.focus({preventScroll: true});
}
for (const id of ["tsIg", "endIgBtn"]){ const b = $(id); if (b) b.addEventListener("click", () => openIg(false)); }
if ($("igClose")) $("igClose").addEventListener("click", () => closeIg());
if ($("igDismiss")) $("igDismiss").addEventListener("click", () => closeIg());
if ($("igModal")) $("igModal").addEventListener("click", e => { if (e.target === e.currentTarget) closeIg(); });
function markIgFollowed(){ outboundAt = performance.now(); lsSet("tff_ig_done", true); ssSet("tff_ig_seen", "1"); A.sfx("uiDone"); }
for (const id of ["igGo", "igQrLink"]){ const el = $(id); if (el) el.addEventListener("click", () => { markIgFollowed(); closeIg(true); }); }
if ($("footIg")) $("footIg").addEventListener("click", markIgFollowed);
document.addEventListener("click", e => {
const a = e.target && e.target.closest && e.target.closest("#threadsBtn, #iabOpen, #igGo, #igQrLink, #footIg, a[target='_blank'], a[href^='mailto:']");
if (a) outboundAt = performance.now();
}, {capture: true, passive: true});
function maybeExitIg(e){
if (!e || typeof e.clientY !== "number" || e.clientY > 12) return;
if (e.pointerType && e.pointerType !== "mouse") return;
if (e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) return;
if (typeof matchMedia === "function" && !matchMedia("(hover: hover)").matches) return;
if (S && S.mode === "playing" && e.clientX > window.innerWidth - 180) return;
if (performance.now() - igPageAt < 1500) return;
if (igEligible()) openIg(true);
}
document.addEventListener("mouseout", e => { if (!e.relatedTarget && !e.toElement) maybeExitIg(e); });
document.addEventListener("mouseleave", maybeExitIg);
function armExitBack(){
if (igBackArmed || BOOTH || lsGet("tff_ig_done", false) || ssGet("tff_ig_seen") === "1") return;
igBackArmed = true;
try { if (!(history.state && history.state.tffExit)) history.pushState({tffExit: 1}, ""); } catch(e){}
}
for (const ev of ["pointerdown", "keydown"]) document.addEventListener(ev, armExitBack, {capture: true, once: true, passive: true});
window.addEventListener("popstate", () => {
if (!$("igModal").hidden){ closeIg(true); return; }
if (igEligible()) openIg(true);
});
const gameOn = () => !!(S && (S.mode === "playing" || S.mode === "card" || S.mode === "offer"));
const clipIO = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { e.target.__vis = e.isIntersecting; clipSync(e.target); }), {rootMargin: "80px"}) : null;
const clipVids = [];
function clipAdd(box){
const v = box.querySelector("video"), b = document.createElement("button"); b.type = "button"; b.className = "clip-pp";
b.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path class="i-pause" d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/><path class="i-play" d="M8 5.5v13l10.5-6.5z"/></svg>';
b.addEventListener("click", () => { v.__want = !box.dataset.playing; v.__vis = true; clipSync(v, true); });
v.addEventListener("click", () => b.click());
for (const ev of ["play", "playing", "pause", "ended"]) v.addEventListener(ev, () => clipUI(v));
box.appendChild(b); v.__want = !reduceMotion; clipVids.push(v); clipUI(v);
if (clipIO) clipIO.observe(v);
}
function clipUI(v){
const box = v.parentNode, on = !v.paused && !v.ended, b = box.querySelector(".clip-pp");
if (on) box.dataset.playing = "1"; else delete box.dataset.playing;
b.setAttribute("aria-label", (on ? "Pause the clip: " : "Play the clip: ") + box.dataset.label);
}
function clipLoad(v){
if (!v.__load) v.__load = fetch(v.dataset.src).then(r => { if (!r.ok) throw new Error(r.status); return r.blob(); })
.then(b => { v.src = URL.createObjectURL(b); }).catch(() => { v.parentNode.classList.add("still"); });
return v.__load;
}
function clipSync(v, asked){
if (!(v.__want && (v.__vis || !clipIO) && (asked || !gameOn()))){ if (!v.paused) v.pause(); return; }
clipLoad(v).then(() => { if (v.src && v.__want && v.paused) v.play().catch(e => {
if (e && e.name === "NotAllowedError"){ v.__want = false; clipUI(v); } }); });
}
const clipsSync = () => clipVids.forEach(v => clipSync(v));
document.querySelectorAll(".howto .clip").forEach(clipAdd);
const GP = {on: 0, prev: {}, held: {}, repAt: 0};
function padState(gp){
const b = i => { const x = gp.buttons[i]; return !!x && (x.pressed || x.value > 0.5); };
const ax = gp.axes[0] || 0, ay = gp.axes[1] || 0;
return {a: b(0), b: b(1), x: b(2), y: b(3), lb: b(4), rb: b(5), rt: b(7), sel: b(8), start: b(9),
up: b(12) || ay < -0.6, down: b(13) || ay > 0.6, left: b(14) || ax < -0.5, right: b(15) || ax > 0.5};
}
const padTargets = box => [...box.querySelectorAll("button, input, a[href]")].filter(e => !e.disabled && !e.closest("[hidden]") && e.getClientRects().length && getComputedStyle(e).visibility !== "hidden");
function padMove(box, dir){
const els = padTargets(box); if (!els.length) return;
const i = els.indexOf(document.activeElement);
els[i < 0 ? (dir > 0 ? 0 : els.length - 1) : clamp(i + dir, 0, els.length - 1)].focus();
}
function padPress(box){ const el = document.activeElement; if (el && padTargets(box).includes(el)){ el.click(); return true; } return false; }
function pollPad(now){
let gp = null; for (const p of (navigator.getGamepads ? navigator.getGamepads() : [])) if (p && p.connected){ gp = p; break; }
const cur = gp ? padState(gp) : {}, was = GP.prev; GP.prev = cur;
const hit = k => cur[k] && !was[k];
if (window.TFF_INTRO && TFF_INTRO.on()){ if (hit("a")) TFF_INTRO.next(); else if (hit("b") || hit("start")) TFF_INTRO.skip(); return; }
for (const k of ["left", "right", "soft"]){
const on = k === "soft" ? !!(cur.down || cur.rt) : !!cur[k];
if (on === !!GP.held[k]) continue;
GP.held[k] = on; const v = on && !!S && S.mode === "playing";
if (k === "soft") softHeld = v; else if (k === "left" || k === "right") setKey(k, v); else keys[k] = v;
if (v) S.dragX = null;
}
if (!gp || !S) return;
if (Object.keys(cur).some(hit)){ root.classList.add("padnav"); A.unlock(); }
if (hit("sel")) toggleMute();
const dir = cur.up || cur.left ? -1 : cur.down || cur.right ? 1 : 0;
let nav = 0;
if (dir && (hit("up") || hit("left") || hit("down") || hit("right"))){ nav = dir; GP.repAt = now + 400; }
else if (dir && now >= GP.repAt){ nav = dir; GP.repAt = now + 150; }
if (!$("igModal").hidden){
if (nav) padMove($("igModal"), nav);
if (hit("a")) padPress($("igModal"));
if (hit("b") || hit("start")) closeIg();
return;
}
if (!$("endModal").hidden){
if (nav) padMove($("endModal"), nav);
if (hit("a") && performance.now() - endShownAt > 900) padPress($("endModal"));
if (hit("b")) $("closeEnd").click();
else if (hit("start")){ if (S.step < 4){ if (!$("stNext").disabled) $("stNext").click(); } else newLife(); }
return;
}
if (!$("rollModal").hidden){
if (hit("a") || hit("start")) $("rollGo").click(); else if (hit("b")) closeRoll();
return;
}
if (!$("pickModal").hidden){
if (hit("left") || hit("right")) setPick(pickSel === "jack" ? "jackie" : "jack");
else if (hit("a") || hit("start")) pickGo(); else if (hit("b")) closePicker();
return;
}
if (!$("infoModal").hidden){
if (hit("b") || hit("start")) closeInfo();
else { if (nav) padMove($("infoModal"), nav); if (hit("a")) padPress($("infoModal")); }
return;
}
if (S.revive){
const r = S.revive;
if (r.phase === "ask"){ if (hit("x")) reviveAnswer(true); else if (hit("y") || hit("b")) reviveAnswer(false); else { if (nav) padMove($("reviveModal"), nav); if (hit("a")) padPress($("reviveModal")); } }
else if (r.phase === "lesson" && (hit("a") || hit("b") || hit("start"))) $("rvGo").click();
return;
}
if (S.mode === "offer" && S.offer){
if (hit("x")) offerAnswer(true); else if (hit("y") || hit("b")) offerAnswer($("offerNo").hidden);
else { if (nav) padMove($("offerModal"), nav); if (hit("a") && !padPress($("offerModal")) && $("offerNo").hidden) offerAnswer(true); }
return;
}
if (S.mode === "card" && S.card){
if (!S.card.flip){
if (S.card.t < 450) return;
if (hit("x") || hit("y")) choose(S.card.order[hit("x") ? 0 : 1] === "w" ? "wise" : "risky");
else { if (nav) padMove($("cardChoices"), nav); if (hit("a")) padPress($("cardChoices")); }
} else if ((hit("a") || hit("b") || hit("start")) && S.card.t - S.card.flipAt >= 450) closeCard();
else if (nav && S.card.powers){ const n = S.card.powers.length; pickPower((S.card.powers.indexOf(S.card.power) + (nav < 0 ? n - 1 : 1)) % n); }
return;
}
if (S.mode === "paused"){
if (hit("start") || hit("b")) togglePause();
else { if (nav) padMove($("pauseOv"), nav); if (hit("a") && !padPress($("pauseOv"))) togglePause(); }
return;
}
if (S.mode === "idle"){
const box = !$("seeOv").hidden ? $("seeOv") : !$("startOv").hidden ? $("startOv") : null;
if (!box) return;
const go = box.id === "startOv" ? beginGame : S.flowDone ? newLife : openResults;
if (hit("start")) go();
else if (box.id === "seeOv" && hit("b")) openResults();
else { if (nav) padMove(box, nav); if (hit("a") && !padPress(box)) go(); }
return;
}
if (S.mode !== "playing") return;
if (hit("start")){ togglePause(); return; }
if (hit("a")) act("drop");
if (hit("b") || hit("y") || hit("up")) act("rotate");
if (hit("x")) act("hold");
if (hit("lb")) act("rotL");
if (hit("rb")) act("rotR");
}
window.addEventListener("gamepadconnected", () => {
GP.on++; root.classList.add("gamepad");
if (S && S.mode !== "over") stamp("Controller ready", "手掣已連接", "info");
});
window.addEventListener("gamepaddisconnected", () => {
GP.on = Math.max(0, GP.on - 1);
if (!GP.on){ root.classList.remove("gamepad"); pollPad(performance.now()); }
});
document.addEventListener("pointerdown", () => { root.classList.remove("padnav"); if (BOOTH) bumpBooth(); }, true);
const cv = $("board");
let drag = null;
function worldX(clientX, r){ r = r || cv.getBoundingClientRect(); return (clientX - r.left) / r.width * (W + 2 * XV) - XV; }
const evT = e => e.timeStamp || performance.now();
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
else if (drag.axis === "y" && dy > 28 && !drag.soft){ drag.soft = true; softHeld = true; haptic(10, 0.15, 0.25); }
});
const endDrag = e => {
if (!drag) return;
const now = evT(e), dt = now - drag.t, dy = e.clientY - drag.y, dx = e.clientX - drag.x;
let p0 = drag.pts[drag.pts.length - 1];
for (const q of drag.pts) if (now - q[0] <= 200){ p0 = q; break; }
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
const OWN_SOUND = "#startBtn,#pickGo,#rollGo,#chalSame,#againBtn,#againBtn2,#replayBtn,#stNext,#stBack,#tsLb,#tsHow,#tsPriv,#tsWear,#tsStory,#tsIg,#endIgBtn,#igClose,#igGo,#igQrLink,#igDismiss,.wtile,#infoClose,.who,#tsMute,#muteBtn,#fsBtn,#tsFs,#fsStartBtn,#pauseBtn,#resumeBtn,#resultsBtn,#closeEnd,.choice,.qopt,.pad button,#hudHoldBtn,label.habit,.ctime label";
document.addEventListener("click", e => { const t = e.target.closest && e.target.closest(".btn,.tab,.iconbtn,.ov-chip,.hbtn,button,[role=tab]"); if (t && !t.disabled && t.getAttribute("aria-disabled") !== "true"){ haptic(8, 0.12, 0.2); if (!t.closest(OWN_SOUND)) A.sfx("click"); } });
document.addEventListener("pointerdown", e => { const t = e.target.closest && e.target.closest("button:disabled,[aria-disabled=true]"); if (t){ A.unlock(); A.sfx("uiNope"); haptic([22, 30, 30], 0.45, 0.35); } });
let audioOn = false;
function soundHint(){ const h = $("tsSound"); if (h) h.hidden = audioOn || A.muted(); const z = $("tsSilent"); if (z) z.hidden = !IOS; }
function hideIabTip(){
const tip = $("iabTip");
if (tip && !tip.hidden){ tip.hidden = true; root.style.setProperty("--iab-h", "0px"); root.classList.remove("iab-tight"); lastFit = ""; }
}
const iabRO = typeof ResizeObserver === "function" ? new ResizeObserver(() => {
const tip = $("iabTip");
if (tip && !tip.hidden && tip.offsetHeight) root.style.setProperty("--iab-h", tip.offsetHeight + "px");
}) : null;
if (iabRO && $("iabTip")) iabRO.observe($("iabTip"));
function iabTip(){
const tip = $("iabTip"); if (!IAB || ssGet("tff_iab_x")){ tip.hidden = true; root.style.setProperty("--iab-h", "0px"); root.classList.remove("iab-tight"); return; }
const isChalPath = location.pathname.replace(/\/+$/, "") === "/c";
const hasChalQuery = /^-?\d{1,7}$/.test(new URLSearchParams(location.search).get("s") || "");
const q = (isChalPath || CHAL || hasChalQuery) ? location.search : "";
const url = location.origin + location.pathname + q, name = IAB === "app" ? "this app" : IAB, zh = IAB === "app" ? "呢個App" : IAB;
let how = null;
if (IAB === "LINE") how = () => { location.href = url + (q ? "&" : "?") + "openExternalBrowser=1"; };
else if (ANDROID && IAB !== "WeChat") how = () => { location.href = "intent://" + location.host + location.pathname + q + "#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=" + encodeURIComponent(url) + ";end"; };
const t = $("iabText"), dest = IAB === "LINE" ? ["your phone's browser", "手機瀏覽器"] : ["Chrome", "Chrome"];
if (how) bi(t, "Best in " + dest[0] + ": full screen, sound, and saving your result.", "用" + dest[1] + "玩最好：全螢幕、有聲，仲儲到結果圖。");
else bi(t, "Best in your browser: tap ··· (top right), then open in browser.", "用瀏覽器玩最好：撳右上角「···」，揀用瀏覽器開啟。");
tip.setAttribute("aria-label", "You're in " + name + "'s browser 你而家用緊" + zh + "嘅瀏覽器");
const ob = $("iabOpen"); ob.hidden = !how; if (how){ label(ob, IAB === "LINE" ? ["Open in browser", "用瀏覽器開"] : ["Open in Chrome", "用Chrome開"]); ob.onclick = how; }
tip.hidden = false; root.classList.remove("iab-tight");
requestAnimationFrame(() => { if (!tip.hidden && tip.offsetHeight) root.style.setProperty("--iab-h", tip.offsetHeight + "px"); });
}
$("iabClose").addEventListener("click", () => { ssSet("tff_iab_x", "1"); A.sfx("uiClose"); iabTip(); lastFit = ""; resize(); });
$("iabCopy").addEventListener("click", async () => {
const isChalPath = location.pathname.replace(/\/+$/, "") === "/c";
const hasChalQuery = /^-?\d{1,7}$/.test(new URLSearchParams(location.search).get("s") || "");
const chalQuery = CHAL ? (() => { const qp = new URLSearchParams(); qp.set("s", String(CHAL.s)); if (CHAL.n) qp.set("n", CHAL.n); if (CHAL.v) qp.set("v", CHAL.v.id); if (CHAL.p) qp.set("p", CHAL.p); if (CHAL.sil && CHAL.sil.length <= 240) qp.set("sil", CHAL.sil); return "/c?" + qp.toString(); })() : "/";
const u = location.origin + ((isChalPath || hasChalQuery) ? "/c" + location.search : chalQuery), st = $("iabStatus"); let done = false;
try { await navigator.clipboard.writeText(u); done = true; } catch(e){
const t = document.createElement("textarea"); t.value = u; t.setAttribute("readonly", ""); t.style.cssText = "position:fixed;top:0;opacity:0";
document.body.appendChild(t); t.select(); try { done = document.execCommand("copy"); } catch(_){} t.remove(); }
st.textContent = done ? "Link copied. Paste it in your browser. 已複製，貼去瀏覽器開啟。" : u;
if (done) A.sfx("uiDone");
});
function firstSound(){
A.unlock();
if (audioOn) return; audioOn = true; soundHint();
if ((!S || S.mode !== "playing") && !(window.TFF_INTRO && TFF_INTRO.on())) menuMusic();
}
function menuMusic(){ A.stage(0); A.mode("menu"); A.start(); }
for (const ev of ["pointerdown", "pointerup", "touchend", "keydown", "click"]) document.addEventListener(ev, firstSound, {capture: true, passive: true});
soundHint(); iabTip();
window.TFF_ART = {sound: firstSound, music: () => { if (audioOn && (!S || S.mode !== "playing")) menuMusic(); if (!played && IAB && !ssGet("tff_iab_x")) setTimeout(() => { if (!played && (!S || S.mode === "idle")) iabTip(); }, 650); }, fs: () => { if (fsOn) enterBrowserFs(); }};
setTimeout(resize, 800);
$("muteBtn").addEventListener("click", toggleMute);
$("fsBtn").addEventListener("click", () => toggleFs());
$("fsStartBtn").addEventListener("click", () => { toggleFs(true); beginGame(); });
$("pauseBtn").addEventListener("click", () => { if (S && (S.mode === "playing" || S.mode === "paused")) togglePause(); });
$("hudHoldBtn").addEventListener("click", () => act("hold"));
$("startBtn").addEventListener("click", beginGame);
$("resumeBtn").addEventListener("click", togglePause);
$("cardContinue").addEventListener("click", e => { if (!(S.card && tapTooSoon(e, S.card.flipAt))) closeCard(); });
$("againBtn").addEventListener("click", newLife);
let endScroll = 0;
function openResults(){
if (!S || S.mode !== "idle" || !S.viewing) return;
S.replay = null;
$("seeOv").hidden = true; S.viewing = false; S.mode = "over"; A.sfx("uiOpen");
$("endModal").hidden = false; $("stScroll").scrollTop = endScroll;
endShownAt = performance.now(); modalOpen(true); setPauseUI();
$(S.step === 4 ? "closeEnd" : STEP_FOCUS[S.step - 1]).focus({preventScroll:true});
}
$("resultsBtn").addEventListener("click", openResults);
$("replayBtn").addEventListener("click", () => {
if (!S || !(S.viewing && S.mode === "idle")) return;
const bodies = engine.world.bodies.filter(b => b.tff && b !== S.active).sort((a, b) => (a.tff.at || 0) - (b.tff.at || 0));
S.replay = { t0: performance.now(), dur: Math.min(3200, Math.max(1200, bodies.length * 90)), bodies };
S.camTop = camBase();
A.sfx("uiSelect"); needDraw = true;
});
$("closeEnd").addEventListener("click", () => { A.sfx("uiClose"); endScroll = $("stScroll").scrollTop; $("endModal").hidden = true; modalOpen(false); S.viewing = true; S.mode = "idle"; S.queue = []; S.hold = null; drawPreviews(true); $("seeOv").hidden = false; setPauseUI(); $("againBtn2").hidden = !S.flowDone; ($("againBtn2").hidden ? $("resultsBtn") : $("againBtn2")).focus(); if (S.overKey) quip(S.overKey, 3); });
$("againBtn2").addEventListener("click", newLife);
cv.tabIndex = 0;
const ctx = cv.getContext("2d", {alpha: false});
let SC = 1, DPR = 1, XV = 0, YT = 0, YB = 0;
const SPR = new Map(), SPR_MAX = 160, QA = Math.PI / 4;
let usedText = false;
const kText = K.text; K.text = function(){ usedText = true; return kText.apply(this, arguments); };
const kOK = s => !!s && Math.abs(s.k - SC * DPR) <= 0.015 * SC * DPR;
function spriteFor(def, q){
q = q || 0;
const k = SC * DPR, key = def.id + "|" + q; let s = SPR.get(key);
if (kOK(s)){ SPR.delete(key); SPR.set(key, s); return s; }
const ang = q * QA, probe = def.make(0, 0), pad = 10;
if (ang) Body.rotate(probe, ang, {x: 0, y: 0});
const bb = probe.bounds;
const x0 = bb.min.x - pad, y0 = bb.min.y - pad, w = bb.max.x - bb.min.x + pad*2, h = bb.max.y - bb.min.y + pad*2;
const img = document.createElement("canvas"); img.width = Math.max(2, Math.ceil(w * k)); img.height = Math.max(2, Math.ceil(h * k));
const g = img.getContext("2d"); g.setTransform(k, 0, 0, k, -x0 * k, -y0 * k); g.rotate(ang);
usedText = false;
try { def.draw(g); } catch(e){ g.fillStyle = "#FF5FA2"; g.fillRect(bb.min.x, bb.min.y, bb.max.x - bb.min.x, bb.max.y - bb.min.y); }
if (lowGfx){
s = {img, sh: img, x0, y0, w, h, m: 0, k, q, text: usedText}; SPR.set(key, s);
} else {
const m = 8, sh = document.createElement("canvas"); sh.width = img.width + Math.ceil(m*2*k); sh.height = img.height + Math.ceil(m*2*k);
const sg = sh.getContext("2d"); const FAR = 10000;
sg.shadowColor = "rgba(70,30,60,0.32)"; sg.shadowBlur = 5 * k; sg.shadowOffsetX = FAR; sg.drawImage(img, m*k - FAR, m*k);
s = {img, sh, x0, y0, w, h, m, k, q, text: usedText}; SPR.set(key, s);
}
if (SPR.size > SPR_MAX) SPR.delete(SPR.keys().next().value);
return s;
}
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
if (want) wantSprite(def, q, 0); else needDraw = true;
return near;
}
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
let drawN = 0;
function bodyAnchor(b){ const p = drawPose(b), eo = b.tff.eo, c = Math.cos(p.a), s = Math.sin(p.a); return [p.x + eo.x*c - eo.y*s, p.y + eo.x*s + eo.y*c, p.a]; }
function drawBody(c, b, shadow){
const [ax, ay, ang] = bodyAnchor(b);
const q = qOf(ang);
if (b.tff.q !== q){ b.tff.q = q; b.tff.qAt = drawN; }
const s = spriteNear(b.tff.def, q, drawN - b.tff.qAt >= 6), rest = ang - s.q * QA;
let sx = 1, sy = 1;
if (!reduceMotion && b.tff.sqAt && S.steps - b.tff.sqAt < 10){
const u = clamp((S.steps + ALPHA - b.tff.sqAt) / 10, 0, 1), wv = Math.sin(u * Math.PI * 1.5) * (1 - u) * (b.tff.sqAmt || 0.07);
sx = 1 + wv; sy = 1 - wv;
}
if (!reduceMotion && b.tff.repPop > 0 && b.tff.repPop < 1){
const u = b.tff.repPop, sc = u < 0.6 ? 0.72 + (u / 0.6) * 0.33 : 1.05 - ((u - 0.6) / 0.4) * 0.05;
sx *= sc; sy *= sc;
}
c.save();
if (shadow){ c.translate(ax + 4, ay + 6); c.rotate(rest); if (sx !== 1 || sy !== 1) c.scale(sx, sy); c.drawImage(s.sh, s.x0 - s.m, s.y0 - s.m, s.w + s.m*2, s.h + s.m*2); }
else { c.translate(ax, ay); c.rotate(rest); if (sx !== 1 || sy !== 1) c.scale(sx, sy); c.drawImage(s.img, s.x0, s.y0, s.w, s.h); }
c.restore();
}
const L = {};
let layerVer = 0;
let seaDeep = "#2F86E0";
function sampleSea(){
try { const c = L.sea, n = 24, d = c.getContext("2d").getImageData(Math.floor(c.width / 2) - n / 2, c.height - 6, n, 3).data; let r = 0, g = 0, b = 0;
for (let i = 0; i < d.length; i += 4){ r += d[i]; g += d[i + 1]; b += d[i + 2]; } const m = d.length / 4; seaDeep = "rgb(" + Math.round(r / m) + "," + Math.round(g / m) + "," + Math.round(b / m) + ")"; } catch(e){}
}
function layer(w, h, fn){ const k = SC * DPR; const c = document.createElement("canvas"); c.width = Math.ceil(w * k); c.height = Math.ceil(h * k); const g = c.getContext("2d"); g.setTransform(k, 0, 0, k, 0, 0); fn(g); return c; }
const earnedTitles = () => { const t = lsGet("tff_titles", []); return Array.isArray(t) ? t : []; };
const hatOwned = id => { const h = HATS.find(x => x.id === id); return !!h && earnedTitles().includes(h.title); };
let HAT = (() => { const h = lsGet("tff_hat", null); return hatOwned(h) ? h : null; })();
const EYES = {photo: {idle: [-7.5, 8, -15, -20.5], happy: [-6, 9, -10, -15.5], worried: [-7.5, 7.5, -10.5, -16]}, clay: [-7, 7, -15, -20]};
function hatArt(g, hat, mood, photo){
const e = photo ? EYES.photo[mood === "happy" ? "happy" : mood === "worried" || mood === "cover" ? "worried" : "idle"] : EYES.clay;
const cx = (e[0] + e[1]) / 2, top = e[3] + 3;
const o = {depth: 1.2, soft: 1.6, sheen: false, rim: 0.5};
g.save(); g.translate(cx, top);
if (hat !== "goggles") g.scale(1.25, 1.25);
if (hat === "goggles"){
g.translate(-cx, -top);
K.blob(g, K.tube([[e[0], e[2]], [e[1], e[2]]], 2.4), "black", o);
for (const x of [e[0], e[1]]){ g.fillStyle = "rgba(127,211,255,.45)"; g.beginPath(); g.arc(x, e[2], 5.6, 0, 7); g.fill(); g.strokeStyle = "#20C1B3"; g.lineWidth = 2; g.stroke();
g.strokeStyle = "rgba(255,255,255,.8)"; g.lineWidth = 1; g.beginPath(); g.arc(x, e[2], 3.8, 3.6, 4.6); g.stroke(); }
K.blob(g, K.tube([[e[1] + 6, e[2] + 3], [e[1] + 8.5, e[2] - 4], [e[1] + 8.5, e[2] - 11]], 2.2), "orange", o);
} else if (hat === "sleuth"){
K.blob(g, K.slab(0, -0.6, 25, 3.4, 1.6, {lump: 0.3, seed: 3}), "#7A5332", o);
K.blob(g, K.blobPoly([[-8.5, -1.5], [-7.5, -7.5], [-3, -9], [3, -9], [7.5, -7.5], [8.5, -1.5]], {lump: 0.3, seed: 4}), "#8C6239", o);
K.press(g, K.slab(0, -2.6, 17, 2, 0.8, {lump: 0.1}), "#3B2A1C", {sheen: false, texture: 0});
} else if (hat === "bag"){
for (const sx of [-1, 1]) K.blob(g, K.tube([[sx * 5.5, -6], [sx * 4.5, -9.2], [sx * 1.5, -9.2], [sx * 0.8, -6]], 1.1), "#B01457", {depth: 0.5, soft: 0.8, sheen: false, rim: 0.3});
K.blob(g, K.blobPoly([[-8, 0.5], [-7, -7], [7, -7], [8, 0.5]], {lump: 0.25, seed: 6}), "pink", o);
K.press(g, K.ball(0, -3.2, 2.2, 2.2, {lump: 0.05}), "white", {sheen: false, texture: 0});
} else if (hat === "nightcap"){
K.blob(g, K.blobPoly([[-8.5, -1], [-5, -7.5], [3, -9.2], [12, -6.5], [14, -3], [8.5, -1]], {lump: 0.3, seed: 8}), "blue", o);
for (const x of [-3.5, 2, 7.5]) K.groove(g, K.poly([[x - 1.5, -1.5], [x + 1.5, -8]], false), 1.1);
K.blob(g, K.slab(0, -0.4, 19.5, 3.4, 1.7, {lump: 0.4, seed: 9}), "white", o);
K.blob(g, K.ball(14.5, -1.6, 2.7, 2.7, {lump: 0.3, seed: 2}), "white", o);
} else if (hat === "halo"){
g.translate(0, -5.5);
g.strokeStyle = "rgba(255,200,61,.35)"; g.lineWidth = 5; g.beginPath(); g.ellipse(0, 0, 10.5, 3, 0, 0, 7); g.stroke();
g.strokeStyle = "#FFC83D"; g.lineWidth = 2.6; g.beginPath(); g.ellipse(0, 0, 10.5, 3, 0, 0, 7); g.stroke();
g.strokeStyle = "#FFF1A8"; g.lineWidth = 1; g.beginPath(); g.ellipse(0, -0.5, 10.5, 3, 0, 3.5, 5.9); g.stroke();
} else if (hat === "straw"){
K.blob(g, K.ball(0, -0.4, 16, 2.9, {lump: 0.3, seed: 5}), "#E8C56A", o);
K.blob(g, K.blobPoly([[-7.5, -1.2], [-6.5, -7.2], [0, -8.6], [6.5, -7.2], [7.5, -1.2]], {lump: 0.3, seed: 6}), "#F0D282", o);
K.press(g, K.slab(0, -2.5, 14.6, 2, 0.8, {lump: 0.1}), "red", {sheen: false, texture: 0});
} else if (hat === "tophat"){
K.blob(g, K.slab(0, -0.4, 20, 2.8, 1.3, {lump: 0.2, seed: 3}), "black", o);
K.blob(g, K.slab(0, -5.3, 12, 8.4, 1.6, {lump: 0.2, seed: 4}), "black", o);
K.press(g, K.slab(0, -2.6, 12, 2, 0.6, {lump: 0.05}), "yellow", {sheen: false, texture: 0});
} else if (hat === "hardhat"){
K.blob(g, K.blobPoly([[-10, -0.5], [-9, -5.5], [-5, -8.6], [0, -9.4], [5, -8.6], [9, -5.5], [10, -0.5]], {lump: 0.2, seed: 7}), "yellow", {depth: 1.4, soft: 1.8, sheen: {x: -3.5, y: -6.5, rx: 3, ry: 1.2}});
K.blob(g, K.slab(1.5, -0.2, 25, 2.6, 1.3, {lump: 0.2, seed: 8}), "#F2B51C", o);
K.groove(g, K.poly([[0, -9], [0, -1.6]], false), 1.2);
}
g.restore();
}
function crabArt(g, mood, hat = HAT){
const photo = crabBody(g, mood);
if (hat) try { hatArt(g, hat, mood, photo); } catch(e){}
}
function crabBody(g, mood){
if (AV && AV.crab && AV.crab(g, mood)) return true;
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
function buildLayers(soft, only){
const make = {};
make.sky = () => layer(W + 2 * XV, 260, g => {
g.save(); g.translate(XV, 0);
if (duskStep >= 0.5){
const sr = K.rng(53);
for (let i = 0; i < (duskStep >= 1 ? 14 : 6); i++){
const sx = 24 + sr() * (W - 48), sy = 18 + sr() * 120;
if (Math.hypot(sx - 110, sy - 95) < 52) continue;
twinkle(g, sx, sy, 2.2 + sr() * 2.2, duskStep >= 1 ? 0.85 : 0.45);
}
if (duskStep >= 1){
g.save(); g.translate(W - 64, 52); g.rotate(-0.35);
g.fillStyle = "#FFF1A8"; g.beginPath(); g.moveTo(0, -14); g.quadraticCurveTo(-20, 0, 0, 14); g.quadraticCurveTo(-6, 0, 0, -14); g.fill();
g.restore();
}
}
for (let i = 0; i < 8; i++){ const a = i * Math.PI / 4 + 0.2, r0 = 36, r1 = 47;
K.blob(g, K.tube([[110 + r0*Math.cos(a), 95 + r0*Math.sin(a)], [110 + r1*Math.cos(a), 95 + r1*Math.sin(a)]], 6), "orange", {depth:1.4, soft:2, sheen:false, rim:0.5}); }
K.blob(g, K.ball(110, 95, 30, 30, {lump:0.6, seed:3}), "#FFE45C", {sheen:{x:100, y:83, rx:9, ry:5}});
K.groove(g, K.poly([[99, 100], [110, 107], [121, 100]], false), 1.4);
K.press(g, K.ball(100, 90, 2.4, 3, {lump:0.05}), "black", {sheen:false, texture:0}); K.press(g, K.ball(120, 90, 2.4, 3, {lump:0.05}), "black", {sheen:false, texture:0});
K.press(g, K.ball(94, 99, 3.5, 2.2, {lump:0.05}), "#FF9DBF", {sheen:false, texture:0}); K.press(g, K.ball(126, 99, 3.5, 2.2, {lump:0.05}), "#FF9DBF", {sheen:false, texture:0});
const cloud = (cx, cy, s, seed) => K.blob(g, K.merge(K.ball(cx, cy, 24*s, 14*s, {lump:0.6, seed}), K.ball(cx + 22*s, cy - 6*s, 18*s, 15*s, {lump:0.6, seed:seed + 1}), K.ball(cx - 22*s, cy + 2*s, 15*s, 11*s, {lump:0.6, seed:seed + 2})), "white", {depth:3, soft:5});
cloud(300, 78, 1, 11); cloud(215, 180, 0.72, 21); cloud(92, 228, 0.55, 31);
if (XV){
const r = K.rng(91); let seed = 41;
for (let x = -60; x > -XV + 30; x -= 150 + r() * 90) cloud(x, 40 + r() * 190, 0.5 + r() * 0.45, seed += 3);
for (let x = W + 70; x < W + XV - 30; x += 150 + r() * 90) cloud(x, 40 + r() * 190, 0.5 + r() * 0.45, seed += 3);
}
g.restore();
duskTint(g, W + 2 * XV, 260, "255,160,175", 0.3);
});
make.city = () => layer(W + 60 + 2 * XV, 260, g => {
g.save(); g.translate(XV, 0);
const hill = [[-20, 170], [40, 140], [95, 128], [130, 104], [158, 96], [172, 110], [200, 122], [260, 140], [330, 150], [400, 136], [W + 80, 150]];
if (XV) hill.unshift([-20 - XV, 160], [-20 - XV * 0.65, 132], [-20 - XV * 0.3, 152]), hill.push([W + 80 + XV * 0.35, 126], [W + 80 + XV * 0.7, 148], [W + 80 + XV, 138]);
hill.unshift([hill[0][0], 260]); hill.push([hill[hill.length - 1][0], 260]);
K.blob(g, K.blobPoly(hill, {lump:1.2, seed:4, step:14}), "#3FAE6A", {depth:5, soft:9, sheen:false});
K.blob(g, K.slab(154, 93, 10, 6, 1.5, {lump:0.2, seed:19}), "#D9C3B0", {depth:1, soft:1.5, sheen:false});
K.blob(g, K.blobPoly([[144, 90], [164, 90], [168, 84], [140, 84]], {lump:0.25, seed:23}), "orange", {depth:1.2, soft:1.8, sheen:false});
const r = K.rng(77); const cols = ["pink", "teal", "purple", "orange", "blue", "green", "red", "yellow"];
const tower = (x, w, h, c, i, r) => {
const top = 260 - h;
if (i === 7){
K.blob(g, K.blobPoly([[x, 260], [x, top + 70], [x + w*0.5, top + 30], [x + w*0.5, top - 25], [x + w, top + 5], [x + w, 260]], {lump:0.6, seed:i}), "blue", {depth:4, soft:6});
for (let yy = top + 30; yy < 250; yy += 34){ K.groove(g, K.poly([[x + 2, yy + 34], [x + w - 2, yy]], false), 1.1); K.groove(g, K.poly([[x + 2, yy], [x + w - 2, yy + 34]], false), 1.1); }
} else if (i % 5 === 3){
K.blob(g, K.blobPoly([[x, 260], [x, top + 40], [x + w*0.2, top + 40], [x + w*0.2, top + 10], [x + w*0.5, top - 20], [x + w*0.8, top + 10], [x + w*0.8, top + 40], [x + w, top + 40], [x + w, 260]], {lump:0.8, seed:i}), c, {depth:4, soft:6});
} else K.blob(g, K.slab(x + w/2, top + h/2 + 10, w, h + 20, 6, {lump:0.9, seed:i * 13}), c, {depth:4, soft:6});
for (let wy = top + 14; wy < 245; wy += 15) for (let wx = x + 7; wx < x + w - 9; wx += 10)
if (r() > 0.55) K.press(g, K.rrc(wx + 2, wy, 5, 7, 1.5), r() > 0.25 ? "#FFF3A6" : "cream", {sheen:false, texture:0, depth:0.6, soft:0.8, rim:0.3});
tops.push({x, w, top});
if (i !== 7 && i % 5 !== 3) street(x, w, top, i);
};
const tops = [], signs = [], NEON = ["茶餐廳", "押", "涼茶", "金行", "麻雀", "跌打"], TUBE = ["#FF4F8B", "#3BE0C8", "#FFD84D", "#FF7B35", "#8B6CF2", "#4CC36A"];
const street = (x, w, top, i) => {
const q = K.rng(300 + i * 7), h = 260 - top;
for (let n = 0; n < 3; n++){ const ay = top + 22 + Math.floor(q() * Math.max(1, (h - 50) / 15)) * 15, ax = x + 6 + Math.floor(q() * Math.max(1, (w - 18) / 10)) * 10;
if (ay < 248) K.press(g, K.rrc(ax + 4, ay + 8, 8, 5, 1), "#C9CCD6", {sheen:false, texture:0, depth:0.6, soft:0.8, rim:0.3}); }
const kind = q();
if (kind < 0.42 && h > 70){
const t = NEON[Math.floor(q() * NEON.length)], tube = TUBE[Math.floor(q() * TUBE.length)], bh = 12 + t.length * 11, by = top + 18 + q() * Math.max(0, h - bh - 60);
const sx = x + w - 6, sign = {x: sx, y: by, w: 15, h: bh, t, tube};
K.blob(g, K.slab(sx + 7.5, by + bh / 2, 15, bh, 2, {lump: 0.2, seed: i}), "#2E2838", {depth: 1.2, soft: 1.6, sheen: false});
neonText(g, sign, false); signs.push(sign);
} else if (kind < 0.8 && h > 60){
for (let n = 0; n < 2; n++){
const py = top + 26 + Math.floor(q() * Math.max(1, (h - 60) / 15)) * 15, left = q() < 0.5, x0 = left ? x + 3 : x + w - 3, dir = left ? -1 : 1;
if (py > 245) continue;
K.blob(g, K.tube([[x0, py], [x0 + dir * 22, py - 2]], 1.6), "#D4B060", {depth: 0.5, soft: 0.7, sheen: false, rim: 0.3});
const cols = ["pink", "sky", "yellow", "white", "teal", "orange"];
for (let k = 0; k < 3; k++){ const cx = x0 + dir * (5 + k * 7.5), col = cols[Math.floor(q() * cols.length)];
if (q() < 0.5) K.press(g, K.blobPoly([[cx - 3.6, py], [cx + 3.6, py], [cx + 3, py + 9], [cx - 3, py + 9]], {lump: 0.1}), col, {sheen: false, texture: 0, depth: 0.5, soft: 0.7, rim: 0.3});
else K.press(g, K.rrc(cx - 3, py + 0.5, 6, 8, 1), col, {sheen: false, texture: 0, depth: 0.5, soft: 0.7, rim: 0.3}); }
}
}
};
let x = -10, i = 0;
while (x < W + 60 + XV){
const w = 34 + r() * 30, h = (i === 6 ? 175 : 50 + r() * 100), c = cols[i % cols.length]; i++;
tower(x, w, h, c, i, r);
x += w + 4 + r() * 6;
}
if (XV){ const r2 = K.rng(78); let x2 = -14, i2 = 20;
while (x2 > -XV - 50){ const w = 34 + r2() * 30, h = 50 + r2() * 100, c = cols[i2 % cols.length]; i2++; x2 -= w + 4 + r2() * 6; tower(x2, w, h, c, i2, r2); } }
g.restore();
g.save(); g.globalCompositeOperation = "source-atop"; g.fillStyle = "rgba(" + mixHex("#A0DCFF", "#FFB38A", duskStep).slice(4, -1) + ",0.42)"; g.fillRect(0, 0, W + 60 + 2 * XV, 260); g.restore();
if (duskStep > 0){ g.save(); g.translate(XV, 0); for (const sg of signs) neonText(g, sg, true); g.restore(); }
if (duskStep >= 1){
const tall = tops.slice().sort((a, b) => a.top - b.top).slice(0, 4), BEAM = ["255,95,162", "59,224,200", "139,108,242", "255,216,77"];
g.save(); g.translate(XV, 0); g.globalCompositeOperation = "lighter";
tall.forEach((t, n) => { const cx = t.x + t.w / 2, a = (n % 2 ? 1 : -1) * (0.18 + n * 0.08), len = t.top + 30, bx = cx + Math.sin(a) * len, by = t.top - Math.cos(a) * len;
const gr = g.createLinearGradient(cx, t.top, bx, by); gr.addColorStop(0, "rgba(" + BEAM[n] + ",.32)"); gr.addColorStop(1, "rgba(" + BEAM[n] + ",0)");
g.fillStyle = gr; g.beginPath(); g.moveTo(cx - 1.5, t.top); g.lineTo(bx - 7, by); g.lineTo(bx + 7, by); g.lineTo(cx + 1.5, t.top); g.closePath(); g.fill(); });
g.restore();
}
});
make.sea = () => layer(W + 120 + 2 * XV, 220, g => {
const sw = W + 120 + 2 * XV, sea = K.slab(sw/2, 120, sw + 40, 240, 0, {lump:0.6, seed:5});
K.blob(g, sea, "blue", {depth:6, soft:10, sheen:false, texture:0.18});
for (let row = 0; row < 5; row++){
const pts = []; for (let x = -10; x <= sw + 10; x += 12) pts.push([x, 10 + row*26 + Math.sin(x / 22 + row) * 3.5]);
K.blob(g, K.tube(pts, 6 - row*0.6), row % 2 ? "#5DB3F5" : "sky", {depth:1.6, soft:2.4, sheen:false, rim:0.5, texture:0.06});
}
duskTint(g, sw, 220, "255,150,120", 0.24);
});
make.float = () => layer(10, 10, g => K.blob(g, K.ball(5, 5, 4.2, 4.2, {lump: 0.2, seed: 3}), "red", {depth: 1, soft: 1.4, sheen: {x: 3.6, y: 3.4, rx: 1.4, ry: 0.8}}));
make.buoy = () => layer(24, 24, g => {
const ring = a0 => { const pts = []; for (let i = 0; i <= 10; i++){ const a = a0 + i / 10 * Math.PI / 2; pts.push([12 + Math.cos(a) * 8, 12 + Math.sin(a) * 8]); } return pts; };
for (let q = 0; q < 4; q++) K.blob(g, K.tube(ring(q * Math.PI / 2 + 0.06), 6), q % 2 ? "white" : "red", {depth: 1, soft: 1.4, sheen: false, rim: 0.5});
});
make.plat = () => layer(PW + 40, 200, g => {
K.blob(g, K.slab(PW/2 + 20, 120, 74, 190, 8, {lump:0.8, seed:2}), "#3A3F9E", {depth:5, soft:8});
for (let y = 50; y < 200; y += 22) K.groove(g, K.poly([[PW/2 - 14, y], [PW/2 + 54, y]], false), 1.2);
K.blob(g, K.slab(PW/2 + 20, 15, PW, 30, 7, {lump:1.0, seed:6}), "yellow", {sheen:{x:70, y:7, rx:30, ry:3}});
K.text(g, "儲蓄基礎", PW/2 - 52, 16.5, {size:13, font:"zh", color:"#25317A", weight:700});
K.text(g, "SAVINGS FOUNDATION", PW/2 + 52, 16.5, {size:11.5, font:"display", color:"#25317A", weight:900});
});
make.shed = () => { const o = {}; for (const e of [20, 40]) o[e] = layer(shedW(e), SHED_H, g => drawShed(g, e)); return o; };
make.wing = () => { const o = {}; for (const e of [20, 40]) o[e] = layer(e + 34, 40, g => K.blob(g, K.slab((e + 34) / 2, 15, e + 14, 30, 7, {lump:1.0, seed:9}), "yellow", {sheen:false})); return o; };
make.ferry = () => layer(104, 56, g => {
K.blob(g, K.blobPoly([[6, 38], [98, 38], [92, 52], [12, 52]], {lump: 0.3, seed: 3}), "#1E7A4C", {depth: 2, soft: 3, sheen: false});
K.press(g, K.slab(52, 41, 88, 4, 1, {lump: 0.1}), "white", {sheen: false, texture: 0});
K.blob(g, K.slab(52, 31, 80, 12, 3, {lump: 0.3, seed: 4}), "white", {depth: 1.2, soft: 1.8, sheen: false});
K.blob(g, K.slab(52, 19, 70, 12, 3, {lump: 0.3, seed: 5}), "white", {depth: 1.2, soft: 1.8, sheen: false});
K.blob(g, K.slab(52, 11, 76, 5, 2, {lump: 0.2, seed: 6}), "#2E8B57", {depth: 1, soft: 1.4, sheen: false});
for (const [y, x0, x1] of [[31, 18, 86], [19, 22, 82]]) for (let x = x0; x <= x1; x += 8) K.press(g, K.rrc(x - 2.2, y - 3, 4.4, 5, 1), "#7FC4F0", {sheen: false, texture: 0, depth: 0.5, soft: 0.7, rim: 0.3});
K.press(g, K.ball(52, 6, 2.2, 2.2, {lump: 0.05}), "red", {sheen: false, texture: 0});
});
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
if (soft && L[name]) addJob("layer:" + name, 0.5, () => { L[name] = make[name](); layerVer++; if (name === "sea") sampleSea(); });
else { L[name] = make[name](); layerVer++; if (name === "sea") sampleSea(); }
}
}
function drawCrabs(){
const dpr = Math.min(3, window.devicePixelRatio || 1);
for (const [id, m] of [["crabLogo", "happy"], ["crabSay", "idle"], ["crabSplash", "happy"]]){
const c = $(id), r = c.getBoundingClientRect();
if (r.width){ const w = Math.max(40, Math.round(r.width * dpr)); if (c.width !== w){ c.width = w; c.height = Math.round(w * r.height / r.width); } }
const g = c.getContext("2d"); g.setTransform(1,0,0,1,0,0); g.clearRect(0, 0, c.width, c.height);
const s = c.width / 80; g.setTransform(s, 0, 0, s, 40*s, 32*s); crabArt(g, m);
}
}
const FS_SIDE = 250, FS_ASPECT = 1.9;
const PREVIEWS = ["nextCv", "holdCv", "next2Cv", "hudNext", "hudHold"];
let lastFit = "";
function fitLine(el){
if (!el || !el.isConnected || el.closest("[hidden]")) return;
el.style.fontSize = "";
const tn = [...el.childNodes].filter(n => n.nodeType === 3 && n.data.trim()); if (!tn.length) return;
const cs = getComputedStyle(el), avail = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight); if (avail <= 0) return;
const probe = document.createElement("span"); let need = 0;
probe.style.cssText = "position:absolute;left:0;top:0;visibility:hidden;white-space:nowrap;font:inherit;letter-spacing:inherit;text-transform:inherit";
el.appendChild(probe);
for (const n of tn){ probe.textContent = n.data.trim(); need = Math.max(need, probe.offsetWidth); }
probe.remove();
if (need > avail - 1){ const fs = parseFloat(cs.fontSize); el.style.fontSize = Math.max(+el.dataset.fit || 14, Math.floor(fs * (avail - 3) / need * 4) / 4) + "px"; }
}
const fitAll = () => document.querySelectorAll("[data-fit]").forEach(fitLine);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);
function resize(){
const narrow = matchMedia("(max-width: 899px)").matches, touch = matchMedia("(pointer: coarse)").matches;
const wide = fsOn && !narrow, title = fsOn && root.classList.contains("title"), immersive = fsOn && !title;
if (root.classList.contains("wide") !== wide) root.classList.toggle("wide", wide);
const padOn = getComputedStyle($("pad")).display !== "none";
const header = document.querySelector(".mast").offsetHeight;
const rawVh = (narrow || touch) && document.documentElement.clientHeight ? Math.min(document.documentElement.clientHeight, window.innerHeight || Infinity) : window.innerHeight;
const vh = (window.visualViewport && (narrow || touch)) ? Math.min(rawVh, Math.round(window.visualViewport.height)) : rawVh;
let availH, availW, viewW = 0;
if (title){ availH = vh; availW = viewW = document.documentElement.clientWidth; }
else if (narrow){
const cs = el => getComputedStyle(el), side = parseFloat(cs(document.querySelector(".set")).paddingLeft) + parseFloat(cs($("boardWrap")).paddingLeft);
availW = document.documentElement.clientWidth - 2 * side; availH = vh - header - 70 - (padOn ? 100 : 0) - 40;
if (fsOn){ availW = document.documentElement.clientWidth; viewW = availW; availH = vh - (document.querySelector(".set").offsetHeight - $("boardWrap").offsetHeight); } }
else if (wide){
const cs = getComputedStyle(document.querySelector(".center")), ss = getComputedStyle(document.querySelector(".set")), wrap = $("boardWrap");
availH = vh - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - (padOn ? $("pad").offsetHeight + (parseFloat(cs.rowGap) || 0) : 0);
viewW = document.documentElement.clientWidth - parseFloat(ss.paddingLeft) - parseFloat(ss.paddingRight);
availW = viewW - 2 * FS_SIDE; }
else { availW = Math.max(260, window.innerWidth - 620); availH = vh - header - 70 - (padOn ? 100 : 0); }
const fit = [narrow, wide, title, padOn, availW, availH, vh, window.devicePixelRatio, lowGfx].join();
if (fit === lastFit) return;
lastFit = fit;
const prevSC = SC, prevDPR = DPR, prevXV = XV;
SC = Math.max(0.3, Math.min(availH / H, availW / W, wide ? 3 : 1.25));
if (title) SC = Math.min(3, availH / H);
XV = immersive ? Math.max(0, Math.ceil((viewW / SC - W) / 2))
: title ? Math.max(0, Math.floor((Math.min(viewW / SC, H * FS_ASPECT) - W) / 2)) : 0;
const vw = W + 2 * XV, wrap = $("boardWrap");
if (immersive){
wrap.style.width = Math.round(vw * SC) + "px"; wrap.style.height = Math.round(H * SC) + "px";
const r = wrap.getBoundingClientRect();
YT = Math.max(0, r.top / SC); YB = Math.max(0, (vh - r.bottom) / SC);
cv.style.top = -Math.round(YT * SC) + "px";
} else { YT = YB = 0; wrap.style.width = wrap.style.height = ""; cv.style.top = ""; }
DPR = Math.min(lowGfx ? 2 : 3, window.devicePixelRatio || 1);
const cw = Math.round(vw * SC * DPR), ch = Math.round((H + YT + YB) * SC * DPR);
if (cv.width !== cw || cv.height !== ch){ cv.width = cw; cv.height = ch; needDraw = true; }
cv.style.width = Math.round(vw * SC) + "px"; cv.style.height = Math.round((H + YT + YB) * SC) + "px";
$("pad").style.maxWidth = Math.max(300, W * SC + 20) + "px";
if (!L.sky) buildLayers();
else if (Math.abs(SC - prevSC) > 0.015 || DPR !== prevDPR || XV !== prevXV) buildLayers(XV === prevXV);
root.style.setProperty("--board-zoom", wide ? Math.min(1.5, Math.max(1, SC / 1.2)).toFixed(3) : "1");
root.style.setProperty("--xv", immersive ? Math.round(XV * SC) + "px" : "0px");
root.style.setProperty("--fs-inset", wide && !immersive ? Math.max(0, Math.round((viewW - vw * SC) / 2)) + "px" : "0px");
root.style.setProperty("--tl-x", title ? Math.round((viewW - Math.round(vw * SC)) / 2) + "px" : "0px");
drawCrabs();
const gw = document.querySelector('.col.right').getBoundingClientRect().right - document.querySelector('.col.left').getBoundingClientRect().left; $("info").style.maxWidth = narrow || title ? "" : Math.round(gw) + "px"; document.querySelector(".mast").style.maxWidth = narrow || title ? "" : Math.round(gw) + "px";
for (const id of PREVIEWS) $(id)._sz = null;
drawPreviews(true);
avKeys.clear(); lookKey = "";
fitAll();
}
let rzT = 0; const onResize = () => { clearTimeout(rzT); rzT = setTimeout(() => { resize(); fitAll(); }, 220); };
window.addEventListener("resize", onResize);
if (window.visualViewport) window.visualViewport.addEventListener("resize", () => { if (!document.activeElement || !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) onResize(); });
const camBase = () => WATER_Y - H + (root.classList.contains("title") ? 120 : YB > 40 ? 26 : 70);
const camTarget = () => Math.min(camBase(), -S.height - 330);
let skyDusk = -1, skyFill = null, duskStep = 0;
const SKY = [["#3FB4FF", "#8EDBFF", "#C8F0FF"],
["#6A8CF0", "#C9A8F0", "#FFD6E0"],
["#8C6FE0", "#FF9E7A", "#FFD59A"]];
const duskTint = (g, w, h, rgb, a) => { if (!duskStep) return; g.save(); g.globalCompositeOperation = "source-atop"; g.fillStyle = "rgba(" + rgb + "," + (a * duskStep).toFixed(3) + ")"; g.fillRect(0, 0, w, h); g.restore(); };
const PAD = 32;
const BACK = {c: null, key: "", next: ""};
const PILE = {s: null, b: null, set: new Set(), list: [], k: 0, at: -99, top: 0, h: 0, w0: 0, w1: 0, x0: 0, x1: 0};
function paintSky(g, k, skyY, cityY){
const vw = W + 2 * XV;
g.setTransform(k, 0, 0, k, 0, YT * k); g.fillStyle = skyFill; g.fillRect(0, -YT, vw + 1, H + YT + YB + 1);
g.drawImage(L.sky, 0, skyY, vw, 260); g.drawImage(L.city, -30, cityY, vw + 60, 260);
}
function backdrop(c, k, skyY, cityY){
const key = [cv.width, cv.height, YT, skyDusk, layerVer, Math.round(skyY * k * 2), Math.round(cityY * k * 2)].join();
c.setTransform(1, 0, 0, 1, 0, 0);
if (key === BACK.key){ c.drawImage(BACK.c, 0, 0); return; }
if (key !== BACK.next){ BACK.next = key; paintSky(c, k, skyY, cityY); return; }
if (!BACK.c) BACK.c = document.createElement("canvas");
if (BACK.c.width !== cv.width || BACK.c.height !== cv.height){ BACK.c.width = cv.width; BACK.c.height = cv.height; }
paintSky(BACK.c.getContext("2d", {alpha: false}), k, skyY, cityY); BACK.key = key;
c.drawImage(BACK.c, 0, 0);
}
function picturesOK(b){
for (const m of membersOf(b)){
if (!kOK(SPR.get(m.tff.def.id + "|" + qOf(poseOf(m).a)))) return false;
if (m.tff.marks) for (const mk of m.tff.marks) if (S.steps - mk.born < 52) return false;
}
return true;
}
const settled = b => (b.isSleeping || b.tff.sn >= 24) && (!b.tff.sqAt || S.steps - b.tff.sqAt >= 10) && picturesOK(b);
function stale(b){
for (const m of membersOf(b)){ const s = SPR.get(m.tff.def.id + "|" + qOf(poseOf(m).a)); if (s && !kOK(s)) return true; }
return false;
}
const inWindow = b => b.bounds.max.y + PAD >= PILE.w0 && b.bounds.min.y - PAD <= PILE.w1;
const near = (a, b) => a.bounds.min.x - PAD <= b.bounds.max.x + PAD && b.bounds.min.x - PAD <= a.bounds.max.x + PAD &&
a.bounds.min.y - PAD <= b.bounds.max.y + PAD && b.bounds.min.y - PAD <= a.bounds.max.y + PAD;
const moving = o => !(o.isSleeping || o.tff.sn >= 24);
const isLive = o => o.tff && !PILE.set.has(o) && (o.tff.held || moving(o));
function blocked(b){
for (const o of engine.world.bodies){ if (o === b) return false; if (isLive(o) && near(o, b)) return true; }
return false;
}
function keepOrder(bands){
const rank = new Map(engine.world.bodies.map((b, i) => [b, i])), todo = engine.world.bodies.filter(isLive);
while (todo.length){
const o = todo.pop(), r = rank.get(o);
for (const b of PILE.list) if (PILE.set.has(b) && rank.get(b) > r && near(o, b)){ PILE.set.delete(b); b.tff.held = true; bands.push([b.tff.cb.y0 - PAD, b.tff.cb.y1 + PAD]); todo.push(b); }
}
}
function join(b){
PILE.set.add(b); b.tff.held = false; b.tff.cp = {x: b.position.x, y: b.position.y, a: b.angle}; b.tff.cb = {y0: b.bounds.min.y, y1: b.bounds.max.y};
PILE.x0 = Math.min(PILE.x0, b.bounds.min.x - PAD); PILE.x1 = Math.max(PILE.x1, b.bounds.max.x + PAD);
}
function pileBand(y0, y1, T){
const k = PILE.k, top = PILE.top, p0 = Math.max(0, Math.floor((y0 - top) * k)), p1 = Math.min(PILE.h, Math.ceil((y1 - top) * k));
if (p1 <= p0) return;
const gs = PILE.s.getContext("2d"), gb = PILE.b.getContext("2d"), a0 = top + p0 / k, a1 = top + p1 / k;
for (const g of [gs, gb]){ g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, p0, g.canvas.width, p1 - p0); g.beginPath(); g.rect(0, p0, g.canvas.width, p1 - p0); g.clip(); g.setTransform(k, 0, 0, k, XV * k, -top * k); }
const keep = ALPHA, here = PILE.list.filter(b => b.tff.cb.y1 + PAD >= a0 && b.tff.cb.y0 - PAD <= a1);
ALPHA = 1;
if (!lowGfx) for (const b of here) for (const m of membersOf(b)) drawBody(gs, m, true);
for (const b of here){ for (const m of membersOf(b)) drawBody(gb, m, false); if (b.tff.members) drawMarks(gb, b, T, true); }
ALPHA = keep;
gs.restore(); gb.restore();
}
function renderPile(k, T){
const w0 = S.camTop - H / 2, w1 = S.camTop + H * 1.5;
Object.assign(PILE, {set: new Set(), list: [], k, at: drawN, w0, w1, h: 0, x0: Infinity, x1: -Infinity});
let y0 = Infinity, y1 = -Infinity;
for (const b of engine.world.bodies) if (b.tff) b.tff.held = false;
for (const b of engine.world.bodies){
if (!b.tff || b === S.active || !inWindow(b) || !settled(b)) continue;
if (blocked(b)){ b.tff.held = true; continue; }
join(b); y0 = Math.min(y0, b.bounds.min.y); y1 = Math.max(y1, b.bounds.max.y);
}
PILE.list = engine.world.bodies.filter(b => PILE.set.has(b));
if (!PILE.list.length) return;
const top = S.camTop + Math.round((Math.max(w0, y0 - PAD - 150) - S.camTop) * k) / k, w = cv.width, h = Math.ceil((y1 + PAD - top) * k);
for (const key of ["s", "b"]){
const img = PILE[key] || (PILE[key] = document.createElement("canvas"));
if (img.width !== w || img.height < h){ img.width = w; img.height = Math.ceil(h * 1.2); }
}
PILE.top = top; PILE.h = h;
pileBand(top, top + h / k, T);
}
function updatePile(k, T){
const here = new Set();
for (const b of engine.world.bodies){
if (!b.tff) continue; here.add(b);
const an = b.tff.an;
if (!an || Math.abs(b.position.x - an.x) > 0.15 || Math.abs(b.position.y - an.y) > 0.15 || Math.abs(b.angle - an.a) > 0.003){ b.tff.an = {x: b.position.x, y: b.position.y, a: b.angle}; b.tff.sn = 0; }
else b.tff.sn++;
}
if (!PILE.h || PILE.k !== k || S.camTop - YT < PILE.w0 || S.camTop + H + YB > PILE.w1){
if (drawN - PILE.at >= 8 || PILE.k !== k || PILE.h){ renderPile(k, T); } return;
}
const off = (PILE.top - S.camTop + YT) * k;
if (Math.abs(off - Math.round(off)) > 0.1 && Math.abs(camTarget() - S.camTop) < 0.05 && drawN - PILE.at >= 60){ renderPile(k, T); return; }
const bands = [];
for (const b of PILE.list){
const cp = b.tff.cp;
if (!here.has(b) || b === S.active || Math.abs(b.position.x - cp.x) > 0.25 || Math.abs(b.position.y - cp.y) > 0.25 || Math.abs(b.angle - cp.a) > 0.005 || stale(b)){
PILE.set.delete(b); bands.push([b.tff.cb.y0 - PAD, b.tff.cb.y1 + PAD]);
}
}
if (bands.length) keepOrder(bands);
if (bands.length > 8){ Object.assign(PILE, {set: new Set(), list: [], h: 0, at: drawN}); return; }
if (drawN - PILE.at >= 4) for (const b of engine.world.bodies){
if (!b.tff || b === S.active || PILE.set.has(b) || !inWindow(b) || !settled(b)) continue;
if (blocked(b)){ b.tff.held = true; continue; }
if (b.bounds.min.y - PAD < PILE.top || b.bounds.max.y + PAD > PILE.top + PILE.h / k){ renderPile(k, T); return; }
join(b); bands.push([b.bounds.min.y - PAD, b.bounds.max.y + PAD]);
}
if (!bands.length) return;
PILE.list = engine.world.bodies.filter(b => PILE.set.has(b)); PILE.at = drawN;
bands.sort((p, q) => p[0] - q[0]);
let cur = bands[0].slice();
for (const bd of bands.slice(1)){ if (bd[0] <= cur[1]) cur[1] = Math.max(cur[1], bd[1]); else { pileBand(cur[0], cur[1], T); cur = bd.slice(); } }
pileBand(cur[0], cur[1], T);
}
function blitPile(c, k, img){
if (!PILE.h) return;
const x0 = clamp(Math.floor((PILE.x0 + XV) * k), 0, img.width), x1 = clamp(Math.ceil((PILE.x1 + XV) * k), x0, img.width);
c.setTransform(1, 0, 0, 1, 0, 0);
if (x1 > x0) c.drawImage(img, x0, 0, x1 - x0, PILE.h, x0, Math.round((PILE.top - S.camTop + YT) * k), x1 - x0, PILE.h);
c.setTransform(k, 0, 0, k, XV * k, (YT - S.camTop) * k);
}
function draw(dt){
const c = ctx, k = SC * DPR, f = (dt || STEP) / STEP, T = S.steps + ALPHA; drawN++;
const rep = S && S.replay;
const rp = rep ? clamp((performance.now() - rep.t0) / rep.dur, 0, 1) : 0;
const target = rep ? camBase() + (camTarget() - camBase()) * rp : camTarget();
S.camTop += (target - S.camTop) * (1 - Math.pow(0.95, f));
let sx = 0;
if (S.shake > 0){ sx = (Math.random() - .5) * S.shake; S.shake = Math.max(0, S.shake - 0.4 * f); }
const rise = camBase() - S.camTop;
const dusk = Math.round(clamp((S.best / FLOOR - 5) / 6, 0, 1) * 200) / 200;
if (dusk !== skyDusk){
skyDusk = dusk; skyFill = c.createLinearGradient(0, 0, 0, H);
const seg = dusk < .5 ? 0 : 1, t = seg ? dusk * 2 - 1 : dusk * 2;
[0, .65, 1].forEach((at, i) => skyFill.addColorStop(at, mixHex(SKY[seg][i], SKY[seg + 1][i], t)));
const ds = Math.round(dusk * 2) / 2;
if (ds !== duskStep){ duskStep = ds; for (const n of ["sky", "city", "sea"]) buildLayers(true, n); }
}
backdrop(c, k, Math.min(40, rise * 0.05) - 10, Math.min(H - 110, (WATER_Y - S.camTop) - 250 + rise * 0.85));
const still = sx === 0 && !rep;
const bare = root.classList.contains("title");
if (still && !bare) updatePile(k, T);
c.setTransform(k, 0, 0, k, k * (sx + XV), (YT - S.camTop) * k);
if (!bare) drawRuler(c);
if (rise > 140 && !bare && !reduceMotion && !lowGfx){
c.save(); c.strokeStyle = "rgba(255,253,247,0.88)"; c.lineWidth = 2.2; c.lineCap = "round";
for (let i = 0; i < 2; i++){
const spanB = W + 80 + 2 * XV, bx = ((T * (0.38 - i * 0.1) + i * 190) % spanB) - 40 - XV;
const by = S.camTop + 72 + i * 52 + Math.sin(T / 18 + i) * 5, fY = Math.sin(T / 8 + i * 2) * 3.5;
c.beginPath(); c.moveTo(bx - 10, by + fY); c.quadraticCurveTo(bx - 4, by - 4, bx, by);
c.quadraticCurveTo(bx + 4, by - 4, bx + 10, by + fY); c.stroke();
}
c.restore();
}
if (S && S.pw > PW && L.wing && L.shed) drawWide(c);
c.drawImage(L.plat, W/2 - PW/2 - 20, 0, PW + 40, 200);
if (S.ghost && !bare && S.mode !== "idle") drawGhost(c, S.ghost);
const a = S.active, v0 = S.camTop - YT, v1 = S.camTop + H + YB, live = [];
let repKeep = null;
if (rep){
const exact = rp * rep.bodies.length, count = Math.max(1, Math.ceil(exact));
repKeep = new Set();
for (let idx = 0; idx < count && idx < rep.bodies.length; idx++){
const rb = rep.bodies[idx]; repKeep.add(rb);
if (rb.tff) rb.tff.repPop = rp >= 1 ? 1 : idx === count - 1 ? (exact - Math.floor(exact)) || 1 : 1;
}
}
if (!bare) for (const b of engine.world.bodies) if (b.tff && !(still && PILE.set.has(b)) && (!repKeep || repKeep.has(b)) && b.bounds.max.y + PAD >= v0 && b.bounds.min.y - PAD <= v1) live.push(b);
if (!lowGfx){
if (still && !bare) blitPile(c, k, PILE.s);
for (const b of live) for (const m of membersOf(b)) drawBody(c, m, true);
}
if (a && S.mode !== "over"){
const ap = lerpPose(a), x = ap.x, y0 = a.bounds.max.y + (ap.y - a.position.y) + 6, under = [], stepY = lowGfx ? 10 : 5;
let top = WATER_Y, land = WATER_Y;
for (const b of engine.world.bodies) if (b !== a && b.bounds.min.x <= x && b.bounds.max.x >= x && b.bounds.max.y >= y0){ under.push(b); top = Math.min(top, b.bounds.min.y); }
for (let y = Math.ceil(Math.max(y0, top) / stepY) * stepY; y < WATER_Y; y += stepY){
if (!Matter.Query.point(under, {x, y}).length) continue;
let lo = y - stepY, hi = y;
for (let i = 0; i < 3; i++){ const mid = (lo + hi) / 2; if (Matter.Query.point(under, {x, y: mid}).length) hi = mid; else lo = mid; }
land = Math.max(y0, hi); break;
}
const hw = clamp((a.bounds.max.x - a.bounds.min.x) * 0.42, 10, 44);
if (land - y0 > 16 && !lowGfx){
const gy = ap.y + (land - a.bounds.max.y) - 2, gs = spriteNear(a.tff.def, qOf(ap.a), false);
if (gs){
const ca = Math.cos(ap.a), sa = Math.sin(ap.a), gx = x + a.tff.eo.x * ca - a.tff.eo.y * sa, gyy = gy + a.tff.eo.x * sa + a.tff.eo.y * ca;
c.save(); c.globalAlpha = 0.22; c.translate(gx, gyy); c.rotate(ap.a - gs.q * QA);
c.drawImage(gs.img, gs.x0, gs.y0, gs.w, gs.h); c.restore();
}
}
c.save(); c.strokeStyle = "rgba(255,95,162,0.8)"; c.setLineDash([5, 7]); c.lineWidth = 2.2; c.lineCap = "round";
c.beginPath(); c.moveTo(x, y0); c.lineTo(x, land - 4); c.stroke(); c.setLineDash([]);
c.fillStyle = "rgba(255,95,162,0.16)"; c.strokeStyle = "rgba(255,95,162,0.9)"; c.lineWidth = 2.2;
c.beginPath(); c.ellipse(x, land - 2, hw, 3.8, 0, 0, Math.PI * 2); c.fill(); c.stroke(); c.restore();
}
if (still && !bare) blitPile(c, k, PILE.b);
for (const b of live) if (b !== a){ for (const m of membersOf(b)) drawBody(c, m, false); if (b.tff.members) drawMarks(c, b, T); }
if (a) drawBody(c, a, false);
drawLeaves(c, f);
if (S.pops.length) drawPops(c, f);
if (!bare) drawLabels(c);
if (S.revive) drawGhosts(c, k);
if (S.net) drawNet(c, f);
if (S.rescues.length) drawRescues(c, f);
const off = (T * 0.35) % 60;
c.drawImage(L.sea, -60 - XV - off, WATER_Y - 6, W + 120 + 2 * XV, 220);
if (v1 > WATER_Y + 206){ c.fillStyle = seaDeep; c.fillRect(-XV - 2, WATER_Y + 206, W + 2 * XV + 4, v1 - WATER_Y - 200); }
if (skyDusk >= 0.45 && !lowGfx){
const wa = clamp((skyDusk - 0.45) / 0.55, 0, 1);
c.save();
for (let i = 0; i < 6; i++){
const sy = WATER_Y + 12 + i * 9, sw = (46 - i * 5) * (0.7 + 0.3 * Math.sin(T / 15 + i));
c.fillStyle = i % 2 && skyDusk >= 0.8 ? "rgba(255,115,180," + (0.26 * wa).toFixed(3) + ")" : "rgba(255,216,130," + (0.3 * wa).toFixed(3) + ")";
roundRect(c, W / 2 - sw / 2 + Math.sin(T / 20 + i) * 14, sy, sw, 3.2, 1.6); c.fill();
}
c.restore();
}
c.fillStyle = "rgba(20,30,90,0.28)"; c.beginPath(); c.ellipse(W/2, WATER_Y + 6, 46, 6, 0, 0, Math.PI * 2); c.fill();
const jx = ((T * 0.22) % (W + 160 + 2 * XV)) - 100 - XV, jy = WATER_Y - 44 + (reduceMotion ? 0 : Math.sin(T / 22) * 1.6);
const span = W + 260 + 2 * XV, fx = W + 120 + XV - ((T * 0.13 + span * 0.55) % span), fy = WATER_Y - 42 + (reduceMotion ? 0 : Math.sin(T / 30 + 1) * 1.2);
if (L.ferry) c.drawImage(L.ferry, fx, fy, 104, 56);
c.drawImage(L.junk, jx, jy, 80, 60);
if (!reduceMotion && !lowGfx){
c.save(); c.fillStyle = "rgba(255,253,247,0.48)";
for (let i = 0; i < 4; i++){
const jt = (T * 0.25 + i * 5) % 20, ft = (T * 0.22 + i * 5) % 20;
c.beginPath(); c.ellipse(jx + 10 - jt * 1.8, WATER_Y + 8 + i * 1.4, Math.max(1.5, 9 - jt * 0.35), 1.8, 0, 0, 7); c.fill();
if (L.ferry){ c.beginPath(); c.ellipse(fx + 94 + ft * 1.8, WATER_Y + 9 + i * 1.4, Math.max(1.5, 10 - ft * 0.38), 1.8, 0, 0, 7); c.fill(); }
}
c.restore();
}
for (const sp of S.splashes){
sp.t += f; const t = sp.t / 45, n = lowGfx ? 3 : sp.big ? 9 : 6;
for (let i = 0; i < n; i++){
const ang = Math.PI * (0.15 + 0.7 * i / (n - 1)), v = (sp.big ? 3.4 : 2.6) * (0.8 + (i % 3) * 0.15);
const px = sp.x + Math.cos(ang) * v * sp.t * 1.2 * (i % 2 ? 1 : -1), py = WATER_Y - Math.sin(ang) * v * sp.t + 0.09 * sp.t * sp.t;
if (py > WATER_Y + 4) continue;
c.fillStyle = "#7FD3FF"; c.beginPath(); c.arc(px, py, 3.2 * (1 - t * 0.5), 0, 7); c.fill();
c.fillStyle = "rgba(255,255,255,0.85)"; c.beginPath(); c.arc(px - 0.9, py - 0.9, 1.1, 0, 7); c.fill();
}
}
if (S.splashes.length){ S.splashes = S.splashes.filter(sp => sp.t < 45); needDraw = true; }
const md = S.mood.until > S.play || S.mode === "over" ? S.mood.type : "idle";
const bob = reduceMotion ? 0 : Math.sin(T / 14) * 1.5 + (md === "happy" ? -Math.abs(Math.sin(T / 5)) * 4 : 0) + (md === "worried" ? Math.sin(T * 1.3) * 1.5 : 0);
c.drawImage(L.crab[md] || L.crab.idle, W/2 + 48, WATER_Y - 46 + bob, 80, 64);
placeTalk(md, bob);
c.setTransform(k, 0, 0, k, 0, 0);
if (S.mode === "playing" && S.play < S.speedUntil){ c.fillStyle = "rgba(255,123,53,0.08)"; c.fillRect(0, 0, W + 2 * XV, H + YT + YB); }
if (S.mode === "over" && S.over === "drops"){ c.fillStyle = "rgba(242,70,62,0.12)"; c.fillRect(0, 0, W + 2 * XV, H + YT + YB); }
if (rep){
c.save();
const vg = c.createRadialGradient((W + 2 * XV) / 2, (H + YT + YB) / 2, W * 0.28, (W + 2 * XV) / 2, (H + YT + YB) / 2, Math.max(W + 2 * XV, H + YT + YB) * 0.72);
vg.addColorStop(0, "rgba(0,0,0,0)"); vg.addColorStop(1, "rgba(40,20,10,0.28)");
c.fillStyle = vg; c.fillRect(0, 0, W + 2 * XV, H + YT + YB);
const lbl = "REPLAY 重溫 · " + floorTxt(Math.max(0, -S.camTop - (H - WATER_Y)) / FLOOR);
c.font = "800 12px " + K.FONTS.zh; const lw = c.measureText(lbl).width + 32;
c.fillStyle = "rgba(30,26,36,0.82)"; roundRect(c, XV + 14, YT + 14, lw, 24, 12); c.fill();
c.fillStyle = "#FF5F56"; c.beginPath(); c.arc(XV + 26, YT + 26, 4, 0, 7); c.fill();
c.fillStyle = "#FFD86B"; c.textAlign = "left"; c.textBaseline = "middle"; c.fillText(lbl, XV + 35, YT + 26.5);
c.restore();
if (rp >= 1) S.replay = null;
needDraw = true;
}
}
function drawRuler(c){
c.save();
c.font = "700 12px " + K.FONTS.dot; c.textBaseline = "middle";
for (let f = 1; f <= 30; f++){
const y = -f * FLOOR; if (y < S.camTop - 20 || y > S.camTop + H + YB + 20) continue;
const st = STAGES.find(s => s.at === f);
if (st){
c.strokeStyle = "rgba(255,255,255,0.85)"; c.lineWidth = 2; c.setLineDash([8, 7]);
c.beginPath(); c.moveTo(XV ? -XV : 44, y); c.lineTo(W + XV, y); c.stroke(); c.setLineDash([]);
}
if (!st && f % 5){
c.fillStyle = skyDusk >= .5 ? "rgba(37,49,122,0.55)" : "rgba(37,49,122,0.32)"; roundRect(c, 19, y - 2, 12, 4, 2); c.fill(); continue;
}
c.fillStyle = st ? "#FFE45C" : skyDusk >= .5 ? "rgba(37,49,122,0.8)" : "rgba(37,49,122,0.82)";
roundRect(c, 8, y - 10, 34, 20, 8); c.fill();
c.fillStyle = st ? "#25317A" : "#FFFFFF"; c.textAlign = "center"; c.fillText(f + "F", 25, y + 1);
}
if (S.best > 8 && S.mode !== "idle"){
const y = -S.best; c.strokeStyle = "rgba(255,95,162,0.9)"; c.lineWidth = 2; c.setLineDash([3, 5]);
c.beginPath(); c.moveTo(XV ? -XV : 44, y); c.lineTo(W + XV - 8, y); c.stroke(); c.setLineDash([]);
}
c.restore();
}
function drawLabels(c){
c.save(); c.textBaseline = "middle";
for (const st of STAGES){
if (!st.at) continue; const y = -st.at * FLOOR; if (y < S.camTop - 30 || y > S.camTop + H + YB + 30) continue;
const label = st.zh + "  " + st.en;
c.font = "700 13px " + K.FONTS.zh; const tw = c.measureText(label).width, ly = Math.max(y - 26, S.camTop + 6);
c.fillStyle = "rgba(37,49,122,0.92)"; roundRect(c, W - tw - 22, ly, tw + 16, 21, 9); c.fill();
c.fillStyle = "#FFE45C"; c.textAlign = "left"; c.fillText(label, W - tw - 14, ly + 10.5);
}
if (S.best > 8 && S.mode !== "idle"){
const y = -S.best, txt = "Best " + floorTxt(S.best / FLOOR);
const dn = STAGES.some(st => st.at && y - -st.at * FLOOR > 0 && y - -st.at * FLOOR < 34) ? 26 : 0;
c.font = "800 12px " + K.FONTS.display; const tw = c.measureText(txt).width;
c.fillStyle = "#FF5FA2"; c.beginPath(); c.moveTo(48, y - 22 + dn); c.lineTo(48, y + 2 + dn * 0.1); c.lineTo(44, y + 2 + dn * 0.1); c.lineTo(44, y - 22 + dn); c.fill();
c.beginPath(); c.moveTo(48, y - 22 + dn); c.lineTo(64, y - 17 + dn); c.lineTo(48, y - 12 + dn); c.fill();
c.fillStyle = "rgba(255,255,255,0.95)"; roundRect(c, 68, y - 24 + dn, tw + 14, 18, 9); c.fill();
c.fillStyle = "#25317A"; c.textAlign = "left"; c.fillText(txt, 75, y - 14.5 + dn);
}
c.restore();
}
function mixHex(a, b, t){ const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
const ch = sh => Math.round(((pa >> sh) & 255) * (1 - t) + ((pb >> sh) & 255) * t);
return "rgb(" + ch(16) + "," + ch(8) + "," + ch(0) + ")"; }
function roundRect(c, x, y, w, h, r){ c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
const previewCache = new Map();
let previewsWaiting = false;
function previewInto(canvas, def){
const r = canvas._sz || (canvas._sz = canvas.getBoundingClientRect());
if (!r.width || !r.height) return;
const g = canvas.getContext("2d");
const w = Math.max(20, Math.round(r.width * DPR)), h = Math.max(20, Math.round(r.height * DPR));
if (canvas.width !== w || canvas.height !== h){ canvas.width = w; canvas.height = h; }
g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, w, h);
if (!def){
if (canvas.dataset.slot){ const m = Math.min(w, h) * 0.18; g.strokeStyle = "rgba(91,81,108,0.45)"; g.lineWidth = Math.max(1.5, w * 0.025); g.setLineDash([w * 0.06, w * 0.05]);
roundRect(g, m, m, w - 2*m, h - 2*m, w * 0.12); g.stroke(); g.setLineDash([]);
const slot = canvas.dataset.slot;
if (slot === "+"){ const r = h * 0.18; g.strokeStyle = "rgba(91,81,108,0.7)"; g.lineWidth = Math.max(2, w * 0.045); g.lineCap = "round"; g.beginPath(); g.moveTo(w/2 - r, h/2); g.lineTo(w/2 + r, h/2); g.moveTo(w/2, h/2 - r); g.lineTo(w/2, h/2 + r); g.stroke(); }
else { g.fillStyle = "rgba(91,81,108,0.7)"; g.font = "800 " + Math.round(h * (slot.length > 1 ? 0.13 : 0.2)) + "px " + K.FONTS.display; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(slot, w/2, h/2 + h*0.02); } }
return;
}
let b = previewCache.get(def.id); if (!b){ b = def.make(0, 0); previewCache.set(def.id, b); }
const bw = b.bounds.max.x - b.bounds.min.x, bh = b.bounds.max.y - b.bounds.min.y;
const s = Math.min(w, h) * 0.8 / Math.max(bw, bh, 64);
g.setTransform(s, 0, 0, s, w/2 - (b.bounds.min.x + bw/2) * s, h/2 - (b.bounds.min.y + bh/2) * s);
try {
let sp = SPR.get(def.id + "|0");
if (!sp) sp = spriteFor(def, 0);
else if (!kOK(sp)){ wantSprite(def, 0, 0); previewsWaiting = true; }
g.imageSmoothingQuality = "high"; g.drawImage(sp.img, sp.x0, sp.y0, sp.w, sp.h);
} catch(e){ try { def.draw(g); } catch(e2){} }
}
function fogInto(canvas){
const r = canvas._sz || (canvas._sz = canvas.getBoundingClientRect());
if (!r.width || !r.height) return;
const g = canvas.getContext("2d"), w = Math.max(20, Math.round(r.width * DPR)), h = Math.max(20, Math.round(r.height * DPR));
if (canvas.width !== w || canvas.height !== h){ canvas.width = w; canvas.height = h; }
g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, w, h);
const gr = g.createRadialGradient(w/2, h/2, w * 0.05, w/2, h/2, w * 0.6); gr.addColorStop(0, "rgba(110,79,216,.9)"); gr.addColorStop(0.7, "rgba(110,79,216,.45)"); gr.addColorStop(1, "rgba(110,79,216,0)");
g.fillStyle = gr; g.fillRect(0, 0, w, h);
g.fillStyle = "#fff"; g.font = "900 " + Math.round(h * 0.5) + "px " + K.FONTS.display; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("?", w/2, h/2 + h * 0.04);
}
function nameInto(el, def, empty){
el.replaceChildren();
if (!def){ const s = document.createElement("small"); s.textContent = empty; el.appendChild(s); return; }
el.append(document.createTextNode(def.en));
const z = document.createElement("small"); z.textContent = def.zh; el.appendChild(z);
const chip = document.createElement("span"); chip.className = "kind " + def.kind;
if (def.jackpot) chip.className = "kind jackpot";
chip.textContent = def.jackpot ? "Jackpot 大獎" : def.kind === "wise" ? "Stable 穩陣" : def.kind === "risky" ? "Risky 高危" : "Scam 騙局";
el.appendChild(chip);
if (def.vine){ const v = document.createElement("span"); v.className = "kind vine"; v.textContent = "Vine 藤蔓"; el.appendChild(v); }
if (def.lock){ const v = document.createElement("span"); v.className = "kind lock"; v.textContent = "Lock 定期鎖"; el.appendChild(v); }
if (def.slime){ const v = document.createElement("span"); v.className = "kind slime"; v.textContent = "Slime 黏黏"; el.appendChild(v); }
}
let lastPrev = "";
function drawPreviews(force){
if (!S) return;
const n0 = S.queue[0], n1 = S.queue[1];
const key = [n0 && n0.id, n1 && n1.id, S.hold && S.hold.id, S.scamLock > 0, SC, DPR].join("|");
if (key === lastPrev && !force) return; lastPrev = key;
const fog = S.scamLock > 0;
if (fog){ fogInto($("nextCv")); fogInto($("next2Cv")); fogInto($("hudNext")); } else { previewInto($("nextCv"), n0); previewInto($("next2Cv"), n1); previewInto($("hudNext"), n0); }
previewInto($("holdCv"), S.hold); previewInto($("hudHold"), S.hold);
nameInto($("nextName"), fog ? null : n0, fog ? "Hidden by a scam 被呃咗，睇唔清" : "");
nameInto($("holdName"), S.hold, S.scamLock > 0 ? "Locked by a scam 被呃咗，暫存鎖住" : "Press C to keep one for later 按C暫存");
if (S.hold && S.scamLock > 0){ const lk = document.createElement("small"); lk.className = "locked"; lk.textContent = "Locked by a scam 被呃咗，暫存鎖住"; $("holdName").appendChild(lk); }
const t2 = $("next2Name"); t2.replaceChildren();
if (n1 && !fog){ const z = document.createElement("span"); z.className = "nw"; z.textContent = n1.zh; t2.append("Then 跟住：" + n1.en + " ", z); }
}
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
const SHORT = {spend:["Overspend", "過度消費"], scam:["Scams", "騙局"], delay:["Put off", "拖延"]};
Object.entries(TRAPS).forEach(([k, t]) => {
const li = document.createElement("li"); li.className = "tag " + k;
const tx = document.createElement("span"); const b = document.createElement("b"); b.textContent = t.en + " " + t.zh;
const sm = document.createElement("small"); sm.textContent = t.d;
const ef = document.createElement("em"); ef.className = "eff"; const cut = t.eff.search(/\p{Script=Han}/u);
if (cut > 0) bi(ef, "In the game: " + t.eff.slice(0, cut).trim(), t.eff.slice(cut)); else ef.textContent = "In the game: " + t.eff;
tx.append(b, sm, ef); li.append(svgUse(ICON[k]), tx); fl.appendChild(li);
if (fl.dataset["clip" + k[0].toUpperCase() + k.slice(1)]){
const K = k[0].toUpperCase() + k.slice(1), box = document.createElement("span"); box.className = "clip"; box.dataset.label = t.en + " in the game";
const v = document.createElement("video"); v.className = "clipv"; v.muted = true; v.loop = true; v.playsInline = true; v.preload = "none";
v.width = 360; v.height = 584; v.setAttribute("aria-hidden", "true"); v.setAttribute("disablepictureinpicture", ""); v.setAttribute("disableremoteplayback", "");
v.poster = fl.dataset["still" + K]; v.dataset.src = fl.dataset["clip" + K]; box.appendChild(v); li.appendChild(box);
}
const c = document.createElement("li"); c.className = "chip " + k; c.title = t.en + " " + t.zh;
const n = document.createElement("span"); n.className = "n"; n.id = "fall_" + k; n.textContent = "0";
const lab = document.createElement("small"); for (const t of SHORT[k]){ const sp = document.createElement("span"); sp.textContent = t; lab.appendChild(sp); }
c.append(svgUse(ICON[k]), n, lab); ch.appendChild(c);
});
}
function ledger(def, amount, note){
if (!S) return;
S.ledger.push({t: S.play, zh: (note ? note + " " : "") + (def.zh || ""), en: def.en || "", amt: amount, bal: S.score, fresh: true});
if (S.ledger.length > 40) S.ledger.shift();
renderLedger();
}
function dotText(el, s){
let run = "";
for (const ch of s){ if (",.:".includes(ch)){ if (run) el.append(run); run = ""; const d = document.createElement("span"); d.className = "dp"; d.textContent = ch; el.appendChild(d); } else run += ch; }
if (run) el.append(run);
}
function renderLedger(){
const tb = $("ledgerBody"); tb.replaceChildren();
const rows = S ? S.ledger.slice(-6) : [];
if (!rows.length){
const tr = document.createElement("tr"); tr.className = "ledger-empty"; const td = document.createElement("td"); td.colSpan = 5;
bi(td, "Entries print here as items settle, floors are reached and money is lost.", "每筆存入同支出都會印喺度。"); tr.appendChild(td); tb.appendChild(tr); return;
}
for (const r of rows){
const tr = document.createElement("tr"); if (r.fresh){ tr.className = "new"; r.fresh = false; }
const cells = [mmss(r.t), r.zh || r.en, r.amt > 0 ? fmtShort(r.amt) : "", r.amt < 0 ? fmtShort(r.amt) : "", fmtShort(r.bal)];
cells.forEach((v, i) => { const td = document.createElement("td"); if (i === 1){ td.textContent = v; td.title = r.en; } else dotText(td, v); if (i === 2) td.className = "in"; if (i === 3) td.className = "out"; tr.appendChild(td); });
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
const urg = sec <= 10 && sec > 0 && S.mode === "playing";
for (const id of ["timeVal", "hudTime"]){
const el = $(id); el.classList.remove("urgent");
if (urg){ void el.offsetWidth; el.classList.add("urgent"); }
}
if (urg && sec <= 5){ A.sfx("cardTick", {n: sec}); haptic(15, 0.25, 0.35); }
if (sec <= 30 && !S.warned && S.mode === "playing"){ S.warned = true; A.sfx("timeWarn"); stamp("30 seconds left", "仲有30秒", "info"); quip("hurry", 3); }
statusQuips();
}
function updateHUD(){
if (!S) return;
chalCheck();
$("nwVal").textContent = fmt(S.score);
$("hudNw").textContent = (window.innerWidth < 430 && S.score >= 10000) ? "HK$" + (S.score / 1000).toFixed(S.score >= 100000 ? 0 : 1) + "K" : fmt(S.score);
$("rateVal").textContent = "×" + S.rate.toFixed(1);
const fl = S.best / FLOOR;
$("heightVal").textContent = floorTxt(fl); $("hudH").textContent = floorTxt(fl);
$("hudDrops").textContent = S.drops + "/" + MAX_DROPS; $("hudDrops").classList.toggle("hit", S.drops > 0);
[...$("fundCoins").children].forEach((p, i) => p.classList.toggle("on", i < S.fund));
[...$("dropCoins").children].forEach((p, i) => p.classList.toggle("hit", i < S.drops));
$("fundCoins").setAttribute("aria-label", S.fund + " of 3"); $("dropCoins").setAttribute("aria-label", S.drops + " of " + MAX_DROPS);
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
if (highItem) d.style.bottom = "calc(max(" + (WATER_Y - S.camTop > H ? 8 : Math.round((H - (WATER_Y - S.camTop)) / H * 100) + 4) + "%, " + Math.round(talkBand()) + "px) + " + (slot * 66) + "px)";
else d.style.top = "calc(" + (frenzyOn() ? 64 : 10) + "px + " + (slot * 66) + "px)";
d.style.setProperty("--r", ((stampN % 2 ? -1 : 1) * (1.5 + (stampN % 3) * 0.75)) + "deg");
d.textContent = en; const z = document.createElement("small"); z.textContent = zh; d.appendChild(z);
d.dataset.fit = 11; box.appendChild(d); fitLine(d); A.sfx("stamp"); setTimeout(() => d.remove(), 1800);
}
const talk = {el: $("bubble"), pos: $("bpos"), say: $("bubbleSay"), face: document.querySelector("#bubble .face"), on: false, pri: 0, until: 0, last: -1e9,
pick: {}, w: 0, h: 0, x: NaN, y: NaN, docked: null, mood: "", next: null};
function quip(key, pri, n){
const pool = QUIPS[key]; if (!S || !pool) return;
const now = S.play, busy = talk.on && (S.mode !== "playing" || now < talk.until);
if (busy && pri < talk.pri){ if (pri >= 2) talk.next = {key, pri, n, at: now}; return; }
if (pri <= 1 && (busy || now - talk.last < 6000)) return;
let i = Math.floor(Math.random() * pool.length);
if (pool.length > 1 && i === talk.pick[key]) i = (i + 1) % pool.length;
talk.pick[key] = i;
const [en, zh] = pool[i].map(t => t.replace("{n}", n == null ? "" : n));
const z = document.createElement("small"); z.lang = "zh-HK"; z.textContent = zh;
talk.say.replaceChildren(document.createTextNode(en), z);
const b = talk.el; b.classList.remove("docked", "slim"); talk.docked = false; b.style.maxWidth = talkWidth(false);
b.hidden = false; b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
talk.w = b.offsetWidth; talk.h = talk.hu = b.offsetHeight; talk.x = talk.y = NaN;
talk.on = true; talk.pri = pri; talk.last = now; talk.until = now + Math.min(5200, 2400 + en.length * 45) * (slowRead ? 1.6 : 1);
talk.realUntil = performance.now() + (talk.until - now);
needDraw = true;
}
function hush(){ talk.on = false; talk.pri = 0; talk.until = 0; talk.last = -1e9; talk.next = null; talk.el.hidden = true; }
function syncTalk(){
if (S.mode === "playing" && talk.on && S.play >= talk.until){
talk.on = false;
const q = talk.next; talk.next = null;
if (q && S.play - q.at < 6000) quip(q.key, q.pri, q.n);
}
if (S.mode === "idle" && S.viewing && talk.on && performance.now() >= talk.realUntil) talk.on = false;
const show = talk.on && !sideways && (S.mode === "playing" || S.mode === "over" || (S.mode === "idle" && S.viewing));
if (talk.el.hidden === show){ talk.el.hidden = !show; if (show){ talk.x = NaN; needDraw = true; } }
}
const TALK_TIP = W/2 + 50, TALK_ROOM = 70;
const talkWidth = docked => Math.round(docked ? Math.min(320, W * SC - 20) : Math.min(250, TALK_TIP * SC - 16)) + "px";
function placeTalk(md, bob){
const b = talk.el; if (b.hidden) return;
const ox = XV * SC, cw = W * SC, ch = H * SC, tipX = TALK_TIP * SC, tipY = (WATER_Y - 30 + bob - S.camTop) * SC;
const floor = ch - (S.mode === "idle" && S.viewing ? 76 : 14);
const docked = tipY + talk.hu / 2 > floor;
if (docked !== talk.docked){
talk.docked = docked; b.classList.toggle("docked", docked); b.classList.toggle("slim", docked && cw < 260); b.style.maxWidth = talkWidth(docked);
talk.w = b.offsetWidth; talk.h = b.offsetHeight;
}
if (docked && talk.mood !== md && L.crab){
talk.mood = md; const g = talk.face.getContext("2d"); g.clearRect(0, 0, 64, 52); g.drawImage(L.crab[md] || L.crab.idle, 0, 0, 64, 52);
}
let x, y;
if (docked){ x = ox + cw - talk.w - 10; y = floor - talk.h; }
else { x = ox + tipX - 10 - talk.w; y = Math.max((30 - S.camTop) * SC + 4, tipY - talk.h / 2); }
x = Math.round(clamp(x, ox + 6, ox + cw - talk.w - 6)); y = Math.round(Math.max(6, y));
if (x !== talk.x || y !== talk.y){ talk.x = x; talk.y = y; talk.pos.style.transform = "translate(" + x + "px," + y + "px)"; }
}
function talkBand(){
const ch = H * SC, under = (30 - S.camTop) * SC, tipY = (WATER_Y - 30 - S.camTop) * SC;
const top = tipY + TALK_ROOM / 2 > ch - 14 ? ch - 14 - TALK_ROOM : Math.min(Math.max(under + 4, tipY - TALK_ROOM / 2), ch - 14 - TALK_ROOM);
return ch - top + 6;
}
function statusQuips(){
if (!S || S.mode !== "playing") return;
const once = (k, cond, pri, n) => { if (cond && !S.said.has(k)){ S.said.add(k); quip(k.replace(/\d+$/, ""), pri, n); } };
for (const v of [10000, 25000, 50000, 100000]) once("rich" + v, S.score >= v, 2, fmt(v));
once("pb", S.pb > 0 && S.score > S.pb, 2);
once("poor", S.play > 70000 && S.score < 3000, 1);
once("clean", S.play > 120000 && S.drops === 0, 1);
if (S.shocks.length && S.fund === 0 && S.play >= S.shocks[0] - 5000 && !S.said.has("noFund" + S.shocks[0])){ S.said.add("noFund" + S.shocks[0]); quip("noFund", 2); }
}
let last = performance.now(), needDraw = true;
const SIDEWAYS = matchMedia("(orientation: landscape) and (max-height: 500px) and (pointer: coarse)");
let sideways = false;
const awake = () => engine.world.bodies.some(b => b.tff && !b.isSleeping);
let frameErr = false;
const dropCaches = () => { Object.assign(PILE, {s: null, b: null, set: new Set(), list: [], h: 0, k: 0}); Object.assign(BACK, {c: null, key: "", next: ""}); needDraw = true; };
function frame(now){
requestAnimationFrame(frame);
try { frameBody(now); }
catch(e){
if (!frameErr){ frameErr = true; console.error(e); }
dropCaches();
}
}
cv.addEventListener("contextrestored", () => {
SPR.clear(); buildLayers(); dropCaches();
for (const b of engine.world.bodies) if (b.tff) b.tff.mc = null;
drawPreviews(true);
});
function frameBody(now){
const raw = now - last, dt = Math.min(50, raw); last = now;
checkPerf(raw);
if (GP.on) pollPad(now);
if (++avTick % 8 === 0) updateAvatar();
if (S){
const side = SIDEWAYS.matches && (S.mode === "playing" || S.mode === "paused" || S.mode === "card" || S.mode === "offer");
if (side !== sideways){ sideways = side; $("turnOv").hidden = !side; if (side) fitLine(document.querySelector("#turnOv h2")); if (side && S.mode === "playing") togglePause(); }
let live = false;
if (S.mode === "card" && S.card){
if (!sideways) S.card.t += dt;
if (!S.card.flip){
const left = cardMs() - S.card.t;
$("cardBar").style.transform = "scaleX(" + Math.max(0, left / cardMs()).toFixed(3) + ")";
const sec = Math.ceil(left / 1000); if (sec <= 3 && sec < S.card.lastTick && sec > 0){ S.card.lastTick = sec; A.sfx("cardTick"); }
if (S.card.t >= cardMs()) choose("none");
} else if (!slowRead && S.card.t - S.card.flipAt > RESULT_MS) closeCard();
} else if (S.mode === "offer" && S.offer){ if (!sideways) S.offer.t += dt; offerFrame(); }
else if (S.mode === "playing"){ S.realMs += Math.min(1000, raw); tick(dt); live = true; }
else if (S.mode === "over" || (S.mode === "idle" && S.viewing)){
S.acc += dt; let n = 0; while (S.acc >= STEP && n++ < 3){ S.acc -= STEP; snap(); worldStep(); }
if (S.revive) reviveFrame(dt);
for (const b of engine.world.bodies.slice()) if (b.tff && b.position.y > WATER_Y + 40) Composite.remove(engine.world, b);
live = S.mode !== "over" || $("endModal").hidden || awake();
}
ALPHA = clamp(S.acc / STEP, 0, 1);
syncTalk();
if (live || needDraw || S.shake > 0 || S.splashes.length || S.leaves.length || Math.abs(camTarget() - S.camTop) > 0.05){ needDraw = false; draw(dt); }
}
}
function tick(dt){
S.play += dt; updateTime();
if (S.play >= GAME_MS){ endGame("time"); return; }
if (S.fastOn && S.play >= S.speedUntil){ S.fastOn = false; A.mode(musicMode()); }
if (S.frenzyUntil) frenzyTick();
ghostNow();
if (S.active && S.play >= S.nextEvent){ openCard(); return; }
if (!S.plan && S.play >= S.nextEvent - 4000) S.plan = planCard();
if (S.active && trollTick()) return;
if (S.active && S.shocks.length && S.play >= S.shocks[0]){ S.shocks.shift(); shock(); }
if (!S.active && S.spawnAt && S.play >= S.spawnAt){ S.spawnAt = 0; if (S.scamLock > 0) S.scamLock--; if (S.rotLock > 0) setRotLock(S.rotLock - 1); nextPiece(); }
S.acc += dt; let n = 0;
while (S.acc >= STEP && n++ < 4){ S.acc -= STEP; physicsStep(); if (S.mode !== "playing") return; }
if (S.acc > STEP * 4) S.acc = 0;
}
let cardBlob = null, cardKey = "", heroRun = 0, takes = 0;
const canShareFiles = () => { try { return !!(navigator.share && navigator.canShare && navigator.canShare({ files: [new File([new Uint8Array([255, 216, 255])], "x.jpg", { type: "image/jpeg" })] })); } catch (e) { return false; } };
const cardName = () => { if (!S) return ""; const n = S.posted ? S.boardName || (S.rec && S.rec.name) : sanitizeName($("nickname").value); return n && n !== ANON ? n : ""; };
function heroUp() {
const up = S.score > 0, cong = $("heroCong"), en = document.createElement("span"), hero = $("stHero");
en.textContent = up ? "Congrats! You saved" : "Your net worth"; cong.replaceChildren(up ? "恭喜你儲到" : "你嘅淨資產", en);
avKeys.delete($("endAvatar")); paintAvatar($("endAvatar"), lookNow());
hero.classList.remove("pop"); void hero.offsetWidth; if (!reduceMotion) hero.classList.add("pop");
const to = Math.round(S.score), t0 = performance.now(), ms = reduceMotion ? 0 : 900, run = ++heroRun, amt = $("heroAmt"), box = amt.parentNode;
box.style.fontSize = ""; amt.textContent = fmt(to);
for (let fs = parseFloat(getComputedStyle(box).fontSize); box.scrollWidth > box.clientWidth + 1 && fs > 20;) box.style.fontSize = (fs -= 2) + "px";
const step = now => { if (run !== heroRun) return; const k = ms ? Math.min(1, (now - t0) / ms) : 1, e = 1 - Math.pow(1 - k, 3); amt.textContent = fmt(Math.round(to * e / 10) * 10); if (k < 1) requestAnimationFrame(step); };
requestAnimationFrame(step);
$("shareStatus").textContent = ""; $("cardImg").removeAttribute("src");
cardBlob = null; setTimeout(() => { if (run === heroRun) readyCard().catch(() => { }); }, 1200);
}
const STEP_FOCUS = ["endTitle", "quizHead", "infoHead", "cardHead"];
const surveyDone = () => !!S && S.quiz.every(Boolean) && !!S.habit;
function stepButtons() {
const n = S.step, next = $("stNext"), posted = !!S.posted;
$("stBack").hidden = n === 1 || n === 4; next.hidden = n === 4; $("closeEnd").hidden = $("againBtn").hidden = n !== 4;
next.disabled = n === 2 && !surveyDone();
next.classList.toggle("alt", n === 3 && !posted);
label(next, n === 3 ? (posted ? ["See my card", "睇結果卡"] : ["Skip posting", "唔上榜"]) : ["Next", "下一步"]);
$("surveyGate").textContent = n === 2 && !surveyDone() ? "Answer all 3 questions and pick a habit to go on. 答晒3題同揀一個習慣，先可以繼續。" : "";
}
function setStep(n, focus) {
if (S.step && n !== S.step) A.sfx(n > S.step ? "uiNext" : "uiBack");
S.step = n; if (n === 4) S.flowDone = true;
const sheet = document.querySelector("#endModal .statement"); sheet.dataset.step = n;
$("endModal").setAttribute("aria-labelledby", STEP_FOCUS[n - 1]);
[...$("stSteps").children].forEach((li, i) => { li.classList.toggle("done", i + 1 < n); if (i + 1 === n) li.setAttribute("aria-current", "step"); else li.removeAttribute("aria-current"); });
stepButtons();
const body = $("stBody"); body.classList.remove("enter"); void body.offsetWidth; if (!reduceMotion) body.classList.add("enter");
$("stScroll").scrollTop = 0;
if (n === 4) showCard();
if (focus !== false) $(STEP_FOCUS[n - 1]).focus({ preventScroll: true });
}
async function showCard() {
const img = $("cardImg"), ps = $("postStatus");
$("cardRank").textContent = S.posted ? ps.textContent : "";
img.alt = "Your result card: " + fmt(S.score) + ", " + (S.stage === STAGES.length - 1 ? "made it to Retirement" : "reached " + STAGES[S.stage].en) + ". 你的結果卡";
$("shareImg").hidden = !canShareFiles(); $("iabSave").hidden = !IAB;
threadsLink();
try {
const b = await readyCard();
if (IAB) img.src = await new Promise((res, rej) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.onerror = rej; fr.readAsDataURL(b); });
else { if (img._url) URL.revokeObjectURL(img._url); img._url = URL.createObjectURL(b); img.src = img._url; }
} catch (e) { }
}
$("stNext").addEventListener("click", () => { if (S.step < 4 && !(S.step === 2 && !surveyDone())) setStep(S.step + 1); });
$("stBack").addEventListener("click", () => { if (S.step > 1) setStep(S.step - 1); });
const POSTER_URL = (() => { try { return JSON.parse((document.querySelector('meta[name="tff-posters"]') || {}).content || "{}"); } catch (e) { return {}; } })();
function posterFor(s) {
const uni = s.stage === 0, homely = !!(s.persona && (s.persona.bg === "sub" || s.persona.bg === "estate"));
if (s.falls.spend >= 2 || (uni && s.falls.spend >= 1)) return "trolley";
if (s.stage >= 3) return s.drops >= 2 ? "rooftop" : "ferry";
if (s.stage === 2) return "family";
if (s.stage === 1) return "diner";
if (homely) return "estate";
return s.over === "drops" ? "diver" : "rooftop";
}
const posterPics = new Map();
function loadPoster(key) {
if (!POSTER_URL[key]) return Promise.resolve(null);
if (!posterPics.has(key)) posterPics.set(key, new Promise(res => {
const im = new Image(); im.decoding = "async";
im.onload = () => res(im); im.onerror = () => { posterPics.delete(key); res(null); }; im.src = POSTER_URL[key];
}));
return posterPics.get(key);
}
const CARD_H = 1920, PANEL = 1350;
const CARD_R = 60, NOTCH = 30;
function drawPosterCard(g, img, medalPic) {
const F = K.FONTS, v = S.verdict || verdictOf(S), st = STAGES[S.stage], top = S.stage === STAGES.length - 1;
const P = personaOf(S.persona), who = WHO === "jackie" ? "Jackie" : "Jack", nm = cardName() || who;
const CREAM = "#F6F0D8", GOLD = "#C9A35A", DIM = "#B5AFC4", SERIF = 'Georgia,"Times New Roman","Noto Serif",serif';
const fit = (t, w, size, min, font) => { let f = size; g.font = font(f); while (g.measureText(t).width > w && f > min) { f -= 1; g.font = font(f); } return g.font; };
const say = (t, x, y, w, size, min, font, color, align) => { g.textAlign = align || "left"; g.fillStyle = color; g.font = fit(t, w, size, min, font); g.fillText(t, x, y); };
const spaced = (px) => { if ("letterSpacing" in g) g.letterSpacing = px + "px"; };
const label = (t, x, y, align, w) => { spaced(4); say(t, x, y, w || 400, 21, 13, f => "800 " + f + "px " + F.sans, GOLD, align); spaced(0); };
const zh = w => f => w + " " + f + "px " + F.zh, it = f => "italic 700 " + f + "px " + SERIF;
g.save(); g.beginPath(); g.moveTo(CARD_R, 0); g.arcTo(1080, 0, 1080, CARD_H, CARD_R); g.arcTo(1080, CARD_H, 0, CARD_H, CARD_R); g.arcTo(0, CARD_H, 0, 0, CARD_R); g.arcTo(0, 0, 1080, 0, CARD_R); g.closePath(); g.clip();
g.drawImage(img, 0, 0, 1080, PANEL);
const bg = g.createLinearGradient(0, PANEL, 0, CARD_H); bg.addColorStop(0, "#171A33"); bg.addColorStop(1, "#0B0C17"); g.fillStyle = bg; g.fillRect(0, PANEL, 1080, CARD_H - PANEL);
let seed = 11; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
for (let i = 0; i < 2600; i++) { g.fillStyle = "rgba(255,255,255," + (0.02 + rnd() * 0.05).toFixed(3) + ")"; g.fillRect(rnd() * 1080, PANEL + rnd() * (CARD_H - PANEL), 1.6, 1.6); }
const rule = y => { g.fillStyle = "rgba(201,163,90,0.45)"; g.fillRect(60, y, 960, 2); };
const tear = y => {
g.save(); g.setLineDash([10, 9]); g.strokeStyle = "rgba(246,240,216,0.55)"; g.lineWidth = 3; g.beginPath(); g.moveTo(NOTCH + 14, y); g.lineTo(1080 - NOTCH - 14, y); g.stroke();
g.setLineDash([]); g.fillStyle = "rgba(11,12,23,0.42)";
for (let px = NOTCH + 24; px < 1080 - NOTCH - 20; px += 22) { g.beginPath(); g.arc(px, y, 2.2, 0, Math.PI * 2); g.fill(); }
g.restore();
};
const p0 = PANEL, no = String(Math.abs(Math.round(S.endAt || Date.now())) % 10000000).padStart(7, "0");
tear(p0);
label("ADMIT ONE · 入場券", 60, p0 + 44);
say("HSUHK 個人理財大使計劃 2026 · 3 Fall Crab 整冧咗team", 548, p0 + 44, 400, 18, 12, zh(500), DIM, "center");
label("No. " + no, 1020, p0 + 44, "right", 200);
if (medalPic) { g.save(); g.shadowColor = "rgba(0,0,0,0.5)"; g.shadowBlur = 16; g.shadowOffsetY = 6; g.drawImage(medalPic, 60, p0 + 64, 136, 160); g.restore(); }
else flatMedal(g, 128, p0 + 150, 48, tierOf(v));
label("我的稱號 · MY TITLE", 230, p0 + 94);
const foil = g.createLinearGradient(230, p0 + 104, 230, p0 + 162);
foil.addColorStop(0, "#FFF8DC"); foil.addColorStop(0.5, "#FFE08A"); foil.addColorStop(0.85, "#D4A24C"); foil.addColorStop(1, "#FFFDF0");
say(v.zh, 230, p0 + 152, 790, 58, 32, zh(700), foil);
say(v.en, 230, p0 + 190, 790, 29, 18, it, "#E8C98A");
say(v.line[1], 230, p0 + 225, 790, 24, 16, zh(500), DIM);
rule(p0 + 252);
const saved = S.score > 0;
label(saved ? "票房 · SAVED" : "淨資產 · NET WORTH", 60, p0 + 292);
say(fmt(S.score), 60, p0 + 354, 360, 62, 34, f => "700 " + f + "px " + SERIF, "#FFD98A");
label("場次 · REACHED", 450, p0 + 292);
say(top ? "退休 Retirement" : st.zh + " " + st.en, 450, p0 + 346, 300, 38, 22, zh(700), CREAM);
say("最高 Best · " + floorTxt(S.best / FLOOR), 450, p0 + 380, 300, 23, 16, zh(500), DIM);
label("三大陷阱 · 3 FALLS", 780, p0 + 292);
[["spend", "#E8661F"], ["scam", "#7B5BE8"], ["delay", "#2F86D6"]].forEach(([k, col], i) => {
const x = 803 + i * 66, y = p0 + 338; g.beginPath(); g.arc(x, y, 22, 0, Math.PI * 2); g.fillStyle = col; g.fill(); g.lineWidth = 3; g.strokeStyle = "rgba(255,255,255,0.85)"; g.stroke();
g.fillStyle = "#fff"; g.textAlign = "center"; g.font = "900 23px " + F.display; g.fillText(S.falls[k] ? "×" + S.falls[k] : "✓", x, y + 8);
});
rule(p0 + 404);
spaced(2);
say("領銜主演  " + nm + (P ? "  ·  " + P.zh + (P.c.en ? " " + P.c.en : "") : ""), 540, p0 + 436, 960, 28, 18, zh(700), CREAM, "center");
const extra = [S.pct != null ? "贏咗 " + S.pct + "% 玩家 · Beat " + S.pct + "% of players" : "", S.chal && S.chal.beat ? "挑戰成功！Beat " + ((CHAL && CHAL.n) || "my friend") : ""].filter(Boolean).join("   ·   ");
if (extra) say(extra, 540, p0 + 466, 960, 23, 15, zh(500), DIM, "center");
spaced(0);
tear(p0 + 488);
let bx0 = 62;
if (typeof window.qrcode === "function") {
try {
const qr = window.qrcode(0, "L");
qr.addData(challengeUrl(true)); qr.make();
const cnt = qr.getModuleCount(), sz = 58, pad = 3, mod = (sz - pad * 2) / cnt;
g.fillStyle = CREAM; g.fillRect(60, p0 + 496, sz, sz);
g.fillStyle = "#171A33";
for (let r = 0; r < cnt; r++) for (let col = 0; col < cnt; col++) if (qr.isDark(r, col))
g.fillRect(60 + pad + col * mod, p0 + 496 + pad + r * mod, mod + 0.3, mod + 0.3);
bx0 = 132;
} catch (e) { }
}
let x = bx0; seed = Number(no) + 7;
while (x < 290) { const w = 2 + Math.floor(rnd() * 4); if (rnd() > 0.35) { g.fillStyle = CREAM; g.fillRect(x, p0 + 504, w, 32); } x += w + 2; }
say(no.split("").join(" "), bx0 > 62 ? 211 : 175, p0 + 550, bx0 > 62 ? 160 : 230, 13, 10, f => "700 " + f + "px " + F.sans, DIM, "center");
if (S.sil && S.sil.length >= 4) {
const rc = S.sil.length / 4, sy0 = p0 + 498, sx0 = 304, sw = 34, sh = 48, rh = Math.min(4, (sh - 8) / rc);
g.save(); g.fillStyle = "rgba(255,255,255,0.06)"; roundRect(g, sx0, sy0, sw, sh, 6); g.fill();
g.fillStyle = "rgba(255,217,138,0.85)";
for (let i = 0; i < rc; i++) {
const l = parseInt(S.sil.slice(i * 4, i * 4 + 2), 36), r = parseInt(S.sil.slice(i * 4 + 2, i * 4 + 4), 36);
if (r > l) g.fillRect(sx0 + 3 + (l / W) * (sw - 6), sy0 + sh - 4 - (i + 1) * rh, Math.max(1.5, ((r - l) / W) * (sw - 6)), rh + 0.3);
}
g.restore();
}
say("3fallcrab.com", 540, p0 + 536, 360, 38, 26, f => "900 " + f + "px " + F.display, "#FF7AB4", "center");
const d = new Date(S.endAt || Date.now()), mon = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][d.getMonth()];
label(String(d.getDate()).padStart(2, "0") + " " + mon + " " + d.getFullYear() + " · " + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"), 1020, p0 + 518, "right", 300);
label("ACT " + ACTS[ACT_OF_STAGE[Math.min(3, S.stage)]].n + " · SEAT " + floorTxt(S.best / FLOOR), 1020, p0 + 548, "right", 300);
g.restore();
g.save(); g.globalCompositeOperation = "destination-out";
for (const cx of [0, 1080]) {
g.beginPath(); g.arc(cx, p0, NOTCH, 0, Math.PI * 2); g.fill();
g.beginPath(); g.arc(cx, p0 + 488, NOTCH * 0.55, 0, Math.PI * 2); g.fill();
}
g.restore();
}
let qrP = null;
function loadQr() {
if (typeof window.qrcode === "function") return Promise.resolve(window.qrcode);
if (qrP) return qrP;
qrP = new Promise(res => {
const sc = document.createElement("script"); sc.src = "/vendor/qrcode-1.4.4.js"; sc.async = true;
sc.onload = () => res(window.qrcode || null); sc.onerror = () => res(null);
document.head.appendChild(sc);
});
return qrP;
}
async function readyCard() {
const k = [S.endAt, Math.round(S.score), cardName(), WHO, S.pct, S.verdict && S.verdict.id, S.chal && S.chal.beat, personaKey(S.persona), posterFor(S), S.posted ? myLastId : ""].join("|");
if (cardBlob && cardKey === k) return cardBlob;
const b = await makeResultCard(); cardBlob = b; cardKey = k; return b;
}
async function makeResultCard() {
if (document.fonts && document.fonts.ready) await document.fonts.ready;
const pkey = posterFor(S), posterP = loadPoster(pkey);
const [M] = await Promise.all([
Promise.race([loadMedal(), new Promise(r => setTimeout(() => r(null), 4000))]),
Promise.race([loadQr(), new Promise(r => setTimeout(() => r(null), 2000))]),
]);
let medalPic = null; try { medalPic = M && M.snapshot(tierOf(S.verdict || verdictOf(S)), 240, 282); } catch (e) { }
const poster = await Promise.race([posterP, new Promise(r => setTimeout(() => r(null), 5000))]);
const CW = 1080, CH = 1350, c = document.createElement("canvas"); c.width = CW; c.height = poster ? CARD_H : CH;
if (poster) { drawPosterCard(c.getContext("2d"), poster, medalPic); return await new Promise((res, rej) => c.toBlob(b => b ? res(b) : rej(new Error("no image")), "image/png")); }
const g = c.getContext("2d"), F = K.FONTS, st = STAGES[S.stage], top = S.stage === STAGES.length - 1;
const rr = (x, y, w, h, r) => { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); };
const outlined = (txt, x, y, font, fill, sw) => { g.font = font; g.textAlign = "center"; g.lineJoin = "round"; g.strokeStyle = "rgba(37,49,122,0.3)"; g.lineWidth = sw + 6; g.strokeText(txt, x + 5, y + 8); g.strokeStyle = "#fff"; g.lineWidth = sw; g.strokeText(txt, x, y); g.fillStyle = fill; g.fillText(txt, x, y); };
const sky = g.createLinearGradient(0, 0, 0, CH); sky.addColorStop(0, "#3FB4FF"); sky.addColorStop(0.6, "#8EDBFF"); sky.addColorStop(1, "#C8F0FF"); g.fillStyle = sky; g.fillRect(0, 0, CW, CH);
const tile = (img, y, h) => { if (!img || !img.width) return; const w = h * img.width / img.height, x0 = (CW - w) / 2; for (let x = x0 - Math.ceil(x0 / w) * w; x < CW; x += w) g.drawImage(img, x, y, w, h); };
tile(L.sky, 0, 330); tile(L.city, CH - 500, 340); tile(L.sea, CH - 200, 230);
const word = ["3", "F", "a", "l", "l", "F", "u", "n"], cols = ["#FF5FA2", "#3A9BF0", "#4CC36A", "#FF7B35", "#8B6CF2", "#F2463E", "#20C1B3", "#FF5FA2"];
g.font = "900 124px " + F.display; const gaps = [26, 0, 0, 0, 22, 0, 0, 0], ws = word.map(ch => g.measureText(ch).width), tw = ws.reduce((a, b) => a + b, 0) + gaps.reduce((a, b) => a + b, 0);
let x = (CW - tw) / 2; word.forEach((ch, i) => { outlined(ch, x + ws[i] / 2, 160, g.font, cols[i], 14); x += ws[i] + gaps[i]; });
if ("letterSpacing" in g) g.letterSpacing = "14px";
outlined("人生跌塔", CW / 2 + 7, 278, "700 88px " + F.zh, "#25317A", 16);
if ("letterSpacing" in g) g.letterSpacing = "0px";
g.save(); g.shadowColor = "rgba(37,49,122,0.28)"; g.shadowOffsetY = 16; rr(70, 330, 940, 700, 48); g.fillStyle = "#FFF6E6"; g.fill(); g.restore();
g.save(); rr(70, 330, 940, 700, 48); g.clip(); const gl = g.createLinearGradient(0, 330, 0, 1030); gl.addColorStop(0, "#FFFDF7"); gl.addColorStop(1, "#FFE6BE"); g.fillStyle = gl; g.fillRect(70, 330, 940, 700); g.restore();
g.save(); g.translate(100, 380); g.scale(2.45, 2.45); AV.draw(g, lookNow()); g.restore();
const cx = 705, hasPct = S.pct != null, dy = hasPct ? 0 : -30, v = S.verdict || verdictOf(S); g.textAlign = "center";
const fitFont = (txt, w, size, min, weight, fam) => { let f = size; g.font = weight + " " + f + "px " + fam; while (g.measureText(txt).width > w && f > min) { f -= 2; g.font = weight + " " + f + "px " + fam; } return g.font; };
const nm = cardName();
if (nm) outlined(nm, cx, 400, fitFont(nm, 520, 42, 26, 900, F.display), "#DF1B72", 10);
g.textAlign = "center"; g.fillStyle = "#25317A"; g.font = "700 52px " + F.zh; g.fillText(S.score > 0 ? "恭喜你儲到" : "我嘅淨資產", cx, 470);
g.fillStyle = "#5B516C"; g.font = "800 29px " + F.sans; g.fillText(S.score > 0 ? "I saved" : "My net worth", cx, 512);
const amt = fmt(S.score); outlined(amt, cx, 630 - dy / 2, fitFont(amt, 540, 120, 56, 900, F.display), "#1F9E4A", 14);
if (hasPct) {
g.save(); g.translate(cx, 692); g.rotate(-0.025);
g.shadowColor = "rgba(37,49,122,0.25)"; g.shadowOffsetY = 6; rr(-240, -33, 480, 66, 33); g.fillStyle = "#FFD23F"; g.fill(); g.shadowColor = "transparent";
g.lineWidth = 4; g.strokeStyle = "#fff"; g.stroke();
g.fillStyle = "#25317A"; g.font = "700 35px " + F.zh; const zt = "贏咗 " + S.pct + "% 玩家", et = " · Beat " + S.pct + "%";
const zw = g.measureText(zt).width; g.font = "900 27px " + F.sans; const ew = g.measureText(et).width, x0 = -(zw + ew) / 2;
g.textAlign = "left"; g.font = "700 35px " + F.zh; g.fillText(zt, x0, 12); g.font = "900 27px " + F.sans; g.fillStyle = "#5B3B00"; g.fillText(et, x0 + zw, 11);
g.restore(); g.textAlign = "center";
}
g.fillStyle = "#25317A"; g.font = "700 42px " + F.zh; g.fillText(top ? "成功退休！" : "去到「" + st.zh + "」", cx, 784 + dy);
g.fillStyle = "#5B516C"; g.font = "800 28px " + F.sans; g.fillText((top ? "Made it to Retirement" : "Reached " + st.en) + " · " + floorTxt(S.best / FLOOR), cx, 826 + dy);
[["spend", "#E8661F", "過度消費"], ["scam", "#7B5BE8", "騙局"], ["delay", "#2F86D6", "拖延"]].forEach(([k, col, zh], i) => {
const bx = 445 + i * 182, by = 860 + dy * 0.6; rr(bx, by, 170, 104, 26); g.fillStyle = col; g.fill();
g.fillStyle = "#fff"; g.font = "700 30px " + F.zh; g.fillText(zh, bx + 85, by + 42); g.font = "900 34px " + F.display; g.fillText(S.falls[k] ? "×" + S.falls[k] : "✓", bx + 85, by + 86);
});
const who = WHO === "jackie" ? "Jackie" : "Jack", Pc = personaOf(S.persona);
if (Pc) { g.fillStyle = "#25317A"; g.font = fitFont(who + " · " + Pc.zh, 300, 30, 20, 700, F.zh); g.fillText(who + " · " + Pc.zh, 247, 990); }
else { g.fillStyle = "#25317A"; g.font = "800 28px " + F.sans; g.fillText("Played as " + who, 247, 990); }
if (S.chal && S.chal.beat) {
const who = CHAL.n || "my friend";
g.save(); g.translate(232, 336); g.rotate(-0.12); g.shadowColor = "rgba(37,49,122,0.3)"; g.shadowOffsetY = 8;
rr(-170, -38, 340, 76, 24); g.fillStyle = "#DF1B72"; g.fill(); g.shadowColor = "transparent"; g.lineWidth = 5; g.strokeStyle = "#fff"; g.stroke();
g.fillStyle = "#fff"; g.textAlign = "center"; g.font = "700 30px " + F.zh; g.fillText("挑戰成功！", 0, -2);
g.font = fitFont("Beat " + who, 300, 24, 16, 900, F.sans); g.fillText("Beat " + who, 0, 27);
g.restore(); g.textAlign = "center";
}
g.save(); g.shadowColor = "rgba(37,49,122,0.3)"; g.shadowOffsetY = 10; rr(90, 1050, 900, 126, 40); g.fillStyle = "#25317A"; g.fill(); g.restore();
rr(262, 1028, 250, 44, 22); g.fillStyle = "#DF1B72"; g.fill();
g.fillStyle = "#fff"; g.font = "700 24px " + F.zh; g.fillText("我的稱號 · MY TITLE", 387, 1059);
if (medalPic) { g.save(); g.shadowColor = "rgba(20,30,90,0.45)"; g.shadowBlur = 14; g.shadowOffsetY = 6; g.drawImage(medalPic, 76, 980, 196, 230); g.restore(); }
else flatMedal(g, 173, 1118, 48, tierOf(v));
g.textAlign = "left"; g.fillStyle = "#fff"; g.font = fitFont(v.zh, 430, 56, 32, 700, F.zh); g.fillText(v.zh, 266, 1116);
const zw = g.measureText(v.zh).width; g.fillStyle = "#FFE7A0"; g.font = fitFont(v.en, Math.max(120, 690 - zw), 26, 16, 800, F.sans); g.fillText(v.en, 280 + zw, 1114);
g.fillStyle = "#DCE3FF"; g.font = fitFont(v.line[1], 690, 27, 18, 700, F.zh); g.fillText(v.line[1], 268, 1158); g.textAlign = "center";
rr(250, 1186, 580, 96, 48); g.fillStyle = "rgba(255,253,247,0.96)"; g.fill();
g.fillStyle = "#25317A"; g.font = "900 46px " + F.display; g.fillText("3fallcrab.com", CW / 2, 1250);
g.save(); g.shadowColor = "rgba(20,30,90,0.55)"; g.shadowBlur = 6; g.fillStyle = "#fff"; g.font = "700 26px " + F.zh; g.fillText("HSUHK 個人理財大使計劃 2026 · 3 Fall Crab 整冧咗team", CW / 2, 1326); g.restore();
return await new Promise((res, rej) => c.toBlob(b => b ? res(b) : rej(new Error("no image")), "image/jpeg", 0.92));
}
async function exportResult(share) {
const out = $("shareStatus");
out.textContent = cardBlob ? "" : "Making your picture… 製作緊…";
let blob;
try { blob = await readyCard(); } catch (e) { out.textContent = "Couldn't make the picture. 整唔到圖片。"; return; }
const file = new File([blob], blob.type === "image/png" ? "3fallfun-result.png" : "3fallfun-result.jpg", { type: blob.type || "image/jpeg" });
if (share && canShareFiles()) {
try { await navigator.share({ files: [file], title: "3 Fall Fun 人生跌塔", text: shareText() + "\n" + challengeUrl() }); out.textContent = "Shared 已分享"; A.sfx("uiDone"); return; }
catch (e) { if (e && e.name === "AbortError") { out.textContent = ""; return; } }
}
if (IAB) {
out.textContent = "Press and hold the picture, then choose Save. 長按圖片，揀「儲存圖片」。";
const img = $("cardImg"); img.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
img.classList.remove("hint"); void img.offsetWidth; img.classList.add("hint"); return;
}
const a = document.createElement("a"), url = URL.createObjectURL(blob);
a.href = url; a.download = cardBlob && cardBlob.type === "image/png" ? "3fallfun-result.png" : "3fallfun-result.jpg"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 5000);
out.textContent = "Saved to your device 已下載"; A.sfx("uiDone");
}
$("saveImg").addEventListener("click", () => exportResult(false));
$("shareImg").addEventListener("click", () => exportResult(true));
const verdictOf = st => CORE.verdictOf(st, TITLES, STAGES.length);
let medalP = null;
function loadMedal() {
if (medalP) return medalP;
const src = (document.querySelector('meta[name="tff-medal3d"]') || {}).content;
medalP = !src || /%%/.test(src) ? Promise.resolve(null) : new Promise(res => {
const sc = document.createElement("script"); sc.src = src; sc.async = true;
sc.onload = () => res(window.TFF_MEDAL3D || null); sc.onerror = () => res(null);
document.head.appendChild(sc);
});
return medalP;
}
setTimeout(function medalWhenIdle() {
if ((window.TFF_INTRO && TFF_INTRO.on()) || (S && S.mode === "playing")) { setTimeout(medalWhenIdle, 2500); return; }
const idle = window.requestIdleCallback || (f => setTimeout(f, 300));
idle(() => loadMedal().then(M => { if (M && M.warm && !(S && S.mode === "playing")) idle(() => { try { M.warm(null, () => !!S && S.mode === "playing"); } catch (e) { } }); }));
}, 3000);
function flatMedal(g, cx, cy, r, tier) {
const C = { gold: ["#FFE38A", "#FFBF2E", "#C98A12", "#FFF0A8"], silver: ["#F2F6FB", "#B9C6D6", "#7F8DA0", "#F4F8FF"], bronze: ["#F0A06A", "#C0652A", "#8A4317", "#F2B27A"] }[tier] || [];
g.save(); g.fillStyle = "#DF1B72"; g.beginPath(); g.moveTo(cx - r * 0.9, cy - r * 2); g.lineTo(cx - r * 0.1, cy - r * 0.6); g.lineTo(cx - r * 0.5, cy - r * 0.6); g.lineTo(cx - r * 1.3, cy - r * 2); g.fill();
g.beginPath(); g.moveTo(cx + r * 0.9, cy - r * 2); g.lineTo(cx + r * 0.1, cy - r * 0.6); g.lineTo(cx + r * 0.5, cy - r * 0.6); g.lineTo(cx + r * 1.3, cy - r * 2); g.fill();
const gr = g.createRadialGradient(cx - r * 0.3, cy - r * 0.35, r * 0.1, cx, cy, r); gr.addColorStop(0, C[0]); gr.addColorStop(0.55, C[1]); gr.addColorStop(1, C[2]);
g.fillStyle = gr; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill(); g.lineWidth = r * 0.12; g.strokeStyle = C[2]; g.stroke();
g.fillStyle = C[3]; g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.27 : r * 0.62; g.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); } g.fill();
g.restore();
}
function showVerdict(v) {
const box = $("heroVerdict"); box.hidden = !v; if (!v) return;
const nm = $("svName"), en = document.createElement("span"); en.className = "en"; en.lang = "en"; en.textContent = v.en;
nm.replaceChildren(v.zh, en);
bi($("svLine"), v.line[0], v.line[1]);
if (S && S.titled !== v.id) {
S.titled = v.id; const had = earnedTitles(), fresh = !had.includes(v.id);
if (fresh) lsSet("tff_titles", [...had, v.id]);
S.newHat = fresh ? HATS.find(h => h.title === v.id) || null : null;
}
const hat = S && S.newHat; $("svNew").hidden = !hat;
if (hat) bi($("svNew"), "New for your crab: " + hat.en + " (in the Wardrobe)", "蟹仔新造型：" + hat.zh + "（去衣櫃換）");
const mb = $("svMedal"); mb.dataset.tier = tierOf(v); mb.classList.remove("gl"); if (window.TFF_MEDAL3D) TFF_MEDAL3D.unmount();
setTimeout(() => loadMedal().then(M => {
if (!M || !S || S.verdict !== v || $("endModal").hidden) return;
try { if (M.mount(mb, tierOf(v), { still: reduceMotion })) mb.classList.add("gl"); } catch (e) { }
}), reduceMotion ? 0 : 950);
box.classList.remove("in"); void box.offsetWidth; box.classList.add("in");
if (!reduceMotion) setTimeout(() => { if (S && S.verdict === v && !$("endModal").hidden && S.step === 1) { A.sfx("stamp"); haptic(35, 0.6, 0.5); } }, 1050);
}
function fetchPct(game) {
game.pct = null; $("heroPct").hidden = true;
if (!apiAllowed || apiGone) return;
api(API + "?view=pct&score=" + Math.round(game.score)).then(j => {
if (S !== game || typeof j.pct !== "number" || !isFinite(j.pct)) return;
game.pct = Math.max(0, Math.min(99, Math.round(j.pct)));
showPct();
if (S.step === 4) showCard(); else if (cardBlob) readyCard().catch(() => { });
threadsLink();
}).catch(() => { });
}
function showPct() {
const el = $("heroPct"), p = S.pct; el.hidden = p == null; if (p == null) return;
const b = document.createElement("b"), z = document.createElement("span"), e = document.createElement("small");
z.lang = "zh-HK"; z.textContent = "贏咗"; b.textContent = p + "%"; const z2 = document.createElement("span"); z2.lang = "zh-HK"; z2.textContent = "玩家";
e.textContent = "Beat " + p + "% of players";
el.replaceChildren(z, b, z2, e); el.style.setProperty("--p", p + "%");
el.classList.remove("in"); void el.offsetWidth; el.classList.add("in");
}
function showChal() {
const el = $("heroChal"), c = S.chal; el.hidden = !c; if (!c) return;
const who = CHAL.n || "", whoZh = who || "你朋友", whoEn = who || "your friend";
el.classList.toggle("won", c.beat);
if (c.beat) bi(el, "You beat " + whoEn + "'s " + fmt(CHAL.s) + "!", "你贏咗" + zhIn(whoZh) + "！🎉");
else bi(el, fmt(c.gap) + " short of " + whoEn + " (" + fmt(CHAL.s) + ")", "仲差 " + fmt(c.gap) + " 就贏到" + zhIn(whoZh));
}
function challengeUrl(compact) {
const q = new URLSearchParams(); q.set("s", String(Math.round(S.score)));
const n = cardName(); if (n) q.set("n", n);
const v = S.verdict || verdictOf(S); if (v) q.set("v", v.id);
if (S.persona) q.set("p", personaKey(S.persona));
if (S.posted && myLastId) q.set("g", String(myLastId));
else if (!compact && S.sil && S.sil.length <= 240) q.set("sil", S.sil);
return location.origin + "/c?" + q.toString();
}
function shareText() {
const v = S.verdict || verdictOf(S), p = S.pct, c = S.chal;
const Pw = personaOf(S.persona);
const out = [(Pw ? "我抽到「" + Pw.zh + "」，" : "我") + "喺《3 Fall Fun 人生跌塔》儲到 " + fmt(S.score) + " 🦀", "稱號：「" + v.zh + "」— " + v.line[1]];
const who = c && CHAL.n ? CHAL.n : "我朋友";
if (c && c.beat) out.push("我贏咗" + zhIn(who) + " 😎 下一個係你");
else if (c) out.push("仲差 " + fmt(c.gap) + " 先贏到" + zhIn(who) + "…邊個幫我報仇？");
else if (p != null) out.push(p >= 50 ? "我算唔算已經贏咗" + p + "%香港人？" : "只係贏咗" + p + "%人…你夠膽同我比？");
else out.push("你又得唔得？");
out.push("你又攞到咩稱號？👇 身邊邊個係「" + v.zh + "」？Tag 佢！");
return out.join("\n");
}
const THREADS = "https://www.threads.com/intent/post";
function threadsLink() {
if (!S) return;
const a = $("threadsBtn"); a.href = THREADS + "?text=" + encodeURIComponent(shareText()) + "&url=" + encodeURIComponent(challengeUrl());
}
$("threadsBtn").addEventListener("click", () => {
threadsLink(); A.sfx("uiDone");
const out = $("shareStatus");
if (!IOS && !ANDROID && !IAB && cardBlob) {
const a = document.createElement("a"), url = URL.createObjectURL(cardBlob);
a.href = url; a.download = cardBlob && cardBlob.type === "image/png" ? "3fallfun-result.png" : "3fallfun-result.jpg"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 5000);
out.textContent = "Picture saved: add it to your post! 圖片已下載，記得一齊貼上！";
} else out.textContent = "Add your card picture to the post for more likes! 記得加埋結果卡圖片，多啲like！";
});
const FALL_BG = { spend: "var(--orange)", scam: "var(--purple)", delay: "var(--blue)" };
function renderStory() {
const name = (PRON[WHO] || PRON.jack).name, list = $("storyList"); list.replaceChildren();
$("storyHead").firstChild.textContent = name + "'s story";
const acts = [];
const actList = ai => {
if (acts[ai]) return acts[ai];
const sec = document.createElement("section"); sec.className = "story-act";
const h = document.createElement("h5"); const a = ACTS[ai]; h.textContent = "Act " + a.n + " · " + a.en + " "; const hz = document.createElement("span"); hz.lang = "zh-HK"; hz.textContent = a.zh; h.appendChild(hz);
const ol = document.createElement("ol"); ol.className = "story"; sec.append(h, ol); list.appendChild(sec); return (acts[ai] = ol);
};
S.choices.forEach((ch, n) => {
const c = CARD_BY.get(ch.card), later = c && laterOf(c, ch.pick, n); if (!later) return;
const trap = ch.pick === "wise" ? null : ch.pick === "risky" ? c.trap : "delay";
const li = document.createElement("li"); li.className = trap ? "bad" : "good";
const ic = svgUse(trap ? ICON[trap] : "i-good"); if (trap) { ic.style.background = FALL_BG[trap]; ic.style.borderRadius = "8px"; ic.style.padding = "2px"; }
const st = STAGES[c.st] || STAGES[0], b = document.createElement("div");
const h = document.createElement("span"); h.className = "sl-h";
const sg = document.createElement("small"); sg.textContent = st.en + " " + st.zh + " · " + (trap ? (ch.pick === "none" ? "Put off 拖咗" : TRAPS[trap].en + " " + TRAPS[trap].zh) : "Wise 明智");
const tg = document.createElement("b"); tg.textContent = c.tag ? c.tag[0] : c.en; const tz = document.createElement("span"); tz.lang = "zh-HK"; tz.textContent = c.tag ? c.tag[1] : c.zh; tg.append(" ", tz);
h.append(sg, tg);
const p = document.createElement("p"); p.textContent = tell(later[0]); const pz = document.createElement("small"); pz.lang = "zh-HK"; pz.textContent = tell(later[1]); p.appendChild(pz);
b.append(h, p); li.append(ic, b); actList(ACT_OF_STAGE[c.st] || 0).appendChild(li);
});
if (acts.length && !acts[2]) {
const nf = document.createElement("p"); nf.className = "story-nf"; nf.textContent = "Act III never filmed "; const z = document.createElement("span"); z.lang = "zh-HK"; z.textContent = "第三幕未開拍"; nf.appendChild(z); list.appendChild(nf);
}
list.hidden = !acts.length; const ol = list;
const E = ENDINGS[S.stage], end = $("storyEnd"), picks = S.wise + S.risky + S.missed, share = picks ? S.wise / picks : 0.5;
const k = share >= 0.7 ? "good" : share >= 0.4 ? "mixed" : "rough", P = personaOf(S.persona);
end.hidden = !(E && E[k]); end.replaceChildren();
if (E && E[k]) {
const lab = document.createElement("b"); lab.className = "os-lab"; lab.textContent = "THE END "; const lz = document.createElement("span"); lz.lang = "zh-HK"; lz.textContent = "劇終"; lab.appendChild(lz);
const z = document.createElement("small"); z.lang = "zh-HK"; z.textContent = tell(E[k][1], { nick: P && P.c.zh ? "「" + P.c.zh + "」" : "" });
end.append(lab, tell(E[k][0], { nick: P && P.c.en ? ", “" + P.c.en + "”," : "" }), z);
}
$("storySec").hidden = ol.hidden && end.hidden;
}
function showEnd() {
const st = STAGES[S.stage];
S.verdict = verdictOf(S); S.chal = CHAL ? { beat: Math.round(S.score) > CHAL.s, gap: Math.max(10, CHAL.s - Math.round(S.score)) } : null;
const top = S.stage === STAGES.length - 1;
$("stDate").textContent = "Statement · " + new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
$("endEyebrow").textContent = S.over === "drops" ? "整冧咗！ 3 items fell into the harbour" : "夠鐘！ Time's up";
$("endTitle").textContent = top ? "You made it to Retirement" : "You reached " + st.en;
const etz = document.createElement("span"); etz.className = "zh"; etz.textContent = top ? "成功退休！" : "去到「" + st.zh + "」"; $("endTitle").appendChild(etz);
const ft = S.falls.spend + S.falls.scam + S.falls.delay;
$("endSub").textContent = ft === 0 ? "No money traps at all! 一次都冇中伏！" : "You fell into " + ft + " money trap" + (ft > 1 ? "s" : "") + ". 中咗" + ft + "次伏。";
const rz = document.createElement("span"); rz.className = "zh"; rz.lang = "zh-HK"; rz.textContent = st.zh; $("rStage").replaceChildren(rz, st.en);
$("rNw").textContent = fmt(S.score);
$("rHeight").textContent = floorTxt(S.best / FLOOR);
const picks = S.wise + S.risky + S.missed; $("rWise").textContent = picks ? S.wise + " of " + picks : "—";
$("rCompRow").hidden = !(S.compounded > 0);
if (S.compounded > 0) {
$("rComp").textContent = "+" + fmt(S.compounded);
$("rCompRow").title = "Early-floor stage dividends + full emergency-fund interest · 早儲複息加應急錢儲滿利息";
}
$("rJpRow").hidden = S.jpAt < 0;
if (S.jpAt >= 0) { $("rJp").textContent = "+" + fmt(JACKPOT_BONUS + S.jpExtra); $("rJpRow").title = fmt(JACKPOT_BONUS) + " windfall + " + fmt(S.jpExtra) + " from jackpot time · 意外之財加大獎時間收入"; }
const fr = $("fallRep"); fr.replaceChildren();
const row = (icon, bg, title, sub, count) => {
const li = document.createElement("li"); const ic = svgUse(icon); ic.style.background = bg; ic.style.borderRadius = "8px"; ic.style.padding = "2px";
const m = document.createElement("span"); m.textContent = title; const s = document.createElement("small"); s.textContent = sub; m.appendChild(s);
const c = document.createElement("span"); c.className = "fc"; c.textContent = "×" + count; c.style.color = count ? "var(--red-d)" : "var(--green-t)";
li.append(ic, m, c); fr.appendChild(li);
};
const FALLS = [["spend", "i-spend", "var(--orange)"], ["scam", "i-scam", "var(--purple)"], ["delay", "i-delay", "var(--blue)"]];
for (const [k, icon, bg] of FALLS) if (S.falls[k]) row(icon, bg, TRAPS[k].en + " " + TRAPS[k].zh, TRAPS[k].d, S.falls[k]);
if (S.drops) row("i-drop", "#fff", "Items dropped 跌落海", "Each one cost HK$1,000 每件扣HK$1,000", S.drops);
const dodged = FALLS.filter(([k]) => !S.falls[k]);
if (dodged.length) {
const li = document.createElement("li"); li.className = "dodged";
const m = document.createElement("span"); m.textContent = dodged.length === 3 ? "Dodged all 3 Falls" : "Dodged: " + dodged.map(([k]) => TRAPS[k].en).join(", ");
const z = document.createElement("small"); z.textContent = dodged.length === 3 ? "三大陷阱全部避開" : "避開咗：" + dodged.map(([k]) => TRAPS[k].zh).join("、"); m.appendChild(z);
li.append(svgUse("i-good"), m); fr.appendChild(li);
}
const T = S.troll, RP = TR.report, tr = $("trollRep"); tr.replaceChildren();
const trow = (icon, bg, [en, zh, sub], val, bad, vars) => {
const li = document.createElement("li"); const ic = svgUse(icon); ic.style.background = bg; ic.style.borderRadius = "8px"; ic.style.padding = "2px";
const m = document.createElement("span"); m.textContent = en + " " + zh; const sm = document.createElement("small"); sm.textContent = sub.replace(/\{n\}/g, vars.n || "").replace(/\{k\}/g, vars.k || ""); m.appendChild(sm);
const c = document.createElement("span"); c.className = "fc"; c.textContent = val; c.style.color = bad ? "var(--red-d)" : "var(--green-t)";
li.append(ic, m, c); tr.appendChild(li);
};
if (T.reviveSeen) trow("i-drop", "#fff", T.revive ? RP.revive : RP.gaveUp, T.revive ? "✗" : "✓", T.revive, {});
if (T.invest) {
const lost = T.invest >= 2 ? INVEST + (T.invest === 3 ? FEE : 0) : 0;
trow("i-scam", "var(--purple)", lost ? RP.investLost : RP.investDodged, lost ? "−" + fmt(lost) : "✓", lost, { n: fmt(lost) });
}
if (T.ticketSeen) trow("i-spend", "var(--orange)", T.tickets ? RP.tickets : RP.ticketDodged, T.tickets ? "−" + fmt(T.tickets * TICKET) : "✓", T.tickets, { n: fmt(T.tickets * TICKET), k: T.tickets });
$("trollSec").hidden = !tr.children.length;
renderStory();
const qz = $("quiz"); qz.replaceChildren(); S.quiz = QUIZ.map(() => null);
const quizScore = () => { $("quizScore").textContent = S.quiz.filter(x => x && x.ok).length + "/" + QUIZ.length; };
quizScore();
S.prior = BOOTH ? 0 : Math.min(99, +lsGet("tff_quiz_n", 0) || 0);
QUIZ.forEach((q, qi) => {
const fs = document.createElement("fieldset"); fs.className = "qz";
const lg = document.createElement("legend"); lg.textContent = (qi + 1) + ". " + q.q[0];
const lz = document.createElement("small"); lz.textContent = q.q[1]; lg.appendChild(lz);
const box = document.createElement("div"); box.className = "qopts";
const fb = document.createElement("p"); fb.className = "qfb"; fb.setAttribute("role", "status");
const order = q.o.map((_, idx) => idx);
for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[order[i], order[j]] = [order[j], order[i]]; }
order.forEach(oi => {
const o = q.o[oi];
const b = document.createElement("button"); b.type = "button"; b.className = "qopt"; b.dataset.oi = String(oi);
b.textContent = o[0]; const z = document.createElement("small"); z.textContent = o[1]; b.appendChild(z);
b.addEventListener("click", () => {
if (S.quiz[qi]) return;
const ok = oi === q.a; S.quiz[qi] = { pick: oi, ok }; A.sfx(ok ? "deposit" : "risky"); haptic(ok ? [12, 25, 22] : [30, 35, 45], ok ? 0.35 : 0.6, 0.5);
[...box.children].forEach(bb => { const bj = +bb.dataset.oi; bb.setAttribute("aria-disabled", "true"); bb.classList.add(bj === q.a ? "is-right" : bj === oi ? "is-wrong" : "is-dim"); });
b.setAttribute("aria-pressed", "true");
const head = document.createElement("b"); head.className = "qh";
head.append(svgUse(ok ? "i-good" : "i-bad"), ok ? "Correct!" : "Not quite. The answer is “" + q.o[q.a][0] + "”");
const hz = document.createElement("small"); hz.className = "qhz"; hz.textContent = ok ? "答啱咗！" : "答錯咗，答案係「" + q.o[q.a][1] + "」";
const why = document.createElement("span"); why.textContent = q.why[0];
const wz = document.createElement("small"); wz.textContent = q.why[1];
fb.className = "qfb " + (ok ? "ok" : "no"); fb.replaceChildren(head, hz, why, wz);
if (!S.quizDone && S.quiz.every(Boolean)) { S.quizDone = true; if (!BOOTH) lsSet("tff_quiz_n", (+lsGet("tff_quiz_n", 0) || 0) + 1); }
if (S.step === 2) stepButtons();
quizScore(); saveSoon();
});
box.appendChild(b);
});
fs.append(lg, box, fb); qz.appendChild(fs);
});
const hb = $("habits"); hb.replaceChildren(); S.habit = null;
HABITS.forEach(h => {
const lab = document.createElement("label"); lab.className = "habit";
const inp = document.createElement("input"); inp.type = "radio"; inp.name = "habit"; inp.value = h.id; inp.id = "habit_" + h.id;
inp.addEventListener("change", () => { if (inp.checked) { S.habit = h.id; A.sfx("uiSelect"); saveSoon(); if (S.step === 2) stepButtons(); } });
const t = document.createElement("span"); t.textContent = h.en; const z = document.createElement("small"); z.textContent = h.zh; t.appendChild(z);
lab.append(inp, t); hb.appendChild(lab);
});
$("nickname").value = BOOTH ? "" : lsGet("tff_name", "");
const live = apiAllowed && !apiGone && dbWritable;
$("email").value = BOOTH ? "" : lsGet("tff_email", ""); emailError(false); $("email").closest(".fld").hidden = $("emailNote").closest(".email-note").hidden = !live;
$("postBtn").disabled = false; $("postBtn").removeAttribute("aria-disabled"); postLabel("Post score", "上榜");
const ps = $("postStatus"); ps.className = "post-status";
ps.textContent = live ? "Only your nickname and score will appear on the leaderboard. 排行榜只會顯示你的暱稱及分數。" : "Your score will be saved on this device only. 分數只會儲存在這部裝置。";
try {
const cr = $("endCredits");
if (cr) {
cr.replaceChildren();
const credit = (role, who, sub) => {
const li = document.createElement("li");
const r = document.createElement("span"); r.className = "role"; r.textContent = role;
const w = document.createElement("span"); w.className = "cwho"; w.textContent = who;
if (sub) { const sm = document.createElement("small"); sm.textContent = sub; w.appendChild(sm); }
li.append(r, w); cr.appendChild(li);
};
const P = typeof personaOf === "function" ? personaOf(S.persona) : null;
credit("Directed by", "你", P && P.zh ? P.zh : (WHO === "jackie" ? "Jackie" : "Jack"));
const hits = [];
if (S.falls.spend) hits.push(TRAPS.spend.zh);
if (S.falls.scam) hits.push(TRAPS.scam.zh);
if (S.falls.delay) hits.push(TRAPS.delay.zh);
credit("Starring", hits.length ? hits.join(" · ") : "無", hits.length ? hits.length + " 次中伏" : "一次都冇中伏");
const fell = S.lost && S.lost.length ? S.lost[S.lost.length - 1] : null;
if (fell) credit("Final take", fell.zh || fell.en || "", fell.en && fell.zh ? fell.en : "");
else credit("Final take", "夠鐘", "Time's up");
credit("Take", String(takes));
credit("The end", "《3 Fall Fun》", "人生跌塔");
}
} catch (e) { }
$("endModal").hidden = false; $("stScroll").scrollTop = 0; endScroll = 0;
S.flowDone = false; setStep(1, false); heroUp(); showVerdict(S.verdict); showChal();
const P = personaOf(S.persona), hw = $("heroWho"); hw.hidden = !P;
if (P) { const z = document.createElement("span"); z.lang = "zh-HK"; z.textContent = "你抽到：" + P.zh; hw.replaceChildren(z, P.c.en || P.en); }
fitLine($("endTitle"));
endShownAt = performance.now(); modalOpen(true);
$("endTitle").focus({ preventScroll: true });
const game = S; game.rec = newRecord();
fetchPct(game);
setTimeout(() => { if (S === game && (S.mode === "over" || S.mode === "idle")) menuMusic(); }, 3200);
saveRecord(game).catch(e => keepForLater(game, e));
planFirst();
if (BOOTH) bumpBooth();
}
const API = "/api/scores";
const apiAllowed = /^https?:$/.test(location.protocol);
let db = null, dbWritable = true, tab = "week", lbAll = [], lbWeek = [], myLastId = null, myLocalAt = null;
let liveWeek = null, lbSig = "", pollTimer = 0, pollFails = 0, apiGone = false, lbVisible = true, lastFetch = -1e9, fetching = null;
const localWeek = () => isoWeek(new Date());
const curWeek = () => liveWeek || localWeek();
const localScores = () => lsGet("tff_scores_v3", []);
const localList = () => { const wk = localWeek(); return localScores().filter(e => tab === "all" || e.week === wk); };
const myIds = new Set(lsGet("tff_my_ids", []));
let myPost = lsGet("tff_my_post", null);
function bi(el, en, zh) { const z = document.createElement("span"); z.className = "zl"; z.lang = "zh-HK"; z.textContent = zh; el.replaceChildren(en, z); return el; }
CHAL = (() => {
const m = document.querySelector('meta[name="tff-chal"]');
const out = parseChallenge({
metaJson: m ? m.getAttribute("content") : null,
search: location.search,
storedJson: ssGet("tff_chal"),
titles: TITLES,
isValidPersona: p => { const [bg, pe] = p.split("+"); return !!personaOf({ bg, pe }); }
});
if (out) ssSet("tff_chal", JSON.stringify({ s: out.s, n: out.n, v: out.v ? out.v.id : "", p: out.p, sil: out.sil }));
return out;
})();
(function chalBanner() {
const box = $("chal"); if (!CHAL) { box.hidden = true; return; }
const who = CHAL.n, v = CHAL.v;
const amt = document.createElement("b"); amt.textContent = fmt(CHAL.s);
const t = $("chalT"); t.replaceChildren(zhName(who || "你朋友") + "儲到 ", amt);
if (v) { const i = document.createElement("i"); i.textContent = v.zh; t.append(i); }
const Pp = CHAL.p ? personaOf({ bg: CHAL.p.split("+")[0], pe: CHAL.p.split("+")[1] }) : null;
if (Pp) { const sp = document.createElement("span"); sp.textContent = " · " + Pp.zh; t.append(sp); }
const z = document.createElement("span"); z.lang = "zh-HK"; z.textContent = "你夠唔夠膽挑戰？";
$("chalE").replaceChildren(z, "Can you beat " + (who || "your friend") + "?");
box.hidden = false; root.classList.add("chal");
})();
function chalCheck() {
if (!CHAL || !S || S.chalSaid || S.mode !== "playing" || CHAL.s <= 0 || S.score <= CHAL.s) return;
S.chalSaid = true; const who = CHAL.n;
stamp("You beat " + (who || "your friend") + "!", "贏咗" + zhIn(who || "你朋友") + "！", "gold"); A.sfx("rival"); haptic([25, 35, 45], 0.6, 0.7); mood("happy", 2200);
quip(who ? "chalBeat" : "chalBeatAnon", 3, who);
}
async function api(url, opts = {}) {
const ctl = typeof AbortController === "function" ? new AbortController() : null;
const to = ctl ? setTimeout(() => ctl.abort(), 9000) : 0;
try {
const r = await fetch(url, {
...opts, cache: "no-store", credentials: "same-origin", signal: ctl ? ctl.signal : undefined,
headers: { accept: "application/json", ...(opts.headers || {}) }
});
let j = null;
try { const t = await r.text(); const v = JSON.parse(t); if (v && typeof v === "object" && "ok" in v) j = v; } catch (e) { }
if (!j) { const e = new Error("no api"); e.status = r.status; e.noApi = true; throw e; }
if (!r.ok || j.ok !== true) { const e = new Error(j.error || "HTTP " + r.status); e.status = r.status; e.code = j.error; throw e; }
return j;
} finally { if (to) clearTimeout(to); }
}
function refreshLB(force) {
if (apiGone || !apiAllowed) return Promise.resolve(false);
if (fetching) return force ? fetching.then(() => refreshLB()) : fetching;
lastFetch = performance.now();
fetching = api(API).then(j => {
const first = !db;
db = db || { live: true }; liveWeek = j.week || null; dbWritable = !j.closed; window.__tffServerHold = !!j.onHold;
lbWeek = (j.weekTop || []).map(e => ({ ...e, _id: e.id }));
lbAll = (j.allTop || []).map(e => ({ ...e, _id: e.id }));
if (tab !== "insights" || first) renderLB();
flushOutboxSoon();
return true;
}).catch(e => {
if (e.code === "no_database" || e.code === "static_only") apiGone = true;
if (!db && tab !== "insights") renderLB();
return false;
}).finally(() => { fetching = null; });
return fetching;
}
function schedulePoll(ms) {
clearTimeout(pollTimer); if (apiGone || !apiAllowed) return;
pollTimer = setTimeout(async () => {
if (document.visibilityState === "visible" && lbVisible) { pollFails = (await refreshLB()) ? 0 : pollFails + 1; }
schedulePoll(45000 * Math.pow(2, Math.min(pollFails, 3)));
}, ms);
}
const hex = n => { const a = new Uint8Array(n); crypto.getRandomValues(a); return Array.from(a, b => b.toString(16).padStart(2, "0")).join(""); };
const newRecord = () => ({ gid: hex(16), key: hex(24), board: false, name: "", email: "", sent: "", last: null, chain: Promise.resolve(), timer: 0 });
const answersOf = st => st.quiz.flatMap((x, i) => x ? [{ q: QUIZ[i].id, pick: x.pick }] : []);
function recordBody(st) {
const r = st.rec;
return {
gid: r.gid, key: r.key, board: r.board, name: r.board ? r.name : undefined, email: r.board && r.email ? r.email : undefined,
score: Math.round(st.score), stage: st.stage, height: +(st.best / FLOOR).toFixed(1), drops: st.drops,
wise: st.wise, risky: st.risky, missed: st.missed, falls: { ...st.falls }, choices: st.choices.slice(0, 20), ended: st.over,
answers: answersOf(st), habit: st.habit || null,
items: st.items, real_ms: Math.round(st.realMs), at: st.endAt || undefined, prior: st.prior,
jackpot: st.jpAt >= 0 ? 1 : 0,
avatar: WHO,
sil: st.sil || undefined,
title: st.verdict ? st.verdict.id : undefined,
via: CHAL ? "c" : undefined,
persona: st.persona ? personaKey(st.persona) : undefined,
troll_revive: st.troll.reviveSeen ? st.troll.revive : null, troll_invest: st.troll.invest, troll_tickets: st.troll.ticketSeen ? st.troll.tickets : null
};
}
function saveRecord(st, opts = {}) {
const r = st.rec; if (!r) return Promise.resolve(null);
clearTimeout(r.timer); r.timer = 0;
const run = async () => {
if (!db && apiAllowed && !apiGone) await refreshLB();
if (!db || !dbWritable) { const e = new Error("offline"); e.offline = true; if (db) e.code = "closed"; throw e; }
const body = JSON.stringify(recordBody(st));
if (body === r.sent) return r.last;
const j = await api(API, { method: "POST", headers: { "content-type": "application/json" }, body, keepalive: !!opts.keepalive });
r.sent = body; r.last = j; dropOutbox(r.gid); flushOutboxSoon();
return j;
};
const p = r.chain.then(run);
r.chain = p.catch(() => { });
return p;
}
function saveSoon() {
const st = S, r = st && st.rec; if (!r) return;
clearTimeout(r.timer);
r.timer = setTimeout(() => { r.timer = 0; saveRecord(st).catch(e => keepForLater(st, e)); }, 700);
}
function flushRecord(st, leaving) {
const r = st && st.rec; if (!r || !r.timer) return;
saveRecord(st, { keepalive: leaving }).catch(e => keepForLater(st, e));
}
const OUTBOX = "tff_outbox";
function keepForLater(st, e) {
if (!apiAllowed || apiGone || !st.rec) return;
if (e && (e.code === "closed" || e.code === "locked" || e.code === "bad_key" || (e.status >= 400 && e.status < 500 && e.status !== 429))) return;
const body = recordBody(st); body.board = false; delete body.name; delete body.email;
body.t = Date.now();
lsSet(OUTBOX, lsGet(OUTBOX, []).filter(x => x.gid !== body.gid).concat([body]).slice(-100));
}
function dropOutbox(gid) { const box = lsGet(OUTBOX, []); if (box.some(x => x.gid === gid)) lsSet(OUTBOX, box.filter(x => x.gid !== gid)); }
async function flushOutbox() {
const all = lsGet(OUTBOX, []), box = all.filter(x => x && x.gid && Date.now() - (x.t || 0) < 2 * 86400000);
if (box.length !== all.length) lsSet(OUTBOX, box);
if (!box.length || !db || !dbWritable) return;
for (const x of box) {
const body = { ...x }; delete body.t;
try { await api(API, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }); dropOutbox(x.gid); }
catch (e) { if (e.status >= 400 && e.status < 500 && e.status !== 429) dropOutbox(x.gid); else break; }
}
}
let flushing = null;
function flushOutboxSoon() { if (!flushing) flushing = flushOutbox().catch(() => { }).finally(() => { flushing = null; }); }
function postLabel(en, zh) { const b = $("postBtn"); b.firstChild.textContent = en; b.querySelector(".zh").textContent = zh; }
const EMAIL_OK = /^[^\s@<>()[\]\\,;:"]{1,64}@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:".]{2,}$/;
function emailError(on) {
const em = $("email"), notes = ["emailNote", "privacyNote"].filter(id => $(id)).join(" ");
em.classList.toggle("bad", on);
if (on) em.setAttribute("aria-invalid", "true"); else em.removeAttribute("aria-invalid");
em.setAttribute("aria-describedby", (on ? "postStatus " : "") + notes);
}
const showStatus = () => requestAnimationFrame(() => {
const box = $("stScroll"), over = $("postStatus").getBoundingClientRect().bottom - box.getBoundingClientRect().bottom + 8;
if (over > 0) box.scrollBy({ top: over, behavior: reduceMotion ? "auto" : "smooth" });
});
$("postBtn").addEventListener("click", async () => {
const st = S; if (st.posted || st.posting) return;
const ps = $("postStatus"), btn = $("postBtn"), em = $("email");
const email = em.closest(".fld").hidden ? "" : em.value.trim(), nick = $("nickname");
nick.classList.remove("bad"); nick.removeAttribute("aria-invalid");
if (!$("nickname").value.trim()) {
nick.classList.add("bad"); nick.setAttribute("aria-invalid", "true"); nick.focus(); ps.className = "post-status bad";
ps.textContent = "Add a nickname to post your score. 請填暱稱先可以上榜。"; return;
}
if (!em.closest(".fld").hidden && (!email || email.length > 254 || !EMAIL_OK.test(email))) {
emailError(true); em.focus(); ps.className = "post-status bad";
ps.textContent = email ? "That email doesn't look right. Please check it. 電郵地址好似唔啱，請再檢查。" : "Add your email to post: it's how we reach prize winners. 請填電郵先可以上榜，我哋會用嚟聯絡得獎者。";
return;
}
emailError(false); st.posting = true;
const name = sanitizeName($("nickname").value); if (!BOOTH) lsSet("tff_name", name === ANON ? "" : name);
if (email && !BOOTH) lsSet("tff_email", email);
const answers = answersOf(st), right = st.quiz.filter(x => x && x.ok).length;
const entry = {
name, score: Math.round(st.score), stage: st.stage, height: +(st.best / FLOOR).toFixed(1), drops: st.drops,
wise: st.wise, risky: st.risky, missed: st.missed, falls: { ...st.falls }, choices: st.choices.slice(0, 20), habit: st.habit || null,
title: st.verdict ? st.verdict.id : undefined, persona: st.persona ? personaKey(st.persona) : undefined,
answers, quiz: answers.length ? right : null, ended: st.over, at: new Date().toISOString(), week: localWeek()
};
btn.setAttribute("aria-disabled", "true"); postLabel("Posting…", "上載中"); ps.className = "post-status";
if (!db && apiAllowed && !apiGone) await refreshLB();
const saveLocal = () => { const arr = localScores(); arr.push(entry); lsSet("tff_scores_v3", arr.slice(-100)); };
if (db && dbWritable) {
const r = st.rec || (st.rec = newRecord());
r.board = true; r.name = name; r.email = email;
try {
const j = await saveRecord(st);
myLastId = j.id; myIds.add(j.id); lsSet("tff_my_ids", [...myIds].slice(-30)); st.posted = true; st.posting = false; st.boardName = j.name || name;
myPost = { id: j.id, rank: j.rank || (j.rankCap || 500) + 1, week: j.week, name: j.name || name, score: entry.score, height: entry.height, title: entry.title, persona: entry.persona }; lsSet("tff_my_post", myPost);
if (st === S) {
A.sfx("post"); ps.className = "post-status ok";
ps.textContent = (j.rank ? "You're #" + j.rank + " this week! 今個星期排第" + j.rank + "！ " : "On the live board! 已上榜！ ") +
(email ? "We'll email you if you win a prize. 如果你得獎，我哋會電郵通知你。" : "");
postLabel("Posted ✓", "已上榜"); showStatus(); cardBlob = null; stepButtons(); threadsLink();
setTimeout(() => { if (st === S && S.step === 3) setStep(4); }, 1600);
}
lbSig = ""; refreshLB(true);
return;
} catch (e) {
r.board = false; r.name = ""; r.email = "";
if (e.code === "bad_email") {
st.posting = false;
if (st === S) {
btn.removeAttribute("aria-disabled"); postLabel("Post score", "上榜"); emailError(true); em.focus(); ps.className = "post-status bad";
ps.textContent = "That email doesn't look right. Please check it. 電郵地址好似唔啱，請再檢查。";
}
return;
}
if (e.status === 429 && (st.holdRetries || 0) < 2) {
st.holdRetries = (st.holdRetries || 0) + 1;
btn.setAttribute("aria-disabled", "true");
let left = 3;
const tickHold = () => {
if (st !== S || !st.posting) return;
postLabel(`On hold (${left}s)…`, `排隊中 (${left}秒)…`);
ps.className = "post-status";
ps.textContent = `High traffic — holding your spot in line, auto-posting in ${left}s… 太多人同時上榜，系統正自動為你排隊（${left}秒後自動上載）…`;
showStatus();
if (left-- > 0) { setTimeout(tickHold, 1000); return; }
st.posting = false;
btn.click();
};
tickHold();
return;
}
if (!e.status || e.status === 429 || (e.status >= 500 && e.code !== "no_database")) {
st.posting = false;
if (st === S) {
btn.removeAttribute("aria-disabled"); postLabel("Try again", "再試");
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
if (st === S) { A.sfx("post"); ps.className = "post-status ok"; postLabel("Saved ✓", "已儲存"); showStatus(); cardBlob = null; stepButtons(); setTimeout(() => { if (st === S && S.step === 3) setStep(4); }, 1600); }
lbSig = ""; renderLB();
});
document.querySelectorAll(".tab").forEach(b => b.addEventListener("click", () => {
tab = b.dataset.tab; document.querySelectorAll(".tab").forEach(x => x.setAttribute("aria-pressed", String(x === b))); renderLB();
if (tab !== "insights" && performance.now() - lastFetch > 15000) refreshLB();
}));
function lbRow(e, rank, mine) {
const li = document.createElement("li"); if (mine) li.className = "me";
const r = document.createElement("span"); r.className = "r"; r.textContent = rank;
const n = document.createElement("span"); n.className = "n"; n.textContent = sanitizeName(e.name);
const tv = e.title && TITLES.find(t => t.id === e.title), pv = e.persona && personaOf({ bg: String(e.persona).split("+")[0], pe: String(e.persona).split("+")[1] });
if (tv || pv) {
const sub = document.createElement("small"); sub.className = "lb-sub";
sub.textContent = [pv && pv.zh, tv && tv.zh].filter(Boolean).join(" · ");
sub.title = [pv && (pv.c.en || pv.en), tv && tv.en].filter(Boolean).join(" · ");
n.appendChild(sub);
}
const f = document.createElement("span"); f.className = "fl"; f.textContent = typeof e.height === "number" ? floorTxt(e.height) : "";
const s = document.createElement("span"); s.className = "s"; s.textContent = fmt(Number(e.score) || 0);
li.append(r, n, f, s); return li;
}
function lbRows(list, extra) {
const body = $("lbBody"); body.replaceChildren();
if (!list.length) { const p = document.createElement("p"); p.className = "lb-empty"; bi(p, "No scores yet. Be the first crab on the board.", "仲未有人上榜，做第一隻蟹！"); body.appendChild(p); return; }
const ol = document.createElement("ol"); ol.className = "lb";
list.slice(0, 10).forEach((e, i) => {
ol.appendChild(lbRow(e, i + 1, (e._id != null && (e._id === myLastId || myIds.has(e._id))) || (e._id == null && e.at && e.at === myLocalAt)));
});
if (extra) {
const sep = document.createElement("li"); sep.className = "sep"; sep.setAttribute("aria-hidden", "true"); sep.textContent = "···"; ol.appendChild(sep);
const you = lbRow(extra, extra.rank > 500 ? "500+" : extra.rank > 10 ? extra.rank : "10+", true); you.classList.add("you");
you.title = "Your latest score this week, ranked when you posted 你今個星期最新嘅分數"; ol.appendChild(you);
}
body.appendChild(ol);
}
function weekDates(key) {
const m = /^(\d{4})-W(\d{1,2})$/.exec(key || ""); if (!m) return null;
const jan4 = Date.UTC(+m[1], 0, 4), dow = (new Date(jan4).getUTCDay() + 6) % 7, mon = new Date(jan4 - dow * 864e5 + (+m[2] - 1) * 7 * 864e5), sun = new Date(mon.getTime() + 6 * 864e5);
const en = d => d.getUTCDate() + " " + d.toLocaleString("en-GB", { month: "short", timeZone: "UTC" });
const zh = (d, withMonth) => (withMonth ? (d.getUTCMonth() + 1) + "月" : "") + d.getUTCDate() + "日";
const same = mon.getUTCMonth() === sun.getUTCMonth();
return [(same ? mon.getUTCDate() : en(mon)) + "–" + en(sun), zh(mon, true) + "至" + zh(sun, !same)];
}
function renderLB() {
const note = $("lbNote");
if (tab === "insights") { lbSig = ""; renderInsights(); return; }
let list, txt;
if (db) {
list = tab === "week" ? lbWeek : lbAll;
if (!dbWritable) list = list.concat(localList());
const wd = weekDates(curWeek());
txt = tab === "week" ? "This week" + (wd ? ", " + wd[0] : "") + " · a new board every Monday 本週" + (wd ? "（" + wd[1] + "）" : "") + "，逢星期一重新計算" : "All-time, every player 所有玩家總排名";
}
else { list = localList(); txt = "Scores on this device 本機紀錄"; }
list = list.slice().sort((a, b) => (b.score || 0) - (a.score || 0));
const extra = db && tab === "week" && myPost && myPost.week === curWeek() && myPost.rank > 0 && !list.slice(0, 10).some(e => e._id === myPost.id) ? myPost : null;
const sig = tab + "|" + txt + "|" + myLastId + "|" + myLocalAt + "|" + (extra ? extra.id : "") + "|" + list.slice(0, 10).map(e => (e._id != null ? e._id : e.at) + ":" + e.score + ":" + e.name + ":" + (e.title || "") + ":" + (e.persona || "")).join(",");
if (sig === lbSig) return;
lbSig = sig; lbRows(list, extra); note.textContent = txt;
}
function bar(label, val, max, cls) {
const d = document.createElement("div"); d.className = "bar2" + (cls ? " " + cls : "");
const l = document.createElement("span"); l.textContent = label;
const v = document.createElement("b"); v.textContent = String(val);
const tr = document.createElement("span"); tr.className = "track"; const i = document.createElement("i");
i.style.width = (max ? Math.round(100 * (parseFloat(val) || 0) / max) : 0) + "%"; tr.appendChild(i);
d.append(l, v, tr); return d;
}
const aggregate = games => CORE.aggregateStats(games, QUIZ.length, window.TFF_CONTENT.habitNow);
const addAgg = (a, b) => CORE.mergeStats(a, b);
async function renderInsights() {
const body = $("lbBody"), note = $("lbNote");
body.replaceChildren(); const p = document.createElement("p"); p.className = "lb-empty"; p.textContent = "Loading… 載入中"; body.appendChild(p);
let agg, label;
if (db) {
try { const j = await api(API + "?view=stats"); agg = addAgg(aggregate([]), j.stats); agg.sample = !!j.stats.sample; } catch (e) { agg = aggregate([]); }
if (!dbWritable) agg = addAgg(agg, aggregate(localScores()));
label = agg.games ? (agg.sample ? "From the latest " : "From ") + agg.games + " game" + (agg.games === 1 ? "" : "s") + ", anonymised 匿名數據" : "";
} else { agg = aggregate(localScores()); label = "From games saved on this device 本機數據"; }
if (tab !== "insights") return;
note.textContent = label;
body.replaceChildren();
if (!agg.games) { const q = document.createElement("p"); q.className = "lb-empty"; bi(q, "Insights appear once players post scores.", "有人上榜後就會見到數據。"); body.appendChild(q); return; }
const falls = agg.falls, total = agg.wise + agg.risky + agg.missed;
const wrap = document.createElement("div"); wrap.className = "insight";
wrap.appendChild(bar("Wise choices 明智選擇", (total ? Math.round(100 * agg.wise / total) : 0) + "%", 100));
const fmax = Math.max(1, falls.spend, falls.scam, falls.delay);
for (const kk in falls) wrap.appendChild(bar(TRAPS[kk].en + " " + TRAPS[kk].zh, String(falls[kk]), fmax, "t-" + kk));
const topFall = Object.entries(falls).sort((a, b) => b[1] - a[1])[0];
const hl = document.createElement("p"); hl.style.margin = "2px 0 0";
if (topFall[1]) bi(hl, "Most common fall: " + TRAPS[topFall[0]].en, "最多人中嘅陷阱：" + TRAPS[topFall[0]].zh); else bi(hl, "No falls recorded yet.", "暫時冇人中伏。");
wrap.appendChild(hl);
const topHabit = Object.entries(agg.habits).sort((a, b) => b[1] - a[1])[0];
if (topHabit) { const h = HABITS.find(x => x.id === topHabit[0]); const hp = document.createElement("p"); hp.style.margin = "0"; bi(hp, "Top habit pledged: " + (h ? h.en : topHabit[0]) + " (" + topHabit[1] + ")", h ? "最多人揀嘅習慣：" + h.zh : ""); wrap.appendChild(hp); }
if (agg.quizN) {
const qp = document.createElement("p"); qp.style.margin = "0"; const pass = Math.round(100 * agg.quizPass / agg.quizN);
bi(qp, "Quiz: " + pass + "% got 2 or 3 right · average " + (agg.quizSum / agg.quizN).toFixed(1) + "/3 · " + agg.quizN + " player" + (agg.quizN === 1 ? "" : "s"),
"測驗：有" + pass + "%人答啱2題或以上，平均" + (agg.quizSum / agg.quizN).toFixed(1) + "/3，共" + agg.quizN + "人");
wrap.appendChild(qp);
}
body.appendChild(wrap);
}
async function initDB() {
if (!apiAllowed) { renderLB(); return; }
const body = $("lbBody"); body.replaceChildren(); const p = document.createElement("p"); p.className = "lb-empty"; p.textContent = "Loading the live board… 載入排行榜中"; body.appendChild(p);
await refreshLB();
if (apiGone) return;
schedulePoll(45000);
window.addEventListener("online", () => { flushOutboxSoon(); refreshLB(true); });
document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible" && performance.now() - lastFetch > 20000) refreshLB(); });
if ("IntersectionObserver" in window) {
new IntersectionObserver(es => {
lbVisible = es.some(e => e.isIntersecting);
if (lbVisible && performance.now() - lastFetch > 20000) refreshLB();
}).observe(document.querySelector(".lbx"));
}
}
const TOWER = [["lunchbox", 152.06, -21.076, -0.0027, 52], ["textbooks", 261.858, -20.288, 0.0062, 24], ["steamer", 180.307, -68.17, -0.0086, 44],
["piggybank", 281.871, -76.162, 0.0083, 62], ["handbag", 224.615, -131.694, -0.0968, 52]];
function sampleTower() {
S = newState(); makeEngine();
const pick = id => DEFS.find(d => d.id === id);
const points = b => b.parts.reduce((s, q, i) => s + (i || b.parts.length === 1 ? q.vertices.length : 0), 0);
const placed = TOWER.every(([id, x, y, a, n]) => {
const def = pick(id); if (!def) return false;
const b = addItem(def, x, y, false); Body.setAngle(b, a); Body.setPosition(b, { x, y }); Sleeping.set(b, true);
return points(b) === n;
});
if (!placed) {
for (const b of engine.world.bodies.slice()) if (b.tff) Composite.remove(engine.world, b);
const plan = [["lunchbox", -70, -26], ["textbooks", 42, -24], ["steamer", -40, -70], ["piggybank", 60, -75], ["calculator", -80, -120],
["handbag", 10, -125], ["bubbletea", 80, -140], ["football", -30, -175], ["passbook", 40, -190]];
const fallback = DEFS.filter(d => d.kind !== "debt");
plan.forEach(([id, x, y], i) => {
const def = pick(id) || fallback[i % fallback.length]; if (!def) return;
addItem(def, W / 2 + x, y, false); for (let s = 0; s < 45; s++) Engine.update(engine, STEP);
});
for (let s = 0; s < 200; s++) Engine.update(engine, STEP);
for (const b of engine.world.bodies.slice()) if (b.tff && b.position.y > WATER_Y) Composite.remove(engine.world, b);
}
let h = 0; for (const b of engine.world.bodies) if (b.tff && b.position.y < 5) h = Math.max(h, -b.bounds.min.y);
S.height = h; S.camTop = Math.min(camBase(), -h - 330);
S.queue = [pick("football") || fallback[0], pick("textbooks") || fallback[1] || fallback[0], pick("banana") || fallback[2] || fallback[0]];
crab("Hi! I'm the 3 Fall Crab. Every item you stack is a money decision.", "我係3 Fall Crab！你疊嘅每件嘢，都係一個理財決定。");
}
fsOn = !!lsGet("tff_fs", true); root.classList.toggle("fs", fsOn); root.classList.toggle("title", fsOn); $("fsBtn").setAttribute("aria-pressed", String(fsOn));
buildStatic(); sampleTower(); resize(); drawCrabs(); updateHUD(); renderLedger(); setMuteUI(); planFirst();
if (AV && AV.onCast) AV.onCast(() => {
avKeys.clear(); buildLayers(false, "crab"); drawCrabs(); talk.mood = null; needDraw = true;
if (S && S.mode !== "idle") updateAvatar(true);
if (!$("pickModal").hidden) setPick(pickSel, true);
if (!$("rollModal").hidden) paintAvatar($("rollAvatar"), { who: WHO, stage: 0, tier: 1, hand: null, mood: "happy", drops: 0, boost: false });
if (!$("endModal").hidden) paintAvatar($("endAvatar"), lookNow());
});
document.querySelectorAll(".falls .clip").forEach(clipAdd);
markZh(document.body); zhWatch.observe(document.body, ZH_WATCH);
const syncTimer = () => document.querySelectorAll(".ctime input").forEach(r => { r.checked = r.value === (slowRead ? "30" : "10"); });
document.querySelectorAll(".ctime input").forEach(r => r.addEventListener("change", () => {
A.sfx("uiToggle");
if (!r.checked) return;
slowRead = r.value === "30"; lsSet("tff_slow_read", slowRead); syncTimer();
}));
syncTimer();
initDB();
if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")) {
window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => { }));
}
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => {
for (const s of SPR.values()) if (s.text) s.k = -1;
buildLayers(true, "plat"); needDraw = true; drawPreviews(true);
if (root.classList.contains("wide")) { lastFit = ""; resize(); }
});
requestAnimationFrame(frame);
})();
