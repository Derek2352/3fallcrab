/* items-risky-b.js — loud, awkward "risky" spending: fashion, food and gadgets, sculpted in bright plasticine.
   Collision parts are convex and share their dimensions with the clay masses (tables below). */
(function(){
  "use strict";
  const line = pts => CLAY.poly(pts, false);
  const clip = (g, path, fn) => { g.save(); g.clip(path); fn(); g.restore(); };
  const R = (S, x, y, [px, py, w, h, r, ang]) => S.rect(x + px, y + py, w, h, Object.assign(r ? {r} : {}, ang ? {angle:ang} : {}));
  const C = (S, x, y, pts) => S.convex(x, y, pts);
  const ellArc = (cx, cy, rx, ry, a0, a1, n) => Array.from({length:n + 1}, (_, i) => { const a = a0 + (a1 - a0) * i / n; return [cx + rx*Math.cos(a), cy + ry*Math.sin(a)]; });

  // ---- geometry (local units; origin = drawing origin) ----
  const BT = {cup: [[-25, -26], [25, -26], [19, 38], [-19, 38]],
              lid: [[-27, -25], [-25, -31], [-15, -36.5], [0, -38.5], [15, -36.5], [25, -31], [27, -25]],
              straw: [9, -47, 6, 22, 2, 0.26]};
  const HB = {body: [0, 10, 86, 50, 9], postL: [-24, -25, 8, 26, 3], postR: [24, -25, 8, 26, 3], bar: [0, -37, 56, 8, 4]};
  const SN = {sole: [0, 17, 106, 14, 6],
              upper: [[-53, 10], [22, 10], [10, -12], [-30, -26], [-53, -26]],
              toe: [[16, 10], [50, 10], [47, 1], [32, -4], [14, -2]]};
  const HH = {seat: [-30, -14, 20, 8, 3], sole: [2, 0, 74, 6, 3, 0.33], heel: [-35, 5, 5, 32, 1.5],
              toe: [[10, 3], [40, 10], [45, 17], [43, 21], [14, 21], [6, 13]]};
  const PH = [0, 0, 40, 86, 9];
  // banana: centre line on an arc (centre (0, cy), radius r) from angle -a to +a (0 = top of the hump); the width tapers
  // from ~4 at both ends to wMax mid-way. t = 0 at the blossom tip (left), t = 1 where the stem starts (right).
  const BANA = {r: 66, cy: 58, a: 0.84, wMax: 20, wEnd: 4, stem: 7.5, stemW: 5};
  const banW = t => BANA.wEnd + (BANA.wMax - BANA.wEnd) * Math.pow(Math.sin(Math.PI * Math.min(1, Math.max(0, t))), t < 0.5 ? 0.5 : 0.75);
  const banC = t => { const a = (t*2 - 1) * BANA.a; return [BANA.r*Math.sin(a), BANA.cy - BANA.r*Math.cos(a), Math.sin(a), -Math.cos(a)]; };  // x, y, outward normal
  const banAt = (t, f, pad = 0) => { const [x, y, nx, ny] = banC(t), h = banW(t)/2 * f + Math.sign(f) * pad; return [x + nx*h, y + ny*h]; };   // f = +1 top edge, -1 underside
  const banEdges = (t0, t1, n, pad = 0) => { const top = [], bot = []; for (let i = 0; i <= n; i++){ const t = t0 + (t1 - t0) * i / n; top.push(banAt(t, 1, pad)); bot.push(banAt(t, -1, pad)); } return {top, bot}; };
  const banStem = () => { const [x, y, nx, ny] = banC(1), tx = -ny, ty = nx, L = BANA.stem;       // continues along the tangent, curling up a touch
    return [[x - tx*1.5, y - ty*1.5], [x + tx*L*0.55, y + ty*L*0.55], [x + tx*L + nx*1.6, y + ty*L + ny*1.6]]; };
  function hull(pts){ const P = pts.map(q => [q[0], q[1]]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cr = (o, a, b) => (a[0] - o[0])*(b[1] - o[1]) - (a[1] - o[1])*(b[0] - o[0]); const lo = [], up = [];
    for (const q of P){ while (lo.length > 1 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
    for (const q of P.slice().reverse()){ while (up.length > 1 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
    return lo.slice(0, -1).concat(up.slice(0, -1)); }
  // collision: 8 convex slices that hug the tapering arc, plus the stem stub
  const BAN = Array.from({length:8}, (_, k) => { const e = banEdges(k/8, (k + 1)/8, 4, 0.4); return hull(e.top.concat(e.bot)); });   // +0.4 covers the clay rim
  const UM = {canopy: ellArc(0, -14, 48, 30, Math.PI, Math.PI*2, 10), shaft: [0, 13, 6, 54, 2], hook: [7, 41, 18, 6, 3], tip: [13.5, 35.5, 5, 13, 2], ferrule: [0, -46, 4, 6, 1.5]};
  const SG = {lensL: [-22, 4, 19, 15], lensR: [22, 4, 19, 15], bridge: [0, -4, 16, 5, 2], arm: [52, -7, 26, 4, 2]};
  const ellPts = (cx, cy, rx, ry, n) => Array.from({length:n}, (_, i) => { const a = i / n * Math.PI * 2; return [cx + rx*Math.cos(a), cy + ry*Math.sin(a)]; });

  const TEA = "#E9A86A", PEARL = "#4A2C2A";

  window.ITEM_DEFS = (window.ITEM_DEFS || []).concat([
    // ------------------------------------------------------------------ bubble tea
    { id: "bubbletea", en: "Daily bubble tea", zh: "每日珍珠奶茶", kind: "risky",
      note: "cup wider at the top than the bottom, domed lid and straw: top-heavy, tips easily",
      make(x, y){ const S = CLAY.shape; return S.body([C(S, x, y, BT.cup), C(S, x, y, BT.lid), R(S, x, y, BT.straw)], "plastic", {density:0.0015, friction:0.5}); },
      draw(g){ const K = CLAY;
        const [sx, sy, sw, sh, , sa] = BT.straw;
        g.save(); g.translate(sx, sy); g.rotate(sa);
        const straw = K.slab(0, 0, sw, sh + 2, 2.5, {lump:0.2, seed:4});
        K.blob(g, straw, "lime", {depth:1.4, soft:2, sheen:false});
        clip(g, straw, () => { for (let yy = -12; yy < 12; yy += 5) K.press(g, K.rrc(0, yy, 8, 2.2, 1), "pink", {sheen:false, texture:0, depth:0.6, soft:0.8}); });
        g.restore();
        const cup = K.blobPoly(BT.cup, {lump:0.7, seed:7});
        K.blob(g, cup, TEA, {sheen:{x:-12, y:-10, rx:4, ry:14}});
        const pearls = []; const r = K.rng(5);
        for (let i = 0; i < 14; i++){ const yy = 33 - (i % 3) * 6.2 - r()*1.5; const half = 17 - (33 - yy) * 0.1; pearls.push([-half + 3.5 + ((i * 7.7) % (2*half - 7)), yy]); }
        clip(g, cup, () => K.dots(g, pearls, 3.1, PEARL));
        K.press(g, K.slab(0, -6, 46, 13, 3, {lump:0.4, seed:3}), "pink", {sheen:false});
        K.text(g, "珍奶", 0, -5.5, {size:9, font:"zh", color:"white", weight:900});
        const lid = K.blobPoly(BT.lid, {lump:0.4, seed:9});
        K.blob(g, lid, "white", {sheen:{x:-9, y:-34, rx:6, ry:1.8}, depth:2.4, soft:3});
        K.groove(g, line([[-26, -26.5], [26, -26.5]]), 1);
      } },

    // ------------------------------------------------------------------ handbag
    { id: "handbag", en: "Designer handbag", zh: "名牌手袋", kind: "risky",
      note: "soft bag with a hollow arch handle that snags other items",
      make(x, y){ const S = CLAY.shape; return S.body([R(S, x, y, HB.body), R(S, x, y, HB.postL), R(S, x, y, HB.postR), R(S, x, y, HB.bar)], "fabric", {density:0.0013, friction:0.8}); },
      draw(g){ const K = CLAY;
        const handle = K.tube([[-24, -13], [-24, -31], [-18, -37], [18, -37], [24, -31], [24, -13]], 8);
        K.blob(g, handle, "purple", {depth:2.2, soft:3, sheen:{x:-8, y:-39, rx:7, ry:1.5}});
        for (const xx of [-24, 24]) K.press(g, K.ball(xx, -14, 5, 3.6, {lump:0.1}), "yellow", {sheen:false});
        const [bx, by, bw, bh, br] = HB.body; const body = K.slab(bx, by, bw, bh, br, {lump:0.9, seed:21});
        K.blob(g, body, "pink", {sheen:{x:-22, y:-4, rx:10, ry:4}});
        const flap = K.blobPoly([[-43, -15], [43, -15], [40, 4], [0, 13], [-40, 4]], {lump:0.5, seed:5});
        K.press(g, flap, "purple", {sheen:false, depth:1.8, soft:2.6});
        K.groove(g, line([[-38, -11], [37, -11]]), 0.7, {dark:"rgba(255,255,255,0.35)", light:"rgba(40,10,60,0.35)"});
        K.press(g, K.slab(0, 10, 13, 9, 3, {lump:0.2}), "yellow");                       // clasp
        K.groove(g, K.circle(0, 10, 2), 0.7);
        clip(g, body, () => { for (let xx = -38; xx <= 38; xx += 6) K.groove(g, line([[xx, 31], [xx + 2, 33]]), 0.6); });   // stitching
      } },

    // ------------------------------------------------------------------ sneaker
    { id: "sneaker", en: "Limited sneakers", zh: "限量波鞋", kind: "risky",
      note: "chunky sole with a tall heel collar and low toe: uneven top, nothing sits flat on it",
      make(x, y){ const S = CLAY.shape; return S.body([R(S, x, y, SN.sole), C(S, x, y, SN.upper), C(S, x, y, SN.toe)], "rubber", {restitution:0.18, friction:0.85, density:0.0013}); },
      draw(g){ const K = CLAY;
        const upper = K.merge(K.blobPoly(SN.upper, {lump:0.7, seed:3}), K.blobPoly(SN.toe, {lump:0.5, seed:4}));
        K.blob(g, upper, "blue", {sheen:{x:-34, y:-14, rx:9, ry:4}});
        K.press(g, K.blobPoly([[18, 9], [49, 9], [46, 1.5], [32, -3], [16, -1]], {lump:0.4, seed:8}), "white", {sheen:false});   // toe cap
        K.press(g, K.blobPoly([[-53, -26], [-41, -26], [-41, 8], [-53, 8]], {lump:0.3, seed:2}), "pink", {sheen:false});         // heel tab
        const bolt = K.poly([[-26, -8], [-12, -14], [-16, -5], [-2, -9], [-22, 4], [-17, -4]]);
        K.press(g, bolt, "yellow", {sheen:false});                                                                                 // generic lightning bolt
        g.save(); g.lineCap = "round";
        const lace = K.tube([[-6, -15], [3, -9], [-2, -6], [8, -2], [3, 1], [12, 3]], 2.2);
        K.press(g, lace, "yellow", {sheen:false, depth:0.6, soft:1, texture:0});
        g.restore();
        const [sx, sy, sw, sh, sr] = SN.sole; const sole = K.slab(sx, sy, sw, sh, sr, {lump:0.6, seed:9});
        K.blob(g, sole, "white", {depth:2.4, soft:3, sheen:false});
        K.press(g, K.slab(sx, sy + 3.5, sw - 4, 5, 2, {lump:0.3, seed:6}), "lime", {sheen:false, depth:0.9});
        clip(g, sole, () => { for (let xx = -48; xx <= 48; xx += 6) K.groove(g, line([[xx, sy + 1.5], [xx, sy + 6]]), 0.6); });
      } },

    // ------------------------------------------------------------------ high heels
    { id: "highheel", en: "High heels", zh: "高踭鞋", kind: "risky",
      note: "stands on a pin-thin heel and a toe; sloped top, very hard to build on",
      make(x, y){ const S = CLAY.shape; return S.body([R(S, x, y, HH.seat), R(S, x, y, HH.sole), R(S, x, y, HH.heel), C(S, x, y, HH.toe)], "plastic", {density:0.0016, friction:0.45}); },
      draw(g){ const K = CLAY;
        const [hx, hy, hw, hh] = HH.heel;
        K.blob(g, K.blobPoly([[hx - 3, hy - 16], [hx + 3, hy - 16], [hx + 1.8, hy + 16], [hx - 1.8, hy + 16]], {lump:0.15, seed:2, step:6}), "yellow", {depth:1.2, soft:1.6, sheen:false});
        const [ox, oy, ow, oh, or, oa] = HH.sole;
        g.save(); g.translate(ox, oy); g.rotate(oa); const soleP = K.slab(0, 0, ow, oh, or, {lump:0.3, seed:5}); g.restore();
        const m = new DOMMatrix().translate(ox, oy).rotate(oa * 180 / Math.PI); const sole = new Path2D(); sole.addPath(soleP, m);
        sole.bb = {x: ox - ow/2, y: oy - 14, w: ow, h: 28};
        const [sx, sy, sw, sh, sr] = HH.seat;
        const shoe = K.merge(K.slab(sx, sy, sw, sh, sr, {lump:0.3, seed:7}), sole, K.blobPoly(HH.toe, {lump:0.5, seed:3}));
        K.blob(g, shoe, "red", {sheen:{x:24, y:9, rx:8, ry:3}});
        K.press(g, K.tube([[-36, -17], [-14, -9], [8, -1]], 2.6), "black", {sheen:false, depth:0.6, soft:1, texture:0});   // insole edge
        // bow on the toe
        K.press(g, K.ball(22, 9, 5, 3.4, {lump:0.2, seed:1}), "pink", {sheen:false});
        K.press(g, K.ball(31, 9, 5, 3.4, {lump:0.2, seed:2}), "pink", {sheen:false});
        K.press(g, K.ball(26.5, 9, 2.6, 2.6, {lump:0.1}), "yellow", {sheen:false, texture:0});
      } },

    // ------------------------------------------------------------------ smartphone
    { id: "smartphone", en: "New phone on instalments", zh: "分期新手機", kind: "risky",
      note: "tall thin slippery glass slab: tips over and skates off",
      make(x, y){ const S = CLAY.shape; return S.body([R(S, x, y, PH)], "glass", {density:0.0026, friction:0.18, frictionStatic:0.25, restitution:0.08}); },
      draw(g){ const K = CLAY; const [px, py, pw, ph, pr] = PH;
        const caseP = K.slab(px, py, pw, ph, pr, {lump:0.5, seed:12});
        K.blob(g, caseP, "orange", {sheen:{x:-10, y:-30, rx:4, ry:8}});
        const screen = K.rrc(0, -2, 32, 66, 5);
        K.press(g, screen, "black", {sheen:false, depth:1, texture:0.05});
        clip(g, screen, () => {
          const apps = ["pink", "yellow", "teal", "lime", "purple", "sky", "red", "green", "orange"];
          apps.forEach((c, i) => K.press(g, K.rrc(-9 + (i % 3) * 9, -24 + Math.floor(i / 3) * 10, 6, 6, 1.6), c, {sheen:false, texture:0, depth:0.6, soft:0.8, rim:0.4}));
          g.save(); g.fillStyle = "rgba(255,255,255,0.18)"; g.beginPath(); g.moveTo(-16, -20); g.lineTo(-4, -35); g.lineTo(4, -35); g.lineTo(-16, -8); g.fill(); g.restore();
        });
        K.press(g, K.ball(0, -38.5, 2.2, 1.4, {lump:0.05}), "black", {sheen:false, texture:0});
        // instalment price sticker
        g.save(); g.translate(5, 22); g.rotate(-0.12);
        K.press(g, K.slab(0, 0, 26, 12, 3, {lump:0.3, seed:4}), "yellow", {sheen:false});
        K.text(g, "12期", 0, 0.5, {size:8, font:"zh", color:"red", weight:900});
        g.restore();
      } },

    // ------------------------------------------------------------------ banana
    { id: "banana", en: "Banana", zh: "香蕉", kind: "risky",
      note: "curved arc: rocks back and forth, nothing balances on its hump",
      make(x, y){ const S = CLAY.shape; const [[sx, sy], , [ex, ey]] = banStem();
        const stem = [(sx + ex)/2, (sy + ey)/2, Math.hypot(ex - sx, ey - sy), BANA.stemW - 1, 1.5, Math.atan2(ey - sy, ex - sx)];
        return S.body(BAN.map(q => C(S, x, y, q)).concat([R(S, x, y, stem)]), "food", {friction:0.55, density:0.0012}); },
      draw(g){ const K = CLAY; const BAN_Y = "#FFE14D";
        // brown stem first (its root tucks under the fruit), with a darker cut end
        const st = banStem(); K.blob(g, K.tube(st, BANA.stemW), "brown", {depth:1.4, soft:2, sheen:false});
        K.press(g, K.ball(st[2][0], st[2][1], 2.2, 2.2, {lump:0.1, n:9}), "#5E3A26", {sheen:false, texture:0.2, rim:0.4});
        const e = banEdges(0, 1, 40);
        const body = K.blobPoly(e.top.concat(e.bot.slice().reverse()), {lump:0.45, seed:17, step:6});
        K.blob(g, body, BAN_Y, {depth:3.2, soft:5.5, sheen:{x:-12, y:-13, rx:13, ry:2.2}});
        // two lengthwise ridges where the faces of the peel meet; they converge into the tapered ends
        for (const f of [0.34, -0.3]){ const pts = []; for (let i = 0; i <= 24; i++){ const t = 0.07 + 0.86 * i / 24; pts.push(banAt(t, f)); }
          K.groove(g, K.poly(pts, false), 0.85, {dark:"rgba(170,105,0,0.42)", light:"rgba(255,255,230,0.7)"}); }
        for (const [t, f, r] of [[0.3, 0.66, 1.3], [0.56, -0.64, 1], [0.72, 0.62, 1.4]]){ const [x, y] = banAt(t, f), a = (t*2 - 1) * BANA.a;   // sugar spots
          g.save(); g.translate(x, y); g.rotate(a); g.fillStyle = "rgba(122,74,38,0.75)"; g.beginPath(); g.ellipse(0, 0, r * 1.4, r * 0.8, 0, 0, 7); g.fill(); g.restore(); }
        // dark blossom tip
        const [tx, ty, tnx, tny] = banC(0); g.save(); g.translate(tx + tny*0.6, ty - tnx*0.6); g.rotate(-BANA.a);
        K.press(g, K.ball(0, 0, 2.6, 2.2, {lump:0.1, n:10, seed:4}), "#3A2A26", {sheen:false, texture:0.15}); g.restore();
      } },

    // ------------------------------------------------------------------ umbrella
    { id: "umbrella", en: "Umbrella", zh: "雨傘", kind: "risky",
      note: "dome canopy on a long shaft with a J hook that snags",
      make(x, y){ const S = CLAY.shape; return S.body([C(S, x, y, UM.canopy), R(S, x, y, UM.shaft), R(S, x, y, UM.hook), R(S, x, y, UM.tip), R(S, x, y, UM.ferrule)], "fabric", {density:0.0012, friction:0.6}); },
      draw(g){ const K = CLAY;
        const [sx, sy, sw, sh] = UM.shaft; K.blob(g, K.rrc(sx, sy, sw, sh, 2.5), "grey", {sheen:false, depth:1.2, soft:1.6});
        const hook = K.tube([[0, 33], [0, 41], [3, 44], [10, 44], [13.5, 41], [13.5, 30]], 6);
        K.blob(g, hook, "purple", {depth:1.6, soft:2.2, sheen:false});
        const [fx, fy, fw, fh] = UM.ferrule; K.press(g, K.rrc(fx, fy, fw, fh, 1.5), "yellow", {sheen:false});
        // canopy outline: the dome, then a hem of shallow scallops pulled up between the rib tips (inside the collision edge)
        const hem = []; for (let i = 3; i >= 0; i--) hem.push(...ellArc(-36 + i * 24, -14, 12, 2.2, Math.PI*2, Math.PI, 6).slice(i === 3 ? 1 : 0, -1));
        const canopy = K.blobPoly(UM.canopy.concat(hem), {lump:0.5, seed:5, step:7});
        K.blob(g, canopy, "pink", {sheen:{x:-22, y:-34, rx:9, ry:3}});
        // gores between the ribs: each rib is a meridian of the dome running from the ferrule down to its tip on the hem
        // (x = 48*c*sin(t), y = -14 - 30*cos(t)), so the coloured panels taper into the top like a real canopy
        const mer = (c, n = 12) => Array.from({length:n + 1}, (_, i) => { const t = Math.PI/2 * i / n; return [48*c*Math.sin(t), -14 - 30*Math.cos(t)]; });
        clip(g, canopy, () => {
          const ribs = [-1.4, -0.5, 0, 0.5, 1.4], cols = ["yellow", null, "sky", null];
          for (let i = 0; i < 4; i++){ if (!cols[i]) continue;
            const a = mer(ribs[i]), b = mer(ribs[i + 1]);
            const gore = K.poly([...a, [a[a.length - 1][0], -8], [b[b.length - 1][0], -8], ...b.reverse()]);
            K.press(g, gore, cols[i], {sheen:false, depth:1.4, soft:2});
          }
          for (const c of [-0.5, 0, 0.5]) K.groove(g, line(mer(c)), 0.8);
        });
        for (let i = 0; i <= 4; i++) K.press(g, K.ball(-48 + i * 24, -14.6, 1.7, 1.7, {lump:0.05, n:8}), "yellow", {sheen:false, texture:0});   // rib tips
      } },

    // ------------------------------------------------------------------ sunglasses
    { id: "sunglasses", en: "Designer sunglasses", zh: "名牌太陽眼鏡", kind: "risky",
      note: "two round lenses, a bridge and one arm: flat but bumpy and slippery",
      make(x, y){ const S = CLAY.shape;
        return S.body([C(S, x, y, ellPts(...SG.lensL, 14)), C(S, x, y, ellPts(...SG.lensR, 14)), R(S, x, y, SG.bridge), R(S, x, y, SG.arm)], "plastic", {density:0.0013, friction:0.3, frictionStatic:0.4}); },
      draw(g){ const K = CLAY;
        const [ax, ay, aw, ah] = SG.arm; K.blob(g, K.tube([[ax - aw/2 - 2, ay], [ax + aw/2 - 4, ay], [ax + aw/2, ay + 1.5]], ah + 0.5), "pink", {depth:1.2, soft:1.6, sheen:false});
        const frame = K.merge(K.ball(SG.lensL[0], SG.lensL[1], 19, 15, {lump:0.4, seed:3}), K.ball(SG.lensR[0], SG.lensR[1], 19, 15, {lump:0.4, seed:4}), K.rrc(0, -4, 16, 5, 2));
        K.blob(g, frame, "pink", {sheen:false});
        for (const L of [SG.lensL, SG.lensR]){
          const lens = K.ball(L[0], L[1], 14, 10.5, {lump:0.25, seed:L[0] + 7});
          K.press(g, lens, "purple", {sheen:false, depth:1.6, soft:2.2});
          clip(g, lens, () => { g.save(); g.fillStyle = "rgba(255,90,170,0.55)"; g.fillRect(L[0] - 16, L[1] + 1, 32, 12); g.restore(); });
          K.press(g, K.ball(L[0] - 5, L[1] - 4, 3.2, 1.8, {lump:0.05}), "white", {sheen:false, texture:0, rim:0});
        }
        K.press(g, K.ball(40, -6, 2.6, 2.6, {lump:0.05}), "yellow", {sheen:false, texture:0});
      } }
  ]);
})();
