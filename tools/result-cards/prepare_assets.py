"""Prepares full-bleed ambient cinema backdrops (96x73 mm) from each poster, copies sharp 4:5 posters,
and extracts transparent cast cutouts for the 90x108 mm print cards.
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
CACHE = Path(__file__).resolve().parent / ".cache"
POSTER_DIR = ROOT / "art" / "posters"
CAST_PATH = ROOT / "src" / "art" / "cast.webp"

POSTERS = ["ferry", "rooftop", "family", "diner", "trolley", "estate", "diver"]


def make_ambient_backdrop(img: Image.Image) -> Image.Image:
    """Create a rich, softly blurred, darkened full-bleed backdrop matching the poster palette."""
    rgb = img.convert("RGB")
    # Crop central 16:12 region and scale smoothly to 96x73 ratio (1200x913)
    w, h = rgb.size
    target_ratio = 96.0 / 73.0
    crop_h = int(round(w / target_ratio))
    y0 = max(0, (h - crop_h) // 2)
    cropped = rgb.crop((0, y0, w, min(h, y0 + crop_h)))
    scaled = cropped.resize((1200, 913), Image.LANCZOS)
    blurred = scaled.filter(ImageFilter.GaussianBlur(radius=34))
    darkened = ImageEnhance.Brightness(blurred).enhance(0.42)
    # Blend subtly toward deep cinema night-blue (#13162D) for seamless integration with the stub
    arr = np.asarray(darkened, dtype=np.float32)
    navy = np.array([19.0, 22.0, 45.0], dtype=np.float32)
    blended = np.clip(arr * 0.72 + navy * 0.28, 0, 255).astype(np.uint8)
    return Image.fromarray(blended, mode="RGB")


def main():
    (CACHE / "posters").mkdir(parents=True, exist_ok=True)
    (CACHE / "cast").mkdir(parents=True, exist_ok=True)

    for name in POSTERS:
        src = POSTER_DIR / f"{name}.jpg"
        im = Image.open(src).convert("RGB")
        # Save sharp original copy for the uncropped 4:5 frame
        im.save(CACHE / "posters" / f"{name}-sharp.jpg", "JPEG", quality=96, subsampling=0)
        # Save ambient blurred full-bleed backdrop
        amb = make_ambient_backdrop(im)
        amb.save(CACHE / "posters" / f"{name}-ambient.jpg", "JPEG", quality=92, subsampling=0)
        print(f"poster {name}: sharp={im.size}, ambient={amb.size}")

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
