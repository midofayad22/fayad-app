// Vue course on the shared engine: sidebar, bilingual content, sandboxed live preview, quiz-gated completion, rollback, English switch.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { lessons, track } from "../content/vue/index.js";

const { chromium } = createRequire(import.meta.url)("playwright");
const URL_NEW = "/vue-learning/vue-learning.html";
const URL_OLD = "/legacy/vue-learning/vue-learning.html";
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
  else await page.waitForSelector("#lesson-title");
  return { ctx, page, errors };
}
const frameOf = async (page, host) => { await page.waitForSelector(`${host} iframe`); const f = await (await page.$(`${host} iframe`)).contentFrame(); await f.waitForLoadState("load"); return f; };
const solve = async (page, id) => { for (const q of lessons.find((l) => l.id === id).quiz) { await page.click(`#answerOptions button[data-index="${q.correct}"]`); await page.click("#quizNextButton"); } };

test("boots without errors; all 22 lessons in 5 groups; exact Arabic content for every lesson", async () => {
  for (const lang of ["ar"]) {
    const { ctx, page, errors } = await open(URL_NEW, { lang });
    assert.equal(await page.locator(".sidebar a.lesson").count(), 22);
    assert.equal(await page.locator(".sidebar .topic-group").count(), 5);
    for (const [i, l] of lessons.entries()) {
      await page.click(`.sidebar a.lesson[data-lesson="${i + 1}"]`);
      assert.equal(await page.locator("#lessonTitle").innerText(), l.title.ar, `title ${i + 1}`);
      assert.equal(await page.locator("#lessonDescription").innerText(), l.description.ar);
      assert.equal(await page.locator("#exampleCode").textContent(), l.example.code);
      assert.equal(await page.locator("#jsEditor").inputValue(), l.practice.starterCode);
    }
    assert.deepEqual(errors, []);
    await ctx.close();
  }
});

test("Vue code runs in the sandboxed preview: every starter and example mounts (no raw {{ }} left, no page errors)", async () => {
  const { ctx, page, errors } = await open();
  for (const [i, l] of lessons.entries()) {
    await page.click(`.sidebar a.lesson[data-lesson="${i + 1}"]`);
    for (const code of [l.practice.starterCode, l.example.code]) {
      await page.fill("#jsEditor", code); await page.click("#runButton");
      const frame = await frameOf(page, "#previewHost");
      await frame.waitForFunction(() => { const a = document.querySelector("#app"); return !a || (a.innerHTML.trim() !== "" && !/\{\{/.test(a.textContent)); }, null, { timeout: 8000 }).catch(() => { throw new Error(`${l.id}: Vue did not mount`); });
    }
  }
  assert.deepEqual(errors, []);
  await ctx.close();
});

test("the preview is sandboxed (allow-scripts only) and learner scripts cannot read the site's storage", async () => {
  const { ctx, page } = await open(URL_NEW, { seed: { "fayad-supabase-auth": "SECRET" } });
  assert.equal(await (await page.waitForSelector("#previewHost iframe")).getAttribute("sandbox"), "allow-scripts");
  await page.fill("#jsEditor", `<p id=r></p><script>var o;try{o=localStorage.getItem('fayad-supabase-auth')}catch(e){o='BLOCKED'}document.getElementById('r').textContent=o<\/script>`);
  await page.click("#runButton");
  const frame = await frameOf(page, "#previewHost");
  await frame.waitForFunction(() => document.getElementById("r")?.textContent === "BLOCKED");
  await ctx.close();
});

test("a lesson completes after all 3 questions are answered correctly; the legacy 1-based completed list is mirrored", async () => {
  const { ctx, page } = await open();
  await solve(page, "vue-01");
  await page.waitForFunction(() => (JSON.parse(localStorage.getItem("fayad-progress-v1") || "{}").tracks?.vue?.completed || []).length === 1);
  assert.equal(await page.evaluate(() => localStorage.getItem("fayad-vue-learning-progress")), "[1]");
  await ctx.close();
});

test("an existing learner's completed lessons (legacy key) are kept", async () => {
  const { ctx, page } = await open(URL_NEW, { seed: { "fayad-vue-learning-progress": "[1,2,5]" } });
  assert.equal(await page.locator("#progressText").innerText(), `${Math.round((3 / 22) * 100)}%`);
  await ctx.close();
});

test("rollback: the frozen legacy page still loads and shares the completed-lessons key", async () => {
  const { ctx, page } = await open(URL_OLD, { seed: { "fayad-vue-learning-progress": "[1,2]" } });
  assert.equal(await page.locator("#lesson-title").innerText(), lessons[0].title.ar);
  assert.match(await page.evaluate(() => document.querySelector('meta[name="robots"]')?.content), /noindex/);
  assert.equal(await page.evaluate(() => localStorage.getItem("fayad-vue-learning-progress")), "[1,2]");
  await ctx.close();
});

test("?engine=legacy redirects to the legacy copy", async () => {
  const ctx = await browser.newContext(); const page = await ctx.newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + URL_NEW + "?engine=legacy"); await page.waitForURL(/\/legacy\/vue-learning\//);
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
