// Builds search/index.json from the REAL content: course tracks, modules, lessons (headings, terminology, body), exercises, games and pages.
// Usage: node tools/build-search-index.mjs [--check]   (--check exits 1 when the committed index is stale)
import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { withEnglish, textPaths } from "../js/engine/with-english.js";
import { GAMES_META } from "../js/game/games-meta.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "search/index.json");
export const COURSES = [
  { id: "com", path: "/fundamentals/computer-basics/com.html", title: { ar: "أساسيات الكمبيوتر", en: "Computer Basics" } },
  { id: "prg", path: "/fundamentals/programming-basics/prg.html", title: { ar: "أساسيات البرمجة", en: "Programming Basics" } },
  { id: "html", path: "/html-learning/html-learning.html" }, { id: "css", path: "/css-learning/css-learning.html" },
  { id: "js", path: "/javascript-learning/javascript-learning.html" }, { id: "ajs", path: "/advanced-javascript/advanced-javascript.html" },
  { id: "bs", path: "/bootstrap-learning/bootstrap-learning.html" }, { id: "tw", path: "/tailwind-learning/tailwind-learning.html" },
  { id: "react", path: "/react-learning/react-learning.html" }, { id: "vue", path: "/vue-learning/vue-learning.html" }, { id: "angular", path: "/angular-learning/angular-learning.html" },
];
const PAGES = [
  { id: "page-home", href: "/index.html", title: { ar: "الرئيسية", en: "Home" }, desc: { ar: "المسارات والألعاب وكيف تتعلم على FAYBIT.", en: "Courses, games and how learning works on FAYBIT." } },
  { id: "page-dashboard", href: "/dashboard.html", title: { ar: "لوحة التقدم", en: "Progress dashboard" }, desc: { ar: "دروسك ونقاطك وإنجازاتك.", en: "Your lessons, points and achievements." } },
  { id: "page-profile", href: "/profile.html", title: { ar: "الملف الشخصي", en: "Profile" }, desc: { ar: "الحساب والبيانات على هذا الجهاز.", en: "Your account and data on this device." } },
  { id: "page-settings", href: "/settings/index.html", title: { ar: "الإعدادات", en: "Settings" }, desc: { ar: "المظهر واللغة والتعلّم والإشعارات والأمان وإمكانية الوصول.", en: "Appearance, language, learning, notifications, security and accessibility." } },
  { id: "page-appearance", href: "/settings/appearance.html", title: { ar: "إعدادات المظهر", en: "Appearance settings" }, desc: { ar: "الوضع الفاتح والداكن وحجم الخط.", en: "Light and dark mode and text size." } },
  { id: "page-language", href: "/settings/language.html", title: { ar: "إعدادات اللغة", en: "Language settings" }, desc: { ar: "لغة الواجهة ولغة شرح الدروس.", en: "Interface language and lesson explanation language." } },
  { id: "page-learning", href: "/settings/learning.html", title: { ar: "إعدادات التعلّم", en: "Learning settings" }, desc: { ar: "تفضيلات الدروس والتمارين.", en: "Lesson and exercise preferences." } },
  { id: "page-notifications", href: "/settings/notifications.html", title: { ar: "إعدادات الإشعارات", en: "Notification settings" }, desc: { ar: "اختر الإشعارات التي تصلك.", en: "Choose which notifications you get." } },
  { id: "page-security", href: "/settings/security.html", title: { ar: "الأمان وكلمة المرور", en: "Security and password" }, desc: { ar: "كلمة المرور وحذف الحساب.", en: "Password and account deletion." } },
  { id: "page-accessibility", href: "/settings/accessibility.html", title: { ar: "إمكانية الوصول", en: "Accessibility" }, desc: { ar: "تقليل الحركة والتباين وحجم النص.", en: "Reduced motion, contrast and text size." } },
  { id: "page-games", href: "/play/index.html", title: { ar: "مركز الألعاب", en: "Games hub" }, desc: { ar: "تعلّم باللعب: ألغاز قصيرة بمراحل متدرجة.", en: "Learn by playing: short puzzles with growing levels." } },
  { id: "page-about", href: "/about/about.html", title: { ar: "عن المنصة", en: "About FAYBIT" }, desc: { ar: "قصة المنصة وصاحبها.", en: "The story behind the platform." } },
];

const ENT = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&nbsp;": " " };
const plain = (h) => String(h).replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (m) => ENT[m]).replace(/\s+/g, " ").trim();
const clip = (s, n) => (s.length <= n ? s : s.slice(0, n).replace(/\s\S*$/, "") + "…");
const matches = (h, re) => [...String(h).matchAll(re)].map((m) => plain(m[1])).filter(Boolean);
const uniq = (a) => [...new Set(a)];

async function loadTrack(id) {
  const m = await import(pathToFileURL(path.join(ROOT, `content/${id}/index.js`)).href);
  const track = m.track, lessons = m.lessons;
  const enFile = path.join(ROOT, `content/${id}/en.js`);
  if (fs.existsSync(enFile)) withEnglish(track, lessons, (await import(pathToFileURL(enFile).href)).EN);
  return { track, lessons, deep: id === "prg" ? (await import(pathToFileURL(path.join(ROOT, "content/prg/deep.js")).href)).DEEP : null };
}

/** all text of a lesson in one language, split into headings / terms / body */
function lessonText(l, lang, extra) {
  const heads = [], terms = [], body = [];
  for (const [p, node] of [...textPaths({ ...l, ...(extra ? { deep: extra } : {}) }, "L")]) {
    if (/\.(quiz|quizMore)\./.test(p) && /\.options\./.test(p)) continue; // wrong answers would only add noise
    const raw = node[lang] ?? (lang === "ar" ? node.ar : ""); if (!raw) continue;
    if (/\.sections\.\d+\.title$/.test(p)) heads.push(plain(raw));
    if (/<\w+/.test(raw)) {
      heads.push(...matches(raw, /<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>/gi));
      terms.push(...matches(raw, /<(?:code|dfn)[^>]*>([\s\S]*?)<\/(?:code|dfn)>/gi), ...matches(raw, /<strong[^>]*>([\s\S]*?)<\/strong>/gi));
      body.push(plain(raw));
    } else if (!/\.(title|heading|kicker)$/.test(p) || /\.sections\./.test(p)) body.push(raw);
  }
  const good = (t) => t.length >= 2 && t.length <= 32 && t.split(" ").length <= 4;
  return { heads: uniq(heads).join(" · "), terms: uniq(terms.filter(good)).slice(0, 18).join(" · "), body: clip(body.join(" "), 420) };
}
const pair = (fn) => ({ ar: fn("ar"), en: fn("en") });
const T = (x) => (typeof x === "string" ? { ar: x } : x || {});
const unitTitle = (g) => T(g.title);

export async function buildIndex() {
  const docs = [];
  for (const c of COURSES) {
    const { track, lessons, deep } = await loadTrack(c.id);
    const title = c.title || T(track.title);
    const groups = track.modules || track.groups || [];
    // the engines address lessons by SIDEBAR position (#lesson-N follows the group order), which can differ from the authoring/array order
    const groupIds = groups.flatMap((g) => g.lessons || (g.units || []).flatMap((u) => u.lessons));
    const lessonIds = groupIds.length === lessons.length && new Set(groupIds).size === groupIds.length ? groupIds : lessons.map((l) => l.id);
    docs.push({ id: `course-${c.id}`, type: "course", track: c.id, url: c.path, title, desc: pair((l) => `${title[l]} · ${lessons.length}`), terms: { ar: groups.map((g) => unitTitle(g).ar).join(" · "), en: groups.map((g) => unitTitle(g).en || "").join(" · ") } });
    groups.forEach((g, gi) => {
      const ids = g.lessons || (g.units || []).flatMap((u) => u.lessons);
      const first = lessonIds.indexOf(ids[0]) + 1;
      docs.push({ id: `module-${g.id}`, type: "module", track: c.id, url: `${c.path}#lesson-${first}`, title: unitTitle(g), parent: title, desc: pair((l) => (l === "ar" ? `${ids.length} دروس` : `${ids.length} lessons`)), heads: pair((l) => ids.map((id) => T(lessons.find((x) => x.id === id).title)[l] || "").filter(Boolean).join(" · ")) });
    });
    lessons.forEach((l, i) => {
      const modOf = groups.find((g) => (g.lessons || (g.units || []).flatMap((u) => u.lessons)).includes(l.id));
      const dd = deep && deep[l.id] ? deep[l.id] : null;
      const tx = { ar: lessonText(l, "ar", dd), en: lessonText(l, "en", dd) };
      const pos = lessonIds.indexOf(l.id) + 1;
      const url = `${c.path}#lesson-${pos}`;
      const ltitle = T(l.title), ldesc = T(l.description || l.heading);
      docs.push({ id: l.id, type: "lesson", track: c.id, n: pos, url, title: ltitle, parent: modOf ? unitTitle(modOf) : title, desc: { ar: clip(ldesc.ar || "", 170), en: clip(ldesc.en || "", 170) }, heads: pair((x) => tx[x].heads), terms: pair((x) => tx[x].terms), body: pair((x) => tx[x].body) });
      const ex = l.practice || l.challenge || l.exercise || (dd && dd.exercise);
      if (ex) {
        const exText = {}; for (const lang of ["ar", "en"]) exText[lang] = clip(textPaths(ex, "x").map(([, n]) => n[lang] || (lang === "ar" ? n.ar : "")).filter(Boolean).map(plain).join(" "), 200);
        docs.push({ id: `${l.id}-exercise`, type: "exercise", track: c.id, n: pos, url, title: { ar: `تمرين: ${ltitle.ar}`, en: ltitle.en ? `Exercise: ${ltitle.en}` : undefined }, parent: title, desc: exText, terms: pair((x) => tx[x].terms) });
      }
    });
  }
  for (const g of GAMES_META) docs.push({ id: g.id, type: "game", track: g.track, url: g.href, title: g.title, desc: g.desc });
  for (const tr of ["html", "css", "js"]) {
    const { CHALLENGES } = await import(pathToFileURL(path.join(ROOT, `js/game/challenges/${tr}.js`)).href);
    for (const c of CHALLENGES) docs.push({ id: `game-${tr}-${c.id}`, type: "game", track: tr, url: `/play/arena.html?track=${tr}`, title: T(c.title), parent: { ar: `ساحة ${tr.toUpperCase()}`, en: `${tr.toUpperCase()} Arena` }, desc: { ar: clip(plain(T(c.brief).ar || ""), 160), en: clip(plain(T(c.brief).en || ""), 160) } });
  }
  for (const p of PAGES) docs.push({ id: p.id, type: "page", url: p.href, title: p.title, desc: p.desc });
  const clean = (o) => JSON.parse(JSON.stringify(o, (k, v) => (v === "" || v === undefined ? undefined : v)));
  const body = { docs: docs.map(clean) };
  const hash = crypto.createHash("sha1").update(JSON.stringify(body)).digest("hex").slice(0, 10);
  return { version: 1, hash, count: docs.length, ...body };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const idx = await buildIndex(), json = JSON.stringify(idx);
  if (process.argv.includes("--check")) {
    const cur = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, "utf8")).hash : null;
    if (cur !== idx.hash) { console.error(`search/index.json is stale (${cur} != ${idx.hash}); run node tools/build-search-index.mjs`); process.exit(1); }
    console.log("search index is current", idx.hash);
  } else { fs.mkdirSync(path.dirname(OUT), { recursive: true }); fs.writeFileSync(OUT, json); console.log(`wrote search/index.json: ${idx.count} docs, ${(json.length / 1024).toFixed(0)} KB`); }
}
