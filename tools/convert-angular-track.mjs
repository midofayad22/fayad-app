// ONE-TIME mechanical conversion: legacy Angular course -> shared lesson schema (Milestone 4j).
// Evaluates the REAL legacy page (frozen copy in /legacy/angular-learning/). Writes tests/fixtures/legacy-angular.json and content/angular/index.js.
// The legacy quiz is generated at runtime (getLessonQuestions: 6 questions per lesson); that output is frozen here.
// No text is rewritten, summarised, translated or omitted. Unknown legacy fields abort the run.
import fs from "node:fs";
import { createRequire } from "node:module";
import { startServer } from "../tests/static-server.mjs";
import { ser } from "./lib/serialize.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");

const FEATURES = ["component", "interpolation", "conditionalRendering", "listRendering", "twoWayBinding", "propertyBinding", "eventBinding", "uppercasePipe", "currencyPipe", "inputOutput", "service", "dependencyInjection", "routing", "routeParameter", "forms", "validation", "httpClient", "observable", "rxjs", "lifecycle", "signals", "standalone"];
const LABELS = ["writeCode", "nothingPreview", "angularPreview", "codeLoaded", "detected", ...FEATURES];

const server = await startServer();
const browser = await chromium.launch();
const page = await browser.newPage();
await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
await page.goto(`http://127.0.0.1:${server.address().port}/legacy/angular-learning/angular-learning.html`);
await page.waitForTimeout(800);
const legacy = await page.evaluate(([labels]) => ({
  lessons: JSON.parse(JSON.stringify(lessons)),
  quizCount: QUIZ_QUESTION_COUNT,
  quiz: lessons.map((_, i) => JSON.parse(JSON.stringify(getLessonQuestions(i), (k, v) => (k.startsWith("_") ? undefined : v)))),
  groupTitles: ["fundamentalsTitle", "coreAngularTitle", "advancedTitle"].map((k) => JSON.parse(JSON.stringify(staticText[k]))),
  practiceDescription: JSON.parse(JSON.stringify(staticText.practiceDescription)),
  codeExampleTitle: JSON.parse(JSON.stringify(staticText.codeExampleTitle)),
  tryItTitle: JSON.parse(JSON.stringify(staticText.tryItTitle)),
  labels: Object.fromEntries(labels.map((k) => [k, JSON.parse(JSON.stringify(staticText[k]))])),
  sidebar: [...document.querySelectorAll(".topic-group")].map((g) => ({
    title: g.querySelector("h3").textContent.trim(),
    items: [...g.querySelectorAll(".lesson")].map((b) => ({ n: Number(b.dataset.lesson), name: b.querySelector(".lesson-name").textContent.trim() })),
  })),
}), [LABELS]);
await browser.close(); server.close();

const KNOWN = ["title", "description", "explanation", "code", "question", "answers", "correct"];
legacy.lessons.forEach((l, i) => {
  for (const f of Object.keys(l)) if (!KNOWN.includes(f)) throw new Error(`lesson ${i + 1} has unknown field "${f}"`);
  for (const f of KNOWN) if (!(f in l)) throw new Error(`lesson ${i + 1} lacks "${f}"`);
  if (legacy.quiz[i].length !== legacy.quizCount) throw new Error(`lesson ${i + 1}: ${legacy.quiz[i].length} questions`);
  if (l.answers.en.length !== l.answers.ar.length) throw new Error(`lesson ${i + 1}: answers en/ar length differ`);
});
const flat = legacy.sidebar.flatMap((g) => g.items);
flat.forEach((it, k) => { if (it.n !== k + 1) throw new Error("sidebar data-lesson not 1..N in order"); });
if (legacy.sidebar.length !== 3) throw new Error("expected 3 sidebar groups");

const id = (n) => `angular-${String(n).padStart(2, "0")}`;
const groups = legacy.sidebar.map((g, gi) => ({ id: `angular-g${gi + 1}`, title: legacy.groupTitles[gi], lessons: g.items.map((it) => id(it.n)) }));
legacy.sidebar.forEach((g, gi) => { if (g.title !== legacy.groupTitles[gi].ar) throw new Error(`group ${gi + 1} title mismatch`); });
// the legacy sidebar listed 30 of 32 lessons; the rest join the last group so every lesson is reachable
const listed = new Set(groups.flatMap((g) => g.lessons));
const missing = legacy.lessons.map((_, i) => id(i + 1)).filter((x) => !listed.has(x));
groups[groups.length - 1].lessons.push(...missing);
groups.forEach((g) => g.lessons.sort());

const navDiff = flat.filter((it) => it.name !== legacy.lessons[it.n - 1].title.ar);
if (navDiff.length) console.log("sidebar names differ from Arabic titles:", navDiff.map((x) => x.n).join(","));

// Legacy question 1 showed the English answers in both languages (it read lesson.answers.en only); the Arabic answers exist in the data, so they are used.
const quiz = (i) => legacy.quiz[i].map((q, qi) => ({
  question: q.question,
  options: q.answers.map((a, ai) => (qi === 0 ? { en: a.en, ar: legacy.lessons[i].answers.ar[legacy.lessons[i].answers.en.indexOf(a.en)] ?? a.ar } : a)),
  correct: q.correct,
}));
const lessons = legacy.lessons.map((l, i) => ({
  id: id(i + 1),
  title: l.title,
  description: l.description,
  body: l.explanation,
  example: { code: l.code },
  practice: { prompt: legacy.practiceDescription, starterCode: l.code },
  quiz: quiz(i),
}));
const track = {
  id: "angular",
  title: { ar: "Angular", en: "Angular" },
  editorLabel: "Angular",
  exampleHeading: legacy.codeExampleTitle,
  practiceHeading: legacy.tryItTitle,
  runtime: "sim-angular",
  quiz: { shuffle: true },
  simLabels: legacy.labels,
  groups,
};
fs.mkdirSync("content/angular", { recursive: true });
fs.writeFileSync("tests/fixtures/legacy-angular.json", JSON.stringify(legacy, null, 1) + "\n");
fs.writeFileSync("content/angular/index.js",
  "// Angular course content, shared lesson schema (see docs/lesson-schema.md).\n" +
  "// Generated once from the legacy implementation by tools/convert-angular-track.mjs; now hand-maintained.\n\n" +
  "export const track = " + ser(track) + ";\n\nexport const lessons = " + ser(lessons) + ";\n");
console.log(`converted ${lessons.length} lessons in ${groups.length} groups; added ${missing.length} sidebar-less lessons: ${missing.join(", ")}`);
