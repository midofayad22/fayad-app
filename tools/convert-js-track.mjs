// ONE-TIME mechanical conversion: legacy JavaScript course -> shared lesson schema (Milestone 4b).
// Reads the REAL legacy page in a browser (so what is converted is exactly what learners saw), writes:
//   tests/fixtures/legacy-js.json     frozen snapshot of the legacy data (proof for the parity test)
//   content/js/index.js               track + lessons in the common schema
// No text is rewritten, summarised, translated or omitted. Unknown legacy fields abort the run.
import fs from "node:fs";
import { createRequire } from "node:module";
import { startServer } from "../tests/static-server.mjs";
import { ser } from "./lib/serialize.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");

const LEGACY_URL = process.argv[2] || "/javascript-learning/javascript-learning.html";
const server = await startServer();
const browser = await chromium.launch();
const page = await browser.newPage();
await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
await page.goto(`http://127.0.0.1:${server.address().port}${LEGACY_URL}`);
await page.waitForTimeout(800);

const legacy = await page.evaluate(() => ({
  lessons: JSON.parse(JSON.stringify(lessons)),
  sidebar: [...document.querySelectorAll(".sidebar .topic-group")].map((g) => ({
    title: g.querySelector("h3").textContent.trim(),
    items: [...g.querySelectorAll("a.lesson")].map((a) => ({ n: Number(a.dataset.lesson), name: a.querySelector(".lesson-name").textContent.trim() })),
  })),
  // static articles that live in the HTML (they belong to lesson 1 only; legacy showed them on every lesson)
  staticCards: [...document.querySelectorAll(".content-card")].map((c) => ({
    label: c.querySelector(".info-label")?.textContent.trim() ?? null,
    title: c.querySelector("h2").textContent.trim(),
    html: [...c.children].filter((el) => el.tagName !== "H2" && !el.classList.contains("info-label")).map((el) => el.outerHTML).join("\n").replace(/\s*\n\s*/g, "\n").trim(),
  })),
}));
await browser.close(); server.close();

const KNOWN = new Set(["title", "description", "code", "explanation", "questions"]);
for (const [i, l] of legacy.lessons.entries()) {
  for (const k of Object.keys(l)) if (!KNOWN.has(k)) throw new Error(`lesson ${i + 1} has unknown field "${k}" — extend the converter, do not drop data`);
  for (const q of l.questions) for (const k of Object.keys(q)) if (!["question", "answers", "correct"].includes(k)) throw new Error(`lesson ${i + 1} question has unknown field "${k}"`);
}
const flat = legacy.sidebar.flatMap((g) => g.items);
if (flat.length !== legacy.lessons.length) console.warn(`NOTE: sidebar lists ${flat.length}, data has ${legacy.lessons.length}`);
const mismatches = flat.filter((it) => legacy.lessons[it.n - 1]?.title !== it.name);
if (mismatches.length) console.warn("sidebar name differs from data title:", JSON.stringify(mismatches));
const covered = new Set(flat.map((f) => f.n));
const orphans = legacy.lessons.map((_, i) => i + 1).filter((n) => !covered.has(n));
if (orphans.length) throw new Error("lessons not in any sidebar group: " + orphans);

const pad = (n) => String(n).padStart(2, "0");
const id = (n) => `js-${pad(n)}`;
const lessons = legacy.lessons.map((l, i) => {
  const out = { id: id(i + 1), title: { ar: l.title }, description: { ar: l.description } };
  if (i === 0 && legacy.staticCards.length) {
    out.sections = legacy.staticCards.map((c) => ({ ...(c.label ? { label: { ar: c.label } } : {}), title: { ar: c.title }, html: { ar: c.html } }));
  }
  out.example = { code: l.code, ...(l.explanation ? { explanation: { ar: l.explanation } } : {}) };
  out.quiz = l.questions.map((q) => ({ question: { ar: q.question }, options: q.answers.map((a) => ({ ar: a })), correct: q.correct }));
  return out;
});
const track = {
  id: "js",
  runtime: "dom-js",
  groups: legacy.sidebar.map((g, gi) => ({ id: `js-g${gi + 1}`, title: { ar: g.title }, lessons: g.items.map((it) => id(it.n)) })),
};

fs.mkdirSync("content/js", { recursive: true });
fs.writeFileSync("tests/fixtures/legacy-js.json", JSON.stringify(legacy, null, 1) + "\n");
fs.writeFileSync("content/js/index.js",
  "// JavaScript course content, shared lesson schema (see docs/lesson-schema.md).\n" +
  "// Generated once from the legacy implementation by tools/convert-js-track.mjs; now hand-maintained.\n\n" +
  "export const track = " + ser(track) + ";\n\nexport const lessons = " + ser(lessons) + ";\n");
console.log(`converted ${lessons.length} lessons, ${track.groups.length} groups, ${legacy.staticCards.length} static cards (lesson 1 only)`);
