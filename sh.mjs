import { chromium } from "playwright"; import http from "http"; import { startServer } from "./tests/static-server.mjs";
const srv = await startServer(); const base=`http://127.0.0.1:${srv.address().port}`;
const [,, url, out, w="1280", h="800", sel="", theme="dark", full=""] = process.argv;
const b = await chromium.launch(); const ctx = await b.newContext({ viewport:{width:+w,height:+h}, deviceScaleFactor:1, serviceWorkers:"block" });
await ctx.addInitScript((t)=>{ if(window===window.top){ localStorage.setItem("fayad-theme",t); } }, theme);
await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, r=>r.abort());
const p = await ctx.newPage(); await p.goto(base+url); await p.waitForTimeout(1500);
if (sel) { const el = p.locator(sel).first(); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(1200); await el.screenshot({path:out}); }
else await p.screenshot({path:out, fullPage: !!full});
console.log(await p.evaluate(()=>document.documentElement.scrollWidth+" vs "+innerWidth));
await b.close(); srv.close();
