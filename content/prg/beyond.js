// Programming Basics — "Beyond the basics" (prg-21 … prg-28): recursion, data structures, complexity, paradigms,
// compilers/interpreters, tokenizer, parser/AST and a tiny language. Authored once as AR/EN pairs (content/_doc.js);
// foundation-layout fields come out here, the English map feeds content/prg/en.js.
import { render } from "../_doc.js";
import { defs as a } from "./beyond-a.js";
import { defs as b } from "./beyond-b.js";
import { defs as c } from "./beyond-c.js";

// plain-text fields are rendered with textContent by the views, so inline <code>…</code> is flattened here
const plain = (t) => ({ ar: flat(t.ar), en: flat(t.en) });
export const flat = (s) => s.replace(/<[^>]+>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
export const deepPlain = (x) => (x && typeof x.ar === "string" && typeof x.en === "string" ? plain(x) : Array.isArray(x) ? x.map(deepPlain) : x && typeof x === "object" ? Object.fromEntries(Object.entries(x).map(([k, v]) => [k, deepPlain(v)])) : x);

const defs = [...a, ...b, ...c];
export const beyondLessons = [], beyondEN = {};
for (const d of defs) {
  const q = d.quiz;
  beyondLessons.push({
    id: d.id, title: { ar: d.title.ar }, heading: { ar: d.heading.ar }, icon: d.icon, level: { ar: d.level.ar },
    body: { ar: render(d.body, "ar") }, key: { ar: flat(d.key.ar) }, example: { code: d.code }, challenge: { ar: flat(d.challenge.ar) },
    quiz: [{ question: { ar: flat(q.q.ar) }, options: q.options.map((o) => ({ ar: flat(o.ar) })), correct: q.correct, explain: { ar: flat(q.explain.ar) } }],
    quizMore: d.more.map((m) => deepPlain({ question: m.q, options: m.options, correct: m.correct, explain: m.explain })),
    exercise: { ...deepPlain({ prompt: d.exercise.prompt, must: d.exercise.must, feedback: d.exercise.feedback, hint: d.exercise.hint }), starter: d.exercise.starter, test: d.exercise.test, solution: d.exercise.solution },
  });
  const E = beyondEN;
  E[`${d.id}.title`] = d.title.en; E[`${d.id}.heading`] = d.heading.en; E[`${d.id}.level`] = d.level.en; E[`${d.id}.body`] = render(d.body, "en");
  E[`${d.id}.key`] = flat(d.key.en); E[`${d.id}.challenge`] = flat(d.challenge.en); E[`${d.id}.quiz.0.question`] = flat(q.q.en); E[`${d.id}.quiz.0.explain`] = flat(q.explain.en);
  q.options.forEach((o, i) => { E[`${d.id}.quiz.0.options.${i}`] = flat(o.en); });
}
