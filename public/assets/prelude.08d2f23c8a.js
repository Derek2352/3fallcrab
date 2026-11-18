(function(){
"use strict";
const C = {
pink: "#FF5FA2", yellow: "#FFC83D", blue: "#3A9BF0", green: "#4CC36A",
orange: "#FF7B35", purple: "#8B6CF2", red: "#F2463E", teal: "#20C1B3",
lime: "#B5E04A", sky: "#7FD3FF", cream: "#FFF1DA", white: "#FFFDF7",
brown: "#9A6440", tan: "#E8B07A", grey: "#A2ABBE", iron: "#4A4658",
black: "#2E2838"
};
const FONTS = {
display: '"Gluten","Arial Rounded MT Bold","Trebuchet MS",sans-serif',
zh: '"LXGW WenKai TC","TFF Punct","Noto Sans HK","PingFang HK","Microsoft JhengHei",sans-serif',
sans: '"TFF Punct","Noto Sans HK","PingFang HK","Microsoft JhengHei",sans-serif',
dot: '"TFF Punct","Noto Sans HK","PingFang HK",system-ui,sans-serif'
};
const col = c => C[c] || c;
function hex2rgb(h){ h = col(h).replace("#", ""); if (h.length === 3) h = h.split("").map(x => x + x).join("");
const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function rgb2hex(r, g, b){ return "#" + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0")).join(""); }
function shade(c, amt){
const [r, g, b] = hex2rgb(c);
if (amt < 0){ const t = -amt; return rgb2hex(r*(1-t) + 40*t, g*(1-t) + 20*t, b*(1-t) + 50*t); }
return rgb2hex(r + (255 - r)*amt, g + (255 - g)*amt, b + (255 - b)*amt);
}
function rgba(c, a){ const [r, g, b] = hex2rgb(c); return "rgba(" + r + "," + g + "," + b + "," + a + ")"; }
function rng(seed){ let s = (Math.abs(Math.floor(seed)) % 2147483646) + 1; return () => (s = (s * 16807) % 2147483647) / 2147483647; }
function withBB(p, x, y, w, h){ p.bb = {x, y, w, h}; return p; }
function bbOf(pts){ let a = Infinity, b = Infinity, c = -Infinity, d = -Infinity;
for (const q of pts){ const x = q.x ?? q[0], y = q.y ?? q[1]; a = Math.min(a, x); b = Math.min(b, y); c = Math.max(c, x); d = Math.max(d, y); }
return {x:a, y:b, w:c - a, h:d - b}; }
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
function slab(cx, cy, w, h, r = 6, o = {}){ return lumpy(rrPts(cx - w/2, cy - h/2, w, h, r), o.lump ?? 1.0, o.seed ?? (w*7 + h*13), o.step ?? 9); }
function rrc(cx, cy, w, h, r = 3){ const p = new Path2D(); const x = cx - w/2, y = cy - h/2; r = Math.max(0, Math.min(r, w/2, h/2));
p.moveTo(x + r, y); p.arcTo(x + w, y, x + w, y + h, r); p.arcTo(x + w, y + h, x, y + h, r); p.arcTo(x, y + h, x, y, r); p.arcTo(x, y, x + w, y, r); p.closePath();
return withBB(p, x, y, w, h); }
function ball(cx, cy, rx, ry = rx, o = {}){ const n = o.n ?? Math.max(12, Math.round((rx + ry) / 2.2)); const pts = [];
for (let i = 0; i < n; i++){ const a = (i / n) * Math.PI * 2; pts.push({x: cx + rx*Math.cos(a), y: cy + ry*Math.sin(a)}); }
return lumpy(pts, o.lump ?? 0.8, o.seed ?? (rx*11 + cy), 99); }
function circle(cx, cy, r){ const p = new Path2D(); p.moveTo(cx + r, cy); p.arc(cx, cy, r, 0, Math.PI*2); p.closePath(); return withBB(p, cx - r, cy - r, 2*r, 2*r); }
function ellipse(cx, cy, rx, ry, rot = 0){ const p = new Path2D(); p.ellipse(cx, cy, rx, ry, rot, 0, Math.PI*2); p.closePath(); return withBB(p, cx - rx, cy - ry, 2*rx, 2*ry); }
function blobPoly(pts, o = {}){ return lumpy(pts.map(q => ({x: q.x ?? q[0], y: q.y ?? q[1]})), o.lump ?? 1.0, o.seed ?? pts.length*31, o.step ?? 9); }
function poly(pts, close = true){ const p = new Path2D(); pts.forEach((q, i) => { const x = q.x ?? q[0], y = q.y ?? q[1]; i ? p.lineTo(x, y) : p.moveTo(x, y); });
if (close) p.closePath(); const bb = bbOf(pts); return withBB(p, bb.x, bb.y, bb.w, bb.h); }
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
const scaleOf = g => { const m = g.getTransform(); return Math.hypot(m.a, m.b) || 1; };
const pad = (blur, dx, dy) => Math.abs(dx) + Math.abs(dy) + blur * 2.5 + 4;
let mc = null, mx = null;
function invMask(g, path, pad){
const bb = path.bb; if (!bb) return null;
const m = g.getTransform();
const pts = [[bb.x - pad, bb.y - pad], [bb.x + bb.w + pad, bb.y - pad], [bb.x - pad, bb.y + bb.h + pad], [bb.x + bb.w + pad, bb.y + bb.h + pad]]
.map(([x, y]) => [m.a*x + m.c*y + m.e, m.b*x + m.d*y + m.f]);
const x0 = Math.floor(Math.min(...pts.map(q => q[0]))), y0 = Math.floor(Math.min(...pts.map(q => q[1])));
const w = Math.max(1, Math.ceil(Math.max(...pts.map(q => q[0]))) - x0), h = Math.max(1, Math.ceil(Math.max(...pts.map(q => q[1]))) - y0);
if (w * h > 6e6) return null;
if (!mc){ mc = document.createElement("canvas"); mx = mc.getContext("2d", {willReadFrequently: true}); }
mc.width = w; mc.height = h; const x = mx;
x.fillStyle = "#000"; x.fillRect(0, 0, w, h);
x.setTransform(m.a, m.b, m.c, m.d, m.e - x0, m.f - y0); x.globalCompositeOperation = "destination-out"; x.fill(path);
return {c: mc, x0, y0};
}
function shadeIn(g, path, mk, k, color, blur, dx, dy){
g.save(); g.shadowColor = color; g.shadowBlur = blur * k; g.shadowOffsetX = dx * k; g.shadowOffsetY = dy * k;
if (mk){ g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(mk.c, mk.x0, mk.y0); }
else { const ring = new Path2D(); ring.rect(-4000, -4000, 8000, 8000); ring.addPath(path); g.fillStyle = "#000"; g.fill(ring, "evenodd"); }
g.restore();
}
function inner(g, path, color, blur, dx, dy){
const k = scaleOf(g), mk = invMask(g, path, pad(blur, dx, dy));
g.save(); g.clip(path); shadeIn(g, path, mk, k, color, blur, dx, dy); g.restore();
}
function spotIn(g, spot, color, blur, k){
const FAR = 6000; g.save(); g.shadowColor = color; g.shadowBlur = blur * k; g.shadowOffsetX = -FAR * k; g.shadowOffsetY = 0;
g.translate(FAR, 0); g.fillStyle = "#000"; g.fill(spot); g.restore();
}
function softSpot(g, clipPath, spot, color, blur){
const k = scaleOf(g); g.save(); if (clipPath) g.clip(clipPath); spotIn(g, spot, color, blur, k); g.restore();
}
const texCache = new WeakMap(); let tile = null;
function texPattern(g){
let p = texCache.get(g); if (p) return p;
const q = 3; p = g.createPattern(tile || (tile = texTile(q)), "repeat"); if (p && p.setTransform) p.setTransform(new DOMMatrix().scale(1/q));
texCache.set(g, p); return p;
}
function texTile(q){
const S = 90; const c = document.createElement("canvas"); c.width = c.height = S*q; const x = c.getContext("2d"); x.scale(q, q);
const r = rng(42);
x.strokeStyle = "rgba(0,0,0,0.55)"; x.lineCap = "round";
for (let f = 0; f < 3; f++){
const fx = r()*S, fy = r()*S, rot = r()*Math.PI;
for (let k = 2; k < 13; k += 1.6){ x.lineWidth = 0.35; x.beginPath();
const a0 = rot + r()*0.6, a1 = a0 + Math.PI*(0.7 + r()*0.6);
for (const ox of [-S, 0, S]) for (const oy of [-S, 0, S]){ x.moveTo(fx + ox + k*Math.cos(a0), fy + oy + k*0.8*Math.sin(a0)); x.ellipse(fx + ox, fy + oy, k, k*0.8, 0, a0, a1); }
x.stroke(); }
}
for (let i = 0; i < 260; i++){ x.fillStyle = r() > 0.5 ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.9)"; x.beginPath(); x.arc(r()*S, r()*S, 0.25 + r()*0.45, 0, 7); x.fill(); }
return c;
}
function texIn(g, path, amount){ g.save(); g.globalAlpha = amount; g.globalCompositeOperation = "overlay"; g.fillStyle = texPattern(g); g.fill(path); g.restore(); }
function texture(g, path, amount = 0.12){ g.save(); g.clip(path); texIn(g, path, amount); g.restore(); }
function blob(g, path, color, opt = {}){
const c = col(color);
g.save(); g.fillStyle = c; g.fill(path);
const depth = opt.depth ?? 4.2, soft = opt.soft ?? 6.5, tex = opt.texture ?? 0.12, rim = opt.rim ?? 1, bb = path.bb, k = scaleOf(g);
const shd = !opt.flat, sp = shd && opt.sheen !== false && bb, mr = rim > 0 && path.merged;
if (shd){
const m1 = invMask(g, path, pad(soft, depth, depth*1.15));
g.save(); g.clip(path); shadeIn(g, path, m1, k, rgba(shade(c, -0.6), 0.72), soft, -depth, -depth*1.15);
shadeIn(g, path, invMask(g, path, pad(soft*0.55, depth*0.55, depth*0.7)), k, "rgba(255,255,255,0.55)", soft*0.55, depth*0.55, depth*0.7);
g.restore();
}
if (sp || tex > 0 || mr){
g.save(); g.clip(path);
if (sp){ const sh = typeof opt.sheen === "object" ? opt.sheen : {x: bb.x + bb.w*0.3, y: bb.y + bb.h*0.26, rx: Math.max(2, bb.w*0.16), ry: Math.max(1.5, bb.h*0.1)};
spotIn(g, ellipse(sh.x, sh.y, sh.rx, sh.ry, -0.5), "rgba(255,255,255,0.75)", Math.max(2.5, Math.min(sh.rx, sh.ry) * 1.1), k); }
if (tex > 0) texIn(g, path, tex);
if (mr) shadeIn(g, path, invMask(g, path, pad(0.9 * rim, 0, 0)), k, rgba(shade(c, -0.5), 0.75), 0.9 * rim, 0, 0);
g.restore();
}
if (rim > 0 && !path.merged){ g.lineWidth = rim; g.strokeStyle = rgba(shade(c, -0.5), 0.55); g.stroke(path); }
g.restore();
}
function press(g, path, color, opt = {}){
const k = scaleOf(g); g.save();
g.shadowColor = "rgba(40,20,50,0.35)"; g.shadowBlur = 1.6*k; g.shadowOffsetX = 0.8*k; g.shadowOffsetY = 1.1*k;
g.fillStyle = col(color); g.fill(path); g.restore();
blob(g, path, color, Object.assign({depth: 1.6, soft: 2.6, texture: 0.08, rim: 0.7}, opt));
}
function groove(g, path, w = 1.4, opt = {}){
g.save(); g.lineCap = "round"; g.lineJoin = "round";
g.lineWidth = w; g.strokeStyle = opt.light ?? "rgba(255,255,255,0.55)"; g.translate(0.55, 0.7); g.stroke(path);
g.translate(-0.55, -0.7); g.strokeStyle = opt.dark ?? "rgba(45,20,40,0.42)"; g.stroke(path); g.restore();
}
function text(g, str, x, y, opt = {}){
g.save(); g.font = (opt.weight || 800) + " " + (opt.size || 10) + "px " + (FONTS[opt.font || "sans"] || opt.font);
g.textAlign = opt.align || "center"; g.textBaseline = opt.baseline || "middle";
if (opt.rotate){ g.translate(x, y); g.rotate(opt.rotate); x = 0; y = 0; }
const deboss = opt.deboss;
g.fillStyle = deboss ? "rgba(255,255,255,0.6)" : "rgba(45,20,40,0.38)"; g.fillText(str, x + 0.6, y + 0.8);
g.fillStyle = deboss ? "rgba(45,20,40,0.45)" : "rgba(255,255,255,0.55)"; g.fillText(str, x - 0.4, y - 0.5);
g.fillStyle = col(opt.color || "black"); g.fillText(str, x, y); g.restore();
}
function eye(g, x, y, r, lx = 0, ly = 0){
press(g, circle(x, y, r), "white", {sheen:false, texture:0.04});
const pr = r*0.55; g.save(); g.fillStyle = col("black"); g.beginPath(); g.arc(x + lx*r*0.35, y + ly*r*0.35, pr, 0, 7); g.fill();
g.fillStyle = "rgba(255,255,255,0.95)"; g.beginPath(); g.arc(x + lx*r*0.35 - pr*0.35, y + ly*r*0.35 - pr*0.4, pr*0.32, 0, 7); g.fill(); g.restore();
}
function dots(g, list, r, color){ for (const [x, y] of list) press(g, ball(x, y, r, r, {lump:0.2, n:10}), color, {sheen:false, texture:0, rim:0.5, depth:1, soft:1.6}); }
const MAT = {
card: {density:0.0016, friction:0.75, frictionStatic:1.0, restitution:0.02},
wood: {density:0.0020, friction:0.85, frictionStatic:1.2, restitution:0.03},
plastic: {density:0.0014, friction:0.55, frictionStatic:0.8, restitution:0.12},
metal: {density:0.0040, friction:0.45, frictionStatic:0.6, restitution:0.05},
glass: {density:0.0026, friction:0.25, frictionStatic:0.35, restitution:0.08},
fabric: {density:0.0012, friction:0.95, frictionStatic:1.4, restitution:0.0},
rubber: {density:0.0012, friction:0.9, frictionStatic:1.1, restitution:0.55},
food: {density:0.0013, friction:0.8, frictionStatic:1.0, restitution:0.02},
slick: {density:0.0016, friction:0.02, frictionStatic:0.03, restitution:0.6}
};
const mat = (name, extra) => Object.assign({}, MAT[name] || MAT.card, extra || {});
const B = () => window.Matter.Bodies;
const pt = p => ({x: p.x ?? p[0], y: p.y ?? p[1]});
const shape = {
rect: (x, y, w, h, o = {}) => B().rectangle(x, y, w, h, Object.assign(o.r ? {chamfer:{radius:o.r}} : {}, o.angle ? {angle:o.angle} : {})),
circle: (x, y, r) => B().circle(x, y, r),
poly: (x, y, sides, r, o = {}) => B().polygon(x, y, sides, r, o.angle ? {angle:o.angle} : {}),
trapezoid: (x, y, w, h, slope, o = {}) => { const b = B().trapezoid(x, y, w, h, slope); if (o.flip) window.Matter.Body.rotate(b, Math.PI); return b; },
convex: (x, y, pts) => { const P = pts.map(pt); const c = window.Matter.Vertices.centre(P); return B().fromVertices(x + c.x, y + c.y, [P]); },
body: (parts, material = "card", extra) => {
const o = mat(material, extra); let b;
if (parts.length === 1){ b = parts[0]; window.Matter.Body.set(b, o); if (o.density) window.Matter.Body.setDensity(b, o.density); }
else { parts.forEach(p => { if (o.density) window.Matter.Body.setDensity(p, o.density); }); b = window.Matter.Body.create(Object.assign({parts}, o)); shape.fixInertia(b); }
b.plugin = b.plugin || {}; b.plugin.material = material;
return b;
},
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
(function () {
"use strict";
var W = typeof window !== "undefined" ? window : globalThis;
var noop = function () {};
var STORE_KEY = "tff_muted";
var MUSIC_BASE = 0.12;
var SFX_BASE = 0.8;
var BPM = 116, FAST_MUL = 1.35, FRENZY_MUL = 1.18;
var LOOKAHEAD = 0.12, TICK_MS = 25;
function own(map, k) { return k != null && Object.prototype.hasOwnProperty.call(map, k) ? map[k] : null; }
function clamp(x, a, b) { return x < a ? a : x > b ? b : x; }
function mtof(m) { return 440 * Math.pow(2, (m - 69) / 12); }
function prng(seed) {
var s = (seed | 0) || 0x2545f491;
return function () { s ^= s << 13; s ^= s >>> 17; s ^= s << 5; return (s >>> 0) / 4294967296; };
}
function K(r, m) { return m + (r.key || 0); }
var PC = { C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5, "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11 };
var PENT = [50, 52, 54, 57, 59, 62, 64, 66, 69, 71, 74, 76, 78, 81, 83, 86, 88, 90, 93, 95, 98, 100, 102];
function pentBelow(m, steps) { var i = PENT.indexOf(m); return i < 0 ? m - 5 : PENT[Math.max(0, i - steps)]; }
var CHORDS = [
"D", "A/C#", "Bm", "F#m", "G", "D/F#", "Em", "A",
"D", "A/C#", "Bm", "F#m", "G", "D/F#", "Em", "A",
"G", "A", "F#m", "Bm", "G", "A", "D", "D",
"G", "A", "F#m", "Bm", "Em", "F#m", "G", "A"
];
var HOOK = ["0F#5.2 3E5.1 4F#5.2 6A5.2 8B5.3 11A5.1 12F#5.4",
"0E5.2 2D5.2 4E5.4 10A4.2 12D5.2 14E5.2",
"0F#5.2 3E5.1 4F#5.2 6A5.2 8D6.4 12B5.2 14A5.2",
"0A5.6 6F#5.2 8E5.4"];
var CHORUS = ["0D6.2 2B5.2 4A5.2 6B5.4 10A5.2 12B5.2 14D6.2",
"0A5.6 6E5.2 8A5.2 10B5.2 12A5.4",
"0F#5.2 2A5.2 4B5.2 6A5.4 10F#5.2 12E5.2 14F#5.2"];
var LEAD_SRC = [].concat(HOOK, [
"0D5.2 2E5.2 4D5.2 6B4.2 8D5.4 12E5.2 14F#5.2",
"0A5.4 4F#5.2 6E5.2 8D5.4 14A4.2",
"0B4.2 2D5.2 4E5.2 6F#5.2 8E5.2 10D5.2 12E5.4",
"0E5.8 10A4.2 12D5.2 14E5.2"
], HOOK, [
"0B5.2 2A5.2 4F#5.2 6E5.2 8D5.2 10E5.2 12F#5.4",
"0A5.2 2F#5.2 4A5.2 6B5.2 8D6.6 14B5.2",
"0A5.2 2F#5.2 4E5.4 8D5.2 10E5.2 12F#5.2 14E5.2",
"0E5.6 8E5.2 10F#5.2 12A5.2 14B5.2"
], CHORUS, [
"0D5.6 6B4.2 8D5.2 10E5.2 12F#5.4",
CHORUS[0],
"0E6.4 4D6.2 6B5.2 8A5.4 12B5.2 14A5.2",
"0F#5.2 2A5.2 4F#5.2 6E5.2 8D5.8",
"6D5.2 8E5.2 10F#5.2 12A5.2 14B5.2"
], CHORUS, [
"0D5.4 4E5.2 6F#5.2 8A5.4 12B5.4",
"0B5.2 2A5.2 4B5.2 6D6.2 8B5.4 12A5.2 14F#5.2",
"0A5.4 4F#5.2 6E5.2 8F#5.4 12A5.4",
"0B5.6 6A5.2 8B5.2 10D6.2 12B5.2 14A5.2",
"0A5.8 12D5.2 14E5.2"
]);
var CTR_A = ["0F#4.6 6E4.2 8F#4.8", "0E4.6 6D4.2 8E4.8", "0D4.6 6C#4.2 8D4.8", "0C#4.6 6B3.2 8C#4.4 12A3.4",
"0B3.6 6A3.2 8B3.8", "0A3.6 6G3.2 8A3.8", "0B3.6 6C#4.2 8D4.4 12E4.4", "0C#4.8 8E4.4 12C#4.4"];
var CTR_B = ["0B4.4 4D5.4 8B4.8", "0C#5.4 4E5.4 8C#5.8", "0A4.4 4C#5.4 8A4.8"];
var CTR_SRC = [].concat(CTR_A, CTR_A, CTR_B, [
"0B4.4 4D5.4 8F#4.8", "0B4.4 4D5.4 8G4.8", "0C#5.4 4E5.4 8A4.8", "0A4.4 4D5.4 8F#4.8", "0A4.8 8F#4.8"
], CTR_B, [
"0F#4.4 4B4.4 8D5.8", "0G4.4 4B4.4 8E5.8", "0F#4.4 4A4.4 8C#5.8", "0G4.4 4B4.4 8D5.8", "0E5.8 8C#5.8"
]);
function parseBar(str) {
var out = {};
(str || "").split(/\s+/).forEach(function (tok) {
var m = /^(\d+)([A-G]#?)(\d)\.(\d+)$/.exec(tok);
if (m) out[+m[1]] = { m: PC[m[2]] + 12 * (+m[3] + 1), len: +m[4] };
});
return out;
}
function parseChord(s) {
var m = /^([A-G]#?)(m?)(?:\/([A-G]#?))?$/.exec(s), r = PC[m[1]], third = m[2] ? 3 : 4;
var bass = m[3] ? PC[m[3]] : r, bm = 36 + bass; if (bm < 40) bm += 12;
var tones = [r, (r + third) % 12, (r + 7) % 12].map(function (pc) { var x = 60 + pc; while (x < 66) x += 12; while (x >= 78) x -= 12; return x; });
tones.sort(function (a, b) { return a - b; });
return { bass: bm, arp: [tones[0], tones[1], tones[2], tones[0] + 12] };
}
var BARS = CHORDS.length;
var SONG = { lead: LEAD_SRC.map(parseBar), ctr: CTR_SRC.map(parseBar), ch: CHORDS.map(parseChord) };
var ARP_SEQ = [0, 1, 2, 3, 2, 1, 2, 1];
var BASS_PAT = [
{ 0: [0, 3], 6: [0, 2], 8: [0, 3], 14: [12, 2] },
{ 0: [0, 3], 3: [0, 1], 6: [0, 2], 8: [0, 3], 11: [0, 1], 12: [12, 2], 14: [0, 2] },
{ 0: [0, 2], 2: [12, 2], 4: [0, 2], 6: [12, 2], 8: [0, 2], 10: [12, 2], 12: [0, 2], 14: [12, 2] },
{ 0: [0, 2], 2: [0, 1], 3: [12, 1], 4: [0, 2], 6: [12, 2], 8: [0, 2], 10: [12, 1], 11: [0, 1], 12: [12, 2], 14: [24, 1], 15: [12, 1] }
];
function clipCurve() {
var N = 4097, c = new Float32Array(N);
for (var i = 0; i < N; i++) {
var x = i / 2048 - 1, ax = Math.abs(x), y = ax <= 0.7 ? ax : 0.7 + 0.24 * Math.tanh((ax - 0.7) / 0.24);
c[i] = x < 0 ? -y : y;
}
return c;
}
function crushCurve() {
var c = new Float32Array(1025);
for (var i = 0; i < 1025; i++) c[i] = Math.round((i / 512 - 1) * 2.5) / 2.5;
return c;
}
function makeWaves(ctx) {
function wave(n, fn) {
var re = new Float32Array(n + 1), im = new Float32Array(n + 1);
for (var k = 1; k <= n; k++) { var c = fn(k); re[k] = c[0]; im[k] = c[1]; }
return ctx.createPeriodicWave(re, im);
}
function pulse(d) {
return function (k) { return [Math.sin(2 * Math.PI * k * d) / (k * Math.PI), 2 * Math.pow(Math.sin(Math.PI * k * d), 2) / (k * Math.PI)]; };
}
return {
pulse25: wave(40, pulse(0.25)),
pulse12: wave(40, pulse(0.125)),
bass: wave(24, function (k) {
var tri = (k % 2) ? (8 / (Math.PI * Math.PI)) / (k * k) * ((((k - 1) / 2) % 2) ? -1 : 1) : 0;
return [0, tri + 0.3 / k * Math.exp(-k / 7)];
}),
brass: wave(32, function (k) { return [0, (1 / k) / (1 + Math.pow(k / 9, 2))]; }),
flute: wave(6, function (k) { return [0, [0, 1, 0.22, 0.1, 0.04, 0.02, 0.01][k]]; })
};
}
function buildRig(ctx, seed) {
var r = { ctx: ctx, nodes: 0, rand: prng(seed), key: 0, vib: {}, vibN: 0 };
function N(n) { r.nodes++; return n; }
r.out = N(ctx.createGain());
r.clip = N(ctx.createWaveShaper()); r.clip.curve = clipCurve(); r.clip.oversample = "none";
r.comp = N(ctx.createDynamicsCompressor());
r.comp.threshold.value = -12; r.comp.knee.value = 6; r.comp.ratio.value = 12;
r.comp.attack.value = 0.002; r.comp.release.value = 0.15;
r.master = N(ctx.createGain()); r.master.gain.value = 0.9;
r.sfxIn = N(ctx.createGain()); r.sfxIn.gain.value = SFX_BASE;
r.musicIn = N(ctx.createGain());
r.musicLP = N(ctx.createBiquadFilter()); r.musicLP.type = "lowpass"; r.musicLP.frequency.value = 18000; r.musicLP.Q.value = 0;
r.musicVol = N(ctx.createGain()); r.musicVol.gain.value = MUSIC_BASE;
r.musicIn.connect(r.musicLP); r.musicLP.connect(r.musicVol); r.musicVol.connect(r.master);
r.sfxIn.connect(r.master);
r.master.connect(r.comp); r.comp.connect(r.clip); r.clip.connect(r.out); r.out.connect(ctx.destination);
var len = Math.floor(ctx.sampleRate * 2), nb = ctx.createBuffer(1, len, ctx.sampleRate), d = nb.getChannelData(0);
for (var i = 0; i < len; i++) d[i] = r.rand() * 2 - 1;
r.noise = nb;
r.crush = crushCurve();
r.waves = makeWaves(ctx);
return r;
}
function vibCurve(r, dur, rate, depth, delay, decay) {
dur = Math.max(0.02, Math.round(dur * 100) / 100);
var key = dur + "|" + rate + "|" + depth + "|" + (delay || 0) + "|" + (decay || 0);
var c = r.vib[key]; if (c) return c;
if (++r.vibN > 300) { r.vib = {}; r.vibN = 1; }
var n = Math.max(8, Math.min(2048, Math.ceil(dur * 300)));
c = new Float32Array(n);
for (var i = 0; i < n; i++) {
var tt = i / (n - 1) * dur, amp = tt < (delay || 0) ? 0 : Math.min(1, (tt - (delay || 0)) / 0.12);
if (decay) amp *= Math.exp(-tt * decay);
c[i] = depth * amp * Math.sin(2 * Math.PI * rate * tt);
}
r.vib[key] = c; return c;
}
function curveAt(param, curve, t, dur) { try { param.setValueCurveAtTime(curve, t, Math.max(0.02, Math.round(dur * 100) / 100)); } catch (e) {} }
function Voice(r, dest, level, pan) {
this.r = r; this.c = r.ctx; this.n = []; this.live = 0; this.end = 0; this.done = false;
if (level == null) { this.out = dest; return; }
var g = this.gain(level), c = this.c, pn = +pan || 0;
if (pn && c.createStereoPanner) { var p = this.track(c.createStereoPanner()); p.pan.value = clamp(pn, -1, 1); g.connect(p); p.connect(dest); }
else g.connect(dest);
this.out = g;
}
var VP = Voice.prototype;
VP.track = function (x) { this.n.push(x); this.r.nodes++; return x; };
VP.gain = function (v, dest) { var g = this.track(this.c.createGain()); g.gain.value = v; if (dest) g.connect(dest); return g; };
VP.filter = function (type, f, q, dest, t) {
var b = this.track(this.c.createBiquadFilter()); b.type = type; b.frequency.value = f;
if (t != null) b.frequency.setValueAtTime(f, t);
if (q != null) b.Q.value = q; if (dest) b.connect(dest); return b;
};
VP.osc = function (wave, f, t0, t1, dest) {
var o = this.track(this.c.createOscillator()), pw = own(this.r.waves, wave);
if (pw) o.setPeriodicWave(pw); else o.type = wave;
o.frequency.setValueAtTime(f, t0);
o.connect(dest || this.out); this.src(o, t0, t1, 0); return o;
};
VP.noise = function (t0, t1, dest) {
var s = this.track(this.c.createBufferSource()); s.buffer = this.r.noise; s.loop = true;
s.connect(dest || this.out); this.src(s, t0, t1, 0.01 + this.r.rand() * 1.8); return s;
};
VP.src = function (s, t0, t1, off) {
var self = this; this.live++; if (t1 > this.end) this.end = t1;
s.onended = function () { if (--self.live <= 0) self.dispose(); };
if (off) s.start(t0, off); else s.start(t0);
s.stop(t1);
};
VP.dispose = function () {
if (this.done) return; this.done = true;
for (var i = 0; i < this.n.length; i++) { try { this.n[i].disconnect(); } catch (e) {} }
this.n.length = 0;
};
function envAD(p, t, a, pk, d) {
p.setValueAtTime(0, t); p.linearRampToValueAtTime(pk, t + a);
p.exponentialRampToValueAtTime(0.0002, t + a + d); p.linearRampToValueAtTime(0, t + a + d + 0.004);
return t + a + d + 0.005;
}
function ahdsr(p, t, dur, pk, a, d, sus, rel) {
dur = Math.max(dur, a + 0.002);
p.setValueAtTime(0, t); p.linearRampToValueAtTime(pk, t + a);
var td = Math.min(t + a + d, t + dur), sv = pk + (sus * pk - pk) * Math.min(1, (td - t - a) / d);
p.linearRampToValueAtTime(sv, td);
if (t + dur > td) p.setValueAtTime(sv, t + dur);
p.linearRampToValueAtTime(0, t + dur + rel);
return t + dur + rel;
}
function tone(v, wave, f, t, a, pk, d, dest) {
var g = v.gain(0, dest || v.out), e = envAD(g.gain, t, a, pk, d);
return { g: g, o: v.osc(wave, f, t, e + 0.002, g), end: e };
}
function toneH(v, wave, f, t, a, pk, hold, rel, dest) {
var g = v.gain(0, dest || v.out), p = g.gain;
p.setValueAtTime(0, t); p.linearRampToValueAtTime(pk, t + a); p.setValueAtTime(pk, t + a + hold);
p.linearRampToValueAtTime(0, t + a + hold + rel);
return { g: g, o: v.osc(wave, f, t, t + a + hold + rel + 0.002, g) };
}
function noiseHit(v, t, a, pk, d, type, f, q, dest) {
var g = v.gain(0, dest || v.out), e = envAD(g.gain, t, a, pk, d), fl = v.filter(type, f, q, g, t);
v.noise(t, e + 0.002, fl);
return { g: g, f: fl };
}
function coinTing(v, t, f, cents, d, pk) {
var a = tone(v, "pulse25", f, t, 0.002, pk * 0.55, d); a.o.detune.value = cents;
var b = tone(v, "sine", f * 2, t, 0.002, pk * 0.35, d * 0.8); b.o.detune.value = cents;
}
function bell(v, t, f, pk, d) {
[[1, 1, 1], [2.0, 0.45, 0.6], [2.76, 0.32, 0.45], [5.4, 0.12, 0.25]].forEach(function (p) {
if (f * p[0] < 12000) tone(v, "sine", f * p[0], t, 0.002, pk * p[1], d * p[2]);
});
}
function brass(v, m, t, dur, pk, dest) {
var f = mtof(m), g = v.gain(0, dest || v.out), p = g.gain;
p.setValueAtTime(0, t); p.linearRampToValueAtTime(pk, t + 0.018); p.linearRampToValueAtTime(pk * 0.78, t + 0.1);
p.setValueAtTime(pk * 0.78, t + Math.max(0.1, dur)); p.linearRampToValueAtTime(0, t + Math.max(0.1, dur) + 0.09);
var lp = v.filter("lowpass", f * 1.5, 2, g, t);
lp.frequency.linearRampToValueAtTime(Math.min(f * 7, 9000), t + 0.04);
lp.frequency.exponentialRampToValueAtTime(Math.min(f * 3.5, 6000), t + 0.3);
return v.osc("brass", f, t, t + Math.max(0.1, dur) + 0.1, lp);
}
function wahNote(v, m, t, d, pk, bend) {
var f = mtof(m), g = v.gain(0, v.out), p = g.gain;
p.setValueAtTime(0, t); p.linearRampToValueAtTime(pk, t + 0.025); p.setValueAtTime(pk, t + d - 0.05); p.linearRampToValueAtTime(0, t + d);
var lp = v.filter("lowpass", 350, 7, g, t);
lp.frequency.exponentialRampToValueAtTime(1900, t + Math.min(0.12, d * 0.4));
lp.frequency.exponentialRampToValueAtTime(420, t + d);
var o = v.osc("brass", f, t, t + d + 0.01, lp);
if (bend) {
o.frequency.setValueAtTime(f, t + 0.12); o.frequency.exponentialRampToValueAtTime(f * bend, t + d);
curveAt(o.detune, vibCurve(v.r, d - 0.1, 5.5, 38, 0.05), t + 0.08, d - 0.1);
}
return o;
}
var SFX = {
uiOpen: function (v, t) {
var x = tone(v, "triangle", 420, t, 0.008, 0.35, 0.13); x.o.frequency.exponentialRampToValueAtTime(980, t + 0.12);
var n = noiseHit(v, t, 0.03, 0.12, 0.09, "bandpass", 900, 1.4); n.f.frequency.exponentialRampToValueAtTime(3200, t + 0.12);
tone(v, "sine", mtof(K(v.r, 91)), t + 0.1, 0.002, 0.14, 0.18);
},
uiClose: function (v, t) {
var x = tone(v, "triangle", 900, t, 0.006, 0.3, 0.11); x.o.frequency.exponentialRampToValueAtTime(380, t + 0.1);
var n = noiseHit(v, t, 0.02, 0.1, 0.08, "bandpass", 2600, 1.4); n.f.frequency.exponentialRampToValueAtTime(700, t + 0.1);
},
uiNext: function (v, t) {
tone(v, "pulse12", mtof(K(v.r, 79)), t, 0.003, 0.22, 0.09);
tone(v, "pulse12", mtof(K(v.r, 84)), t + 0.07, 0.003, 0.24, 0.14);
tone(v, "sine", mtof(K(v.r, 96)), t + 0.07, 0.002, 0.08, 0.12);
},
uiBack: function (v, t) {
tone(v, "pulse12", mtof(K(v.r, 84)), t, 0.003, 0.2, 0.08);
tone(v, "pulse12", mtof(K(v.r, 79)), t + 0.07, 0.003, 0.2, 0.12);
},
uiToggle: function (v, t) {
tone(v, "square", 1300, t, 0.001, 0.12, 0.02);
noiseHit(v, t, 0.001, 0.25, 0.015, "highpass", 3000, 0.7);
tone(v, "square", 1900, t + 0.045, 0.001, 0.1, 0.025);
},
uiSelect: function (v, t) {
var f = mtof(K(v.r, 76));
tone(v, "triangle", f, t, 0.002, 0.4, 0.16); tone(v, "sine", f * 2, t, 0.002, 0.15, 0.1);
noiseHit(v, t, 0.001, 0.12, 0.01, "highpass", 5000, 0.7);
},
uiDone: function (v, t) {
bell(v, t, mtof(K(v.r, 91)), 0.24, 0.3); bell(v, t + 0.09, mtof(K(v.r, 96)), 0.26, 0.45);
},
lock: function (v, t) {
noiseHit(v, t, 0.001, 0.35, 0.03, "bandpass", 3200, 2.2); noiseHit(v, t + 0.06, 0.001, 0.3, 0.03, "bandpass", 2600, 2.2);
var k = tone(v, "square", 420, t + 0.13, 0.001, 0.22, 0.05); k.o.frequency.exponentialRampToValueAtTime(180, t + 0.18);
noiseHit(v, t + 0.13, 0.001, 0.4, 0.06, "lowpass", 900, 0.8);
coinTing(v, t + 0.22, mtof(K(v.r, 93)), 0, 0.3, 0.32); coinTing(v, t + 0.3, mtof(K(v.r, 98)), 4, 0.35, 0.26);
},
netCatch: function (v, t) {
var x = tone(v, "triangle", 160, t, 0.004, 0.5, 0.42);
x.o.frequency.setValueAtTime(160, t); x.o.frequency.exponentialRampToValueAtTime(260, t + 0.08); x.o.frequency.exponentialRampToValueAtTime(150, t + 0.2); x.o.frequency.exponentialRampToValueAtTime(210, t + 0.3);
noiseHit(v, t, 0.002, 0.2, 0.08, "lowpass", 1200, 0.7);
},
rescue: function (v, t) {
[74, 78, 81, 86].forEach(function (m, i) { var b = tone(v, "sine", mtof(K(v.r, m)), t + i * 0.07, 0.003, 0.2, 0.09); b.o.frequency.exponentialRampToValueAtTime(mtof(K(v.r, m)) * 1.25, t + i * 0.07 + 0.08); });
},
uiNope: function (v, t) {
tone(v, "triangle", 330, t, 0.004, 0.32, 0.07); tone(v, "triangle", 262, t + 0.09, 0.004, 0.3, 0.1);
},
go: function (v, t) {
[72, 76, 79, 84].forEach(function (m, i) { tone(v, "pulse25", mtof(K(v.r, m)), t + i * 0.055, 0.003, 0.22, 0.12); });
var s = tone(v, "sine", mtof(K(v.r, 96)), t + 0.22, 0.002, 0.16, 0.35); s.o.detune.value = 6;
noiseHit(v, t + 0.2, 0.002, 0.1, 0.12, "highpass", 7000, 0.7);
},
reel: function (v, t) {
tone(v, "square", 1500 + v.r.rand() * 200, t, 0.001, 0.12, 0.018);
noiseHit(v, t, 0.001, 0.12, 0.012, "highpass", 4000, 0.7);
},
reelStop: function (v, t) {
var k = tone(v, "triangle", 220, t, 0.002, 0.5, 0.12); k.o.frequency.exponentialRampToValueAtTime(110, t + 0.1);
noiseHit(v, t, 0.001, 0.3, 0.05, "lowpass", 1200, 0.8);
bell(v, t + 0.04, mtof(K(v.r, 88)), 0.2, 0.35);
},
rival: function (v, t) {
[79, 84, 88].forEach(function (m, i) { tone(v, "pulse25", mtof(K(v.r, m)), t + i * 0.08, 0.003, 0.24, i === 2 ? 0.32 : 0.1); });
tone(v, "triangle", mtof(K(v.r, 64)), t + 0.16, 0.004, 0.3, 0.34);
bell(v, t + 0.2, mtof(K(v.r, 96)), 0.22, 0.4); bell(v, t + 0.3, mtof(K(v.r, 100)), 0.2, 0.5);
},
click: function (v, t) {
var x = tone(v, "triangle", 1700, t, 0.002, 0.6, 0.05); x.o.frequency.exponentialRampToValueAtTime(1000, t + 0.04);
tone(v, "sine", 3400, t, 0.001, 0.15, 0.02);
noiseHit(v, t, 0.001, 0.3, 0.012, "highpass", 4000, 0.7);
},
spawn: function (v, t) {
var x = tone(v, "sine", 330, t, 0.01, 0.5, 0.12); x.o.frequency.exponentialRampToValueAtTime(820, t + 0.08);
var m = K(v.r, [81, 83, 86][Math.floor(v.r.rand() * 3)]);
tone(v, "pulse12", mtof(m), t + 0.05, 0.004, 0.22, 0.14);
},
move: function (v, t) {
var f = 2100 * (1 + (v.r.rand() - 0.5) * 0.14);
tone(v, "triangle", f, t, 0.001, 0.5, 0.022);
noiseHit(v, t, 0.001, 0.15, 0.01, "highpass", 6000, 0.7);
},
rotate: function (v, t) {
var n = noiseHit(v, t, 0.02, 0.6, 0.08, "bandpass", 1200, 2.5);
n.f.frequency.exponentialRampToValueAtTime(4200, t + 0.09);
tone(v, "triangle", 1900 * (1 + (v.r.rand() - 0.5) * 0.1), t + 0.075, 0.001, 0.3, 0.03);
},
hold: function (v, t) {
tone(v, "pulse25", mtof(K(v.r, 81)), t, 0.003, 0.3, 0.06);
tone(v, "pulse25", mtof(K(v.r, 86)), t + 0.065, 0.003, 0.3, 0.09);
},
release: function (v, t) {
var x = tone(v, "sine", 950, t, 0.004, 0.55, 0.09); x.o.frequency.exponentialRampToValueAtTime(430, t + 0.08);
noiseHit(v, t, 0.003, 0.18, 0.05, "bandpass", 2200, 1.2);
},
harddrop: function (v, t) {
var g = v.gain(0, v.out); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.85, t + 0.13);
g.gain.exponentialRampToValueAtTime(0.0005, t + 0.28); g.gain.linearRampToValueAtTime(0, t + 0.285);
var f = v.filter("bandpass", 3500, 1.4, g, t); f.frequency.exponentialRampToValueAtTime(450, t + 0.26);
v.noise(t, t + 0.29, f);
var x = tone(v, "sine", 230, t + 0.1, 0.01, 0.55, 0.17); x.o.frequency.exponentialRampToValueAtTime(65, t + 0.27);
},
deposit: function (v, t, o) {
var amt = +o.amount || 0, cents = (v.r.rand() - 0.5) * 30;
if (amt < 0) {
tone(v, "triangle", mtof(K(v.r, 76)), t, 0.003, 0.45, 0.07);
tone(v, "triangle", mtof(K(v.r, 71)), t + 0.07, 0.003, 0.45, 0.16);
return;
}
var n = amt >= 2000 ? 3 : amt >= 500 ? 2 : 1;
coinTing(v, t, mtof(K(v.r, 88)), cents, 0.05, 0.5);
coinTing(v, t + 0.055, mtof(K(v.r, 93)), cents, 0.2, 0.55);
if (n >= 2) coinTing(v, t + 0.11, mtof(K(v.r, 98)), cents, 0.18, 0.4);
if (n >= 3) coinTing(v, t + 0.165, mtof(K(v.r, 100)), cents, 0.16, 0.35);
if (o.frenzy) { bell(v, t + 0.2, mtof(K(v.r, 98)), 0.2, 0.4); coinTing(v, t + 0.25, mtof(K(v.r, 102)), cents, 0.16, 0.34); }
},
floor: function (v, t, o) {
var fl = clamp(Math.round(+o.floor || 1), 1, 20), P = [74, 76, 78, 81, 83, 86, 88, 90, 93, 95, 98];
var st = Math.min(Math.floor((fl - 1) * 0.6), 6);
[st, st + 1, st + 2, st + 4].forEach(function (i, k) {
var m = K(v.r, P[Math.min(i, P.length - 1)]), tt = t + k * 0.065, last = k === 3;
tone(v, "pulse25", mtof(m), tt, 0.003, 0.24, last ? 0.3 : 0.08);
tone(v, "triangle", mtof(m), tt, 0.003, 0.3, last ? 0.34 : 0.09);
});
},
stage: function (v, t, o) {
var st = clamp(Math.round(+o.stage || 1), 1, 3), r = v.r;
var mel = st === 1 ? [[74, 0, 0.08], [78, 0.1, 0.08], [81, 0.2, 0.08], [86, 0.3, 0.5]]
: st === 2 ? [[74, 0, 0.07], [78, 0.09, 0.07], [81, 0.18, 0.07], [86, 0.27, 0.2], [83, 0.5, 0.08], [86, 0.6, 0.62]]
: [[81, 0, 0.07], [81, 0.09, 0.07], [81, 0.18, 0.07], [86, 0.27, 0.24], [83, 0.54, 0.08], [86, 0.64, 0.08], [90, 0.74, 0.78]];
var pk = [0, 0.32, 0.34, 0.36][st];
mel.forEach(function (n) {
brass(v, K(r, n[0]), t + n[1], n[2], pk);
if (st >= 2) brass(v, K(r, pentBelow(n[0], 2)), t + n[1], n[2], pk * 0.6);
if (st >= 3) brass(v, K(r, n[0] - 24), t + n[1], n[2], pk * 0.5);
});
var last = mel[mel.length - 1], tl = t + last[1];
tone(v, "triangle", mtof(K(r, 86 + 12)), tl, 0.003, 0.12, 0.35);
[0, 0.17].forEach(function (d) { bell(v, tl + last[2] + 0.12 + d, 1760, 0.2, 0.55); noiseHit(v, tl + last[2] + 0.12 + d, 0.001, 0.12, 0.02, "highpass", 5000, 0.7); });
if (st >= 2) { noiseHit(v, tl - 0.03, 0.001, 0.25, 0.05, "bandpass", 1900, 0.8); noiseHit(v, tl, 0.001, 0.35, 0.09, "bandpass", 1900, 0.8); }
if (st >= 3) {
var k = tone(v, "sine", 150, tl, 0.002, 0.8, 0.25); k.o.frequency.exponentialRampToValueAtTime(48, tl + 0.12);
noiseHit(v, tl, 0.002, 0.22, 0.75, "highpass", 6000, 0.7);
}
},
splash: function (v, t) {
var r = v.r;
noiseHit(v, t, 0.003, 0.6, 0.12, "highpass", 1800, 0.7);
var b = noiseHit(v, t, 0.01, 0.55, 0.32, "bandpass", 1600, 1.3); b.f.frequency.exponentialRampToValueAtTime(420, t + 0.3);
var p = tone(v, "sine", 760, t + 0.02, 0.005, 0.6, 0.14); p.o.frequency.exponentialRampToValueAtTime(170, t + 0.15);
for (var i = 0; i < 3; i++) {
var tt = t + 0.13 + i * 0.075 + r.rand() * 0.02, f = 600 + r.rand() * 700;
var q = tone(v, "sine", f, tt, 0.003, 0.25, 0.05); q.o.frequency.exponentialRampToValueAtTime(f * 1.7, tt + 0.045);
}
},
cardOpen: function (v, t) {
var a = noiseHit(v, t, 0.01, 0.45, 0.06, "bandpass", 1800, 1.5); a.f.frequency.exponentialRampToValueAtTime(6000, t + 0.07);
noiseHit(v, t + 0.075, 0.001, 0.5, 0.018, "highpass", 3500, 0.7);
tone(v, "pulse12", mtof(K(v.r, 86)), t + 0.09, 0.003, 0.2, 0.15);
tone(v, "pulse12", mtof(K(v.r, 93)), t + 0.16, 0.003, 0.2, 0.19);
},
clap: function (v, t) {
noiseHit(v, t, 0.001, 0.9, 0.035, "bandpass", 2300, 1.1);
noiseHit(v, t, 0.001, 0.5, 0.012, "highpass", 5000, 0.7);
tone(v, "square", 820, t, 0.001, 0.22, 0.03);
var k = tone(v, "triangle", 260, t, 0.001, 0.35, 0.06); k.o.frequency.exponentialRampToValueAtTime(140, t + 0.06);
},
cardTick: function (v, t, o) {
var n = clamp(Math.round(+o.n || +o.remaining || 3), 1, 3), f = [2400, 2000, 1700][n - 1];
tone(v, "sine", f, t, 0.001, 0.6, 0.06);
tone(v, "triangle", f * 1.5, t, 0.001, 0.15, 0.03);
noiseHit(v, t, 0.001, 0.3, 0.012, "bandpass", 2600, 6);
},
wise: function (v, t) {
var r = v.r;
noiseHit(v, t, 0.002, 0.5, 0.04, "bandpass", 3500, 1.2);
noiseHit(v, t + 0.045, 0.002, 0.5, 0.06, "bandpass", 5200, 1.0);
bell(v, t + 0.08, mtof(K(r, 98)), 0.32, 0.5);
[86, 90, 93, 98].forEach(function (m, k) { tone(v, "pulse25", mtof(K(r, m)), t + 0.1 + k * 0.05, 0.003, 0.14, 0.12); });
var P = [86, 88, 90, 93, 95, 98, 100];
for (var i = 0; i < 5; i++) coinTing(v, t + 0.16 + i * 0.05 + r.rand() * 0.012, mtof(K(r, P[Math.floor(r.rand() * P.length)])), (r.rand() - 0.5) * 20, 0.12, 0.22);
},
risky: function (v, t) {
wahNote(v, 69, t, 0.16, 0.42);
wahNote(v, 68, t + 0.18, 0.16, 0.42);
wahNote(v, 67, t + 0.36, 0.36, 0.45, 0.94);
},
stamp: function (v, t) {
var x = tone(v, "sine", 170, t, 0.002, 0.9, 0.17); x.o.frequency.exponentialRampToValueAtTime(48, t + 0.1);
noiseHit(v, t, 0.001, 0.7, 0.06, "lowpass", 1100, 0.7);
noiseHit(v, t + 0.004, 0.001, 0.4, 0.025, "bandpass", 1700, 4);
},
debt: function (v, t, o) {
var part = o.part || "all", t2 = t, r = v.r;
if (part !== "clank") {
var g = v.gain(0, v.out), p = g.gain;
p.setValueAtTime(0, t); p.linearRampToValueAtTime(0.32, t + 0.06); p.setValueAtTime(0.32, t + 0.45); p.linearRampToValueAtTime(0, t + 0.56);
var w = v.osc("sine", 1900, t, t + 0.58, g); w.frequency.exponentialRampToValueAtTime(480, t + 0.56);
curveAt(w.detune, vibCurve(r, 0.5, 7, 25, 0.05), t + 0.03, 0.5);
t2 = t + 0.56;
}
if (part === "whistle") return;
var f = 155;
[[1, 0.5, 0.7], [2.76, 0.4, 0.5], [5.4, 0.28, 0.32], [8.93, 0.16, 0.18]].forEach(function (q) {
tone(v, "sine", f * q[0] * (1 + (r.rand() - 0.5) * 0.02), t2, 0.001, q[1], q[2]);
});
var th = tone(v, "sine", 90, t2, 0.001, 0.9, 0.22); th.o.frequency.exponentialRampToValueAtTime(38, t2 + 0.18);
noiseHit(v, t2, 0.001, 0.75, 0.12, "lowpass", 2600, 0.7);
noiseHit(v, t2, 0.001, 0.3, 0.05, "highpass", 5000, 0.7);
var tt = t2 + 0.07;
for (var i = 0; i < 10; i++) {
tt += 0.03 + r.rand() * 0.035;
var amp = 0.32 * (1 - i / 12), ff = 2800 + r.rand() * 2400;
noiseHit(v, tt, 0.001, amp, 0.02, "bandpass", ff, 7);
tone(v, "sine", ff * 0.9, tt, 0.001, amp * 0.4, 0.03);
}
},
scam: function (v, t) {
var r = v.r, cr = v.track(v.c.createWaveShaper()); cr.curve = r.crush; cr.connect(v.out);
var g = v.gain(0, cr), p = g.gain;
p.setValueAtTime(0, t); p.linearRampToValueAtTime(0.8, t + 0.005); p.setValueAtTime(0.8, t + 0.28); p.linearRampToValueAtTime(0, t + 0.34);
var rm = v.gain(0, g);
v.osc("square", 43, t, t + 0.35, rm.gain);
var o = v.osc("square", 1800, t, t + 0.35, rm);
for (var i = 0; i < 15; i++) o.frequency.setValueAtTime(1800 * Math.pow(150 / 1800, i / 14) * (0.75 + r.rand() * 0.6), t + i * 0.022);
var z = tone(v, "sawtooth", 3000, t, 0.002, 0.12, 0.3); z.o.frequency.exponentialRampToValueAtTime(180, t + 0.3);
for (var j = 0; j < 3; j++) noiseHit(v, t + 0.04 + j * 0.085 + r.rand() * 0.03, 0.001, 0.3, 0.02, "highpass", 3000, 0.7);
},
quake: function (v, t) {
var D = 1.7, r = v.r;
var env = v.gain(0, v.out), p = env.gain;
p.setValueAtTime(0, t); p.linearRampToValueAtTime(1, t + 0.18); p.setValueAtTime(1, t + 0.85);
p.exponentialRampToValueAtTime(0.002, t + D - 0.03); p.linearRampToValueAtTime(0, t + D);
var trem = v.gain(0.7, env), depth = v.gain(0.3, trem.gain);
v.osc("sine", 9, t, t + D, depth);
var nlow = v.gain(2.2), lp = v.filter("lowpass", 150, 1, trem); nlow.connect(lp); v.noise(t, t + D, nlow);
var subG = v.gain(0.35, trem), sub = v.osc("sine", 52, t, t + D, subG);
var wob = new Float32Array(32); for (var i = 0; i < 32; i++) wob[i] = 44 + r.rand() * 18;
try { sub.frequency.setValueCurveAtTime(wob, t + 0.001, D - 0.01); } catch (e) {}
var nmid = v.gain(0.9), bp = v.filter("bandpass", 320, 1.2, trem); nmid.connect(bp); v.noise(t, t + D, nmid);
for (var k = 0; k < 14; k++) {
var tt = t + 0.12 + r.rand() * 1.33;
noiseHit(v, tt, 0.001, 0.14 + r.rand() * 0.12, 0.025, "bandpass", 1800 + r.rand() * 2600, 6);
if (k % 3 === 0) tone(v, "triangle", 300 + r.rand() * 300, tt, 0.001, 0.15, 0.04);
}
},
shield: function (v, t) {
var r = v.r, g = v.gain(0, v.out);
envAD(g.gain, t, 0.12, 0.22, 0.33);
var bp = v.filter("bandpass", 400, 2, g, t); bp.frequency.exponentialRampToValueAtTime(1800, t + 0.35);
var o = v.osc("sawtooth", 220, t, t + 0.47, bp); o.frequency.exponentialRampToValueAtTime(660, t + 0.35);
[86, 90, 93, 98].forEach(function (m, k) {
var f = mtof(K(r, m)), tt = t + 0.06 + k * 0.06;
tone(v, "sine", f, tt, 0.004, 0.22, 0.62);
tone(v, "sine", f * 2, tt, 0.004, 0.06, 0.3);
});
noiseHit(v, t, 0.15, 0.08, 0.3, "highpass", 7000, 0.7);
},
timeWarn: function (v, t) {
var lp = v.filter("lowpass", 3500, 0.7, v.out);
[81, 76, 81, 76].forEach(function (m, k) { toneH(v, "pulse25", mtof(K(v.r, m)), t + k * 0.13, 0.004, 0.3, 0.085, 0.025, lp); });
},
timeUp: function (v, t) {
var f = 1180;
[0, 0.26, 0.52].forEach(function (dt, i) {
var tt = t + dt, last = i === 2, d = last ? 1.0 : 0.3;
[[1, 0.4, 1], [2.32, 0.2, 0.6], [3.1, 0.12, 0.4], [4.6, 0.07, 0.25]].forEach(function (q) { tone(v, "sine", f * q[0], tt, 0.001, q[1], d * q[2]); });
noiseHit(v, tt, 0.001, 0.25, 0.012, "highpass", 4000, 0.7);
});
},
gameOver: function (v, t) {
wahNote(v, 67, t, 0.3, 0.42);
wahNote(v, 66, t + 0.36, 0.3, 0.42);
wahNote(v, 65, t + 0.72, 0.3, 0.42);
wahNote(v, 64, t + 1.08, 0.85, 0.46, 0.96);
var b = tone(v, "triangle", 110, t + 1.98, 0.002, 0.5, 0.2); b.o.frequency.exponentialRampToValueAtTime(70, t + 2.12);
noiseHit(v, t + 1.98, 0.001, 0.3, 0.05, "lowpass", 800, 0.7);
},
win: function (v, t) {
var r = v.r;
for (var i = 0; i < 8; i++) noiseHit(v, t + i * 0.035, 0.001, 0.1 + i * 0.03, 0.05, "bandpass", 1900, 0.8);
[[74, 0.3, 0.08], [78, 0.39, 0.08], [81, 0.48, 0.08]].forEach(function (n) {
brass(v, K(r, n[0]), t + n[1], n[2], 0.34); brass(v, K(r, pentBelow(n[0], 2)), t + n[1], n[2], 0.2);
});
var tl = t + 0.57;
[[86, 0.34], [81, 0.24], [78, 0.22], [62, 0.26]].forEach(function (n) { brass(v, K(r, n[0]), tl, 0.85, n[1]); });
var k = tone(v, "sine", 150, tl, 0.002, 0.85, 0.25); k.o.frequency.exponentialRampToValueAtTime(48, tl + 0.12);
noiseHit(v, tl, 0.002, 0.26, 0.9, "highpass", 6000, 0.7);
var P = [93, 95, 98, 100, 102];
for (var j = 0; j < 6; j++) coinTing(v, tl + 0.12 + j * 0.08, mtof(K(r, P[Math.floor(r.rand() * P.length)])), (r.rand() - 0.5) * 20, 0.12, 0.18);
},
vine: function (v, t) {
var r = v.r;
for (var i = 0; i < 9; i++) noiseHit(v, t + i * 0.028 + r.rand() * 0.02, 0.002, 0.28 - i * 0.022, 0.035, "bandpass", 2600 + r.rand() * 3200, 1.6);
var cg = v.gain(0, v.out), cp = cg.gain;
cp.setValueAtTime(0, t); cp.linearRampToValueAtTime(0.18, t + 0.03); cp.setValueAtTime(0.18, t + 0.16); cp.linearRampToValueAtTime(0, t + 0.24);
var bp = v.filter("bandpass", 700, 7, cg, t); bp.frequency.exponentialRampToValueAtTime(1300, t + 0.22);
var co = v.osc("sawtooth", 95, t, t + 0.25, bp); co.frequency.exponentialRampToValueAtTime(150, t + 0.22);
var th = tone(v, "sine", 520, t + 0.05, 0.003, 0.5, 0.12); th.o.frequency.exponentialRampToValueAtTime(1250, t + 0.11);
tone(v, "triangle", mtof(K(r, 86)), t + 0.13, 0.003, 0.22, 0.25);
tone(v, "triangle", mtof(K(r, 93)), t + 0.2, 0.003, 0.18, 0.3);
},
slime: function (v, t) {
var a = tone(v, "sine", 520, t, 0.004, 0.55, 0.12); a.o.frequency.exponentialRampToValueAtTime(140, t + 0.11);
var n = noiseHit(v, t + 0.01, 0.004, 0.22, 0.09, "lowpass", 900, 1.4); n.f.frequency.exponentialRampToValueAtTime(260, t + 0.1);
var b = tone(v, "sine", 300, t + 0.07, 0.003, 0.25, 0.08); b.o.frequency.exponentialRampToValueAtTime(620, t + 0.14);
},
vineGet: function (v, t) {
var r = v.r;
noiseHit(v, t, 0.06, 0.16, 0.25, "bandpass", 3800, 1.2);
[81, 86, 90, 93, 98].forEach(function (m, k) {
tone(v, "triangle", mtof(K(r, m)), t + 0.04 + k * 0.06, 0.003, 0.2, 0.22);
tone(v, "sine", mtof(K(r, m)) * 2, t + 0.04 + k * 0.06, 0.003, 0.06, 0.15);
});
bell(v, t + 0.34, mtof(K(r, 98)), 0.18, 0.5);
},
jackpot: function (v, t) {
var r = v.r, P = [88, 90, 93, 95, 98, 100, 102];
var w = noiseHit(v, t, 0.42, 0.16, 0.12, "bandpass", 500, 1.4); w.f.frequency.exponentialRampToValueAtTime(5200, t + 0.5);
for (var i = 0; i < 14; i++) tone(v, "pulse25", mtof(K(r, PENT[6 + i])), t + i * 0.034, 0.002, 0.13 + i * 0.008, 0.05);
var t2 = t + 0.5;
[[86, 0.3], [81, 0.22], [78, 0.2], [74, 0.2], [62, 0.26]].forEach(function (n) { brass(v, K(r, n[0]), t2, 0.75, n[1]); });
var k = tone(v, "sine", 150, t2, 0.002, 0.9, 0.28); k.o.frequency.exponentialRampToValueAtTime(45, t2 + 0.14);
noiseHit(v, t2, 0.002, 0.28, 1.2, "highpass", 6000, 0.7);
[0, 0.17, 0.34].forEach(function (d, i) { bell(v, t2 + 0.06 + d, mtof(K(r, [98, 100, 105][i])), 0.24, 0.7); });
for (var j = 0; j < 30; j++) {
var tt = t2 + 0.12 + Math.pow(j / 30, 1.4) * 1.9 + r.rand() * 0.03;
coinTing(v, tt, mtof(K(r, P[Math.floor(r.rand() * P.length)])), (r.rand() - 0.5) * 40, 0.1 + r.rand() * 0.08, 0.22 * (1 - j / 42));
if (j % 3 === 0) noiseHit(v, tt + 0.01, 0.001, 0.1, 0.03, "bandpass", 4500 + r.rand() * 2500, 4);
}
},
frenzyTick: function (v, t, o) {
var n = clamp(Math.round(+o.n || 3), 1, 3);
coinTing(v, t, mtof(K(v.r, [100, 98, 93][n - 1])), 0, 0.1, 0.9);
tone(v, "triangle", mtof(K(v.r, [88, 86, 81][n - 1])), t, 0.002, 0.4, 0.07);
},
frenzyEnd: function (v, t) {
var r = v.r;
[98, 93, 86].forEach(function (m, k) { bell(v, t + k * 0.12, mtof(K(r, m)), 0.2, 0.45); });
var x = tone(v, "triangle", 880, t + 0.05, 0.01, 0.22, 0.5); x.o.frequency.exponentialRampToValueAtTime(220, t + 0.55);
},
post: function (v, t) {
var bp = v.filter("bandpass", 2400, 1.2, v.out);
for (var b = 0; b < 3; b++) {
var tt = t + b * 0.11, g = v.gain(0, bp), p = g.gain;
p.setValueAtTime(0, tt); p.linearRampToValueAtTime(0.7, tt + 0.004); p.setValueAtTime(0.7, tt + 0.075); p.linearRampToValueAtTime(0, tt + 0.085);
var gm = v.gain(0, g);
v.osc("square", 95, tt, tt + 0.09, gm.gain);
v.osc("square", 820 + b * 60, tt, tt + 0.09, gm);
}
noiseHit(v, t + 0.34, 0.001, 0.45, 0.05, "lowpass", 700, 0.7);
var c = tone(v, "sine", 140, t + 0.34, 0.002, 0.4, 0.07); c.o.frequency.exponentialRampToValueAtTime(70, t + 0.4);
bell(v, t + 0.38, mtof(K(v.r, 98)), 0.3, 0.35);
},
offerPop: function (v, t) {
bell(v, t, mtof(K(v.r, 88)), 0.32, 0.5);
bell(v, t + 0.12, mtof(K(v.r, 95)), 0.3, 0.6);
noiseHit(v, t, 0.002, 0.2, 0.05, "highpass", 6000, 0.7);
},
profitTick: function (v, t) {
coinTing(v, t, mtof(K(v.r, 93)), (v.r.rand() - 0.5) * 20, 0.1, 0.25);
},
scratch: function (v, t) {
for (var i = 0; i < 4; i++) noiseHit(v, t + i * 0.055, 0.004, 0.35, 0.04, "bandpass", 2500 + v.r.rand() * 1500, 1.2);
},
nearMiss: function (v, t) {
noiseHit(v, t, 0.001, 0.6, 0.05, "lowpass", 900, 0.8);
tone(v, "square", 220, t, 0.001, 0.15, 0.06);
wahNote(v, 64, t + 0.12, 0.22, 0.32);
wahNote(v, 60, t + 0.36, 0.42, 0.34, 0.92);
},
heartbeat: function (v, t) {
var a = tone(v, "sine", 70, t, 0.004, 0.9, 0.12); a.o.frequency.exponentialRampToValueAtTime(45, t + 0.1);
var b = tone(v, "sine", 62, t + 0.16, 0.004, 0.7, 0.14); b.o.frequency.exponentialRampToValueAtTime(40, t + 0.28);
},
reviveFail: function (v, t) {
SFX.scam(v, t);
var z = tone(v, "sawtooth", 440, t + 0.3, 0.01, 0.25, 0.9); z.o.frequency.exponentialRampToValueAtTime(40, t + 1.1);
}
};
function fPad(v, notes, t, dur, pk, cut, att) {
att = att || 0.6;
var g = v.gain(0, v.out), p = g.gain, peak = pk / notes.length;
p.setValueAtTime(0, t); p.linearRampToValueAtTime(peak, t + att); p.setValueAtTime(peak, t + dur - 0.8); p.linearRampToValueAtTime(0, t + dur);
var lp = v.filter("lowpass", cut || 1400, 0.6, g, t);
notes.forEach(function (m) { [-8, 8].forEach(function (d) { var o = v.osc("sawtooth", mtof(m), t, t + dur + 0.05, lp); o.detune.value = d; }); });
return lp;
}
function fPluck(v, m, t, pk, d) {
tone(v, "triangle", mtof(m), t, 0.003, pk, d || 0.6);
tone(v, "sine", mtof(m + 12), t, 0.002, pk * 0.3, (d || 0.6) * 0.5);
}
function fBox(v, m, t, pk, cents) {
var a = tone(v, "sine", mtof(m), t, 0.002, pk, 1.1); a.o.detune.value = cents || 0;
var b = tone(v, "sine", mtof(m) * 3.98, t, 0.001, pk * 0.18, 0.25); b.o.detune.value = cents || 0;
}
function fWhoosh(v, t, dur, pk, f0, f1) {
var n = noiseHit(v, t, dur * 0.6, pk, dur * 0.4, "bandpass", f0, 1.1); n.f.frequency.exponentialRampToValueAtTime(f1, t + dur);
}
function fBed(v, t, dur, pk, type, f, q, att) {
var g = v.gain(0, v.out), p = g.gain; att = att || 0.4;
p.setValueAtTime(0, t); p.linearRampToValueAtTime(pk, t + att); p.setValueAtTime(pk, t + dur - 0.6); p.linearRampToValueAtTime(0, t + dur);
var fl = v.filter(type, f, q, g, t); v.noise(t, t + dur, fl); return fl;
}
function fChirp(v, t, f, pk) {
var x = tone(v, "sine", f, t, 0.004, pk, 0.07); x.o.frequency.linearRampToValueAtTime(f * 1.35, t + 0.03); x.o.frequency.linearRampToValueAtTime(f * 0.92, t + 0.07);
}
function fGull(v, t, pk) {
var g = v.gain(0, v.out), p = g.gain;
p.setValueAtTime(0, t); p.linearRampToValueAtTime(pk, t + 0.03); p.linearRampToValueAtTime(pk * 0.7, t + 0.2); p.linearRampToValueAtTime(0, t + 0.38);
var bp = v.filter("bandpass", 1600, 3, g, t), o = v.osc("sawtooth", 1500, t, t + 0.4, bp);
o.frequency.setValueAtTime(1300, t); o.frequency.linearRampToValueAtTime(1750, t + 0.06); o.frequency.exponentialRampToValueAtTime(1050, t + 0.36);
curveAt(o.detune, vibCurve(v.r, 0.36, 14, 40, 0.05), t, 0.36);
}
function fTok(v, t, m, pk) {
tone(v, "triangle", mtof(m), t, 0.002, pk, 0.14);
noiseHit(v, t, 0.001, pk * 0.5, 0.03, "bandpass", 1800, 1.5);
var k = tone(v, "sine", 180, t, 0.002, pk * 0.6, 0.08); k.o.frequency.exponentialRampToValueAtTime(70, t + 0.08);
}
function fBoom(v, t, pk) {
var k = tone(v, "sine", 150, t, 0.002, pk, 0.9); k.o.frequency.exponentialRampToValueAtTime(38, t + 0.25);
noiseHit(v, t, 0.002, pk * 0.3, 0.5, "lowpass", 300, 0.7);
}
var VIA = {
dissolve: function (v, t) { fWhoosh(v, t, 0.7, 0.05, 300, 1600); },
whip: function (v, t) { fWhoosh(v, t, 0.34, 0.42, 380, 4200); noiseHit(v, t + 0.3, 0.002, 0.12, 0.06, "highpass", 3000, 0.7); },
white: function (v, t) { var n = noiseHit(v, t, 0.5, 0.2, 0.5, "highpass", 3500, 0.7); n.f.frequency.linearRampToValueAtTime(7000, t + 0.5); },
hook: function (v, t) { fWhoosh(v, t, 0.6, 0.08, 2400, 300); }
};
var FILM = {
open: function (v, t) {
var r = v.r, g = v.gain(0, v.out), p = g.gain;
p.setValueAtTime(0, t); p.linearRampToValueAtTime(0.16, t + 0.25); p.setValueAtTime(0.16, t + 5); p.linearRampToValueAtTime(0, t + 6);
var gate = v.gain(0.5, g), lg = v.gain(0.5, gate.gain);
v.osc("square", 24, t, t + 6, lg);
v.noise(t, t + 6, v.filter("bandpass", 2600, 1.3, gate, t));
var hum = tone(v, "triangle", 50, t, 0.4, 0.08, 5.5); hum.o.frequency.linearRampToValueAtTime(60, t + 0.8);
fPad(v, [38, 45, 50], t + 0.1, 5, 0.09, 700, 1.4);
bell(v, t + 0.55, mtof(86), 0.12, 1.6); bell(v, t + 0.55, mtof(93), 0.05, 1.2);
},
campus: function (v, t) {
var r = v.r;
fPad(v, [50, 57, 62, 66, 69, 76], t, 6, 0.1, 1800, 0.9);
fBed(v, t, 5.5, 0.03, "lowpass", 700, 0.5, 1);
for (var k = 0; k < 18; k++) noiseHit(v, t + 0.55 + k * 0.045 + r.rand() * 0.015, 0.001, 0.12, 0.02, "bandpass", 2400 + r.rand() * 1600, 2);
[[0, 4300], [0.12, 4600], [1.4, 3900], [1.52, 4200], [1.6, 4500], [2.6, 5000]].forEach(function (c) { fChirp(v, t + 0.3 + c[0], c[1], 0.05); });
var mel = [74, 78, 81, 83, 81, 78, 76, 81, 86];
mel.forEach(function (m, i) { fPluck(v, m, t + 0.9 + i * 0.27, 0.12, 0.7); });
fPluck(v, 50, t + 0.9, 0.16, 1.4); fPluck(v, 57, t + 1.98, 0.12, 1.2);
},
pay: function (v, t) {
var r = v.r, P = [88, 90, 93, 95, 98, 100];
fPad(v, [43, 55, 59, 62, 71], t, 5.5, 0.1, 2200, 0.4);
noiseHit(v, t + 0.1, 0.002, 0.3, 0.12, "bandpass", 3200, 1.2);
tone(v, "square", 2600, t + 0.1, 0.001, 0.08, 0.03);
bell(v, t + 0.18, mtof(98), 0.3, 1.1); bell(v, t + 0.3, mtof(103), 0.26, 1.3);
for (var j = 0; j < 22; j++) {
var tt = t + 0.35 + Math.pow(j / 22, 1.3) * 1.6 + r.rand() * 0.03;
coinTing(v, tt, mtof(P[Math.floor(r.rand() * P.length)]), (r.rand() - 0.5) * 40, 0.1 + r.rand() * 0.08, 0.16 * (1 - j / 30));
}
[[74, 0.55], [78, 0.68], [81, 0.81]].forEach(function (n) { brass(v, n[0], t + n[1], 0.1, 0.16); });
[[86, 0.24], [81, 0.16], [78, 0.14]].forEach(function (n) { brass(v, n[0], t + 0.96, 0.7, n[1]); });
fPluck(v, 43, t + 0.96, 0.16, 1.2);
},
spend: function (v, t) {
var r = v.r;
fPad(v, [46, 58, 62, 65, 69], t, 6, 0.1, 2600, 0.35);
[86, 90, 93, 98].forEach(function (m, i) {
var x = toneH(v, "sine", mtof(m), t + 0.1 + i * 0.12, 0.35, 0.035, 2.2, 0.8); curveAt(x.o.detune, vibCurve(r, 2.6, 5.5, 14, 0.3), t + 0.1, 2.6);
});
for (var s = 0; s < 7; s++) coinTing(v, t + 0.2 + s * 0.16 + r.rand() * 0.05, mtof([93, 98, 100, 102, 105][s % 5]), 0, 0.15, 0.07);
noiseHit(v, t + 0.32, 0.002, 0.2, 0.08, "lowpass", 900, 0.8); tone(v, "square", 160, t + 0.32, 0.002, 0.12, 0.06);
for (var i = 0; i < 46; i++) {
var tt = t + 1.15 + i * 0.034;
tone(v, "square", 700 + (i % 3) * 140, tt, 0.001, 0.05, 0.014);
if (i % 2 === 0) noiseHit(v, tt, 0.001, 0.05, 0.012, "highpass", 4000, 0.7);
}
[[70, 1.2], [69, 1.5], [68, 1.8], [67, 2.1]].forEach(function (n) { fPluck(v, n[0], t + n[1], 0.1, 0.5); });
},
scam: function (v, t) {
var r = v.r;
fBed(v, t, 6, 0.09, "highpass", 1100, 0.5, 0.15);
var rumble = noiseHit(v, t + 0.05, 0.03, 0.75, 2.4, "lowpass", 220, 0.8); rumble.f.frequency.exponentialRampToValueAtTime(90, t + 2.2);
noiseHit(v, t, 0.001, 0.3, 0.3, "highpass", 1800, 0.7);
fPad(v, [38, 39, 50], t + 0.2, 5.5, 0.12, 480, 0.8);
noiseHit(v, t + 0.32, 0.002, 0.2, 0.08, "lowpass", 900, 0.8); tone(v, "square", 150, t + 0.32, 0.002, 0.12, 0.06);
[[50, 0.7], [53, 0.95], [56, 1.2], [55, 1.45], [50, 1.95], [53, 2.2], [57, 2.45], [56, 2.7]].forEach(function (n) { fPluck(v, n[0], t + n[1], 0.2, 0.22); });
for (var j = 0; j < 4; j++) coinTing(v, t + 1.3 + j * 0.28 + j * j * 0.04, mtof(98 - j * 4), -j * 30, 0.14, 0.12);
var gulp = tone(v, "sine", 320, t + 2.5, 0.01, 0.2, 0.25); gulp.o.frequency.exponentialRampToValueAtTime(70, t + 2.75);
for (var d = 0; d < 10; d++) noiseHit(v, t + r.rand() * 3, 0.001, 0.05, 0.02, "bandpass", 2500 + r.rand() * 3000, 6);
},
delay: function (v, t) {
var r = v.r;
fPad(v, [47, 54, 62, 66], t, 6, 0.09, 800, 1);
noiseHit(v, t + 0.32, 0.002, 0.2, 0.08, "lowpass", 900, 0.8); tone(v, "square", 140, t + 0.32, 0.002, 0.12, 0.06);
for (var i = 0; i < 9; i++) {
var tt = t + 0.15 + i * 0.5; tone(v, "square", i % 2 ? 1150 : 1500, tt, 0.001, 0.07, 0.02); noiseHit(v, tt, 0.001, 0.08, 0.015, "highpass", 4500, 0.7);
}
var mel = [83, 86, 90, 88, 86, 85, 83, 78], at = t + 0.6;
mel.forEach(function (m, i) { fBox(v, m, at, 0.13, -i * 9); at += 0.3 + i * 0.045; });
for (var p = 0; p < 6; p++) { var pt = t + 0.9 + p * 0.38 + r.rand() * 0.1;
for (var q = 0; q < 4; q++) noiseHit(v, pt + q * 0.03, 0.002, 0.05, 0.025, "bandpass", 1600 + r.rand() * 1400, 1.5); }
},
tower: function (v, t) {
var r = v.r;
var lp = fPad(v, [45, 52, 61, 64, 69], t + 0.3, 5, 0.12, 600, 0.6); lp.frequency.exponentialRampToValueAtTime(3200, t + 3.4);
var sea = fBed(v, t, 5.5, 0.07, "lowpass", 500, 0.6, 1); sea.frequency.linearRampToValueAtTime(900, t + 1.5); sea.frequency.linearRampToValueAtTime(450, t + 3.2);
fGull(v, t + 0.6, 0.05); fGull(v, t + 1.0, 0.04); fGull(v, t + 2.2, 0.035);
var w = tone(v, "triangle", 500, t + 0.9, 0.02, 0.1, 0.3); w.o.frequency.exponentialRampToValueAtTime(1100, t + 1.15);
[[69, 0.9], [73, 1.15], [76, 1.4], [81, 1.65]].forEach(function (n) { brass(v, n[0], t + n[1], 0.18, 0.12); });
for (var i = 0; i < 34; i++) noiseHit(v, t + 1.9 + i * 0.045, 0.001, 0.04 + i * 0.006, 0.04, "bandpass", 1900, 0.8);
},
title: function (v, t) {
fBoom(v, t, 0.85);
noiseHit(v, t, 0.002, 0.24, 2.2, "highpass", 6000, 0.7);
[[62, 0.2], [66, 0.17], [69, 0.17], [74, 0.2], [50, 0.2]].forEach(function (n) { brass(v, n[0], t, 1.3, n[1]); });
fPad(v, [50, 57, 62, 66, 69, 74], t, 8.5, 0.14, 2600, 0.3);
for (var i = 0; i < 8; i++) fTok(v, t + 0.3 + i * 0.08, PENT[7 + i], 0.18);
bell(v, t + 0.8, mtof(81), 0.16, 1.6); bell(v, t + 0.8, mtof(86), 0.1, 1.4);
[74, 78, 81, 86].forEach(function (m, i) { fPluck(v, m, t + 1.2 + i * 0.22, 0.1, 0.9); });
},
hook: function (v, t) {
fPad(v, [47, 55, 62, 69, 76], t, 7, 0.11, 1100, 1);
var a = tone(v, "sine", 62, t + 0.2, 0.004, 0.35, 0.14); a.o.frequency.exponentialRampToValueAtTime(42, t + 0.32);
var b = tone(v, "sine", 56, t + 0.38, 0.004, 0.26, 0.16); b.o.frequency.exponentialRampToValueAtTime(38, t + 0.52);
[[74, 1.1, 0.7], [78, 1.45, 0.7], [76, 1.8, 2.6]].forEach(function (n) { fPluck(v, n[0], t + n[1], 0.16, n[2]); });
bell(v, t + 1.8, mtof(88), 0.06, 2);
}
};
var LEVEL = {
uiOpen: 0.8, uiClose: 0.95, uiNext: 0.8, uiBack: 0.85, uiToggle: 1.0, uiSelect: 0.8, uiDone: 0.55, uiNope: 0.65, go: 0.85, lock: 0.85, netCatch: 0.9, rescue: 0.7, rival: 0.8, reel: 0.5, reelStop: 0.85,
click: 0.7, spawn: 0.7, move: 1.35, rotate: 0.7, hold: 0.75, release: 0.7, harddrop: 0.85, deposit: 0.7,
floor: 0.8, stage: 0.95, splash: 0.85, cardOpen: 0.8, clap: 0.8, cardTick: 0.75, wise: 0.9, risky: 0.5, stamp: 0.9,
debt: 0.8, scam: 0.45, quake: 1.0, shield: 0.9, timeWarn: 0.75, timeUp: 0.9, gameOver: 0.52, win: 1.0, post: 0.85,
vine: 0.85, vineGet: 0.8, slime: 0.7, jackpot: 1.0, frenzyTick: 1.0, frenzyEnd: 0.8,
offerPop: 0.8, profitTick: 0.7, scratch: 0.7, nearMiss: 0.55, heartbeat: 1.0, reviveFail: 0.6
};
var THROTTLE = { slime: 0.1, uiOpen: 0.12, uiClose: 0.12, uiNext: 0.08, uiBack: 0.08, uiToggle: 0.06, uiSelect: 0.05, uiNope: 0.25, go: 0.3, lock: 0.3, netCatch: 0.2, rescue: 0.3, rival: 1, reel: 0.05, reelStop: 0.1, move: 0.055, rotate: 0.05, click: 0.035, deposit: 0.045, spawn: 0.08, cardTick: 0.15, splash: 0.08,
hold: 0.06, release: 0.05, harddrop: 0.08, stamp: 0.08, cardOpen: 0.1, vine: 0.06, vineGet: 0.3,
jackpot: 1.5, frenzyTick: 0.3, frenzyEnd: 0.5, profitTick: 0.08, scratch: 0.1, heartbeat: 0.3 };
var LOW_PRIORITY = { move: 1, click: 1, spawn: 1, rotate: 1, hold: 1, release: 1, deposit: 1, cardTick: 1 };
var IMPACT = {
card: function (v, t, s, r) {
noiseHit(v, t, 0.001, 0.8, 0.025 + 0.025 * s, "bandpass", 1800 + 2600 * s, 1.1);
tone(v, "sine", 420 * (1 + (r() - 0.5) * 0.2), t, 0.001, 0.25, 0.03);
},
wood: function (v, t, s, r) {
var f = 340 * (1 + (r() - 0.5) * 0.25);
var x = tone(v, "triangle", f, t, 0.001, 0.8, 0.07 + 0.06 * s); x.o.frequency.exponentialRampToValueAtTime(f * 0.88, t + 0.06);
noiseHit(v, t, 0.001, 0.5, 0.03 + 0.02 * s, "bandpass", f * 2.4, 7);
},
plastic: function (v, t, s, r) {
noiseHit(v, t, 0.001, 0.65, 0.02 + 0.015 * s, "bandpass", 2600 + 1600 * s, 3);
tone(v, "square", 1250 * (1 + (r() - 0.5) * 0.2), t, 0.001, 0.12, 0.018);
noiseHit(v, t + 0.012 + r() * 0.01, 0.001, 0.28, 0.015, "bandpass", 3200, 3);
},
metal: function (v, t, s, r) {
var f = 560 * (1 + (r() - 0.5) * 0.18), d = 0.18 + 0.4 * s;
[[1, 0.5, 1], [2.76, 0.35, 0.6], [5.4, 0.05 + 0.22 * s, 0.35]].forEach(function (p) { tone(v, "sine", f * p[0], t, 0.001, p[1], d * p[2]); });
noiseHit(v, t, 0.001, 0.1 + 0.35 * s, 0.012, "highpass", 4000, 0.7);
},
glass: function (v, t, s, r) {
var f = 2700 * (1 + (r() - 0.5) * 0.2);
tone(v, "sine", f, t, 0.001, 0.45, 0.12 + 0.18 * s);
tone(v, "sine", f * 2.32, t, 0.001, 0.2, 0.06 + 0.08 * s);
noiseHit(v, t, 0.001, 0.2, 0.008, "highpass", 6000, 0.7);
},
fabric: function (v, t, s) {
noiseHit(v, t, 0.004, 1.0, 0.06 + 0.03 * s, "lowpass", 280 + 520 * s, 0.7);
var x = tone(v, "sine", 95, t, 0.003, 0.45, 0.07); x.o.frequency.exponentialRampToValueAtTime(55, t + 0.07);
},
rubber: function (v, t, s, r) {
var f = 190 * (1 + (r() - 0.5) * 0.2), d = 0.16 + 0.12 * s;
var x = tone(v, "triangle", f, t, 0.003, 0.7, d);
x.o.frequency.exponentialRampToValueAtTime(f * 1.9, t + 0.05); x.o.frequency.exponentialRampToValueAtTime(f * 1.45, t + d);
curveAt(x.o.detune, vibCurve(v.r, d, 14, 70, 0, 6), t, d);
noiseHit(v, t, 0.001, 0.3, 0.02, "lowpass", 600, 0.7);
},
food: function (v, t, s) {
var n = noiseHit(v, t, 0.006, 0.85, 0.09 + 0.04 * s, "bandpass", 1300, 2.2); n.f.frequency.exponentialRampToValueAtTime(320, t + 0.1);
var x = tone(v, "sine", 130, t, 0.003, 0.45, 0.06); x.o.frequency.exponentialRampToValueAtTime(70, t + 0.06);
},
slick: function (v, t, s, r) {
var f = 1150 * (1 + (r() - 0.5) * 0.2), d = 0.08 + 0.06 * s;
var x = tone(v, "triangle", f, t, 0.006, 0.4, d); x.o.frequency.exponentialRampToValueAtTime(f * 1.7, t + d);
curveAt(x.o.detune, vibCurve(v.r, d, 32, 60, 0), t, d);
},
platform: function (v, t, s, r) {
var x = tone(v, "sine", 125, t, 0.002, 1.0, 0.16 + 0.1 * s); x.o.frequency.exponentialRampToValueAtTime(48, t + 0.13);
noiseHit(v, t, 0.001, 0.6, 0.06, "lowpass", 500 + 700 * s, 0.7);
tone(v, "triangle", 215 * (1 + (r() - 0.5) * 0.1), t, 0.001, 0.45, 0.09);
}
};
var IMP_LEVEL = { card: 0.75, wood: 0.7, plastic: 2.1, metal: 0.6, glass: 0.6, fabric: 0.8, rubber: 0.6, food: 0.75, slick: 1.7, platform: 0.8 };
function playImpact(r, material, s, pan, t) {
var m = own(IMPACT, material) ? material : "card";
var fn = IMPACT[m], lvl = (own(IMP_LEVEL, m) || 0.6) * (0.14 + 0.86 * Math.pow(s, 1.3));
var v = new Voice(r, r.sfxIn, lvl, pan || 0);
fn(v, t, s, r.rand);
return v;
}
function Engine(r) {
var c = r.ctx, self = this;
this.r = r; this.c = c; this.nodes = [];
function N(n) { self.nodes.push(n); r.nodes++; return n; }
function filt(type, f, q, dest) { var b = N(c.createBiquadFilter()); b.type = type; b.frequency.value = f; b.Q.value = q; if (dest) b.connect(dest); return b; }
function gn(v, dest) { var g = N(c.createGain()); g.gain.value = v; if (dest) g.connect(dest); return g; }
this.bus = gn(1, r.musicIn);
this.drums = gn(1, this.bus);
this.hatF = filt("highpass", 7000, 0.7, this.drums);
this.snF = filt("bandpass", 1900, 0.9, this.drums);
this.clapF = filt("bandpass", 1300, 1.4, this.drums);
this.bassF = filt("lowpass", 950, 1, this.bus);
this.leadF = filt("lowpass", 3400, 0.5, this.bus);
var send = gn(0.2, null); this.leadF.connect(send);
this.delay = N(c.createDelay(1.0)); this.delay.delayTime.value = 0.75 * 60 / BPM;
send.connect(this.delay);
var fbF = filt("lowpass", 2200, 0, null), fb = gn(0.3, this.delay);
this.delay.connect(fbF); fbF.connect(fb); this.delay.connect(this.bus);
this.arpF = filt("lowpass", 2600, 0.7, this.bus);
if (c.createStereoPanner) {
this.arpL = N(c.createStereoPanner()); this.arpL.pan.value = -0.4; this.arpL.connect(this.arpF);
this.arpR = N(c.createStereoPanner()); this.arpR.pan.value = 0.4; this.arpR.connect(this.arpF);
} else { this.arpL = this.arpR = this.arpF; }
this.ctrF = filt("lowpass", 2400, 0, this.bus);
this.padF = filt("lowpass", 1300, 0.5, this.bus);
this.brassF = filt("lowpass", 3600, 0.7, this.bus);
this.pos = 0; this.next = 0; this.stage = 0; this.pend = null; this.key = 0; this.mul = 1; this.solo = null; this.frenzy = false;
this.halted = false; this.dead = false;
}
var EP = Engine.prototype;
EP.sd = function () { return 60 / (BPM * this.mul) / 4; };
EP.voice = function (dest) { return new Voice(this.r, dest, null); };
EP.setStage = function (st, t) {
this.stage = st; this.key = st >= 3 ? 2 : 0; this.r.key = this.key;
this.leadF.frequency.setTargetAtTime(st >= 3 ? 5200 : 3400, t, 0.05);
this.arpF.frequency.setTargetAtTime(st >= 3 ? 3600 : 2600, t, 0.05);
this.padF.frequency.setTargetAtTime(st >= 3 ? 2400 : 1300, t, 0.05);
this.brassF.frequency.setTargetAtTime(st >= 3 ? 4600 : 3200, t, 0.05);
};
EP.setMul = function (m, t) {
this.mul = m;
try { this.delay.delayTime.setTargetAtTime(0.75 * 60 / (BPM * m), t, 0.05); } catch (e) {}
};
EP.step = function (t, silent) {
var s = this.pos & 15, bar = (this.pos >> 4) % BARS;
if (s === 0 && this.pend != null) { this.setStage(this.pend, t); this.pend = null; }
if (!silent) this.play(bar, s, t);
this.pos = (this.pos + 1) % (BARS * 16);
this.next = t + this.sd();
};
EP.on = function (part) { return !this.solo || this.solo === part; };
EP.play = function (bar, s, t) {
var st = this.stage, fast = this.mul > 1, sd = this.sd(), k = this.key, ch = SONG.ch[bar], phraseEnd = (bar % 8) === 7;
if (this.on("drums")) {
var kv = 0;
if (st >= 3 || fast) kv = (s % 4 === 0) ? (s === 0 ? 1 : 0.85) : (phraseEnd && s === 14 ? 0.6 : 0);
else if (st >= 1) kv = s === 0 ? 1 : s === 8 ? 0.85 : s === 10 ? 0.55 : (st === 2 && s === 6) ? 0.45 : 0;
else kv = s === 0 ? 0.75 : s === 8 ? 0.55 : 0;
if (kv) this.kick(t, kv);
if (st >= 1 && (s === 4 || s === 12)) this.snare(t, 0.8);
if (st >= 1 && phraseEnd && s >= 13) this.snare(t, 0.3 + (s - 13) * 0.2);
if (st >= 2 && (s === 4 || s === 12)) this.clap(t, 0.8);
var hv = 0, open = false;
if (fast) { hv = [1, 0.5, 0.75, 0.5][s % 4]; open = (s % 8) === 6; }
else if (st >= 2) { hv = [0.5, 0.22, 0.75, 0.28][s % 4]; open = s === 14; }
else if (st === 1) hv = s % 2 ? 0 : (s % 4 === 2 ? 0.75 : 0.4);
else hv = (s % 4 === 2) ? 0.6 : 0;
if (hv) this.hat(t, hv * (0.9 + this.r.rand() * 0.2), open);
if (st >= 3 && s === 0 && bar % 8 === 0) this.crash(t, 0.55);
}
if (this.on("bass")) {
var bp = BASS_PAT[Math.min(st, 3)][s];
if (bp) this.bass(t, ch.bass + bp[0] + k, bp[1] * sd * 0.85, s === 0 ? 1 : 0.8);
}
var ev = SONG.lead[bar][s];
if (ev && this.on("lead")) this.lead(t, ev.m + k, ev.len * sd, st);
if (st >= 1 && this.on("arp")) {
var ix = -1;
if (st === 1) { if (s % 2 === 0) ix = ARP_SEQ[(s >> 1) % 8]; }
else ix = ARP_SEQ[s % 8];
if (ix >= 0) this.arp(t, ch.arp[ix] + k, s % 4 === 0 ? 1 : 0.6, (s >> 1) & 1);
}
var ce = SONG.ctr[bar][s];
if (st >= 2 && ce && this.on("counter")) this.counter(t, ce.m + k, ce.len * sd);
if (st >= 2 && s === 0 && this.on("pad")) this.pad(t, ch.arp, 16 * sd, k, st);
if (st >= 3 && this.on("brass")) {
if (s === 0) this.brass(t, [ch.arp[0] + k, ch.arp[2] + k], 2 * sd, 0.15, bar % 4 === 0 ? ch.arp[3] + 12 + k : 0);
else if (s === 10) this.brass(t, [ch.arp[1] + k, ch.arp[3] + k], 1.5 * sd, 0.13, 0);
else if ((bar % 4) === 3 && s === 14) this.brass(t, [ch.arp[0] + k, ch.arp[3] + k], 1.2 * sd, 0.14, 0);
}
if (this.frenzy && this.on("arp") && s % 2 === 1) this.ping(t, ch.arp[COIN_SEQ[(s >> 1) % 8]] + 12 + k, s % 4 === 1 ? 1 : 0.65);
};
EP.kick = function (t, vel) {
var x = this.voice(this.drums), g = x.gain(0, x.out);
envAD(g.gain, t, 0.003, 0.9 * vel, 0.25);
var o = x.osc("sine", 150, t, t + 0.27, g); o.frequency.exponentialRampToValueAtTime(48, t + 0.11);
};
EP.snare = function (t, vel) {
var x = this.voice(this.snF), g = x.gain(0, x.out);
envAD(g.gain, t, 0.001, 0.7 * vel, 0.13); x.noise(t, t + 0.15, g);
var g2 = x.gain(0, this.drums); envAD(g2.gain, t, 0.001, 0.3 * vel, 0.07);
var o = x.osc("triangle", 190, t, t + 0.09, g2); o.frequency.exponentialRampToValueAtTime(140, t + 0.06);
};
EP.clap = function (t, vel) {
var x = this.voice(this.clapF), g = x.gain(0, x.out), p = g.gain, a = 0.75 * vel;
p.setValueAtTime(0, t); p.linearRampToValueAtTime(a, t + 0.001); p.exponentialRampToValueAtTime(a * 0.15, t + 0.01);
p.linearRampToValueAtTime(a, t + 0.011); p.exponentialRampToValueAtTime(a * 0.15, t + 0.02);
p.linearRampToValueAtTime(a, t + 0.021); p.exponentialRampToValueAtTime(0.0003, t + 0.15); p.linearRampToValueAtTime(0, t + 0.155);
x.noise(t, t + 0.16, g);
};
EP.hat = function (t, vel, open) {
var x = this.voice(this.hatF), g = x.gain(0, x.out), d = open ? 0.2 : 0.035;
envAD(g.gain, t, 0.001, 0.32 * vel, d); x.noise(t, t + d + 0.01, g);
};
EP.crash = function (t, vel) {
var x = this.voice(this.hatF), g = x.gain(0, x.out);
envAD(g.gain, t, 0.002, 0.3 * vel, 1.1); x.noise(t, t + 1.11, g);
};
EP.bass = function (t, m, dur, vel) {
var x = this.voice(this.bassF), g = x.gain(0, x.out);
var e = ahdsr(g.gain, t, dur, 0.5 * vel, 0.006, 0.08, 0.7, 0.03);
x.osc("bass", mtof(m), t, e + 0.005, g);
};
EP.lead = function (t, m, dur, st) {
var x = this.voice(this.leadF), g = x.gain(0, x.out), d = dur * 0.9, f = mtof(m);
var e = ahdsr(g.gain, t, d, 0.26, 0.006, 0.1, 0.7, 0.06);
var o = x.osc("pulse25", f, t, e + 0.005, g);
if (d > 0.3) curveAt(o.detune, vibCurve(this.r, d, 5.8, 14, 0.15), t, d);
if (st >= 3) { var g2 = x.gain(0, x.out); ahdsr(g2.gain, t, d, 0.1, 0.006, 0.1, 0.7, 0.06); x.osc("triangle", f * 2, t, e + 0.005, g2); }
};
EP.arp = function (t, m, vel, side) {
var x = this.voice(side ? this.arpR : this.arpL), g = x.gain(0, x.out);
var e = envAD(g.gain, t, 0.002, 0.2 * vel, 0.15);
x.osc("pulse12", mtof(m), t, e + 0.002, g);
};
var COIN_SEQ = [3, 2, 1, 2, 3, 1, 2, 0];
EP.ping = function (t, m, vel) {
var x = this.voice(this.arpF), f = mtof(m), g = x.gain(0, x.out), g2 = x.gain(0, x.out);
var e = envAD(g.gain, t, 0.002, 0.11 * vel, 0.09); envAD(g2.gain, t, 0.002, 0.06 * vel, 0.07);
x.osc("pulse25", f, t, e + 0.002, g); x.osc("sine", f * 2, t, e + 0.002, g2);
};
EP.counter = function (t, m, dur) {
var x = this.voice(this.ctrF), g = x.gain(0, x.out), d = dur * 0.95;
var e = ahdsr(g.gain, t, d, 0.3, 0.04, 0.15, 0.8, 0.12);
var o = x.osc("flute", mtof(m), t, e + 0.005, g);
if (d > 0.35) curveAt(o.detune, vibCurve(this.r, d, 5, 10, 0.2), t, d);
};
EP.pad = function (t, notes, dur, k, st) {
var x = this.voice(this.padF), list = st >= 3 ? notes : notes.slice(0, 3);
var pk = (st >= 3 ? 0.18 : 0.14) / list.length, d = dur * 0.96;
var g = x.gain(0, x.out);
ahdsr(g.gain, t, d, pk, 0.18, 0.2, 0.82, 0.14);
for (var i = 0; i < list.length; i++) {
var f = mtof(list[i] + k);
if (st >= 3) {
var o1 = x.osc("sawtooth", f, t, t + d + 0.16, g); o1.detune.value = -6;
var o2 = x.osc("sawtooth", f, t, t + d + 0.16, g); o2.detune.value = 6;
} else {
x.osc("triangle", f, t, t + d + 0.16, g);
}
}
};
EP.brass = function (t, notes, dur, pk, chime) {
var x = this.voice(this.brassF);
for (var i = 0; i < notes.length; i++) brass(x, notes[i], t, dur, pk);
if (chime) bell(x, t, mtof(chime), 0.08, 0.55);
};
EP.dispose = function () {
this.dead = true;
for (var i = 0; i < this.nodes.length; i++) { try { this.nodes[i].disconnect(); } catch (e) {} }
this.nodes.length = 0;
};
var ctx = null, rig = null, engine = null, timer = null;
var muted = readMuted(), musicVolume = 1, sfxVolume = 1;
var wantMusic = false, mStage = 0, mMode = "normal", pauseAt = 0;
var userSuspended = false, hidden = false, unlockedOnce = false;
var filmV = null, filmTok = 0;
var lastSfx = {}, sfxEnds = [], impEnds = [], impTokens = 4, impLastT = 0, impLastMat = {};
function readMuted() { try { return W.localStorage.getItem(STORE_KEY) === "1"; } catch (e) { return false; } }
function writeMuted(v) { try { W.localStorage.setItem(STORE_KEY, v ? "1" : "0"); } catch (e) {} }
function now() { return ctx ? ctx.currentTime : 0; }
function running() { return !!(ctx && rig && ctx.state === "running"); }
function promiseSafe(p) { if (p && typeof p.catch === "function") p.catch(noop); }
function rampTo(param, v, tau) {
var t = now();
try { param.cancelScheduledValues(t); param.setValueAtTime(param.value, t); param.setTargetAtTime(v, t, tau); } catch (e) { try { param.value = v; } catch (e2) {} }
}
function applyRun() {
if (!ctx) return;
var want = !userSuspended && !hidden;
try {
if (want && ctx.state !== "running" && ctx.state !== "closed") promiseSafe(ctx.resume());
else if (!want && ctx.state === "running") promiseSafe(ctx.suspend());
} catch (e) {}
}
function applyMute() { if (rig) rampTo(rig.out.gain, muted ? 0 : 1, 0.015); }
function applyMode(mode) {
if (!rig) return;
var mi = rig.musicIn.gain, lp = rig.musicLP.frequency;
if (mode === "card") { rampTo(mi, 0.3, 0.08); rampTo(lp, 900, 0.08); }
else if (mode === "menu") { rampTo(mi, 0.55, 0.3); rampTo(lp, 2200, 0.3); }
else if (mode === "paused") { rampTo(mi, 0, 0.25); rampTo(lp, 700, 0.2); pauseAt = now() + 1.0; }
else if (mode !== "over") { rampTo(mi, 1, 0.12); rampTo(lp, 18000, 0.1); }
if (engine) {
if (mode === "fast" || mode === "normal" || mode === "frenzy" || mode === "menu") {
engine.setMul(mode === "fast" ? FAST_MUL : mode === "frenzy" ? FRENZY_MUL : 1, now()); engine.frenzy = mode === "frenzy";
}
if (mode !== "paused" && engine.halted) { engine.halted = false; engine.next = now() + 0.05; }
}
}
function tick() {
var E = engine;
if (!E || !running()) return;
var t = ctx.currentTime;
if (mMode === "paused") { if (t > pauseAt) { E.halted = true; return; } }
if (E.halted) return;
if (E.next < t - 0.25) E.next = t + 0.03;
var guard = 0;
while (E.next < t + LOOKAHEAD && guard++ < 48) {
try { E.step(E.next, muted); } catch (e) { E.next = t + 0.05; break; }
}
}
function startMusic() {
wantMusic = true;
if (!rig || (engine && !engine.dead)) return;
if (mMode === "over" || mMode === "paused") mMode = "normal";
engine = new Engine(rig);
engine.setStage(mStage, now());
engine.setMul(mMode === "fast" ? FAST_MUL : mMode === "frenzy" ? FRENZY_MUL : 1, now()); engine.frenzy = mMode === "frenzy";
engine.next = now() + 0.06;
applyMode(mMode);
if (!timer) timer = W.setInterval(tick, TICK_MS);
tick();
}
function cleanFade(sec) {
var s = +sec;
return Number.isFinite(s) ? clamp(s, 0, 60) : 0;
}
function stopMusic(fade) {
wantMusic = false;
if (timer) { W.clearInterval(timer); timer = null; }
var E = engine; engine = null;
if (!E || !ctx) return;
fade = cleanFade(fade);
rampTo(E.bus.gain, 0, Math.max(0.01, fade / 4));
W.setTimeout(function () { E.dispose(); }, (fade + 0.8) * 1000);
}
function filmFade(sec) {
var v = filmV; filmV = null;
if (!v || !ctx) return;
sec = cleanFade(sec);
var t = ctx.currentTime;
try {
v.out.gain.cancelScheduledValues(t);
if (sec > 0) { v.out.gain.setValueAtTime(v.out.gain.value, t); v.out.gain.linearRampToValueAtTime(0, t + sec); }
else { v.out.gain.setValueAtTime(0, t); }
} catch (e) {}
for (var i = 0; i < v.n.length; i++) { var x = v.n[i]; if (x && typeof x.stop === "function") { try { x.stop(t + sec + 0.05); } catch (e) {} } }
}
function filmCue(name, o) {
var fn = own(FILM, name);
if (!ctx || !rig || muted || !fn) return false;
var tok = ++filmTok;
var play = function () {
if (tok !== filmTok || !running() || muted) return;
filmFade(0.35);
var v = new Voice(rig, rig.sfxIn, 0.85, 0), t = ctx.currentTime + 0.01;
try { var viaFn = o && own(VIA, o.via); if (viaFn) viaFn(v, t); fn(v, t); } catch (e) {}
filmV = v;
};
if (ctx.state === "running") play();
else { try { var p = ctx.resume(); if (p && typeof p.then === "function") p.then(play, noop); } catch (e) {} }
return true;
}
function onVisibility() { hidden = !!(W.document && W.document.hidden); applyRun(); }
var SFX_OPT_KEY = { floor: "floor", stage: "stage", deposit: "amount", cardTick: "n", debt: "part", frenzyTick: "n" };
function renderOffline(kind, name, seconds, opts) {
return new Promise(function (resolve, reject) {
try {
var OAC = W.OfflineAudioContext || W.webkitOfflineAudioContext;
if (!OAC) throw new Error("OfflineAudioContext unavailable");
var sr = 44100;
seconds = +seconds || (kind === "music" ? 16 : kind === "impact" ? 1.5 : 3);
var oc = new OAC(2, Math.ceil(sr * seconds), sr), r = buildRig(oc, 1234567), o = {};
if (opts) { for (var k in opts) if (Object.prototype.hasOwnProperty.call(opts, k)) o[k] = opts[k]; }
if (o.musicVolume != null) r.musicVol.gain.value = MUSIC_BASE * clamp(Number.isFinite(+o.musicVolume) ? +o.musicVolume : 0, 0, 1);
if (o.sfxVolume != null) r.sfxIn.gain.value = SFX_BASE * clamp(Number.isFinite(+o.sfxVolume) ? +o.sfxVolume : 0, 0, 1);
if (o.muted) r.out.gain.value = 0;
var parts = String(name || "").split(":"), sv = null, fv = null, iv = null, E = null;
if (kind === "sfx") {
var fn = own(SFX, parts[0]); if (!fn) throw new Error("unknown sfx " + parts[0]);
var optKey = parts.length > 1 ? own(SFX_OPT_KEY, parts[0]) : null;
if (optKey) o[optKey] = isNaN(+parts[1]) ? parts[1] : +parts[1];
sv = new Voice(r, r.sfxIn, own(LEVEL, parts[0]) || 0.8, +o.pan || 0);
fn(sv, 0.01, o);
} else if (kind === "film") {
var filmFn = own(FILM, parts[0]); if (!filmFn) throw new Error("unknown film cue " + parts[0]);
fv = new Voice(r, r.sfxIn, 0.85, 0);
var viaFn = own(VIA, o.via);
if (viaFn) viaFn(fv, 0.01);
filmFn(fv, 0.01);
} else if (kind === "impact") {
var st = parts.length > 1 ? +parts[1] : 0.6;
iv = playImpact(r, parts[0], clamp(Number.isFinite(st) ? st : 0.6, 0, 1), +o.pan || 0, 0.01);
} else if (kind === "music") {
E = new Engine(r);
var stg = 0, mode = "normal";
String(name || "").split(/[:,\s]+/).forEach(function (tok) {
if (/^[0-3]$/.test(tok)) stg = +tok;
else if (/^(normal|fast|frenzy|card|paused|menu)$/.test(tok)) mode = tok;
else if (/^bar=\d+$/.test(tok)) E.pos = (+tok.slice(4) % BARS) * 16;
else if (/^solo=\w+$/.test(tok)) E.solo = tok.slice(5);
});
E.setStage(stg, 0); E.setMul(mode === "fast" ? FAST_MUL : mode === "frenzy" ? FRENZY_MUL : 1, 0); E.frenzy = mode === "frenzy";
if (mode === "card") { r.musicIn.gain.value = 0.3; r.musicLP.frequency.value = 900; }
else if (mode === "menu") { r.musicIn.gain.value = 0.55; r.musicLP.frequency.value = 2200; }
else if (mode === "paused") { r.musicIn.gain.value = 0; r.musicLP.frequency.value = 700; }
E.next = 0.05;
while (E.next < seconds) E.step(E.next, mode === "paused" || !!o.muted);
} else throw new Error("unknown kind " + kind);
if (o.fade != null) {
var fd = cleanFade(o.fade), ft = Number.isFinite(+o.fadeAt) ? Math.max(0, +o.fadeAt) : (kind === "music" ? 0 : 0.01);
if (kind === "music") {
E.bus.gain.setValueAtTime(1, ft);
if (fd > 0) E.bus.gain.setTargetAtTime(0, ft, Math.max(0.01, fd / 4));
else E.bus.gain.setValueAtTime(0, ft);
} else {
var fTarget = sv || fv || iv;
if (fTarget && fTarget.out && fTarget.out.gain) {
var lvl = fTarget.out.gain.value;
fTarget.out.gain.setValueAtTime(lvl, ft);
if (fd > 0) fTarget.out.gain.linearRampToValueAtTime(0, ft + fd);
else fTarget.out.gain.setValueAtTime(0, ft);
}
}
}
var done = function (buf) { resolve([buf.getChannelData(0), buf.getChannelData(1)]); };
var p = oc.startRendering();
if (p && typeof p.then === "function") p.then(done, reject);
else oc.oncomplete = function (e) { done(e.renderedBuffer); };
} catch (e) { reject(e); }
});
}
var GameAudio = {
unlock: function () {
try {
if (!ctx) {
var AC = W.AudioContext || W.webkitAudioContext;
if (!AC) return;
try { ctx = new AC({ latencyHint: "interactive" }); } catch (e) { ctx = new AC(); }
rig = buildRig(ctx, (Math.random() * 4294967296) >>> 0);
rig.musicVol.gain.value = MUSIC_BASE * musicVolume;
rig.sfxIn.gain.value = SFX_BASE * sfxVolume;
rig.out.gain.value = muted ? 0 : 1;
hidden = !!(W.document && W.document.hidden);
if (W.document) W.document.addEventListener("visibilitychange", onVisibility);
}
if (!unlockedOnce) {
unlockedOnce = true;
var b = ctx.createBuffer(1, 1, 22050), s = ctx.createBufferSource();
s.buffer = b; s.connect(ctx.destination); s.start(0);
s.onended = function () { try { s.disconnect(); } catch (e) {} };
}
if (!userSuspended && !hidden && ctx.state !== "running") promiseSafe(ctx.resume());
if (wantMusic && !engine) startMusic();
} catch (e) {}
},
isMuted: function () { return muted; },
setMuted: function (v) { muted = !!v; writeMuted(muted); applyMute(); },
toggleMute: function () { GameAudio.setMuted(!muted); return muted; },
setMusicVolume: function (v) { musicVolume = clamp(+v || 0, 0, 1); if (rig) rampTo(rig.musicVol.gain, MUSIC_BASE * musicVolume, 0.05); },
setSfxVolume: function (v) { sfxVolume = clamp(+v || 0, 0, 1); if (rig) rampTo(rig.sfxIn.gain, SFX_BASE * sfxVolume, 0.05); },
suspend: function () { userSuspended = true; applyRun(); },
resume: function () { userSuspended = false; applyRun(); },
sfx: function (name, opts) {
try {
if (!running() || muted) return;
var fn = own(SFX, name); if (!fn) return;
var t = ctx.currentTime, gap = own(THROTTLE, name) || 0.03;
if (own(lastSfx, name) != null && t - lastSfx[name] < gap) return;
var live = 0; for (var i = sfxEnds.length - 1; i >= 0; i--) { if (sfxEnds[i] <= t) sfxEnds.splice(i, 1); else live++; }
if (live >= 24 || (live >= 14 && own(LOW_PRIORITY, name))) return;
lastSfx[name] = t;
opts = opts || {};
var vol = opts.volume == null ? 1 : +opts.volume;
var v = new Voice(rig, rig.sfxIn, (own(LEVEL, name) || 0.8) * clamp(Number.isFinite(vol) ? vol : 0, 0, 1), +opts.pan || 0);
fn(v, t + 0.005, opts);
sfxEnds.push(v.end);
} catch (e) {}
},
impact: function (material, strength, pan) {
try {
if (!running() || muted) return;
var s = +strength; if (!(s >= 0.05)) return; if (s > 1) s = 1;
var t = ctx.currentTime;
impTokens = Math.min(4, impTokens + (t - impLastT) * 10); impLastT = t;
if (impTokens < 1 || (impTokens < 2 && s < 0.3)) return;
for (var i = impEnds.length - 1; i >= 0; i--) if (impEnds[i] <= t) impEnds.splice(i, 1);
if (impEnds.length >= 8) return;
var m = own(IMPACT, material) ? material : "card";
if (own(impLastMat, m) != null && t - impLastMat[m] < 0.025) return;
impTokens -= 1; impLastMat[m] = t;
var v = playImpact(rig, m, s, clamp(+pan || 0, -1, 1), t + 0.003);
impEnds.push(v.end);
} catch (e) {}
},
film: {
cue: function (name, o) { try { return filmCue(name, o); } catch (e) { return false; } },
stop: function (fade) { try { filmTok++; filmFade(fade == null ? 0.6 : fade); } catch (e) {} },
live: function () { return running() && !muted; },
cues: function () { return Object.keys(FILM); }
},
music: {
start: function () { try { startMusic(); } catch (e) {} },
stop: function () { try { stopMusic(0.4); } catch (e) {} },
setStage: function (st) {
try {
mStage = clamp(Math.round(+st || 0), 0, 3);
if (engine) { if (mStage !== engine.stage) engine.pend = mStage; else engine.pend = null; }
} catch (e) {}
},
setMode: function (mode) {
try {
if (!/^(normal|fast|frenzy|card|paused|over|menu)$/.test(mode)) return;
mMode = mode;
if (mode === "over") { stopMusic(0.5); applyMode("normal"); return; }
applyMode(mode);
} catch (e) {}
}
},
renderOffline: renderOffline
};
W.GameAudio = GameAudio;
})();
(function(){
"use strict";
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
function flower(g, cx, cy, r, petal, mid){
const K = CLAY;
for (let i = 0; i < 5; i++){ const a = -Math.PI/2 + i * Math.PI * 0.4;
K.press(g, K.ball(cx + Math.cos(a)*r, cy + Math.sin(a)*r, r*0.72, r*0.72, {lump:0.15, n:10}), petal, {sheen:false, texture:0, depth:0.9, soft:1.4, rim:0.5}); }
K.press(g, K.ball(cx, cy, r*0.62, r*0.62, {lump:0.1, n:10}), mid, {sheen:false, texture:0, depth:0.8, soft:1.2, rim:0.5});
}
const shadeOver = (g, path, x0, x1, y0, y1, a) => clip(g, path, () => { g.fillStyle = "rgba(60,25,70," + a + ")"; g.fillRect(x0, y0, x1 - x0, y1 - y0); });
const BAMBOO = "#F6B33C", BAMBOO_D = "#E08A2A", CANE = "#C9682A", HARGOW = "#FFEAF1", PRAWN = "#FF8A6A";
const PINK_L = "#FF8CBF", PINK_D = "#E2357F", TEA = "#B4561F";
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
{ id: "textbooks", en: "Second-hand textbooks", zh: "二手課本", kind: "wise",
note: "two offset hardbacks, wide flat stepped base, very stable",
make(x, y){ const S = CLAY.shape; return S.body(rectsOf(S, x, y, [BOOKS.bot, BOOKS.top]), "card", {friction:0.85, frictionStatic:1.2, restitution:0.02, density:0.0018}); },
draw(g){ const K = CLAY; const [bx, by, bw, bh, br] = BOOKS.bot, [tx, ty, tw, th, tr] = BOOKS.top;
const bot = K.slab(bx, by, bw, bh, br, {seed:11});
K.blob(g, bot, "orange");
K.press(g, K.slab(bx - 1, by + 0.3, bw - 8, bh - 9, 2.5, {lump:0.35, seed:5}), "cream", {sheen:false, depth:1.1});
for (const yy of [8.1, 11.3, 14.4]) K.groove(g, line([[-53, yy], [-10, yy + 0.4], [47, yy - 0.2]]), 0.6, {dark:"rgba(160,95,50,0.5)"});
K.press(g, K.rrc(28, 13, 6, 11, 1.2), "teal", {sheen:false, depth:1});
const top = K.slab(tx, ty, tw, th, tr, {seed:23});
K.blob(g, top, "blue");
for (const xx of [-36.5, 46.5]) K.press(g, K.slab(xx, ty, 4, th - 1.5, 1.5, {lump:0.25}), "yellow", {sheen:false, depth:1});
K.groove(g, line([[-31, -18], [-31, -2]]), 0.9); K.groove(g, line([[41, -18], [41, -2]]), 0.9);
const lab = K.slab(4, ty, 46, 13.5, 3, {lump:0.3, seed:3});
g.save(); g.translate(4, ty); g.rotate(-0.025); g.translate(-4, -ty);
K.press(g, lab, "cream", {sheen:false});
K.text(g, "經濟學", 4, ty + 0.6, {size:11, font:"zh", color:"#1F5FB4", weight:900});
g.restore();
K.press(g, K.ball(35, ty - 0.5, 4.2, 4.2, {lump:0.2}), "pink", {sheen:false});
K.text(g, "$", 35, ty - 0.2, {size:6, font:"display", color:"white", weight:900});
} },
{ id: "lunchbox", en: "Home-made lunch box", zh: "自家飯盒", kind: "wise",
note: "flat heavy box with lid lip and side clips, stacks well",
make(x, y){ const S = CLAY.shape; return S.body(rectsOf(S, x, y, [LUNCH.body, LUNCH.lid, LUNCH.clipL, LUNCH.clipR]), "plastic", {friction:0.65, frictionStatic:1.0, restitution:0.04, density:0.0028}); },
draw(g){ const K = CLAY;
const body = K.slab(...LUNCH.body, {seed:31});
K.blob(g, body, "teal");
K.groove(g, line([[-37, 15], [37, 15.3]]), 1.1);
K.groove(g, line([[-37, 18.5], [37, 18.7]]), 1.1);
K.press(g, heart(-20, 4, 6.5), "red", {sheen:false});
const lid = K.slab(...LUNCH.lid, {seed:17});
K.blob(g, lid, "pink");
K.groove(g, line([[-41, -9.6], [41, -9.4]]), 1.0);
K.press(g, K.slab(-24, -20, 12, 4, 2, {lump:0.2}), PINK_D, {sheen:false, depth:1});
for (const s of [-1, 1]){ const cp = K.slab(s*44, -2, 6, 12, 2, {lump:0.25, seed:9 + s});
K.press(g, cp, "white", {sheen:false}); K.groove(g, line([[s*44 - 1.6, -0.5], [s*44 + 1.6, -0.5]]), 0.8); }
K.press(g, K.slab(17, 1.5, 7.5, 41, 2.5, {lump:0.4, seed:4}), "yellow", {sheen:false});
K.groove(g, line([[17, -18], [17, 21]]), 0.7, {dark:"rgba(150,90,10,0.35)"});
} },
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
K.inner(g, K.circle(51, -3.5, 2.4), "rgba(40,10,60,0.7)", 1.6, -0.6, -0.8);
K.press(g, K.tube([[51, -3.5], [56, -6], [61.5, -4], [60.5, 1.5], [55, 1.2]], 2.4), "pink", {sheen:false, texture:0, depth:0.7, soft:1});
} },
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
{ id: "piggybank", en: "Piggy bank", zh: "錢罌", kind: "wise",
note: "round ceramic pig on four short legs: flat footprint, sits tight",
make(x, y){ const S = CLAY.shape;
return S.body([S.convex(x, y, PIG.body), ...rectsOf(S, x, y, [PIG.snout, PIG.legB, PIG.legF]), S.convex(x, y, PIG.ear)], "plastic", {friction:0.7, frictionStatic:1.0, restitution:0.04, density:0.0024}); },
draw(g){ const K = CLAY;
K.blob(g, K.slab(PIG.legB[0] + 4, 25.5, 11, 14, 3.5, {lump:0.3}), PINK_D, {sheen:false, depth:1.8, soft:2.4});
K.blob(g, K.slab(PIG.legF[0] + 4, 25.5, 11, 14, 3.5, {lump:0.3}), PINK_D, {sheen:false, depth:1.8, soft:2.4});
K.blob(g, K.blobPoly([[0, -28], [5, -39], [14, -29]], {lump:0.3}), PINK_D, {sheen:false, depth:1.5, soft:2});
const curl = []; for (let i = 0; i <= 22; i++){ const t = i / 22, a = 0.35 - t * Math.PI * 2.15, r = 4.3 - 2.5 * t; curl.push([-46.3 + r * Math.cos(a), -7.3 + r * Math.sin(a)]); }
K.press(g, K.tube(curl, 2.6), "pink", {sheen:false, texture:0, depth:0.8, soft:1.2});
const body = K.ball(-3, -3, 40, 28, {lump:0.7, seed:61});
K.blob(g, body, "pink", {sheen:{x:-16, y:-17, rx:9, ry:4.5}});
for (const lx of [PIG.legB[0] - 3.5, PIG.legF[0] - 3.5]){
K.blob(g, K.slab(lx, 26.5, 12, 13, 3.5, {lump:0.3, seed:lx}), "pink", {sheen:false, depth:2, soft:2.6});
K.groove(g, line([[lx - 3.5, 31.5], [lx + 3.5, 31.5]]), 0.8);
}
const sn = K.slab(...PIG.snout, {lump:0.4, seed:7});
K.blob(g, sn, PINK_L, {depth:2, soft:3, sheen:{x:37, y:-8, rx:2.5, ry:3}});
K.inner(g, K.ellipse(39, -5.5, 1.6, 2.6), "rgba(120,10,60,0.85)", 1.2, -0.4, -0.6);
K.inner(g, K.ellipse(39, 1.5, 1.6, 2.6), "rgba(120,10,60,0.85)", 1.2, -0.4, -0.6);
g.save(); g.fillStyle = "rgba(150,20,70,0.55)"; g.beginPath(); g.ellipse(39, -5.5, 1.3, 2.2, 0, 0, 7); g.ellipse(39, 1.5, 1.3, 2.2, 0, 0, 7); g.fill(); g.restore();
const ear = K.blobPoly([[8, -28], [14, -41], [23, -24.5]], {lump:0.3, seed:3});
K.blob(g, ear, "pink", {depth:1.8, soft:2.4, sheen:false});
K.press(g, K.blobPoly([[12, -28], [14.5, -36], [19, -26.5]], {lump:0.2}), PINK_D, {sheen:false, depth:1, texture:0});
K.press(g, K.ball(-12, -36, 6.5, 6.5, {lump:0.2, n:14}), "yellow", {sheen:false, depth:1.4});
K.groove(g, K.ball(-12, -36, 4, 4, {lump:0.1, n:12}), 0.6);
clip(g, body, () => { K.inner(g, K.rrc(-12, -29.6, 18, 3.4, 1.7), "rgba(110,10,60,0.9)", 1.4, -0.4, -0.8);
g.fillStyle = "rgba(120,15,65,0.75)"; g.fill(K.rrc(-12, -29.6, 16, 2.4, 1.2)); });
g.save(); g.beginPath(); g.rect(-30, -60, 40, 30.4); g.clip();
K.press(g, K.ball(-12, -34.5, 6.5, 6.5, {lump:0.2, n:14}), "yellow", {sheen:false, depth:1.4});
K.text(g, "$", -12, -35.5, {size:7, font:"display", color:"orange", weight:900}); g.restore();
K.softSpot(g, body, K.ellipse(23, 4, 5.5, 3.5), "rgba(255,40,90,0.6)", 4);
K.eye(g, 22, -9.5, 4.3, 0.5, -0.1);
K.groove(g, line([[28, 7], [31, 9.6], [34.5, 8.6]]), 0.9);
K.groove(g, line([[-28, 4], [-20, 13], [-8, 17]]), 0.8, {dark:"rgba(140,20,70,0.25)"});
} },
{ id: "tissuebox", en: "Tissue box", zh: "紙巾盒", kind: "wise",
note: "light cardboard box, soft tissue puff on top, flat and steady",
make(x, y){ const S = CLAY.shape; const [bx, by, bw, bh, br] = TISSUE.box;
return S.body([S.rect(x + bx, y + by, bw, bh, {r:br}), S.convex(x, y, TISSUE.puff)], "card", {friction:0.8, frictionStatic:1.1, restitution:0.02, density:0.0012}); },
draw(g){ const K = CLAY;
const puffPts = [[-19.5, -6], [-17, -13], [-12, -18], [-6, -20.6], [-1, -21.6], [3.5, -23.2], [7.5, -23.6], [10, -22], [13.5, -18.5], [17, -13.5], [20, -6]];
const puff = K.blobPoly(puffPts, {lump:0.5, seed:13, step:3.5});
K.blob(g, puff, "white", {depth:2.6, soft:4, sheen:{x:-4, y:-17, rx:4, ry:2}});
K.press(g, K.blobPoly([[4.5, -22.6], [9.6, -22.4], [7.6, -18.4]], {lump:0.15, step:3}), "#E9E6FA", {sheen:false, texture:0, depth:0.8, soft:1.2});
const fold = {dark:"rgba(90,70,150,0.3)", light:"rgba(255,255,255,0.8)"};
K.groove(g, line([[-9, -18.5], [-7.5, -13], [-6, -8]]), 0.8, fold);
K.groove(g, line([[1, -20.5], [1.5, -14], [1, -8]]), 0.8, fold);
K.groove(g, line([[8, -18], [10, -13], [12, -8]]), 0.8, fold);
const box = K.slab(...TISSUE.box, {seed:71});
K.blob(g, box, "sky", {sheen:{x:-22, y:-1, rx:12, ry:3.5}});
shadeOver(g, box, 27, 50, -15, 35, 0.12);
K.groove(g, line([[27, -8], [27.5, 28]]), 1.0);
K.press(g, K.slab(0, -7.8, 40, 4.2, 2.1, {lump:0.2}), "#2E86D6", {sheen:false, depth:0.8, texture:0});
K.press(g, K.slab(0, -8.6, 30, 2.4, 1.2, {lump:0.15}), "white", {sheen:false, depth:0.6, texture:0});
clip(g, box, () => {
K.press(g, K.tube([[-46, 22], [-30, 17], [-14, 22], [2, 17], [18, 22], [34, 17], [50, 22]], 4.5), "pink", {sheen:false, depth:1});
});
flower(g, -26, 4.5, 3.4, "white", "yellow");
flower(g, 2, 7, 2.8, "yellow", "orange");
flower(g, 18, -0.5, 2.3, "white", "pink");
K.dots(g, [[-12, -0.5], [-38, 11], [12, 10.5], [36, 3], [-6, 11], [33, 12]], 1.4, "white");
} },
{ id: "ricesack", en: "Bag of rice", zh: "一包米", kind: "wise",
note: "heavy floppy sack, flat bottom, grips and never bounces",
make(x, y){ const S = CLAY.shape;
return S.body([S.convex(x, y, RICE.body), ...rectsOf(S, x, y, [RICE.neck]), S.convex(x, y, RICE.tuft)], "fabric", {friction:1.0, frictionStatic:1.6, restitution:0, density:0.003}); },
draw(g){ const K = CLAY;
const tuftPts = [[-9, -37], [9, -37], [17.5, -48.5], [14, -51], [9, -48.5], [5, -51], [0, -48.5], [-5, -51], [-9, -48.5], [-14, -51], [-17.5, -48.5]];
K.blob(g, K.blobPoly(tuftPts, {lump:0.4, seed:5, step:4}), "white", {depth:2, soft:3, sheen:false});
K.groove(g, line([[-5, -38], [-9, -47]]), 0.7); K.groove(g, line([[0, -38], [0, -47]]), 0.7); K.groove(g, line([[5, -38], [9, -47]]), 0.7);
K.blob(g, K.slab(...RICE.neck, {lump:0.3}), "white", {depth:1.6, soft:2.4, sheen:false});
const body = K.blobPoly(RICE.body, {lump:1.0, seed:81, step:8});
K.blob(g, body, "white", {sheen:{x:-20, y:-14, rx:9, ry:5}});
clip(g, body, () => {
g.save(); g.lineWidth = 0.45; g.strokeStyle = "rgba(110,90,150,0.13)"; g.beginPath();
for (let k = -90; k <= 90; k += 3.6){ g.moveTo(k, -34); g.lineTo(k + 66, 32); g.moveTo(k, -34); g.lineTo(k - 66, 32); }
g.stroke(); g.restore();
K.press(g, K.slab(0, -15, 96, 5, 1, {lump:0.5, seed:3}), "green", {sheen:false, depth:1.2});
K.press(g, K.slab(0, 22, 96, 6, 1, {lump:0.5, seed:8}), "green", {sheen:false, depth:1.2});
K.press(g, K.slab(0, 17.2, 96, 2.2, 1, {lump:0.3, seed:9}), "yellow", {sheen:false, depth:0.8, texture:0});
});
K.groove(g, line([[-34, 27.5], [34, 27.5]]), 0.8, {dark:"rgba(60,90,30,0.45)"});
const lab = K.ball(0, 3, 15, 14, {lump:0.5, seed:12});
K.press(g, lab, "red", {sheen:{x:-5, y:-4, rx:4, ry:2.5}});
K.groove(g, K.ball(0, 3, 12, 11, {lump:0.3, seed:2}), 0.7, {light:"rgba(255,255,255,0.35)", dark:"rgba(120,10,20,0.45)"});
K.text(g, "米", 0, 3.6, {size:16, font:"zh", color:"white", weight:900});
K.groove(g, line([[-8, -30], [-14, -25], [-17, -20]]), 0.8, {dark:"rgba(80,60,110,0.35)"});
K.groove(g, line([[8, -30], [13, -25], [16, -20]]), 0.8, {dark:"rgba(80,60,110,0.35)"});
K.groove(g, line([[-2, -30], [-3, -22]]), 0.7, {dark:"rgba(80,60,110,0.3)"});
K.press(g, K.tube([[-11, -34.5], [0, -33.2], [11, -34.5]], 3.2), "red", {sheen:false, depth:0.9});
K.press(g, K.tube([[0, -33.5], [-6, -29], [-9.5, -24]], 2.4), "red", {sheen:false, depth:0.8, texture:0});
K.press(g, K.tube([[0, -33.5], [5, -28], [9, -24.5]], 2.4), "red", {sheen:false, depth:0.8, texture:0});
K.press(g, K.ball(0, -33.5, 2.6, 2.4, {lump:0.1, n:10}), "red", {sheen:false, depth:0.8});
} },
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
for (const xx of [-40, -14, 12, 38]){
K.press(g, K.slab(xx + (seed % 3), cy, 3.2, 8.6, 1.2, {lump:0.15, seed:xx}), CANE, {sheen:false, depth:0.8, texture:0.05});
}
for (const xx of [-27, -1, 25]) K.groove(g, line([[xx, cy - 3.2], [xx + 4, cy - 3.3]]), 0.6, {dark:"rgba(140,70,10,0.4)"});
};
tier(STEAM.bot, 5); tier(STEAM.top, 9);
const lettuce = []; for (let i = 0; i <= 10; i++) lettuce.push([30 + i * 2.2, 10.5 + (i % 2 ? 2.4 : 0.4)]);
K.press(g, K.tube(lettuce, 3), "green", {sheen:false, depth:0.9});
const dome = K.blobPoly(STEAM.dome, {lump:0.4, seed:7, step:6});
K.blob(g, dome, "#FFC447", {depth:2.6, soft:4, sheen:{x:-20, y:-23, rx:12, ry:1.8}});
const domeY = (xx, t) => -16 - (10.2 * t) * (1 - Math.pow(xx / 52, 2));
clip(g, dome, () => {
for (let t = 0.2; t < 1; t += 0.2){ const pts = []; for (let xx = -54; xx <= 54; xx += 4) pts.push([xx, domeY(xx, t)]);
K.groove(g, line(pts), 0.55, {dark:"rgba(175,85,0,0.42)", light:"rgba(255,245,200,0.6)"}); }
for (const xx of [-36, -18, 0, 18, 36]) K.groove(g, line([[xx * 1.1, -16], [xx * 0.9, domeY(xx, 1) - 1]]), 0.9, {dark:"rgba(160,70,0,0.5)", light:"rgba(255,240,190,0.5)"});
});
const rim = K.slab(...STEAM.rim, {lump:0.4, seed:3});
K.blob(g, rim, BAMBOO_D, {depth:2, soft:3, sheen:{x:-30, y:-14.5, rx:12, ry:1.5}});
const hg = K.blobPoly([[-31, -6.5], [-29, -12], [-24, -16], [-18, -17], [-12, -16], [-7, -12], [-5, -6.5]], {lump:0.3, seed:4, step:4});
K.press(g, hg, HARGOW, {sheen:{x:-23, y:-13, rx:3, ry:1.6}});
K.softSpot(g, hg, K.ellipse(-18, -10, 5, 2.6), "rgba(255,120,90,0.55)", 3);
for (const xx of [-25, -20.5, -16, -11.5]) K.groove(g, line([[xx, -15.6], [xx + 1.4, -12.2]]), 0.6, {dark:"rgba(200,90,110,0.45)"});
K.eye(g, -22, -9.6, 1.9, 0.5, 0); K.eye(g, -15.5, -9.6, 1.9, 0.5, 0);
} },
{ id: "lemontea", en: "Carton of lemon tea", zh: "紙包檸檬茶", kind: "wise",
note: "upright drink carton with a straw: steady on its flat base, taller than wide",
make(x, y){ const S = CLAY.shape;
return S.body([...rectsOf(S, x, y, [LEMON.body, LEMON.fin, LEMON.straw]), S.convex(x, y, LEMON.earL), S.convex(x, y, LEMON.earR)], "card", {friction:0.75, frictionStatic:1.0, restitution:0.03, density:0.0021}); },
draw(g){ const K = CLAY;
const sx0 = 11.6, sy0 = -29.5, sx1 = sx0 + Math.sin(TEA_ANG) * 19.6, sy1 = sy0 - Math.cos(TEA_ANG) * 19.6;
const straw = K.tube([[sx0, sy0], [sx1, sy1], [sx1 - 1.2, sy1 - 2.2], [sx1 - 5.5, sy1 - 4.2]], 4.4);
K.blob(g, straw, "white", {depth:1.2, soft:1.8, sheen:false, texture:0.05});
clip(g, straw, () => { for (let k = -60; k < -24; k += 4.2) K.press(g, K.tube([[0, k], [30, k - 6]], 1.6), "pink", {sheen:false, texture:0, depth:0.4, soft:0.8, rim:0}); });
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
K.groove(g, line([[16, -25], [16.5, 37]]), 0.8);
K.text(g, "檸檬茶", 0, -6.5, {size:12, font:"zh", color:TEA, weight:900});
K.press(g, K.ball(-1, 13.5, 11, 11, {lump:0.3, seed:5}), "white", {sheen:false});
const sl = K.ball(-1, 13.5, 8.6, 8.6, {lump:0.25, seed:8});
K.press(g, sl, "yellow", {sheen:false});
K.groove(g, K.ball(-1, 13.5, 6.8, 6.8, {lump:0.1, seed:3}), 0.6, {light:"rgba(255,255,255,0.7)"});
for (let i = 0; i < 6; i++){ const a = i * Math.PI / 3; K.groove(g, line([[-1, 13.5], [-1 + Math.cos(a) * 6.2, 13.5 + Math.sin(a) * 6.2]]), 0.6, {light:"rgba(255,255,255,0.8)"}); }
K.press(g, K.blobPoly([[7, 4], [12.5, -1], [17, 0.5], [12, 5.5]], {lump:0.2}), "green", {sheen:false});
K.groove(g, line([[8, 3.6], [15.5, 0.6]]), 0.5);
} },
{ id: "passbook", en: "Savings passbook", zh: "存摺", kind: "wise",
note: "thin flat booklet with a rounded spine: the steadiest thing on the tower",
make(x, y){ const S = CLAY.shape; return S.body([S.convex(x, y, PASS)], "card", {friction:0.85, frictionStatic:1.2, restitution:0.02, density:0.0018}); },
draw(g){ const K = CLAY;
g.save(); g.translate(33.5, 8); g.rotate(-0.12);
const rib = K.blobPoly([[-2.25, -5], [2.25, -5], [2.25, 15.5], [0, 12.9], [-2.25, 15.5]], {lump:0.12, seed:6, step:4});
K.press(g, rib, "teal", {sheen:false, depth:0.9, soft:1.4, texture:0.05});
clip(g, rib, () => { g.fillStyle = "rgba(20,60,70,0.35)"; g.fillRect(-3, 3.5, 6, 2); });
g.restore();
const cover = K.blobPoly(PASS, {lump:0.6, seed:101, step:7});
K.blob(g, cover, "red", {sheen:{x:-22, y:-6.5, rx:12, ry:2.4}});
K.groove(g, line([[-41, -10.5], [-41, 10.5]]), 1.0);
K.press(g, K.slab(36, 0, 18, 19, 2, {lump:0.25, seed:4}), "#FFE9C2", {sheen:false, depth:1});
for (const yy of [-5, -1.6, 1.8, 5.2]) K.groove(g, line([[28, yy], [44.5, yy]]), 0.5, {dark:"rgba(170,110,60,0.5)"});
K.press(g, K.ball(-30, 0, 6.2, 6.2, {lump:0.2}), "yellow", {sheen:false});
K.text(g, "$", -30, 0.5, {size:8, font:"display", color:"orange", weight:900});
K.text(g, "存摺", -2, 0.8, {size:14, font:"zh", color:"yellow", weight:900});
K.groove(g, line([[-19, 7.8], [16, 7.8]]), 0.6, {light:"rgba(255,230,120,0.6)"});
} }
]);
})();
(function(){
"use strict";
const ellPts = (cx, cy, rx, ry, n, a0 = 0) => Array.from({length:n}, (_, i) => { const a = a0 + i / n * Math.PI * 2; return [cx + rx*Math.cos(a), cy + ry*Math.sin(a)]; });
const hexPts = (cx, cy, r) => Array.from({length:6}, (_, i) => { const a = Math.PI/6 + i * Math.PI/3; return [cx + r*Math.cos(a), cy + r*Math.sin(a)]; });
const line = pts => CLAY.poly(pts, false);
const clip = (g, path, fn) => { g.save(); g.clip(path); fn(); g.restore(); };
const R = (S, x, y, [px, py, w, h, r, ang]) => S.rect(x + px, y + py, w, h, Object.assign(r ? {r} : {}, ang ? {angle:ang} : {}));
const FB = 30;
const RAC = {head: ellPts(-40, 0, 27, 21, 18), throat: [-8, 0, 12, 7, 2], shaft: [16, 0, 40, 5, 2], grip: [50, 0, 30, 10, 4]};
const GTR = {low: [-44, 0, 26], up: [-14, 0, 20], neck: [31, 0, 50, 9, 2], head: [64, 0, 18, 14, 3]};
const SK = {deck: [0, -7, 78, 9, 3], tail: [-45, -11, 22, 9, 3, 0.36], nose: [45, -11, 22, 9, 3, -0.36], truckL: [-30, 0.5, 18, 6, 2], truckR: [30, 0.5, 18, 6, 2], wheelL: [-30, 9, 8], wheelR: [30, 9, 8]};
const CTL = {body: [0, -2, 66, 26, 10], gripL: [-26, 10, 15], gripR: [26, 10, 15]};
const HP = {cx: 0, cy: 4, r: 31, w: 8, a0: Math.PI*170/180, a1: Math.PI*370/180, n: 6,
cups: [-1, 1].map(s => ({s, x: 31*s, y: 18, shell: [33*s, 18, 8, 14], pad: [24.5*s, 18, 4.8, 12.2]}))};
const arcPt = (a, rr) => [HP.cx + rr*Math.cos(a), HP.cy + rr*Math.sin(a)];
const hpSegs = () => Array.from({length:HP.n}, (_, j) => { const d = (HP.a1 - HP.a0) / HP.n, s0 = HP.a0 + j*d, s1 = s0 + d;
const ro = (HP.r + HP.w/2) * 2 / (1 + Math.cos(d/4)), ri = (HP.r - HP.w/2) * 2 / (1 + Math.cos(d/2));
return [arcPt(s0, ro), arcPt(s0 + d/2, ro), arcPt(s1, ro), arcPt(s1, ri), arcPt(s0, ri)]; });
const CAM = {body: [-12, 2, 64, 44, 7], hump: [-16, -25, 24, 10, 3], lens: [33, 4, 28, 30, 4], rim: [50, 4, 7, 36, 3], btn: [6, -22, 10, 5, 2]};
const DB = {plateL: [-38, 0, 21], plateR: [38, 0, 21], bar: [0, 0, 56, 8, 3], colL: [-20, 0, 6, 16, 2], colR: [20, 0, 6, 16, 2]};
window.ITEM_DEFS = (window.ITEM_DEFS || []).concat([
{ id: "football", en: "Football", zh: "足球", kind: "risky",
note: "bouncy rubber ball, rolls off anything that isn't flat",
make(x, y){ const S = CLAY.shape; return S.body([S.circle(x, y, FB)], "rubber", {restitution:0.5, friction:0.35, frictionStatic:0.5, density:0.0011}); },
draw(g){ const K = CLAY; const ball = K.ball(0, 0, FB, FB, {lump:0.5, seed:3});
K.blob(g, ball, "white", {sheen:{x:-11, y:-12, rx:7, ry:4.5}});
const dir = i => -Math.PI/2 + 0.12 + i*Math.PI*0.4;
const RC = 10, D = 26.5, RO = 9.5, SQ = 0.72;
const centre = Array.from({length:5}, (_, i) => [RC*Math.cos(dir(i)), RC*Math.sin(dir(i))]);
const outer = i => { const a = dir(i), ux = Math.cos(a), uy = Math.sin(a);
return Array.from({length:5}, (_, k) => { const f = Math.PI + k*Math.PI*0.4, r = D + RO*Math.cos(f)*SQ, t = RO*Math.sin(f);
return [r*ux - t*uy, r*uy + t*ux]; }); };
clip(g, ball, () => {
for (let i = 0; i < 5; i++){ const o = outer(i), n = outer((i + 1) % 5);
K.groove(g, line([centre[i], o[0]]), 1.25);
K.groove(g, line([o[4], n[1]]), 1.25);
}
K.press(g, K.blobPoly(centre, {lump:0.25, seed:5}), "blue", {sheen:false});
for (let i = 0; i < 5; i++) K.press(g, K.blobPoly(outer(i), {lump:0.25, seed:11 + i*7}), "blue", {sheen:false});
});
} },
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
K.press(g, K.ball(-4, 7, 9, 7, {lump:0.4, seed:2}), "pink", {sheen:false});
K.press(g, K.ball(-20, 0, 10, 10, {lump:0.3, seed:7}), "yellow", {sheen:false});
K.blob(g, K.ball(-20, 0, 7, 7, {lump:0.2, seed:1}), "black", {sheen:false, depth:2.5, soft:3, texture:0.05});
K.press(g, K.slab(-48, 0, 6, 18, 2, {lump:0.2}), "brown", {sheen:false});
g.save(); g.lineCap = "round"; g.strokeStyle = "rgba(255,248,230,0.95)"; g.lineWidth = 0.7;
for (const yy of [-3, -1, 1, 3]){ g.beginPath(); g.moveTo(-48, yy); g.lineTo(hx - 8, yy * 0.8); g.stroke(); }
g.restore();
} },
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
const deck = K.tube([[-54.5, -14.8], [-36, -7.6], [0, -7], [36, -7.6], [54.5, -14.8]], 8.6);
K.blob(g, deck, "pink", {depth:2, soft:2.8, sheen:{x:-20, y:-9, rx:9, ry:1.6}});
const tape = K.tube([[-52, -16.2], [-36, -10.2], [0, -9.6], [36, -10.2], [52, -16.2]], 2.6);
K.press(g, tape, "black", {sheen:false, depth:0.6, soft:1, texture:0.25});
K.press(g, K.ball(0, -5.6, 5, 1.6, {lump:0.05}), "lime", {sheen:false, texture:0});
K.press(g, K.ball(-13, -5.6, 3, 1.4, {lump:0.05}), "yellow", {sheen:false, texture:0});
K.press(g, K.ball(13, -5.6, 3, 1.4, {lump:0.05}), "blue", {sheen:false, texture:0});
} },
{ id: "controller", en: "Game controller", zh: "遊戲手掣", kind: "risky",
note: "two round grips hanging below a flat top: rocks side to side",
make(x, y){ const S = CLAY.shape;
return S.body([R(S, x, y, CTL.body), S.circle(x + CTL.gripL[0], y + CTL.gripL[1], CTL.gripL[2]), S.circle(x + CTL.gripR[0], y + CTL.gripR[1], CTL.gripR[2])], "plastic", {density:0.0013}); },
draw(g){ const K = CLAY; const [bx, by, bw, bh, br] = CTL.body;
const shell = K.merge(K.slab(bx, by, bw, bh, br, {lump:0.6, seed:4}), K.ball(CTL.gripL[0], CTL.gripL[1], 15, 15, {lump:0.5, seed:2}), K.ball(CTL.gripR[0], CTL.gripR[1], 15, 15, {lump:0.5, seed:3}));
K.blob(g, shell, "purple", {sheen:{x:-18, y:-10, rx:9, ry:3}});
const dp = K.merge(K.rrc(-22, -2, 13, 4.6, 1.4), K.rrc(-22, -2, 4.6, 13, 1.4));
K.press(g, dp, "yellow", {sheen:false});
const btn = [[22, -8, "pink"], [28, -2, "green"], [22, 4, "blue"], [16, -2, "orange"]];
for (const [x, y, c] of btn) K.press(g, K.ball(x, y, 2.9, 2.9, {lump:0.1}), c, {sheen:false, texture:0});
for (const xx of [-8, 8]){ K.press(g, K.ball(xx, 6, 4.6, 4.6, {lump:0.15}), "black", {sheen:false}); K.groove(g, K.circle(xx, 6, 2.4), 0.7); }
K.press(g, K.rrc(0, -9, 8, 2.6, 1.2), "lime", {sheen:false, texture:0});
} },
{ id: "headphones", en: "Wireless headphones", zh: "無線耳機", kind: "risky",
note: "an open arch on two ear cups: the arch hooks whatever lands on it",
make(x, y){ const S = CLAY.shape; const parts = hpSegs().map(q => S.convex(x, y, q));
for (const c of HP.cups) parts.push(S.convex(x, y, ellPts(...c.shell, 16)), S.convex(x, y, ellPts(...c.pad, 14)));
return S.body(parts, "plastic", {density:0.0013, friction:0.6}); },
draw(g){ const K = CLAY;
const arc = (rr, b0, b1, n) => Array.from({length:n + 1}, (_, i) => arcPt(b0 + (b1 - b0) * i / n, rr));
const band = K.tube(arc(HP.r, HP.a0, HP.a1, 28), HP.w);
K.blob(g, band, "teal", {depth:2.4, soft:3.2, sheen:{x:-16, y:-25, rx:9, ry:2}});
const padArc = arc(HP.r - 1.6, Math.PI*1.22, Math.PI*1.78, 12);
K.press(g, K.tube(padArc, 4.6), "pink", {sheen:false, depth:1.1, soft:1.8});
for (let i = 2; i < 12; i += 2) K.press(g, K.ball(padArc[i][0], padArc[i][1], 0.7, 0.7, {lump:0.02, n:8}), "#E2357F", {sheen:false, texture:0, rim:0});
for (const c of HP.cups){ const {s} = c;
const [px, py, prx, pry] = c.pad, [sx, sy, srx, sry] = c.shell;
const pad = K.ball(px, py, prx, pry, {lump:0.35, seed:px + 31});
K.blob(g, pad, "purple", {depth:2, soft:2.6, sheen:{x:px - 1.5, y:py - 7, rx:1.4, ry:3}});
for (const yy of [-6, 0, 6]) K.groove(g, line([[px - 1.6*s, py + yy], [px + 1.4*s, py + yy + 0.8]]), 0.7);
const shell = K.ball(sx, sy, srx, sry, {lump:0.45, seed:sx + 50});
K.blob(g, shell, "pink", {sheen:{x:sx - 3, y:sy - 7, rx:2.4, ry:4.5}});
K.groove(g, K.ellipse(sx + 2.5*s, sy, 3.6, 10), 0.9);
K.press(g, K.ball(c.x, 4.8, 3.4, 2.6, {lump:0.1, seed:sx}), "yellow", {sheen:false});
}
K.press(g, K.ball(-33.5, 26, 1.5, 1.5, {lump:0.02, n:8}), "lime", {sheen:false, texture:0});
} },
{ id: "camera", en: "Camera with zoom lens", zh: "相機", kind: "risky",
note: "boxy body with a long lens jutting out one side: front-heavy and lopsided",
make(x, y){ const S = CLAY.shape;
return S.body([R(S, x, y, CAM.body), R(S, x, y, CAM.hump), R(S, x, y, CAM.lens), R(S, x, y, CAM.rim), R(S, x, y, CAM.btn)], "metal", {density:0.0026, friction:0.55}); },
draw(g){ const K = CLAY;
const [lx, ly, lw, lh, lr] = CAM.lens, [rx, ry, rw, rh, rr] = CAM.rim;
const lens = K.slab(lx, ly, lw, lh, lr, {lump:0.5, seed:3});
K.blob(g, lens, "iron", {sheen:{x:lx - 6, y:ly - 9, rx:7, ry:2}});
for (const xx of [lx - 6, lx + 1, lx + 8]) K.groove(g, line([[xx, ly - 13], [xx, ly + 13]]), 0.9, {light:"rgba(255,255,255,0.35)"});
K.press(g, K.slab(lx - 4, ly, 6, lh - 3, 2, {lump:0.2}), "red", {sheen:false});
K.blob(g, K.slab(rx, ry, rw, rh, rr, {lump:0.3, seed:9}), "black", {depth:1.8, soft:2.4, sheen:false});
K.press(g, K.ball(rx + 1.5, ry - 8, 1.4, 7, {lump:0.1}), "sky", {sheen:false, texture:0});
const [bx, by, bw, bh, br] = CAM.body, [hx, hy, hw, hh, hr] = CAM.hump;
K.blob(g, K.slab(hx, hy, hw, hh, hr, {lump:0.3, seed:5}), "yellow", {sheen:false, depth:2, soft:3});
const body = K.slab(bx, by, bw, bh, br, {lump:0.8, seed:11});
K.blob(g, body, "yellow", {sheen:{x:bx - 18, y:by - 13, rx:9, ry:4}});
K.press(g, K.slab(bx, by + 6, bw - 4, 18, 3, {lump:0.4, seed:6}), "black", {sheen:false, texture:0.4});
K.press(g, K.ball(bx - 18, by - 10, 6, 4, {lump:0.2}), "white", {sheen:false});
K.press(g, K.ball(bx + 16, by - 11, 3, 3, {lump:0.1}), "pink", {sheen:false, texture:0});
const [tx, ty, tw, th, tr] = CAM.btn; K.press(g, K.rrc(tx, ty, tw, th, tr), "red", {sheen:false});
} },
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
(function(){
"use strict";
const line = pts => CLAY.poly(pts, false);
const clip = (g, path, fn) => { g.save(); g.clip(path); fn(); g.restore(); };
const R = (S, x, y, [px, py, w, h, r, ang]) => S.rect(x + px, y + py, w, h, Object.assign(r ? {r} : {}, ang ? {angle:ang} : {}));
const C = (S, x, y, pts) => S.convex(x, y, pts);
const ellArc = (cx, cy, rx, ry, a0, a1, n) => Array.from({length:n + 1}, (_, i) => { const a = a0 + (a1 - a0) * i / n; return [cx + rx*Math.cos(a), cy + ry*Math.sin(a)]; });
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
const BANA = {r: 66, cy: 58, a: 0.84, wMax: 20, wEnd: 4, stem: 7.5, stemW: 5};
const banW = t => BANA.wEnd + (BANA.wMax - BANA.wEnd) * Math.pow(Math.sin(Math.PI * Math.min(1, Math.max(0, t))), t < 0.5 ? 0.5 : 0.75);
const banC = t => { const a = (t*2 - 1) * BANA.a; return [BANA.r*Math.sin(a), BANA.cy - BANA.r*Math.cos(a), Math.sin(a), -Math.cos(a)]; };
const banAt = (t, f, pad = 0) => { const [x, y, nx, ny] = banC(t), h = banW(t)/2 * f + Math.sign(f) * pad; return [x + nx*h, y + ny*h]; };
const banEdges = (t0, t1, n, pad = 0) => { const top = [], bot = []; for (let i = 0; i <= n; i++){ const t = t0 + (t1 - t0) * i / n; top.push(banAt(t, 1, pad)); bot.push(banAt(t, -1, pad)); } return {top, bot}; };
const banStem = () => { const [x, y, nx, ny] = banC(1), tx = -ny, ty = nx, L = BANA.stem;
return [[x - tx*1.5, y - ty*1.5], [x + tx*L*0.55, y + ty*L*0.55], [x + tx*L + nx*1.6, y + ty*L + ny*1.6]]; };
function hull(pts){ const P = pts.map(q => [q[0], q[1]]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
const cr = (o, a, b) => (a[0] - o[0])*(b[1] - o[1]) - (a[1] - o[1])*(b[0] - o[0]); const lo = [], up = [];
for (const q of P){ while (lo.length > 1 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
for (const q of P.slice().reverse()){ while (up.length > 1 && cr(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
return lo.slice(0, -1).concat(up.slice(0, -1)); }
const BAN = Array.from({length:8}, (_, k) => { const e = banEdges(k/8, (k + 1)/8, 4, 0.4); return hull(e.top.concat(e.bot)); });
const UM = {canopy: ellArc(0, -14, 48, 30, Math.PI, Math.PI*2, 10), shaft: [0, 13, 6, 54, 2], hook: [7, 41, 18, 6, 3], tip: [13.5, 35.5, 5, 13, 2], ferrule: [0, -46, 4, 6, 1.5]};
const SG = {lensL: [-22, 4, 19, 15], lensR: [22, 4, 19, 15], bridge: [0, -4, 16, 5, 2], arm: [52, -7, 26, 4, 2]};
const ellPts = (cx, cy, rx, ry, n) => Array.from({length:n}, (_, i) => { const a = i / n * Math.PI * 2; return [cx + rx*Math.cos(a), cy + ry*Math.sin(a)]; });
const TEA = "#E9A86A", PEARL = "#4A2C2A";
window.ITEM_DEFS = (window.ITEM_DEFS || []).concat([
{ id: "bubbletea", en: "Daily bubble tea", zh: "每日一杯珍奶", kind: "risky",
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
K.press(g, K.slab(0, 10, 13, 9, 3, {lump:0.2}), "yellow");
K.groove(g, K.circle(0, 10, 2), 0.7);
clip(g, body, () => { for (let xx = -38; xx <= 38; xx += 6) K.groove(g, line([[xx, 31], [xx + 2, 33]]), 0.6); });
} },
{ id: "sneaker", en: "Limited sneakers", zh: "限量波鞋", kind: "risky",
note: "chunky sole with a tall heel collar and low toe: uneven top, nothing sits flat on it",
make(x, y){ const S = CLAY.shape; return S.body([R(S, x, y, SN.sole), C(S, x, y, SN.upper), C(S, x, y, SN.toe)], "rubber", {restitution:0.18, friction:0.85, density:0.0013}); },
draw(g){ const K = CLAY;
const upper = K.merge(K.blobPoly(SN.upper, {lump:0.7, seed:3}), K.blobPoly(SN.toe, {lump:0.5, seed:4}));
K.blob(g, upper, "blue", {sheen:{x:-34, y:-14, rx:9, ry:4}});
K.press(g, K.blobPoly([[18, 9], [49, 9], [46, 1.5], [32, -3], [16, -1]], {lump:0.4, seed:8}), "white", {sheen:false});
K.press(g, K.blobPoly([[-53, -26], [-41, -26], [-41, 8], [-53, 8]], {lump:0.3, seed:2}), "pink", {sheen:false});
const bolt = K.poly([[-26, -8], [-12, -14], [-16, -5], [-2, -9], [-22, 4], [-17, -4]]);
K.press(g, bolt, "yellow", {sheen:false});
g.save(); g.lineCap = "round";
const lace = K.tube([[-6, -15], [3, -9], [-2, -6], [8, -2], [3, 1], [12, 3]], 2.2);
K.press(g, lace, "yellow", {sheen:false, depth:0.6, soft:1, texture:0});
g.restore();
const [sx, sy, sw, sh, sr] = SN.sole; const sole = K.slab(sx, sy, sw, sh, sr, {lump:0.6, seed:9});
K.blob(g, sole, "white", {depth:2.4, soft:3, sheen:false});
K.press(g, K.slab(sx, sy + 3.5, sw - 4, 5, 2, {lump:0.3, seed:6}), "lime", {sheen:false, depth:0.9});
clip(g, sole, () => { for (let xx = -48; xx <= 48; xx += 6) K.groove(g, line([[xx, sy + 1.5], [xx, sy + 6]]), 0.6); });
} },
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
K.press(g, K.tube([[-36, -17], [-14, -9], [8, -1]], 2.6), "black", {sheen:false, depth:0.6, soft:1, texture:0});
K.press(g, K.ball(22, 9, 5, 3.4, {lump:0.2, seed:1}), "pink", {sheen:false});
K.press(g, K.ball(31, 9, 5, 3.4, {lump:0.2, seed:2}), "pink", {sheen:false});
K.press(g, K.ball(26.5, 9, 2.6, 2.6, {lump:0.1}), "yellow", {sheen:false, texture:0});
} },
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
g.save(); g.translate(5, 22); g.rotate(-0.12);
K.press(g, K.slab(0, 0, 26, 12, 3, {lump:0.3, seed:4}), "yellow", {sheen:false});
K.text(g, "12期", 0, 0.5, {size:8, font:"zh", color:"red", weight:900});
g.restore();
} },
{ id: "banana", en: "Banana", zh: "香蕉", kind: "risky",
note: "curved arc: rocks back and forth, nothing balances on its hump",
make(x, y){ const S = CLAY.shape; const [[sx, sy], , [ex, ey]] = banStem();
const stem = [(sx + ex)/2, (sy + ey)/2, Math.hypot(ex - sx, ey - sy), BANA.stemW - 1, 1.5, Math.atan2(ey - sy, ex - sx)];
return S.body(BAN.map(q => C(S, x, y, q)).concat([R(S, x, y, stem)]), "food", {friction:0.55, density:0.0012}); },
draw(g){ const K = CLAY; const BAN_Y = "#FFE14D";
const st = banStem(); K.blob(g, K.tube(st, BANA.stemW), "brown", {depth:1.4, soft:2, sheen:false});
K.press(g, K.ball(st[2][0], st[2][1], 2.2, 2.2, {lump:0.1, n:9}), "#5E3A26", {sheen:false, texture:0.2, rim:0.4});
const e = banEdges(0, 1, 40);
const body = K.blobPoly(e.top.concat(e.bot.slice().reverse()), {lump:0.45, seed:17, step:6});
K.blob(g, body, BAN_Y, {depth:3.2, soft:5.5, sheen:{x:-12, y:-13, rx:13, ry:2.2}});
for (const f of [0.34, -0.3]){ const pts = []; for (let i = 0; i <= 24; i++){ const t = 0.07 + 0.86 * i / 24; pts.push(banAt(t, f)); }
K.groove(g, K.poly(pts, false), 0.85, {dark:"rgba(170,105,0,0.42)", light:"rgba(255,255,230,0.7)"}); }
for (const [t, f, r] of [[0.3, 0.66, 1.3], [0.56, -0.64, 1], [0.72, 0.62, 1.4]]){ const [x, y] = banAt(t, f), a = (t*2 - 1) * BANA.a;
g.save(); g.translate(x, y); g.rotate(a); g.fillStyle = "rgba(122,74,38,0.75)"; g.beginPath(); g.ellipse(0, 0, r * 1.4, r * 0.8, 0, 0, 7); g.fill(); g.restore(); }
const [tx, ty, tnx, tny] = banC(0); g.save(); g.translate(tx + tny*0.6, ty - tnx*0.6); g.rotate(-BANA.a);
K.press(g, K.ball(0, 0, 2.6, 2.2, {lump:0.1, n:10, seed:4}), "#3A2A26", {sheen:false, texture:0.15}); g.restore();
} },
{ id: "umbrella", en: "Umbrella", zh: "雨傘", kind: "risky",
note: "dome canopy on a long shaft with a J hook that snags",
make(x, y){ const S = CLAY.shape; return S.body([C(S, x, y, UM.canopy), R(S, x, y, UM.shaft), R(S, x, y, UM.hook), R(S, x, y, UM.tip), R(S, x, y, UM.ferrule)], "fabric", {density:0.0012, friction:0.6}); },
draw(g){ const K = CLAY;
const [sx, sy, sw, sh] = UM.shaft; K.blob(g, K.rrc(sx, sy, sw, sh, 2.5), "grey", {sheen:false, depth:1.2, soft:1.6});
const hook = K.tube([[0, 33], [0, 41], [3, 44], [10, 44], [13.5, 41], [13.5, 30]], 6);
K.blob(g, hook, "purple", {depth:1.6, soft:2.2, sheen:false});
const [fx, fy, fw, fh] = UM.ferrule; K.press(g, K.rrc(fx, fy, fw, fh, 1.5), "yellow", {sheen:false});
const hem = []; for (let i = 3; i >= 0; i--) hem.push(...ellArc(-36 + i * 24, -14, 12, 2.2, Math.PI*2, Math.PI, 6).slice(i === 3 ? 1 : 0, -1));
const canopy = K.blobPoly(UM.canopy.concat(hem), {lump:0.5, seed:5, step:7});
K.blob(g, canopy, "pink", {sheen:{x:-22, y:-34, rx:9, ry:3}});
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
for (let i = 0; i <= 4; i++) K.press(g, K.ball(-48 + i * 24, -14.6, 1.7, 1.7, {lump:0.05, n:8}), "yellow", {sheen:false, texture:0});
} },
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
(function(){
"use strict";
const line = pts => CLAY.poly(pts, false);
const clip = (g, path, fn) => { g.save(); g.clip(path); fn(); g.restore(); };
const R = (S, x, y, [px, py, w, h, r, ang]) => S.rect(x + px, y + py, w, h, Object.assign(r ? {r} : {}, ang ? {angle:ang} : {}));
const C = (S, x, y, pts) => S.convex(x, y, pts);
const ellPts = (cx, cy, rx, ry, n) => Array.from({length:n}, (_, i) => { const a = i / n * Math.PI * 2; return [cx + rx*Math.cos(a), cy + ry*Math.sin(a)]; });
const GOLD = "#FFC83D", CARD = "#E8A25A", CARD_D = "#C9803E", HOT = "#FF4026";
const COIN = 25;
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
const outline = [...cap, ...L, head[0], head[1], head[2], ...Rt.slice().reverse()];
return {head, quads, outline};
})();
const PARCEL = [0, 0, 62, 56, 5];
const HOOK = {w: 7, top: -26, bend: [0, 16, 10], tip: [-11, -13], barb: [-1.5, 5], notch: [-6.5, -1],
eye: [10, -29.5, 4.3], line: [10, -38.5, 1.8, 10], float: [10, -53, 10.5]};
const hookGeo = (() => { const h = HOOK.w/2, [bx, by, br] = HOOK.bend, T = HOOK.tip, B = HOOK.barb, N = HOOK.notch;
const arc = (r, a0, a1, n) => Array.from({length:n + 1}, (_, i) => { const a = a0 + (a1 - a0) * i / n; return [bx + r*Math.cos(a), by + r*Math.sin(a)]; });
const near = (p, q, d) => { const dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy); return [p[0] + dx/l*d, p[1] + dy/l*d]; };
const outerTop = [bx - br - h, -4];
const outline = [[br - h, HOOK.top], ...arc(br - h, 0, Math.PI, 10),
[N[0], by - 6], near(N, [N[0], by], 0.7), N, near(N, B, 0.7),
near(B, N, 0.7), B, near(B, T, 0.7),
near(T, B, 0.7), T, near(T, outerTop, 0.7),
outerTop, ...arc(br + h, Math.PI, 0, 14), [br + h, HOOK.top]];
const segs = Array.from({length:6}, (_, j) => { const d = Math.PI / 6, a0 = j*d, ro = (br + h) * 2 / (1 + Math.cos(d/4)), ri = (br - h) * 2 / (1 + Math.cos(d/2));
return [...arc(ro, a0, a0 + d, 2), ...arc(ri, a0 + d, a0, 1)]; });
const arm = [[bx - br - h, by], outerTop, T, N, [bx - br + h, by]];
return {outline, segs, arm, barb: [T, B, N], shank: [bx + br, (HOOK.top + by)/2, HOOK.w, by - HOOK.top, 1]};
})();
const GIFT = {box: [0, 13, 60, 42, 4], lid: [0, -12, 68, 10, 3], loopL: ellPts(-14, -26, 14, 8, 12), loopR: ellPts(14, -26, 14, 8, 12), knot: [0, -24, 5.5]};
const DEBT = {ball: [-14, 0, 28], links: [[19, 10, 6.5], [30, 15, 6.5], [41, 18, 6.5]], cuff: [56, 18, 10]};
window.ITEM_DEFS = (window.ITEM_DEFS || []).concat([
{ id: "cryptocoin", en: "“Guaranteed” crypto coin", zh: "「保證賺」加密幣", kind: "scam",
note: "shiny coin with almost zero friction and a big bounce: skates and pings off the tower",
make(x, y){ const S = CLAY.shape; return S.body([S.circle(x, y, COIN)], "slick", {restitution:0.7, density:0.0018}); },
draw(g){ const K = CLAY; const coin = K.ball(0, 0, COIN, COIN, {lump:0.35, seed:11});
K.blob(g, coin, GOLD, {sheen:{x:-9, y:-11, rx:7, ry:3.5}});
K.groove(g, K.circle(0, 0, 19.5), 1.2);
clip(g, coin, () => { for (let i = 0; i < 24; i++){ const a = i / 24 * Math.PI * 2; K.groove(g, line([[22*Math.cos(a), 22*Math.sin(a)], [25*Math.cos(a), 25*Math.sin(a)]]), 0.6); } });
K.text(g, "100%", 0, -4, {size:10, font:"display", color:"purple", weight:900});
K.text(g, "保證賺", 0, 8, {size:7.5, font:"zh", color:"red", weight:900});
for (const [x, y, s] of [[17, -17, 4.5], [-19, 14, 3.2]]){
K.press(g, K.poly([[x, y - s], [x + s*0.3, y - s*0.3], [x + s, y], [x + s*0.3, y + s*0.3], [x, y + s], [x - s*0.3, y + s*0.3], [x - s, y], [x - s*0.3, y - s*0.3]]), "white", {sheen:false, texture:0, depth:0.5, soft:0.8});
}
} },
{ id: "hottip", en: "“Hot” stock tip", zh: "貼士股", kind: "scam",
note: "zig-zag rocket-up chart: spindly, top-heavy and slippery",
make(x, y){ const S = CLAY.shape; const [tx, ty] = TIP.pts[0];
const parts = tipGeo.quads.map(q => C(S, x, y, q)); parts.push(C(S, x, y, tipGeo.head), S.circle(x + tx, y + ty, TIP.w/2));
return S.body(parts, "slick", {friction:0.08, frictionStatic:0.12, restitution:0.25, density:0.0016}); },
draw(g){ const K = CLAY;
const arrow = K.blobPoly(tipGeo.outline, {lump:0.35, seed:23, step:5});
K.blob(g, arrow, HOT, {depth:2.6, soft:3.8, sheen:{x:-22, y:5, rx:7, ry:1.6}});
const P = TIP.pts, end = [P[3][0] + (P[3][0] - P[2][0]) * 0.22, P[3][1] + (P[3][1] - P[2][1]) * 0.22];
K.press(g, K.tube([[P[0][0] + 2.4, P[0][1] - 2], P[1], P[2], end], 3), "#FFB238", {sheen:false, texture:0, depth:0.6, soft:0.9});
for (const [x, y] of [[-27, 11], [-5, 6]]){
K.press(g, K.ball(x, y, 4.7, 4.7, {lump:0.15, seed:x}), "yellow", {sheen:false});
K.text(g, "$", x, y + 0.4, {size:7.5, font:"display", color:"red", weight:900});
}
g.save(); g.translate(18.5, -2.5); g.rotate(-0.18);
const burst = K.blobPoly(Array.from({length:24}, (_, i) => { const a = i * Math.PI / 12, r = i % 2 ? 6.9 : 8.6; return [r*Math.cos(a), r*Math.sin(a)]; }), {lump:0.15, seed:3, step:4});
K.press(g, burst, "yellow", {sheen:false});
K.text(g, "升", 0, 0.7, {size:12, font:"zh", color:"#D9161C", weight:900});
g.restore();
} },
{ id: "fakeparcel", en: "Fake parcel SMS", zh: "假速遞短訊", kind: "scam",
note: "looks like a solid box but bounces like rubber (restitution 0.85)",
make(x, y){ const S = CLAY.shape; return S.body([R(S, x, y, PARCEL)], "slick", {friction:0.2, frictionStatic:0.3, restitution:0.85, density:0.0012}); },
draw(g){ const K = CLAY; const [px, py, pw, ph, pr] = PARCEL;
const box = K.slab(px, py, pw, ph, pr, {lump:1.0, seed:31});
K.blob(g, box, CARD, {sheen:{x:-16, y:-17, rx:8, ry:3.5}});
K.press(g, K.slab(0, -2, 13, ph - 2, 2, {lump:0.4, seed:5}), "yellow", {sheen:false, depth:1.2});
K.text(g, "!!", 0, -17, {size:9, font:"display", color:"red", weight:900});
K.groove(g, line([[-30, -10], [30, -10]]), 0.8, {dark:"rgba(120,60,20,0.45)"});
g.save(); g.translate(-13, 12); g.rotate(-0.08);
K.press(g, K.slab(0, 0, 26, 20, 2.5, {lump:0.4, seed:9}), "white", {sheen:false});
for (let i = 0; i < 7; i++) K.press(g, K.rrc(-9 + i * 2.8, -2, i % 3 ? 1.2 : 2, 9, 0.3), "black", {sheen:false, texture:0, depth:0.3, soft:0.4, rim:0});
K.text(g, "HK??", 0, 6.5, {size:5.5, font:"display", color:"black", weight:900});
g.restore();
g.save(); g.translate(16, 14); g.rotate(0.2);
K.press(g, K.ball(0, 0, 8.5, 8.5, {lump:0.3, seed:3}), "red", {sheen:false});
K.text(g, "急", 0, 0.5, {size:10, font:"zh", color:"white", weight:900});
g.restore();
} },
{ id: "phishhook", en: "Phishing link", zh: "釣魚連結", kind: "scam",
note: "a big barbed fish hook under a bobber: the hook catches on whatever it lands on",
make(x, y){ const S = CLAY.shape; const G = hookGeo;
const parts = [R(S, x, y, G.shank), ...G.segs.map(q => C(S, x, y, q)), C(S, x, y, G.arm), C(S, x, y, G.barb),
S.circle(x + HOOK.eye[0], y + HOOK.eye[1], HOOK.eye[2]), R(S, x, y, HOOK.line), S.circle(x + HOOK.float[0], y + HOOK.float[1], HOOK.float[2])];
const b = S.body(parts, "metal", {density:0.002, friction:0.5});
parts.slice(-2).forEach(q => window.Matter.Body.setDensity(q, 0.0005)); window.Matter.Body.setParts(b, parts, false);
return b; },
draw(g){ const K = CLAY; const [ex, ey, er] = HOOK.eye, [fx, fy, fr] = HOOK.float;
const hook = K.blobPoly(hookGeo.outline, {lump:0.3, seed:19, step:4});
K.blob(g, hook, "teal", {sheen:{x:7.5, y:-10, rx:1.6, ry:9}});
K.blob(g, K.ball(ex, ey, er, er, {lump:0.15, seed:2}), "teal", {depth:1.6, soft:2.2, sheen:false});
K.blob(g, K.ball(ex, ey - 0.4, 1.7, 1.7, {lump:0.05, n:9}), "#0D6B63", {depth:-1, soft:1.2, sheen:false, texture:0, rim:0.4});
K.press(g, K.tube([[ex, ey - 0.6], [ex + 0.5, ey - 6], [fx, fy + fr - 0.5]], 1.5), "black", {sheen:false, texture:0, depth:0.4, soft:0.6, rim:0});
const bob = K.ball(fx, fy, fr, fr, {lump:0.3, seed:7});
K.blob(g, bob, "white", {sheen:{x:fx - 4, y:fy - 5, rx:3, ry:2}});
clip(g, bob, () => K.press(g, K.slab(fx, fy - 6, 26, 13, 1, {lump:0.2}), "pink", {sheen:false, depth:1}));
K.groove(g, line([[fx - fr, fy], [fx + fr, fy]]), 0.9);
K.text(g, "@", fx, fy + 5.2, {size:8, font:"display", color:"purple", weight:900});
K.press(g, K.rrc(fx, fy - fr - 1.5, 3, 5, 1), "yellow", {sheen:false, texture:0});
} },
{ id: "freegift", en: "“Free” gift", zh: "「免費」禮物", kind: "scam",
note: "gift box with a huge bow on top: top-heavy and wrapped in slippery foil",
make(x, y){ const S = CLAY.shape;
return S.body([R(S, x, y, GIFT.box), R(S, x, y, GIFT.lid), C(S, x, y, GIFT.loopL), C(S, x, y, GIFT.loopR), S.circle(x + GIFT.knot[0], y + GIFT.knot[1], GIFT.knot[2])], "slick", {friction:0.1, frictionStatic:0.15, restitution:0.2, density:0.0014}); },
draw(g){ const K = CLAY;
const [bx, by, bw, bh, br] = GIFT.box; const box = K.slab(bx, by, bw, bh, br, {lump:0.7, seed:41});
K.blob(g, box, "purple", {sheen:{x:-16, y:2, rx:7, ry:3}});
K.press(g, K.slab(0, by, 10, bh - 2, 1.5, {lump:0.2, seed:3}), "yellow", {sheen:false});
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
K.press(g, K.ball(bx + 18, by + 9, 4.5, 4.5, {lump:0.1}), "grey", {sheen:false});
K.text(g, "債", bx, by + 2, {size:27, font:"zh", color:"red", weight:900});
} }
]);
})();
(function(){
"use strict";
const ellPts = (cx, cy, rx, ry, n) => Array.from({length:n}, (_, i) => { const a = i / n * Math.PI * 2; return [cx + rx*Math.cos(a), cy + ry*Math.sin(a)]; });
function hull(pts){
const p = pts.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]), cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
const lo = [], up = [];
for (const q of p){ while (lo.length > 1 && cross(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
for (const q of p.reverse()){ while (up.length > 1 && cross(up[up.length - 2], up[up.length - 1], q) <= 0) up.pop(); up.push(q); }
return lo.slice(0, -1).concat(up.slice(0, -1));
}
const line = pts => CLAY.poly(pts, false);
const SHELL = {cx: 0, cy: 14, rx: 40, ry: 22};
const FOOT = sx => [sx * 40, 37, 30, 7, 3];
const ARM = sx => [sx * 47, -12, 11, 44, 4, sx * 0.42];
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
for (const sx of [-1, 1]) for (let i = 0; i < 3; i++)
K.blob(g, K.tube([[sx * (22 + i*8), 26], [sx * (32 + i*9), 34], [sx * (34 + i*9.5), 39]], 6), "orange", {depth:1.2, soft:1.8, sheen:false, rim:0.6});
for (const sx of [-1, 1]){
K.blob(g, K.tube([[sx * 36, 10], [sx * 46, -10], [sx * 55, -30]], 11), "orange", {depth:1.6, soft:2.2, sheen:false});
const c = CLAW(sx), pinch = K.merge(K.ball(...c.big, {lump:0.3, seed:sx + 4}), K.ball(...c.thumb, {lump:0.2, seed:sx + 8}));
K.blob(g, pinch, "red", {depth:2.2, soft:3, sheen:{x: sx * 58 - 5, y: -46, rx: 4, ry: 2.5}});
K.groove(g, line([[sx * 52, -47], [sx * 58, -51], [sx * 62, -47]]), 1.1);
}
for (const sx of [-1, 1]) K.blob(g, K.tube([[sx * 10, -4], [sx * 13, -26]], 6), "red", {depth:1, soft:1.6, sheen:false, rim:0.6});
const shell = K.ball(SHELL.cx, SHELL.cy, SHELL.rx, SHELL.ry, {lump:0.6, seed:9});
K.blob(g, shell, "red", {sheen:{x:-15, y:3, rx:12, ry:5}});
K.press(g, K.ball(0, 3, 7.5, 7.5, {lump:0.15, n:16}), "yellow", {sheen:false, depth:1.4});
K.groove(g, K.ball(0, 3, 5, 5, {lump:0.1, n:14}), 0.6);
K.text(g, "$", 0, 3.4, {size:8, font:"display", color:"orange", weight:900});
K.groove(g, line([[-10, 20], [0, 26], [10, 20]]), 1.6);
for (const sx of [-1, 1]) K.press(g, K.ball(sx * 24, 18, 5.5, 3.6, {lump:0.05}), "pink", {sheen:false, texture:0});
for (const sx of [-1, 1]){ const [ex, ey, er] = EYE(sx); K.eye(g, ex, ey, er, 0, -0.4); }
} }
]);
})();
(function(){
"use strict";
const line = pts => CLAY.poly(pts, false);
const clip = (g, path, fn) => { g.save(); g.clip(path); fn(); g.restore(); };
const R = (S, x, y, [px, py, w, h, r, ang]) => S.rect(x + px, y + py, w, h, Object.assign(r ? {r} : {}, ang ? {angle:ang} : {}));
const C = (S, x, y, pts) => S.convex(x, y, pts);
const ellArc = (cx, cy, rx, ry, a0, a1, n) => Array.from({length:n + 1}, (_, i) => { const a = a0 + (a1 - a0) * i / n; return [cx + rx*Math.cos(a), cy + ry*Math.sin(a)]; });
const shadeOver = (g, path, x0, x1, y0, y1, a) => clip(g, path, () => { g.fillStyle = "rgba(60,25,70," + a + ")"; g.fillRect(x0, y0, x1 - x0, y1 - y0); });
const BREAD = "#DC8A34", CRUST = "#FFC94E", CRACK = "rgba(150,65,5,0.7)";
const PASTRY = "#F3AE45", PASTRY_D = "#D98A2B", CUSTARD = "#FFD21F";
const GOLD = "#FFD54A", LAISEE_D = "#D8302E";
const MILKTEA = "#C98A4E", CAFE_GREEN = "#2FA25A";
const SILVER = "#E3E6EE", GLASS = "#9ED8F5";
const TILE = "#FFF4DC", TILE_BACK = "#2FA25A";
const BUN = {dome: [[-39, 22], [39, 22]].concat(ellArc(0, 12, 43, 36, 0, -Math.PI, 14))};
const LAISEE = [0, 0, 102, 18, 4];
const TART = {shell: [[-45, -6], [45, -6], [33, 17], [-33, 17]],
cap: [[-41, -6], [41, -6], [35, -11], [19, -14.6], [0, -15.8], [-19, -14.6], [-35, -11]]};
const TEA = {cup: [[-19, 34], [19, 34], [25, -32]].concat(ellArc(0, -32, 25, 5, 0, -Math.PI, 6).slice(1, -1), [[-25, -32]]),
handle: [[22, -21], [33, -22.5], [40, -16], [41.5, -6], [37.5, 4], [20.5, 7]]};
const TAXI = {body: [0, 3, 104, 22, 7], cab: [[-31, -8], [33, -8], [21, -26], [-19, -26]], sign: [1, -30, 22, 8, 2.5],
wheelL: [-30, 14, 9.5], wheelR: [32, 14, 9.5]};
const MJ = [[-4, 23, 52, 23, 4], [5, 0, 52, 23, 4], [-1, -23, 52, 23, 4]];
window.ITEM_DEFS = (window.ITEM_DEFS || []).concat([
{ id: "polobun", en: "Pineapple bun", zh: "菠蘿包", kind: "wise",
note: "an $8 bakery breakfast instead of café brunch: soft dome on a flat base, sits tight",
make(x, y){ const S = CLAY.shape; return S.body([C(S, x, y, BUN.dome)], "food", {friction:0.85, frictionStatic:1.2, restitution:0.02, density:0.0016}); },
draw(g){ const K = CLAY;
const bread = K.blobPoly(BUN.dome, {lump:0.7, seed:7, step:6});
K.blob(g, bread, BREAD, {sheen:false});
const edge = []; for (let i = 0; i <= 12; i++){ const xx = -40 + i * 80 / 12; edge.push([xx, 9 + 1.6 * Math.sin(i * 2.1) + (i % 2 ? 1.2 : 0)]); }
const crustPts = ellArc(0, 12, 41.5, 34.5, -0.12, -Math.PI + 0.12, 16).concat(edge);
const crust = K.blobPoly(crustPts, {lump:0.9, seed:13, step:4});
K.blob(g, crust, CRUST, {sheen:{x:-14, y:-14, rx:10, ry:5}, depth:3.4});
const r = K.rng(29), s = 13, nodes = {};
const node = (i, j) => { const k = i + "," + j; if (!nodes[k]){ const u = (i - j) * s * 0.6, v = -30 + (i + j) * s * 0.43;
const bulge = 1 - Math.pow(Math.min(1, Math.abs(u) / 46), 2);
nodes[k] = [u * (0.88 + 0.12 * bulge) + (r() - 0.5) * 4.4, v + (r() - 0.5) * 3.4 - 3 * bulge]; } return nodes[k]; };
clip(g, crust, () => {
for (let i = -5; i <= 9; i++) for (let j = -5; j <= 9; j++){
const q = [node(i, j), node(i + 1, j), node(i + 1, j + 1), node(i, j + 1)];
const cx = (q[0][0] + q[1][0] + q[2][0] + q[3][0]) / 4, cy = (q[0][1] + q[1][1] + q[2][1] + q[3][1]) / 4;
if (cy < -32 || cy > 14 || Math.abs(cx) > 46) continue;
K.softSpot(g, null, K.ellipse(cx - 1.2, cy - 1.4, 3, 1.8), "rgba(255,250,215,0.75)", 2.2);
K.softSpot(g, null, K.ellipse(cx + 1.5, cy + 2.2, 3.6, 1.2), "rgba(200,110,20,0.35)", 2);
}
for (let i = -5; i <= 10; i++){ const a = [], b = []; for (let j = -5; j <= 10; j++){ a.push(node(i, j)); b.push(node(j, i)); }
for (const pl of [a, b]){ g.save(); g.lineCap = "round"; g.lineJoin = "round"; g.lineWidth = 2.6; g.strokeStyle = "rgba(214,128,40,0.95)"; g.stroke(line(pl)); g.restore();
K.groove(g, line(pl), 1.2, {dark:CRACK, light:"rgba(255,245,200,0.75)"}); } }
const rr = K.rng(5);
for (let k = 0; k < 34; k++){ const xx = -36 + rr() * 72, yy = -22 + rr() * 30; if (yy < -24 + Math.pow(xx / 41, 2) * 30) continue;
g.fillStyle = "rgba(255,252,230,0.95)"; g.beginPath(); g.arc(xx, yy, 0.45 + rr() * 0.4, 0, 7); g.fill(); }
});
K.groove(g, line([[-37, 19], [0, 20], [37, 19]]), 0.8, {dark:"rgba(140,70,10,0.35)"});
} },
{ id: "laisee", en: "Red packet", zh: "利是", kind: "wise",
note: "saving the lai see money: a flat red envelope, a perfect flat ledge",
make(x, y){ const S = CLAY.shape; return S.body([R(S, x, y, LAISEE)], "card", {friction:0.88, frictionStatic:1.25, restitution:0.02, density:0.0016}); },
draw(g){ const K = CLAY;
const env = K.slab(...LAISEE, {lump:0.6, seed:43});
K.blob(g, env, "red", {sheen:{x:-24, y:-4.5, rx:14, ry:2.2}});
clip(g, env, () => {
K.press(g, K.blobPoly([[52, -10], [34, 0], [52, 10]], {lump:0.2, seed:3, step:4}), LAISEE_D, {sheen:false, depth:1, texture:0.06});
K.press(g, K.tube([[51, -9.5], [34.5, 0], [51, 9.5]], 1.6), GOLD, {sheen:false, texture:0, depth:0.5, soft:0.8, rim:0.4});
});
for (const yy of [-6.2, 6.2]) K.press(g, K.tube([[-45, yy], [30, yy]], 1.1), GOLD, {sheen:false, texture:0, depth:0.4, soft:0.7, rim:0});
K.press(g, K.ball(-6, 0, 8.2, 8.2, {lump:0.15, seed:2}), GOLD, {sheen:{x:-8.5, y:-3, rx:2.5, ry:1.4}});
K.groove(g, K.circle(-6, 0, 6.4), 0.55, {dark:"rgba(170,90,0,0.5)", light:"rgba(255,250,210,0.6)"});
K.text(g, "福", -6, 0.6, {size:10.5, font:"zh", color:"red", weight:900});
K.dots(g, [[-40, -2.5], [-34, 2.5], [-27, -2], [-20, 2.6], [8, -2.4], [15, 2.4], [22, -2], [-44, 3]], 1, GOLD);
} },
{ id: "eggtart", en: "Egg tart", zh: "蛋撻", kind: "wise",
note: "a cheap bakery treat: low wide tart on a flat base, very steady",
make(x, y){ const S = CLAY.shape; return S.body([C(S, x, y, TART.shell), C(S, x, y, TART.cap)], "food", {friction:0.85, frictionStatic:1.2, restitution:0.02, density:0.0015}); },
draw(g){ const K = CLAY;
const cap = K.blobPoly(TART.cap, {lump:0.25, seed:5, step:5});
K.blob(g, cap, CUSTARD, {sheen:{x:-14, y:-12, rx:9, ry:1.8}, depth:2.4, soft:3.4, texture:0.05});
K.softSpot(g, cap, K.ellipse(18, -10.5, 6, 1.6), "rgba(255,255,255,0.8)", 2);
K.softSpot(g, cap, K.ellipse(28, -8.5, 3.5, 1.4), "rgba(200,120,0,0.45)", 2);
const shell = K.blobPoly(TART.shell, {lump:0.6, seed:9, step:5});
K.blob(g, shell, PASTRY, {sheen:{x:-20, y:-1, rx:9, ry:2}});
shadeOver(g, shell, 20, 50, -10, 20, 0.1);
clip(g, shell, () => {
for (let i = -7; i <= 7; i++){ const xt = i * 6.1, xb = xt * 33 / 45;
K.groove(g, line([[xt, -2], [xb, 15]]), 1.2, {dark:"rgba(150,70,0,0.42)", light:"rgba(255,235,170,0.65)"}); }
});
const rim = K.tube([[-44, -5.4], [-20, -5.8], [0, -5.9], [20, -5.8], [44, -5.4]], 5.2);
K.press(g, rim, "#F8C25A", {sheen:{x:-18, y:-6.5, rx:10, ry:1}, depth:1.2, soft:1.8});
for (let i = -7; i <= 7; i++) K.groove(g, line([[i * 6.1 + 3, -8], [i * 6.1 + 3, -3.2]]), 0.7, {dark:"rgba(170,85,0,0.5)"});
K.groove(g, line([[-32, 15.5], [32, 15.5]]), 0.8, {dark:"rgba(150,70,0,0.4)"});
K.softSpot(g, shell, K.ellipse(0, 16, 30, 2.4), "rgba(170,80,0,0.4)", 2.5);
} },
{ id: "milktea", en: "Daily milk tea", zh: "絲襪奶茶", kind: "risky",
note: "a daily tea-café habit adds up: heavy cup, wider at the rim, handle sticking out, slick glaze",
make(x, y){ const S = CLAY.shape; return S.body([C(S, x, y, TEA.cup), C(S, x, y, TEA.handle)], "glass", {density:0.0022, friction:0.35, frictionStatic:0.5, restitution:0.06}); },
draw(g){ const K = CLAY;
const hp = ellArc(28, -7.5, 9.5, 10.5, -Math.PI * 0.72, Math.PI * 0.62, 12); hp.unshift([21.5, -17]); hp.push([21, 2.5]);
const handle = K.tube(hp, 6.2);
K.blob(g, handle, "white", {depth:1.8, soft:2.4, sheen:{x:33, y:-16, rx:2.5, ry:1.4}});
const body = K.blobPoly([[-19, 34], [19, 34], [25, -32], [-25, -32]], {lump:0.6, seed:17, step:6});
K.blob(g, body, "white", {sheen:{x:-13, y:-6, rx:3.5, ry:16}});
shadeOver(g, body, 9, 30, -40, 40, 0.07);
clip(g, body, () => {
K.press(g, K.tube([[-30, -21.5], [30, -21.5]], 3.4), CAFE_GREEN, {sheen:false, depth:0.9, soft:1.3, texture:0.06});
K.press(g, K.tube([[-30, -16.2], [30, -16.2]], 1.2), CAFE_GREEN, {sheen:false, depth:0.5, soft:0.8, texture:0, rim:0});
K.press(g, K.tube([[-30, 27.5], [30, 27.5]], 1.4), CAFE_GREEN, {sheen:false, depth:0.5, soft:0.8, texture:0, rim:0});
});
K.groove(g, line([[-18, 32], [18, 32]]), 0.7, {dark:"rgba(80,60,110,0.35)"});
const rimP = K.ellipse(0, -32, 25, 5);
K.press(g, rimP, "white", {sheen:false, depth:0.8, soft:1.4});
const tea = K.ellipse(0, -31.6, 21.5, 3.5);
K.blob(g, tea, MILKTEA, {sheen:{x:-8, y:-32.6, rx:5, ry:0.9}, depth:1, soft:1.6, texture:0.04, rim:0.6});
K.inner(g, tea, "rgba(90,40,10,0.55)", 1.6, 0.6, 1);
K.softSpot(g, tea, K.ellipse(6, -31, 6, 1.2), "rgba(255,230,190,0.6)", 1.5);
} },
{ id: "taxi", en: "Taxi rides", zh: "的士", kind: "risky",
note: "taking taxis everywhere: a toy cab on two round wheels, rolls off and won't stay put",
make(x, y){ const S = CLAY.shape;
return S.body([R(S, x, y, TAXI.body), C(S, x, y, TAXI.cab), R(S, x, y, TAXI.sign),
S.circle(x + TAXI.wheelL[0], y + TAXI.wheelL[1], TAXI.wheelL[2]), S.circle(x + TAXI.wheelR[0], y + TAXI.wheelR[1], TAXI.wheelR[2])],
"plastic", {friction:0.18, frictionStatic:0.25, restitution:0.1, density:0.0015}); },
draw(g){ const K = CLAY;
const cab = K.blobPoly(TAXI.cab, {lump:0.4, seed:11, step:6});
K.blob(g, cab, SILVER, {sheen:{x:-8, y:-23, rx:10, ry:1.6}, depth:2.4, soft:3.4});
const winR = K.blobPoly([[4, -10], [28, -10], [19.5, -23], [4, -23]], {lump:0.2, seed:4, step:4});
const winL = K.blobPoly([[-27, -10], [0, -10], [0, -23], [-17, -23]], {lump:0.2, seed:5, step:4});
for (const w of [winL, winR]){ K.press(g, w, GLASS, {sheen:false, depth:1.1, soft:1.6}); }
for (const [x0, x1] of [[-14, -9], [10, 15]]) K.press(g, K.tube([[x0, -12], [x1 + 3, -21]], 1.6), "white", {sheen:false, texture:0, depth:0.3, soft:0.6, rim:0});
const [sx, sy, sw, sh, sr] = TAXI.sign;
K.blob(g, K.slab(sx, sy, sw, sh, sr, {lump:0.2, seed:3}), "cream", {depth:1.2, soft:1.8, sheen:false});
K.text(g, "的士", sx, sy + 0.5, {size:6.4, font:"zh", color:"red", weight:900});
const [bx, by, bw, bh, br] = TAXI.body;
const body = K.slab(bx, by, bw, bh, br, {lump:0.6, seed:21});
K.blob(g, body, "red", {sheen:{x:-26, y:-3, rx:14, ry:2.4}});
K.groove(g, line([[2, -7], [2, 9]]), 0.9);
K.groove(g, line([[-27, -7], [-27, 9]]), 0.9);
for (const xx of [-8, 19]) K.press(g, K.rrc(xx, -2.5, 6, 2, 1), SILVER, {sheen:false, texture:0, depth:0.4, soft:0.7});
K.press(g, K.slab(48.5, 3.5, 6, 6, 2, {lump:0.1}), "yellow", {sheen:{x:47.5, y:2, rx:1.4, ry:1}});
K.press(g, K.slab(-49.5, 0.5, 4, 5, 1.5, {lump:0.1}), "orange", {sheen:false});
K.press(g, K.slab(0, 11.5, 102, 4, 2, {lump:0.3, seed:6}), "grey", {sheen:false, depth:0.9, soft:1.4});
for (const w of [TAXI.wheelL, TAXI.wheelR]){
clip(g, body, () => K.inner(g, K.ellipse(w[0], w[1] - 1, w[2] + 2.2, w[2] + 1.6), "rgba(70,10,20,0.75)", 2.2, -0.4, -0.8));
const wp = K.ball(w[0], w[1], w[2], w[2], {lump:0.25, seed:w[0] + 50});
K.blob(g, wp, "black", {depth:1.8, soft:2.6, sheen:{x:w[0] - 3, y:w[1] - 4, rx:2.4, ry:1.4}});
K.press(g, K.ball(w[0], w[1], 4, 4, {lump:0.1}), "grey", {sheen:false, texture:0});
K.press(g, K.ball(w[0], w[1], 1.4, 1.4, {lump:0.05}), "white", {sheen:false, texture:0, rim:0});
}
} },
{ id: "mahjong", en: "Mahjong night", zh: "麻雀", kind: "risky",
note: "small gambles add up: three slick tiles stacked off-centre, wobbly and slides about",
make(x, y){ const S = CLAY.shape; return S.body(MJ.map(t => R(S, x, y, t)), "plastic", {density:0.0018, friction:0.35, frictionStatic:0.5, restitution:0.08}); },
draw(g){ const K = CLAY;
MJ.forEach(([cx, cy, w, h, r], i) => {
K.blob(g, K.slab(cx, cy, w, h, r, {lump:0.4, seed:61 + i}), TILE_BACK, {sheen:false, depth:2, soft:3});
const face = K.slab(cx - 1.6, cy - 2.4, w - 4.4, h - 5.2, r - 1, {lump:0.35, seed:71 + i});
K.blob(g, face, TILE, {sheen:{x:cx - 14, y:cy - 7, rx:8, ry:1.6}, depth:2, soft:3});
const fx = cx - 1.6, fy = cy - 2.4;
if (i === 0){
K.text(g, "中", fx, fy + 0.8, {size:15, font:"zh", color:"red", weight:900, deboss:true});
} else if (i === 1){
[[-13, -3.2, "blue"], [0, 0, "red"], [13, 3.2, "green"]].forEach(([dx, dy, c]) => {
K.press(g, K.ball(fx + dx, fy + dy, 4, 4, {lump:0.1}), c, {sheen:false, texture:0});
K.groove(g, K.circle(fx + dx, fy + dy, 2.2), 0.6, {light:"rgba(255,255,255,0.75)"});
K.press(g, K.ball(fx + dx, fy + dy, 1, 1, {lump:0.02, n:8}), TILE, {sheen:false, texture:0, rim:0}); });
} else {
[-10.5, -3.5, 3.5, 10.5].forEach((dx, k) => {
const st = K.rrc(fx + dx, fy, 3.4, 13, 1.6);
K.press(g, st, k === 1 ? "red" : "green", {sheen:false, texture:0, depth:0.7, soft:1});
K.groove(g, line([[fx + dx - 1.5, fy], [fx + dx + 1.5, fy]]), 0.6, {light:"rgba(255,255,255,0.7)"}); });
}
});
} }
]);
})();
(function (root) {
"use strict";
const STAGES = [
{at:0, en:"University", zh:"大學"},
{at:4, en:"First Job", zh:"第一份工"},
{at:10, en:"Family", zh:"成家"},
{at:15, en:"Retirement", zh:"退休"}
];
const TRAPS = {
spend: {en:"Overspending", zh:"過度消費", d:"Credit cards & buy‑now‑pay‑later 信用卡、先買後付",
eff:"A heavy debt ball and chain crashes onto your tower, followed by awkward shapes, the first one giant (lifestyle inflation). 一個好重嘅債務鐵球會跌落你座塔度，跟住嚟嘅都係奇形怪狀嘅嘢，第一件仲會變到巨型（生活膨脹）。",
hit:["A debt ball is coming · a giant item, then awkward shapes · savings boost −0.2", "債務鐵球跌緊落嚟·一件巨型，跟住奇形怪狀·儲蓄加成−0.2"]},
scam: {en:"Scams", zh:"騙局", d:"Fake tips, “renting” your account 貼士股、租戶口",
eff:"You lose HK$5,000. Slippery, bouncy scam items come next, Hold is locked, and you can't see what's coming. 會被呃走HK$5,000，之後跌落嚟嘅騙局物件又滑又彈，暫存會鎖住，下一件係咩都睇唔清。",
hit:["{loss} · slippery, bouncy items next · Hold locked · Next is hidden", "{loss}·跟住啲嘢又滑又彈·暫存鎖住·下一件睇唔清"]},
delay: {en:"Putting off saving", zh:"拖延儲錢", d:"“I'll start next year” 「明年先儲」",
eff:"Time speeds up for 20 s, the next 2 items can't be turned, and your savings boost drops back to ×1.0. 時間加速20秒，之後2件轉唔到，儲蓄加成跌返去×1.0。",
hit:["Time speeds up for 20 s · next 2 items can't be turned · savings boost back to ×1.0", "時間加速20秒·之後2件轉唔到·儲蓄加成跌返去×1.0"]}
};
const LATER_NONE = [
["{name} kept saying “I'll decide tomorrow.” Tomorrow came and went, and the choice got made for {him}.", "{name}成日話「聽日先諗」，拖下拖下，最後冇得揀。"],
["{name} left it on read. A month later the deadline had passed, and the decision had quietly made itself.", "{name}已讀不回。一個月後期限過咗，件事自己有咗結果。"],
["{name} said “let me think about it”, and thought for so long that the chance walked off without {him}.", "{name}話「等我諗諗先」，一諗就諗到機會自己行咗。"]
];
const ENDINGS = [
{good: ["{name}{nick} left uni with zero debt and HK$20,000 saved. The rest of the story is unwritten, but it's off to a flying start.", "{nick}{name}畢業冇欠一蚊，仲儲咗兩萬。之後嘅故事未寫，但起步已經贏咗。"],
mixed: ["{name}{nick} graduated with a degree, a few regrets and one credit card {he} swore never to use again. Next stop: the first payslip.", "{nick}{name}畢咗業，有張沙紙、幾單後悔事，同一張發誓唔再碌嘅卡。下一站：第一份糧。"],
rough: ["{name}{nick} graduated owing more than {his} first year's pay. The bank sent a new card; Mum sent a very long voice message.", "{nick}{name}畢業時欠嘅錢多過第一年人工。銀行寄多張卡嚟，阿媽就傳咗段好長嘅語音。"]},
{good: ["{name}{nick} saved the first 20% of every payslip. By 30, {he} had six months' costs in the bank, and the nerve to say no to a bad boss.", "{nick}{name}每份糧先儲兩成。三十歲已經有半年使費傍身，老細再無理都夠膽講唔做。"],
mixed: ["{name}{nick} worked hard, spent a little freely, and learned most lessons the second time. The payslips kept coming, and so did the bills.", "{nick}{name}做得勤力，使得有啲鬆手，好多嘢都係第二次先學識。糧照出，單照嚟。"],
rough: ["{name}{nick} turned 30 with a fine job title and a terrible credit report. Every payday, the money left faster than the MTR doors shut.", "{nick}{name}三十歲，職銜好聽，信貸報告難睇。每次出糧，啲錢走得仲快過港鐵關門。"]},
{good: ["{name}{nick} raised a family on a budget that actually added up. The school fees were paid on time, and {name} slept well every night.", "{nick}{name}養起頭家，盤數計得掂。仔女學費準時交，自己晚晚瞓得好。"],
mixed: ["{name}{nick} kept the family afloat: some years tight, some years fine, and one summer holiday still being paid off in instalments.", "{nick}{name}頭家撐得住：有啲年緊，有啲年鬆，仲有一次暑假旅行到而家仲分緊期。"],
rough: ["{name}{nick} juggled a mortgage, school fees and three cards' minimum payments. The family photo on the fridge smiled more than {name} did.", "{nick}{name}一邊供樓、一邊交學費，仲要還三張卡嘅最低還款額。雪櫃上面張全家福，笑得多過佢本人。"]},
{good: ["{name}{nick} retired debt-free, with MPF and savings that last. Mornings now mean dim sum with the grandkids, and {name} always grabs the bill.", "{nick}{name}無債一身輕咁退休，強積金加儲蓄夠晒用。而家朝朝飲茶湊孫，仲搶住埋單。"],
mixed: ["{name}{nick} made it to retirement with just about enough. {He} reads every MPF statement twice, and tells the grandkids why.", "{nick}{name}捱到退休，錢啱啱好夠。每份強積金結單佢都睇兩次，仲會同啲孫講點解。"],
rough: ["{name}{nick} reached retirement age, then went back to part-time work. {His} advice to the grandkids: start saving before it feels necessary.", "{nick}{name}到咗退休年紀，又返去做兼職。佢成日同啲孫講：未覺得要儲，就要開始儲。"]}
];
const CARDS = [
{id:"newphone", st:0, thumb:{w:"piggybank", r:"smartphone"}, tag:["New phone model","新款手機"], en:"Your phone still works, but the new model just launched.", zh:"部手機仲用得，但新款啱啱出咗。",
w:["Keep it, save HK$300 a month","繼續用，每個月儲HK$300"], r:["Buy it today with buy‑now‑pay‑later","先買後付，今日換新機"], trap:"spend",
tip:["Buy‑now‑pay‑later plans stack up fast, and a missed payment can land on your credit report.","「先買後付」好易一單疊一單，遲還一期都可能影響信貸紀錄。"],
later:{w:["A year on, {name}'s old phone still made calls fine and HK$3,600 sat in the bank. The new model? Already the old model.", "一年後，{name}部舊機照打得電話，戶口多咗HK$3,600。嗰部新款？已經變咗舊款。"], r:["By Christmas {name} owed on four pay-later plans, one late payment had hit {his} credit report, and the new screen had cracked.", "到聖誕，{name}有四單先買後付要還，遲咗一期仲上咗信貸紀錄，新機塊mon又爆埋。"]}},
{id:"cards", st:0, thumb:{w:"calculator", r:"handbag"}, tag:["Credit card sign-up gifts","開卡送禮"], en:"A campus booth gives a free gift for every credit card you sign up for.", zh:"校園有個攤位話，每開一張信用卡就送份禮物。",
w:["Get one card and autopay the full balance","只開一張，設定自動找清卡數"], r:["Sign up for three and pay the minimum","一次開三張，每月只還最低還款額"], trap:"spend",
tip:["Card interest often runs above 30% a year. Paying only the minimum lets a small balance drag on for years.","信用卡實際年利率好多時超過30%。淨係還最低還款額，細數都可以拖成幾年。"],
later:{w:["Four years on, {name} had paid HK$0 in card interest and the bank kept raising {his} limit. The free suitcase made it to Japan.", "四年後，{name}一蚊卡息都未俾過，銀行仲不停加佢信用額。送嘅行李喼都去過日本喇。"], r:["Two years on, {name} was still paying three minimums. The interest had passed HK$2,000. The three free gifts? Umbrellas.", "兩年後，{name}三張卡仲淨還最低還款額，利息過咗HK$2,000。送嘅禮物？三把遮。"]}},
{id:"mule", st:0, thumb:{w:"passbook", r:"freegift"}, tag:["“Rent” your bank account","租戶口"], en:"A stranger on Instagram offers HK$3,000 to “rent” your bank account.", zh:"IG有個陌生人出HK$3,000，想「租」你個銀行戶口。",
w:["Refuse and report to\u00a018222","拒絕並打18222舉報"], r:["Easy money. Rent it out today","咁易賺，借戶口畀佢"], trap:"scam",
tip:["Lending your account makes you a money mule. Money laundering in Hong Kong carries up to 14 years in prison.","借出戶口即係做「傀儡戶口」，洗黑錢最高可判監14年。"],
later:{w:["Weeks later, police busted the Instagram ring. {name}'s account stayed clean and boring, exactly as a bank account should.", "幾星期後，警方搗破成個IG集團。{name}個戶口照舊乾乾淨淨，悶得好安全。"], r:["Two weeks later {name}'s account was frozen and police were at hall. Laundering: up to 14 years. The HK$3,000? Spent.", "兩星期後，{name}個戶口被凍結，警察上埋宿舍。洗黑錢最高監14年，嗰HK$3,000早使晒。"]}},
{id:"tutor", st:0, thumb:{w:"piggybank", r:"bubbletea"}, tag:["Tutoring income","補習收入"], en:"You earn HK$4,000 from part-time tutoring.", zh:"做補習賺到HK$4,000。",
w:["Save 20% first, then spend the rest","先儲起20%，剩低先用"], r:["Spend now, save whatever is left later","照用先，剩幾多先儲幾多"], trap:"delay",
tip:["Pay yourself first. Money saved on payday is money you can't spend by accident.","先儲後使：一收錢就儲起，就唔會唔覺意洗晒。"],
later:{w:["Twelve months on, {name}'s tutoring had quietly stacked up HK$9,600. {He} never once missed the HK$800 a month.", "十二個月後，{name}啲補習錢靜靜儲埋HK$9,600。每月少咗HK$800，佢完全冇感覺。"], r:["Month after month {name} saved the leftovers: HK$0, HK$35, HK$0. By summer the “later” fund held one milk tea.", "月月有剩先儲：HK$0、HK$35、HK$0。到暑假，{name}個「遲啲儲」基金得返杯奶茶。"]}},
{id:"salary", st:1, thumb:{w:"passbook", r:"smartphone"}, tag:["First salary","第一份人工"], en:"First salary: HK$18,000.", zh:"第一份人工：HK$18,000。",
w:["Auto-save 20% every payday","出糧自動儲起兩成人工"], r:["Buy the latest phone on instalments","用分期買最新款手機"], trap:"spend",
tip:["Automating savings on payday is the easiest habit to keep. HK$3,600 a month is HK$43,200 a year.","出糧自動轉賬儲錢，最易堅持。每個月HK$3,600，一年就有HK$43,200。"],
later:{w:["On {his} first work anniversary, {name} opened the banking app to HK$43,200 {he} had never once had to think about.", "返工一週年，{name}打開銀行app：HK$43,200，全部自動儲埋，佢一次都唔使諗過。"], r:["Twelve paydays later, {name} still owed a year of phone instalments, had HK$0 saved, and was charging lunches to the card.", "出糧一年，{name}部機仲有十二期未供完，儲蓄係零，連茶記午餐都開始碌卡。"]}},
{id:"crypto", st:1, thumb:{w:"calculator", r:"cryptocoin"}, tag:["“Guaranteed” crypto returns","炒幣「保證」回報"], en:"A coworker's group chat promises a “guaranteed” 30% a month on crypto.", zh:"同事個群組話炒幣「保證」每月賺30%。",
w:["Check the SFC alert list and walk away","上證監會警示名單查吓，唔好理佢"], r:["Put in HK$10,000 before it's too late","即刻入HK$10,000，遲咗就冇份"], trap:"scam",
tip:["Nobody can guarantee high returns. The SFC keeps a Suspicious Investment Products Alert List you can search.","冇人可以保證高回報。證監會有「可疑投資產品警示名單」，隨時可以上網查。"],
later:{w:["One SFC alert-list check, and {name} walked. By spring the chat was silent, and {he} bought the coworkers consolation milk tea.", "上證監會名單查兩分鐘就夠。到春天群組靜晒，{name}請同事飲奶茶壓驚。"], r:["Week one, the app showed +30%. Week three, it vanished with {name}'s HK$10,000. The police report took longer than the deposit.", "第一個星期賺30%，第三個星期app連{name}嗰HK$10,000一齊消失。報案仲耐過入錢。"]}},
{id:"mpf", st:1, tag:["MPF fund choice","揀強積金基金"], en:"Your MPF account is open and the fund choice is up to you.", zh:"強積金戶口開咗，揀咩基金由你話事。",
w:["Compare MPF funds and fees now","而家比較基金同收費"], r:["Leave the default, check at 40","由佢預設，40歲先算"], trap:"delay",
tip:["You and your employer each put in 5% of your salary. Fees and fund choice compound over 40 years.","你同僱主每月各供人工嘅5%。收費高低同揀邊隻基金，影響會累積40年。"],
later:{w:["Ten minutes on the MPFA platform, one low-fee fund. At 65, {name}'s statement showed those minutes had grown to six figures.", "十分鐘，喺積金局平台揀隻低收費基金。65歲{name}睇結單，嗰十分鐘值成六位數。"], r:["At 40, {name} finally opened a drawer of MPF statements: 18 years of fees and fund choices compounding, never once compared.", "40歲，{name}終於拆開成櫃桶強積金結單：18年收費同基金表現一路滾，一次都冇比較過。"]}},
{id:"trip", st:1, thumb:{w:"piggybank", r:"camera"}, tag:["Japan trip","去日本旅行"], en:"Friends are planning a HK$15,000 trip to Japan next month.", zh:"朋友約你下個月去日本，要HK$15,000。",
w:["Save up first, go in six months","儲夠錢，半年後再去"], r:["Put the whole trip on your card","成程旅行碌卡先算"], trap:"spend",
tip:["A trip carried on a card at 30%+ interest can end up costing more than the flight and hotel.","碌卡旅行再慢慢還，利息隨時貴過機票酒店。"],
later:{w:["Six months on, {name} hit Japan's cherry blossoms, fully paid. The winter crowd were still paying off their cards.", "半年後，{name}趕上櫻花季去日本，錢早已儲好。冬天去嗰班朋友，仲喺度還緊卡數。"], r:["The ramen was great. Eight months later {name} was still paying minimums on it, and the interest had outgrown the hotel bill.", "拉麵好好食。八個月後，{name}仲還緊最低還款額，利息已經貴過間酒店。"]}},
{id:"wedding", st:2, thumb:{w:"piggybank", r:"highheel"}, tag:["Wedding banquet","擺酒結婚"], en:"You're planning your wedding banquet.", zh:"準備擺酒結婚。",
w:["Keep it within what you've saved","量力而為，唔好超出儲蓄"], r:["Take a personal loan for 30 tables","借私人貸款擺30圍"], trap:"spend",
tip:["Borrowing for one big day can mean years of repayments while you start a family.","借錢擺酒，一日風光可能要還好多年。"],
later:{w:["Twelve tables, zero loans. A year later {name} spent the banquet's red-packet money on a pram, not on a repayment.", "擺十二圍，一蚊都冇借。一年後，{name}將人情錢買咗架BB車，唔使拎去還債。"], r:["Thirty tables, one night. Five years later {name} was still repaying the loan, and couldn't name half the guests.", "三十圍，風光一晚。五年後{name}仲供緊嗰筆貸款，啲賓客佢一半都叫唔出名。"]}},
{id:"buffer", st:2, thumb:{w:"ricesack"}, tag:["Emergency fund","應急錢"], en:"Your household has no emergency fund yet.", zh:"屋企仲未有應急錢。",
w:["Save 3 to 6 months' costs","儲三至六個月生活費"], r:["Start next year when pay rises","等明年加人工先儲"], trap:"delay",
tip:["An emergency fund turns a job loss or a medical bill into a setback instead of a debt spiral.","有應急錢，就算失業或者要睇醫生，都唔使借錢度日。"],
later:{w:["Year two brought layoffs. {name}'s emergency fund paid five months' rent, and {he} job-hunted without borrowing a cent.", "第二年公司裁員，{name}嗰筆應急錢夠交五個月租，搵工期間一蚊都冇借過。"], r:["“Next year” brought a layoff and a dead water heater in one month. {name}'s emergency fund was a credit card at 30%.", "明年一到，{name}同一個月被裁員、熱水爐又壞。原來佢嘅應急錢，係張年息三成嘅信用卡。"]}},
{id:"call", st:2, thumb:{w:"passbook", r:"phishhook"}, tag:["Fake police call","假公安來電"], en:"A caller claims to be mainland police: your ID is linked to a crime, so move your money to a “safe account”.", zh:"有人自稱內地公安，話你嘅身份證涉及刑事案，要將錢轉去「安全戶口」。",
w:["Hang up and ring\u00a018222 now","收線，打18222查證"], r:["Transfer the money to clear it","即刻轉錢證明清白"], trap:"scam",
tip:["Real police never ask you to transfer money. Hang up and check with the Anti-Scam Helpline 18222.","真警察唔會叫你轉錢。收線後可以打防騙易熱線18222查詢。"],
later:{w:["{name} hung up and rang 18222, where the officer had heard that script four times that day. The family chat was warned by dinner.", "{name}收線打18222，職員話嗰套對白今日已經聽咗四次。晚飯前，家庭群組已收到警告。"], r:["Within the hour the “safe account” was empty. Next day {name} gave statements to police and the bank; the money was gone.", "一個鐘內「安全戶口」已被提清。{name}第二朝去警署落口供、再去銀行，錢已經冇咗。"]}},
{id:"insure", st:2, tag:["Baby on the way: insurance","BB出世前買保險"], en:"A baby is on the way.", zh:"BB就快出世。",
w:["Get basic medical and term life cover","買基本醫療同定期人壽保險"], r:["Skip insurance. Nothing will happen","唔買保險，唔會咁大鑊嘅"], trap:"delay",
tip:["Basic cover is cheapest when you're young and healthy. Waiting raises the price and the risk.","後生又健康嗰陣買基本保障最平，拖得越耐，保費越貴、風險越大。"],
later:{w:["When the baby spent a week in hospital, {name}'s medical policy paid most of it. Bought young, the premium was still cheap.", "BB入院一個星期，{name}份醫療保險包咗大部分。後生健康時買，保費到今日都仲好平。"], r:["A check-up at 35 flagged a small problem. When {name} finally applied, the premium was higher and that problem excluded.", "35歲身體檢查發現小毛病。{name}終於去買保險，保費貴咗，嗰個病仲唔包。"]}},
{id:"lump", st:3, thumb:{w:"passbook", r:"hottip"}, tag:["MPF withdrawal at 65","65歲攞強積金"], en:"You can withdraw your MPF at 65.", zh:"65歲可以攞返強積金。",
w:["Keep it invested, draw a bit yearly","繼續投資，每年攞少少"], r:["Put it all in a chat group's hot tip","全數買群組貼士股"], trap:"scam",
tip:["Retirees are prime targets for “hot tip” groups. Withdrawing in stages also spreads your risk.","退休人士係貼士群組騙徒嘅頭號目標。分開幾次攞，亦可以分散風險。"],
later:{w:["At 75, {name}'s MPF was still invested, paying out a little a year. The hot-tip WhatsApp group had renamed itself four times.", "75歲，{name}啲強積金仲投資緊，每年攞少少。嗰個貼士群組已經改咗四次名。"], r:["Day three: the tip stock had doubled. Day ten: the admins had vanished, the stock was down 90%, and so was {name}'s MPF.", "第三日，貼士股升咗一倍；第十日，群主消失，股價插九成，{name}四十年強積金冇晒。"]}},
{id:"romance", st:3, thumb:{w:"steamer", r:"freegift"}, tag:["Online friend asks for money","網友借錢"], en:"An online friend you've never met urgently needs HK$50,000.", zh:"網上識咗個朋友，未見過面，佢急住要HK$50,000。",
w:["Say no and talk it over with family","拒絕，同屋企人傾吓先"], r:["Send it. They seem so sincere","佢咁有誠意，過數畀佢"], trap:"scam",
tip:["Romance scams build trust for months before asking for money. Never pay someone you haven't met.","網上情緣騙案會花幾個月建立信任先開口借錢。未見過面就唔好過數。"],
later:{w:["Over dim sum, {name}'s granddaughter reverse-searched the friend's photo: a model from an ad. {name} ordered more siu mai.", "飲茶時，孫女幫{name}搜吓張相：網友原來係廣告模特兒。HK$50,000保住，加多籠燒賣！"], r:["After three weeks of sweet messages came a plea for HK$80,000 more. {name} called the police; the HK$50,000 was gone.", "三星期甜言蜜語之後，對方再要HK$80,000。{name}報咗警，嗰HK$50,000冇返嚟。"]}},
{id:"reno", st:3, thumb:{w:"calculator"}, tag:["Flat renovation","大裝修"], en:"The flat needs a full renovation.", zh:"層樓要大裝修。",
w:["Pay cash, renovate in phases","用儲蓄，分階段慢慢裝"], r:["Renovate the whole flat on card","一次過全屋碌卡分期"], trap:"spend",
tip:["On a fixed retirement income, new debt is much harder to clear.","退休後收入有限，再借錢就好難還得清。"],
later:{w:["Kitchen this year, bathroom the next. By 70, {name}'s flat looked brand new and {his} savings were still there.", "今年裝廚房，明年整廁所。到70歲，{name}層樓煥然一新，啲錢都仲喺度。"], r:["Come Lunar New Year the flat sparkled. Come summer, {name}'s retirement income couldn't keep up with the instalments and interest.", "新年前裝修搞掂，靚到發光。到夏天，{name}嘅退休收入追唔上分期，卡數利息越滾越大。"]}},
{id:"will", st:3, tag:["Will and retirement budget","遺囑同退休預算"], en:"Your kids ask about your plans for later life.", zh:"仔女問你晚年有咩打算。",
w:["Draft your will and budget now","趁早立遺囑同做預算"], r:["Put it off and deal with it later","第日先慢慢再算"], trap:"delay",
tip:["A will and a budget protect your family from guesswork and disputes later.","立好遺囑、做好預算，屋企人第日就唔使估估吓，都少啲爭拗。"],
later:{w:["On {name}'s 80th birthday the kids got the will, the budget, and a note: “Don't fight over the mahjong table.” Nobody ever did.", "八十大壽，{name}將遺囑、預算同一張字條交畀仔女：「麻雀枱唔准爭。」結果真係冇人爭。"], r:["Still saying “someday” at 82, {name} had no budget on paper, so the kids argued over who would pay for {his} care.", "82歲，{name}仲係講「第日先算」。冇預算可依，仔女為咗邊個畀護理費嗌到拆天。"]}}
];
const QUIZ = [
{id:"fakeapp", was:{id:"mule", pick:[0, 1, 2], q:"Someone offers HK$3,000 to “rent” your bank account. This is…", o:["Easy side income", "Money laundering. You could go to prison", "Fine if it's a friend"]},
q:["An Instagram “mentor” shows you an app where your HK$5,000 has grown to HK$20,000 in a month. To withdraw, you must first pay a 15% “tax”. What now?","有個IG「導師」話你喺佢個App投資嘅HK$5,000，一個月變咗HK$20,000，但要提款就要先交15%「稅」。點做？"],
o:[["Pay the 15% tax first; you still clear a profit","先交15%稅，扣完都仲係大賺"],["Pay nothing; report it and check the SFC list","唔交錢，上證監會名冊查清楚"],["Ask them to deduct that fee from your gain","叫佢直接喺賺到嘅利潤度扣稅"]], a:1,
why:["A classic investment scam: the “profit” is just numbers on a fake app, and every fee is one more loss. Check any platform on the SFC's public register; the police Anti-Scam Helpline is 18222.","典型投資騙案：所謂「利潤」只係假App上面嘅數字，每畀一次「費用」就蝕多一次。投資平台要先喺證監會公眾紀錄冊查清楚；警方防騙熱線係18222。"]},
{id:"flatrate", was:{id:"minpay", pick:[1, 0, 2], q:"If you only pay the minimum on your credit card…", o:["Interest keeps growing on the rest", "You pay no interest", "Your credit score improves"]},
q:["A phone plan: “HK$12,000 over 12 months, only 10% flat rate” (HK$1,100 a month). The real yearly rate (APR) is about…","手機分期：「HK$12,000分12期，平息只係10%」（每月HK$1,100）。實際年利率大約係…"],
o:[["10% a year, just as the ad states","每年10%，同廣告講一樣"],["Around 18% a year in real terms","呢個計劃實際大約18%"],["About 5% as you repay monthly","每月還少咗，大約5%"]], a:1,
why:["A flat rate charges interest on the full HK$12,000 all year, though you pay it down every month. On what you actually owe, that's about 18% a year. Lenders must also quote the APR: compare that, not the flat rate.","平息成年都用成筆HK$12,000計息，但其實你每月都還緊本金。按實際欠款計，年利率大約18%。貸款要列明實際年利率，比較要睇呢個，唔好睇平息。"]},
{id:"ming", was:{id:"early", pick:[1, 2, 0], q:"The best time to start saving is…", o:["After your first promotion", "When MPF starts", "Now, even a small amount"]},
q:["Ming saves HK$2,000 a month from 22 to 32, then stops (HK$240,000 in). Kit saves HK$2,000 a month from 32 to 62 (HK$720,000 in). Both earn 7% a year. At 62, who has more?","阿明22至32歲每月儲HK$2,000，之後停手（共放入HK$240,000）；阿傑32至62歲每月儲HK$2,000（共放入HK$720,000）。兩個都有7%年回報，62歲邊個多啲？"],
o:[["Ming ends up with more","阿明最後會多啲"],["Kit ends up with more","阿傑最後會多啲"],["Both end up about equal","兩個最後差唔多"]], a:0,
why:["Ming's money had 30 more years to compound: about HK$2.8 million at 62, against Kit's HK$2.4 million. Time beats amount, so start early.","阿明啲錢多咗30年複息滾存：62歲時大約有HK$280萬，阿傑就大約HK$240萬。時間贏過本金，越早開始越好。"]}
];
const HABITS = [
{id:"buffer", was:"save20", en:"Auto-transfer on payday until I have 6 months' expenses saved", zh:"出糧自動轉賬，儲夠6個月開支做緊急錢"},
{id:"apr", was:"payfull", en:"Pay my card in full, and check the APR before any instalment plan", zh:"每月找清卡數，分期前先睇實際年利率"},
{id:"sfc", was:"check", en:"Check the SFC register before I invest, and never lend my account", zh:"投資前先查證監會紀錄冊，唔借戶口"},
{id:"budget", was:"track", en:"Track every dollar for 30 days, then set a budget I can keep", zh:"記賬30日，再定個做得到嘅預算"}
];
const QUIZ_WAS = Object.assign(Object.create(null), Object.fromEntries(QUIZ.filter(q => q.was).map(q => [q.was.id, q])));
const HABIT_WAS = Object.assign(Object.create(null), Object.fromEntries(HABITS.filter(h => h.was).map(h => [h.was, h.id])));
function answerNow(a){
if (!a || typeof a.q !== "string") return null;
const cur = QUIZ.find(q => q.id === a.q);
if (cur) return {q: cur.id, pick: a.pick, ok: a.pick === cur.a ? 1 : 0, earlier: false};
const nq = Object.hasOwn(QUIZ_WAS, a.q) ? QUIZ_WAS[a.q] : null;
if (!nq || !Number.isInteger(a.pick) || nq.was.pick[a.pick] == null) return null;
const pick = nq.was.pick[a.pick];
return {q: nq.id, pick, ok: pick === nq.a ? 1 : 0, earlier: true};
}
const habitNow = id => typeof id === "string" && HABITS.some(h => h.id === id) ? id : (typeof id === "string" && Object.hasOwn(HABIT_WAS, id) ? HABIT_WAS[id] : null);
const QUIPS = {
start: [["Let's build your future!", "一齊疊出你嘅未來！"], ["Flat things at the bottom. Trust me.", "扁嘅放最底，信我！"], ["Three minutes. No pressure!", "得三分鐘，唔使驚！"], ["Pack it tighter than the MTR at rush hour!", "疊到好似繁忙時間嘅港鐵咁實！"]],
startPb: [["Your best is {n}. Beat it!", "你最高分係{n}，今次破紀錄！"]],
netCatch: [["Caught! That's what insurance is for.", "接住咗！保險就係用喺呢度。"], ["Saved by the net. Back to you!", "張網救返你，再嚟過！"]],
chalBeat: [["You just beat {n}! Keep going for more.", "你已經贏咗{n}！再疊高啲！"], ["{n} is behind you now. Make it a big win!", "{n}已經追唔上你，贏多啲！"]],
chalBeatAnon: [["You just beat your friend's score! Keep going.", "你已經贏咗你朋友！再疊高啲！"]],
jackpot: [["My cousin brought a windfall! Save it!", "我表哥帶住橫財嚟！記得儲起佢！"], ["Lucky! Bank it while it lasts.", "好運到！趁住有，快啲儲！"],
["Money from the sky! Bank it, don't blow it.", "天降橫財！存起佢，唔好洗晒！"]],
frenzyEnd: [["That was {n} of luck. Bank it!", "幸運咗{n}，記得存起佢！"], ["Luck runs out. Steady saving doesn't.", "好運會完，穩定儲蓄先係王道。"]],
steady: [["Nice and steady!", "穩陣！"], ["Look at that stack!", "疊得好靚喎！"], ["Growing like compound interest!", "好似利疊利咁越疊越高！"]],
floor: [["Higher and higher!", "越疊越高！"], ["Up we go!", "再上一層！"], ["The view's getting better!", "風景越嚟越靚！"], ["Higher than a Mid-Levels walk-up!", "高過半山嘅唐樓！"], ["Harbour view, no extra rent!", "無敵海景，唔使加租！"]],
stage1: [["First job! Save before you spend.", "第一份工！先儲後使！"], ["First pay! Don't blow it all at the 茶餐廳.", "出糧喇！唔好全部使喺茶餐廳！"]],
stage2: [["Family time! Bills get bigger.", "成家喇！使費都大咗！"], ["Family! Even a 500-square-foot flat costs a lot.", "成家喇！五百呎都唔平㗎！"]],
stage3: [["Retirement! You made it!", "退休喇！終於捱到！"], ["Retired! Dim sum every morning.", "退休喇！朝朝飲茶！"]],
drop: [["Splash! Money down the drain.", "撲通！啲錢落咗海！"], ["The fish say thanks!", "啲魚多謝你！"], ["Gravity wins that round.", "地心吸力贏咗呢鋪。"], ["Splash! Even Victoria Harbour wants a cut.", "撲通！連維港都要分一份！"]],
lastDrop: [["Careful! One more and it's over.", "小心！再跌一件就玩完！"]],
wise: [["Smart move!", "醒目！"], ["Future you says thanks!", "將來嘅你會多謝你！"], ["That's how savings grow.", "錢就係咁儲返嚟。"], ["Every dollar counts, like a jar of 散紙.", "一蚊都係錢，好似儲散紙咁！"]],
wise3: [["Three wise picks in a row!", "連續三次揀得醒！"]],
boost: [["Savings boost maxed: ×2!", "儲蓄加成爆燈：×2！"]],
spend: [["Ka-ching! Here comes the debt.", "使咗錢，債就嚟喇！"], ["Buy now, cry later.", "先買後喊！"], ["That's a lot of milk tea.", "嗰度係好多杯奶茶嚟㗎！"]],
scam: [["Too good to be true? It was.", "好到唔似真？真係假㗎！"], ["Scammed! Never lend your account.", "中伏！戶口唔好借人！"], ["Unsure? Call the 18222 anti-scam line.", "唔肯定？打18222防騙易熱線！"]],
delay: [["Later never comes.", "遲啲即係唔做。"], ["Tick tock… time flies!", "滴答滴答…時間過得好快！"]],
shockOk: [["Phew! Emergency fund to the rescue.", "好彩有應急錢！"]],
shockBad: [["No safety net! Hold on!", "冇應急錢，頂住呀！"], ["Wobble wobble!", "震呀震！"]],
noFund: [["No emergency fund… feeling lucky?", "冇應急錢…靠好彩？"]],
rich: [["{n}! A tower of money!", "{n}！錢都疊成塔！"]],
pb: [["New personal best!", "刷新個人紀錄！"]],
poor: [["Living on instant noodles?", "要餐餐食公仔麵呀？"], ["Two-dish rice box again?", "又係兩餸飯？"]],
clean: [["Not one drop yet. Steady hands!", "一件都未跌，手好穩！"]],
hurry: [["Final push! Stack it high!", "衝呀！疊高佢！"]],
overDrops: [["Game over… the harbour's richer.", "玩完…個海仲有錢過你。"]],
over0: [["Time! Still at uni… go again?", "夠鐘！仲喺大學…再嚟？"]],
over1: [["Time! A solid first job.", "夠鐘！第一份工都唔錯。"]],
over2: [["Time! Family and savings, nice.", "夠鐘！成家又有錢，叻！"]],
over3: [["Retired rich. Legend!", "退休做富翁，神級！"]],
invested: [["Look at that profit… on paper.", "嘩，賺咗好多…不過係紙上富貴。"]],
investDodged: [["Guaranteed returns? No such thing. Smart!", "保證回報？冇呢回事。醒目！"]],
ticketDodged: [["Skipping the lucky draw is the real win.", "唔買刮刮卡，先係真正中獎。"]],
ticketStop: [["Smart: stop chasing the near miss.", "醒目：唔好再追「差少少」。"]],
reviveGiveUp: [["Right. There's no take two.", "啱，人生冇得重來。"]]
};
const TROLLS = {
revive: {
title: ["CONTINUE?", "再嚟過？"],
sub: ["Get your tower back!", "座塔即刻返嚟！"],
yes: ["Revive", "復活"], no: ["Give up", "放棄"],
busy: ["Reviving…", "復活中…"],
fail: ["ERROR: Life has no continue button.", "錯誤：人生冇得重來。"],
lesson: ["No take two in real life.", "人生冇得重來。"],
fact: ["Your real revive: an emergency fund, set up before you fall", "真正嘅「復活」：跌之前準備好應急錢"],
go: ["See my statement", "睇結單"]
},
invest: {
tag: ["Sponsored", "贊助"],
title: ["Guaranteed 30% a month!", "每月保證回報30%！"],
pitch: ["Only 3 places left!", "仲有3個名額！"],
yes: ["Invest HK$3,000", "投資"], no: ["No thanks", "唔使喇"],
chip: ["Portfolio", "投資組合"],
feeTitle: ["Withdraw {n}?", "提走{n}？"],
fee: ["Pay a HK$1,000 fee first.", "要先付HK$1,000手續費。"],
feeYes: ["Pay HK$1,000 fee", "付手續費"], feeNo: ["Walk away", "收手"], feeShort: ["Not enough money for the fee", "唔夠錢俾手續費"],
wait: ["Processing…", "處理中…"],
goneTitle: ["The platform vanished", "個平台消失咗"],
lesson: ["Guaranteed returns, a deadline, a fee to withdraw: it's a scam.", "保證回報、限時、要俾錢先攞到錢：係騙局。"],
fact: ["Check the SFC register · Anti-Scam Helpline 18222", "查證監會名冊 · 防騙易熱線18222"],
ok: ["Got it", "明白"],
dodged: ["Scam dodged", "避開騙局"]
},
ticket: {
tag: ["Lucky draw", "幸運抽獎"],
title: ["HK$1,000,000 top prize!", "頭獎一百萬！"],
pitch: ["Match 3 💰 to win!", "刮出3個💰就中！"],
yes: ["Buy a card · HK$500", "買一張"], no: ["Skip", "唔買"],
scratching: ["Scratching…", "刮緊…"],
close: ["So close!", "差少少！"],
closeSub: ["Next one's surely a winner…", "下張實中…"],
again: ["Buy another · HK$500", "再買一張"], stop: ["Stop", "唔再買"],
shut: ["Booth closed: 5 cards.", "攤位收咗：買咗5張。"],
lessonTitle: ["Always a near miss", "次次都差少少"],
lesson: ["Near misses are designed to keep you buying.", "「差少少」係設計嚟引你繼續買。"],
fact: ["Mark Six jackpot odds: 1 in 13,983,816 · You spent {n}", "六合彩頭獎機會：13,983,816分之一 · 你使咗{n}"],
ok: ["Got it", "明白"],
dodged: ["Kept your HK$500", "慳返HK$500"]
},
report: {
revive: ["Tried to revive", "試過復活", "No take two in life 人生冇得重來"],
gaveUp: ["Didn't try to revive", "冇試復活", "Right: no take two 啱，人生冇得重來"],
investLost: ["'Guaranteed return' scam", "「保證回報」騙局", "Lost {n} 輸咗{n}"],
investDodged: ["'Guaranteed return' offer", "「保證回報」優惠", "Dodged the scam 避開騙局"],
tickets: ["Scratch cards", "刮刮卡", "{k} bought, {n} gone 買咗{k}張，使咗{n}"],
ticketDodged: ["Scratch card", "刮刮卡", "Didn't buy 冇買"]
}
};
const TYPE_AXES = [
{id: "spend", a: ["S", "Saver", "先儲後使"], b: ["Y", "YOLO", "及時行樂"]},
{id: "risk", a: ["G", "Guarded", "防騙醒目"], b: ["D", "Daring", "膽粗粗"]},
{id: "time", a: ["P", "Planner", "未雨綢繆"], b: ["L", "Last-minute", "臨急抱佛腳"]},
{id: "build", a: ["C", "Calm", "沉着冷靜"], b: ["H", "Hasty", "心急"]}
];
const TYPES = {
SGPC: {en: "The Vault", zh: "萬能夾萬", d: ["Saves first, sees through scams, plans ahead and builds calmly. Rock solid.", "先儲後使、識破騙局、早早計劃、冷靜疊塔，穩如泰山。"]},
SGPH: {en: "The Busy Bee", zh: "勤力小蜜蜂", d: ["Saves, plans and dodges scams, just in a hurry. Slow down a little and you're unstoppable.", "識儲錢又識防騙，計劃周詳，就係心急咗啲。慢少少，冇得輸。"]},
SGLC: {en: "The Slow Cooker", zh: "老火湯", d: ["Careful with money and scams, but starts late. Begin sooner and time does the work.", "對錢對騙局都好小心，不過成日遲起步。早啲開始，時間會幫你。"]},
SGLH: {en: "The Deadline Hero", zh: "死線英雄", d: ["Thrifty and sharp, but everything happens at the last second.", "慳家又醒目，但乜都要等到最後一秒先郁。"]},
SDPC: {en: "The Explorer", zh: "探險家", d: ["Saves and plans, but likes a gamble. Check before you leap.", "識儲又識計，但鍾意博一博。跳之前，先查清楚。"]},
SDPH: {en: "The Rocket", zh: "火箭", d: ["Fast, bold and organised. Watch out for anything \u201cguaranteed\u201d.", "快、狠、有計劃。小心任何「保證回報」。"]},
SDLC: {en: "The Lucky Cat", zh: "招財貓", d: ["Saves, but trusts luck a bit too much and starts late.", "有儲錢，但太信運氣，又遲遲未開始。"]},
SDLH: {en: "The Roller Coaster", zh: "過山車", d: ["Saves, then risks it, then rushes. A wild ride: add a plan.", "儲完又去博，博完又趕住疊。旅程刺激，加個計劃啦。"]},
YGPC: {en: "The Happy Planner", zh: "快樂計劃家", d: ["Enjoys life with a plan and never falls for scams. Save first and you're set.", "識享受又有計劃，仲唔會中伏。記住先儲後使就得。"]},
YGPH: {en: "The Speed Shopper", zh: "閃購達人", d: ["Plans and spots scams, but spends and builds fast.", "有計劃又識防騙，不過使錢同疊塔都好快手。"]},
YGLC: {en: "The Chill Spender", zh: "佛系使家", d: ["Relaxed about money and time. At least the scammers can't get you.", "對錢對時間都好佛系，起碼騙徒呃唔到你。"]},
YGLH: {en: "The Last-Minute Shopper", zh: "臨急購物狂", d: ["Spends now, saves \u201clater\u201d, rushes the rest, but scam-proof.", "照使先、遲啲先儲、手忙腳亂，但騙徒奈你唔何。"]},
YDPC: {en: "The High Roller", zh: "豪賭客", d: ["Plans big, bets big, stays cool. Make sure the odds are real.", "計得大、賭得大、夠冷靜。睇清楚個機會係咪真。"]},
YDPH: {en: "The Hype Chaser", zh: "潮流追擊者", d: ["Fast, bold and into the latest thing. Hype fades; savings stay.", "快、大膽、追潮流。潮流會過，儲蓄會留低。"]},
YDLC: {en: "The Dreamer", zh: "發夢家", d: ["Treats now, luck later, saving \u201cnext year\u201d. Wake up and start today!", "今日享受、靠運氣、儲錢等明年。醒醒，今日就開始！"]},
YDLH: {en: "The Firework", zh: "煙花", d: ["Bright, fast and over too soon. Save first next time!", "好靚、好快，但一下就散。下次記住先儲後使！"]}
};
const TITLES = [
{id: "diver", en: "Harbour Diver", zh: "維港潛水員", line: ["Three things in the harbour. The fish say thanks.", "三件嘢跌落海，啲魚多謝你。"]},
{id: "scamvip", en: "Scammers' VIP", zh: "騙徒VIP", line: ["The scammers have you on speed dial.", "騙徒已經將你加咗做VIP會員。"]},
{id: "believer",en: "“Guaranteed” Believer", zh: "保證回報信徒", line: ["Guaranteed returns? Guaranteed lesson.", "保證回報？保證上堂。"]},
{id: "future", en: "Spending Tomorrow's Money", zh: "先使未來錢", line: ["Next month's pay? Already spent.", "下個月人工？早就使咗。"]},
{id: "tomorrow",en: "Tomorrow, Tomorrow", zh: "明日復明日", line: ["You'll start saving tomorrow. Probably.", "儲錢？聽日先啦…應該。"]},
{id: "scratch", en: "Scratch Card Regular", zh: "刮刮卡熟客", line: ["The shop knows your name now.", "便利店職員已經認得你。"]},
{id: "zero", en: "Trap-Proof Legend", zh: "零中伏神人", line: ["Zero traps. Are you even human?", "一次都冇中伏，你係咪人嚟㗎？"]},
{id: "retire", en: "Early Retiree in Training", zh: "財務自由預備役", line: ["Retired in 3 minutes. Your future self owes you dinner.", "3分鐘就退休，將來嘅你要請你食飯。"]},
{id: "lucky", en: "Windfall Magnet", zh: "橫財就手", line: ["The jackpot crab picked you. Don't count on it twice.", "大獎蟹揀咗你，唔好以為次次都有。"]},
{id: "stacker", en: "Stacking God", zh: "疊疊樂之神", line: ["That tower needs its own postcode.", "座塔高到要有自己嘅地址。"]},
{id: "tycoon", en: "Little Tycoon", zh: "小富翁", line: ["Rich enough to split the bill. Just.", "夠錢夾份，啱啱好。"]},
{id: "steady", en: "Slow and Steady", zh: "穩穩陣陣", line: ["Not flashy, but your money stays put.", "唔型，但啲錢唔會走佬。"]},
{id: "moonlight", en: "Broke by Month's End", zh: "月光族", line: ["Pay day in, pay day out. Same day.", "人工一出，即日清袋。"]}
];
const PERSONAS = {
bg: {
sub: {en:"Subdivided-Flat Kid", zh:"劏房", item:"lunchbox", d:["Four to a 100 sq ft room in Sham Shui Po, knows every discount hour, first in the family at uni.", "深水埗百呎劏房四個人住，熟晒超市減價時間，屋企第一個大學生。"]},
estate: {en:"Public-Estate Kid", zh:"公屋", item:"lemontea", d:["Mum expects her share the day you start work, and the whole floor knows your exam results.", "屋邨仔女：一返工阿媽就等家用，成層樓都知你考幾多分。"]},
mid: {en:"Middle-Class Kid", zh:"中產", item:"calculator", d:["Ten tutorial classes a week since P1; your parents' mortgage still has 20 years to go.", "小一開始一星期十堂補習；爸媽層樓仲有廿年先供完。"]},
rich: {en:"Rich Kid", zh:"富二代", item:"handbag", d:["Dad's supplementary card, a family business, and friends who always wait for you to pay.", "老豆張附屬卡、家族生意，仲有班永遠等你埋單嘅朋友。"]},
},
pe: {
grind: {en:"The Grinder", zh:"卷王", item:"textbooks", d:["Three internships, a 4.0 GPA and four hours' sleep a night.", "三份實習、GPA 4.0，每晚瞓四個鐘。"]},
genius: {en:"Lazy Genius", zh:"天才", item:"sunglasses", d:["Aces exams after one all-nighter. Everything else can wait till tomorrow.", "通宵一晚就考A，其他嘢聽日先算。"]},
social: {en:"Social Butterfly", zh:"社交蝴蝶", item:"bubbletea", d:["Hall life, O'Camp and every group chat. Can't say no to hotpot.", "舍堂、O'Camp、每個群組都有份，打邊爐從來唔識拒絕。"]},
gamer: {en:"Gamer", zh:"打機宅", item:"controller", d:["RGB keyboard, three gacha games, ranked till 4am.", "RGB鍵盤、三隻抽卡遊戲，打排位打到朝早四點。"]},
artsy: {en:"Café Hipster", zh:"文青", item:"camera", d:["Film camera, vinyl, café hopping, and a tote bag for every mood.", "菲林相機、黑膠、周圍去咖啡店，每種心情都有個帆布袋。"]},
hustle: {en:"The Hustler", zh:"炒家", item:"sneaker", d:["Resells sneakers, trades crypto between lectures, a startup idea a week.", "炒波鞋、堂與堂之間炒幣，一星期一個創業大計。"]},
},
combos: {
"sub+grind": {en:"The Bunk-Bed Valedictorian", zh:"碌架床狀元", line:["Revises on the top bunk by head-torch. The bunk below would like some sleep.", "瞓碌架床上格開頭燈溫書，下格嘅人想瞓覺㗎。"]},
"sub+genius": {en:"The Folding-Table Prodigy", zh:"摺枱神童", line:["Aced the DSE on a folding table by the rice cooker. Started revising the night before.", "喺電飯煲隔籬張摺枱考到DSE高分，考前一晚先溫。"]},
"sub+social": {en:"The Butterfly With No Living Room", zh:"冇廳蝴蝶", line:["No living room at home, so the whole city is your living room, and you host every night.", "屋企冇廳，成個香港就係你客廳，晚晚做主人家。"]},
"sub+gamer": {en:"The 100-Square-Foot Pro", zh:"百呎電競神", line:["Four people, 100 sq ft, one power socket, and it's always charging your controller.", "四個人百呎一個插蘇，永遠都係叉緊你個手掣。"]},
"sub+artsy": {en:"The Sham Shui Po Bohemian", zh:"深水埗文青", line:["Lived in Sham Shui Po before the cafés came, and now can't afford their lattes.", "未有咖啡店已經住深水埗，而家飲唔起嗰杯拿鐵。"]},
"sub+hustle": {en:"The Bargain-Hour Tycoon", zh:"減價時段大亨", line:["Knows every supermarket's discount hour, and resold your dinner before you ate it.", "熟晒每間超市減價時間，你未食完佢已經轉手賣咗。"]},
"estate+grind": {en:"The Pride of the Floor", zh:"成層樓嘅驕傲", line:["The whole floor knew your DSE results before you did, and they still ask about your GPA.", "成層樓早過你知DSE成績，而家仲日日問你GPA。"]},
"estate+genius": {en:"The Estate Prodigy", zh:"屋邨神童", line:["The whole floor thinks you're a genius. Only Mum knows you started revising at 3am.", "成層樓當你係天才，得阿媽知你凌晨三點先開始溫。"]},
"estate+social": {en:"The Unofficial Estate Mayor", zh:"人肉邨長", line:["Knows every auntie, every dog and every broken lift, and admins all their group chats.", "識晒每個師奶、每隻狗、每部壞咗嘅升降機，仲做埋群組管理員。"]},
"estate+gamer": {en:"The Estate Arcade Legend", zh:"屋邨機舖王", line:["Trained at the estate mall arcade as a kid; still yells “one more round” at 4am.", "細個喺商場機舖練成，凌晨四點仲喊「再嚟一鋪」。"]},
"estate+artsy": {en:"The Instagrammable Resident", zh:"打卡位原住民", line:["Lives in the estate everyone comes to photograph. Sadly, charges no entry fee.", "住喺人人嚟打卡嘅屋邨，可惜冇收入場費。"]},
"estate+hustle": {en:"The Playground Tycoon", zh:"遊樂場大亨", line:["Ran a trading-card empire in the estate playground at nine. Still pitches in the lift.", "九歲已經喺屋邨遊樂場炒卡，而家喺升降機都推銷。"]},
"mid+grind": {en:"Mum's KPI", zh:"阿媽嘅KPI", line:["Ten tutorials a week since P1, a 4.0 now: the family's best asset after the flat.", "由P1補到GPA 4.0，你係屋企除咗層樓之外最值錢嘅資產。"]},
"mid+genius": {en:"The Wasted Tuition", zh:"補習費白交", line:["Your parents paid for ten tutorials a week. You passed with one all-nighter. Refund?", "爸媽一星期畀你補十堂，你一晚通頂就搞掂。可唔可以退錢？"]},
"mid+social": {en:"The Allowance Diplomat", zh:"零用錢外交官", line:["Your allowance is gone by the 10th, but every hall on campus knows your name.", "零用錢10號就清袋，但全校啲宿舍都識你個名。"]},
"mid+gamer": {en:"The Rent-Free Raider", zh:"免租副本王", line:["Ten tutorials a week as a kid; ten ranked games a night now. Same hours, less sleep.", "細個一星期補十堂，大個一晚打十場排位。時數一樣，瞓少咗。"]},
"mid+artsy": {en:"The Grade-8 Bohemian", zh:"八級琴文青", line:["Grade 8 piano for Mum; now you only play vinyl in cafés you can barely afford.", "為阿媽考完八級琴，而家淨係喺貴到肉赤嘅咖啡店聽黑膠。"]},
"mid+hustle": {en:"The Sandwich-Class Tycoon", zh:"夾心階層大亨", line:["Your parents have 20 years of mortgage left. You have 20 pairs to flip by Friday.", "爸媽仲有20年樓要供，你星期五前有20對波鞋要放。"]},
"rich+grind": {en:"The Heir Who Won't Rest", zh:"有錢都要捱", line:["Dad's card in your wallet, yet you sleep four hours to prove you never needed it.", "銀包有阿爸張卡，你仲要日瞓四個鐘證明自己唔靠佢。"]},
"rich+genius": {en:"Born on Easy Mode", zh:"簡單模式出世", line:["Born rich, born smart, and still you haven't opened a single letter from the bank.", "含住金鎖匙又聰明絕頂，但銀行信你一封都未拆過。"]},
"rich+social": {en:"The Bill Magnet", zh:"埋單專業戶", line:["Forty group chats, and every single one goes quiet when the bill arrives.", "40個群組，張單一到，全部即刻靜晒。"]},
"rich+gamer": {en:"The Whale", zh:"課金大戶", line:["Others grind for loot; you top up till the game sends Dad a thank-you card.", "人哋辛苦練級，你課金課到遊戲公司寄心意卡畀阿爸。"]},
"rich+artsy": {en:"The Trust-Fund Bohemian", zh:"信託基金文青", line:["Dresses like a starving artist, pays like a tycoon. Even the tote bag is imported.", "打扮似窮藝術家，使錢似大老闆，連個布袋都係入口貨。"]},
"rich+hustle": {en:"Dad's Angel Round", zh:"老豆天使輪", line:["A startup idea every week, and every pitch deck ends: “So, Dad, can you wire it?”", "一星期一個初創點子，每份計劃書最後一頁都係：「阿爸，過數得唔得？」"]},
}
};
const PERSONA_CARDS = [
{id:"b_sub_1", st:0, who:"sub", thumb:{w:"calculator", r:"sneaker"}, tag:["SFO living-cost loan", "學資貸款"], en:"Your SFO loan for living costs lands. Four to a room all your life, you've never held this much cash.", zh:"學資處生活費貸款過咗數，劏房長大嘅你從未見過咁多錢。",
w:["Budget it to last the whole year", "做好預算，用足成個學年"], r:["New shoes, a hall trip. Live a little!", "買波鞋去旅行，嘆吓先！"], trap:"spend",
tip:["A student loan is still a loan: you repay it with interest after you graduate. Spend it on needs, not wants.", "學生貸款都係貸款，畢業後要連利息還。用喺需要，唔好用喺想要。"],
later:{w:["By May, {name}'s SFO budget had a month to spare, so {he} repaid that part early. Less interest, same 8pm discount bento.", "到五月，{name}嘅學資預算仲有一個月餘錢，即刻提早還。利息少咗，八點減價飯盒照食。"], r:["The new shoes wore out by Year 3. The SFO loan, with interest, ran until {name} was 32. Mum still asks if they were worth it.", "新波鞋讀到大三就爛咗。學資貸款連利息，{name}要還到32歲。阿媽到而家仲問值唔值。"]}},
{id:"b_sub_2", st:0, who:"sub", thumb:{w:"lunchbox", r:"smartphone"}, tag:["Pay-first job ad", "先俾錢嘅兼職"], en:"Between supermarket shifts, an ad: earn HK$800 a day “liking” videos at home. Just pay a HK$1,000 fee first.", zh:"超市更之間見廣告：讚好片日賺HK$800，先交HK$1,000會費。",
w:["Keep night shifts, check Scameter", "繼續返夜更，上視伏器查"], r:["Pay the fee and quit night shifts", "交錢，順手辭咗份夜更"], trap:"scam",
tip:["A real job never asks you to pay to start. Paid “liking” tasks are a common job scam.", "真工作唔會要你先俾錢。「讚好賺錢」係常見求職騙案。"],
later:{w:["Scameter flagged it in seconds. {name} kept the supermarket night shift, and now the manager saves {him} the 9pm discount bread.", "防騙視伏器即刻亮紅燈。{name}繼續返超市夜更，店長仲成日留九點減價麵包畀佢。"], r:["Day four brought a HK$5,000 “upgrade fee”. {name}'s HK$1,000 was gone for good, and so was the night shift.", "第四日，對方要再交HK$5,000「升級費」。{name}嗰HK$1,000冇咗，夜更都冇埋。"]}},
{id:"b_sub_3", st:1, who:"sub", thumb:{w:"piggybank"}, tag:["Sending money home", "寄錢返屋企"], en:"First job. You send most of your pay home so your family can rent a bigger room. Nothing is left for you.", zh:"第一份工，大半人工畀屋企租大啲嘅房，自己一蚊都冇剩。",
w:["Send a fixed sum and save a little first", "定好家用數，自己先儲少少"], r:["Send it all. Save once you earn more", "全部畀晒，人工高啲先儲"], trap:"delay",
tip:["Helping family is kind. Saving a little for yourself too means you won't need to borrow when trouble hits.", "顧家係好事，但自己都要儲返少少，有事先唔使周圍借。"],
later:{w:["Within a year the family had a bigger room and {name} had HK$10,000 of {his} own. When the fridge died, nobody borrowed.", "一年內屋企搬咗大啲嘅房，{name}自己都儲到HK$10,000。雪櫃壞咗，冇人使借錢。"], r:["Still no raise two years later, and still no savings. When {name} cracked a tooth, the dentist went on a card at 30%.", "轉眼兩年，人工未加，儲蓄未開始。{name}隻牙一裂，睇牙醫要碌年息三成嘅卡。"]}},
{id:"b_sub_4", st:1, who:"sub", thumb:{w:"passbook", r:"phishhook"}, tag:["Fake SFO repayment text", "假學資處短訊"], en:"An SMS says your SFO loan repayment is overdue: “Pay now via this link or face legal action.”", zh:"短訊話你學資貸款逾期：「即刻撳連結還款，否則採取法律行動。」",
w:["Ignore link, check SFO directly", "唔撳連結，搵學資處查"], r:["Tap the link and settle it now", "即刻撳入條連結還錢"], trap:"scam",
tip:["Scam texts copy real government offices. Don't tap the link; check through the official website or hotline.", "騙徒會扮政府部門發短訊。唔好撳連結，自己上官方網站或打熱線查證。"],
later:{w:["Five minutes on the SFO hotline: nothing overdue. {name} warned the family chat, where the little brother had the same text.", "學資處熱線話{name}個戶口冇事。佢將假短訊轉去家庭群組，細佬即刻刪咗自己收到嗰條。"], r:["That night the real SFO said nothing was overdue. The fake site had {name}'s card details, and HK$4,600 that never came back.", "當晚真學資處話根本冇逾期。假網站就偷咗{name}張卡資料同HK$4,600，追唔返。"]}},
{id:"b_sub_5", st:2, who:"sub", thumb:{w:"calculator", r:"handbag"}, tag:["First flat for the family", "同爸媽上車"], en:"After years four to a room, you're buying a flat with your parents. The agent pushes a 3-room way over budget.", zh:"迫咗劏房咁多年，終於同爸媽買樓。經紀狂推超預算嘅三房單位。",
w:["Buy the 2-room flat you can afford", "買負擔得起嘅兩房"], r:["Stretch for the 3-room. You've earned it", "咬實牙買三房，你應得嘅"], trap:"spend",
tip:["Keep mortgage payments comfortable and leave a cash cushion for rate rises and repairs.", "供樓要留有餘地，預留現金應付加息同維修。"],
later:{w:["When rates rose, {name}'s 2-room mortgage barely flinched. The bunk bed went, and Mum calls the small room “the mansion”.", "加息嗰陣，{name}兩房嘅供款都頂得順。碌架床終於拆咗，阿媽仲叫間細房做「豪宅」。"], r:["Rates rose the next year. To make the mortgage, {name} rented the third room to a stranger, and put the leaking pipe on a card.", "第二年就加息。為咗供樓，{name}將第三間房租咗畀陌生人，整漏水仲要碌卡。"]}},
{id:"b_sub_6", st:3, who:"sub", thumb:{w:"steamer"}, tag:["Paid-off flat, little cash", "有樓冇現金"], en:"At 65 your flat is paid off, but your cash is thin. Old habits say: scrimp harder and don't make a fuss.", zh:"65歲，層樓供完，但手頭現金唔多。老習慣話：再慳啲，唔使搞咁多。",
w:["Look into a reverse mortgage with your kids", "同仔女研究吓安老按揭"], r:["Keep scrimping. Sort it out if it gets bad", "照慳住先，真係唔夠先算"], trap:"delay",
tip:["A reverse mortgage can turn a paid-off home into monthly income while you keep living in it.", "安老按揭可以將供完嘅樓變成每月收入，你仍然可以繼續住。"],
later:{w:["With a reverse mortgage, {name}'s paid-off flat now paid {him} monthly. Still a discount-hour shopper, but the fruit got better.", "做咗安老按揭，供完嘅樓每月出錢畀{name}。佢照樣睇住減價時間，但會買靚啲嘅生果。"], r:["Scrimping in a flat worth millions, {name} put off a knee operation for two years. The money had been under {his} feet all along.", "住喺值幾百萬嘅樓，{name}慳到連膝頭手術都拖咗兩年。其實錢一直喺佢腳底。"]}},
{id:"b_estate_1", st:0, who:"estate", thumb:{w:"passbook", r:"hottip"}, tag:["Aunties' “gold club”", "師奶黃金會"], en:"Your floor gave you HK$5,000 in red packets for getting into uni. The aunties' “gold club” pays 3% a month!", zh:"成層樓為你入大學封咗HK$5,000利是。師奶話「黃金會」月息三厘！",
w:["Thank them politely, bank the cash", "多謝街坊，即刻存入銀行"], r:["Join the club; aunties know best", "入會啦，師奶從來冇錯"], trap:"scam",
tip:["High returns paid out of new members' money is a Ponzi scheme. When new money stops, payouts stop.", "用新會員嘅錢派高息就係「龐氏騙局」，冇新錢入就即刻爆煲。"],
later:{w:["The gold club collapsed a year later, and the lift gossip ran for weeks. {name}'s HK$5,000 sat in the bank, earning interest.", "年尾黃金會爆煲，升降機八卦講足幾個禮拜。{name}嗰HK$5,000安安穩穩喺銀行收息。"], r:["Three months of 3% payouts, then new members ran dry. {name}'s HK$5,000 vanished, and the head auntie moved out of the estate.", "頭三個月準時收息，冇新會員就即刻爆煲。{name}嘅HK$5,000冇晒，帶頭師奶都搬走咗。"]}},
{id:"b_estate_2", st:0, who:"estate", thumb:{w:"piggybank", r:"camera"}, tag:["Grad photo package", "畢業相套餐"], en:"Graduation! The whole floor wants to see your photos. A studio offers a HK$6,800 package with drone shots.", zh:"畢業喇！成層樓等住睇你啲相。影樓套餐HK$6,800，有花有航拍。",
w:["Campus photos with friends and a tripod", "同朋友喺校園影，自備腳架"], r:["Book the studio. The floor is watching", "訂影樓！成層樓睇住㗎"], trap:"spend",
tip:["Spending to impress others is the priciest kind. Ask yourself: would I still pay if nobody saw it?", "為咗畀人睇而使嘅錢最貴。問吓自己：冇人睇都會唔會買？"],
later:{w:["On graduation day the tripod shots went straight onto Mum's TV cabinet. The floor loved them, and {name}'s HK$6,800 stayed put.", "畢業嗰日，腳架相即刻擺上阿媽個電視櫃。成層樓讚不絕口，{name}嘅HK$6,800原封不動。"], r:["For a week the drone shot did the rounds of the floor. {name} spent ten months paying off the HK$6,800, plus interest.", "航拍相喺成層樓嘅群組傳咗一個星期。HK$6,800連利息，{name}還咗十個月都未清。"]}},
{id:"b_estate_3", st:1, who:"estate", thumb:{w:"calculator", r:"handbag"}, tag:["Big promise to Mum", "家用講面子"], en:"First job! Mum expects money for the household from day one, and she's hinted to the floor it'll be a lot.", zh:"第一份工！阿媽等你畀家用，仲同成層樓暗示你會畀好多。",
w:["Agree a steady sum you can keep", "同阿媽傾個長做長有嘅數"], r:["Promise HK$8,000 to show off", "應承畀八千蚊，等阿媽有面"], trap:"spend",
tip:["Give an amount you can keep up every month. A steady sum beats a big one you'll have to cut later.", "家用要畀得長久。穩定嘅數目，好過畀住大數之後要減。"],
later:{w:["Every payday for two years, {name} handed Mum HK$5,000 on time. Mum's new brag to the floor: “Never once late!”", "兩年嚟{name}每月準時畀家用HK$5,000。阿媽成日同鄰居講：「一次都冇遲過！」"], r:["Five months in, {name} was topping up the HK$8,000 with a credit card. By month eight it was cut, and the floor knew by dinner.", "第五個月，{name}要碌卡先夠畀HK$8,000。第八個月要減家用，成層樓食飯前已經知。"]}},
{id:"b_estate_4", st:1, who:"estate", thumb:{w:"piggybank"}, tag:["Pay rise vs. housing limit", "公屋入息限額"], en:"A raise may push the family over the public-housing income limit someday. Mum: “Worry when the letter comes.”", zh:"你加人工，第日可能令屋企超出公屋入息限額。阿媽話：「收到信先算。」",
w:["Start a home fund for your move", "開置業基金作好準備"], r:["Wait for the letter, then panic", "等收到封信先至頭痕"], trap:"delay",
tip:["More household income can change public-housing rent or eligibility. Plan early so a raise isn't a crisis.", "家庭入息高咗，公屋租金或資格都可能有變。早啲計劃，加人工唔會變危機。"],
later:{w:["Five years on the letter came, and {name}'s home fund was ready. The family left the estate over a farewell hotpot.", "五年後封信嚟到，{name}個置業基金早已準備好。全家食餐散水邊爐先搬，冇手忙腳亂。"], r:["Year six, the letter came: higher rent next quarter. {name} had spent five years of raises, and had three months to plan.", "第六年封信嚟咗：下季起要交更高租金。{name}五年加薪全部使晒，一蚊都冇儲，得三個月諗辦法。"]}},
{id:"b_estate_5", st:2, who:"estate", thumb:{w:"passbook", r:"hottip"}, tag:["Paying to jump the queue", "居屋插隊費"], en:"You apply for a Home Ownership Scheme flat. A “consultant” promises you a top ballot number for HK$30,000.", zh:"抽居屋時，有個「顧問」話俾HK$30,000就保證抽到頭籌。",
w:["Wait for the real draw. It's free and fair", "等正式抽籤，免費又公平"], r:["Pay up. Who wants to wait years?", "俾錢！邊個想等幾年？"], trap:"scam",
tip:["Nobody can buy you a better ballot number. Anyone charging to “help” with public housing is likely a scam.", "冇人可以俾錢買靚籌。收錢話幫你「疏通」公營房屋，好大機會係騙局。"],
later:{w:["Two draws later, {name} got a flat the free, fair way. The “consultant” made the evening news, in handcuffs.", "抽多兩期，{name}用免費又公平嘅方法抽中居屋。嗰個「顧問」就上咗新聞，仲戴住手扣。"], r:["{name}'s ballot number came out as bad as it would have anyway. The consultant's phone was off; the HK$30,000 was gone.", "{name}抽到嘅籌，同冇俾錢一樣咁衰。「顧問」電話打唔通，HK$30,000冇咗。"]}},
{id:"b_estate_6", st:3, who:"estate", thumb:{w:"passbook"}, tag:["Savings idle in a passbook", "存摺放死錢"], en:"Now you're the floor's top auntie. Your HK$300,000 savings sit in a passbook while you count every dollar.", zh:"而家你係樓層大師奶。HK$300,000積蓄擺喺存摺，日日慳住使。",
w:["Turn part of it into an annuity", "撥部分買年金，每月有收入"], r:["Leave it. Plans are for young people", "唔理，計劃係後生仔嘅事"], trap:"delay",
tip:["An annuity, like the HKMC's, turns a lump sum into monthly income for life. Compare terms before signing.", "年金（例如按揭證券公司嗰個）可以將一筆錢變成終身每月收入，簽之前要比較清楚。"],
later:{w:["Every month after that, the annuity landed like a salary. {name}, the floor's top auntie, now treats the mahjong table to dim sum.", "年金每個月好似出糧咁入數。樓層大師奶{name}，而家定期請成枱麻雀腳飲茶。"], r:["Ten years on, the passbook had barely grown while wet-market prices climbed. {name} still counted every dollar; each bought less.", "十年嚟本存摺幾乎冇增長，街市啲餸就越嚟越貴。{name}照計住每一蚊，只係每一蚊買少咗。"]}},
{id:"b_mid_1", st:0, who:"mid", thumb:{w:"calculator"}, tag:["Mum still runs your money", "阿媽幫你管錢"], en:"Mum has run your tutorials, timetable and money since P1. Now she offers to keep managing your bank account.", zh:"由小一開始，阿媽幫你排補習、排時間表、管錢。佢話繼續幫你管戶口。",
w:["Thanks, Mum. I'll budget it myself", "多謝阿媽，自己學理財"], r:["Let Mum run it until graduation", "交畀阿媽管，畢業先算"], trap:"delay",
tip:["Learning to manage money while the amounts are small is the cheapest lesson you'll ever get.", "趁銀碼細學理財，係你一世最平嘅學費。"],
later:{w:["In week two, {name}'s first budget blew up over bubble tea. By Year 3 {he} tracked every dollar, and was teaching Mum the app.", "第二個星期，{name}第一份預算就俾珍奶打爆。到大三，佢記實每一蚊，仲教阿媽用app。"], r:["At 24, {name} learned budgeting the expensive way: salary gone by the 15th, and a card bill Mum didn't know about.", "24歲，{name}先用貴價學費學理財：人工15號就清袋，仲有張阿媽唔知嘅卡數。"]}},
{id:"b_mid_2", st:0, who:"mid", thumb:{w:"textbooks", r:"phishhook"}, tag:["Exchange flat deposit", "交流租屋訂金"], en:"Exchange in London! An online “landlord” sends lovely photos and wants a deposit by transfer before a viewing.", zh:"去倫敦交流！網上「業主」傳咗靚相，要你未睇樓就過數畀訂金。",
w:["Book through the uni housing office", "經大學住宿處搵地方住"], r:["Pay now before someone else grabs it", "即刻過數，費事俾人搶"], trap:"scam",
tip:["Rental scams ask for money before a viewing or a contract. Use official housing offices or trusted platforms.", "租屋騙案會叫你未睇樓、未簽約就俾錢。用大學住宿處或可靠平台。"],
later:{w:["In London, {name}'s housing-office room was tiny but real. The “landlord” with lovely photos had messaged three flatmates too.", "去到倫敦，住宿處嘅房細細但真實。{name}發現「業主」嗰啲靚相，三個新室友都收過。"], r:["Three weeks later {name} dragged a suitcase to the address: a launderette. The deposit was gone, and the hostel cost extra.", "三個星期後，{name}拖住喼搵到個地址：原來係間洗衣舖。訂金冇咗，仲要額外住旅舍。"]}},
{id:"b_mid_3", st:1, who:"mid", thumb:{w:"piggybank", r:"umbrella"}, tag:["Overseas master's", "海外碩士"], en:"All your tutorial-class pals are off to UK master's. Your parents offer to remortgage, 20 years still to go.", zh:"補習班舊同學個個去英國讀碩士。爸媽話可以加按，佢哋仲有廿年先供完。",
w:["Work, save up, seek scholarships", "做嘢儲錢，搵埋獎學金"], r:["Let them remortgage. Everyone's going", "由爸媽加按，個個都去"], trap:"spend",
tip:["A degree should pay back more than it costs. Don't stretch the family home loan just to keep up.", "讀書都要計成本同回報。唔好為咗跟風，加重屋企嘅樓按。"],
later:{w:["After two years of saving, {name} left for the UK on a scholarship. Mum and Dad's mortgage still ends on schedule.", "儲咗兩年錢，{name}拎住獎學金去英國讀書。爸媽層樓依然準時供完。"], r:["Back in Hong Kong, {name} had a master's and the same job offers as before. Mum and Dad's mortgage now runs until Dad turns 75.", "讀完碩士返香港，{name}搵到嘅工同未去之前差唔多。爸媽層樓而家要供到老豆75歲。"]}},
{id:"b_mid_4", st:1, who:"mid", thumb:{w:"calculator", r:"hottip"}, tag:["Pre-IPO share offer", "上市前股份"], en:"At a barbecue, everyone brags about a “pre-IPO” deal. A chat-app adviser offers you shares at a “discount”.", zh:"朋友燒烤，個個都講緊「上市前」股份。網上顧問話可以平價分你啲。",
w:["Check the SFC register of licensed firms", "上證監會查持牌機構"], r:["Buy in. Can't be the only one left out", "買！唔可以得我一個冇份"], trap:"scam",
tip:["Pre-IPO share offers by cold call or chat are a common scam. Deal only with SFC-licensed firms.", "經電話或聊天程式推銷「上市前股份」係常見騙案，只同證監會持牌機構交易。"],
later:{w:["No sign of the “adviser” on the SFC register. Next barbecue, three friends were filing police reports and {name} was on sausages.", "個「顧問」喺證監會名冊搵唔到。下次燒烤，三個朋友忙住報警，{name}就專心燒腸仔。"], r:["The listing never happened, and the adviser vanished with {name}'s HK$80,000. For once, nobody at the barbecue had been left out.", "上市從來冇發生，個顧問連{name}嘅HK$80,000一齊消失。今次燒烤班人，真係冇人執輸。"]}},
{id:"b_mid_5", st:2, who:"mid", thumb:{w:"piggybank", r:"guitar"}, tag:["K1 interview classes", "幼稚園面試班"], en:"Your toddler's playgroup friends do six interview-prep classes a week: HK$12,000 a month. Sound familiar?", zh:"BB啲同學個個每星期上六堂面試班，每月HK$12,000。好熟口面？",
w:["One class they love, plus an education fund", "揀一堂佢鍾意嘅，再開教育基金"], r:["Sign up for all six. Can't fall behind!", "六堂全報，唔可以輸喺起跑線！"], trap:"spend",
tip:["Keeping up with other parents never ends. Pay for what your child needs and save the rest for later.", "同其他家長鬥係冇終點嘅。按小朋友需要使錢，留返啲為將來儲。"],
later:{w:["One drama class the kid adored, HK$10,000 a month saved. Fifteen years on, {name} paid for uni without remortgaging anything.", "揀一堂個仔最鍾意嘅戲劇班，每月儲HK$10,000。十五年後交大學學費，{name}唔使加按。"], r:["Six classes a week, just like {name}'s childhood. By K1 interviews HK$288,000 was spent, and the education fund held HK$0.", "每星期六堂，同{name}細個一模一樣。到K1面試已使咗HK$288,000，教育基金仲係零。"]}},
{id:"b_mid_6", st:3, who:"mid", thumb:{w:"calculator"}, tag:["Bank of Mum and Dad", "父母銀行"], en:"Your son wants HK$1,000,000 for a flat deposit. You haven't worked out what your own retirement will cost.", zh:"個仔要HK$1,000,000做首期，但你未計過自己退休要幾多錢。",
w:["Work out your retirement needs, then decide", "先計清退休所需，再決定"], r:["Hand it over now. Plan retirement later", "即刻畀佢，退休遲啲先諗"], trap:"delay",
tip:["Your kids can borrow for a flat, but nobody lends you money to retire. Secure your own needs first.", "仔女買樓可以借按揭，但冇人會借錢畀你退休。先顧好自己。"],
later:{w:["A week of sums later, {name} gave the son HK$400,000, not a million. The son got a mortgage; {name} kept a retirement.", "計清數先，{name}畀個仔HK$400,000，唔係一百萬。個仔借按揭，{name}保住退休。"], r:["The son got the flat. At 72, {name} finally did the retirement sums, and found no bank lends anyone money to retire.", "個仔順利上車。到72歲，{name}終於計退休數，先發覺唔夠，又冇銀行會借錢畀人退休。"]}},
{id:"b_rich_1", st:0, who:"rich", thumb:{w:"calculator", r:"handbag"}, tag:["Friends wait for you to pay", "朋友等你埋單"], en:"Hall dinner: HK$6,000 for twelve. When the bill comes, everyone checks their phone, then looks at you.", zh:"宿舍聚餐十二個人HK$6,000。張單一嚟，個個望住手機，再望住你。",
w:["Split it equally like everyone else", "大家夾錢，一人一份"], r:["Tap Dad's supplementary card. Again", "又碌老豆張附屬卡"], trap:"spend",
tip:["Paying every time doesn't buy friendship; it just trains people to expect it. Splitting keeps it fair.", "次次埋單買唔到友情，只會令人習以為常。夾錢先公平。"],
later:{w:["“Let's split it,” said {name}. Three seconds of silence. By next term the hall gang picked cheaper places, and still came.", "{name}一句「夾錢啦」，成枱靜咗三秒。下個學期，宿舍班人揀平啲嘅餐廳，照樣齊人。"], r:["Come June, Dad's statement listed 23 hall dinners: HK$138,000. The card was cut; {name} now repays Dad from internship pay.", "六月，老豆月結單有23餐宿舍飯，共HK$138,000。卡即刻剪，{name}用實習人工慢慢還。"]}},
{id:"b_rich_2", st:0, who:"rich", thumb:{w:"passbook", r:"phishhook"}, tag:["Half-price “VIP” bag", "半價名牌袋"], en:"An Instagram shop DMs you as a “VIP”: a sold-out designer bag at half price, deposit by bank transfer only.", zh:"IG網店私訊你：「VIP」專享，斷貨名牌袋半價，只收轉數訂金。",
w:["Buy only from the brand's own shop", "只喺品牌官方門市買"], r:["Pay the deposit before it's gone", "即刻俾訂，費事賣晒"], trap:"scam",
tip:["Too-cheap luxury, transfer only: a classic shopping scam. Check the seller on Scameter before paying.", "名牌平得離譜又只收轉數，係典型網購騙案。俾錢前上防騙視伏器查吓。"],
later:{w:["Three months on the brand's own waiting list, {name} got the real bag. The “VIP” Instagram shop had vanished long before.", "喺官方門市輪候咗三個月，{name}終於攞到真袋。嗰間IG「VIP」網店，早已人間蒸發。"], r:["The deposit cleared. Next morning the “VIP” shop blocked {name}, and all {he} ever received was a police report number.", "訂金過咗數，第二朝間「VIP」網店就block咗{name}。最後收到嘅，只有一個報案編號。"]}},
{id:"b_rich_3", st:1, who:"rich", thumb:{w:"lunchbox", r:"sunglasses"}, tag:["Family-firm job offer", "家族生意職位"], en:"Dad's offer: start in the family firm's warehouse on normal pay, or be “Director” with a leased sports car.", zh:"老豆叫你返家族公司：由貨倉做起拎正常人工，定做「董事」租跑車？",
w:["Start in the warehouse on normal pay", "由貨倉做起，正常人工"], r:["Be Director. Lease the sports car", "做董事，順手租架跑車"], trap:"spend",
tip:["Big perks lift your lifestyle fast and are hard to give up. Learn the business and live below your pay.", "排場一上去就好難落返嚟。學好盤生意，使少過賺。"],
later:{w:["Box by box, three years in the warehouse taught {name} the business. Promoted at last, {he} knew what every box cost.", "喺貨倉做咗三年，{name}逐箱學識盤生意。後來升職，佢早就知道每箱貨幾錢。"], r:["By 26, Director {name} spent more than {he} earned on the car lease and the lifestyle. The card balance grew; the know-how didn't.", "做咗兩年董事，跑車租金加排場，使多過{name}賺。卡數越滾越大，盤生意就一竅不通。"]}},
{id:"b_rich_4", st:1, who:"rich", thumb:{w:"passbook"}, tag:["What's in your name?", "你名下有咩"], en:"Dad's accountant runs every account, policy and flat in your name. Honestly, you've no idea what you own.", zh:"你名下啲戶口、保單同物業，全部由老豆嘅會計師打理，你完全唔知有咩。",
w:["Ask for a full asset list", "攞張清單逐項搞清楚"], r:["Skip the paperwork, check someday", "唔理住，第日先慢慢睇"], trap:"delay",
tip:["Know every account, policy and asset in your name. You can't protect what you don't know you own.", "要清楚自己名下所有戶口、保單同資產。唔知有乜，就保護唔到。"],
later:{w:["The list ran to 14 pages. Within a month {name} had found a forgotten policy and an unpaid repair bill, and fixed both.", "清單足足14頁。一個月內，{name}搵到一份冇人理嘅保單同一張未交嘅維修單，即刻搞掂。"], r:["When Dad's accountant retired, {name} found a lapsed policy and two dormant accounts. Untangling it took a year and a lawyer.", "老豆個會計師一退休，{name}先發現有份保單斷咗供、兩個戶口變咗不動戶口，搞咗成年兼請律師。"]}},
{id:"b_rich_5", st:2, who:"rich", thumb:{w:"piggybank"}, tag:["Kid asks for her own card", "個女要附屬卡"], en:"Your 8-year-old wants a supplementary card. “You had one!” The grandparents are already reaching for wallets.", zh:"八歲個女要張附屬卡：「你細個都有！」長輩已經準備掏銀包。",
w:["Give pocket money and a jar", "改畀零用錢加儲錢罌"], r:["Sure, money lessons can wait later", "好呀，理財遲啲先至教"], trap:"delay",
tip:["Kids learn money by handling small amounts. Pocket money and a savings jar teach more than a card.", "小朋友要親手管細數先學到理財。零用錢同儲錢罌，好過一張卡。"],
later:{w:["A year of pocket money later, {name}'s daughter cracked the savings jar for a bike, then counted the change twice.", "儲咗一年零用錢，{name}個女打爛儲錢罌買咗架單車，仲要數兩次找續。"], r:["At 16, {name}'s daughter was buying the whole class's bubble tea. The money lessons finally began, with a HK$40,000 statement.", "16歲，{name}個女成班同學飲珍奶都包晒。理財課終於開始，教材係張HK$40,000月結單。"]}},
{id:"b_rich_6", st:3, who:"rich", thumb:{w:"passbook", r:"hottip"}, tag:["Inheritance “helpers”", "遺產「顧問」"], en:"You inherit the family fortune. A “wealth adviser” you've never met offers a “guaranteed” 15% a year on it.", zh:"你繼承咗家產。有個陌生「理財顧問」話幫你打理，「保證」年賺15%。",
w:["Choose your own licensed adviser and lawyer", "自己揀持牌顧問同律師"], r:["Hand it over. He says he knew your dad", "交畀佢！佢話同老豆好熟"], trap:"scam",
tip:["Sudden wealth draws scammers. Use licensed professionals you choose, and never share passwords or codes.", "突然有錢最易惹騙徒。自己揀持牌專業人士，密碼同驗證碼絕對唔好畀人。"],
later:{w:["A month on, {name}'s own licensed adviser and lawyer had it all in order. “Dad's old friend” called twice, then vanished.", "一個月後，{name}自己揀嘅持牌顧問同律師已經打點好。「老豆老朋友」再打兩次電話，就消失咗。"], r:["“Dad's old friend” asked for one login code, then another. A month later much of {name}'s inheritance was overseas, and gone.", "「老豆老朋友」問咗一個驗證碼，又再問一個。一個月後，{name}大半遺產已經轉咗去海外，追唔返。"]}},
{id:"p_grind_1", st:0, who:"grind", thumb:{w:"textbooks", r:"hottip"}, tag:["Paid internship “guarantee”", "保證實習"], en:"A “career coach” sells a HK$9,800 certificate package that “guarantees” an internship at a top bank.", zh:"有個「職涯教練」賣HK$9,800證書套餐，「保證」入大銀行實習。",
w:["Use uni careers help for free", "用大學免費就業服務"], r:["Pay up now for a guaranteed offer", "即刻畀錢，穩入實習！"], trap:"scam",
tip:["Real employers don't charge you to get hired. Careers centres offer free CV checks and mock interviews.", "真正嘅僱主唔會收錢先請人。就業中心有免費改CV同模擬面試。"],
later:{w:["By summer, the careers centre's free mock interviews got {name} internship number three, and the HK$9,800 stayed put.", "到暑假，{name}靠就業中心免費模擬面試拎到第三份實習，HK$9,800一蚊都冇郁過。"], r:["A month later, the “coach” had blocked {name} everywhere. The certificate was a PDF; the HK$9,800 was now a police report.", "一個月後，「教練」block咗{name}，證書係個PDF，HK$9,800變報案紙。"]}},
{id:"p_grind_2", st:0, who:"grind", thumb:{w:"transitcard"}, tag:["Taxis to “save study time”", "搭的士溫書"], en:"Exam season: you take taxis everywhere and buy two coffees a day to “save study time”. That's HK$150 a day.", zh:"考試季為咗「慳時間溫書」，日日搭的士兼飲兩杯咖啡，一日HK$150。",
w:["Study on the MTR, skip taxis", "喺MTR溫書，少搭的士"], r:["Time is money. Take a taxi!", "時間係金錢，照截的士"], trap:"spend",
tip:["Small daily habits add up: HK$150 a day is about HK$4,500 a month.", "小數怕長計：一日HK$150，一個月就差唔多HK$4,500。"],
later:{w:["Exam season over, {name} had revised two chapters between Admiralty and Sha Tin and kept HK$3,000 off the taxi meter.", "考完試，{name}喺金鐘去沙田嘅車廂溫晒兩課，的士錢慳返HK$3,000。"], r:["By the last paper, {name}'s taxi receipts filled a pencil case. In August, {he} was still paying minimums on HK$4,500.", "考完最後一份卷，{name}的士單塞滿筆袋；HK$4,500卡數到八月仲還緊最低還款額。"]}},
{id:"p_grind_3", st:1, who:"grind", thumb:{w:"calculator"}, tag:["Bonus sitting idle", "花紅擺喺度"], en:"You work till 11pm every night. Your HK$60,000 bonus has sat in a 0% account for eight months.", zh:"你晚晚OT到11點，HK$60,000花紅喺零息戶口擺咗八個月。",
w:["Set aside 30 minutes to plan it", "抽三十分鐘好好計劃"], r:["Plan after your next promotion", "等升咗職先至慢慢算"], trap:"delay",
tip:["Cash left at 0% interest quietly loses value to inflation. Half an hour of planning is enough to start.", "零息擺住啲錢，會畀通脹慢慢蝕咗。抽半個鐘計劃就可以開始。"],
later:{w:["One Sunday, {name} gave {his} bonus the 30 minutes usually spent on LinkedIn. By spring, the HK$60,000 was working too.", "有個星期日，{name}抽30分鐘計劃花紅。到春天，HK$60,000終於同佢一齊開工。"], r:["The promotion came two years later. By then {name}'s HK$60,000 had earned exactly zero, and inflation had taken a quiet bite.", "兩年後終於升職，{name}嗰HK$60,000一個仙利息都冇，仲畀通脹靜靜雞咬咗一啖。"]}},
{id:"p_grind_4", st:1, who:"grind", thumb:{w:"piggybank", r:"handbag"}, tag:["Burnout “treat yourself”", "報復式消費"], en:"After a 90-hour week closing the deal, a HK$22,000 designer bag whispers: “You deserve this.”", zh:"捱完一個禮拜90個鐘，HK$22,000名牌袋喺度叫：「你值得擁有」",
w:["Pick a treat within your budget", "喺娛樂預算內獎勵自己"], r:["Swipe the card. You deserve it", "照碌卡！我抵得嘅"], trap:"spend",
tip:["Stress spending feels good for a day. A planned reward and real rest last longer, and cost less.", "壓力大就亂買，開心得一日。有預算嘅獎勵同真正休息，更持久又平啲。"],
later:{w:["That Saturday, {name} spent the month's fun budget on a massage and slept 11 hours: a new personal record, for HK$600.", "嗰個星期六，{name}用娛樂預算按咗個摩，瞓足11個鐘，破個人紀錄，只使HK$600。"], r:["Six months on, the bag was still in its box. {name} paid only the minimum; the interest worked longer hours than {he} did.", "半年後，個袋仲未出過盒。{name}月月還最低還款額，利息OT得仲勁過佢。"]}},
{id:"p_grind_5", st:2, who:"grind", tag:["Only company insurance", "淨靠公司保險"], en:"Your doctor says you're burning out. The family relies on your pay, and your only cover is the company plan.", zh:"醫生話你過勞。成頭家靠你份糧，但你淨係得公司醫保。",
w:["Add personal cover that stays with you", "加買跟身嘅個人保障"], r:["Company plan's enough. Too busy!", "公司嗰份夠啦，好忙！"], trap:"delay",
tip:["Company medical cover usually ends when you leave the job. Personal cover stays with you.", "公司醫保通常一離職就冇。個人保障就會跟住你走。"],
later:{w:["When {name} quit the 90-hour job, the company plan ended that Friday. {His} own cover didn't, and the family slept better.", "{name}終於辭咗嗰份90鐘嘅工，公司醫保即日斷，自己買嗰份照跟身，屋企人瞓得安樂啲。"], r:["Burnout made {name} quit. Weeks later came an HK$80,000 hospital bill, and the company plan had ended with the job.", "最後{name}捱到辭工。幾星期後入院，單據HK$80,000，公司醫保跟份工一齊冇咗。"]}},
{id:"p_grind_6", st:3, who:"grind", thumb:{w:"passbook", r:"phishhook"}, tag:["“Rate products” job", "「做任務」兼職"], en:"Retired but can't sit still, you see an online job: rate products for HK$1,000 a day after a small deposit.", zh:"退咗休但閒唔落，見到網上兼職：先交按金，評商品日賺HK$1,000。",
w:["Ignore it and check it on Scameter", "唔理佢，上防騙視伏器查"], r:["Pay the deposit. Back to the grind!", "交按金，繼續搏殺！"], trap:"scam",
tip:["A job that makes you pay first is almost always a scam. Check suspicious sites and numbers on Scameter.", "要你先畀錢嘅工作，幾乎一定係騙局。可疑網站同電話可以上防騙視伏器查。"],
later:{w:["At 66, {name} ran the site through Scameter: flagged in ten seconds. {He} logged it as the most efficient task of {his} week.", "66歲嘅{name}上防騙視伏器一查，十秒就見警告，佢將呢單記做今個禮拜最有效率嘅任務。"], r:["By day five, {name} had rated 300 products and “earned” HK$5,000 on screen. The real HK$12,000 in deposits was gone for good.", "第五日，{name}評咗300件貨，螢幕話賺咗五千，但真金白銀交嘅一萬二按金已經冇晒。"]}},
{id:"p_genius_1", st:0, who:"genius", thumb:{w:"calculator"}, tag:["“My brain is my budget”", "心算當預算"], en:"You never track spending: you can do the maths in your head. Yet your account is empty by the 20th.", zh:"你從來唔記數：心算咁勁，使乜記？但每個月20號已經清袋。",
w:["Track every dollar for a month", "記一個月數，睇清去向"], r:["Budgets are only for mortals", "做預算係凡人先用嘅"], trap:"delay",
tip:["Even great mental maths misses small spends. One month of tracking shows where the money really goes.", "心算再勁都會漏咗啲細數。記一個月帳，就知錢實際去咗邊。"],
later:{w:["One month of tracking later, {name} found HK$900 of bubble tea that {his} brilliant brain had rounded down to zero.", "記咗一個月數，{name}發現佢個天才腦將HK$900珍珠奶茶四捨五入咗做零。"], r:["A year later, {name} had hit zero by the 20th twelve months straight and saved nothing. {He}'d do the maths tomorrow.", "一年後，{name}連續12個月20號就清袋，一蚊都冇儲到。條數？佢話聽日先計。"]}},
{id:"p_genius_2", st:0, who:"genius", thumb:{w:"calculator", r:"smartphone"}, tag:["Forgotten yearly plan", "忘記取消訂閱"], en:"Final exam tomorrow. A study app's 7-day free trial rolls into a HK$1,800 yearly plan unless you cancel.", zh:"聽日考試。溫書App免費試用7日，之後自動轉HK$1,800年費。",
w:["Set a reminder to cancel on day 6", "設提醒，第6日取消"], r:["I'll remember to cancel. Probably", "我實記得取消嘅…大概"], trap:"spend",
tip:["Free trials often roll into paid plans. Check your card statement for subscriptions you forgot.", "免費試用好多時會自動續費。睇吓張月結單有冇忘記咗嘅訂閱。"],
later:{w:["On day six, the reminder buzzed and {name} cancelled with one tap. {He} aced the exam on the free week and paid HK$0.", "第6日個提醒一震，{name}撳一下就取消。靠免費嗰個禮拜考到A，一蚊都冇畀過。"], r:["In March, {name}'s card statement showed HK$1,800 for an app {he}'d opened exactly once. Next year it renewed. Definitely.", "三月月結單上，{name}見到HK$1,800年費，個App得開過一次，翌年仲自動續。"]}},
{id:"p_genius_3", st:1, who:"genius", thumb:{w:"calculator", r:"hottip"}, tag:["Unlicensed trading app", "無牌炒股App"], en:"Three winning weeks of day-trading. Now an app offers 20x leverage and a HK$2,000 bonus if you deposit today.", zh:"炒股連贏三星期。有App話今日入金送HK$2,000兼20倍槓桿。",
w:["Check its SFC licence first", "先上證監會網站查牌"], r:["I'm a genius. Deposit today!", "我咁天才，今日入金！"], trap:"scam",
tip:["Check a platform's licence on the SFC's public register. Bonuses for depositing fast are a red flag.", "先上證監會公眾紀錄冊查平台有冇牌。催你快啲入金送獎賞，就係警號。"],
later:{w:["Two minutes on the SFC register, and the app wasn't there. {name} stayed with {his} licensed broker, at a humble 1x.", "兩分鐘後，{name}喺證監會紀錄冊搵唔到呢個App，決定繼續用有牌券商，槓桿一倍就夠。"], r:["The app showed {name} up 300%, then froze withdrawals and demanded an “unlock fee”. Every dollar {he} deposited was gone.", "起初個App顯示{name}賺咗三倍，跟住凍結提款，要交「解凍費」。佢入嘅錢全部冇晒。"]}},
{id:"p_genius_4", st:1, who:"genius", thumb:{w:"passbook"}, tag:["Scattered MPF accounts", "強積金戶口散晒"], en:"Four jobs in three years left you four MPF accounts. Merging them online is quick, but you'll do it later.", zh:"三年轉咗四份工，留低四個強積金戶口。網上合併好快，但你話遲啲先。",
w:["Merge accounts online today", "今日上網合併成一個"], r:["Leave it. It's only paperwork", "遲啲先啦，啲文件嘢"], trap:"delay",
tip:["Each old job can leave a separate MPF account. Merging them makes fees and investments easier to track.", "每份舊工都可能留低一個強積金戶口。合併咗，收費同投資就易睇好多。"],
later:{w:["Ten minutes online that night, and {name}'s four MPF accounts became one. {His} next statement fitted on a single page.", "當晚上網十分鐘，{name}四個強積金戶口變咗一個，下一份結單得一頁紙。"], r:["Three jobs later, {name} had seven MPF accounts, seven sets of fees and a drawer of unopened statements. Merging? Tomorrow.", "再轉多三份工，{name}有七個強積金戶口、七份收費，成櫃桶結單未拆。合併？聽日先。"]}},
{id:"p_genius_5", st:2, who:"genius", thumb:{w:"steamer", r:"handbag"}, tag:["Forgot the anniversary", "忘記結婚週年"], en:"You forgot your wedding anniversary. It's tomorrow. A jewellery shop offers 12-month instalments.", zh:"結婚週年紀念日係聽日，你又唔記得咗。金舖話可以分12期。",
w:["Cook dinner and plan a nice date", "親手煮餐飯，簡單約會"], r:["Buy jewellery on 12 instalments", "分十二期買首飾補鑊"], trap:"spend",
tip:["Last-minute buys cost more. Put birthdays and anniversaries in your calendar and save a little ahead.", "臨急臨忙買嘢通常貴啲。將生日、週年記入日曆，預早儲少少。"],
later:{w:["That night, {name} cooked {his} signature dish and planned a Cheung Chau day out. Next year's is already in the calendar.", "嗰晚，{name}親手煮咗佢唯一拿手菜，再約定搭船去長洲。明年個日子已經入咗日曆。"], r:["The necklace sparkled for a week. {name} paid for it for twelve months, missed instalment seven, and paid a late fee on top.", "條頸鏈閃咗一個星期，{name}就供咗佢12個月，第七期仲漏咗，要罰多筆遲還費。"]}},
{id:"p_genius_6", st:3, who:"genius", thumb:{w:"passbook", r:"freegift"}, tag:["“Genius club” fee", "「天才會」入會費"], en:"Retired, you try an online IQ test: top 0.1%! An “elite investors' club” now invites you in, for HK$20,000.", zh:"退休做智商測驗話你頂尖！「精英會」邀你入會，會費HK$20,000。",
w:["Enjoy the compliment, keep the money", "多謝讚賞，錢就留返自己用"], r:["Pay. I always knew I was special", "交！我早知自己與別不同"], trap:"scam",
tip:["Flattery is a classic hook. Be wary of any “exclusive” club that wants money before it shows you anything.", "讚你係詐騙常用招數。未見實質嘢就要你畀錢嘅「尊貴會籍」，要小心。"],
later:{w:["{name} screenshotted the IQ result for the family chat and kept the HK$20,000. The grandkids now call {him} “Top 0.1%”.", "食飯前，{name}已將IQ成績send上家庭群組，兩萬蚊袋好。孫仔叫佢「千分之一」。"], r:["The club's first “exclusive briefing” was a 404 page. {name}'s HK$20,000 was gone, and the IQ test site had vanished too.", "「精英會」首場講座係一頁404。{name}嘅HK$20,000冇咗，個IQ網都消失埋。"]}},
{id:"p_social_1", st:0, who:"social", thumb:{w:"piggybank", r:"bubbletea"}, tag:["Hall event FOMO", "舍堂活動"], en:"High-table dinner, hall ball, three birthday surprises: HK$2,500 gone this month. Now there's a hall trip.", zh:"高桌、舞會、三個生日驚喜，今個月使咗HK$2,500，仲有舍堂宿營。",
w:["Pick key events, set a cap", "揀重點活動，定個上限"], r:["Go to everything. FOMO is real", "樣樣都去，唔想錯過"], trap:"spend",
tip:["Set a monthly social budget. When it runs out, suggest free plans like a hike or a picnic.", "定個每月社交預算，用完就提議行山、野餐呢啲免費活動。"],
later:{w:["By month's end, {name} had done the ball, one birthday and a free hike up Lion Rock. Half the hall came; the budget survived.", "到月尾，{name}去咗舞會同一個生日，再搞免費獅子山日落行山。半個舍堂都嚟，預算有剩。"], r:["Come Reading Week, {name} was still paying card interest on a hall trip and a hotpot {he} could barely remember.", "到溫習週，{name}樣樣都去晒，全部碌卡，仲為一餐記唔起嘅邊爐還緊利息。"]}},
{id:"p_social_2", st:0, who:"social", thumb:{w:"passbook", r:"freegift"}, tag:["O'Camp “sponsor”", "迎新營贊助"], en:"A “sponsor” offers your O'Camp HK$20,000, if you collect copies of the freshers' ID cards.", zh:"有人出HK$20,000贊助O'Camp，條件係交齊新生身份證副本。",
w:["Refuse. Freshers' data isn't for sale", "拒絕，新生資料唔賣得"], r:["Take it. The camp needs funds!", "收咗佢，營會要錢㗎！"], trap:"scam",
tip:["ID card copies can be used to open accounts or take loans in someone's name. Never collect or hand them out.", "身份證副本可以畀人冒名開戶或者借錢。唔好隨便收集或者交出去。"],
later:{w:["Come September, O'Camp ran on HK$8,000 from a hall car wash. Thanks to {name}, not one fresher's ID copy changed hands.", "九月，O'Camp靠洗車籌夠HK$8,000。多得{name}，冇一張新生身份證外流。"], r:["The sponsor never paid. By October, freshers got debt calls for loans they never took, and the police called {name}.", "贊助一蚊都冇到。十月，新生收到唔係自己借嘅貸款追數，警察仲搵{name}落口供。"]}},
{id:"p_social_3", st:1, who:"social", thumb:{w:"piggybank"}, tag:["Group savings challenge", "群組儲錢挑戰"], en:"Your friends start a savings challenge in the group chat: everyone posts their progress each Friday.", zh:"朋友喺群組搞儲錢挑戰，逢星期五報進度。",
w:["Join today and set up an auto-transfer", "今日加入，設定自動轉賬"], r:["Join next month, after the parties", "下個月先加入，玩完先"], trap:"delay",
tip:["Peer pressure works both ways. Saving with friends, plus an auto-transfer, makes the habit easier to keep.", "朋友壓力都可以係好嘢。同朋友一齊儲，再加自動轉賬，更易堅持。"],
later:{w:["Fifty-two Fridays later, {name}'s auto-transfer had quietly saved HK$36,000, and {he} hadn't skipped a single hotpot.", "52個星期五之後，{name}嘅自動轉賬靜靜雞儲咗HK$36,000，邊爐照打冇少。"], r:["Next month had more parties. By December, everyone posted their totals; {name} posted a hotpot photo and HK$0.", "下個月又有party。到十二月，個個報數，{name}就send咗張邊爐相同HK$0。"]}},
{id:"p_social_4", st:1, who:"social", thumb:{w:"calculator"}, tag:["Guarantor for a friend", "幫朋友做擔保"], en:"Your Friday-drinks colleague asks you to be guarantor for a HK$150,000 loan. “It's just a signature!”", zh:"飲酒識嘅同事叫你做佢HK$150,000貸款嘅擔保人：「簽個名啫！」",
w:["Say no kindly, help another way", "好聲拒絕，用第啲法幫"], r:["Sign it. Can't turn down a mate", "簽啦，點好意思拒絕"], trap:"spend",
tip:["A guarantor must repay the loan if the borrower can't. It can also hurt your own credit record.", "做擔保人，借款人還唔到，你就要還。仲可能影響你自己嘅信貸紀錄。"],
later:{w:["That Friday, {name} said no kindly and drew up a repayment plan with the colleague. Drinks went on; {his} credit stayed clean.", "當晚，{name}好聲好氣拒絕，改為幫同事整份還款預算。酒照飲，信貸紀錄依然乾淨。"], r:["Eight months on, the colleague stopped paying. The bank's letters now came to {name}: HK$150,000, plus interest.", "八個月後，同事斷供兼轉咗工。銀行啲信寄晒去{name}度：HK$150,000另加利息。"]}},
{id:"p_social_5", st:2, who:"social", thumb:{r:"fakeparcel"}, tag:["Class-chat group-buy", "家長群組團購"], en:"In your kid's class WhatsApp group, a parent sells cheap theme-park tickets. Transfer first, tickets later.", zh:"仔女班家長WhatsApp群組有人團購平價樂園飛，要先過數。",
w:["Buy from the official site only", "只喺官方渠道買"], r:["Transfer now before they sell out", "即刻過數，賣晒就冇"], trap:"scam",
tip:["Fake group-buys are common online scams. Check the seller's account or phone number on Scameter first.", "假團購係常見網騙。畀錢前，先上防騙視伏器查吓賣家戶口或電話。"],
later:{w:["A week later, the class chat exploded: the group-buy seller had vanished. {name}'s official-site tickets worked just fine.", "一星期後，班群爆煲：嗰個團購家長人間蒸發。{name}喺官網買嘅飛，照入樂園冇問題。"], r:["Within a minute, {name} had sent HK$2,400. Within an hour, the seller had left the chat, and the money was gone for good.", "一分鐘內，{name}過咗HK$2,400；一個鐘內，賣家退咗群組。錢冇咗，去樂園都冇份。"]}},
{id:"p_social_6", st:3, who:"social", thumb:{w:"steamer", r:"sunglasses"}, tag:["Annuity “after the cruise”", "年金遲啲先"], en:"Choir, hiking and dim sum four days a week. A friend says an annuity pays monthly for life. “After my cruise!”", zh:"合唱、行山、一星期飲四日茶。朋友話年金可以月月出糧，你話坐完郵輪先。",
w:["Compare annuity plans this month", "今個月比較年金計劃"], r:["Compare later. Life's too busy!", "遲啲先，成日好忙㗎！"], trap:"delay",
tip:["A life annuity, like the HKMC Annuity Plan, turns a lump sum into monthly income for life. Compare first.", "年金（例如「香港年金計劃」）可以將一筆錢變成終身每月收入，買前要比較。"],
later:{w:["Within the month, {name} had compared plans and bought an annuity. Now money lands every month, right on time for dim sum.", "嗰個月{name}比較完就買咗年金，而家月月準時出糧，啱啱夠請合唱團飲茶。"], r:["Three cruises later, {name} asked about annuities. The lump sum had shrunk, and so had the monthly income it could buy.", "坐完三次郵輪，{name}先問年金，嗰筆錢已經縮咗一大截，買到嘅每月收入都跟住縮水。"]}},
{id:"p_gamer_1", st:0, who:"gamer", thumb:{w:"piggybank", r:"controller"}, tag:["Gacha limited banner", "抽卡限定池"], en:"The limited banner ends tonight. Your favourite character is 40 pulls away: about HK$1,200 in top-ups.", zh:"限定池今晚完，仲差40抽保底先抽到本命，要課HK$1,200。",
w:["Let it go and keep your budget", "放手，跟返每月預算"], r:["Top up and pull tonight!", "照課！今晚一定要抽到！"], trap:"spend",
tip:["Gacha games make “one more pull” feel small. Set a monthly cap and stop when it's reached.", "抽卡遊戲令「再抽一次」好似好細數。定個每月上限，到咗就停。"],
later:{w:["For once, {name} slept before 4am. When the banner returned months later, {he} pulled the character with free gems.", "難得一晚，{name}四點前就瞓咗。幾個月後限定池復刻，佢用免費石就抽到本命。"], r:["On pull 40, {name} got the character, all on the card. Next patch, it was nerfed. The HK$1,200 card bill, sadly, was not.", "第40抽，{name}抽到本命，全碌卡。更新後角色被削，HK$1,200卡數就削唔到。"]}},
{id:"p_gamer_2", st:0, who:"gamer", thumb:{w:"passbook", r:"phishhook"}, tag:["Rare skin buyer", "買家收稀有皮膚"], en:"A buyer offers HK$3,000 for your rare skin, but you must log in on their “safe trading site” to get paid.", zh:"買家出HK$3,000收你件稀有皮膚，要你喺「安全交易網」登入收錢。",
w:["Use the official trade system", "只用官方交易系統"], r:["Log in on their site to get paid", "去佢個網登入收錢"], trap:"scam",
tip:["Fake trading sites steal your login, then your account and saved cards. Use official trading only.", "假交易網會偷你嘅登入資料，連賬戶同儲存咗嘅信用卡都冇埋。只用官方交易。"],
later:{w:["On the official market, {name} sold the skin for HK$2,700 in two days. The same “buyer” then tried the trick on half the guild.", "兩日後，{name}喺官方市集賣咗件皮膚，HK$2,700。個「買家」之後去呃半個公會。"], r:["Four hours later, {name}'s account and rare skin were gone, and {his} saved card had been charged HK$4,000. The “safe” site was not.", "喺「安全」網登入後，凌晨四點{name}賬戶皮膚冇晒，卡仲畀人碌咗HK$4,000。"]}},
{id:"p_gamer_3", st:1, who:"gamer", thumb:{w:"piggybank", r:"controller"}, tag:["Third instalment plan", "第三份分期"], en:"You're still paying off a console and a monitor. Now a HK$25,000 RGB gaming PC is “0% over 24 months”.", zh:"遊戲機同芒都仲供緊，又想24期免息買HK$25,000 RGB電腦。",
w:["Finish existing plans, then save", "供完手頭先，再儲錢買"], r:["Add a third plan at 0% interest", "加多份分期，免息嘛！"], trap:"spend",
tip:["“0%” plans still eat into every payday, and a missed one can mean fees. Add them all up before signing more.", "「免息」分期都會食住你每月人工，遲還仲可能罰錢。簽新嗰張前，先加埋算清楚。"],
later:{w:["Five months after the last instalment, {name} bought the PC outright. It arrived with zero plans attached, RGB glowing smugly.", "供完最後一期再儲五個月，{name}一筆過買咗部電腦。一份分期都冇，RGB閃得特別得意。"], r:["Three plans, three due dates. {name} missed one in raid week, ate a late fee, and half of each payday now vanished on arrival.", "三份分期，三個還款日。{name}團戰週漏咗一期，罰咗錢，每月人工一出就冇咗一半。"]}},
{id:"p_gamer_4", st:1, who:"gamer", thumb:{w:"passbook", r:"controller"}, tag:["Esports “pro contract”", "電競「職業合約」"], en:"A “team manager” says you're pro material. Just pay HK$8,000 for “training camp and registration” first.", zh:"「戰隊經理」話你夠料打職業，先交HK$8,000訓練營同註冊費。",
w:["Get a contract and check first", "先睇合約，再查清楚"], r:["Pay right now. Dreams wait for none", "即刻交錢，夢想唔等人"], trap:"scam",
tip:["Real teams don't charge players to sign. Upfront “contract” fees are a classic job scam.", "真正嘅戰隊唔會收選手錢先簽約。要你先交費嘅「合約」係典型求職騙局。"],
later:{w:["When {name} asked for a contract, the “manager” vanished, and so did the team. The guild still calls {him} “pro material”.", "{name}一話要睇合約，「經理」即刻消失，根本冇呢個戰隊。公會而家仲叫佢「職業級」。"], r:["Day one of “training camp”, {name} found only a car park in Kwun Tong. The manager's number was dead, and so was the HK$8,000.", "「訓練營」第一日，{name}先知係觀塘停車場。「經理」打唔通，HK$8,000冇埋。"]}},
{id:"p_gamer_5", st:2, who:"gamer", thumb:{w:"piggybank", r:"controller"}, tag:["Kid's school fund", "仔女教育基金"], en:"You can plan a 40-player raid to the minute, but there's no savings plan for your kid's school costs.", zh:"你可以將40人團戰計到分秒不差，但仔女讀書使費就一啲計劃都冇。",
w:["Set up an auto-save like a quest", "設每月自動儲，當任務"], r:["Start saving after this season", "等打完呢季先開始儲"], trap:"delay",
tip:["Start early and automate it. Small regular savings for school costs beat a big scramble later.", "早啲開始、自動轉賬。細細額定期儲，好過臨急先周圍搵錢。"],
later:{w:["{name} treated the monthly auto-save like a daily quest. By the kid's DSE year, the school fund had quietly hit max level.", "{name}將每月自動儲錢當每日任務咁清。到仔女考DSE嗰年，教育基金已經練到滿級。"], r:["One season became twelve. The first big school bill found {name} with no fund, years of growth missed, and a loan form.", "一季變十二季。第一張大額學費單到，{name}一蚊都冇儲，錯過咗咁多年增值，要四圍借錢。"]}},
{id:"p_gamer_6", st:3, who:"gamer", thumb:{w:"passbook", r:"smartphone"}, tag:["Passwords only in your head", "密碼淨係喺腦"], en:"Still raiding at 70! Your bank apps, e-wallets and game accounts: every password lives only in your head.", zh:"70歲照打機！銀行App、電子錢包、遊戲賬戶，所有密碼淨係喺你個腦。",
w:["Keep a secure list with family", "寫安全清單，話畀家人知"], r:["Save it later. I won't forget", "遲啲先，我記性好實記得"], trap:"delay",
tip:["Without a record, family may not even know your accounts exist. Keep a secure list and tell someone you trust.", "冇紀錄，家人可能連你有咩戶口都唔知。整份安全清單，話畀信得過嘅人知。"],
later:{w:["When {name} spent a month in hospital at 75, the family found the list and paid every bill. The guild kept {his} seat warm.", "75歲嗰年{name}入院一個月，家人搵到份清單，張張單準時交。公會仲幫佢留住個位。"], r:["At 78, {name} remembered every raid boss but no bank password. The family spent months finding accounts they never knew of.", "78歲，{name}記得晒每隻Boss，偏偏唔記得銀行密碼。家人追咗幾個月先搵齊啲戶口。"]}},
{id:"p_artsy_1", st:0, who:"artsy", thumb:{w:"piggybank", r:"camera"}, tag:["Vintage film camera", "菲林相機"], en:"A vintage film camera costs HK$4,800, and every roll of film plus developing adds about HK$200.", zh:"古董菲林機HK$4,800，每筒菲林連沖曬仲要HK$200。",
w:["Borrow the club camera first", "先借學會部相機試吓"], r:["Buy it, plus 20 rolls of film", "買！再入二十筒菲林"], trap:"spend",
tip:["Hobbies have running costs. Count what it costs each month, not just the price tag.", "興趣有持續開支。唔好淨係睇價錢牌，要計埋每個月使幾多。"],
later:{w:["A month with the club camera taught {name} {he} shot two rolls a month, not twenty. The HK$4,800 stayed in the tote bag.", "借咗學會部機一個月，{name}發現自己每月只影兩筒菲林。HK$4,800留返喺帆布袋。"], r:["By May, {name}'s card bill hit HK$8,800: camera, film, developing. Paying only minimums, {he} watched the interest develop too.", "到五月，{name}卡數欠HK$8,800：機、菲林連沖曬。只還最低還款，利息滾得快過沖相。"]}},
{id:"p_artsy_2", st:0, who:"artsy", thumb:{w:"textbooks", r:"freegift"}, tag:["Paid “exhibition” invite", "「展覽費」邀請"], en:"A “curator” DMs you: your IG photos are picked for a show in Milan! Just pay a HK$6,000 exhibition fee.", zh:"「策展人」DM你：你啲相入選米蘭展覽！交HK$6,000展覽費就得。",
w:["Check the gallery and ask tutor", "先查畫廊，問吓導師"], r:["Pay the fee. My art's going global", "交！我啲作品要出國！"], trap:"scam",
tip:["Be wary when someone praises your work and then asks for a fee. Check the gallery and ask people you trust.", "先讚你作品、再叫你交錢，要提高警覺。查清楚畫廊，問吓信得過嘅人。"],
later:{w:["It took the tutor one search: the “Milan gallery” was a mailbox. {name} hung the photos in a Sham Shui Po café instead, free.", "導師一分鐘就查到嗰間「米蘭畫廊」只係個信箱。{name}最後喺深水埗咖啡店免費辦咗個小展。"], r:["{name} paid the HK$6,000 and bought a new tote bag for Milan. The “gallery” address was a pizza shop, and the money was gone.", "{name}交咗HK$6,000，仲買埋新帆布袋去米蘭。「畫廊」原來係間薄餅店，錢冇晒。"]}},
{id:"p_artsy_3", st:1, who:"artsy", thumb:{w:"passbook"}, tag:["Freelance, no MPF", "自由工作冇強積金"], en:"You go freelance as a designer. No boss means no one enrols you in MPF. Retirement feels far away anyway.", zh:"你做咗自由身設計師。冇老闆，就冇人幫你供強積金，反正退休仲好遠。",
w:["Enrol in MPF and save from fees", "登記強積金，留份儲蓄"], r:["Leave retirement for future me", "退休？第日嘅我先煩"], trap:"delay",
tip:["Self-employed people must enrol in an MPF scheme too. Set aside part of every payment for tax as well.", "自僱人士都要參加強積金計劃。每次收錢，都預留一部分交稅。"],
later:{w:["Come tax season, {name} paid the bill without putting down {his} latte: MPF enrolled, a slice of every fee already set aside.", "稅單到嗰日，{name}手揸住拿鐵就交咗：強積金早登記，每單收入都預留咗一份。"], r:["Ten years freelance, zero MPF, every tax bill a surprise. At 40, {name} finally met “future me”, who had no retirement fund.", "十年自由身，強積金零，稅單年年嚇親。40歲{name}終於見到「第日嘅我」：冇退休錢。"]}},
{id:"p_artsy_4", st:1, who:"artsy", thumb:{w:"passbook", r:"phishhook"}, tag:["Client overpays", "客戶「過多咗數」"], en:"A new client “accidentally” pays you HK$20,000 too much for a poster job and asks you to refund it today.", zh:"新客戶「過多咗」HK$20,000畀你，叫你即日退返。",
w:["Wait for the bank to check", "唔退住，先叫銀行查"], r:["Refund it right now to please clients", "即刻退返，對客要好"], trap:"scam",
tip:["Overpay-and-refund is a classic scam: the payment may bounce or be stolen money, and your refund is gone.", "「過多咗數叫你退」係典型騙局：嗰筆錢可能會彈票或者係贓款，你退出去嘅錢就冇咗。"],
later:{w:["Within a week, the bank traced the HK$20,000 to a stolen account and reversed it. The “client” vanished; {name} lost nothing.", "一星期後，銀行查到HK$20,000係贓款，退返原主。客戶失蹤，{name}一蚊都冇蝕。"], r:["That afternoon, {name} refunded HK$20,000. Two days later the original payment bounced, and the bank froze {his} account.", "{name}即日退咗HK$20,000。兩日後嗰筆錢彈返轉頭，銀行仲凍結咗佢個戶口。"]}},
{id:"p_artsy_5", st:2, who:"artsy", thumb:{w:"piggybank"}, tag:["The café “someday”", "咖啡店「第日先」"], en:"You and your partner dream of opening a café “when the kids are older”, but haven't saved a cent for it.", zh:"你同另一半夢想「仔女大啲」就開咖啡店，但一蚊都未儲過。",
w:["Start a monthly café fund today", "今日開個每月咖啡店基金"], r:["Someday. You can't budget a dream", "第日先啦，夢想點計得預算"], trap:"delay",
tip:["A dream with a price and a date becomes a plan. Even a small monthly fund keeps it moving.", "有價錢、有日期嘅夢想先係計劃。每月儲少少，夢想都會一步步接近。"],
later:{w:["Ten years and HK$1,500 a month later, {name}'s café fund had a price, a date, and a menu chalked on the fridge.", "每月HK$1,500，儲咗十年，{name}個咖啡店夢有價錢、有日期，雪櫃仲貼住餐牌。"], r:["Someday kept moving. When the kids left home, {name} had a mood board, three tote bags of ideas, and HK$0 for the café.", "「第日」一直延期。仔女搬咗出去，{name}有塊靈感板、三個帆布袋嘅點子，咖啡店基金得零。"]}},
{id:"p_artsy_6", st:3, who:"artsy", thumb:{w:"lemontea"}, tag:["Retirement café", "退休開咖啡店"], en:"Retired! Your café fund is ready, but you're tempted to add all your MPF for a bigger shop on a 3-year lease.", zh:"退休喇！咖啡店基金儲夠，但你想再加埋全部強積金，開大間啲。",
w:["Use only the café fund and start small", "淨用咖啡基金細間開起"], r:["Put everything into a big shop", "押晒身家開間大舖"], trap:"spend",
tip:["Retirement savings must last decades and are hard to rebuild. Keep them apart from business risks.", "退休錢要用幾十年，蝕咗好難再賺返。唔好將佢全部押落生意度。"],
later:{w:["Two years in, {name}'s six-table café runs on the fund alone. Regulars come for the vinyl, and the MPF hasn't been touched.", "開業兩年，{name}嘅六張枱細舖淨靠基金撐住。熟客嚟聽黑膠，強積金一蚊都未郁過。"], r:["The big shop was gorgeous and half empty. By year two of the lease, {name}'s MPF was gone and a year of rent was still due.", "大舖好靚，但得一半客。租約第二年，{name}啲強積金已經冇晒，仲有一年租要照交。"]}},
{id:"p_hustle_1", st:0, who:"hustle", thumb:{w:"calculator", r:"sneaker"}, tag:["Sneaker stock on credit", "碌卡入波鞋"], en:"You bought 12 pairs of limited sneakers on your credit card to resell. Prices just dropped 20%.", zh:"你碌卡入咗12對限量波鞋準備轉賣，點知價錢跌咗兩成。",
w:["Sell at a small loss and clear the card", "蝕少少放貨，還清卡數"], r:["Buy 10 more pairs on card to average down", "再碌卡入10對攤平"], trap:"spend",
tip:["If you can't pay the card in full, interest builds every month. Don't add more debt to a losing bet.", "卡數唔還清就月月計息。蝕緊嘅生意，唔好再借錢加注。"],
later:{w:["{name} sold all 12 pairs at a small loss and cleared the card within a week. Two months later, the model fell another 30%.", "一星期內，{name}蝕少少放晒12對，還清卡數。兩個月後，同款波鞋再跌多三成。"], r:["Prices kept sliding. By summer, 22 shoeboxes blocked {name}'s hall room, and the card balance grew interest every month.", "價錢繼續跌。到暑假，{name}間宿舍房疊咗22個鞋盒，卡數月月滾利息。"]}},
{id:"p_hustle_2", st:0, who:"hustle", thumb:{w:"calculator", r:"cryptocoin"}, tag:["Paid “VIP signal” group", "付費「貼士群」"], en:"A group sells “VIP signals” at HK$1,500 a month, telling members which coin will pump next.", zh:"有群組賣「VIP貼士」，月費HK$1,500，預早話你邊隻幣會爆升。",
w:["Skip it, check Scameter first", "唔理，先上防騙視伏器查"], r:["Subscribe. Easy cash between class", "即訂，堂與堂之間搵快錢"], trap:"scam",
tip:["Signal groups often pump a coin so insiders can sell to latecomers, and paying members are the latecomers.", "「貼士群」成日谷起隻幣，等內部人士賣畀遲入場嘅人，而交錢嗰班通常就係遲嚟嗰班。"],
later:{w:["Scameter flagged the group in seconds. {name} kept the HK$1,500 and spent the lecture break on startup idea #23 instead.", "防騙視伏器幾秒就亮紅燈。{name}慳返HK$1,500，落堂改為諗第23個創業大計。"], r:["Each time, {name} bought just as the insiders sold. Three months on: HK$4,500 in fees, HK$12,000 lost, and the group deleted.", "次次{name}都啱啱接正內部人士放貨。三個月後：月費四千五、蝕一萬二，群組仲散埋。"]}},
{id:"p_hustle_3", st:1, who:"hustle", thumb:{w:"lunchbox", r:"smartphone"}, tag:["Startup on a loan", "借錢創業"], en:"Startup idea #9 this year: food delivery for pets! You plan to quit and borrow HK$300,000 to launch it.", zh:"第9個創業大計：寵物外賣App！你想辭工兼借HK$300,000。",
w:["Keep job, test on weekends", "保住份工，週末試水溫"], r:["Quit the job and take the full loan", "即刻辭工借錢，搏一鋪！"], trap:"spend",
tip:["Test ideas cheaply before borrowing. A loan still has to be repaid if the business fails.", "借錢之前，用最少錢試吓個念頭。生意失敗，貸款都照樣要還。"],
later:{w:["Two months of weekend tests: eleven orders, nine from the same corgi. {name} kept the job and never borrowed the HK$300,000.", "週末試咗兩個月：11張單，9張嚟自同一隻柯基。{name}保住份工，唔使借三十萬。"], r:["The app launched to 40 users and one loyal corgi. It closed within a year; {name}'s HK$300,000 loan, plus interest, did not.", "App推出得40個用戶同一隻忠心柯基，一年執笠，{name}三十萬貸款連利息照還。"]}},
{id:"p_hustle_4", st:1, who:"hustle", thumb:{w:"calculator", r:"sneaker"}, tag:["Side-hustle tax records", "炒賣收入報稅"], en:"Sneakers, phone cases, a market stall: your side hustles brought in HK$200,000 this year. Records? Zero.", zh:"波鞋、手機殼、市集檔，副業今年賺HK$200,000，單據一張都冇。",
w:["Keep records and set aside tax money", "記好數，預留交稅錢"], r:["Sort it out when the tax letter comes", "收到稅單先算"], trap:"delay",
tip:["Side-business profits can be taxable. Keep receipts and records, and put tax money aside as you earn.", "副業利潤都可能要交稅。留好單據、記好數，賺錢時就預留稅款。"],
later:{w:["Tax season came, and an old sneaker box held every one of {name}'s receipts, with the tax money set aside sale by sale.", "到報稅季，{name}個舊波鞋盒裝滿晒單據，稅錢亦都每單預留好，稅單一到就交得。"], r:["Then came the tax letter, with a deadline. {name} spent three weekends rebuilding the year from chat logs and borrowed to pay.", "稅單一到就有限期。{name}用三個週末喺對話紀錄砌返成年數，最後仲要借錢交稅。"]}},
{id:"p_hustle_5", st:2, who:"hustle", thumb:{w:"calculator", r:"hottip"}, tag:["“Guaranteed” flipping course", "「保證賺」炒樓班"], en:"You need a bigger flat for the family. A HK$38,000 course promises “guaranteed” profits from flipping flats.", zh:"屋企要換大樓，HK$38,000炒樓班話「保證賺」，仲有會員筍盤。",
w:["Walk away. Nothing is guaranteed", "唔報，冇嘢係保證嘅"], r:["Sign up and join their first deal", "報名，即刻跟佢入市"], trap:"scam",
tip:["Promises of guaranteed profits are a red flag. Property prices can fall, and borrowing makes losses bigger.", "「保證賺」係警號。樓價會跌，借錢炒更會放大損失。"],
later:{w:["{name} walked out before the sign-up forms came round. Two years later, the family moved up to a bigger flat, the slow way.", "行出嗰個講座兩年後，{name}一家用慢慢儲嘅方法換咗大屋。"], r:["The “member deal” fell 15% in a year and the mentor went quiet. {name} lost the HK$38,000 fee and a chunk of the down payment.", "「會員筍盤」一年跌15%，導師已讀不回。{name}冇咗三萬八學費，首期都蝕埋一截。"]}},
{id:"p_hustle_6", st:3, who:"hustle", thumb:{w:"passbook", r:"hottip"}, tag:["“One more deal” at 63", "「最後一單」"], en:"At 63, every dollar is in “the next deal” and there's no steady retirement income yet. “After this one!”", zh:"63歲，你所有錢都喺「下一單」度，退休穩定收入一蚊都未安排。",
w:["Move part to steady income now", "而家撥部分去穩陣收入"], r:["Just one last big deal first", "搏埋最後呢一單大嘅先"], trap:"delay",
tip:["Near retirement, keep part of your money in steadier options so one bad deal can't wipe you out.", "就嚟退休，要將部分錢放喺穩陣啲嘅地方，唔好一單蝕晒。"],
later:{w:["{name} moved a chunk into steady income that year. At 70, the payouts still arrive, and so do {his} pitches in the lift.", "嗰年{name}將部分錢轉去穩陣收入。70歲，每月照有錢入數，佢照喺升降機度推銷新點子。"], r:["At 65, the last big deal went bust and took everything. {name} spent retirement flipping sneakers again, this time for rent.", "65歲嗰「最後一單」爆煲，連老本都冇埋。{name}退休要再炒波鞋，今次係為咗交租。"]}},
{id:"c_sub_grind_u", st:0, who:"sub+grind", thumb:{w:"textbooks", r:"calculator"}, tag:["Study-centre contract", "自修室合約"], en:"Home is 100 sq ft and too noisy to study. A private study centre wants HK$800 a month on a 12-month contract.", zh:"百呎劏房嘈到溫唔到書，自修中心要你簽一年約，月費HK$800。",
w:["Use the free uni library zone", "用大學圖書館免費溫"], r:["Sign the 12-month contract now", "唔理咁多，即刻簽一年約"], trap:"spend",
tip:["Try free options first and read the exit terms: long contracts keep charging even after you stop going.", "先試免費選擇，簽約前睇清退出條款：長約就算你唔去都照收錢。"],
later:{w:["By finals, {name} owned a late-night library desk and HK$9,600 unspent. The bunk below finally slept in the dark.", "到考試季，{name}喺圖書館通宵區有個專屬位，慳咗HK$9,600。下格終於可以熄燈瞓。"], r:["Come March, {name} had used the study centre twice, but the contract kept billing HK$800 a month. The head-torch was back on.", "開學三個月，{name}得去過自修中心兩次，又返去戴頭燈，份約照每月扣HK$800。"]}},
{id:"c_sub_grind_j", st:1, who:"sub+grind", thumb:{w:"passbook", r:"dumbbell"}, tag:["Your own medical cover", "自己嘅醫療保障"], en:"You work 70-hour weeks to move your family out of the subdivided flat. Your own medical cover can wait… right?", zh:"你一星期做70個鐘，想帶屋企人搬離劏房。自己嘅醫療保險？遲啲先。",
w:["Get basic medical cover now", "而家買基本醫療保險"], r:["Later. Work is too busy", "遲啲先，忙到冇時間"], trap:"delay",
tip:["If your family relies on your pay, one hospital stay can undo years of saving. Cover is cheapest when young.", "成家人靠你份糧，入一次醫院就可能蝕晒幾年積蓄。後生買基本保障最平。"],
later:{w:["Two years on, {name}'s appendix burst mid-deadline. Insurance paid, and the family still moved out that spring.", "兩年後，{name}趕死線趕到盲腸炎入院，保險包晒，一家照計劃春天搬出劏房。"], r:["At 29, a burst appendix put {name} in a private ward. The HK$90,000 bill ate the moving-out fund, and cover now costs more.", "29歲，{name}盲腸爆咗入私家醫院，HK$90,000醫藥費食晒搬屋基金，碌架床又多瞓一年。"]}},
{id:"c_sub_grind_f", st:2, who:"sub+grind", thumb:{w:"textbooks", r:"hottip"}, tag:["“Guaranteed” school place", "「包入」名校"], en:"You revised on a bunk bed; your kid will do better. A “consultant” guarantees a top school for HK$80,000.", zh:"你碌架床溫書出身，想個仔更好。「顧問」收HK$80,000包入名校。",
w:["Apply through the official channels", "跟正式程序報名"], r:["Pay him. It's for the kid's future", "畀錢佢，為個仔前途"], trap:"scam",
tip:["School places go through official admissions. A “guaranteed place” sold for cash is a red flag: call 18222.", "學位要經正式程序申請。有人收錢「包入」就係警號，可以打18222查詢。"],
later:{w:["Come September, {name}'s kid started at a good school via the official round. The old head-torch retired to a drawer.", "九月，{name}個仔經正式程序入咗間好學校，有張真書枱溫書，個頭燈終於退休。"], r:["Four months on, the “consultant” had blocked {name} and the HK$80,000 was gone. Police got a report; the kid got no offer.", "四個月後，「顧問」已經封鎖{name}，HK$80,000冇晒。報咗警，取錄信就永遠冇嚟。"]}},
{id:"c_sub_genius_u", st:0, who:"sub+genius", thumb:{w:"passbook", r:"fakeparcel"}, tag:["Too-cheap room near campus", "超筍校園房"], en:"18 years four to a room, and now a half-price room by campus! The “overseas” landlord wants HK$8,000 first.", zh:"四人一房18年，終有半價校園房！「海外」業主要先過HK$8,000。",
w:["View it first and meet the landlord", "先睇樓，見咗業主先"], r:["Pay now. Viewing is too much effort", "即刻過數，睇樓好麻煩"], trap:"scam",
tip:["Never pay a deposit on a place you haven't seen. Fake landlords use low prices to rush you.", "未睇過嘅樓唔好畀訂金。假業主最鍾意用超平價錢催你落訂。"],
later:{w:["One viewing later, the “half-price room” was a car park. {name} kept the HK$8,000, and the folding table by the rice cooker.", "睇樓先發覺「半價房」係停車場。{name}保住HK$8,000，電飯煲隔籬張摺枱照用。"], r:["On Monday the landlord's number was dead, and HK$8,000 with it. {name} reported it, then crammed at the folding table as usual.", "星期一，業主電話已經打唔通，HK$8,000冇咗。{name}報完警，又返摺枱臨急抱佛腳。"]}},
{id:"c_sub_genius_j", st:1, who:"sub+genius", thumb:{w:"lunchbox", r:"smartphone"}, tag:["Food delivery habit", "日日叫外賣"], en:"Mum fed four of you on HK$100 a day. You're too lazy to walk downstairs and spend HK$200 a day on delivery.", zh:"阿媽HK$100養四個人一日。你懶到唔落樓，日日外賣使HK$200。",
w:["Cook more, cap food delivery", "煮多啲，設外賣上限"], r:["Order delivery daily. Time's gold", "日日叫外賣，時間就係金錢"], trap:"spend",
tip:["Delivery fees and higher menu prices add up fast. HK$100 a day extra is over HK$36,000 a year.", "外賣運費加貴啲嘅餐牌價好快累積。每日多使HK$100，一年超過HK$36,000。"],
later:{w:["Six months later, {name} had mastered Mum's rice-cooker recipes (one button, very lazy-genius) and banked HK$15,000.", "半年後，{name}學識阿媽啲電飯煲餸，一個掣搞掂，啱晒懶人天才，仲儲到HK$15,000。"], r:["Twelve months of delivery cost {name} HK$36,000 extra, mostly on a card charging interest. The riders sent New Year wishes.", "一年落嚟，{name}外賣多使咗HK$36,000，大部分碌卡，而家要計息。啲車手仲同佢拜年。"]}},
{id:"c_sub_genius_r", st:3, who:"sub+genius", thumb:{w:"passbook", r:"sunglasses"}, tag:["Annuity, “tomorrow”", "年金「聽日先」"], en:"Never going back to 100 sq ft! An annuity could help pay rent each month, but comparing plans? “Tomorrow.”", zh:"你唔想再住返百呎劏房。年金可以每月幫你交租，但比較計劃？「聽日先」。",
w:["Compare annuity plans this week", "今個星期比較年金計劃"], r:["Leave it till tomorrow as usual", "照舊聽日先，拖多日又點"], trap:"delay",
tip:["An annuity turns a lump sum into steady monthly income. Compare terms, and decide while you have choices.", "年金可以將一筆錢變成每月穩定收入。比較清楚條款，趁仲有選擇就早啲決定。"],
later:{w:["By Friday, {name} had picked an annuity. Now it pays the rent each month, and the folding table finally has a living room.", "星期五前，{name}比較完三個年金揀咗一個，每月自動交租，張摺枱終於有個廳。"], r:["Three years of “tomorrow” later, rent had eaten HK$290,000 of {name}'s lump sum, so any annuity now pays less each month.", "又「聽日」咗三年，租金食咗{name}筆錢HK$290,000，而家先買年金，每月收入少好多。"]}},
{id:"c_sub_social_u", st:0, who:"sub+social", thumb:{w:"steamer", r:"bubbletea"}, tag:["Hall hotpot host", "宿舍打邊爐"], en:"You could never host friends in 100 sq ft. Now in hall, you throw a hotpot every week, and always pay.", zh:"百呎劏房從來請唔到朋友嚟。入咗宿舍，你每星期搞打邊爐，次次都你埋單。",
w:["Make it potluck: everyone shares", "改做每人帶一款菜分享"], r:["Pay again. Hosting is my thing", "照請客！我鍾意做主人家"], trap:"spend",
tip:["Generosity is lovely, but sharing costs makes it last. Potluck or splitting the bill keeps friends and money.", "大方係好事，但夾錢先搞得長。每人帶嘢或者AA制，朋友同荷包都保得住。"],
later:{w:["That spring, {name}'s potluck hotpot had a waiting list. {He} still hosted every week, just without paying for everyone.", "開春，{name}嘅「每人帶一樣」打邊爐要排隊入場。佢照做主人家，只係唔使一個人埋單。"], r:["Fourteen hotpots later, {name} could only make the minimum payment on {his} card. The hall gang called {him} a legend.", "請完十四餐，{name}張卡每月淨係還得起最低還款，舍堂班人仲叫佢傳奇。"]}},
{id:"c_sub_social_j", st:1, who:"sub+social", thumb:{w:"passbook", r:"hottip"}, tag:["Pyramid “opportunity”", "老鼠會「商機」"], en:"An old Sham Shui Po neighbour says your 800 friends are gold: pay HK$8,000 to join his scheme, then recruit.", zh:"深水埗舊街坊話你800個朋友係金礦：交HK$8,000入會再拉人。",
w:["Say no. Earning by recruiting is a red flag", "拒絕：靠拉人頭賺錢係警號"], r:["Join and blast it to every group chat", "入會，即刻喺所有群組宣傳"], trap:"scam",
tip:["If you earn mainly by recruiting people, not selling things, it's a pyramid scheme, and your friends lose too.", "主要靠拉人入會、唔係靠賣貨賺錢，就係老鼠會，最後連朋友都一齊蝕。"],
later:{w:["Eleven months later, the scheme collapsed, taking forty recruits' money with it. {name}'s 800 friends were still just friends.", "十一個月後，深水埗老鼠會爆煲，四十個下線血本無歸。{name}嗰800個朋友，仍然只係朋友。"], r:["Come autumn, the scheme collapsed: HK$8,000 gone, eleven friends' money too, and {name} quietly removed from thirty chats.", "秋風一起，老鼠會爆煲：{name}蝕咗HK$8,000，仲累埋十一個朋友，三十個群組靜靜踢走佢。"]}},
{id:"c_sub_social_f", st:2, who:"sub+social", thumb:{w:"calculator", r:"highheel"}, tag:["HOS flat application", "申請居屋"], en:"Your family rents a subdivided flat. The HOS form is due Friday, but you've 8 wedding banquets first. “After!”", zh:"一家住緊劏房，又撞正婚宴季要飲八場。居屋申請星期五截：「飲完先」。",
w:["Fill in the HOS form tonight", "今晚即刻填好張居屋表"], r:["Go after weddings, apply later", "飲完呢八場先，總有下輪"], trap:"delay",
tip:["Subsidised flat sales open in set rounds, with long waits. Missing a round can set your plans back a lot.", "資助房屋係分輪接受申請，輪候又耐。錯過一輪，置業計劃可能拖慢好多。"],
later:{w:["Eighteen months later, {name}'s HOS ballot came up. After eight banquets, the ninth party was in {his} own living room.", "一年半後，{name}抽中居屋。飲完八場婚宴，第九餐係自己嘅入伙飯，終於有個廳請人。"], r:["Eight banquets later, the HOS deadline had passed without {name}. The next round was a year away.", "八場飲完，居屋已經截咗，{name}趕唔切。下一輪要等成年，一家人繼續住劏房。"]}},
{id:"c_sub_gamer_u", st:0, who:"sub+gamer", thumb:{w:"piggybank", r:"smartphone"}, tag:["Limited gacha banner", "限定卡池"], en:"Your whole gaming den is a top bunk and a phone. A HK$1,600 limited gacha banner ends tonight.", zh:"你打機空間得碌架床上格同一部手機。HK$1,600限定卡池今晚完。",
w:["Skip it. Free-to-play is still fun", "唔抽，免費玩一樣開心"], r:["Top up HK$1,600 before midnight", "半夜前即刻課HK$1,600"], trap:"spend",
tip:["Countdown timers are built to rush you. Set a monthly game budget and stop when it's used up.", "倒數計時就係設計嚟催你。定好每月打機預算，用完就停。"],
later:{w:["Two months later, the “limited” character came back on a rerun. {name} pulled it free, and the HK$1,600 never left the bank.", "兩個月後，個「限定」角色復刻返嚟。{name}用儲落嘅免費石抽中，HK$1,600原封不動。"], r:["At 11:58pm, {name} put HK$1,600 on a credit card and pulled four duplicates. The bill arrived in March, with interest.", "11:58pm，{name}碌卡課咗HK$1,600，抽到四隻重複。三月張單寄到，連埋利息。"]}},
{id:"c_sub_gamer_j", st:1, who:"sub+gamer", thumb:{w:"piggybank", r:"controller"}, tag:["Saving for your own room", "儲錢搬出去"], en:"First job, still on the top bunk. Saving for your own room will start “after this game season ends”.", zh:"出咗糧，仍然瞓碌架床上格。儲錢租自己間房？「打完呢季先」。",
w:["Auto-save HK$3,000 each payday", "出糧自動儲HK$3,000"], r:["Wait till next season ends", "等下季打完先，下季一定"], trap:"delay",
tip:["There's always another season. A fixed transfer on payday saves for you while you play.", "遊戲永遠有下一季。出糧日自動轉賬，你打機嗰陣錢都會自己儲起。"],
later:{w:["Eighteen paydays later, {name} had HK$54,000 and {his} own room, with two sockets. The bunk below got the top bunk.", "自動轉賬十八個月，{name}儲到HK$54,000搬出去，間房有兩個插蘇！下格終於升上上格。"], r:["Three seasons later, {name} was Diamond rank with HK$0 saved. The bunk below moved out first, taking the good charger.", "打完三季，{name}升上鑽石，存款HK$0。下格反而搬咗出去先，仲帶埋個好叉電器。"]}},
{id:"c_sub_gamer_r", st:3, who:"sub+gamer", thumb:{w:"passbook", r:"controller"}, tag:["Fake payment screenshot", "假過數截圖"], en:"You saved for that console as a kid in the subdivided flat. Now a buyer sends a “paid HK$30,000” screenshot.", zh:"細個喺劏房儲錢買嘅遊戲機，買家傳嚟「已過HK$30,000」截圖。",
w:["Ship only once the money is in your bank", "錢真係入咗戶口先寄"], r:["Ship it now. The screenshot looks real", "截圖似真，即刻寄"], trap:"scam",
tip:["Payment screenshots are easy to fake. Check your own bank account before you hand anything over.", "過數截圖好易作假。自己上戶口睇清楚錢到咗，先好交貨。"],
later:{w:["Three days, zero deposits: the buyer had vanished. {name}'s console stayed home, with a socket all its own.", "三日後，{name}個戶口一蚊都冇入，買家消失。部機留低，而家仲有個插蘇專用。"], r:["Within days the console was gone, and the HK$30,000 had never existed. {name}'s police report noted the screenshot's typo.", "幾日之後，部機寄咗去，HK$30,000從來冇入過。{name}去報警，先發覺張截圖有錯字。"]}},
{id:"c_sub_artsy_u", st:0, who:"sub+artsy", thumb:{w:"piggybank", r:"camera"}, tag:["Film camera", "菲林相機"], en:"Sham Shui Po, where you grew up, sells used film cameras for HK$800. The new one's HK$8,000, and so pretty.", zh:"深水埗二手菲林機HK$800，新機HK$8,000，但新機真係好靚。",
w:["Buy the used camera with cash", "用現金買二手嗰部"], r:["Buy new on 12 instalments", "分十二期買新機，為藝術"], trap:"spend",
tip:["A pricier camera won't make your photos better. Buying used with cash keeps your hobby debt-free.", "貴相機唔會令相影得好啲。用現金買二手，興趣唔使變成債。"],
later:{w:["That summer, {name}'s HK$800 camera shot a Sham Shui Po series that sold as postcards. The profit bought film, and one latte.", "嗰個暑假，{name}用HK$800二手機影深水埗，印成明信片賣，賺到買菲林，仲飲咗杯拿鐵。"], r:["Four instalments in, {name} missed one: late fee, interest, a mark on the credit report. The photos looked exactly the same.", "供到第四期，{name}漏咗一期：遲交費、利息，信貸紀錄仲留咗污點。新機影出嚟其實一樣。"]}},
{id:"c_sub_artsy_j", st:1, who:"sub+artsy", thumb:{w:"passbook", r:"phishhook"}, tag:["Overpaid “by mistake”", "「唔小心」過多咗數"], en:"Your hand-painted signs for Sham Shui Po shops go viral. A new client “overpays” HK$5,000 and wants it back.", zh:"你幫深水埗老舖畫嘅招牌爆紅。新客「過多咗」HK$5,000要你退。",
w:["Wait till the bank confirms it cleared", "等銀行確認真係入咗數先"], r:["Refund it now. Be nice to clients", "即刻退，對客要好"], trap:"scam",
tip:["Overpay-and-refund is a classic scam: the first payment fails or is reversed later, and your refund is gone.", "「過多咗數叫你退」係經典騙案：佢嗰筆錢遲啲會無效，你退出去嘅就真係冇咗。"],
later:{w:["Two days later, the bank said the “overpayment” never cleared. {name} refunded nothing and painted a scam-warning sign.", "兩日後，銀行話嗰筆「多咗」嘅數根本冇過到。{name}一蚊冇退，仲幫隔籬舖畫咗個防騙招牌。"], r:["A week later the payment was reversed as fraud. {name}'s HK$5,000 refund was gone, and the bank froze {his} account.", "一星期後，客人嗰筆錢被當詐騙追回，{name}退出去嘅HK$5,000冇咗，戶口仲被凍結調查。"]}},
{id:"c_sub_artsy_f", st:2, who:"sub+artsy", thumb:{w:"calculator", r:"headphones"}, tag:["Family budget", "家庭預算"], en:"Mum budgeted for four on the back of a wall calendar. Your family has no budget: “When I feel inspired.”", zh:"阿媽喺月曆背面計四個人嘅數。你屋企冇預算：「有靈感先做」。",
w:["Make one tonight, even hand-drawn", "今晚即整，手繪都得"], r:["Wait until inspiration hits", "等靈感嚟到先開始整"], trap:"delay",
tip:["A budget doesn't need an app. Any plan you'll actually look at each month beats no plan at all.", "預算唔一定要用App。只要你每個月真係會睇，點樣做都好過冇。"],
later:{w:["That night {name} hand-drew a budget on the back of a wall calendar, like Mum. By December the corner read: HK$20,000 saved.", "當晚，{name}學阿媽喺月曆背面手繪預算。到十二月，角落嗰格寫住：已儲HK$20,000。"], r:["Inspiration struck in December, as {name} stared at a school-fee bill and an empty account. The calendar was blank on both sides.", "靈感終於喺十二月嚟到：{name}望住學費單同空空嘅戶口。本月曆兩面都係白紙。"]}},
{id:"c_sub_hustle_u", st:0, who:"sub+hustle", thumb:{w:"passbook", r:"sneaker"}, tag:["Cash in a biscuit tin", "曲奇罐收錢"], en:"Your resale flips made HK$9,000, all cash in a biscuit tin under the bunk bed. Bank it? “Later.”", zh:"轉手賺咗HK$9,000，現金塞喺碌架床底曲奇罐。入銀行？「遲啲」。",
w:["Bank it and log every sale", "存入銀行，每單記低"], r:["The tin's fine. Sort it out later", "放罐度得啦，遲啲先算"], trap:"delay",
tip:["Cash at home earns nothing and can go missing. Banking it and tracking sales shows what you really earn.", "現金放屋企冇利息，仲可能唔見。存入銀行、記低每單，先知自己真係賺幾多。"],
later:{w:["By graduation, {name}'s log proved the discount-hour dinner flips paid best, and HK$21,000 sat in the bank, not under a bunk.", "到畢業，{name}本數簿證明減價時段轉手飯盒最好賺，HK$21,000喺銀行，唔再喺床底。"], r:["Lunar New Year came, and Mum gave the auntie next door a biscuit tin. The wrong tin. {name} never learned how much was in it.", "年初二，阿媽送咗罐曲奇畀隔籬師奶。拎錯罐。{name}到而家都唔知入面有幾多錢。"]}},
{id:"c_sub_hustle_j", st:1, who:"sub+hustle", thumb:{w:"calculator", r:"smartphone"}, tag:["Cash-only phone deal", "現金平機"], en:"You know every Sham Shui Po bargain stall. Tonight a stranger offers 50 “genuine” used phones: HK$20,000 cash.", zh:"深水埗街頭有人今晚賣50部「正版」二手機，現金HK$20,000。",
w:["Walk away. No receipt, no deal", "唔買，冇單據唔做"], r:["Pay cash tonight and flip them for double", "今晚畀現金，轉手賺雙倍"], trap:"scam",
tip:["Cash-only, tonight-only deals are red flags. Fake or stolen goods can mean a total loss, or legal trouble.", "淨收現金、過咗今晚冇，都係警號。買到假貨或賊贓，可能血本無歸，仲惹官非。"],
later:{w:["A week later, police raided that stall for stolen phones. {name} read the news over a discount-hour lunchbox, HK$20,000 safe.", "一星期後，警察喺嗰個檔搜出賊贓手機。{name}食住減價飯盒睇新聞，HK$20,000安然無恙。"], r:["The next morning, {name} had 50 locked fakes, no receipt and no HK$20,000. A detective wanted to know where {he} got them.", "天光時，{name}手上得50部鎖死嘅假機，冇單據，HK$20,000冇晒，仲有探員上門問話。"]}},
{id:"c_sub_hustle_r", st:3, who:"sub+hustle", thumb:{w:"calculator", r:"sneaker"}, tag:["Third storage unit", "第三個迷你倉"], en:"No space as a kid, so now you keep everything: two storage units of “future collectibles”. Rent a third?", zh:"細個冇位，而家乜都留：兩個迷你倉塞滿「會升值」收藏，仲租第三個？",
w:["Sell some first, then decide", "放走一啲先，再諗"], r:["Rent it. They'll triple in value!", "租！實升三倍！"], trap:"spend",
tip:["Storage fees eat into any future profit. Collectibles only pay off when someone actually buys them.", "迷你倉租會蠶食將來嘅利潤。收藏品要真係有人買，先至係錢。"],
later:{w:["A month of selling later, {name} closed one storage unit, up HK$40,000. Some “future collectibles” had a future after all.", "放咗一個月，{name}退咗一個迷你倉，套現HK$40,000。原來有啲「會升值」嘅真係升咗。"], r:["Five years and HK$360,000 of storage rent later, {name}'s “future collectibles” still had no buyers. Only dust.", "五年後，{name}三個迷你倉交咗HK$360,000租，啲「會升值」收藏仍然冇人買，淨係有塵。"]}},
{id:"c_estate_grind_u", st:0, who:"estate+grind", thumb:{w:"textbooks", r:"hottip"}, tag:["“Guaranteed” internship", "「包」實習"], en:"Your floor chipped in HK$6,000 of lai see for uni. An agency sells a “guaranteed” internship for exactly that.", zh:"成層樓封咗HK$6,000利是賀你入大學。中介話收呢個數包實習。",
w:["Use uni careers office free", "去大學就業中心免費"], r:["Pay the fee for a guaranteed role", "照畀！包有實習喎！"], trap:"scam",
tip:["Real internships don't charge you to apply. Be wary of anyone selling a “guaranteed” placement.", "真正嘅實習唔會收你錢。有人收費「包」你有位，就要小心。"],
later:{w:["Summer brought {name} a paid internship from the careers centre, lai see untouched. The whole floor knew by lunch.", "放暑假前，{name}經就業中心搵到有薪實習，HK$6,000利是原封不動。午飯前成層樓知晒。"], r:["Eight weeks on, the agency had vanished with the HK$6,000 lai see. The floor knew before {name} finished the police report.", "兩個月後，中介執笠走人，HK$6,000利是冇晒。{name}未錄完口供，成層樓已經知晒。"]}},
{id:"c_estate_grind_j", st:1, who:"estate+grind", thumb:{w:"steamer", r:"handbag"}, tag:["Celebration dim sum", "慶祝飲茶"], en:"You passed your professional exam. The floor expects a party: 5 tables of dim sum, HK$12,000, on the card.", zh:"你考到專業試，成層樓等你請飲茶：五圍，HK$12,000，碌卡先。",
w:["One family table, cakes for all", "屋企人飲一圍，街坊派餅"], r:["Book 5 dim sum tables on card", "照碌卡訂五圍請成層"], trap:"spend",
tip:["Celebrate within your means. A party on a card can cost months of interest after the last dumpling.", "量入為出咁慶祝。碌卡請客，食完最後一粒點心，利息仲要還幾個月。"],
later:{w:["By 6pm, {name}'s cakes had reached every door. The card stayed clear, and the aunties upgraded {him} to “clever AND sensible”.", "六點前，{name}啲餅已經派到成層樓每家每戶，張卡乾乾淨淨，師奶話佢「又叻又識諗」。"], r:["Half a year on, {name} was still paying for the dim sum: HK$1,500 of interest so far, all for one night of siu mai.", "六個月後，{name}仲供緊嗰五圍飲茶，淨還最低還款，利息已多咗HK$1,500，為一晚燒賣。"]}},
{id:"c_estate_grind_f", st:2, who:"estate+grind", thumb:{w:"piggybank", r:"calculator"}, tag:["Kid's education fund", "子女教育基金"], en:"Baby's 6 months old and the whole floor already asks about her uni. Her education fund? “After this project.”", zh:"BB先六個月，成層樓已經問佢入邊間大學。教育基金？「做完個項目先」。",
w:["Start a small monthly fund now", "而家開始每月儲少少"], r:["After this project. And the next one", "做完呢個項目先，再下個"], trap:"delay",
tip:["Time does the heavy lifting in long-term saving. A small sum started early can beat a big sum started late.", "長線儲蓄靠時間幫手。早啲開始儲少少，可能好過遲啲先儲大筆。"],
later:{w:["Eighteen years on, the floor heard of {name}'s daughter's uni offer by dinner. The little monthly fund covered the fees.", "十八年後，{name}個女收到大學取錄，晚飯前成層樓知晒。嗰筆每月少少嘅基金，已經夠交學費。"], r:["The baby turned 12 and the floor asked about uni again. {name} was still “after this project”, 12 years of compounding gone.", "BB十二歲，成層樓又問入邊間大學。{name}仲係「做完呢個項目先」，十二年複息就噉冇咗。"]}},
{id:"c_estate_genius_u", st:0, who:"estate+genius", thumb:{w:"textbooks", r:"controller"}, tag:["SFO form, “tomorrow”", "學資表「聽日先」"], en:"Every kid on your floor has sent their SFO form. Yours still needs family income proof. “Tomorrow,” you say.", zh:"成層樓啲細路都交咗學資表，你嗰份仲欠全家入息證明。你話「聽日先」。",
w:["Sort the papers with Mum tonight", "今晚同阿媽執齊文件"], r:["Tomorrow. I work best under pressure", "聽日先，我有壓力先發揮到"], trap:"delay",
tip:["Student finance has deadlines. Late or missing papers can delay your grant, or cost you it.", "學生資助有截止日期。遲交或者漏文件，資助可能延遲甚至冇份。"],
later:{w:["By midnight, {name} and Mum had every paper in a folder. The grant came before the fees, and Mum slept before 3am for once.", "午夜前，{name}同阿媽執齊晒文件。資助早過學費到，阿媽終於唔使凌晨三點先瞓。"], r:["“Tomorrow” came a week after the deadline. The floor got grants by October; {name} got a rejection letter and a night shift.", "{name}嘅「聽日」，去到截止日後一星期先嚟。成層樓十月前收到資助，佢就收到封拒絕信。"]}},
{id:"c_estate_genius_j", st:1, who:"estate+genius", thumb:{w:"passbook", r:"phishhook"}, tag:["“Account frozen” SMS", "「戶口凍結」短訊"], en:"Mum and half the floor got a text: “Account frozen, tap to verify.” They all send it to you, the estate brain.", zh:"阿媽同半層樓收到短訊：「戶口凍結，撳連結核實」，全部轉畀你呢個天才。",
w:["Tell them to call the bank's hotline", "叫佢哋自己打銀行熱線"], r:["Tap it, log in, fix it in two seconds", "撳入去登入，兩秒搞掂"], trap:"scam",
tip:["Don't log in through links in texts or emails. Use the bank's own app or the number on the back of your card.", "唔好經短訊或電郵連結登入。用銀行自己嘅App，或者打卡背面嘅電話。"],
later:{w:["Before dinner, {name} had taped the bank's real hotline number inside the lift. Not one auntie on the floor lost a cent.", "晚飯前，{name}已經將銀行真熱線貼喺升降機入面。成層樓一個師奶都冇蝕過一蚊。"], r:["Overnight, Mum and two neighbours lost HK$48,000. {name}, the estate brain, spent the next day at the police station.", "一夜之間，阿媽同兩個街坊冇咗HK$48,000。屋邨神童{name}第二日要陪佢哋喺差館坐成日。"]}},
{id:"c_estate_genius_r", st:3, who:"estate+genius", thumb:{w:"piggybank", r:"textbooks"}, tag:["Grandson's tutoring", "孫仔補習費"], en:"The floor says your grandson's “a genius, like you”. You want to prepay 3 years of elite tutoring: HK$120,000.", zh:"成層樓話孫仔「似足你咁叻」，你想預繳三年補習HK$120,000。",
w:["Help a bit each month, within budget", "按預算每月幫少少"], r:["Prepay 3 years from your nest egg", "用退休錢一次過預繳"], trap:"spend",
tip:["Retirement savings must last decades. Give what your budget allows, and avoid big prepayments to any centre.", "退休錢要用幾十年。量力而為咁幫，都唔好一次過預繳大筆學費。"],
later:{w:["Five years on, {name}'s monthly help still fit the budget, the nest egg held, and the grandson revised at 3am. Like {name}.", "五年後，{name}每月幫少少，退休錢照穩陣。孫仔照樣凌晨三點先溫書，真係似足佢。"], r:["A year in, the tutoring centre closed overnight, and HK$80,000 of {name}'s prepaid nest egg vanished with it.", "一年後，補習中心一夜執笠，{name}由退休錢預繳嘅HK$80,000，跟住一齊冇咗。"]}},
{id:"c_estate_social_u", st:0, who:"estate+social", thumb:{w:"calculator", r:"smartphone"}, tag:["Group-trip treasurer", "夾錢旅行財政"], en:"The estate WhatsApp group makes you treasurer: HK$24,000 for a 20-person trip, in your account. Log it? Later.", zh:"屋邨群組揀你做旅行財政，HK$24,000喺你戶口。記數？「遲啲」。",
w:["Track every spend in a sheet", "開共享表逐筆記低"], r:["Keep it in my head, sort later", "我記得晒，遲啲先整"], trap:"delay",
tip:["Group money mixed with yours is how friendships end. Record every dollar in and out from day one.", "團體錢同自己錢溝埋，最易搞到反面。由第一日起，每筆出入都要記低。"],
later:{w:["Check-in day: {name}'s shared sheet settled three “I paid already!” rows in thirty seconds. The estate mayor stayed in office.", "到機場登記，{name}張共享表三十秒內平息咗三單「我畀咗喇！」，人肉邨長繼續連任。"], r:["Days before take-off, HK$1,800 was missing and nobody agreed who'd paid. {name} covered it; a new chat formed without {him}.", "出發前一星期，數少咗HK$1,800冇人認。{name}自己填數，之後有個新群組冇加佢。"]}},
{id:"c_estate_social_j", st:1, who:"estate+social", thumb:{w:"calculator", r:"handbag"}, tag:["Neighbours' insurance plans", "街坊仔女賣保險"], en:"Three kids on your floor became insurance agents. Each wants you on a HK$2,000-a-month plan. You can't say no.", zh:"同層三個街坊仔女做保險，個個想你月供HK$2,000。你唔識拒絕。",
w:["Compare, then buy only what you need", "比較過，只買自己需要嘅"], r:["Sign all three. Can't upset the floor!", "三份都簽，唔好得罪街坊"], trap:"spend",
tip:["Buy insurance for your needs, not to please friends. Savings plans lock you in; quitting early can lose money.", "買保險係為自己需要，唔係為咗畀面。儲蓄保險要供好耐，提早退保可能蝕錢。"],
later:{w:["After a month of comparing, {name} bought just the one plan {he} needed. All three agents still wave in the lift.", "比較咗一個月，{name}只買咗一份啱用嘅。三個街坊仔女喺電梯照打招呼，仲讚佢精。"], r:["In year two, HK$6,000 a month was crushing {name}. {He} quit one plan early and got back far less than {he} had paid in.", "第二年，每月HK$6,000壓到{name}透唔到氣。佢提早退咗一份，拎返嘅錢遠少過供咗落去嘅。"]}},
{id:"c_estate_social_f", st:2, who:"estate+social", thumb:{w:"passbook", r:"freegift"}, tag:["Half-price park tickets", "半價樂園門票"], en:"You plan a kids' day out for six estate families. Someone in the chat sells 20 theme-park tickets, half price.", zh:"你幫六個屋邨家庭搞親子日。群組有人賣20張半價樂園門票，要你先過數。",
w:["Buy from official sellers only", "只喺官方正式渠道買"], r:["Transfer now. Half price for 20!", "即刻過數，二十張半價！"], trap:"scam",
tip:["Cheap tickets from strangers are a common online scam. Buy from official sellers and check payees on Scameter.", "陌生人賣平飛係常見網購騙案。去官方渠道買，過數前用防騙視伏器查吓。"],
later:{w:["On the day, six families walked in on official tickets. Days later the chat seller was flagged on Scameter; {name} pinned it.", "正日，六個家庭用官方門票順利入場。幾日後嗰個賣家喺防騙視伏器被標記，{name}即刻置頂。"], r:["That Sunday, none of the 20 QR codes would scan. {name} called the police, then paid for real tickets out of {his} own pocket.", "嗰個星期日，20張二維碼一張都過唔到。{name}報咗警，再自己掏腰包幫六個家庭買過真飛。"]}},
{id:"c_estate_gamer_u", st:0, who:"estate+gamer", thumb:{w:"piggybank", r:"controller"}, tag:["Battle passes for the floor", "請全層細路課金"], en:"The kids on your floor call you “Pro”. All nine of them want you to buy them the HK$98 battle pass.", zh:"同層啲細路叫你「大神」，個個都想你請佢哋買HK$98季票。總共九個。",
w:["Teach them free tricks instead", "教佢哋免費技巧就夠"], r:["Buy nine. A legend never says no", "買九張，大神唔會講唔得"], trap:"spend",
tip:["Small treats add up: HK$98 × 9 is HK$882. Decide what you can afford before you say yes.", "細數會疊大數：HK$98乘9就係HK$882。應承之前，先諗清楚自己負擔唔負擔到。"],
later:{w:["By Christmas, all nine kids beat {name} with the free tricks {he} taught them. The HK$882 stayed put; the title “Pro” did not.", "到聖誕，九個細路用{name}教嘅免費技巧打贏晒佢。HK$882保住咗，「大神」個名就保唔住。"], r:["All nine came back next season, and the next. By season four, {name} owed HK$3,528 in battle passes, plus card interest.", "下一季，九個細路又嚟搵{name}。四季後已經課咗HK$3,528，大部分碌卡，仲要計息。"]}},
{id:"c_estate_gamer_j", st:1, who:"estate+gamer", thumb:{w:"passbook", r:"controller"}, tag:["Pay-to-start game tester", "要先畀錢嘅試玩工"], en:"Mum wants her share of your pay. A “game tester” gig pays HK$800 a day, once you buy HK$3,000 of “credits”.", zh:"阿媽等家用。「試玩員」日薪HK$800，要先買HK$3,000點數。",
w:["Walk away. Real jobs pay you", "唔做，真工係人哋畀錢你"], r:["Pay HK$3,000 to start earning", "畀HK$3,000開工賺錢"], trap:"scam",
tip:["If a job makes you pay first, it's a scam. Task scams give small wins, then ask for bigger “deposits”.", "要你先畀錢嘅工作就係騙局。任務騙案會先畀啲甜頭，再要你畀更多「按金」。"],
later:{w:["On payday, Mum's share arrived in full. Weeks later the “tester” gig was on the news as a scam; {name} celebrated at the arcade.", "出糧日，阿媽收足家用。幾星期後「試玩員」上咗新聞，原來係騙案，{name}去機舖慶祝。"], r:["A fortnight in, {name} saw HK$800 of “earnings” and paid a HK$10,000 “deposit” to cash out. All gone, and Mum's share came late.", "兩星期後，{name}為提HK$800「收入」再過HK$10,000按金，全冇晒，家用遲交。"]}},
{id:"c_estate_gamer_r", st:3, who:"estate+gamer", thumb:{w:"calculator", r:"controller"}, tag:["Savings “HP bar”", "儲蓄「血條」"], en:"The estate elderly centre runs a free budget class. You skip it: savings are an HP bar, check when it's red.", zh:"屋邨長者中心有免費理財班，你照打機：儲蓄好似血條，變紅先睇。",
w:["Join class and set a budget", "去上堂，定好每月預算"], r:["Skip it and check when it's red", "唔去，變紅先算"], trap:"delay",
tip:["Retirement has no respawn. A monthly budget shows how long your savings will last, before it's too late.", "退休冇得復活重來。定好每月預算，先知積蓄夠用幾耐，唔會太遲先發覺。"],
later:{w:["After the class, {name} knew the savings would last to 92 on budget. {He} still yells “one more round”, just with a plan.", "上完堂，{name}計清楚：照預算用，積蓄夠撐到92歲。佢照喺機舖喊「再嚟一鋪」，不過有計劃。"], r:["At 78, the bar finally flashed red. {name} checked: three years of savings left, maybe twenty years to go, and no respawn button.", "78歲，血條終於閃紅。{name}一睇：積蓄得返三年，人生可能仲有廿年，冇得復活。"]}},
{id:"c_estate_artsy_u", st:0, who:"estate+artsy", thumb:{w:"passbook", r:"freegift"}, tag:["Photo licence “fee”", "授權「手續費」"], en:"Your film shots of your colourful estate go viral. A “magazine” will use them if you pay a HK$1,500 “fee”.", zh:"你影屋邨嘅菲林相爆紅。「雜誌」想用，要你先交HK$1,500手續費。",
w:["Refuse. Buyers pay you, not the reverse", "拒絕：買家畀錢你先啱"], r:["Pay it. My work in a magazine!", "畀！我啲相上雜誌喎！"], trap:"scam",
tip:["Real buyers pay you, not the other way round. An upfront “fee” to get paid is a classic scam.", "真買家係畀錢你，唔係倒轉。要你先交「手續費」先收到錢，係經典騙局。"],
later:{w:["Weeks later, a real editor paid {name} HK$2,000 for one shot. The estate still charges no entry fee, but {name}'s prints now do.", "四星期後，真編輯出HK$2,000用{name}一張相。屋邨照冇收入場費，但佢啲相就收錢。"], r:["After the HK$1,500 came a HK$3,000 “printing fee”. {name} called the police: the money was gone, and the magazine never existed.", "交完HK$1,500，又要HK$3,000印刷費。{name}報警先知，本雜誌根本唔存在。"]}},
{id:"c_estate_artsy_j", st:1, who:"estate+artsy", thumb:{w:"lemontea", r:"bubbletea"}, tag:["Daily oat latte", "日日燕麥拿鐵"], en:"The cha chaan teng under your block: milk tea, HK$18. You walk 20 minutes for a HK$58 oat latte. Daily.", zh:"樓下屋邨茶餐廳奶茶HK$18。你日日行20分鐘飲HK$58燕麥拿鐵。",
w:["Café weekly, milk tea daily", "週去一次，其餘飲奶茶"], r:["Get a daily latte for my vibe", "日日買拿鐵，呢個係我風格"], trap:"spend",
tip:["Small daily habits add up: HK$40 extra a day is over HK$14,000 a year.", "日日嘅小習慣會累積：每日多使HK$40，一年就超過HK$14,000。"],
later:{w:["A year on, milk tea six days a week had saved {name} HK$12,000. Sunday's latte tasted better; the tea auntie disagreed.", "一年後，{name}平日飲奶茶，慳咗HK$12,000。星期日杯拿鐵特別香，茶記姐姐唔同意。"], r:["Daily lattes cost {name} HK$14,000 extra that year, on a card paid at the minimum. Tourists queued for the milk tea downstairs.", "一年日日拿鐵，{name}多使咗HK$14,000，碌卡淨還最低還款。遊客就喺樓下茶記打卡。"]}},
{id:"c_estate_artsy_f", st:2, who:"estate+artsy", thumb:{w:"piggybank", r:"camera"}, tag:["Freelance, no MPF top-up", "自僱冇僱主供款"], en:"You go freelance to mind the kid. The floor says “no proper job”. No boss tops up your MPF. Saving? Later.", zh:"你轉做自由身湊仔，成層樓話你冇正經工。冇老細供強積金，儲錢？遲啲。",
w:["Save a fixed share each job", "每單收入固定儲一份"], r:["Start saving when work is steady", "等工作穩定啲先儲"], trap:"delay",
tip:["Freelancers get no employer MPF top-up, so saving a fixed share of every payment matters even more.", "自由工作者冇僱主幫手供強積金，每次收錢固定儲起一部分就更加重要。"],
later:{w:["Ten years on, saving 10% of every job had given {name} HK$300,000. The floor stopped saying “no proper job” and asked for tips.", "十年後，{name}每單儲一成，儲到HK$300,000。成層樓唔再話佢冇正經工，仲問佢點儲。"], r:["Fifty came for {name}: a thin MPF account, no savings beside it, work still unsteady. Lost compounding can't be backdated.", "50歲，{name}得一個好薄嘅強積金戶口，旁邊冇任何儲蓄。工作從冇穩定過，蝕咗嘅複息追唔返。"]}},
{id:"c_estate_hustle_u", st:0, who:"estate+hustle", thumb:{w:"calculator", r:"freegift"}, tag:["Durian group-buy supplier", "榴槤團購"], en:"You run the estate fruit group buy. A new online “farm” offers half-price durians: 200 boxes, paid upfront.", zh:"你搞屋邨水果團購。網上新「果園」半價賣榴槤，200盒要全數先付。",
w:["Test with a small order first", "先落少量貨試吓水溫"], r:["Pay for all 200 boxes today!", "即刻全數訂晒二百盒！"], trap:"scam",
tip:["New online sellers who want full prepayment on big orders are a classic scam. Start small and check Scameter.", "新網店要你大單全數預付，係經典騙局。先小量試，過數前上防騙視伏器查吓。"],
later:{w:["Within a week, the “farm” had vanished with {name}'s HK$150 test order, not HK$30,000. The lift pitch now includes a scam tip.", "冇幾耐「果園」就人間蒸發，{name}只蝕咗HK$150試單。電梯推銷從此加句：小心騙案。"], r:["Two weeks later: no durians, no “farm”, and HK$30,000 gone. {name} refunded the neighbours from {his} own savings, door by door.", "兩星期後，榴槤冇、「果園」冇，HK$30,000都冇。{name}用自己積蓄逐家逐戶退錢畀街坊。"]}},
{id:"c_estate_hustle_j", st:1, who:"estate+hustle", thumb:{w:"transitcard", r:"sunglasses"}, tag:["Car lease to impress", "租車撐場面"], en:"The floor watches who “made it”. Your side hustle is booming, so you eye a HK$8,000-a-month car lease.", zh:"成層樓睇住邊個「發達」。副業旺，你想月供HK$8,000租車撐場。",
w:["Ride the MTR, reinvest the profit", "照搭港鐵，利潤再投資"], r:["Lease it. Let the floor see", "租！等成層樓睇吓"], trap:"spend",
tip:["A car costs far more than its monthly payment: parking, fuel, insurance. Looking rich isn't being rich.", "養車唔止月供，仲有泊車、油費、保險。扮有錢唔等於有錢。"],
later:{w:["Three years on, reinvested profit made {name}'s side hustle a real company. {He} still takes the MTR, now to {his} own office.", "三年後，{name}將利潤再投資，副業變咗真公司。佢照搭港鐵，不過係返自己間寫字樓。"], r:["Six months in, parking, fuel and insurance had added HK$5,000 a month. The floor saw {name}'s car; nobody saw the card debt.", "半年後，泊車油費保險每月再加HK$5,000。成層樓見到{name}架車，冇人見到卡數。"]}},
{id:"c_estate_hustle_r", st:3, who:"estate+hustle", thumb:{w:"passbook", r:"hottip"}, tag:["Enduring power of attorney", "持久授權書"], en:"The whole floor knows your six side businesses, but your kids don't. Who runs it all if you fall ill? “Later.”", zh:"成層樓都知你有六盤生意，但仔女唔知。你病咗邊個打理？「遲啲先」。",
w:["Set up an enduring power of attorney", "立持久授權書"], r:["Later. I'm still sharp as ever", "遲啲先，我仲好醒"], trap:"delay",
tip:["An enduring power of attorney lets someone you trust run your money if you can't. Make it while you're sharp.", "持久授權書等你信任嘅人喺你冇能力時打理財產，要趁頭腦清醒時訂立。"],
later:{w:["A fall at 76 put {name} in hospital. The power of attorney was signed, so the kids ran all six businesses within the week.", "76歲，{name}跌親入院。有持久授權書，仔女一星期內接手晒六盤生意，連電梯推銷都冇停。"], r:["At 80, {name} fell ill with no power of attorney. The kids had to go to court just to pay the rent; two businesses folded.", "80歲，{name}病倒，冇立授權書。仔女要入稟法庭先郁到戶口交租，期間兩盤生意已經執咗。"]}},
{id:"c_mid_grind_u", st:0, who:"mid+grind", thumb:{w:"textbooks", r:"hottip"}, tag:["Guaranteed-offer agent", "包入名校中介"], en:"Your parents paid for summer school abroad. An agent says HK$30,000 more “guarantees” a top master's offer.", zh:"外國暑期班爸媽畀咗錢，中介話加HK$30,000「包」你入名校碩士。",
w:["Apply via uni careers office", "自己報，問大學就業處"], r:["Pay up now. Mum wants it certain", "照畀，阿媽要穩陣"], trap:"scam",
tip:["No agent can guarantee an offer. Check any claim with the university itself before you pay.", "冇中介可以「包」你入大學。畀錢之前，直接問大學查證。"],
later:{w:["By March, {name} had a real offer via the careers office's free CV check. Mum ticked the KPI box, HK$30,000 under budget.", "三月，{name}靠就業處免費改CV攞到offer。阿媽剔咗KPI，仲慳返HK$30,000。"], r:["Within a week the agent vanished with the HK$30,000. {name} spent reading week at the police station instead of the library.", "一星期後，中介連HK$30,000一齊消失。{name}溫書周唔喺圖書館，喺差館落口供。"]}},
{id:"c_mid_grind_j", st:1, who:"mid+grind", thumb:{w:"calculator"}, tag:["First tax return", "第一張報稅表"], en:"Mum filled in every form of your life. Now your first tax return arrives, and you work till midnight daily.", zh:"由細到大啲表格都係阿媽填，而家第一張報稅表嚟咗，你日日OT到半夜。",
w:["File on time, save monthly for tax", "準時報稅，月留交稅錢"], r:["Worry when the tax bill comes", "張稅單寄到嚟先慢慢算"], trap:"delay",
tip:["Your first tax bill may include next year's provisional tax too. Put a little aside every payday.", "第一張稅單可能連埋下年暫繳稅。每次出糧預留少少，就唔使驚。"],
later:{w:["Months later the tax bill landed, provisional tax stacked on. {name} paid it from {his} payday pot, then slept eight hours.", "稅單連埋暫繳稅一齊到，{name}用每月預留嘅稅錢即刻交晒，當晚難得瞓足八粒鐘。"], r:["That winter the bill hit: two months' pay, provisional tax included. {name} took a tax loan, so now {he} pays interest to pay tax.", "年尾稅單一到，連暫繳稅差唔多兩個月人工。{name}要借稅貸，為咗交稅仲要俾利息。"]}},
{id:"c_mid_grind_f", st:2, who:"mid+grind", thumb:{w:"piggybank"}, tag:["Kindergarten interview class", "幼稚園面試班"], en:"Your toddler isn't 3 yet, and you're booking HK$9,000 a month of interview classes for a famous kindergarten.", zh:"BB未夠三歲，你已經想報HK$9,000一個月嘅名校幼稚園面試班。",
w:["Pick one class that fits the budget", "揀一個班，唔好超預算"], r:["Book them all. Everyone else is", "全部報晒，人有我有"], trap:"spend",
tip:["Kids' classes can cost like a second mortgage. Set a yearly cap and save for their education first.", "興趣班加埋好似供多層樓。定個全年上限，先儲教育基金。"],
later:{w:["By three, {name}'s toddler had done one class, not six: no Mum's KPI 2.0 here. The savings went to an education fund.", "BB三歲前，{name}只報咗一個班，講明唔要BB做「阿媽KPI 2.0」，餘錢全入教育基金。"], r:["Six classes later, {name} paid the card's minimum monthly. At the interview, the three-year-old said only: “Trains!”", "報到六個班，{name}張卡月月淨係還到最低還款額。面試嗰日，三歲BB淨係講：「火車！」"]}},
{id:"c_mid_genius_u", st:0, who:"mid+genius", thumb:{w:"piggybank", r:"camera"}, tag:["Star-tutor fee scam", "補習天王騙局"], en:"You skipped Mum's tutorials yet got top grades. A centre wants you in its ads, after a HK$3,000 photo fee.", zh:"補習冇上都攞5**，補習社請你影廣告，先收HK$3,000影相費。",
w:["Say no. Real jobs don't charge", "唔做，真工唔會收錢"], r:["Pay it so Mum sees the poster", "照畀，阿媽見海報實開心"], trap:"scam",
tip:["A real employer won't make you pay to start work. Upfront “fees” for a job are a classic scam sign.", "真僱主唔會要你畀錢先開工。搵工要先交「費用」，好大機會係騙局。"],
later:{w:["No poster ever went up, but {name} kept the HK$3,000: the nearest thing to a tuition refund Mum ever got.", "海報冇得掛，但{name}保住咗HK$3,000，係阿媽嗰堆補習費最似「退款」嘅一次。"], r:["Two days on, the “photographer” had the HK$3,000 and had blocked {name}. Mum's only poster: the police's anti-scam one.", "「攝影師」收咗HK$3,000就block咗{name}。阿媽最後見到嘅海報，係差館張防騙海報。"]}},
{id:"c_mid_genius_j", st:1, who:"mid+genius", thumb:{w:"passbook"}, tag:["Savings plan handover", "接手儲蓄保單"], en:"Your parents hand over the savings plan they've paid since your birth. The premium is now yours, due Friday.", zh:"爸媽由你出世供到而家嘅儲蓄保單，交返畀你自己供，星期五到期。",
w:["Set autopay for premium today", "今日設自動轉賬交保費"], r:["Do it tomorrow. Friday's ages away", "聽日先搞，星期五仲早"], trap:"delay",
tip:["Missed premiums can make a policy lapse, and cancelling early often returns less than was paid in.", "斷供可以令保單失效；提早退保，攞返嘅錢通常少過供咗嘅。"],
later:{w:["That afternoon, {name} set up autopay in five minutes, then forgot it for years: the one time {his} forgetfulness paid.", "當日下晝，{name}五分鐘設好自動轉賬，之後十幾年都唔記得咗。人生第一次，唔記得反而啱。"], r:["Six weeks on, the policy had lapsed. {name}, who never missed an exam, missed the one deadline Mum spent 24 years on.", "六星期後，保單失效通知寄到。{name}考試從未失手，偏偏甩咗阿媽供咗廿四年嘅死線。"]}},
{id:"c_mid_genius_r", st:3, who:"mid+genius", thumb:{w:"calculator"}, tag:["Gifted grandkid's camp", "孫兒資優營"], en:"Your grandkid aces tests without studying, like you. Your child asks you to fund a HK$120,000 gifted camp.", zh:"孫兒唔溫書都考第一，似你！仔女叫你出HK$120,000去資優營。",
w:["Give a set gift you can afford", "畀一份負擔得起嘅心意"], r:["Pay it all from your retirement savings", "用退休儲蓄全數照畀"], trap:"spend",
tip:["Helping family is kind, but retirement money must last many years. Set a yearly gift budget first.", "幫屋企人係好事，但退休錢要用好多年。先定好每年送禮預算。"],
later:{w:["At 68, {name} sent HK$15,000 and a card that read “Genes did the rest.” The retirement savings didn't even blink.", "68歲嘅{name}畀咗HK$15,000，心意卡寫住：「其餘靠遺傳。」退休錢眼都唔眨。"], r:["Camp went brilliantly; the grandkid learned to code. By 75, {name}'s savings ran thin, so the kid built {him} a budgeting app.", "HK$120,000畀晒，孫仔學識寫程式；75歲{name}錢唔夠使，孫仔幫佢寫咗個記帳app。"]}},
{id:"c_mid_social_u", st:0, who:"mid+social", thumb:{w:"piggybank", r:"freegift"}, tag:["23 birthday gifts", "生日禮物"], en:"Friends from ten tutorial centres, plus hall and O'Camp: 23 birthdays this term, at HK$300 a gift.", zh:"補習社、宿舍、O'Camp朋友今學期23個生日，每份禮HK$300。",
w:["Join group gifts and set a gift budget", "夾份送禮，定個禮物預算"], r:["Buy each one a gift. Friendship first!", "個個都送，友誼第一！"], trap:"spend",
tip:["Gifts add up fast: 23 × HK$300 is HK$6,900. Group gifts and a set budget keep both friends and savings.", "23份 × HK$300 = HK$6,900。夾份送、定預算，朋友同荷包都保得住。"],
later:{w:["For once, {name}'s allowance made it to the 30th. Running 23 group gifts also made {him} the most thanked person on campus.", "學期尾，{name}搞掂23份夾份禮物，零用錢第一次撐到30號，仲成為全校最多人多謝嘅人。"], r:["Gifts 15 to 23 went on a credit card. {name} was still paying the minimum when next term's birthdays began.", "第15至23份禮物全部碌卡。下學期生日季又嚟，{name}仲係月月還緊最低還款額。"]}},
{id:"c_mid_social_j", st:1, who:"mid+social", thumb:{w:"passbook", r:"freegift"}, tag:["Pyramid scheme pitch", "層壓式推銷"], en:"At your parents' clubhouse BBQ, a “mentor” eyes your 50 chats: pay HK$20,000 to join, earn by recruiting.", zh:"會所燒烤有「導師」睇中你啲群組：交HK$20,000入會，拉人賺錢。",
w:["Walk away and warn your group chats", "唔參加，仲提醒群組朋友"], r:["Join and invite all 50 group chats", "即刻入會，拉晒50個群組"], trap:"scam",
tip:["If you earn mainly by recruiting people, it's a pyramid scheme. These are illegal in Hong Kong.", "主要靠拉人入會賺錢，就係層壓式推銷，喺香港係違法㗎。"],
later:{w:["Before the sausages burned, {name} had warned 50 chats. By New Year, police were after the “mentor”, and the chats sent hearts.", "香腸未燒燶，{name}已經喺50個群組出警告。到新年，警方搵緊個「導師」，群組send晒心心。"], r:["Half a year later, the HK$20,000 was gone, three recruits had lost money too, and {name} was quietly dropped from 30 chats.", "半年後，HK$20,000冇晒，拉入會嘅三個朋友都蝕埋，{name}靜靜雞俾30個群組踢走。"]}},
{id:"c_mid_social_f", st:2, who:"mid+social", thumb:{w:"steamer"}, tag:["Parents' care plan", "爸媽養老計劃"], en:"Mortgage paid off, your parents want a family talk on old-age care costs. Your weekends are full till March.", zh:"爸媽終於供完樓，想開家庭會議傾養老開支，但你週末聚會排滿到三月。",
w:["Skip one party and hold the talk", "推一個局，同爸媽傾清楚"], r:["After party season. There's time", "等聚會季過咗先傾"], trap:"delay",
tip:["Talk about parents' care costs early, while there's time to choose. Rushed choices in a crisis cost more.", "早啲同爸媽傾養老開支，大家仲有得揀；臨急臨忙決定，通常貴好多。"],
later:{w:["Skipping one hotpot bought a Sunday with Mum, Dad and a spreadsheet. When Dad's knee gave out in May, {name}'s plan was ready.", "推咗一餐打邊爐，{name}星期日同爸媽對住張Excel傾。五月阿爸膝頭出事，計劃早已就緒。"], r:["Dad slipped in February. {name} picked a care home in 48 hours from a hospital corridor, at a rush price nobody had budgeted for.", "二月阿爸跌親，{name}喺醫院走廊兩日內揀定老人院，價錢冇人預算過，聚會季提早完場。"]}},
{id:"c_mid_gamer_u", st:0, who:"mid+gamer", thumb:{r:"phishhook"}, tag:["Rank-boost login", "代打要密碼"], en:"A “rank booster” will carry you to Diamond for HK$600. He needs your login, the one with Mum's card saved.", zh:"有人HK$600幫你代打上鑽石，只要你個帳號密碼，入面存咗阿媽張卡。",
w:["Refuse, remove Mum's card", "拒絕，刪走阿媽張卡"], r:["Send the login. Diamond by Friday!", "畀密碼佢，星期五上鑽石！"], trap:"scam",
tip:["Never share logins. Scammers take over accounts and spend on saved cards. Turn on two-step login.", "唔好將密碼畀人，騙徒可以盜帳號、碌你存咗嘅卡。記得開雙重認證。"],
later:{w:["Still in Gold, {name} deleted Mum's card and set up two-step login. A hall mate who shared a login was hacked by Friday.", "繼續卡喺黃金，{name}刪咗阿媽張卡，開咗雙重認證。有宿友畀咗密碼，星期五帳號就冇咗。"], r:["By Friday {name} was locked out. The only diamonds were the HK$8,000 of gems the hacker bought on Mum's saved card.", "星期五{name}已經登入唔到，唯一嘅「鑽石」，係騙徒用阿媽張卡課嘅HK$8,000寶石。"]}},
{id:"c_mid_gamer_j", st:1, who:"mid+gamer", thumb:{w:"piggybank", r:"controller"}, tag:["Home deposit fund", "儲首期"], en:"You live at home rent-free and your pay goes on games. Dad asks when you'll start saving for your own flat.", zh:"住屋企唔使租，人工全部用喺打機。阿爸問你幾時開始儲首期。",
w:["Auto-save for a home monthly", "開首期戶口每月自動儲"], r:["Wait until this battle pass ends", "打完呢季戰令先算"], trap:"delay",
tip:["Living at home is the best time to save fast. A home deposit takes years, so starting early matters most.", "唔使交租嘅時候係儲錢最快嘅時機。儲首期要好多年，越早開始越好。"],
later:{w:["Five years of auto-saving later, {name} moved out, deposit paid. Within a week Dad turned the gaming room into a karaoke den.", "自動儲咗五年，{name}儲夠首期搬出去。唔夠一個星期，阿爸已經將佢間機房改做K房。"], r:["Twelve battle passes later, {name} owned every legendary skin and no deposit. Dad's mortgage was ending; {his} savings never began.", "十二季戰令之後，{name}皮膚收集晒，首期一蚊都冇。阿爸層樓就供完，佢就未開始儲。"]}},
{id:"c_mid_gamer_r", st:3, who:"mid+gamer", thumb:{w:"piggybank", r:"controller"}, tag:["Mortgage-free splurge", "供完樓慶祝"], en:"The flat is finally paid off! To celebrate, you want a HK$60,000 retro console collection on card instalments.", zh:"層樓終於供完！你想碌卡分期買HK$60,000嘅懷舊遊戲機全套慶祝。",
w:["Pick one classic console and pay cash", "揀一部經典機，用現金買"], r:["Buy the full set. You've earned it", "成套買晒，獎勵自己"], trap:"spend",
tip:["A paid-off flat isn't spare cash. Map your monthly retirement income before big buys or instalments.", "供完樓唔等於有閒錢。大額消費或者分期之前，先計清退休後每月收入。"],
later:{w:["Ten years on, the one console {name} paid cash for still works. The grandkids lose to {him} every Sunday; the budget never flinched.", "十年後，{name}用現金買嗰部經典機仲用緊，孫仔孫女星期日次次輸畀佢，預算紋風不動。"], r:["Fourteen boxes arrived, with 24 instalments attached. {name} spent the first two mortgage-free years paying off the 1990s.", "成套機分14箱寄到，分24期還。{name}供完樓之後頭兩年，都係用嚟供返九十年代。"]}},
{id:"c_mid_artsy_u", st:0, who:"mid+artsy", thumb:{w:"calculator"}, tag:["Café habit budget", "咖啡預算"], en:"Your parents trim your allowance; the mortgage needs it. Your HK$80-a-day café habit hasn't noticed yet.", zh:"爸媽要供樓，減咗你零用錢，但你每日HK$80嘅咖啡習慣照舊。",
w:["Budget this week and brew some days", "今個星期做預算，有時自己沖"], r:["Budget next semester. Coffee is self-care", "下學期先算，咖啡係自我照顧"], trap:"delay",
tip:["HK$80 a day is about HK$2,400 a month. Tracking small daily habits shows where your money really goes.", "每日HK$80，一個月就差唔多HK$2,400。記低細數，先知錢去咗邊。"],
later:{w:["Three mornings a week, {name} brewed pour-over in the hall pantry. By June: HK$4,000 saved, and the hall's coolest café.", "一星期三朝喺茶水間自己沖，{name}六月慳到HK$4,000，仲沖出全宿最型café。"], r:["Four months and HK$9,600 of lattes later, {name} finally opened a budget app: in a café, on a card already carrying a balance.", "四個月飲咗HK$9,600咖啡，{name}終於開記帳app：喺咖啡店開，張卡已經欠緊卡數。"]}},
{id:"c_mid_artsy_j", st:1, who:"mid+artsy", thumb:{w:"passbook", r:"freegift"}, tag:["Fake art prize fee", "假藝術獎"], en:"Mum paid for ten years of art classes. Now an “international prize” says you won! Pay HK$2,500 to claim it.", zh:"阿媽供你學十年畫，「國際大獎」話你得獎，先交HK$2,500領獎。",
w:["Look up the prize and organiser first", "先上網查清個獎同主辦機構"], r:["Pay it. Mum wants it on the wall", "照畀，阿媽想掛喺客廳"], trap:"scam",
tip:["Real prizes don't charge winners to collect. “You won, now pay” is one of the oldest scams around.", "真嘅獎項唔會要得獎者畀錢領獎。「你中咗，先畀錢」係最老土嘅騙局。"],
later:{w:["Ten minutes online: the “international prize” had 4,000 winners a year. {name} kept the HK$2,500 and entered a real, free contest.", "上網查十分鐘，個「國際大獎」一年有四千個得主。{name}保住HK$2,500，改投真比賽。"], r:["No trophy came, just a “customs fee” demand. {name} reported it, but the HK$2,500 was gone and Mum's wall stayed bare.", "獎座冇嚟，「關稅」通知就嚟咗。{name}報咗警，HK$2,500攞唔返，阿媽客廳面牆繼續空空。"]}},
{id:"c_mid_artsy_f", st:2, who:"mid+artsy", thumb:{w:"piggybank", r:"camera"}, tag:["Designer nursery", "文青嬰兒房"], en:"Baby's coming, mortgage is tight, but you want a café-chic designer nursery: HK$60,000 on instalments.", zh:"BB就嚟出世，供緊樓，你仲想分期HK$60,000整文青風嬰兒房。",
w:["Buy safe basics and add pieces slowly", "買安全基本款，慢慢添置"], r:["Do the full look. It's for the photos", "成套搞掂，影相靚先得"], trap:"spend",
tip:["Babies need safe basics, not a mood board. Keeping early costs low leaves room for bigger bills ahead.", "BB要嘅係安全實用，唔係型格。開頭慳啲，留錢應付之後更大嘅開支。"],
later:{w:["When Baby came home, there was a safe cot and one sage wall. {name} kept the mortgage on track; the photo still got 300 likes.", "BB出世，{name}得張安全床同一幅自己油嘅牆。BB瞓得好，樓照供，張相仲有三百個like。"], r:["The nursery photo got 800 likes and 36 instalments. Baby outgrew the rattan crib in a year; {name} paid for it two more.", "嬰兒房張相有800個like，仲有36期分期。BB一年就瞓唔落張藤床，{name}仲要供多兩年。"]}},
{id:"c_mid_hustle_u", st:0, who:"mid+hustle", thumb:{w:"piggybank", r:"sneaker"}, tag:["Emergency card for stock", "應急卡入貨"], en:"Your parents gave you a credit card “for emergencies”. A sneaker drop counts, right? HK$15,000 to flip.", zh:"爸媽畀張卡你「應急」，限量波鞋發售都算啩？碌HK$15,000入貨。",
w:["Start small with cash you already have", "用自己現金，小本入貨"], r:["Charge it. You'll flip it before the bill", "碌咗先，賣晒先找數"], trap:"spend",
tip:["Buying stock on a credit card is borrowing at card rates. If it doesn't sell fast, interest eats the profit.", "碌卡入貨即係用卡數利息借錢做生意，賣唔切就俾利息食晒利潤。"],
later:{w:["That summer {name} flipped five pairs with summer-job cash, then ten, then twenty by Friday. The emergency card stayed untouched.", "暑假，{name}用暑期工現金先炒五對，再十對，星期五前炒到廿對，應急卡一蚊都未碌過。"], r:["On statement day, half the pairs were unsold. Resale prices fell; card interest didn't. {name} now sleeps among shoeboxes.", "月結單到咗，{name}仲有一半鞋未放。鞋價越跌，卡數利息越滾，間房堆滿鞋盒。"]}},
{id:"c_mid_hustle_j", st:1, who:"mid+hustle", thumb:{w:"calculator", r:"hottip"}, tag:["Trading guru course", "炒股大師班"], en:"Twelve years of tutorials taught you: pay for the class, you win. A HK$18,000 trading course “never loses”.", zh:"補咗十二年習，你信報班就贏。HK$18,000炒股班「保證唔蝕」。",
w:["Pass. No real trading is risk-free", "唔報，炒股冇可能零風險"], r:["Sign up. Classes always pay off", "報名！報班一定有回報"], trap:"scam",
tip:["Anyone promising you'll “never lose” is selling a dream. If it really worked, they wouldn't sell it.", "話「保證唔蝕」嘅都係賣夢。真係咁好賺，佢就唔使教你啦。"],
later:{w:["Twelve years of tutorials, and {name}'s best class was the one {he} skipped: HK$18,000 kept, the guru's page gone by summer.", "補咗十二年習，{name}最好嘅一堂係冇報嗰堂：HK$18,000保住，大師夏天就消失。"], r:["Lesson three: “average down.” By lesson eight, {name} was nearly HK$60,000 down, fees included, and the guru's chat was closed.", "第三堂教「溝淡」，到第八堂{name}學費連本金蝕咗近六萬，大師個群組已經解散。"]}},
{id:"c_mid_hustle_r", st:3, who:"mid+hustle", thumb:{w:"passbook", r:"hottip"}, tag:["Steady income at 65", "退休穩定收入"], en:"Retired with a paid-off flat, but all your savings sit in a trading account. Your kids suggest a life annuity.", zh:"退休、供完樓，但積蓄全部擺喺炒股戶口。仔女建議買年金，有穩定收入。",
w:["Shift part to steady income", "撥部分去做穩定收入"], r:["Wait after one more big trade", "炒埋呢轉大嘅先算"], trap:"delay",
tip:["Keep risk low on the money you live on. An annuity, like the HKMC's, can pay you monthly for life.", "退休生活錢要穩陣啲。按揭證券公司嘅年金計劃可以終身每月派錢。"],
later:{w:["At 66, {name} moved a slice into a life annuity. It lands monthly like a payday; the trading itch gets a small pot to lose.", "66歲，{name}撥一部分買終身年金，每月準時「出糧」。炒股癮就用個輸得起嘅細戶口解決。"], r:["“One more trade” became five, and a bad month took a third of {name}'s savings. The annuity {he} bought after that paid far less.", "「最後一轉」炒到第五轉，一個壞月蝕走{name}三分一積蓄。之後先買年金，每月派少好多。"]}},
{id:"c_rich_grind_u", st:0, who:"rich+grind", thumb:{w:"textbooks", r:"smartphone"}, tag:["“Career” spending spree", "自我增值狂買"], en:"Three online courses, a productivity coach and a standing desk: HK$20,000 on Dad's card, “for your career”.", zh:"網上課程、教練、升降枱，碌阿爸副卡HK$20,000「投資自己」。",
w:["Use free uni career services", "先用大學免費就業服務"], r:["Charge it all. Invest in myself!", "照碌，投資自己嘛！"], trap:"spend",
tip:["Not all spending on yourself is investing. Use free resources first and set a learning budget.", "唔係樣樣使喺自己身上都叫投資。先用免費資源，再定學習預算。"],
later:{w:["Weeks later, a free careers-office mock interview won {name} the internship. {He} framed the HK$0 receipt: no Dad's card needed.", "幾星期後，{name}靠就業處免費模擬面試攞到實習，HK$0收據留低做證：唔使靠阿爸張卡。"], r:["The standing desk became a coat rack. Dad's note on the statement: “Repay by June.” {name} spent summer paying off a coat rack.", "升降枱變咗掛衫架。阿爸喺月結單寫：「六月前還返。」{name}成個暑假都係供個衫架。"]}},
{id:"c_rich_grind_j", st:1, who:"rich+grind", thumb:{w:"calculator", r:"hottip"}, tag:["Pre-IPO share pitch", "上市前股份"], en:"To prove you don't need Dad, you want fast growth. A caller offers “pre-IPO” shares set to triple in a year.", zh:"想證明唔靠阿爸，有人打嚟推銷「上市前股份」，話一年翻三倍。",
w:["Check the SFC register first", "先查證監會持牌人名冊"], r:["Put your whole bonus in today", "唔等得，成份花紅買晒"], trap:"scam",
tip:["Pre-IPO share offers are a common scam. Check whether the seller is licensed on the SFC's public register.", "「上市前股份」係常見騙局。先上證監會公眾紀錄冊查吓對方有冇牌。"],
later:{w:["One search of the SFC register: no such firm. {name} kept the whole bonus, and Dad said “Smart” for the first time in years.", "證監會名冊根本冇嗰間公司。{name}成份花紅保住，阿爸十年嚟第一次讚佢：「醒目。」"], r:["When the “IPO” date passed, the caller's number was dead. Bonus gone, {name} had to ask Dad for rent, the one thing {he} swore off.", "「上市」日子過咗，電話已經打唔通。花紅冇晒，{name}要問阿爸借錢交租，佢最唔想嘅事。"]}},
{id:"c_rich_grind_f", st:2, who:"rich+grind", thumb:{w:"passbook"}, tag:["Family business handover", "家族生意交棒"], en:"Dad wants to plan handing over the family business. You work 18-hour days on your own deals: “Next quarter.”", zh:"阿爸想傾家族生意點交棒，你日做十八個鐘搞自己單嘢：「下季先傾。」",
w:["Meet Dad and a pro adviser", "約阿爸同專業顧問開會"], r:["Wait till next quarter. Deals first", "下季先，搵錢緊要"], trap:"delay",
tip:["Business handovers take years and expert advice. Starting early avoids family fights and rushed sales.", "家族生意交棒要時間同專業意見。早啲計劃，免得爭產或者賤賣。"],
later:{w:["Two years of meetings later, the handover went through without one family row. Dad took up golf; {name}, for once, took weekends.", "開咗兩年會，交棒順利，屋企一次都冇嗌交。阿爸去咗打高爾夫，{name}終於有週末。"], r:["“Next quarter” became three years. When Dad fell ill, cousins hired lawyers and {name} watched the firm sold off cheap.", "「下季」變咗三年。阿爸身體轉差，表親請晒律師，{name}眼白白睇住家族生意被賤賣。"]}},
{id:"c_rich_genius_u", st:0, who:"rich+genius", thumb:{w:"transitcard", r:"smartphone"}, tag:["Taxis and delivery", "的士同外賣"], en:"Acing finals is easy; walking isn't. Taxis to 9am lectures and delivery: HK$12,000 a month on Dad's card.", zh:"考試易過行路：的士返9點堂、餐餐外賣，月碌阿爸卡HK$12,000。",
w:["Set a monthly cap, take MTR", "定每月上限，搭港鐵"], r:["Keep tapping. Dad never checks", "照碌，阿爸都唔睇"], trap:"spend",
tip:["Small convenience buys add up fast. Habits built on someone else's card follow you to your own.", "方便錢每次唔多，加埋好驚人。用人哋張卡養成嘅習慣，會跟你返自己張卡。"],
later:{w:["From then on, {name} capped it at HK$3,000 and took the MTR. The 8:15 train turned out perfect for a lazy genius's reading.", "之後{name}定咗HK$3,000上限改搭港鐵，原來八點十五嗰班車，係天才補讀嘅最佳地方。"], r:["After graduation the taxi habit moved to {name}'s own card: first statement HK$11,000, salary HK$22,000. {He} paid the minimum.", "畢業後，的士習慣跟咗{name}自己張卡：人工兩萬二，月結單一萬一，只還到最低額。"]}},
{id:"c_rich_genius_j", st:1, who:"rich+genius", thumb:{w:"passbook", r:"phishhook"}, tag:["Fake private-bank text", "假私人銀行短訊"], en:"You're far too smart to be scammed. Your “private banker” texts a link to re-verify your trust account.", zh:"你咁聰明，點會中伏？「私人銀行」短訊叫你撳連結驗證信託戶口。",
w:["Call the bank's real number", "打本身銀行電話核實"], r:["Tap the link. I'd spot a fake", "照撳條連結，係假實睇得出"], trap:"scam",
tip:["Clever people get scammed too. Banks won't text you a link to log in. Call a number you already trust.", "聰明人都會中伏。銀行唔會用短訊傳連結叫你登入，要打你信得過嘅號碼查。"],
later:{w:["One call to the bank's real number: fake. Impressed, {name} opened {his} first ever bank letter. It was a scam warning.", "一個電話打返銀行真號碼，果然係假。{name}人生第一次拆銀行信，原來係防騙提示。"], r:["The page looked perfect. By lunch, HK$1.2 million had left the trust account. {name}'s unopened bank letters warned of just that.", "網頁似到十足，中午信託戶口已走咗HK$120萬。{name}未拆嘅銀行信，正正講緊呢種騙局。"]}},
{id:"c_rich_genius_r", st:3, who:"rich+genius", thumb:{w:"passbook"}, tag:["Enduring power of attorney", "持久授權書"], en:"Flats, shares, the firm: all in your name. Your kids suggest an enduring power of attorney, just in case.", zh:"樓、股票、家族公司全部喺你名下，仔女建議你簽持久授權書，以防萬一。",
w:["See a lawyer while sharp", "趁醒目搵律師簽好佢"], r:["Do it tomorrow. Mind is sharp", "聽日先，我個腦好醒"], trap:"delay",
tip:["An enduring power of attorney lets someone you trust run your money if you can't. Make it while you're able.", "持久授權書可以畀你信任嘅人喺你冇能力時幫你管錢，要趁頭腦清醒先簽得。"],
later:{w:["{name} signed with a lawyer one dull afternoon. After a stroke at 80, the kids paid the bills next morning, no court needed.", "{name}同律師一個悶悶嘅下晝就簽好。八十歲中風，仔女第二朝已經幫佢交數，唔使上法庭。"], r:["Razor sharp until a stroke at 79, {name} never signed. The accounts froze, and the kids spent a year in court to pay the bills.", "一直好醒嘅{name}，79歲中風。戶口即刻凍結，仔女要上法庭搞成年先交得到數。"]}},
{id:"c_rich_social_u", st:0, who:"rich+social", thumb:{w:"calculator", r:"bubbletea"}, tag:["Always paying the bill", "次次埋單"], en:"40 group chats, and every hotpot ends with everyone looking at you. This month: HK$18,000 on Dad's card.", zh:"40個群組，次次打邊爐都等你埋單，副卡今個月碌咗HK$18,000。",
w:["Split the bill from now on", "由今日起夾錢埋單"], r:["Pay again. It's Dad's card anyway", "照請，反正係阿爸張卡"], trap:"spend",
tip:["Paying for everyone quietly becomes what friends expect. Splitting the bill keeps it fair for all.", "次次請客，朋友就會當理所當然。夾錢埋單，大家都公平。"],
later:{w:["The first split bill was awkward; the fifth, normal. Two chats went silent for good, and {name} learned which 38 were real.", "第一次夾錢好尷尬，第五次已經好自然。兩個群組從此靜晒，{name}終於知邊38個係真朋友。"], r:["In May, Dad cut the card's limit; {name} covered the gap on {his} own new card, interest and all. The chats still went quiet.", "五月阿爸調低副卡限額，{name}用自己新卡頂上，卡數越滾越大。張單一到，40個群組照靜。"]}},
{id:"c_rich_social_j", st:1, who:"rich+social", thumb:{w:"calculator", r:"highheel"}, tag:["Dad cuts the card", "副卡停咗"], en:"Dad stops your supplementary card on your first payday. Your weekends are still full of brunches and parties.", zh:"第一次出糧，阿爸就停咗你張副卡，但你週末照樣排滿飯局派對。",
w:["Make a budget before partying", "下個聚會前定好預算"], r:["Wait until party season ends", "玩完呢輪派對先做預算"], trap:"delay",
tip:["Your first months of pay set your habits. A simple budget before you spend beats a scary statement later.", "頭幾個月人工決定你嘅理財習慣。用錢前做預算，好過月尾睇單嚇親。"],
later:{w:["On the minibus to brunch, {name} wrote a budget. Three months in, {he} still had savings, and a stunned Dad bought {him} lunch.", "搭小巴去brunch途中，{name}做好預算。三個月後仲有餘錢，阿爸刮目相看，請佢食飯。"], r:["Party season ran past one payday, then two. By month three {name} paid card minimums and begged for Dad's card back. No.", "派對季玩到下個出糧日，再下個。第三個月{name}要還最低還款額，問阿爸復卡：唔得。"]}},
{id:"c_rich_social_f", st:2, who:"rich+social", thumb:{w:"passbook", r:"hottip"}, tag:["Members-only fund", "圈內專屬基金"], en:"In your kids' school parents' chat, half your friends are in a “members-only” fund: 2% a month, no risk.", zh:"仔女學校家長群組，一半朋友都入咗「圈內專屬」基金：月賺2%，零風險。",
w:["Ask for licences; walk away if unsure", "問清牌照，有懷疑就唔入"], r:["Join. Your whole circle can't be wrong", "加入，成個圈都入咗啦"], trap:"scam",
tip:["Scams spread fast through trusted circles. Steady high returns with “no risk” is a classic Ponzi sign.", "騙局最鍾意喺熟人圈散播。穩定高回報又話「零風險」，係龐氏騙局典型特徵。"],
later:{w:["{name} asked for a licence and got “Trust me.” Eight months on the fund froze, and {name}'s was the only safe money in the chat.", "{name}問牌照，對方得一句「信我」。八個月後基金爆煲，成個家長群組得{name}啲錢冇事。"], r:["For eight months the 2% arrived; then it stopped. {name}'s HK$2 million was gone, and the parents' chat became a police case.", "頭八個月月月有2%，第九個月全部停晒。{name}嘅HK$200萬冇咗，家長群組變咗報案群組。"]}},
{id:"c_rich_gamer_u", st:0, who:"rich+gamer", thumb:{w:"piggybank", r:"controller"}, tag:["Gacha whale night", "課金抽卡"], en:"The limited character drops tonight. Dad's card is saved in the game, and it's a sure win within 90 pulls.", zh:"限定角色今晚出，阿爸張卡存咗喺遊戲入面，抽夠90抽實有。",
w:["Set a strict monthly top-up cap", "定每月課金上限唔超"], r:["Keep pulling until it drops", "唔理咁多，抽到出為止"], trap:"spend",
tip:["Random draws are built to keep you paying. Set your cap before you play, never mid-pull.", "抽卡設計就係要你不停課金。玩之前定好上限，唔好抽到一半先諗。"],
later:{w:["Forty pulls in, {name} hit the HK$500 cap and logged off. No character, but for once the game sent Dad no card of thanks.", "第40抽到咗HK$500上限，{name}即刻收手。角色冇出，但今次遊戲公司冇寄心意卡畀阿爸。"], r:["By dawn, {name} had two copies and HK$14,000 on Dad's card. The game mailed Dad a card of thanks; Dad mailed {name} the bill.", "天光時{name}抽到兩隻，碌咗阿爸卡HK$14,000。遊戲寄心意卡畀阿爸，阿爸寄張單畀佢。"]}},
{id:"c_rich_gamer_j", st:1, who:"rich+gamer", thumb:{w:"calculator", r:"hottip"}, tag:["Fake esports investment", "假電競投資"], en:"An “esports team” wants you as co-owner if Dad's company puts in HK$500,000 for “guaranteed” sponsor returns.", zh:"「電競隊」邀你做股東，叫阿爸公司投HK$500,000「保證」回報。",
w:["Get audited books and a lawyer's check", "要審計帳目再搵律師睇"], r:["Ask Dad to wire the cash today", "叫阿爸今日即過數"], trap:"scam",
tip:["“Guaranteed” returns and pressure to pay fast are red flags. Do your checks before any money moves.", "「保證回報」加催你快啲畀錢，就係警號。錢未過之前，查清楚先。"],
later:{w:["All the team could show was a logo and a hype reel. {name} walked; six months on, it had rebranded as a crypto fund.", "嗰隊冇審計帳目，得個logo同條宣傳片。{name}拒絕；半年後，嗰隊改咗名做加密基金。"], r:["Dad wired HK$500,000. No sponsors came, the team's server went dark, and {name}'s co-owner certificate is now police evidence.", "阿爸過咗HK$500,000，贊助商冇出現，伺服器熄晒燈，{name}張股東證書變咗警方證物。"]}},
{id:"c_rich_gamer_r", st:3, who:"rich+gamer", thumb:{w:"passbook", r:"controller"}, tag:["Digital legacy", "數碼遺產"], en:"Your whale years left crypto wallets and rare game items worth a fortune. Only you know how to get in.", zh:"課金幾十年，加密錢包同稀有道具值好多錢，但得你一個識登入。",
w:["List them in your estate plan with a lawyer", "列好清單，寫入遺產安排"], r:["Later. I still log in every day", "遲啲先，我日日都仲登入緊"], trap:"delay",
tip:["Digital assets can be lost for good if no one can access them. Include them in your estate plans.", "數碼資產冇人登入得到，就可能永遠消失。記得寫埋入遺產安排。"],
later:{w:["At 70, {name} put every wallet and rare item in the will. One grandkid later inherited a legendary sword, and the login.", "70歲，{name}將每個錢包同稀有道具寫入遺囑。多年後，孫仔繼承傳說級寶劍，仲識得登入。"], r:["After a fall at 82, {name} forgot the seed phrase. The fortune sits on the blockchain, safe from everyone, family included.", "82歲跌親之後，{name}唔記得助記詞。啲錢仲喺區塊鏈上，安全到連屋企人都攞唔到。"]}},
{id:"c_rich_artsy_u", st:0, who:"rich+artsy", thumb:{w:"piggybank", r:"camera"}, tag:["Vintage camera auction", "古董相機拍賣"], en:"A rare vintage film camera is up for auction. You'll shoot maybe one roll, but Dad's card can go to HK$60,000.", zh:"古董菲林相機拍賣，你最多影一筒，但阿爸副卡夠出HK$60,000。",
w:["Rent one for a weekend first", "先租一部影一個週末試吓"], r:["Bid HK$60,000 on Dad's card", "照出六萬蚊，為藝術唔怕"], trap:"spend",
tip:["Collecting is fine with your own money and a set budget. On someone else's card, there's no limit.", "收藏可以，但要用自己錢、有預算。碌人哋張卡，就永遠冇上限。"],
later:{w:["One weekend and HK$600 of rental later, {name} had a roll from the Peak. The prints sold at a student show: {his} first art income.", "一個週末，{name}用HK$600租部機上山頂影咗筒菲林，相喺學生展賣出，係佢第一筆藝術收入。"], r:["Hammer down at HK$58,000; the shutter jammed half a roll in. Dad made it {name}'s loan, docked from allowance till graduation.", "HK$58,000落槌，影咗半筒快門就卡死。阿爸將張單變做{name}嘅借款，由零用錢扣到畢業。"]}},
{id:"c_rich_artsy_j", st:1, who:"rich+artsy", thumb:{w:"calculator", r:"hottip"}, tag:["Art buyback promise", "名畫保證回購"], en:"A dealer offers you a “rare” painting for HK$800,000 and promises to buy it back for 30% more in 2 years.", zh:"畫商推介「罕有」名畫HK$800,000，保證兩年後加三成回購。",
w:["Get an independent valuation first", "先搵獨立估價師鑑定"], r:["Buy it. The buyback makes it safe", "買！有回購好穩陣"], trap:"scam",
tip:["A buyback promise is only as good as the seller. Get independent advice and never rush a big purchase.", "回購承諾靠唔靠得住，要睇賣家。大額買賣先搵獨立意見，唔好俾人催。"],
later:{w:["An independent valuer said HK$40,000, tops. {name} bought a young local artist's piece instead, hung by the imported tote bag.", "獨立估價：嗰幅「名畫」值HK$40,000。{name}改買本地新晉畫作，掛喺入口帆布袋隔籬。"], r:["Two years on, the gallery was a bubble-tea shop and the buyback worthless. {name}'s HK$800,000 painting is worth a tenth.", "兩年後，畫廊變咗珍珠奶茶舖，回購合約一文不值。{name}嗰幅HK$80萬名畫，估值得返一成。"]}},
{id:"c_rich_artsy_f", st:2, who:"rich+artsy", thumb:{w:"calculator"}, tag:["Gallery café losses", "畫廊咖啡店蝕錢"], en:"Your Dad-funded gallery café has lost money for three years. Your partner asks you to look at the books.", zh:"阿爸出錢開嘅畫廊咖啡店蝕咗三年，另一半叫你認真睇吓盤數。",
w:["Check numbers, set a stop-loss", "睇清盤數定止蝕期限"], r:["Wait till next year. Art takes time", "明年先睇，藝術要時間"], trap:"delay",
tip:["Give a business a clear date and target to break even, so losses don't quietly drain family money.", "生意要定好幾時要收支平衡，唔好俾虧損靜靜雞蝕走家族錢。"],
later:{w:["Month one, {name} set a 12-month break-even deadline and added paid night shows. Month 11: first profit. Dad booked a table.", "第一個月，{name}定咗12個月打和期限，加推收費夜場。第11個月首次賺錢，阿爸要訂位。"], r:["“Next year” became three. When {name} finally read the books, HK$3 million was gone and the family office had cut the funding.", "「明年」又拖多三年。{name}終於睇數，間舖靜靜雞蝕咗HK$300萬，家族辦公室已經停咗撥款。"]}},
{id:"c_rich_hustle_u", st:0, who:"rich+hustle", thumb:{w:"calculator", r:"sneaker"}, tag:["Half-price bulk sneakers", "半價波鞋批發"], en:"A “supplier” offers 200 pairs of hyped sneakers at half price, if you pay HK$100,000 upfront on Dad's card.", zh:"「供應商」半價批200對波鞋，碌阿爸卡先付HK$100,000。",
w:["Test a small order first", "先落少量貨驗清楚先"], r:["Pay it all now. Profit's sure!", "全數照付，穩賺啦"], trap:"scam",
tip:["Bulk deals far below market price are a classic scam. Start small and never prepay big sums to strangers.", "遠低過市價嘅批發貨係經典騙局。先小量試，唔好預付大筆錢畀陌生人。"],
later:{w:["First, a test order of 10 pairs: half fake. {name} lost HK$5,000, not HK$100,000, and Dad called it the cheapest MBA ever.", "試單10對，一半係假貨，{name}只蝕HK$5,000。阿爸話係史上最平嘅MBA。"], r:["The 200 pairs never shipped and the supplier's site vanished. {name}'s next pitch deck ended: “So, Dad, about that HK$100,000…”", "200對鞋冇寄出，網站都消失咗。{name}下份計劃書尾頁：「阿爸，嗰HK$100,000……」"]}},
{id:"c_rich_hustle_j", st:1, who:"rich+hustle", thumb:{w:"calculator", r:"sunglasses"}, tag:["Fancy office, no customers", "冇客先租靚寫字樓"], en:"Startup #7 has no customers yet, but you want Dad's money on a HK$80,000-a-month Central office.", zh:"第七個初創未有客，你想用阿爸錢租月租HK$80,000中環寫字樓。",
w:["Use a co-working desk until sales come in", "未有生意，先租共享工作間"], r:["Sign the lease. Investors love Central", "簽約！投資者鍾意中環"], trap:"spend",
tip:["Keep fixed costs low until the business earns. Big rent is one of the fastest ways to sink a start-up.", "未有收入前，固定開支要壓到最低。貴租係拖垮初創最快嘅方法之一。"],
later:{w:["{name} pitched from a HK$2,500 hot desk in Kwun Tong. The first client never asked about views, and Dad never wired a cent.", "{name}喺觀塘HK$2,500嘅共享枱見客。第一個客根本唔理景觀，今次阿爸一蚊都唔使過數。"], r:["Startup #7 had a harbour view and no customers. After HK$960,000 in rent, {name} asked Dad: “So, can you wire the break fee?”", "第七號初創有海景冇客。交咗HK$96萬租，{name}又問阿爸：「可唔可以過數畀我賠約？」"]}},
{id:"c_rich_hustle_r", st:3, who:"rich+hustle", thumb:{w:"calculator"}, tag:["Dormant company fees", "殭屍公司"], en:"Retired serial founder: 11 old startup companies still cost you audit and filing fees every year.", zh:"退休嘅連續創業家：十一間舊公司仍然年年要交核數同申報費。",
w:["Close the ones you don't use, properly", "正式結束用唔著嘅公司"], r:["Leave them. Might revive one someday", "由佢，第日或者再搞"], trap:"delay",
tip:["Idle companies can still cost yearly fees and paperwork. Close them properly so heirs don't inherit the mess.", "唔用嘅公司年年都可能有費用同文件要搞。正式結束，免得留畀後人執手尾。"],
later:{w:["Nine of eleven firms, closed properly: {name}'s best exit yet. The kids got two live businesses, not a drawer of audit bills.", "{name}正式結束咗九間公司。仔女只接手兩間活生意，唔使執十一疊核數單，話係佢最靚嘅exit。"], r:["Till 85, {name} paid eleven audit bills a year. Then the heirs spent two years and HK$400,000 closing firms they couldn't name.", "到85歲，{name}仍年年交十一份核數費。後人用兩年同HK$40萬先執得晒，連公司名都叫唔出。"]}}
];
CARDS.push(...PERSONA_CARDS);
const HATS = [
{id:"goggles", title:"diver", en:"Diving goggles", zh:"潛水鏡"},
{id:"sleuth", title:"scamvip", en:"Detective hat", zh:"偵探帽"},
{id:"bag", title:"future", en:"Shopping-bag hat", zh:"購物袋帽"},
{id:"nightcap",title:"tomorrow", en:"Nightcap", zh:"睡帽"},
{id:"halo", title:"zero", en:"Halo", zh:"光環"},
{id:"straw", title:"retire", en:"Straw sun hat", zh:"草帽"},
{id:"tophat", title:"lucky", en:"Top hat", zh:"禮帽"},
{id:"hardhat", title:"stacker", en:"Hard hat", zh:"地盤帽"}
];
const POWERS = {
vine: {en:"Vines", zh:"藤蔓", d:["Your next item sticks to what it touches", "下一件一掂就黐實"], m:["A habit that sticks", "養成咗嘅習慣"]},
lock: {en:"Fixed deposit", zh:"定期鎖", d:["Your next item locks where it lands", "下一件一停低就鎖死"], m:["Money you can't spend on a whim", "唔會心血來潮使咗嘅錢"]},
net: {en:"Insurance net", zh:"保險網", d:["Catches up to 3 falls for 25 s", "25秒內接住最多3件"], m:["Cover for what falls", "跌咗都有保障"]},
wide: {en:"Wider base", zh:"加闊地基", d:["The platform grows wider for the rest of the game", "個平台加闊，直到完場"], m:["A bigger savings base", "儲蓄基礎更闊"]},
undo: {en:"Cooling-off", zh:"冷靜期", d:["Lifts the top item off your tower, no drop counted", "拎走塔頂嗰件，唔計跌落海"], m:["A purchase you can cancel", "買錯都退得返"]}
};
const POWER_OF_TRAP = {spend: "vine", delay: "lock", scam: "net"};
const ACTS = [{n:"I", en:"The Setup", zh:"第一幕：開端", z:"第一幕"}, {n:"II", en:"The Confrontation", zh:"第二幕：衝突", z:"第二幕"}, {n:"III", en:"The Resolution", zh:"第三幕：結局", z:"第三幕"}];
const ACT_OF_STAGE = [0, 1, 1, 2];
root.TFF_CONTENT = {ACTS, ACT_OF_STAGE, POWERS, POWER_OF_TRAP, HATS, STAGES, TRAPS, CARDS, QUIZ, HABITS, QUIZ_WAS, HABIT_WAS, answerNow, habitNow, QUIPS, TROLLS, TYPE_AXES, TYPES, TITLES, PERSONAS, LATER_NONE, ENDINGS};
})(typeof window !== "undefined" ? window : globalThis);
(function(){
"use strict";
const K = window.CLAY;
const CAST = {"k":2.4,"fig":{"jack":[{"x":0,"y":0,"w":288,"h":552,"top":21.7,"cx":60.2,"hw":52.9,"neck":59.6,"hx":84.2,"hy":143.8},{"x":288,"y":0,"w":288,"h":552,"top":21.2,"cx":58.8,"hw":66.7,"neck":59.2,"hx":84.2,"hy":152.5},{"x":576,"y":0,"w":288,"h":552,"top":21.2,"cx":58.1,"hw":67.9,"neck":59.2,"hx":82.9,"hy":152.9},{"x":864,"y":0,"w":288,"h":552,"top":23.3,"cx":57.1,"hw":67.5,"neck":60.8,"hx":90.4,"hy":153.3}],"jackie":[{"x":1152,"y":0,"w":288,"h":552,"top":31.3,"cx":60.4,"hw":50.8,"neck":67.1,"hx":82.9,"hy":137.9},{"x":1440,"y":0,"w":288,"h":552,"top":32.1,"cx":59.2,"hw":68.3,"neck":67.9,"hx":83.3,"hy":152.5},{"x":1728,"y":0,"w":288,"h":552,"top":32.1,"cx":60.0,"hw":66.7,"neck":67.9,"hx":86.7,"hy":154.2},{"x":2016,"y":0,"w":288,"h":552,"top":31.7,"cx":56.9,"hw":62.9,"neck":67.5,"hx":86.7,"hy":156.2}]},"crab":{"idle":{"x":0,"y":552,"w":240,"h":192},"happy":{"x":240,"y":552,"w":240,"h":192},"worried":{"x":480,"y":552,"w":240,"h":192}}};
const castMeta = document.querySelector('meta[name="tff-cast"]'), castWait = [];
let castImg = null;
if (CAST && castMeta && castMeta.content){
const im = new Image(); im.decoding = "async";
im.onload = () => { castImg = im; castWait.splice(0).forEach(f => { try { f(); } catch(e){} }); };
im.src = castMeta.content;
}
const onCast = f => { if (castImg) f(); else castWait.push(f); };
const SKIN = "#F7D2B3", HAIR = "#2E2530", GREY = "#C8CAD2";
const OUTFIT = {
jack: [["#CDB79C", "#F4F1EA", "#3B302E", "sneaker"], ["#F7F7F2", "#F7F7F2", "#2C3566", "black"], ["#2F8F87", "#2F8F87", "#C49A6C", "brown"], ["#9C3D4A", "#9C3D4A", "#7C7F8C", "brown"]],
jackie: [["#F7F7F2", "#F7F7F2", "#8C8F99", "sneaker"], ["#2C3566", "#2C3566", "#2C3566", "black"], ["#F28B6E", "#F28B6E", "#3F5BA9", "brown"], ["#9C8AD8", "#9C8AD8", "#8A8D99", "brown"]]
};
const B = (g, path, color, o) => K.blob(g, path, color, Object.assign({depth: 2.4, soft: 3.6, texture: 0.08, sheen: false, rim: 0.8}, o || {}));
const P = (g, path, color, o) => K.press(g, path, color, Object.assign({sheen: false, texture: 0.04}, o || {}));
const line = (g, pts, w, o) => K.groove(g, K.poly(pts, false), w || 1.4, o);
const mirror = pts => pts.map(([x, y]) => [120 - x, y]);
function held(g, hold, hx, hy){
if (hold === "piggy"){
B(g, K.ball(hx - 2, hy - 6, 14, 11, {lump: 0.3}), "pink", {sheen: {x: hx - 8, y: hy - 12, rx: 4, ry: 2}});
P(g, K.ball(hx - 15, hy - 6, 4.5, 4), "#FF8FC0"); P(g, K.poly([[hx - 2, hy - 16], [hx + 4, hy - 22], [hx + 5, hy - 13]]), "pink");
line(g, [[hx - 4, hy - 16], [hx + 2, hy - 16]], 1.2);
P(g, K.ball(hx - 1, hy - 21, 3.6), "#FFC83D");
for (const x of [-9, 5]) P(g, K.slab(hx + x, hy + 4, 4, 5, 1), "pink");
} else if (hold === "bags"){
B(g, K.slab(hx - 6, hy + 14, 16, 18, 2), "orange"); B(g, K.slab(hx + 9, hy + 18, 14, 15, 2), "purple");
line(g, [[hx - 11, hy + 6], [hx - 6, hy], [hx - 1, hy + 6]], 1.3); line(g, [[hx + 4, hy + 11], [hx + 9, hy + 5], [hx + 14, hy + 11]], 1.3);
P(g, K.ball(hx - 6, hy + 15, 2.6), "white");
} else if (hold === "phone"){
B(g, K.slab(hx, hy - 6, 13, 22, 3), "#2E2838", {depth: 1.4}); P(g, K.slab(hx, hy - 7, 9, 16, 2), "#7FD3FF", {depth: 0.6});
P(g, K.ball(hx + 10, hy - 22, 6.5), "red"); K.text(g, "!", hx + 10, hy - 22, {size: 9, color: "white", weight: 900});
} else if (hold === "hourglass"){
P(g, K.slab(hx, hy - 20, 16, 3.5, 1.5), "#9A6440"); P(g, K.slab(hx, hy + 4, 16, 3.5, 1.5), "#9A6440");
P(g, K.poly([[hx - 6, hy - 18], [hx + 6, hy - 18], [hx, hy - 8], [hx + 6, hy + 2], [hx - 6, hy + 2], [hx, hy - 8]]), "#CFEFFF", {depth: 0.8});
P(g, K.poly([[hx - 4, hy], [hx + 4, hy], [hx, hy - 5]]), "#FFC83D", {depth: 0.6});
}
}
function sparkles(g){
for (const [x, y, r] of [[14, 40, 6], [104, 30, 7], [108, 96, 5]]) P(g, K.poly(Array.from({length: 8}, (_, i) => { const a = i * Math.PI / 4 - Math.PI / 2, q = i % 2 ? r * 0.4 : r; return [x + Math.cos(a) * q, y + Math.sin(a) * q]; })), "#FFE45C", {rim: 0.5});
}
function keyOf(L){ return [L.who, L.stage, L.tier, L.hand || "-", L.mood, L.drops, L.boost ? 1 : 0].join("|"); }
function drawPhoto(g, L){
const she = L.who === "jackie", st = Math.max(0, Math.min(3, L.stage | 0)), f = CAST.fig[she ? "jackie" : "jack"][st];
g.save(); g.fillStyle = "rgba(40,30,60,0.18)"; g.beginPath(); g.ellipse(60, 222, 30, 4.5, 0, 0, Math.PI * 2); g.fill(); g.restore();
g.drawImage(castImg, f.x, f.y, f.w, f.h, 0, 0, 120, 230);
const hw = f.hw, cx = f.cx, top = f.top, face = top + hw * 0.62;
if (L.hand) held(g, L.hand, f.hx + 2, f.hy - 4);
if (L.mood === "worried") P(g, K.blobPoly([[cx + hw * 0.56, top + hw * 0.32], [cx + hw * 0.56 + 4, top + hw * 0.32 + 8], [cx + hw * 0.56, top + hw * 0.32 + 12], [cx + hw * 0.56 - 4, top + hw * 0.32 + 8]], {lump: 0.1}), "sky", {rim: 0.4});
if (L.tier === 3){
for (const s of [-1, 1]){ const x = cx + s * hw * 0.2, y = top + hw * 0.16; P(g, K.slab(x, y, 15, 8, 4), "#FFC83D", {depth: 0.8}); P(g, K.slab(x, y, 11, 5, 3), "#5D7FB8", {depth: 0.6}); }
P(g, K.slab(cx, top + hw * 0.16 - 1, 7, 2.2, 1), "#FFC83D", {depth: 0.5});
}
const plaster = (x, y, a) => { g.save(); g.translate(x, y); g.rotate(a); P(g, K.slab(0, 0, 11, 4.6, 2), "#F2D2A0"); line(g, [[-2, -1], [-2, 1]], 0.8); line(g, [[2, -1], [2, 1]], 0.8); g.restore(); };
if (L.drops >= 1) plaster(cx + hw * 0.27, face + hw * 0.16, -0.35);
if (L.drops >= 2) plaster(cx - hw * 0.29, face + hw * 0.12, 0.3);
if (L.boost) sparkles(g);
}
function draw(g, L){
if (castImg && CAST){ drawPhoto(g, L); return; }
const she = L.who === "jackie", st = Math.max(0, Math.min(3, L.stage | 0)), [top, sleeve, bottom, shoes] = OUTFIT[she ? "jackie" : "jack"][st];
const hair = st === 3 ? GREY : HAIR, skirt = she && st <= 2, longSkirt = she && st === 3;
const hold = L.hand || null, hx = 82, hy = 132;
g.save(); g.fillStyle = "rgba(40,30,60,0.18)"; g.beginPath(); g.ellipse(60, 222, 34, 5, 0, 0, Math.PI * 2); g.fill(); g.restore();
if (she && st !== 3) B(g, K.blobPoly([[27, 56], [31, 32], [60, 21], [89, 32], [93, 56], [96, 104], [86, 112], [34, 112], [24, 104]], {lump: 0.6, seed: 3}), hair);
if (skirt && st === 0){
for (const x of [50, 70]){ B(g, K.tube([[x, 180], [x, 212]], 8.5), SKIN, {depth: 1.4, soft: 2}); P(g, K.slab(x, 205, 10, 12, 3), "white"); }
B(g, K.blobPoly([[36, 150], [84, 150], [91, 186], [29, 186]], {lump: 0.4, seed: 17}), bottom);
for (const x of [38, 47, 56, 64, 73, 82]) line(g, [[60 + (x - 60) * 0.85, 158], [x + (x - 60) * 0.18, 185]], 1.1);
} else if (skirt){
for (const x of [50, 70]) B(g, K.tube([[x, 186], [x, 212]], 8.5), SKIN, {depth: 1.4, soft: 2});
B(g, K.blobPoly([[39, 148], [81, 148], [st === 1 ? 86 : 90, st === 1 ? 190 : 196], [st === 1 ? 34 : 30, st === 1 ? 190 : 196]], {lump: 0.5, seed: 11}), bottom);
if (st === 2) for (const x of [44, 60, 76]) line(g, [[x, 158], [x + (x - 60) * 0.25, 194]], 1.1);
} else if (longSkirt){
B(g, K.blobPoly([[39, 148], [81, 148], [90, 208], [30, 208]], {lump: 0.5, seed: 13}), bottom);
line(g, [[60, 160], [60, 206]], 1.1);
} else {
const w = st === 0 ? 24 : 21;
for (const x of [48, 72]) B(g, K.slab(x, 184, w, 56, 8, {lump: 0.5, seed: x}), bottom);
line(g, [[60, 160], [60, 172]], 1.2);
if (L.tier === 0){
P(g, K.slab(73, 190, 11, 11, 2), "#C9A27A");
line(g, [[69, 186], [77, 194]], 0.9); line(g, [[77, 186], [69, 194]], 0.9);
}
}
for (const [x, s] of [[47, -1], [73, 1]]){
if (shoes === "sneaker"){ P(g, K.slab(x + s * 2, 218, 26, 7, 3), "#3B3646"); B(g, K.ball(x + s * 2, 212, 13, 7.5, {lump: 0.2}), "white"); line(g, [[x + s * 2 - 6, 210], [x + s * 2 + 4, 210]], 0.9); }
else { const c = shoes === "black" ? "#2E2838" : "#7A4A2C"; B(g, K.ball(x + s * 2, 214, 12, 7, {lump: 0.2}), c, {sheen: {x: x + s * 2 - 4, y: 211, rx: 4, ry: 1.6}}); }
}
B(g, K.slab(60, 94, 16, 14, 5), SKIN, {depth: 1.6});
const tee = st === 0, torso = tee ? [[29, 106], [45, 96], [75, 96], [91, 106], [93, 160], [27, 160]] : [[35, 104], [47, 96], [73, 96], [85, 104], [86, 156], [34, 156]];
if (tee){
B(g, K.blobPoly(torso, {lump: 0.6, seed: 21}), top);
if (!she) B(g, K.slab(60, 160, 66, 9, 3), "white");
line(g, [[52, 98], [60, 103], [68, 98]], 1.3);
if (she) line(g, [[57, 103], [60, 108], [63, 103]], 1.1);
} else if (!she && st === 1){
B(g, K.blobPoly(torso, {lump: 0.4, seed: 23}), top);
P(g, K.poly([[52, 96], [60, 104], [56, 108], [49, 100]]), "white"); P(g, K.poly([[68, 96], [60, 104], [64, 108], [71, 100]]), "white");
B(g, K.blobPoly([[57, 104], [63, 104], [65, 136], [60, 142], [55, 136]], {lump: 0.2, seed: 2}), "#26326E", {depth: 1.4});
P(g, K.ball(60, 104, 4, 3.5), "#26326E");
line(g, [[36, 152], [84, 152]], 1.2);
} else if (she && st === 1){
B(g, K.blobPoly(torso, {lump: 0.4, seed: 25}), top);
P(g, K.poly([[50, 97], [70, 97], [64, 134], [56, 134]]), "#F7F7F2");
line(g, [[50, 98], [57, 124]], 1.3); line(g, [[70, 98], [63, 124]], 1.3);
P(g, K.ball(60, 140, 2.4), "#E8C46A");
} else {
const open = she || st === 3;
B(g, K.blobPoly(torso, {lump: 0.6, seed: 27 + st}), top);
if (open){ P(g, K.poly([[52, 97], [68, 97], [64, 154], [56, 154]]), "#FFF4E2"); for (const y of [112, 126, 140]) P(g, K.ball(65, y, 2.2), "#FFF1DA"); if (she && st === 3) for (let i = 0; i < 7; i++) P(g, K.ball(52 + i * 2.7, 101 + Math.sin(i / 6 * Math.PI) * 5, 1.5), "white"); }
else { P(g, K.poly([[52, 96], [60, 103], [55, 106]]), "white"); P(g, K.poly([[68, 96], [60, 103], [65, 106]]), "white"); }
for (let x = 38; x <= 82; x += 4) line(g, [[x, 149], [x, 155]], 0.8);
}
if (st === 1){
line(g, [[50, 98], [57, 124]], 2.2, {dark: "rgba(32,193,179,0.9)", light: "rgba(255,255,255,0.5)"});
line(g, [[70, 98], [63, 124]], 2.2, {dark: "rgba(32,193,179,0.9)", light: "rgba(255,255,255,0.5)"});
P(g, K.slab(60, 131, 14, 15, 2), "white"); P(g, K.slab(60, 126, 14, 4, 1), "#3A9BF0", {depth: 0.8});
}
const shortSleeve = tee;
const arm = (pts, sl) => {
if (shortSleeve){ B(g, K.blobPoly(sl, {lump: 0.4, seed: pts[0][0]}), sleeve); B(g, K.tube(pts.slice(1), 9), SKIN, {depth: 1.6, soft: 2.4}); }
else B(g, K.tube(pts, 12), sleeve, {depth: 2, soft: 3});
};
arm([[31, 106], [27, 124], [27, 148]], [[29, 104], [44, 99], [41, 128], [22, 127]]);
const lw = [27, 151];
B(g, K.ball(lw[0], lw[1] + 2, 6, 6.5), SKIN, {depth: 1.4});
if (L.tier >= 2){ P(g, K.slab(27, 146, 13, 5.5, 2), L.tier === 3 ? "#FFC83D" : "#C9CBD3"); P(g, K.ball(27, 146, 2.2), "white", {rim: 0.4}); }
arm([[89, 106], [96, 124], [hx + 4, hy + 2]], mirror([[29, 104], [44, 99], [41, 128], [22, 127]]));
held(g, hold, hx, hy);
B(g, K.ball(hx + 3, hy + 2, 6, 6.5), SKIN, {depth: 1.4});
if (!hold){
B(g, K.tube([[hx + 1, hy - 2], [hx - 2, hy - 15]], 4.2), SKIN, {depth: 1, soft: 1.4, rim: 0.6});
B(g, K.tube([[hx + 5, hy - 2], [hx + 7, hy - 15]], 4.2), SKIN, {depth: 1, soft: 1.4, rim: 0.6});
}
for (const x of [31, 89]) B(g, K.ball(x, 64, 5, 7), SKIN, {depth: 1.4});
B(g, K.ball(60, 60, 29, 31, {lump: 0.3, seed: 5}), SKIN, {sheen: {x: 48, y: 44, rx: 7, ry: 4}});
const md = L.mood;
if (md === "happy"){ line(g, [[44, 64], [49, 59], [54, 64]], 2.4); line(g, [[66, 64], [71, 59], [76, 64]], 2.4); }
else { K.eye(g, 49, 63, 4.4, 0, md === "worried" ? 0.4 : 0.1); K.eye(g, 71, 63, 4.4, 0, md === "worried" ? 0.4 : 0.1); }
if (she) for (const x of [44, 66]) line(g, [[x, 59], [x - 2, 57]], 1.1);
for (const x of [41, 79]) P(g, K.ball(x, 73, 4.6, 2.8, {lump: 0.05}), "#FFB0C8", {texture: 0, rim: 0, depth: 0.6});
line(g, [[59, 69], [61, 71]], 1.2);
if (md === "happy"){ P(g, K.blobPoly([[52, 76], [68, 76], [65, 83], [55, 83]], {lump: 0.2}), "#B4404F", {depth: 0.8}); P(g, K.ball(60, 81, 3.4, 1.8), "#FF8FA3", {rim: 0}); }
else if (md === "worried"){ line(g, [[53, 80], [57, 78], [61, 80], [65, 78], [67, 80]], 1.5); line(g, [[43, 53], [53, 56]], 1.4); line(g, [[67, 56], [77, 53]], 1.4); }
else line(g, [[54, 77], [60, 81], [66, 77]], 1.6);
if (md === "worried") P(g, K.blobPoly([[91, 44], [95, 52], [91, 56], [87, 52]], {lump: 0.1}), "sky", {rim: 0.4});
const fringe = [[30, 66], [28, 46], [36, 31], [50, 24], [66, 23], [80, 28], [90, 40], [92, 66], [86, 70], [85, 54], [79, 50], [75, 57], [69, 50], [63, 56], [57, 49], [51, 56], [45, 50], [39, 57], [35, 53], [34, 70]];
B(g, K.blobPoly(fringe, {lump: 0.5, seed: 9, step: 7}), hair, {sheen: {x: 46, y: 32, rx: 8, ry: 3}, depth: 2.2});
line(g, [[52, 30], [48, 44]], 1.1); line(g, [[64, 28], [66, 42]], 1.1);
if (she && st !== 3) for (const s of [-1, 1]) B(g, K.blobPoly(s < 0 ? [[30, 60], [36, 56], [38, 84], [32, 98], [26, 84]] : mirror([[30, 60], [36, 56], [38, 84], [32, 98], [26, 84]]), {lump: 0.4, seed: 30 + s}), hair, {depth: 1.6});
if (she && st === 0) P(g, K.slab(80, 44, 10, 4, 2), "#FF5FA2");
if (she && st === 3) B(g, K.ball(60, 22, 11, 9), hair);
if (st === 3){
for (const x of [49, 71]) line(g, [[x - 7, 63], [x - 6, 58], [x, 56], [x + 6, 58], [x + 7, 63], [x + 6, 68], [x, 70], [x - 6, 68], [x - 7, 63]], 1.6);
line(g, [[56, 62], [64, 62]], 1.4);
}
if (L.tier === 3){
for (const x of [48, 72]){ P(g, K.slab(x, 32, 17, 9, 4), "#FFC83D", {depth: 0.8}); P(g, K.slab(x, 32, 13, 6, 3), "#5D7FB8", {depth: 0.6, sheen: {x: x - 3, y: 30, rx: 3, ry: 1.2}}); }
P(g, K.slab(60, 31, 8, 2.4, 1), "#FFC83D", {depth: 0.5});
}
if (L.drops >= 1) { P(g, K.slab(82, 76, 12, 5, 2), "#F2D2A0"); line(g, [[80, 75], [80, 77]], 0.8); line(g, [[84, 75], [84, 77]], 0.8); }
if (L.drops >= 2) { P(g, K.slab(38, 46, 11, 5, 2), "#F2D2A0"); line(g, [[36, 45], [36, 47]], 0.8); line(g, [[40, 45], [40, 47]], 0.8); }
if (L.boost) sparkles(g);
}
function crab(g, mood){
if (!castImg || !CAST) return false;
const c = CAST.crab[mood === "happy" ? "happy" : mood === "worried" || mood === "cover" ? "worried" : "idle"];
g.drawImage(castImg, c.x, c.y, c.w, c.h, -40, -30, 80, 64); return true;
}
window.TFF_AVATAR = {draw, keyOf, W: 120, H: 230, onCast, crab};
})();
(function (root) {
"use strict";
const W = 440, H = 700, PW = 270, FLOOR = 50, WATER_Y = 120;
const GAME_MS = 180000, CARD_MS = 10000, FIRST_CARD = 5000, CARD_GAP = 26000;
const SLOW_CARD_MS = 30000, RESULT_MS = 16000;
const STEP = 1000 / 60;
const FALL = [1.5, 1.8, 2.1, 2.4];
const WARMUP_MS = 45000, WARMUP_FROM = 0.65;
const MAX_DROPS = 3, DROP_GRACE_MS = 1800, ANCHOR_DEPTH = FLOOR * 2.5, ANCHOR_REST = 120;
const VINE_RARE = 0.12, VINE_GRABS = 4, MAX_FUSED = 8;
const LOCK_RARE = 0.04, LOCK_REST = 12, NET_MS = 25000, NET_CATCHES = 3, NET_Y = WATER_Y - 16;
const SLIME_RARE = 0.18, SLIME_GRAB = 0.9, SLIME_SPIN = 0.9;
const JACKPOT_RARE = 0.005, JACKPOT_BONUS = 2000, FRENZY_MS = 15000, FRENZY_X = 1.5;
const SIL_ROW = 12.5, SIL_ROWS = 120;
const ANON = "Anonymous crab 匿名蟹";
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const fmt = n => (n < 0 ? "−" : "") + "HK$" + Math.abs(Math.round(n)).toLocaleString("en-US");
const fmtShort = n => Math.abs(Math.round(n)).toLocaleString("en-US");
const floorTxt = f => f < 1 ? "G/F" : Math.floor(f + 1e-6) + "F";
const mmss = ms => { const s = Math.floor(ms / 1000); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); };
function isoWeek(d){
const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
const day = t.getUTCDay() || 7;
t.setUTCDate(t.getUTCDate() + 4 - day);
const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
return t.getUTCFullYear() + "-W" + String(Math.ceil(((t - y0) / 86400000 + 1) / 7)).padStart(2, "0");
}
function stageFor(floors, stages){
let s = 0;
(stages || []).forEach((st, i) => { if (floors >= st.at) s = i; });
return s;
}
function hapticSegments(ms){
const segs = [];
if (Array.isArray(ms)){
let delay = 0;
for (let i = 0; i < ms.length; i++){
const v = Math.max(0, Math.round(ms[i] || 0));
if (i % 2 === 0 && v > 0) segs.push({delay, dur: v});
delay += v;
}
} else {
const v = Math.max(0, Math.round(ms || 0));
if (v > 0) segs.push({delay: 0, dur: v});
}
return segs;
}
function warmupFactor(playMs){
return WARMUP_FROM + (1 - WARMUP_FROM) * clamp((playMs || 0) / WARMUP_MS, 0, 1);
}
function fallSpeedFor(stage, playMs, speedUntil){
let f = (FALL[stage] ?? FALL[0]) * warmupFactor(playMs);
if (playMs < (speedUntil || 0)) f *= 1.7;
return f;
}
const canTriggerDrop = (playMs, lastDropAt, graceMs = DROP_GRACE_MS) => playMs - lastDropAt >= graceMs;
function shouldAnchorBody(restN, releasedAt, playMs, stackHeight, bodyMinY){
return restN >= ANCHOR_REST && playMs - releasedAt > 8000 && stackHeight >= ANCHOR_DEPTH && bodyMinY > -stackHeight + ANCHOR_DEPTH;
}
function computePayout(base, rate, frenzyOn, frenzyX = FRENZY_X){
const one = Math.round(base * rate / 10) * 10;
if (!frenzyOn) return [one, 1, 0];
const gain = Math.round(base * rate * frenzyX / 10) * 10;
return [gain, frenzyX, gain - one];
}
function rollItemTrait(r){
if (r < VINE_RARE) return "vine";
if (r < VINE_RARE + LOCK_RARE) return "lock";
if (r < VINE_RARE + LOCK_RARE + SLIME_RARE) return "slime";
return "plain";
}
function encodeSilhouette(parts, worldW = W, rowH = SIL_ROW, maxRows = SIL_ROWS){
const rows = [];
for (const part of parts || []){
const vs = part.vertices, n = vs.length;
if (!n) continue;
const i0 = Math.max(0, Math.floor(-part.maxY / rowH));
const i1 = Math.min(maxRows - 1, Math.floor(-part.minY / rowH));
for (let i = i0; i <= i1; i++){
const ya = -(i + 1) * rowH, yb = -i * rowH;
let l = Infinity, r = -Infinity;
for (let j = 0; j < n; j++){
const p = vs[j], q = vs[(j + 1) % n];
if (p.y >= ya && p.y <= yb){ l = Math.min(l, p.x); r = Math.max(r, p.x); }
for (const yy of [ya, yb]) if ((p.y - yy) * (q.y - yy) < 0){
const x = p.x + (q.x - p.x) * (yy - p.y) / (q.y - p.y);
l = Math.min(l, x); r = Math.max(r, x);
}
}
if (l <= r){
const row = rows[i] || (rows[i] = [Infinity, -Infinity]);
row[0] = Math.min(row[0], l); row[1] = Math.max(row[1], r);
}
}
}
const enc = v => Math.round(clamp(v, 0, worldW)).toString(36).padStart(2, "0");
let s = "";
for (let i = 0; i < rows.length; i++) s += rows[i] ? enc(rows[i][0]) + enc(rows[i][1]) : "0000";
return s || undefined;
}
function decodeSilhouette(sil){
if (typeof sil !== "string" || !/^(?:[0-9a-z]{4}){1,120}$/.test(sil)) return null;
const rows = [];
for (let i = 0; i < sil.length; i += 4){
const l = parseInt(sil.slice(i, i + 2), 36), r = parseInt(sil.slice(i + 2, i + 4), 36);
if (l > r || r > W) return null;
rows.push(r > l ? [l, r] : null);
}
return rows;
}
const MEDAL_TIER = {zero: "gold", retire: "gold", lucky: "gold", stacker: "gold", tycoon: "gold", steady: "silver"};
const tierOf = v => (v && MEDAL_TIER[v.id]) || "bronze";
function verdictOf(st, titles, stageCount = 4){
const f = st.falls || {spend: 0, scam: 0, delay: 0};
const t = st.troll || {};
const tests = {
diver: () => st.over === "drops" && st.stage === 0,
scamvip: () => (f.scam || 0) >= 2,
believer: () => (t.invest || 0) >= 2,
future: () => (f.spend || 0) >= 2,
tomorrow: () => (f.delay || 0) + (st.missed || 0) >= 2,
scratch: () => !!t.ticketSeen && (t.tickets || 0) >= 2,
zero: () => (f.spend || 0) + (f.scam || 0) + (f.delay || 0) === 0 && (st.wise || 0) >= 3,
retire: () => st.stage === stageCount - 1,
lucky: () => (st.jpAt ?? -1) >= 0,
stacker: () => (st.best || 0) / FLOOR >= 12,
tycoon: () => (st.score || 0) >= 30000,
steady: () => (st.score || 0) > 0,
moonlight: () => true
};
return (titles || []).find(item => tests[item.id] && tests[item.id]()) || (titles && titles[titles.length - 1]) || null;
}
function sanitizeName(n){
const v = String(n || "").replace(/[\u0000-\u001f<>]/g, "").trim();
return !v || v === ANON ? ANON : Array.from(v).slice(0, 16).join("");
}
const zhName = n => /[A-Za-z0-9]$/.test(n) ? n + " " : n;
const zhIn = n => /^[A-Za-z0-9]/.test(n) ? " " + n : n;
function parseChallenge({metaJson, search, storedJson, titles, isValidPersona}){
let c = null;
if (metaJson){ try { c = JSON.parse(metaJson); } catch(e){ c = null; } }
if (!c && search){
const q = new URLSearchParams(search), sr = q.get("s") || "";
if (/^-?\d{1,7}$/.test(sr)) c = {s: Number(sr), n: q.get("n") || "", v: q.get("v") || "", p: q.get("p") || "", sil: q.get("sil") || ""};
}
if (!c && storedJson){ try { c = JSON.parse(storedJson); } catch(e){ c = null; } }
if (!c || typeof c.s !== "number" || !Number.isFinite(c.s) || Math.abs(c.s) > 9999999) return null;
const n = typeof c.n === "string" ? sanitizeName(c.n) : ANON;
const p = typeof c.p === "string" && (!isValidPersona || isValidPersona(c.p)) ? c.p : "";
const sil = typeof c.sil === "string" && decodeSilhouette(c.sil) ? c.sil : "";
return {s: Math.round(c.s), n: n === ANON ? "" : n, v: (titles || []).find(x => x.id === c.v) || null, p, sil};
}
function aggregateStats(games, quizLen = 3, habitNowFn = x => x){
const a = {games: games.length, wise: 0, risky: 0, missed: 0, falls: {spend: 0, scam: 0, delay: 0}, habits: {}, quizSum: 0, quizN: 0, quizPass: 0, sample: false};
for (const gm of games){
a.wise += +gm.wise || 0; a.risky += +gm.risky || 0; a.missed += +gm.missed || 0;
if (gm.falls) for (const kk in a.falls) a.falls[kk] += +gm.falls[kk] || 0;
const hb = gm.habit && (habitNowFn(gm.habit) || gm.habit);
if (hb) a.habits[hb] = (a.habits[hb] || 0) + 1;
const done = Array.isArray(gm.answers) ? gm.answers.length === quizLen : typeof gm.quiz === "number";
if (done && typeof gm.quiz === "number"){ a.quizSum += gm.quiz; a.quizN++; if (gm.quiz >= 2) a.quizPass++; }
}
return a;
}
function mergeStats(a, b){
const o = {...a, falls: {...a.falls}, habits: {...a.habits}};
o.games += b.games; o.wise += b.wise; o.risky += b.risky; o.missed += b.missed;
o.quizSum += b.quizSum; o.quizN += b.quizN; o.quizPass += b.quizPass || 0;
for (const kk in o.falls) o.falls[kk] += b.falls[kk] || 0;
for (const kk in b.habits) o.habits[kk] = (o.habits[kk] || 0) + b.habits[kk];
return o;
}
root.TFF_CORE = {
W, H, PW, FLOOR, WATER_Y, GAME_MS, CARD_MS, FIRST_CARD, CARD_GAP,
SLOW_CARD_MS, RESULT_MS, STEP, FALL, WARMUP_MS, WARMUP_FROM,
MAX_DROPS, DROP_GRACE_MS, ANCHOR_DEPTH, ANCHOR_REST,
VINE_RARE, VINE_GRABS, MAX_FUSED, LOCK_RARE, LOCK_REST, NET_MS, NET_CATCHES, NET_Y,
SLIME_RARE, SLIME_GRAB, SLIME_SPIN, JACKPOT_RARE, JACKPOT_BONUS, FRENZY_MS, FRENZY_X,
SIL_ROW, SIL_ROWS, ANON, MEDAL_TIER,
clamp, fmt, fmtShort, floorTxt, mmss, isoWeek, stageFor,
hapticSegments, warmupFactor, fallSpeedFor, canTriggerDrop, shouldAnchorBody,
computePayout, rollItemTrait, encodeSilhouette, decodeSilhouette,
tierOf, verdictOf, sanitizeName, zhName, zhIn, parseChallenge, aggregateStats, mergeStats
};
})(typeof window !== "undefined" ? window : globalThis);
