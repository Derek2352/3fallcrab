// Cloudflare Worker entry. Static files in public/ are served straight from the edge;
// only /api/* reaches this script (see "run_worker_first" in wrangler.jsonc).
import { handle } from "./api.js";

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === "/api" || pathname.startsWith("/api/")) return handle(request, env);
    return env.ASSETS.fetch(request);
  },
};
