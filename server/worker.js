// Cloudflare Worker entry. Static files in public/ are served straight from the edge; only two kinds of request
// reach this script (see "run_worker_first" in wrangler.jsonc): /api/* (the leaderboard) and /c (a friend's challenge
// link, whose link preview is rewritten to show their score; the page itself is the normal home page).
import { handle, cleanName, NAME_DEFAULT } from "./api.js";
import "../src/content.js"; // sets globalThis.TFF_CONTENT
const { TITLES } = globalThis.TFF_CONTENT;

const money = (n) => (n < 0 ? "−" : "") + "HK$" + Math.abs(n).toLocaleString("en-US");

// The home page with its share-preview tags (og:title, og:description, og:url, title) filled in from ?s=score&n=name&v=title.
// Every parameter is checked; anything invalid is dropped. Without a valid score the page is served as is.
async function challenge(request, env) {
  const url = new URL(request.url), q = url.searchParams;
  const home = await env.ASSETS.fetch(new Request(new URL("/", request.url), { method: request.method, headers: request.headers }));
  const headers = new Headers(home.headers);
  headers.set("cache-control", "no-store");
  headers.delete("etag");
  const plain = new Response(home.body, { status: home.status, headers });
  const sRaw = q.get("s") || "";
  if (!/^-?\d{1,7}$/.test(sRaw) || request.method === "HEAD" || !home.ok) return plain;
  const score = Number(sRaw);
  const nameRaw = q.get("n") ? cleanName(q.get("n")) : "";
  const name = nameRaw === NAME_DEFAULT ? "" : nameRaw;
  const v = q.get("v") || "", title = TITLES.find((x) => x.id === v) || null;
  const canon = new URL("/c", "https://" + url.host);
  canon.search = "?" + [["s", String(score)], ["n", name], ["v", title ? title.id : ""]]
    .filter(([, x]) => x).map(([k, x]) => k + "=" + encodeURIComponent(x)).join("&");
  const ogTitle = `${name ? name + (/[A-Za-z0-9]$/.test(name) ? " " : "") : "有人"}喺《3 Fall Fun 人生跌塔》儲到 ${money(score)}` + (title ? `，稱號「${title.zh}」` : "") + "— 你夠唔夠膽挑戰？";
  const ogDesc = (title ? `「${title.zh}」：${title.line[1]} ` : "") + `3分鐘疊高你嘅人生塔，避開三大理財陷阱。Can you beat ${name || "this score"}?`;
  // setAttribute escapes quotes but not "&" (so "&copy" would be read as an entity) or "<" ">": escape those here
  const attr = (x) => x.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const chal = { s: score, ...(name && { n: name }), ...(title && { v: title.id }) };
  const set = (value) => ({ element: (e) => e.setAttribute("content", attr(value)) });
  return new HTMLRewriter()
    .on('meta[property="og:title"]', set(ogTitle))
    .on('meta[property="og:description"]', set(ogDesc))
    .on('meta[property="og:url"]', set(canon.href))
    .on("head", { element: (e) => e.append(`<meta name="tff-chal" content="${attr(JSON.stringify(chal)).replace(/"/g, "&quot;")}">`, { html: true }) })
    .on("title", { element: (e) => e.setInnerContent(ogTitle) })
    .transform(plain);
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api" || pathname.startsWith("/api/")) return handle(request, env);
    if (pathname === "/c" && (request.method === "GET" || request.method === "HEAD")) return challenge(request, env);
    return env.ASSETS.fetch(request);
  },
};
