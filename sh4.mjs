import { chromium } from "playwright"; import { startServer } from "./tests/static-server.mjs";
const srv = await startServer(); const base=`http://127.0.0.1:${srv.address().port}`; const [,,out,w,h]=process.argv;
const b = await chromium.launch(); const ctx = await b.newContext({ viewport:{width:+w,height:+h}, serviceWorkers:"block" });
await ctx.route(/^https?:\/\/(?!127\.0\.0\.1)/, r=>r.abort());
const p = await ctx.newPage(); await p.goto(base+"/about/about.html"); await p.waitForTimeout(800); await p.click(".fy-btn-menu"); await p.waitForTimeout(600); await p.screenshot({path:out}); await b.close(); srv.close();
