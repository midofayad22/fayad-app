// Advanced JavaScript on the shared engine: sidebar, content, sandboxed run in the Worker runtime, quiz-gated completion, progress.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { lessons } from "../content/ajs/index.js";

const { chromium } = createRequire(import.meta.url)("playwright");
const URL_NEW = "/advanced-javascript/advanced-javascript.html";
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

async function open(url = URL_NEW, viewport = { width: 1280, height: 900 }) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage(); const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + url);
  await page.waitForFunction(() => document.documentElement.dataset.engine === "ready");
  return { ctx, page, errors };
}
const link = (n) => `.sidebar a.lesson[data-lesson="${n}"]`;
const answer = (page, i) => page.click(`#answerOptions button[data-index="${i}"]`);
const solve = async (page, id) => { for (const q of lessons.find((l) => l.id === id).quiz) { await answer(page, q.correct); await page.click("#quizNextButton"); } };
const dom = (page, h) => page.evaluate((x) => { const d = document.createElement("div"); d.innerHTML = x; return d.innerHTML; }, h);

test("ajs page: 22 lessons in 5 groups, no console errors, exact content for every lesson", async () => {
  const { ctx, page, errors } = await open();
  assert.equal(await page.locator(".sidebar a.lesson").count(), 22);
  assert.equal(await page.locator(".sidebar .topic-group").count(), 5);
  for (const [i, l] of lessons.entries()) {
    await page.click(link(i + 1));
    assert.equal(await page.locator("#lessonTitle").innerText(), l.title.ar);
    assert.equal(await page.locator("#exampleCode").textContent(), l.example.code);
    assert.equal(await page.locator("#exampleResult").innerHTML(), await dom(page, l.example.result.ar));
    assert.equal(await page.locator("#jsEditor").inputValue(), l.practice.starterCode);
  }
  assert.deepEqual(errors, []);
  await ctx.close();
});

test("ajs: running the starter code shows real output from the sandboxed worker", async () => {
  const { ctx, page } = await open(URL_NEW + "#lesson-4");
  await page.fill("#jsEditor", "console.log(['x','y'].map((s) => s.toUpperCase()).join('-'));");
  await page.click("#runButton");
  await page.waitForFunction(() => /X-Y/.test(document.getElementById("output").textContent));
  // storage of the host page is unreachable from learner code
  await page.fill("#jsEditor", "try { console.log(typeof localStorage, typeof document); } catch (e) { console.log('blocked'); }");
  await page.click("#runButton");
  await page.waitForFunction(() => /undefined undefined|blocked/.test(document.getElementById("output").textContent));
  await ctx.close();
});

test("ajs: a runaway loop is stopped and the page stays usable", async () => {
  const { ctx, page } = await open();
  await page.fill("#jsEditor", "while (true) {}");
  await page.click("#runButton");
  await page.waitForFunction(() => document.getElementById("output").textContent.length > 0 && !/^\s*$/.test(document.getElementById("output").textContent), null, { timeout: 15000 });
  await page.click(link(2));
  assert.equal(await page.locator("#lessonTitle").innerText(), lessons[1].title.ar);
  await ctx.close();
});

test("ajs: a lesson completes only after every quiz question is answered correctly; progress persists and mirrors", async () => {
  const { ctx, page } = await open();
  await answer(page, lessons[0].quiz[0].correct === 0 ? 1 : 0); // wrong answer first
  const done = () => page.evaluate(() => JSON.parse(localStorage.getItem("fayad-progress-v1") || "{}").tracks?.ajs?.completed || []);
  assert.deepEqual(await done(), []);
  await page.reload(); await page.waitForFunction(() => document.documentElement.dataset.engine === "ready");
  await solve(page, "ajs-01");
  await page.waitForFunction(() => (JSON.parse(localStorage.getItem("fayad-progress-v1") || "{}").tracks?.ajs?.completed || []).length === 1);
  assert.deepEqual(await done(), ["ajs-01"]);
  assert.equal(await page.evaluate(() => localStorage.getItem("fayad-ajs-completed-lessons")), "[0]");
  await ctx.close();
});

test("ajs: mobile layout has no horizontal overflow (390 + 320) and a collapsible lesson list", async () => {
  for (const w of [320, 390]) {
    const { ctx, page } = await open(URL_NEW, { width: w, height: 800 });
    assert.ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= w + 1);
    assert.equal(await page.locator("#sidebarToggle").isVisible(), true);
    await ctx.close();
  }
});
