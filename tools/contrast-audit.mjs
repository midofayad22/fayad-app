// Contrast audit: for each page/theme/lang, composites each text element's colour over its effective background
// and reports offenders.  node tools/contrast-audit.mjs [theme] [pageName] [--json]
import { createRequire } from "node:module";
import { startServer } from "../tests/static-server.mjs";
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
export const PAGES = { home: "/", login: "/login.html", about: "/about/about.html", html: "/html-learning/html-learning.html", css: "/css-learning/css-learning.html", js: "/javascript-learning/javascript-learning.html", react: "/react-learning/react-learning.html", vue: "/vue-learning/vue-learning.html", angular: "/angular-learning/angular-learning.html", com: "/fundamentals/computer-basics/com.html", prg: "/fundamentals/programming-basics/prg.html" };

export async function audit(page) {
  return page.evaluate(() => {
    const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] }; };
    const over = (top, bot) => { const a = top.a + bot.a * (1 - top.a); return a === 0 ? { r: 0, g: 0, b: 0, a: 0 } : { r: (top.r * top.a + bot.r * bot.a * (1 - top.a)) / a, g: (top.g * top.a + bot.g * bot.a * (1 - top.a)) / a, b: (top.b * top.a + bot.b * bot.a * (1 - top.a)) / a, a }; };
    const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
    const root = parse(getComputedStyle(document.documentElement).backgroundColor) || { r: 255, g: 255, b: 255, a: 1 };
    const sel = (el) => el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") + [...el.classList].slice(0, 2).map((c) => "." + c).join("");
    const out = new Map();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) {
      if (!n.textContent.trim()) continue;
      const el = n.parentElement; if (!el || ["SCRIPT", "STYLE", "NOSCRIPT"].includes(el.tagName)) continue;
      const cs = getComputedStyle(el); if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity === 0) continue;
      const rect = el.getBoundingClientRect(); if (rect.width === 0 || rect.height === 0) continue;
      if (cs.webkitTextFillColor === "rgba(0, 0, 0, 0)" || cs.webkitTextFillColor === "transparent") continue; // gradient text
      if (el.closest("button:disabled,[disabled],[aria-disabled='true']")) continue; // disabled controls are exempt (WCAG 1.4.3)
      let hidden = false; for (let e = el; e && e !== document.body; e = e.parentElement) { const s = getComputedStyle(e); if (s.display === "none" || s.visibility === "hidden" || +s.opacity === 0) { hidden = true; break; } } if (hidden) continue;
      // effective background: composite ancestors (stop at opaque). Gradients/images -> flagged as unknown.
      let layers = [], unknown = false;
      for (let e = el; e; e = e.parentElement) {
        const s = getComputedStyle(e);
        // gradient background: approximate with the average of its colour stops
        if (/gradient/.test(s.backgroundImage)) {
          const stops = (s.backgroundImage.match(/rgba?\([^)]*\)/g) || []).map(parse).filter(Boolean);
          const visible = stops.filter((c) => c.a > 0);
          if (visible.length) {
            const wsum = visible.reduce((x, c) => x + c.a, 0);
            const avg = { r: visible.reduce((x, c) => x + c.r * c.a, 0) / wsum, g: visible.reduce((x, c) => x + c.g * c.a, 0) / wsum, b: visible.reduce((x, c) => x + c.b * c.a, 0) / wsum, a: wsum / stops.length };
            layers.push(avg); if (avg.a >= 0.99) break;
          } else unknown = true;
        }
        const c = parse(s.backgroundColor); if (c && c.a > 0) { layers.push(c); if (c.a >= 0.99) break; }
      }
      let bg = layers.length && layers[layers.length - 1].a >= 0.99 ? layers.pop() : root;
      while (layers.length) bg = over(layers.pop(), bg);
      let fg = parse(cs.color); if (!fg) continue; fg = over({ ...fg, a: fg.a * 1 }, bg);
      const size = parseFloat(cs.fontSize), bold = +cs.fontWeight >= 700;
      const large = size >= 24 || (size >= 18.66 && bold);
      const r = ratio(fg, bg), need = large ? 3 : 4.5;
      if (r < need) { const key = sel(el) + "|" + cs.color + "|" + `rgb(${bg.r | 0},${bg.g | 0},${bg.b | 0})`; const o = out.get(key) || { sel: sel(el), color: cs.color, bg: `rgb(${bg.r | 0},${bg.g | 0},${bg.b | 0})`, ratio: r, need, count: 0, grad: unknown, sample: n.textContent.trim().slice(0, 30) }; o.count++; out.set(key, o); }
    }
    return [...out.values()].sort((a, b) => b.count - a.count);
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const theme = process.argv[2] || "light", only = process.argv[3] && !process.argv[3].startsWith("--") ? process.argv[3] : null;
  const server = await startServer(); const base = `http://127.0.0.1:${server.address().port}`;
  const b = await chromium.launch(); let total = 0;
  for (const [name, path] of Object.entries(PAGES)) {
    if (only && only !== name) continue;
    const ctx = await b.newContext({ viewport: { width: 1280, height: 800 } });
    await ctx.addInitScript((t) => { localStorage.setItem("fayad-theme", t); localStorage.setItem("fayad-language", "ar"); }, theme);
    const p = await ctx.newPage(); await p.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
    await p.goto(base + path, { waitUntil: "load" }).catch(() => {}); await p.waitForTimeout(400);
    const res = await audit(p); total += res.length;
    console.log(`\n## ${name} [${theme}] — ${res.length} offending styles`);
    for (const o of res.slice(0, +process.env.TOP || 12)) console.log(`  ${o.ratio.toFixed(2)}<${o.need} x${o.count} ${o.sel}  ${o.color} on ${o.bg}${o.grad ? " (gradient)" : ""}  "${o.sample}"`);
    await ctx.close();
  }
  await b.close(); server.close(); console.log("\nTOTAL offending style groups:", total);
}
