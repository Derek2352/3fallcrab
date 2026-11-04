// Bundles tools/medal3d/medal.js with the parts of three.js it uses into src/vendor/medal3d.js (a plain script that
// sets window.TFF_MEDAL3D). The result is committed, so deploys don't run this; run it after changing the medal:
//   npm run medal
// It fetches three.js and esbuild into tools/medal3d/node_modules the first time (nothing is added to package.json).
import { execSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)), root = join(here, "..", "..");
const THREE = "0.170.0", ESBUILD = "0.24.0";
if (!existsSync(join(here, "node_modules", "three")) || !existsSync(join(here, "node_modules", "esbuild"))) {
  execSync(`npm install --no-save --no-package-lock --no-audit --no-fund --prefix "${here}" three@${THREE} esbuild@${ESBUILD}`, { stdio: "inherit" });
}
const esbuild = await import(pathToFileURL(join(here, "node_modules", "esbuild", "lib", "main.js")).href), build = esbuild.build || esbuild.default.build;
const out = join(root, "src", "vendor", "medal3d.js");
await build({
  entryPoints: [join(here, "medal.js")],
  bundle: true, format: "iife", minify: true, target: "es2019", legalComments: "none",
  nodePaths: [join(here, "node_modules")],
  banner: { js: `/* The 3 Fall Fun title medal (tools/medal3d/medal.js), with three.js r${THREE.split(".")[1]}: MIT License, Copyright © 2010-2024 three.js authors, https://threejs.org */` },
  outfile: out,
});
console.log(`src/vendor/medal3d.js: ${(statSync(out).size / 1024).toFixed(0)} KB`);
