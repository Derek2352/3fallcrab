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
// Contact address for privacy questions, shown on the results screen and in the page footer.
const contact = (process.env.CONTACT_EMAIL ?? pkg.config?.contact_email ?? "").trim();
if (contact && !/^[^\s@<>"]+@[^\s@<>"]+\.[a-z]{2,}$/i.test(contact)) {
  console.error(`The contact email in package.json (config.contact_email) doesn't look like an email address (got "${contact}")`);
  process.exit(1);
}
if (site && !/^https:\/\/[^/\s]+$/.test(site)) {
  console.error(`The site address should look like https://your-game.example.com, with no path (got "${site}")`);
  process.exit(1);
}

// Leaderboard guard. The live scores sit in the D1 database bound as "DB" to the Worker "freefallcrab";
// every deploy reuses it. Renaming either makes Cloudflare create a new, empty database on the next deploy,
// and a DROP/TRUNCATE/unfiltered DELETE would wipe it. Stop the build (so nothing deploys) if that happens.
// Deliberate reset or a fork for another team: run with ALLOW_LEADERBOARD_RESET=1.
const LIVE = { worker: "freefallcrab", binding: "DB" };
if (process.env.ALLOW_LEADERBOARD_RESET !== "1") {
  const problems = [];
  const jsonc = readFileSync(join(root, "wrangler.jsonc"), "utf8");
  let json = "", inStr = false;
  for (let i = 0; i < jsonc.length; i++) {
    const c = jsonc[i];
    if (inStr) { json += c; if (c === "\\") json += jsonc[++i] ?? ""; else if (c === '"') inStr = false; }
    else if (c === '"') { inStr = true; json += c; }
    else if (c === "/" && jsonc[i + 1] === "/") { while (i < jsonc.length && jsonc[i] !== "\n") i++; json += "\n"; }
    else json += c;
  }
  const cfg = JSON.parse(json.replace(/,(\s*[}\]])/g, "$1"));
  if (cfg.name !== LIVE.worker) problems.push(`wrangler.jsonc "name" is "${cfg.name}", the live Worker is "${LIVE.worker}"`);
  if (!(cfg.d1_databases || []).some((d) => d.binding === LIVE.binding)) problems.push(`wrangler.jsonc has no D1 binding named "${LIVE.binding}"`);
  for (const dir of ["server", "migrations", "functions"]) {
    for (const f of walk(join(root, dir))) {
      const text = readFileSync(f, "utf8");
      if (/\b(DROP\s+TABLE|TRUNCATE)\b|\bDELETE\s+FROM\s+scores\b(?![^;`"']*\bWHERE\b)/i.test(text)) problems.push(`${relative(root, f)} contains SQL that could wipe the scores table`);
    }
  }
  if (problems.length) {
    console.error("Build stopped to protect the live leaderboard:\n  - " + problems.join("\n  - ") +
      "\nIf you really mean to start a new leaderboard, run the build with ALLOW_LEADERBOARD_RESET=1.");
    process.exit(1);
  }
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
  let body = readFileSync(file);
  // A stylesheet can point at other assets, e.g. url(%%asset:fonts/gluten.woff2%%). Those are fingerprinted first, so the
  // stylesheet's own fingerprint changes whenever a font does.
  if (extname(path) === ".css") body = Buffer.from(body.toString("utf8").replace(/%%asset:([^%]+)%%/g, (_, p) => asset(p.trim())));
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
  if (!contact) html = html.replace(/<p[^>]*>[^\n]*%%CONTACT_EMAIL%%[^\n]*<\/p>\n?/g, "").replaceAll(" privacyNote", ""); // no address: leave the contact lines out
  return html.replaceAll("%%SITE_URL%%", site).replaceAll("%%CONTACT_EMAIL%%", contact);
}

writeFileSync(join(out, "index.html"), render(readFileSync(join(src, "index.html"), "utf8")));
for (const f of walk(out)) if (f.endsWith(".html")) writeFileSync(f, render(readFileSync(f, "utf8")));
// The fonts' licence (the SIL Open Font License wants it to travel with them) is published next to them in assets/.
if ([...hashed.keys()].some((p) => p.endsWith(".woff2"))) asset("fonts/OFL.txt");

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
const left = files.filter((f) => /\.(html|css)$/.test(f) && readFileSync(f, "utf8").includes("%%"));
if (left.length) {
  console.error("Unreplaced placeholders in: " + left.map((f) => relative(root, f)).join(", "));
  process.exit(1);
}

// Fonts: the page uses self-hosted subsets of its fonts (src/fonts/, made by `npm run fonts`), which hold only the characters
// that were in src/ at the time. A Chinese character they lack is not an error: it is drawn by the visitor's system Chinese
// font, which the font stacks already name. So this only warns; a failing build would block a deploy of card text edited on
// GitHub. The scan rules (what is read, how escapes are decoded) match tools/subset-fonts.py.
{
  const skipDirs = new Set(["vendor", "fonts"]), skipFiles = new Set(["admin.html", "admin.js"]);
  const cjk = /[⺀-鿿豈-﫿︰-﹏＀-￯\u{20000}-\u{2FA1F}]/u;
  const decode = (text, ext) => {
    const chr = (hex) => { try { return String.fromCodePoint(parseInt(hex, 16)); } catch { return ""; } };
    if (ext === ".html") text = text.replace(/&#x([0-9a-f]+);/gi, (_, h) => chr(h)).replace(/&#(\d+);/g, (_, d) => chr((+d).toString(16)));
    if (ext === ".html" || ext === ".js") return text.replace(/\\u\{([0-9a-f]{1,6})\}|\\u([0-9a-f]{4})/gi, (_, a, b) => chr(a || b));
    if (ext === ".css") return text.replace(/\\([0-9a-f]{1,6})[ \t\r\n]?/gi, (_, h) => chr(h));
    return text;
  };
  const used = new Map(); // character -> the files it is in
  (function scan(dir) {
    for (const n of readdirSync(dir).sort()) {
      const p = join(dir, n);
      if (statSync(p).isDirectory()) { if (!skipDirs.has(n)) scan(p); continue; }
      if (!/\.(html|js|css)$/.test(n) || skipFiles.has(n)) continue;
      for (const ch of decode(readFileSync(p, "utf8"), extname(n))) {
        if (!cjk.test(ch)) continue;
        if (!used.has(ch)) used.set(ch, new Set());
        used.get(ch).add(relative(src, p));
      }
    }
  })(src);
  const list = join(src, "fonts", "chars.txt");
  if (!existsSync(list)) {
    console.warn("\nWARNING: src/fonts/chars.txt is missing, so the build can't tell which Chinese characters the self-hosted fonts lack. Run `npm run fonts`.");
  } else {
    const built = new Set(readFileSync(list, "utf8").replace(/[\r\n]/g, ""));
    const missing = [...used.keys()].filter((ch) => !built.has(ch));
    if (missing.length) {
      const where = [...new Set(missing.flatMap((ch) => [...used.get(ch)]))];
      console.warn(`\nWARNING: ${missing.length} Chinese character${missing.length === 1 ? "" : "s"} in src/ ${missing.length === 1 ? "is" : "are"} not in the self-hosted fonts (src/fonts/chars.txt):\n  ${missing.slice(0, 80).join(" ")}${missing.length > 80 ? " …" : ""}\n  (in ${where.join(", ")})\n` +
        "Until the fonts are rebuilt, visitors see them in their system's Chinese font. To add them, run `npm run fonts` (needs Python with fonttools and brotli, see the README) and commit src/fonts/.");
    }
  }
}
