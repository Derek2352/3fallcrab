// Every /api/* request lands here; the routes live in server/api.js.
import { handle } from "../../server/api.js";

export const onRequest = ({ request, env }) => handle(request, env);
