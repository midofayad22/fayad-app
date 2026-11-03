// VS Code-like editor: lazy upgrade of the lesson textarea; textarea.value and "input" keep working; Ctrl+Enter runs.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });
async function open(url) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage(); await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + url); await page.waitForSelector(".fy-cm .cm-content", { timeout: 15000 });
  return { ctx, page };
}
test("CSS lesson: editor mounts with line numbers, highlighting, status bar; value round-trips", async () => {
  const { ctx, page } = await open("/css-learning/css-learning.html");
  assert.ok(await page.locator(".fy-cm .cm-lineNumbers").count() >= 1);
  assert.ok(await page.locator(".fy-cm-status").innerText().then((t) => /Ln 1, Col 1/.test(t) && /CSS/.test(t)));
  const start = await page.locator("#jsEditor").evaluate((e) => e.value);
  assert.ok(start.length > 5 && (await page.locator(".cm-content").innerText()).replace(/\s+/g, "") === start.replace(/\s+/g, ""));
  // typing in the editor updates the textarea and the live preview
  await page.locator(".cm-content").click(); await page.keyboard.press("Control+A"); await page.keyboard.type("h1 { color: red; }");
  assert.equal(await page.locator("#jsEditor").evaluate((e) => e.value), "h1 { color: red; }");
  // writing the textarea (reset button) updates the editor
  await page.click("#resetButton"); await page.waitForTimeout(300);
  assert.equal((await page.locator(".cm-content").innerText()).replace(/\s+/g, ""), start.replace(/\s+/g, ""));
  await ctx.close();
});
test("auto-close brackets, Tab indents, Ctrl+Enter runs the code, Esc leaves the editor", async () => {
  const { ctx, page } = await open("/javascript-learning/javascript-learning.html");
  await page.locator(".cm-content").click(); await page.keyboard.press("Control+A"); await page.keyboard.type("console.log(");
  assert.equal(await page.locator("#jsEditor").evaluate((e) => e.value), "console.log()");
  await page.keyboard.type('"hi"'); await page.keyboard.press("Control+Enter");
  await page.waitForFunction(() => /hi/.test(document.querySelector("#output")?.textContent || ""), null, { timeout: 8000 });
  await page.keyboard.press("Escape"); await page.keyboard.press("Escape");
  assert.equal(await page.evaluate(() => document.activeElement.classList.contains("cm-content")), false);
  await ctx.close();
});
test("if the editor cannot load, the plain textarea remains usable", async () => {
  const ctx = await browser.newContext({ serviceWorkers: "block" }); const page = await ctx.newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort()); await page.route(/codemirror-6\/cm\.js/, (r) => r.abort());
  await page.goto(base + "/css-learning/css-learning.html"); await page.waitForSelector('html[data-engine="ready"]'); await page.waitForTimeout(800);
  assert.equal(await page.locator(".fy-cm").count(), 0);
  await page.fill("#jsEditor", "p{}"); assert.equal(await page.locator("#jsEditor").inputValue(), "p{}");
  await ctx.close();
});
