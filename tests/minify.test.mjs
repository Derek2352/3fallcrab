// Unit tests for tools/minify.mjs ensuring comments/whitespace stripping never corrupts JS, CSS, or HTML semantics.
import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { minifyJs, minifyCss, minifyHtml } from "../tools/minify.mjs";

test("minifyJs preserves strings, template literals, regexes, and division", () => {
  const sample = `
    // comment with https://example.com
    const url = "https://a.example.com/path // not a comment";
    const tpl = \`hello \${{ a: 1, b: "/* keep */" }.b} // stay\`;
    function check(x) {
      if (x) /foo\\/\\/bar/.test("foo//bar");
      return /abc\\/\\/def/g.test(x) ? 10 / 2 : 0;
    }
    (() => { "use strict"; const r = check("abc//def"); })();
  `;
  const min = minifyJs(sample);
  assert.doesNotThrow(() => new vm.Script(min));
  assert.ok(min.includes("https://a.example.com/path // not a comment"));
  assert.ok(min.includes("/* keep */"));
  assert.ok(min.includes("// stay"));
  assert.ok(min.includes("10 / 2"));
  assert.equal(min.includes("comment with https://example.com"), false);
});

test("minifyCss preserves calc() operators, strings, and @font-face urls", () => {
  const css = `
    /* header comment */
    @font-face {
      font-family: "Test";
      src: url(/assets/font.woff2) format("woff2");
    }
    .sheet {
      max-height: calc(100dvh - 32px);
      content: "/* stay */";
    }
  `;
  const min = minifyCss(css);
  assert.ok(min.includes("calc(100dvh - 32px)"), "calc subtraction spacing lost: " + min);
  assert.ok(min.includes('content:"/* stay */"'));
  assert.equal(min.includes("header comment"), false);
  assert.match(min, /@font-face\{[^}]*\}/);
});

test("minifyHtml strips HTML comments, keeps inline spaces, and minifies style blocks", () => {
  const html = `<!doctype html>
  <!-- secret comment -->
  <style>
    /* x */ body { margin: 0; }
  </style>
  <p>Hello <b>world</b></p>`;
  const min = minifyHtml(html);
  assert.equal(min.includes("secret comment"), false);
  assert.ok(min.includes("Hello <b>world</b>"));
  assert.ok(min.includes("<style>body{margin:0;}</style>"));
});
