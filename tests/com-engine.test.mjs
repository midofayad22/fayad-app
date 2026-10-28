// Computer Basics on the shared engine, in a real browser (incl. rollback to the legacy page).
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { lessons } from "../content/com/index.js";

const { chromium } = createRequire(import.meta.url)("playwright");
const URL_NEW = "/fundamentals/computer-basics/com.html";
const URL_OLD = "/legacy/computer-basics/com.html";
const LEG = "fayad-computer-progress";
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

async function open(url = URL_NEW, seed = {}, viewport = { width: 1280, height: 900 }) {
  const ctx = await browser.newContext({ viewport });
  await ctx.addInitScript((kv) => { if (window !== window.top) return; if (!sessionStorage.getItem("__seeded")) { for (const [k, v] of Object.entries(kv)) localStorage.setItem(k, v); sessionStorage.setItem("__seeded", "1"); } }, seed);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + url);
  if (url.startsWith("/legacy/")) await page.waitForFunction(() => document.querySelectorAll(".lesson-item").length === 20 && document.querySelector("#lesson-title")?.textContent && document.querySelector("#quiz-options button"));
  else await page.waitForFunction(() => document.documentElement.dataset.engine === "ready");
  return { ctx, page, errors };
}
const stored = (page, k) => page.evaluate((key) => localStorage.getItem(key), k);
const item = (n) => `.lesson-item[data-lesson="${n}"]`; // legacy data-lesson is 0-based; the engine keeps that attribute 1-based
const dom = (page, h) => page.evaluate((x) => { const d = document.createElement("div"); d.innerHTML = x; return d.innerHTML; }, h);

test("boots without console errors; all 20 lessons are in the sidebar, the last one marked as the final test", async () => {
  const { ctx, page, errors } = await open();
  assert.equal(await page.locator(".lesson-item").count(), 20);
  assert.equal(await page.locator(".lesson-item.final-item").count(), 1);
  assert.equal(await page.locator(".lesson-item").last().getAttribute("class"), "lesson-item final-item");
  assert.deepEqual(errors, []);
  await ctx.close();
});

test("every lesson opens from the sidebar with its exact Arabic content", async () => {
  const { ctx, page } = await open();
  for (const [i, l] of lessons.entries()) {
    await page.click(item(i + 1));
    assert.equal(await page.locator("#lesson-title").innerText(), l.title.ar);
    assert.equal(await page.locator("#content-title").innerText(), l.title.ar);
    assert.equal(await page.locator("#lesson-counter").innerText(), `الدرس ${i + 1} من 20`);
    assert.equal(await page.locator("#lesson-content").innerHTML(), await dom(page, l.body.ar));
    assert.equal(await page.locator("#key-concept-text").textContent(), l.key.ar);
    assert.equal(await page.locator("#practice-text").textContent(), l.practice.prompt.ar);
    assert.equal(await page.locator("#lesson-icon i").getAttribute("class"), `fa-solid ${l.icon}`);
    assert.equal(await page.locator("#quiz-question").textContent(), l.quiz[0].question.ar);
    assert.deepEqual(await page.locator("#quiz-options button").allTextContents(), l.quiz[0].options.map((o) => o.ar));
    assert.equal(await page.locator(".lesson-item.active").getAttribute("data-lesson"), String(i + 1));
  }
  await ctx.close();
});

test("previous/next walk all lessons; the last lesson ends the course (no dead link)", async () => {
  const { ctx, page } = await open();
  assert.equal(await page.locator("#prev-btn").isDisabled(), true);
  for (let i = 1; i < lessons.length; i++) { await page.click("#next-btn"); assert.equal(await page.locator("#lesson-title").innerText(), lessons[i].title.ar); }
  assert.equal(await page.locator("#next-btn").isDisabled(), true);
  assert.match(await page.locator("#next-btn").innerText(), /تم الوصول للنهاية/);
  await ctx.close();
});

test("deep links: #lesson-5 opens lesson 5; bad hashes fall back to lesson 1; the hash follows navigation and survives reload", async () => {
  let { ctx, page } = await open(URL_NEW + "#lesson-5");
  assert.equal(await page.locator("#lesson-title").innerText(), lessons[4].title.ar);
  await page.click(item(9)); assert.equal(await page.evaluate(() => location.hash), "#lesson-9");
  await page.reload(); await page.waitForSelector('html[data-engine="ready"]');
  assert.equal(await page.locator("#lesson-title").innerText(), lessons[8].title.ar);
  await ctx.close();
  for (const bad of ["#lesson-0", "#lesson-21", "#x"]) { ({ ctx, page } = await open(URL_NEW + bad)); assert.equal(await page.locator("#lesson-title").innerText(), lessons[0].title.ar, bad); await ctx.close(); }
});

test("quiz feedback: all options lock after one answer; a wrong answer names the correct one; right answers show success", async () => {
  const { ctx, page } = await open();
  const q = lessons[0].quiz[0], wrong = (q.correct + 1) % q.options.length;
  await page.click(`#quiz-options button:nth-child(${wrong + 1})`);
  assert.equal(await page.locator("#quiz-result").innerText(), `إجابة غير صحيحة. الإجابة الصحيحة هي: ${q.options[q.correct].ar}`);
  assert.ok(await page.locator("#quiz-result").evaluate((e) => e.classList.contains("error")));
  assert.ok(await page.locator(`#quiz-options button:nth-child(${q.correct + 1})`).evaluate((b) => b.classList.contains("correct")));
  assert.equal(await page.locator("#quiz-options button:not([disabled])").count(), 0);
  assert.equal(await stored(page, LEG), null); // answering never completes
  assert.equal(JSON.parse(await stored(page, "fayad-progress-v1")).tracks.com.quiz["com-01"].attempts, 1);
  await page.click(item(2)); await page.click(item(1));
  await page.click(`#quiz-options button:nth-child(${q.correct + 1})`);
  assert.equal(await page.locator("#quiz-result").innerText(), "إجابة صحيحة! أحسنت، لقد فهمت المفهوم.");
  assert.ok(await page.locator("#quiz-result").evaluate((e) => e.classList.contains("success")));
  await ctx.close();
});

test("completion is manual: stores v1 + the legacy 0-based list, updates progress, survives reload", async () => {
  const { ctx, page } = await open();
  await page.click(item(3));
  assert.equal(await stored(page, LEG), null);
  await page.click("#complete-btn");
  assert.match(await page.locator("#lesson-status").innerText(), /مكتمل/);
  assert.match(await page.locator("#complete-btn").innerText(), /تم إكمال الدرس/);
  assert.equal(await stored(page, LEG), "[2]");
  assert.deepEqual(JSON.parse(await stored(page, "fayad-progress-v1")).tracks.com.completed, ["com-03"]);
  assert.equal(await page.locator("#progress-text").innerText(), "5%");
  await page.click("#complete-btn"); assert.equal(await stored(page, LEG), "[2]");
  await page.reload(); await page.waitForSelector('html[data-engine="ready"]');
  assert.ok(await page.locator(item(3)).evaluate((b) => b.classList.contains("completed")));
  await ctx.close();
});

test("legacy progress (0-based list) is imported once and never duplicated", async () => {
  const { ctx, page } = await open(URL_NEW, { [LEG]: "[0,2,2,40,\"x\"]" });
  for (const n of [1, 3]) assert.ok(await page.locator(item(n)).evaluate((b) => b.classList.contains("completed")));
  assert.equal(await page.locator("#progress-text").innerText(), "10%");
  await page.reload(); await page.waitForSelector('html[data-engine="ready"]');
  assert.deepEqual(JSON.parse(await stored(page, "fayad-progress-v1")).tracks.com.completed, ["com-01", "com-03"]);
  await page.click(item(2)); await page.click("#complete-btn");
  assert.equal(await stored(page, LEG), "[0,1,2]");
  await ctx.close();
});

test("the engine page has no learner-code execution and loads no legacy script", async () => {
  const html = fs.readFileSync("fundamentals/computer-basics/com.html", "utf8");
  assert.ok(!/src="com\.js"/.test(html));
  assert.ok(!fs.existsSync("fundamentals/computer-basics/com.js"));
  assert.ok(!/<textarea|<iframe/.test(html));
});

test("ROLLBACK: ?engine=legacy opens the previous page, which sees progress made in the new engine, and vice versa", async () => {
  const { ctx, page } = await open();
  await page.click(item(1)); await page.click("#complete-btn");
  await page.goto(base + URL_NEW + "?engine=legacy#lesson-1");
  await page.waitForURL(/\/legacy\/computer-basics\//);
  await page.waitForFunction(() => document.querySelector(".lesson-item.completed"));
  assert.equal(await page.locator("#progress-text").innerText(), "5%");
  assert.ok(await page.locator('meta[name="robots"][content="noindex"]').count());
  await page.click(item(1)); await page.click("#complete-btn"); // legacy data-lesson 1 = second lesson
  assert.equal(await stored(page, LEG), "[0,1]");
  await page.goto(base + URL_NEW); await page.waitForSelector('html[data-engine="ready"]');
  for (const n of [1, 2]) assert.ok(await page.locator(item(n)).evaluate((b) => b.classList.contains("completed")));
  assert.deepEqual(JSON.parse(await stored(page, "fayad-progress-v1")).tracks.com.completed, ["com-01", "com-02"]);
  await ctx.close();
});

test("mobile 390px: no horizontal overflow, no console errors, every lesson reachable", async () => {
  const { ctx, page, errors } = await open(URL_NEW, {}, { width: 390, height: 800 });
  assert.ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= 391);
  await page.locator(item(20)).scrollIntoViewIfNeeded(); await page.click(item(20));
  assert.equal(await page.locator("#lesson-title").innerText(), lessons[19].title.ar);
  assert.ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= 391);
  assert.deepEqual(errors, []);
  await ctx.close();
});
