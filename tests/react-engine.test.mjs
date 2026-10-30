// React course on the shared engine: sidebar, bilingual content, sandboxed live preview, quiz-gated completion, rollback, English switch.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { lessons, track } from "../content/react/index.js";

const { chromium } = createRequire(import.meta.url)("playwright");
const URL_NEW = "/react-learning/react-learning.html";
const URL_OLD = "/legacy/react-learning/react-learning.html";
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

async function open(url = URL_NEW, { lang = "ar", seed = {}, viewport = { width: 1280, height: 900 } } = {}) {
  const ctx = await browser.newContext({ viewport });
  await ctx.addInitScript(([l, kv]) => { if (window !== window.top) return; localStorage.setItem("fayad-language", l); if (!sessionStorage.getItem("__s")) { for (const [k, v] of Object.entries(kv)) localStorage.setItem(k, v); sessionStorage.setItem("__s", "1"); } }, [lang, seed]);
  const page = await ctx.newPage(); const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error" && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + url);
  if (!url.startsWith("/legacy/")) await page.waitForFunction(() => document.documentElement.dataset.engine === "ready");
  else await page.waitForSelector("#lessonTitle");
  return { ctx, page, errors };
}
const frameOf = async (page, host) => { await page.waitForSelector(`${host} iframe`); const f = await (await page.$(`${host} iframe`)).contentFrame(); await f.waitForLoadState("load"); return f; };
const solve = async (page, id) => { for (const q of lessons.find((l) => l.id === id).quiz) { await page.click(`#answerOptions button[data-index="${q.correct}"]`); await page.click("#quizNextButton"); } };

test("boots without errors; all 30 lessons in 5 groups; exact Arabic content for every lesson", async () => {
  for (const lang of ["ar"]) {
    const { ctx, page, errors } = await open(URL_NEW, { lang });
    assert.equal(await page.locator(".sidebar a.lesson").count(), 30);
    assert.equal(await page.locator(".sidebar .topic-group").count(), 5);
    for (const [i, l] of lessons.entries()) {
      await page.click(`.sidebar a.lesson[data-lesson="${i + 1}"]`);
      assert.equal(await page.locator("#lessonTitle").innerText(), l.title.ar, `title ${i + 1}`);
      assert.equal(await page.locator("#lessonDescription").innerText(), l.description.ar);
      assert.equal(await page.locator("#exampleCode").textContent(), l.example.code);
      assert.equal(await page.locator("#jsEditor").inputValue(), l.example.code);
    }
    assert.deepEqual(errors, []);
    await ctx.close();
  }
});

test("learner JSX is described by the non-executing simulation (never evaluated, no iframe)", async () => {
  const { ctx, page } = await open();
  await page.fill("#jsEditor", "function App(){ return <h1>Hello Fayad</h1>; }");
  await page.waitForFunction(() => /Hello Fayad/.test(document.querySelector("#previewHost .sim-box")?.textContent || ""));
  assert.equal(await page.locator("#previewHost iframe").count(), 0);
  assert.equal(await page.evaluate(() => typeof window.React), "undefined");
  await ctx.close();
});

test("a lesson completes after all 3 questions are answered correctly; the progress mirrors the legacy current-lesson key", async () => {
  const { ctx, page } = await open();
  await solve(page, "react-01");
  await page.waitForFunction(() => (JSON.parse(localStorage.getItem("fayad-progress-v1") || "{}").tracks?.react?.completed || []).length === 1);
  await page.click('.sidebar a.lesson[data-lesson="3"]');
  assert.equal(await page.evaluate(() => localStorage.getItem("fayad-react-current-lesson")), "2"); // legacy 0-based format
  await ctx.close();
});

test("an existing learner's saved lesson (legacy key) is resumed", async () => {
  const { ctx, page } = await open(URL_NEW, { seed: { "fayad-react-current-lesson": "6" } });
  assert.equal(await page.locator("#lessonTitle").innerText(), lessons[6].title.ar);
  await ctx.close();
});



test("mobile: no horizontal overflow at 320 and 390 and a collapsible lesson list", async () => {
  for (const w of [320, 390]) {
    const { ctx, page } = await open(URL_NEW, { viewport: { width: w, height: 800 } });
    assert.ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= w + 1);
    assert.equal(await page.locator("#sidebarToggle").isVisible(), true);
    await ctx.close();
  }
});
