import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { computeStats, POINTS } from "../js/engine/stats.js";
import { createProgress } from "../js/engine/progress.js";
const { chromium } = createRequire(import.meta.url)("playwright");

let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

const TRACKS = [{ id: "js", total: 25 }, { id: "html", total: 30 }];
const mem = () => { const m = new Map(); return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k) }; };

test("stats: a new learner has zeros and no achievements", () => {
  const s = computeStats(createProgress({ totals: { js: 25, html: 30 }, storage: mem() }).snapshot(), TRACKS);
  assert.equal(s.points, 0); assert.equal(s.totals.completed, 0); assert.equal(s.totals.accuracy, null);
  assert.ok(s.achievements.every((a) => !a.earned)); assert.equal(s.lastActivityAt, null);
});

test("stats: points and achievements derive from real records only", () => {
  const p = createProgress({ totals: { js: 25, html: 30 }, storage: mem(), now: () => 1700000000000 });
  for (let i = 1; i <= 10; i++) p.markCompleted("js", `js-${String(i).padStart(2, "0")}`);
  p.recordAnswer("js", "js-01", 0, true); p.recordAnswer("js", "js-01", 1, false); p.recordAnswer("js", "js-01", 1, true);
  p.recordAssessment("html", 80, true);
  const s = computeStats(p.snapshot(), TRACKS);
  assert.equal(s.totals.completed, 10);
  assert.equal(s.totals.quizAttempts, 3); assert.equal(s.totals.quizCorrect, 2); assert.equal(s.totals.accuracy, 67);
  assert.equal(s.points, 10 * POINTS.lesson + 2 * POINTS.correctAnswer + POINTS.assessmentPassed);
  const earned = s.achievements.filter((a) => a.earned).map((a) => a.id);
  assert.deepEqual(earned.sort(), ["assessment", "first-lesson", "ten-lessons"]);
  assert.equal(s.perTrack.find((t) => t.id === "html").assessment.bestPct, 80);
});

test("assessment: best score is never lowered, pass state sticks, bad input rejected", () => {
  const p = createProgress({ totals: { html: 30 }, storage: mem() });
  p.recordAssessment("html", 90, true); p.recordAssessment("html", 40, false);
  assert.deepEqual({ ...p.assessment("html"), lastAt: 0 }, { attempts: 2, bestPct: 90, lastPct: 40, passed: true, lastAt: 0 });
  assert.throws(() => p.recordAssessment("html", 101, true)); assert.throws(() => p.recordAssessment("nope", 50, true));
});

async function open(route, lang, seed) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 800 } });
  await ctx.addInitScript(([l, s]) => { if (window === window.top) { localStorage.setItem("fayad-language", l); if (s && !localStorage.getItem("fayad-progress-v1")) localStorage.setItem("fayad-progress-v1", s); } }, [lang, seed || null]);
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const page = await ctx.newPage(); const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base + route); await page.waitForSelector(route.includes("dashboard") ? "#dStats .ac-stat" : "#pSummary .ac-stat");
  return { ctx, page, errors };
}

test("dashboard: empty state for a new learner (ar + en)", async () => {
  for (const lang of ["ar", "en"]) {
    const { ctx, page, errors } = await open("/dashboard.html", lang);
    assert.equal(await page.locator("#dEmpty").isVisible(), true);
    assert.equal(await page.locator("#dTracks .ac-track").count(), 11);
    assert.equal(await page.locator(".ac-ach-item.is-earned").count(), 0);
    assert.equal(await page.locator("h1").count(), 1);
    assert.deepEqual(errors, []);
    await ctx.close();
  }
});

test("dashboard: shows real completion, quiz and assessment data", async () => {
  const seed = JSON.stringify({ v: 1, tracks: { js: { completed: ["js-01", "js-02", "js-03"], current: "js-04", quiz: { "js-01": { passed: [0], attempts: 2, lastAt: 1 } }, updatedAt: 5 }, prg: { completed: [], current: null, quiz: {}, updatedAt: 1, assessment: { attempts: 1, bestPct: 75, lastPct: 75, passed: true, lastAt: 2 } } }, imported: {} });
  const { ctx, page } = await open("/dashboard.html", "en", seed);
  assert.equal(await page.locator("#dEmpty").isVisible(), false);
  const js = page.locator('.ac-track[data-course="js"]');
  assert.match(await js.innerText(), /3 of 25 lessons/); assert.match(await js.innerText(), /1 correct \/ 2 attempts/);
  assert.equal(await js.locator('[role="progressbar"]').getAttribute("aria-valuenow"), "12");
  assert.match(await page.locator('.ac-track[data-course="prg"]').innerText(), /best 75%.*Passed/);
  assert.equal(await page.locator('.ac-ach-item.is-earned[data-id="first-lesson"]').count(), 1);
  // 3 lessons*10 + 1 answer*2 + 1 passed assessment*25
  assert.match(await page.locator("#dStats .ac-stat").first().innerText(), /^57\b/);
  await ctx.close();
});

test("profile: signed-out state, export and reset clear every track including legacy keys", async () => {
  const seed = JSON.stringify({ v: 1, tracks: { js: { completed: ["js-01"], current: null, quiz: {}, updatedAt: 1 } }, imported: {} });
  const { ctx, page } = await open("/profile.html", "en", seed);
  await page.waitForSelector("#pAccount .ac-btn-primary");
  assert.equal(await page.locator("#pAccount a.ac-btn-primary").getAttribute("href"), "/login.html");
  const [dl] = await Promise.all([page.waitForEvent("download"), page.click("#pExport")]);
  assert.equal(dl.suggestedFilename(), "fayad-progress.json");
  page.once("dialog", (d) => d.accept());
  await page.click("#pReset");
  await page.waitForFunction(() => document.getElementById("pMsg").textContent.length > 0);
  const left = await page.evaluate(() => ({ v1: JSON.parse(localStorage.getItem("fayad-progress-v1")), legacy: localStorage.getItem("fayad-js-completed-lessons") }));
  assert.deepEqual(Object.keys(left.v1.tracks), []); assert.equal(left.legacy, null);
  await ctx.close();
});
