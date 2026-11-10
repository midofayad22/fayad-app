// Computer Basics com-01 … com-19: deep bodies render in AR/EN, exercises' solutions stay hidden until opened, no overflow, ids unchanged.
import test, { before, after } from "node:test";
import assert from "node:assert/strict";
import { chromium } from "playwright";
import { startServer } from "./static-server.mjs";
import { lessons } from "../content/com/index.js";

const IDS = Array.from({ length: 19 }, (_, i) => `com-${String(i + 1).padStart(2, "0")}`);
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser.close(); server.close(); });

test("content: ids com-01..19 preserved, each body has objectives, prerequisites, mistakes, ≥3 exercises, summary", () => {
  for (const id of IDS) {
    const l = lessons.find((x) => x.id === id); assert.ok(l, id);
    for (const c of ["doc-objectives", "doc-prereq", "doc-mistakes", "doc-summary"]) assert.ok(l.body.ar.includes(c), `${id} ${c}`);
    assert.ok((l.body.ar.match(/class="doc-exercise"/g) || []).length >= 3, `${id} exercises`);
    assert.ok(l.body.ar.length > 6000, `${id} depth ${l.body.ar.length}`);
  }
});

for (const lang of ["ar", "en"]) test(`all 19 deep lessons open in ${lang} at 360px: content rendered, solutions hidden then revealed, no overflow, no Arabic in EN`, async () => {
  const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, serviceWorkers: "block" });
  await ctx.addInitScript((l) => localStorage.setItem("fayad-language", l), lang);
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const page = await ctx.newPage(); const errs = []; page.on("pageerror", (e) => errs.push(e.message));
  for (const [i, id] of IDS.entries()) {
    await page.goto(`${base}/fundamentals/computer-basics/com.html#lesson-${i + 1}`);
    await page.waitForFunction(() => document.documentElement.dataset.engine === "ready");
    const lc = page.locator("#lesson-content");
    assert.ok(await lc.locator(".doc-objectives").count() === 1, id);
    assert.ok(await lc.locator("details.doc-exercise").count() >= 3, id);
    assert.equal(await lc.locator("details.doc-exercise[open]").count(), 0, `${id} solutions hidden`);
    await lc.locator("details.doc-exercise summary").first().click();
    assert.ok(await lc.locator("details.doc-exercise[open] .doc-solution").first().isVisible(), `${id} solution reveals`);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${id} overflow`);
    if (lang === "en") assert.ok(!/[؀-ۿ]/.test(await lc.innerText()), `${id} Arabic in EN`);
  }
  assert.deepEqual(errs, []); await ctx.close();
});
