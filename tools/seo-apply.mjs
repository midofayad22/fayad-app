// One-off, idempotent SEO pass (run: node tools/seo-apply.mjs). Origin migration, noindex for non-content pages,
// Open Graph/Twitter for game pages, BreadcrumbList for every indexable page, Course JSON-LD for track pages.
import fs from "node:fs"; import path from "node:path";
export const OLD = "https://fayad-learning.vercel.app", ORIGIN = "https://faybit.vercel.app";
const files = []; (function w(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (["node_modules", ".git", "legacy", "tests", "docs", "vendor"].includes(e.name)) continue; const p = path.join(d, e.name); e.isDirectory() ? w(p) : /\.(html|xml|txt|json|mjs)$/.test(e.name) && !/package(-lock)?\.json$/.test(e.name) && files.push(p); } })(".");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
const NAMES = { "html-learning": "HTML", "css-learning": "CSS", "javascript-learning": "JavaScript", "advanced-javascript": "Advanced JavaScript", "react-learning": "React", "vue-learning": "Vue", "angular-learning": "Angular", "tailwind-learning": "Tailwind CSS", "bootstrap-learning": "Bootstrap" };
let changed = 0;
for (const f of files) {
  let s = fs.readFileSync(f, "utf8"), o = s;
  if (f !== "tools/seo-apply.mjs") s = s.split(OLD).join(ORIGIN);
  if (f.endsWith(".html") && !/^(settings|legacy)\//.test(f) && f !== "offline.html") {
    const canon = (s.match(/rel="canonical" href="([^"]+)"/) || [])[1];
    const title = (s.match(/<title>([^<]*)<\/title>/) || [])[1] || "FAYBIT", desc = (s.match(/name="description" content="([^"]*)"/) || [])[1] || "";
    if (f === "login.html" && !/name="robots"/.test(s)) s = s.replace('<meta name="viewport"', '<meta name="robots" content="noindex, follow" />\n    <meta name="viewport"');
    const indexable = canon && !/name="robots" content="noindex/.test(s);
    if (canon && !/og:title/.test(s)) {
      s = s.replace(/(<link rel="canonical"[^>]*>)/, `$1\n    <meta property="og:type" content="website" />\n    <meta property="og:site_name" content="FAYBIT" />\n    <meta property="og:title" content="${title}" />\n    <meta property="og:description" content="${desc}" />\n    <meta property="og:url" content="${canon}" />\n    <meta property="og:image" content="${ORIGIN}/assets/brand/og-image.png" />\n    <meta name="twitter:card" content="summary_large_image" />`);
    }
    if (indexable && f !== "index.html" && !/id="ld-seo"/.test(s)) {
      const crumbs = [{ n: "FAYBIT", u: ORIGIN + "/" }];
      const dir = f.split("/")[0];
      if (f.startsWith("play/") && f !== "play/index.html") crumbs.push({ n: "Games", u: ORIGIN + "/play/index.html" });
      crumbs.push({ n: title.replace(/\s*[—|-]\s*FAYBIT.*$/, "").replace(/^FAYBIT\s*[—|-]\s*/, "") || title, u: canon });
      const graph = [{ "@type": "BreadcrumbList", itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.n, item: c.u })) }];
      if (NAMES[dir] && f === `${dir}/${dir}.html`) graph.push({ "@type": "Course", name: `${NAMES[dir]} — FAYBIT`, description: desc, url: canon, inLanguage: ["ar", "en"], provider: { "@type": "Organization", name: "FAYBIT", url: ORIGIN + "/" }, isAccessibleForFree: true });
      s = s.replace("</head>", `    <script type="application/ld+json" id="ld-seo">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>\n  </head>`);
    }
  }
  if (s !== o) { fs.writeFileSync(f, s); changed++; }
}
console.log("files changed:", changed);
