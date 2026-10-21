/* items-jackpot.js — the Jackpot crab: a rare item that looks like the game's logo crab. Its two raised claws make a
   cradle, and its two eyes on stalks catch whatever drops in, so the claws hold it there. Every collision part is
   convex and the clay is drawn from the same numbers, so the art and the physics outline agree. */
(function(){
  "use strict";
  const ellPts = (cx, cy, rx, ry, n) => Array.from({length:n}, (_, i) => { const a = i / n * Math.PI * 2; return [cx + rx*Math.cos(a), cy + ry*Math.sin(a)]; });
  // convex hull (monotone chain) of a point list: a claw is a big lobe plus a smaller one, as one convex part
  function hull(pts){
    const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]), cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], up = [];
    for (const q of p){ while (lo.length > 1 && cross(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
    for (const q of p.reverse()){ while (up.length > 1 && cross(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
    return lo.slice(0, -1).concat(up.slice(0, -1));
  }
  const line = pts => CLAY.poly(pts, false);

  // ---- geometry (local units, origin = drawing origin). sx = -1 left, +1 right ----
  const SHELL = {cx: 0, cy: 14, rx: 40, ry: 22};
  const FOOT = sx => [sx * 40, 37, 30, 7, 3];                              // the leg tips, as one flat foot a side
  const ARM = sx => [sx * 47, -12, 11, 44, 4, sx * 0.42];                   // shell side up and out to the claw
  const CLAW = sx => ({big: [sx * 58, -40, 15, 13], thumb: [sx * 65.6, -53, 8.5, 9.5]});
  const clawHull = sx => { const c = CLAW(sx); return hull(ellPts(...c.big, 16).concat(ellPts(...c.thumb, 12))); };
  const STALK = sx => [sx * 12, -16, 6, 22, 2, sx * 0.12];
  const EYE = sx => [sx * 14, -32, 8.5];

  window.ITEM_DEFS = (window.ITEM_DEFS || []).concat([
    { id: "jackpotcrab", en: "Jackpot crab", zh: "大獎蟹", kind: "wise", jackpot: true,
      note: "the logo crab: claws raised either side make a cradle, the eyes catch what drops in; wide feet, very steady",
      make(x, y){ const S = CLAY.shape;
        const r = ([px, py, w, h, rr, ang]) => S.rect(x + px, y + py, w, h, Object.assign({r: rr}, ang ? {angle: ang} : {}));
        const parts = [S.convex(x, y, ellPts(SHELL.cx, SHELL.cy, SHELL.rx, SHELL.ry, 20))];
        for (const sx of [-1, 1]){
          const [ex, ey, er] = EYE(sx);
          parts.push(r(FOOT(sx)), r(ARM(sx)), S.convex(x, y, clawHull(sx)), r(STALK(sx)), S.convex(x, y, ellPts(ex, ey, er, er, 14)));
        }
        return S.body(parts, "plastic", {friction:0.85, frictionStatic:1.2, restitution:0.03, density:0.0016}); },
      draw(g){ const K = CLAY;
        // legs (behind): three a side, their tips forming the feet
        for (const sx of [-1, 1]) for (let i = 0; i < 3; i++)
          K.blob(g, K.tube([[sx * (22 + i*8), 26], [sx * (32 + i*9), 34], [sx * (34 + i*9.5), 39]], 6), "orange", {depth:1.2, soft:1.8, sheen:false, rim:0.6});
        // arms and claws, raised like the logo
        for (const sx of [-1, 1]){
          K.blob(g, K.tube([[sx * 36, 10], [sx * 46, -10], [sx * 55, -30]], 11), "orange", {depth:1.6, soft:2.2, sheen:false});
          const c = CLAW(sx), pinch = K.merge(K.ball(...c.big, {lump:0.3, seed:sx + 4}), K.ball(...c.thumb, {lump:0.2, seed:sx + 8}));
          K.blob(g, pinch, "red", {depth:2.2, soft:3, sheen:{x: sx * 58 - 5, y: -46, rx: 4, ry: 2.5}});
          K.groove(g, line([[sx * 52, -47], [sx * 58, -51], [sx * 62, -47]]), 1.1);   // where the pincer opens
        }
        // eye stalks, then the shell over their roots
        for (const sx of [-1, 1]) K.blob(g, K.tube([[sx * 10, -4], [sx * 13, -26]], 6), "red", {depth:1, soft:1.6, sheen:false, rim:0.6});
        const shell = K.ball(SHELL.cx, SHELL.cy, SHELL.rx, SHELL.ry, {lump:0.6, seed:9});
        K.blob(g, shell, "red", {sheen:{x:-15, y:3, rx:12, ry:5}});
        // the jackpot: a gold coin pressed into the shell
        K.press(g, K.ball(0, 3, 7.5, 7.5, {lump:0.15, n:16}), "yellow", {sheen:false, depth:1.4});
        K.groove(g, K.ball(0, 3, 5, 5, {lump:0.1, n:14}), 0.6);
        K.text(g, "$", 0, 3.4, {size:8, font:"display", color:"orange", weight:900});
        // happy face, as on the logo
        K.groove(g, line([[-10, 20], [0, 26], [10, 20]]), 1.6);
        for (const sx of [-1, 1]) K.press(g, K.ball(sx * 24, 18, 5.5, 3.6, {lump:0.05}), "pink", {sheen:false, texture:0});
        for (const sx of [-1, 1]){ const [ex, ey, er] = EYE(sx); K.eye(g, ex, ey, er, 0, -0.4); }
      } }
  ]);
})();
