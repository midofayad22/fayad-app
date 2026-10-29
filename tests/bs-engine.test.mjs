// Bootstrap 5 course: every lesson's example must render in the sandboxed preview with the vendored Bootstrap loaded;
// interactive components must actually work; the engine integration (sidebar, completion) is covered by the ajs/html suites.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { lessons, checks, track, BOOTSTRAP_VERSION } from "../content/bs/index.js";

const { chromium } = createRequire(import.meta.url)("playwright");
const URL_NEW = "/bootstrap-learning/bootstrap-learning.html";
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

async function open(hash = "", viewport = { width: 1280, height: 900 }) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage(); const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
  const failed = []; page.on("response", (r) => { if (r.url().startsWith(base) && r.status() >= 400 && !r.url().includes("/_vercel/")) failed.push(r.status() + " " + r.url()); });
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + URL_NEW + hash);
  await page.waitForFunction(() => document.documentElement.dataset.engine === "ready");
  return { ctx, page, errors, failed };
}
const previewFrame = async (page) => {
  await page.waitForSelector("#previewHost iframe");
  const handle = await page.$("#previewHost iframe");
  const frame = await handle.contentFrame();
  await frame.waitForLoadState("load");
  return frame;
};

test("vendored files exist with the documented version and license", () => {
  for (const f of ["bootstrap.min.css", "bootstrap.rtl.min.css", "bootstrap.bundle.min.js", "LICENSE"]) assert.ok(fs.existsSync(`vendor/bootstrap-${BOOTSTRAP_VERSION}/${f}`), f);
  assert.match(fs.readFileSync(`vendor/bootstrap-${BOOTSTRAP_VERSION}/bootstrap.min.css`, "utf8").slice(0, 200), new RegExp(`Bootstrap\\s+v${BOOTSTRAP_VERSION}`));
});

test("bs page: 20 lessons, 5 groups, every example renders with Bootstrap CSS + JS in the sandbox", async () => {
  const { ctx, page, errors, failed } = await open();
  assert.equal(await page.locator(".sidebar a.lesson").count(), lessons.length);
  assert.equal(await page.locator(".sidebar .topic-group").count(), track.groups.length);
  for (const [i, l] of lessons.entries()) {
    await page.click(`.sidebar a.lesson[data-lesson="${i + 1}"]`);
    assert.equal(await page.locator("#exampleCode").textContent(), l.example.code);
    const frame = await previewFrame(page);
    await frame.waitForSelector(checks[i], { state: "attached", timeout: 8000 });
    const info = await frame.evaluate(() => ({ css: getComputedStyle(document.documentElement).getPropertyValue("--bs-body-font-size").trim(), js: typeof window.bootstrap }));
    assert.equal(info.css, "1rem", `lesson ${i + 1}: Bootstrap CSS loaded`);
    assert.equal(info.js, "object", `lesson ${i + 1}: Bootstrap JS loaded`);
  }
  assert.deepEqual(failed, []);
  assert.deepEqual(errors, []);
  await ctx.close();
});

test("bs: modal, accordion and toast examples really work (JS components)", async () => {
  const { ctx, page } = await open("#lesson-16");
  let frame = await previewFrame(page);
  await frame.click('[data-bs-target="#demoModal"]');
  await frame.waitForSelector("#demoModal.show", { timeout: 5000 });
  await ctx.close();

  const a = await open("#lesson-17"); frame = await previewFrame(a.page);
  await frame.click('[data-bs-target="#q2"]');
  await frame.waitForSelector("#q2.show", { timeout: 5000 });
  await frame.waitForFunction(() => !document.getElementById("q1").classList.contains("show"));
  await a.ctx.close();

  const t = await open("#lesson-18"); frame = await previewFrame(t.page);
  assert.equal(await frame.evaluate(() => !!bootstrap.Tooltip.getInstance(document.getElementById("tipBtn"))), true);
  await frame.click("#toastBtn");
  await frame.waitForSelector("#liveToast.show", { timeout: 5000 });
  await t.ctx.close();
});

test("bs: dark color mode on an element changes its computed background (lesson 19)", async () => {
  const { ctx, page } = await open("#lesson-19");
  const frame = await previewFrame(page);
  await frame.waitForSelector("[data-bs-theme=dark]");
  const [light, dark] = await frame.evaluate(() => [...document.querySelectorAll(".bg-body")].map((e) => getComputedStyle(e).backgroundColor));
  assert.notEqual(light, dark);
  await ctx.close();
});

test("bs: preview is sandboxed (cannot read the host page storage)", async () => {
  const { ctx, page } = await open("#lesson-1");
  await page.fill("#jsEditor", "<script>try{document.title=typeof localStorage}catch(e){document.title='blocked'}<\/script><p id=r>x</p>");
  await page.waitForTimeout(1200); // the preview re-renders (new frame) after the debounced input
  const frame = await previewFrame(page);
  await frame.waitForSelector("#r", { state: "attached" });
  assert.match(await frame.evaluate(() => document.title), /blocked|undefined/);
  await ctx.close();
});
