// Milestone 3: About page. Exact names, no invented facts, links present, bilingual.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";

const { chromium } = createRequire(import.meta.url)("playwright");
const ROOT = path.resolve(import.meta.dirname, "..");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

async function open(lang) {
  const ctx = await browser.newContext();
  await ctx.addInitScript((l) => localStorage.setItem("fayad-language", l), lang);
  const page = await ctx.newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + "/about/about.html");
  await page.waitForSelector("h1");
  return { ctx, page };
}

test("exact names: English 'Abdullhamid, Fayad' and Arabic 'عبد الحميد فياض'", async () => {
  let { ctx, page } = await open("en");
  assert.equal(await page.locator("h1").innerText(), "Abdullhamid, Fayad");
  await ctx.close();
  ({ ctx, page } = await open("ar"));
  assert.equal(await page.locator("h1").innerText(), "عبد الحميد فياض");
  await ctx.close();
});

test("About has one h1, a main landmark, and no fabricated skill percentages or timeline", async () => {
  const { ctx, page } = await open("en");
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.locator("main").count(), 1);
  const html = fs.readFileSync(path.join(ROOT, "about/about.html"), "utf8");
  assert.ok(!/skill-progress|data-width|timeline/.test(html), "unverifiable self-ratings must not return");
  await ctx.close();
});

test("About exposes no new private contact details (no phone/email)", async () => {
  const html = fs.readFileSync(path.join(ROOT, "about/about.html"), "utf8");
  assert.ok(!/tel:|mailto:|\+20|@gmail/.test(html));
});

test("About links are the previously published ones and open safely", async () => {
  const { ctx, page } = await open("en");
  const links = await page.$$eval(".ab-links a", (as) => as.map((a) => ({ href: a.href, rel: a.rel, target: a.target })));
  assert.deepEqual(links.map((l) => new URL(l.href).hostname), ["abdullhamid-fayad-portfolio.vercel.app", "github.com", "www.linkedin.com", "www.facebook.com", "www.instagram.com"]);
  for (const l of links) { assert.equal(l.target, "_blank"); assert.match(l.rel, /noopener/); }
  await ctx.close();
});

test("About shows catalog-derived numbers and no 'untranslated' notice", async () => {
  const { ctx, page } = await open("en");
  const total = await page.evaluate(() => FAYAD.catalog.totalLessons());
  assert.equal(await page.locator("[data-fact=lessons]").innerText(), String(total));
  assert.equal(await page.locator("#fy-notice").count(), 0);
  await ctx.close();
});
