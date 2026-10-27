// Dev tool: renders every page in 4 theme/lang combos and builds contact sheets.  node tools/screenshots.mjs <outDir> [width] [height]
import { createRequire } from "node:module";
import fs from "node:fs";
import { startServer } from "../tests/static-server.mjs";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const PAGES = { home: "/", login: "/login.html", about: "/about/about.html", html: "/html-learning/html-learning.html", css: "/css-learning/css-learning.html", js: "/javascript-learning/javascript-learning.html", react: "/react-learning/react-learning.html", vue: "/vue-learning/vue-learning.html", angular: "/angular-learning/angular-learning.html", com: "/fundamentals/computer-basics/com.html", prg: "/fundamentals/programming-basics/prg.html" };
const out = process.argv[2], W = +process.argv[3] || 1280, H = +process.argv[4] || 800, only = process.argv[5];
fs.mkdirSync(out, { recursive: true });
const server = await startServer(); const base = `http://127.0.0.1:${server.address().port}`;
const b = await chromium.launch();
for (const [name, path] of Object.entries(PAGES)) {
  if (only && only !== name) continue;
  for (const theme of ["light", "dark"]) for (const lang of ["ar", "en"]) {
    const ctx = await b.newContext({ viewport: { width: W, height: H } });
    await ctx.addInitScript(([t, l]) => { localStorage.setItem("fayad-theme", t); localStorage.setItem("fayad-language", l); }, [theme, lang]);
    const p = await ctx.newPage();
    await p.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
    await p.goto(base + path, { waitUntil: "load" }).catch(() => {});
    await p.waitForTimeout(1800);
    await p.screenshot({ path: `${out}/${name}-${theme}-${lang}.png` });
    await ctx.close();
  }
}
await b.close(); server.close();
