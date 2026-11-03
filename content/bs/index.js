// Bootstrap 5 course content (shared lesson schema). Previews run in the sandboxed runner with the vendored Bootstrap 5.3.8.
import { A } from "./lessons-a.js";
import { B } from "./lessons-b.js";

export const BOOTSTRAP_VERSION = "5.3.8";
const RAW = [...A, ...B];
const id = (i) => `bs-${String(i + 1).padStart(2, "0")}`;

export const track = {
  id: "bs",
  title: { ar: "Bootstrap 5", en: "Bootstrap 5" },
  editorLabel: "HTML",
  exampleHeading: { ar: "كود HTML", en: "HTML code" },
  practiceHeading: { ar: "عدّل وجرّب", en: "Edit and try" },
  runtime: "html",
  quiz: { shuffle: true },
  preview: {
    baseCss: false,
    head:
      `<meta name="viewport" content="width=device-width, initial-scale=1">` +
      `<link rel="stylesheet" href="/vendor/bootstrap-${BOOTSTRAP_VERSION}/bootstrap.min.css">` +
      `<script src="/vendor/bootstrap-${BOOTSTRAP_VERSION}/bootstrap.bundle.min.js"></script>`,
  },
  groups: [
    { id: "bs-g1", title: { ar: "الأساسيات والشبكة" }, lessons: [0, 1, 2, 3].map(id) },
    { id: "bs-g2", title: { ar: "الأدوات المساعدة" }, lessons: [4, 5, 6, 7].map(id) },
    { id: "bs-g3", title: { ar: "المكونات" }, lessons: [8, 9, 10, 11, 12, 13, 14].map(id) },
    { id: "bs-g4", title: { ar: "التفاعل والتخصيص" }, lessons: [15, 16, 17, 18].map(id) },
    { id: "bs-g5", title: { ar: "مشروع" }, lessons: [19].map(id) },
  ],
};

export const lessons = RAW.map((l, i) => ({
  id: id(i),
  title: { ar: l.t },
  description: { ar: l.d },
  sections: l.s.map(([title, html]) => ({ title: { ar: title }, html: { ar: html } })),
  key: { ar: l.key },
  example: { code: l.code, explanation: { ar: l.exp } },
  practice: { prompt: { ar: l.prompt }, ...(l.starter ? { starterCode: l.starter } : {}) },
  quiz: l.q.map(([question, options, correct]) => ({ question: { ar: question }, options: options.map((o) => ({ ar: o })), correct })),
}));

/** Test metadata: selector that must exist once the lesson's example renders (tests/bs-engine.test.mjs). Not shown to learners. */
export const checks = RAW.map((l) => l.check);

import { EN } from "./en.js";
import { withEnglish } from "../../js/engine/with-english.js";
withEnglish(track, lessons, EN);
