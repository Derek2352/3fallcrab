"""Cuts the cast out of the character cards in art/cards/ and packs them for the game.

  Jack and Jackie in their four life-stage outfits (University, First Job, Family, Retirement) and the crab in three
  moods (its smile, cheering, worried), from the photographed clay model sheets made with GPT Image 2:
    jack.jpg        Jack's model sheet: the front view is his University look (the sharpest source)
    jackie.jpg      Jackie's model sheet: the same for her
    stages.jpg      both of them in all four outfits, side by side at one scale (the other stages, and their sizes)
    crab-props.jpg  the crab's views and moods (and the props, not used here)

  Writes src/art/cast.webp (one image holding every figure) and the table of where each figure is, and where its
  head and right hand are, into src/avatar.js between the "// <cast>" and "// </cast>" lines. The game draws them in
  place of its own drawn figure and crab once that image has loaded (src/avatar.js, crabArt in src/game.js).

  python3 tools/cast.py        needs: pip install "rembg[cpu]" scipy pillow numpy (the first run downloads the
                               isnet-general-use model, about 180 MB). Then npm run build.
"""
import json, re, sys
from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage
from rembg import new_session, remove

ROOT = Path(__file__).resolve().parent.parent
CARDS, OUT, AVJS = ROOT / "art" / "cards", ROOT / "src" / "art" / "cast.webp", ROOT / "src" / "avatar.js"
BOX_W, BOX_H, FEET = 120, 230, 222      # the avatar's box (src/avatar.js), and where its feet stand
K = 2.4                                 # atlas pixels per box unit: sharp on the 1080 px result card (drawn at 2.45)
JACK_H = 201                            # Jack's University height in box units (head top to soles), as the drawn figure
CRAB_W, CRAB_H, CK = 80, 64, 3          # the crab's layer (crabArt draws round (40, 30) in it)

session = new_session("isnet-general-use")


def cut(name, floor_lines=False):
    """The card with its backdrop removed: RGB and a clean alpha (0-1)."""
    im = Image.open(CARDS / name).convert("RGB")
    rgba = np.asarray(remove(im, session=session)).astype(np.float32)
    rgb, a = rgba[..., :3], rgba[..., 3] / 255
    # light clothes on a light backdrop (white sneakers, socks) come out half see-through: firm the alpha up
    a = np.clip((a - 0.08) / 0.5, 0, 1)
    if not floor_lines:
        return rgb, a
    # the line-up card's thin floor lines run under the feet: drop rows with one unbroken solid run across the sheet
    def longest_run(row):
        best = run = 0
        for v in row:
            run = run + 1 if v else 0
            best = max(best, run)
        return best
    solid = a > 0.3
    wide = np.array([longest_run(r) > a.shape[1] * 0.3 for r in solid])
    a[ndimage.binary_dilation(wide, iterations=3)] = 0
    return rgb, a


def parts(a, min_area=1500):
    """The separate solid shapes on a card, biggest first: (mask, bbox x0, y0, x1, y1)."""
    lab, n = ndimage.label(ndimage.binary_opening(a > 0.5, iterations=2))
    out = []
    for i, sl in enumerate(ndimage.find_objects(lab), 1):
        m = lab == i
        if m.sum() < min_area:
            continue
        out.append((m, sl[1].start, sl[0].start, sl[1].stop, sl[0].stop))
    return sorted(out, key=lambda p: -(p[3] - p[1]) * (p[4] - p[2]))


def piece(rgb, a, part):
    """One figure cut out: RGBA crop, its holes filled (so nothing inside it is see-through)."""
    m, x0, y0, x1, y1 = part
    keep = ndimage.binary_dilation(m, iterations=4)              # the soft edge round the solid shape
    solid = ndimage.binary_erosion(ndimage.binary_fill_holes(m), iterations=2)
    alpha = np.where(keep, np.maximum(a, solid.astype(np.float32)), 0)
    x0, y0, x1, y1 = max(0, x0 - 6), max(0, y0 - 6), min(a.shape[1], x1 + 6), min(a.shape[0], y1 + 6)
    out = np.dstack([rgb[y0:y1, x0:x1], alpha[y0:y1, x0:x1] * 255]).astype(np.uint8)
    im = Image.fromarray(out, "RGBA")
    return im.crop(im.getbbox())


def anchors(fig, scale, ox, oy):
    """Where the head is (top, centre, width) and the right hand (viewer's right), in box units."""
    px = np.asarray(fig).astype(np.int32)
    al = px[..., 3] > 128
    rows = np.where(al.any(axis=1))[0]
    top, bottom = rows[0], rows[-1]
    h = bottom - top
    # the head with its hair: the top fifth of a puppet about 4.5 heads tall (below that come the shoulders)
    neck = top + int(h * 0.19)
    cols = np.where(al[top:neck].any(axis=0))[0]
    head_w = (cols[-1] - cols[0]) if len(cols) else h * 0.2
    head_cx = (cols[0] + cols[-1]) / 2 if len(cols) else fig.width / 2
    # the right hand (viewer's right): the lowest patch of skin right of the head's centre, between 38% and 66%
    r, g, b = px[..., 0], px[..., 1], px[..., 2]
    skin = al & (r > 170) & (r - b > 35) & (b > r * 0.62) & (g > 120) & (g < r)   # pale peach, not khaki
    best = None
    for y in range(top + int(h * 0.38), top + int(h * 0.66)):   # above the knees (Jackie's are bare)
        xs = np.where(skin[y, int(head_cx + head_w * 0.25):])[0]
        if len(xs) >= 3:
            best = (int(head_cx + head_w * 0.25) + int(np.median(xs)), y)
    if best is None:
        best = (int(head_cx + head_w * 0.6), top + int(h * 0.55))
    u = lambda v: v * scale / K
    return {"top": round(oy + u(top), 1), "cx": round(ox + u(head_cx), 1), "hw": round(u(head_w), 1),
            "neck": round(oy + u(neck), 1), "hx": round(ox + u(best[0]), 1), "hy": round(oy + u(best[1]), 1)}


def place(atlas, fig, height_units, cell_x):
    """A figure into its atlas cell (the avatar's 120 x 230 box at K px a unit), feet on the line, centred."""
    s = height_units * K / fig.height
    f = fig.resize((max(1, round(fig.width * s)), max(1, round(fig.height * s))), Image.LANCZOS)
    cw, ch = round(BOX_W * K), round(BOX_H * K)
    px, py = cell_x + (cw - f.width) // 2, round(FEET * K) - f.height
    atlas.alpha_composite(f, (px, py))
    ox, oy = (px - cell_x) / K, py / K
    return {"x": cell_x, "y": 0, "w": cw, "h": ch, **anchors(f, 1.0, ox, oy)}


# --- Jack and Jackie
rgb, a = cut("stages.jpg", floor_lines=True)
figs = [p for p in parts(a) if p[4] - p[2] > a.shape[0] * 0.25]   # tall shapes only (not the labels)
mid = a.shape[0] / 2
top = sorted([p for p in figs if (p[2] + p[4]) / 2 < mid], key=lambda p: p[1])
bot = sorted([p for p in figs if (p[2] + p[4]) / 2 >= mid], key=lambda p: p[1])
if len(top) != 4 or len(bot) != 4:
    sys.exit(f"stages.jpg: expected 4 + 4 figures, found {len(top)} + {len(bot)}")
lineup = {"jack": [piece(rgb, a, p) for p in top], "jackie": [piece(rgb, a, p) for p in bot]}
base = lineup["jack"][0].height                                   # Jack at University sets the scale for everyone

big = {}
for who in ("jack", "jackie"):
    r2, a2 = cut(who + ".jpg")
    tall = [p for p in parts(a2) if p[4] - p[2] > a2.shape[0] * 0.5]
    big[who] = piece(r2, a2, min(tall, key=lambda p: p[1]))       # the front view: the left-most full figure

cw, ch = round(BOX_W * K), round(BOX_H * K)
crab_cw, crab_ch = CRAB_W * CK, CRAB_H * CK
atlas = Image.new("RGBA", (cw * 8, ch + crab_ch), (0, 0, 0, 0))
table = {"k": K, "fig": {"jack": [], "jackie": []}, "crab": {}}
for wi, who in enumerate(("jack", "jackie")):
    for st in range(4):
        units = JACK_H * lineup[who][st].height / base
        src = big[who] if st == 0 else lineup[who][st]
        table["fig"][who].append(place(atlas, src, units, (wi * 4 + st) * cw))

# --- the crab: its smile (front view), cheering and worried (claws over its mouth)
# each mood's own area of the card (fractions of its width and height, above its label), cut out on its own: across the
# whole card the small framed crabs get taken for backdrop
card = Image.open(CARDS / "crab-props.jpg").convert("RGB")
W, H = card.size
AREAS = {"idle": (0.01, 0.19, 0.17, 0.39), "happy": (0.582, 0.08, 0.713, 0.252), "worried": (0.716, 0.08, 0.848, 0.252)}
for i, (mood, (fx0, fy0, fx1, fy1)) in enumerate(AREAS.items()):
    area = card.crop((int(fx0 * W), int(fy0 * H), int(fx1 * W), int(fy1 * H)))
    rgba = np.asarray(remove(area, session=session)).astype(np.float32)
    sub_rgb, sub_a = rgba[..., :3], np.clip((rgba[..., 3] / 255 - 0.08) / 0.5, 0, 1)
    c = piece(sub_rgb, sub_a, parts(sub_a, 400)[0])               # the biggest shape in that area: the crab
    s = min(72 * CK / c.width, 56 * CK / c.height)                # inside the 80 x 64 layer, with a margin
    c = c.resize((round(c.width * s), round(c.height * s)), Image.LANCZOS)
    cx0, cy0 = i * crab_cw, ch
    atlas.alpha_composite(c, (cx0 + (crab_cw - c.width) // 2, cy0 + crab_ch - c.height - 2 * CK))
    table["crab"][mood] = {"x": cx0, "y": cy0, "w": crab_cw, "h": crab_ch}

OUT.parent.mkdir(parents=True, exist_ok=True)
atlas.save(OUT, "WEBP", quality=86, alpha_quality=92, method=6)
js = AVJS.read_text()
block = ("// <cast> made by tools/cast.py from art/cards/: each figure's place in src/art/cast.webp (px), and its head\n"
         "// (top, centre cx, width hw, neck) and right hand (hx, hy) in the avatar's 120 x 230 box\n"
         "const CAST = " + json.dumps(table, separators=(",", ":")) + ";\n// </cast>")
if "// <cast>" not in js:
    sys.exit("src/avatar.js has no // <cast> ... // </cast> lines to fill")
AVJS.write_text(re.sub(r"// <cast>.*?// </cast>", lambda _: block, js, flags=re.S))
print(f"src/art/cast.webp: {atlas.width} x {atlas.height}, {OUT.stat().st_size // 1024} KB")
for who in ("jack", "jackie"):
    print(who, [{k: f[k] for k in ("top", "cx", "hw", "hx", "hy")} for f in table["fig"][who]])
