// Harbour Keep 3D Diorama & Individual Milestone Showcase Engine (window.TFF_DAILY3D).
// Full-screen Three.js experience: 360-degree swipeable floating Victoria Harbour island + solo turntable inspect mode,
// Forest-style 60s focus sprout aura, 3D celebration fountains, and dynamic Day / Dusk / Night studio atmosphere.
import {
  AmbientLight,
  BackSide,
  Box3,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Color,
  CylinderGeometry,
  DirectionalLight,
  FogExp2,
  Group,
  HemisphereLight,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  NeutralToneMapping,
  OctahedronGeometry,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PointLight,
  Points,
  PointsMaterial,
  Raycaster,
  Scene,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import {
  addContactShadow,
  applyLockedLook,
  createKit,
  makeSkyTex,
  makeStudioEnv,
  mesh,
  sculptGeo,
  tubeGeo,
} from "./materials.js";
import {
  buildCrab,
  buildHumanFigurine,
  buildIslandBase,
  buildSprintMilestone,
} from "./models-sprint.js";
import {
  buildInfiniteMilestone,
  buildSaverFloor,
  buildSkylineWing,
} from "./models-infinite.js";

const PHI_MIN = 0.22;
const PHI_MAX = 1.18;

const SKY_CFG = {
  day: {
    bg: 0x8cd7f7,
    fog: 0xbdeaf7,
    fogDensity: 0.011,
    hemiSky: 0xfffaf0,
    hemiGround: 0x60b8c4,
    hemiInt: 1.05,
    keyColor: 0xfff4de,
    keyInt: 1.75,
    keyPos: [8.5, 13.5, 9.0],
    rimColor: 0xffe0c4,
    rimInt: 0.72,
    ambInt: 0.24,
    nightGlow: 0.0,
    nightFactor: 0.0,
    cloudCol: 0xfffdf8,
    starOpacity: 0.0,
    sunY: 14.5,
    sunVisible: true,
    moonVisible: false,
  },
  dusk: {
    bg: 0xe68b7a,
    fog: 0xef9f84,
    fogDensity: 0.013,
    hemiSky: 0xffd1a8,
    hemiGround: 0x5c4f8a,
    hemiInt: 0.92,
    keyColor: 0xffa86a,
    keyInt: 1.65,
    keyPos: [11.5, 6.8, 7.5],
    rimColor: 0xc294ff,
    rimInt: 0.95,
    ambInt: 0.22,
    nightGlow: 1.45,
    nightFactor: 0.58,
    cloudCol: 0xffcbb0,
    starOpacity: 0.42,
    sunY: 5.5,
    sunVisible: true,
    moonVisible: false,
  },
  night: {
    bg: 0x16214f,
    fog: 0x1a2658,
    fogDensity: 0.014,
    hemiSky: 0x6280d8,
    hemiGround: 0x1e2b58,
    hemiInt: 0.78,
    keyColor: 0xa6c4ff,
    keyInt: 1.25,
    keyPos: [-7.5, 12.5, 8.5],
    rimColor: 0x56d8e8,
    rimInt: 0.9,
    ambInt: 0.22,
    nightGlow: 2.6,
    nightFactor: 1.0,
    cloudCol: 0x5d6fa6,
    starOpacity: 0.95,
    sunY: -10,
    sunVisible: false,
    moonVisible: true,
  },
};

let supportedCache = null;
let softwareGLCache = false;
function isSupported() {
  if (supportedCache !== null) return supportedCache;
  try {
    const cv = document.createElement("canvas");
    const gl = cv.getContext("webgl2") || cv.getContext("webgl") || cv.getContext("experimental-webgl");
    supportedCache = !!gl;
    if (gl) {
      let rendererStr = "";
      try {
        const dbg = gl.getExtension("WEBGL_debug_renderer_info");
        rendererStr = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) || "") : String(gl.getParameter(gl.RENDERER) || "");
      } catch {}
      softwareGLCache = /SwiftShader|llvmpipe|Software|Mesa|Basic Render/i.test(rendererStr);
      const ext = gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
    }
  } catch {
    supportedCache = false;
  }
  return supportedCache;
}

function hatForDays(days) {
  if (days >= 100) return "tophat";
  if (days >= 30) return "straw";
  if (days >= 14) return "halo";
  return null;
}

function computeContentBounds(root) {
  root.updateMatrixWorld(true);
  const box = new Box3();
  const tmp = new Box3();
  root.traverse((o) => {
    if (!o.isMesh || !o.visible || o.userData.ignoreBounds) return;
    if (!o.geometry.boundingBox) o.geometry.computeBoundingBox();
    tmp.copy(o.geometry.boundingBox).applyMatrix4(o.matrixWorld);
    box.union(tmp);
  });
  if (box.isEmpty()) box.set(new Vector3(-0.5, 0, -0.5), new Vector3(0.5, 1, 0.5));
  return box;
}

function disposeDynamicTree(root) {
  // Dispose unique geometries inside a dynamically removed subtree (materials/textures live in shared kit)
  root.traverse((o) => {
    if (o.isMesh && o.geometry && !o.userData.sharedGeo) {
      o.geometry.dispose();
    }
  });
}

function buildCoaster(kit) {
  const g = new Group();
  const walnut = kit.enamel(0x6e4121, { rough: 0.28, metalness: 0.06 });
  const walnutRim = kit.clay(0x523018, { rough: 0.44 });
  const brass = kit.metal(0xf0be44, 0.2, 0.86);
  const dialMat = kit.textured("coasterDial", { finish: "lacquer", rough: 0.34 });
  const lockAuraMat = kit.emissive(0x7cd6ff, 0.75, 1.5, { transparent: true, opacity: 0.65 });

  g.add(
    mesh(new CylinderGeometry(1.74, 1.84, 0.16, 48), [walnut, dialMat, walnutRim], { pos: [0, 0.08, 0], cast: false, recv: true }),
    mesh(new TorusGeometry(1.75, 0.048, 14, 56), brass, { pos: [0, 0.155, 0], rot: [Math.PI / 2, 0, 0] }),
    mesh(new TorusGeometry(1.68, 0.02, 10, 56), brass, { pos: [0, 0.164, 0], rot: [Math.PI / 2, 0, 0], cast: false }),
    mesh(new TorusGeometry(1.85, 0.032, 10, 56), walnutRim, { pos: [0, 0.02, 0], rot: [Math.PI / 2, 0, 0], cast: false }),
  );
  // 8 brushed-brass perimeter rivet studs around turntable rim
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI * 2) / 8;
    g.add(mesh(new SphereGeometry(0.03, 10, 8), brass, {
      pos: [Math.cos(a) * 1.81, 0.09, Math.sin(a) * 1.81],
      cast: false,
    }));
  }
  const lockRing = mesh(new TorusGeometry(1.64, 0.03, 10, 48), lockAuraMat, {
    pos: [0, 0.18, 0],
    rot: [Math.PI / 2, 0, 0],
    cast: false,
  });
  lockRing.visible = false;
  g.add(lockRing);
  addContactShadow(g, 2.25, 2.25, -0.01, 0.36, kit);
  return { group: g, lockRing };
}

function buildSkyAtmosphere(kit) {
  const g = new Group();
  const skyTexMap = {
    day: makeSkyTex("day"),
    dusk: makeSkyTex("dusk"),
    night: makeSkyTex("night"),
  };
  const domeMat = new MeshBasicMaterial({ map: skyTexMap.day, side: BackSide, depthWrite: false, fog: false });
  const dome = new Mesh(new SphereGeometry(46, 32, 20), domeMat);
  g.add(dome);

  // 5 Sculpted Fluffy 3D Clay Clouds flanking the harbour skyline (hidden in Solo Inspect)
  const cloudMat = kit.clay(0xfffdf8, { rough: 0.68, noBump: true }).clone();
  cloudMat.fog = false;
  const cloudsGroup = new Group();
  g.add(cloudsGroup);
  const clouds = [];
  const cloudSpots = [
    { a: 0.48, r: 19.2, y: -0.4, s: 0.95 },
    { a: 1.85, r: 20.0, y: 0.2, s: 0.9 },
    { a: 2.85, r: 19.4, y: -0.5, s: 0.92 },
    { a: 3.72, r: 19.8, y: -0.1, s: 0.95 },
    { a: 5.58, r: 18.8, y: 0.1, s: 0.88 },
  ];
  cloudSpots.forEach((cs, idx) => {
    const cg = new Group();
    cg.add(
      mesh(sculptGeo(new SphereGeometry(1.15, 14, 12), 0.11, 1.9, 10 + idx, { flatBottom: true, yScale: 0.55 }), cloudMat, { scale: [1.35, 0.72, 0.92], cast: false, recv: false }),
      mesh(sculptGeo(new SphereGeometry(0.85, 12, 10), 0.08, 2.2, 20 + idx, { flatBottom: true, yScale: 0.55 }), cloudMat, { pos: [1.0, -0.08, 0.15], scale: [1.14, 0.7, 0.85], cast: false, recv: false }),
      mesh(sculptGeo(new SphereGeometry(0.78, 12, 10), 0.08, 2.4, 30 + idx, { flatBottom: true, yScale: 0.55 }), cloudMat, { pos: [-0.95, -0.12, -0.1], scale: [1.18, 0.68, 0.88], cast: false, recv: false }),
      mesh(sculptGeo(new SphereGeometry(0.68, 12, 10), 0.07, 2.6, 40 + idx), cloudMat, { pos: [0.22, 0.42, -0.05], scale: [1.1, 0.8, 0.85], cast: false, recv: false }),
    );
    cg.scale.setScalar(cs.s);
    cloudsGroup.add(cg);
    clouds.push({ cg, ...cs });
  });

  // Cheerful Clay Sun + warm translucent atmospheric halo
  const sun = new Group();
  sun.position.set(-11.5, 4.8, -26);
  sun.add(
    mesh(new SphereGeometry(1.9, 20, 16), kit.emissive(0xffe67a, 1.1, 1.1), { cast: false, recv: false }),
    mesh(new SphereGeometry(2.85, 18, 14), kit.emissive(0xffdf94, 0.35, 0.35, { transparent: true, opacity: 0.24, depthWrite: false }), { cast: false, recv: false }),
  );
  g.add(sun);

  // Glowing Golden Crescent Moon + soft halo framed in upper-right sky pocket
  const moon = new Group();
  moon.position.set(7.4, 6.2, -9.2);
  moon.rotation.y = -0.35;
  moon.add(
    mesh(new TorusGeometry(0.92, 0.3, 12, 26, Math.PI * 1.28), kit.emissive(0xfff1a6, 1.4, 1.75), {
      rot: [0, 0, Math.PI * 0.62],
      cast: false,
      recv: false,
    }),
    mesh(new SphereGeometry(1.65, 16, 12), kit.emissive(0xffe99c, 0.4, 0.55, { transparent: true, opacity: 0.16, depthWrite: false }), { cast: false, recv: false }),
  );
  moon.visible = false;
  g.add(moon);

  // Twinkling 3D Starfield (dusk & night — covers full visible sky band around the island!)
  const starCount = 320;
  const starPos = new Float32Array(starCount * 3);
  let seed = 9001;
  const rnd = () => { seed = (Math.imul(1664525, seed) + 1013904223) >>> 0; return seed / 4294967296; };
  for (let i = 0; i < starCount; i++) {
    const theta = rnd() * Math.PI * 2;
    const phi = 0.42 + rnd() * 1.42;
    const rad = 28 + rnd() * 8;
    starPos[i * 3] = rad * Math.sin(phi) * Math.cos(theta);
    starPos[i * 3 + 1] = rad * Math.cos(phi) + 1.2;
    starPos[i * 3 + 2] = rad * Math.sin(phi) * Math.sin(theta);
  }
  const starGeo = new BufferGeometry();
  starGeo.setAttribute("position", new BufferAttribute(starPos, 3));
  const starMat = new PointsMaterial({ color: 0xfff8d2, size: 0.78, transparent: true, opacity: 0, depthWrite: false, fog: false });
  const stars = new Points(starGeo, starMat);
  g.add(stars);

  return {
    group: g,
    setInspectLook(isInspect) {
      cloudsGroup.visible = !isInspect;
    },
    setSky(mode) {
      const cfg = SKY_CFG[mode] || SKY_CFG.day;
      domeMat.map = skyTexMap[mode] || skyTexMap.day;
      domeMat.needsUpdate = true;
      cloudMat.color.setHex(cfg.cloudCol);
      sun.visible = cfg.sunVisible;
      sun.position.y = mode === "dusk" ? 1.8 : 4.8;
      moon.visible = cfg.moonVisible;
      starMat.opacity = cfg.starOpacity;
    },
    anim(t, reduce) {
      const spd = reduce ? 0 : 0.022;
      for (const c of clouds) {
        const a = c.a + t * spd;
        c.cg.position.set(Math.cos(a) * c.r, c.y + Math.sin(t * 0.6 + c.a) * 0.25, Math.sin(a) * c.r);
        c.cg.lookAt(0, c.y, 0);
      }
      if (starMat.opacity > 0.01 && !reduce) {
        starMat.size = 0.44 + Math.sin(t * 2.4) * 0.07;
      }
    },
    dispose() {
      Object.values(skyTexMap).forEach((t) => t.dispose());
      dome.geometry.dispose();
      domeMat.dispose();
      cloudMat.dispose();
      starGeo.dispose();
      starMat.dispose();
    },
  };
}

// Forest-style 60s Focus Rescue Sprout & Rising Translucent Beacon Aura
function buildFocusAura(kit) {
  const g = new Group();
  g.visible = false;
  const ringMat1 = kit.emissive(0x3cf0a8, 0.9, 1.9, { transparent: true, opacity: 0.55, depthWrite: false });
  const ringMat2 = kit.emissive(0xffe066, 0.85, 1.85, { transparent: true, opacity: 0.45, depthWrite: false });
  const stemMat = kit.clay(0x2ea65a, { rough: 0.42 });
  const leafMat = kit.clay(0x49cf6e, { rough: 0.38 });
  const budMat = kit.emissive(0xffe36e, 0.9, 2.0);

  const ring1 = mesh(new TorusGeometry(1.55, 0.045, 10, 48), ringMat1, { rot: [Math.PI / 2, 0, 0], cast: false, recv: false });
  const ring2 = mesh(new TorusGeometry(1.95, 0.035, 10, 48), ringMat2, { rot: [Math.PI / 2, 0, 0], cast: false, recv: false });
  g.add(ring1, ring2);

  // Sculpted growing botanical seedling + twin unfurling leaves + blooming golden flower bud!
  const sprout = new Group();
  sprout.position.set(0, 0.05, 0);
  const stem = mesh(tubeGeo([[0, 0, 0], [0.04, 0.45, 0.02], [-0.02, 0.95, 0]], 0.055, 14, 10), stemMat);
  const leafL = mesh(new SphereGeometry(0.24, 14, 10), leafMat, {
    pos: [-0.22, 0.62, 0.04],
    rot: [0.15, 0.2, 0.58],
    scale: [1.45, 0.42, 0.78],
  });
  const leafR = mesh(new SphereGeometry(0.24, 14, 10), leafMat, {
    pos: [0.22, 0.72, -0.02],
    rot: [-0.1, -0.2, -0.58],
    scale: [1.45, 0.42, 0.78],
  });
  const bud = mesh(new OctahedronGeometry(0.18, 1), budMat, { pos: [-0.02, 1.06, 0], cast: false });
  sprout.add(stem, leafL, leafR, bud);
  g.add(sprout);

  // 8 rising glowing firefly motes
  const motes = [];
  for (let i = 0; i < 8; i++) {
    const m = mesh(new SphereGeometry(0.055, 8, 8), i % 2 ? ringMat2 : ringMat1, { cast: false, recv: false });
    g.add(m);
    motes.push({ m, phase: i / 8, rad: 1.15 + (i % 3) * 0.35 });
  }

  let progress = 0;
  return {
    group: g,
    setProgress(p) {
      progress = Math.max(0, Math.min(1, Number(p) || 0));
      g.visible = progress > 0.005;
    },
    anim(t, isItemMode, centerZ = 0.35) {
      if (!g.visible) return;
      g.position.set(0, isItemMode ? 0.16 : 0.04, isItemMode ? 0 : centerZ);
      const baseScale = isItemMode ? 1.0 : 0.86;
      const p = progress;
      const u1 = (t * 0.45) % 1;
      const u2 = (t * 0.45 + 0.5) % 1;
      ring1.position.y = 0.08 + u1 * (1.2 + p * 1.4);
      ring1.scale.setScalar(baseScale * (0.7 + u1 * 0.55));
      ring2.position.y = 0.08 + u2 * (1.2 + p * 1.4);
      ring2.scale.setScalar(baseScale * (0.65 + u2 * 0.65));

      // Sprout grows organically from 0.25 -> 1.15 as the 60s focus ring completes!
      const s = 0.24 + p * 0.92;
      sprout.position.set(isItemMode ? 1.2 : 0.95, 0.04, isItemMode ? 0.55 : 0.25);
      sprout.scale.setScalar(s);
      sprout.rotation.y = Math.sin(t * 1.4) * 0.2;
      bud.scale.setScalar(0.6 + p * 0.8 + Math.sin(t * 4) * 0.08);
      bud.rotation.y = t * 1.8;

      for (const mt of motes) {
        const u = (t * (0.28 + p * 0.35) + mt.phase) % 1;
        const a = t * 1.1 + mt.phase * Math.PI * 2;
        mt.m.position.set(Math.cos(a) * mt.rad * baseScale, 0.15 + u * (1.5 + p * 1.6), Math.sin(a) * mt.rad * baseScale);
        mt.m.scale.setScalar(Math.sin(u * Math.PI) * (0.7 + p * 0.6));
      }
    },
  };
}

// 3D Celebration Coin / Confetti / Bubble / Star Fountain
function buildCelebrationFX(kit) {
  const g = new Group();
  const coinGeo = new CylinderGeometry(0.11, 0.11, 0.028, 14);
  const confGeo = new BoxGeometry(0.13, 0.07, 0.02);
  const starGeo = new OctahedronGeometry(0.1, 0);
  const bubGeo = new SphereGeometry(0.11, 12, 10);

  const goldMat = kit.metal(0xffcb3c, 0.18, 0.88);
  const bubbleMat = kit.glass(0x5ff0ff, 0.65);
  const colors = [0xff6b52, 0x14968b, 0xffd044, 0xff70a8, 0x45d678, 0x6cb8ff];
  const confMats = colors.map((c) => kit.gloss(c, { rough: 0.28 }));

  const active = [];

  function spawn(kind = "yes", originY = 1.6) {
    const count = kind === "sprint14" || kind === "milestone" ? 36 : 24;
    for (let i = 0; i < count; i++) {
      let geo = confGeo;
      let mat = confMats[i % confMats.length];
      if (kind === "shield") {
        geo = i % 3 === 0 ? starGeo : bubGeo;
        mat = i % 3 === 0 ? goldMat : bubbleMat;
      } else if (kind === "rescue") {
        geo = i % 2 === 0 ? starGeo : confGeo;
        mat = i % 3 === 0 ? goldMat : confMats[4];
      } else if (kind === "sprint14" || kind === "milestone") {
        geo = i % 2 === 0 ? coinGeo : starGeo;
        mat = i % 3 === 0 ? confMats[i % confMats.length] : goldMat;
      } else {
        geo = i % 2 === 0 ? coinGeo : confGeo;
        mat = i % 2 === 0 ? goldMat : confMats[i % confMats.length];
      }
      const m = new Mesh(geo, mat);
      m.castShadow = false;
      m.position.set((Math.random() - 0.5) * 0.8, originY + Math.random() * 0.4, (Math.random() - 0.5) * 0.8);
      const ang = Math.random() * Math.PI * 2;
      const spd = 1.3 + Math.random() * 2.4;
      const vy = (kind === "shield" ? 2.4 : 4.2) + Math.random() * 2.8;
      g.add(m);
      active.push({
        m,
        vx: Math.cos(ang) * spd,
        vy,
        vz: Math.sin(ang) * spd,
        rx: (Math.random() - 0.5) * 9,
        ry: (Math.random() - 0.5) * 9,
        life: 0,
        maxLife: 1.45 + Math.random() * 0.6,
        grav: kind === "shield" ? -2.4 : -7.6,
      });
    }
  }

  return {
    group: g,
    spawn,
    update(dt) {
      for (let i = active.length - 1; i >= 0; i--) {
        const p = active[i];
        p.life += dt;
        if (p.life >= p.maxLife) {
          g.remove(p.m);
          active.splice(i, 1);
          continue;
        }
        p.vy += p.grav * dt;
        p.m.position.x += p.vx * dt;
        p.m.position.y += p.vy * dt;
        p.m.position.z += p.vz * dt;
        p.m.rotation.x += p.rx * dt;
        p.m.rotation.y += p.ry * dt;
        const fade = 1 - Math.max(0, (p.life - p.maxLife * 0.65) / (p.maxLife * 0.35));
        p.m.scale.setScalar(Math.max(0.01, fade));
      }
    },
    dispose() {
      coinGeo.dispose();
      confGeo.dispose();
      starGeo.dispose();
      bubGeo.dispose();
    },
  };
}

function mount(containerEl, opts = {}) {
  if (!containerEl || !isSupported()) return null;

  const isSoftwareGL = softwareGLCache;
  let renderer;
  try {
    renderer = new WebGLRenderer({ antialias: !isSoftwareGL, alpha: false, powerPreference: "high-performance" });
  } catch {
    return null;
  }

  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = NeutralToneMapping;
  renderer.toneMappingExposure = 1.06;
  // On real GPUs use static-cached PCFSoftShadowMap (only re-rendered on scene/sky changes!);
  // on software WebGL (SwiftShader/llvmpipe) rely on our crisp procedural contact shadows for <50ms frames!
  renderer.shadowMap.enabled = !isSoftwareGL;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.shadowMap.autoUpdate = false;

  const markShadowDirty = () => {
    if (renderer.shadowMap.enabled) renderer.shadowMap.needsUpdate = true;
  };

  const cv = renderer.domElement;
  cv.style.width = "100%";
  cv.style.height = "100%";
  cv.style.display = "block";
  cv.style.touchAction = "none";
  cv.setAttribute("aria-label", "Interactive 3D Harbour Keep Diorama");
  containerEl.replaceChildren(cv);

  const scene = new Scene();
  scene.background = new Color(SKY_CFG.day.bg);
  scene.fog = new FogExp2(SKY_CFG.day.fog, SKY_CFG.day.fogDensity);

  const camera = new PerspectiveCamera(36, 1, 0.2, 120);
  const kit = createKit({ softwareGL: isSoftwareGL });

  // Procedural studio reflection environments (real GPU only — PMREM equirectangular blur is 10s+ on SwiftShader CPU!)
  const envs = isSoftwareGL ? null : {
    day: makeStudioEnv("day"),
    dusk: makeStudioEnv("dusk"),
    night: makeStudioEnv("night"),
  };
  if (envs) scene.environment = envs.day;

  // Studio 3-point + hemisphere + night accent lighting
  const amb = new AmbientLight(0xffffff, 0.24);
  const hemi = new HemisphereLight(SKY_CFG.day.hemiSky, SKY_CFG.day.hemiGround, SKY_CFG.day.hemiInt);
  const key = new DirectionalLight(SKY_CFG.day.keyColor, SKY_CFG.day.keyInt);
  key.position.set(...SKY_CFG.day.keyPos);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -7.2;
  key.shadow.camera.right = 7.2;
  key.shadow.camera.top = 8.4;
  key.shadow.camera.bottom = -6.2;
  key.shadow.camera.near = 2;
  key.shadow.camera.far = 32;
  key.shadow.bias = -0.0005;
  key.shadow.normalBias = 0.025;
  key.shadow.radius = 2.4;

  const rim = new DirectionalLight(SKY_CFG.day.rimColor, SKY_CFG.day.rimInt);
  rim.position.set(-9.5, 6.5, -8.5);
  // Shadow-free camera-relative studio catchlight so 360-degree specular glints follow any swipe angle
  const camLight = new DirectionalLight(0xfff9f0, 0.48);
  camLight.position.set(4, 9, 12);
  const nightGlow = new PointLight(0xffb86c, 0, 14, 1.5);
  nightGlow.position.set(1.2, 2.4, 2.2);
  scene.add(amb, hemi, key, rim, camLight, nightGlow);

  // Atmospheric Sky Dome + Clouds + Stars + Moon
  const skyRig = buildSkyAtmosphere(kit);
  scene.add(skyRig.group);

  // Mode containers: Full Growing Island Stage vs Solo Individual Thing Turntable Stage
  const islandRoot = new Group();
  const inspectStage = new Group();
  inspectStage.visible = false;
  scene.add(islandRoot, inspectStage);

  const coaster = buildCoaster(kit);
  inspectStage.add(coaster.group);
  const inspectSlot = new Group();
  inspectStage.add(inspectSlot);

  // Focus Sprout Aura & 3D Celebration Particles
  const focusAura = buildFocusAura(kit);
  const celebFX = buildCelebrationFX(kit);
  scene.add(focusAura.group, celebFX.group);

  // ---------- Controller State ----------
  const state = {
    totalDays: Math.max(0, Math.floor(Number(opts.totalDays) || 0)),
    streak: Math.max(0, Math.floor(Number(opts.streak) || 0)),
    shields: Math.max(0, Math.floor(Number(opts.shields) || 0)),
    sky: opts.sky || "day",
    avatar: opts.avatar || "crab",
    mood: opts.mood || "idle",
  };
  let mode = "island"; // 'island' | 'item'
  let inspectDay = null;
  let inspectLocked = false;
  let builtSig = "";
  let islandBaseRig = null;
  let islandAnims = [];
  let inspectAnim = null;
  let verticalOffset = 0;
  let curVerticalOffset = 0;
  let bounceTimer = 0;
  let inspectPopTimer = 0;
  let disposed = false;

  // Spherical Camera Orbit State
  let theta = -0.34;
  let targetTheta = -0.34;
  let phi = 1.04;
  let targetPhi = 1.04;
  let radius = 11.2;
  let targetRadius = 11.2;
  let targetY = 0.85;
  let curTargetY = 0.85;
  let velTheta = 0;
  let velPhi = 0;
  let userZoomScale = 1.0;

  let viewW = 1, viewH = 1;
  const reduceMotion = () => !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  function framingForState() {
    const aspect = viewW / Math.max(1, viewH);
    const isPortrait = aspect < 0.8;
    const fov = isPortrait ? 44 : 36;
    if (camera.fov !== fov) camera.fov = fov;
    const tanHalfH = Math.tan(MathUtils.degToRad(fov * 0.5)) * aspect;

    if (mode === "item") {
      // Fit full turntable coaster + hero sculpture cleanly above inspect dock on both desktop & mobile!
      const rWidth = 2.15 / Math.max(0.14, tanHalfH);
      const r = Math.max(8.2, rWidth);
      return {
        y: 0.98,
        r,
        phi: 1.11,
        theta: -0.34,
        minR: Math.max(4.4, r * 0.56),
        maxR: r * 1.55,
      };
    }

    const d = state.totalDays;
    const extraFloors = d >= 14 ? Math.min(3, Math.floor((d - 14) / 8)) : 0;
    let y = 0.62, rDesk = 12.6;
    if (d >= 14) { y = 2.62 + extraFloors * 0.68; rDesk = 23.2 + extraFloors * 2.2; }
    else if (d >= 12) { y = 1.95; rDesk = 16.6; }
    else if (d >= 9) { y = 1.62; rDesk = 15.2; }
    else if (d >= 6) { y = 1.32; rDesk = 14.0; }
    else if (d >= 4) { y = 1.02; rDesk = 13.2; }

    // Ensure full circular floating island fits cleanly inside narrow portrait screens (390px) without cropping!
    const halfIsland = d >= 14 ? 4.95 : 4.65;
    const rWidth = isPortrait ? halfIsland / Math.max(0.14, tanHalfH * 0.96) : 0;
    const r = Math.max(rDesk, rWidth);
    return {
      y,
      r,
      phi: 1.04,
      theta: -0.34,
      minR: Math.max(6.8, r * 0.56),
      maxR: r * 1.58,
    };
  }

  function applySky(skyName) {
    const s = SKY_CFG[skyName] ? skyName : "day";
    const cfg = SKY_CFG[s];
    state.sky = s;
    scene.background.setHex(cfg.bg);
    scene.fog.color.setHex(cfg.fog);
    scene.fog.density = cfg.fogDensity;
    if (envs) scene.environment = envs[s];
    hemi.color.setHex(cfg.hemiSky);
    hemi.groundColor.setHex(cfg.hemiGround);
    hemi.intensity = cfg.hemiInt + (isSoftwareGL ? 0.3 : 0);
    key.color.setHex(cfg.keyColor);
    key.intensity = cfg.keyInt + (isSoftwareGL ? 0.22 : 0);
    key.position.set(...cfg.keyPos);
    rim.color.setHex(cfg.rimColor);
    rim.intensity = cfg.rimInt + (isSoftwareGL ? 0.18 : 0);
    camLight.color.setHex(s === "night" ? 0xc2d8ff : (s === "dusk" ? 0xffd2a8 : 0xfff9f0));
    camLight.intensity = s === "night" ? 0.42 : (s === "dusk" ? 0.52 : 0.48);
    amb.intensity = cfg.ambInt + (isSoftwareGL ? 0.24 : 0);
    nightGlow.intensity = cfg.nightGlow;
    kit.setNightFactor(cfg.nightFactor);
    skyRig.setSky(s);
    markShadowDirty();
  }

  function addPlaced(rig, pos, rotY = 0, scale = 1) {
    if (!rig || !rig.group) return;
    rig.group.position.set(pos[0], pos[1], pos[2]);
    rig.group.rotation.y = rotY;
    if (scale !== 1) rig.group.scale.setScalar(scale);
    islandRoot.add(rig.group);
    if (rig.anim) islandAnims.push(rig.anim);
  }

  function rebuildIsland() {
    const sig = `${state.totalDays}|${state.avatar}|${state.shields}`;
    if (sig === builtSig) return;
    builtSig = sig;

    while (islandRoot.children.length) {
      const ch = islandRoot.children[0];
      islandRoot.remove(ch);
      disposeDynamicTree(ch);
    }
    islandAnims = [];

    const d = state.totalDays;
    const hasTower = d >= 4;
    islandBaseRig = buildIslandBase(kit, hasTower);
    islandBaseRig.setShields(state.shields);
    islandRoot.add(islandBaseRig.group);
    islandAnims.push(islandBaseRig.anim);

    // Hero Companion: dead-center on Day 0-3 (right inside Focus Ring!), front pier once Tower rises on Day 4+!
    const hat = hatForDays(d);
    let compRig;
    if (state.avatar === "jack") compRig = buildHumanFigurine(kit, "jack", hat);
    else if (state.avatar === "jackie") compRig = buildHumanFigurine(kit, "jackie", hat);
    else compRig = buildCrab(kit, hat);
    if (hasTower) {
      addPlaced(compRig, [0.0, 0.0, 1.92], 0, state.avatar === "crab" ? 0.94 : 0.74);
    } else {
      addPlaced(compRig, [0.0, 0.025, 0.35], 0, state.avatar === "crab" ? 1.12 : 0.88);
    }

    // Central HK Tong Lau Tower Core with subtle hand-stacked organic micro-rotations
    const tx = 0, tz = -0.35;
    let topY = 0;
    if (d >= 4) { addPlaced(buildSprintMilestone(4, kit), [tx, topY, tz], 0.008, 1); topY += 1.25; }
    if (d >= 6) { addPlaced(buildSprintMilestone(6, kit), [tx, topY, tz], -0.016, 1); topY += 1.15; }
    if (d >= 9) { addPlaced(buildSprintMilestone(9, kit), [tx, topY, tz], 0.014, 1); topY += 1.1; }
    if (d >= 12) { addPlaced(buildSprintMilestone(12, kit), [tx, topY, tz], -0.012, 1); topY += 1.1; }

    // Day 15+ Extra Saver Floors gracefully stack between 4F and the 5F Rooftop Pergola!
    const extraFloors = d >= 14 ? Math.min(3, Math.floor((d - 14) / 8)) : 0;
    for (let k = 0; k < extraFloors; k++) {
      addPlaced(buildSaverFloor(15 + k * 8, kit), [tx, topY, tz], k % 2 ? -0.01 : 0.012, 1);
      topY += 1.05;
    }
    if (d >= 14) {
      addPlaced(buildSprintMilestone(14, kit), [tx, topY, tz], 0.008, 1);
    }

    // Perimeter Pier & Harbour Landmarks (cozy centered showcase on Day 0-3, harmonious 360° pier on Day 4+!)
    if (d >= 1) addPlaced(buildSprintMilestone(1, kit), hasTower ? [-1.68, 0, 1.62] : [-1.48, 0, 0.72], 0.36, hasTower ? 0.88 : 0.98);
    if (d >= 2) addPlaced(buildSprintMilestone(2, kit), hasTower ? [1.82, 0, 1.48] : [1.52, 0, 0.64], -0.46, hasTower ? 0.78 : 0.88);
    if (d >= 3) addPlaced(buildSprintMilestone(3, kit), hasTower ? [2.56, 0, 0.06] : [1.72, 0, -0.95], -0.9, hasTower ? 0.78 : 0.84);
    if (d >= 5) addPlaced(buildSprintMilestone(5, kit), [-2.38, 0, 0.36], 0.92, 0.82);
    if (d >= 7) addPlaced(buildSprintMilestone(7, kit), [3.72, -0.22, 3.05], -0.58, 0.9);
    if (d >= 8) addPlaced(buildSprintMilestone(8, kit), [-2.18, 0, -1.2], -0.52, 0.82);
    if (d >= 10) addPlaced(buildSprintMilestone(10, kit), [-3.22, 0, -0.45], 0.52, 0.92);
    if (d >= 11) addPlaced(buildSprintMilestone(11, kit), [-1.14, 0, 2.52], 0.28, 0.72);
    if (d >= 13) addPlaced(buildSprintMilestone(13, kit), [-3.82, -0.22, 2.95], 0.68, 0.92);

    // Post-14 Infinite HK Landmarks
    if (d >= 18) addPlaced(buildInfiniteMilestone(18, kit, { island: true }), [1.65, -0.22, 4.42], 0, 0.88);
    if (d >= 21) addPlaced(buildInfiniteMilestone(21, kit, { island: true }), [0.0, 0, -2.85], 0, 0.9);
    if (d >= 25) addPlaced(buildInfiniteMilestone(25, kit, { island: true }), [2.75, 0, 1.84], -0.48, 0.78);
    if (d >= 30) addPlaced(buildInfiniteMilestone(30, kit, { island: true }), [2.62, 0, -1.42], -2.22, 0.78);
    if (d >= 35) addPlaced(buildInfiniteMilestone(35, kit, { island: true }), [1.46, 0, 2.66], -0.42, 0.72);
    if (d >= 45) addPlaced(buildInfiniteMilestone(45, kit, { island: true }), [3.28, 0, -0.32], -0.55, 0.88);
    if (d >= 60) addPlaced(buildInfiniteMilestone(60, kit, { island: true }), [4.45, -0.22, -1.85], -1.95, 0.9);
    if (d >= 75) addPlaced(buildInfiniteMilestone(75, kit, { island: true }), [-2.18, -0.05, -2.96], 0.35, 0.95);
    if (d >= 90) addPlaced(buildInfiniteMilestone(90, kit, { island: true }), [2.18, -0.05, -2.88], -0.4, 0.92);
    if (d >= 100) addPlaced(buildInfiniteMilestone(100, kit, { island: true }), [-0.22, 0, 3.22], 0, 0.74);

    // Day 101+ Procedural Golden Skyline Wings every +14 days
    if (d >= 114) {
      const wings = Math.min(4, Math.floor((d - 100) / 14));
      const wingSpots = [[-1.2, -3.28], [1.2, -3.28], [-3.25, -2.18], [3.25, -2.18]];
      for (let w = 0; w < wings; w++) {
        addPlaced(buildSkylineWing(100 + (w + 1) * 14, kit), [wingSpots[w][0], 0, wingSpots[w][1]], 0, 0.76);
      }
    }

    // Re-apply current sky's emissive boost & refresh static shadow map
    kit.setNightFactor((SKY_CFG[state.sky] || SKY_CFG.day).nightFactor);
    markShadowDirty();
  }

  function buildSoloItem(day, locked) {
    while (inspectSlot.children.length) {
      const ch = inspectSlot.children[0];
      inspectSlot.remove(ch);
      disposeDynamicTree(ch);
    }
    inspectAnim = null;

    let rig = null;
    if (day <= 0) {
      const hat = hatForDays(state.totalDays);
      if (state.avatar === "jack") rig = buildHumanFigurine(kit, "jack", hat, { noShadow: true });
      else if (state.avatar === "jackie") rig = buildHumanFigurine(kit, "jackie", hat, { noShadow: true });
      else rig = buildCrab(kit, hat, { noShadow: true });
    } else if (day <= 14) {
      rig = buildSprintMilestone(day, kit);
    } else {
      rig = buildInfiniteMilestone(day, kit, { island: false });
    }
    if (!rig) rig = buildCrab(kit, null, { noShadow: true });

    const wrapper = new Group();
    wrapper.add(rig.group);
    inspectSlot.add(wrapper);

    // Auto-normalize bounding box so EVERY individual Thing sits heroically centered on the coaster!
    const box = computeContentBounds(rig.group);
    const size = new Vector3();
    const center = new Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z, 0.4);
    const sc = MathUtils.clamp(2.38 / maxDim, 0.55, 2.15);

    rig.group.scale.multiplyScalar(sc);
    rig.group.position.set(-center.x * sc, -box.min.y * sc + 0.16, -center.z * sc);

    if (locked) {
      applyLockedLook(rig.group, kit);
    }
    coaster.lockRing.visible = !!locked;
    inspectAnim = rig.anim || null;
    inspectPopTimer = reduceMotion() ? 0 : 0.45;
    kit.setNightFactor((SKY_CFG[state.sky] || SKY_CFG.day).nightFactor);
    markShadowDirty();
  }

  function applyCamera() {
    const f = framingForState();
    const r = MathUtils.clamp(radius, f.minR, f.maxR);
    const clampedPhi = MathUtils.clamp(phi, PHI_MIN, PHI_MAX);
    const sinP = Math.sin(clampedPhi);
    camera.position.set(
      r * sinP * Math.sin(theta),
      curTargetY + r * Math.cos(clampedPhi),
      r * sinP * Math.cos(theta),
    );
    camera.lookAt(0, curTargetY, 0);

    // Keep upper-left studio catchlight riding alongside the current swipe orbit angle
    const clTheta = theta + 0.48;
    const clPhi = Math.max(0.35, clampedPhi * 0.72);
    camLight.position.set(
      14 * Math.sin(clPhi) * Math.sin(clTheta),
      curTargetY + 14 * Math.cos(clPhi),
      14 * Math.sin(clPhi) * Math.cos(clTheta),
    );

    // Shift frustum vertically without distorting orbit perspective so hero sits centered above bottom dock
    if (Math.abs(curVerticalOffset) > 0.001) {
      camera.setViewOffset(viewW, viewH, 0, curVerticalOffset * viewH * 0.55, viewW, viewH);
    } else {
      camera.clearViewOffset();
    }
    camera.updateProjectionMatrix();
  }

  function resize() {
    if (disposed) return;
    const rect = containerEl.getBoundingClientRect();
    viewW = Math.max(1, Math.round(rect.width || window.innerWidth || 800));
    viewH = Math.max(1, Math.round(rect.height || window.innerHeight || 600));
    const dpr = isSoftwareGL ? 1 : Math.min(2, window.devicePixelRatio || 1);
    renderer.setPixelRatio(dpr);
    renderer.setSize(viewW, viewH, false);
    camera.aspect = viewW / viewH;
    const f = framingForState();
    targetRadius = MathUtils.clamp(f.r * userZoomScale, f.minR, f.maxR);
    applyCamera();
  }

  // ---------- Pointer / Touch 360° Swipe-to-Orbit, Pinch Zoom, Double-Tap Reset & Prop Raycast ----------
  const pointers = new Map();
  const raycaster = new Raycaster();
  let dragging = false;
  let dragStartX = 0, dragStartY = 0, dragTravel = 0, dragStartTime = 0;
  let lastX = 0, lastY = 0;
  let pinchDist0 = 0, pinchZoom0 = 1;
  let firstDragFired = false;
  let tickAccum = 0;
  let lastTapTime = 0;

  function onPointerDown(e) {
    if (disposed) return;
    try { cv.setPointerCapture(e.pointerId); } catch {}
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 1) {
      dragging = true;
      dragStartX = lastX = e.clientX;
      dragStartY = lastY = e.clientY;
      dragTravel = 0;
      dragStartTime = performance.now();
      velTheta = 0;
      velPhi = 0;
    } else if (pointers.size === 2) {
      dragging = false;
      const pts = [...pointers.values()];
      pinchDist0 = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1;
      pinchZoom0 = userZoomScale;
    }
  }

  function onPointerMove(e) {
    if (disposed || !pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) {
      const pts = [...pointers.values()];
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) || 1;
      const ratio = pinchDist0 / dist;
      userZoomScale = MathUtils.clamp(pinchZoom0 * ratio, 0.62, 1.5);
      const f = framingForState();
      targetRadius = MathUtils.clamp(f.r * userZoomScale, f.minR, f.maxR);
      return;
    }
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    dragTravel += Math.hypot(dx, dy);

    const sens = (Math.PI * 1.45) / Math.max(320, Math.min(viewW, viewH));
    const dTheta = -dx * sens;
    const dPhi = -dy * sens * 0.72;
    targetTheta += dTheta;
    targetPhi = MathUtils.clamp(targetPhi + dPhi, PHI_MIN, PHI_MAX);
    // Immediate responsive blend + velocity inertia so swiping feels lush & instantaneous
    theta += dTheta * 0.55;
    phi = MathUtils.clamp(phi + dPhi * 0.55, PHI_MIN, PHI_MAX);
    velTheta = MathUtils.clamp(dTheta * 22, -6.5, 6.5);
    velPhi = MathUtils.clamp(dPhi * 16, -4.0, 4.0);
    applyCamera();
    scheduleImmediateRender();

    if (!firstDragFired && dragTravel > 6) {
      firstDragFired = true;
      if (typeof opts.onFirstDrag === "function") {
        try { opts.onFirstDrag(); } catch {}
      }
    }
    tickAccum += Math.abs(dTheta);
    if (tickAccum >= 0.24) {
      tickAccum = 0;
      if (typeof opts.onOrbitTick === "function") {
        try { opts.onOrbitTick(); } catch {}
      }
    }
  }

  function handleTap(clientX, clientY) {
    const now = performance.now();
    if (now - lastTapTime < 310) {
      lastTapTime = 0;
      resetCamera();
      return;
    }
    lastTapTime = now;

    if (typeof opts.onTapProp !== "function") return;
    const rect = cv.getBoundingClientRect();
    const ndc = new Vector2(
      ((clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1,
      -((clientY - rect.top) / Math.max(1, rect.height)) * 2 + 1,
    );
    raycaster.setFromCamera(ndc, camera);
    const targetObj = mode === "item" ? inspectSlot : islandRoot;
    const hits = raycaster.intersectObject(targetObj, true);
    for (const h of hits) {
      const day = h.object.userData.milestoneDay;
      const prop = h.object.userData.prop;
      if (typeof day === "number") {
        try { opts.onTapProp({ day, prop }); } catch {}
        return;
      }
    }
    if (mode === "island") {
      try { opts.onTapProp({ day: null, prop: "pier" }); } catch {}
    }
  }

  function onPointerUp(e) {
    if (disposed) return;
    const wasDragging = dragging && pointers.size === 1;
    pointers.delete(e.pointerId);
    if (pointers.size === 0) dragging = false;
    if (wasDragging && dragTravel < 8 && performance.now() - dragStartTime < 420) {
      handleTap(e.clientX, e.clientY);
    }
  }

  function onWheel(e) {
    if (disposed) return;
    e.preventDefault();
    const step = Math.sign(e.deltaY) * 0.08;
    userZoomScale = MathUtils.clamp(userZoomScale + step, 0.62, 1.5);
    const f = framingForState();
    targetRadius = MathUtils.clamp(f.r * userZoomScale, f.minR, f.maxR);
  }

  function onContextLost(e) {
    e.preventDefault();
  }

  cv.addEventListener("pointerdown", onPointerDown);
  cv.addEventListener("pointermove", onPointerMove);
  cv.addEventListener("pointerup", onPointerUp);
  cv.addEventListener("pointercancel", onPointerUp);
  cv.addEventListener("wheel", onWheel, { passive: false });
  cv.addEventListener("webglcontextlost", onContextLost);
  window.addEventListener("resize", resize);

  // ---------- Controller Methods ----------
  function setState(next = {}) {
    if (disposed) return;
    if (next.totalDays != null) state.totalDays = Math.max(0, Math.floor(Number(next.totalDays) || 0));
    if (next.streak != null) state.streak = Math.max(0, Math.floor(Number(next.streak) || 0));
    if (next.shields != null) state.shields = Math.max(0, Math.floor(Number(next.shields) || 0));
    if (next.avatar) state.avatar = next.avatar;
    if (next.mood) state.mood = next.mood;
    if (next.sky) applySky(next.sky);

    rebuildIsland();
    if (mode === "item" && inspectDay === 0) {
      buildSoloItem(0, false);
    }
    const f = framingForState();
    targetY = f.y;
    targetRadius = MathUtils.clamp(f.r * userZoomScale, f.minR, f.maxR);
    if (isSoftwareGL) {
      curTargetY = targetY;
      radius = targetRadius;
      scheduleImmediateRender();
    }
  }

  function inspectMilestone(dayOrNull, inspectOpts = {}) {
    if (disposed) return;
    if (dayOrNull === null || dayOrNull === undefined) {
      const wasItem = mode === "item";
      mode = "island";
      inspectDay = null;
      inspectLocked = false;
      islandRoot.visible = true;
      inspectStage.visible = false;
      skyRig.setInspectLook(false);
      userZoomScale = 1.0;
      const f = framingForState();
      targetY = f.y;
      targetRadius = f.r;
      targetPhi = f.phi;
      targetTheta = f.theta;
      markShadowDirty();
      if (wasItem) {
        curTargetY = f.y;
        radius = f.r;
        phi = f.phi;
        theta = f.theta;
        velTheta = 0;
        velPhi = 0;
        applyCamera();
        scheduleImmediateRender();
      }
      return;
    }
    const d = Math.max(0, Math.floor(Number(dayOrNull) || 0));
    mode = "item";
    inspectDay = d;
    inspectLocked = !!inspectOpts.locked;
    islandRoot.visible = false;
    inspectStage.visible = true;
    skyRig.setInspectLook(true);
    buildSoloItem(d, inspectLocked);
    userZoomScale = 1.0;
    const f = framingForState();
    targetY = f.y;
    curTargetY = f.y;
    targetRadius = f.r;
    radius = f.r;
    targetPhi = f.phi;
    phi = f.phi;
    targetTheta = f.theta;
    theta = f.theta;
    velTheta = 0;
    velPhi = 0;
    applyCamera();
    scheduleImmediateRender();
  }

  function resetCamera() {
    userZoomScale = 1.0;
    const f = framingForState();
    targetTheta = f.theta;
    targetPhi = f.phi;
    targetRadius = f.r;
    targetY = f.y;
    velTheta = 0;
    velPhi = 0;
    if (isSoftwareGL) {
      theta = f.theta;
      phi = f.phi;
      radius = f.r;
      curTargetY = f.y;
      applyCamera();
      scheduleImmediateRender();
    }
  }

  function nudgeOrbit(dTheta = 0, dPhi = 0) {
    targetTheta += Number(dTheta) || 0;
    targetPhi = MathUtils.clamp(targetPhi + (Number(dPhi) || 0), PHI_MIN, PHI_MAX);
    theta += (Number(dTheta) || 0) * (isSoftwareGL ? 1.0 : 0.45);
    phi = MathUtils.clamp(phi + (Number(dPhi) || 0) * (isSoftwareGL ? 1.0 : 0.45), PHI_MIN, PHI_MAX);
    applyCamera();
    scheduleImmediateRender();
  }

  function setVerticalOffset(ndcY) {
    verticalOffset = MathUtils.clamp(Number(ndcY) || 0, -0.55, 0.55);
    if (isSoftwareGL) {
      curVerticalOffset = verticalOffset;
      applyCamera();
      scheduleImmediateRender();
    }
  }

  function setFocusProgress(p) {
    focusAura.setProgress(p);
    scheduleImmediateRender();
  }

  function celebrate(kind = "yes") {
    bounceTimer = reduceMotion() ? 0 : 0.65;
    const originY = mode === "item" ? 1.5 : Math.min(4.2, curTargetY + 0.9);
    celebFX.spawn(kind, originY);
    scheduleImmediateRender();
  }

  function getMode() {
    return { mode, inspectDay };
  }

  function getCameraAngles() {
    return {
      theta: Number(theta.toFixed(4)),
      phi: Number(phi.toFixed(4)),
      radius: Number(radius.toFixed(4)),
    };
  }

  function snapshot(w = 800, h = 600) {
    if (disposed) return "";
    const prevW = viewW, prevH = viewH;
    const prevPr = renderer.getPixelRatio();
    const prevOff = curVerticalOffset;
    const sw = Math.max(64, Math.round(w));
    const sh = Math.max(64, Math.round(h));

    renderer.setPixelRatio(1);
    renderer.setSize(sw, sh, false);
    camera.aspect = sw / sh;
    curVerticalOffset = 0;
    camera.clearViewOffset();
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    let url = "";
    try {
      url = renderer.domElement.toDataURL("image/png");
    } catch {
      url = "";
    }

    // Restore live viewport state seamlessly
    renderer.setPixelRatio(prevPr);
    renderer.setSize(prevW, prevH, false);
    camera.aspect = prevW / Math.max(1, prevH);
    curVerticalOffset = prevOff;
    applyCamera();
    renderer.render(scene, camera);
    return url;
  }

  // ---------- Main Animation Loop (Full 60fps on GPU; polite non-starving throttle on Software WebGL!) ----------
  let rafId = 0;
  let softTimerId = 0;
  let lastNow = performance.now();
  let elapsed = 0;

  function scheduleImmediateRender() {
    if (disposed || !isSoftwareGL) return;
    if (softTimerId) { clearTimeout(softTimerId); softTimerId = 0; }
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  function tick(now) {
    rafId = 0;
    if (disposed) return;
    if (document.hidden) {
      lastNow = now;
      return;
    }
    const dt = Math.min(0.05, Math.max(0.001, (now - lastNow) / 1000));
    lastNow = now;
    const reduce = reduceMotion();
    if (!reduce) elapsed += dt;

    // Silky inertia & smooth damped camera tracking
    if (!dragging) {
      if (Math.abs(velTheta) > 0.001 || Math.abs(velPhi) > 0.001) {
        targetTheta += velTheta * dt;
        targetPhi = MathUtils.clamp(targetPhi + velPhi * dt, PHI_MIN, PHI_MAX);
        const damp = Math.exp(-5.4 * dt);
        velTheta *= damp;
        velPhi *= damp;
      } else if (!reduce && mode === "item" && !isSoftwareGL) {
        // Gentle slow museum turntable rotation when inspecting a solo 3D Thing!
        targetTheta += dt * 0.22;
      }
    }

    const lerpK = 1 - Math.exp(-9.5 * dt);
    theta += (targetTheta - theta) * lerpK;
    phi += (targetPhi - phi) * lerpK;
    radius += (targetRadius - radius) * lerpK;
    curTargetY += (targetY - curTargetY) * lerpK;
    curVerticalOffset += (verticalOffset - curVerticalOffset) * lerpK;

    // Celebration bounce spring
    let bounceScale = 1;
    if (bounceTimer > 0) {
      bounceTimer = Math.max(0, bounceTimer - dt);
      const u = 1 - bounceTimer / 0.65;
      bounceScale = 1 + Math.sin(u * Math.PI * 2) * (1 - u) * 0.07;
    }
    islandRoot.scale.setScalar(bounceScale);

    // Inspect item elastic pop-in
    if (mode === "item") {
      if (inspectPopTimer > 0) {
        inspectPopTimer = Math.max(0, inspectPopTimer - dt);
        const u = 1 - inspectPopTimer / 0.45;
        const s = 0.55 + 0.45 * (1 - Math.pow(1 - u, 3)) + Math.sin(u * Math.PI) * 0.08;
        inspectSlot.scale.setScalar(s * bounceScale);
      } else {
        inspectSlot.scale.setScalar(bounceScale);
      }
      if (inspectAnim && !reduce) inspectAnim(elapsed, dt, { mood: state.mood });
      if (coaster.lockRing.visible && !reduce) {
        coaster.lockRing.scale.setScalar(1 + Math.sin(elapsed * 2.8) * 0.03);
      }
    } else if (!reduce) {
      const ctx = { mood: state.mood };
      for (let i = 0; i < islandAnims.length; i++) islandAnims[i](elapsed, dt, ctx);
    }

    skyRig.anim(elapsed, reduce);
    focusAura.anim(elapsed, mode === "item", state.totalDays >= 4 ? 1.92 : 0.35);
    celebFX.update(dt);
    applyCamera();
    renderer.render(scene, camera);

    if (isSoftwareGL) {
      const busy = dragging || bounceTimer > 0 || inspectPopTimer > 0;
      softTimerId = setTimeout(() => {
        softTimerId = 0;
        if (!disposed && !document.hidden && !rafId) rafId = requestAnimationFrame(tick);
      }, busy ? 40 : 180);
    } else {
      rafId = requestAnimationFrame(tick);
    }
  }

  function onVisibility() {
    if (!document.hidden && !disposed && !rafId && !softTimerId) {
      lastNow = performance.now();
      rafId = requestAnimationFrame(tick);
    }
  }
  document.addEventListener("visibilitychange", onVisibility);

  function dispose() {
    if (disposed) return;
    disposed = true;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
    if (softTimerId) clearTimeout(softTimerId);
    softTimerId = 0;
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("resize", resize);
    cv.removeEventListener("pointerdown", onPointerDown);
    cv.removeEventListener("pointermove", onPointerMove);
    cv.removeEventListener("pointerup", onPointerUp);
    cv.removeEventListener("pointercancel", onPointerUp);
    cv.removeEventListener("wheel", onWheel);
    cv.removeEventListener("webglcontextlost", onContextLost);
    disposeDynamicTree(islandRoot);
    disposeDynamicTree(inspectSlot);
    skyRig.dispose();
    celebFX.dispose();
    if (envs) Object.values(envs).forEach((t) => t.dispose());
    kit.dispose();
    renderer.dispose();
    if (cv.parentNode) cv.remove();
  }

  // Initial build + first crisp synchronous frame!
  applySky(state.sky);
  rebuildIsland();
  resize();
  const f0 = framingForState();
  targetY = curTargetY = f0.y;
  targetRadius = radius = f0.r;
  targetPhi = phi = f0.phi;
  targetTheta = theta = f0.theta;
  applyCamera();
  renderer.render(scene, camera);
  if (isSoftwareGL) {
    softTimerId = setTimeout(() => {
      softTimerId = 0;
      if (!disposed && !document.hidden && !rafId) rafId = requestAnimationFrame(tick);
    }, 180);
  } else {
    rafId = requestAnimationFrame(tick);
  }

  return {
    setState,
    inspectMilestone,
    getMode,
    setFocusProgress,
    celebrate,
    getCameraAngles,
    nudgeOrbit,
    resetCamera,
    setVerticalOffset,
    resize,
    snapshot,
    dispose,
  };
}

window.TFF_DAILY3D = { isSupported, mount };
