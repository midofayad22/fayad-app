// ONE-TIME mechanical conversion: legacy HTML course -> shared lesson schema (Milestone 4f).
// Evaluates the REAL legacy page (frozen copy in /legacy/html-learning/). Writes tests/fixtures/legacy-html.json and content/html/index.js.
// The legacy sidebar listed 22 of the 30 lessons: the 8 missing ones are added to the group that carries their own group label.
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
await page.goto(`http://127.0.0.1:${server.address().port}/legacy/html-learning/html-learning.html`);
await page.waitForTimeout(800);
const legacy = await page.evaluate(() => ({
  // runtime-added fields (shuffle bookkeeping starting with "_") are not data
  lessons: JSON.parse(JSON.stringify(lessons, (k, v) => (k.startsWith("_") ? undefined : v))),
  sidebar: [...document.querySelectorAll(".sidebar .topic-group")].map((g) => ({
    title: g.querySelector("h3").textContent.trim(),
    items: [...g.querySelectorAll("a.lesson")].map((a) => ({ n: Number(a.dataset.lesson), name: a.querySelector(".lesson-name").textContent.trim() })),
  })),
  practiceHeading: document.getElementById("write-html-title").textContent.trim(),
}));
await browser.close(); server.close();

const KNOWN = ["id", "group", "title", "description", "content", "exampleTitle", "exampleCode", "result", "explanation", "practice", "starterCode", "questions"];
legacy.lessons.forEach((l, i) => {
  for (const f of Object.keys(l)) if (!KNOWN.includes(f)) throw new Error(`lesson ${i + 1} has unknown field "${f}"`);
  for (const f of KNOWN) if (!(f in l)) throw new Error(`lesson ${i + 1} lacks "${f}"`);
  if (l.id !== i + 1) throw new Error(`lesson at index ${i} has id ${l.id}`);
  l.questions.forEach((q, j) => { for (const f of Object.keys(q)) if (!["question", "options", "correct"].includes(f)) throw new Error(`lesson ${i + 1} question ${j + 1}: unknown field ${f}`); });
});

// Legacy sidebar position k (data-lesson k) was meant to open lesson k+1 (its own code mapped it wrongly, see docs).
const flat = legacy.sidebar.flatMap((g) => g.items);
flat.forEach((it, k) => { if (it.n !== k) throw new Error("sidebar data-lesson not 0..N-1 in order"); });
const id = (n) => `html-${String(n).padStart(2, "0")}`;
const groups = legacy.sidebar.map((g, gi) => ({ id: `html-g${gi + 1}`, title: { ar: g.title }, lessons: g.items.map((it) => id(it.n + 1)) }));
const listed = new Set(groups.flatMap((g) => g.lessons));
const missing = legacy.lessons.map((l) => id(l.id)).filter((x) => !listed.has(x));
for (const mid of missing) {
  const lesson = legacy.lessons[Number(mid.slice(5)) - 1];
  const hit = groups.find((g) => g.lessons.some((x) => legacy.lessons[Number(x.slice(5)) - 1].group === lesson.group));
  if (!hit) throw new Error(`no group carries the label "${lesson.group}" for ${mid}`);
  hit.lessons.push(mid);
}
groups.forEach((g) => g.lessons.sort());
const navName = new Map(flat.map((it) => [id(it.n + 1), it.name]));

const lessons = legacy.lessons.map((l) => ({
  id: id(l.id),
  kicker: l.group,
  title: { ar: l.title },
  ...(navName.has(id(l.id)) && navName.get(id(l.id)) !== l.title ? { navTitle: { ar: navName.get(id(l.id)) } } : {}),
  description: { ar: l.description },
  body: { ar: l.content },
  example: { title: { ar: l.exampleTitle }, code: l.exampleCode, result: { ar: l.result }, explanation: { ar: l.explanation } },
  practice: { prompt: { ar: l.practice }, starterCode: l.starterCode },
  quiz: l.questions.map((q) => ({ question: { ar: q.question }, options: q.options.map((o) => ({ ar: o })), correct: q.correct })),
}));
const track = {
  id: "html",
  title: { ar: "HTML", en: "HTML" },
  editorLabel: "HTML",
  practiceHeading: { ar: legacy.practiceHeading, en: "Write HTML code" },
  runtime: "html",
  quiz: { shuffle: true },
  groups,
};

fs.mkdirSync("content/html", { recursive: true });
fs.writeFileSync("tests/fixtures/legacy-html.json", JSON.stringify(legacy, null, 1) + "\n");
fs.writeFileSync("content/html/index.js",
  "// HTML course content, shared lesson schema (see docs/lesson-schema.md).\n" +
  "// Generated once from the legacy implementation by tools/convert-html-track.mjs; now hand-maintained.\n\n" +
  "export const track = " + ser(track) + ";\n\nexport const lessons = " + ser(lessons) + ";\n");
console.log(`converted ${lessons.length} lessons in ${groups.length} groups; added ${missing.length} sidebar-less lessons: ${missing.join(", ")}`);
