// Programming Basics "Beyond the basics" (prg-21 … prg-31): content renders in both languages and every exercise is graded by the real sandbox.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { lessons } from "../content/prg/index.js";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });
const NEW = lessons.filter((l) => /^prg-(2[1-9]|3[01])$/.test(l.id));

async function open(n, lang) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, serviceWorkers: "block" });
  await ctx.addInitScript((l) => localStorage.setItem("fayad-language", l), lang);
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const page = await ctx.newPage(); const errs = []; page.on("pageerror", (e) => { if (!/sandboxed/.test(e.message)) errs.push(e.message); });
  await page.goto(`${base}/fundamentals/programming-basics/prg.html#lesson-${n}`);
  await page.waitForFunction(() => document.documentElement.dataset.engine === "ready"); await page.waitForTimeout(300);
  return { ctx, page, errs };
}
const check = async (page, code) => {
  await page.fill("#code-editor", code); await page.locator(".fd-ex-actions button").first().click();
  await page.waitForFunction(() => /ok|bad/.test(document.querySelector(".fd-ex-status")?.className || ""), null, { timeout: 9000 });
  return page.locator(".fd-ex-status").getAttribute("class");
};

test("11 new lessons, each with doc components, 5 quiz questions and an exercise", () => {
  assert.equal(NEW.length, 11);
  for (const l of NEW) { assert.equal(1 + l.quizMore.length, 5, l.id); assert.ok(l.exercise.solution && l.exercise.test && l.exercise.starter, l.id); assert.ok(l.body.ar.includes("doc-objectives") && l.body.ar.includes("code-ex"), l.id); }
});

for (const [i, l] of NEW.entries()) test(`${l.id}: renders in AR and EN; the starter fails and the reference solution passes the sandbox check`, async () => {
  const n = 21 + i;
  let { ctx, page, errs } = await open(n, "en");
  assert.ok(!/[؀-ۿ]/.test(await page.locator("#lesson-content").innerText()), "English page has no Arabic");
  assert.ok(await page.locator("#lesson-content .code-ex").count() >= 1);
  assert.match(await check(page, l.exercise.starter), /bad/);
  assert.match(await check(page, l.exercise.solution), /ok/);
  assert.deepEqual(errs, []); await ctx.close();
  ({ ctx, page, errs } = await open(n, "ar"));
  assert.equal(await page.locator("#lesson-title").innerText(), l.title.ar);
  assert.equal(await page.evaluate(() => document.documentElement.dir), "rtl");
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
  assert.deepEqual(errs, []); await ctx.close();
});
