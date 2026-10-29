// Tailwind CSS v4 course content (shared lesson schema). Previews run in the sandboxed runner with the vendored
// @tailwindcss/browser (the in-browser compiler; for learning only, production uses the build tools).
import { A } from "./lessons-a.js";
import { B } from "./lessons-b.js";

export const TAILWIND_VERSION = "4.3.3";
const RAW = [...A, ...B];
const id = (i) => `tw-${String(i + 1).padStart(2, "0")}`;

export const track = {
  id: "tw",
  title: { ar: "Tailwind CSS", en: "Tailwind CSS" },
  editorLabel: "HTML",
  exampleHeading: { ar: "كود HTML", en: "HTML code" },
  practiceHeading: { ar: "عدّل وجرّب", en: "Edit and try" },
  runtime: "html",
  quiz: { shuffle: true },
  preview: {
    baseCss: false,
    head:
      `<meta name="viewport" content="width=device-width, initial-scale=1">` +
      `<script src="/vendor/tailwindcss-browser-${TAILWIND_VERSION}/tailwindcss-browser.js"></script>`,
  },
  groups: [
    { id: "tw-g1", title: { ar: "الأساسيات" }, lessons: [0, 1, 2, 3, 4].map(id) },
    { id: "tw-g2", title: { ar: "التخطيط" }, lessons: [5, 6, 7].map(id) },
    { id: "tw-g3", title: { ar: "المظهر" }, lessons: [8, 9].map(id) },
    { id: "tw-g4", title: { ar: "التجاوب والحالات" }, lessons: [10, 11, 12, 13, 14].map(id) },
    { id: "tw-g5", title: { ar: "التخصيص والمشاريع" }, lessons: [15, 16, 17, 18, 19].map(id) },
  ],
};

export const lessons = RAW.map((l, i) => ({
  id: id(i),
  title: { ar: l.t },
  description: { ar: l.d },
  sections: l.s.map(([title, html]) => ({ title: { ar: title }, html: { ar: html } })),
  key: { ar: l.key },
  example: { code: l.code, explanation: { ar: l.exp } },
  practice: { prompt: { ar: l.prompt } },
  quiz: l.q.map(([question, options, correct]) => ({ question: { ar: question }, options: options.map((o) => ({ ar: o })), correct })),
}));

/** Test metadata: [selector, cssProperty, expected computed value] verified in the sandboxed preview. Not shown to learners. */
export const checks = RAW.map((l) => l.check);
