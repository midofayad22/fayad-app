// ONE-TIME mechanical conversion: legacy CSS course -> shared lesson schema (Milestone 4g).
// Evaluates the REAL legacy page (frozen copy in /legacy/css-learning/). Writes tests/fixtures/legacy-css.json and content/css/index.js.
// The legacy page is bilingual (titleAr/title, descriptionAr/description, questionAr/question, answersAr/answers): both languages are kept
// as { ar, en }. The static cards (What is CSS / key idea / syntax) were repeated on every lesson; they now live once, in the lessons they teach (1 and 2).
// No text is rewritten, summarised, translated or omitted. Unknown legacy fields abort the run.
import fs from "node:fs";
import { createRequire } from "node:module";
import { startServer } from "../tests/static-server.mjs";
import { ser } from "./lib/serialize.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");

const server = await startServer();
const browser = await chromium.launch();
const page = await browser.newPage();
await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
await page.goto(`http://127.0.0.1:${server.address().port}/legacy/css-learning/css-learning.html`);
await page.waitForTimeout(800);
const legacy = await page.evaluate(() => ({
  lessons: JSON.parse(JSON.stringify(lessons)),
  languageData: JSON.parse(JSON.stringify(languageData)),
  quizCount: QUIZ_QUESTION_COUNT,
  groups: [...document.querySelectorAll(".topic-group")].map((g) => ({
    key: g.querySelector("h3").id,
    ar: g.querySelector("h3").textContent.trim(),
    lessons: [...g.querySelectorAll("button.lesson")].map((b) => ({ n: Number(b.dataset.lesson), name: b.querySelector(".lesson-name").textContent.trim() })),
  })),
}));
await browser.close(); server.close();

const KNOWN = ["title", "titleAr", "description", "descriptionAr", "code", "questions"];
legacy.lessons.forEach((l, i) => {
  for (const f of Object.keys(l)) if (!KNOWN.includes(f)) throw new Error(`lesson ${i + 1} has unknown field "${f}"`);
  for (const f of KNOWN) if (!(f in l)) throw new Error(`lesson ${i + 1} lacks "${f}"`);
  if (l.questions.length !== legacy.quizCount) throw new Error(`lesson ${i + 1}: ${l.questions.length} questions (legacy shows ${legacy.quizCount})`);
  l.questions.forEach((q, j) => {
    for (const f of Object.keys(q)) if (!["question", "questionAr", "answers", "answersAr", "correct"].includes(f)) throw new Error(`lesson ${i + 1} question ${j + 1}: unknown field ${f}`);
    if (q.answers.length !== q.answersAr.length) throw new Error(`lesson ${i + 1} question ${j + 1}: answer arrays differ in length`);
  });
});
const flat = legacy.groups.flatMap((g) => g.lessons);
flat.forEach((it, k) => { if (it.n !== k) throw new Error("sidebar data-lesson not 0..N-1 in order"); });
if (flat.length !== legacy.lessons.length) throw new Error(`sidebar lists ${flat.length} of ${legacy.lessons.length} lessons`);

const D = legacy.languageData;
const both = (k) => ({ ar: D.ar[k], en: D.en[k] });
const id = (n) => `css-${String(n).padStart(2, "0")}`;
const GROUP_KEYS = { groupBasics: "basics", groupBoxModel: "boxModel", groupTextFonts: "textFonts", groupLayout: "layout", groupModern: "modern", groupAdvanced: "advanced" };
const groups = legacy.groups.map((g, gi) => {
  const k = GROUP_KEYS[g.key]; if (!k) throw new Error("unknown group " + g.key);
  if (D.ar[k] !== g.ar) throw new Error(`group "${g.key}": page text and dictionary differ`);
  return { id: `css-g${gi + 1}`, title: both(k), lessons: g.lessons.map((it) => id(it.n + 1)) };
});

const p = (k) => ({ ar: `<p>${D.ar[k]}</p>`, en: `<p>${D.en[k]}</p>` });
const joinP = (...ks) => ({ ar: ks.map((k) => `<p>${D.ar[k]}</p>`).join(""), en: ks.map((k) => `<p>${D.en[k]}</p>`).join("") });
const extra = {
  1: [
    { title: both("whatIsCss"), html: joinP("whatIsCssP1", "whatIsCssP2", "whatIsCssP3") },
    { label: both("keyIdea"), title: both("keyIdeaTitle"), html: p("keyIdeaText") },
  ],
  2: [{ title: both("syntaxTitle"), html: joinP("syntaxP1", "syntaxP2", "syntaxP3") }],
};

const lessons = legacy.lessons.map((l, i) => ({
  id: id(i + 1),
  title: { ar: l.titleAr, en: l.title },
  description: { ar: l.descriptionAr, en: l.description },
  ...(extra[i + 1] ? { sections: extra[i + 1] } : {}),
  example: { code: l.code },
  quiz: l.questions.map((q) => ({
    question: { ar: q.questionAr, en: q.question },
    options: q.answers.map((a, k) => ({ ar: q.answersAr[k], en: a })),
    correct: q.correct,
  })),
}));

const track = {
  id: "css",
  title: { ar: "CSS", en: "CSS" },
  editorLabel: "CSS",
  exampleHeading: both("codeExampleTitle"),
  practiceHeading: both("tryItTitle"),
  runtime: "css",
  preview: {
    html: {
      ar: `<h1>Hello CSS</h1><p>${D.ar.livePreviewText}</p><button>${D.ar.exampleButton}</button>`,
      en: `<h1>Hello CSS</h1><p>${D.en.livePreviewText}</p><button>${D.en.exampleButton}</button>`,
    },
  },
  groups,
};

fs.mkdirSync("content/css", { recursive: true });
fs.writeFileSync("tests/fixtures/legacy-css.json", JSON.stringify(legacy, null, 1) + "\n");
fs.writeFileSync("content/css/index.js",
  "// CSS course content, shared lesson schema (see docs/lesson-schema.md). Arabic + English text come from the legacy page.\n" +
  "// Generated once from the legacy implementation by tools/convert-css-track.mjs; now hand-maintained.\n\n" +
  "export const track = " + ser(track) + ";\n\nexport const lessons = " + ser(lessons) + ";\n");
console.log(`converted ${lessons.length} lessons in ${groups.length} groups (${legacy.quizCount} questions each)`);
