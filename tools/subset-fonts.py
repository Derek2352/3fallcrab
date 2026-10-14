#!/usr/bin/env python3
"""Self-hosted web fonts: cut the original fonts down to the characters the game uses.

    npm run fonts          (the same as: python3 tools/subset-fonts.py)

Gluten, Noto Sans HK, LXGW WenKai TC and DotGothic16 used to come from Google Fonts: about 3.8 MB of font slices on a
first visit, to show roughly 600 different Chinese characters. This keeps only the glyphs the game uses and writes
small WOFF2 files to src/fonts/ (tools/build.mjs fingerprints them into public/assets/):

    *.woff2    the subsets. Variable axes (Noto Sans HK weight, Gluten weight), vertical metrics and the layout
               features the page can use (kerning, ligatures, tabular numbers, CJK punctuation spacing) are kept.
    chars.txt  every character the subsets were built for. `npm run build` warns when src/ has a Chinese character
               that is not listed here (it never fails the build).
    OFL.txt    the licences of the four fonts (SIL Open Font License 1.1), published with the site.

Characters come from every .html, .js and .css file in src/ (escapes such as \\u2026 and &#x2026; included), plus
printable ASCII and common Chinese punctuation. Third-party code (vendor/ folders) and the admin page, which uses system
fonts, are skipped. Run this after you add Chinese text, then commit src/fonts/. It is dev-time only: the Cloudflare
build never runs Python. A character the subsets lack still shows, in the system Chinese font the font stacks already
name; it just looks a little different.

Setup (once, on your own computer):   pip install fonttools brotli
The original font files (about 40 MB) are downloaded from github.com/google/fonts, pinned to a commit and checked
against SHA-256, into ~/.cache/3fallcrab-fonts (change it with --src DIR or the FONT_SRC environment variable).
"""
import argparse
import hashlib
import html
import io
import logging
import os
import re
import shutil
import sys
import unicodedata
import urllib.parse
import urllib.request
from pathlib import Path

try:
    import brotli  # noqa: F401  (fontTools writes WOFF2 through it)
    from fontTools import subset
    from fontTools.ttLib import TTFont
    from fontTools.varLib import instancer
except ImportError as e:
    sys.exit(f"Missing Python package '{e.name}'. Install the tools with:  pip install fonttools brotli")

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
OUT = SRC / "fonts"

# The originals: google/fonts at a fixed commit, so a rerun gives the same fonts years from now.
UPSTREAM = "https://raw.githubusercontent.com/google/fonts/66928797f271fed5ee428544e7229685e2d90127/ofl"

# (output file, upstream folder, upstream file, SHA-256 of the upstream file, variable axes to pin)
# Gluten ships a slant axis the game never uses (it only asked Google for the weight axis), so slant is pinned at its
# default, 0: the same outlines at less than half the size. Noto Sans HK keeps its whole weight axis.
FONTS = [
    ("gluten.woff2", "gluten", "Gluten[slnt,wght].ttf",
     "cb4b01e4754e36615125e7cb16fe1ec8255d1db02d0b236d7c992438dc1a83e4", {"slnt": 0}),
    ("noto-sans-hk.woff2", "notosanshk", "NotoSansHK[wght].ttf",
     "76098ee78ec234cd4f8c950742b3f766fea2f8b43d5180d901048f4fc86c6849", {}),
    ("lxgw-wenkai-tc-regular.woff2", "lxgwwenkaitc", "LXGWWenKaiTC-Regular.ttf",
     "4fcc5aec11cbbf737b0cfab7b63796f7f280087a7a656b2f13342cd5e5318d95", {}),
    ("lxgw-wenkai-tc-bold.woff2", "lxgwwenkaitc", "LXGWWenKaiTC-Bold.ttf",
     "5c9feadfd928f3ae3860e7d001ad3d0d0c55b0157fff08cd4d51b51aca677f23", {}),
    ("dotgothic16.woff2", "dotgothic16", "DotGothic16-Regular.ttf",
     "3ad9af88726d42b40f7f365f0dcac785af73cf20ea6f1d5b44e57cc21150b8f1", {}),
]

# (family name, upstream folder, SHA-256 of its OFL.txt, files made from it)
LICENCES = [
    ("Gluten", "gluten", "9bf9f51b4e1279bc28c6cf78b4d3d0a07b254435a79e6597ad244defa6df1882", "gluten.woff2"),
    ("Noto Sans HK", "notosanshk", "1c05c68c34f9708415aada51f17e1b0092d2cea709bf4a94cd38114f9e73d7d9", "noto-sans-hk.woff2"),
    ("LXGW WenKai TC", "lxgwwenkaitc", "4fff27d35db0e22cd81d58da6f20e09f415cf354a3338e3cf1fc0eb9222c7174",
     "lxgw-wenkai-tc-regular.woff2, lxgw-wenkai-tc-bold.woff2"),
    ("DotGothic16", "dotgothic16", "b6630c61ea078cacd7fabe37d14ffe557a0b45b06683374a9aa9e24262993e33", "dotgothic16.woff2"),
]

# Always included, whatever the sources say: printable ASCII (names, numbers), a no-break space, and the punctuation an
# editor is likely to type in Chinese or English text.
ALWAYS = "".join(map(chr, range(0x20, 0x7F))) + "\u00a0" + "，、。．：；！？（）「」『』〈〉《》【】〔〕～—…·“”‘’"

# Source files that are scanned for characters.
EXTENSIONS = (".html", ".js", ".css")
SKIP_DIRS = {"vendor", "fonts"}                 # third-party code, and this script's own output
SKIP_FILES = {"admin.html", "admin.js"}         # the admin page uses system fonts, not these web fonts


def decode(text, ext):
    """Turn escapes into the characters they stand for, so `&hellip;` or '\\u2026' in a source file count too."""
    def char(code):
        try:
            return chr(int(code, 16))
        except (ValueError, OverflowError):
            return ""
    if ext == ".html":
        text = html.unescape(text)
    if ext in (".html", ".js"):
        text = re.sub(r"\\u\{([0-9a-fA-F]{1,6})\}|\\u([0-9a-fA-F]{4})", lambda m: char(m.group(1) or m.group(2)), text)
    elif ext == ".css":
        text = re.sub(r"\\([0-9a-fA-F]{1,6})[ \t\r\n]?", lambda m: char(m.group(1)), text)
    return text


def source_files():
    for folder, dirs, names in os.walk(SRC):
        dirs[:] = sorted(d for d in dirs if d not in SKIP_DIRS)
        for name in sorted(names):
            if name.endswith(EXTENSIONS) and name not in SKIP_FILES:
                yield Path(folder) / name


def collect_chars():
    chars = set(ALWAYS)
    for path in source_files():
        chars.update(decode(path.read_text(encoding="utf-8"), path.suffix))
    # not control, surrogate, format (BOM, joiners), private-use or separator characters: nothing to draw
    return {c for c in chars if unicodedata.category(c) not in ("Cc", "Cs", "Cf", "Co", "Zl", "Zp")}


def is_cjk(c):
    o = ord(c)
    return 0x2E80 <= o <= 0x9FFF or 0xF900 <= o <= 0xFAFF or 0xFE30 <= o <= 0xFE4F or 0xFF00 <= o <= 0xFFEF or 0x20000 <= o <= 0x2FA1F


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for block in iter(lambda: f.read(1 << 20), b""):
            h.update(block)
    return h.hexdigest()


def original(cache, folder, name, digest):
    """Path of an original file in the cache, downloaded and checked on first use."""
    path = cache / folder / name
    if not path.exists():
        url = f"{UPSTREAM}/{folder}/{urllib.parse.quote(name)}"
        print(f"  downloading {folder}/{name}")
        path.parent.mkdir(parents=True, exist_ok=True)
        part = path.with_name(path.name + ".part")
        try:
            with urllib.request.urlopen(url, timeout=120) as response, open(part, "wb") as f:
                shutil.copyfileobj(response, f)
        except OSError as e:
            part.unlink(missing_ok=True)
            sys.exit(f"Could not download {url}\n  {e}\nDownload the file yourself into {path} and run this again.")
        part.replace(path)
    if sha256(path) != digest:
        sys.exit(f"{path} is not the expected file (SHA-256 differs). Delete it and run this again.")
    return path


def make_subset(path, chars, pin):
    """The WOFF2 bytes of the font at `path`, cut down to `chars`, and the set of characters it really contains."""
    options = subset.Options()
    options.flavor = "woff2"
    # What the page can ask for: the shaper's default features (kerning, ligatures, mark positioning, CJK punctuation
    # spacing, ...) plus tabular and proportional numbers (font-variant-numeric in style.css).
    options.layout_features = [*options.layout_features, "tnum", "pnum"]
    options.name_IDs = ["*"]                 # keep the copyright and licence notices inside the files (OFL)
    options.notdef_outline = True
    options.glyph_names = False
    options.recalc_timestamp = False         # same input, same bytes: reruns don't churn git
    font = TTFont(path, recalcTimestamp=False)
    subsetter = subset.Subsetter(options)
    subsetter.populate(unicodes=sorted(ord(c) for c in chars))
    subsetter.subset(font)
    if pin:                                  # lossless: pinning an axis at its default only drops what moves it
        instancer.instantiateVariableFont(font, pin, inplace=True, optimize=False)
    cmap = font.getBestCmap()
    buffer = io.BytesIO()
    font.flavor = "woff2"
    font.save(buffer)
    return buffer.getvalue(), {chr(cp) for cp in cmap}


def licence_text(cache):
    notices, bodies = [], set()
    for family, folder, digest, files in LICENCES:
        text = original(cache, folder, "OFL.txt", digest).read_text(encoding="utf-8").replace("\r\n", "\n").strip()
        notice, _, body = text.partition("\n\n")
        notices.append(f"{family}  ({files})\n  {notice.strip()}")
        bodies.add(body[body.index("-----"):])
    if len(bodies) != 1:
        sys.exit("The four OFL.txt files differ in more than their copyright line; combine them by hand.")
    return (
        "Fonts of 3 Fall Fun 人生跌塔\n"
        "============================\n\n"
        "The web fonts the game serves (the .woff2 files in the page's assets) are subsets of the fonts below: only the\n"
        "glyphs the game uses are kept (tools/subset-fonts.py). The originals come from github.com/google/fonts. Each font\n"
        "is licensed under the SIL Open Font License, Version 1.1, printed after the notices. The subsets keep the font\n"
        "names, and are not sold by themselves.\n\n"
        + "\n\n".join(notices)
        + "\n\n\n"
        + bodies.pop()
        + "\n"
    )


def chars_text(chars):
    ordered = "".join(sorted(chars))
    return "".join(ordered[i:i + 64] + "\n" for i in range(0, len(ordered), 64))


def main():
    parser = argparse.ArgumentParser(description="Subset the web fonts to the characters used in src/ (see the top of this file).")
    parser.add_argument("--src", help="folder for the original font files (default: $FONT_SRC or ~/.cache/3fallcrab-fonts)")
    args = parser.parse_args()
    logging.getLogger("fontTools").setLevel(logging.ERROR)   # "meta NOT subset" and the like
    cache = Path(args.src or os.environ.get("FONT_SRC") or Path(os.environ.get("XDG_CACHE_HOME") or Path.home() / ".cache") / "3fallcrab-fonts")

    chars = collect_chars()
    cjk = sorted(c for c in chars if is_cjk(c))
    print(f"{len(chars)} characters ({len(cjk)} Chinese/CJK) from {sum(1 for _ in source_files())} source files")

    outputs, covered, total = {}, set(), 0
    for out_name, folder, name, digest, pin in FONTS:
        path = original(cache, folder, name, digest)
        data, has = make_subset(path, chars, pin)
        outputs[out_name] = data
        covered |= has
        total += len(data)
        print(f"  {out_name:30s} {len(data) / 1024:7.1f} KB  {len(has):4d} characters")
    outputs["OFL.txt"] = licence_text(cache).encode("utf-8")
    outputs["chars.txt"] = chars_text(chars).encode("utf-8")

    OUT.mkdir(exist_ok=True)
    for name, data in outputs.items():
        (OUT / name).write_bytes(data)
    print(f"  {'total':30s} {total / 1024:7.1f} KB  -> src/fonts/")
    nowhere = sorted(c for c in chars if c not in covered)
    if nowhere:
        print("In no font (the system font draws them): " + " ".join(f"{c} U+{ord(c):04X}" for c in nowhere))
    print("Done. Commit src/fonts/; `npm run build` fingerprints the fonts into public/assets/.")


if __name__ == "__main__":
    main()
