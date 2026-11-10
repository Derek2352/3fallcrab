/* items-wise.js — the calm, flat-based "wise" money choices, sculpted in bright plasticine.
   Every collision part is convex and the clay masses are drawn with the same dimensions,
   so the art and the physics outline agree. Light comes from the top-left (CLAY.blob). */
(function(){
  "use strict";
  // ---- local helpers (geometry shared by make() and draw()) ----
  const ellPts = (cx, cy, rx, ry, n) => Array.from({length:n}, (_, i) => { const a = i / n * Math.PI * 2; return [cx + rx*Math.cos(a), cy + ry*Math.sin(a)]; });
  const rectsOf = (S, x, y, list) => list.map(([px, py, w, h, r, ang]) => S.rect(x + px, y + py, w, h, Object.assign(r ? {r} : {}, ang ? {angle:ang} : {})));
  const line = pts => CLAY.poly(pts, false);
  const clip = (g, path, fn) => { g.save(); g.clip(path); fn(); g.restore(); };
  function heart(cx, cy, s){
    const p = new Path2D(); p.moveTo(cx, cy + s*0.85);
    p.bezierCurveTo(cx - s*1.25, cy + s*0.05, cx - s*0.85, cy - s*0.95, cx, cy - s*0.35);
    p.bezierCurveTo(cx + s*0.85, cy - s*0.95, cx + s*1.25, cy + s*0.05, cx, cy + s*0.85); p.closePath();
    p.bb = {x: cx - s, y: cy - s*0.75, w: s*2, h: s*1.6}; return p;
  }
  // tiny 5-petal clay flower
  function flower(g, cx, cy, r, petal, mid){
    const K = CLAY;
    for (let i = 0; i < 5; i++){ const a = -Math.PI/2 + i * Math.PI * 0.4;
      K.press(g, K.ball(cx + Math.cos(a)*r, cy + Math.sin(a)*r, r*0.72, r*0.72, {lump:0.15, n:10}), petal, {sheen:false, texture:0, depth:0.9, soft:1.4, rim:0.5}); }
    K.press(g, K.ball(cx, cy, r*0.62, r*0.62, {lump:0.1, n:10}), mid, {sheen:false, texture:0, depth:0.8, soft:1.2, rim:0.5});
  }
  const shadeOver = (g, path, x0, x1, y0, y1, a) => clip(g, path, () => { g.fillStyle = "rgba(60,25,70," + a + ")"; g.fillRect(x0, y0, x1 - x0, y1 - y0); });

  // bright bamboo + food colours not in the base palette (all saturated)
  const BAMBOO = "#F6B33C", BAMBOO_D = "#E08A2A", CANE = "#C9682A", HARGOW = "#FFEAF1", PRAWN = "#FF8A6A";
  const PINK_L = "#FF8CBF", PINK_D = "#E2357F", TEA = "#B4561F";

  // ---- geometry tables (local units, origin = drawing origin) ----
  const BOOKS = {bot: [-3, 11, 110, 22, 4], top: [5, -10, 98, 20, 4]};
  const LUNCH = {body: [0, 7, 84, 30, 6], lid: [0, -13, 92, 12, 4], clipL: [-44, -2, 6, 12, 2], clipR: [44, -2, 6, 12, 2]};
  const CARD = [0, 0, 118, 20, 6];
  const CALC = {body: [0, 0, 58, 72, 9], footL: [-17, 37, 13, 6, 2], footR: [17, 37, 13, 6, 2], solar: [0, -37.5, 34, 6, 2]};
  const PIG = {
    body: ellPts(-3, -3, 40, 28, 22),
    snout: [39, -2, 13, 19, 5],
    ear: [[-3, -29], [3, -39.5], [13, -42], [23, -24.5]],
    legB: [-23, 26, 19, 15, 3], legF: [18, 26, 19, 15, 3]
  };
  // puff collision = hull of the two tissue sheets; kept low so things can still sit on the box
  const TISSUE = {box: [0, 10, 84, 40, 5], puff: [[-20, -8], [-17.5, -14], [-12.5, -19], [-6, -22], [4, -23.5], [9.5, -23], [14, -19.5], [18, -14], [20.5, -8]]};
  const RICE = {
    body: [[-36, 30], [36, 30], [40, 25], [42, 12], [40, -4], [35, -16], [26, -25], [13, -31], [-13, -31], [-26, -25], [-35, -16], [-40, -4], [-42, 12], [-40, 25]],
    neck: [0, -34, 20, 8, 2],
    tuft: [[-9, -37], [9, -37], [18, -51], [-18, -51]]
  };
  const STEAM = {
    bot: [0, 20, 104, 20, 3], top: [0, 0, 104, 20, 3], rim: [0, -13, 110, 7, 3],
    dome: [[-50, -16], [-42, -21], [-27, -24.6], [-10, -26.2], [10, -26.2], [27, -24.6], [42, -21], [50, -16]]
  };
  const TEA_ANG = 0.2;
  const LEMON = {
    body: [0, 6, 48, 64, 4], fin: [0, -28, 40, 6, 2],
    earL: [[-24, -26], [-28, -24], [-24, -16]], earR: [[24, -26], [28, -24], [24, -16]],
    straw: [13.6, -39.5, 5, 19, 0, TEA_ANG]
  };
  const PASS = [[-43, -12], [-46.5, -10.4], [-49, -6], [-50, 0], [-49, 6], [-46.5, 10.4], [-43, 12], [46, 12], [48.5, 10], [48.5, -10], [46, -12]];

  window.ITEM_DEFS = (window.ITEM_DEFS || []).concat([
    // ------------------------------------------------------------------ textbooks
    { id: "textbooks", en: "Second-hand textbooks", zh: "二手課本", kind: "wise",
      note: "two offset hardbacks, wide flat stepped base, very stable",
      make(x, y){ const S = CLAY.shape; return S.body(rectsOf(S, x, y, [BOOKS.bot, BOOKS.top]), "card", {friction:0.85, frictionStatic:1.2, restitution:0.02, density:0.0018}); },
      draw(g){ const K = CLAY; const [bx, by, bw, bh, br] = BOOKS.bot, [tx, ty, tw, th, tr] = BOOKS.top;
        // bottom book: orange hardback, page block facing us
        const bot = K.slab(bx, by, bw, bh, br, {seed:11});
        K.blob(g, bot, "orange");
        K.press(g, K.slab(bx - 1, by + 0.3, bw - 8, bh - 9, 2.5, {lump:0.35, seed:5}), "cream", {sheen:false, depth:1.1});
        for (const yy of [8.1, 11.3, 14.4]) K.groove(g, line([[-53, yy], [-10, yy + 0.4], [47, yy - 0.2]]), 0.6, {dark:"rgba(160,95,50,0.5)"});
        K.press(g, K.rrc(28, 13, 6, 11, 1.2), "teal", {sheen:false, depth:1});          // bookmark tab
        // top book: blue hardback, spine facing us
        const top = K.slab(tx, ty, tw, th, tr, {seed:23});
        K.blob(g, top, "blue");
        for (const xx of [-36.5, 46.5]) K.press(g, K.slab(xx, ty, 4, th - 1.5, 1.5, {lump:0.25}), "yellow", {sheen:false, depth:1});
        K.groove(g, line([[-31, -18], [-31, -2]]), 0.9); K.groove(g, line([[41, -18], [41, -2]]), 0.9);
        const lab = K.slab(4, ty, 46, 13.5, 3, {lump:0.3, seed:3});
        g.save(); g.translate(4, ty); g.rotate(-0.025); g.translate(-4, -ty);
        K.press(g, lab, "cream", {sheen:false});
        K.text(g, "經濟學", 4, ty + 0.6, {size:11, font:"zh", color:"#1F5FB4", weight:900});
        g.restore();
        K.press(g, K.ball(35, ty - 0.5, 4.2, 4.2, {lump:0.2}), "pink", {sheen:false});  // second-hand price sticker
        K.text(g, "$", 35, ty - 0.2, {size:6, font:"display", color:"white", weight:900});
      } },

    // ------------------------------------------------------------------ lunchbox
    { id: "lunchbox", en: "Home-made lunch box", zh: "自家飯盒", kind: "wise",
      note: "flat heavy box with lid lip and side clips, stacks well",
      make(x, y){ const S = CLAY.shape; return S.body(rectsOf(S, x, y, [LUNCH.body, LUNCH.lid, LUNCH.clipL, LUNCH.clipR]), "plastic", {friction:0.65, frictionStatic:1.0, restitution:0.04, density:0.0028}); },
      draw(g){ const K = CLAY;
        const body = K.slab(...LUNCH.body, {seed:31});
        K.blob(g, body, "teal");
        K.groove(g, line([[-37, 15], [37, 15.3]]), 1.1);
        K.groove(g, line([[-37, 18.5], [37, 18.7]]), 1.1);
        K.press(g, heart(-20, 4, 6.5), "red", {sheen:false});                                   // heart sticker
        const lid = K.slab(...LUNCH.lid, {seed:17});
        K.blob(g, lid, "pink");
        K.groove(g, line([[-41, -9.6], [41, -9.4]]), 1.0);
        K.press(g, K.slab(-24, -20, 12, 4, 2, {lump:0.2}), PINK_D, {sheen:false, depth:1});        // steam vent knob
        for (const s of [-1, 1]){ const cp = K.slab(s*44, -2, 6, 12, 2, {lump:0.25, seed:9 + s});
          K.press(g, cp, "white", {sheen:false}); K.groove(g, line([[s*44 - 1.6, -0.5], [s*44 + 1.6, -0.5]]), 0.8); }
        // elastic band wrapped round lid and box
        K.press(g, K.slab(17, 1.5, 7.5, 41, 2.5, {lump:0.4, seed:4}), "yellow", {sheen:false});
        K.groove(g, line([[17, -18], [17, 21]]), 0.7, {dark:"rgba(150,90,10,0.35)"});
      } },

    // ------------------------------------------------------------------ transit card
    { id: "transitcard", en: "Transit card", zh: "八達通", kind: "wise",
      note: "thin long card, grippy surface, lies dead flat",
      make(x, y){ const S = CLAY.shape; const [px, py, w, h, r] = CARD; return S.body([S.rect(x + px, y + py, w, h, {r})], "plastic", {friction:0.95, frictionStatic:1.4, restitution:0.02, density:0.0018}); },
      draw(g){ const K = CLAY;
        const card = K.slab(...CARD, {lump:0.7, seed:41});
        K.blob(g, card, "purple");
        clip(g, card, () => {
          const wave = []; for (let i = 0; i <= 24; i++){ const xx = -64 + i * 128 / 24; wave.push([xx, 4.5 + 2.6 * Math.sin(xx / 9)]); }
          K.press(g, K.tube(wave, 5.5), "sky", {sheen:false});
          const wave2 = wave.map(([a, b]) => [a, b + 4.6]);
          K.press(g, K.tube(wave2, 2.6), "lime", {sheen:false, depth:0.8});
        });
        const chip = K.rrc(-41, -2.2, 15, 10.5, 2.6);
        K.press(g, chip, "yellow", {sheen:false});
        K.groove(g, line([[-48, -2.2], [-34, -2.2]]), 0.7); K.groove(g, line([[-41, -7], [-41, 2.6]]), 0.7);
        K.groove(g, line([[-45.5, -7], [-45.5, 2.6]]), 0.5); K.groove(g, line([[-36.5, -7], [-36.5, 2.6]]), 0.5);
        for (let i = 0; i < 3; i++){ const r = 2.6 + i * 2.6;
          const arc = []; for (let k = 0; k <= 8; k++){ const a = -0.9 + 1.8 * k / 8; arc.push([30 + r*Math.cos(a), -2.5 + r*Math.sin(a)]); }
          K.press(g, K.tube(arc, 1.6), "white", {sheen:false, texture:0, depth:0.6, soft:1, rim:0.4}); }
        K.inner(g, K.circle(51, -3.5, 2.4), "rgba(40,10,60,0.7)", 1.6, -0.6, -0.8);                 // lanyard hole
        K.press(g, K.tube([[51, -3.5], [56, -6], [61.5, -4], [60.5, 1.5], [55, 1.2]], 2.4), "pink", {sheen:false, texture:0, depth:0.7, soft:1});
      } },

    // ------------------------------------------------------------------ calculator
    { id: "calculator", en: "Calculator", zh: "計數機", kind: "wise",
      note: "upright block on rubber feet, wide enough to stand firm",
      make(x, y){ const S = CLAY.shape; return S.body(rectsOf(S, x, y, [CALC.body, CALC.footL, CALC.footR, CALC.solar]), "plastic", {friction:0.7, frictionStatic:1.0, restitution:0.04, density:0.0022}); },
      draw(g){ const K = CLAY;
        for (const f of [CALC.footL, CALC.footR]) K.blob(g, K.slab(...f, {lump:0.3}), "purple", {depth:1.5, soft:2, sheen:false});
        const solar = K.slab(...CALC.solar, {lump:0.3, seed:2});
        K.blob(g, solar, "iron", {depth:1.4, soft:2, sheen:false});
        const body = K.slab(...CALC.body, {seed:51});
        K.blob(g, body, "green");
        for (const xx of [-8.5, 0, 8.5]) K.groove(g, line([[xx, -39.5], [xx, -36]]), 0.6, {light:"rgba(255,255,255,0.35)"});
        K.press(g, K.slab(0, -20, 46, 21, 4, {lump:0.3, seed:6}), "white", {sheen:false});
        const scr = K.rrc(0, -20, 39, 13.5, 2.5);
        K.press(g, scr, "lime", {sheen:false, depth:1.2});
        K.inner(g, scr, "rgba(40,60,10,0.45)", 2, 1, 1.2);
        K.text(g, "$500", 4, -19.6, {size:10, font:"dot", color:"#2B4A12", weight:400});
        const cols = [-19.5, -6.5, 6.5, 19.5], rows = [-1, 8, 17, 26.2];
        const labels = [["7", "8", "9", "÷"], ["4", "5", "6", "×"], ["1", "2", "3", "−"], ["0", ".", "=", "+"]];
        rows.forEach((yy, ri) => cols.forEach((xx, ci) => {
          const op = ci === 3, eq = ri === 3 && ci === 2;
          const col = eq ? "pink" : op ? "orange" : "cream";
          K.press(g, K.slab(xx, yy, 10.5, 7, 2.5, {lump:0.2, seed: ri * 4 + ci + 3}), col, {sheen:false, depth:1.3});
          K.text(g, labels[ri][ci], xx, yy + 0.2, {size:5.5, font:"sans", color: op || eq ? "white" : "#6C5A4A", weight:900});
        }));
      } },

    // ------------------------------------------------------------------ piggy bank
    { id: "piggybank", en: "Piggy bank", zh: "錢罌", kind: "wise",
      note: "round ceramic pig on four short legs: flat footprint, sits tight",
      make(x, y){ const S = CLAY.shape;
        return S.body([S.convex(x, y, PIG.body), ...rectsOf(S, x, y, [PIG.snout, PIG.legB, PIG.legF]), S.convex(x, y, PIG.ear)], "plastic", {friction:0.7, frictionStatic:1.0, restitution:0.04, density:0.0024}); },
      draw(g){ const K = CLAY;
        // far legs + far ear + tail, behind the body
        K.blob(g, K.slab(PIG.legB[0] + 4, 25.5, 11, 14, 3.5, {lump:0.3}), PINK_D, {sheen:false, depth:1.8, soft:2.4});
        K.blob(g, K.slab(PIG.legF[0] + 4, 25.5, 11, 14, 3.5, {lump:0.3}), PINK_D, {sheen:false, depth:1.8, soft:2.4});
        K.blob(g, K.blobPoly([[0, -28], [5, -39], [14, -29]], {lump:0.3}), PINK_D, {sheen:false, depth:1.5, soft:2});
        const curl = []; for (let i = 0; i <= 22; i++){ const t = i / 22, a = 0.35 - t * Math.PI * 2.15, r = 4.3 - 2.5 * t; curl.push([-46.3 + r * Math.cos(a), -7.3 + r * Math.sin(a)]); }
        K.press(g, K.tube(curl, 2.6), "pink", {sheen:false, texture:0, depth:0.8, soft:1.2});
        const body = K.ball(-3, -3, 40, 28, {lump:0.7, seed:61});
        K.blob(g, body, "pink", {sheen:{x:-16, y:-17, rx:9, ry:4.5}});
        // near legs
        for (const lx of [PIG.legB[0] - 3.5, PIG.legF[0] - 3.5]){
          K.blob(g, K.slab(lx, 26.5, 12, 13, 3.5, {lump:0.3, seed:lx}), "pink", {sheen:false, depth:2, soft:2.6});
          K.groove(g, line([[lx - 3.5, 31.5], [lx + 3.5, 31.5]]), 0.8);
        }
        // snout
        const sn = K.slab(...PIG.snout, {lump:0.4, seed:7});
        K.blob(g, sn, PINK_L, {depth:2, soft:3, sheen:{x:37, y:-8, rx:2.5, ry:3}});
        K.inner(g, K.ellipse(39, -5.5, 1.6, 2.6), "rgba(120,10,60,0.85)", 1.2, -0.4, -0.6);
        K.inner(g, K.ellipse(39, 1.5, 1.6, 2.6), "rgba(120,10,60,0.85)", 1.2, -0.4, -0.6);
        g.save(); g.fillStyle = "rgba(150,20,70,0.55)"; g.beginPath(); g.ellipse(39, -5.5, 1.3, 2.2, 0, 0, 7); g.ellipse(39, 1.5, 1.3, 2.2, 0, 0, 7); g.fill(); g.restore();
        // near ear
        const ear = K.blobPoly([[8, -28], [14, -41], [23, -24.5]], {lump:0.3, seed:3});
        K.blob(g, ear, "pink", {depth:1.8, soft:2.4, sheen:false});
        K.press(g, K.blobPoly([[12, -28], [14.5, -36], [19, -26.5]], {lump:0.2}), PINK_D, {sheen:false, depth:1, texture:0});
        // coin slot with a coin going in
        K.press(g, K.ball(-12, -36, 6.5, 6.5, {lump:0.2, n:14}), "yellow", {sheen:false, depth:1.4});
        K.groove(g, K.ball(-12, -36, 4, 4, {lump:0.1, n:12}), 0.6);
        clip(g, body, () => { K.inner(g, K.rrc(-12, -29.6, 18, 3.4, 1.7), "rgba(110,10,60,0.9)", 1.4, -0.4, -0.8);
          g.fillStyle = "rgba(120,15,65,0.75)"; g.fill(K.rrc(-12, -29.6, 16, 2.4, 1.2)); });
        g.save(); g.beginPath(); g.rect(-30, -60, 40, 30.4); g.clip();
        K.press(g, K.ball(-12, -34.5, 6.5, 6.5, {lump:0.2, n:14}), "yellow", {sheen:false, depth:1.4});
        K.text(g, "$", -12, -35.5, {size:7, font:"display", color:"orange", weight:900}); g.restore();
        // face
        K.softSpot(g, body, K.ellipse(23, 4, 5.5, 3.5), "rgba(255,40,90,0.6)", 4);
        K.eye(g, 22, -9.5, 4.3, 0.5, -0.1);
        K.groove(g, line([[28, 7], [31, 9.6], [34.5, 8.6]]), 0.9);
        K.groove(g, line([[-28, 4], [-20, 13], [-8, 17]]), 0.8, {dark:"rgba(140,20,70,0.25)"});
      } },

    // ------------------------------------------------------------------ tissue box
    { id: "tissuebox", en: "Tissue box", zh: "紙巾盒", kind: "wise",
      note: "light cardboard box, soft tissue puff on top, flat and steady",
      make(x, y){ const S = CLAY.shape; const [bx, by, bw, bh, br] = TISSUE.box;
        return S.body([S.rect(x + bx, y + by, bw, bh, {r:br}), S.convex(x, y, TISSUE.puff)], "card", {friction:0.8, frictionStatic:1.1, restitution:0.02, density:0.0012}); },
      draw(g){ const K = CLAY;
        // tissue puff (behind the box top): one soft white sheet with a leaning peak, folds fanning from the slot
        const puffPts = [[-19.5, -6], [-17, -13], [-12, -18], [-6, -20.6], [-1, -21.6], [3.5, -23.2], [7.5, -23.6], [10, -22], [13.5, -18.5], [17, -13.5], [20, -6]];
        const puff = K.blobPoly(puffPts, {lump:0.5, seed:13, step:3.5});
        K.blob(g, puff, "white", {depth:2.6, soft:4, sheen:{x:-4, y:-17, rx:4, ry:2}});
        K.press(g, K.blobPoly([[4.5, -22.6], [9.6, -22.4], [7.6, -18.4]], {lump:0.15, step:3}), "#E9E6FA", {sheen:false, texture:0, depth:0.8, soft:1.2});   // folded-over corner
        const fold = {dark:"rgba(90,70,150,0.3)", light:"rgba(255,255,255,0.8)"};
        K.groove(g, line([[-9, -18.5], [-7.5, -13], [-6, -8]]), 0.8, fold);
        K.groove(g, line([[1, -20.5], [1.5, -14], [1, -8]]), 0.8, fold);
        K.groove(g, line([[8, -18], [10, -13], [12, -8]]), 0.8, fold);
        // box
        const box = K.slab(...TISSUE.box, {seed:71});
        K.blob(g, box, "sky", {sheen:{x:-22, y:-1, rx:12, ry:3.5}});
        shadeOver(g, box, 27, 50, -15, 35, 0.12);                                                   // side face in shade
        K.groove(g, line([[27, -8], [27.5, 28]]), 1.0);
        K.press(g, K.slab(0, -7.8, 40, 4.2, 2.1, {lump:0.2}), "#2E86D6", {sheen:false, depth:0.8, texture:0});   // opening slot
        K.press(g, K.slab(0, -8.6, 30, 2.4, 1.2, {lump:0.15}), "white", {sheen:false, depth:0.6, texture:0});
        // pattern
        clip(g, box, () => {
          K.press(g, K.tube([[-46, 22], [-30, 17], [-14, 22], [2, 17], [18, 22], [34, 17], [50, 22]], 4.5), "pink", {sheen:false, depth:1});
        });
        flower(g, -26, 4.5, 3.4, "white", "yellow");
        flower(g, 2, 7, 2.8, "yellow", "orange");
        flower(g, 18, -0.5, 2.3, "white", "pink");
        K.dots(g, [[-12, -0.5], [-38, 11], [12, 10.5], [36, 3], [-6, 11], [33, 12]], 1.4, "white");
      } },

    // ------------------------------------------------------------------ rice sack
    { id: "ricesack", en: "Bag of rice", zh: "一包米", kind: "wise",
      note: "heavy floppy sack, flat bottom, grips and never bounces",
      make(x, y){ const S = CLAY.shape;
        return S.body([S.convex(x, y, RICE.body), ...rectsOf(S, x, y, [RICE.neck]), S.convex(x, y, RICE.tuft)], "fabric", {friction:1.0, frictionStatic:1.6, restitution:0, density:0.003}); },
      draw(g){ const K = CLAY;
        // frilly tied-off top
        const tuftPts = [[-9, -37], [9, -37], [17.5, -48.5], [14, -51], [9, -48.5], [5, -51], [0, -48.5], [-5, -51], [-9, -48.5], [-14, -51], [-17.5, -48.5]];
        K.blob(g, K.blobPoly(tuftPts, {lump:0.4, seed:5, step:4}), "white", {depth:2, soft:3, sheen:false});
        K.groove(g, line([[-5, -38], [-9, -47]]), 0.7); K.groove(g, line([[0, -38], [0, -47]]), 0.7); K.groove(g, line([[5, -38], [9, -47]]), 0.7);
        K.blob(g, K.slab(...RICE.neck, {lump:0.3}), "white", {depth:1.6, soft:2.4, sheen:false});
        const body = K.blobPoly(RICE.body, {lump:1.0, seed:81, step:8});
        K.blob(g, body, "white", {sheen:{x:-20, y:-14, rx:9, ry:5}});
        // printed bands, wrapped round the sack, over a faint woven-sack crosshatch
        clip(g, body, () => {
          g.save(); g.lineWidth = 0.45; g.strokeStyle = "rgba(110,90,150,0.13)"; g.beginPath();
          for (let k = -90; k <= 90; k += 3.6){ g.moveTo(k, -34); g.lineTo(k + 66, 32); g.moveTo(k, -34); g.lineTo(k - 66, 32); }
          g.stroke(); g.restore();
          K.press(g, K.slab(0, -15, 96, 5, 1, {lump:0.5, seed:3}), "green", {sheen:false, depth:1.2});
          K.press(g, K.slab(0, 22, 96, 6, 1, {lump:0.5, seed:8}), "green", {sheen:false, depth:1.2});
          K.press(g, K.slab(0, 17.2, 96, 2.2, 1, {lump:0.3, seed:9}), "yellow", {sheen:false, depth:0.8, texture:0});
        });
        K.groove(g, line([[-34, 27.5], [34, 27.5]]), 0.8, {dark:"rgba(60,90,30,0.45)"});
        // big red label with 米
        const lab = K.ball(0, 3, 15, 14, {lump:0.5, seed:12});
        K.press(g, lab, "red", {sheen:{x:-5, y:-4, rx:4, ry:2.5}});
        K.groove(g, K.ball(0, 3, 12, 11, {lump:0.3, seed:2}), 0.7, {light:"rgba(255,255,255,0.35)", dark:"rgba(120,10,20,0.45)"});
        K.text(g, "米", 0, 3.6, {size:16, font:"zh", color:"white", weight:900});
        // gathered fabric wrinkles at the shoulders
        K.groove(g, line([[-8, -30], [-14, -25], [-17, -20]]), 0.8, {dark:"rgba(80,60,110,0.35)"});
        K.groove(g, line([[8, -30], [13, -25], [16, -20]]), 0.8, {dark:"rgba(80,60,110,0.35)"});
        K.groove(g, line([[-2, -30], [-3, -22]]), 0.7, {dark:"rgba(80,60,110,0.3)"});
        // red string tie with a bow
        K.press(g, K.tube([[-11, -34.5], [0, -33.2], [11, -34.5]], 3.2), "red", {sheen:false, depth:0.9});
        K.press(g, K.tube([[0, -33.5], [-6, -29], [-9.5, -24]], 2.4), "red", {sheen:false, depth:0.8, texture:0});
        K.press(g, K.tube([[0, -33.5], [5, -28], [9, -24.5]], 2.4), "red", {sheen:false, depth:0.8, texture:0});
        K.press(g, K.ball(0, -33.5, 2.6, 2.4, {lump:0.1, n:10}), "red", {sheen:false, depth:0.8});
      } },

    // ------------------------------------------------------------------ bamboo steamer
    { id: "steamer", en: "Bamboo steamer", zh: "蒸籠", kind: "wise",
      note: "two wide bamboo tiers under a low dome lid: broad, light, very steady",
      make(x, y){ const S = CLAY.shape;
        return S.body([...rectsOf(S, x, y, [STEAM.bot, STEAM.top, STEAM.rim]), S.convex(x, y, STEAM.dome)], "wood", {friction:0.85, frictionStatic:1.2, restitution:0.02, density:0.0014}); },
      draw(g){ const K = CLAY;
        const tier = (spec, seed) => {
          const [cx, cy, w, h, r] = spec; const p = K.slab(cx, cy, w, h, r, {seed});
          K.blob(g, p, BAMBOO, {sheen:{x:-30, y:cy - 4, rx:14, ry:2.4}});
          K.groove(g, line([[-49, cy - 5.5], [49, cy - 5.3]]), 0.9);
          K.groove(g, line([[-49, cy + 5.6], [49, cy + 5.4]]), 0.9);
          for (const xx of [-40, -14, 12, 38]){                                  // cane bindings
            K.press(g, K.slab(xx + (seed % 3), cy, 3.2, 8.6, 1.2, {lump:0.15, seed:xx}), CANE, {sheen:false, depth:0.8, texture:0.05});
          }
          for (const xx of [-27, -1, 25]) K.groove(g, line([[xx, cy - 3.2], [xx + 4, cy - 3.3]]), 0.6, {dark:"rgba(140,70,10,0.4)"});
        };
        tier(STEAM.bot, 5); tier(STEAM.top, 9);
        // lettuce liner peeking between the tiers
        const lettuce = []; for (let i = 0; i <= 10; i++) lettuce.push([30 + i * 2.2, 10.5 + (i % 2 ? 2.4 : 0.4)]);
        K.press(g, K.tube(lettuce, 3), "green", {sheen:false, depth:0.9});
        // domed lid: woven lattice
        const dome = K.blobPoly(STEAM.dome, {lump:0.4, seed:7, step:6});
        K.blob(g, dome, "#FFC447", {depth:2.6, soft:4, sheen:{x:-20, y:-23, rx:12, ry:1.8}});
        // woven bamboo: fine strands following the dome curve, crossed by a few curved ribs
        const domeY = (xx, t) => -16 - (10.2 * t) * (1 - Math.pow(xx / 52, 2));
        clip(g, dome, () => {
          for (let t = 0.2; t < 1; t += 0.2){ const pts = []; for (let xx = -54; xx <= 54; xx += 4) pts.push([xx, domeY(xx, t)]);
            K.groove(g, line(pts), 0.55, {dark:"rgba(175,85,0,0.42)", light:"rgba(255,245,200,0.6)"}); }
          for (const xx of [-36, -18, 0, 18, 36]) K.groove(g, line([[xx * 1.1, -16], [xx * 0.9, domeY(xx, 1) - 1]]), 0.9, {dark:"rgba(160,70,0,0.5)", light:"rgba(255,240,190,0.5)"});
        });
        const rim = K.slab(...STEAM.rim, {lump:0.4, seed:3});
        K.blob(g, rim, BAMBOO_D, {depth:2, soft:3, sheen:{x:-30, y:-14.5, rx:12, ry:1.5}});
        // a curious har gow peeking out from under the lid
        const hg = K.blobPoly([[-31, -6.5], [-29, -12], [-24, -16], [-18, -17], [-12, -16], [-7, -12], [-5, -6.5]], {lump:0.3, seed:4, step:4});
        K.press(g, hg, HARGOW, {sheen:{x:-23, y:-13, rx:3, ry:1.6}});
        K.softSpot(g, hg, K.ellipse(-18, -10, 5, 2.6), "rgba(255,120,90,0.55)", 3);
        for (const xx of [-25, -20.5, -16, -11.5]) K.groove(g, line([[xx, -15.6], [xx + 1.4, -12.2]]), 0.6, {dark:"rgba(200,90,110,0.45)"});
        K.eye(g, -22, -9.6, 1.9, 0.5, 0); K.eye(g, -15.5, -9.6, 1.9, 0.5, 0);
      } },

    // ------------------------------------------------------------------ lemon tea carton
    { id: "lemontea", en: "Carton of lemon tea", zh: "紙包檸檬茶", kind: "wise",
      note: "upright drink carton with a straw: steady on its flat base, taller than wide",
      make(x, y){ const S = CLAY.shape;
        return S.body([...rectsOf(S, x, y, [LEMON.body, LEMON.fin, LEMON.straw]), S.convex(x, y, LEMON.earL), S.convex(x, y, LEMON.earR)], "card", {friction:0.75, frictionStatic:1.0, restitution:0.03, density:0.0021}); },
      draw(g){ const K = CLAY;
        // straw (behind the top fin), bent tip is art-only
        const sx0 = 11.6, sy0 = -29.5, sx1 = sx0 + Math.sin(TEA_ANG) * 19.6, sy1 = sy0 - Math.cos(TEA_ANG) * 19.6;
        const straw = K.tube([[sx0, sy0], [sx1, sy1], [sx1 - 1.2, sy1 - 2.2], [sx1 - 5.5, sy1 - 4.2]], 4.4);
        K.blob(g, straw, "white", {depth:1.2, soft:1.8, sheen:false, texture:0.05});
        clip(g, straw, () => { for (let k = -60; k < -24; k += 4.2) K.press(g, K.tube([[0, k], [30, k - 6]], 1.6), "pink", {sheen:false, texture:0, depth:0.4, soft:0.8, rim:0}); });
        // side flaps + carton
        for (const e of [LEMON.earL, LEMON.earR]) K.blob(g, K.blobPoly(e, {lump:0.1}), "#F0B020", {depth:1, soft:1.6, sheen:false});
        K.blob(g, K.slab(...LEMON.fin, {lump:0.3}), "green", {depth:1.6, soft:2.2, sheen:false});
        K.groove(g, line([[-17, -28], [17, -28]]), 0.7);
        const body = K.slab(...LEMON.body, {seed:91});
        K.blob(g, body, "yellow", {sheen:{x:-11, y:-14, rx:5, ry:9}});
        clip(g, body, () => {
          K.press(g, K.slab(0, -21, 60, 10, 1, {lump:0.4, seed:2}), "green", {sheen:false, depth:1.2});
          const w = []; for (let i = 0; i <= 12; i++){ const xx = -30 + i * 5; w.push([xx, 31 + 1.6 * Math.sin(xx / 4)]); }
          K.press(g, K.tube(w, 6), TEA, {sheen:false, depth:1.2});
          K.press(g, K.slab(0, 39, 60, 10, 1, {lump:0.3}), TEA, {sheen:false, depth:1, rim:0});
        });
        K.groove(g, line([[16, -25], [16.5, 37]]), 0.8);                                     // carton edge
        K.text(g, "檸檬茶", 0, -6.5, {size:12, font:"zh", color:TEA, weight:900});
        // lemon slice on a cream disc + leaf
        K.press(g, K.ball(-1, 13.5, 11, 11, {lump:0.3, seed:5}), "white", {sheen:false});
        const sl = K.ball(-1, 13.5, 8.6, 8.6, {lump:0.25, seed:8});
        K.press(g, sl, "yellow", {sheen:false});
        K.groove(g, K.ball(-1, 13.5, 6.8, 6.8, {lump:0.1, seed:3}), 0.6, {light:"rgba(255,255,255,0.7)"});
        for (let i = 0; i < 6; i++){ const a = i * Math.PI / 3; K.groove(g, line([[-1, 13.5], [-1 + Math.cos(a) * 6.2, 13.5 + Math.sin(a) * 6.2]]), 0.6, {light:"rgba(255,255,255,0.8)"}); }
        K.press(g, K.blobPoly([[7, 4], [12.5, -1], [17, 0.5], [12, 5.5]], {lump:0.2}), "green", {sheen:false});
        K.groove(g, line([[8, 3.6], [15.5, 0.6]]), 0.5);
      } },

    // ------------------------------------------------------------------ savings passbook
    { id: "passbook", en: "Savings passbook", zh: "存摺", kind: "wise",
      note: "thin flat booklet with a rounded spine: the steadiest thing on the tower",
      make(x, y){ const S = CLAY.shape; return S.body([S.convex(x, y, PASS)], "card", {friction:0.85, frictionStatic:1.2, restitution:0.02, density:0.0018}); },
      draw(g){ const K = CLAY;
        // bookmark ribbon: a flat strip tucked between the pages, hanging out of the bottom edge, swallowtail end
        g.save(); g.translate(33.5, 8); g.rotate(-0.12);
        const rib = K.blobPoly([[-2.25, -5], [2.25, -5], [2.25, 15.5], [0, 12.9], [-2.25, 15.5]], {lump:0.12, seed:6, step:4});
        K.press(g, rib, "teal", {sheen:false, depth:0.9, soft:1.4, texture:0.05});
        clip(g, rib, () => { g.fillStyle = "rgba(20,60,70,0.35)"; g.fillRect(-3, 3.5, 6, 2); });        // shade where it leaves the book
        g.restore();
        const cover = K.blobPoly(PASS, {lump:0.6, seed:101, step:7});
        K.blob(g, cover, "red", {sheen:{x:-22, y:-6.5, rx:12, ry:2.4}});
        K.groove(g, line([[-41, -10.5], [-41, 10.5]]), 1.0);                                  // spine hinge
        K.press(g, K.slab(36, 0, 18, 19, 2, {lump:0.25, seed:4}), "#FFE9C2", {sheen:false, depth:1});   // page block edge
        for (const yy of [-5, -1.6, 1.8, 5.2]) K.groove(g, line([[28, yy], [44.5, yy]]), 0.5, {dark:"rgba(170,110,60,0.5)"});
        K.press(g, K.ball(-30, 0, 6.2, 6.2, {lump:0.2}), "yellow", {sheen:false});               // gold coin emblem
        K.text(g, "$", -30, 0.5, {size:8, font:"display", color:"orange", weight:900});
        K.text(g, "存摺", -2, 0.8, {size:14, font:"zh", color:"yellow", weight:900});
        K.groove(g, line([[-19, 7.8], [16, 7.8]]), 0.6, {light:"rgba(255,230,120,0.6)"});
      } }
  ]);
})();
