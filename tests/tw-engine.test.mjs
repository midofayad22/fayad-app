// Tailwind course: every example must compile with the vendored @tailwindcss/browser in the sandboxed preview, and the
// documented utility must produce the documented computed style.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { lessons, checks, track, TAILWIND_VERSION } from "../content/tw/index.js";

const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

async function open(hash = "") {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage(); const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + "/tailwind-learning/tailwind-learning.html" + hash);
  await page.waitForFunction(() => document.documentElement.dataset.engine === "ready");
  return { ctx, page, errors };
}
const previewFrame = async (page) => { await page.waitForSelector("#previewHost iframe"); const f = await (await page.$("#previewHost iframe")).contentFrame(); await f.waitForLoadState("load"); return f; };

test("vendored Tailwind browser build exists with the documented version", () => {
  assert.ok(fs.existsSync(`vendor/tailwindcss-browser-${TAILWIND_VERSION}/LICENSE`));
  assert.ok(fs.readFileSync(`vendor/tailwindcss-browser-${TAILWIND_VERSION}/tailwindcss-browser.js`, "utf8").includes(`"${TAILWIND_VERSION}"`));
});

test("tw page: 20 lessons / 5 groups; every example compiles and yields the documented computed style", async () => {
  const { ctx, page, errors } = await open();
  assert.equal(await page.locator(".sidebar a.lesson").count(), lessons.length);
  assert.equal(await page.locator(".sidebar .topic-group").count(), track.groups.length);
  for (const [i, l] of lessons.entries()) {
    await page.click(`.sidebar a.lesson[data-lesson="${i + 1}"]`);
    assert.equal(await page.locator("#exampleCode").textContent(), l.example.code);
    const frame = await previewFrame(page);
    const [sel, prop, want] = checks[i];
    await frame.waitForSelector(sel, { state: "attached", timeout: 8000 });
    await frame.waitForFunction(([s, p, w]) => { const v = getComputedStyle(document.querySelector(s)).getPropertyValue(p); return v === w || (w === "linear-gradient" && v.includes(w)); }, [sel, prop, want], { timeout: 8000 })
      .catch(async () => { throw new Error(`lesson ${i + 1}: ${sel} ${prop} = ${await frame.evaluate(([s, p]) => getComputedStyle(document.querySelector(s)).getPropertyValue(p), [sel, prop])}, expected ${want}`); });
  }
  assert.deepEqual(errors, []);
  await ctx.close();
});

test("tw: dark mode via custom variant and hover utilities really apply (lesson 14)", async () => {
  const { ctx, page } = await open("#lesson-14");
  const frame = await previewFrame(page);
  await frame.waitForSelector("#panel");
  await frame.waitForFunction(() => { const [a, b] = [...document.querySelectorAll(".dark ~ *, #panel, body > div:last-child")].map((e) => getComputedStyle(e).backgroundColor); return a && b && a !== b; });
  await ctx.close();
});
