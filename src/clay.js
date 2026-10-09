/* CLAY — shared drawing + shape kit for 3 Fall Fun (v3 "Clay Tower").
   Look: a bright stop-motion plasticine diorama. Every object is a squished lump of
   saturated modelling clay lit from the top-left: soft inner shading, a rim of light,
   a soft specular sheen, faint fingerprint texture, lumpy hand-made outlines, carved
   grooves and pressed-on details. Items, board and previews all draw through this file.
   Drawing runs once per item into a cached sprite, so the soft effects are affordable. */
(function(){
  "use strict";
  // Saturated plasticine palette (vibrant — this is a fun minigame)
  const C = {
    pink:   "#FF5FA2", yellow: "#FFC83D", blue:  "#3A9BF0", green: "#4CC36A",
    orange: "#FF7B35", purple: "#8B6CF2", red:   "#F2463E", teal:  "#20C1B3",
    lime:   "#B5E04A", sky:    "#7FD3FF", cream: "#FFF1DA", white: "#FFFDF7",
    brown:  "#9A6440", tan:    "#E8B07A", grey:  "#A2ABBE", iron: "#4A4658",
    black:  "#2E2838"
  };
  const FONTS = {
    display: '"Gluten","Arial Rounded MT Bold","Trebuchet MS",sans-serif',
    zh:      '"LXGW WenKai TC","Noto Sans HK","PingFang HK","Microsoft JhengHei",sans-serif',
    sans:    '"Noto Sans HK","PingFang HK","Microsoft JhengHei",sans-serif',
    dot:     '"DotGothic16","Courier New",monospace'
  };
  const col = c => C[c] || c;

  // ---------- colour maths ----------
  function hex2rgb(h){ h = col(h).replace("#", ""); if (h.length === 3) h = h.split("").map(x => x + x).join("");
    const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
  function rgb2hex(r, g, b){ return "#" + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join(""); }
  // shade(c, -0.3) = 30% darker (towards a warm dark, not grey); shade(c, 0.3) = 30% lighter
  function shade(c, amt){
    const [r, g, b] = hex2rgb(c);
    if (amt < 0){ const t = -amt; return rgb2hex(r*(1-t) + 40*t, g*(1-t) + 20*t, b*(1-t) + 50*t); }
    return rgb2hex(r + (255 - r)*amt, g + (255 - g)*amt, b + (255 - b)*amt);
  }
  function rgba(c, a){ const [r, g, b] = hex2rgb(c); return "rgba(" + r + "," + g + "," + b + "," + a + ")"; }

  // ---------- seeded randomness (deterministic art) ----------
  function rng(seed){ let s = (Math.abs(Math.floor(seed)) % 2147483646) + 1; return () => (s = (s * 16807) % 2147483647) / 2147483647; }

  // ---------- path builders (Path2D with a .bb bounding box) ----------
  function withBB(p, x, y, w, h){ p.bb = {x, y, w, h}; return p; }
  function bbOf(pts){ let a = Infinity, b = Infinity, c = -Infinity, d = -Infinity;
    for (const q of pts){ const x = q.x ?? q[0], y = q.y ?? q[1]; a = Math.min(a, x); b = Math.min(b, y); c = Math.max(c, x); d = Math.max(d, y); }
    return {x:a, y:b, w:c - a, h:d - b}; }
  // densify a closed polygon so lumps can form along long edges
  function densify(pts, step){
    const out = [];
    for (let i = 0; i < pts.length; i++){
      const a = pts[i], b = pts[(i + 1) % pts.length];
      const ax = a.x ?? a[0], ay = a.y ?? a[1], bx = b.x ?? b[0], by = b.y ?? b[1];
      const n = Math.max(1, Math.round(Math.hypot(bx - ax, by - ay) / step));
      for (let k = 0; k < n; k++) out.push({x: ax + (bx - ax)*k/n, y: ay + (by - ay)*k/n, corner: k === 0});
    }
    return out;
  }
  // lumpy: smooth closed outline through pts with hand-made wobble. lump = max offset in units.
  function lumpy(pts, lump = 1.2, seed = 7, step = 10){
    const r = rng(seed); const d = densify(pts, step);
    let cx = 0, cy = 0; d.forEach(p => { cx += p.x; cy += p.y; }); cx /= d.length; cy /= d.length;
    const j = d.map(p => { const dx = p.x - cx, dy = p.y - cy, L = Math.hypot(dx, dy) || 1, o = (r() - 0.5) * 2 * lump;
      return {x: p.x + dx / L * o, y: p.y + dy / L * o}; });
    const p = new Path2D(); const n = j.length; const mid = (a, b) => ({x:(a.x + b.x)/2, y:(a.y + b.y)/2});
    const s = mid(j[n - 1], j[0]); p.moveTo(s.x, s.y);
    for (let i = 0; i < n; i++){ const a = j[i], m = mid(a, j[(i + 1) % n]); p.quadraticCurveTo(a.x, a.y, m.x, m.y); }
    p.closePath(); const bb = bbOf(pts); return withBB(p, bb.x, bb.y, bb.w, bb.h);
  }
  function rrPts(x, y, w, h, r, seg = 4){
    r = Math.max(0, Math.min(r, w/2, h/2)); const pts = [];
    const corner = (cx, cy, a0) => { for (let k = 0; k <= seg; k++){ const a = a0 + (Math.PI/2) * k/seg; pts.push({x: cx + r*Math.cos(a), y: cy + r*Math.sin(a)}); } };
    corner(x + w - r, y + r, -Math.PI/2); corner(x + w - r, y + h - r, 0); corner(x + r, y + h - r, Math.PI/2); corner(x + r, y + r, Math.PI);
    return pts;
  }
  // slab: lumpy rounded rectangle centred at (cx, cy). The workhorse for boxy items.
  function slab(cx, cy, w, h, r = 6, o = {}){ return lumpy(rrPts(cx - w/2, cy - h/2, w, h, r), o.lump ?? 1.0, o.seed ?? (w*7 + h*13), o.step ?? 9); }
  // exact (non-lumpy) rounded rect, for small crisp details
  function rrc(cx, cy, w, h, r = 3){ const p = new Path2D(); const x = cx - w/2, y = cy - h/2; r = Math.max(0, Math.min(r, w/2, h/2));
    p.moveTo(x + r, y); p.arcTo(x + w, y, x + w, y + h, r); p.arcTo(x + w, y + h, x, y + h, r); p.arcTo(x, y + h, x, y, r); p.arcTo(x, y, x + w, y, r); p.closePath();
    return withBB(p, x, y, w, h); }
  // ball: lumpy circle / ellipse
  function ball(cx, cy, rx, ry = rx, o = {}){ const n = o.n ?? Math.max(12, Math.round((rx + ry) / 2.2)); const pts = [];
    for (let i = 0; i < n; i++){ const a = (i / n) * Math.PI * 2; pts.push({x: cx + rx*Math.cos(a), y: cy + ry*Math.sin(a)}); }
    return lumpy(pts, o.lump ?? 0.8, o.seed ?? (rx*11 + cy), 99); }
  function circle(cx, cy, r){ const p = new Path2D(); p.moveTo(cx + r, cy); p.arc(cx, cy, r, 0, Math.PI*2); p.closePath(); return withBB(p, cx - r, cy - r, 2*r, 2*r); }
  function ellipse(cx, cy, rx, ry, rot = 0){ const p = new Path2D(); p.ellipse(cx, cy, rx, ry, rot, 0, Math.PI*2); p.closePath(); return withBB(p, cx - rx, cy - ry, 2*rx, 2*ry); }
  // blobPoly: lumpy version of any polygon (array of {x,y} or [x,y])
  function blobPoly(pts, o = {}){ return lumpy(pts.map(q => ({x: q.x ?? q[0], y: q.y ?? q[1]})), o.lump ?? 1.0, o.seed ?? pts.length*31, o.step ?? 9); }
  // poly: exact polygon (open or closed)
  function poly(pts, close = true){ const p = new Path2D(); pts.forEach((q, i) => { const x = q.x ?? q[0], y = q.y ?? q[1]; i ? p.lineTo(x, y) : p.moveTo(x, y); });
    if (close) p.closePath(); const bb = bbOf(pts); return withBB(p, bb.x, bb.y, bb.w, bb.h); }
  // tube: a rolled clay snake along a polyline (for handles, straws, cables, laces). Returns a filled outline path.
  function tube(pts, w = 5){
    const P = pts.map(q => ({x: q.x ?? q[0], y: q.y ?? q[1]})); const L = [], R = [];
    for (let i = 0; i < P.length; i++){
      const a = P[Math.max(0, i - 1)], b = P[Math.min(P.length - 1, i + 1)];
      let nx = -(b.y - a.y), ny = b.x - a.x; const l = Math.hypot(nx, ny) || 1; nx /= l; ny /= l;
      L.push({x: P[i].x + nx*w/2, y: P[i].y + ny*w/2}); R.push({x: P[i].x - nx*w/2, y: P[i].y - ny*w/2});
    }
    const p = new Path2D(); L.forEach((q, i) => i ? p.lineTo(q.x, q.y) : p.moveTo(q.x, q.y));
    const e = P[P.length - 1], s = P[0];
    const ae = Math.atan2(L[L.length-1].y - e.y, L[L.length-1].x - e.x); p.arc(e.x, e.y, w/2, ae, ae + Math.PI, true);
    for (let i = R.length - 1; i >= 0; i--) p.lineTo(R[i].x, R[i].y);
    const as = Math.atan2(R[0].y - s.y, R[0].x - s.x); p.arc(s.x, s.y, w/2, as, as + Math.PI, true);
    p.closePath(); const bb = bbOf(P); return withBB(p, bb.x - w/2, bb.y - w/2, bb.w + w, bb.h + w);
  }
  function merge(...paths){ const p = new Path2D(); let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const q of paths){ p.addPath(q); if (q.bb){ x0 = Math.min(x0, q.bb.x); y0 = Math.min(y0, q.bb.y); x1 = Math.max(x1, q.bb.x + q.bb.w); y1 = Math.max(y1, q.bb.y + q.bb.h); } }
    p.merged = true; return isFinite(x0) ? withBB(p, x0, y0, x1 - x0, y1 - y0) : p; }

  // ---------- rendering primitives ----------
  const scaleOf = g => { const m = g.getTransform(); return Math.hypot(m.a, m.b) || 1; };
  // inverted mask (opaque outside `path`, clear inside) in device pixels around path.bb, so shading treats
  // overlapping sub-paths as one union (an evenodd ring would leave dark holes where pieces overlap)
  function invMask(g, path, pad){
    const bb = path.bb; if (!bb) return null;
    const m = g.getTransform();
    const pts = [[bb.x - pad, bb.y - pad], [bb.x + bb.w + pad, bb.y - pad], [bb.x - pad, bb.y + bb.h + pad], [bb.x + bb.w + pad, bb.y + bb.h + pad]]
      .map(([x, y]) => [m.a*x + m.c*y + m.e, m.b*x + m.d*y + m.f]);
    const x0 = Math.floor(Math.min(...pts.map(q => q[0]))), y0 = Math.floor(Math.min(...pts.map(q => q[1])));
    const w = Math.max(1, Math.ceil(Math.max(...pts.map(q => q[0]))) - x0), h = Math.max(1, Math.ceil(Math.max(...pts.map(q => q[1]))) - y0);
    if (w * h > 6e6) return null;
    const c = document.createElement("canvas"); c.width = w; c.height = h; const x = c.getContext("2d");
    x.fillStyle = "#000"; x.fillRect(0, 0, w, h);
    x.setTransform(m.a, m.b, m.c, m.d, m.e - x0, m.f - y0); x.globalCompositeOperation = "destination-out"; x.fill(path);
    return {c, x0, y0};
  }
  // soft inner shadow inside `path`: offset (dx,dy) in local units, blur in local units
  function inner(g, path, color, blur, dx, dy){
    const k = scaleOf(g);
    const mk = invMask(g, path, Math.abs(dx) + Math.abs(dy) + blur * 2.5 + 4);
    g.save(); g.clip(path);
    if (mk){
      g.setTransform(1, 0, 0, 1, 0, 0);
      g.shadowColor = color; g.shadowBlur = blur * k; g.shadowOffsetX = dx * k; g.shadowOffsetY = dy * k;
      g.drawImage(mk.c, mk.x0, mk.y0);
    } else {
      g.shadowColor = color; g.shadowBlur = blur * k; g.shadowOffsetX = dx * k; g.shadowOffsetY = dy * k;
      const ring = new Path2D(); ring.rect(-4000, -4000, 8000, 8000); ring.addPath(path);
      g.fillStyle = "#000"; g.fill(ring, "evenodd");
    }
    g.restore();
  }
  // soft blurred blob drawn via the off-canvas shadow trick (no ctx.filter needed: works in Safari)
  function softSpot(g, clipPath, spot, color, blur){
    const k = scaleOf(g); g.save(); if (clipPath) g.clip(clipPath);
    const FAR = 6000; g.shadowColor = color; g.shadowBlur = blur * k; g.shadowOffsetX = -FAR * k; g.shadowOffsetY = 0;
    g.translate(FAR, 0); g.fillStyle = "#000"; g.fill(spot); g.restore();
  }
  // fingerprint + speckle texture tile
  const texCache = new WeakMap();
  function texPattern(g){
    let p = texCache.get(g); if (p) return p;
    const q = 3, S = 90; const c = document.createElement("canvas"); c.width = c.height = S*q; const x = c.getContext("2d"); x.scale(q, q);
    const r = rng(42);
    x.strokeStyle = "rgba(0,0,0,0.55)"; x.lineCap = "round";
    for (let f = 0; f < 3; f++){                         // a few faint fingerprint whorls
      const fx = r()*S, fy = r()*S, rot = r()*Math.PI;
      for (let k = 2; k < 13; k += 1.6){ x.lineWidth = 0.35; x.beginPath();
        const a0 = rot + r()*0.6, a1 = a0 + Math.PI*(0.7 + r()*0.6);
        for (const ox of [-S, 0, S]) for (const oy of [-S, 0, S]){ x.moveTo(fx + ox + k*Math.cos(a0), fy + oy + k*0.8*Math.sin(a0)); x.ellipse(fx + ox, fy + oy, k, k*0.8, 0, a0, a1); }
        x.stroke(); }
    }
    for (let i = 0; i < 260; i++){ x.fillStyle = r() > 0.5 ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.9)"; x.beginPath(); x.arc(r()*S, r()*S, 0.25 + r()*0.45, 0, 7); x.fill(); }
    p = g.createPattern(c, "repeat"); if (p && p.setTransform) p.setTransform(new DOMMatrix().scale(1/q));
    texCache.set(g, p); return p;
  }
  function texture(g, path, amount = 0.12){
    g.save(); g.clip(path); g.globalAlpha = amount; g.globalCompositeOperation = "overlay";
    g.fillStyle = texPattern(g); g.fill(path); g.restore();
  }

  // blob: THE clay fill. Base colour + inner shade (bottom-right) + light rim (top-left) + sheen + texture + soft rim line.
  // opt: {soft: shade blur (6), depth: shade offset (3.5), sheen: true|false|{x,y,rx,ry}, texture: 0.12, rim: 1, flat: false}
  function blob(g, path, color, opt = {}){
    const c = col(color);
    g.save(); g.fillStyle = c; g.fill(path);
    const depth = opt.depth ?? 4.2, soft = opt.soft ?? 6.5;
    if (!opt.flat){
      inner(g, path, rgba(shade(c, -0.6), 0.72), soft, -depth, -depth*1.15);          // core shadow, lower-right
      inner(g, path, "rgba(255,255,255,0.55)", soft*0.55, depth*0.55, depth*0.7);     // light rim, upper-left
      const bb = path.bb;
      if (opt.sheen !== false && bb){
        const sh = typeof opt.sheen === "object" ? opt.sheen : {x: bb.x + bb.w*0.3, y: bb.y + bb.h*0.26, rx: Math.max(2, bb.w*0.16), ry: Math.max(1.5, bb.h*0.1)};
        softSpot(g, path, ellipse(sh.x, sh.y, sh.rx, sh.ry, -0.5), "rgba(255,255,255,0.75)", Math.max(2.5, Math.min(sh.rx, sh.ry) * 1.1));
      }
    }
    if ((opt.texture ?? 0.12) > 0) texture(g, path, opt.texture ?? 0.12);
    if ((opt.rim ?? 1) > 0){
      if (path.merged) inner(g, path, rgba(shade(c, -0.5), 0.75), 0.9 * (opt.rim ?? 1), 0, 0);   // union-safe rim (stroke would draw inner seams)
      else { g.lineWidth = opt.rim ?? 1; g.strokeStyle = rgba(shade(c, -0.5), 0.55); g.stroke(path); }
    }
    g.restore();
  }
  // press: a small piece of clay pressed onto a surface (buttons, labels, eyes): lighter shading + tiny drop shadow
  function press(g, path, color, opt = {}){
    const k = scaleOf(g); g.save();
    g.shadowColor = "rgba(40,20,50,0.35)"; g.shadowBlur = 1.6*k; g.shadowOffsetX = 0.8*k; g.shadowOffsetY = 1.1*k;
    g.fillStyle = col(color); g.fill(path); g.restore();
    blob(g, path, color, Object.assign({depth: 1.6, soft: 2.6, texture: 0.08, rim: 0.7}, opt));
  }
  // groove: a line carved into the clay with a tool (dark bottom of the cut + light lip below it)
  function groove(g, path, w = 1.4, opt = {}){
    g.save(); g.lineCap = "round"; g.lineJoin = "round";
    g.lineWidth = w; g.strokeStyle = opt.light ?? "rgba(255,255,255,0.55)"; g.translate(0.55, 0.7); g.stroke(path);
    g.translate(-0.55, -0.7); g.strokeStyle = opt.dark ?? "rgba(45,20,40,0.42)"; g.stroke(path); g.restore();
  }
  // emboss: text pressed out of the surface
  function text(g, str, x, y, opt = {}){
    g.save(); g.font = (opt.weight || 800) + " " + (opt.size || 10) + "px " + (FONTS[opt.font || "sans"] || opt.font);
    g.textAlign = opt.align || "center"; g.textBaseline = opt.baseline || "middle";
    if (opt.rotate){ g.translate(x, y); g.rotate(opt.rotate); x = 0; y = 0; }
    const deboss = opt.deboss;                         // deboss = carved in instead of raised
    g.fillStyle = deboss ? "rgba(255,255,255,0.6)" : "rgba(45,20,40,0.38)"; g.fillText(str, x + 0.6, y + 0.8);
    g.fillStyle = deboss ? "rgba(45,20,40,0.45)" : "rgba(255,255,255,0.55)"; g.fillText(str, x - 0.4, y - 0.5);
    g.fillStyle = col(opt.color || "black"); g.fillText(str, x, y); g.restore();
  }
  // eye: shiny clay eye ball with pupil (look = -1..1 for x/y)
  function eye(g, x, y, r, lx = 0, ly = 0){
    press(g, circle(x, y, r), "white", {sheen:false, texture:0.04});
    const pr = r*0.55; g.save(); g.fillStyle = col("black"); g.beginPath(); g.arc(x + lx*r*0.35, y + ly*r*0.35, pr, 0, 7); g.fill();
    g.fillStyle = "rgba(255,255,255,0.95)"; g.beginPath(); g.arc(x + lx*r*0.35 - pr*0.35, y + ly*r*0.35 - pr*0.4, pr*0.32, 0, 7); g.fill(); g.restore();
  }
  // dots: a scatter of tiny clay balls (pearls, seeds, sprinkles) inside an area
  function dots(g, list, r, color){ for (const [x, y] of list) press(g, ball(x, y, r, r, {lump:0.2, n:10}), color, {sheen:false, texture:0, rim:0.5, depth:1, soft:1.6}); }

  // ---------- physics shape helpers (Matter.js) — identical contract to v2 ----------
  const MAT = {
    card:    {density:0.0016, friction:0.75, frictionStatic:1.0, restitution:0.02},
    wood:    {density:0.0020, friction:0.85, frictionStatic:1.2, restitution:0.03},
    plastic: {density:0.0014, friction:0.55, frictionStatic:0.8, restitution:0.12},
    metal:   {density:0.0040, friction:0.45, frictionStatic:0.6, restitution:0.05},
    glass:   {density:0.0026, friction:0.25, frictionStatic:0.35, restitution:0.08},
    fabric:  {density:0.0012, friction:0.95, frictionStatic:1.4, restitution:0.0},
    rubber:  {density:0.0012, friction:0.9,  frictionStatic:1.1, restitution:0.55},
    food:    {density:0.0013, friction:0.8,  frictionStatic:1.0, restitution:0.02},
    slick:   {density:0.0016, friction:0.02, frictionStatic:0.03, restitution:0.6}
  };
  const mat = (name, extra) => Object.assign({}, MAT[name] || MAT.card, extra || {});
  const B = () => window.Matter.Bodies;
  const pt = p => ({x: p.x ?? p[0], y: p.y ?? p[1]});
  const shape = {
    rect: (x, y, w, h, o = {}) => B().rectangle(x, y, w, h, Object.assign(o.r ? {chamfer:{radius:o.r}} : {}, o.angle ? {angle:o.angle} : {})),
    circle: (x, y, r) => B().circle(x, y, r),
    poly: (x, y, sides, r, o = {}) => B().polygon(x, y, sides, r, o.angle ? {angle:o.angle} : {}),
    trapezoid: (x, y, w, h, slope, o = {}) => { const b = B().trapezoid(x, y, w, h, slope); if (o.flip) window.Matter.Body.rotate(b, Math.PI); return b; },
    // convex polygon given LOCAL points around (x, y); positioned exactly where listed
    convex: (x, y, pts) => { const P = pts.map(pt); const c = window.Matter.Vertices.centre(P); return B().fromVertices(x + c.x, y + c.y, [P]); },
    body: (parts, material = "card", extra) => {
      const o = mat(material, extra); let b;
      if (parts.length === 1){ b = parts[0]; window.Matter.Body.set(b, o); if (o.density) window.Matter.Body.setDensity(b, o.density); }
      else { parts.forEach(p => { if (o.density) window.Matter.Body.setDensity(p, o.density); }); b = window.Matter.Body.create(Object.assign({parts}, o)); shape.fixInertia(b); }
      b.plugin = b.plugin || {}; b.plugin.material = material;   // read by the audio engine for impact sounds
      return b;
    },
    // Matter.js gives a compound body the sum of its parts' inertia about each part's OWN centre, with no
    // parallel-axis term, so spread-out items (headphones, banana, fishing hook...) were up to 24x too easy
    // to spin and whirled off anything they touched. Recompute it properly (same x4 scale Matter uses for
    // single bodies). Idempotent: safe to call again after Body.setParts.
    fixInertia: b => {
      if (b.parts.length < 2) return b;
      let I = 0;
      for (let i = 1; i < b.parts.length; i++){
        const p = b.parts[i], dx = p.position.x - b.position.x, dy = p.position.y - b.position.y;
        I += p.inertia + 4 * p.mass * (dx * dx + dy * dy);
      }
      window.Matter.Body.setInertia(b, I);
      return b;
    }
  };

  window.CLAY = {C, FONTS, col, shade, rgba, rng, lumpy, slab, rrc, ball, circle, ellipse, blobPoly, poly, tube, merge,
                 blob, press, groove, text, eye, dots, inner, softSpot, texture, MAT, mat, shape};
})();
