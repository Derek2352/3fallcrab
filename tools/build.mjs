// Builds public/ from src/: fingerprints CSS/JS into public/assets/ (cached for a year) and
// copies src/static/ as-is. No dependencies; run with `npm run build`.
//
// Site address (optional): set "config": { "site_url": "https://..." } in package.json once you know it,
// so link previews (WhatsApp, Instagram, Facebook) get an absolute image URL. A SITE_URL environment
// variable overrides it for a single build.
import { createHash } from "node:crypto";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "src");
const out = join(root, "public");
const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const site = (process.env.SITE_URL || pkg.config?.site_url || "").trim().replace(/\/+$/, "");
if (site && !/^https:\/\/[^/\s]+$/.test(site)) {
  console.error(`The site address should look like https://your-game.example.com, with no path (got "${site}")`);
  process.exit(1);
}

// Empty public/ in place (keeps the folder itself, so a running `wrangler dev` keeps watching it).
mkdirSync(out, { recursive: true });
for (const n of readdirSync(out)) rmSync(join(out, n), { recursive: true, force: true });
mkdirSync(join(out, "assets"), { recursive: true });
cpSync(join(src, "static"), out, { recursive: true });

const hashed = new Map();
function asset(path) {
  if (hashed.has(path)) return hashed.get(path);
  const file = join(src, path);
  if (!existsSync(file)) throw new Error(`Missing asset: src/${path}`);
  const body = readFileSync(file);
  const hash = createHash("sha256").update(body).digest("hex").slice(0, 10);
  const ext = extname(path);
  const name = `${basename(path, ext)}.${hash}${ext}`;
  writeFileSync(join(out, "assets", name), body);
  hashed.set(path, `/assets/${name}`);
  return `/assets/${name}`;
}

function render(html) {
  html = html.replace(/%%asset:([^%]+)%%/g, (_, p) => asset(p.trim()));
  if (!site) html = html.replace(/^.*%%SITE_URL%%\/".*\n/gm, ""); // og:url only makes sense with a real address
  return html.replaceAll("%%SITE_URL%%", site);
}

writeFileSync(join(out, "index.html"), render(readFileSync(join(src, "index.html"), "utf8")));
for (const f of walk(out)) if (f.endsWith(".html")) writeFileSync(f, render(readFileSync(f, "utf8")));

function walk(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk(out);
const bytes = files.reduce((n, f) => n + statSync(f).size, 0);
console.log(`Built public/ — ${files.length} files, ${(bytes / 1024).toFixed(0)} KB${site ? `, SITE_URL ${site}` : ""}`);
for (const [from, to] of hashed) console.log(`  src/${from} -> ${to}`);
const left = files.filter((f) => f.endsWith(".html") && readFileSync(f, "utf8").includes("%%"));
if (left.length) {
  console.error("Unreplaced placeholders in: " + left.map((f) => relative(root, f)).join(", "));
  process.exit(1);
}
