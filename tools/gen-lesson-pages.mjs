// Generates static, independently indexable lesson pages (AR + EN, hreflang-linked) from the REAL rendered lesson UI,
// so the JSON content source (content/<track>/index.js + en.js), lesson IDs and the three lesson layouts stay the single source of truth.
// Output: <course dir>/lessons/<lessonId>.html, en/<course dir>/lessons/<lessonId>.html and a lessons index per course/language.
// Run: node tools/gen-lesson-pages.mjs [trackId ...]   (no args = all tracks)
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module";
import { startServer } from "../tests/static-server.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");
const ORIGIN = "https://faybit.vercel.app";
const MIN_WORDS = 80;   // lesson prose (code and quiz review excluded); below this a lesson page is thin: it is still generated (linked, useful) but noindex + out of the sitemap until the content is enriched
export const COURSES = {
  html: { dir: "html-learning", page: "html-learning.html" }, css: { dir: "css-learning", page: "css-learning.html" },
  js: { dir: "javascript-learning", page: "javascript-learning.html" }, react: { dir: "react-learning", page: "react-learning.html" },
  vue: { dir: "vue-learning", page: "vue-learning.html" }, angular: { dir: "angular-learning", page: "angular-learning.html" },
  ajs: { dir: "advanced-javascript", page: "advanced-javascript.html" }, bs: { dir: "bootstrap-learning", page: "bootstrap-learning.html" },
  tw: { dir: "tailwind-learning", page: "tailwind-learning.html" },
  com: { dir: "fundamentals/computer-basics", page: "com.html" }, prg: { dir: "fundamentals/programming-basics", page: "prg.html" },
};
const UI = {
  ar: { lang: "ar", dir: "rtl", lesson: "الدرس", of: "من", open: "افتح الدرس التفاعلي (محرر + اختبار + تتبّع التقدم)", openHint: "يعمل التمرين والاختبار وحفظ التقدم في الصفحة التفاعلية.", prev: "الدرس السابق", next: "الدرس التالي", all: "كل دروس المسار", home: "FAYBIT", course: "المسار", switch: "English", index: "الدروس", skip: "تخطي إلى المحتوى", suffix: "FAYBIT" },
  en: { lang: "en", dir: "ltr", lesson: "Lesson", of: "of", open: "Open the interactive lesson (editor + quiz + progress)", openHint: "The exercise, quiz and progress tracking run on the interactive page.", prev: "Previous lesson", next: "Next lesson", all: "All lessons in this course", home: "FAYBIT", course: "Course", switch: "العربية", index: "Lessons", skip: "Skip to content", suffix: "FAYBIT" },
};
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const strip = (h) => h.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const urlOf = (id, lang, lessonId) => `${ORIGIN}${lang === "en" ? "/en" : ""}/${COURSES[id].dir}/lessons/${lessonId ? lessonId + ".html" : "index.html"}`;
const fileOf = (u) => u.replace(ORIGIN + "/", "");

const REMOVE = ".progress-area,.lesson-navigation,.lesson-actions,.knowledge-check,.copy-btn,.code-ex-copy,textarea,.editor-layout,.practice-actions,.playground-section,.lesson-status,.lesson-icon,.key-icon,button,script,style,i.fa-solid,i.fa-regular,.lesson-top,#lessonHeader,.preview-panel,#jsResultStage,#resultCard .result-header,.example-header button,.challenge-box,.check-card,.quiz-actions,.answer-options,.answer-feedback,.quiz-progress,.hint-box,.fd-qmeta,.explain-extra,.sb-panel,aside";
async function extract(page) {
  return page.evaluate((REMOVE) => {
    const root = document.querySelector("section.lesson-content, section.lesson-area"); if (!root) return null;
    const get = (s) => (document.querySelector(s)?.textContent || "").trim();
    const title = get("#lessonTitle") || get("#lesson-title"); const desc = get("#lessonDescription"); const num = get("#lessonNumber") || get("#lesson-counter"); const kicker = get("#lessonKicker") || get("#lesson-level");
    const c = root.cloneNode(true);
    c.querySelectorAll(REMOVE).forEach((n) => n.remove()); c.querySelectorAll("[hidden]").forEach((n) => n.remove()); c.querySelectorAll("[data-s]").forEach((n) => n.removeAttribute("data-s")); c.querySelectorAll("div:empty").forEach((n) => n.remove()); c.querySelectorAll(".result-static h1,.result-static h2,.result-static h3,.result-static h4,.result-static h5,.result-static h6").forEach((h) => { const d = document.createElement("div"); d.className = "lp-demo-" + h.tagName.toLowerCase(); d.innerHTML = h.innerHTML; h.replaceWith(d); }); c.querySelectorAll(".result-card").forEach((n) => { if (!n.querySelector(".result-static")) n.remove(); });
    c.querySelectorAll("[id]").forEach((n) => n.removeAttribute("id")); c.querySelectorAll("[onclick],[data-s],[data-s-attr]").forEach((n) => { n.removeAttribute("onclick"); n.removeAttribute("data-s-attr"); });
    c.querySelectorAll("*").forEach((n) => { for (const a of [...n.attributes]) if (/^on/i.test(a.name)) n.removeAttribute(a.name); });
    return { title, desc, num, kicker, html: c.innerHTML.replace(/\n\s+/g, "\n").trim() };
  }, REMOVE);
}

const txt = (v, lang) => (v && typeof v === "object" ? v[lang] ?? v.ar ?? "" : v ?? "");
const QUIZ = { ar: { h: "اختبر نفسك", show: "الإجابة والشرح", correct: "الإجابة الصحيحة" }, en: { h: "Test yourself", show: "Answer and explanation", correct: "Correct answer" } };
function quizHtml(lesson, lang) {
  const qs = [...(lesson.quiz || []), ...(lesson.quizMore || [])].filter((q) => q && q.options && q.options.length);
  if (!qs.length) return "";
  return `<section class="lp-quiz"><h2>${QUIZ[lang].h}</h2><ol>${qs.map((q) => `<li><p><strong>${esc(txt(q.question, lang))}</strong></p><ul>${q.options.map((o) => `<li>${esc(txt(o, lang))}</li>`).join("")}</ul><details><summary>${QUIZ[lang].show}</summary><p>${QUIZ[lang].correct}: <strong>${esc(txt(q.options[q.correct], lang))}</strong></p>${q.explain ? `<p>${esc(txt(q.explain, lang))}</p>` : ""}</details></li>`).join("")}</ol></section>`;
}
function pageHtml({ id, course, lang, lesson, i, ids, titles, alt, thin }) {
  const t = UI[lang], n = ids.length, url = urlOf(id, lang, lesson.id), altUrl = urlOf(id, alt, lesson.id);
  const title = `${lesson.title} — ${course.name[lang]} | ${t.suffix}`;
  let desc = lesson.desc || strip(lesson.html.replace(/<h[1-6][^>]*>.*?<\/h[1-6]>/g, "")).slice(0, 160);
  if (desc.length > 158) desc = desc.slice(0, 155).replace(/\s+\S*$/, "") + "…";
  if (desc.length < 50) desc = `${lesson.title}: ${desc} — ${course.name[lang]}.`.trim();
    const interactive = `/${COURSES[id].dir}/${COURSES[id].page}#lesson-${i + 1}`;
  const prev = i > 0 ? ids[i - 1] : null, next = i < n - 1 ? ids[i + 1] : null;
  const ld = { "@context": "https://schema.org", "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "FAYBIT", item: ORIGIN + "/" }, { "@type": "ListItem", position: 2, name: course.name[lang], item: urlOf(id, lang) }, { "@type": "ListItem", position: 3, name: lesson.title, item: url }] },
    { "@type": "LearningResource", name: lesson.title, description: desc, url, inLanguage: lang, learningResourceType: "lesson", isAccessibleForFree: true, isPartOf: { "@type": "Course", name: `${course.name[lang]} — FAYBIT`, url: `${ORIGIN}/${COURSES[id].dir}/${COURSES[id].page}`, provider: { "@type": "Organization", name: "FAYBIT", url: ORIGIN + "/" } } },
  ] };
  return `<!doctype html>
<html lang="${t.lang}" dir="${t.dir}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="fayad-content" content="${id}" />
    ${thin ? '<meta name="robots" content="noindex, follow" />\n    ' : ""}<title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="${t.lang}" href="${url}" />
    <link rel="alternate" hreflang="${alt}" href="${altUrl}" />
    <link rel="alternate" hreflang="x-default" href="${lang === "ar" ? url : altUrl}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="FAYBIT" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${ORIGIN}/assets/brand/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="theme-color" content="#0D9488" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="icon" type="image/svg+xml" href="/assets/images/favicon.svg" />
    <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
    <link rel="manifest" href="/manifest.json" />
    <script>try{var m=localStorage.getItem("fayad-theme");document.documentElement.setAttribute("data-theme",m==="dark"||m==="light"?m:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"))}catch(e){}</script>
    <link rel="stylesheet" href="/css/tokens.css" />
    <link rel="stylesheet" href="/css/course.css" />
    <link rel="stylesheet" href="/css/docs.css" />
    <link rel="stylesheet" href="/css/lesson-doc.css" />
    <link rel="stylesheet" href="/css/lesson-page.css" />
    <script type="application/ld+json" id="ld-seo">${JSON.stringify(ld)}</script>
  </head>
  <body class="lp">
    <a class="lp-skip" href="#main">${t.skip}</a>
    <header class="lp-top">
      <a class="lp-brand" href="/index.html" aria-label="FAYBIT"><img src="/assets/brand/logo-mark.svg" alt="" width="28" height="28" /><span>FAYBIT</span></a>
      <nav class="lp-nav" aria-label="${esc(course.name[lang])}"><a href="${fileOf(urlOf(id, lang)).replace(/^/, "/")}">${t.index}</a><a href="${fileOf(altUrl).replace(/^/, "/")}" hreflang="${alt}" lang="${alt}">${t.switch}</a></nav>
    </header>
    <main id="main" class="lp-main">
      <nav class="lp-crumbs" aria-label="breadcrumb"><a href="/index.html">FAYBIT</a> <span aria-hidden="true">/</span> <a href="/${lang === "en" ? "en/" : ""}${COURSES[id].dir}/lessons/index.html">${esc(course.name[lang])}</a></nav>
      <p class="lp-eyebrow">${t.lesson} ${i + 1} ${t.of} ${n}${lesson.kicker ? " · " + esc(lesson.kicker) : ""}</p>
      <h1 class="lp-h1">${esc(lesson.title)}</h1>
      ${lesson.desc ? `<p class="lp-lead">${esc(lesson.desc)}</p>` : ""}
      <p class="lp-cta"><a class="lp-btn" href="${interactive}">${t.open}</a><small>${t.openHint}</small></p>
      <div class="lp-body lesson-content">
${lesson.html}
${lesson.quiz}
      </div>
      <p class="lp-cta"><a class="lp-btn" href="${interactive}">${t.open}</a></p>
      <nav class="lp-pager" aria-label="${t.all}">
        ${prev ? `<a rel="prev" href="/${lang === "en" ? "en/" : ""}${COURSES[id].dir}/lessons/${prev}.html"><small>${t.prev}</small><strong>${esc(titles[prev])}</strong></a>` : "<span></span>"}
        ${next ? `<a rel="next" href="/${lang === "en" ? "en/" : ""}${COURSES[id].dir}/lessons/${next}.html"><small>${t.next}</small><strong>${esc(titles[next])}</strong></a>` : "<span></span>"}
      </nav>
      <p class="lp-all"><a href="/${lang === "en" ? "en/" : ""}${COURSES[id].dir}/lessons/index.html">${t.all}</a></p>
    </main>
  </body>
</html>
`;
}
function indexHtml({ id, course, lang, ids, titles, alt }) {
  const t = UI[lang], url = urlOf(id, lang), altUrl = urlOf(id, alt);
  const title = `${course.name[lang]}: ${lang === "ar" ? "فهرس الدروس" : "all lessons"} | ${t.suffix}`;
  const desc = lang === "ar" ? `قائمة كل دروس ${course.name.ar} في FAYBIT (${ids.length} درسًا) بروابط مباشرة لكل درس.` : `All ${ids.length} ${course.name.en} lessons on FAYBIT with a direct link to each one.`;
  const ld = { "@context": "https://schema.org", "@graph": [{ "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "FAYBIT", item: ORIGIN + "/" }, { "@type": "ListItem", position: 2, name: course.name[lang], item: url }] }, { "@type": "ItemList", itemListElement: ids.map((l, i) => ({ "@type": "ListItem", position: i + 1, name: titles[l], url: urlOf(id, lang, l) })) }] };
  return `<!doctype html>
<html lang="${t.lang}" dir="${t.dir}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <meta name="fayad-content" content="${id}" />
    <title>${esc(title)}</title>
    <meta name="description" content="${esc(desc)}" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="${t.lang}" href="${url}" />
    <link rel="alternate" hreflang="${alt}" href="${altUrl}" />
    <link rel="alternate" hreflang="x-default" href="${lang === "ar" ? url : altUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="FAYBIT" />
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(desc)}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${ORIGIN}/assets/brand/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="theme-color" content="#0D9488" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="manifest" href="/manifest.json" />
    <script>try{var m=localStorage.getItem("fayad-theme");document.documentElement.setAttribute("data-theme",m==="dark"||m==="light"?m:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"))}catch(e){}</script>
    <link rel="stylesheet" href="/css/tokens.css" />
    <link rel="stylesheet" href="/css/lesson-page.css" />
    <script type="application/ld+json" id="ld-seo">${JSON.stringify(ld)}</script>
  </head>
  <body class="lp">
    <a class="lp-skip" href="#main">${t.skip}</a>
    <header class="lp-top"><a class="lp-brand" href="/index.html" aria-label="FAYBIT"><img src="/assets/brand/logo-mark.svg" alt="" width="28" height="28" /><span>FAYBIT</span></a><nav class="lp-nav"><a href="${fileOf(altUrl).replace(/^/, "/")}" hreflang="${alt}" lang="${alt}">${t.switch}</a></nav></header>
    <main id="main" class="lp-main">
      <h1 class="lp-h1">${esc(course.name[lang])} — ${lang === "ar" ? "فهرس الدروس" : "lessons"}</h1>
      <p class="lp-lead">${esc(desc)}</p>
      <p class="lp-cta"><a class="lp-btn" href="/${COURSES[id].dir}/${COURSES[id].page}">${lang === "ar" ? "ابدأ المسار التفاعلي" : "Start the interactive course"}</a></p>
      <ol class="lp-list">
${ids.map((l) => `        <li><a href="/${lang === "en" ? "en/" : ""}${COURSES[id].dir}/lessons/${l}.html">${esc(titles[l])}</a></li>`).join("\n")}
      </ol>
    </main>
  </body>
</html>
`;
}

const want = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(COURSES);
const server = await startServer(); const base = `http://127.0.0.1:${server.address().port}`; const browser = await chromium.launch();
let total = 0;
for (const id of want) {
  const meta = await import(`../content/${id}/index.js`); const ids = meta.lessons.map((l) => l.id);
  const NAMES = { com: { ar: "أساسيات الكمبيوتر", en: "Computer Basics" }, prg: { ar: "أساسيات البرمجة", en: "Programming Basics" }, ajs: { ar: "JavaScript المتقدم", en: "Advanced JavaScript" } };
  const course = { name: NAMES[id] || { ar: meta.track.title?.ar || id, en: meta.track.title?.en || meta.track.title?.ar || id } };
  const data = { ar: {}, en: {} };
  for (const lang of ["ar", "en"]) {
    const ctx = await browser.newContext({ serviceWorkers: "block", viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" });
    await ctx.addInitScript((l) => { try { localStorage.setItem("fayad-language", l); } catch {} }, lang);
    const page = await ctx.newPage(); await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
    const url = (n) => `${base}/${COURSES[id].dir}/${COURSES[id].page}#lesson-${n}`;
    await page.goto(url(1)); await page.waitForSelector("html[data-engine=ready]");
    for (let i = 0; i < ids.length; i++) {
      if (i > 0) { const before = await page.evaluate(() => (document.querySelector("#lessonTitle,#lesson-title")?.textContent || "") + (document.querySelector("#lessonNumber,#lesson-counter")?.textContent || "")); await page.evaluate((h) => { location.hash = h; }, `#lesson-${i + 1}`);
        try { await page.waitForFunction((b) => ((document.querySelector("#lessonTitle,#lesson-title")?.textContent || "") + (document.querySelector("#lessonNumber,#lesson-counter")?.textContent || "")) !== b, before, { timeout: 2500 }); } catch { await page.goto(url(i + 1)); await page.reload(); await page.waitForSelector("html[data-engine=ready]"); } }
      const x = await extract(page); if (!x || !x.title) throw new Error(`${id} ${lang} ${ids[i]}: nothing extracted`);
      data[lang][ids[i]] = x;
    }
    await ctx.close();
  }
  for (const lang of ["ar", "en"]) {
    const alt = lang === "ar" ? "en" : "ar"; const titles = Object.fromEntries(ids.map((l) => [l, data[lang][l].title]));
    ids.forEach((lid, i) => {
      const f = fileOf(urlOf(id, lang, lid)); fs.mkdirSync(path.dirname(f), { recursive: true });
      fs.writeFileSync(f, pageHtml({ id, course, lang, lesson: { id: lid, title: data[lang][lid].title, desc: data[lang][lid].desc, kicker: lang === "en" && /^[A-Z ]+$/.test(data[lang][lid].kicker) ? data[lang][lid].kicker : "", html: data[lang][lid].html, quiz: quizHtml(meta.lessons[i], lang) }, i, ids, titles, alt, thin: Math.min(...["ar", "en"].map((L) => strip(data[L][lid].html.replace(/<pre[\s\S]*?<\/pre>/g, " ")).split(" ").length)) < MIN_WORDS })); total++;
    });
    fs.writeFileSync(fileOf(urlOf(id, lang)), indexHtml({ id, course, lang, ids, titles, alt })); total++;
  }
  console.log(id, ids.length, "lessons");
}
await browser.close(); server.close(); console.log("pages written:", total);
