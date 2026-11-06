// Sign-in / sign-up page with a mocked auth client: validation, registration edge cases, reset and recovery flows.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

async function open({ lang = "ar", hash = "", session = null, signUpResult, signInError } = {}) {
  const ctx = await browser.newContext({ serviceWorkers: "block" });
  await ctx.addInitScript(({ lang, session, signUpResult, signInError }) => {
    if (window !== window.top) return;
    localStorage.setItem("fayad-language", lang); window.__calls = [];
    const listeners = [];
    window.FAYAD_AUTH = { getLastUserEmail: () => null, client: { auth: {
      getSession: async () => ({ data: { session } }),
      onAuthStateChange: (cb) => { listeners.push(cb); return { data: { subscription: { unsubscribe() {} } } }; },
      signInWithPassword: async (a) => { window.__calls.push(["signIn", a]); return signInError ? { data: {}, error: { message: signInError } } : { data: { user: { id: "u" }, session: {} }, error: null }; },
      signUp: async (a) => { window.__calls.push(["signUp", a]); return { data: signUpResult || { user: { id: "u", identities: [{}] }, session: null }, error: null }; },
      resetPasswordForEmail: async (e, o) => { window.__calls.push(["reset", e, o]); return { error: null }; },
      updateUser: async (a) => { window.__calls.push(["update", a]); return { error: null }; },
    } } };
    window.__fire = (ev) => listeners.forEach((cb) => cb(ev));
  }, { lang, session, signUpResult, signInError });
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const page = await ctx.newPage(); await page.goto(base + "/login.html" + hash); await page.waitForTimeout(400); return { ctx, page };
}
const status = (p) => p.locator("#status").innerText();

test("sign in: client-side validation, then a single signInWithPassword call", async () => {
  const { ctx, page } = await open({ lang: "en" });
  await page.click("#submit"); assert.match(await status(page), /valid email/i);
  await page.fill("#email", "a@b.co"); await page.click("#submit"); assert.match(await status(page), /Enter your password/i);
  await page.fill("#password", "x"); await page.click("#submit");
  await page.waitForFunction(() => window.__calls.length === 1);
  assert.deepEqual(await page.evaluate(() => window.__calls[0]), ["signIn", { email: "a@b.co", password: "x" }]);
  await ctx.close();
});

test("sign in: wrong credentials show a translated message and re-enable the form", async () => {
  const { ctx, page } = await open({ lang: "en", signInError: "Invalid login credentials" });
  await page.fill("#email", "a@b.co"); await page.fill("#password", "whatever1"); await page.click("#submit");
  await page.waitForFunction(() => document.getElementById("status").classList.contains("error"));
  assert.equal(await status(page), "Incorrect email or password."); assert.equal(await page.locator("#submit").isDisabled(), false);
  await ctx.close();
});

test("sign up: weak / mismatched passwords are rejected before any request; valid data sends the display name", async () => {
  const { ctx, page } = await open({ lang: "en" });
  await page.click("#tabUp");
  await page.fill("#email", "new@user.co"); await page.fill("#password", "short"); await page.click("#submit");
  assert.match(await status(page), /8 characters/); assert.equal(await page.evaluate(() => window.__calls.length), 0);
  await page.fill("#password", "onlyletters"); await page.click("#submit"); assert.match(await status(page), /letter and one number/);
  await page.fill("#password", "abcdefg1"); await page.fill("#confirm", "abcdefg2"); await page.click("#submit"); assert.match(await status(page), /do not match/);
  await page.fill("#confirm", "abcdefg1"); await page.fill("#name", "Sara"); await page.click("#submit");
  await page.waitForFunction(() => window.__calls.length === 1);
  const c = await page.evaluate(() => window.__calls[0]);
  assert.equal(c[0], "signUp"); assert.deepEqual(c[1].options.data, { full_name: "Sara" });
  assert.match(await status(page), /confirmation email/i);
  await ctx.close();
});

test("sign up with an already-registered email (no identities returned) is reported, not shown as success", async () => {
  const { ctx, page } = await open({ lang: "en", signUpResult: { user: { id: "u", identities: [] }, session: null } });
  await page.click("#tabUp"); await page.fill("#email", "old@user.co"); await page.fill("#password", "abcdefg1"); await page.fill("#confirm", "abcdefg1"); await page.click("#submit");
  await page.waitForFunction(() => document.getElementById("status").classList.contains("error"));
  assert.match(await status(page), /already registered/i);
  await ctx.close();
});

test("forgot password sends a reset email to this origin; recovery link shows the new-password form", async () => {
  const { ctx, page } = await open({ lang: "en" });
  await page.fill("#email", "a@b.co"); await page.click("#forgot");
  await page.waitForFunction(() => window.__calls.length === 1);
  const c = await page.evaluate(() => window.__calls[0]); assert.equal(c[0], "reset"); assert.match(c[2].redirectTo, /\/login\.html$/);
  await page.evaluate(() => window.__fire("PASSWORD_RECOVERY"));
  assert.equal(await page.locator("#resetForm").isVisible(), true); assert.equal(await page.locator("#authForm").isVisible(), false);
  await page.fill("#newPw", "abcdefg1"); await page.fill("#newPw2", "abcdefg1"); await page.click("#resetForm button[type=submit]");
  await page.waitForFunction(() => window.__calls.some((x) => x[0] === "update"));
  await ctx.close();
});

test("an existing session redirects away from the page", async () => {
  const { ctx, page } = await open({ session: { user: { id: "u" } } });
  await page.waitForURL(/index\.html/, { timeout: 5000 });
  await ctx.close();
});
