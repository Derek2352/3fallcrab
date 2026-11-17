// Zero-dependency deterministic minifiers for JS, CSS, and HTML used by tools/build.mjs.
// Designed to preserve strings, template literals, regex literals, calc() spacing, and inline HTML text spacing.

const REGEX_PREV_KW = new Set(["return", "throw", "case", "delete", "void", "typeof", "in", "instanceof", "new", "else", "do", "await", "yield", "of"]);
const isIdentStart = ch => (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z") || ch === "_" || ch === "$" || ch.charCodeAt(0) > 127;
const isIdentPart = ch => isIdentStart(ch) || (ch >= "0" && ch <= "9");

export function stripJsComments(code) {
  let out = "", lineEmpty = true, n = code.length;
  const stack = []; // template literal nesting stack: { type: "tpl", depth }
  let expectRegex = true;
  let lastWord = "", lastPunct = "", parenKw = [];
  let parenDepth = 0;

  for (let i = 0; i < n; i++) {
    const ch = code[i], nx = code[i + 1];

    // Inside template text (outside ${...})
    const top = stack[stack.length - 1];
    if (top && top.depth === 0) {
      if (ch === "\\") { out += ch + (nx ?? ""); i++; continue; }
      if (ch === "`") { out += ch; stack.pop(); expectRegex = false; lastWord = ""; lastPunct = "`"; lineEmpty = false; continue; }
      if (ch === "$" && nx === "{") { out += "${"; i++; top.depth = 1; expectRegex = true; lastWord = ""; lastPunct = "{"; lineEmpty = false; continue; }
      out += ch;
      if (ch === "\n") lineEmpty = true; else if (ch !== "\r") lineEmpty = false;
      continue;
    }

    // Comments
    if (ch === "/" && nx === "/") {
      i += 2;
      while (i < n && code[i] !== "\n") i++;
      if (i < n && code[i] === "\n" && !lineEmpty) { out += "\n"; lineEmpty = true; }
      continue;
    }
    if (ch === "/" && nx === "*") {
      i += 2;
      let hasNl = false;
      while (i < n && !(code[i] === "*" && code[i + 1] === "/")) {
        if (code[i] === "\n") hasNl = true;
        i++;
      }
      i++;
      if (hasNl && !lineEmpty) { out += "\n"; lineEmpty = true; }
      else if (!hasNl && out.length && isIdentPart(out[out.length - 1])) out += " ";
      continue;
    }

    // String literals
    if (ch === "'" || ch === '"') {
      const q = ch; out += q; i++;
      while (i < n) {
        const c = code[i];
        out += c;
        if (c === "\\") { out += code[++i] ?? ""; }
        else if (c === q) break;
        i++;
      }
      expectRegex = false; lastWord = ""; lastPunct = q; lineEmpty = false;
      continue;
    }

    // Template start
    if (ch === "`") {
      out += ch; stack.push({ depth: 0 });
      lineEmpty = false;
      continue;
    }

    // Regex literal
    if (ch === "/" && expectRegex) {
      out += ch; i++;
      let inClass = false;
      while (i < n) {
        const c = code[i];
        out += c;
        if (c === "\\") { out += code[++i] ?? ""; }
        else if (c === "[") inClass = true;
        else if (c === "]") inClass = false;
        else if (c === "/" && !inClass) break;
        else if (c === "\n") break;
        i++;
      }
      while (i + 1 < n && /[a-z]/i.test(code[i + 1])) out += code[++i];
      expectRegex = false; lastWord = ""; lastPunct = "/"; lineEmpty = false;
      continue;
    }

    // Identifiers / numbers
    if (isIdentStart(ch) || (ch >= "0" && ch <= "9")) {
      let tok = ch;
      while (i + 1 < n && (isIdentPart(code[i + 1]) || (ch >= "0" && ch <= "9" && /[a-fA-FxXoObBn._]/.test(code[i + 1])))) {
        tok += code[++i];
      }
      out += tok;
      lastWord = tok; lastPunct = "";
      expectRegex = REGEX_PREV_KW.has(tok);
      lineEmpty = false;
      continue;
    }

    if (ch === "\r") continue;
    if (ch === "\n") {
      if (!lineEmpty) { out += "\n"; lineEmpty = true; }
      continue;
    }
    if (ch === " " || ch === "\t") {
      if (!lineEmpty && out.length && out[out.length - 1] !== " " && out[out.length - 1] !== "\n") {
        // Skip extra internal runs of horizontal whitespace
        let j = i + 1;
        while (j < n && (code[j] === " " || code[j] === "\t")) j++;
        i = j - 1;
        const nextCh = code[j];
        if (nextCh && nextCh !== "\n" && nextCh !== "\r" && !(nextCh === "/" && (code[j + 1] === "/" || code[j + 1] === "*"))) {
          out += " ";
        }
      }
      continue;
    }

    // Punctuation & brace depth tracking for template literals and regex-after-)
    if (ch === "(") {
      parenDepth++;
      parenKw.push({ depth: parenDepth, kw: lastWord });
    } else if (ch === ")") {
      const topP = parenKw[parenKw.length - 1];
      const closesCtrl = topP && topP.depth === parenDepth && (topP.kw === "if" || topP.kw === "while" || topP.kw === "for" || topP.kw === "with");
      if (topP && topP.depth === parenDepth) parenKw.pop();
      parenDepth = Math.max(0, parenDepth - 1);
      out += ch; lineEmpty = false; lastWord = ""; lastPunct = ch;
      expectRegex = !!closesCtrl;
      continue;
    } else if (ch === "{") {
      if (top) top.depth++;
    } else if (ch === "}") {
      if (top) {
        top.depth--;
        if (top.depth === 0) { out += ch; lineEmpty = false; continue; }
      }
    }

    out += ch;
    lineEmpty = false;
    if (ch === "+" && nx === "+") { out += "+"; i++; expectRegex = false; lastPunct = "++"; lastWord = ""; continue; }
    if (ch === "-" && nx === "-") { out += "-"; i++; expectRegex = false; lastPunct = "--"; lastWord = ""; continue; }
    lastWord = ""; lastPunct = ch;
    expectRegex = !"])}".includes(ch);
  }
  return out;
}

export function minifyJs(code) {
  const clean = stripJsComments(code);
  // Join safe statement breaks ending cleanly with ; or , or { to compact lines while keeping ASI boundaries intact,
  // and trim trailing spaces per line. Never alter string/regex/template contents inside a second pass unnecessarily:
  // stripJsComments already stripped all comments, blank lines, and leading indentation.
  const lines = clean.split("\n").map((l) => l.trim()).filter(Boolean);
  return lines.join("\n") + "\n";
}

export function minifyCss(css) {
  let out = "", i = 0, n = css.length;
  while (i < n) {
    const ch = css[i];
    if (ch === "'" || ch === '"') {
      const q = ch; out += q; i++;
      while (i < n) {
        const c = css[i]; out += c;
        if (c === "\\") out += css[++i] ?? "";
        else if (c === q) break;
        i++;
      }
      i++; continue;
    }
    if (ch === "/" && css[i + 1] === "*") {
      i += 2;
      while (i < n && !(css[i] === "*" && css[i + 1] === "/")) i++;
      i += 2; continue;
    }
    if (/\s/.test(ch)) {
      while (i < n && /\s/.test(css[i])) i++;
      const prev = out[out.length - 1], next = css[i];
      if (!prev || !next || "{};:,".includes(prev) || "{};,".includes(next) || prev === "(" || next === ")") continue;
      out += " "; continue;
    }
    out += ch; i++;
  }
  return out;
}

export function minifyHtml(html) {
  // Strip HTML comments (not conditional IE tags), trim line indentation, minify inline <style> blocks carefully.
  let out = html.replace(/<!--(?!\[if[\s\S]*?\])[\s\S]*?-->/g, "");
  out = out.replace(/<style\b([^>]*)>([\s\S]*?)<\/style>/gi, (_, attrs, body) => `<style${attrs}>${minifyCss(body)}</style>`);
  return out.split(/\r?\n/).map((l) => l.trim()).filter(Boolean).join("\n") + "\n";
}
