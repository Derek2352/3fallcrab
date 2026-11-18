// ---------- state ----------
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
    net:null, netWob:null, rescues:[], afterNet:false, lockSaid:false, netSaid:false, slimeSaid:false, earlyFloors:0, compounded:0, replay:null, lastDropAt:-1e9, lastChanceNet:false};   // jackpot: when it appeared, end of jackpot time, extra it paid
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
      // impact sound from the normal relative speed
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
  const b = K.shape.fixInertia(def.make(x, y));   // again here: some items rebuild their parts after shape.body()
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
  if (def.jackpot){ if (S.jpAt < 0) jackpotHit(); else stamp("Its claws catch what lands", "對鉗接住跌落嚟嘅嘢", "gold"); }   // back from hold: no second windfall
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
// Steering by key, pad or controller: a quick tap nudges the item one small step (for fine placing); held for longer
// than NUDGE_MS it slides.
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

// ---------- vines ----------
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
// ---------- helpers: the fixed-deposit lock and the insurance net ----------
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
// ---------- slime 黏黏 ----------
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
(() => { const up = Matter.Pair.update;   // the contact rules: a slimy body's contacts grip
  Matter.Pair.update = function(pair, collision, ts){
    up.apply(this, arguments);
    const a = collision.parentA, b = collision.parentB;
    if (slimy(a) || slimy(b)){ pair.friction = 1; pair.frictionStatic = 10; pair.restitution = 0; }
  };
})();
function slimeGrip(){   // stick, never tug: cancel whatever would separate the pair, add nothing
  for (const pr of engine.pairs.list){
    if (!pr.isActive || pr.isSensor) continue;
    const c = pr.collision, a = c.parentA, b = c.parentB;
    if (!slimy(a) && !slimy(b)) continue;
    if (a === S.active || b === S.active) continue;
    const n = c.normal;   // points from a to b
    const rv = (b.velocity.x - a.velocity.x) * n.x + (b.velocity.y - a.velocity.y) * n.y;   // > 0 means separating
    if (rv > 0.02){
      const dv = rv * SLIME_GRAB * 0.5;   // each body takes half, so the pair meets and stops there
      if (!a.isStatic && !a.isSleeping) Body.setVelocity(a, {x: a.velocity.x + n.x * dv, y: a.velocity.y + n.y * dv});
      if (!b.isStatic && !b.isSleeping) Body.setVelocity(b, {x: b.velocity.x - n.x * dv, y: b.velocity.y - n.y * dv});
    }
    for (const o of [a, b]) if (!o.isStatic && !o.isSleeping) Body.setAngularVelocity(o, o.angularVelocity * SLIME_SPIN);
    if (!pr.slimeHeard && (slimy(a) || slimy(b))){ pr.slimeHeard = true; const st = Math.hypot(a.velocity.x - b.velocity.x, a.velocity.y - b.velocity.y); if (st > 1.2) A.sfx("slime", {volume: clamp(st / 6, 0.3, 1)}); }
  }
}
// the slime's look on a slimy item's sprite: a glossy green coat over the item and drips off its lower edge
function drawSlimeWrap(g, def){
  const V = vineShape(def), r = K.rng([...def.id].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) % 1000003, 11));
  const clip = new Path2D();
  for (const P of V.polys){ P.forEach((q, i) => i ? clip.lineTo(q.x, q.y) : clip.moveTo(q.x, q.y)); clip.closePath(); }
  g.save(); g.clip(clip);
  // the coat: thick and glossy on top, thinning down the sides, with a wavy edge where it runs out
  const top = V.y0, bot = V.y0 + V.h, edge = top + V.h * 0.62;
  const coat = new Path2D(); coat.moveTo(V.x0 - 3, top - 3); coat.lineTo(V.x0 + V.w + 3, top - 3);
  const waves = Math.max(3, Math.round(V.w / 14));
  for (let i = waves; i >= 0; i--){ const x = V.x0 + V.w * i / waves, y = edge + Math.sin(i * 2.1 + r() * 2) * V.h * 0.07; coat.lineTo(x, y); }
  coat.closePath();
  const gr = g.createLinearGradient(0, top, 0, edge); gr.addColorStop(0, "rgba(160,222,70,.62)"); gr.addColorStop(1, "rgba(120,205,80,.34)");
  g.fillStyle = gr; g.fill(coat);
  g.fillStyle = "rgba(140,215,80,.16)"; g.fillRect(V.x0 - 2, top - 2, V.w + 4, V.h + 4);   // a faint sheen on the rest
  g.fillStyle = "rgba(255,255,255,.55)";   // the shine
  g.beginPath(); g.ellipse(V.x0 + V.w * 0.3, top + V.h * 0.16, V.w * 0.17, Math.max(1.4, V.h * 0.06), -0.2, 0, 7); g.fill();
  for (let i = 0; i < 4; i++){ g.beginPath(); g.arc(V.x0 + V.w * (0.15 + r() * 0.7), top + V.h * (0.1 + r() * 0.42), 0.9 + r() * 1.2, 0, 7); g.fill(); }   // bubbles
  g.restore();
  // drips: round-bottomed drops hanging from the coat's edge at the item's sides
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
// Lifestyle inflation (the curse of an overspending Fall): the next awkward item comes giant
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
// ---------- the rewards for a wise answer (POWERS in content.js): the player picks one of three on the answered card
const platOpt = () => ({isStatic:true, friction:1, frictionStatic:2, restitution:0, chamfer:{radius:6}, label:"platform"});   // a fresh one each time: Matter takes the chamfer out of it
// The wider base stands on a bamboo scaffold (竹棚), lashed together the Hong Kong way, that rises out of the water as
// the base slides out from under the platform.
const SHED_Y = 24, SHED_H = 112;
const shedW = e => PW/2 + e - 35;   // from the base's outer edge to just inside the pillar
// a neon signboard's characters, stacked down the board; lit: with its coloured glow (at golden hour and twilight)
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
  for (let d = 3; d < w - 3; d += 36) xs.push(w - d);   // poles every 36 from the pillar out, the same for both widths
  if (xs[xs.length - 1] - 5 > 12) xs.push(5);   // and one under the outer edge
  const BAM = "#D4B060", rows = [6, 44, 82], o = {depth: 0.8, soft: 1, sheen: false, rim: 0.4};
  for (let i = 0; i + 1 < xs.length; i++){ const a = xs[i], b = xs[i + 1], up = i % 2 ? [rows[0], rows[1]] : [rows[1], rows[0]];   // a brace across each bay
    K.blob(g, K.tube([[a, up[0]], [b, up[1]]], 2.4), "#C9A24A", o); K.blob(g, K.tube([[a, rows[2]], [b, rows[1]]], 2.4), "#C9A24A", o); }
  for (const y of rows) K.blob(g, K.tube([[2, y], [w - 1, y]], 2.8), BAM, o);
  for (const x of xs){
    K.blob(g, K.tube([[x, 0], [x, h]], 3.4), BAM, {depth: 0.9, soft: 1.1, sheen: {x: x - 0.8, y: h / 2, rx: 0.6, ry: h / 2.5}, rim: 0.4});
    for (let y = 13; y < h; y += 15) K.groove(g, K.poly([[x - 1.7, y], [x + 1.7, y]], false), 0.9);   // the bamboo's nodes
    for (const y of rows) K.press(g, K.ball(x, y, 2.6, 2.1, {lump: 0.05}), "black", {sheen: false, texture: 0});   // the black ties
  }
}
function drawWide(c){
  const e = (S.pw - PW) / 2, prev = e - 20, p = clamp((S.play - (S.wideAt || -1e9)) / 900, 0, 1), ease = 1 - Math.pow(1 - p, 3);
  for (const side of [-1, 1]){
    c.save(); if (side > 0){ c.translate(W, 0); c.scale(-1, 1); }   // the right side is the left one mirrored
    const x0 = W/2 - PW/2 - e;
    if (prev > 0 && L.shed[prev]) c.drawImage(L.shed[prev], W/2 - PW/2 - prev, SHED_Y, shedW(prev), SHED_H);
    const sh = L.shed[e]; if (sh){   // it rises out of the water
      const up = SHED_H * ease; c.save(); c.beginPath(); c.rect(x0 - 4, WATER_Y - up, shedW(e) + 8, up + 20); c.clip();
      c.drawImage(sh, x0, SHED_Y + (1 - ease) * 30, shedW(e), SHED_H); c.restore(); }
    const wl = L.wing[e], slide = (1 - clamp((p - 0.35) / 0.65, 0, 1)) * e;   // then the base slides out over it
    if (wl) c.drawImage(wl, x0 - 10 + slide, 0, e + 34, 40);
    c.restore();
  }
}
function widen(){   // a wider foundation, twice at most
  if (S.wides >= 2) return;
  S.wides++; S.pw += 40; S.wideAt = S.play;
  Composite.remove(engine.world, platform);
  platform = Bodies.rectangle(W/2, 15, S.pw, 30, platOpt()); Composite.add(engine.world, platform);
  for (const sx of [-1, 1]) burst(W/2 + sx * (S.pw/2 - 10), 12, ["#FFD23F", "#F2B51C", "#FFF1A8"], "255,200,50");
  A.sfx("lock"); haptic(25, 0.45, 0.5); mood("happy", 1500); stamp("Wider base!", "地基加闊咗！", "gold");
}
function topLoose(){   // the highest single item resting on the tower (not locked, not fused by vines, not the debt ball)
  let best = null;
  for (const b of engine.world.bodies){
    if (!b.tff || b === S.active || !b.tff.released || b.isStatic || b.tff.members || b.tff.hostBody || b.position.y > 5) continue;
    const d = b.tff.def; if (d.kind === "debt" || d.jackpot) continue;
    if (!best || b.bounds.min.y < best.bounds.min.y) best = b;
  }
  return best;
}
function undoTop(){   // cooling-off: the top item is lifted off, with no drop
  const b = topLoose();
  if (!b){ stamp("Nothing to return", "冇嘢可以退", "info"); return; }
  Composite.remove(engine.world, b);
  burst(b.position.x, b.position.y, ["#9DD8FF", "#FFFFFF", "#5BB2FF"], "157,216,255");
  A.sfx("uiDone"); haptic(25, 0.45, 0.5); stamp("Cooling-off: " + b.tff.def.en + " returned", "冷靜期：退返" + b.tff.def.zh, "good");
}
function applyPower(k){
  if (k === "vine" || k === "lock"){ const q = S.queue[0], plain = q && (q.vine || q.lock || q.slime) && q.base ? q.base : q;   // the pick replaces a wrap the item came with
    S.queue[0] = k === "lock" ? lockOf(plain) : vineOf(plain); A.sfx("vineGet"); drawPreviews(true); prewarm(); }
  else if (k === "net") raiseNet("Insurance net: falls get caught", "保險網：跌落嚟都接得住");
  else if (k === "wide") widen();
  else if (k === "undo") undoTop();
}
function showPowers(c){   // three to pick from: the card's own (by its Fall) first and selected, and two others
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
function lockIn(b){   // b: a released body (or a fused group) with a fixed-deposit item, at rest
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
function catchNet(b){   // b fell off the tower with the net up: caught, and back as the next item
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
function netTick(){   // the net's end: when its time or its catches run out
  const N = S.net; if (!N || N.goneSaid || netUp()) return;
  N.goneSaid = true; stamp("Net's gone", "保險網收咗", "info");
}
// the net, strung across the harbour just above the water: a rope with floats, a mesh into the water, and a
// lifebuoy for each catch left. It sags where it catches, and blinks in its last 4 seconds.
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
  const glow = c.createLinearGradient(0, NET_Y - 16, 0, WATER_Y);   // a soft band of cover over the water
  glow.addColorStop(0, "rgba(160,230,255,0)"); glow.addColorStop(1, "rgba(160,230,255,0.45)");
  c.fillStyle = glow; c.fillRect(x0, NET_Y - 16, x1 - x0, WATER_Y - NET_Y + 16);
  c.strokeStyle = "rgba(120,78,36,0.75)"; c.lineWidth = 1.5; c.beginPath();
  for (let x = x0; x < x1; x += 14){ const y = yAt(x), y2 = yAt(x + 14); c.moveTo(x, y); c.lineTo(x + 7, y + 14); c.lineTo(x + 14, y2); }
  c.stroke();
  c.beginPath(); for (let x = x0; x <= x1; x += 8){ const y = yAt(x); if (x === x0) c.moveTo(x, y); else c.lineTo(x, y); }
  c.strokeStyle = "#7A4B22"; c.lineWidth = 5; c.stroke(); c.strokeStyle = "#F2D49B"; c.lineWidth = 2.6; c.stroke();
  if (L.float) for (let x = x0 + 22; x < x1; x += 46) c.drawImage(L.float, x - 7, yAt(x) - 7, 14, 14);
  if (L.buoy) for (let i = 0; i < (N.max || NET_CATCHES); i++){ const x = W - 76 + i * 30; c.globalAlpha = a0 * (i < N.left ? 1 : 0.28); c.drawImage(L.buoy, x - 14, yAt(x) - 15, 28, 28); }   // a lifebuoy for each catch left, clear of the crab
  c.restore(); needDraw = true;
}
// a caught item floats up out of the net in a bubble, and pops
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
    if (HA === HB || HA === S.active || HB === S.active || HA.isStatic || HB.isStatic) continue;   // a locked block is already anchored
    if (!engine.world.bodies.includes(HA) || !engine.world.bodies.includes(HB)) continue;
    if ((vm.tff.grabs || 0) >= VINE_GRABS || membersOf(HA).length + membersOf(HB).length > MAX_FUSED) continue;
    vm.tff.grabs = (vm.tff.grabs || 0) + 1;
    fuse(HA, HB, g.pre);
    addMark(other, g.x, g.y); if (other.tff.vine) addMark(vm, g.x, g.y);   // the vine creeps onto what it grabbed
    burst(g.x, g.y);
    A.sfx("vine", {pan: clamp(g.x / W * 2 - 1, -1, 1)}); haptic([15, 25, 25], 0.4, 0.5);
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
// creeping vines on a fused body: drawn over all its items and clipped to their combined outline, so the tendrils
// cross the joint from the vine-wrapped item onto the block it grabbed but never hang in the air
function paintMarks(c, H, T){   // c is set up in world units at the group's latest physics pose
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
  c.restore();
}
// 0: no vines; -1: still creeping; otherwise a signature of the grown vines (changes when one is added)
function marksSig(H, T){
  let sig = 0;
  for (const m of H.tff.members) if (m.tff.marks) for (const k of m.tff.marks){ if (T - k.born < 50) return -1; sig += k.born + 1; }
  return sig;
}
// A grown vine no longer changes: it is painted once into a picture that turns with its group (150-odd strokes a
// vine, every frame, were the most expensive thing on the board). paint: stroke by stroke anyway (the settled pile,
// drawn once, keeps them as crisp as ever).
function drawMarks(c, H, T, paint){
  const sig = marksSig(H, T); if (!sig) return;
  const d = lerpPose(H);   // the vines sit at the group's latest physics pose: carried to where it is drawn this frame
  if (sig < 0 || paint){ c.save(); c.translate(d.x, d.y); c.rotate(d.a - H.angle); c.translate(-H.position.x, -H.position.y); paintMarks(c, H, T); c.restore(); return; }
  const k = SC * DPR; let mc = H.tff.mc;
  if (!mc || mc.k !== k || mc.sig !== sig){
    const ca = Math.cos(-H.angle), sa = Math.sin(-H.angle);   // the group's outline in its own frame
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
function drawLeaves(c, f){   // f: this frame's length in 60 Hz steps
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

// the fixed-deposit wrap on a lock item's sprite: a gold chain across it and a padlock, open until it locks
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
  const shY = closed ? by - bh * 0.5 : by - bh * 0.5 - s * 0.28, shX = closed ? 0 : s * 0.16;   // the shackle: lifted and turned when open
  K.blob(g, K.tube([[cx - bw * 0.3 + shX, by - bh * 0.3], [cx - bw * 0.3 + shX, shY - s * 0.18], [cx + shX, shY - s * 0.42], [cx + bw * 0.3 + shX, shY - s * 0.18], [cx + bw * 0.3 + shX, closed ? by - bh * 0.3 : shY + s * 0.02]], s * 0.17), "#C9CED8", {depth: 1, soft: 1.4, sheen: false, rim: 0.6});
  K.blob(g, K.slab(cx, by, bw, bh, s * 0.2, {lump: 0.3, seed: 5}), "#F2B51C", {depth: 1.6, soft: 2.2});
  K.press(g, K.ball(cx, by - bh * 0.08, s * 0.11, s * 0.11, {lump: 0.05}), "black", {sheen: false, texture: 0});
  K.press(g, K.slab(cx, by + bh * 0.16, s * 0.08, bh * 0.28, 1, {lump: 0.05}), "black", {sheen: false, texture: 0});
}

