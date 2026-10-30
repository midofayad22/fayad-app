// ONE-TIME mechanical conversion: legacy Vue course -> shared lesson schema (Milestone 4i).
// Evaluates the REAL legacy page (frozen copy in /legacy/vue-learning/). Writes tests/fixtures/legacy-vue.json and content/vue/index.js.
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
await page.goto(`http://127.0.0.1:${server.address().port}/legacy/vue-learning/vue-learning.html`);
await page.waitForTimeout(800);
const legacy = await page.evaluate(() => ({
  lessons: JSON.parse(JSON.stringify(lessons)),
  sidebar: [...document.querySelectorAll(".topic-group")].map((g) => ({
    title: g.querySelector("h3").textContent.trim(),
    items: [...g.querySelectorAll("a.lesson")].map((b) => ({ n: Number(b.dataset.lesson), name: b.querySelector(".lesson-name").textContent.trim() })),
  })),
}));
await browser.close(); server.close();

const KNOWN = ["id", "group", "title", "description", "content", "keyTitle", "keyDescription", "example", "result", "challenge", "starterCode", "explanation", "questions"];
legacy.lessons.forEach((l, i) => {
  for (const f of Object.keys(l)) if (!KNOWN.includes(f)) throw new Error(`lesson ${i + 1} has unknown field "${f}"`);
  for (const f of KNOWN) if (!(f in l)) throw new Error(`lesson ${i + 1} lacks "${f}"`);
  if (l.id !== i + 1) throw new Error(`lesson at index ${i} has id ${l.id}`);
  if (l.questions.length !== 3) throw new Error(`lesson ${i + 1}: ${l.questions.length} questions`);
  l.questions.forEach((q, j) => { for (const f of Object.keys(q)) if (!["question", "options", "correct"].includes(f)) throw new Error(`lesson ${i + 1} question ${j + 1}: unknown field ${f}`); });
});
const flat = legacy.sidebar.flatMap((g) => g.items);
flat.forEach((it, k) => { if (it.n !== k) throw new Error("sidebar data-lesson not 0..N-1 in order"); });
if (flat.length !== legacy.lessons.length) throw new Error(`sidebar lists ${flat.length} of ${legacy.lessons.length}`);

const id = (n) => `vue-${String(n).padStart(2, "0")}`;
const groups = legacy.sidebar.map((g, gi) => ({ id: `vue-g${gi + 1}`, title: { ar: g.title }, lessons: g.items.map((it) => id(it.n + 1)) }));
const navName = new Map(flat.map((it) => [id(it.n + 1), it.name]));

const lessons = legacy.lessons.map((l) => ({
  id: id(l.id),
  title: { ar: l.title },
  ...(navName.get(id(l.id)) !== l.title ? { navTitle: { ar: navName.get(id(l.id)) } } : {}),
  description: { ar: l.description },
  body: { ar: l.content },
  key: { title: { ar: l.keyTitle }, text: { ar: l.keyDescription } },
  example: { code: l.example, result: { ar: l.result }, explanation: { ar: l.explanation } },
  practice: { prompt: { ar: l.challenge }, starterCode: l.starterCode },
  quiz: l.questions.map((q) => ({ question: { ar: q.question }, options: q.options.map((o) => ({ ar: o })), correct: q.correct })),
}));
const track = {
  id: "vue",
  title: { ar: "Vue.js", en: "Vue.js" },
  editorLabel: "HTML + Vue",
  runtime: "html",
  quiz: { shuffle: true },
  // Vue 3 is vendored (same origin) instead of the legacy unpkg "vue@3" so the sandboxed preview works offline and is pinned.
  preview: { baseCss: false, bodyClass: "", head: `<meta name="viewport" content="width=device-width, initial-scale=1"><script src="/vendor/vue-3.5.13/vue.global.prod.js"></script>` },
  groups,
};
fs.mkdirSync("content/vue", { recursive: true });
fs.writeFileSync("tests/fixtures/legacy-vue.json", JSON.stringify(legacy, null, 1) + "\n");
fs.writeFileSync("content/vue/index.js",
  "// Vue course content, shared lesson schema (see docs/lesson-schema.md).\n" +
  "// Generated once from the legacy implementation by tools/convert-vue-track.mjs; now hand-maintained.\n\n" +
  "export const track = " + ser(track) + ";\n\nexport const lessons = " + ser(lessons) + ";\n");
console.log(`converted ${lessons.length} lessons in ${groups.length} groups; nav-title differences: ${lessons.filter((l) => l.navTitle).length}`);
