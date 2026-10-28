// ONE-TIME mechanical conversion: legacy Computer Basics course -> shared lesson schema (Milestone 4e).
// Evaluates the REAL legacy page (frozen copy in /legacy/computer-basics/); the legacy data lives inside a DOMContentLoaded
// closure, so the script is served with one line injected that exposes `lessons`. Nothing else in the legacy code is changed.
// Writes tests/fixtures/legacy-com.json (frozen snapshot) and content/com/index.js. Unknown fields abort the run.
import fs from "node:fs";
import { createRequire } from "node:module";
import { startServer } from "../tests/static-server.mjs";
import { ser } from "./lib/serialize.mjs";
const { chromium } = createRequire(import.meta.url)("playwright");

const LEGACY_URL = process.argv[2] || "/legacy/computer-basics/com.html";
const MARK = 'const STORAGE_KEY = "fayad-computer-progress";';
const server = await startServer();
const browser = await chromium.launch();
const page = await browser.newPage();
await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (r) => r.abort());
await page.route(/\/com\.js$/, async (route) => {
  const res = await route.fetch();
  const body = await res.text();
  if (body.split(MARK).length !== 2) throw new Error("injection marker not found exactly once");
  await route.fulfill({ response: res, body: body.replace(MARK, "window.__legacyData={lessons};\n" + MARK) });
});
await page.goto(`http://127.0.0.1:${server.address().port}${LEGACY_URL}`);
await page.waitForFunction(() => window.__legacyData);
const legacy = await page.evaluate(() => ({
  lessons: JSON.parse(JSON.stringify(window.__legacyData.lessons)),
  sidebar: [...document.querySelectorAll(".lesson-item")].map((b) => ({ n: Number(b.dataset.lesson), name: b.querySelectorAll("span")[1].textContent.trim(), final: b.classList.contains("final-item") })),
  sidebarHeading: document.querySelector(".sidebar-header h2").textContent.trim(),
}));
await browser.close(); server.close();

const KNOWN = new Set(["title", "icon", "content", "key", "practice", "question", "answers", "correct", "final"]);
const OPTIONAL = new Set(["final"]); // legacy data flag, unused by the legacy code; kept as isFinal
legacy.lessons.forEach((l, i) => {
  for (const f of Object.keys(l)) if (!KNOWN.has(f)) throw new Error(`lesson ${i + 1} has unknown field "${f}" — extend the converter, do not drop data`);
  for (const f of KNOWN) if (!(f in l) && !OPTIONAL.has(f)) throw new Error(`lesson ${i + 1} lacks field "${f}"`);
});
if (legacy.sidebar.length !== legacy.lessons.length) throw new Error(`sidebar lists ${legacy.sidebar.length}, data has ${legacy.lessons.length}`);
legacy.sidebar.forEach((s, i) => { if (s.n !== i) throw new Error("sidebar data-lesson is not 0..N-1 in order"); });
legacy.sidebar.forEach((s, i) => { if (s.final !== (legacy.lessons[i].final === true)) throw new Error(`final flag differs between data and sidebar at ${i + 1}`); });
const mismatches = legacy.sidebar.filter((s, i) => legacy.lessons[i].title !== s.name);
if (mismatches.length) console.warn("sidebar name differs from data title:", JSON.stringify(mismatches));

const id = (n) => `com-${String(n).padStart(2, "0")}`;
const lessons = legacy.lessons.map((l, i) => ({
  id: id(i + 1),
  title: { ar: l.title },
  ...(legacy.sidebar[i].name !== l.title ? { navTitle: { ar: legacy.sidebar[i].name } } : {}),
  ...(legacy.sidebar[i].final ? { isFinal: true } : {}),
  icon: l.icon,
  body: { ar: l.content },
  key: { ar: l.key },
  practice: { prompt: { ar: l.practice } },
  quiz: [{ question: { ar: l.question }, options: l.answers.map((a) => ({ ar: a })), correct: l.correct }],
}));
const track = {
  id: "com",
  runtime: "none",
  layout: "foundation-lite",
  groups: [{ id: "com-g1", title: { ar: legacy.sidebarHeading }, lessons: lessons.map((l) => l.id) }],
};

fs.mkdirSync("content/com", { recursive: true });
fs.writeFileSync("tests/fixtures/legacy-com.json", JSON.stringify(legacy, null, 1) + "\n");
fs.writeFileSync("content/com/index.js",
  "// Computer Basics content, shared lesson schema (see docs/lesson-schema.md).\n" +
  "// Generated once from the legacy implementation by tools/convert-com-track.mjs; now hand-maintained.\n\n" +
  "export const track = " + ser(track) + ";\n\nexport const lessons = " + ser(lessons) + ";\n");
console.log(`converted ${lessons.length} lessons`);
