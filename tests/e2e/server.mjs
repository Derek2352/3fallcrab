// Local HTTP server serving public/ alongside real server/api.js and server/worker.js challenge routing over fake-D1.
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { handle } from "../../server/api.js";
import { challenge } from "../../server/worker.js";
import { makeStore } from "../fake-d1-store.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const pub = join(root, "public");
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".txt": "text/plain; charset=utf-8",
};

function installHtmlRewriterShim() {
  const prev = globalThis.HTMLRewriter;
  globalThis.HTMLRewriter = class {
    constructor() { this._handlers = []; }
    on(sel, h) { this._handlers.push({ sel, h }); return this; }
    async transform(res) {
      let html = await res.text();
      for (const { sel, h } of this._handlers) {
        if (sel === "title" && h.element) {
          let titleText = "";
          h.element({ setInnerContent: (v) => { titleText = v; } });
          html = html.replace(/<title>[^<]*<\/title>/, `<title>${titleText}</title>`);
        } else if (sel === "head" && h.element) {
          let extra = "";
          h.element({ append: (v) => { extra += v; } });
          html = html.replace("</head>", extra + "</head>");
        } else if (h.element) {
          const m = /meta\[property="([^"]+)"\]/.exec(sel);
          if (m) {
            let val = null;
            h.element({ setAttribute: (_k, v) => { val = v; } });
            if (val != null) {
              html = html.replace(
                new RegExp(`(<meta\\s+property="${m[1]}"\\s+content=")[^"]*(")`),
                (_, a, b) => a + val.replace(/"/g, "&quot;") + b,
              );
            }
          }
        }
      }
      return new Response(html, { status: res.status, headers: res.headers });
    }
  };
  return () => {
    if (prev === undefined) delete globalThis.HTMLRewriter;
    else globalThis.HTMLRewriter = prev;
  };
}

function readStatic(pathname) {
  let rel = decodeURIComponent(pathname).replace(/^\/+/, "");
  if (!rel) rel = "index.html";
  let f = join(pub, rel);
  if (!f.startsWith(pub)) return null;
  if (existsSync(f) && statSync(f).isDirectory()) f = join(f, "index.html");
  if (!existsSync(f) && existsSync(f + ".html")) f += ".html";
  if (!existsSync(f) || statSync(f).isDirectory()) return null;
  return { data: readFileSync(f), ext: extname(f) };
}

export async function startE2EServer({ adminToken = "0123456789abcdef" } = {}) {
  const store = makeStore();
  const assets = {
    fetch: async (req) => {
      const u = new URL(req.url);
      const hit = readStatic(u.pathname);
      if (!hit) return new Response("Not found", { status: 404 });
      return new Response(hit.data, { status: 200, headers: { "content-type": MIME[hit.ext] || "application/octet-stream" } });
    },
  };
  const restoreRewriter = installHtmlRewriterShim();
  const env = { DB: store, ADMIN_TOKEN: adminToken, ASSETS: assets, TIMEZONE: "Asia/Hong_Kong" };

  const server = createServer(async (req, res) => {
    try {
      const origin = `http://${req.headers.host || "127.0.0.1"}`;
      const url = new URL(req.url, origin);
      const chunks = [];
      for await (const ch of req) chunks.push(ch);
      const body = chunks.length ? Buffer.concat(chunks) : undefined;
      const webReq = new Request(url, {
        method: req.method,
        headers: req.headers,
        body: req.method === "GET" || req.method === "HEAD" ? undefined : body,
      });

      let webRes;
      if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
        webRes = await handle(webReq, env);
      } else if ((url.pathname === "/c" || url.pathname === "/c/") && (req.method === "GET" || req.method === "HEAD")) {
        webRes = await challenge(webReq, env);
      } else {
        const hit = readStatic(url.pathname);
        if (!hit) {
          res.writeHead(404); res.end("Not found"); return;
        }
        res.writeHead(200, { "content-type": MIME[hit.ext] || "application/octet-stream" });
        res.end(req.method === "HEAD" ? undefined : hit.data);
        return;
      }

      const headers = Object.fromEntries(webRes.headers.entries());
      delete headers["strict-transport-security"]; // test server runs on http://127.0.0.1
      res.writeHead(webRes.status, headers);
      const buf = req.method === "HEAD" ? Buffer.alloc(0) : Buffer.from(await webRes.arrayBuffer());
      res.end(buf);
    } catch (e) {
      res.writeHead(500);
      res.end(String(e && e.stack ? e.stack : e));
    }
  });

  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  return {
    baseUrl,
    store,
    adminToken,
    close: async () => {
      restoreRewriter();
      await new Promise((r) => server.close(r));
    },
  };
}
