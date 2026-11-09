// AST tree diagrams (prg-27, prg-30): readable in light/dark, desktop/mobile, AR/EN; no overlap, no page overflow.
import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { startServer } from "./static-server.mjs";

let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser.close(); server.close(); });

const lum = (c) => { const [r, g, b] = c.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

for (const lang of ["ar", "en"]) for (const theme of ["light", "dark"]) for (const [vn, vp] of [["desktop", { width: 1280, height: 900 }], ["mobile", { width: 360, height: 780 }]]) {
  test(`AST diagrams ${lang}/${theme}/${vn}: counted, readable, no overlap, no page overflow`, async () => {
    const ctx = await browser.newContext({ viewport: vp, serviceWorkers: "block", colorScheme: theme });
    await ctx.addInitScript(([l, t]) => { localStorage.setItem("fayad-language", l); localStorage.setItem("fayad-theme", t); }, [lang, theme]);
    await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
    const page = await ctx.newPage(); let total = 0;
    for (const [n, expected] of [[27, 2], [30, 1]]) {
      await page.goto(`${base}/fundamentals/programming-basics/prg.html#lesson-${n}`);
      await page.waitForFunction(() => document.documentElement.dataset.engine === "ready");
      const figs = page.locator(".doc-tree-fig");
      assert.equal(await figs.count(), expected, `lesson ${n}`); total += expected;
      for (let i = 0; i < expected; i++) {
        const r = await figs.nth(i).evaluate((el) => {
          const nodes = [...el.querySelectorAll(".doc-node")], bs = nodes.map((x) => x.getBoundingClientRect()); let overlap = 0;
          for (let a = 0; a < bs.length; a++) for (let c = a + 1; c < bs.length; c++) { const A = bs[a], B = bs[c]; if (A.left < B.right - 1 && B.left < A.right - 1 && A.top < B.bottom - 1 && B.top < A.bottom - 1) overlap++; }
          const wrap = el.querySelector(".doc-tree-wrap"), fr = el.getBoundingClientRect();
          const inside = bs.every((b) => b.right <= fr.right + 1 && b.left >= fr.left - 1 || wrap.scrollWidth > wrap.clientWidth);
          const lines = getComputedStyle(el.querySelector(".doc-tree li:not(:first-child)"), "::before").borderTopColor;
          return { overlap, inside, nodeColor: getComputedStyle(nodes[0]).color, nodeBg: getComputedStyle(nodes[0]).backgroundColor, numColor: getComputedStyle(el.querySelector(".doc-node-num")).color, numBg: getComputedStyle(el.querySelector(".doc-node-num")).backgroundColor, figBg: getComputedStyle(el).backgroundColor, dir: getComputedStyle(el.querySelector(".doc-tree")).direction, page: document.documentElement.scrollWidth <= innerWidth + 1, lines };
        });
        assert.equal(r.overlap, 0); assert.ok(r.inside, "nodes clipped"); assert.ok(r.page, "page overflow"); assert.equal(r.dir, "ltr", "tree geometry stays LTR in RTL pages");
        assert.ok(ratio(r.nodeColor, r.nodeBg) >= 4.5, `node contrast ${ratio(r.nodeColor, r.nodeBg)}`);
        assert.ok(ratio(r.numColor, r.numBg) >= 4.5, `number-node contrast ${ratio(r.numColor, r.numBg)}`);
        assert.ok(ratio(r.lines, r.figBg) >= 3, `connector contrast ${ratio(r.lines, r.figBg)}`);
      }
    }
    assert.equal(total, 3);
    await ctx.close();
  });
}
