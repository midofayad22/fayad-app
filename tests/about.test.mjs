// About page: every factual claim is derived from, or checked against, the real catalog and content.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });
async function open(lang, w = 1280) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  await ctx.addInitScript((l) => localStorage.setItem("fayad-language", l), lang);
  const page = await ctx.newPage(); await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + "/about/about.html"); await page.waitForSelector("[data-course]");
  return { ctx, page };
}

test("counts and the language table come from the catalog (no stale numbers)", async () => {
  const { ctx, page } = await open("en");
  const cat = await page.evaluate(() => ({ tracks: FAYAD.catalog.tracks.map((t) => ({ id: t.id, total: t.total, en: t.en })), lessons: FAYAD.catalog.totalLessons() }));
  assert.match(await page.locator("[data-about-count]").innerText(), new RegExp(`${cat.tracks.length} courses and ${cat.lessons} lessons`));
  const rows = await page.$$eval("[data-course]", (els) => els.map((e) => ({ id: e.dataset.course, lessons: e.querySelectorAll("td")[0].textContent, pill: e.querySelector("[data-en-flag]").className })));
  assert.deepEqual(rows.map((r) => r.id), cat.tracks.map((t) => t.id));
  rows.forEach((r, i) => { assert.equal(r.lessons, String(cat.tracks[i].total)); assert.match(r.pill, new RegExp(`ab-pill-${cat.tracks[i].en}`)); });
  await ctx.close();
});

test("no false claims remain in the source (no stale totals, no 'all lessons in English')", () => {
  const html = fs.readFileSync("about/about.html", "utf8") + fs.readFileSync("about/about.js", "utf8");
  assert.ok(!/\b209\b|\b8 مسارات|8 courses|8 lessons/.test(html));
  assert.ok(!/AR · EN/.test(html));
});

test("identity facts are exactly the verified ones, in both languages", async () => {
  for (const [lang, name, edu] of [["ar", "عبد الحميد فياض", "طالب هندسة حاسبات في جامعة طنطا"], ["en", "Abdullhamid, Fayad", "Computer engineering student at Tanta University"]]) {
    const { ctx, page } = await open(lang);
    assert.equal(await page.locator("h1").innerText(), name);
    assert.equal(await page.locator(".ab-edu").innerText(), edu);
    await ctx.close();
  }
});

test("English mode explains honestly that lessons are Arabic except where listed, and nothing overflows on phones", async () => {
  const { ctx, page } = await open("en", 320);
  assert.match(await page.locator("[data-i18n='a.avail.p2']").innerText(), /Arabic for every course.*only for the courses shown below/);
  assert.equal(await page.locator("[data-en-flag='angular']").innerText(), "Available");
  assert.equal(await page.locator("[data-en-flag='react']").innerText(), "Not available yet");
  assert.ok((await page.evaluate(() => document.documentElement.scrollWidth)) <= 321);
  await ctx.close();
});
