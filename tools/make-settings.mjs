// Generates settings/*.html from one template (static site, no build step: the generated files are committed).
import { writeFileSync, mkdirSync } from "node:fs";
const PAGES = { index: "الإعدادات", profile: "الحساب والملف الشخصي", appearance: "المظهر", language: "اللغة والمنطقة", learning: "تفضيلات التعلّم", notifications: "الإشعارات", security: "الخصوصية والأمان", accessibility: "إمكانية الوصول" };
const only = process.argv.slice(2);
mkdirSync("settings", { recursive: true });
for (const [id, title] of Object.entries(PAGES)) {
  if (only.length && !only.includes(id)) continue;
  writeFileSync(`settings/${id}.html`, `<!doctype html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <script src="/js/prefs.js"></script>
    <meta name="robots" content="noindex" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg" />
    <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#0D9488" />
    <title>${title} — FAYBIT</title>
    <script src="/js/sw-register.js" defer></script>
    <link rel="stylesheet" href="/css/tokens.css" />
    <link rel="stylesheet" href="/css/theme.css" />
    <link rel="stylesheet" href="/css/shell.css" />
    <link rel="stylesheet" href="/css/settings.css" />
    <script src="/js/i18n.js" defer></script>
    <script src="/js/shell.js" defer></script>
    <script type="module" src="/js/settings/${id}.js"></script>
  </head>
  <body class="st-body">
    <div class="st-top"><a class="st-brand" href="/index.html" aria-label="FAYBIT"><img src="/assets/brand/faybit-mark.svg" alt="" width="32" height="32" /><span>FAYBIT</span></a></div>
    <main class="st-wrap" id="stRoot"></main>
    <noscript><p style="padding:24px">JavaScript is required / يلزم تفعيل JavaScript.</p></noscript>
  </body>
</html>
`);
}
