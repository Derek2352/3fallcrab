"""Builds print-ready 90x108 mm canvas (96x114 mm with 3 mm bleed) layered PDFs & SVGs where
each souvenir card keeps its exact original 9:16 aspect ratio (60.75 x 108.0 mm finished card)
centered on the 90x108 mm canvas, plus a 12-up SRA3 press sheet and 300-DPI visual proofs.
"""
import base64
import math
import re
from pathlib import Path
from xml.sax.saxutils import escape

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

# 90 x 108 mm canvas (+ 3 mm bleed = 96 x 114 mm)
CANVAS_TRIM_W_MM = 90.0
CANVAS_TRIM_H_MM = 108.0
BLEED_MM = 3.0
PAGE_W_MM = CANVAS_TRIM_W_MM + 2 * BLEED_MM   # 96.0 mm
PAGE_H_MM = CANVAS_TRIM_H_MM + 2 * BLEED_MM   # 114.0 mm
PAGE_W_PT = PAGE_W_MM * MM_TO_PT
PAGE_H_PT = PAGE_H_MM * MM_TO_PT

# Exact 9:16 card (60.75 x 108.0 mm) centered horizontally on the 90x108 mm canvas
CARD_W_MM = 60.75
CARD_H_MM = 108.0
CARD_OFFSET_X_MM = (CANVAS_TRIM_W_MM - CARD_W_MM) / 2.0  # 14.625 mm inside trim -> 17.625 mm on page

R_CORNER_MM = 5.0      # >= 5 mm rounded corners
R_NOTCH_MM = 3.0       # 6.0 mm opening mouth >= 5 mm
Y_STUB_FROM_TOP_TRIM_MM = CARD_H_MM * (1350.0 / 1920.0)   # 75.9375 mm
Y_STUB_TOP_MM = BLEED_MM + Y_STUB_FROM_TOP_TRIM_MM        # 78.9375 mm (top-down page)
Y_STUB_PDF_MM = PAGE_H_MM - Y_STUB_TOP_MM                 # 35.0625 mm (bottom-up page)

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


def diecut_pdf_stream(card_x0_mm: float, card_y0_pdf_mm: float, stroke_pt: float = 0.5) -> bytes:
    """Pure closed stroked 9:16 ticket vector contour in PDF bottom-up coordinates."""
    x0 = card_x0_mm
    x1 = card_x0_mm + CARD_W_MM
    y0 = card_y0_pdf_mm
    y1 = card_y0_pdf_mm + CARD_H_MM
    rc = R_CORNER_MM
    rn = R_NOTCH_MM
    yn = card_y0_pdf_mm + (Y_STUB_PDF_MM - BLEED_MM)
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


def crease_pdf_stream(card_x0_mm: float, card_y0_pdf_mm: float, stroke_pt: float = 0.5) -> bytes:
    """Pure open stroked vector crease line (壓線) connecting the two side notch apexes."""
    x_left = card_x0_mm + R_NOTCH_MM
    x_right = card_x0_mm + CARD_W_MM - R_NOTCH_MM
    yn = card_y0_pdf_mm + (Y_STUB_PDF_MM - BLEED_MM)
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

    cat_xref = doc.pdf_catalog()
    doc.xref_set_key(cat_xref, "PageMode", "/UseOC")

    return {
        "ocg_art": ocg_art,
        "ocg_crease": ocg_crease,
        "ocg_cut": ocg_cut,
        "cs_cut": cs_cut,
        "cs_crease": cs_crease,
    }


def attach_vector_layers_to_page(doc: pymupdf.Document, page: pymupdf.Page, meta: dict, card_origins_pdf_mm: list[tuple[float, float]]):
    """Attach pure vector Crease and DieCut streams onto `page` at each card's trim origin (x0, y0_bot_pdf)."""
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

    crease_bytes = b"".join(crease_pdf_stream(cx, cy) for cx, cy in card_origins_pdf_mm)
    cut_bytes = b"".join(diecut_pdf_stream(cx, cy) for cx, cy in card_origins_pdf_mm)

    xref_crease = doc.get_new_xref()
    doc.update_object(xref_crease, "<<>>")
    doc.update_stream(xref_crease, crease_bytes)

    xref_cut = doc.get_new_xref()
    doc.update_object(xref_cut, "<<>>")
    doc.update_stream(xref_cut, cut_bytes)

    existing = page.get_contents()
    all_xrefs = [f"{x} 0 R" for x in existing] + [f"{xref_crease} 0 R", f"{xref_cut} 0 R"]
    doc.xref_set_key(page_xref, "Contents", "[" + " ".join(all_xrefs) + "]")


def set_canvas_boxes(doc: pymupdf.Document, page: pymupdf.Page):
    b_rect = f"[0 0 {PAGE_W_PT:.4f} {PAGE_H_PT:.4f}]"
    t_rect = f"[{pt(BLEED_MM):.4f} {pt(BLEED_MM):.4f} {pt(BLEED_MM + CANVAS_TRIM_W_MM):.4f} {pt(BLEED_MM + CANVAS_TRIM_H_MM):.4f}]"
    doc.xref_set_key(page.xref, "MediaBox", b_rect)
    doc.xref_set_key(page.xref, "CropBox", b_rect)
    doc.xref_set_key(page.xref, "BleedBox", b_rect)
    doc.xref_set_key(page.xref, "TrimBox", t_rect)


def build_card_page(out_doc: pymupdf.Document, meta: dict, src_art_pdf: Path):
    src = pymupdf.open(src_art_pdf)
    page = out_doc.new_page(width=PAGE_W_PT, height=PAGE_H_PT)
    page.show_pdf_page(page.rect, src, 0, oc=meta["ocg_art"])
    set_canvas_boxes(out_doc, page)
    attach_vector_layers_to_page(out_doc, page, meta, [(BLEED_MM + CARD_OFFSET_X_MM, BLEED_MM)])
    src.close()
    return page


def render_clean_artwork_png(src_art_pdf: Path, dpi: int = 350) -> bytes:
    doc = pymupdf.open(src_art_pdf)
    pix = doc[0].get_pixmap(dpi=dpi, alpha=False)
    data = pix.tobytes("png")
    doc.close()
    return data


def build_layered_svg(src_art_pdf: Path, out_svg_path: Path):
    png_bytes = render_clean_artwork_png(src_art_pdf, dpi=350)
    b64 = base64.b64encode(png_bytes).decode("ascii")

    x0 = BLEED_MM + CARD_OFFSET_X_MM
    x1 = x0 + CARD_W_MM
    y0 = BLEED_MM
    y1 = y0 + CARD_H_MM
    rc = R_CORNER_MM
    rn = R_NOTCH_MM
    yn = Y_STUB_TOP_MM

    diecut_d = (
        f"M {x0 + rc},{y0} H {x1 - rc} "
        f"A {rc},{rc} 0 0 1 {x1},{y0 + rc} "
        f"V {yn - rn} "
        f"A {rn},{rn} 0 0 0 {x1},{yn + rn} "
        f"V {y1 - rc} "
        f"A {rc},{rc} 0 0 1 {x1 - rc},{y1} "
        f"H {x0 + rc} "
        f"A {rc},{rc} 0 0 1 {x0},{y1 - rc} "
        f"V {yn + rn} "
        f"A {rn},{rn} 0 0 0 {x0},{yn - rn} "
        f"V {y0 + rc} "
        f"A {rc},{rc} 0 0 1 {x0 + rc},{y0} Z"
    )
    crease_d = f"M {x0 + rn},{yn} H {x1 - rn}"

    svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
     width="{PAGE_W_MM}mm" height="{PAGE_H_MM}mm"
     viewBox="0 0 {PAGE_W_MM} {PAGE_H_MM}">
  <title>{escape(out_svg_path.stem)} - 9:16 card (60.75x108mm) on 90x108mm canvas (3mm bleed)</title>
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
    """Build a 2-page SRA3 (320 x 450 mm) 12-up imposed press sheet of the 60.75x108.0 mm 9:16 cards
    (4 cols x 3 rows) with 10.0 mm cut-to-cut spacing (>= 5 mm required).
    """
    SHEET_W_MM = 320.0
    SHEET_H_MM = 450.0
    GAP_MM = 10.0
    # 4 cols x 3 rows of 60.75x108 trim cards -> 273.0 x 344.0 mm
    x_start = (SHEET_W_MM - (4 * CARD_W_MM + 3 * GAP_MM)) / 2.0   # 23.5 mm
    y_start = (SHEET_H_MM - (3 * CARD_H_MM + 2 * GAP_MM)) / 2.0   # 53.0 mm

    sheet_slots = CARD_SLUGS + ["01-ferry", "02-rooftop", "03-family", "04-diner", "05-trolley"]

    # Clip strictly to each card's own 66.75 x 114.0 mm bleed box inside the 96 x 114 mm source page
    src_clip = pymupdf.Rect(
        pt(BLEED_MM + CARD_OFFSET_X_MM - BLEED_MM),
        0.0,
        pt(BLEED_MM + CARD_OFFSET_X_MM + CARD_W_MM + BLEED_MM),
        pt(PAGE_H_MM),
    )

    doc = pymupdf.open()
    meta = ensure_spot_resources(doc)

    # Page 1: Fronts (12-up)
    p_front = doc.new_page(width=pt(SHEET_W_MM), height=pt(SHEET_H_MM))
    front_origins = []
    for idx, slug in enumerate(sheet_slots):
        col = idx % 4
        row = idx // 4
        trim_x = x_start + col * (CARD_W_MM + GAP_MM)
        trim_y_top = y_start + row * (CARD_H_MM + GAP_MM)
        trim_y_bot_pdf = SHEET_H_MM - (trim_y_top + CARD_H_MM)
        front_origins.append((trim_x, trim_y_bot_pdf))

        dest_rect = pymupdf.Rect(
            pt(trim_x - BLEED_MM),
            pt(trim_y_top - BLEED_MM),
            pt(trim_x + CARD_W_MM + BLEED_MM),
            pt(trim_y_top + CARD_H_MM + BLEED_MM),
        )
        src = pymupdf.open(ART_PDF_DIR / f"front-{slug}.pdf")
        p_front.show_pdf_page(dest_rect, src, 0, clip=src_clip, oc=meta["ocg_art"])
        src.close()

    attach_vector_layers_to_page(doc, p_front, meta, front_origins)

    # Page 2: Universal Backs (duplex horizontal flip: col -> 3 - col)
    p_back = doc.new_page(width=pt(SHEET_W_MM), height=pt(SHEET_H_MM))
    back_src = pymupdf.open(ART_PDF_DIR / "universal-back.pdf")
    back_origins = []
    for idx in range(12):
        col = 3 - (idx % 4)
        row = idx // 4
        trim_x = x_start + col * (CARD_W_MM + GAP_MM)
        trim_y_top = y_start + row * (CARD_H_MM + GAP_MM)
        trim_y_bot_pdf = SHEET_H_MM - (trim_y_top + CARD_H_MM)
        back_origins.append((trim_x, trim_y_bot_pdf))

        dest_rect = pymupdf.Rect(
            pt(trim_x - BLEED_MM),
            pt(trim_y_top - BLEED_MM),
            pt(trim_x + CARD_W_MM + BLEED_MM),
            pt(trim_y_top + CARD_H_MM + BLEED_MM),
        )
        p_back.show_pdf_page(dest_rect, back_src, 0, clip=src_clip, oc=meta["ocg_art"])
    back_src.close()
    attach_vector_layers_to_page(doc, p_back, meta, back_origins)

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
    """Create an antialiased alpha mask matching the 60.75x108 mm rounded + notched 9:16 contour."""
    w, h = size_px
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

    x0 = mx(BLEED_MM + CARD_OFFSET_X_MM)
    x1 = mx(BLEED_MM + CARD_OFFSET_X_MM + CARD_W_MM)
    y0 = my(BLEED_MM)
    y1 = my(BLEED_MM + CARD_H_MM)
    rc_x = mx(R_CORNER_MM)
    rc_y = my(R_CORNER_MM)

    d.rounded_rectangle([x0, y0, x1, y1], radius=(rc_x + rc_y) / 2.0, fill=255)
    yn = my(Y_STUB_TOP_MM)
    rn_x = mx(R_NOTCH_MM)
    rn_y = my(R_NOTCH_MM)
    d.ellipse([x0 - rn_x, yn - rn_y, x0 + rn_x, yn + rn_y], fill=0)
    d.ellipse([x1 - rn_x, yn - rn_y, x1 + rn_x, yn + rn_y], fill=0)

    return mask.resize((w, h), Image.LANCZOS)


def generate_proofs():
    OUT_PROOFS.mkdir(parents=True, exist_ok=True)
    dpi = 280

    def cut_card_rgba(pdf_path: Path, page_idx: int) -> Image.Image:
        rgb = render_pdf_page_image(pdf_path, page_idx, dpi=dpi, hide_layers=("DieCut", "Crease"))
        mask = make_diecut_mask(rgb.size)
        rgba = rgb.convert("RGBA")
        rgba.putalpha(mask)
        x0 = int(round((BLEED_MM + CARD_OFFSET_X_MM) * rgb.width / PAGE_W_MM))
        x1 = int(round((BLEED_MM + CARD_OFFSET_X_MM + CARD_W_MM) * rgb.width / PAGE_W_MM))
        y0 = int(round(BLEED_MM * rgb.height / PAGE_H_MM))
        y1 = int(round((BLEED_MM + CARD_H_MM) * rgb.height / PAGE_H_MM))
        return rgba.crop((x0, y0, x1, y1))

    cards_1_4 = [cut_card_rgba(OUT_PDF / f"card-{slug}.pdf", 0) for slug in CARD_SLUGS[:4]]
    cw, ch = cards_1_4[0].size
    margin = 48
    gap = 36
    sheet1 = Image.new("RGB", (margin * 2 + 4 * cw + 3 * gap, margin * 2 + ch), (242, 234, 220))
    for i, card_im in enumerate(cards_1_4):
        x = margin + i * (cw + gap)
        y = margin
        sh = Image.new("RGBA", card_im.size, (46, 40, 56, 70))
        sh.putalpha(card_im.split()[3].point(lambda a: int(a * 0.28)))
        sheet1.paste(sh, (x + 10, y + 14), sh)
        sheet1.paste(card_im, (x, y), card_im)
    sheet1.save(OUT_PROOFS / "proof-fronts-1-to-4.png")

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

    tech_front = render_pdf_page_image(OUT_PDF / "card-01-ferry.pdf", 0, dpi=280, hide_layers=())
    tech_back = render_pdf_page_image(OUT_PDF / "card-01-ferry.pdf", 1, dpi=280, hide_layers=())
    tw, th = tech_front.size
    tech_sheet = Image.new("RGB", (margin * 2 + 2 * tw + gap, margin * 2 + th), (255, 255, 255))
    tech_sheet.paste(tech_front, (margin, margin))
    tech_sheet.paste(tech_back, (margin + tw + gap, margin))
    tech_sheet.save(OUT_PROOFS / "proof-technical-diecut-layers.png")

    sra3_f = render_pdf_page_image(OUT_PDF / "press-sheet-sra3-12up.pdf", 0, dpi=120, hide_layers=())
    sra3_b = render_pdf_page_image(OUT_PDF / "press-sheet-sra3-12up.pdf", 1, dpi=120, hide_layers=())
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
        res_xref = int(doc.xref_get_key(page.xref, "Resources")[1].split()[0])
        res_str = doc.xref_object(res_xref)
        assert "/CS_Cut" in res_str and "/CS_Crease" in res_str, f"{pdf_path.name} p{pno+1} missing spot color spaces"

        contents = page.get_contents()
        assert len(contents) >= 3, f"{pdf_path.name} p{pno+1} unexpected content count {len(contents)}"
        for label, xref in [("Crease", contents[-2]), ("DieCut", contents[-1])]:
            stream = doc.xref_stream(xref).decode("latin1")
            assert "/OC /OC_" in stream, f"{pdf_path.name} p{pno+1} {label} missing OCG wrapper"
            assert re.search(r"(?:^|\s)S(?:\s|$)", stream), f"{pdf_path.name} p{pno+1} {label} missing stroke operator"
            for tok in re.findall(r"\b(?:f\*?|F|B\*?|b\*?|sh|gs|d|Do|BT|ET)\b", stream):
                raise AssertionError(f"{pdf_path.name} p{pno+1} {label} contains forbidden operator '{tok}'")

        if "sra3" not in pdf_path.name:
            w_mm = page.rect.width / MM_TO_PT
            h_mm = page.rect.height / MM_TO_PT
            assert abs(w_mm - PAGE_W_MM) < 0.05 and abs(h_mm - PAGE_H_MM) < 0.05, f"{pdf_path.name} bad size {w_mm}x{h_mm}"
            tb = doc.xref_get_key(page.xref, "TrimBox")[1]
            nums = [float(x) for x in tb.strip("[]").split()]
            tw_mm = (nums[2] - nums[0]) / MM_TO_PT
            th_mm = (nums[3] - nums[1]) / MM_TO_PT
            assert abs(tw_mm - CANVAS_TRIM_W_MM) < 0.05 and abs(th_mm - CANVAS_TRIM_H_MM) < 0.05, f"{pdf_path.name} bad TrimBox {tw_mm}x{th_mm}"

    doc.close()


def main():
    OUT_PDF.mkdir(parents=True, exist_ok=True)
    OUT_SVG.mkdir(parents=True, exist_ok=True)
    OUT_PROOFS.mkdir(parents=True, exist_ok=True)

    for old_name in ("press-sheet-sra3-6up.pdf", "press-sheet-sra3-9up.pdf"):
        p = OUT_PDF / old_name
        if p.exists():
            p.unlink()

    back_art = ART_PDF_DIR / "universal-back.pdf"

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

    back_doc = pymupdf.open()
    back_meta = ensure_spot_resources(back_doc)
    build_card_page(back_doc, back_meta, back_art)
    back_pdf_path = OUT_PDF / "universal-back.pdf"
    back_doc.save(back_pdf_path, deflate=True, garbage=4)
    back_doc.close()
    build_layered_svg(back_art, OUT_SVG / "universal-back.svg")
    print("Built universal-back.pdf + universal-back.svg")

    sra3_path = OUT_PDF / "press-sheet-sra3-12up.pdf"
    build_sra3_press_sheet(sra3_path)
    print(f"Built {sra3_path.name}")

    for pdf_file in sorted(OUT_PDF.glob("*.pdf")):
        verify_pdf_compliance(pdf_file)
        print(f"Verified print compliance: {pdf_file.name}")

    generate_proofs()
    print("Generated visual proof PNGs in art/result-cards/proofs/")


if __name__ == "__main__":
    main()
