"""Prepares full-bleed poster sheets (96.0 x 81.9375 mm) with the sharp 4:5 poster (60.75 x 75.9375 mm)
centered on the 90x108 mm canvas, plus cast cutouts from src/art/cast.webp.
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
CACHE = Path(__file__).resolve().parent / ".cache"
POSTER_DIR = ROOT / "art" / "posters"
CAST_PATH = ROOT / "src" / "art" / "cast.webp"

POSTERS = ["ferry", "rooftop", "family", "diner", "trolley", "estate", "diver"]

# Exact 9:16 card centered inside 90x108 mm canvas (+3mm bleed = 96x114 mm)
CARD_W_MM = 60.75
POSTER_H_MM = 75.9375  # 60.75 * 5 / 4
CANVAS_BLEED_W_MM = 96.0
CANVAS_POSTER_BLEED_H_MM = 3.0 + POSTER_H_MM + 3.0  # 81.9375 mm


def make_centered_bleed_poster(img: Image.Image) -> Image.Image:
    """Keep sharp 1122x1402 poster centered for 60.75x75.9375mm and mirror-extend across 96x81.94mm bleed."""
    rgb = img.convert("RGB")
    w, h = rgb.size
    px_per_mm = w / CARD_W_MM
    pad_x = int(round(((CANVAS_BLEED_W_MM - CARD_W_MM) / 2.0) * px_per_mm))
    pad_y = int(round(3.0 * px_per_mm))

    arr = np.asarray(rgb)
    padded = np.pad(arr, ((pad_y, pad_y), (pad_x, pad_x), (0, 0)), mode="reflect")
    out = Image.fromarray(padded, mode="RGB")

    # Soften only the waste/bleed area outside the exact 60.75 x 75.9375 mm poster
    blurred = out.filter(ImageFilter.GaussianBlur(radius=3.0))
    mask = Image.new("L", out.size, 255)
    inner = Image.new("L", (w, h), 0)
    mask.paste(inner, (pad_x, pad_y))
    final = Image.composite(blurred, out, mask)
    final.paste(rgb, (pad_x, pad_y))
    return final


def main():
    (CACHE / "posters").mkdir(parents=True, exist_ok=True)
    (CACHE / "cast").mkdir(parents=True, exist_ok=True)

    for name in POSTERS:
        src = POSTER_DIR / f"{name}.jpg"
        im = Image.open(src).convert("RGB")
        bleed_im = make_centered_bleed_poster(im)
        bleed_im.save(CACHE / "posters" / f"{name}-bleed.jpg", "JPEG", quality=96, subsampling=0)
        print(f"poster {name}: sharp={im.size} -> canvas_bleed={bleed_im.size}")

    cast = Image.open(CAST_PATH).convert("RGBA")
    crops = {
        "jack_uni": (0, 0, 288, 552),
        "jackie_uni": (1152, 0, 1440, 552),
        "crab_happy": (240, 552, 480, 744),
        "crab_idle": (0, 552, 240, 744),
    }
    for key, box in crops.items():
        piece = cast.crop(box)
        bbox = piece.getbbox()
        if bbox:
            piece = piece.crop(bbox)
        out_path = CACHE / "cast" / f"{key}.png"
        piece.save(out_path, "PNG")
        print(f"cast {key}: {piece.size}")


if __name__ == "__main__":
    main()
