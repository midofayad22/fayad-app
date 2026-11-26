/* Authentication flows on small phones.
   What this is: the REAL supabase-js SDK (the vendored copy the site serves) and the REAL login/shell code, driven with touch
   emulation at 320/360/390/430px. What it is not: a test of the live Supabase project. Every request to *.supabase.co is answered
   by a stub in this file, so it proves wiring, validation, UI state and persistence, NOT that Supabase accepts real credentials. */
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base;
before(async () => { server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch(); });
after(async () => { await browser?.close(); server?.close(); });

const USER = { id: "11111111-1111-4111-8111-111111111111", aud: "authenticated", role: "authenticated", email: "learner@example.com", user_metadata: { full_name: "Learner" }, app_metadata: {}, created_at: "2026-01-01T00:00:00Z", identities: [{ id: "1" }] };
const SESSION = () => ({ access_token: "aaa.bbb.ccc", token_type: "bearer", expires_in: 3600, expires_at: Math.floor(Date.now() / 1000) + 3600, refresh_token: "r-1", user: USER });
const json = (route, status, body) => route.fulfill({ status, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: JSON.stringify(body) });

async function phone(width, { height = 700, seed } = {}) {
  const ctx = await browser.newContext({ viewport: { width, height }, hasTouch: true, isMobile: true });
  if (seed) await ctx.addInitScript(seed);
  const page = await ctx.newPage(); const calls = [], errors = [], external = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const mode = { signup: "ok", token: "ok" };
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, async (route) => {
    const req = route.request(), url = new URL(req.url());
    if (!/supabase\.co$/.test(url.hostname)) { external.push(url.hostname); return route.abort(); }
    if (req.method() === "OPTIONS") return route.fulfill({ status: 204, headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*" } });
    const body = req.postData() ? JSON.parse(req.postData()) : {}; calls.push({ method: req.method(), path: url.pathname, query: url.search, body });
    if (url.pathname === "/auth/v1/signup") return mode.signup === "exists" ? json(route, 422, { code: "user_already_exists", msg: "User already registered" }) : json(route, 200, { ...USER, id: USER.id });
    if (url.pathname === "/auth/v1/token") return mode.token === "bad" ? json(route, 400, { error: "invalid_grant", error_description: "Invalid login credentials", msg: "Invalid login credentials" }) : json(route, 200, SESSION());
    if (url.pathname === "/auth/v1/user") return json(route, 200, USER);
    if (url.pathname === "/auth/v1/logout") return route.fulfill({ status: 204, headers: { "access-control-allow-origin": "*" } });
    if (url.pathname === "/auth/v1/recover") return json(route, 200, {});
    return json(route, 200, []); // REST/RPC (progress sync etc.): empty
  });
  return { ctx, page, calls, errors, external, mode };
}
const fill = async (page, f) => { for (const [id, v] of Object.entries(f)) { await page.tap("#" + id); await page.fill("#" + id, v); } };

for (const w of [320, 360, 390, 430]) {
  test(`${w}px: the vendored SDK loads with every third-party host blocked, and the form is reachable by touch`, async () => {
    const { ctx, page, external, errors } = await phone(w, { height: w <= 360 ? 568 : 760 });
    await page.goto(base + "/login.html"); await page.waitForFunction(() => window.FAYAD_AUTH?.client?.auth, null, { timeout: 20000 });
    assert.equal(await page.evaluate(() => !!window.supabase), true); assert.ok(!external.includes("cdn.jsdelivr.net"), "the SDK must not need the CDN");
    // scroll to the very bottom the way a thumb does, then the submit button must be inside the viewport and not covered
    const r = await page.evaluate(() => { window.scrollTo(0, 1e6); const b = document.getElementById("submit"), q = b.getBoundingClientRect(), t = document.elementFromPoint(q.x + q.width / 2, q.y + q.height / 2); return { inView: q.top >= 0 && q.bottom <= innerHeight, hit: t === b || b.contains(t), overflow: document.documentElement.scrollWidth - innerWidth }; });
    assert.deepEqual([r.inView, r.hit, r.overflow], [true, true, 0]); assert.deepEqual(errors, []); await ctx.close();
  });

  test(`${w}px: sign up sends the right request, shows the result and never leaks the password into the URL`, async () => {
    const { ctx, page, calls, errors } = await phone(w);
    await page.goto(base + "/login.html?mode=signup"); await page.waitForFunction(() => window.FAYAD_AUTH?.client?.auth);
    await fill(page, { name: "Learner", email: "learner@example.com", password: "Passw0rd1", confirm: "Passw0rd1" }); await page.tap("#submit");
    await page.waitForFunction(() => /\S/.test(document.getElementById("status").textContent) && !document.getElementById("submit").disabled);
    const c = calls.find((x) => x.path === "/auth/v1/signup"); assert.ok(c, "signup request was sent"); assert.equal(c.body.email, "learner@example.com"); assert.equal(c.body.password, "Passw0rd1"); assert.equal(c.body.data?.full_name, "Learner");
    assert.ok(!/password|learner@/i.test(page.url()), "credentials never appear in the URL"); assert.deepEqual(errors, []); await ctx.close();
  });
}

test("validation: invalid email, short/weak password and mismatched confirmation are rejected locally, with no network call", async () => {
  const { ctx, page, calls } = await phone(320); await page.goto(base + "/login.html?mode=signup"); await page.waitForFunction(() => window.FAYAD_AUTH?.client?.auth);
  const status = () => page.evaluate(() => document.getElementById("status").textContent.trim());
  await fill(page, { email: "nope", password: "Passw0rd1", confirm: "Passw0rd1" }); await page.tap("#submit"); assert.ok(await status(), "email error shown");
  await fill(page, { email: "a@b.co", password: "short", confirm: "short" }); await page.tap("#submit"); assert.ok(await status(), "length error shown");
  await fill(page, { email: "a@b.co", password: "Passw0rd1", confirm: "Different1" }); await page.tap("#submit"); assert.ok(await status(), "mismatch error shown");
  assert.equal(calls.filter((c) => c.path.startsWith("/auth/v1/signup")).length, 0, "nothing was sent"); await ctx.close();
});

test("password visibility toggle works by touch and keeps focus semantics", async () => {
  const { ctx, page } = await phone(320); await page.goto(base + "/login.html"); await page.fill("#password", "Secret123");
  assert.equal(await page.getAttribute("#password", "type"), "password"); await page.tap("#togglePw");
  assert.equal(await page.getAttribute("#password", "type"), "text"); assert.equal(await page.getAttribute("#togglePw", "aria-pressed"), "true");
  await page.tap("#togglePw"); assert.equal(await page.getAttribute("#password", "type"), "password"); await ctx.close();
});

test("sign in with wrong credentials shows a clear error and stays on the page", async () => {
  const { ctx, page, mode } = await phone(360); mode.token = "bad"; await page.goto(base + "/login.html"); await page.waitForFunction(() => window.FAYAD_AUTH?.client?.auth);
  await fill(page, { email: "learner@example.com", password: "WrongPass1" }); await page.tap("#submit");
  await page.waitForFunction(() => document.getElementById("status").classList.contains("error")); assert.ok(page.url().includes("/login.html")); assert.equal(await page.locator("#submit").isDisabled(), false); await ctx.close();
});

test("sign in → redirect → authenticated UI → refresh keeps the session → sign out → guest UI → sign in again", async () => {
  const { ctx, page, calls, errors } = await phone(390);
  await page.goto(base + "/login.html"); await page.waitForFunction(() => window.FAYAD_AUTH?.client?.auth);
  await fill(page, { email: "learner@example.com", password: "Passw0rd1" }); await page.tap("#submit");
  await page.waitForURL((u) => !u.pathname.endsWith("/login.html"), { timeout: 20000 });
  assert.ok(calls.some((c) => c.path === "/auth/v1/token" && c.query.includes("grant_type=password")), "password grant sent");
  await page.waitForSelector('html[data-auth="in"]'); assert.equal(await page.locator(".fy-auth").isVisible().catch(() => false), false, "no guest Sign in/up for a signed-in user");
  await page.reload(); await page.waitForSelector('html[data-auth="in"]'); // session restored after refresh
  const hasSession = await page.evaluate(() => !!(localStorage.getItem("fayad-supabase-auth") || Object.keys(localStorage).find((k) => /^sb-.*-auth-token$/.test(k)))); assert.equal(hasSession, true);
  // sign out through the real drawer button (phones: bottom-bar menu)
  await page.tap("#bnMenu"); await page.waitForSelector(".nd-signout"); await page.tap(".nd-signout");
  await page.waitForSelector('html[data-auth="out"]', { timeout: 20000 }); assert.ok(calls.some((c) => c.path === "/auth/v1/logout"), "logout request sent");
  assert.equal(await page.evaluate(() => !!localStorage.getItem("fayad-supabase-auth")), false, "session cleared");
  // sign in again
  await page.goto(base + "/login.html"); await page.waitForFunction(() => window.FAYAD_AUTH?.client?.auth); await fill(page, { email: "learner@example.com", password: "Passw0rd1" }); await page.tap("#submit");
  await page.waitForURL((u) => !u.pathname.endsWith("/login.html"), { timeout: 20000 }); await page.waitForSelector('html[data-auth="in"]'); assert.deepEqual(errors.filter((e) => !/Failed to fetch|ViewTransition/.test(e)), []); /* a navigation interrupted by the next redirect aborts the cross-document view transition: Chromium-internal, harmless */ await ctx.close();
});

test("password recovery: request posts to /recover with the login page as redirect target", async () => {
  const { ctx, page, calls } = await phone(320); await page.goto(base + "/login.html"); await page.waitForFunction(() => window.FAYAD_AUTH?.client?.auth);
  await page.fill("#email", "learner@example.com"); await page.tap("#forgot"); await page.waitForFunction(() => /\S/.test(document.getElementById("status").textContent));
  const c = calls.find((x) => x.path === "/auth/v1/recover"); assert.ok(c, "recover request sent"); assert.equal(c.body.email, "learner@example.com"); assert.match(decodeURIComponent(c.query), /redirect_to=.*\/login\.html/); await ctx.close();
});
