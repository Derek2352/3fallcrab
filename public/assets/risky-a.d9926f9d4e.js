/* items-risky-a.js — loud, awkward "risky" spending: sport, music and gadgets, sculpted in bright plasticine.
   Collision parts are convex and share their dimensions with the clay masses (tables below),
   so what you see is what collides. Light from the top-left via CLAY.blob. */
(function(){
  "use strict";
  const ellPts = (cx, cy, rx, ry, n, a0 = 0) => Array.from({length:n}, (_, i) => { const a = a0 + i / n * Math.PI * 2; return [cx + rx*Math.cos(a), cy + ry*Math.sin(a)]; });
  const hexPts = (cx, cy, r) => Array.from({length:6}, (_, i) => { const a = Math.PI/6 + i * Math.PI/3; return [cx + r*Math.cos(a), cy + r*Math.sin(a)]; });
  const line = pts => CLAY.poly(pts, false);
  const clip = (g, path, fn) => { g.save(); g.clip(path); fn(); g.restore(); };
  const R = (S, x, y, [px, py, w, h, r, ang]) => S.rect(x + px, y + py, w, h, Object.assign(r ? {r} : {}, ang ? {angle:ang} : {}));

  // ---- geometry (local units; origin = drawing origin) ----
  const FB = 30;
  const RAC = {head: ellPts(-40, 0, 27, 21, 18), throat: [-8, 0, 12, 7, 2], shaft: [16, 0, 40, 5, 2], grip: [50, 0, 30, 10, 4]};
  const GTR = {low: [-44, 0, 26], up: [-14, 0, 20], neck: [31, 0, 50, 9, 2], head: [64, 0, 18, 14, 3]};
  const SK = {deck: [0, -7, 78, 9, 3], tail: [-45, -11, 22, 9, 3, 0.36], nose: [45, -11, 22, 9, 3, -0.36], truckL: [-30, 0.5, 18, 6, 2], truckR: [30, 0.5, 18, 6, 2], wheelL: [-30, 9, 8], wheelR: [30, 9, 8]};
  const CTL = {body: [0, -2, 66, 26, 10], gripL: [-26, 10, 15], gripR: [26, 10, 15]};
  // headphones: headband = arc (centre cx,cy, radius r, width w) from angle a0 to a1 (canvas angles, through the top),
  // split into n convex segments (outer edge follows the arc, inner edge a chord); cups = profile ovals at the arc ends
  const HP = {cx: 0, cy: 4, r: 31, w: 8, a0: Math.PI*170/180, a1: Math.PI*370/180, n: 6,
              cups: [-1, 1].map(s => ({s, x: 31*s, y: 18, shell: [33*s, 18, 8, 14], pad: [24.5*s, 18, 4.8, 12.2]}))};
  const arcPt = (a, rr) => [HP.cx + rr*Math.cos(a), HP.cy + rr*Math.sin(a)];
  const hpSegs = () => Array.from({length:HP.n}, (_, j) => { const d = (HP.a1 - HP.a0) / HP.n, s0 = HP.a0 + j*d, s1 = s0 + d;
    const ro = (HP.r + HP.w/2) * 2 / (1 + Math.cos(d/4)), ri = (HP.r - HP.w/2) * 2 / (1 + Math.cos(d/2));   // chords straddle the arcs
    return [arcPt(s0, ro), arcPt(s0 + d/2, ro), arcPt(s1, ro), arcPt(s1, ri), arcPt(s0, ri)]; });
  const CAM = {body: [-12, 2, 64, 44, 7], hump: [-16, -25, 24, 10, 3], lens: [33, 4, 28, 30, 4], rim: [50, 4, 7, 36, 3], btn: [6, -22, 10, 5, 2]};
  const DB = {plateL: [-38, 0, 21], plateR: [38, 0, 21], bar: [0, 0, 56, 8, 3], colL: [-20, 0, 6, 16, 2], colR: [20, 0, 6, 16, 2]};

  window.ITEM_DEFS = (window.ITEM_DEFS || []).concat([
    // ------------------------------------------------------------------ football
    { id: "football", en: "Football", zh: "足球", kind: "risky",
      note: "bouncy rubber ball, rolls off anything that isn't flat",
      make(x, y){ const S = CLAY.shape; return S.body([S.circle(x, y, FB)], "rubber", {restitution:0.5, friction:0.35, frictionStatic:0.5, density:0.0011}); },
      draw(g){ const K = CLAY; const ball = K.ball(0, 0, FB, FB, {lump:0.5, seed:3});
        K.blob(g, ball, "white", {sheen:{x:-11, y:-12, rx:7, ry:4.5}});
        // truncated-icosahedron panel layout seen face-on: a centre pentagon, five pentagons turning away round
        // the rim (squashed radially, one corner aimed at the centre), hexagons in between
        const dir = i => -Math.PI/2 + 0.12 + i*Math.PI*0.4;                 // directions of the centre pentagon's corners
        const RC = 10, D = 26.5, RO = 9.5, SQ = 0.72;
        const centre = Array.from({length:5}, (_, i) => [RC*Math.cos(dir(i)), RC*Math.sin(dir(i))]);
        const outer = i => { const a = dir(i), ux = Math.cos(a), uy = Math.sin(a);
          return Array.from({length:5}, (_, k) => { const f = Math.PI + k*Math.PI*0.4, r = D + RO*Math.cos(f)*SQ, t = RO*Math.sin(f);
            return [r*ux - t*uy, r*uy + t*ux]; }); };                     // corner 0 points at the centre; 1 and 4 flank it
        clip(g, ball, () => {
          for (let i = 0; i < 5; i++){ const o = outer(i), n = outer((i + 1) % 5);
            K.groove(g, line([centre[i], o[0]]), 1.25);                       // seam between two hexagons, centre corner -> outer pentagon
            K.groove(g, line([o[4], n[1]]), 1.25);                            // hexagon edge joining neighbouring pentagon corners
          }
          K.press(g, K.blobPoly(centre, {lump:0.25, seed:5}), "blue", {sheen:false});
          for (let i = 0; i < 5; i++) K.press(g, K.blobPoly(outer(i), {lump:0.25, seed:11 + i*7}), "blue", {sheen:false});
        });
      } },

    // ------------------------------------------------------------------ racket
    { id: "racket", en: "Badminton racket", zh: "羽毛球拍", kind: "risky",
      note: "long and light: oval head on a thin shaft, tips and slides off edges",
      make(x, y){ const S = CLAY.shape; return S.body([S.convex(x, y, RAC.head), R(S, x, y, RAC.throat), R(S, x, y, RAC.shaft), R(S, x, y, RAC.grip)], "plastic", {density:0.0011, friction:0.5}); },
      draw(g){ const K = CLAY;
        const [sx, sy, sw, sh] = RAC.shaft; K.blob(g, K.rrc(sx, sy, sw + 4, sh, 2), "grey", {sheen:false, depth:1.4, soft:2});
        const [tx, ty, tw, th] = RAC.throat; K.blob(g, K.slab(tx, ty, tw, th, 2, {lump:0.3}), "pink", {depth:1.6, soft:2.4, sheen:false});
        const head = K.blobPoly(RAC.head, {lump:0.6, seed:9});
        K.blob(g, head, "pink", {sheen:{x:-52, y:-12, rx:6, ry:3}});
        const strings = K.ball(-40, 0, 21.5, 15.5, {lump:0.3, seed:4});
        K.press(g, strings, "cream", {sheen:false, depth:1.2});
        clip(g, strings, () => {
          for (let xx = -60; xx <= -20; xx += 5) K.groove(g, line([[xx, -17], [xx, 17]]), 0.55, {dark:"rgba(120,60,80,0.45)"});
          for (let yy = -15; yy <= 15; yy += 5) K.groove(g, line([[-62, yy], [-18, yy]]), 0.55, {dark:"rgba(120,60,80,0.45)"});
        });
        const [gx, gy, gw, gh, gr] = RAC.grip; const grip = K.slab(gx, gy, gw, gh, gr, {lump:0.4, seed:2});
        K.blob(g, grip, "yellow");
        clip(g, grip, () => { for (let xx = gx - 16; xx < gx + 16; xx += 5) K.groove(g, line([[xx, gy - 6], [xx + 5, gy + 6]]), 0.9); });
        K.press(g, K.ball(gx + 14, gy, 2.6, 4.6, {lump:0.1}), "orange", {sheen:false, texture:0});
      } },

    // ------------------------------------------------------------------ guitar
    { id: "guitar", en: "Guitar", zh: "結他", kind: "risky",
      note: "figure-eight wooden body plus long neck; rocks on its curves and overhangs",
      make(x, y){ const S = CLAY.shape;
        return S.body([S.circle(x + GTR.low[0], y + GTR.low[1], GTR.low[2]), S.circle(x + GTR.up[0], y + GTR.up[1], GTR.up[2]), R(S, x, y, GTR.neck), R(S, x, y, GTR.head)], "wood", {density:0.0016}); },
      draw(g){ const K = CLAY;
        const [nx, ny, nw, nh] = GTR.neck, [hx, hy, hw, hh, hr] = GTR.head;
        const neck = K.slab(nx, ny, nw, nh, 2, {lump:0.3, seed:8});
        K.blob(g, neck, "brown", {sheen:false, depth:2, soft:3});
        for (let xx = nx - 20; xx <= nx + 22; xx += 7) K.groove(g, line([[xx, ny - 4], [xx, ny + 4]]), 0.7, {light:"rgba(255,230,160,0.7)"});
        const head = K.slab(hx, hy, hw, hh, hr, {lump:0.4, seed:12});
        K.blob(g, head, "red", {depth:2, soft:3, sheen:false});
        for (const [px, py] of [[hx - 5, hy - 9], [hx + 4, hy - 9], [hx - 5, hy + 9], [hx + 4, hy + 9]]) K.press(g, K.ball(px, py, 2.4, 2.4, {lump:0.1}), "yellow", {sheen:false, texture:0});
        const body = K.merge(K.ball(GTR.low[0], 0, GTR.low[2], GTR.low[2], {lump:0.5, seed:5}), K.ball(GTR.up[0], 0, GTR.up[2], GTR.up[2], {lump:0.5, seed:6}));
        K.blob(g, body, "orange", {sheen:{x:-52, y:-14, rx:8, ry:5}});
        K.press(g, K.ball(-4, 7, 9, 7, {lump:0.4, seed:2}), "pink", {sheen:false});          // pickguard
        K.press(g, K.ball(-20, 0, 10, 10, {lump:0.3, seed:7}), "yellow", {sheen:false});     // rosette
        K.blob(g, K.ball(-20, 0, 7, 7, {lump:0.2, seed:1}), "black", {sheen:false, depth:2.5, soft:3, texture:0.05});
        K.press(g, K.slab(-48, 0, 6, 18, 2, {lump:0.2}), "brown", {sheen:false});           // bridge
        g.save(); g.lineCap = "round"; g.strokeStyle = "rgba(255,248,230,0.95)"; g.lineWidth = 0.7;
        for (const yy of [-3, -1, 1, 3]){ g.beginPath(); g.moveTo(-48, yy); g.lineTo(hx - 8, yy * 0.8); g.stroke(); }
        g.restore();
      } },

    // ------------------------------------------------------------------ skateboard
    { id: "skateboard", en: "Skateboard", zh: "滑板", kind: "risky",
      note: "kicked deck on wheels; almost no grip, so it glides off the tower",
      make(x, y){ const S = CLAY.shape;
        return S.body([R(S, x, y, SK.deck), R(S, x, y, SK.tail), R(S, x, y, SK.nose), R(S, x, y, SK.truckL), R(S, x, y, SK.truckR),
          S.circle(x + SK.wheelL[0], y + SK.wheelL[1], SK.wheelL[2]), S.circle(x + SK.wheelR[0], y + SK.wheelR[1], SK.wheelR[2])],
          "plastic", {friction:0.05, frictionStatic:0.07, restitution:0.1, density:0.0015}); },
      draw(g){ const K = CLAY;
        for (const t of [SK.truckL, SK.truckR]){ K.blob(g, K.slab(t[0], t[1], t[2], t[3], 2, {lump:0.2}), "grey", {sheen:false, depth:1.4, soft:2}); }
        for (const w of [SK.wheelL, SK.wheelR]){ const wp = K.ball(w[0], w[1], w[2], w[2], {lump:0.2}); K.blob(g, wp, "yellow", {depth:1.8, soft:2.4, sheen:false});
          K.press(g, K.ball(w[0], w[1], 3, 3, {lump:0.05}), "lime", {sheen:false, texture:0}); }
        // deck: tail up-left, flat middle, nose up-right; centre line follows the three collision slabs
        const deck = K.tube([[-54.5, -14.8], [-36, -7.6], [0, -7], [36, -7.6], [54.5, -14.8]], 8.6);
        K.blob(g, deck, "pink", {depth:2, soft:2.8, sheen:{x:-20, y:-9, rx:9, ry:1.6}});
        const tape = K.tube([[-52, -16.2], [-36, -10.2], [0, -9.6], [36, -10.2], [52, -16.2]], 2.6);
        K.press(g, tape, "black", {sheen:false, depth:0.6, soft:1, texture:0.25});
        K.press(g, K.ball(0, -5.6, 5, 1.6, {lump:0.05}), "lime", {sheen:false, texture:0});
        K.press(g, K.ball(-13, -5.6, 3, 1.4, {lump:0.05}), "yellow", {sheen:false, texture:0});
        K.press(g, K.ball(13, -5.6, 3, 1.4, {lump:0.05}), "blue", {sheen:false, texture:0});
      } },

    // ------------------------------------------------------------------ controller
    { id: "controller", en: "Game controller", zh: "遊戲手掣", kind: "risky",
      note: "two round grips hanging below a flat top: rocks side to side",
      make(x, y){ const S = CLAY.shape;
        return S.body([R(S, x, y, CTL.body), S.circle(x + CTL.gripL[0], y + CTL.gripL[1], CTL.gripL[2]), S.circle(x + CTL.gripR[0], y + CTL.gripR[1], CTL.gripR[2])], "plastic", {density:0.0013}); },
      draw(g){ const K = CLAY; const [bx, by, bw, bh, br] = CTL.body;
        const shell = K.merge(K.slab(bx, by, bw, bh, br, {lump:0.6, seed:4}), K.ball(CTL.gripL[0], CTL.gripL[1], 15, 15, {lump:0.5, seed:2}), K.ball(CTL.gripR[0], CTL.gripR[1], 15, 15, {lump:0.5, seed:3}));
        K.blob(g, shell, "purple", {sheen:{x:-18, y:-10, rx:9, ry:3}});
        // d-pad
        const dp = K.merge(K.rrc(-22, -2, 13, 4.6, 1.4), K.rrc(-22, -2, 4.6, 13, 1.4));
        K.press(g, dp, "yellow", {sheen:false});
        // face buttons
        const btn = [[22, -8, "pink"], [28, -2, "green"], [22, 4, "blue"], [16, -2, "orange"]];
        for (const [x, y, c] of btn) K.press(g, K.ball(x, y, 2.9, 2.9, {lump:0.1}), c, {sheen:false, texture:0});
        // thumbsticks
        for (const xx of [-8, 8]){ K.press(g, K.ball(xx, 6, 4.6, 4.6, {lump:0.15}), "black", {sheen:false}); K.groove(g, K.circle(xx, 6, 2.4), 0.7); }
        K.press(g, K.rrc(0, -9, 8, 2.6, 1.2), "lime", {sheen:false, texture:0});
      } },

    // ------------------------------------------------------------------ headphones
    { id: "headphones", en: "Wireless headphones", zh: "無線耳機", kind: "risky",
      note: "an open arch on two ear cups: the arch hooks whatever lands on it",
      make(x, y){ const S = CLAY.shape; const parts = hpSegs().map(q => S.convex(x, y, q));
        for (const c of HP.cups) parts.push(S.convex(x, y, ellPts(...c.shell, 16)), S.convex(x, y, ellPts(...c.pad, 14)));
        return S.body(parts, "plastic", {density:0.0013, friction:0.6}); },
      draw(g){ const K = CLAY;
        const arc = (rr, b0, b1, n) => Array.from({length:n + 1}, (_, i) => arcPt(b0 + (b1 - b0) * i / n, rr));
        const band = K.tube(arc(HP.r, HP.a0, HP.a1, 28), HP.w);
        K.blob(g, band, "teal", {depth:2.4, soft:3.2, sheen:{x:-16, y:-25, rx:9, ry:2}});
        // padded cushion under the crown of the band, with stitch dents
        const padArc = arc(HP.r - 1.6, Math.PI*1.22, Math.PI*1.78, 12);
        K.press(g, K.tube(padArc, 4.6), "pink", {sheen:false, depth:1.1, soft:1.8});
        for (let i = 2; i < 12; i += 2) K.press(g, K.ball(padArc[i][0], padArc[i][1], 0.7, 0.7, {lump:0.02, n:8}), "#E2357F", {sheen:false, texture:0, rim:0});
        for (const c of HP.cups){ const {s} = c;
          const [px, py, prx, pry] = c.pad, [sx, sy, srx, sry] = c.shell;
          // ear cushion first (it bulges out of the inner face of the shell), then the hard shell
          const pad = K.ball(px, py, prx, pry, {lump:0.35, seed:px + 31});
          K.blob(g, pad, "purple", {depth:2, soft:2.6, sheen:{x:px - 1.5, y:py - 7, rx:1.4, ry:3}});
          for (const yy of [-6, 0, 6]) K.groove(g, line([[px - 1.6*s, py + yy], [px + 1.4*s, py + yy + 0.8]]), 0.7);   // tufted foam
          const shell = K.ball(sx, sy, srx, sry, {lump:0.45, seed:sx + 50});
          K.blob(g, shell, "pink", {sheen:{x:sx - 3, y:sy - 7, rx:2.4, ry:4.5}});
          K.groove(g, K.ellipse(sx + 2.5*s, sy, 3.6, 10), 0.9);                                   // outer plate seen edge-on
          K.press(g, K.ball(c.x, 4.8, 3.4, 2.6, {lump:0.1, seed:sx}), "yellow", {sheen:false});   // hinge where the band slides in
        }
        K.press(g, K.ball(-33.5, 26, 1.5, 1.5, {lump:0.02, n:8}), "lime", {sheen:false, texture:0});        // power light
      } },

    // ------------------------------------------------------------------ camera
    { id: "camera", en: "Camera with zoom lens", zh: "相機", kind: "risky",
      note: "boxy body with a long lens jutting out one side: front-heavy and lopsided",
      make(x, y){ const S = CLAY.shape;
        return S.body([R(S, x, y, CAM.body), R(S, x, y, CAM.hump), R(S, x, y, CAM.lens), R(S, x, y, CAM.rim), R(S, x, y, CAM.btn)], "metal", {density:0.0026, friction:0.55}); },
      draw(g){ const K = CLAY;
        const [lx, ly, lw, lh, lr] = CAM.lens, [rx, ry, rw, rh, rr] = CAM.rim;
        const lens = K.slab(lx, ly, lw, lh, lr, {lump:0.5, seed:3});
        K.blob(g, lens, "iron", {sheen:{x:lx - 6, y:ly - 9, rx:7, ry:2}});
        for (const xx of [lx - 6, lx + 1, lx + 8]) K.groove(g, line([[xx, ly - 13], [xx, ly + 13]]), 0.9, {light:"rgba(255,255,255,0.35)"});
        K.press(g, K.slab(lx - 4, ly, 6, lh - 3, 2, {lump:0.2}), "red", {sheen:false});            // zoom ring
        K.blob(g, K.slab(rx, ry, rw, rh, rr, {lump:0.3, seed:9}), "black", {depth:1.8, soft:2.4, sheen:false});
        K.press(g, K.ball(rx + 1.5, ry - 8, 1.4, 7, {lump:0.1}), "sky", {sheen:false, texture:0});   // glass glint
        const [bx, by, bw, bh, br] = CAM.body, [hx, hy, hw, hh, hr] = CAM.hump;
        K.blob(g, K.slab(hx, hy, hw, hh, hr, {lump:0.3, seed:5}), "yellow", {sheen:false, depth:2, soft:3});
        const body = K.slab(bx, by, bw, bh, br, {lump:0.8, seed:11});
        K.blob(g, body, "yellow", {sheen:{x:bx - 18, y:by - 13, rx:9, ry:4}});
        K.press(g, K.slab(bx, by + 6, bw - 4, 18, 3, {lump:0.4, seed:6}), "black", {sheen:false, texture:0.4});   // leatherette band
        K.press(g, K.ball(bx - 18, by - 10, 6, 4, {lump:0.2}), "white", {sheen:false});            // flash
        K.press(g, K.ball(bx + 16, by - 11, 3, 3, {lump:0.1}), "pink", {sheen:false, texture:0});
        const [tx, ty, tw, th, tr] = CAM.btn; K.press(g, K.rrc(tx, ty, tw, th, tr), "red", {sheen:false});
      } },

    // ------------------------------------------------------------------ dumbbell
    { id: "dumbbell", en: "Dumbbell", zh: "啞鈴", kind: "risky",
      note: "heavy iron: two hexagonal plates on a bar, rocks and rolls on its edges",
      make(x, y){ const S = CLAY.shape;
        return S.body([S.convex(x, y, hexPts(DB.plateL[0], DB.plateL[1], DB.plateL[2])), S.convex(x, y, hexPts(DB.plateR[0], DB.plateR[1], DB.plateR[2])),
          R(S, x, y, DB.bar), R(S, x, y, DB.colL), R(S, x, y, DB.colR)], "metal", {density:0.0042, friction:0.45}); },
      draw(g){ const K = CLAY;
        const [bx, by, bw, bh, br] = DB.bar; const bar = K.slab(bx, by, bw, bh, br, {lump:0.2, seed:2});
        K.blob(g, bar, "grey", {sheen:false, depth:1.6, soft:2.2});
        clip(g, bar, () => { for (let xx = -12; xx <= 12; xx += 3) K.groove(g, line([[xx, -4], [xx + 2, 4]]), 0.5); });
        for (const c of [DB.colL, DB.colR]) K.blob(g, K.slab(c[0], c[1], c[2], c[3], c[4], {lump:0.2}), "yellow", {sheen:false, depth:1.4, soft:2});
        for (const p of [DB.plateL, DB.plateR]){
          const plate = K.blobPoly(hexPts(p[0], p[1], p[2]), {lump:0.5, seed:p[0] + 99, step:7});
          K.blob(g, plate, "red", {sheen:{x:p[0] - 8, y:p[1] - 9, rx:5, ry:3}});
          K.groove(g, K.poly(hexPts(p[0], p[1], p[2] - 6)), 1);
          K.press(g, K.ball(p[0], p[1], 5, 5, {lump:0.1}), "iron", {sheen:false});
        }
        K.text(g, "10", DB.plateL[0], DB.plateL[1] + 11.5, {size:6.5, font:"display", color:"yellow", weight:900});
        K.text(g, "kg", DB.plateR[0], DB.plateR[1] + 11.5, {size:6.5, font:"display", color:"yellow", weight:900});
      } }
  ]);
})();
