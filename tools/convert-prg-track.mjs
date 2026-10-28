// ONE-TIME mechanical conversion: legacy Programming Fundamentals course -> shared lesson schema (Milestone 4d).
// Evaluates the REAL legacy page (frozen copy in /legacy/programming-basics/) in a browser, so what is converted is exactly
// what learners saw. The legacy data lives inside a DOMContentLoaded closure, so the script is served with one line
// injected that exposes `lessons` and `finalQuestions`; nothing else in the legacy code is changed.
// Writes:  tests/fixtures/legacy-prg.json   frozen snapshot of the legacy data (proof for the parity test)
//          content/prg/index.js             track + lessons in the common schema
// No text is rewritten, summarised, translated or omitted. Unknown legacy fields abort the run.
import fs from "node:fs";
import { createRequire } from "node:module";
import { startServer } from "../tests/static-server.mjs";
import { ser } from "./lib/serialize.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");

const LEGACY_URL = process.argv[2] || "/legacy/programming-basics/prg.html";
const MARK = "function saveProgress() {";
const server = await startServer();
const browser = await chromium.launch();
const page = await browser.newPage();
await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
await page.route(/\/prg\.js$/, async (route) => {
  const res = await route.fetch();
  const body = await res.text();
  if (body.split(MARK).length !== 2) throw new Error("injection marker not found exactly once");
  await route.fulfill({ response: res, body: body.replace(MARK, "window.__legacyData={lessons,finalQuestions};\n" + MARK) });
});
await page.goto(`http://127.0.0.1:${server.address().port}${LEGACY_URL}`);
await page.waitForFunction(() => window.__legacyData);

const legacy = await page.evaluate(() => ({
  lessons: JSON.parse(JSON.stringify(window.__legacyData.lessons)),
  finalQuestions: JSON.parse(JSON.stringify(window.__legacyData.finalQuestions)),
  sidebar: [...document.querySelectorAll(".lesson-item")].map((b) => ({ n: b.dataset.lesson, name: b.querySelectorAll("span")[1].textContent.trim() })),
  sidebarHeading: document.querySelector(".sidebar-header h2").textContent.trim(),
  finalQuizHeading: document.querySelector(".final-quiz h2").textContent.trim(),
}));
await browser.close(); server.close();

const keys = Object.keys(legacy.lessons).map(Number).sort((a, b) => a - b);
if (keys.some((k, i) => k !== i + 1)) throw new Error("legacy lesson keys are not 1..N contiguous: " + keys);
const KNOWN = new Set(["title", "heading", "icon", "level", "content", "key", "example", "question", "answers", "correct", "challenge"]);
for (const k of keys) {
  const l = legacy.lessons[k];
  for (const f of Object.keys(l)) if (!KNOWN.has(f)) throw new Error(`lesson ${k} has unknown field "${f}" — extend the converter, do not drop data`);
  for (const f of KNOWN) if (!(f in l)) throw new Error(`lesson ${k} lacks field "${f}"`);
}
for (const [i, q] of legacy.finalQuestions.entries()) for (const f of Object.keys(q)) if (!["question", "options", "correct"].includes(f)) throw new Error(`final question ${i + 1} has unknown field "${f}"`);

const items = legacy.sidebar.filter((s) => s.n !== "final");
if (items.length !== keys.length) throw new Error(`sidebar lists ${items.length} lessons, data has ${keys.length}`);
const mismatches = items.filter((s) => legacy.lessons[s.n].title !== s.name);
if (mismatches.length) console.warn("sidebar name differs from data title:", JSON.stringify(mismatches));
if (legacy.sidebar.at(-1).n !== "final") throw new Error("final assessment entry not last in sidebar");

const id = (n) => `prg-${String(n).padStart(2, "0")}`;
const lessons = keys.map((n) => {
  const l = legacy.lessons[n];
  const nav = items.find((s) => Number(s.n) === n).name;
  return {
    id: id(n),
    title: { ar: l.title },
    // the legacy sidebar label differs from the lesson title for one lesson; kept exactly as shown to learners
    ...(nav !== l.title ? { navTitle: { ar: nav } } : {}),
    heading: { ar: l.heading },
    icon: l.icon,
    level: { ar: l.level },
    body: { ar: l.content },
    key: { ar: l.key },
    example: { code: l.example },
    challenge: { ar: l.challenge },
    quiz: [{ question: { ar: l.question }, options: l.answers.map((a) => ({ ar: a })), correct: l.correct }],
  };
});
const track = {
  id: "prg",
  runtime: "js",
  layout: "foundation",
  groups: [{ id: "prg-g1", title: { ar: legacy.sidebarHeading }, lessons: keys.map(id) }],
  assessment: {
    id: "prg-final",
    title: { ar: legacy.finalQuizHeading },
    passPercent: 70,
    questions: legacy.finalQuestions.map((q) => ({ question: { ar: q.question }, options: q.options.map((o) => ({ ar: o })), correct: q.correct })),
  },
};

fs.mkdirSync("content/prg", { recursive: true });
fs.writeFileSync("tests/fixtures/legacy-prg.json", JSON.stringify(legacy, null, 1) + "\n");
fs.writeFileSync("content/prg/index.js",
  "// Programming Fundamentals content, shared lesson schema (see docs/lesson-schema.md).\n" +
  "// Generated once from the legacy implementation by tools/convert-prg-track.mjs; now hand-maintained.\n\n" +
  "export const track = " + ser(track) + ";\n\nexport const lessons = " + ser(lessons) + ";\n");
console.log(`converted ${lessons.length} lessons, ${legacy.finalQuestions.length} final-assessment questions`);
