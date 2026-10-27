// Milestone 5 (runner): sandbox isolation + behaviour. These execute REAL code in a REAL sandboxed iframe.
import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { createRequire } from "node:module";
import { startServer } from "./static-server.mjs";

const { chromium } = createRequire(import.meta.url)("playwright");
let server, browser, base, ctx, page;
before(async () => {
  server = await startServer(); base = `http://127.0.0.1:${server.address().port}`; browser = await chromium.launch();
  ctx = await browser.newContext(); page = await ctx.newPage();
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
  await page.goto(base + "/tests/fixtures/playground-host.html");
  // a "secret" in the host page's storage that sandboxed code must never be able to read
  await page.evaluate(() => { localStorage.setItem("fayad-supabase-auth", "SECRET-SESSION"); document.cookie = "sid=SECRET-COOKIE"; });
});
after(async () => { await browser?.close(); server?.close(); });

const run = (runtime, files, extra) => page.evaluate(async ([rt, f, ex]) => {
  const pg = make(rt, ex); pg.run(f); await waitStatus(rt === "js" ? "done" : "done").catch(() => {});
  return { logs: [...logs], errors: [...errors], statuses: [...statuses] };
}, [runtime, files, extra]);

test("frame is sandboxed with allow-scripts only; never allow-same-origin", async () => {
  await page.evaluate(() => make("html").run({ html: "<p>x</p>" }));
  const sb = await page.$eval("iframe", (f) => f.getAttribute("sandbox"));
  assert.equal(sb, "allow-scripts");
  assert.ok(!/allow-same-origin|allow-top-navigation|allow-popups|allow-forms|allow-modals/.test(sb));
  const src = fs.readFileSync("js/playground/playground.js", "utf8");
  assert.ok(!/setAttribute\("sandbox",\s*"[^"]*allow-same-origin/.test(src));
});

test("html runtime renders HTML + CSS and reports console output", async () => {
  const r = await run("html", { html: "<h1 id=t>Hi</h1><script>console.log('a', {x:1}, [1,2])<\/script>", css: "#t{color:rgb(255,0,0)}" });
  assert.ok(r.logs.some((l) => l.text === 'a {x: 1} [1, 2]'), JSON.stringify(r.logs));
  const color = await page.evaluate(() => new Promise((res) => { /* read via a second run reporting computed style */
    const pg = make("html"); pg.run({ html: "<h1 id=t>Hi</h1>", css: "#t{color:rgb(255,0,0)}", js: "console.log(getComputedStyle(document.getElementById('t')).color)" });
    waitStatus("done").then(() => res(logs.map((l) => l.text).join("|"))); }));
  assert.equal(color, "rgb(255, 0, 0)");
});

test("sandboxed code cannot read the site's localStorage, cookies, parent DOM, or navigate the top page", async () => {
  const r = await run("html", { html: "", js: `
    const probe = (name, fn) => { try { const v = fn(); console.log(name + ':LEAK:' + v); } catch (e) { console.log(name + ':BLOCKED:' + e.name); } };
    probe('localStorage', () => localStorage.getItem('fayad-supabase-auth'));
    probe('cookie', () => document.cookie);
    probe('parentDom', () => parent.document.title);
    probe('topDom', () => top.document.body.innerHTML.length);
    probe('indexedDB', () => String(indexedDB.open('x')));
    try { top.location = 'https://example.com/'; console.log('topNav:attempted'); } catch (e) { console.log('topNav:BLOCKED:' + e.name); }
    console.log('origin:' + location.origin);
  ` });
  const t = r.logs.map((l) => l.text).join("\n");
  assert.ok(!/LEAK|SECRET/.test(t), t);
  assert.match(t, /localStorage:BLOCKED:SecurityError/);
  assert.match(t, /parentDom:BLOCKED/);
  assert.match(t, /origin:null/);
  assert.equal(new URL(page.url()).pathname, "/tests/fixtures/playground-host.html"); // top page never navigated
});

test("js runtime: console output, return value, errors with message", async () => {
  let r = await run("js", { js: "const a=[1,2,3]; console.log(a.map(x=>x*2)); console.warn('careful'); 1+1" });
  assert.deepEqual(r.logs.map((l) => [l.level, l.text]), [["log", "[2, 4, 6]"], ["warn", "careful"], ["result", "2"]]);
  r = await run("js", { js: "null.x" });
  assert.match(r.errors[0].message, /TypeError/);
  r = await run("js", { js: "alert('hi'); console.log(typeof document)" });
  assert.deepEqual(r.logs.map((l) => l.text), ["alert: hi", "undefined"]);
});

test("js runtime: infinite loop is terminated by the watchdog and the page stays responsive", async () => {
  const t0 = Date.now();
  const r = await page.evaluate(async () => { const pg = make("js", { timeoutMs: 600 }); pg.run({ js: "while(true){}" }); await waitStatus("timeout", 5000); return { errors: [...errors], statuses: [...statuses] }; });
  assert.ok(Date.now() - t0 < 5000);
  assert.match(r.errors[0].message, /Timed out after 600 ms/);
  assert.ok(await page.evaluate(() => 1 + 1) === 2); // main thread still alive
});

test("js runtime: worker code cannot reach site storage either", async () => {
  const r = await run("js", { js: "console.log(typeof localStorage, typeof document, typeof window); try{ console.log(typeof indexedDB) }catch(e){}" });
  assert.equal(r.logs[0].text, "undefined undefined undefined");
});

test("messages from other sources or with a wrong token are ignored", async () => {
  const n = await page.evaluate(async () => {
    const pg = make("html"); pg.run({ html: "<p>x</p>" }); await waitStatus("done");
    const before = logs.length;
    window.postMessage({ fayad: 1, token: "guess", type: "console", level: "log", text: "forged-from-parent" }, "*"); // wrong source
    await new Promise((r) => setTimeout(r, 100));
    return logs.length - before;
  });
  assert.equal(n, 0);
  const n2 = await page.evaluate(async () => { // an OLD run's frame cannot report after stop()
    const pg = make("html"); pg.run({ html: "", js: "setTimeout(()=>console.log('late'),300)" }); await waitStatus("done"); pg.stop();
    const before = logs.length; await new Promise((r) => setTimeout(r, 500)); return logs.length - before; });
  assert.equal(n2, 0);
});

test("links and forms cannot navigate the preview away; destroy() removes frame and listener", async () => {
  const r = await run("html", { html: "<a id=l href='https://example.com/x'>x</a><form id=f action='https://example.com/'><button id=b>go</button></form>",
    js: "document.getElementById('l').click(); document.getElementById('b').click();" });
  assert.ok(r.logs.some((l) => /Navigation is disabled/.test(l.text)), JSON.stringify(r.logs));
  const gone = await page.evaluate(() => { pg.destroy(); return document.querySelectorAll("iframe").length; });
  assert.equal(gone, 0);
});

test("html runtime: runaway loop in DOM-capable mode is stopped by the loop guard and the page stays responsive", async () => {
  const r = await page.evaluate(async () => { const pg = make("html", { loopBudget: 200000 }); pg.run({ html: "<p id=jsResult>x</p>", js: "while(true){}" }); await waitStatus("done", 8000); return { errors: [...errors] }; });
  assert.match(r.errors[0].message, /loop ran too many times/);
  assert.equal(await page.evaluate(() => 1 + 1), 2);
});

test("html runtime: guard does not alter normal programs; DOM text is collected back (collect)", async () => {
  const r = await page.evaluate(async () => { let dom = null; const pg = make("html", { collect: ["#jsResult", "#nope"], onDom: (v) => { dom = v; } });
    pg.run({ html: "<p id=jsResult>start</p>", js: "let s=0; for(let i=1;i<=100;i++){ s+=i } document.getElementById('jsResult').textContent='sum='+s; console.log(s)" });
    await waitStatus("done"); await new Promise((r) => setTimeout(r, 50)); return { dom, logs: [...logs] }; });
  assert.deepEqual(r.dom, { "#jsResult": "sum=5050", "#nope": null });
  assert.equal(r.logs[0].text, "5050");
});

test("console flood is capped (a loop that logs forever cannot flood the page)", async () => {
  const r = await page.evaluate(async () => { const pg = make("html", { loopBudget: 100000 }); pg.run({ html: "", js: "for(let i=0;i<50000;i++){ console.log(i) }" }); await waitStatus("done", 8000); await new Promise((r) => setTimeout(r, 200)); return logs.length; });
  assert.ok(r <= 502, "kept " + r);
});

test("malformed messages (wrong shape, wrong token, non-objects) are ignored without throwing", async () => {
  const bad = await page.evaluate(async () => {
    const pg = make("html"); pg.run({ html: "<p>x</p>", js: "parent.postMessage('str','*'); parent.postMessage(null,'*'); parent.postMessage({fayad:1,token:'x',type:'console',text:'nope'},'*'); parent.postMessage({fayad:1,type:'console',text:'notoken'},'*'); parent.postMessage({type:'console'},'*')" });
    await waitStatus("done"); await new Promise((r) => setTimeout(r, 100)); return logs.length; });
  assert.equal(bad, 0);
});

test("learner output is shown as text, never rendered as HTML by the runner API", async () => {
  const r = await run("html", { html: "", js: "console.log('<img src=x onerror=alert(1)>')" });
  assert.equal(r.logs[0].text, "<img src=x onerror=alert(1)>"); // delivered verbatim as a string for textContent use
});
