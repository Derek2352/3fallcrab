// Booth poster: draws a QR code (as SVG paths, so it prints sharp) for the game address.
(() => {
  "use strict";
  const input = document.getElementById("url");
  const svg = document.getElementById("qr");
  const NS = "http://www.w3.org/2000/svg";
  const fromQuery = new URLSearchParams(location.search).get("url");
  input.value = fromQuery || location.origin + "/";
  function draw() {
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
