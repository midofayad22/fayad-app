// Shared authoring helper for documentation-style lessons (Computer Basics, Programming Basics).
// A lesson is written ONCE as language pairs, so the Arabic and English markup can never drift apart
// (tests/english-content.test.mjs requires identical tags/attributes and byte-identical <code>/<pre> blocks).
// Rendered HTML is styled by css/lesson-doc.css (one reusable component set; no per-page CSS).

export const T = (ar, en) => ({ ar, en });

const UI = {
  ar: { objectives: "أهداف الدرس", prereq: "المتطلبات السابقة", copy: "نسخ", output: "الناتج", diagram: "مخطط", mistakes: "أخطاء شائعة", exercise: "تمرين", solution: "عرض الحل", summary: "الخلاصة", next: "الخطوة التالية", tip: "نصيحة", warn: "تنبيه", info: "ملاحظة", refs: "مراجع للاستزادة" },
  en: { objectives: "Learning objectives", prereq: "Prerequisites", copy: "Copy", output: "Output", diagram: "Diagram", mistakes: "Common mistakes", exercise: "Exercise", solution: "Show solution", summary: "Summary", next: "Next step", tip: "Tip", warn: "Watch out", info: "Note", refs: "Further reading" },
};

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const list = (tag, items, l) => `<${tag}>${items.map((i) => `<li>${i[l]}</li>`).join("")}</${tag}>`;

const BLOCK = {
  p: (b, l) => `<p>${b.t[l]}</p>`,
  ul: (b, l) => list("ul", b.items, l),
  ol: (b, l) => list("ol", b.items, l),
  h4: (b, l) => `<h4>${b.t[l]}</h4>`,
  code: (b, l) => `<figure class="code-ex"><figcaption><span class="code-ex-lang">${esc(b.lang)}</span><button type="button" class="code-ex-copy">${UI[l].copy}</button></figcaption><pre dir="ltr"><code>${esc(b.code)}</code></pre></figure>`,
  out: (b, l) => `<figure class="code-ex code-ex-out"><figcaption><span class="code-ex-lang">${UI[l].output}</span></figcaption><pre dir="ltr"><code>${esc(b.code)}</code></pre></figure>`,
  diagram: (b, l) => `<figure class="doc-diagram" role="group" aria-label="${UI[l].diagram}"><figcaption>${b.title[l]}</figcaption><ol class="doc-layers">${b.rows.map((r) => `<li><strong>${r.label[l]}</strong><span>${r.sub[l]}</span></li>`).join("")}</ol></figure>`,
  flow: (b, l) => `<figure class="doc-diagram" role="group" aria-label="${UI[l].diagram}"><figcaption>${b.title[l]}</figcaption><ol class="doc-flow">${b.steps.map((r) => `<li><strong>${r.label[l]}</strong><span>${r.sub[l]}</span></li>`).join("")}</ol></figure>`,
  table: (b, l) => `<div class="doc-table-wrap"><table class="doc-table"><thead><tr>${b.head.map((h) => `<th scope="col">${h[l]}</th>`).join("")}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c, i) => (i === 0 ? `<th scope="row">${c[l]}</th>` : `<td>${c[l]}</td>`)).join("")}</tr>`).join("")}</tbody></table></div>`,
  note: (b, l) => `<aside class="doc-note doc-note-${b.kind || "info"}"><strong>${UI[l][b.kind || "info"]}</strong><p>${b.t[l]}</p></aside>`,
  mistakes: (b, l) => `<div class="doc-mistakes"><h4>${UI[l].mistakes}</h4>${list("ul", b.items, l)}</div>`,
  ex: (b, l) => `<details class="doc-exercise"><summary><span>${UI[l].exercise}</span> ${b.q[l]}</summary><div class="doc-solution"><strong>${UI[l].solution}</strong>${b.a[l]}</div></details>`,
};

/** blocks: [{k:"objectives",items},{k:"prereq",items},{k:"h",t},... other blocks belong to the preceding heading] */
export function render(blocks, l) {
  const out = [];
  let open = false;
  const close = () => { if (open) out.push("</section>"); open = false; };
  const start = (cls, inner) => { close(); out.push(`<section class="lesson-section ${cls}">${inner}`); open = true; };
  for (const b of blocks) {
    if (b.k === "h") start("", `<h3>${b.t[l]}</h3>`);
    else if (b.k === "objectives") start("doc-objectives", `<h3>${UI[l].objectives}</h3>${list("ul", b.items, l)}`);
    else if (b.k === "prereq") start("doc-prereq", `<h3>${UI[l].prereq}</h3>${list("ul", b.items, l)}`);
    else if (b.k === "summary") start("doc-summary", `<h3>${UI[l].summary}</h3>${list("ul", b.items, l)}${b.next ? `<p class="doc-next"><strong>${UI[l].next}:</strong> ${b.next[l]}</p>` : ""}`);
    else if (b.k === "refs") start("doc-refs", `<h3>${UI[l].refs}</h3>${list("ul", b.items, l)}`);
    else { if (!open) start("", ""); out.push(BLOCK[b.k](b, l)); }
  }
  close();
  return out.join("\n");
}

/**
 * defs: [{ id, icon, title:T, body:blocks, key:T, practice:T, quiz:{ q:T, options:[T], correct } }]
 * returns the Arabic lesson objects (shape of content/<id>/index.js) and the English map (shape of content/<id>/en.js).
 */
export function build(defs) {
  const lessons = [], EN = {};
  for (const d of defs) {
    lessons.push({
      id: d.id, title: { ar: d.title.ar }, icon: d.icon, body: { ar: render(d.body, "ar") }, key: { ar: d.key.ar },
      practice: { prompt: { ar: d.practice.ar } },
      quiz: [{ question: { ar: d.quiz.q.ar }, options: d.quiz.options.map((o) => ({ ar: o.ar })), correct: d.quiz.correct }],
    });
    EN[`${d.id}.title`] = d.title.en; EN[`${d.id}.body`] = render(d.body, "en"); EN[`${d.id}.key`] = d.key.en;
    EN[`${d.id}.practice.prompt`] = d.practice.en; EN[`${d.id}.quiz.0.question`] = d.quiz.q.en;
    d.quiz.options.forEach((o, i) => { EN[`${d.id}.quiz.0.options.${i}`] = o.en; });
  }
  return { lessons, EN };
}
