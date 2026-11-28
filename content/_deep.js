// Deep-dive layer: extra depth, interview questions and curated references for every lesson, kept in content/<track>/dive.js
// as { "<lessonId>": { deep:[{t,html}], interview:[{lv,q,a}], refs:[{s,u,t}] } } where every text is a language pair { ar, en }.
// It only APPENDS authored, trusted cards to lesson.body (ids, quizzes, progress and existing text are untouched).
// All explanations are original writing; the references are links to the primary documentation (MDN, web.dev, W3C/WHATWG, framework docs), never copied text.
export const D = (ar, en) => ({ ar, en });

const UI = {
  ar: { deep: "تعمّق", interview: "أسئلة المقابلات", refs: "مراجع موثوقة", junior: "مبتدئ", mid: "متوسط", senior: "متقدم", open: "افتح المرجع", intro: "أسئلة تتكرر في مقابلات العمل. حاول الإجابة بصوتك أولًا ثم افتح الإجابة النموذجية." },
  en: { deep: "Go deeper", interview: "Interview questions", refs: "Trusted references", junior: "Junior", mid: "Mid", senior: "Senior", open: "Open reference", intro: "Questions that keep coming up in job interviews. Answer out loud first, then open the model answer." },
};
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const SRC = { MDN: "MDN Web Docs", W3S: "W3Schools", WEB: "web.dev", W3C: "W3C", WHATWG: "WHATWG", JSI: "javascript.info", DOCS: "Official docs" };

export function cards(entry, l) {
  const u = UI[l], out = [];
  for (const d of entry.deep || []) out.push(`<article class="content-card deep-card"><div class="info-label">${u.deep}</div><h2>${d.t[l]}</h2>${d.html[l]}</article>`);
  if (entry.interview?.length) out.push(`<article class="content-card iq-card"><div class="info-label">${u.interview}</div><h2>${u.interview}</h2><p>${u.intro}</p>${entry.interview.map((q) => `<details class="iq iq-${q.lv || "junior"}"><summary><span class="iq-lv">${u[q.lv || "junior"]}</span><span class="iq-q">${q.q[l]}</span></summary><div class="iq-a">${q.a[l]}</div></details>`).join("")}</article>`);
  if (entry.refs?.length) out.push(`<article class="content-card refs-card"><div class="info-label">${u.refs}</div><h2>${u.refs}</h2><ul class="refs">${entry.refs.map((r) => `<li><a href="${esc(r.u)}" target="_blank" rel="noopener noreferrer"><span class="refs-src">${SRC[r.s] || esc(r.s)}</span><span class="refs-t" dir="auto">${r.t[l]}</span></a></li>`).join("")}</ul></article>`);
  return out.join("");
}

export function applyDeep(lessons, DEEP) {
  for (const [id, entry] of Object.entries(DEEP)) {
    const l = lessons.find((x) => x.id === id);
    if (!l) throw new Error("deep content for unknown lesson " + id);
    const ar = cards(entry, "ar"), en = cards(entry, "en");
    const body = l.body && typeof l.body === "object" ? l.body : (l.body = { ar: "" });
    const enBase = typeof body.en === "string" && body.en ? body.en : body.ar;
    body.en = enBase + en; body.ar = body.ar + ar;
  }
}
