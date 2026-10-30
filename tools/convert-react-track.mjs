// ONE-TIME mechanical conversion: legacy React course -> shared lesson schema (Milestone 4h).
// Evaluates the REAL legacy page (frozen copy in /legacy/react-learning/). Writes tests/fixtures/legacy-react.json and content/react/index.js.
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
await page.goto(`http://127.0.0.1:${server.address().port}/legacy/react-learning/react-learning.html`);
await page.waitForTimeout(800);
const legacy = await page.evaluate(() => ({
  lessons: JSON.parse(JSON.stringify(lessons, (k, v) => (k.startsWith("_") ? undefined : v))), // "_shuffledAnswers" is runtime bookkeeping
  quizCount: QUIZ_QUESTION_COUNT,
  sidebar: [...document.querySelectorAll(".topic-group")].map((g) => ({
    title: g.querySelector("h3").textContent.trim(),
    items: [...g.querySelectorAll("button.lesson, a.lesson")].map((b) => ({ n: Number(b.getAttribute("href").replace("#lesson-", "")) - 1, name: b.querySelector(".lesson-name").textContent.trim() })),
  })),
}));
await browser.close(); server.close();

const KNOWN = ["title", "description", "content", "keyIdea", "explanation", "practice", "code", "questions"];
legacy.lessons.forEach((l, i) => {
  for (const f of Object.keys(l)) if (!KNOWN.includes(f)) throw new Error(`lesson ${i + 1} has unknown field "${f}"`);
  for (const f of KNOWN) if (!(f in l)) throw new Error(`lesson ${i + 1} lacks "${f}"`);
  if (l.questions.length !== legacy.quizCount) throw new Error(`lesson ${i + 1}: ${l.questions.length} questions`);
  l.questions.forEach((q, j) => { for (const f of Object.keys(q)) if (!["question", "answers", "correct"].includes(f)) throw new Error(`lesson ${i + 1} question ${j + 1}: unknown field ${f}`); });
});
const flat = legacy.sidebar.flatMap((g) => g.items);
flat.forEach((it, k) => { if (it.n !== k) throw new Error("sidebar data-lesson not 0..N-1 in order"); });
if (flat.length !== legacy.lessons.length) throw new Error(`sidebar lists ${flat.length} of ${legacy.lessons.length} lessons`);

const id = (n) => `react-${String(n).padStart(2, "0")}`;
const groups = legacy.sidebar.map((g, gi) => ({ id: `react-g${gi + 1}`, title: { ar: g.title }, lessons: g.items.map((it) => id(it.n + 1)) }));
const navName = new Map(flat.map((it) => [id(it.n + 1), it.name]));

const lessons = legacy.lessons.map((l, i) => ({
  id: id(i + 1),
  title: { ar: l.title },
  ...(navName.get(id(i + 1)) !== l.title ? { navTitle: { ar: navName.get(id(i + 1)) } } : {}),
  description: { ar: l.description },
  body: { ar: l.content },
  key: { ar: l.keyIdea },
  example: { code: l.code, explanation: { ar: l.explanation } },
  practice: { prompt: { ar: l.practice } },
  quiz: l.questions.map((q) => ({ question: { ar: q.question }, options: q.answers.map((a) => ({ ar: a })), correct: q.correct })),
}));
const track = { id: "react", title: { ar: "React", en: "React" }, editorLabel: "React", runtime: "sim-react", quiz: { shuffle: true }, groups };

fs.mkdirSync("content/react", { recursive: true });
fs.writeFileSync("tests/fixtures/legacy-react.json", JSON.stringify(legacy, null, 1) + "\n");
fs.writeFileSync("content/react/index.js",
  "// React course content, shared lesson schema (see docs/lesson-schema.md).\n" +
  "// Generated once from the legacy implementation by tools/convert-react-track.mjs; now hand-maintained.\n\n" +
  "export const track = " + ser(track) + ";\n\nexport const lessons = " + ser(lessons) + ";\n");
console.log(`converted ${lessons.length} lessons in ${groups.length} groups; nav-title differences: ${lessons.filter((l) => l.navTitle).length}`);
