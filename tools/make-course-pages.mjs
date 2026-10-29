// Generates the thin public course pages (same URLs as before) from the legacy pages' metadata + one shared template.
// Usage: node tools/make-course-pages.mjs html [js css react vue angular]
// The page is only a shell: the lesson UI is built by js/engine/course-view.js from /content/<id>/index.js.
import fs from "node:fs";

const PAGES = {
  js: { name: "JavaScript", dir: "javascript-learning", legacy: "legacy/javascript-learning/javascript-learning.html" },
  html: { name: "HTML", dir: "html-learning", legacy: "legacy/html-learning/html-learning.html" },
  css: { name: "CSS", dir: "css-learning", legacy: "legacy/css-learning/css-learning.html" },
  react: { name: "React", dir: "react-learning", legacy: "legacy/react-learning/react-learning.html" },
  vue: { name: "Vue.js", dir: "vue-learning", legacy: "legacy/vue-learning/vue-learning.html" },
  angular: { name: "Angular", dir: "angular-learning", legacy: "legacy/angular-learning/angular-learning.html" },
};
const meta = (src, re, what) => { const m = re.exec(src); if (!m) throw new Error("legacy page lacks " + what); return m[1]; };

for (const id of process.argv.slice(2)) {
  const cfg = PAGES[id];
  if (!cfg) throw new Error("unknown course " + id);
  const old = fs.readFileSync(cfg.legacy, "utf8");
  const title = meta(old, /<title>([^<]*)<\/title>/, "title");
  const desc = meta(old, /<meta\s+name="description"\s+content="([^"]*)"/, "description");
  const ogTitle = (/<meta property="og:title" content="([^"]*)"/.exec(old) || [null, title])[1];
  const ogDesc = (/<meta property="og:description" content="([^"]*)"/.exec(old) || [null, desc])[1];
  const file = `${cfg.dir}/${cfg.dir}.html`;
  const url = `https://fayad-learning.vercel.app/${file}`;
  const page = `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Rollback: ?engine=legacy opens the previous implementation (see docs/rollback.md) -->
    <script>if(/[?&]engine=legacy\\b/.test(location.search))location.replace("/legacy/${cfg.dir}/${cfg.dir}.html"+location.hash);</script>
    <!-- Preferences: theme / language / direction resolved before first paint (no flash) -->
    <script src="/js/prefs.js"></script>

    <link rel="canonical" href="${url}" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32.png" />
    <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#0b3d35" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="FAYAD" />
    <meta property="og:locale" content="ar_AR" />
    <meta property="og:title" content="${ogTitle}" />
    <meta property="og:description" content="${ogDesc}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="https://fayad-learning.vercel.app/assets/brand/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="description" content="${desc}" />
    <title>${title}</title>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/css/tokens.css" />
    <link rel="stylesheet" href="/css/course.css" />
    <link rel="stylesheet" href="/css/shell.css" />

    <script src="/js/sw-register.js" defer></script>
    <script src="/js/i18n.js" defer></script>
    <script src="/js/shell.js" defer></script>
    <script>window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };</script>
    <script defer src="/_vercel/speed-insights/script.js"></script>
  </head>

  <body>
    <header class="learning-navbar">
      <a href="/index.html" class="learning-logo" aria-label="FAYAD">F</a>
      <div class="learning-title"><span>FAYAD</span><h1 class="path-title" id="pathTitle">مسار تعلم ${cfg.name}</h1></div>
      <div class="learning-actions"><a href="/index.html" class="back-btn" data-s="nav.back"></a></div>
    </header>

    <!-- The lesson UI is built by the shared engine from /content/${id}/index.js -->
    <main class="learning-layout" id="courseRoot"></main>
    <noscript><p style="padding:24px">JavaScript is required to run the lessons / يلزم تفعيل JavaScript لعرض الدروس.</p></noscript>

    <script type="module" src="/js/engine/boot.js" data-track="${id}"></script>
  </body>
</html>
`;
  fs.writeFileSync(file, page);
  console.log("wrote", file);
}
