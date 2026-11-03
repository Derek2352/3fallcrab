// The player: Jack or Jackie, a clay figure (full body) dressed by the game's state.
//   who    "jack" | "jackie"
//   stage  0 University (oversized tee), 1 First Job (shirt and tie / blouse and blazer, ID lanyard),
//          2 Family (knit / cardigan), 3 Retirement (grey hair, glasses, cardigan)
//   tier   money: 0 broke (a patched knee), 1 getting by, 2 comfortable (a watch), 3 well off (gold watch, sunglasses)
//   hand   the last money decision: null (a peace sign), "piggy" (saved), "bags" (overspent), "phone" (scammed),
//          "hourglass" (put it off)
//   mood   "idle" | "happy" | "worried"; drops 0-2 (plasters); boost (savings boost x2: sparkles)
// Jack's university look is the oversized tan tee with white sleeves of the first photo; Jackie's is the plain white
// oversized tee with a little V at the collar of the second, with a grey pleated school skirt.
// draw(g, look) paints it in a 120 x 230 box (feet at y 222); the caller sets the scale.
(function(){
"use strict";
const K = window.CLAY;
const SKIN = "#F7D2B3", HAIR = "#2E2530", GREY = "#C8CAD2";
const OUTFIT = {   // [top, sleeves, bottom, shoes]
  jack:   [["#CDB79C", "#F4F1EA", "#3B302E", "sneaker"], ["#F7F7F2", "#F7F7F2", "#2C3566", "black"], ["#2F8F87", "#2F8F87", "#C49A6C", "brown"], ["#9C3D4A", "#9C3D4A", "#7C7F8C", "brown"]],
  jackie: [["#F7F7F2", "#F7F7F2", "#8C8F99", "sneaker"], ["#2C3566", "#2C3566", "#2C3566", "black"], ["#F28B6E", "#F28B6E", "#3F5BA9", "brown"], ["#9C8AD8", "#9C8AD8", "#8A8D99", "brown"]]
};
const B = (g, path, color, o) => K.blob(g, path, color, Object.assign({depth: 2.4, soft: 3.6, texture: 0.08, sheen: false, rim: 0.8}, o || {}));
const P = (g, path, color, o) => K.press(g, path, color, Object.assign({sheen: false, texture: 0.04}, o || {}));
const line = (g, pts, w, o) => K.groove(g, K.poly(pts, false), w || 1.4, o);
const mirror = pts => pts.map(([x, y]) => [120 - x, y]);

function keyOf(L){ return [L.who, L.stage, L.tier, L.hand || "-", L.mood, L.drops, L.boost ? 1 : 0].join("|"); }

function draw(g, L){
  const she = L.who === "jackie", st = Math.max(0, Math.min(3, L.stage | 0)), [top, sleeve, bottom, shoes] = OUTFIT[she ? "jackie" : "jack"][st];
  const hair = st === 3 ? GREY : HAIR, skirt = she && st <= 2, longSkirt = she && st === 3;
  const hold = L.hand || null, hx = 82, hy = 132;   // the right hand, raised, when it holds something (or makes a peace sign)
  // ground shadow
  g.save(); g.fillStyle = "rgba(40,30,60,0.18)"; g.beginPath(); g.ellipse(60, 222, 34, 5, 0, 0, Math.PI * 2); g.fill(); g.restore();
  // long hair behind (Jackie)
  if (she && st !== 3) B(g, K.blobPoly([[27, 56], [31, 32], [60, 21], [89, 32], [93, 56], [96, 104], [86, 112], [34, 112], [24, 104]], {lump: 0.6, seed: 3}), hair);
  // legs and shoes
  if (skirt && st === 0){   // a grey pleated school skirt, white socks
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
    if (L.tier === 0){   // a patched knee
      P(g, K.slab(73, 190, 11, 11, 2), "#C9A27A");
      line(g, [[69, 186], [77, 194]], 0.9); line(g, [[77, 186], [69, 194]], 0.9);
    }
  }
  for (const [x, s] of [[47, -1], [73, 1]]){
    if (shoes === "sneaker"){ P(g, K.slab(x + s * 2, 218, 26, 7, 3), "#3B3646"); B(g, K.ball(x + s * 2, 212, 13, 7.5, {lump: 0.2}), "white"); line(g, [[x + s * 2 - 6, 210], [x + s * 2 + 4, 210]], 0.9); }
    else { const c = shoes === "black" ? "#2E2838" : "#7A4A2C"; B(g, K.ball(x + s * 2, 214, 12, 7, {lump: 0.2}), c, {sheen: {x: x + s * 2 - 4, y: 211, rx: 4, ry: 1.6}}); }
  }
  // neck, then the top
  B(g, K.slab(60, 94, 16, 14, 5), SKIN, {depth: 1.6});
  const tee = st === 0, torso = tee ? [[29, 106], [45, 96], [75, 96], [91, 106], [93, 160], [27, 160]] : [[35, 104], [47, 96], [73, 96], [85, 104], [86, 156], [34, 156]];
  if (tee){
    B(g, K.blobPoly(torso, {lump: 0.6, seed: 21}), top);
    if (!she) B(g, K.slab(60, 160, 66, 9, 3), "white");   // Jack: the white layer under the hem
    line(g, [[52, 98], [60, 103], [68, 98]], 1.3);   // neckline
    if (she) line(g, [[57, 103], [60, 108], [63, 103]], 1.1);   // Jackie: the little V at the collar
  } else if (!she && st === 1){   // shirt and tie
    B(g, K.blobPoly(torso, {lump: 0.4, seed: 23}), top);
    P(g, K.poly([[52, 96], [60, 104], [56, 108], [49, 100]]), "white"); P(g, K.poly([[68, 96], [60, 104], [64, 108], [71, 100]]), "white");
    B(g, K.blobPoly([[57, 104], [63, 104], [65, 136], [60, 142], [55, 136]], {lump: 0.2, seed: 2}), "#26326E", {depth: 1.4});
    P(g, K.ball(60, 104, 4, 3.5), "#26326E");
    line(g, [[36, 152], [84, 152]], 1.2);
  } else if (she && st === 1){   // blouse under a blazer
    B(g, K.blobPoly(torso, {lump: 0.4, seed: 25}), top);
    P(g, K.poly([[50, 97], [70, 97], [64, 134], [56, 134]]), "#F7F7F2");
    line(g, [[50, 98], [57, 124]], 1.3); line(g, [[70, 98], [63, 124]], 1.3);
    P(g, K.ball(60, 140, 2.4), "#E8C46A");
  } else {   // a knit (Jack, family) or an open cardigan over a light top
    const open = she || st === 3;
    B(g, K.blobPoly(torso, {lump: 0.6, seed: 27 + st}), top);
    if (open){ P(g, K.poly([[52, 97], [68, 97], [64, 154], [56, 154]]), "#FFF4E2"); for (const y of [112, 126, 140]) P(g, K.ball(65, y, 2.2), "#FFF1DA"); if (she && st === 3) for (let i = 0; i < 7; i++) P(g, K.ball(52 + i * 2.7, 101 + Math.sin(i / 6 * Math.PI) * 5, 1.5), "white"); }
    else { P(g, K.poly([[52, 96], [60, 103], [55, 106]]), "white"); P(g, K.poly([[68, 96], [60, 103], [65, 106]]), "white"); }
    for (let x = 38; x <= 82; x += 4) line(g, [[x, 149], [x, 155]], 0.8);   // ribbed hem
  }
  if (st === 1){   // the ID lanyard
    line(g, [[50, 98], [57, 124]], 2.2, {dark: "rgba(32,193,179,0.9)", light: "rgba(255,255,255,0.5)"});
    line(g, [[70, 98], [63, 124]], 2.2, {dark: "rgba(32,193,179,0.9)", light: "rgba(255,255,255,0.5)"});
    P(g, K.slab(60, 131, 14, 15, 2), "white"); P(g, K.slab(60, 126, 14, 4, 1), "#3A9BF0", {depth: 0.8});
  }
  // arms: the left hangs; the right holds the item (or makes a peace sign), or hangs too
  const shortSleeve = tee;
  const arm = (pts, sl) => {
    if (shortSleeve){ B(g, K.blobPoly(sl, {lump: 0.4, seed: pts[0][0]}), sleeve); B(g, K.tube(pts.slice(1), 9), SKIN, {depth: 1.6, soft: 2.4}); }
    else B(g, K.tube(pts, 12), sleeve, {depth: 2, soft: 3});
  };
  arm([[31, 106], [27, 124], [27, 148]], [[29, 104], [44, 99], [41, 128], [22, 127]]);
  const lw = [27, 151];
  B(g, K.ball(lw[0], lw[1] + 2, 6, 6.5), SKIN, {depth: 1.4});
  if (L.tier >= 2){ P(g, K.slab(27, 146, 13, 5.5, 2), L.tier === 3 ? "#FFC83D" : "#C9CBD3"); P(g, K.ball(27, 146, 2.2), "white", {rim: 0.4}); }
  arm([[89, 106], [96, 124], [hx + 4, hy + 2]], mirror([[29, 104], [44, 99], [41, 128], [22, 127]]));   // the right arm, raised
  // the item in hand, then the hand
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
  B(g, K.ball(hx + 3, hy + 2, 6, 6.5), SKIN, {depth: 1.4});
  if (!hold){   // a peace sign, as in the photo
    B(g, K.tube([[hx + 1, hy - 2], [hx - 2, hy - 15]], 4.2), SKIN, {depth: 1, soft: 1.4, rim: 0.6});
    B(g, K.tube([[hx + 5, hy - 2], [hx + 7, hy - 15]], 4.2), SKIN, {depth: 1, soft: 1.4, rim: 0.6});
  }
  // the head
  for (const x of [31, 89]) B(g, K.ball(x, 64, 5, 7), SKIN, {depth: 1.4});
  B(g, K.ball(60, 60, 29, 31, {lump: 0.3, seed: 5}), SKIN, {sheen: {x: 48, y: 44, rx: 7, ry: 4}});
  // the face
  const md = L.mood;
  if (md === "happy"){ line(g, [[44, 64], [49, 59], [54, 64]], 2.4); line(g, [[66, 64], [71, 59], [76, 64]], 2.4); }
  else { K.eye(g, 49, 63, 4.4, 0, md === "worried" ? 0.4 : 0.1); K.eye(g, 71, 63, 4.4, 0, md === "worried" ? 0.4 : 0.1); }
  if (she) for (const x of [44, 66]) line(g, [[x, 59], [x - 2, 57]], 1.1);   // lashes
  for (const x of [41, 79]) P(g, K.ball(x, 73, 4.6, 2.8, {lump: 0.05}), "#FFB0C8", {texture: 0, rim: 0, depth: 0.6});
  line(g, [[59, 69], [61, 71]], 1.2);
  if (md === "happy"){ P(g, K.blobPoly([[52, 76], [68, 76], [65, 83], [55, 83]], {lump: 0.2}), "#B4404F", {depth: 0.8}); P(g, K.ball(60, 81, 3.4, 1.8), "#FF8FA3", {rim: 0}); }
  else if (md === "worried"){ line(g, [[53, 80], [57, 78], [61, 80], [65, 78], [67, 80]], 1.5); line(g, [[43, 53], [53, 56]], 1.4); line(g, [[67, 56], [77, 53]], 1.4); }
  else line(g, [[54, 77], [60, 81], [66, 77]], 1.6);
  if (md === "worried") P(g, K.blobPoly([[91, 44], [95, 52], [91, 56], [87, 52]], {lump: 0.1}), "sky", {rim: 0.4});
  // the hair over the head: a shaggy fringe (the photo); grey in retirement, with a bun for Jackie
  const fringe = [[30, 66], [28, 46], [36, 31], [50, 24], [66, 23], [80, 28], [90, 40], [92, 66], [86, 70], [85, 54], [79, 50], [75, 57], [69, 50], [63, 56], [57, 49], [51, 56], [45, 50], [39, 57], [35, 53], [34, 70]];
  B(g, K.blobPoly(fringe, {lump: 0.5, seed: 9, step: 7}), hair, {sheen: {x: 46, y: 32, rx: 8, ry: 3}, depth: 2.2});
  line(g, [[52, 30], [48, 44]], 1.1); line(g, [[64, 28], [66, 42]], 1.1);
  if (she && st !== 3) for (const s of [-1, 1]) B(g, K.blobPoly(s < 0 ? [[30, 60], [36, 56], [38, 84], [32, 98], [26, 84]] : mirror([[30, 60], [36, 56], [38, 84], [32, 98], [26, 84]]), {lump: 0.4, seed: 30 + s}), hair, {depth: 1.6});
  if (she && st === 0) P(g, K.slab(80, 44, 10, 4, 2), "#FF5FA2");   // a hair clip
  if (she && st === 3) B(g, K.ball(60, 22, 11, 9), hair);
  if (st === 3){   // glasses
    for (const x of [49, 71]) line(g, [[x - 7, 63], [x - 6, 58], [x, 56], [x + 6, 58], [x + 7, 63], [x + 6, 68], [x, 70], [x - 6, 68], [x - 7, 63]], 1.6);
    line(g, [[56, 62], [64, 62]], 1.4);
  }
  if (L.tier === 3){   // gold-rimmed sunglasses pushed up on the hair
    for (const x of [48, 72]){ P(g, K.slab(x, 32, 17, 9, 4), "#FFC83D", {depth: 0.8}); P(g, K.slab(x, 32, 13, 6, 3), "#5D7FB8", {depth: 0.6, sheen: {x: x - 3, y: 30, rx: 3, ry: 1.2}}); }
    P(g, K.slab(60, 31, 8, 2.4, 1), "#FFC83D", {depth: 0.5});
  }
  if (L.drops >= 1) { P(g, K.slab(82, 76, 12, 5, 2), "#F2D2A0"); line(g, [[80, 75], [80, 77]], 0.8); line(g, [[84, 75], [84, 77]], 0.8); }
  if (L.drops >= 2) { P(g, K.slab(38, 46, 11, 5, 2), "#F2D2A0"); line(g, [[36, 45], [36, 47]], 0.8); line(g, [[40, 45], [40, 47]], 0.8); }
  if (L.boost) for (const [x, y, r] of [[14, 40, 6], [104, 30, 7], [108, 96, 5]]) P(g, K.poly(Array.from({length: 8}, (_, i) => { const a = i * Math.PI / 4 - Math.PI / 2, q = i % 2 ? r * 0.4 : r; return [x + Math.cos(a) * q, y + Math.sin(a) * q]; })), "#FFE45C", {rim: 0.5});
}
window.TFF_AVATAR = {draw, keyOf, W: 120, H: 230};
})();
