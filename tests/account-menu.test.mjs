// Account menu: a real, keyboard-friendly panel with the learner's actual progress (no decorative controls).
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

const USER = { email: "learner@example.com", user_metadata: { full_name: "Mona Ali" } };
async function open({ seed = {}, lang = "en", w = 1280, user = USER, signOut } = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 } });
  await ctx.addInitScript(([l, kv]) => { localStorage.setItem("fayad-language", l); for (const [k, v] of Object.entries(kv)) localStorage.setItem(k, v); }, [lang, seed]);
  const page = await ctx.newPage(); const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + "/"); await page.waitForFunction(() => window.FAYAD_ACCOUNT_MENU);
  await page.evaluate(([u, fail]) => { window.__out = 0; window.FAYAD_ACCOUNT_MENU.mount(document.getElementById("user-profile"), u, { onSignOut: async () => { window.__out++; if (fail) throw new Error("x"); } }); }, [user, !!signOut]);
  return { ctx, page, errors };
}

test("new learner: honest empty state with a way to start; links point to real pages", async () => {
  const { ctx, page } = await open();
  await page.click("#fayadUserTrigger");
  assert.equal(await page.locator("#fayadUserTrigger").getAttribute("aria-expanded"), "true");
  assert.match(await page.locator("#fayadMenuProgress").innerText(), /0 of 271 lessons/);
  assert.match(await page.locator("#fayadMenuProgress").innerText(), /haven't started a lesson yet/);
  assert.match(await page.locator("#fayadMenuProgress .am-next").getAttribute("href"), /computer-basics\/com\.html$/);
  assert.equal(await page.locator('.am-items a[href="/dashboard.html"]').count(), 1);
  assert.equal(await page.locator('.am-items a[href="/profile.html"]').count(), 1);
  for (const href of ["/dashboard.html", "/profile.html"]) assert.equal((await page.request.get(base + href)).status(), 200);
  assert.match(await page.locator(".am-who").innerText(), /Mona Ali[\s\S]*learner@example\.com/);
  await ctx.close();
});

test("with real saved progress: counts, points and the course to continue come from the learner's data", async () => {
  const { ctx, page } = await open({ seed: { "fayad-html-progress": JSON.stringify([1, 2, 3]) } });
  await page.click("#fayadUserTrigger");
  const txt = await page.locator("#fayadMenuProgress").innerText();
  assert.match(txt, /3 of 271 lessons/); assert.match(txt, /30 points/);
  assert.equal(await page.locator("#fayadMenuProgress .am-bar").getAttribute("aria-valuenow"), "1");
  assert.match(await page.locator(".am-next").innerText(), /HTML[\s\S]*3 of 30 lessons/);
  assert.match(await page.locator(".am-next").getAttribute("href"), /html-learning/);
  await ctx.close();
});

test("keyboard: ArrowDown opens and focuses the first item, arrows move, Escape closes and returns focus", async () => {
  const { ctx, page } = await open();
  await page.focus("#fayadUserTrigger"); await page.keyboard.press("ArrowDown");
  assert.equal(await page.evaluate(() => document.activeElement.className.includes("am-next")), true);
  await page.keyboard.press("ArrowDown"); await page.keyboard.press("ArrowDown");
  assert.equal(await page.evaluate(() => document.activeElement.getAttribute("href")), "/profile.html");
  await page.keyboard.press("End"); assert.equal(await page.evaluate(() => document.activeElement.id), "fayadLogoutButton");
  await page.keyboard.press("Escape");
  assert.equal(await page.locator("#fayadUserTrigger").getAttribute("aria-expanded"), "false");
  assert.equal(await page.evaluate(() => document.activeElement.id), "fayadUserTrigger");
  await page.waitForFunction(() => document.getElementById("fayadUserDropdown").hidden);
  await ctx.close();
});

test("clicking outside closes the panel; sign out calls the handler and reports failure", async () => {
  let { ctx, page } = await open();
  await page.click("#fayadUserTrigger"); await page.mouse.click(5, 400);
  assert.equal(await page.locator("#fayadUserTrigger").getAttribute("aria-expanded"), "false");
  await ctx.close();
  ({ ctx, page } = await open({ signOut: "fail" }));
  await page.click("#fayadUserTrigger"); await page.click("#fayadLogoutButton");
  await page.waitForSelector(".am-err");
  assert.equal(await page.evaluate(() => window.__out), 1);
  assert.equal(await page.locator("#fayadLogoutButton").isEnabled(), true);
  assert.equal(await page.locator(".am-err").getAttribute("role"), "alert");
  await ctx.close();
});

test("user-controlled text is never interpreted as HTML", async () => {
  const evil = { email: "<img src=x onerror=window.__pwn=1>@a.b", user_metadata: { full_name: "<img src=x onerror=window.__pwn=1>", avatar_url: "javascript:alert(1)" } };
  const { ctx, page, errors } = await open({ user: evil });
  await page.click("#fayadUserTrigger"); await page.waitForTimeout(200);
  assert.equal(await page.evaluate(() => window.__pwn), undefined);
  assert.equal(await page.locator(".am-who img").count(), 0);
  assert.equal(await page.locator(".am-avatar img").count(), 0); // non-https avatar URLs are ignored
  assert.deepEqual(errors, []);
  await ctx.close();
});

test("Arabic: RTL labels and a panel that stays inside a 320px viewport", async () => {
  const { ctx, page } = await open({ lang: "ar", w: 320 });
  await page.click("#fayadUserTrigger");
  assert.match(await page.locator("#fayadMenuProgress").innerText(), /تقدمك/);
  const r = await page.evaluate(() => { const b = document.getElementById("fayadUserDropdown").getBoundingClientRect(); return { l: b.left, r: b.right, sw: document.documentElement.scrollWidth }; });
  assert.ok(r.l >= 0 && r.r <= 320, `panel at ${r.l}..${r.r}`); assert.ok(r.sw <= 320);
  await ctx.close();
});
