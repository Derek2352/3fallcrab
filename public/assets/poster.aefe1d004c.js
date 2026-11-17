(() => {
"use strict";
const input = document.getElementById("url");
const booth = document.getElementById("booth");
const igToggle = document.getElementById("igToggle");
const igBar = document.getElementById("igBar");
const svg = document.getElementById("qr");
const NS = "http://www.w3.org/2000/svg";
const qs = new URLSearchParams(location.search);
const fromQuery = qs.get("url");
input.value = fromQuery || location.origin + "/";
if (igToggle && igBar) {
const syncIg = () => { igBar.hidden = !igToggle.checked; };
if (qs.get("ig") === "1") igToggle.checked = true;
igToggle.addEventListener("change", syncIg);
syncIg();
}
function syncBooth() {
if (!booth) return;
try {
const u = new URL(input.value.trim() || location.origin + "/");
booth.checked = u.searchParams.get("booth") === "1";
} catch { booth.checked = /[?&]booth=1(?:&|$)/.test(input.value); }
}
if (booth) {
booth.addEventListener("change", () => {
try {
const u = new URL(input.value.trim() || location.origin + "/");
if (booth.checked) u.searchParams.set("booth", "1");
else u.searchParams.delete("booth");
input.value = u.href;
} catch {
const raw = input.value.trim() || location.origin + "/";
if (booth.checked && !/[?&]booth=1(?:&|$)/.test(raw)) input.value = raw + (raw.includes("?") ? "&" : "?") + "booth=1";
else if (!booth.checked) input.value = raw.replace(/([?&])booth=1(&|$)/, (_, a, b) => (a === "?" && b ? "?" : b ? a : "")).replace(/[?&]$/, "");
}
draw();
});
}
function draw() {
syncBooth();
const text = input.value.trim() || location.origin + "/";
const qr = qrcode(0, "M");
qr.addData(text); qr.make();
const n = qr.getModuleCount(), q = 4, size = n + q * 2;
let d = "";
for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) d += `M${c + q} ${r + q}h1v1h-1z`;
svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
svg.setAttribute("shape-rendering", "crispEdges");
const bg = document.createElementNS(NS, "rect"); bg.setAttribute("width", size); bg.setAttribute("height", size); bg.setAttribute("fill", "#fff");
const p = document.createElementNS(NS, "path"); p.setAttribute("d", d); p.setAttribute("fill", "#2E2838");
svg.replaceChildren(bg, p);
document.getElementById("urlText").textContent = text.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
input.addEventListener("input", draw);
document.getElementById("printBtn").addEventListener("click", () => window.print());
draw();
})();
