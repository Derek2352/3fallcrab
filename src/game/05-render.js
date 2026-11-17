// ---------- rendering: sprites ----------
const ctx = cv.getContext("2d", {alpha: false});   // opaque: the sky covers it all, so the page never blends it
let SC = 1, DPR = 1, XV = 0, YT = 0, YB = 0;   // XV: scenery shown either side of the play area (a wide screen in full screen), in world units
// YT, YB: in full screen play the scene covers the whole screen, the panels floating over it: the world drawn above
// the play area (behind the header and the status bar) and below it (behind the pad), in world units
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

// ---------- rendering: scene layers (clay, cached) ----------
const L = {};
let layerVer = 0;   // bumped whenever a layer is remade
// the harbour's colour at the bottom of its picture: the water below it (behind the pad in full screen) is filled with it
let seaDeep = "#2F86E0";
function sampleSea(){
  try { const c = L.sea, n = 24, d = c.getContext("2d").getImageData(Math.floor(c.width / 2) - n / 2, c.height - 6, n, 3).data; let r = 0, g = 0, b = 0;
    for (let i = 0; i < d.length; i += 4){ r += d[i]; g += d[i + 1]; b += d[i + 2]; } const m = d.length / 4; seaDeep = "rgb(" + Math.round(r / m) + "," + Math.round(g / m) + "," + Math.round(b / m) + ")"; } catch(e){}
}
function layer(w, h, fn){ const k = SC * DPR; const c = document.createElement("canvas"); c.width = Math.ceil(w * k); c.height = Math.ceil(h * k); const g = c.getContext("2d"); g.setTransform(k, 0, 0, k, 0, 0); fn(g); return c; }
// ---------- the crab's wardrobe: an accessory for each of eight titles, earned on this device ----------
const earnedTitles = () => { const t = lsGet("tff_titles", []); return Array.isArray(t) ? t : []; };
const hatOwned = id => { const h = HATS.find(x => x.id === id); return !!h && earnedTitles().includes(h.title); };
let HAT = (() => { const h = lsGet("tff_hat", null); return hatOwned(h) ? h : null; })();
// where the crab's eyes are in each mood (the photographed crab, and the clay one): [left eye x, right eye x, y, top]
const EYES = {photo: {idle: [-7.5, 8, -15, -20.5], happy: [-6, 9, -10, -15.5], worried: [-7.5, 7.5, -10.5, -16]}, clay: [-7, 7, -15, -20]};
function hatArt(g, hat, mood, photo){
  const e = photo ? EYES.photo[mood === "happy" ? "happy" : mood === "worried" || mood === "cover" ? "worried" : "idle"] : EYES.clay;
  const cx = (e[0] + e[1]) / 2, top = e[3] + 3;   // the hat sits a little way down over the eyes
  const o = {depth: 1.2, soft: 1.6, sheen: false, rim: 0.5};
  g.save(); g.translate(cx, top);
  if (hat !== "goggles") g.scale(1.25, 1.25);   // (the layer leaves 30 units above the crab's middle: 1.25 just fits when its eyes are highest)
  if (hat === "goggles"){   // over the eyes, with a snorkel
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
function crabArt(g, mood, hat = HAT){   // the crab, in whatever it is wearing (hat: null for none)
  const photo = crabBody(g, mood);
  if (hat) try { hatArt(g, hat, mood, photo); } catch(e){}
}
function crabBody(g, mood){
  if (AV && AV.crab && AV.crab(g, mood)) return true;   // the photographed crab, once its picture has loaded (avatar.js)
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
    if (XV){   // more sky either side
      const r = K.rng(91); let seed = 41;
      for (let x = -60; x > -XV + 30; x -= 150 + r() * 90) cloud(x, 40 + r() * 190, 0.5 + r() * 0.45, seed += 3);
      for (let x = W + 70; x < W + XV - 30; x += 150 + r() * 90) cloud(x, 40 + r() * 190, 0.5 + r() * 0.45, seed += 3);
    }
    g.restore();
    duskTint(g, W + 2 * XV, 260, "255,160,175", 0.3);   // sunset-pink clouds and sun at dusk
  });
  // skyline: colourful clay towers (parallax)
  make.city = () => layer(W + 60 + 2 * XV, 260, g => {
    g.save(); g.translate(XV, 0);
    // Lion Rock-ish hill behind the city (on a wide screen it rolls on either side)
    const hill = [[-20, 170], [40, 140], [95, 128], [130, 104], [158, 96], [172, 110], [200, 122], [260, 140], [330, 150], [400, 136], [W + 80, 150]];
    if (XV) hill.unshift([-20 - XV, 160], [-20 - XV * 0.65, 132], [-20 - XV * 0.3, 152]), hill.push([W + 80 + XV * 0.35, 126], [W + 80 + XV * 0.7, 148], [W + 80 + XV, 138]);
    hill.unshift([hill[0][0], 260]); hill.push([hill[hill.length - 1][0], 260]);
    K.blob(g, K.blobPoly(hill, {lump:1.2, seed:4, step:14}), "#3FAE6A", {depth:5, soft:9, sheen:false});
    K.blob(g, K.slab(154, 93, 10, 6, 1.5, {lump:0.2, seed:19}), "#D9C3B0", {depth:1, soft:1.5, sheen:false});
    K.blob(g, K.blobPoly([[144, 90], [164, 90], [168, 84], [140, 84]], {lump:0.25, seed:23}), "orange", {depth:1.2, soft:1.8, sheen:false});
    const r = K.rng(77); const cols = ["pink", "teal", "purple", "orange", "blue", "green", "red", "yellow"];
    const tower = (x, w, h, c, i, r) => {
      const top = 260 - h;
      if (i === 7){ // a Bank of China-style triangle-facet tower
        K.blob(g, K.blobPoly([[x, 260], [x, top + 70], [x + w*0.5, top + 30], [x + w*0.5, top - 25], [x + w, top + 5], [x + w, 260]], {lump:0.6, seed:i}), "blue", {depth:4, soft:6});
        for (let yy = top + 30; yy < 250; yy += 34){ K.groove(g, K.poly([[x + 2, yy + 34], [x + w - 2, yy]], false), 1.1); K.groove(g, K.poly([[x + 2, yy], [x + w - 2, yy + 34]], false), 1.1); }
      } else if (i % 5 === 3){ // a stepped HK landmark-ish tower
        K.blob(g, K.blobPoly([[x, 260], [x, top + 40], [x + w*0.2, top + 40], [x + w*0.2, top + 10], [x + w*0.5, top - 20], [x + w*0.8, top + 10], [x + w*0.8, top + 40], [x + w, top + 40], [x + w, 260]], {lump:0.8, seed:i}), c, {depth:4, soft:6});
      } else K.blob(g, K.slab(x + w/2, top + h/2 + 10, w, h + 20, 6, {lump:0.9, seed:i * 13}), c, {depth:4, soft:6});
      for (let wy = top + 14; wy < 245; wy += 15) for (let wx = x + 7; wx < x + w - 9; wx += 10)
        if (r() > 0.55) K.press(g, K.rrc(wx + 2, wy, 5, 7, 1.5), r() > 0.25 ? "#FFF3A6" : "cream", {sheen:false, texture:0, depth:0.6, soft:0.8, rim:0.3});
      tops.push({x, w, top});
      if (i !== 7 && i % 5 !== 3) street(x, w, top, i);   // street life on the plain blocks
    };
    // Hong Kong street life, from its own random numbers (so the skyline itself stays as it was): AC boxes under some
    // windows, bamboo laundry poles with clothes, and neon signboards (they glow at golden hour and twilight)
    const tops = [], signs = [], NEON = ["茶餐廳", "押", "涼茶", "金行", "麻雀", "跌打"], TUBE = ["#FF4F8B", "#3BE0C8", "#FFD84D", "#FF7B35", "#8B6CF2", "#4CC36A"];
    const street = (x, w, top, i) => {
      const q = K.rng(300 + i * 7), h = 260 - top;
      for (let n = 0; n < 3; n++){ const ay = top + 22 + Math.floor(q() * Math.max(1, (h - 50) / 15)) * 15, ax = x + 6 + Math.floor(q() * Math.max(1, (w - 18) / 10)) * 10;
        if (ay < 248) K.press(g, K.rrc(ax + 4, ay + 8, 8, 5, 1), "#C9CCD6", {sheen:false, texture:0, depth:0.6, soft:0.8, rim:0.3}); }
      const kind = q();
      if (kind < 0.42 && h > 70){   // a signboard sticking out from the right-hand side
        const t = NEON[Math.floor(q() * NEON.length)], tube = TUBE[Math.floor(q() * TUBE.length)], bh = 12 + t.length * 11, by = top + 18 + q() * Math.max(0, h - bh - 60);
        const sx = x + w - 6, sign = {x: sx, y: by, w: 15, h: bh, t, tube};
        K.blob(g, K.slab(sx + 7.5, by + bh / 2, 15, bh, 2, {lump: 0.2, seed: i}), "#2E2838", {depth: 1.2, soft: 1.6, sheen: false});
        neonText(g, sign, false); signs.push(sign);
      } else if (kind < 0.8 && h > 60){   // laundry on bamboo poles
        for (let n = 0; n < 2; n++){
          const py = top + 26 + Math.floor(q() * Math.max(1, (h - 60) / 15)) * 15, left = q() < 0.5, x0 = left ? x + 3 : x + w - 3, dir = left ? -1 : 1;
          if (py > 245) continue;
          K.blob(g, K.tube([[x0, py], [x0 + dir * 22, py - 2]], 1.6), "#D4B060", {depth: 0.5, soft: 0.7, sheen: false, rim: 0.3});
          const cols = ["pink", "sky", "yellow", "white", "teal", "orange"];
          for (let k = 0; k < 3; k++){ const cx = x0 + dir * (5 + k * 7.5), col = cols[Math.floor(q() * cols.length)];
            if (q() < 0.5) K.press(g, K.blobPoly([[cx - 3.6, py], [cx + 3.6, py], [cx + 3, py + 9], [cx - 3, py + 9]], {lump: 0.1}), col, {sheen: false, texture: 0, depth: 0.5, soft: 0.7, rim: 0.3});   // a shirt
            else K.press(g, K.rrc(cx - 3, py + 0.5, 6, 8, 1), col, {sheen: false, texture: 0, depth: 0.5, soft: 0.7, rim: 0.3}); }   // a towel
        }
      }
    };
    let x = -10, i = 0;
    while (x < W + 60 + XV){
      const w = 34 + r() * 30, h = (i === 6 ? 175 : 50 + r() * 100), c = cols[i % cols.length]; i++;
      tower(x, w, h, c, i, r);
      x += w + 4 + r() * 6;
    }
    if (XV){ const r2 = K.rng(78); let x2 = -14, i2 = 20;   // the skyline on to the left
      while (x2 > -XV - 50){ const w = 34 + r2() * 30, h = 50 + r2() * 100, c = cols[i2 % cols.length]; i2++; x2 -= w + 4 + r2() * 6; tower(x2, w, h, c, i2, r2); } }
    g.restore();
    // atmospheric haze so the tower of items always reads in front of the city
    g.save(); g.globalCompositeOperation = "source-atop"; g.fillStyle = "rgba(" + mixHex("#A0DCFF", "#FFB38A", duskStep).slice(4, -1) + ",0.42)"; g.fillRect(0, 0, W + 60 + 2 * XV, 260); g.restore();
    if (duskStep > 0){ g.save(); g.translate(XV, 0); for (const sg of signs) neonText(g, sg, true); g.restore(); }   // the neon lights up as the sun goes down
    if (duskStep >= 1){   // and at twilight, a light show from the tallest towers
      const tall = tops.slice().sort((a, b) => a.top - b.top).slice(0, 4), BEAM = ["255,95,162", "59,224,200", "139,108,242", "255,216,77"];
      g.save(); g.translate(XV, 0); g.globalCompositeOperation = "lighter";
      tall.forEach((t, n) => { const cx = t.x + t.w / 2, a = (n % 2 ? 1 : -1) * (0.18 + n * 0.08), len = t.top + 30, bx = cx + Math.sin(a) * len, by = t.top - Math.cos(a) * len;
        const gr = g.createLinearGradient(cx, t.top, bx, by); gr.addColorStop(0, "rgba(" + BEAM[n] + ",.32)"); gr.addColorStop(1, "rgba(" + BEAM[n] + ",0)");
        g.fillStyle = gr; g.beginPath(); g.moveTo(cx - 1.5, t.top); g.lineTo(bx - 7, by); g.lineTo(bx + 7, by); g.lineTo(cx + 1.5, t.top); g.closePath(); g.fill(); });
      g.restore();
    }
  });
  // harbour (world units, wide so it can scroll)
  make.sea = () => layer(W + 120 + 2 * XV, 220, g => {
    const sw = W + 120 + 2 * XV, sea = K.slab(sw/2, 120, sw + 40, 240, 0, {lump:0.6, seed:5});
    K.blob(g, sea, "blue", {depth:6, soft:10, sheen:false, texture:0.18});
    for (let row = 0; row < 5; row++){
      const pts = []; for (let x = -10; x <= sw + 10; x += 12) pts.push([x, 10 + row*26 + Math.sin(x / 22 + row) * 3.5]);
      K.blob(g, K.tube(pts, 6 - row*0.6), row % 2 ? "#5DB3F5" : "sky", {depth:1.6, soft:2.4, sheen:false, rim:0.5, texture:0.06});
    }
    duskTint(g, sw, 220, "255,150,120", 0.24);   // the harbour reflects the sunset
  });
  // platform + pillar
  // the insurance net's floats and lifebuoys
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
  // the bamboo scaffold (竹棚) that holds a wider base up from the water: one side, from the base's outer edge (x 0) to
  // the pillar, from just under the slab down into the harbour (drawn mirrored for the right side)
  make.shed = () => { const o = {}; for (const e of [20, 40]) o[e] = layer(shedW(e), SHED_H, g => drawShed(g, e)); return o; };
  make.wing = () => { const o = {}; for (const e of [20, 40]) o[e] = layer(e + 34, 40, g => K.blob(g, K.slab((e + 34) / 2, 15, e + 14, 30, 7, {lump:1.0, seed:9}), "yellow", {sheen:false})); return o; };
  // a green-and-white double-deck harbour ferry (a generic one) that crosses the other way
  make.ferry = () => layer(104, 56, g => {
    K.blob(g, K.blobPoly([[6, 38], [98, 38], [92, 52], [12, 52]], {lump: 0.3, seed: 3}), "#1E7A4C", {depth: 2, soft: 3, sheen: false});
    K.press(g, K.slab(52, 41, 88, 4, 1, {lump: 0.1}), "white", {sheen: false, texture: 0});
    K.blob(g, K.slab(52, 31, 80, 12, 3, {lump: 0.3, seed: 4}), "white", {depth: 1.2, soft: 1.8, sheen: false});
    K.blob(g, K.slab(52, 19, 70, 12, 3, {lump: 0.3, seed: 5}), "white", {depth: 1.2, soft: 1.8, sheen: false});
    K.blob(g, K.slab(52, 11, 76, 5, 2, {lump: 0.2, seed: 6}), "#2E8B57", {depth: 1, soft: 1.4, sheen: false});
    for (const [y, x0, x1] of [[31, 18, 86], [19, 22, 82]]) for (let x = x0; x <= x1; x += 8) K.press(g, K.rrc(x - 2.2, y - 3, 4.4, 5, 1), "#7FC4F0", {sheen: false, texture: 0, depth: 0.5, soft: 0.7, rim: 0.3});
    K.press(g, K.ball(52, 6, 2.2, 2.2, {lump: 0.05}), "red", {sheen: false, texture: 0});   // the mast light
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
    if (soft && L[name]) addJob("layer:" + name, 0.5, () => { L[name] = make[name](); layerVer++; if (name === "sea") sampleSea(); });
    else { L[name] = make[name](); layerVer++; if (name === "sea") sampleSea(); }
  }
}
function drawCrabs(){   // logo + panel crabs, at the size they show (full screen play zooms them)
  const dpr = Math.min(3, window.devicePixelRatio || 1);
  for (const [id, m] of [["crabLogo", "happy"], ["crabSay", "idle"], ["crabSplash", "happy"]]){
    const c = $(id), r = c.getBoundingClientRect();
    if (r.width){ const w = Math.max(40, Math.round(r.width * dpr)); if (c.width !== w){ c.width = w; c.height = Math.round(w * r.height / r.width); } }
    const g = c.getContext("2d"); g.setTransform(1,0,0,1,0,0); g.clearRect(0, 0, c.width, c.height);
    const s = c.width / 80; g.setTransform(s, 0, 0, s, 40*s, 32*s); crabArt(g, m);
  }
}
// Full screen play on a wide screen (a laptop): the first screen is the game alone, as tall as the screen and as wide:
// the play area in the middle and more sky, city and harbour either side (XV), with the status bar and the buttons
// over that scenery. The panels and the rest of the page are a scroll away.
const FS_SIDE = 250, FS_ASPECT = 1.9;   // scenery kept either side of the play area for the status bar and the buttons, px; the widest view (width / height)
const PREVIEWS = ["nextCv", "holdCv", "next2Cv", "hudNext", "hudHold"];
let lastFit = "";
// A short heading stays on one line: when its English is wider than the room it has, its font shrinks just enough
// (down to the smallest size in its data-fit), instead of the phrase breaking in two. Refitted when the text or the
// screen changes. The Chinese under it is a line of its own.
function fitLine(el){
  if (!el || !el.isConnected || el.closest("[hidden]")) return;
  el.style.fontSize = "";
  const tn = [...el.childNodes].filter(n => n.nodeType === 3 && n.data.trim()); if (!tn.length) return;
  const cs = getComputedStyle(el), avail = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight); if (avail <= 0) return;
  // the text's width on one line, measured on a hidden copy (layout widths: a pop-in scale or tilt doesn't change them)
  const probe = document.createElement("span"); let need = 0;
  probe.style.cssText = "position:absolute;left:0;top:0;visibility:hidden;white-space:nowrap;font:inherit;letter-spacing:inherit;text-transform:inherit";
  el.appendChild(probe);
  for (const n of tn){ probe.textContent = n.data.trim(); need = Math.max(need, probe.offsetWidth); }
  probe.remove();
  if (need > avail - 1){ const fs = parseFloat(cs.fontSize); el.style.fontSize = Math.max(+el.dataset.fit || 14, Math.floor(fs * (avail - 3) / need * 4) / 4) + "px"; }   // a little room to spare
}
const fitAll = () => document.querySelectorAll("[data-fit]").forEach(fitLine);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitAll);   // the web fonts change the widths
function resize(){
  const narrow = matchMedia("(max-width: 899px)").matches, touch = matchMedia("(pointer: coarse)").matches;
  const wide = fsOn && !narrow, title = fsOn && root.classList.contains("title"), immersive = fsOn && !title;
  if (root.classList.contains("wide") !== wide) root.classList.toggle("wide", wide);
  const padOn = getComputedStyle($("pad")).display !== "none";
  const header = document.querySelector(".mast").offsetHeight;
  // Phones and tablets size the board to the screen with the browser's bars showing (it doesn't change as you
  // scroll or type), so the address bar sliding away or the keyboard opening doesn't resize the board and remake
  // every picture mid-game.
  const rawVh = (narrow || touch) && document.documentElement.clientHeight ? Math.min(document.documentElement.clientHeight, window.innerHeight || Infinity) : window.innerHeight;
  const vh = (window.visualViewport && (narrow || touch)) ? Math.min(rawVh, Math.round(window.visualViewport.height)) : rawVh;
  let availH, availW, viewW = 0;
  if (title){ availH = vh; availW = viewW = document.documentElement.clientWidth; }   // the title: the scene covers the screen
  else if (narrow){
    const cs = el => getComputedStyle(el), side = parseFloat(cs(document.querySelector(".set")).paddingLeft) + parseFloat(cs($("boardWrap")).paddingLeft);
    availW = document.documentElement.clientWidth - 2 * side; availH = vh - header - 70 - (padOn ? 100 : 0) - 40;
    // full screen on a phone: the play area takes all the height the header, the status bar and the pad leave (the
    // scene itself covers the whole screen, behind them)
    if (fsOn){ availW = document.documentElement.clientWidth; viewW = availW; availH = vh - (document.querySelector(".set").offsetHeight - $("boardWrap").offsetHeight); } }
  else if (wide){   // the screen less the board's frame (and the pad under it on a tablet)
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
  if (title) SC = Math.min(3, availH / H);   // as tall as the screen; on a phone wider than it, its sides cropped
  XV = immersive ? Math.max(0, Math.ceil((viewW / SC - W) / 2))   // edge to edge (a pixel over, never short)
     : title ? Math.max(0, Math.floor((Math.min(viewW / SC, H * FS_ASPECT) - W) / 2)) : 0;
  const vw = W + 2 * XV, wrap = $("boardWrap");
  // Full screen play: the board box is the play area (where items fall, the overlays sit), and the picture covers the
  // whole screen around it, under the header, the status bar and the pad, which float over the scene.
  if (immersive){
    wrap.style.width = Math.round(vw * SC) + "px"; wrap.style.height = Math.round(H * SC) + "px";
    const r = wrap.getBoundingClientRect();
    YT = Math.max(0, r.top / SC); YB = Math.max(0, (vh - r.bottom) / SC);
    cv.style.top = -Math.round(YT * SC) + "px";
  } else { YT = YB = 0; wrap.style.width = wrap.style.height = ""; cv.style.top = ""; }
  // a very big board draws fewer pixels per point: never more than the biggest normal board (550 x 875 points at 2x)
  DPR = lowGfx ? 1 : Math.min(2, window.devicePixelRatio || 1, Math.max(1, Math.sqrt(1925000 / (vw * (H + YT + YB) * SC * SC))));
  const cw = Math.round(vw * SC * DPR), ch = Math.round((H + YT + YB) * SC * DPR);
  if (cv.width !== cw || cv.height !== ch){ cv.width = cw; cv.height = ch; needDraw = true; }
  cv.style.width = Math.round(vw * SC) + "px"; cv.style.height = Math.round((H + YT + YB) * SC) + "px";
  $("pad").style.maxWidth = Math.max(300, W * SC + 20) + "px";
  if (!L.sky) buildLayers();
  else if (Math.abs(SC - prevSC) > 0.015 || DPR !== prevDPR || XV !== prevXV) buildLayers(XV === prevXV);   // a new width: remade now (stretched would show)
  root.style.setProperty("--board-zoom", wide ? Math.min(1.5, Math.max(1, SC / 1.2)).toFixed(3) : "1");
  root.style.setProperty("--xv", immersive ? Math.round(XV * SC) + "px" : "0px");   // where the play area starts inside the full-screen board
  root.style.setProperty("--fs-inset", wide && !immersive ? Math.max(0, Math.round((viewW - vw * SC) / 2)) + "px" : "0px");
  root.style.setProperty("--tl-x", title ? Math.round((viewW - Math.round(vw * SC)) / 2) + "px" : "0px");   // the title's scene, centred (cropped on a phone)
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

// The harbour at the bottom of the view is a strip, so the tower has more of the screen: in full screen play most of
// it is down behind the pad; the title keeps its fuller harbour.
const camBase = () => WATER_Y - H + (root.classList.contains("title") ? 120 : YB > 40 ? 26 : 70);
const camTarget = () => Math.min(camBase(), -S.height - 330);
let skyDusk = -1, skyFill = null, duskStep = 0;
const SKY = [["#3FB4FF", "#8EDBFF", "#C8F0FF"],   // day: top, 65%, horizon
             ["#6A8CF0", "#C9A8F0", "#FFD6E0"],   // golden hour (dusk .5)
             ["#8C6FE0", "#FF9E7A", "#FFD59A"]];  // twilight (dusk 1): violet, clear of the orange board frame
const duskTint = (g, w, h, rgb, a) => { if (!duskStep) return; g.save(); g.globalCompositeOperation = "source-atop"; g.fillStyle = "rgba(" + rgb + "," + (a * duskStep).toFixed(3) + ")"; g.fillRect(0, 0, w, h); g.restore(); };
// ---------- what stays still is drawn once ----------
// A frame used to draw every item twice (shadow, then item) and every vine stroke, so a long game's pile made each
// frame slower. Now the sky and the city are drawn once while the camera holds still (BACK), and items that have
// settled (with their shadows and vines) are drawn once into two pictures (PILE): one under everything that moves
// (the settled shadows), one with the settled items. A frame draws only those pictures and what is moving. An item
// that shifts by more than a hair leaves the pile and is drawn live until it settles again.
const PAD = 32;   // how far a sprite and its shadow reach past the item's outline, in world units
const BACK = {c: null, key: "", next: ""};
const PILE = {s: null, b: null, set: new Set(), list: [], k: 0, at: -99, top: 0, h: 0, w0: 0, w1: 0, x0: 0, x1: 0};
function paintSky(g, k, skyY, cityY){
  const vw = W + 2 * XV;   // the view's width, the play area in the middle
  g.setTransform(k, 0, 0, k, 0, YT * k); g.fillStyle = skyFill; g.fillRect(0, -YT, vw + 1, H + YT + YB + 1);   // +1: the canvas rounds up to whole pixels
  g.drawImage(L.sky, 0, skyY, vw, 260); g.drawImage(L.city, -30, cityY, vw + 60, 260);
}
function backdrop(c, k, skyY, cityY){
  const key = [cv.width, cv.height, YT, skyDusk, layerVer, Math.round(skyY * k * 2), Math.round(cityY * k * 2)].join();
  c.setTransform(1, 0, 0, 1, 0, 0);
  if (key === BACK.key){ c.drawImage(BACK.c, 0, 0); return; }
  if (key !== BACK.next){ BACK.next = key; paintSky(c, k, skyY, cityY); return; }   // moving with the camera: drawn as is
  if (!BACK.c) BACK.c = document.createElement("canvas");
  if (BACK.c.width !== cv.width || BACK.c.height !== cv.height){ BACK.c.width = cv.width; BACK.c.height = cv.height; }
  paintSky(BACK.c.getContext("2d", {alpha: false}), k, skyY, cityY); BACK.key = key;
  c.drawImage(BACK.c, 0, 0);
}
// its exact pictures are made at this size, and any vines on it have finished growing
function picturesOK(b){
  for (const m of membersOf(b)){
    if (!kOK(SPR.get(m.tff.def.id + "|" + qOf(poseOf(m).a)))) return false;
    if (m.tff.marks) for (const mk of m.tff.marks) if (S.steps - mk.born < 52) return false;
  }
  return true;
}
const settled = b => (b.isSleeping || b.tff.sn >= 24) && (!b.tff.sqAt || S.steps - b.tff.sqAt >= 10) && picturesOK(b);
function stale(b){   // a settled item's sprite has been remade since the pile was drawn (the web fonts arrived)
  for (const m of membersOf(b)){ const s = SPR.get(m.tff.def.id + "|" + qOf(poseOf(m).a)); if (s && !kOK(s)) return true; }
  return false;
}
const inWindow = b => b.bounds.max.y + PAD >= PILE.w0 && b.bounds.min.y - PAD <= PILE.w1;
// Newest on top, as when every item was drawn live in world order. The pile pictures go under everything that is
// drawn live, so an item may only be in them if no live item older than it reaches it. near: their pictures can touch.
const near = (a, b) => a.bounds.min.x - PAD <= b.bounds.max.x + PAD && b.bounds.min.x - PAD <= a.bounds.max.x + PAD &&
                       a.bounds.min.y - PAD <= b.bounds.max.y + PAD && b.bounds.min.y - PAD <= a.bounds.max.y + PAD;
// Only items that are moving, or held out of the pile by this rule, count: one that is still but waiting for its
// picture (say it is out of view) isn't a reason to keep the items on it out of the pile.
const moving = o => !(o.isSleeping || o.tff.sn >= 24);
const isLive = o => o.tff && !PILE.set.has(o) && (o.tff.held || moving(o));
function blocked(b){   // an older live item reaches it, so it waits out of the pile (held)
  for (const o of engine.world.bodies){ if (o === b) return false; if (isLive(o) && near(o, b)) return true; }
  return false;
}
function keepOrder(bands){   // items that just left the pile take out the newer items they reach, and those theirs
  const rank = new Map(engine.world.bodies.map((b, i) => [b, i])), todo = engine.world.bodies.filter(isLive);
  while (todo.length){
    const o = todo.pop(), r = rank.get(o);
    for (const b of PILE.list) if (PILE.set.has(b) && rank.get(b) > r && near(o, b)){ PILE.set.delete(b); b.tff.held = true; bands.push([b.tff.cb.y0 - PAD, b.tff.cb.y1 + PAD]); todo.push(b); }
  }
}
function join(b){
  PILE.set.add(b); b.tff.held = false; b.tff.cp = {x: b.position.x, y: b.position.y, a: b.angle}; b.tff.cb = {y0: b.bounds.min.y, y1: b.bounds.max.y};
  PILE.x0 = Math.min(PILE.x0, b.bounds.min.x - PAD); PILE.x1 = Math.max(PILE.x1, b.bounds.max.x + PAD);   // how wide the pile reaches
}
// Draw the settled items between world y0 and y1 (a band across the board), over what was there. A change in the
// pile redraws only its own band: the items around it are drawn again, the rest of the picture is kept.
function pileBand(y0, y1, T){
  const k = PILE.k, top = PILE.top, p0 = Math.max(0, Math.floor((y0 - top) * k)), p1 = Math.min(PILE.h, Math.ceil((y1 - top) * k));
  if (p1 <= p0) return;
  const gs = PILE.s.getContext("2d"), gb = PILE.b.getContext("2d"), a0 = top + p0 / k, a1 = top + p1 / k;
  for (const g of [gs, gb]){ g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, p0, g.canvas.width, p1 - p0); g.beginPath(); g.rect(0, p0, g.canvas.width, p1 - p0); g.clip(); g.setTransform(k, 0, 0, k, XV * k, -top * k); }
  const keep = ALPHA, here = PILE.list.filter(b => b.tff.cb.y1 + PAD >= a0 && b.tff.cb.y0 - PAD <= a1);
  ALPHA = 1;   // settled: drawn where the physics has them
  if (!lowGfx) for (const b of here) for (const m of membersOf(b)) drawBody(gs, m, true);
  for (const b of here){ for (const m of membersOf(b)) drawBody(gb, m, false); if (b.tff.members) drawMarks(gb, b, T, true); }
  ALPHA = keep;
  gs.restore(); gb.restore();
}
function renderPile(k, T){
  const w0 = S.camTop - H / 2, w1 = S.camTop + H * 1.5;   // the view and half a view either side
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
  // room on top for the next few items; on the camera's own pixel grid, so the picture lands exactly where live drawing would
  const top = S.camTop + Math.round((Math.max(w0, y0 - PAD - 150) - S.camTop) * k) / k, w = cv.width, h = Math.ceil((y1 + PAD - top) * k);
  for (const key of ["s", "b"]){
    const img = PILE[key] || (PILE[key] = document.createElement("canvas"));
    if (img.width !== w || img.height < h){ img.width = w; img.height = Math.ceil(h * 1.2); }   // kept, and only ever grown
  }
  PILE.top = top; PILE.h = h;
  pileBand(top, top + h / k, T);
}
function updatePile(k, T){
  const here = new Set();
  for (const b of engine.world.bodies){
    if (!b.tff) continue; here.add(b);
    const an = b.tff.an;   // still: how many frames it has stayed within a hair of one spot
    if (!an || Math.abs(b.position.x - an.x) > 0.15 || Math.abs(b.position.y - an.y) > 0.15 || Math.abs(b.angle - an.a) > 0.003){ b.tff.an = {x: b.position.x, y: b.position.y, a: b.angle}; b.tff.sn = 0; }
    else b.tff.sn++;
  }
  if (!PILE.h || PILE.k !== k || S.camTop - YT < PILE.w0 || S.camTop + H + YB > PILE.w1){   // nothing drawn yet, a new size, or the camera moved on
    if (drawN - PILE.at >= 8 || PILE.k !== k || PILE.h){ renderPile(k, T); } return;
  }
  const off = (PILE.top - S.camTop + YT) * k;   // the camera moved by a fraction of a pixel and has stopped: line up again
  if (Math.abs(off - Math.round(off)) > 0.1 && Math.abs(camTarget() - S.camTop) < 0.05 && drawN - PILE.at >= 60){ renderPile(k, T); return; }
  const bands = [];
  for (const b of PILE.list){   // what moved, fell, or got a new sprite leaves (its band is redrawn without it)
    const cp = b.tff.cp;
    if (!here.has(b) || b === S.active || Math.abs(b.position.x - cp.x) > 0.25 || Math.abs(b.position.y - cp.y) > 0.25 || Math.abs(b.angle - cp.a) > 0.005 || stale(b)){
      PILE.set.delete(b); bands.push([b.tff.cb.y0 - PAD, b.tff.cb.y1 + PAD]);
    }
  }
  if (bands.length) keepOrder(bands);
  if (bands.length > 8){ Object.assign(PILE, {set: new Set(), list: [], h: 0, at: drawN}); return; }   // a lot is moving: all live for now
  if (drawN - PILE.at >= 4) for (const b of engine.world.bodies){   // what has settled joins
    if (!b.tff || b === S.active || PILE.set.has(b) || !inWindow(b) || !settled(b)) continue;
    if (blocked(b)){ b.tff.held = true; continue; }
    if (b.bounds.min.y - PAD < PILE.top || b.bounds.max.y + PAD > PILE.top + PILE.h / k){ renderPile(k, T); return; }   // outside the picture
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
  const x0 = clamp(Math.floor((PILE.x0 + XV) * k), 0, img.width), x1 = clamp(Math.ceil((PILE.x1 + XV) * k), x0, img.width);   // only as wide as the pile
  c.setTransform(1, 0, 0, 1, 0, 0);
  if (x1 > x0) c.drawImage(img, x0, 0, x1 - x0, PILE.h, x0, Math.round((PILE.top - S.camTop + YT) * k), x1 - x0, PILE.h);   // whole pixels: crisp
  c.setTransform(k, 0, 0, k, XV * k, (YT - S.camTop) * k);
}
// dt: this frame's length in ms. Everything that moves on its own (camera, shake, splashes, leaves, sea, boat, crab)
// moves by time, not by frames, so it runs at the same speed on a 60 Hz or a 120 Hz screen.
function draw(dt){
  const c = ctx, k = SC * DPR, f = (dt || STEP) / STEP, T = S.steps + ALPHA; drawN++;
  const rep = S && S.replay;
  const rp = rep ? clamp((performance.now() - rep.t0) / rep.dur, 0, 1) : 0;
  const target = rep ? camBase() + (camTarget() - camBase()) * rp : camTarget();
  S.camTop += (target - S.camTop) * (1 - Math.pow(0.95, f));
  let sx = 0;
  if (S.shake > 0){ sx = (Math.random() - .5) * S.shake; S.shake = Math.max(0, S.shake - 0.4 * f); }
  const rise = camBase() - S.camTop;                     // how far the camera has climbed
  const dusk = Math.round(clamp((S.best / FLOOR - 5) / 6, 0, 1) * 200) / 200;
  if (dusk !== skyDusk){
    skyDusk = dusk; skyFill = c.createLinearGradient(0, 0, 0, H);
    const seg = dusk < .5 ? 0 : 1, t = seg ? dusk * 2 - 1 : dusk * 2;   // day -> golden hour -> twilight, never through grey
    [0, .65, 1].forEach((at, i) => skyFill.addColorStop(at, mixHex(SKY[seg][i], SKY[seg + 1][i], t)));
    const ds = Math.round(dusk * 2) / 2;
    if (ds !== duskStep){ duskStep = ds; for (const n of ["sky", "city", "sea"]) buildLayers(true, n); }
  }
  backdrop(c, k, Math.min(40, rise * 0.05) - 10, Math.min(H - 110, (WATER_Y - S.camTop) - 250 + rise * 0.85));
  // world
  const still = sx === 0 && !rep;   // a quake or replay draws everything live
  const bare = root.classList.contains("title");   // the title screen: the scene alone, no floors, labels or sample tower
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
  if (S.ghost && !bare && S.mode !== "idle") drawGhost(c, S.ghost);   // behind the tower
  const a = S.active, v0 = S.camTop - YT, v1 = S.camTop + H + YB, live = [];   // what moves, in view (out of view isn't drawn)
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
    // dashed guide down to where the item will land, with a landing ring and faint silhouette preview.
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
  if (S.revive) drawGhosts(c, k);   // drawn before the harbour: they rise out of it
  if (S.net) drawNet(c, f);
  if (S.rescues.length) drawRescues(c, f);
  // harbour in front (anything below the surface sinks behind it)
  const off = (T * 0.35) % 60;
  c.drawImage(L.sea, -60 - XV - off, WATER_Y - 6, W + 120 + 2 * XV, 220);
  if (v1 > WATER_Y + 206){ c.fillStyle = seaDeep; c.fillRect(-XV - 2, WATER_Y + 206, W + 2 * XV + 4, v1 - WATER_Y - 200); }   // deeper water, behind the pad
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
  const span = W + 260 + 2 * XV, fx = W + 120 + XV - ((T * 0.13 + span * 0.55) % span), fy = WATER_Y - 42 + (reduceMotion ? 0 : Math.sin(T / 30 + 1) * 1.2);   // the ferry, the other way
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
  // crab mascot by the pillar
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
    const y = -f * FLOOR; if (y < S.camTop - 20 || y > S.camTop + H + YB + 20) continue;   // not up behind the header
    const st = STAGES.find(s => s.at === f);
    if (st){
      c.strokeStyle = "rgba(255,255,255,0.85)"; c.lineWidth = 2; c.setLineDash([8, 7]);
      c.beginPath(); c.moveTo(XV ? -XV : 44, y); c.lineTo(W + XV, y); c.stroke(); c.setLineDash([]);
    }
    if (!st && f % 5){   // in between: a small tick, not a number on every floor (that read like a chart's axis)
      c.fillStyle = skyDusk >= .5 ? "rgba(37,49,122,0.55)" : "rgba(37,49,122,0.32)"; roundRect(c, 19, y - 2, 12, 4, 2); c.fill(); continue;
    }
    c.fillStyle = st ? "#FFE45C" : skyDusk >= .5 ? "rgba(37,49,122,0.8)" : "rgba(37,49,122,0.55)";
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
    c.font = "700 13px " + K.FONTS.zh; const tw = c.measureText(label).width, ly = Math.max(y - 26, S.camTop + 6);   // never cut by the top edge
    c.fillStyle = "rgba(37,49,122,0.92)"; roundRect(c, W - tw - 22, ly, tw + 16, 21, 9); c.fill();
    c.fillStyle = "#FFE45C"; c.textAlign = "left"; c.fillText(label, W - tw - 14, ly + 10.5);
  }
  if (S.best > 8 && S.mode !== "idle"){
    const y = -S.best, txt = "Best " + floorTxt(S.best / FLOOR);
    const dn = STAGES.some(st => st.at && y - -st.at * FLOOR > 0 && y - -st.at * FLOOR < 34) ? 26 : 0;   // a stage line just above: flag hangs below
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
      const slot = canvas.dataset.slot;
      if (slot === "+"){ const r = h * 0.18; g.strokeStyle = "rgba(91,81,108,0.7)"; g.lineWidth = Math.max(2, w * 0.045); g.lineCap = "round"; g.beginPath(); g.moveTo(w/2 - r, h/2); g.lineTo(w/2 + r, h/2); g.moveTo(w/2, h/2 - r); g.lineTo(w/2, h/2 + r); g.stroke(); }
      else { g.fillStyle = "rgba(91,81,108,0.7)"; g.font = "800 " + Math.round(h * (slot.length > 1 ? 0.13 : 0.2)) + "px " + K.FONTS.display; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(slot, w/2, h/2 + h*0.02); } }
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
function fogInto(canvas){   // a purple fog and a question mark where the coming item would show
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
  const fog = S.scamLock > 0;   // the curse of a scam: what's coming is hidden
  if (fog){ fogInto($("nextCv")); fogInto($("next2Cv")); fogInto($("hudNext")); } else { previewInto($("nextCv"), n0); previewInto($("next2Cv"), n1); previewInto($("hudNext"), n0); }
  previewInto($("holdCv"), S.hold); previewInto($("hudHold"), S.hold);
  nameInto($("nextName"), fog ? null : n0, fog ? "Hidden by a scam 被呃咗，睇唔清" : "");
  nameInto($("holdName"), S.hold, S.scamLock > 0 ? "Locked by a scam 被呃咗，暫存鎖住" : "Press C to keep one for later 按C暫存");
  if (S.hold && S.scamLock > 0){ const lk = document.createElement("small"); lk.className = "locked"; lk.textContent = "Locked by a scam 被呃咗，暫存鎖住"; $("holdName").appendChild(lk); }
  const t2 = $("next2Name"); t2.replaceChildren();
  if (n1 && !fog){ const z = document.createElement("span"); z.className = "nw"; z.textContent = n1.zh; t2.append("Then 跟住：" + n1.en + " ", z); }
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
  const SHORT = {spend:["Overspend", "過度消費"], scam:["Scams", "騙局"], delay:["Put off", "拖延"]};
  Object.entries(TRAPS).forEach(([k, t]) => {
    const li = document.createElement("li"); li.className = "tag " + k;
    const tx = document.createElement("span"); const b = document.createElement("b"); b.textContent = t.en + " " + t.zh;
    const sm = document.createElement("small"); sm.textContent = t.d;
    const ef = document.createElement("em"); ef.className = "eff"; const cut = t.eff.search(/\p{Script=Han}/u);   // the Cantonese on its own line
    if (cut > 0) bi(ef, "In the game: " + t.eff.slice(0, cut).trim(), t.eff.slice(cut)); else ef.textContent = "In the game: " + t.eff;
    tx.append(b, sm, ef); li.append(svgUse(ICON[k]), tx); fl.appendChild(li);
    if (fl.dataset["clip" + k[0].toUpperCase() + k.slice(1)]){   // its clip, filmed from the game (How to play, above)
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
function dotText(el, s){   // dot-matrix figures: the , . : pulled in to the digit before them ("8,880", not "8, 880")
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
  // two at once sit 66 px apart: a two-line stamp, tilted, is about 75 px tall, so 50 px let them overlap
  if (highItem) d.style.bottom = "calc(max(" + (WATER_Y - S.camTop > H ? 8 : Math.round((H - (WATER_Y - S.camTop)) / H * 100) + 4) + "%, " + Math.round(talkBand()) + "px) + " + (slot * 66) + "px)";   // above the crab's bubble
  else d.style.top = "calc(" + (frenzyOn() ? 64 : 10) + "px + " + (slot * 66) + "px)";   // under the jackpot-time badge
  d.style.setProperty("--r", ((stampN % 2 ? -1 : 1) * (1.5 + (stampN % 3) * 0.75)) + "deg");
  d.textContent = en; const z = document.createElement("small"); z.textContent = zh; d.appendChild(z);
  d.dataset.fit = 11; box.appendChild(d); fitLine(d); A.sfx("stamp"); setTimeout(() => d.remove(), 1800);
}
// ---------- the crab's speech bubble ----------
// The crab by the harbour cheers good choices and teases bad ones (lines in content.js). Each moment has a priority:
// 3 always speaks (new stage, last item left, final seconds, game over), 2 cuts in over small talk (card results,
// drops, shocks, money milestones), 1 is small talk, said only after the crab has been quiet for a while. A line
// stays up for game time, so a pause or a Life Event card doesn't use it up (longer with Extra reading time); a
// line that had to give way to a more important one is said right after it, if it's still fresh.
const talk = {el: $("bubble"), pos: $("bpos"), say: $("bubbleSay"), face: document.querySelector("#bubble .face"), on: false, pri: 0, until: 0, last: -1e9,
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
  const b = talk.el; b.classList.remove("docked", "slim"); talk.docked = false; b.style.maxWidth = talkWidth(false);
  b.hidden = false; b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
  talk.w = b.offsetWidth; talk.h = talk.hu = b.offsetHeight; talk.x = talk.y = NaN;   // hu: its height beside the crab
  talk.on = true; talk.pri = pri; talk.last = now; talk.until = now + Math.min(5200, 2400 + en.length * 45) * (slowRead ? 1.6 : 1);
  talk.realUntil = performance.now() + (talk.until - now);   // the game clock stands still on the tower view
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
  if (S.mode === "idle" && S.viewing && talk.on && performance.now() >= talk.realUntil) talk.on = false;
  const show = talk.on && !sideways && (S.mode === "playing" || S.mode === "over" || (S.mode === "idle" && S.viewing));
  if (talk.el.hidden === show){ talk.el.hidden = !show; if (show){ talk.x = NaN; needDraw = true; } }
}
// The bubble sits left of the crab, level with its claws, between the platform and the water, so it never covers the
// tower or where items land. Once the camera has climbed past the harbour it waits at the bottom of the board.
const TALK_TIP = W/2 + 50, TALK_ROOM = 70;   // world x of the tail's tip (the crab's left claw); a tall bubble in px
// Beside the crab the bubble is as wide as the room left of it. Docked at the bottom it may use the board's width (a
// narrow column there would make it tall and cover the tower), and on a narrow board it leaves out the crab's face.
const talkWidth = docked => Math.round(docked ? Math.min(320, W * SC - 20) : Math.min(250, TALK_TIP * SC - 16)) + "px";
function placeTalk(md, bob){
  const b = talk.el; if (b.hidden) return;
  const ox = XV * SC, cw = W * SC, ch = H * SC, tipX = TALK_TIP * SC, tipY = (WATER_Y - 30 + bob - S.camTop) * SC;   // ox: where the play area starts
  const floor = ch - (S.mode === "idle" && S.viewing ? 76 : 14);     // clear of Play again when looking at the tower
  const docked = tipY + talk.hu / 2 > floor;   // decided by its height beside the crab, so it can't flip back and forth
  if (docked !== talk.docked){
    talk.docked = docked; b.classList.toggle("docked", docked); b.classList.toggle("slim", docked && cw < 260); b.style.maxWidth = talkWidth(docked);
    talk.w = b.offsetWidth; talk.h = b.offsetHeight;
  }
  if (docked && talk.mood !== md && L.crab){
    talk.mood = md; const g = talk.face.getContext("2d"); g.clearRect(0, 0, 64, 52); g.drawImage(L.crab[md] || L.crab.idle, 0, 0, 64, 52);
  }
  let x, y;
  if (docked){ x = ox + cw - talk.w - 10; y = floor - talk.h; }
  else { x = ox + tipX - 10 - talk.w; y = Math.max((30 - S.camTop) * SC + 4, tipY - talk.h / 2); }   // never above the platform's underside
  x = Math.round(clamp(x, ox + 6, ox + cw - talk.w - 6)); y = Math.round(Math.max(6, y));
  if (x !== talk.x || y !== talk.y){ talk.x = x; talk.y = y; talk.pos.style.transform = "translate(" + x + "px," + y + "px)"; }   // on the wrapper: the pop scales the bubble alone
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
// One error in a frame (a canvas the browser refused to allocate, say) must not stop the game: the next frame is
// asked for first, the error is logged once, and the drawing caches start over (they rebuild themselves).
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
// The graphics process was reset (it happens on a tablet left open all day): every canvas comes back blank, so all
// the pictures are made again.
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
    else if (S.mode === "playing"){ S.realMs += Math.min(1000, raw); tick(dt); live = true; }   // real time played (a slow device plays in slow motion)
    else if (S.mode === "over" || (S.mode === "idle" && S.viewing)){
      S.acc += dt; let n = 0; while (S.acc >= STEP && n++ < 3){ S.acc -= STEP; snap(); worldStep(); }
      if (S.revive) reviveFrame(dt);
      // an item knocked off at the end sinks out of sight behind the harbour: dropped, so a settled tower can rest
      for (const b of engine.world.bodies.slice()) if (b.tff && b.position.y > WATER_Y + 40) Composite.remove(engine.world, b);
      live = S.mode !== "over" || $("endModal").hidden || awake();   // under the statement, a settled tower stays as drawn
    }
    ALPHA = clamp(S.acc / STEP, 0, 1);
    syncTalk();
    // A still scene (start card, Life Event card, pause, statement over a settled tower) isn't redrawn 60 times a
    // second: that saves battery and keeps scrolling and the cards' animations smooth on phones.
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

