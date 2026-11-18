"""Prepares print-bleed posters (3 mm mirrored/feathered bleed apron) and cast cutouts."""
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
CACHE = Path(__file__).resolve().parent / ".cache"
POSTER_DIR = ROOT / "art" / "posters"
CAST_PATH = ROOT / "src" / "art" / "cast.webp"

POSTERS = ["ferry", "rooftop", "family", "diner", "trolley", "estate", "diver"]


def add_bleed_apron(img: Image.Image, trim_w_mm: float = 90.0, trim_h_mm: float = 112.5, bleed_mm: float = 3.0) -> Image.Image:
    """Pad an image with a seamless mirrored bleed apron so trim artwork stays 100% uncropped."""
    rgb = img.convert("RGB")
    w, h = rgb.size
    px_per_mm = w / trim_w_mm
    pad = int(round(bleed_mm * px_per_mm))

    arr = np.asarray(rgb)
    # Reflect padding along edges without repeating the exact border pixel seam
    padded = np.pad(arr, ((pad, pad), (pad, pad), (0, 0)), mode="reflect")
    out = Image.fromarray(padded, mode="RGB")

    # Apply tiny blur strictly to the outer bleed border so any mirrored texture softens cleanly
    blurred = out.filter(ImageFilter.GaussianBlur(radius=1.5))
    mask = Image.new("L", out.size, 255)
    inner = Image.new("L", (w, h), 0)
    mask.paste(inner, (pad, pad))
    # Paste sharp original strictly inside trim region; blurred mirror sits only in 3mm bleed
    final = Image.composite(blurred, out, mask)
    final.paste(rgb, (pad, pad))
    return final


def main():
    (CACHE / "posters").mkdir(parents=True, exist_ok=True)
    (CACHE / "cast").mkdir(parents=True, exist_ok=True)

    for name in POSTERS:
        src = POSTER_DIR / f"{name}.jpg"
        im = Image.open(src)
        bleed_im = add_bleed_apron(im)
        out_path = CACHE / "posters" / f"{name}-bleed.jpg"
        bleed_im.save(out_path, "JPEG", quality=96, subsampling=0)
        print(f"poster {name}: {im.size} -> {bleed_im.size} ({out_path.name})")

    cast = Image.open(CAST_PATH).convert("RGBA")
    crops = {
        "jack_uni": (0, 0, 288, 552),
        "jack_job": (288, 0, 576, 552),
        "jack_fam": (576, 0, 864, 552),
        "jack_ret": (864, 0, 1152, 552),
        "jackie_uni": (1152, 0, 1440, 552),
        "jackie_job": (1440, 0, 1728, 552),
        "jackie_fam": (1728, 0, 2016, 552),
        "jackie_ret": (2016, 0, 2304, 552),
        "crab_idle": (0, 552, 240, 744),
        "crab_happy": (240, 552, 480, 744),
        "crab_worried": (480, 552, 720, 744),
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
