// Regenerates sitemap.xml from the pages that declare a canonical and are not noindex. lastmod = last git commit touching the file.
import fs from "node:fs"; import path from "node:path"; import { execSync } from "node:child_process";
const ORIGIN = "https://faybit.vercel.app";
const pages = []; (function w(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (["node_modules", ".git", "legacy", "tests", "docs", "vendor", "tools"].includes(e.name)) continue; const p = path.join(d, e.name); e.isDirectory() ? w(p) : e.name.endsWith(".html") && pages.push(p); } })(".");
const rows = [];
for (const f of pages) {
  const s = fs.readFileSync(f, "utf8"); const c = (s.match(/rel="canonical" href="([^"]+)"/) || [])[1];
  if (!c || /name="robots" content="noindex/.test(s)) continue;
  if (c !== ORIGIN + "/" + f.replace(/^\.\//, "").replace(/^index\.html$/, "")) continue;   // only self-canonical pages
  let d = ""; try { d = execSync(`git log -1 --format=%cs -- "${f}"`, { encoding: "utf8" }).trim(); } catch {}
  const depth = f.replace(/^\.\//, "").split("/").length;
  rows.push({ loc: c, d, pr: c === ORIGIN + "/" ? "1.0" : /learning|fundamentals|advanced/.test(c) ? "0.8" : "0.6" });
}
rows.sort((a, b) => a.loc.localeCompare(b.loc));
fs.writeFileSync("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.map((r) => `  <url>\n    <loc>${r.loc}</loc>${r.d ? `\n    <lastmod>${r.d}</lastmod>` : ""}\n    <priority>${r.pr}</priority>\n  </url>`).join("\n")}\n</urlset>\n`);
console.log(rows.length, "urls");
