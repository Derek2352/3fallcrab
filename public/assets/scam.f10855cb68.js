/* items-scam.js — "too good to be true" scam items (deceptive physics) and the heavy debt ball and chain.
   Collision parts are convex and share their dimensions with the clay masses (tables below). */
(function(){
  "use strict";
  const line = pts => CLAY.poly(pts, false);
  const clip = (g, path, fn) => { g.save(); g.clip(path); fn(); g.restore(); };
  const R = (S, x, y, [px, py, w, h, r, ang]) => S.rect(x + px, y + py, w, h, Object.assign(r ? {r} : {}, ang ? {angle:ang} : {}));
  const C = (S, x, y, pts) => S.convex(x, y, pts);
  const ellPts = (cx, cy, rx, ry, n) => Array.from({length:n}, (_, i) => { const a = i / n * Math.PI * 2; return [cx + rx*Math.cos(a), cy + ry*Math.sin(a)]; });
  const GOLD = "#FFC83D", CARD = "#E8A25A", CARD_D = "#C9803E", HOT = "#FF4026";

  // ---- geometry (local units; origin = drawing origin) ----
  const COIN = 25;
  // hot tip: a zig-zag chart line (mitred joins) ending in an arrowhead. One outline for the art, matching convex
  // quads per segment + the head triangle + a round tail for the collision, so both agree exactly.
  const TIP = {pts: [[-40, 22], [-14, 0], [4, 12], [32, -16]], w: 10, headHalf: 11.5, headLen: 16.5};
  const tipGeo = (() => { const P = TIP.pts, h = TIP.w/2, n = P.length - 1;
    const dir = i => { const dx = P[i+1][0] - P[i][0], dy = P[i+1][1] - P[i][1], l = Math.hypot(dx, dy); return [dx/l, dy/l]; };
    const nrm = i => { const [dx, dy] = dir(i); return [-dy, dx]; };
    const L = [], Rt = [];
    for (let k = 0; k <= n; k++){ let m, len = h;
      if (k === 0) m = nrm(0); else if (k === n) m = nrm(n - 1);
      else { const a = nrm(k - 1), b = nrm(k); m = [a[0] + b[0], a[1] + b[1]]; const l = Math.hypot(m[0], m[1]); m = [m[0]/l, m[1]/l]; len = h / (m[0]*b[0] + m[1]*b[1]); }
      L.push([P[k][0] + m[0]*len, P[k][1] + m[1]*len]); Rt.push([P[k][0] - m[0]*len, P[k][1] - m[1]*len]); }
    const [ex, ey] = P[n], [dx, dy] = dir(n - 1), [nx, ny] = nrm(n - 1);
    const head = [[ex + nx*TIP.headHalf, ey + ny*TIP.headHalf], [ex + dx*TIP.headLen, ey + dy*TIP.headLen], [ex - nx*TIP.headHalf, ey - ny*TIP.headHalf]];
    const quads = Array.from({length:n}, (_, i) => [L[i], L[i+1], Rt[i+1], Rt[i]]);
    const [d0x, d0y] = dir(0), [n0x, n0y] = nrm(0), cap = [];
    for (let j = 1; j < 8; j++){ const a = Math.PI * j / 8; cap.push([P[0][0] - n0x*h*Math.cos(a) - d0x*h*Math.sin(a), P[0][1] - n0y*h*Math.cos(a) - d0y*h*Math.sin(a)]); }
    // outline: tail cap, left side, head, right side
    const outline = [...cap, ...L, head[0], head[1], head[2], ...Rt.slice().reverse()];
    return {head, quads, outline};
  })();
  const PARCEL = [0, 0, 62, 56, 5];
  // phishing hook: shank at x = +10, bend centred (0, 16), point arm at x = -10 ending in a sharp tip with the barb
  // carved out of the same piece of clay (notch on the inner side). An eye at the top, a line up to the bobber.
  const HOOK = {w: 7, top: -26, bend: [0, 16, 10], tip: [-11, -13], barb: [-1.5, 5], notch: [-6.5, -1],
                eye: [10, -29.5, 4.3], line: [10, -38.5, 1.8, 10], float: [10, -53, 10.5]};
  const hookGeo = (() => { const h = HOOK.w/2, [bx, by, br] = HOOK.bend, T = HOOK.tip, B = HOOK.barb, N = HOOK.notch;
    const arc = (r, a0, a1, n) => Array.from({length:n + 1}, (_, i) => { const a = a0 + (a1 - a0) * i / n; return [bx + r*Math.cos(a), by + r*Math.sin(a)]; });
    const near = (p, q, d) => { const dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy); return [p[0] + dx/l*d, p[1] + dy/l*d]; };   // keeps corners sharp
    const outerTop = [bx - br - h, -4];
    const outline = [[br - h, HOOK.top], ...arc(br - h, 0, Math.PI, 10),               // shank inner edge, inside of the bend
      [N[0], by - 6], near(N, [N[0], by], 0.7), N, near(N, B, 0.7),                      // up the point's inner edge into the notch
      near(B, N, 0.7), B, near(B, T, 0.7),                                               // barb tip
      near(T, B, 0.7), T, near(T, outerTop, 0.7),                                        // point tip
      outerTop, ...arc(br + h, Math.PI, 0, 14), [br + h, HOOK.top]];                     // outside of the bend, back up the shank
    const segs = Array.from({length:6}, (_, j) => { const d = Math.PI / 6, a0 = j*d, ro = (br + h) * 2 / (1 + Math.cos(d/4)), ri = (br - h) * 2 / (1 + Math.cos(d/2));
      return [...arc(ro, a0, a0 + d, 2), ...arc(ri, a0 + d, a0, 1)]; });
    const arm = [[bx - br - h, by], outerTop, T, N, [bx - br + h, by]];
    return {outline, segs, arm, barb: [T, B, N], shank: [bx + br, (HOOK.top + by)/2, HOOK.w, by - HOOK.top, 1]};
  })();
  const GIFT = {box: [0, 13, 60, 42, 4], lid: [0, -12, 68, 10, 3], loopL: ellPts(-14, -26, 14, 8, 12), loopR: ellPts(14, -26, 14, 8, 12), knot: [0, -24, 5.5]};
  const DEBT = {ball: [-14, 0, 28], links: [[19, 10, 6.5], [30, 15, 6.5], [41, 18, 6.5]], cuff: [56, 18, 10]};

  window.ITEM_DEFS = (window.ITEM_DEFS || []).concat([
    // ------------------------------------------------------------------ crypto coin
    { id: "cryptocoin", en: "“Guaranteed” crypto coin", zh: "保證賺加密幣", kind: "scam",
      note: "shiny coin with almost zero friction and a big bounce: skates and pings off the tower",
      make(x, y){ const S = CLAY.shape; return S.body([S.circle(x, y, COIN)], "slick", {restitution:0.7, density:0.0018}); },
      draw(g){ const K = CLAY; const coin = K.ball(0, 0, COIN, COIN, {lump:0.35, seed:11});
        K.blob(g, coin, GOLD, {sheen:{x:-9, y:-11, rx:7, ry:3.5}});
        K.groove(g, K.circle(0, 0, 19.5), 1.2);
        clip(g, coin, () => { for (let i = 0; i < 24; i++){ const a = i / 24 * Math.PI * 2; K.groove(g, line([[22*Math.cos(a), 22*Math.sin(a)], [25*Math.cos(a), 25*Math.sin(a)]]), 0.6); } });
        K.text(g, "100%", 0, -4, {size:10, font:"display", color:"purple", weight:900});
        K.text(g, "保證賺", 0, 8, {size:7.5, font:"zh", color:"red", weight:900});
        for (const [x, y, s] of [[17, -17, 4.5], [-19, 14, 3.2]]){                         // glinting sparkles
          K.press(g, K.poly([[x, y - s], [x + s*0.3, y - s*0.3], [x + s, y], [x + s*0.3, y + s*0.3], [x, y + s], [x - s*0.3, y + s*0.3], [x - s, y], [x - s*0.3, y - s*0.3]]), "white", {sheen:false, texture:0, depth:0.5, soft:0.8});
        }
      } },

    // ------------------------------------------------------------------ hot stock tip
    { id: "hottip", en: "“Hot” stock tip", zh: "貼士股", kind: "scam",
      note: "zig-zag rocket-up chart: spindly, top-heavy and slippery",
      make(x, y){ const S = CLAY.shape; const [tx, ty] = TIP.pts[0];
        const parts = tipGeo.quads.map(q => C(S, x, y, q)); parts.push(C(S, x, y, tipGeo.head), S.circle(x + tx, y + ty, TIP.w/2));
        return S.body(parts, "slick", {friction:0.08, frictionStatic:0.12, restitution:0.25, density:0.0016}); },
      draw(g){ const K = CLAY;
        const arrow = K.blobPoly(tipGeo.outline, {lump:0.35, seed:23, step:5});
        K.blob(g, arrow, HOT, {depth:2.6, soft:3.8, sheen:{x:-22, y:5, rx:7, ry:1.6}});
        // hot orange core stripe running up the line into the head
        const P = TIP.pts, end = [P[3][0] + (P[3][0] - P[2][0]) * 0.22, P[3][1] + (P[3][1] - P[2][1]) * 0.22];
        K.press(g, K.tube([[P[0][0] + 2.4, P[0][1] - 2], P[1], P[2], end], 3), "#FFB238", {sheen:false, texture:0, depth:0.6, soft:0.9});
        // $ coins riding the line
        for (const [x, y] of [[-27, 11], [-5, 6]]){
          K.press(g, K.ball(x, y, 4.7, 4.7, {lump:0.15, seed:x}), "yellow", {sheen:false});
          K.text(g, "$", x, y + 0.4, {size:7.5, font:"display", color:"red", weight:900});
        }
        // pressed "hot!" starburst badge on the final climb
        g.save(); g.translate(18.5, -2.5); g.rotate(-0.18);
        const burst = K.blobPoly(Array.from({length:24}, (_, i) => { const a = i * Math.PI / 12, r = i % 2 ? 6.9 : 8.6; return [r*Math.cos(a), r*Math.sin(a)]; }), {lump:0.15, seed:3, step:4});
        K.press(g, burst, "yellow", {sheen:false});
        K.text(g, "升", 0, 0.7, {size:12, font:"zh", color:"#D9161C", weight:900});
        g.restore();
      } },

    // ------------------------------------------------------------------ fake parcel
    { id: "fakeparcel", en: "Fake parcel SMS", zh: "假包裹短訊", kind: "scam",
      note: "looks like a solid box but bounces like rubber (restitution 0.85)",
      make(x, y){ const S = CLAY.shape; return S.body([R(S, x, y, PARCEL)], "slick", {friction:0.2, frictionStatic:0.3, restitution:0.85, density:0.0012}); },
      draw(g){ const K = CLAY; const [px, py, pw, ph, pr] = PARCEL;
        const box = K.slab(px, py, pw, ph, pr, {lump:1.0, seed:31});
        K.blob(g, box, CARD, {sheen:{x:-16, y:-17, rx:8, ry:3.5}});
        K.press(g, K.slab(0, -2, 13, ph - 2, 2, {lump:0.4, seed:5}), "yellow", {sheen:false, depth:1.2});    // tape
        K.text(g, "!!", 0, -17, {size:9, font:"display", color:"red", weight:900});
        K.groove(g, line([[-30, -10], [30, -10]]), 0.8, {dark:"rgba(120,60,20,0.45)"});
        g.save(); g.translate(-13, 12); g.rotate(-0.08);
        K.press(g, K.slab(0, 0, 26, 20, 2.5, {lump:0.4, seed:9}), "white", {sheen:false});                   // shipping label
        for (let i = 0; i < 7; i++) K.press(g, K.rrc(-9 + i * 2.8, -2, i % 3 ? 1.2 : 2, 9, 0.3), "black", {sheen:false, texture:0, depth:0.3, soft:0.4, rim:0});
        K.text(g, "HK??", 0, 6.5, {size:5.5, font:"display", color:"black", weight:900});
        g.restore();
        g.save(); g.translate(16, 14); g.rotate(0.2);
        K.press(g, K.ball(0, 0, 8.5, 8.5, {lump:0.3, seed:3}), "red", {sheen:false});
        K.text(g, "急", 0, 0.5, {size:10, font:"zh", color:"white", weight:900});
        g.restore();
      } },

    // ------------------------------------------------------------------ phishing hook
    { id: "phishhook", en: "Phishing link", zh: "釣魚連結", kind: "scam",
      note: "a big barbed fish hook under a bobber: the hook catches on whatever it lands on",
      make(x, y){ const S = CLAY.shape; const G = hookGeo;
        const parts = [R(S, x, y, G.shank), ...G.segs.map(q => C(S, x, y, q)), C(S, x, y, G.arm), C(S, x, y, G.barb),
          S.circle(x + HOOK.eye[0], y + HOOK.eye[1], HOOK.eye[2]), R(S, x, y, HOOK.line), S.circle(x + HOOK.float[0], y + HOOK.float[1], HOOK.float[2])];
        const b = S.body(parts, "metal", {density:0.002, friction:0.5});
        // the bobber and line are light plastic, so the metal hook is the heavy end (it hangs and snags hook-first)
        parts.slice(-2).forEach(q => window.Matter.Body.setDensity(q, 0.0005)); window.Matter.Body.setParts(b, parts, false);   // false keeps the existing hull (re-hulling here would offset it)
        return b; },
      draw(g){ const K = CLAY; const [ex, ey, er] = HOOK.eye, [fx, fy, fr] = HOOK.float;
        // one continuous piece of clay: shank, bend, point and barb
        const hook = K.blobPoly(hookGeo.outline, {lump:0.3, seed:19, step:4});
        K.blob(g, hook, "teal", {sheen:{x:7.5, y:-10, rx:1.6, ry:9}});
        // eye at the top of the shank
        K.blob(g, K.ball(ex, ey, er, er, {lump:0.15, seed:2}), "teal", {depth:1.6, soft:2.2, sheen:false});
        K.blob(g, K.ball(ex, ey - 0.4, 1.7, 1.7, {lump:0.05, n:9}), "#0D6B63", {depth:-1, soft:1.2, sheen:false, texture:0, rim:0.4});
        // fishing line threaded through the eye, up to the bobber
        K.press(g, K.tube([[ex, ey - 0.6], [ex + 0.5, ey - 6], [fx, fy + fr - 0.5]], 1.5), "black", {sheen:false, texture:0, depth:0.4, soft:0.6, rim:0});
        const bob = K.ball(fx, fy, fr, fr, {lump:0.3, seed:7});
        K.blob(g, bob, "white", {sheen:{x:fx - 4, y:fy - 5, rx:3, ry:2}});
        clip(g, bob, () => K.press(g, K.slab(fx, fy - 6, 26, 13, 1, {lump:0.2}), "pink", {sheen:false, depth:1}));
        K.groove(g, line([[fx - fr, fy], [fx + fr, fy]]), 0.9);
        K.text(g, "@", fx, fy + 5.2, {size:8, font:"display", color:"purple", weight:900});
        K.press(g, K.rrc(fx, fy - fr - 1.5, 3, 5, 1), "yellow", {sheen:false, texture:0});
      } },

    // ------------------------------------------------------------------ free gift
    { id: "freegift", en: "“Free” gift", zh: "免費禮物", kind: "scam",
      note: "gift box with a huge bow on top: top-heavy and wrapped in slippery foil",
      make(x, y){ const S = CLAY.shape;
        return S.body([R(S, x, y, GIFT.box), R(S, x, y, GIFT.lid), C(S, x, y, GIFT.loopL), C(S, x, y, GIFT.loopR), S.circle(x + GIFT.knot[0], y + GIFT.knot[1], GIFT.knot[2])], "slick", {friction:0.1, frictionStatic:0.15, restitution:0.2, density:0.0014}); },
      draw(g){ const K = CLAY;
        const [bx, by, bw, bh, br] = GIFT.box; const box = K.slab(bx, by, bw, bh, br, {lump:0.7, seed:41});
        K.blob(g, box, "purple", {sheen:{x:-16, y:2, rx:7, ry:3}});
        K.press(g, K.slab(0, by, 10, bh - 2, 1.5, {lump:0.2, seed:3}), "yellow", {sheen:false});                 // ribbon
        const [lx, ly, lw, lh, lr] = GIFT.lid; const lid = K.slab(lx, ly, lw, lh, lr, {lump:0.4, seed:42});
        K.blob(g, lid, "pink", {depth:2, soft:2.8, sheen:false});
        K.press(g, K.slab(0, ly, 10, lh - 1, 1.5, {lump:0.2, seed:4}), "yellow", {sheen:false});
        for (const L of [GIFT.loopL, GIFT.loopR]){ const loop = K.blobPoly(L, {lump:0.4, seed:L[0][0] + 9});
          K.blob(g, loop, "yellow", {depth:2.2, soft:3, sheen:false}); }
        K.groove(g, K.ellipse(-14, -26, 7, 3.5), 0.9); K.groove(g, K.ellipse(14, -26, 7, 3.5), 0.9);
        K.press(g, K.ball(0, -24, 5.5, 5.5, {lump:0.2, seed:6}), "orange", {sheen:false});
        g.save(); g.translate(17, 20); g.rotate(0.18);
        K.press(g, K.slab(0, 0, 22, 11, 2, {lump:0.3, seed:8}), "white", {sheen:false});
        K.text(g, "免費", 0, 0.5, {size:7.5, font:"zh", color:"red", weight:900});
        g.restore();
      } },

    // ------------------------------------------------------------------ debt
    { id: "debt", en: "Debt", zh: "債務", kind: "debt",
      note: "iron ball and chain, very heavy: crashes into the tower when you overspend",
      make(x, y){ const S = CLAY.shape;
        return S.body([S.circle(x + DEBT.ball[0], y + DEBT.ball[1], DEBT.ball[2]), ...DEBT.links.map(([lx, ly, lr]) => S.circle(x + lx, y + ly, lr)), S.circle(x + DEBT.cuff[0], y + DEBT.cuff[1], DEBT.cuff[2])], "metal", {density:0.012, friction:0.6, restitution:0.02}); },
      draw(g){ const K = CLAY;
        const [cx, cy, cr] = DEBT.cuff;
        const cuff = K.ball(cx, cy, cr, cr, {lump:0.3, seed:5});
        K.blob(g, cuff, "grey", {depth:2, soft:2.6, sheen:false});
        K.blob(g, K.ball(cx, cy, cr - 4.5, cr - 4.5, {lump:0.2, seed:6}), "#6B6680", {depth:-1.6, soft:2, sheen:false, rim:0.6});
        DEBT.links.forEach(([lx, ly, lr], i) => {
          K.blob(g, K.ball(lx, ly, lr, lr * (i % 2 ? 0.75 : 1), {lump:0.2, seed:lx}), "grey", {depth:1.6, soft:2.2, sheen:false});
          K.groove(g, K.ellipse(lx, ly, lr - 2.6, (lr - 2.6) * (i % 2 ? 0.45 : 0.75)), 1.1);
        });
        const [bx, by, br] = DEBT.ball; const ball = K.ball(bx, by, br, br, {lump:0.7, seed:13});
        K.blob(g, ball, "iron", {sheen:{x:bx - 10, y:by - 11, rx:7, ry:4}});
        K.press(g, K.ball(bx + 18, by + 9, 4.5, 4.5, {lump:0.1}), "grey", {sheen:false});        // chain staple
        K.text(g, "債", bx, by + 2, {size:27, font:"zh", color:"red", weight:900});
      } }
  ]);
})();
