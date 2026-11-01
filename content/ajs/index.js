// Advanced JavaScript course content (shared lesson schema, see docs/lesson-schema.md).
// Authored with a compact table (lessons-a/b.mjs); expanded here so the engine receives the standard shape.
import { A } from "./lessons-a.js";
import { B } from "./lessons-b.js";

const RAW = [...A, ...B];
const id = (i) => `ajs-${String(i + 1).padStart(2, "0")}`;

export const track = {
  id: "ajs",
  title: { ar: "Advanced JavaScript", en: "Advanced JavaScript" },
  editorLabel: "JavaScript",
  exampleHeading: { ar: "كود JavaScript", en: "JavaScript code" },
  practiceHeading: { ar: "جرّب بنفسك", en: "Try it yourself" },
  runtime: "js",
  quiz: { shuffle: true },
  groups: [
    { id: "ajs-g1", title: { ar: "النطاق والدوال العميقة" }, lessons: [0, 1, 2, 3, 4].map(id) },
    { id: "ajs-g2", title: { ar: "الكائنات والوراثة" }, lessons: [5, 6, 7, 8, 9].map(id) },
    { id: "ajs-g3", title: { ar: "التكرار والبنى المتقدمة" }, lessons: [10, 11, 12, 13].map(id) },
    { id: "ajs-g4", title: { ar: "البرمجة غير المتزامنة" }, lessons: [14, 15, 16, 17].map(id) },
    { id: "ajs-g5", title: { ar: "الجودة والأنماط والأداء" }, lessons: [18, 19, 20, 21].map(id) },
  ],
};

export const lessons = RAW.map((l, i) => ({
  id: id(i),
  title: { ar: l.t },
  description: { ar: l.d },
  sections: l.s.map(([title, html]) => ({ title: { ar: title }, html: { ar: html } })),
  key: { ar: l.key },
  example: {
    code: l.code,
    result: { ar: `<pre dir="ltr">${l.out.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</pre>` },
    explanation: { ar: l.exp },
  },
  practice: { prompt: { ar: l.prompt }, starterCode: l.starter },
  quiz: l.q.map(([question, options, correct]) => ({ question: { ar: question }, options: options.map((o) => ({ ar: o })), correct })),
}));

import { EN } from "./en.js";
import { withEnglish } from "../../js/engine/with-english.js";
withEnglish(track, lessons, EN);
