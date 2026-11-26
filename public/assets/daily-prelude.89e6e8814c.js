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
x.strokeStyle = "rgba(0,0,0,0.22)"; x.lineCap = "round";
for (let f = 0; f < 3; f++){
const fx = r()*S, fy = r()*S, rot = r()*Math.PI;
for (let k = 2; k < 13; k += 1.6){ x.lineWidth = 0.35; x.beginPath();
const a0 = rot + r()*0.6, a1 = a0 + Math.PI*(0.7 + r()*0.6);
for (const ox of [-S, 0, S]) for (const oy of [-S, 0, S]){ x.moveTo(fx + ox + k*Math.cos(a0), fy + oy + k*0.8*Math.sin(a0)); x.ellipse(fx + ox, fy + oy, k, k*0.8, 0, a0, a1); }
x.stroke(); }
}
for (let i = 0; i < 90; i++){ x.fillStyle = r() > 0.5 ? "rgba(0,0,0,0.18)" : "rgba(255,255,255,0.28)"; x.beginPath(); x.arc(r()*S, r()*S, 0.25 + r()*0.45, 0, 7); x.fill(); }
return c;
}
function texIn(g, path, amount){ g.save(); g.globalAlpha = amount; g.globalCompositeOperation = "overlay"; g.fillStyle = texPattern(g); g.fill(path); g.restore(); }
function texture(g, path, amount = 0.03){ g.save(); g.clip(path); texIn(g, path, amount); g.restore(); }
function blob(g, path, color, opt = {}){
const c = col(color);
g.save(); g.fillStyle = c; g.fill(path);
const depth = opt.depth ?? 4.2, soft = opt.soft ?? 6.5, tex = opt.texture ?? 0.03, rim = opt.rim ?? 1, bb = path.bb, k = scaleOf(g);
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
blob(g, path, color, Object.assign({depth: 1.6, soft: 2.6, texture: 0.02, rim: 0.7}, opt));
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
