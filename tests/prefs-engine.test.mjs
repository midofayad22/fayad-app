import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

async function ctxPage(path, init, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 1100, height: 800 }, serviceWorkers: "block", ...opts });
  if (init) await ctx.addInitScript(init);
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const page = await ctx.newPage(); await page.goto(base + path); await page.waitForTimeout(400); return { ctx, page };
}
const attrs = (p) => p.evaluate(() => { const r = document.documentElement; return { theme: r.dataset.theme, accent: r.dataset.accent, contrast: r.dataset.contrast, motion: r.dataset.motion, reading: r.dataset.reading, sections: r.dataset.sections, scale: r.style.getPropertyValue("--fy-scale") }; });

test("defaults: light, teal, normal contrast, comfortable reading", async () => {
  const { ctx, page } = await ctxPage("/about/about.html");
  const a = await attrs(page);
  assert.deepEqual([a.theme, a.accent, a.contrast, a.reading, a.sections, a.scale], ["light", "teal", "normal", "comfortable", "expanded", "1"]);
  await ctx.close();
});

test("set() validates, applies, persists across pages and reloads, and emits events", async () => {
  const { ctx, page } = await ctxPage("/about/about.html");
  const ev = await page.evaluate(() => new Promise((res) => { addEventListener("fayad:prefschange", (e) => res(e.detail.changed), { once: true }); FAYAD.prefs.set({ accent: "violet", fontScale: 120, contrast: "high", reading: "compact", sections: "collapsed", themeMode: "dark" }); }));
  assert.ok(ev.includes("accent") && ev.includes("themeMode"));
  let a = await attrs(page);
  assert.deepEqual([a.theme, a.accent, a.contrast, a.reading, a.sections, a.scale], ["dark", "violet", "high", "compact", "collapsed", "1.2"]);
  await page.evaluate(() => FAYAD.prefs.set({ accent: "javascript", fontScale: 500, editorSize: "x" })); // invalid values fall back
  a = await attrs(page); assert.equal(a.accent, "teal"); assert.equal(a.scale, "1");
  await page.evaluate(() => FAYAD.prefs.set({ accent: "rose", fontScale: 110 }));
  await page.goto(base + "/"); await page.waitForTimeout(300);          // another page, same storage
  a = await attrs(page); assert.equal(a.accent, "rose"); assert.equal(a.scale, "1.1");
  assert.equal(await page.evaluate(() => localStorage.getItem("fayad-theme")), "dark"); // legacy mirror
  await ctx.close();
});

test("font size really scales page content", async () => {
  const { ctx, page } = await ctxPage("/about/about.html");
  const w0 = await page.evaluate(() => document.querySelector("main").getBoundingClientRect().height);
  await page.evaluate(() => FAYAD.prefs.set({ fontScale: 130 }));
  const w1 = await page.evaluate(() => document.querySelector("main").getBoundingClientRect().height);
  assert.ok(w1 > w0 * 1.1, `${w0} -> ${w1}`);
  await ctx.close();
});

test("system theme follows the OS; explicit light ignores it; reduced motion mirrors OS", async () => {
  const { ctx, page } = await ctxPage("/about/about.html", () => localStorage.setItem("fayad-prefs-v1", JSON.stringify({ themeMode: "system" })), { colorScheme: "dark", reducedMotion: "reduce" });
  let a = await attrs(page); assert.equal(a.theme, "dark"); assert.equal(a.motion, "reduce");
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "no-preference" }); await page.waitForTimeout(100);
  a = await attrs(page); assert.equal(a.theme, "light"); assert.equal(a.motion, "full");
  await page.evaluate(() => FAYAD.prefs.set({ motion: "reduce" }));
  assert.equal((await attrs(page)).motion, "reduce");
  await ctx.close();
});

test("legacy fayad-theme=dark is honoured; reset restores defaults; applyRemote does not bump timestamp", async () => {
  const { ctx, page } = await ctxPage("/about/about.html", () => { if (!localStorage.getItem("fayad-prefs-v1")) localStorage.setItem("fayad-theme", "dark"); });
  assert.equal((await attrs(page)).theme, "dark");
  await page.evaluate(() => FAYAD.prefs.applyRemote({ accent: "blue" }, 1234));
  assert.equal(await page.evaluate(() => FAYAD.prefs.all.updatedAt), 1234);
  await page.evaluate(() => FAYAD.prefs.reset());
  const a = await attrs(page); assert.deepEqual([a.theme, a.accent], ["light", "teal"]);
  await ctx.close();
});

test("high contrast gives AA+ text on both themes", async () => {
  const { ctx, page } = await ctxPage("/about/about.html");
  for (const t of ["light", "dark"]) {
    await page.evaluate((t) => FAYAD.prefs.set({ themeMode: t, contrast: "high" }), t);
    const r = await page.evaluate(() => { const cs = getComputedStyle(document.body); return [cs.color, cs.backgroundColor]; });
    const lum = (c) => { const m = c.match(/\d+/g).map(Number).map((v) => { v /= 255; return v <= .03928 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }); return .2126 * m[0] + .7152 * m[1] + .0722 * m[2]; };
    const [a, b] = [lum(r[0]), lum(r[1])].sort((x, y) => y - x); assert.ok((a + .05) / (b + .05) >= 7, `${t} ${r}`);
  }
  await ctx.close();
});
