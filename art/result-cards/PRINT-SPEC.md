# 3 Fall Fun 人生跌塔 — Physical Result Cards (Souvenir Print Package)

## Dimensions & Paper Stock Recommendation

- **Finished Trim Size (`成品尺寸`)**: **90 mm × 108 mm** (double-height HK card format `90 × 54 × 2`; zoomed-out uncropped `4:5` film poster in a cinema frame + full-width ticket stub)
  - Top cinema stage & framed `4:5` poster (`51.2 × 64.0 mm` sharp poster @ `557 DPI`): `90 mm × 70.0 mm`
  - Bottom ticket stub zone: `90 mm × 38.0 mm`
- **Bleed (`出血位`)**: **3 mm** on all 4 sides → **Artboard / MediaBox / BleedBox = 96 mm × 114 mm**
- **Safe Zone (`安全距離`)**: **≥ 5 mm** inside all die-cut edges and notches
- **Die-Cut Features (`數碼切割幾何`)**:
  - Outer corners: **R 5.0 mm** (`≥ 5 mm`)
  - Left & right stub notches at `y = 70.0 mm` from top trim: **R 3.5 mm** semicircle (`7.0 mm` opening width `≥ 5 mm`)
  - Waist width between notches: **83.0 mm** (`≥ 5 mm`)
- **Crease / Score Line (`壓線`)**:
  - Continuous straight score line at `y = 70.0 mm` from top trim (`83.0 mm` span connecting left and right notch apexes)
- **Recommended Stock (`建議紙質`)**:
  - **300–350 gsm Coated Art Card / Matt Art Card (300g–350g 粉咭 / 啞粉咭)** with **matte lamination (雙面啞膠)** for durability, crisp QR scanning without glare, and clean creasing along the stub line.

---

## Print-House Layer & Vector Compliance (數碼切割來稿規格)

Every PDF in `pdf/` contains **3 explicit PDF Layers (OCGs)** and **Separation Spot Colors**, and every SVG in `svg/` contains **3 explicit Illustrator/Inkscape layers**:

| Requirement | Implementation in `pdf/` & `svg/` |
|---|---|
| 1. 數碼切割圖層 (`DieCut`) | Dedicated PDF OCG layer **`DieCut`** (`CutContour`, `100%` Magenta `CMYK 0/100/0/0`) and SVG `<g id="Layer_DieCut">` |
| 2. 無漸變或特別效果 | Pure solid stroke only (`fill: none`), `opacity: 1`, zero gradients, shadows, blurs, or effects |
| 3. 切割位置切勿偷空 | Single closed outer contour with zero knocked-out text/logo cuts; full `3 mm` bleed extends continuously past cut line |
| 4. 壓線於另一個圖層 (`Crease`) | Dedicated separate PDF OCG layer **`Crease`** (`Crease`, `100%` Cyan `CMYK 100/0/0/0`) and SVG `<g id="Layer_Crease">` |
| 5. 只接受描邊向量圖，無網線 | Pure stroked vector paths (`S`, `0.5 pt` stroke), zero fills, zero raster images, zero dashed/halftone screen (`網線`) |
| 6. 間隔 ≥ 5 mm，幼線 ≥ 5 mm 粗 | `R 5.0 mm` outer corners, `7.0 mm` notch opening, `83.0 mm` minimum card width; `10.0 mm` cut-to-cut gap on `press-sheet-sra3-9up.pdf` |

---

## The 7 Unique Cards + Universal Back

| File | Poster Scene | Title (`稱號`) & Medal | Character & Persona | Score / Stage / Falls |
|---|---|---|---|---|
| `pdf/card-01-ferry.pdf` | `ferry` (疊咗一世，慢慢嘆) | **零中伏神人** *Trap-Proof Legend* (Gold) | **Jackie** · 公屋卷王 *The Pride of the Floor* | `HK$78,200` · 退休 `18F` · `✓ ✓ ✓` |
| `pdf/card-02-rooftop.pdf` | `rooftop` (跌咗，再疊過) | **財務自由預備役** *Early Retiree in Training* (Gold) | **Jack** · 中產炒家 *The Sandwich-Class Tycoon* | `HK$51,600` · 退休 `15F` · `✓ ✓ ×1` |
| `pdf/card-03-family.pdf` | `family` (成家，就係一齊疊) | **疊疊樂之神** *Stacking God* (Gold) | **Jackie** · 中產文青 *The Grade-8 Bohemian* | `HK$39,400` · 成家 `13F` · `✓ ×1 ✓` |
| `pdf/card-04-diner.pdf` | `diner` (第一份糧，先儲兩成) | **穩穩陣陣** *Slow and Steady* (Silver) | **Jack** · 公屋天才 *The Estate Prodigy* | `HK$19,800` · 第一份工 `8F` · `×1 ✓ ✓` |
| `pdf/card-05-trolley.pdf` | `trolley` (使少啲，笑多啲) | **先使未來錢** *Spending Tomorrow's Money* (Bronze) | **Jack** · 富二代社交蝴蝶 *The Bill Magnet* | `HK$7,400` · 第一份工 `6F` · `×2 ✓ ×1` |
| `pdf/card-06-estate.pdf` | `estate` (一格一格，疊出人生) | **明日復明日** *Tomorrow, Tomorrow* (Bronze) | **Jackie** · 劏房卷王 *The Bunk-Bed Valedictorian* | `HK$4,600` · 大學 `3F` · `✓ ✓ ×2` |
| `pdf/card-07-diver.pdf` | `diver` (跌落海，笑住浮返上嚟) | **維港潛水員** *Harbour Diver* (Bronze) | **Jack** · 富二代打機宅 *The Whale* | `HK$2,100` · 大學 `2F` · `✓ ×1 ✓` |
| `pdf/universal-back.pdf` | Universal Back (All 7 cards) | `3 Fall Fun 人生跌塔` + Jack, Jackie & Crab | Game QR (`https://3fallcrab.com/`) + IG QR (`@3fallfun_campaign`) | 3 Falls & 4 Life Stages Stub |

- **`pdf/all-7-result-cards-print.pdf`**: 14-page double-sided combined print PDF (all 7 Fronts paired with Universal Back).
- **`pdf/press-sheet-sra3-9up.pdf`**: 2-page `SRA3` (`320 mm × 450 mm`) 9-up duplex imposition fitting all 7 unique cards (+ 2 bonus) on one single press sheet with `10 mm` cut-to-cut spacing.
- **`svg/*.svg`**: Layered editable vector SVGs (`Layer_Artwork`, `Layer_Crease`, `Layer_DieCut`) for Adobe Illustrator / Inkscape.
- **`proofs/*.png`**: High-resolution visual proof sheets and technical die-cut overlays.

## Regenerating

```bash
python tools/result-cards/prepare_assets.py
node tools/result-cards/render_html_pdfs.mjs
python tools/result-cards/build_print_packages.py
node tools/result-cards/verify_cards.mjs
```
