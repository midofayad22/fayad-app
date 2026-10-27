// Adds the design-system assets to every public page (idempotent).
import fs from "node:fs";
const pages = ["index.html","login.html","about/about.html","html-learning/html-learning.html","css-learning/css-learning.html","javascript-learning/javascript-learning.html","react-learning/react-learning.html","vue-learning/vue-learning.html","angular-learning/angular-learning.html","fundamentals/computer-basics/com.html","fundamentals/programming-basics/prg.html"];
const root = process.argv[2];
for (const rel of pages) {
  const f = `${root}/${rel}`;
  let h = fs.readFileSync(f, "utf8");
  if (h.includes("/js/prefs.js")) { console.log("skip", rel); continue; }
  h = h.replace("<!-- Site metadata (managed: canonical, icons, manifest, social, service worker) -->", `<!-- Preferences: theme / language / direction resolved before first paint (no flash) -->\n    <script src="/js/prefs.js"></script>\n\n    <!-- Site metadata (managed: canonical, icons, manifest, social, service worker) -->`);
  const fonts = h.includes("fonts.googleapis.com") ? "" : `    <link rel="preconnect" href="https://fonts.googleapis.com" />\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />\n`;
  const tail = `\n    <!-- FAYAD design system (loaded after page CSS so tokens win) -->\n${fonts}    <link rel="stylesheet" href="/css/tokens.css" />\n    <link rel="stylesheet" href="/css/theme.css" />\n    <link rel="stylesheet" href="/css/theme-overrides.css" />\n    <link rel="stylesheet" href="/css/shell.css" />\n    <script src="/js/i18n.js" defer></script>\n    <script src="/js/shell.js" defer></script>\n  </head>`;
  if (!h.includes("</head>")) throw new Error("no </head> in " + rel);
  h = h.replace("</head>", tail);
  fs.writeFileSync(f, h);
  console.log("updated", rel);
}
