/* items-hk.js — Hong Kong everyday spending, sculpted in bright plasticine: three calm "wise" bakery/lai see
   choices and three "risky" habits. Every collision part is convex and the clay masses are drawn from the same
   geometry tables, so the art and the physics outline agree. Light from the top-left (CLAY.blob). */
(function(){
  "use strict";
  // ---- local helpers (geometry shared by make() and draw()) ----
  const line = pts => CLAY.poly(pts, false);
  const clip = (g, path, fn) => { g.save(); g.clip(path); fn(); g.restore(); };
  const R = (S, x, y, [px, py, w, h, r, ang]) => S.rect(x + px, y + py, w, h, Object.assign(r ? {r} : {}, ang ? {angle:ang} : {}));
  const C = (S, x, y, pts) => S.convex(x, y, pts);
  const ellArc = (cx, cy, rx, ry, a0, a1, n) => Array.from({length:n + 1}, (_, i) => { const a = a0 + (a1 - a0) * i / n; return [cx + rx*Math.cos(a), cy + ry*Math.sin(a)]; });
  const shadeOver = (g, path, x0, x1, y0, y1, a) => clip(g, path, () => { g.fillStyle = "rgba(60,25,70," + a + ")"; g.fillRect(x0, y0, x1 - x0, y1 - y0); });

  // bakery + café colours not in the base palette (all saturated)
  const BREAD = "#DC8A34", CRUST = "#FFC94E", CRACK = "rgba(150,65,5,0.7)";
  const PASTRY = "#F3AE45", PASTRY_D = "#D98A2B", CUSTARD = "#FFD21F";
  const GOLD = "#FFD54A", LAISEE_D = "#D8302E";
  const MILKTEA = "#C98A4E", CAFE_GREEN = "#2FA25A";
  const SILVER = "#E3E6EE", GLASS = "#9ED8F5";
  const TILE = "#FFF4DC", TILE_BACK = "#2FA25A";

  // ---- geometry tables (local units, origin = drawing origin) ----
  // pineapple bun: one convex dome = top half of an ellipse closed by a flat, slightly narrower base
  const BUN = {dome: [[-39, 22], [39, 22]].concat(ellArc(0, 12, 43, 36, 0, -Math.PI, 14))};
  const LAISEE = [0, 0, 102, 18, 4];
  // egg tart: fluted shell (trapezoid, wider at the top) + low custard cap sitting in it
  const TART = {shell: [[-45, -6], [45, -6], [33, 17], [-33, 17]],
                cap: [[-41, -6], [41, -6], [35, -11], [19, -14.6], [0, -15.8], [-19, -14.6], [-35, -11]]};
  // milk tea: heavy café cup, wider at the rim; the cup outline includes the rim ellipse (centre y -32, rx 25, ry 5)
  const TEA = {cup: [[-19, 34], [19, 34], [25, -32]].concat(ellArc(0, -32, 25, 5, 0, -Math.PI, 6).slice(1, -1), [[-25, -32]]),
               handle: [[22, -21], [33, -22.5], [40, -16], [41.5, -6], [37.5, 4], [20.5, 7]]};
  const TAXI = {body: [0, 3, 104, 22, 7], cab: [[-31, -8], [33, -8], [21, -26], [-19, -26]], sign: [1, -30, 22, 8, 2.5],
                wheelL: [-30, 14, 9.5], wheelR: [32, 14, 9.5]};
  // three mahjong tiles stacked with a wobble; [cx, cy, w, h, r]
  const MJ = [[-4, 23, 52, 23, 4], [5, 0, 52, 23, 4], [-1, -23, 52, 23, 4]];

  window.ITEM_DEFS = (window.ITEM_DEFS || []).concat([
    // ------------------------------------------------------------------ pineapple bun
    { id: "polobun", en: "Pineapple bun", zh: "菠蘿包", kind: "wise",
      note: "an $8 bakery breakfast instead of café brunch: soft dome on a flat base, sits tight",
      make(x, y){ const S = CLAY.shape; return S.body([C(S, x, y, BUN.dome)], "food", {friction:0.85, frictionStatic:1.2, restitution:0.02, density:0.0016}); },
      draw(g){ const K = CLAY;
        const bread = K.blobPoly(BUN.dome, {lump:0.7, seed:7, step:6});
        K.blob(g, bread, BREAD, {sheen:false});
        // crumbly sugar crust over the dome, with a lumpy lower edge so the golden bread shows beneath
        const edge = []; for (let i = 0; i <= 12; i++){ const xx = -40 + i * 80 / 12; edge.push([xx, 9 + 1.6 * Math.sin(i * 2.1) + (i % 2 ? 1.2 : 0)]); }
        const crustPts = ellArc(0, 12, 41.5, 34.5, -0.12, -Math.PI + 0.12, 16).concat(edge);
        const crust = K.blobPoly(crustPts, {lump:0.9, seed:13, step:4});
        K.blob(g, crust, CRUST, {sheen:{x:-14, y:-14, rx:10, ry:5}, depth:3.4});
        // crackle: a jittered diamond grid of cracks (the classic checker of the topping), wrapped on the dome;
        // the cracks open onto the darker bread and every cell is a little puffed sugar biscuit
        const r = K.rng(29), s = 13, nodes = {};
        const node = (i, j) => { const k = i + "," + j; if (!nodes[k]){ const u = (i - j) * s * 0.6, v = -30 + (i + j) * s * 0.43;
          const bulge = 1 - Math.pow(Math.min(1, Math.abs(u) / 46), 2);                 // cells shrink over the shoulders
          nodes[k] = [u * (0.88 + 0.12 * bulge) + (r() - 0.5) * 4.4, v + (r() - 0.5) * 3.4 - 3 * bulge]; } return nodes[k]; };
        clip(g, crust, () => {
          for (let i = -5; i <= 9; i++) for (let j = -5; j <= 9; j++){                   // light on each cell's upper-left
            const q = [node(i, j), node(i + 1, j), node(i + 1, j + 1), node(i, j + 1)];
            const cx = (q[0][0] + q[1][0] + q[2][0] + q[3][0]) / 4, cy = (q[0][1] + q[1][1] + q[2][1] + q[3][1]) / 4;
            if (cy < -32 || cy > 14 || Math.abs(cx) > 46) continue;
            K.softSpot(g, null, K.ellipse(cx - 1.2, cy - 1.4, 3, 1.8), "rgba(255,250,215,0.75)", 2.2);
            K.softSpot(g, null, K.ellipse(cx + 1.5, cy + 2.2, 3.6, 1.2), "rgba(200,110,20,0.35)", 2);
          }
          for (let i = -5; i <= 10; i++){ const a = [], b = []; for (let j = -5; j <= 10; j++){ a.push(node(i, j)); b.push(node(j, i)); }
            for (const pl of [a, b]){ g.save(); g.lineCap = "round"; g.lineJoin = "round"; g.lineWidth = 2.6; g.strokeStyle = "rgba(214,128,40,0.95)"; g.stroke(line(pl)); g.restore();
              K.groove(g, line(pl), 1.2, {dark:CRACK, light:"rgba(255,245,200,0.75)"}); } }
          // sugar crumbs on the cells
          const rr = K.rng(5);
          for (let k = 0; k < 34; k++){ const xx = -36 + rr() * 72, yy = -22 + rr() * 30; if (yy < -24 + Math.pow(xx / 41, 2) * 30) continue;
            g.fillStyle = "rgba(255,252,230,0.95)"; g.beginPath(); g.arc(xx, yy, 0.45 + rr() * 0.4, 0, 7); g.fill(); }
        });
        K.groove(g, line([[-37, 19], [0, 20], [37, 19]]), 0.8, {dark:"rgba(140,70,10,0.35)"});   // base crease
      } },

    // ------------------------------------------------------------------ red packet
    { id: "laisee", en: "Red packet", zh: "利是", kind: "wise",
      note: "saving the lai see money: a flat red envelope, a perfect flat ledge",
      make(x, y){ const S = CLAY.shape; return S.body([R(S, x, y, LAISEE)], "card", {friction:0.88, frictionStatic:1.25, restitution:0.02, density:0.0016}); },
      draw(g){ const K = CLAY;
        const env = K.slab(...LAISEE, {lump:0.6, seed:43});
        K.blob(g, env, "red", {sheen:{x:-24, y:-4.5, rx:14, ry:2.2}});
        // envelope flap folded over the right end, edged in gold
        clip(g, env, () => {
          K.press(g, K.blobPoly([[52, -10], [34, 0], [52, 10]], {lump:0.2, seed:3, step:4}), LAISEE_D, {sheen:false, depth:1, texture:0.06});
          K.press(g, K.tube([[51, -9.5], [34.5, 0], [51, 9.5]], 1.6), GOLD, {sheen:false, texture:0, depth:0.5, soft:0.8, rim:0.4});
        });
        // gold double border along the long edges
        for (const yy of [-6.2, 6.2]) K.press(g, K.tube([[-45, yy], [30, yy]], 1.1), GOLD, {sheen:false, texture:0, depth:0.4, soft:0.7, rim:0});
        // gold coin disc with 福
        K.press(g, K.ball(-6, 0, 8.2, 8.2, {lump:0.15, seed:2}), GOLD, {sheen:{x:-8.5, y:-3, rx:2.5, ry:1.4}});
        K.groove(g, K.circle(-6, 0, 6.4), 0.55, {dark:"rgba(170,90,0,0.5)", light:"rgba(255,250,210,0.6)"});
        K.text(g, "福", -6, 0.6, {size:10.5, font:"zh", color:"red", weight:900});
        // small gold dots
        K.dots(g, [[-40, -2.5], [-34, 2.5], [-27, -2], [-20, 2.6], [8, -2.4], [15, 2.4], [22, -2], [-44, 3]], 1, GOLD);
      } },

    // ------------------------------------------------------------------ egg tart
    { id: "eggtart", en: "Egg tart", zh: "蛋撻", kind: "wise",
      note: "a cheap bakery treat: low wide tart on a flat base, very steady",
      make(x, y){ const S = CLAY.shape; return S.body([C(S, x, y, TART.shell), C(S, x, y, TART.cap)], "food", {friction:0.85, frictionStatic:1.2, restitution:0.02, density:0.0015}); },
      draw(g){ const K = CLAY;
        // glossy custard cap
        const cap = K.blobPoly(TART.cap, {lump:0.25, seed:5, step:5});
        K.blob(g, cap, CUSTARD, {sheen:{x:-14, y:-12, rx:9, ry:1.8}, depth:2.4, soft:3.4, texture:0.05});
        K.softSpot(g, cap, K.ellipse(18, -10.5, 6, 1.6), "rgba(255,255,255,0.8)", 2);               // small wet sheen
        K.softSpot(g, cap, K.ellipse(28, -8.5, 3.5, 1.4), "rgba(200,120,0,0.45)", 2);               // a faint caramel spot
        // fluted pastry shell
        const shell = K.blobPoly(TART.shell, {lump:0.6, seed:9, step:5});
        K.blob(g, shell, PASTRY, {sheen:{x:-20, y:-1, rx:9, ry:2}});
        shadeOver(g, shell, 20, 50, -10, 20, 0.1);
        clip(g, shell, () => {
          for (let i = -7; i <= 7; i++){ const xt = i * 6.1, xb = xt * 33 / 45;                  // flutes converge with the walls
            K.groove(g, line([[xt, -2], [xb, 15]]), 1.2, {dark:"rgba(150,70,0,0.42)", light:"rgba(255,235,170,0.65)"}); }
        });
        // crimped rim: a rolled pastry edge with scallops
        const rim = K.tube([[-44, -5.4], [-20, -5.8], [0, -5.9], [20, -5.8], [44, -5.4]], 5.2);
        K.press(g, rim, "#F8C25A", {sheen:{x:-18, y:-6.5, rx:10, ry:1}, depth:1.2, soft:1.8});
        for (let i = -7; i <= 7; i++) K.groove(g, line([[i * 6.1 + 3, -8], [i * 6.1 + 3, -3.2]]), 0.7, {dark:"rgba(170,85,0,0.5)"});
        K.groove(g, line([[-32, 15.5], [32, 15.5]]), 0.8, {dark:"rgba(150,70,0,0.4)"});               // baked foot
        K.softSpot(g, shell, K.ellipse(0, 16, 30, 2.4), "rgba(170,80,0,0.4)", 2.5);
      } },

    // ------------------------------------------------------------------ milk tea
    { id: "milktea", en: "Daily milk tea", zh: "絲襪奶茶", kind: "risky",
      note: "a daily tea-café habit adds up: heavy cup, wider at the rim, handle sticking out, slick glaze",
      make(x, y){ const S = CLAY.shape; return S.body([C(S, x, y, TEA.cup), C(S, x, y, TEA.handle)], "glass", {density:0.0022, friction:0.35, frictionStatic:0.5, restitution:0.06}); },
      draw(g){ const K = CLAY;
        // handle loop (hole in the art; the collision hull fills it)
        const hp = ellArc(28, -7.5, 9.5, 10.5, -Math.PI * 0.72, Math.PI * 0.62, 12); hp.unshift([21.5, -17]); hp.push([21, 2.5]);
        const handle = K.tube(hp, 6.2);
        K.blob(g, handle, "white", {depth:1.8, soft:2.4, sheen:{x:33, y:-16, rx:2.5, ry:1.4}});
        // cup body (trapezoid part of the outline)
        const body = K.blobPoly([[-19, 34], [19, 34], [25, -32], [-25, -32]], {lump:0.6, seed:17, step:6});
        K.blob(g, body, "white", {sheen:{x:-13, y:-6, rx:3.5, ry:16}});
        shadeOver(g, body, 9, 30, -40, 40, 0.07);
        clip(g, body, () => {
          K.press(g, K.tube([[-30, -21.5], [30, -21.5]], 3.4), CAFE_GREEN, {sheen:false, depth:0.9, soft:1.3, texture:0.06});
          K.press(g, K.tube([[-30, -16.2], [30, -16.2]], 1.2), CAFE_GREEN, {sheen:false, depth:0.5, soft:0.8, texture:0, rim:0});
          K.press(g, K.tube([[-30, 27.5], [30, 27.5]], 1.4), CAFE_GREEN, {sheen:false, depth:0.5, soft:0.8, texture:0, rim:0});
        });
        K.groove(g, line([[-18, 32], [18, 32]]), 0.7, {dark:"rgba(80,60,110,0.35)"});
        // rim ellipse with the milk tea surface inside
        const rimP = K.ellipse(0, -32, 25, 5);
        K.press(g, rimP, "white", {sheen:false, depth:0.8, soft:1.4});
        const tea = K.ellipse(0, -31.6, 21.5, 3.5);
        K.blob(g, tea, MILKTEA, {sheen:{x:-8, y:-32.6, rx:5, ry:0.9}, depth:1, soft:1.6, texture:0.04, rim:0.6});
        K.inner(g, tea, "rgba(90,40,10,0.55)", 1.6, 0.6, 1);
        K.softSpot(g, tea, K.ellipse(6, -31, 6, 1.2), "rgba(255,230,190,0.6)", 1.5);           // swirl of evaporated milk
      } },

    // ------------------------------------------------------------------ taxi
    { id: "taxi", en: "Taxi rides", zh: "的士", kind: "risky",
      note: "taking taxis everywhere: a toy cab on two round wheels, rolls off and won't stay put",
      make(x, y){ const S = CLAY.shape;
        return S.body([R(S, x, y, TAXI.body), C(S, x, y, TAXI.cab), R(S, x, y, TAXI.sign),
          S.circle(x + TAXI.wheelL[0], y + TAXI.wheelL[1], TAXI.wheelL[2]), S.circle(x + TAXI.wheelR[0], y + TAXI.wheelR[1], TAXI.wheelR[2])],
          "plastic", {friction:0.18, frictionStatic:0.25, restitution:0.1, density:0.0015}); },
      draw(g){ const K = CLAY;
        // silver cabin with windows
        const cab = K.blobPoly(TAXI.cab, {lump:0.4, seed:11, step:6});
        K.blob(g, cab, SILVER, {sheen:{x:-8, y:-23, rx:10, ry:1.6}, depth:2.4, soft:3.4});
        const winR = K.blobPoly([[4, -10], [28, -10], [19.5, -23], [4, -23]], {lump:0.2, seed:4, step:4});
        const winL = K.blobPoly([[-27, -10], [0, -10], [0, -23], [-17, -23]], {lump:0.2, seed:5, step:4});
        for (const w of [winL, winR]){ K.press(g, w, GLASS, {sheen:false, depth:1.1, soft:1.6}); }
        for (const [x0, x1] of [[-14, -9], [10, 15]]) K.press(g, K.tube([[x0, -12], [x1 + 3, -21]], 1.6), "white", {sheen:false, texture:0, depth:0.3, soft:0.6, rim:0});
        // roof sign
        const [sx, sy, sw, sh, sr] = TAXI.sign;
        K.blob(g, K.slab(sx, sy, sw, sh, sr, {lump:0.2, seed:3}), "cream", {depth:1.2, soft:1.8, sheen:false});
        K.text(g, "的士", sx, sy + 0.5, {size:6.4, font:"zh", color:"red", weight:900});
        // red lower body
        const [bx, by, bw, bh, br] = TAXI.body;
        const body = K.slab(bx, by, bw, bh, br, {lump:0.6, seed:21});
        K.blob(g, body, "red", {sheen:{x:-26, y:-3, rx:14, ry:2.4}});
        K.groove(g, line([[2, -7], [2, 9]]), 0.9);                                                       // door seams
        K.groove(g, line([[-27, -7], [-27, 9]]), 0.9);
        for (const xx of [-8, 19]) K.press(g, K.rrc(xx, -2.5, 6, 2, 1), SILVER, {sheen:false, texture:0, depth:0.4, soft:0.7});   // door handles
        K.press(g, K.slab(48.5, 3.5, 6, 6, 2, {lump:0.1}), "yellow", {sheen:{x:47.5, y:2, rx:1.4, ry:1}});        // headlight
        K.press(g, K.slab(-49.5, 0.5, 4, 5, 1.5, {lump:0.1}), "orange", {sheen:false});                             // tail light
        K.press(g, K.slab(0, 11.5, 102, 4, 2, {lump:0.3, seed:6}), "grey", {sheen:false, depth:0.9, soft:1.4});     // bumper sill
        // wheel arches + wheels
        for (const w of [TAXI.wheelL, TAXI.wheelR]){
          clip(g, body, () => K.inner(g, K.ellipse(w[0], w[1] - 1, w[2] + 2.2, w[2] + 1.6), "rgba(70,10,20,0.75)", 2.2, -0.4, -0.8));
          const wp = K.ball(w[0], w[1], w[2], w[2], {lump:0.25, seed:w[0] + 50});
          K.blob(g, wp, "black", {depth:1.8, soft:2.6, sheen:{x:w[0] - 3, y:w[1] - 4, rx:2.4, ry:1.4}});
          K.press(g, K.ball(w[0], w[1], 4, 4, {lump:0.1}), "grey", {sheen:false, texture:0});
          K.press(g, K.ball(w[0], w[1], 1.4, 1.4, {lump:0.05}), "white", {sheen:false, texture:0, rim:0});
        }
      } },

    // ------------------------------------------------------------------ mahjong tiles
    { id: "mahjong", en: "Mahjong night", zh: "麻雀", kind: "risky",
      note: "small gambles add up: three slick tiles stacked off-centre, wobbly and slides about",
      make(x, y){ const S = CLAY.shape; return S.body(MJ.map(t => R(S, x, y, t)), "plastic", {density:0.0018, friction:0.35, frictionStatic:0.5, restitution:0.08}); },
      draw(g){ const K = CLAY;
        MJ.forEach(([cx, cy, w, h, r], i) => {
          // green back layer, cream face pressed on it (back shows along the bottom and right edges)
          K.blob(g, K.slab(cx, cy, w, h, r, {lump:0.4, seed:61 + i}), TILE_BACK, {sheen:false, depth:2, soft:3});
          const face = K.slab(cx - 1.6, cy - 2.4, w - 4.4, h - 5.2, r - 1, {lump:0.35, seed:71 + i});
          K.blob(g, face, TILE, {sheen:{x:cx - 14, y:cy - 7, rx:8, ry:1.6}, depth:2, soft:3});
          const fx = cx - 1.6, fy = cy - 2.4;
          if (i === 0){                                                                                  // red dragon 中
            K.text(g, "中", fx, fy + 0.8, {size:15, font:"zh", color:"red", weight:900, deboss:true});
          } else if (i === 1){                                                                           // three dots
            [[-13, -3.2, "blue"], [0, 0, "red"], [13, 3.2, "green"]].forEach(([dx, dy, c]) => {
              K.press(g, K.ball(fx + dx, fy + dy, 4, 4, {lump:0.1}), c, {sheen:false, texture:0});
              K.groove(g, K.circle(fx + dx, fy + dy, 2.2), 0.6, {light:"rgba(255,255,255,0.75)"});
              K.press(g, K.ball(fx + dx, fy + dy, 1, 1, {lump:0.02, n:8}), TILE, {sheen:false, texture:0, rim:0}); });
          } else {                                                                                       // bamboo sticks
            [-10.5, -3.5, 3.5, 10.5].forEach((dx, k) => {
              const st = K.rrc(fx + dx, fy, 3.4, 13, 1.6);
              K.press(g, st, k === 1 ? "red" : "green", {sheen:false, texture:0, depth:0.7, soft:1});
              K.groove(g, line([[fx + dx - 1.5, fy], [fx + dx + 1.5, fy]]), 0.6, {light:"rgba(255,255,255,0.7)"}); });
          }
        });
      } }
  ]);
})();
