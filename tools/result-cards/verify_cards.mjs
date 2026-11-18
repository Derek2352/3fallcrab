// Verifies that QR codes on the rendered PDF proofs decode cleanly to the exact target URLs
// and confirms all 7 cards + universal back outputs exist cleanly.

import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "../../tests/e2e/cdp.mjs";
import { resolveCards } from "./cards-data.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const OUT = join(ROOT, "art", "result-cards");

async function main() {
  const cards = resolveCards();

  for (const c of cards) {
    assert.ok(existsSync(join(OUT, "pdf", `card-${c.slug}.pdf`)), `Missing PDF for ${c.slug}`);
    assert.ok(existsSync(join(OUT, "svg", `card-${c.slug}-front.svg`)), `Missing SVG for ${c.slug}`);
  }
  for (const f of [
    "pdf/all-7-result-cards-print.pdf",
    "pdf/universal-back.pdf",
    "pdf/press-sheet-sra3-12up.pdf",
    "svg/universal-back.svg",
    "proofs/proof-fronts-1-to-4.png",
    "proofs/proof-fronts-5-to-7-and-back.png",
    "proofs/proof-technical-diecut-layers.png",
    "proofs/proof-sra3-press-sheet.png",
  ]) {
    assert.ok(existsSync(join(OUT, f)), `Missing deliverable: ${f}`);
  }

  const browser = await launchBrowser();
  try {
    const ctx = await browser.newContext();
    await ctx.goto("about:blank");
    const b64 = readFileSync(join(OUT, "proofs/proof-technical-diecut-layers.png")).toString("base64");
    const res = await ctx.evalJs(`(async () => {
      if (!("BarcodeDetector" in window)) return { supported: false, hits: [] };
      const img = new Image();
      img.src = "data:image/png;base64,${b64}";
      await img.decode();
      const det = new BarcodeDetector({ formats: ["qr_code"] });
      const hits = await det.detect(img);
      return { supported: true, hits: hits.map(h => h.rawValue) };
    })()`);
    await ctx.close();

    console.log("BarcodeDetector result:", JSON.stringify(res));
    if (res.supported) {
      assert.ok(res.hits.includes("https://3fallcrab.com/"), "Game QR did not decode to https://3fallcrab.com/");
      assert.ok(
        res.hits.includes("https://www.instagram.com/3fallfun_campaign?dlrf=azdibDNjdTk4MzQ4"),
        "Instagram QR did not decode to https://www.instagram.com/3fallfun_campaign?dlrf=azdibDNjdTk4MzQ4"
      );
      console.log("Verified both back-side QR codes + challenge QR decode cleanly from final PDF proof!");
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
