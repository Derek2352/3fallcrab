// Bundles tools/daily3d/daily3d.js with the parts of three.js it uses into src/vendor/daily3d.js
// (a plain IIFE script that sets window.TFF_DAILY3D). Reuses tools/medal3d/node_modules if present,
// or installs three + esbuild locally into tools/daily3d/node_modules (keeping package.json zero-dep).
// Run with: npm run daily3d
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const medalMods = join(root, "tools", "medal3d", "node_modules");
const localMods = join(here, "node_modules");
const THREE = "0.170.0";
const ESBUILD = "0.24.0";

const hasDeps = (dir) => existsSync(join(dir, "three")) && existsSync(join(dir, "esbuild"));
let modsDir = hasDeps(medalMods) ? medalMods : localMods;

if (!hasDeps(modsDir)) {
  modsDir = localMods;
  execSync(
    `npm install --no-save --no-package-lock --no-audit --no-fund --prefix "${here}" three@${THREE} esbuild@${ESBUILD}`,
    { stdio: "inherit" },
  );
}

const esbuild = await import(pathToFileURL(join(modsDir, "esbuild", "lib", "main.js")).href);
const build = esbuild.build || esbuild.default.build;
const outDir = join(root, "src", "vendor");
mkdirSync(outDir, { recursive: true });
const out = join(outDir, "daily3d.js");

await build({
  entryPoints: [join(here, "daily3d.js")],
  bundle: true,
  format: "iife",
  minify: true,
  target: "es2019",
  legalComments: "none",
  nodePaths: [modsDir],
  banner: {
    js: `/* Harbour Keep 3D Diorama Engine (tools/daily3d/), with three.js r${THREE.split(".")[1]}: MIT License, Copyright © 2010-2024 three.js authors, https://threejs.org */`,
  },
  outfile: out,
});

console.log(`src/vendor/daily3d.js: ${(statSync(out).size / 1024).toFixed(0)} KB`);
