// Friend challenge links (/c?...) land here on Cloudflare Pages deployments; the handler lives in server/worker.js.
import { challenge } from "../server/worker.js";

export const onRequest = ({ request, env }) => challenge(request, env);
