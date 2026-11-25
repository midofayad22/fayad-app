// Regenerates sitemap.xml from the pages that declare a canonical and are not noindex. lastmod = last git commit touching the file.
import fs from "node:fs"; import path from "node:path"; import { execSync } from "node:child_process";
const ORIGIN = "https://faybit.vercel.app";
const pages = []; (function w(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (["node_modules", ".git", "legacy", "tests", "docs", "vendor", "tools"].includes(e.name)) continue; const p = path.join(d, e.name); e.isDirectory() ? w(p) : e.name.endsWith(".html") && pages.push(p); } })(".");
const rows = [], dates = new Map();
for (const f of pages) {
  const s = fs.readFileSync(f, "utf8"); const c = (s.match(/rel="canonical" href="([^"]+)"/) || [])[1];
  if (!c || /name="robots" content="noindex/.test(s)) continue;
  if (c !== ORIGIN + "/" + f.replace(/^\.\//, "").replace(/^index\.html$/, "")) continue;   // only self-canonical pages
  const src = (s.match(/name="fayad-content" content="([a-z]+)"/) || [])[1]; const key = src ? `content/${src}` : f;
  let d = dates.get(key); if (d === undefined) { try { d = execSync(`git log -1 --format=%cs -- "${key}"`, { encoding: "utf8" }).trim(); } catch { d = ""; } dates.set(key, d); }
  const alts = [...s.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => ({ l: m[1], h: m[2] }));
  const depth = f.replace(/^\.\//, "").split("/").length;
  rows.push({ loc: c, d, alts, pr: c === ORIGIN + "/" ? "1.0" : /\/lessons\/index\.html$/.test(c) ? "0.7" : /\/lessons\//.test(c) ? "0.5" : /learning|fundamentals|advanced/.test(c) ? "0.8" : "0.6" });
}
rows.sort((a, b) => a.loc.localeCompare(b.loc));
fs.writeFileSync("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${rows.map((r) => `  <url>\n    <loc>${r.loc}</loc>${r.d ? `\n    <lastmod>${r.d}</lastmod>` : ""}${r.alts.map((a) => `\n    <xhtml:link rel="alternate" hreflang="${a.l}" href="${a.h}"/>`).join("")}\n    <priority>${r.pr}</priority>\n  </url>`).join("\n")}\n</urlset>\n`);
console.log(rows.length, "urls");
