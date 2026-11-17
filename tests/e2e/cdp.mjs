// Minimal zero-dependency Chrome DevTools Protocol (CDP) browser driver using Node 24's native WebSocket.
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

export function findBrowser() {
  if (process.env.CHROME_PATH && existsSync(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  const local = process.env.LOCALAPPDATA || "";
  if (local && existsSync(join(local, "ms-playwright"))) {
    const dirs = readdirSync(join(local, "ms-playwright")).filter((d) => d.startsWith("chromium-")).sort().reverse();
    for (const d of dirs) {
      const p = join(local, "ms-playwright", d, "chrome-win64", "chrome.exe");
      if (existsSync(p)) return p;
    }
  }
  const candidates = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  ];
  return candidates.find((p) => existsSync(p)) || null;
}

class CDPConn {
  constructor(wsUrl) {
    this.ws = new WebSocket(wsUrl);
    this.seq = 0;
    this.pending = new Map();
    this.listeners = new Map();
    this.ready = new Promise((resolve, reject) => {
      this.ws.addEventListener("open", () => resolve(), { once: true });
      this.ws.addEventListener("error", (e) => reject(e.error || new Error("WebSocket error")), { once: true });
    });
    this.ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(String(ev.data));
      if (msg.id) {
        const p = this.pending.get(msg.id);
        if (!p) return;
        this.pending.delete(msg.id);
        clearTimeout(p.to);
        if (msg.error) p.reject(new Error(`${msg.error.message} (${p.method})`));
        else p.resolve(msg.result);
      } else if (msg.method) {
        for (const fn of this.listeners.get(msg.method) || []) fn(msg.params, msg.sessionId);
      }
    });
  }
  on(method, fn) {
    if (!this.listeners.has(method)) this.listeners.set(method, new Set());
    this.listeners.get(method).add(fn);
  }
  send(method, params = {}, sessionId = undefined) {
    const id = ++this.seq;
    return new Promise((resolve, reject) => {
      const to = setTimeout(() => { this.pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, 30000);
      this.pending.set(id, { resolve, reject, method, to });
      const payload = { id, method, params };
      if (sessionId) payload.sessionId = sessionId;
      this.ws.send(JSON.stringify(payload));
    });
  }
  close() {
    for (const p of this.pending.values()) clearTimeout(p.to);
    this.pending.clear();
    try { this.ws.close(); } catch {}
  }
}

export async function launchBrowser() {
  const exe = findBrowser();
  if (!exe) throw new Error("No Chromium/Chrome/Edge browser executable found");
  const userDir = mkdtempSync(join(tmpdir(), "tff-e2e-"));
  const proc = spawn(exe, [
    "--headless=new",
    "--use-gl=angle",
    "--use-angle=swiftshader-webgl",
    "--enable-webgl",
    "--enable-unsafe-swiftshader",
    "--no-sandbox",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-background-timer-throttling",
    "--disable-renderer-backgrounding",
    "--mute-audio",
    "--remote-debugging-port=0",
    `--user-data-dir=${userDir}`,
    "about:blank",
  ], { stdio: ["ignore", "pipe", "pipe"] });

  const wsUrl = await new Promise((resolve, reject) => {
    const to = setTimeout(() => reject(new Error("Timed out launching Chromium")), 15000);
    const onChunk = (buf) => {
      const m = /DevTools listening on (ws:\/\/\S+)/.exec(buf.toString());
      if (m) { clearTimeout(to); resolve(m[1]); }
    };
    proc.stderr.on("data", onChunk);
    proc.stdout.on("data", onChunk);
    proc.once("exit", (code) => { clearTimeout(to); reject(new Error(`Chromium exited early (${code})`)); });
  });

  const conn = new CDPConn(wsUrl);
  await conn.ready;

  async function newContext({ viewport = { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false }, userAgent } = {}) {
    const { browserContextId } = await conn.send("Target.createBrowserContext");
    const { targetId } = await conn.send("Target.createTarget", { url: "about:blank", browserContextId });
    const { sessionId } = await conn.send("Target.attachToTarget", { targetId, flatten: true });
    const cdp = (method, params = {}) => conn.send(method, params, sessionId);

    const errors = [];
    const onEx = (p, sid) => {
      if (sid !== sessionId) return;
      const d = p.exceptionDetails;
      errors.push(d?.exception?.description || d?.text || "Runtime exception");
    };
    const onConsole = (p, sid) => {
      if (sid !== sessionId || p.type !== "error") return;
      errors.push((p.args || []).map((a) => a.value || a.description || "").join(" "));
    };
    conn.on("Runtime.exceptionThrown", onEx);
    conn.on("Runtime.consoleAPICalled", onConsole);

    await cdp("Page.enable");
    await cdp("Runtime.enable");
    await cdp("Network.enable");
    await cdp("Emulation.setDeviceMetricsOverride", viewport);
    if (userAgent) await cdp("Emulation.setUserAgentOverride", { userAgent });

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const evalJs = async (expression) => {
      const r = await cdp("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
      return r.result ? r.result.value : undefined;
    };
    const waitFor = async (fnSrc, timeout = 8000) => {
      const deadline = Date.now() + timeout;
      while (Date.now() < deadline) {
        const val = await evalJs(`(${fnSrc})()`);
        if (val) return val;
        await sleep(50);
      }
      throw new Error(`waitFor timeout (${timeout}ms): ${fnSrc}`);
    };
    const goto = async (url) => {
      await cdp("Page.navigate", { url });
      await waitFor("() => document.readyState === 'complete'");
      await sleep(120);
    };
    const click = async (sel) => {
      const pt = await evalJs(`(async () => {
        const el = document.querySelector(${JSON.stringify(sel)});
        if (!el) return null;
        el.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' });
        await new Promise((res) => {
          let settled = false;
          const finish = () => { if (!settled) { settled = true; res(); } };
          setTimeout(finish, 40);
          requestAnimationFrame(() => requestAnimationFrame(finish));
        });
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height };
      })()`);
      if (!pt || !pt.w || !pt.h) throw new Error(`Element not visible for click: ${sel}`);
      await cdp("Input.dispatchMouseEvent", { type: "mouseMoved", x: pt.x, y: pt.y });
      await cdp("Input.dispatchMouseEvent", { type: "mousePressed", x: pt.x, y: pt.y, button: "left", clickCount: 1 });
      await cdp("Input.dispatchMouseEvent", { type: "mouseReleased", x: pt.x, y: pt.y, button: "left", clickCount: 1 });
      await sleep(80);
    };
    const pressKey = async (key, code = key, keyCode = 0) => {
      await cdp("Input.dispatchKeyEvent", { type: "keyDown", key, code, windowsVirtualKeyCode: keyCode });
      await cdp("Input.dispatchKeyEvent", { type: "keyUp", key, code, windowsVirtualKeyCode: keyCode });
      await sleep(60);
    };
    const setOffline = async (offline) => {
      await cdp("Network.emulateNetworkConditions", { offline, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
    };
    const close = async () => {
      await conn.send("Target.disposeBrowserContext", { browserContextId }).catch(() => {});
    };
    return { errors, cdp, evalJs, waitFor, goto, click, pressKey, setOffline, sleep, close };
  }

  return {
    newContext,
    close: async () => {
      try { await conn.send("Browser.close"); } catch {}
      conn.close();
      await Promise.race([new Promise((r) => proc.once("exit", r)), new Promise((r) => setTimeout(r, 1500))]);
      try { proc.kill(); } catch {}
      try { rmSync(userDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 80 }); } catch {}
    },
  };
}
