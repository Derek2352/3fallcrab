// The 稱號 (title) medal, drawn in 3D with three.js: a chunky clay-style medal on a ribbon, in the game's colours.
// Bundled with three.js into src/vendor/medal3d.js by tools/medal3d/build.mjs (`npm run medal`); the game loads that file
// only when it is needed (see "the title medal" in src/game.js) and falls back to a flat drawing without WebGL.
//
//   window.TFF_MEDAL3D.mount(box, tier, {still})  puts a live medal in `box` (a sized element): it drops in with a spin,
//                                                 then sways. `still` (reduced motion) draws it once, at rest.
//   window.TFF_MEDAL3D.unmount()                  stops it and takes the canvas out
//   window.TFF_MEDAL3D.snapshot(tier, w, h)       a 2D canvas of the medal at rest, for the result card
//   window.TFF_MEDAL3D.ticket(o)                  a 2D canvas of the result card's cinema ticket as a real object (below)
//
// Tiers: "gold" (the brag titles), "silver" (a steady game), "bronze" (the disasters: a dented bronze medal with a
// plaster on it, the same joke as the plasters on the player).
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, MeshStandardMaterial,
  CylinderGeometry, TorusGeometry, ExtrudeGeometry, BoxGeometry, Shape, CanvasTexture, EquirectangularReflectionMapping,
  HemisphereLight, DirectionalLight, NeutralToneMapping, SRGBColorSpace, MathUtils,
  PlaneGeometry, ShadowMaterial, PCFSoftShadowMap, DoubleSide, RepeatWrapping,
} from "three";

const TIERS = {
  gold:   { metal: 0xffbf2e, face: 0xffd65c, emblem: 0xffe680, ribbon: [0xdf1b72, 0xffffff, 0xdf1b72], rough: 0.32, metalness: 0.85 },
  silver: { metal: 0xb9c6d6, face: 0xd8e2ee, emblem: 0xf4f8ff, ribbon: [0x11837b, 0xffffff, 0x11837b], rough: 0.3, metalness: 0.85 },
  bronze: { metal: 0xc0652a, face: 0xd37a3c, emblem: 0xe89a5c, ribbon: [0x25317a, 0xffd23f, 0x25317a], rough: 0.45, metalness: 0.7 },
};

let renderer = null, scene = null, camera = null, medal = null, tierNow = "", raf = 0, box = null, t0 = 0, still = false, envTex = null, seen = null;

function starShape(rOut, rIn, n = 5) {
  const s = new Shape();
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? rIn : rOut, a = Math.PI / 2 + (i * Math.PI) / n;
    const x = Math.cos(a) * r, y = Math.sin(a) * r;
    if (i) s.lineTo(x, y); else s.moveTo(x, y);
  }
  s.closePath();
  return s;
}

// a strap of the ribbon: three stripes side by side, a notched tail at the bottom
function strap(cols, mats) {
  const g = new Group(), w = 0.26, len = 1.5, d = 0.05;
  cols.forEach((c, i) => {
    const m = new Mesh(new BoxGeometry(w, len, d), mats(c));
    m.position.x = (i - 1) * w; g.add(m);
  });
  return g;
}

function build(tier) {
  const T = TIERS[tier] || TIERS.gold, root = new Group();
  // standard (not physical) materials: one small shader to compile, which matters on a phone
  const metal = new MeshStandardMaterial({ color: T.metal, metalness: T.metalness, roughness: T.rough });
  const face = new MeshStandardMaterial({ color: T.face, metalness: T.metalness - 0.3, roughness: T.rough + 0.1 });   // less of a mirror: its own colour shows
  const emblem = new MeshStandardMaterial({ color: T.emblem, metalness: 0.6, roughness: 0.2 });
  const cloth = (c) => new MeshStandardMaterial({ color: c, roughness: 0.75, metalness: 0 });

  // the ribbon: two straps in a V, meeting behind the top of the medal
  const left = strap(T.ribbon, cloth), right = strap(T.ribbon, cloth);
  left.position.set(-0.42, 1.55, -0.18); left.rotation.z = MathUtils.degToRad(-17);
  right.position.set(0.42, 1.55, -0.24); right.rotation.z = MathUtils.degToRad(17);
  root.add(left, right);
  // the ring the medal hangs from
  const ring = new Mesh(new TorusGeometry(0.2, 0.065, 16, 40), metal); ring.position.set(0, 1.08, 0); root.add(ring);

  // the medal: a thick disc, a rounded rim, a raised star
  const disc = new Mesh(new CylinderGeometry(1, 1, 0.26, 72), face); disc.rotation.x = Math.PI / 2; root.add(disc);
  const rim = new Mesh(new TorusGeometry(0.98, 0.14, 24, 96), metal); root.add(rim);
  const back = new Mesh(new CylinderGeometry(0.9, 0.9, 0.2, 72), metal); back.rotation.x = Math.PI / 2; back.position.z = -0.05; root.add(back);   // its face sits behind the disc's (no z-fighting)
  const star = new Mesh(new ExtrudeGeometry(starShape(0.62, 0.27), { depth: 0.12, bevelEnabled: true, bevelThickness: 0.07, bevelSize: 0.05, bevelSegments: 4, curveSegments: 8 }), emblem);
  star.position.z = 0.12; root.add(star);
  // a dent and a plaster for the disasters
  if (tier === "bronze") {
    star.rotation.z = MathUtils.degToRad(-14);
    const tape = new MeshStandardMaterial({ color: 0xf5d7b2, roughness: 0.85 }), pad = new MeshStandardMaterial({ color: 0xe9b98c, roughness: 0.9 });
    const p = new Group();
    const a = new Mesh(new BoxGeometry(0.95, 0.26, 0.04), tape), b = a.clone(); b.rotation.z = Math.PI / 2;
    const c = new Mesh(new BoxGeometry(0.26, 0.26, 0.05), pad);
    p.add(a, b, c); p.position.set(0.38, -0.42, 0.33); p.rotation.z = MathUtils.degToRad(35); root.add(p);
  }
  root.scale.setScalar(0.92);
  return root;
}

// What the metal reflects: a tiny painted studio (a bright top with two softboxes, a warm cream middle, a soft grey
// floor). Small on purpose: three.js turns it into reflections in a few milliseconds (a rendered room took seconds).
function studio() {
  const c = document.createElement("canvas"); c.width = 128; c.height = 64;
  const g = c.getContext("2d"), gr = g.createLinearGradient(0, 0, 0, 64);
  gr.addColorStop(0, "#ffffff"); gr.addColorStop(0.4, "#fff7ec"); gr.addColorStop(0.62, "#f6e7d6"); gr.addColorStop(1, "#c3c4dc");
  g.fillStyle = gr; g.fillRect(0, 0, 128, 64);
  g.fillStyle = "#ffffff"; g.fillRect(18, 8, 24, 14); g.fillRect(82, 5, 20, 10);
  const t = new CanvasTexture(c); t.mapping = EquirectangularReflectionMapping; t.colorSpace = SRGBColorSpace;
  return t;
}

function ensure() {
  if (renderer) return true;
  try {
    renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  } catch (e) { renderer = null; return false; }
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = NeutralToneMapping; renderer.toneMappingExposure = 1.0;   // keeps the golds and pinks saturated
  renderer.setClearColor(0x000000, 0);
  scene = new Scene();
  scene.environment = envTex = studio();
  scene.add(new HemisphereLight(0xfff6e6, 0x8fa0e8, 0.9));
  const key = new DirectionalLight(0xffffff, 1.6); key.position.set(2.5, 3, 4); scene.add(key);
  const rim = new DirectionalLight(0xffd6ec, 0.8); rim.position.set(-3, 1, -2); scene.add(rim);
  camera = new PerspectiveCamera(30, 1, 0.1, 50); camera.position.set(0, 0.42, 7.9); camera.lookAt(0, 0.42, 0);
  renderer.domElement.addEventListener("webglcontextlost", (e) => { e.preventDefault(); unmount(); renderer = null; });
  return true;
}

function setTier(tier) {
  if (medal && tierNow === tier) return;
  if (medal) { scene.remove(medal); medal.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); }); }
  medal = build(tier); tierNow = tier; scene.add(medal);
}

function size(w, h) {
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.setSize(w, h, false);
  camera.aspect = w / h; camera.updateProjectionMatrix();
}

// at rest: turned a little so it reads as a solid thing
function rest() { medal.rotation.set(0.08, -0.32, 0.04); medal.position.set(0, 0, 0); medal.scale.setScalar(0.92); }

// It only animates while it is on screen: an IntersectionObserver starts and stops the loop (a step away, the results
// closed, a game going on), so a medal left behind costs nothing.
function frame(now) {
  raf = 0;
  if (!box || !medal) return;
  if (!box.isConnected) { unmount(); return; }
  const t = (now - t0) / 1000;
  const k = Math.min(1, t / 0.9), e = 1 - Math.pow(1 - k, 3);   // drops in with a spin, then sways
  medal.rotation.y = (1 - e) * Math.PI * 3 - 0.32 + (k >= 1 ? Math.sin((t - 0.9) * 1.6) * 0.45 : 0);
  medal.rotation.x = 0.08; medal.rotation.z = Math.sin(t * 1.1) * 0.05;
  medal.position.y = (1 - e) * 1.6 + Math.sin(t * 2.2) * 0.04;
  medal.scale.setScalar(0.92 * (0.4 + 0.6 * e));
  renderer.render(scene, camera);
  raf = requestAnimationFrame(frame);
}
function watch(el) {
  if (seen) seen.disconnect(); seen = null;
  if (typeof IntersectionObserver !== "function") { raf = requestAnimationFrame(frame); return; }
  seen = new IntersectionObserver((list) => {
    const on = list[list.length - 1].isIntersecting;
    if (on && !raf && box) raf = requestAnimationFrame(frame);
    else if (!on && raf) { cancelAnimationFrame(raf); raf = 0; }
  });
  seen.observe(el);
}

function mount(el, tier, opts = {}) {
  if (!ensure()) return false;
  unmount();
  box = el; still = !!opts.still; setTier(tier);
  const r = el.getBoundingClientRect();
  size(Math.max(1, Math.round(r.width)), Math.max(1, Math.round(r.height)));
  const cv = renderer.domElement; cv.setAttribute("aria-hidden", "true"); cv.style.width = cv.style.height = "100%"; cv.style.display = "block";
  el.appendChild(cv);
  if (still) { rest(); renderer.render(scene, camera); return true; }
  t0 = performance.now(); watch(el);
  return true;
}

function unmount() {
  if (raf) cancelAnimationFrame(raf); raf = 0;
  if (seen) seen.disconnect(); seen = null;
  if (renderer && renderer.domElement.parentNode) renderer.domElement.remove();
  box = null;
}

// The medal at rest in a 2D canvas (the WebGL picture is copied right after it is drawn, in the same task).
function snapshot(tier, w, h) {
  if (!ensure()) return null;
  const live = box, prevTier = tierNow, pr = renderer.getPixelRatio(), cw = renderer.domElement.width, ch = renderer.domElement.height;
  setTier(tier); rest();
  renderer.setPixelRatio(1); renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  renderer.render(scene, camera);
  const out = document.createElement("canvas"); out.width = w; out.height = h;
  out.getContext("2d").drawImage(renderer.domElement, 0, 0);
  // back to the live medal, if one is showing
  renderer.setPixelRatio(pr); renderer.setSize(cw / pr, ch / pr, false); camera.aspect = cw / ch; camera.updateProjectionMatrix();
  if (live && prevTier) { setTier(prevTier); if (still) { rest(); renderer.render(scene, camera); } }
  return out;
}

// The slow part of a first medal is setting up WebGL and compiling its shaders. warm() does that ahead of time (the game
// calls it while the title screen is idle), one tier per idle moment, so the result screen only has to draw.
function warm(done, busy) {
  const tiers = Object.keys(TIERS), idle = window.requestIdleCallback || ((f) => setTimeout(f, 50));
  const step = (i) => {
    if (busy && busy()) { setTimeout(() => step(i), 2000); return; }   // a game started: wait for it to end
    if (i === 0 && !ensure()) { if (done) done(false); return; }
    if (i >= tiers.length || box) { if (done) done(true); return; }   // a live medal already: leave it alone
    setTier(tiers[i]); rest(); size(32, 40); renderer.compile(scene, camera); renderer.render(scene, camera);
    idle(() => step(i + 1));
  };
  step(0);
}

// ---------- the result card's ticket, as a real object ----------
// The game prints the ticket (its paper, pink stub, perforation holes and the player's results) into `face`, a canvas cut
// to the ticket's shape; here it becomes card stock: a finely divided sheet with a gentle curl, a paper-fibre surface and
// a visible edge, the medal pinned to its corner, the stickers stuck on, lit to match the poster it sits on, casting a
// soft shadow onto a see-through backdrop. Returns a 2D canvas (transparent round the ticket and its shadow), or null
// without WebGL.
//   o.face       the printed face (its alpha is the ticket's outline)          o.px        [w, h] of the canvas returned
//   o.light      the poster ("estate", "rooftop"...): its light                 o.margin    [x, y]: canvas size / ticket size
//   o.tilt       the ticket's turn in the picture (radians)                     o.medal     {tier, u, v, size}: centre (0-1
//   o.stickers   [{canvas, u, v, size, rot}]: centre in the face (0-1), width     of the face), width as a share of it
//                as a share of the face's
const LIGHTS = {   // key [colour, strength, from], sky/ground fill, rim (and a second rim for the diner's neon)
  estate:  { key: [0xfff6ea, 1.55, [-1.6, 3.2, 4]],  fill: [0xeaf6f0, 0x8aa89a, 0.95], rim: [0xffffff, 0.35, [2.5, 1, -2]] },
  trolley: { key: [0xfff0d2, 2.3, [-3, 4, 4]],       fill: [0xcfeaff, 0xa08a74, 0.85], rim: [0xfff4e0, 0.45, [3, 2, -2]] },
  rooftop: { key: [0xffc27a, 2.25, [-4.2, 1.1, 2.6]], fill: [0x8cc6e2, 0x4a3426, 0.8], rim: [0xffb45e, 1.0, [-3, 1, -2]] },
  diner:   { key: [0xffe3a6, 1.75, [1, 3.2, 4]],     fill: [0x34466e, 0x1a1420, 0.75], rim: [0xff4f8b, 1.2, [-3.2, 0.6, -1]], rim2: [0x3be08a, 0.55, [3, -1, 2]] },
  family:  { key: [0xfff0dc, 2.05, [-2.6, 2.6, 4]],  fill: [0xf7c9a0, 0x7a2234, 0.85], rim: [0xffd0a0, 0.55, [3, 1, -2]] },
  ferry:   { key: [0xffd8b2, 2.05, [3.6, 1.6, 3]],   fill: [0xc4dcef, 0xb08a70, 0.9],  rim: [0xffc690, 0.75, [3, 1, -2]] },
  diver:   { key: [0xdcfff5, 1.8, [0.2, 4.2, 3]],    fill: [0x67d3cb, 0x0e4a55, 0.9],  rim: [0x9ff6ff, 0.65, [-2, 2, -2]] },
};
let fibre = null;
function paperFibre() {   // a grey noise of short fibres: the card stock's surface (a bump map), made once
  if (fibre) return fibre;
  const c = document.createElement("canvas"); c.width = c.height = 256;
  const g = c.getContext("2d"); g.fillStyle = "#808080"; g.fillRect(0, 0, 256, 256);
  let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 2600; i++) {
    const x = rnd() * 256, y = rnd() * 256, a = rnd() * Math.PI, l = 2 + rnd() * 7, v = Math.round(110 + rnd() * 50);
    g.strokeStyle = `rgba(${v},${v},${v},0.55)`; g.lineWidth = 0.6 + rnd() * 0.8;
    g.beginPath(); g.moveTo(x, y); g.lineTo(x + Math.cos(a) * l, y + Math.sin(a) * l); g.stroke();
  }
  fibre = new CanvasTexture(c); fibre.wrapS = fibre.wrapT = RepeatWrapping;
  return fibre;
}
function ticket(o) {
  if (!ensure() || !o || !o.face) return null;
  const L = LIGHTS[o.light] || LIGHTS.estate, [W, H] = o.px, [mx, my] = o.margin || [1.3, 1.5];
  const tScene = new Scene(), made = [];
  tScene.environment = envTex;
  tScene.add(new HemisphereLight(L.fill[0], L.fill[1], L.fill[2]));
  const key = new DirectionalLight(L.key[0], L.key[1]); key.position.set(...L.key[2]); key.castShadow = true;
  const TW = 4, TH = TW * o.face.height / o.face.width;
  key.shadow.mapSize.set(2048, 2048); key.shadow.bias = -0.0006; key.shadow.normalBias = 0.02; key.shadow.radius = 4;
  Object.assign(key.shadow.camera, { left: -TW, right: TW, top: TW, bottom: -TW, near: 0.1, far: 30 }); key.shadow.camera.updateProjectionMatrix();
  tScene.add(key);
  for (const r of [L.rim, L.rim2]) if (r) { const d = new DirectionalLight(r[0], r[1]); d.position.set(...r[2]); tScene.add(d); }
  const group = new Group(); tScene.add(group);
  // the sheet: finely divided so it can curl (a little along its length, a touch of lift at one corner)
  const curl = (x, y) => 0.09 * Math.pow(x / (TW / 2), 2) + 0.03 * Math.max(0, x / (TW / 2)) * Math.max(0, y / (TH / 2));
  const sheet = (z, mat) => {
    const geo = new PlaneGeometry(TW, TH, 96, 32), pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) pos.setZ(i, z + curl(pos.getX(i), pos.getY(i)));
    geo.computeVertexNormals(); made.push(geo, mat);
    const m = new Mesh(geo, mat); m.castShadow = m.receiveShadow = true; group.add(m); return m;
  };
  const faceTex = new CanvasTexture(o.face); faceTex.colorSpace = SRGBColorSpace; faceTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const bump = paperFibre(); bump.repeat.set(TW * 1.6, TH * 1.6);
  sheet(0, new MeshStandardMaterial({ map: faceTex, alphaTest: 0.5, roughness: 0.82, metalness: 0, bumpMap: bump, bumpScale: 0.6, side: DoubleSide }));
  const sil = document.createElement("canvas"); sil.width = o.face.width; sil.height = o.face.height;   // the outline in white (an alpha map reads green)
  const sg = sil.getContext("2d"); sg.drawImage(o.face, 0, 0); sg.globalCompositeOperation = "source-in"; sg.fillStyle = "#fff"; sg.fillRect(0, 0, sil.width, sil.height);
  const silTex = new CanvasTexture(sil);
  sheet(-0.022, new MeshStandardMaterial({ color: 0xe6d5b8, alphaMap: silTex, alphaTest: 0.5, roughness: 0.9, side: DoubleSide }));   // the card's thickness, seen at its edge
  made.push(faceTex, silTex);
  // the medal, pinned to the corner, and the stickers, stuck on
  const at = (u, v, lift) => [(u - 0.5) * TW, (0.5 - v) * TH, lift + curl((u - 0.5) * TW, (0.5 - v) * TH)];
  if (o.medal) {
    const md = build(o.medal.tier); md.traverse((m) => { if (m.isMesh) m.castShadow = true; });
    const s = (o.medal.size * TW) / 2.3; md.scale.setScalar(s); md.position.set(...at(o.medal.u, o.medal.v, 0.32 * s));
    md.rotation.set(0.05, -0.22, o.medal.rot || 0.12); group.add(md); made.push(md);
  }
  for (const st of o.stickers || []) {
    const t = new CanvasTexture(st.canvas); t.colorSpace = SRGBColorSpace; t.anisotropy = faceTex.anisotropy;
    const w = st.size * TW, h = w * st.canvas.height / st.canvas.width, geo = new PlaneGeometry(w, h), mat = new MeshStandardMaterial({ map: t, alphaTest: 0.5, roughness: 0.55, side: DoubleSide });
    const m = new Mesh(geo, mat); m.castShadow = true; m.position.set(...at(st.u, st.v, 0.05)); m.rotation.z = st.rot || 0; group.add(m); made.push(geo, mat, t);
  }
  // where the shadow falls: a see-through backdrop just behind the ticket
  const catcherGeo = new PlaneGeometry(TW * 4, TH * 6), catcherMat = new ShadowMaterial({ opacity: 0.34 });
  const catcher = new Mesh(catcherGeo, catcherMat); catcher.position.z = -0.32; catcher.receiveShadow = true; tScene.add(catcher); made.push(catcherGeo, catcherMat);
  group.rotation.set(-0.16, 0.1, o.tilt || 0);
  // a long lens, framed so the ticket fills 1/mx of the width and 1/my of the height
  const fov = 22, cam = new PerspectiveCamera(fov, W / H, 0.1, 100), visH = TH * my;
  const dist = visH / 2 / Math.tan(MathUtils.degToRad(fov / 2));
  cam.position.set(0.18 * TW, 0.12 * TH, dist); cam.lookAt(0, 0, 0);
  // draw it, copy it, and put the renderer back as the live medal had it
  const pr = renderer.getPixelRatio(), cw = renderer.domElement.width, ch = renderer.domElement.height, shadows = renderer.shadowMap.enabled;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.setPixelRatio(1); renderer.setSize(W, H, false); renderer.render(tScene, cam);
  const out = document.createElement("canvas"); out.width = W; out.height = H; out.getContext("2d").drawImage(renderer.domElement, 0, 0);
  renderer.shadowMap.enabled = shadows; renderer.setPixelRatio(pr); renderer.setSize(cw / pr, ch / pr, false);
  if (camera) { camera.aspect = cw / ch; camera.updateProjectionMatrix(); }
  if (box && medal && still) { rest(); renderer.render(scene, camera); }   // a still medal on screen: draw it back
  for (const m of made) {
    if (m.isObject3D) m.traverse((x) => { if (x.geometry) x.geometry.dispose(); if (x.material) x.material.dispose(); });
    else if (m.dispose) m.dispose();
  }
  return out;
}

window.TFF_MEDAL3D = { mount, unmount, snapshot, warm, ticket, tiers: Object.keys(TIERS) };
