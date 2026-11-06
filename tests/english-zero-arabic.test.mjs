// English mode must show no Arabic characters: visible text and user-facing attributes, on every page.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

const PAGES = ["/index.html", "/about/about.html", "/login.html", "/dashboard.html", "/profile.html", "/offline.html", "/play/index.html", "/play/arena.html?track=html", "/play/arena.html?track=css", "/play/arena.html?track=js", "/play/flex-quest.html", "/play/selector-quest.html",
  "/fundamentals/computer-basics/com.html", "/fundamentals/programming-basics/prg.html", "/html-learning/html-learning.html", "/css-learning/css-learning.html", "/javascript-learning/javascript-learning.html", "/advanced-javascript/advanced-javascript.html",
  "/bootstrap-learning/bootstrap-learning.html", "/tailwind-learning/tailwind-learning.html", "/react-learning/react-learning.html", "/vue-learning/vue-learning.html", "/angular-learning/angular-learning.html"];
const AR = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;

test("no Arabic characters in English mode (text, attributes, title) on any page", async () => {
  const bad = [];
  for (const p of PAGES) {
    const ctx = await browser.newContext({ serviceWorkers: "block" });
    await ctx.addInitScript(() => { if (window === window.top) { localStorage.setItem("fayad-lang", "en"); localStorage.setItem("fayad-language", "en"); } });
    await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
    const page = await ctx.newPage(); await page.goto(base + p); await page.waitForTimeout(1800);
    const hits = await page.evaluate((src) => {
      const rx = new RegExp(src); const out = []; const seen = new Set();
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) { const n = walker.currentNode; const el = n.parentElement; if (!el || /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/.test(el.tagName)) continue; if (el.closest("[hidden],[aria-hidden='true'] .never")) continue;
        const cs = getComputedStyle(el); if (cs.display === "none" || cs.visibility === "hidden") continue; if (rx.test(n.nodeValue)) { const t = n.nodeValue.trim().slice(0, 50); if (!seen.has(t)) { seen.add(t); out.push("text: " + t); } } }
      for (const el of document.querySelectorAll("[aria-label],[placeholder],[title],[alt]")) for (const a of ["aria-label", "placeholder", "title", "alt"]) { const v = el.getAttribute(a); if (v && rx.test(v) && !seen.has(v)) { seen.add(v); out.push(`${a}: ${v.slice(0, 50)}`); } }
      if (rx.test(document.title)) out.push("title: " + document.title);
      return out;
    }, AR.source);
    for (const h of hits) bad.push(`${p} -> ${h}`);
    await ctx.close();
  }
  assert.deepEqual(bad, []);
});
