import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
import { passwordIssue } from "../js/settings/validate.js";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

const STUB = () => {
  const db = { pw: "OldPass123", log: [], files: [{ name: "avatar-1.webp" }], removed: [] }; window.__db = db;
  window.FAYAD_AUTH = { client: { auth: {
    getUser: async () => ({ data: { user: { id: "u1", email: "a@b.co", email_confirmed_at: "2026-01-01T00:00:00Z", created_at: "2026-01-01T00:00:00Z", last_sign_in_at: "2026-11-05T10:00:00Z", app_metadata: { providers: ["email"] } } } }),
    getSession: async () => ({ data: { session: { expires_at: Math.floor(Date.now() / 1000) + 3600 } } }),
    signInWithPassword: async ({ password }) => { db.log.push("verify"); return password === db.pw ? { data: {}, error: null } : { error: { message: "Invalid login credentials" } }; },
    updateUser: async ({ password }) => { if (db.weak) return { error: { message: "Password should be at least 8 characters" } }; db.pw = password; db.log.push("update"); return { error: null }; },
    signOut: async (o) => { db.log.push("signout:" + (o?.scope || "")); return { error: null }; },
    resetPasswordForEmail: async (email, o) => { db.log.push("reset:" + email + ":" + o.redirectTo); return { error: null }; } },
    rpc: async (fn, args) => { db.log.push("rpc:" + fn + ":" + args.p_confirm); return { error: null }; },
    storage: { from: () => ({ list: async () => ({ data: db.files }), remove: async (l) => { db.removed.push(...l); return {}; } }) } } };
};
async function open(lang = "en") {
  const ctx = await browser.newContext({ viewport: { width: 1100, height: 1000 }, serviceWorkers: "block" });
  await ctx.addInitScript((l) => { if (!localStorage.getItem("fayad-language")) localStorage.setItem("fayad-language", l); }, lang);
  await ctx.addInitScript(STUB);
  await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  const page = await ctx.newPage(); await page.goto(base + "/settings/security.html"); await page.waitForSelector("#pwCur"); return { ctx, page };
}
const log = (p) => p.evaluate(() => __db.log);
const err = (p) => p.locator(".st-status[data-kind=err]").first().innerText();

test("password rules", () => { assert.equal(passwordIssue(""), "empty"); assert.equal(passwordIssue("abc12"), "len"); assert.equal(passwordIssue("abcdefgh"), "weak"); assert.equal(passwordIssue("12345678"), "weak"); assert.equal(passwordIssue("abcdef12"), null); });

test("change password: validation, wrong current password, success (verifies, updates, signs out others)", async () => {
  const { ctx, page } = await open();
  await page.locator("form").first().evaluate((f) => f.requestSubmit()); assert.match(await err(page), /Enter the password/);
  await page.fill("#pwCur", "OldPass123"); await page.fill("#pwNew", "short"); await page.fill("#pwConf", "short"); await page.locator("form").first().evaluate((f) => f.requestSubmit()); assert.match(await err(page), /at least 8/);
  await page.fill("#pwNew", "NewPass456"); await page.fill("#pwConf", "Different1"); await page.locator("form").first().evaluate((f) => f.requestSubmit()); assert.match(await err(page), /do not match/);
  assert.deepEqual(await log(page), []);                                                    // nothing sent for invalid input
  await page.fill("#pwCur", "WrongPass1"); await page.fill("#pwConf", "NewPass456"); await page.locator("form").first().evaluate((f) => f.requestSubmit()); await page.waitForTimeout(150);
  assert.match(await err(page), /current password is incorrect/); assert.equal(await page.evaluate(() => __db.pw), "OldPass123");
  await page.fill("#pwCur", "OldPass123"); await page.locator("form").first().evaluate((f) => f.requestSubmit()); await page.waitForTimeout(200);
  assert.match(await page.locator(".st-status[data-kind=ok]").first().innerText(), /password was changed/);
  assert.equal(await page.evaluate(() => __db.pw), "NewPass456"); assert.ok((await log(page)).includes("signout:others"));
  assert.equal(await page.inputValue("#pwNew"), "");                                         // fields cleared
  await ctx.close();
});
test("recovery email uses the platform login page as redirect", async () => {
  const { ctx, page } = await open();
  await page.getByRole("button", { name: "Send reset link" }).click(); await page.waitForTimeout(150);
  assert.ok((await log(page)).some((l) => l === `reset:a@b.co:${base}/login.html`)); assert.match(await page.locator(".st-status[data-kind=ok]").first().innerText(), /reset link/);
  await ctx.close();
});
test("sessions and account info", async () => {
  const { ctx, page } = await open();
  assert.match(await page.locator(".st-facts").innerText(), /a@b\.co[\s\S]*Confirmed[\s\S]*Email and password/);
  await page.getByRole("button", { name: "Sign out of other devices" }).click(); await page.waitForTimeout(150);
  assert.ok((await log(page)).includes("signout:others")); assert.match(await page.locator(".st-status[data-kind=ok]").last().innerText(), /other devices/);
  await ctx.close();
});
test("account deletion needs password + exact phrase + confirmation; then removes avatar files and calls the RPC", async () => {
  const { ctx, page } = await open();
  const del = () => page.locator("form").nth(1).evaluate((f) => f.requestSubmit());
  page.on("dialog", (d) => d.accept());
  await del(); assert.match(await err(page), /Enter the password/);
  await page.fill("#delPw", "OldPass123"); await page.fill("#delPhrase", "delete"); await del(); assert.match(await page.locator("form").nth(1).locator(".st-status[data-kind=err]").innerText(), /exactly/);
  assert.equal((await log(page)).some((l) => l.startsWith("rpc:")), false);
  await page.fill("#delPhrase", "DELETE MY ACCOUNT"); await page.fill("#delPw", "bad"); await del(); await page.waitForTimeout(150);
  assert.equal((await log(page)).some((l) => l.startsWith("rpc:")), false);                  // wrong password: nothing deleted
  await page.fill("#delPw", "OldPass123"); await del(); await page.waitForTimeout(300);
  assert.ok((await log(page)).includes("rpc:delete_my_account:DELETE MY ACCOUNT")); assert.deepEqual(await page.evaluate(() => __db.removed), ["u1/avatar-1.webp"]);
  await ctx.close();
});
test("signed-out visitors get a sign-in prompt, no controls", async () => {
  const ctx = await browser.newContext({ serviceWorkers: "block" }); const page = await ctx.newPage(); await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + "/settings/security.html"); await page.waitForSelector(".st-nav"); assert.equal(await page.locator("#pwCur").count(), 0); assert.ok(await page.locator('a[href="/login.html"]').count() >= 1); await ctx.close();
});
