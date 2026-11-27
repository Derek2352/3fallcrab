// Sculpted 3D clay builders for Harbour Keep: Starter Island, Companions (Crab/Jack/Jackie), and Days 1-14 Milestones.
// Every milestone builder returns { group, anim(t, dt, ctx) } resting cleanly at y = 0 in local space for BOTH Island & Inspect modes.
import {
  BoxGeometry,
  CapsuleGeometry,
  ConeGeometry,
  CylinderGeometry,
  DoubleSide,
  ExtrudeGeometry,
  Group,
  OctahedronGeometry,
  PlaneGeometry,
  RingGeometry,
  Shape,
  SphereGeometry,
  TorusGeometry,
} from "three";
import {
  addContactShadow,
  latheGeo,
  mesh,
  roundedBoxGeo,
  sculptGeo,
  tagMilestone,
  tubeGeo,
} from "./materials.js";

function starExtrude(rOut, rIn, depth = 0.04) {
  const s = new Shape();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 ? rIn : rOut;
    const a = Math.PI / 2 + (i * Math.PI) / 5;
    const x = Math.cos(a) * r, y = Math.sin(a) * r;
    if (i) s.lineTo(x, y); else s.moveTo(x, y);
  }
  s.closePath();
  const geo = new ExtrudeGeometry(s, { depth, bevelEnabled: true, bevelThickness: 0.012, bevelSize: 0.01, bevelSegments: 2 });
  geo.center();
  return geo;
}

// ---------- Companion Hats (Day 14 Halo, Day 30 Straw Hat, Day 100 Top Hat) ----------
export function buildCompanionHat(kit, hat) {
  const g = new Group();
  if (!hat) return { group: g, anim: null };
  if (hat === "halo") {
    const gold = kit.metal(0xffcc38, 0.18, 0.85);
    const glow = kit.emissive(0xffe169, 0.6, 1.4);
    const ring = mesh(new TorusGeometry(0.28, 0.036, 14, 36), gold, { rot: [Math.PI / 2, 0, 0] });
    const inner = mesh(new TorusGeometry(0.28, 0.018, 10, 32), glow, { rot: [Math.PI / 2, 0, 0], cast: false });
    g.add(ring, inner);
    const stars = [];
    for (let i = 0; i < 3; i++) {
      const a = (i * Math.PI * 2) / 3;
      const st = mesh(new OctahedronGeometry(0.038, 0), glow, {
        pos: [Math.cos(a) * 0.37, 0.03, Math.sin(a) * 0.37],
        cast: false,
      });
      stars.push(st);
      g.add(st);
    }
    return {
      group: g,
      anim(t) {
        g.position.y = Math.sin(t * 2.6) * 0.035;
        g.rotation.y = t * 1.1;
        stars.forEach((s, i) => {
          s.scale.setScalar(0.8 + 0.3 * Math.sin(t * 4.2 + i * 2.1));
        });
      },
    };
  }
  if (hat === "straw") {
    const straw = kit.fabric(0xecc86f, { rough: 0.68 });
    const strawLight = kit.fabric(0xf5d98a, { rough: 0.64 });
    const ribbon = kit.fabric(0xe8483c, { rough: 0.62 });
    const brim = mesh(latheGeo([[0.0, 0.02], [0.22, 0.03], [0.42, 0.0], [0.44, -0.025], [0.2, 0.0], [0.0, 0.0]], 28), straw);
    const crown = mesh(latheGeo([[0.22, 0.0], [0.21, 0.14], [0.16, 0.2], [0.0, 0.21]], 24), strawLight);
    const band = mesh(new CylinderGeometry(0.218, 0.224, 0.055, 24), ribbon, { pos: [0, 0.05, 0] });
    const knot = mesh(new SphereGeometry(0.042, 10, 10), ribbon, { pos: [0.21, 0.05, 0.06] });
    g.add(brim, crown, band, knot);
    return { group: g, anim: null };
  }
  if (hat === "tophat") {
    const silk = kit.enamel(0x232532, { rough: 0.24 });
    const band = kit.metal(0xffc93c, 0.22, 0.82);
    const brim = mesh(new CylinderGeometry(0.36, 0.37, 0.04, 28), silk, { pos: [0, 0.02, 0] });
    const rim = mesh(new TorusGeometry(0.36, 0.02, 10, 28), silk, { rot: [Math.PI / 2, 0, 0], pos: [0, 0.02, 0] });
    const crown = mesh(new CylinderGeometry(0.25, 0.21, 0.34, 28), silk, { pos: [0, 0.21, 0] });
    const ribbon = mesh(new CylinderGeometry(0.225, 0.218, 0.075, 28), band, { pos: [0, 0.08, 0] });
    g.add(brim, rim, crown, ribbon);
    return { group: g, anim: null };
  }
  return { group: g, anim: null };
}

function openMouthGeo(w = 0.2, hTop = 0.045, hBot = 0.13, depth = 0.03) {
  const s = new Shape();
  s.moveTo(-w, hTop * 0.4);
  s.quadraticCurveTo(0, -hTop * 0.35, w, hTop * 0.4);
  s.bezierCurveTo(w * 1.06, -hBot * 0.85, -w * 1.06, -hBot * 0.85, -w, hTop * 0.4);
  s.closePath();
  return new ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: 14 });
}

function crabClawGeo() {
  const s = new Shape();
  // Plump C-shaped clay mitten pincer opening cleanly upward-inward (-X, +Y)
  s.moveTo(0.02, -0.14);
  s.bezierCurveTo(0.18, -0.14, 0.22, 0.04, 0.14, 0.18);
  s.bezierCurveTo(0.08, 0.26, -0.03, 0.25, -0.05, 0.17);
  s.bezierCurveTo(-0.07, 0.11, -0.02, 0.06, 0.02, 0.05);
  s.quadraticCurveTo(0.06, 0.02, 0.01, -0.015);
  s.bezierCurveTo(-0.03, -0.035, -0.085, 0.015, -0.115, 0.085);
  s.bezierCurveTo(-0.14, 0.135, -0.195, 0.115, -0.175, 0.025);
  s.bezierCurveTo(-0.15, -0.08, -0.075, -0.14, 0.02, -0.14);
  s.closePath();
  const geo = new ExtrudeGeometry(s, {
    depth: 0.14,
    bevelEnabled: true,
    bevelThickness: 0.065,
    bevelSize: 0.046,
    bevelSegments: 5,
    curveSegments: 12,
  });
  geo.center();
  return geo;
}

function pleatedSkirtGeo(rTop = 0.128, rBot = 0.23, h = 0.265, pleats = 16) {
  const geo = new CylinderGeometry(rTop, rBot, h, pleats * 4, 2);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const px = pos.getX(i), py = pos.getY(i), pz = pos.getZ(i);
    const rad = Math.hypot(px, pz);
    if (rad < 0.01) continue;
    const ang = Math.atan2(pz, px);
    const t = Math.max(0, Math.min(1, 0.5 - py / h)); // 0 at waist, 1 at hem
    const phase = (((ang * pleats) / Math.PI) % 2 + 2) % 2;
    const saw = Math.abs(phase - 1) * 2 - 1; // sharp knife-pleat fold
    const depth = 0.008 + 0.019 * t;
    const scale = (rad + saw * depth) / rad;
    pos.setX(i, px * scale);
    pos.setZ(i, pz * scale);
  }
  pos.needsUpdate = true;
  const creased = geo.toNonIndexed();
  creased.computeVertexNormals();
  return creased;
}

// ---------- Hero 3 Fall Crab (Canonical Matte Terracotta Clay + Giant Eyeballs + D-Mouth!) ----------
export function buildCrab(kit, hat = null, opts = {}) {
  const root = new Group();
  const body = new Group();
  root.add(body);

  const shellMat = opts.golden ? kit.metal(0xffc83d, 0.2, 0.88) : kit.clay(0xd44428, { rough: 0.58 });
  const limbMat = opts.golden ? kit.metal(0xffd75e, 0.18, 0.88) : kit.clay(0xe05538, { rough: 0.55 });
  const lipMat = opts.golden ? kit.metal(0xeaa528, 0.24, 0.82) : kit.clay(0xb9361e, { rough: 0.62 });
  const mouthInMat = opts.golden ? kit.clay(0x4a2e08, { rough: 0.7 }) : kit.clay(0x69180d, { rough: 0.84 });
  const tongueMat = opts.golden ? kit.metal(0xf59e3d, 0.22, 0.78) : kit.clay(0xf0755a, { rough: 0.52 });
  const scleraMat = kit.clay(0xf6ece0, { rough: 0.34 });
  const darkMat = kit.gloss(0x181922, { rough: 0.12 });
  const whiteSparkMat = kit.gloss(0xffffff, { rough: 0.1 });

  // Plump hand-sculpted bun carapace (consistent terracotta clay, no separate cream belly or side warts!)
  const carapace = mesh(sculptGeo(new SphereGeometry(0.58, 32, 24), 0.014, 3.5, 11, { yScale: 0.65 }), shellMat, {
    pos: [0, 0.48, 0],
    scale: [1.26, 0.78, 0.96],
  });
  const lowerRim = mesh(new TorusGeometry(0.45, 0.056, 10, 28), lipMat, {
    pos: [0, 0.25, 0.01],
    rot: [Math.PI / 2, 0, 0],
    scale: [1.22, 0.92, 0.68],
  });
  body.add(carapace, lowerRim);

  // 6 Plump curved clay walking legs splayed naturally so multiple pairs read in front view
  const legReach = [0.71, 0.78, 0.68];
  const legZ = [-0.21, 0.01, 0.22];
  for (const sx of [-1, 1]) {
    for (let i = 0; i < 3; i++) {
      const z0 = legZ[i];
      const rx = legReach[i];
      body.add(
        mesh(tubeGeo([
          [sx * 0.48, 0.31, z0],
          [sx * (rx - 0.07), 0.22, z0 * 1.06 + 0.01],
          [sx * rx, 0.052, z0 * 1.12 + 0.02],
        ], 0.056, 12, 10), limbMat),
        mesh(new SphereGeometry(0.055, 10, 8), limbMat, { pos: [sx * rx, 0.052, z0 * 1.12 + 0.02] }),
      );
    }
  }

  // 2 Articulated arm + plump 3D C-shaped mitten claws held cheerfully upward
  const claws = [];
  const clawGeo = crabClawGeo();
  for (const sx of [-1, 1]) {
    const pivot = new Group();
    pivot.position.set(sx * 0.48, 0.48, 0.12);
    const arm = mesh(tubeGeo([[0, 0, 0], [sx * 0.19, 0.13, 0.11], [sx * 0.24, 0.27, 0.17]], 0.064, 12, 10), limbMat);
    const cuff = mesh(new TorusGeometry(0.068, 0.02, 8, 16), lipMat, {
      pos: [sx * 0.24, 0.29, 0.17],
      rot: [Math.PI / 2 - 0.15, 0, sx * -0.2],
    });
    const mitten = mesh(clawGeo, shellMat, {
      pos: [sx * 0.24, 0.43, 0.19],
      rot: [0.16, sx < 0 ? Math.PI - 0.24 : 0.24, sx * 0.12],
    });
    pivot.add(arm, cuff, mitten);
    body.add(pivot);
    claws.push({ pivot, sx });
  }

  // Signature tall close-set stalks & giant touching cartoon white clay eyeballs!
  for (const sx of [-1, 1]) {
    body.add(
      mesh(tubeGeo([
        [sx * 0.14, 0.78, 0.13],
        [sx * 0.152, 0.95, 0.165],
        [sx * 0.158, 1.10, 0.195],
      ], 0.054, 10, 10), limbMat),
      mesh(new TorusGeometry(0.068, 0.018, 8, 16), lipMat, {
        pos: [sx * 0.158, 1.07, 0.195],
        rot: [Math.PI / 2 - 0.12, 0, 0],
      }),
      mesh(new SphereGeometry(0.164, 24, 20), scleraMat, {
        pos: [sx * 0.162, 1.21, 0.205],
        scale: [0.98, 1.04, 0.94],
      }),
      mesh(new SphereGeometry(0.088, 18, 14), darkMat, {
        pos: [sx * 0.138, 1.205, 0.322],
      }),
      mesh(new SphereGeometry(0.027, 8, 8), whiteSparkMat, {
        pos: [sx * 0.166, 1.252, 0.394],
        cast: false,
      }),
    );
  }

  // Joyful open D-shaped sculpted clay mouth + plump coral tongue (lifted off bottom rim!)
  const mouthCav = mesh(openMouthGeo(0.20, 0.052, 0.14, 0.045), mouthInMat, {
    pos: [0, 0.468, 0.518],
    rot: [0.02, 0, 0],
    cast: false,
  });
  const tongue = mesh(new SphereGeometry(0.10, 14, 10), tongueMat, {
    pos: [0, 0.392, 0.554],
    scale: [1.18, 0.5, 0.46],
    cast: false,
  });
  const lipLoop = mesh(tubeGeo([
    [-0.21, 0.488, 0.515],
    [0, 0.463, 0.562],
    [0.21, 0.488, 0.515],
    [0.135, 0.365, 0.525],
    [0, 0.34, 0.54],
    [-0.135, 0.365, 0.525],
  ], 0.019, 24, 8, true), lipMat, { cast: false });
  body.add(mouthCav, tongue, lipLoop);

  // Hat mount above raised eyeballs
  const hatRig = buildCompanionHat(kit, hat);
  const hatHolder = new Group();
  hatHolder.position.set(0, hat === "halo" ? 1.50 : 1.37, 0.17);
  hatHolder.add(hatRig.group);
  body.add(hatHolder);

  if (!opts.noShadow) addContactShadow(root, 0.78, 0.62, 0.014, 0.34, kit);

  return {
    group: tagMilestone(root, 0, "crab"),
    anim(t, dt, ctx = {}) {
      const mood = ctx.mood || "idle";
      const speed = mood === "happy" || mood === "proud" ? 5.2 : (mood === "focus" ? 1.4 : 2.3);
      const bobAmp = mood === "happy" ? 0.07 : 0.025;
      body.position.y = Math.abs(Math.sin(t * speed)) * bobAmp;
      body.rotation.z = Math.sin(t * speed * 0.5) * (mood === "happy" ? 0.075 : 0.028);
      claws.forEach(({ pivot, sx }, idx) => {
        const wave = mood === "happy" || mood === "proud"
          ? 0.22 + Math.sin(t * 7.5 + idx * Math.PI) * 0.24
          : Math.sin(t * 2.1 + idx * 1.4) * 0.09;
        pivot.rotation.z = sx * wave;
        pivot.rotation.x = mood === "happy" ? -0.16 : 0;
      });
      if (hatRig.anim) hatRig.anim(t, dt, ctx);
    },
  };
}

// ---------- Canonical Stop-Motion Clay Human Figurine (Jack & Jackie ~1:3.8 Puppet Proportions) ----------
export function buildHumanFigurine(kit, who = "jack", hat = null, opts = {}) {
  const isJackie = who === "jackie";
  const root = new Group();
  const fig = new Group();
  fig.scale.setScalar(isJackie ? 0.97 : 1.02); // Canonical Jack ~5% taller than Jackie
  root.add(fig);

  const skin = kit.clay(0xe5ab84, { rough: 0.58 });
  const noseMat = kit.clay(0xdd9c73, { rough: 0.58 });
  const blushMat = kit.clay(0xdf8876, { rough: 0.68 });
  const hairCol = isJackie ? 0x2d201a : 0x362922;
  const hair = kit.clay(hairCol, { rough: 0.64 });
  const darkEye = kit.gloss(0x181922, { rough: 0.12 });
  const whiteSpark = kit.gloss(0xffffff, { rough: 0.1 });
  const mouthIn = kit.clay(0x6b232b, { rough: 0.8 });
  const tongue = kit.clay(0xeb7870, { rough: 0.52 });

  const shirtCream = kit.fabric(0xefe2d6, { rough: 0.74 });
  const sneakerUpper = kit.clay(isJackie ? 0xeae2d6 : 0xd4c4b4, { rough: 0.58 });
  const sneakerSole = kit.clay(0xf6f2ea, { rough: 0.62 });
  const vestMat = kit.fabric(0xc59873, { rough: 0.78 });
  const trouserMat = kit.fabric(0x46342b, { rough: 0.76 });
  const skirtMat = kit.fabric(0x787072, { rough: 0.76 });
  const lanyardMat = kit.fabric(0x3d6ba6, { rough: 0.68 });
  const packMat = kit.fabric(0x3f689e, { rough: 0.74 });
  const toteMat = kit.fabric(0xeae0cf, { rough: 0.76 });
  const clipMat = kit.clay(0xda7484, { rough: 0.42 });

  // Chunky off-white sneakers + slim stop-motion legs
  for (const sx of [-1, 1]) {
    fig.add(
      mesh(roundedBoxGeo(0.115, 0.036, 0.19, 0.04, 0.01), sneakerSole, { pos: [sx * 0.095, 0.018, 0.018] }),
      mesh(new SphereGeometry(0.068, 14, 12), sneakerUpper, { pos: [sx * 0.095, 0.058, 0.022], scale: [0.84, 0.62, 1.32] }),
      mesh(roundedBoxGeo(0.056, 0.012, 0.05, 0.005, 0.003), sneakerSole, { pos: [sx * 0.095, 0.088, 0.045] }),
    );
    if (isJackie) {
      // Mid-calf white crew socks + slender bare clay calves
      fig.add(
        mesh(new CylinderGeometry(0.042, 0.04, 0.14, 14), sneakerSole, { pos: [sx * 0.092, 0.15, 0] }),
        mesh(new TorusGeometry(0.043, 0.01, 8, 14), sneakerSole, { pos: [sx * 0.092, 0.218, 0], rot: [Math.PI / 2, 0, 0] }),
        mesh(new CylinderGeometry(0.042, 0.039, 0.30, 14), skin, { pos: [sx * 0.092, 0.36, 0] }),
      );
    } else {
      // Relaxed straight-leg dark chocolate trousers pooling cleanly at ankle cuff
      fig.add(
        mesh(new CapsuleGeometry(0.06, 0.46, 6, 12), trouserMat, { pos: [sx * 0.095, 0.38, 0] }),
        mesh(new TorusGeometry(0.06, 0.014, 8, 14), trouserMat, { pos: [sx * 0.095, 0.125, 0.005], rot: [Math.PI / 2, 0, 0] }),
      );
    }
  }

  // Canonical University outfits
  if (isJackie) {
    // 3D knife-pleated charcoal school skirt (16 deep pleats) + waistband
    fig.add(
      mesh(pleatedSkirtGeo(0.128, 0.23, 0.265, 16), skirtMat, { pos: [0, 0.59, 0] }),
      mesh(new CylinderGeometry(0.132, 0.134, 0.045, 24), skirtMat, { pos: [0, 0.72, 0] }),
      // Cream short-sleeve collared polo blouse tucked into waistband
      mesh(roundedBoxGeo(0.28, 0.34, 0.185, 0.07, 0.024), shirtCream, { pos: [0, 0.89, 0] }),
    );
    // Pointed polo shirt collars + small V neckline placket
    for (const sx of [-1, 1]) {
      fig.add(mesh(roundedBoxGeo(0.064, 0.022, 0.074, 0.01, 0.005), shirtCream, {
        pos: [sx * 0.046, 1.055, 0.062],
        rot: [0.42, sx * -0.25, sx * -0.18],
      }));
    }
    fig.add(mesh(tubeGeo([[-0.018, 1.04, 0.094], [0, 0.99, 0.096], [0.018, 1.04, 0.094]], 0.009, 8, 6), kit.clay(0xd5c0b0), { cast: false }));

    // Soft sculpted cream canvas tote bag tucked behind right hip with zero arm clipping
    fig.add(
      mesh(new SphereGeometry(0.118, 16, 14), toteMat, { pos: [-0.17, 0.62, -0.078], rot: [0.1, 0.15, 0.08], scale: [0.52, 1.15, 1.05] }),
      mesh(roundedBoxGeo(0.068, 0.026, 0.21, 0.01, 0.006), toteMat, { pos: [-0.168, 0.735, -0.074], rot: [0.08, 0.15, 0.08] }),
      mesh(tubeGeo([[-0.168, 0.74, -0.01], [-0.145, 1.045, -0.01], [-0.168, 0.74, -0.125]], 0.013, 14, 8), toteMat),
    );
  } else {
    // Straight trouser hips + cream inner tee hem + oatmeal-tan sleeveless knit sweater vest
    fig.add(
      mesh(roundedBoxGeo(0.285, 0.14, 0.185, 0.06, 0.02), trouserMat, { pos: [0, 0.63, 0] }),
      mesh(roundedBoxGeo(0.305, 0.055, 0.195, 0.03, 0.012), shirtCream, { pos: [0, 0.71, 0] }),
      mesh(roundedBoxGeo(0.31, 0.34, 0.20, 0.075, 0.026), vestMat, { pos: [0, 0.89, 0] }),
      mesh(roundedBoxGeo(0.32, 0.042, 0.206, 0.025, 0.01), kit.fabric(0xb2845e, { rough: 0.8 }), { pos: [0, 0.735, 0] }),
    );
    // Clean V-neck knitted trim & cream inner collar panels (zero box-edge z-fighting)
    const vTrimMat = kit.fabric(0xb58660, { rough: 0.8 });
    fig.add(
      mesh(tubeGeo([[-0.066, 1.05, 0.088], [0, 0.945, 0.106], [0.066, 1.05, 0.088]], 0.013, 12, 8), vTrimMat),
      mesh(new CylinderGeometry(0.062, 0.008, 0.115, 3), shirtCream, { pos: [0, 1.01, 0.088], scale: [1.05, 1.0, 0.25], rot: [0, Math.PI, 0] }),
    );
    for (const sx of [-1, 1]) {
      fig.add(mesh(roundedBoxGeo(0.064, 0.02, 0.072, 0.01, 0.005), shirtCream, {
        pos: [sx * 0.048, 1.06, 0.058],
        rot: [0.42, sx * -0.25, sx * -0.18],
      }));
    }
    // Blue campus lanyard + clean white ID card + denim backpack
    fig.add(
      mesh(tubeGeo([[-0.052, 1.055, 0.052], [0, 0.90, 0.113], [0.052, 1.055, 0.052]], 0.009, 14, 8), lanyardMat),
      mesh(roundedBoxGeo(0.066, 0.088, 0.012, 0.008, 0.004), sneakerSole, { pos: [0, 0.855, 0.116] }),
      mesh(roundedBoxGeo(0.066, 0.018, 0.014, 0.005, 0.003), lanyardMat, { pos: [0, 0.892, 0.117] }),
      mesh(roundedBoxGeo(0.26, 0.30, 0.12, 0.055, 0.02), packMat, { pos: [0, 0.895, -0.145] }),
      mesh(roundedBoxGeo(0.21, 0.14, 0.05, 0.03, 0.012), packMat, { pos: [0, 0.82, -0.205] }),
    );
    for (const sx of [-1, 1]) {
      fig.add(mesh(tubeGeo([
        [sx * 0.12, 1.02, -0.09],
        [sx * 0.135, 1.04, 0.02],
        [sx * 0.135, 0.88, 0.09],
      ], 0.018, 12, 8), packMat));
    }
  }

  // Natural closed-cap short sleeves + soft articulated arms + plump clay peace-sign hand
  const leftSleeve = mesh(new CylinderGeometry(0.050, 0.054, 0.11, 14), shirtCream, {
    pos: [-0.175, 0.99, 0.005],
    rot: [0.08, 0, 0.44],
  });
  const leftCap = mesh(new SphereGeometry(0.055, 12, 10), shirtCream, { pos: [-0.145, 1.025, 0] });
  const rightSleeve = mesh(new CylinderGeometry(0.050, 0.052, 0.105, 14), shirtCream, {
    pos: [0.175, 0.992, 0.012],
    rot: [0.12, 0, -0.58],
  });
  const rightCap = mesh(new SphereGeometry(0.055, 12, 10), shirtCream, { pos: [0.145, 1.025, 0] });
  const rightCuff = mesh(new TorusGeometry(0.044, 0.011, 8, 14), shirtCream, {
    pos: [0.198, 0.955, 0.02],
    rot: [Math.PI / 2 - 0.12, 0, -0.58],
  });
  fig.add(leftSleeve, leftCap, rightSleeve, rightCap, rightCuff);

  // Relaxed left (viewer's left) arm clearing canvas tote cleanly + plump clay hand
  fig.add(
    mesh(tubeGeo([[-0.185, 0.96, 0.01], [-0.222, 0.81, 0.042], [-0.214, 0.66, 0.075]], 0.041, 12, 10), skin),
    mesh(new SphereGeometry(0.049, 12, 10), skin, { pos: [-0.212, 0.635, 0.082], scale: [0.92, 1.08, 0.86] }),
  );

  // Bent-elbow waving right (viewer's right) arm + plump clay palm & V peace fingers
  const rightUpper = mesh(tubeGeo([[0.182, 0.962, 0.01], [0.225, 0.88, 0.032]], 0.043, 8, 10), skin);
  const elbowPivot = new Group();
  elbowPivot.position.set(0.225, 0.88, 0.032);
  elbowPivot.add(
    mesh(tubeGeo([[0, 0, 0], [0.048, 0.095, 0.05], [0.062, 0.185, 0.09]], 0.039, 10, 10), skin),
    mesh(new SphereGeometry(0.048, 12, 10), skin, { pos: [0.064, 0.212, 0.095], scale: [1.02, 0.96, 0.74] }),
    // Plump tucked thumb/ring/pinky cluster + rounded clay V fingers
    mesh(new SphereGeometry(0.024, 10, 8), skin, { pos: [0.064, 0.218, 0.12], scale: [1.1, 0.85, 0.8] }),
    mesh(new CapsuleGeometry(0.0165, 0.042, 6, 10), skin, { pos: [0.042, 0.268, 0.098], rot: [0.08, 0, 0.26] }),
    mesh(new CapsuleGeometry(0.0165, 0.042, 6, 10), skin, { pos: [0.086, 0.268, 0.098], rot: [0.08, 0, -0.24] }),
  );
  fig.add(rightUpper, elbowPivot);

  // Articulated neck + proportional matte clay head (1 : 3.8 puppet proportions!)
  const neck = mesh(new CylinderGeometry(0.054, 0.058, 0.11, 12), skin, { pos: [0, 1.11, 0] });
  const head = new Group();
  head.position.set(0, 1.31, 0);
  const skull = mesh(sculptGeo(new SphereGeometry(0.19, 26, 20), 0.005, 7.5, isJackie ? 21 : 17), skin, {
    scale: [1.0, 1.04, 0.96],
  });
  head.add(skull);

  // Ears & sculpted protruding clay button nose
  for (const sx of [-1, 1]) {
    head.add(mesh(new SphereGeometry(0.042, 10, 10), skin, { pos: [sx * 0.184, -0.01, -0.01], scale: [0.55, 1.0, 0.75] }));
  }
  head.add(mesh(new SphereGeometry(0.027, 14, 12), noseMat, { pos: [0, -0.016, 0.194], scale: [1.05, 0.9, 1.05], cast: false }));

  // Crisp sculpted clay eyebrows, glossy black bead eyes (NO sclera), subtle blush, proud open D-mouth
  for (const sx of [-1, 1]) {
    head.add(
      mesh(tubeGeo([
        [sx * 0.036, 0.06, 0.178],
        [sx * 0.066, 0.072, 0.184],
        [sx * 0.095, 0.06, 0.168],
      ], 0.013, 8, 6), hair, { cast: false }),
      mesh(new SphereGeometry(0.029, 14, 12), darkEye, { pos: [sx * 0.064, 0.014, 0.171], scale: [0.96, 1.06, 0.85], cast: false }),
      mesh(new SphereGeometry(0.01, 8, 8), whiteSpark, { pos: [sx * 0.072, 0.024, 0.194], cast: false }),
      mesh(new SphereGeometry(0.034, 10, 8), blushMat, { pos: [sx * 0.106, -0.034, 0.16], scale: [1.05, 0.68, 0.16], cast: false }),
    );
  }
  head.add(
    mesh(openMouthGeo(0.056, 0.016, 0.046, 0.022), mouthIn, { pos: [0, -0.066, 0.168], cast: false }),
    mesh(new SphereGeometry(0.025, 10, 8), tongue, { pos: [0, -0.084, 0.184], scale: [1.22, 0.56, 0.48], cast: false }),
  );

  // Canonical Hair Styles (Sculpted Stop-Motion Clay Locks — cast:false so faces stay cleanly lit!)
  if (isJackie) {
    // Tilted back crown cap + solid occipital back base exposing forehead cleanly!
    const jackieCap = mesh(new SphereGeometry(0.194, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.54), hair, {
      pos: [0, 0.018, -0.042],
      rot: [-0.46, 0, 0],
      cast: false,
    });
    const backMass = mesh(sculptGeo(new SphereGeometry(0.195, 22, 18), 0.008, 7, 19), hair, {
      pos: [0, 0.008, -0.046],
      scale: [1.01, 1.04, 0.96],
      cast: false,
    });
    // Continuous flowing back hair cape from below earline down to mid-back
    const hairCape = mesh(sculptGeo(new CylinderGeometry(0.185, 0.212, 0.40, 22, 3, false, Math.PI * 0.46, Math.PI * 1.08), 0.012, 8, 29), hair, {
      pos: [0, -0.155, -0.056],
      cast: false,
    });
    head.add(jackieCap, backMass, hairCape);

    // Off-center left parting exposing warm forehead + cheek-hugging swept temple waves
    head.add(
      mesh(tubeGeo([
        [-0.056, 0.168, 0.106],
        [-0.122, 0.126, 0.138],
        [-0.168, 0.032, 0.118],
        [-0.175, -0.12, 0.068],
        [-0.168, -0.30, 0.022],
      ], 0.034, 16, 8), hair, { cast: false }),
      mesh(tubeGeo([
        [-0.046, 0.168, 0.106],
        [0.072, 0.14, 0.145],
        [0.156, 0.066, 0.134],
        [0.176, -0.10, 0.075],
        [0.17, -0.30, 0.025],
      ], 0.035, 16, 8), hair, { cast: false }),
      // Signature prominent matte coral-pink temple hairclip sitting proud on right temple lock
      mesh(roundedBoxGeo(0.076, 0.027, 0.024, 0.008, 0.005), clipMat, {
        pos: [0.146, 0.114, 0.180],
        rot: [0.14, 0.56, -0.34],
        cast: false,
      }),
    );
    // Overlapping sculpted wavy locks integrated into the back hair cape (zero crown gap!)
    for (let i = -5; i <= 5; i++) {
      const a = Math.PI + i * 0.22;
      const sx = Math.sin(a) * 0.172, sz = Math.cos(a) * 0.162;
      const sway = i % 2 ? 0.022 : -0.022;
      head.add(mesh(tubeGeo([
        [sx * 0.85, 0.125, sz * 0.84],
        [sx * 1.12 + sway, -0.05, sz * 1.14 - 0.02],
        [sx * 1.16 - sway, -0.22, sz * 1.16 - 0.04],
        [sx * 1.08 + sway * 0.5, -0.355, sz * 1.1 - 0.03],
      ], 0.036, 14, 8), hair, { cast: false }));
    }
  } else {
    // Jack's full sculpted espresso clay hair mass (covers crown + back down to nape!)
    const jackCap = mesh(new SphereGeometry(0.198, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.56), hair, {
      pos: [0, 0.022, -0.028],
      rot: [-0.22, 0, 0],
      cast: false,
    });
    const jackBack = mesh(sculptGeo(new SphereGeometry(0.196, 22, 18), 0.012, 9, 31), hair, {
      pos: [0, -0.005, -0.048],
      scale: [1.01, 1.05, 0.96],
      cast: false,
    });
    const jackNape = mesh(sculptGeo(new SphereGeometry(0.165, 16, 12), 0.01, 8, 41), hair, {
      pos: [0, -0.115, -0.105],
      scale: [1.08, 0.68, 0.62],
      cast: false,
    });
    head.add(jackCap, jackBack, jackNape);

    // Dense overlapping asymmetric tousled clay curl locks (natural cowlick, zero round bear ears!)
    const curlLocks = [
      // Tousled forehead fringe locks (close to brow, clear of eyes!)
      [[0.01, 0.172, 0.10], [0.035, 0.142, 0.155], [0.055, 0.112, 0.174]],
      [[-0.055, 0.17, 0.095], [-0.08, 0.138, 0.15], [-0.095, 0.105, 0.168]],
      [[0.085, 0.152, 0.095], [0.122, 0.122, 0.14], [0.145, 0.085, 0.148]],
      [[-0.12, 0.148, 0.08], [-0.152, 0.112, 0.13], [-0.168, 0.068, 0.135]],
      [[0.0, 0.182, 0.06], [0.0, 0.168, 0.135], [-0.015, 0.135, 0.168]],
      // Asymmetric tousled crown curls (higher right-of-center cowlick peak!)
      [[0.01, 0.184, -0.01], [0.04, 0.228, 0.02], [0.07, 0.238, 0.055]],
      [[-0.075, 0.168, 0.0], [-0.105, 0.20, 0.025], [-0.125, 0.195, 0.055]],
      [[0.08, 0.17, 0.0], [0.118, 0.21, 0.02], [0.145, 0.212, 0.05]],
      [[-0.035, 0.182, -0.07], [-0.04, 0.218, -0.06], [-0.045, 0.225, -0.02]],
      [[0.055, 0.18, -0.075], [0.085, 0.222, -0.065], [0.105, 0.228, -0.025]],
      // Downward-swept temple & behind-ear curls hugging sides cleanly
      [[-0.145, 0.12, -0.01], [-0.185, 0.115, 0.005], [-0.196, 0.072, 0.025]],
      [[0.145, 0.12, -0.01], [0.185, 0.12, 0.005], [0.198, 0.078, 0.025]],
      [[-0.158, 0.05, -0.04], [-0.194, 0.042, -0.032], [-0.192, -0.015, -0.02]],
      [[0.158, 0.05, -0.04], [0.194, 0.042, -0.032], [0.192, -0.015, -0.02]],
      // Dense back-of-head & nape shingle curls (complete coverage!)
      [[0.0, 0.165, -0.105], [0.0, 0.195, -0.165], [0.01, 0.175, -0.205]],
      [[-0.09, 0.145, -0.105], [-0.125, 0.172, -0.165], [-0.142, 0.148, -0.195]],
      [[0.09, 0.145, -0.105], [0.125, 0.172, -0.165], [0.142, 0.148, -0.195]],
      [[0.0, 0.07, -0.165], [-0.015, 0.015, -0.218], [0.0, -0.05, -0.212]],
      [[-0.085, 0.06, -0.15], [-0.115, 0.0, -0.195], [-0.105, -0.075, -0.185]],
      [[0.085, 0.06, -0.15], [0.115, 0.0, -0.195], [0.105, -0.075, -0.185]],
      [[0.0, -0.035, -0.175], [0.01, -0.105, -0.20], [0.0, -0.165, -0.182]],
      [[-0.075, -0.045, -0.158], [-0.09, -0.112, -0.178], [-0.08, -0.162, -0.158]],
      [[0.075, -0.045, -0.158], [0.09, -0.112, -0.178], [0.08, -0.162, -0.158]],
    ];
    for (const lp of curlLocks) {
      head.add(mesh(tubeGeo(lp, 0.038, 9, 8), hair, { cast: false }));
    }
  }

  // Optional Companion Hat
  const hatRig = buildCompanionHat(kit, hat);
  const hatHolder = new Group();
  hatHolder.position.set(0, hat === "halo" ? 0.34 : 0.21, 0);
  hatHolder.scale.setScalar(0.76);
  hatHolder.add(hatRig.group);
  head.add(hatHolder);

  fig.add(neck, head);
  if (!opts.noShadow) addContactShadow(root, 0.34, 0.28, 0.014, 0.32, kit);

  return {
    group: tagMilestone(root, isJackie ? 14 : 11, who),
    anim(t, dt, ctx = {}) {
      const happy = ctx.mood === "happy" || ctx.mood === "proud";
      const spd = happy ? 5.0 : 2.6;
      fig.position.y = Math.abs(Math.sin(t * spd)) * (happy ? 0.048 : 0.012);
      elbowPivot.rotation.z = Math.sin(t * (happy ? 7.2 : 3.2)) * (happy ? 0.26 : 0.14);
      head.rotation.z = Math.sin(t * 1.5) * 0.035;
      if (hatRig.anim) hatRig.anim(t, dt, ctx);
    },
  };
}

// ---------- Floating Circular Clay Victoria Harbour Starter Island ----------
export function buildIslandBase(kit, hasTower = false) {
  const root = new Group();

  // 1. Sculpted tapered floating earthen/rock cliff base (looks gorgeous even from low angles!)
  const cliffProfile = [
    [0.01, -2.15],
    [0.95, -1.98],
    [2.15, -1.55],
    [3.25, -1.02],
    [3.92, -0.58],
    [4.28, -0.34],
    [4.22, -0.12],
  ];
  const cliff = mesh(sculptGeo(latheGeo(cliffProfile, 36), 0.14, 1.45, 7, { yScale: 0.4 }), kit.clay(0x9a7558, { rough: 0.68 }), { cast: false });
  const rockBand = mesh(sculptGeo(new CylinderGeometry(4.32, 3.88, 0.36, 36, 2), 0.08, 1.85, 19), kit.clay(0x7c868e, { rough: 0.62 }), {
    pos: [0, -0.42, 0],
    cast: false,
  });
  root.add(cliff, rockBand);

  // 2. Translucent Animated Victoria Harbour Ocean Ring encircling the island
  const seaMat = kit.glass(0x28b6cc, 0.72);
  seaMat.roughness = 0.16;
  seaMat.metalness = 0.08;
  const seaDisc = mesh(new CylinderGeometry(5.65, 5.15, 0.34, 48), seaMat, {
    pos: [0, -0.34, 0],
    cast: false,
    recv: true,
  });
  const seaRim = mesh(new TorusGeometry(5.58, 0.085, 10, 56), kit.clay(0x9df0f7, { rough: 0.35 }), {
    pos: [0, -0.19, 0],
    rot: [Math.PI / 2, 0, 0],
    cast: false,
  });
  const rippleMat = kit.textured("waterRipple", { rough: 0.25, transparent: true, opacity: 0.72, side: DoubleSide });
  rippleMat.depthWrite = false;
  const ripplePlane = mesh(new PlaneGeometry(11.1, 11.1), rippleMat, {
    pos: [0, -0.155, 0],
    rot: [-Math.PI / 2, 0, 0],
    cast: false,
    recv: false,
  });
  const ripplePlane2 = mesh(new PlaneGeometry(10.6, 10.6), rippleMat, {
    pos: [0, -0.15, 0],
    rot: [-Math.PI / 2, 0, 0.8],
    cast: false,
    recv: false,
  });
  root.add(seaDisc, seaRim, ripplePlane, ripplePlane2);

  // 3. Granite Stone Seawall + Beveled Coping Stone Ring (open-ended cylinder so zero z-fighting with timber deck!)
  const seawall = mesh(new CylinderGeometry(4.12, 4.24, 0.44, 40, 1, true), kit.textured("stoneWall", { rough: 0.65 }), {
    pos: [0, -0.23, 0],
  });
  const coping = mesh(new TorusGeometry(4.12, 0.11, 12, 48), kit.clay(0xe5ddd0, { rough: 0.52 }), {
    pos: [0, -0.025, 0],
    rot: [Math.PI / 2, 0, 0],
  });
  root.add(seawall, coping);

  // 4. Warm Honey-Oak Beveled Timber Pier Deck (cleanly above seawall & below props at y = 0)
  const deckTop = mesh(new CylinderGeometry(4.06, 4.08, 0.12, 44), kit.textured("woodPlank", { finish: "lacquer", rough: 0.4 }), {
    pos: [0, -0.06, 0],
    cast: false,
    recv: true,
  });
  root.add(deckTop);
  if (hasTower) {
    // Subtle architectural boardwalk plinth beneath the growing Tong Lau tower (Days 4+)
    const apron = mesh(roundedBoxGeo(2.55, 0.04, 2.1, 0.2, 0.014), kit.clay(0xdfba82, { rough: 0.52 }), {
      pos: [0, 0.008, -0.35],
      cast: false,
      recv: true,
    });
    root.add(apron);
  } else {
    // Charming brass-inlaid circular harbour compass medallion on Day 0-3 starter pier!
    const med = mesh(
      new CylinderGeometry(1.18, 1.22, 0.036, 36),
      [kit.clay(0x9a6838), kit.textured("coasterDial", { finish: "lacquer", rough: 0.36 }), kit.clay(0x9a6838)],
      { pos: [0, 0.006, 0.35], cast: false, recv: true },
    );
    const medRim = mesh(new TorusGeometry(1.2, 0.028, 10, 40), kit.metal(0xe8b948, 0.24, 0.8), {
      pos: [0, 0.024, 0.35],
      rot: [Math.PI / 2, 0, 0],
      cast: false,
    });
    root.add(med, medRim);
  }

  // 5. Timber Dock Pilings + gentle sea-foam shoreline collar rings around each piling
  const pilingMat = kit.clay(0x7c5032, { rough: 0.62 });
  const foamMat = kit.clay(0xcff8fc, { rough: 0.34 });
  const brass = kit.metal(0xe8b948, 0.24, 0.8);
  const iron = kit.metal(0x3a404f, 0.38, 0.72);
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI * 2) / 12 + 0.12;
    const px = Math.cos(a) * 4.32, pz = Math.sin(a) * 4.32;
    root.add(
      mesh(new CylinderGeometry(0.11, 0.12, 0.92, 12), pilingMat, { pos: [px, -0.38, pz] }),
      mesh(sculptGeo(new TorusGeometry(0.145, 0.02, 6, 14), 0.012, 12, i + 1), foamMat, { pos: [px, -0.175, pz], rot: [Math.PI / 2, 0, i * 0.5], cast: false }),
    );
  }

  // 6. 4 Mooring Bollards + Coiled Hemp Rope + Front Brass Dedication Plaque
  const bollardAngles = [0.52, 2.62, -0.55, -2.58];
  bollardAngles.forEach((a, idx) => {
    const bx = Math.cos(a) * 3.82, bz = Math.sin(a) * 3.82;
    const bg = new Group();
    bg.position.set(bx, 0, bz);
    bg.add(
      mesh(new CylinderGeometry(0.14, 0.17, 0.06, 14), iron, { pos: [0, 0.03, 0] }),
      mesh(new CylinderGeometry(0.085, 0.1, 0.24, 14), iron, { pos: [0, 0.16, 0] }),
      mesh(new SphereGeometry(0.105, 14, 10), brass, { pos: [0, 0.29, 0], scale: [1, 0.6, 1] }),
    );
    if (idx === 1) {
      // Sculpted coiled mooring rope loop sitting cleanly on the deck beside the front-left bollard
      const ropePts = [];
      for (let k = 0; k <= 26; k++) {
        const u = k / 26;
        const rad = 0.12 + u * 0.14;
        const ang = u * Math.PI * 5.2;
        ropePts.push([Math.cos(ang) * rad + 0.28, 0.032 + u * 0.015, Math.sin(ang) * rad + 0.12]);
      }
      bg.add(mesh(tubeGeo(ropePts, 0.025, 32, 7), kit.clay(0xd8b47c, { rough: 0.68 })));
    }
    root.add(bg);
  });

  // Brass pier front plaque ("海傍小天地") recessed below the seawall coping ring so top edge never clips rim
  const plaqueFrame = mesh(roundedBoxGeo(1.02, 0.24, 0.06, 0.03, 0.012), brass, { pos: [0, -0.25, 4.24], rot: [-0.04, 0, 0] });
  const plaqueFace = mesh(new PlaneGeometry(0.92, 0.18), kit.textured("pierPlaque", { finish: "metal", rough: 0.26 }), {
    pos: [0, -0.25, 4.276],
    rot: [-0.04, 0, 0],
    cast: false,
  });
  root.add(plaqueFrame, plaqueFace);

  // 7. Hand-sculpted coastal greenery tufts & harbour pebbles along the rear arc
  const bushMat = kit.clay(0x3ba864, { rough: 0.56 });
  const bushLight = kit.clay(0x58c479, { rough: 0.54 });
  const rockMat = kit.clay(0x9ca5ae, { rough: 0.6 });
  const shrubSpots = [
    [-3.15, -2.05, 1.05], [-2.55, -2.75, 0.85], [2.6, -2.65, 0.95], [3.2, -1.95, 0.8], [0.0, -3.55, 1.15],
  ];
  shrubSpots.forEach(([sx, sz, sc], idx) => {
    const sg = new Group();
    sg.position.set(sx, 0, sz);
    sg.scale.setScalar(sc);
    sg.rotation.y = (idx * 0.67) % 1.2 - 0.5;
    sg.add(
      mesh(sculptGeo(new SphereGeometry(0.28, 14, 12), 0.032, 6.2, 10 + idx, { flatBottom: true }), idx % 2 ? bushMat : bushLight, { pos: [0, 0.2, 0] }),
      mesh(sculptGeo(new SphereGeometry(0.21, 12, 10), 0.025, 7.1, 20 + idx, { flatBottom: true }), idx % 2 ? bushLight : bushMat, { pos: [0.2, 0.14, 0.1] }),
      mesh(sculptGeo(new SphereGeometry(0.19, 12, 10), 0.022, 7.5, 30 + idx, { flatBottom: true }), bushMat, { pos: [-0.18, 0.13, 0.12] }),
      mesh(sculptGeo(new SphereGeometry(0.14, 10, 8), 0.022, 8.2, 40 + idx, { flatBottom: true }), rockMat, { pos: [0.12, 0.07, 0.26], scale: [1.3, 0.7, 1.1] }),
    );
    root.add(sg);
  });

  // 8. Shield Insurance-Net Buoys container (updated dynamically via setShields)
  const shieldsGroup = new Group();
  root.add(shieldsGroup);
  const shieldBuoys = [];

  function setShields(count) {
    while (shieldsGroup.children.length) shieldsGroup.remove(shieldsGroup.children[0]);
    shieldBuoys.length = 0;
    const n = Math.max(0, Math.min(2, count | 0));
    for (let i = 0; i < n; i++) {
      const a = i === 0 ? 1.15 : 2.02;
      const bg = new Group();
      bg.position.set(Math.cos(a) * 4.78, -0.14, Math.sin(a) * 4.78);
      const ring = mesh(new TorusGeometry(0.26, 0.085, 12, 24), kit.clay(0xf04e3e, { rough: 0.4 }), { rot: [Math.PI / 2, 0, 0] });
      const glow = mesh(new TorusGeometry(0.36, 0.025, 8, 24), kit.emissive(0xffdb58, 0.55, 1.35), { rot: [Math.PI / 2, 0, 0], cast: false });
      for (let s = 0; s < 4; s++) {
        const sa = (s * Math.PI) / 2;
        bg.add(mesh(new TorusGeometry(0.09, 0.026, 8, 12), kit.clay(0xfff7e8, { rough: 0.42 }), {
          pos: [Math.cos(sa) * 0.26, 0, Math.sin(sa) * 0.26],
          rot: [0, -sa, 0],
        }));
      }
      bg.add(ring, glow);
      shieldsGroup.add(bg);
      shieldBuoys.push({ bg, phase: i * 1.9 });
    }
  }

  return {
    group: root,
    setShields,
    anim(t) {
      ripplePlane.rotation.z = t * 0.06;
      ripplePlane2.rotation.z = -t * 0.045 + 0.8;
      seaDisc.position.y = -0.34 + Math.sin(t * 1.35) * 0.025;
      seaRim.position.y = -0.19 + Math.sin(t * 1.35) * 0.025;
      for (const b of shieldBuoys) {
        b.bg.position.y = -0.13 + Math.sin(t * 2.1 + b.phase) * 0.045;
        b.bg.rotation.z = Math.sin(t * 1.6 + b.phase) * 0.1;
      }
    },
  };
}

// =========================================================================
// DAYS 1–14 INDIVIDUAL SUPER-DETAILED SCULPTURES
// =========================================================================

// Day 1: Piggy Bank on Dock Pallet + Spinning Embossed HK Gold Coin
function buildDay1Piggy(kit) {
  const g = new Group();
  const wood = kit.textured("woodPlank", { finish: "lacquer", rough: 0.44 });
  const brass = kit.metal(0xeab844, 0.2, 0.86);
  const pink = kit.gloss(0xff84a8, { rough: 0.24 });
  const snoutMat = kit.gloss(0xffa3be, { rough: 0.24 });
  const dark = kit.gloss(0x1e202c, { rough: 0.14 });
  const coinMat = kit.textured("coinFace", { finish: "metal", rough: 0.2 });

  // Slatted wooden dock pallet with brass corner brackets
  for (const z of [-0.34, 0, 0.34]) {
    g.add(mesh(roundedBoxGeo(1.06, 0.075, 0.25, 0.03, 0.012), wood, { pos: [0, 0.105, z] }));
  }
  for (const x of [-0.42, 0, 0.42]) {
    g.add(mesh(roundedBoxGeo(0.12, 0.07, 0.92, 0.02, 0.01), kit.clay(0x9a683a), { pos: [x, 0.035, 0] }));
  }

  // Plump glossy porcelain-clay piggy body (turned toward front-left 3/4 so snout & glossy eyes greet viewer!)
  const pig = new Group();
  pig.position.set(0, 0.14, 0);
  pig.rotation.y = -Math.PI * 0.58;
  const torso = mesh(new SphereGeometry(0.42, 28, 22), pink, { pos: [0, 0.38, 0], scale: [1.18, 0.94, 0.94] });
  const snout = mesh(new CylinderGeometry(0.145, 0.165, 0.14, 22), snoutMat, {
    pos: [0.47, 0.36, 0],
    rot: [0, 0, -Math.PI / 2],
    scale: [0.85, 1, 1.15],
  });
  for (const sz of [-0.045, 0.045]) {
    pig.add(mesh(new SphereGeometry(0.028, 10, 8), kit.clay(0xc64d72), { pos: [0.54, 0.37, sz], scale: [0.5, 1.3, 0.8] }));
  }
  // Perked rounded triangular ears
  for (const sz of [-1, 1]) {
    pig.add(mesh(new ConeGeometry(0.11, 0.19, 14), pink, {
      pos: [0.18, 0.72, sz * 0.19],
      rot: [sz * 0.42, 0, -0.35],
    }));
    // Glossy eyes + catchlights + rosy cheeks (seated proud of the plump curved clay carapace!)
    pig.add(
      mesh(new SphereGeometry(0.048, 12, 10), dark, { pos: [0.435, 0.49, sz * 0.175] }),
      mesh(new SphereGeometry(0.017, 8, 8), kit.gloss(0xffffff), { pos: [0.474, 0.508, sz * 0.185], cast: false }),
      mesh(new SphereGeometry(0.068, 10, 8), kit.gloss(0xff5f8d), { pos: [0.395, 0.36, sz * 0.28], scale: [0.55, 0.65, 0.4], cast: false }),
    );
  }
  // 4 sturdy clay trotters
  for (const [lx, lz] of [[-0.24, -0.18], [-0.24, 0.18], [0.22, -0.18], [0.22, 0.18]]) {
    pig.add(mesh(new CylinderGeometry(0.088, 0.072, 0.19, 14), pink, { pos: [lx, 0.095, lz] }));
  }
  // Curly helical tail
  const tailPts = [];
  for (let i = 0; i <= 18; i++) {
    const u = i / 18, a = u * Math.PI * 3.4;
    tailPts.push([-0.47 - u * 0.14, 0.44 + Math.sin(a) * 0.055, Math.cos(a) * 0.055]);
  }
  pig.add(mesh(tubeGeo(tailPts, 0.026, 22, 8), pink));
  // Brass coin slot rim
  pig.add(
    mesh(roundedBoxGeo(0.24, 0.036, 0.075, 0.02, 0.008), brass, { pos: [0, 0.77, 0] }),
    mesh(roundedBoxGeo(0.18, 0.02, 0.03, 0.006, 0.004), dark, { pos: [0, 0.785, 0], cast: false }),
  );
  pig.add(torso, snout);
  g.add(pig);

  // Spinning embossed HK Gold Coin above slot + 3 loose stacked coins on pallet
  const heroCoin = mesh(new CylinderGeometry(0.16, 0.16, 0.036, 24), [brass, coinMat, coinMat], {
    pos: [0, 1.18, 0],
    rot: [Math.PI / 2, 0, 0],
  });
  g.add(heroCoin);
  for (let i = 0; i < 3; i++) {
    g.add(mesh(new CylinderGeometry(0.095, 0.095, 0.026, 18), [brass, coinMat, coinMat], {
      pos: [0.38, 0.158 + i * 0.027, 0.28],
    }));
  }
  addContactShadow(g, 0.65, 0.56, 0.008, 0.34, kit);
  return {
    group: tagMilestone(g, 1, "piggy"),
    anim(t) {
      heroCoin.rotation.z = t * 2.4;
      heroCoin.position.y = 1.15 + Math.sin(t * 2.8) * 0.06;
    },
  };
}

// Day 2: HK Bakery Cart (菠蘿包) with Striped Awning, Spoked Wheels, Buns, Milk-Tea Urn & Chalkboard
function buildDay2Bakery(kit) {
  const g = new Group();
  const wood = kit.textured("woodPlank", { finish: "lacquer", rough: 0.44 });
  const cream = kit.enamel(0xfff5e2, { rough: 0.28 });
  const brass = kit.metal(0xe2b144, 0.22, 0.85);
  const iron = kit.metal(0x3a3d4c, 0.36, 0.74);
  const bunCrust = kit.textured("pineappleCrust", { finish: "glaze", rough: 0.2 });
  const bunBase = kit.clay(0xe3a858, { rough: 0.5 });
  const awningMat = kit.textured("stripeRed", { finish: "fabric", rough: 0.7, side: DoubleSide });

  // 2 big spoked heritage wooden wheels on left + 2 small front casters on right
  for (const sz of [-0.46, 0.46]) {
    const wh = new Group();
    wh.position.set(-0.28, 0.28, sz);
    wh.add(
      mesh(new TorusGeometry(0.25, 0.036, 12, 26), kit.clay(0x7c4a26)),
      mesh(new TorusGeometry(0.275, 0.014, 8, 26), iron),
      mesh(new CylinderGeometry(0.055, 0.055, 0.08, 12), brass, { rot: [Math.PI / 2, 0, 0] }),
    );
    for (let s = 0; s < 6; s++) {
      wh.add(mesh(new CylinderGeometry(0.014, 0.014, 0.48, 8), kit.clay(0x9a6236), { rot: [0, 0, (s * Math.PI) / 6] }));
    }
    g.add(wh);
  }
  for (const sz of [-0.34, 0.34]) {
    g.add(
      mesh(new CylinderGeometry(0.025, 0.025, 0.2, 8), iron, { pos: [0.46, 0.18, sz] }),
      mesh(roundedBoxGeo(0.06, 0.11, 0.08, 0.015, 0.005), iron, { pos: [0.46, 0.11, sz] }),
      mesh(new CylinderGeometry(0.085, 0.085, 0.045, 16), iron, { pos: [0.46, 0.085, sz], rot: [Math.PI / 2, 0, 0] }),
    );
  }

  // Cart wooden cabinet body + scalloped trim + push handles
  const cabinet = mesh(roundedBoxGeo(1.22, 0.58, 0.78, 0.06, 0.02), wood, { pos: [0, 0.54, 0] });
  const counter = mesh(roundedBoxGeo(1.32, 0.08, 0.88, 0.04, 0.016), cream, { pos: [0, 0.85, 0] });
  const handleL = mesh(tubeGeo([[-0.6, 0.76, -0.32], [-0.82, 0.86, -0.32], [-0.82, 0.86, 0.32], [-0.6, 0.76, 0.32]], 0.026, 20, 8), brass);
  g.add(cabinet, counter, handleL);

  // Glass Bakery Display Showcase + 6 Plump Golden Pineapple Buns (菠蘿包 + hero 菠蘿油 with butter!)
  const caseFrame = mesh(roundedBoxGeo(0.76, 0.44, 0.64, 0.03, 0.01), kit.glass(0xeaf8ff, 0.36), {
    pos: [-0.14, 1.11, 0],
    cast: false,
  });
  const shelf = mesh(roundedBoxGeo(0.7, 0.028, 0.56, 0.01, 0.005), cream, { pos: [-0.14, 1.08, 0] });
  g.add(caseFrame, shelf);

  const bunSpots = [
    [-0.34, 0.94, -0.14], [-0.14, 0.94, -0.14], [0.06, 0.94, -0.14],
    [-0.32, 0.94, 0.14], [-0.12, 0.94, 0.14],
    [-0.24, 1.14, 0.0], [0.0, 1.14, 0.0],
  ];
  bunSpots.forEach(([bx, by, bz], idx) => {
    const bun = new Group();
    bun.position.set(bx, by, bz);
    bun.rotation.y = (idx * 0.45) - 0.6;
    bun.add(
      mesh(new CylinderGeometry(0.085, 0.075, 0.055, 16), bunBase, { pos: [0, 0.025, 0] }),
      mesh(sculptGeo(new SphereGeometry(0.095, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.62), 0.011, 22, 22 + idx, { flatBottom: true }), bunCrust, { pos: [0, 0.045, 0], scale: [1, 0.85, 1] }),
    );
    if (idx === 5) {
      // Hero Bo Lo Yau butter slab peeking out!
      bun.add(mesh(roundedBoxGeo(0.11, 0.03, 0.09, 0.008, 0.004), kit.gloss(0xffe678), { pos: [0.03, 0.052, 0.04], rot: [0.1, 0.4, 0.12] }));
    }
    g.add(bun);
  });

  // Brass HK Milk-Tea Urn + Classic Ceramic Cup on right counter
  const urn = mesh(latheGeo([[0, 0], [0.14, 0], [0.16, 0.28], [0.13, 0.36], [0.06, 0.42], [0.03, 0.46], [0, 0.47]], 20), brass, {
    pos: [0.42, 0.89, -0.1],
  });
  const spigot = mesh(new CylinderGeometry(0.016, 0.016, 0.09, 8), iron, { pos: [0.42, 1.0, 0.08], rot: [Math.PI / 2, 0, 0] });
  const cup = mesh(new CylinderGeometry(0.055, 0.042, 0.09, 14), cream, { pos: [0.44, 0.935, 0.22] });
  const teaTop = mesh(new CylinderGeometry(0.048, 0.048, 0.01, 14), kit.gloss(0xb5682a), { pos: [0.44, 0.978, 0.22], cast: false });
  g.add(urn, spigot, cup, teaTop);

  // 4 Brass Canopy Posts + Scalloped Red-and-Cream Striped Awning
  for (const [px, pz] of [[-0.58, -0.36], [0.58, -0.36], [-0.58, 0.36], [0.58, 0.36]]) {
    g.add(
      mesh(new CylinderGeometry(0.022, 0.022, 0.94, 10), brass, { pos: [px, 1.34, pz] }),
      mesh(new SphereGeometry(0.038, 10, 8), brass, { pos: [px, 1.82, pz] }),
    );
  }
  const awningTop = mesh(roundedBoxGeo(1.44, 0.06, 0.98, 0.04, 0.015), awningMat, {
    pos: [0, 1.84, 0.02],
    rot: [0.12, 0, 0],
  });
  const valenceF = mesh(new BoxGeometry(1.42, 0.14, 0.03), awningMat, { pos: [0, 1.72, 0.49] });
  const valenceB = mesh(new BoxGeometry(1.42, 0.11, 0.03), awningMat, { pos: [0, 1.83, -0.45] });
  g.add(awningTop, valenceF, valenceB);

  // Side Chalkboard Menu Easel
  const board = new Group();
  board.position.set(0.84, 0.0, 0.18);
  board.rotation.y = -0.35;
  board.add(
    mesh(roundedBoxGeo(0.46, 0.56, 0.05, 0.03, 0.01), kit.clay(0x9a6236), { pos: [0, 0.34, 0], rot: [-0.18, 0, 0] }),
    mesh(new PlaneGeometry(0.4, 0.48), kit.textured("chalkboard", { rough: 0.65 }), { pos: [0, 0.34, 0.028], rot: [-0.18, 0, 0], cast: false }),
    mesh(roundedBoxGeo(0.4, 0.48, 0.04, 0.02, 0.008), kit.clay(0x7c4e2a), { pos: [0, 0.3, -0.14], rot: [0.22, 0, 0] }),
  );
  g.add(board);

  addContactShadow(g, 0.92, 0.66, 0.008, 0.34, kit);
  return {
    group: tagMilestone(g, 2, "bakery"),
    anim(t) {
      awningTop.rotation.x = 0.12 + Math.sin(t * 2.0) * 0.012;
    },
  };
}

// Day 3: Rounded Teal-and-Cream Octopus & Passbook Kiosk
function buildDay3Kiosk(kit) {
  const g = new Group();
  const teal = kit.enamel(0x14968b, { rough: 0.24 });
  const tealDark = kit.enamel(0x0f6b64, { rough: 0.28 });
  const cream = kit.enamel(0xfff5e3, { rough: 0.26 });
  const brass = kit.metal(0xf0be46, 0.22, 0.84);
  const pulseMat = kit.emissive(0x36f2c8, 0.8, 1.9, { transparent: true, opacity: 0.85 });

  // Stepped rounded plinth + main kiosk cabinet
  g.add(
    mesh(roundedBoxGeo(1.06, 0.12, 0.86, 0.12, 0.024), tealDark, { pos: [0, 0.06, 0] }),
    mesh(roundedBoxGeo(0.92, 1.38, 0.72, 0.12, 0.03), cream, { pos: [0, 0.8, 0] }),
    mesh(roundedBoxGeo(0.96, 0.24, 0.76, 0.1, 0.02), teal, { pos: [0, 0.24, 0] }),
    // Curved overhanging canopy roof
    mesh(roundedBoxGeo(1.18, 0.14, 1.04, 0.18, 0.032), teal, { pos: [0, 1.56, 0.1], rot: [-0.08, 0, 0] }),
    mesh(roundedBoxGeo(0.9, 0.05, 0.18, 0.03, 0.01), kit.emissive(0xfff0b2, 0.7, 1.6), { pos: [0, 1.48, 0.48], cast: false }),
  );

  // Glowing recessed balance display screen
  g.add(
    mesh(roundedBoxGeo(0.68, 0.5, 0.06, 0.05, 0.014), tealDark, { pos: [0, 1.12, 0.35] }),
    mesh(new PlaneGeometry(0.6, 0.42), kit.textured("kioskScreen", { finish: "glaze", rough: 0.18, emissive: true, baseEmissive: 0.55, nightEmissive: 1.45 }), {
      pos: [0, 1.12, 0.384],
      cast: false,
    }),
  );

  // Slanted contactless Octopus reader pad + pulsing emerald ring + hovering Octopus card
  const shelf = mesh(roundedBoxGeo(0.92, 0.1, 0.36, 0.05, 0.016), cream, { pos: [0, 0.72, 0.44] });
  const pad = mesh(new CylinderGeometry(0.14, 0.15, 0.04, 22), kit.clay(0x283344), {
    pos: [-0.2, 0.79, 0.48],
    rot: [0.22, 0, 0],
  });
  const pulseRing = mesh(new TorusGeometry(0.12, 0.018, 10, 24), pulseMat, {
    pos: [-0.2, 0.815, 0.485],
    rot: [Math.PI / 2 + 0.22, 0, 0],
    cast: false,
  });
  const card = mesh(roundedBoxGeo(0.22, 0.14, 0.022, 0.025, 0.005), kit.gloss(0xffa438), {
    pos: [-0.2, 0.94, 0.52],
    rot: [0.35, 0.15, -0.12],
  });
  g.add(shelf, pad, pulseRing, card);

  // Neatly stacked clay savings passbooks on right side of shelf
  const pbMat = kit.textured("passbook", { rough: 0.48 });
  for (let i = 0; i < 3; i++) {
    g.add(mesh(roundedBoxGeo(0.24, 0.042, 0.32, 0.02, 0.008), i === 2 ? pbMat : (i === 1 ? kit.clay(0xff8462) : teal), {
      pos: [0.24, 0.795 + i * 0.044, 0.46],
      rot: [0, 0.14 * (i - 1), 0],
    }));
  }

  // Rear ventilated service louvers + brass conduit (360° back detail!)
  for (let i = 0; i < 4; i++) {
    g.add(mesh(roundedBoxGeo(0.56, 0.045, 0.04, 0.01, 0.006), tealDark, { pos: [0, 0.52 + i * 0.12, -0.36] }));
  }
  g.add(mesh(new CylinderGeometry(0.028, 0.028, 1.15, 10), brass, { pos: [0.32, 0.74, -0.38] }));

  addContactShadow(g, 0.72, 0.62, 0.008, 0.34, kit);
  return {
    group: tagMilestone(g, 3, "kiosk"),
    anim(t) {
      const s = 0.85 + 0.28 * ((t * 0.9) % 1);
      pulseRing.scale.setScalar(s);
      card.position.y = 0.94 + Math.sin(t * 2.8) * 0.045;
      card.rotation.z = -0.12 + Math.sin(t * 2.8) * 0.08;
    },
  };
}

// Day 4: 1/F HK Corner Shopfront (唐樓) + Authentic HK Bamboo Scaffolding (竹棚)
function buildDay4Floor1(kit) {
  const g = new Group();
  const wall = kit.clay(0xfdf0d8, { rough: 0.52 });
  const trim = kit.clay(0xd87454, { rough: 0.48 });
  const shutter = kit.enamel(0x1f6e5c, { rough: 0.28 });
  const winGlow = kit.emissive(0xffe498, 0.66, 1.85);
  const winGlowWarm = kit.emissive(0xffc976, 0.56, 1.65);
  const bambooTan = kit.clay(0xd8b25e, { rough: 0.55 });
  const bambooJade = kit.clay(0x88b454, { rough: 0.54 });
  const knot = kit.clay(0x282934, { rough: 0.65 });

  // Main Tong Lau 1/F structural volume (height = 1.25 so 2F stacks cleanly at y = 1.25)
  g.add(
    mesh(roundedBoxGeo(2.06, 0.14, 1.66, 0.06, 0.02), kit.clay(0xcbc4b6), { pos: [0, 0.07, 0] }),
    mesh(roundedBoxGeo(1.94, 1.04, 1.52, 0.06, 0.024), wall, { pos: [0, 0.64, 0] }),
    // Cornice ledge roof slab
    mesh(roundedBoxGeo(2.14, 0.14, 1.72, 0.06, 0.024), trim, { pos: [0, 1.19, 0] }),
  );

  // 4 front arcade verandah columns (騎樓) + recessed green shutter door + warm glowing windows
  for (const cx of [-0.88, -0.3, 0.3, 0.88]) {
    g.add(mesh(roundedBoxGeo(0.14, 1.02, 0.16, 0.03, 0.012), wall, { pos: [cx, 0.62, 0.78] }));
  }
  // Recessed dark-green accordion metal shutter gate
  g.add(mesh(roundedBoxGeo(0.5, 0.72, 0.06, 0.02, 0.008), shutter, { pos: [0, 0.49, 0.76] }));
  for (let i = -2; i <= 2; i++) {
    g.add(mesh(new BoxGeometry(0.025, 0.66, 0.08), kit.clay(0x134c40), { pos: [i * 0.09, 0.49, 0.77] }));
  }
  // Lived-in shopfront windows with timber muntin bars & varied warmth
  for (const [idx, wx] of [-0.59, 0.59].entries()) {
    g.add(
      mesh(roundedBoxGeo(0.38, 0.48, 0.06, 0.04, 0.01), shutter, { pos: [wx, 0.64, 0.76] }),
      mesh(roundedBoxGeo(0.3, 0.4, 0.07, 0.03, 0.008), idx % 2 ? winGlowWarm : winGlow, { pos: [wx, 0.64, 0.77], cast: false }),
      mesh(new BoxGeometry(0.022, 0.38, 0.08), shutter, { pos: [wx, 0.64, 0.78] }),
    );
  }
  for (const [idx, wx] of [-0.52, 0, 0.52].entries()) {
    g.add(
      mesh(roundedBoxGeo(0.34, 0.44, 0.06, 0.04, 0.01), shutter, { pos: [wx, 0.66, -0.76] }),
      mesh(roundedBoxGeo(0.26, 0.36, 0.07, 0.03, 0.008), idx === 1 ? winGlowWarm : winGlow, { pos: [wx, 0.66, -0.77], cast: false }),
      mesh(new BoxGeometry(0.26, 0.022, 0.08), shutter, { pos: [wx, 0.68, -0.78] }),
    );
  }
  for (const sx of [-1, 1]) {
    for (const [idx, wz] of [-0.34, 0.34].entries()) {
      g.add(
        mesh(roundedBoxGeo(0.06, 0.44, 0.36, 0.03, 0.01), shutter, { pos: [sx * 0.97, 0.66, wz] }),
        mesh(roundedBoxGeo(0.07, 0.36, 0.28, 0.02, 0.008), idx % 2 ? winGlowWarm : winGlow, { pos: [sx * 0.98, 0.66, wz], cast: false }),
      );
    }
  }

  // Shopfront Wooden Signboard ("海傍小天地")
  g.add(
    mesh(roundedBoxGeo(1.18, 0.32, 0.08, 0.03, 0.012), kit.enamel(0x184f4a, { rough: 0.28 }), { pos: [0, 1.05, 0.85] }),
    mesh(new PlaneGeometry(1.1, 0.26), kit.textured("shopBanner", { finish: "lacquer", rough: 0.3 }), { pos: [0, 1.05, 0.895], cast: false }),
  );

  // Authentic HK Bamboo Scaffolding (竹棚) wrapping left & rear-left sides with cross-ties & catwalk!
  const scaf = new Group();
  const poleV = new CylinderGeometry(0.024, 0.026, 1.48, 8);
  const poleH = new CylinderGeometry(0.022, 0.022, 1.85, 8);
  const poleHFront = new CylinderGeometry(0.022, 0.022, 1.25, 8);
  // Left facade bamboo grid
  for (let i = 0; i < 4; i++) {
    const z = -0.82 + i * 0.55;
    scaf.add(mesh(poleV, i % 2 ? bambooJade : bambooTan, { pos: [-1.14, 0.74, z] }));
  }
  for (const y of [0.34, 0.78, 1.22]) {
    scaf.add(mesh(poleH, bambooTan, { pos: [-1.14, y, 0.0], rot: [Math.PI / 2, 0, 0] }));
    for (let i = 0; i < 4; i++) {
      scaf.add(mesh(new SphereGeometry(0.034, 6, 6), knot, { pos: [-1.14, y, -0.82 + i * 0.55], cast: false }));
    }
  }
  // Diagonal bamboo brace + wooden catwalk plank
  scaf.add(
    mesh(new CylinderGeometry(0.02, 0.02, 2.05, 8), bambooJade, { pos: [-1.16, 0.76, 0], rot: [0.95, 0, 0] }),
    mesh(roundedBoxGeo(0.24, 0.04, 1.72, 0.015, 0.006), kit.clay(0xb8844c), { pos: [-1.06, 0.79, 0] }),
  );
  // Right-front corner bamboo pair + emerald safety mesh banner
  for (const x of [0.64, 1.12]) {
    scaf.add(mesh(poleV, bambooTan, { pos: [x, 0.74, 0.94] }));
  }
  for (const y of [0.42, 0.95]) {
    scaf.add(mesh(poleHFront, bambooJade, { pos: [0.88, y, 0.94], rot: [0, 0, Math.PI / 2] }));
  }
  const meshBanner = mesh(new BoxGeometry(0.46, 0.48, 0.02), kit.glass(0x28b878, 0.65), { pos: [0.88, 0.68, 0.96], cast: false });
  scaf.add(meshBanner);
  g.add(scaf);

  return {
    group: tagMilestone(g, 4, "floor1"),
    anim(t) {
      meshBanner.rotation.x = Math.sin(t * 2.2) * 0.04;
    },
  };
}

// Day 5: Home Pantry — Woven Rice Sack ("米"), Multi-tier Bamboo Steamer with Steam Puffs, Ceramic Teapot
function buildDay5Pantry(kit) {
  const g = new Group();
  const wood = kit.textured("woodPlank", { finish: "lacquer", rough: 0.46 });
  const sackMat = kit.textured("riceSack", { finish: "fabric", rough: 0.76 });
  const cordMat = kit.fabric(0xc9312a, { rough: 0.64 });
  const bamboo = kit.clay(0xdcb46c, { rough: 0.54 });
  const bambooRim = kit.clay(0xaa7d3c, { rough: 0.56 });
  const ceramic = kit.gloss(0x26a3a0, { rough: 0.14 });

  // Wooden pantry pallet
  g.add(mesh(roundedBoxGeo(1.26, 0.1, 0.92, 0.05, 0.018), wood, { pos: [0, 0.05, 0] }));

  // Plump Woven Clay Rice Sack ("米")
  const sackGeo = sculptGeo(latheGeo([
    [0, 0], [0.28, 0], [0.36, 0.16], [0.35, 0.46], [0.25, 0.68], [0.13, 0.78], [0.22, 0.9], [0.16, 0.92], [0, 0.82],
  ], 26), 0.018, 4.5, 51, { flatBottom: true });
  const sack = mesh(sackGeo, sackMat, { pos: [-0.24, 0.1, 0.02], scale: [1.05, 1, 0.88] });
  const cord = mesh(new TorusGeometry(0.145, 0.026, 10, 22), cordMat, { pos: [-0.24, 0.88, 0.02], rot: [Math.PI / 2, 0, 0] });
  const bowL = mesh(new SphereGeometry(0.055, 10, 8), cordMat, { pos: [-0.12, 0.88, 0.14], scale: [1.4, 0.75, 0.6] });
  const bowR = mesh(new SphereGeometry(0.055, 10, 8), cordMat, { pos: [-0.36, 0.88, 0.14], scale: [1.4, 0.75, 0.6] });
  g.add(sack, cord, bowL, bowR);

  // 3-tier Bamboo Dim-Sum Steamer + Dumplings peeking + Animated Steam Puffs
  const steamer = new Group();
  steamer.position.set(0.32, 0.1, -0.08);
  for (let i = 0; i < 3; i++) {
    const ty = 0.09 + i * 0.16;
    steamer.add(
      mesh(new CylinderGeometry(0.24, 0.24, 0.15, 22), bamboo, { pos: [0, ty, 0] }),
      mesh(new TorusGeometry(0.242, 0.018, 8, 24), bambooRim, { pos: [0, ty + 0.06, 0], rot: [Math.PI / 2, 0, 0] }),
    );
  }
  // 3 cute sculpted dumplings resting in top basket
  for (let d = 0; d < 3; d++) {
    const a = (d * Math.PI * 2) / 3 + 0.4;
    steamer.add(mesh(sculptGeo(new SphereGeometry(0.068, 12, 10), 0.008, 24, 52 + d, { flatBottom: true }), kit.clay(0xfff5dc, { rough: 0.36 }), {
      pos: [Math.cos(a) * 0.1, 0.51, Math.sin(a) * 0.1],
      scale: [1.1, 0.78, 0.9],
    }));
  }
  // Slightly tilted woven lid
  const lid = mesh(new CylinderGeometry(0.245, 0.25, 0.055, 22), bamboo, { pos: [0.06, 0.56, -0.05], rot: [0.22, 0, -0.26] });
  lid.add(mesh(new TorusGeometry(0.05, 0.014, 8, 14), bambooRim, { pos: [0, 0.04, 0], rot: [0, 0, 0] }));
  steamer.add(lid);

  const steamMat = kit.glass(0xffffff, 0.48);
  const puffs = [];
  for (let i = 0; i < 4; i++) {
    const p = mesh(new SphereGeometry(0.065 + (i % 2) * 0.02, 10, 8), steamMat, { pos: [0, 0.65 + i * 0.16, 0], cast: false });
    puffs.push({ m: p, phase: i * 0.25 });
    steamer.add(p);
  }
  g.add(steamer);

  // Glazed turquoise ceramic teapot + 2 tiny teacups
  const pot = new Group();
  pot.position.set(0.28, 0.1, 0.3);
  pot.add(
    mesh(new SphereGeometry(0.14, 18, 14), ceramic, { pos: [0, 0.12, 0], scale: [1.08, 0.86, 1.08] }),
    mesh(new CylinderGeometry(0.08, 0.095, 0.04, 16), ceramic, { pos: [0, 0.23, 0] }),
    mesh(new SphereGeometry(0.032, 10, 8), ceramic, { pos: [0, 0.265, 0] }),
    mesh(tubeGeo([[0.12, 0.1, 0], [0.22, 0.16, 0], [0.25, 0.22, 0]], 0.024, 12, 8), ceramic),
    mesh(tubeGeo([[-0.12, 0.16, 0], [-0.21, 0.14, 0], [-0.14, 0.07, 0]], 0.02, 12, 8), ceramic),
    mesh(new CylinderGeometry(0.042, 0.032, 0.055, 12), ceramic, { pos: [0.26, 0.028, 0.12] }),
    mesh(new CylinderGeometry(0.042, 0.032, 0.055, 12), ceramic, { pos: [0.14, 0.028, 0.19] }),
  );
  g.add(pot);

  addContactShadow(g, 0.72, 0.56, 0.008, 0.34, kit);
  return {
    group: tagMilestone(g, 5, "pantry"),
    anim(t) {
      for (const p of puffs) {
        const u = (t * 0.38 + p.phase) % 1;
        p.m.position.y = 0.6 + u * 0.58;
        p.m.position.x = Math.sin(u * Math.PI * 2 + p.phase * 6) * 0.07;
        p.m.scale.setScalar(0.55 + u * 0.95);
      }
    },
  };
}

// Day 6: 2/F Cha Chaan Teng Bay + Double-Sided Glowing 3D HK Neon Sign
function buildDay6Neon(kit) {
  const g = new Group();
  const wall = kit.clay(0xffe5eb, { rough: 0.48 });
  const tile = kit.textured("checkerTile", { finish: "glaze", rough: 0.22 });
  const frame = kit.enamel(0x1b6d62, { rough: 0.28 });
  const winGlow = kit.emissive(0xffdc80, 0.7, 1.95);
  const winGlowDim = kit.emissive(0xffbc68, 0.54, 1.6);
  const iron = kit.metal(0x2c3040, 0.34, 0.78);
  const neonPink = kit.emissive(0xff5fa8, 1.1, 2.6);
  const neonTeal = kit.emissive(0x38f3dc, 1.0, 2.5);
  const neonGold = kit.emissive(0xffe266, 0.95, 2.3);
  const signFace = kit.textured("neonSign", { finish: "glaze", rough: 0.18, emissive: true, baseEmissive: 0.85, nightEmissive: 2.0 });

  // 2/F structural volume (height = 1.15 so 3F stacks cleanly at y = 2.40)
  g.add(
    mesh(roundedBoxGeo(1.88, 1.04, 1.46, 0.06, 0.024), wall, { pos: [0, 0.54, 0] }),
    // Checkered Cha Chaan Teng ceramic tile dado band
    mesh(roundedBoxGeo(1.92, 0.3, 1.5, 0.04, 0.012), tile, { pos: [0, 0.19, 0] }),
    // Upper molding cornice
    mesh(roundedBoxGeo(2.04, 0.13, 1.62, 0.06, 0.022), frame, { pos: [0, 1.09, 0] }),
  );

  // Cozy arched Cha Chaan Teng booth windows with varied glow & muntin frames
  for (const [idx, wx] of [-0.52, 0, 0.52].entries()) {
    for (const sz of [-1, 1]) {
      g.add(
        mesh(roundedBoxGeo(0.36, 0.48, 0.06, 0.08, 0.01), frame, { pos: [wx, 0.64, sz * 0.73] }),
        mesh(roundedBoxGeo(0.28, 0.4, 0.07, 0.06, 0.008), (idx + (sz > 0 ? 0 : 1)) % 3 === 1 ? winGlowDim : winGlow, { pos: [wx, 0.64, sz * 0.74], cast: false }),
        mesh(new BoxGeometry(0.28, 0.022, 0.075), frame, { pos: [wx, 0.66, sz * 0.745] }),
      );
    }
  }
  for (const wz of [-0.32, 0.32]) {
    g.add(
      mesh(roundedBoxGeo(0.06, 0.48, 0.36, 0.06, 0.01), frame, { pos: [-0.94, 0.64, wz] }),
      mesh(roundedBoxGeo(0.07, 0.4, 0.28, 0.05, 0.008), wz < 0 ? winGlowDim : winGlow, { pos: [-0.95, 0.64, wz], cast: false }),
    );
  }
  // Classic HK exterior AC condenser box on rear-left wall (rich 360° authenticity!)
  g.add(
    mesh(roundedBoxGeo(0.34, 0.24, 0.2, 0.03, 0.008), kit.clay(0xe3e7ea), { pos: [-0.62, 0.36, -0.82] }),
    mesh(new CylinderGeometry(0.085, 0.085, 0.03, 14), kit.clay(0x3a404c), { pos: [-0.66, 0.36, -0.92], rot: [Math.PI / 2, 0, 0] }),
  );

  // Steel Truss Bracket + Heroic Double-Sided 3D Neon Sign projecting to +X
  const signGroup = new Group();
  signGroup.position.set(0.94, 0.68, 0.1);
  signGroup.scale.setScalar(1.18);
  // Riveted iron truss struts
  signGroup.add(
    mesh(new CylinderGeometry(0.022, 0.022, 0.42, 8), iron, { pos: [0.2, 0.28, 0], rot: [0, 0, Math.PI / 2] }),
    mesh(new CylinderGeometry(0.022, 0.022, 0.42, 8), iron, { pos: [0.2, -0.24, 0], rot: [0, 0, Math.PI / 2] }),
    mesh(new CylinderGeometry(0.018, 0.018, 0.56, 8), iron, { pos: [0.16, 0.02, 0], rot: [0, 0, 0.72] }),
    // Signboard cabinet
    mesh(roundedBoxGeo(1.06, 0.64, 0.14, 0.06, 0.018), kit.clay(0x181d38, { rough: 0.36 }), { pos: [0.84, 0.04, 0] }),
    // Double-sided glowing sign plates (front & back!)
    mesh(new PlaneGeometry(0.94, 0.52), signFace, { pos: [0.84, 0.04, 0.075], cast: false }),
    mesh(new PlaneGeometry(0.94, 0.52), signFace, { pos: [0.84, 0.04, -0.075], rot: [0, Math.PI, 0], cast: false }),
  );
  // 3D Glowing Neon Tubes wrapping front & back borders + neon teacup crest on top!
  for (const sz of [-0.082, 0.082]) {
    signGroup.add(mesh(tubeGeo([
      [0.34, -0.25, sz], [1.34, -0.25, sz], [1.34, 0.33, sz], [0.34, 0.33, sz],
    ], 0.018, 28, 8, true), neonTeal, { cast: false }));
  }
  const cupNeon = new Group();
  cupNeon.position.set(0.84, 0.48, 0);
  cupNeon.add(
    mesh(new TorusGeometry(0.11, 0.018, 8, 20, Math.PI), neonPink, { rot: [0, 0, Math.PI], cast: false }),
    mesh(new CylinderGeometry(0.018, 0.018, 0.24, 8), neonPink, { rot: [0, 0, Math.PI / 2], cast: false }),
    mesh(new TorusGeometry(0.045, 0.014, 8, 12), neonGold, { pos: [0.12, -0.04, 0], cast: false }),
  );
  signGroup.add(cupNeon);
  g.add(signGroup);

  return {
    group: tagMilestone(g, 6, "neon"),
    anim(t) {
      // Gentle living neon sign shimmer
      const pulse = 1 + Math.sin(t * 4.5) * 0.06;
      cupNeon.scale.setScalar(pulse);
    },
  };
}

// Day 7: Iconic Star Ferry (天星小輪) + Insurance Net (保險網) Lifebuoy
function buildDay7Ferry(kit) {
  const g = new Group();
  const green = kit.enamel(0x167a4c, { rough: 0.24 });
  const greenDark = kit.enamel(0x0f5636, { rough: 0.28 });
  const cream = kit.enamel(0xfff7e6, { rough: 0.24 });
  const teak = kit.clay(0xb87c44, { rough: 0.48 });
  const brass = kit.metal(0xf0c248, 0.2, 0.86);
  const winGlow = kit.emissive(0xffe69c, 0.55, 1.75);
  const wakeMat = kit.glass(0xeafcff, 0.62);

  // Double-ended Star Ferry hull
  const boat = new Group();
  boat.position.set(-0.1, 0.05, 0);
  const hull = mesh(roundedBoxGeo(1.78, 0.28, 0.66, 0.26, 0.04), green, { pos: [0, 0.14, 0] });
  const fender = mesh(roundedBoxGeo(1.84, 0.06, 0.72, 0.28, 0.015), cream, { pos: [0, 0.27, 0] });
  // Lower deck + white upper cabin + wooden roof deck
  const lowerDeck = mesh(roundedBoxGeo(1.42, 0.24, 0.56, 0.14, 0.02), cream, { pos: [0, 0.41, 0] });
  const upperCabin = mesh(roundedBoxGeo(1.22, 0.28, 0.54, 0.12, 0.02), cream, { pos: [0, 0.65, 0] });
  const roof = mesh(roundedBoxGeo(1.32, 0.07, 0.6, 0.14, 0.018), greenDark, { pos: [0, 0.81, 0] });
  boat.add(hull, fender, lowerDeck, upperCabin, roof);

  // Brass circular portholes & upper glowing passenger windows on both sides
  for (let i = -2; i <= 2; i++) {
    for (const sz of [-1, 1]) {
      boat.add(
        mesh(new TorusGeometry(0.05, 0.014, 8, 14), brass, { pos: [i * 0.24, 0.41, sz * 0.285] }),
        mesh(new CylinderGeometry(0.042, 0.042, 0.02, 12), winGlow, { pos: [i * 0.24, 0.41, sz * 0.28], rot: [Math.PI / 2, 0, 0], cast: false }),
        mesh(roundedBoxGeo(0.16, 0.14, 0.03, 0.02, 0.005), winGlow, { pos: [i * 0.22, 0.65, sz * 0.27], cast: false }),
      );
    }
  }
  // Tiny wooden passenger benches on fore & aft decks
  for (const sx of [-0.74, 0.74]) {
    boat.add(mesh(roundedBoxGeo(0.14, 0.06, 0.36, 0.02, 0.006), teak, { pos: [sx, 0.33, 0] }));
  }
  // Iconic central smokestack funnel with golden star emblem on BOTH sides!
  const funnel = mesh(new CylinderGeometry(0.11, 0.13, 0.36, 18), cream, { pos: [0, 1.01, 0] });
  const funnelTop = mesh(new CylinderGeometry(0.115, 0.115, 0.08, 18), greenDark, { pos: [0, 1.17, 0] });
  const starGeo = starExtrude(0.075, 0.032, 0.02);
  boat.add(
    funnel, funnelTop,
    mesh(starGeo, brass, { pos: [0, 1.0, 0.125] }),
    mesh(starGeo, brass, { pos: [0, 1.0, -0.125] }),
    // Port (red) and Starboard (green) navigation lamps
    mesh(new SphereGeometry(0.036, 10, 8), kit.emissive(0xff4242, 0.9, 2.2), { pos: [0.6, 0.86, 0.25], cast: false }),
    mesh(new SphereGeometry(0.036, 10, 8), kit.emissive(0x36f08a, 0.9, 2.2), { pos: [0.6, 0.86, -0.25], cast: false }),
  );

  // Delicate flattened sea-foam wake arcs (no thick stick tubes over wood turntable)
  const foamWakeMat = kit.clay(0xdff9fc, { rough: 0.36 });
  const wakeL = mesh(tubeGeo([[-0.82, 0.02, 0.16], [-1.14, 0.015, 0.32], [-1.36, 0.01, 0.44]], 0.022, 12, 8), foamWakeMat, { scale: [1, 0.24, 1], cast: false });
  const wakeR = mesh(tubeGeo([[-0.82, 0.02, -0.16], [-1.14, 0.015, -0.32], [-1.36, 0.01, -0.44]], 0.022, 12, 8), foamWakeMat, { scale: [1, 0.24, 1], cast: false });
  boat.add(wakeL, wakeR);
  g.add(boat);

  // Coral-and-White Insurance Net (保險網) Lifebuoy + Golden Safety-Net Ring clear of hull corner
  const buoy = new Group();
  buoy.position.set(0.84, 0.14, 0.56);
  buoy.add(
    mesh(new TorusGeometry(0.22, 0.075, 14, 28), kit.enamel(0xf04e3e, { rough: 0.24 }), { rot: [Math.PI / 2, 0, 0] }),
    mesh(new TorusGeometry(0.32, 0.02, 8, 28), brass, { rot: [Math.PI / 2, 0, 0] }),
  );
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2;
    buoy.add(
      mesh(new TorusGeometry(0.078, 0.022, 8, 12), cream, { pos: [Math.cos(a) * 0.22, 0, Math.sin(a) * 0.22], rot: [0, -a, 0] }),
      mesh(new CylinderGeometry(0.01, 0.01, 0.62, 6), brass, { pos: [0, -0.02, 0], rot: [Math.PI / 2, a + Math.PI / 4, 0] }),
    );
  }
  g.add(buoy);

  return {
    group: tagMilestone(g, 7, "ferry"),
    anim(t) {
      boat.position.y = 0.05 + Math.sin(t * 2.0) * 0.04;
      boat.rotation.z = Math.sin(t * 1.5) * 0.04;
      boat.rotation.x = Math.cos(t * 1.8) * 0.03;
      buoy.position.y = 0.14 + Math.sin(t * 2.4 + 1.2) * 0.045;
      buoy.rotation.y = t * 0.6;
    },
  };
}

// Day 8: Autopay Safe Vault + Heroic Golden Padlock + Stacked Gold Coins
function buildDay8Vault(kit) {
  const g = new Group();
  const steel = kit.enamel(0x5b6e8e, { rough: 0.26, metalness: 0.26 });
  const gold = kit.metal(0xf5bf38, 0.2, 0.88);
  const goldDeep = kit.metal(0xd1941c, 0.24, 0.84);
  const ledMat = kit.emissive(0x2cf292, 1.0, 2.4);
  const coinFace = kit.textured("coinFace", { finish: "metal", rough: 0.2 });

  // Heavy beveled safe vault body + reinforced corner feet + side hinges + riveted back plate
  g.add(
    mesh(roundedBoxGeo(0.94, 0.96, 0.86, 0.1, 0.03), steel, { pos: [-0.08, 0.54, -0.04] }),
    mesh(roundedBoxGeo(0.78, 0.8, 0.09, 0.07, 0.02), goldDeep, { pos: [-0.08, 0.54, 0.39] }),
    // Rear riveted armor plate
    mesh(roundedBoxGeo(0.76, 0.78, 0.05, 0.05, 0.012), kit.enamel(0x4b5c78, { rough: 0.3, metalness: 0.24 }), { pos: [-0.08, 0.54, -0.47] }),
    // Side brass hinges
    mesh(new CylinderGeometry(0.042, 0.042, 0.16, 12), gold, { pos: [-0.54, 0.76, 0.36] }),
    mesh(new CylinderGeometry(0.042, 0.042, 0.16, 12), gold, { pos: [-0.54, 0.32, 0.36] }),
    // Glowing green Autopay LED
    mesh(new SphereGeometry(0.042, 12, 10), ledMat, { pos: [0.18, 0.82, 0.445], cast: false }),
  );
  for (const [fx, fz] of [[-0.4, -0.34], [0.24, -0.34], [-0.4, 0.26], [0.24, 0.26]]) {
    g.add(mesh(new CylinderGeometry(0.07, 0.08, 0.08, 12), goldDeep, { pos: [fx, 0.04, fz] }));
  }

  // Rotating 4-spoke brass combination dial wheel
  const wheel = new Group();
  wheel.position.set(-0.08, 0.54, 0.47);
  wheel.add(
    mesh(new TorusGeometry(0.2, 0.032, 12, 26), gold),
    mesh(new CylinderGeometry(0.065, 0.065, 0.06, 16), gold, { rot: [Math.PI / 2, 0, 0] }),
  );
  for (let i = 0; i < 4; i++) {
    wheel.add(mesh(new CylinderGeometry(0.02, 0.02, 0.38, 8), gold, { rot: [0, 0, (i * Math.PI) / 4] }));
  }
  g.add(wheel);

  // Heroic Sculpted Golden Padlock guarding front-right!
  const lock = new Group();
  lock.position.set(0.56, 0.0, 0.28);
  lock.rotation.y = -0.32;
  lock.add(
    mesh(roundedBoxGeo(0.46, 0.42, 0.2, 0.07, 0.026), gold, { pos: [0, 0.21, 0] }),
    mesh(new TorusGeometry(0.15, 0.042, 12, 24, Math.PI), kit.metal(0xffe178, 0.18, 0.88), { pos: [0, 0.41, 0] }),
    mesh(new CylinderGeometry(0.042, 0.042, 0.12, 12), kit.metal(0xffe178, 0.18, 0.88), { pos: [-0.15, 0.39, 0] }),
    mesh(new CylinderGeometry(0.042, 0.042, 0.12, 12), kit.metal(0xffe178, 0.18, 0.88), { pos: [0.15, 0.39, 0] }),
    // Keyhole escutcheon
    mesh(new CylinderGeometry(0.042, 0.042, 0.03, 12), kit.clay(0x282018), { pos: [0, 0.25, 0.1], rot: [Math.PI / 2, 0, 0], cast: false }),
    mesh(new BoxGeometry(0.034, 0.1, 0.03), kit.clay(0x282018), { pos: [0, 0.18, 0.1], cast: false }),
  );
  g.add(lock);

  // Stacked gold coin cylinders beside the vault
  for (const [cx, cz, cnt] of [[0.56, -0.18, 5], [0.76, 0.02, 3]]) {
    for (let i = 0; i < cnt; i++) {
      g.add(mesh(new CylinderGeometry(0.11, 0.11, 0.036, 20), [gold, coinFace, coinFace], {
        pos: [cx, 0.02 + i * 0.038, cz],
      }));
    }
  }

  addContactShadow(g, 0.82, 0.68, 0.008, 0.35, kit);
  return {
    group: tagMilestone(g, 8, "vault"),
    anim(t) {
      wheel.rotation.z = Math.sin(t * 0.9) * 0.8;
    },
  };
}

// Day 9: 3/F Sunlit Dim Sum Terrace + Ornate Iron Balcony Grille + Swaying Bamboo Laundry Poles
function buildDay9Laundry(kit) {
  const g = new Group();
  const wall = kit.clay(0xdcf5ee, { rough: 0.5 });
  const trim = kit.clay(0xfff6e5, { rough: 0.48 });
  const iron = kit.metal(0x1f5c4e, 0.36, 0.72);
  const winGlow = kit.emissive(0xffe7a0, 0.64, 1.85);
  const winGlowWarm = kit.emissive(0xffca7a, 0.52, 1.6);
  const bamboo = kit.clay(0xd4ae5c, { rough: 0.54 });

  // 3/F body (height = 1.10 so 4F stacks cleanly at y = 3.50)
  g.add(
    mesh(roundedBoxGeo(1.82, 0.98, 1.4, 0.06, 0.022), wall, { pos: [0, 0.51, 0] }),
    mesh(roundedBoxGeo(1.98, 0.13, 1.56, 0.06, 0.022), trim, { pos: [0, 1.04, 0] }),
  );
  // Warm French terrace windows front & back with vertical muntin stiles
  for (const [idx, wx] of [-0.46, 0, 0.46].entries()) {
    for (const sz of [-1, 1]) {
      g.add(
        mesh(roundedBoxGeo(0.32, 0.56, 0.05, 0.04, 0.01), trim, { pos: [wx, 0.56, sz * 0.7] }),
        mesh(roundedBoxGeo(0.24, 0.46, 0.06, 0.03, 0.008), idx === 2 ? winGlowWarm : winGlow, { pos: [wx, 0.56, sz * 0.71], cast: false }),
        mesh(new BoxGeometry(0.02, 0.46, 0.065), iron, { pos: [wx, 0.56, sz * 0.715] }),
      );
    }
  }

  // Cantilevered front & side Sunlit Terrace slab + Ornate HK Iron Balcony Grille
  g.add(mesh(roundedBoxGeo(2.04, 0.08, 0.42, 0.04, 0.012), trim, { pos: [0, 0.06, 0.84] }));
  // Balcony rail top bar + decorative diamond balusters
  g.add(mesh(roundedBoxGeo(2.02, 0.045, 0.045, 0.01, 0.005), iron, { pos: [0, 0.42, 1.02] }));
  for (let i = -4; i <= 4; i++) {
    g.add(mesh(new CylinderGeometry(0.014, 0.014, 0.36, 6), iron, { pos: [i * 0.23, 0.24, 1.02] }));
    if (i < 4) {
      g.add(mesh(new TorusGeometry(0.055, 0.011, 6, 12), iron, { pos: [i * 0.23 + 0.115, 0.26, 1.02] }));
    }
  }
  for (const sx of [-1.0, 1.0]) {
    g.add(
      mesh(roundedBoxGeo(0.045, 0.045, 0.38, 0.01, 0.005), iron, { pos: [sx, 0.42, 0.84] }),
      mesh(new CylinderGeometry(0.014, 0.014, 0.36, 6), iron, { pos: [sx, 0.24, 0.84] }),
    );
  }
  // Tiny terrace marble tea table + dim sum steamer + potted fern
  g.add(
    mesh(new CylinderGeometry(0.14, 0.14, 0.03, 16), kit.gloss(0xfffdf8), { pos: [0.58, 0.24, 0.86] }),
    mesh(new CylinderGeometry(0.025, 0.04, 0.18, 10), iron, { pos: [0.58, 0.14, 0.86] }),
    mesh(new CylinderGeometry(0.065, 0.065, 0.05, 12), bamboo, { pos: [0.58, 0.28, 0.86] }),
    mesh(new CylinderGeometry(0.075, 0.055, 0.12, 12), kit.clay(0xd66c44), { pos: [-0.68, 0.15, 0.86] }),
    mesh(new SphereGeometry(0.1, 10, 8), kit.clay(0x3ba864), { pos: [-0.68, 0.25, 0.86] }),
  );

  // Classic HK Bamboo Laundry Poles (晾衫竹) projecting jauntily to -X with swaying shirts & towel!
  const laundryGroup = new Group();
  laundryGroup.position.set(-0.92, 0.66, 0);
  const garments = [];
  const poleSpecs = [
    { z: 0.24, tilt: 0.18, items: [{ x: -0.32, col: 0xff6b8b, w: 0.22, h: 0.3 }, { x: -0.64, col: 0x5cc4ff, w: 0.2, h: 0.28 }] },
    { z: -0.24, tilt: 0.12, items: [{ x: -0.36, col: 0xffd24c, w: 0.24, h: 0.26 }, { x: -0.68, col: 0xfff6e5, w: 0.18, h: 0.34 }] },
  ];
  poleSpecs.forEach((ps, pIdx) => {
    const pole = mesh(new CylinderGeometry(0.018, 0.022, 0.96, 8), bamboo, {
      pos: [-0.44, 0.08, ps.z],
      rot: [0, 0, Math.PI / 2 - ps.tilt],
    });
    laundryGroup.add(pole);
    ps.items.forEach((it, iIdx) => {
      const pivot = new Group();
      pivot.position.set(it.x, 0.08 + (-it.x - 0.04) * Math.tan(ps.tilt) * 0.45, ps.z);
      const shirt = mesh(roundedBoxGeo(it.w, it.h, 0.045, 0.03, 0.01), kit.fabric(it.col, { rough: 0.7 }), {
        pos: [0, -it.h * 0.52, 0],
      });
      // Cute t-shirt sleeves for first two items
      if (it.w >= 0.2) {
        shirt.add(
          mesh(roundedBoxGeo(0.07, 0.1, 0.04, 0.02, 0.008), kit.fabric(it.col, { rough: 0.7 }), { pos: [-it.w * 0.55, 0.06, 0], rot: [0, 0, 0.4] }),
          mesh(roundedBoxGeo(0.07, 0.1, 0.04, 0.02, 0.008), kit.fabric(it.col, { rough: 0.7 }), { pos: [it.w * 0.55, 0.06, 0], rot: [0, 0, -0.4] }),
        );
      }
      const pin = mesh(new BoxGeometry(0.024, 0.055, 0.03), kit.clay(0x9a6434), { pos: [0, 0.01, 0] });
      pivot.add(shirt, pin);
      laundryGroup.add(pivot);
      garments.push({ pivot, phase: pIdx * 1.7 + iIdx * 0.9 });
    });
  });
  g.add(laundryGroup);

  return {
    group: tagMilestone(g, 9, "laundry"),
    anim(t) {
      for (const gm of garments) {
        gm.pivot.rotation.x = Math.sin(t * 2.2 + gm.phase) * 0.18;
      }
    },
  };
}

// Day 10: 18222 Anti-Scam Lighthouse with Rotating Golden Volumetric Light Beams
function buildDay10Lighthouse(kit) {
  const g = new Group();
  const stone = kit.textured("stoneWall", { rough: 0.65 });
  const red = kit.enamel(0xe24338, { rough: 0.26 });
  const cream = kit.enamel(0xfff6e6, { rough: 0.28 });
  const iron = kit.metal(0x282d3c, 0.34, 0.8);
  const brass = kit.metal(0xf0be44, 0.2, 0.86);
  const lampCore = kit.emissive(0xffe87a, 1.35, 3.0);
  const beamMat = kit.emissive(0xffe478, 0.45, 1.15, { transparent: true, opacity: 0.14, depthWrite: false, side: DoubleSide });

  // Stepped octagonal granite plinth + sculpted harbour boulders + arched timber-and-brass door
  g.add(
    mesh(new CylinderGeometry(0.62, 0.7, 0.24, 8), stone, { pos: [0, 0.12, 0] }),
    mesh(new CylinderGeometry(0.5, 0.56, 0.16, 8), kit.clay(0xd9d2c5), { pos: [0, 0.32, 0] }),
    mesh(roundedBoxGeo(0.24, 0.32, 0.08, 0.08, 0.014), kit.clay(0x7c4a26), { pos: [0, 0.56, 0.41] }),
    mesh(new SphereGeometry(0.022, 8, 8), brass, { pos: [0.06, 0.54, 0.46] }),
  );
  for (const [idx, bx, bz, rad] of [[0, -0.58, 0.36, 0.16], [1, 0.62, 0.28, 0.14], [2, -0.46, -0.52, 0.18], [3, 0.52, -0.48, 0.15]]) {
    g.add(mesh(sculptGeo(new SphereGeometry(rad, 10, 8), 0.028, 8.2, 100 + idx, { flatBottom: true }), kit.clay(0x8e969e, { rough: 0.64 }), {
      pos: [bx, rad * 0.55, bz],
      scale: [1.25, 0.72, 1.05],
    }));
  }

  // Tapered Red-and-Cream Striped Lighthouse Shaft (distinct sculpted rings for crisp 360° stripes!)
  const bands = [
    { y: 0.54, h: 0.32, rB: 0.44, rT: 0.4, mat: cream },
    { y: 0.86, h: 0.32, rB: 0.4, rT: 0.36, mat: red },
    { y: 1.18, h: 0.32, rB: 0.36, rT: 0.325, mat: cream },
    { y: 1.5, h: 0.32, rB: 0.325, rT: 0.29, mat: red },
    { y: 1.76, h: 0.2, rB: 0.29, rT: 0.275, mat: cream },
  ];
  for (const b of bands) {
    g.add(mesh(new CylinderGeometry(b.rT, b.rB, b.h, 24), b.mat, { pos: [0, b.y, 0] }));
  }

  // Prominent "18222" Anti-Scam Emblem Plaque on front + tiny porthole windows on sides/back
  g.add(
    mesh(roundedBoxGeo(0.46, 0.28, 0.06, 0.04, 0.01), brass, { pos: [0, 1.16, 0.34] }),
    mesh(new PlaneGeometry(0.4, 0.23), kit.textured("badge18222", { finish: "glaze", rough: 0.22 }), { pos: [0, 1.16, 0.375], cast: false }),
  );
  for (const a of [Math.PI * 0.5, Math.PI, Math.PI * 1.5]) {
    g.add(mesh(new TorusGeometry(0.055, 0.016, 8, 14), brass, {
      pos: [Math.sin(a) * 0.34, 1.18, Math.cos(a) * 0.34],
      rot: [0, a, 0],
    }));
  }

  // Cantilevered Observation Gallery + Miniature Iron Railing Balusters
  g.add(
    mesh(new CylinderGeometry(0.44, 0.3, 0.1, 24), iron, { pos: [0, 1.9, 0] }),
    mesh(new TorusGeometry(0.41, 0.018, 8, 28), iron, { pos: [0, 2.08, 0], rot: [Math.PI / 2, 0, 0] }),
  );
  for (let i = 0; i < 12; i++) {
    const a = (i * Math.PI * 2) / 12;
    g.add(mesh(new CylinderGeometry(0.012, 0.012, 0.16, 6), iron, { pos: [Math.cos(a) * 0.41, 2.0, Math.sin(a) * 0.41] }));
  }

  // Crystal Glass Lantern Room + Glowing Fresnel Lamp + Crimson Dome Cupola + Brass Lightning Finial
  g.add(
    mesh(new CylinderGeometry(0.24, 0.24, 0.36, 20), kit.glass(0xeaf8ff, 0.38), { pos: [0, 2.13, 0], cast: false }),
    mesh(new SphereGeometry(0.14, 16, 14), lampCore, { pos: [0, 2.14, 0], cast: false }),
    mesh(new SphereGeometry(0.27, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.55), red, { pos: [0, 2.31, 0] }),
    mesh(new CylinderGeometry(0.014, 0.025, 0.24, 8), brass, { pos: [0, 2.66, 0] }),
    mesh(new SphereGeometry(0.045, 10, 8), brass, { pos: [0, 2.57, 0] }),
  );

  // Twin Rotating Golden Atmospheric Beacon Glow Cones
  const beamPivot = new Group();
  beamPivot.position.set(0, 2.14, 0);
  const coneGeo = new ConeGeometry(0.36, 1.45, 18, 1, true);
  const b1 = mesh(coneGeo, beamMat, { pos: [0, 0, 0.84], rot: [-Math.PI / 2, 0, 0], cast: false, recv: false });
  const b2 = mesh(coneGeo, beamMat, { pos: [0, 0, -0.84], rot: [Math.PI / 2, 0, 0], cast: false, recv: false });
  b1.userData.ignoreBounds = true;
  b2.userData.ignoreBounds = true;
  beamPivot.add(b1, b2);
  g.add(beamPivot);

  addContactShadow(g, 0.74, 0.74, 0.008, 0.36, kit);
  return {
    group: tagMilestone(g, 10, "lighthouse"),
    anim(t) {
      beamPivot.rotation.y = t * 1.15;
    },
  };
}

// Day 11: Jack Joins the Pier + Teal Emergency-Fund Reserve Chest
function buildDay11Jack(kit) {
  const g = new Group();
  const jackRig = buildHumanFigurine(kit, "jack", null, { noShadow: true });
  jackRig.group.position.set(-0.28, 0.06, 0);
  jackRig.group.scale.setScalar(0.8);
  g.add(jackRig.group);

  // Wooden terrace mat
  g.add(mesh(roundedBoxGeo(1.26, 0.06, 0.86, 0.1, 0.015), kit.textured("woodPlank", { rough: 0.58 }), { pos: [0, 0.03, 0] }));

  // Teal & Brass Emergency-Fund Reserve Chest overflowing with gold coins + glowing shield badge
  const teal = kit.enamel(0x14968b, { rough: 0.26 });
  const brass = kit.metal(0xf0be44, 0.2, 0.86);
  const coinFace = kit.textured("coinFace", { finish: "metal", rough: 0.2 });
  const chest = new Group();
  chest.position.set(0.32, 0.06, 0.04);
  chest.rotation.y = -0.24;
  chest.add(
    mesh(roundedBoxGeo(0.56, 0.32, 0.4, 0.04, 0.016), teal, { pos: [0, 0.16, 0] }),
    // Brass corner bands + front clasp
    mesh(roundedBoxGeo(0.58, 0.055, 0.42, 0.02, 0.008), brass, { pos: [0, 0.06, 0] }),
    mesh(roundedBoxGeo(0.58, 0.055, 0.42, 0.02, 0.008), brass, { pos: [0, 0.28, 0] }),
    mesh(roundedBoxGeo(0.11, 0.13, 0.04, 0.03, 0.008), kit.emissive(0x4bf5c8, 0.65, 1.5), { pos: [0, 0.24, 0.21] }),
  );
  // Hinged domed lid popped open slightly so golden coins gleam inside!
  const lid = new Group();
  lid.position.set(0, 0.32, -0.18);
  lid.rotation.x = -0.58;
  lid.add(
    mesh(new CylinderGeometry(0.2, 0.2, 0.56, 16, 1, false, 0, Math.PI), teal, { pos: [0, 0, 0.18], rot: [0, 0, Math.PI / 2] }),
    mesh(new TorusGeometry(0.205, 0.02, 8, 16, Math.PI), brass, { pos: [-0.22, 0, 0.18], rot: [0, Math.PI / 2, 0] }),
    mesh(new TorusGeometry(0.205, 0.02, 8, 16, Math.PI), brass, { pos: [0.22, 0, 0.18], rot: [0, Math.PI / 2, 0] }),
  );
  chest.add(lid);
  // Overflowing gold coins mound inside chest
  for (let i = 0; i < 6; i++) {
    chest.add(mesh(new CylinderGeometry(0.085, 0.085, 0.032, 16), [brass, coinFace, coinFace], {
      pos: [-0.14 + (i % 3) * 0.14, 0.31 + Math.floor(i / 3) * 0.034, -0.04 + (i % 2) * 0.09],
      rot: [0.18 * (i % 2 ? 1 : -1), i, 0.14],
    }));
  }
  g.add(chest);
  addContactShadow(g, 0.72, 0.52, 0.008, 0.34, kit);

  return {
    group: tagMilestone(g, 11, "jack"),
    anim(t, dt, ctx) {
      jackRig.anim(t, dt, ctx);
    },
  };
}

// Day 12: 4/F Cozy Study Loft + Retro Calculator + Lucky Tangerine Tree (大吉) & Laisee
function buildDay12Loft(kit) {
  const g = new Group();
  const wall = kit.clay(0xf2ecfc, { rough: 0.5 });
  const roofMat = kit.clay(0xd86b4c, { rough: 0.48 });
  const wood = kit.clay(0xa46c3c, { rough: 0.54 });
  const winGlow = kit.emissive(0xffdf84, 0.7, 1.9);
  const foliage = kit.clay(0x2f9a4c, { rough: 0.52 });
  const tangerineMat = kit.gloss(0xff8418, { rough: 0.14 });
  const laiseeMat = kit.textured("laisee", { finish: "lacquer", rough: 0.3 });

  // 4/F Study Loft volume (height = 1.10 so 5F stacks cleanly at y = 4.60)
  g.add(
    mesh(roundedBoxGeo(1.76, 0.98, 1.36, 0.06, 0.022), wall, { pos: [0, 0.5, 0] }),
    // Pitched dormer-trimmed upper cornice & skylight frame
    mesh(roundedBoxGeo(1.92, 0.13, 1.52, 0.06, 0.022), roofMat, { pos: [0, 1.04, 0] }),
    // Slanted glowing skylight box on roof edge
    mesh(roundedBoxGeo(0.68, 0.14, 0.44, 0.03, 0.01), kit.clay(0x3a4256), { pos: [-0.26, 1.12, 0.22], rot: [0.22, 0, 0] }),
    mesh(roundedBoxGeo(0.58, 0.04, 0.36, 0.02, 0.006), winGlow, { pos: [-0.26, 1.18, 0.23], rot: [0.22, 0, 0], cast: false }),
  );
  // Warm study windows front & back + cozy glowing desk lamp silhouette inside
  for (const sz of [-1, 1]) {
    for (const wx of [-0.42, 0.24]) {
      g.add(
        mesh(roundedBoxGeo(0.42, 0.48, 0.05, 0.05, 0.01), wood, { pos: [wx, 0.56, sz * 0.68] }),
        mesh(roundedBoxGeo(0.34, 0.4, 0.06, 0.04, 0.008), winGlow, { pos: [wx, 0.56, sz * 0.69], cast: false }),
      );
    }
  }

  // Retro 3D Clay Calculator propped on a right-side study ledge
  const calc = new Group();
  calc.position.set(1.06, 0.32, 0.12);
  calc.rotation.set(-0.22, 0.42, 0);
  calc.add(
    mesh(roundedBoxGeo(0.36, 0.06, 0.34, 0.03, 0.01), wood, { pos: [-0.08, -0.22, 0] }),
    mesh(roundedBoxGeo(0.36, 0.46, 0.1, 0.04, 0.014), kit.clay(0xebe2d2), { pos: [0, 0.04, 0] }),
    mesh(new PlaneGeometry(0.3, 0.4), kit.textured("calcScreen", { finish: "lacquer", rough: 0.28 }), { pos: [0, 0.04, 0.055], cast: false }),
  );
  g.add(calc);

  // Lucky Tangerine Tree (大吉盆栽) in Terracotta Pot on front-right balcony + Laisee envelopes!
  const tree = new Group();
  tree.position.set(0.68, 0.04, 0.84);
  g.add(mesh(roundedBoxGeo(0.62, 0.08, 0.46, 0.04, 0.012), kit.clay(0xfff4e2), { pos: [0.68, 0.04, 0.82] }));
  const potGeo = latheGeo([[0, 0], [0.16, 0], [0.22, 0.26], [0.25, 0.31], [0.22, 0.33], [0.18, 0.28], [0, 0.26]], 20);
  tree.add(
    mesh(potGeo, kit.clay(0xcf5d38, { rough: 0.54 })),
    mesh(new CylinderGeometry(0.18, 0.18, 0.04, 16), kit.clay(0x5a3e28), { pos: [0, 0.26, 0] }),
    mesh(tubeGeo([[0, 0.26, 0], [0.04, 0.44, 0.02], [-0.02, 0.62, -0.02]], 0.042, 12, 8), kit.clay(0x6e482b)),
    mesh(sculptGeo(new SphereGeometry(0.24, 16, 14), 0.026, 6.2, 120), foliage, { pos: [0, 0.72, 0] }),
    mesh(sculptGeo(new SphereGeometry(0.19, 14, 12), 0.022, 6.8, 121), kit.clay(0x42b45e), { pos: [0.14, 0.66, 0.09] }),
    mesh(sculptGeo(new SphereGeometry(0.18, 14, 12), 0.022, 7.1, 122), foliage, { pos: [-0.14, 0.65, -0.06] }),
    mesh(sculptGeo(new SphereGeometry(0.16, 14, 12), 0.02, 7.6, 123), kit.clay(0x49bf64), { pos: [0, 0.86, 0.04] }),
  );
  // 8 Glossy 3D Tangerines (大吉)
  const tangSpots = [
    [0.16, 0.76, 0.18], [-0.18, 0.73, 0.14], [0.02, 0.92, 0.14], [0.24, 0.64, -0.02],
    [-0.14, 0.82, -0.14], [0.1, 0.62, 0.22], [-0.04, 0.7, -0.22], [0.18, 0.8, -0.14],
  ];
  tangSpots.forEach(([tx, ty, tz]) => {
    tree.add(mesh(new SphereGeometry(0.056, 12, 10), tangerineMat, { pos: [tx, ty, tz], scale: [1.08, 0.92, 1.08] }));
  });
  // Hanging Laisee envelopes
  for (const [lx, ly, lz, ry] of [[0.24, 0.56, 0.16, 0.4], [-0.22, 0.56, 0.12, -0.5]]) {
    tree.add(mesh(new BoxGeometry(0.08, 0.11, 0.015), laiseeMat, { pos: [lx, ly, lz], rot: [0, ry, 0.12] }));
  }
  g.add(tree);

  return {
    group: tagMilestone(g, 12, "loft"),
    anim(t) {
      tree.rotation.z = Math.sin(t * 1.8) * 0.025;
    },
  };
}

// Day 13: Traditional HK Red-Sail Junk (鴨靈船) with Curved Battened Crimson Sails & Cabin Lantern
function buildDay13Junk(kit, opts = {}) {
  const g = new Group();
  const isGold = !!opts.golden;
  const hullMat = isGold ? kit.enamel(0x9a2024, { rough: 0.24 }) : kit.textured("woodPlank", { finish: "lacquer", rough: 0.46 });
  const trimMat = isGold ? kit.metal(0xffcb3d, 0.18, 0.88) : kit.clay(0x7c4824, { rough: 0.54 });
  const sailMat = isGold ? kit.metal(0xffca3a, 0.22, 0.84) : kit.fabric(0xcf2e2e, { rough: 0.72, side: DoubleSide });
  const battenMat = isGold ? kit.metal(0x9a6412, 0.28, 0.8) : kit.clay(0x5c361a, { rough: 0.58 });
  const lanternMat = kit.emissive(0xffbe42, 0.95, 2.3);

  const ship = new Group();
  ship.position.y = 0.08;

  // Sculpted tapered wooden junk hull with elevated curved poop stern
  const hull = mesh(roundedBoxGeo(1.72, 0.32, 0.66, 0.24, 0.05), hullMat, { pos: [0, 0.18, 0] });
  const poopDeck = mesh(roundedBoxGeo(0.62, 0.22, 0.62, 0.12, 0.03), trimMat, { pos: [-0.52, 0.4, 0], rot: [0, 0, -0.14] });
  const bowTip = mesh(new ConeGeometry(0.24, 0.42, 12), trimMat, { pos: [0.92, 0.28, 0], rot: [0, 0, -Math.PI / 2.4] });
  const cabin = mesh(roundedBoxGeo(0.46, 0.24, 0.44, 0.04, 0.015), kit.clay(0x8c4e2a), { pos: [-0.46, 0.58, 0] });
  const lantern = mesh(new SphereGeometry(0.068, 12, 10), lanternMat, { pos: [-0.74, 0.62, 0], scale: [0.9, 1.25, 0.9], cast: false });
  ship.add(hull, poopDeck, bowTip, cabin, lantern);

  // Decorative painted bow eyes (traditional HK fisherman blessing)
  for (const sz of [-1, 1]) {
    ship.add(
      mesh(new SphereGeometry(0.045, 10, 8), kit.gloss(0xffffff), { pos: [0.74, 0.24, sz * 0.24], scale: [1, 1, 0.4] }),
      mesh(new SphereGeometry(0.024, 8, 8), kit.gloss(0x1b1d28), { pos: [0.75, 0.24, sz * 0.26], scale: [1, 1, 0.4] }),
    );
  }

  // Optional Golden Dragon Prow & Gold Ingots for Day 60 Golden Junk!
  if (isGold) {
    const dragonNeck = mesh(tubeGeo([[0.82, 0.3, 0], [1.06, 0.52, 0], [1.14, 0.68, 0]], 0.06, 14, 8), trimMat);
    const dragonHead = mesh(new SphereGeometry(0.1, 14, 10), trimMat, { pos: [1.18, 0.72, 0], scale: [1.35, 0.9, 0.9] });
    ship.add(dragonNeck, dragonHead);
    // Gold sycee ingots mound on deck
    for (let i = 0; i < 4; i++) {
      ship.add(mesh(new SphereGeometry(0.075, 10, 8), trimMat, {
        pos: [0.05 + i * 0.14, 0.41, (i % 2 ? 0.12 : -0.12)],
        scale: [1.3, 0.65, 0.85],
      }));
    }
  }

  // Twin tilted wooden masts + Iconic Curved Ribbed Battened Chinese Junk Sails
  function addJunkSail(mx, h, w, tilt) {
    const sg = new Group();
    sg.position.set(mx, 0.34, 0);
    sg.rotation.z = tilt;
    sg.add(mesh(new CylinderGeometry(0.026, 0.038, h + 0.18, 10), battenMat, { pos: [0, (h + 0.18) * 0.5, 0] }));
    // Curved billowing sail panel made of stacked slightly bowed ribs
    const ribs = 5;
    for (let r = 0; r < ribs; r++) {
      const u = r / (ribs - 1);
      const y = 0.26 + u * (h - 0.34);
      const rw = w * (1 - u * 0.28);
      const bow = Math.sin(u * Math.PI) * 0.09;
      sg.add(
        mesh(roundedBoxGeo(rw, (h - 0.3) / ribs + 0.02, 0.026, 0.015, 0.005), sailMat, { pos: [0.04, y, bow] }),
        mesh(new CylinderGeometry(0.012, 0.012, rw + 0.06, 6), battenMat, { pos: [0.04, y, bow + 0.02], rot: [0, 0, Math.PI / 2] }),
      );
    }
    ship.add(sg);
    return sg;
  }
  const mainSail = addJunkSail(0.08, 1.48, 0.86, 0.06);
  const foreSail = addJunkSail(0.6, 1.06, 0.58, -0.14);
  g.add(ship);

  // Sculpted translucent turquoise harbour wave curls beneath hull
  const waveMat = kit.glass(0x6de4f2, 0.58);
  for (const [wx, wz, sc] of [[-0.65, 0.38, 1], [0.55, -0.36, 0.9], [0.05, 0.44, 0.85]]) {
    g.add(mesh(new TorusGeometry(0.18 * sc, 0.045 * sc, 8, 16, Math.PI), waveMat, {
      pos: [wx, 0.02, wz],
      rot: [0, 0.4, 0],
      cast: false,
    }));
  }

  return {
    group: tagMilestone(g, isGold ? 60 : 13, isGold ? "treasure" : "junk"),
    anim(t) {
      ship.position.y = 0.08 + Math.sin(t * 1.9) * 0.045;
      ship.rotation.z = Math.sin(t * 1.45) * 0.055;
      ship.rotation.x = Math.cos(t * 1.6) * 0.035;
      mainSail.rotation.y = Math.sin(t * 1.6) * 0.05;
      foreSail.rotation.y = Math.sin(t * 1.6 + 0.6) * 0.06;
    },
  };
}

// Day 14: 5/F Grand Rooftop Sky-Garden Pergola, Fairy Lights, Jackie & Floating Golden Halo!
function buildDay14Sprint14(kit) {
  const g = new Group();
  const terrace = kit.clay(0xfff4de, { rough: 0.48 });
  const parapet = kit.clay(0xf08568, { rough: 0.48 });
  const timber = kit.clay(0x9e6336, { rough: 0.56 });
  const ivy = kit.clay(0x34a65a, { rough: 0.52 });
  const gold = kit.metal(0xffcb3c, 0.18, 0.86);
  const fairyGlow = kit.emissive(0xffe77a, 1.0, 2.5);

  // Rooftop Sky-Garden Terrace Floor + Low Parapet Wall
  g.add(
    mesh(roundedBoxGeo(1.94, 0.14, 1.54, 0.08, 0.022), terrace, { pos: [0, 0.07, 0] }),
    mesh(roundedBoxGeo(1.96, 0.18, 0.09, 0.03, 0.01), parapet, { pos: [0, 0.21, -0.72] }),
    mesh(roundedBoxGeo(0.09, 0.18, 1.48, 0.03, 0.01), parapet, { pos: [-0.92, 0.21, 0] }),
    mesh(roundedBoxGeo(0.09, 0.18, 1.48, 0.03, 0.01), parapet, { pos: [0.92, 0.21, 0] }),
  );

  // 4 Timber Pergola Pillars + Overhead Lattice Beams + Trailing Emerald Ivy
  for (const [px, pz] of [[-0.8, -0.6], [0.8, -0.6], [-0.8, 0.56], [0.8, 0.56]]) {
    g.add(mesh(roundedBoxGeo(0.11, 1.24, 0.11, 0.02, 0.008), timber, { pos: [px, 0.72, pz] }));
  }
  for (const pz of [-0.6, 0.56]) {
    g.add(mesh(roundedBoxGeo(1.88, 0.09, 0.11, 0.02, 0.008), timber, { pos: [0, 1.36, pz] }));
  }
  for (let i = -3; i <= 3; i++) {
    g.add(mesh(roundedBoxGeo(0.08, 0.07, 1.38, 0.015, 0.006), timber, { pos: [i * 0.25, 1.42, -0.02] }));
  }
  // Lush sculpted trailing ivy clusters on pergola corners
  for (const [idx, [ix, iy, iz]] of [[-0.82, 1.38, 0.56], [0.82, 1.38, 0.56], [-0.74, 1.22, -0.58], [0.76, 1.26, -0.58], [0, 1.46, -0.58]].entries()) {
    g.add(
      mesh(sculptGeo(new SphereGeometry(0.14, 10, 8), 0.022, 9.2, 140 + idx), ivy, { pos: [ix, iy, iz] }),
      mesh(sculptGeo(new SphereGeometry(0.1, 10, 8), 0.018, 10.4, 150 + idx), kit.clay(0x4fc46e), { pos: [ix + 0.09, iy - 0.08, iz + 0.06] }),
    );
  }

  // Celebratory Golden Arch Crest + Twinkling Fairy-Light Strings
  g.add(mesh(new TorusGeometry(0.56, 0.042, 12, 28, Math.PI), gold, { pos: [0, 1.38, 0.56] }));
  const bulbs = [];
  for (let i = 0; i < 7; i++) {
    const u = i / 6;
    const x = -0.72 + u * 1.44;
    const sag = Math.sin(u * Math.PI) * 0.14;
    const b = mesh(new SphereGeometry(0.044, 10, 8), fairyGlow, { pos: [x, 1.3 - sag, 0.58], cast: false });
    bulbs.push(b);
    g.add(b);
  }

  // Sculpted 3D Jackie Figurine waving joyfully on the rooftop (clear of front posts!)
  const jackieRig = buildHumanFigurine(kit, "jackie", null, { noShadow: true });
  jackieRig.group.position.set(-0.22, 0.14, 0.14);
  jackieRig.group.scale.setScalar(0.68);
  g.add(jackieRig.group);

  // Floating Rotating Golden Halo Monument on right side of terrace
  const haloRig = buildCompanionHat(kit, "halo");
  const haloHolder = new Group();
  haloHolder.position.set(0.38, 0.86, 0.14);
  haloHolder.scale.setScalar(1.15);
  haloHolder.add(haloRig.group);
  g.add(
    mesh(new CylinderGeometry(0.2, 0.24, 0.36, 18), kit.clay(0xfff2d2), { pos: [0.38, 0.32, 0.14] }),
    mesh(new TorusGeometry(0.21, 0.022, 8, 20), gold, { pos: [0.38, 0.5, 0.14], rot: [Math.PI / 2, 0, 0] }),
    haloHolder,
  );

  return {
    group: tagMilestone(g, 14, "sprint14"),
    anim(t, dt, ctx) {
      jackieRig.anim(t, dt, ctx);
      if (haloRig.anim) haloRig.anim(t, dt, ctx);
      bulbs.forEach((b, i) => {
        b.scale.setScalar(0.85 + 0.28 * Math.sin(t * 3.8 + i * 1.1));
      });
    },
  };
}

export function buildSprintMilestone(day, kit) {
  switch (day) {
    case 1: return buildDay1Piggy(kit);
    case 2: return buildDay2Bakery(kit);
    case 3: return buildDay3Kiosk(kit);
    case 4: return buildDay4Floor1(kit);
    case 5: return buildDay5Pantry(kit);
    case 6: return buildDay6Neon(kit);
    case 7: return buildDay7Ferry(kit);
    case 8: return buildDay8Vault(kit);
    case 9: return buildDay9Laundry(kit);
    case 10: return buildDay10Lighthouse(kit);
    case 11: return buildDay11Jack(kit);
    case 12: return buildDay12Loft(kit);
    case 13: return buildDay13Junk(kit);
    case 14: return buildDay14Sprint14(kit);
    default: return null;
  }
}

export { buildDay13Junk };
