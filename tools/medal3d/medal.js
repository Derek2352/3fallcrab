// The 稱號 (title) medal, drawn in 3D with three.js: a chunky clay-style medal on a ribbon, in the game's colours.
// Bundled with three.js into src/vendor/medal3d.js by tools/medal3d/build.mjs (`npm run medal`); the game loads that file
// only when it is needed (see "the title medal" in src/game.js) and falls back to a flat drawing without WebGL.
//
//   window.TFF_MEDAL3D.mount(box, tier, {still})  puts a live medal in `box` (a sized element): it drops in with a spin,
//                                                 then sways. `still` (reduced motion) draws it once, at rest.
//   window.TFF_MEDAL3D.unmount()                  stops it and takes the canvas out
//   window.TFF_MEDAL3D.snapshot(tier, w, h)       a 2D canvas of the medal at rest, for the result card
//
// Tiers: "gold" (the brag titles), "silver" (a steady game), "bronze" (the disasters: a dented bronze medal with a
// plaster on it, the same joke as the plasters on the player).
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, MeshStandardMaterial,
  CylinderGeometry, TorusGeometry, ExtrudeGeometry, BoxGeometry, Shape, CanvasTexture, EquirectangularReflectionMapping,
  HemisphereLight, DirectionalLight, NeutralToneMapping, SRGBColorSpace, MathUtils,
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

window.TFF_MEDAL3D = { mount, unmount, snapshot, warm, tiers: Object.keys(TIERS) };
