// Sculpted 3D clay builders for Post-14 Infinite Mode HK Landmarks + Procedural Saver Floors & Skyline Wings.
// Every builder returns { group, anim(t, dt, ctx) } resting cleanly at y = 0 for BOTH Island & Inspect modes.
import {
  BoxGeometry,
  ConeGeometry,
  CylinderGeometry,
  DoubleSide,
  Group,
  OctahedronGeometry,
  PlaneGeometry,
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
import { buildCompanionHat, buildCrab, buildDay13Junk } from "./models-sprint.js";

// Day 18: Animated Circling 3D Seagulls + Bobbing Brass Harbour Bell Buoy
function buildDay18Gulls(kit, opts = {}) {
  const g = new Group();
  const red = kit.enamel(0xe2473c, { rough: 0.26 });
  const cream = kit.enamel(0xfff6e6, { rough: 0.28 });
  const brass = kit.metal(0xf0be44, 0.2, 0.86);
  const beacon = kit.emissive(0x45f7b4, 1.0, 2.5);

  // Bobbing Victoria Harbour Bell Buoy
  const buoy = new Group();
  buoy.position.y = 0.08;
  buoy.add(
    mesh(new CylinderGeometry(0.36, 0.42, 0.24, 22), red, { pos: [0, 0.14, 0] }),
    mesh(new TorusGeometry(0.4, 0.045, 10, 24), cream, { pos: [0, 0.24, 0], rot: [Math.PI / 2, 0, 0] }),
    // 4-legged brass lattice tower
    mesh(new CylinderGeometry(0.022, 0.026, 0.72, 8), brass, { pos: [0.16, 0.56, 0.16], rot: [-0.22, 0, 0.22] }),
    mesh(new CylinderGeometry(0.022, 0.026, 0.72, 8), brass, { pos: [-0.16, 0.56, 0.16], rot: [-0.22, 0, -0.22] }),
    mesh(new CylinderGeometry(0.022, 0.026, 0.72, 8), brass, { pos: [0.16, 0.56, -0.16], rot: [0.22, 0, 0.22] }),
    mesh(new CylinderGeometry(0.022, 0.026, 0.72, 8), brass, { pos: [-0.16, 0.56, -0.16], rot: [0.22, 0, -0.22] }),
    mesh(new CylinderGeometry(0.14, 0.16, 0.06, 16), red, { pos: [0, 0.9, 0] }),
    mesh(new SphereGeometry(0.08, 12, 10), beacon, { pos: [0, 1.0, 0], cast: false }),
  );
  // Hanging Brass Bell inside lattice
  const bell = mesh(latheGeo([[0, 0], [0.13, 0], [0.11, 0.08], [0.08, 0.19], [0.03, 0.24], [0, 0.24]], 18), brass, {
    pos: [0, 0.56, 0],
  });
  buoy.add(bell);
  g.add(buoy);

  // 3 Sculpted Articulated 3D Seagulls circling smoothly!
  const gullWhite = kit.clay(0xfdfbf6, { rough: 0.44 });
  const gullSlate = kit.clay(0x5a687a, { rough: 0.48 });
  const beakMat = kit.clay(0xffa62e, { rough: 0.4 });
  const orbitRadius = opts.island ? 2.6 : 0.74;
  const orbitHeight = opts.island ? 3.2 : 1.38;
  const gulls = [];

  for (let i = 0; i < 3; i++) {
    const bird = new Group();
    bird.add(
      mesh(new SphereGeometry(0.085, 14, 10), gullWhite, { scale: [0.82, 0.76, 1.55] }),
      mesh(new SphereGeometry(0.058, 12, 10), gullWhite, { pos: [0, 0.035, 0.12] }),
      mesh(new ConeGeometry(0.024, 0.085, 8), beakMat, { pos: [0, 0.025, 0.195], rot: [Math.PI / 2, 0, 0] }),
      mesh(roundedBoxGeo(0.09, 0.018, 0.09, 0.01, 0.004), gullSlate, { pos: [0, 0.01, -0.14] }),
    );
    const wingL = new Group();
    wingL.position.set(-0.06, 0.02, 0.02);
    wingL.add(
      mesh(roundedBoxGeo(0.22, 0.024, 0.09, 0.014, 0.005), gullWhite, { pos: [-0.11, 0, 0] }),
      mesh(roundedBoxGeo(0.14, 0.02, 0.075, 0.01, 0.004), gullSlate, { pos: [-0.26, -0.015, -0.01], rot: [0, 0.15, -0.18] }),
    );
    const wingR = new Group();
    wingR.position.set(0.06, 0.02, 0.02);
    wingR.add(
      mesh(roundedBoxGeo(0.22, 0.024, 0.09, 0.014, 0.005), gullWhite, { pos: [0.11, 0, 0] }),
      mesh(roundedBoxGeo(0.14, 0.02, 0.075, 0.01, 0.004), gullSlate, { pos: [0.26, -0.015, -0.01], rot: [0, -0.15, 0.18] }),
    );
    bird.add(wingL, wingR);
    if (opts.island) bird.userData.ignoreBounds = true;
    g.add(bird);
    gulls.push({ bird, wingL, wingR, phase: (i * Math.PI * 2) / 3, yOff: (i - 1) * 0.18 });
  }

  return {
    group: tagMilestone(g, 18, "gulls"),
    anim(t) {
      buoy.position.y = 0.08 + Math.sin(t * 2.2) * 0.05;
      buoy.rotation.z = Math.sin(t * 1.7) * 0.1;
      bell.rotation.z = -Math.sin(t * 1.7) * 0.24;
      for (const gl of gulls) {
        const a = t * 0.65 + gl.phase;
        gl.bird.position.set(
          Math.cos(a) * orbitRadius,
          orbitHeight + gl.yOff + Math.sin(t * 2.4 + gl.phase) * 0.1,
          Math.sin(a) * orbitRadius,
        );
        gl.bird.rotation.y = -a;
        gl.bird.rotation.z = 0.18;
        const flap = Math.sin(t * 6.5 + gl.phase * 2) * 0.42;
        gl.wingL.rotation.z = flap;
        gl.wingR.rotation.z = -flap;
      }
    },
  };
}

// Day 21: Twilight Illuminated Skyline Spire + Sweeping Upward Neon Beams
function buildDay21Twilight(kit) {
  const g = new Group();
  const navy = kit.clay(0x283566, { rough: 0.4 });
  const teal = kit.metal(0x28a4aa, 0.28, 0.72);
  const gold = kit.metal(0xf5c84c, 0.22, 0.84);
  const winCyan = kit.emissive(0x4bf8e8, 0.85, 2.3);
  const winGold = kit.emissive(0xffe068, 0.85, 2.3);
  const beamCyan = kit.emissive(0x4cf7ea, 0.55, 1.5, { transparent: true, opacity: 0.2, depthWrite: false, side: DoubleSide });
  const beamGold = kit.emissive(0xffe16e, 0.55, 1.5, { transparent: true, opacity: 0.2, depthWrite: false, side: DoubleSide });

  // Tiered Hong Kong Harbour Art-Deco Skyline Spire
  g.add(
    mesh(roundedBoxGeo(1.06, 0.22, 0.9, 0.06, 0.02), kit.clay(0x3a4878), { pos: [0, 0.11, 0] }),
    mesh(roundedBoxGeo(0.84, 1.15, 0.72, 0.05, 0.02), navy, { pos: [0, 0.78, 0] }),
    mesh(roundedBoxGeo(0.62, 0.85, 0.54, 0.05, 0.018), navy, { pos: [0, 1.72, 0] }),
    mesh(roundedBoxGeo(0.4, 0.48, 0.36, 0.04, 0.014), teal, { pos: [0, 2.34, 0] }),
    // Crown pyramid & glowing neon antenna spire
    mesh(new ConeGeometry(0.24, 0.46, 4), gold, { pos: [0, 2.8, 0], rot: [0, Math.PI / 4, 0] }),
    mesh(new CylinderGeometry(0.016, 0.032, 0.55, 10), gold, { pos: [0, 3.24, 0] }),
    mesh(new SphereGeometry(0.065, 12, 10), winGold, { pos: [0, 3.52, 0], cast: false }),
  );

  // Luminous horizontal & vertical neon window bands around all 4 sides
  for (let i = 0; i < 4; i++) {
    const y = 0.42 + i * 0.24;
    g.add(mesh(roundedBoxGeo(0.87, 0.055, 0.75, 0.02, 0.005), i % 2 ? winGold : winCyan, { pos: [0, y, 0], cast: false }));
  }
  for (let i = 0; i < 3; i++) {
    const y = 1.48 + i * 0.24;
    g.add(mesh(roundedBoxGeo(0.65, 0.05, 0.57, 0.02, 0.005), i % 2 ? winCyan : winGold, { pos: [0, y, 0], cast: false }));
  }

  // Sweeping Upward Twilight Spotlight Beams (excluded from inspect Box3 bounds!)
  const beam1 = mesh(new ConeGeometry(0.55, 2.4, 16, 1, true), beamCyan, {
    pos: [-0.24, 3.2, 0],
    rot: [0, 0, Math.PI + 0.24],
    cast: false,
    recv: false,
  });
  const beam2 = mesh(new ConeGeometry(0.55, 2.4, 16, 1, true), beamGold, {
    pos: [0.24, 3.2, 0],
    rot: [0, 0, Math.PI - 0.24],
    cast: false,
    recv: false,
  });
  beam1.userData.ignoreBounds = true;
  beam2.userData.ignoreBounds = true;
  g.add(beam1, beam2);

  addContactShadow(g, 0.68, 0.6, 0.008, 0.36, kit);
  return {
    group: tagMilestone(g, 21, "twilight"),
    anim(t) {
      beam1.rotation.z = Math.PI + 0.26 + Math.sin(t * 0.9) * 0.16;
      beam2.rotation.z = Math.PI - 0.26 + Math.cos(t * 0.85) * 0.16;
    },
  };
}

// Day 25: Striped Dai Pai Dong Parasol Tea Deck with Stools & HK Iced Lemon Tea (凍檸茶)
function buildDay25Umbrella(kit) {
  const g = new Group();
  const wood = kit.textured("woodPlank", { finish: "lacquer", rough: 0.44 });
  const poleMat = kit.clay(0x8e5932, { rough: 0.5 });
  const brass = kit.metal(0xf0be44, 0.22, 0.84);
  const canopyMat = kit.textured("stripeCoral", { finish: "fabric", rough: 0.7, side: DoubleSide });
  const marble = kit.gloss(0xfffdf6, { rough: 0.16 });
  const iron = kit.metal(0x3a404f, 0.36, 0.76);

  // Wooden tea deck platform
  g.add(mesh(new CylinderGeometry(0.82, 0.86, 0.1, 24), wood, { pos: [0, 0.05, 0] }));

  // Round marble-top Dai Pai Dong table + central umbrella pole + scalloped striped canopy
  g.add(
    mesh(new CylinderGeometry(0.16, 0.22, 0.06, 16), iron, { pos: [0, 0.12, 0] }),
    mesh(new CylinderGeometry(0.04, 0.04, 0.54, 12), iron, { pos: [0, 0.4, 0] }),
    mesh(new CylinderGeometry(0.46, 0.46, 0.05, 24), marble, { pos: [0, 0.68, 0] }),
    mesh(new TorusGeometry(0.46, 0.02, 8, 28), brass, { pos: [0, 0.68, 0], rot: [Math.PI / 2, 0, 0] }),
    // Umbrella shaft & scalloped octagonal striped canopy
    mesh(new CylinderGeometry(0.03, 0.034, 1.54, 12), poleMat, { pos: [0, 0.96, 0] }),
    mesh(new ConeGeometry(0.92, 0.36, 8), canopyMat, { pos: [0, 1.66, 0] }),
    mesh(new SphereGeometry(0.065, 12, 10), brass, { pos: [0, 1.86, 0] }),
  );

  // 3 Classic colourful HK street-stall clay stools around the table
  const stoolCols = [0x1b967c, 0xf2684b, 0xffc83d];
  stoolCols.forEach((col, i) => {
    const a = (i * Math.PI * 2) / 3 + 0.4;
    const sx = Math.cos(a) * 0.56, sz = Math.sin(a) * 0.56;
    const sg = new Group();
    sg.position.set(sx, 0.1, sz);
    sg.add(
      mesh(new CylinderGeometry(0.145, 0.135, 0.05, 16), kit.gloss(col, { rough: 0.32 }), { pos: [0, 0.34, 0] }),
      mesh(new CylinderGeometry(0.018, 0.02, 0.34, 8), iron, { pos: [-0.07, 0.17, -0.07], rot: [0.1, 0, -0.1] }),
      mesh(new CylinderGeometry(0.018, 0.02, 0.34, 8), iron, { pos: [0.07, 0.17, -0.07], rot: [0.1, 0, 0.1] }),
      mesh(new CylinderGeometry(0.018, 0.02, 0.34, 8), iron, { pos: [-0.07, 0.17, 0.07], rot: [-0.1, 0, -0.1] }),
      mesh(new CylinderGeometry(0.018, 0.02, 0.34, 8), iron, { pos: [0.07, 0.17, 0.07], rot: [-0.1, 0, 0.1] }),
    );
    g.add(sg);
  });

  // Two detailed tall glasses of HK Iced Lemon Tea (凍檸茶) on the table!
  const teaGlass = kit.glass(0xffe8cc, 0.45);
  const amberTea = kit.gloss(0xc96c1e, { rough: 0.18 });
  const lemon = kit.clay(0xffe142, { rough: 0.38 });
  for (const [gx, gz, sc] of [[0.2, 0.14, 1], [-0.18, 0.2, 0.94]]) {
    const gl = new Group();
    gl.position.set(gx, 0.71, gz);
    gl.scale.setScalar(sc);
    gl.add(
      mesh(new CylinderGeometry(0.068, 0.052, 0.19, 14), teaGlass, { pos: [0, 0.095, 0], cast: false }),
      mesh(new CylinderGeometry(0.058, 0.044, 0.145, 14), amberTea, { pos: [0, 0.08, 0] }),
      mesh(new CylinderGeometry(0.048, 0.048, 0.014, 12), lemon, { pos: [0.01, 0.135, 0.01], rot: [0.4, 0.2, 0.3] }),
      mesh(new CylinderGeometry(0.009, 0.009, 0.25, 6), kit.clay(0xff5252), { pos: [0.02, 0.14, -0.01], rot: [0.1, 0, -0.22] }),
    );
    g.add(gl);
  }

  addContactShadow(g, 0.88, 0.88, 0.008, 0.34, kit);
  return {
    group: tagMilestone(g, 25, "umbrella"),
    anim(t) {
      g.children[5].rotation.y = Math.sin(t * 0.9) * 0.04;
    },
  };
}

// Day 30: Iconic HK Double-Deck Green Ding-Ding Tram (叮叮電車) + Braided 3D Straw Hat
function buildDay30Tram(kit, opts = {}) {
  const g = new Group();
  const tramGreen = kit.enamel(0x166d3e, { rough: 0.22 });
  const tramCream = kit.enamel(0xfff5de, { rough: 0.24 });
  const roofDark = kit.clay(0x2d3540, { rough: 0.5 });
  const brass = kit.metal(0xf0be44, 0.2, 0.86);
  const iron = kit.metal(0x464e5c, 0.34, 0.8);
  const winGlow = kit.emissive(0xffe594, 0.65, 1.9);
  const headlamp = kit.emissive(0xfff5be, 1.0, 2.6);
  const signMat = kit.textured("tramSign", { finish: "glaze", rough: 0.22 });

  // Steel tram rails & timber sleepers
  for (const sz of [-0.26, 0.26]) {
    g.add(mesh(new BoxGeometry(1.96, 0.035, 0.04), iron, { pos: [0, 0.04, sz] }));
  }
  for (let i = -4; i <= 4; i++) {
    g.add(mesh(new BoxGeometry(0.08, 0.03, 0.72), kit.clay(0x7d5536), { pos: [i * 0.22, 0.018, 0] }));
  }

  // Tram Bogie & 4 steel wheels
  const tram = new Group();
  tram.position.y = 0.06;
  for (const [wx, wz] of [[-0.46, -0.26], [-0.46, 0.26], [0.46, -0.26], [0.46, 0.26]]) {
    tram.add(mesh(new CylinderGeometry(0.11, 0.11, 0.05, 16), iron, { pos: [wx, 0.11, wz], rot: [Math.PI / 2, 0, 0] }));
  }

  // Double-deck iconic tall narrow Hong Kong Tram body!
  tram.add(
    // Lower chassis & green lower deck
    mesh(roundedBoxGeo(1.56, 0.54, 0.66, 0.08, 0.025), tramGreen, { pos: [0, 0.45, 0] }),
    // Classic mid-deck cream advertising / destination band
    mesh(roundedBoxGeo(1.6, 0.24, 0.69, 0.06, 0.016), tramCream, { pos: [0, 0.82, 0] }),
    // Upper deck green walls & rounded roof overhang
    mesh(roundedBoxGeo(1.56, 0.48, 0.66, 0.08, 0.024), tramGreen, { pos: [0, 1.16, 0] }),
    mesh(roundedBoxGeo(1.64, 0.11, 0.72, 0.1, 0.028), roofDark, { pos: [0, 1.44, 0] }),
    // Side route boards (both sides!)
    mesh(new PlaneGeometry(1.22, 0.2), signMat, { pos: [0, 0.82, 0.35], cast: false }),
    mesh(new PlaneGeometry(1.22, 0.2), signMat, { pos: [0, 0.82, -0.35], rot: [0, Math.PI, 0], cast: false }),
  );

  // Warm glowing passenger windows along BOTH decks on BOTH sides + front & back cab windows!
  for (let i = -2; i <= 2; i++) {
    for (const sz of [-1, 1]) {
      tram.add(
        mesh(roundedBoxGeo(0.22, 0.24, 0.03, 0.025, 0.005), winGlow, { pos: [i * 0.27, 0.52, sz * 0.33], cast: false }),
        mesh(roundedBoxGeo(0.22, 0.24, 0.03, 0.025, 0.005), winGlow, { pos: [i * 0.27, 1.18, sz * 0.33], cast: false }),
      );
    }
  }
  for (const sx of [-1, 1]) {
    tram.add(
      mesh(roundedBoxGeo(0.03, 0.24, 0.44, 0.03, 0.006), winGlow, { pos: [sx * 0.78, 0.54, 0], cast: false }),
      mesh(roundedBoxGeo(0.03, 0.24, 0.44, 0.03, 0.006), winGlow, { pos: [sx * 0.78, 1.18, 0], cast: false }),
      // Vintage front/rear brass headlamp + curved iron bumper
      mesh(new CylinderGeometry(0.06, 0.065, 0.06, 14), brass, { pos: [sx * 0.8, 0.32, 0], rot: [0, 0, Math.PI / 2] }),
      mesh(new SphereGeometry(0.048, 10, 8), headlamp, { pos: [sx * 0.82, 0.32, 0], cast: false }),
      mesh(roundedBoxGeo(0.12, 0.07, 0.56, 0.03, 0.01), iron, { pos: [sx * 0.81, 0.19, 0] }),
    );
  }

  // Signature roof trolley pole / pantograph mast!
  tram.add(
    mesh(new CylinderGeometry(0.04, 0.055, 0.12, 12), brass, { pos: [0, 1.54, 0] }),
    mesh(new CylinderGeometry(0.014, 0.018, 0.62, 8), iron, { pos: [-0.18, 1.76, 0], rot: [0, 0, 0.68] }),
    mesh(new CylinderGeometry(0.025, 0.025, 0.16, 8), brass, { pos: [-0.39, 1.98, 0], rot: [Math.PI / 2, 0, 0] }),
  );
  g.add(tram);

  // In solo inspect mode, display the matching Braided Straw Sun Hat proudly perched on the tram roof front!
  if (!opts.island) {
    const hatRig = buildCompanionHat(kit, "straw");
    hatRig.group.position.set(0.42, 1.54, 0);
    hatRig.group.scale.setScalar(0.86);
    hatRig.group.rotation.z = -0.14;
    tram.add(hatRig.group);
  }

  addContactShadow(g, 1.05, 0.5, 0.008, 0.34, kit);
  return {
    group: tagMilestone(g, 30, "tram"),
    anim(t) {
      tram.position.x = Math.sin(t * 1.1) * 0.12;
      tram.position.y = 0.06 + Math.abs(Math.sin(t * 4.4)) * 0.008;
    },
  };
}

// Day 35: Swaying Red-and-Gold Festive Clay Lanterns on Curved Catenary Arch
function buildDay35Lanterns(kit) {
  const g = new Group();
  const timber = kit.clay(0x7c3e26, { rough: 0.52 });
  const brass = kit.metal(0xf0be44, 0.22, 0.84);
  const silkGlow = kit.emissive(0xff4c38, 0.8, 2.25);
  const tasselMat = kit.clay(0xffcf4a, { rough: 0.45 });

  // Twin ceremonial vermilion-timber lantern posts with brass footings & finials
  for (const sx of [-0.95, 0.95]) {
    g.add(
      mesh(new CylinderGeometry(0.1, 0.13, 0.14, 14), kit.clay(0xd8d0c4), { pos: [sx, 0.07, 0] }),
      mesh(new CylinderGeometry(0.052, 0.06, 1.62, 14), timber, { pos: [sx, 0.92, 0] }),
      mesh(new SphereGeometry(0.08, 12, 10), brass, { pos: [sx, 1.76, 0] }),
      mesh(roundedBoxGeo(0.24, 0.06, 0.12, 0.02, 0.008), timber, { pos: [sx, 1.64, 0] }),
    );
  }

  // Graceful catenary cord strung between the two posts
  const cordPts = [];
  for (let i = 0; i <= 16; i++) {
    const u = i / 16;
    const x = -0.95 + u * 1.9;
    const y = 1.64 - Math.sin(u * Math.PI) * 0.28;
    cordPts.push([x, y, 0]);
  }
  g.add(mesh(tubeGeo(cordPts, 0.018, 22, 8), brass));

  // 5 Sculpted Ribbed Festive Lanterns with Swaying Tassels!
  const lanterns = [];
  const lanternGeo = latheGeo([
    [0, -0.15], [0.06, -0.15], [0.13, -0.09], [0.155, 0], [0.13, 0.09], [0.06, 0.15], [0, 0.15],
  ], 18);
  for (let i = 0; i < 5; i++) {
    const u = (i + 1) / 6;
    const x = -0.95 + u * 1.9;
    const y = 1.64 - Math.sin(u * Math.PI) * 0.28;
    const pivot = new Group();
    pivot.position.set(x, y, 0);
    pivot.add(
      mesh(new CylinderGeometry(0.008, 0.008, 0.16, 6), brass, { pos: [0, -0.08, 0] }),
      mesh(new CylinderGeometry(0.072, 0.072, 0.036, 14), brass, { pos: [0, -0.17, 0] }),
      mesh(lanternGeo, silkGlow, { pos: [0, -0.32, 0], cast: false }),
      mesh(new CylinderGeometry(0.072, 0.072, 0.036, 14), brass, { pos: [0, -0.47, 0] }),
      mesh(new CylinderGeometry(0.022, 0.034, 0.16, 8), tasselMat, { pos: [0, -0.57, 0] }),
    );
    g.add(pivot);
    lanterns.push({ pivot, phase: i * 0.9 });
  }

  addContactShadow(g, 1.05, 0.34, 0.008, 0.3, kit);
  return {
    group: tagMilestone(g, 35, "lanterns"),
    anim(t) {
      for (const l of lanterns) {
        l.pivot.rotation.z = Math.sin(t * 2.1 + l.phase) * 0.14;
        l.pivot.rotation.x = Math.cos(t * 1.6 + l.phase) * 0.08;
      }
    },
  };
}

// Day 45: Iconic Red-Brick & Granite TST Harbour Clock Tower (尖沙咀鐘樓)
function buildDay45Clock(kit) {
  const g = new Group();
  const granite = kit.textured("stoneWall", { rough: 0.62 });
  const brick = kit.textured("brick", { rough: 0.56 });
  const creamStone = kit.clay(0xf2e8d6, { rough: 0.48 });
  const copper = kit.metal(0x4ba892, 0.28, 0.55);
  const brass = kit.metal(0xf0be44, 0.2, 0.86);
  const clockMat = kit.textured("clockFace", { finish: "glaze", rough: 0.2, emissive: true, baseEmissive: 0.25, nightEmissive: 1.05 });

  // Stepped granite plinth base + grand arched doorway
  g.add(
    mesh(roundedBoxGeo(1.06, 0.24, 1.06, 0.05, 0.02), granite, { pos: [0, 0.12, 0] }),
    mesh(roundedBoxGeo(0.92, 0.44, 0.92, 0.04, 0.018), granite, { pos: [0, 0.44, 0] }),
    mesh(roundedBoxGeo(0.32, 0.38, 0.08, 0.1, 0.014), kit.clay(0x5c3620), { pos: [0, 0.42, 0.46] }),
    mesh(roundedBoxGeo(0.98, 0.1, 0.98, 0.04, 0.015), creamStone, { pos: [0, 0.68, 0] }),
  );

  // Tall Red-Brick Shaft with Cream Limestone Corner Quoins & Arched Windows
  g.add(mesh(roundedBoxGeo(0.76, 1.44, 0.76, 0.03, 0.014), brick, { pos: [0, 1.44, 0] }));
  for (const [cx, cz] of [[-0.36, -0.36], [0.36, -0.36], [-0.36, 0.36], [0.36, 0.36]]) {
    g.add(mesh(roundedBoxGeo(0.11, 1.44, 0.11, 0.02, 0.008), creamStone, { pos: [cx, 1.44, cz] }));
  }
  const winGlow = kit.emissive(0xffe194, 0.45, 1.6);
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2;
    const wg = new Group();
    wg.rotation.y = a;
    wg.add(mesh(roundedBoxGeo(0.18, 0.32, 0.04, 0.07, 0.008), winGlow, { pos: [0, 1.42, 0.385], cast: false }));
    g.add(wg);
  }

  // Grand 4-Sided Clock Belfry with 4 Crisp Roman-Numeral Clock Faces!
  g.add(
    mesh(roundedBoxGeo(0.9, 0.1, 0.9, 0.04, 0.014), creamStone, { pos: [0, 2.2, 0] }),
    mesh(roundedBoxGeo(0.82, 0.66, 0.82, 0.04, 0.016), creamStone, { pos: [0, 2.58, 0] }),
    mesh(roundedBoxGeo(0.92, 0.1, 0.92, 0.04, 0.016), creamStone, { pos: [0, 2.94, 0] }),
  );
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2;
    const cf = new Group();
    cf.rotation.y = a;
    cf.add(
      mesh(new TorusGeometry(0.25, 0.028, 10, 24), brass, { pos: [0, 2.58, 0.415] }),
      mesh(new CylinderGeometry(0.24, 0.24, 0.02, 24), [brass, clockMat, clockMat], {
        pos: [0, 2.58, 0.412],
        rot: [Math.PI / 2, 0, 0],
        cast: false,
      }),
    );
    g.add(cf);
  }

  // Classical Colonnade Belfry Lantern + Oxidized Verdigris Copper Dome & Brass Spire
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI * 2) / 8;
    g.add(mesh(new CylinderGeometry(0.032, 0.036, 0.36, 10), creamStone, { pos: [Math.cos(a) * 0.28, 3.16, Math.sin(a) * 0.28] }));
  }
  g.add(
    mesh(new CylinderGeometry(0.32, 0.34, 0.08, 16), creamStone, { pos: [0, 3.36, 0] }),
    mesh(new SphereGeometry(0.31, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.55), copper, { pos: [0, 3.4, 0] }),
    mesh(new CylinderGeometry(0.018, 0.042, 0.46, 10), brass, { pos: [0, 3.86, 0] }),
    mesh(new SphereGeometry(0.055, 10, 8), brass, { pos: [0, 3.74, 0] }),
  );

  addContactShadow(g, 0.72, 0.72, 0.008, 0.36, kit);
  return {
    group: tagMilestone(g, 45, "clock"),
    anim: null,
  };
}

// Day 60: Ornate Golden Dragon-Sail Junk (招財寶船)
function buildDay60Treasure(kit) {
  return buildDay13Junk(kit, { golden: true });
}

// Day 75: Sculpted Lion Rock Ridge (獅子山) & Traditional Hexagonal Pavilion
function buildDay75LionRock(kit) {
  const g = new Group();
  const lush = kit.clay(0x3ba864, { rough: 0.56 });
  const pine = kit.clay(0x28844c, { rough: 0.56 });
  const granite = kit.clay(0xb8aea0, { rough: 0.62 });
  const vermilion = kit.clay(0xd94238, { rough: 0.46 });
  const roofTile = kit.clay(0xd96b38, { rough: 0.48 });
  const gold = kit.metal(0xf0be44, 0.24, 0.84);

  // Iconic crouching-lion sculpted mountain ridge silhouette!
  g.add(
    // Broad lush base
    mesh(sculptGeo(new SphereGeometry(1.12, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.55), 0.075, 2.2, 71, { flatBottom: true }), lush, { pos: [0, 0, 0], scale: [1.35, 0.85, 0.92] }),
    // Steep granite lion-head crag on left-center
    mesh(sculptGeo(new SphereGeometry(0.68, 18, 14), 0.065, 3.1, 72), granite, { pos: [-0.36, 0.72, 0.04], scale: [1.05, 1.15, 0.85] }),
    // Sloping mane & crouched back toward right
    mesh(sculptGeo(new SphereGeometry(0.74, 18, 14), 0.06, 2.8, 73), lush, { pos: [0.34, 0.56, -0.04], scale: [1.28, 0.85, 0.88] }),
    mesh(sculptGeo(new SphereGeometry(0.48, 14, 12), 0.05, 3.4, 74), granite, { pos: [-0.74, 0.48, 0.12], scale: [1.1, 0.78, 0.8] }),
  );

  // Miniature hiking trail steps climbing up the ridge + terraced pine clusters
  for (let i = 0; i < 6; i++) {
    g.add(mesh(roundedBoxGeo(0.22, 0.05, 0.14, 0.02, 0.006), kit.clay(0xe5ddd0), {
      pos: [0.82 - i * 0.14, 0.14 + i * 0.16, 0.54 - i * 0.06],
      rot: [0, -0.35 + (i % 2 ? 0.04 : -0.03), 0],
    }));
  }
  const trees = [[-0.95, 0.34, 0.42], [0.95, 0.36, 0.28], [0.58, 0.76, -0.45], [-0.12, 0.68, 0.56], [0.22, 0.86, 0.38]];
  trees.forEach(([tx, ty, tz], idx) => {
    g.add(
      mesh(new CylinderGeometry(0.025, 0.035, 0.18, 6), kit.clay(0x7c4e2a), { pos: [tx, ty, tz] }),
      mesh(sculptGeo(new ConeGeometry(0.14, 0.28, 8), 0.018, 5.2, 80 + idx), idx % 2 ? pine : lush, { pos: [tx, ty + 0.18, tz] }),
    );
  });

  // Traditional Hexagonal Chinese Summit Pavilion (獅子山涼亭)
  const pav = new Group();
  pav.position.set(-0.34, 1.38, 0.04);
  pav.add(
    mesh(new CylinderGeometry(0.38, 0.42, 0.1, 6), kit.clay(0xe5ddd0), { pos: [0, 0.05, 0] }),
    // Double-tier hexagonal tiled eaves roof
    mesh(new ConeGeometry(0.5, 0.24, 6), roofTile, { pos: [0, 0.52, 0] }),
    mesh(new ConeGeometry(0.32, 0.22, 6), roofTile, { pos: [0, 0.72, 0] }),
    mesh(new SphereGeometry(0.055, 10, 8), gold, { pos: [0, 0.86, 0] }),
    mesh(new SphereGeometry(0.075, 10, 8), kit.emissive(0xffd258, 0.7, 1.8), { pos: [0, 0.34, 0], cast: false }),
  );
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI * 2) / 6;
    pav.add(mesh(new CylinderGeometry(0.024, 0.026, 0.36, 8), vermilion, { pos: [Math.cos(a) * 0.28, 0.26, Math.sin(a) * 0.28] }));
  }
  g.add(pav);

  addContactShadow(g, 1.38, 0.96, 0.008, 0.36, kit);
  return {
    group: tagMilestone(g, 75, "lionrock"),
    anim: null,
  };
}

// Day 90: Iconic Bowl-Shaped Peak Sky Terrace (山頂凌霄閣) + Mini Red Peak Tram
function buildDay90PeakTram(kit) {
  const g = new Group();
  const hill = kit.clay(0x369a5c, { rough: 0.56 });
  const pearl = kit.enamel(0xfff7ea, { rough: 0.24 });
  const teal = kit.enamel(0x168d85, { rough: 0.26 });
  const glass = kit.emissive(0x7beeff, 0.55, 1.75);
  const crimson = kit.enamel(0xd9322c, { rough: 0.22 });
  const brass = kit.metal(0xf0be44, 0.2, 0.86);

  // Lush Peak hillside base
  g.add(
    mesh(sculptGeo(new CylinderGeometry(0.84, 1.18, 0.68, 24, 3), 0.06, 2.4, 90, { flatBottom: true }), hill, { pos: [0, 0.34, 0] }),
    mesh(sculptGeo(new SphereGeometry(0.24, 12, 10), 0.026, 4.4, 91), kit.clay(0x4cb86e), { pos: [-0.74, 0.52, 0.48] }),
    mesh(sculptGeo(new SphereGeometry(0.22, 12, 10), 0.024, 4.6, 92), kit.clay(0x2d844c), { pos: [0.78, 0.46, -0.44] }),
  );

  // Iconic Cantilevered Wok / Bowl-Shaped Peak Tower!
  g.add(
    // Supporting podium base
    mesh(roundedBoxGeo(1.02, 0.42, 0.66, 0.06, 0.02), pearl, { pos: [0, 0.86, 0] }),
    mesh(roundedBoxGeo(0.88, 0.28, 0.69, 0.04, 0.01), glass, { pos: [0, 0.88, 0], cast: false }),
    // Signature sweeping upward-curved bowl roof (sculpted tiered sweeping slabs)
    mesh(roundedBoxGeo(1.42, 0.16, 0.72, 0.08, 0.025), pearl, { pos: [0, 1.14, 0] }),
    mesh(roundedBoxGeo(1.74, 0.16, 0.76, 0.12, 0.028), teal, { pos: [0, 1.3, 0] }),
    mesh(roundedBoxGeo(1.94, 0.12, 0.82, 0.14, 0.026), pearl, { pos: [0, 1.44, 0] }),
    // Glowing panoramic observation windows around the bowl
    mesh(roundedBoxGeo(1.66, 0.1, 0.79, 0.04, 0.01), glass, { pos: [0, 1.3, 0], cast: false }),
  );
  // Rooftop Sky-Terrace viewing rail & two miniature brass sightseeing telescopes!
  for (const sx of [-0.52, 0.52]) {
    g.add(
      mesh(new CylinderGeometry(0.018, 0.026, 0.18, 8), brass, { pos: [sx, 1.58, 0.28] }),
      mesh(new CylinderGeometry(0.026, 0.02, 0.14, 10), brass, { pos: [sx, 1.67, 0.3], rot: [Math.PI / 2 - 0.15, 0, 0] }),
    );
  }

  // Inclined Track & Miniature Red Peak Tram Carriage gliding up & down!
  const track = mesh(roundedBoxGeo(0.28, 0.05, 1.24, 0.02, 0.008), kit.clay(0x525866), {
    pos: [0.84, 0.42, 0.42],
    rot: [-0.52, 0.22, 0],
  });
  const tramCar = new Group();
  tramCar.add(
    mesh(roundedBoxGeo(0.24, 0.2, 0.46, 0.04, 0.012), crimson, { pos: [0, 0.12, 0] }),
    mesh(roundedBoxGeo(0.25, 0.09, 0.36, 0.02, 0.006), kit.emissive(0xffe896, 0.7, 1.8), { pos: [0, 0.14, 0], cast: false }),
    mesh(roundedBoxGeo(0.25, 0.04, 0.48, 0.02, 0.006), pearl, { pos: [0, 0.23, 0] }),
  );
  tramCar.rotation.set(-0.52, 0.22, 0);
  g.add(track, tramCar);

  addContactShadow(g, 1.18, 1.02, 0.008, 0.36, kit);
  return {
    group: tagMilestone(g, 90, "peaktram"),
    anim(t) {
      const u = Math.sin(t * 0.9) * 0.28;
      tramCar.position.set(0.84 + u * 0.18, 0.45 - u * 0.5, 0.42 + u * 0.85);
    },
  };
}

// Day 100: Monumental Golden Crab Trophy Statue on Marble-Brass Plinth + Top Hat!
function buildDay100Centennial(kit) {
  const g = new Group();
  const marble = kit.gloss(0xfffaf0, { rough: 0.16 });
  const brass = kit.metal(0xf5c43d, 0.18, 0.88);
  const plaque = kit.textured("trophy100", { finish: "metal", rough: 0.2 });
  const sparkleMat = kit.emissive(0xffe778, 1.0, 2.4);

  // Grand stepped octagonal marble & brushed-brass pedestal
  g.add(
    mesh(new CylinderGeometry(0.76, 0.84, 0.16, 8), marble, { pos: [0, 0.08, 0] }),
    mesh(new CylinderGeometry(0.62, 0.68, 0.52, 8), marble, { pos: [0, 0.42, 0] }),
    mesh(new CylinderGeometry(0.68, 0.64, 0.1, 8), brass, { pos: [0, 0.72, 0] }),
    mesh(new TorusGeometry(0.64, 0.028, 10, 28), brass, { pos: [0, 0.18, 0], rot: [Math.PI / 2, 0, 0] }),
    // Embossed "100 DAYS" Gold Plaque on front face
    mesh(roundedBoxGeo(0.56, 0.24, 0.05, 0.03, 0.01), brass, { pos: [0, 0.42, 0.62] }),
    mesh(new PlaneGeometry(0.5, 0.19), plaque, { pos: [0, 0.42, 0.648], cast: false }),
  );

  // Solid-Gold Heroic 3D Crab Monument wearing Royal Top Hat!
  const statueRig = buildCrab(kit, "tophat", { golden: true, noShadow: true });
  statueRig.group.position.set(0, 0.78, 0);
  statueRig.group.scale.setScalar(0.86);
  g.add(statueRig.group);

  // Orbiting celebratory golden diamond sparkles
  const stars = [];
  for (let i = 0; i < 4; i++) {
    const st = mesh(new OctahedronGeometry(0.065, 0), sparkleMat, { cast: false });
    g.add(st);
    stars.push({ m: st, phase: (i * Math.PI) / 2 });
  }

  addContactShadow(g, 0.88, 0.88, 0.008, 0.36, kit);
  return {
    group: tagMilestone(g, 100, "centennial"),
    anim(t, dt, ctx) {
      statueRig.anim(t, dt, { mood: "proud" });
      for (const s of stars) {
        const a = t * 1.15 + s.phase;
        s.m.position.set(Math.cos(a) * 0.82, 1.38 + Math.sin(t * 3 + s.phase) * 0.16, Math.sin(a) * 0.82);
        s.m.rotation.y = t * 2.5;
      }
    },
  };
}

// Day 15+ Procedural Extra Saver Story Floor (brick_N)
export function buildSaverFloor(day, kit) {
  const g = new Group();
  const hues = [0xfff2cc, 0xdff5e8, 0xffe4d6, 0xe2eeff, 0xf2e6ff];
  const trims = [0x14968b, 0xe86c48, 0x3b72c4, 0x8e5bc4, 0xd49622];
  const idx = Math.max(0, day - 15) % hues.length;
  const wall = kit.clay(hues[idx], { rough: 0.5 });
  const trim = kit.clay(trims[idx], { rough: 0.46 });
  const winGlow = kit.emissive(0xffe596, 0.65, 1.9);

  g.add(
    mesh(roundedBoxGeo(1.74, 0.94, 1.34, 0.06, 0.022), wall, { pos: [0, 0.48, 0] }),
    mesh(roundedBoxGeo(1.88, 0.12, 1.48, 0.06, 0.02), trim, { pos: [0, 0.99, 0] }),
  );
  for (const sz of [-1, 1]) {
    for (const wx of [-0.46, 0, 0.46]) {
      g.add(
        mesh(roundedBoxGeo(0.32, 0.42, 0.05, 0.04, 0.01), trim, { pos: [wx, 0.52, sz * 0.67] }),
        mesh(roundedBoxGeo(0.24, 0.34, 0.06, 0.03, 0.008), winGlow, { pos: [wx, 0.52, sz * 0.68], cast: false }),
      );
    }
  }
  // Cute flower planter boxes along front windowsill
  for (const wx of [-0.46, 0.46]) {
    g.add(
      mesh(roundedBoxGeo(0.32, 0.1, 0.14, 0.02, 0.008), kit.clay(0xc8643a), { pos: [wx, 0.25, 0.74] }),
      mesh(new SphereGeometry(0.08, 10, 8), kit.clay(0x3ba864), { pos: [wx - 0.06, 0.34, 0.74] }),
      mesh(new SphereGeometry(0.075, 10, 8), kit.clay(0xff7d9c), { pos: [wx + 0.06, 0.34, 0.74] }),
    );
  }
  return {
    group: tagMilestone(g, day, "brick_" + day),
    anim: null,
  };
}

// Day 101+ Procedural Golden Skyline Wing (every +14 days)
export function buildSkylineWing(day, kit) {
  const wingNum = Math.max(1, Math.floor((day - 100) / 14));
  const g = new Group();
  const gold = kit.metal(0xf5c43d, 0.22, 0.84);
  const teal = kit.clay(0x148c84, { rough: 0.42 });
  const winGlow = kit.emissive(0xffe884, 0.85, 2.25);

  g.add(
    mesh(roundedBoxGeo(0.84, 0.2, 0.84, 0.06, 0.02), teal, { pos: [0, 0.1, 0] }),
    mesh(roundedBoxGeo(0.64, 1.38, 0.64, 0.06, 0.02), gold, { pos: [0, 0.88, 0] }),
    mesh(roundedBoxGeo(0.46, 0.68, 0.46, 0.05, 0.016), teal, { pos: [0, 1.88, 0] }),
    mesh(new ConeGeometry(0.28, 0.56, 6), gold, { pos: [0, 2.5, 0] }),
    mesh(new SphereGeometry(0.08, 12, 10), winGlow, { pos: [0, 2.82, 0], cast: false }),
  );
  for (let i = 0; i < 4; i++) {
    g.add(mesh(roundedBoxGeo(0.67, 0.07, 0.67, 0.02, 0.006), winGlow, { pos: [0, 0.44 + i * 0.3, 0], cast: false }));
  }
  // Terraced sky-garden foliage ring
  for (let i = 0; i < 4; i++) {
    const a = (i * Math.PI) / 2 + 0.4;
    g.add(mesh(new SphereGeometry(0.11, 10, 8), kit.clay(0x3ba864), { pos: [Math.cos(a) * 0.32, 1.62, Math.sin(a) * 0.32] }));
  }
  addContactShadow(g, 0.54, 0.54, 0.008, 0.34, kit);
  return {
    group: tagMilestone(g, day, "wing_" + wingNum),
    anim: null,
  };
}

export function buildInfiniteMilestone(day, kit, opts = {}) {
  switch (day) {
    case 18: return buildDay18Gulls(kit, opts);
    case 21: return buildDay21Twilight(kit);
    case 25: return buildDay25Umbrella(kit);
    case 30: return buildDay30Tram(kit, opts);
    case 35: return buildDay35Lanterns(kit);
    case 45: return buildDay45Clock(kit);
    case 60: return buildDay60Treasure(kit);
    case 75: return buildDay75LionRock(kit);
    case 90: return buildDay90PeakTram(kit);
    case 100: return buildDay100Centennial(kit);
    default:
      if (day > 100 && (day - 100) % 14 === 0) return buildSkylineWing(day, kit);
      if (day > 14) return buildSaverFloor(day, kit);
      return null;
  }
}
