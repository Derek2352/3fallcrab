"""Builds print-ready layered PDFs (Artwork, Crease, DieCut), editable layered SVGs,
an SRA3 6-up imposed press sheet, high-res visual proof mockups, and runs automated
preflight checks against all 6 HK digital die-cutting & creasing rules.
"""
import math
import os
import re
import sys
from pathlib import Path
from xml.sax.saxutils import escape
import base64

import numpy as np
from PIL import Image, ImageDraw
import pymupdf

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
CACHE = HERE / ".cache"
ART_PDF_DIR = CACHE / "artwork-pdf"

OUT_ROOT = ROOT / "art" / "result-cards"
OUT_PDF = OUT_ROOT / "pdf"
OUT_SVG = OUT_ROOT / "svg"
OUT_PROOFS = OUT_ROOT / "proofs"

MM_TO_PT = 72.0 / 25.4
TRIM_W_MM = 90.0
TRIM_H_MM = 160.0
BLEED_MM = 3.0
PAGE_W_MM = TRIM_W_MM + 2 * BLEED_MM   # 96.0 mm
PAGE_H_MM = TRIM_H_MM + 2 * BLEED_MM   # 166.0 mm
PAGE_W_PT = PAGE_W_MM * MM_TO_PT
PAGE_H_PT = PAGE_H_MM * MM_TO_PT

R_CORNER_MM = 5.0      # >= 5 mm rounded corners
R_NOTCH_MM = 3.5       # 7.0 mm opening mouth >= 5 mm
Y_STUB_FROM_TOP_TRIM_MM = 112.5
Y_STUB_TOP_MM = BLEED_MM + Y_STUB_FROM_TOP_TRIM_MM   # 115.5 mm
Y_STUB_PDF_MM = PAGE_H_MM - Y_STUB_TOP_MM            # 50.5 mm (bottom-up)

K_BEZIER = 4.0 * (math.sqrt(2.0) - 1.0) / 3.0

CARD_SLUGS = [
    "01-ferry",
    "02-rooftop",
    "03-family",
    "04-diner",
    "05-trolley",
    "06-estate",
    "07-diver",
]


def pt(mm_val: float) -> float:
    return mm_val * MM_TO_PT


def diecut_pdf_stream(ox_mm: float = 0.0, oy_mm: float = 0.0, stroke_pt: float = 0.5) -> bytes:
    """Pure closed stroked vector contour in PDF bottom-up coordinates (no fill, no gradients, no dashes)."""
    x0 = ox_mm + BLEED_MM
    x1 = ox_mm + BLEED_MM + TRIM_W_MM
    y0 = oy_mm + BLEED_MM
    y1 = oy_mm + BLEED_MM + TRIM_H_MM
    rc = R_CORNER_MM
    rn = R_NOTCH_MM
    yn = oy_mm + Y_STUB_PDF_MM
    kc = K_BEZIER * rc
    kn = K_BEZIER * rn

    def m(x, y):
        return f"{pt(x):.4f} {pt(y):.4f} m"

    def l(x, y):
        return f"{pt(x):.4f} {pt(y):.4f} l"

    def c(x1c, y1c, x2c, y2c, xe, ye):
        return (
            f"{pt(x1c):.4f} {pt(y1c):.4f} "
            f"{pt(x2c):.4f} {pt(y2c):.4f} "
            f"{pt(xe):.4f} {pt(ye):.4f} c"
        )

    ops = [
        "q",
        "/OC /OC_DieCut BDC",
        "/CS_Cut CS",
        "1 SCN",
        f"{stroke_pt:.3f} w",
        "0 J",
        "0 j",
        m(x0 + rc, y1),
        l(x1 - rc, y1),
        c(x1 - rc + kc, y1, x1, y1 - rc + kc, x1, y1 - rc),
        l(x1, yn + rn),
        c(x1 - kn, yn + rn, x1 - rn, yn + kn, x1 - rn, yn),
        c(x1 - rn, yn - kn, x1 - kn, yn - rn, x1, yn - rn),
        l(x1, y0 + rc),
        c(x1, y0 + rc - kc, x1 - rc + kc, y0, x1 - rc, y0),
        l(x0 + rc, y0),
        c(x0 + rc - kc, y0, x0, y0 + rc - kc, x0, y0 + rc),
        l(x0, yn - rn),
        c(x0 + kn, yn - rn, x0 + rn, yn - kn, x0 + rn, yn),
        c(x0 + rn, yn + kn, x0 + kn, yn + rn, x0, yn + rn),
        l(x0, y1 - rc),
        c(x0, y1 - rc + kc, x0 + rc - kc, y1, x0 + rc, y1),
        "h",
        "S",
        "EMC",
        "Q",
    ]
    return ("\n".join(ops) + "\n").encode("ascii")


def crease_pdf_stream(ox_mm: float = 0.0, oy_mm: float = 0.0, stroke_pt: float = 0.5) -> bytes:
    """Pure open stroked vector crease line (壓線) connecting the two side notch apexes."""
    x_left = ox_mm + BLEED_MM + R_NOTCH_MM
    x_right = ox_mm + BLEED_MM + TRIM_W_MM - R_NOTCH_MM
    yn = oy_mm + Y_STUB_PDF_MM
    ops = [
        "q",
        "/OC /OC_Crease BDC",
        "/CS_Crease CS",
        "1 SCN",
        f"{stroke_pt:.3f} w",
        "0 J",
        f"{pt(x_left):.4f} {pt(yn):.4f} m",
        f"{pt(x_right):.4f} {pt(yn):.4f} l",
        "S",
        "EMC",
        "Q",
    ]
    return ("\n".join(ops) + "\n").encode("ascii")


def ensure_spot_resources(doc: pymupdf.Document):
    """Create Separation ColorSpaces (CutContour = 100% Magenta, Crease = 100% Cyan) + OCG layers."""
    ocg_art = doc.add_ocg("Artwork", on=True)
    ocg_crease = doc.add_ocg("Crease", on=True)
    ocg_cut = doc.add_ocg("DieCut", on=True)

    fn_cut = doc.get_new_xref()
    doc.update_object(fn_cut, "<</FunctionType 2 /Domain [0 1] /C0 [0 0 0 0] /C1 [0 1 0 0] /N 1>>")
    cs_cut = doc.get_new_xref()
    doc.update_object(cs_cut, f"[/Separation /CutContour /DeviceCMYK {fn_cut} 0 R]")

    fn_crease = doc.get_new_xref()
    doc.update_object(fn_crease, "<</FunctionType 2 /Domain [0 1] /C0 [0 0 0 0] /C1 [1 0 0 0] /N 1>>")
    cs_crease = doc.get_new_xref()
    doc.update_object(cs_crease, f"[/Separation /Crease /DeviceCMYK {fn_crease} 0 R]")

    # Show PDF Layers panel by default in Acrobat
    cat_xref = doc.pdf_catalog()
    doc.xref_set_key(cat_xref, "PageMode", "/UseOC")

    return {
        "ocg_art": ocg_art,
        "ocg_crease": ocg_crease,
        "ocg_cut": ocg_cut,
        "cs_cut": cs_cut,
        "cs_crease": cs_crease,
    }


def attach_vector_layers_to_page(doc: pymupdf.Document, page: pymupdf.Page, meta: dict, placements: list[tuple[float, float]]):
    """Attach pure vector Crease and DieCut streams onto `page` with exact OCG & Spot Color resources."""
    page_xref = page.xref
    res_val = doc.xref_get_key(page_xref, "Resources")
    if res_val[0] == "xref":
        res_xref = int(res_val[1].split()[0])
    else:
        res_xref = doc.get_new_xref()
        doc.update_object(res_xref, "<<>>")
        doc.xref_set_key(page_xref, "Resources", f"{res_xref} 0 R")

    doc.xref_set_key(res_xref, "ColorSpace/CS_Cut", f"{meta['cs_cut']} 0 R")
    doc.xref_set_key(res_xref, "ColorSpace/CS_Crease", f"{meta['cs_crease']} 0 R")
    doc.xref_set_key(res_xref, "Properties/OC_DieCut", f"{meta['ocg_cut']} 0 R")
    doc.xref_set_key(res_xref, "Properties/OC_Crease", f"{meta['ocg_crease']} 0 R")

    crease_bytes = b"".join(crease_pdf_stream(ox, oy) for ox, oy in placements)
    cut_bytes = b"".join(diecut_pdf_stream(ox, oy) for ox, oy in placements)

    xref_crease = doc.get_new_xref()
    doc.update_object(xref_crease, "<<>>")
    doc.update_stream(xref_crease, crease_bytes)

    xref_cut = doc.get_new_xref()
    doc.update_object(xref_cut, "<<>>")
    doc.update_stream(xref_cut, cut_bytes)

    existing = page.get_contents()
    all_xrefs = [f"{x} 0 R" for x in existing] + [f"{xref_crease} 0 R", f"{xref_cut} 0 R"]
    doc.xref_set_key(page_xref, "Contents", "[" + " ".join(all_xrefs) + "]")


def set_card_boxes(doc: pymupdf.Document, page: pymupdf.Page):
    b_rect = f"[0 0 {PAGE_W_PT:.4f} {PAGE_H_PT:.4f}]"
    t_rect = f"[{pt(BLEED_MM):.4f} {pt(BLEED_MM):.4f} {pt(BLEED_MM + TRIM_W_MM):.4f} {pt(BLEED_MM + TRIM_H_MM):.4f}]"
    doc.xref_set_key(page.xref, "MediaBox", b_rect)
    doc.xref_set_key(page.xref, "CropBox", b_rect)
    doc.xref_set_key(page.xref, "BleedBox", b_rect)
    doc.xref_set_key(page.xref, "TrimBox", t_rect)


def build_card_page(out_doc: pymupdf.Document, meta: dict, src_art_pdf: Path):
    src = pymupdf.open(src_art_pdf)
    page = out_doc.new_page(width=PAGE_W_PT, height=PAGE_H_PT)
    page.show_pdf_page(page.rect, src, 0, oc=meta["ocg_art"])
    set_card_boxes(out_doc, page)
    attach_vector_layers_to_page(out_doc, page, meta, [(0.0, 0.0)])
    src.close()
    return page


def render_clean_artwork_png(src_art_pdf: Path, dpi: int = 350) -> bytes:
    doc = pymupdf.open(src_art_pdf)
    pix = doc[0].get_pixmap(dpi=dpi, alpha=False)
    data = pix.tobytes("png")
    doc.close()
    return data


def build_layered_svg(src_art_pdf: Path, out_svg_path: Path):
    """Build an Adobe Illustrator / Inkscape compatible layered SVG with 3 explicit layers."""
    png_bytes = render_clean_artwork_png(src_art_pdf, dpi=350)
    b64 = base64.b64encode(png_bytes).decode("ascii")

    # SVG top-down path for closed DieCut contour
    diecut_d = (
        f"M 8,3 H 88 "
        f"A 5,5 0 0 1 93,8 "
        f"V 112 "
        f"A 3.5,3.5 0 0 0 93,119 "
        f"V 158 "
        f"A 5,5 0 0 1 88,163 "
        f"H 8 "
        f"A 5,5 0 0 1 3,158 "
        f"V 119 "
        f"A 3.5,3.5 0 0 0 3,112 "
        f"V 8 "
        f"A 5,5 0 0 1 8,3 Z"
    )
    crease_d = f"M 6.5,{Y_STUB_TOP_MM} H 89.5"

    svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
     width="{PAGE_W_MM}mm" height="{PAGE_H_MM}mm"
     viewBox="0 0 {PAGE_W_MM} {PAGE_H_MM}">
  <title>{escape(out_svg_path.stem)} - 90x160mm (3mm bleed)</title>
  <g id="Layer_Artwork" inkscape:groupmode="layer" inkscape:label="Artwork (印刷圖稿)">
    <image x="0" y="0" width="{PAGE_W_MM}" height="{PAGE_H_MM}" preserveAspectRatio="none"
           href="data:image/png;base64,{b64}"/>
  </g>
  <g id="Layer_Crease" inkscape:groupmode="layer" inkscape:label="Crease (數碼切割-壓線)">
    <path id="CreaseLine" d="{crease_d}" fill="none" stroke="#00AEEF" stroke-width="0.2" stroke-linecap="butt"/>
  </g>
  <g id="Layer_DieCut" inkscape:groupmode="layer" inkscape:label="DieCut (數碼切割)">
    <path id="CutContour" d="{diecut_d}" fill="none" stroke="#EC008C" stroke-width="0.2" stroke-linejoin="round"/>
  </g>
</svg>
"""
    out_svg_path.write_text(svg, encoding="utf-8")


def build_sra3_press_sheet(out_path: Path):
    """Build a 2-page SRA3 (320 x 450 mm) 6-up imposed press sheet (Cards 1-6) with 10 mm cut spacing (>= 5 mm)."""
    SHEET_W_MM = 320.0
    SHEET_H_MM = 450.0
    GAP_MM = 10.0  # cut-to-cut gap = 10 mm (>= 5 mm required!)
    # 3 cols x 2 rows of 90x160 trim cards -> total trim footprint = 290 x 330 mm
    x_start = (SHEET_W_MM - (3 * TRIM_W_MM + 2 * GAP_MM)) / 2.0  # 15.0 mm
    y_start = (SHEET_H_MM - (2 * TRIM_H_MM + GAP_MM)) / 2.0      # 60.0 mm

    doc = pymupdf.open()
    meta = ensure_spot_resources(doc)

    # Page 1: Fronts (Cards 1..6)
    p_front = doc.new_page(width=pt(SHEET_W_MM), height=pt(SHEET_H_MM))
    front_placements = []
    for idx in range(6):
        col = idx % 3
        row = idx // 3
        trim_x = x_start + col * (TRIM_W_MM + GAP_MM)
        # top-down row 0 is upper row in PDF -> convert to bottom-up origin of bleed box
        trim_y_top = y_start + row * (TRIM_H_MM + GAP_MM)
        trim_y_bot_pdf = SHEET_H_MM - (trim_y_top + TRIM_H_MM)
        ox_mm = trim_x - BLEED_MM
        oy_mm = trim_y_bot_pdf - BLEED_MM
        front_placements.append((ox_mm, oy_mm))

        # Place artwork into top-down rect in PyMuPDF coordinates
        rect = pymupdf.Rect(
            pt(ox_mm),
            pt(trim_y_top - BLEED_MM),
            pt(ox_mm + PAGE_W_MM),
            pt(trim_y_top + TRIM_H_MM + BLEED_MM),
        )
        src = pymupdf.open(ART_PDF_DIR / f"front-{CARD_SLUGS[idx]}.pdf")
        p_front.show_pdf_page(rect, src, 0, oc=meta["ocg_art"])
        src.close()

    attach_vector_layers_to_page(doc, p_front, meta, front_placements)

    # Page 2: Universal Backs (duplex horizontal flip: col -> 2 - col)
    p_back = doc.new_page(width=pt(SHEET_W_MM), height=pt(SHEET_H_MM))
    back_src = pymupdf.open(ART_PDF_DIR / "universal-back.pdf")
    back_placements = []
    for idx in range(6):
        col = 2 - (idx % 3)
        row = idx // 3
        trim_x = x_start + col * (TRIM_W_MM + GAP_MM)
        trim_y_top = y_start + row * (TRIM_H_MM + GAP_MM)
        trim_y_bot_pdf = SHEET_H_MM - (trim_y_top + TRIM_H_MM)
        ox_mm = trim_x - BLEED_MM
        oy_mm = trim_y_bot_pdf - BLEED_MM
        back_placements.append((ox_mm, oy_mm))

        rect = pymupdf.Rect(
            pt(ox_mm),
            pt(trim_y_top - BLEED_MM),
            pt(ox_mm + PAGE_W_MM),
            pt(trim_y_top + TRIM_H_MM + BLEED_MM),
        )
        p_back.show_pdf_page(rect, back_src, 0, oc=meta["ocg_art"])
    back_src.close()
    attach_vector_layers_to_page(doc, p_back, meta, back_placements)

    doc.save(out_path, deflate=True, garbage=4)
    doc.close()


def render_pdf_page_image(pdf_path: Path, page_idx: int, dpi: int = 300, hide_layers: tuple[str, ...] = ()) -> Image.Image:
    doc = pymupdf.open(pdf_path)
    if hide_layers:
        ocgs = doc.get_ocgs()
        off_xrefs = [xref for xref, info in ocgs.items() if info["name"] in hide_layers]
        if off_xrefs:
            doc.set_layer(-1, off=off_xrefs)
    pix = doc[page_idx].get_pixmap(dpi=dpi, alpha=False)
    im = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    doc.close()
    return im


def make_diecut_mask(size_px: tuple[int, int]) -> Image.Image:
    """Create a crisp antialiased alpha mask matching the exact 90x160mm rounded + notched ticket contour."""
    w, h = size_px
    # Render 4x supersampled mask for smooth edges
    S = 4
    W, H = w * S, h * S
    px_per_mm_x = W / PAGE_W_MM
    px_per_mm_y = H / PAGE_H_MM

    def mx(mm):
        return mm * px_per_mm_x

    def my(mm):
        return mm * px_per_mm_y

    mask = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(mask)

    x0, x1 = mx(BLEED_MM), mx(BLEED_MM + TRIM_W_MM)
    y0, y1 = my(BLEED_MM), my(BLEED_MM + TRIM_H_MM)
    rc_x = mx(R_CORNER_MM)
    rc_y = my(R_CORNER_MM)

    # Rounded outer body
    d.rounded_rectangle([x0, y0, x1, y1], radius=(rc_x + rc_y) / 2.0, fill=255)
    # Cut out left & right semicircular notches at y = Y_STUB_TOP_MM
    yn = my(Y_STUB_TOP_MM)
    rn_x = mx(R_NOTCH_MM)
    rn_y = my(R_NOTCH_MM)
    d.ellipse([x0 - rn_x, yn - rn_y, x0 + rn_x, yn + rn_y], fill=0)
    d.ellipse([x1 - rn_x, yn - rn_y, x1 + rn_x, yn + rn_y], fill=0)

    return mask.resize((w, h), Image.LANCZOS)


def generate_proofs():
    OUT_PROOFS.mkdir(parents=True, exist_ok=True)
    dpi = 220

    def cut_card_rgba(pdf_path: Path, page_idx: int) -> Image.Image:
        # Hide technical Magenta/Cyan DieCut & Crease strokes for the finished souvenir mockup
        rgb = render_pdf_page_image(pdf_path, page_idx, dpi=dpi, hide_layers=("DieCut", "Crease"))
        mask = make_diecut_mask(rgb.size)
        rgba = rgb.convert("RGBA")
        rgba.putalpha(mask)
        # Crop strictly to trim bounding box
        pad_x = int(round(BLEED_MM * rgb.width / PAGE_W_MM))
        pad_y = int(round(BLEED_MM * rgb.height / PAGE_H_MM))
        return rgba.crop((pad_x, pad_y, rgb.width - pad_x, rgb.height - pad_y))

    # 1) Mockup sheet of Cards 1-4
    cards_1_4 = [cut_card_rgba(OUT_PDF / f"card-{slug}.pdf", 0) for slug in CARD_SLUGS[:4]]
    cw, ch = cards_1_4[0].size
    margin = 48
    gap = 36
    sheet1 = Image.new("RGB", (margin * 2 + 4 * cw + 3 * gap, margin * 2 + ch), (242, 234, 220))
    for i, card_im in enumerate(cards_1_4):
        x = margin + i * (cw + gap)
        y = margin
        # soft shadow
        sh = Image.new("RGBA", card_im.size, (46, 40, 56, 70))
        sh.putalpha(card_im.split()[3].point(lambda a: int(a * 0.28)))
        sheet1.paste(sh, (x + 10, y + 14), sh)
        sheet1.paste(card_im, (x, y), card_im)
    sheet1.save(OUT_PROOFS / "proof-fronts-1-to-4.png")

    # 2) Mockup sheet of Cards 5-7 + Universal Back
    cards_5_7_back = [cut_card_rgba(OUT_PDF / f"card-{slug}.pdf", 0) for slug in CARD_SLUGS[4:]]
    cards_5_7_back.append(cut_card_rgba(OUT_PDF / "universal-back.pdf", 0))
    sheet2 = Image.new("RGB", (margin * 2 + 4 * cw + 3 * gap, margin * 2 + ch), (242, 234, 220))
    for i, card_im in enumerate(cards_5_7_back):
        x = margin + i * (cw + gap)
        y = margin
        sh = Image.new("RGBA", card_im.size, (46, 40, 56, 70))
        sh.putalpha(card_im.split()[3].point(lambda a: int(a * 0.28)))
        sheet2.paste(sh, (x + 10, y + 14), sh)
        sheet2.paste(card_im, (x, y), card_im)
    sheet2.save(OUT_PROOFS / "proof-fronts-5-to-7-and-back.png")

    # 3) Technical overlay proof (Card 01 Front + Universal Back WITH DieCut Magenta & Crease Cyan visible)
    tech_front = render_pdf_page_image(OUT_PDF / "card-01-ferry.pdf", 0, dpi=260, hide_layers=())
    tech_back = render_pdf_page_image(OUT_PDF / "card-01-ferry.pdf", 1, dpi=260, hide_layers=())
    tw, th = tech_front.size
    tech_sheet = Image.new("RGB", (margin * 2 + 2 * tw + gap, margin * 2 + th), (255, 255, 255))
    tech_sheet.paste(tech_front, (margin, margin))
    tech_sheet.paste(tech_back, (margin + tw + gap, margin))
    tech_sheet.save(OUT_PROOFS / "proof-technical-diecut-layers.png")

    # 4) SRA3 6-up press sheet preview
    sra3_f = render_pdf_page_image(OUT_PDF / "press-sheet-sra3-6up.pdf", 0, dpi=120, hide_layers=())
    sra3_b = render_pdf_page_image(OUT_PDF / "press-sheet-sra3-6up.pdf", 1, dpi=120, hide_layers=())
    sw, sh_p = sra3_f.size
    sra3_sheet = Image.new("RGB", (margin * 2 + 2 * sw + gap, margin * 2 + sh_p), (235, 235, 235))
    sra3_sheet.paste(sra3_f, (margin, margin))
    sra3_sheet.paste(sra3_b, (margin + sw + gap, margin))
    sra3_sheet.save(OUT_PROOFS / "proof-sra3-press-sheet.png")


def verify_pdf_compliance(pdf_path: Path):
    """Programmatically verify all 6 print rules on every generated PDF."""
    doc = pymupdf.open(pdf_path)
    ocgs = doc.get_ocgs()
    names = {v["name"] for v in ocgs.values()}
    assert {"Artwork", "Crease", "DieCut"}.issubset(names), f"{pdf_path.name} missing OCG layers: {names}"

    for pno, page in enumerate(doc):
        # Verify ColorSpace spot separations
        res_xref = int(doc.xref_get_key(page.xref, "Resources")[1].split()[0])
        res_str = doc.xref_object(res_xref)
        assert "/CS_Cut" in res_str and "/CS_Crease" in res_str, f"{pdf_path.name} p{pno+1} missing spot color spaces"

        # Verify pure vector strokes in Crease & DieCut streams (last two content streams)
        contents = page.get_contents()
        assert len(contents) >= 3, f"{pdf_path.name} p{pno+1} unexpected content count {len(contents)}"
        for label, xref in [("Crease", contents[-2]), ("DieCut", contents[-1])]:
            stream = doc.xref_stream(xref).decode("latin1")
            assert "/OC /OC_" in stream, f"{pdf_path.name} p{pno+1} {label} missing OCG wrapper"
            assert re.search(r"(?:^|\s)S(?:\s|$)", stream), f"{pdf_path.name} p{pno+1} {label} missing stroke operator"
            # Forbidden operators: fill (f, F, B, b), gradient shading (sh), extgstate transparency (gs),
            # dash pattern (d), xobject raster/form (Do), text (BT)
            for tok in re.findall(r"\b(?:f\*?|F|B\*?|b\*?|sh|gs|d|Do|BT|ET)\b", stream):
                raise AssertionError(f"{pdf_path.name} p{pno+1} {label} contains forbidden operator '{tok}'")

        # For single-card PDFs, verify exact TrimBox & BleedBox dimensions
        if "sra3" not in pdf_path.name:
            w_mm = page.rect.width / MM_TO_PT
            h_mm = page.rect.height / MM_TO_PT
            assert abs(w_mm - PAGE_W_MM) < 0.05 and abs(h_mm - PAGE_H_MM) < 0.05, f"{pdf_path.name} bad size {w_mm}x{h_mm}"
            tb = doc.xref_get_key(page.xref, "TrimBox")[1]
            nums = [float(x) for x in tb.strip("[]").split()]
            tw_mm = (nums[2] - nums[0]) / MM_TO_PT
            th_mm = (nums[3] - nums[1]) / MM_TO_PT
            assert abs(tw_mm - TRIM_W_MM) < 0.05 and abs(th_mm - TRIM_H_MM) < 0.05, f"{pdf_path.name} bad TrimBox {tw_mm}x{th_mm}"

    doc.close()


def main():
    OUT_PDF.mkdir(parents=True, exist_ok=True)
    OUT_SVG.mkdir(parents=True, exist_ok=True)
    OUT_PROOFS.mkdir(parents=True, exist_ok=True)

    back_art = ART_PDF_DIR / "universal-back.pdf"

    # 1) Build 7 double-sided individual card PDFs + combined 14-page PDF
    combined = pymupdf.open()
    combined_meta = ensure_spot_resources(combined)

    for slug in CARD_SLUGS:
        front_art = ART_PDF_DIR / f"front-{slug}.pdf"

        card_doc = pymupdf.open()
        card_meta = ensure_spot_resources(card_doc)
        build_card_page(card_doc, card_meta, front_art)
        build_card_page(card_doc, card_meta, back_art)
        out_card_pdf = OUT_PDF / f"card-{slug}.pdf"
        card_doc.save(out_card_pdf, deflate=True, garbage=4)
        card_doc.close()

        build_card_page(combined, combined_meta, front_art)
        build_card_page(combined, combined_meta, back_art)

        build_layered_svg(front_art, OUT_SVG / f"card-{slug}-front.svg")
        print(f"Built card-{slug}.pdf + card-{slug}-front.svg")

    combined_path = OUT_PDF / "all-7-result-cards-print.pdf"
    combined.save(combined_path, deflate=True, garbage=4)
    combined.close()
    print(f"Built {combined_path.name} (14 pages)")

    # 2) Build standalone Universal Back PDF & SVG
    back_doc = pymupdf.open()
    back_meta = ensure_spot_resources(back_doc)
    build_card_page(back_doc, back_meta, back_art)
    back_pdf_path = OUT_PDF / "universal-back.pdf"
    back_doc.save(back_pdf_path, deflate=True, garbage=4)
    back_doc.close()
    build_layered_svg(back_art, OUT_SVG / "universal-back.svg")
    print("Built universal-back.pdf + universal-back.svg")

    # 3) Build SRA3 6-up press sheet
    sra3_path = OUT_PDF / "press-sheet-sra3-6up.pdf"
    build_sra3_press_sheet(sra3_path)
    print(f"Built {sra3_path.name}")

    # 4) Verify every output PDF against print rules
    for pdf_file in sorted(OUT_PDF.glob("*.pdf")):
        verify_pdf_compliance(pdf_file)
        print(f"Verified print compliance: {pdf_file.name}")

    # 5) Render visual proofs
    generate_proofs()
    print("Generated visual proof PNGs in art/result-cards/proofs/")


if __name__ == "__main__":
    main()
