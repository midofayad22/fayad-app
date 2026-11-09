/*
  "Foundation" course layout (Programming Fundamentals; Computer Basics will reuse it). DOM-bound to the existing
  prg.html markup so the page keeps its CSS, and driven entirely by /content/<track>/index.js data.

  Rules preserved from the legacy page (verified in tests/prg-engine.test.mjs):
    - one quiz question per lesson, ONE attempt (buttons lock after the first answer; the correct option is revealed on a miss)
    - the quiz does NOT gate completion: "إتمام الدرس" is a separate, manual action; opening a lesson never completes it
    - the final assessment (track.assessment) has no feedback per question; passing (>= passPercent) completes every lesson
  Learner code runs ONLY in the sandboxed runner (runtime "js": a killable Worker inside an opaque-origin iframe).
  Authored lesson HTML (lesson.body) is trusted site content; everything else is inserted as text.
*/
import { t, orderedIds } from "./schema.js";
import { create as createRunner } from "../playground/playground.js";
import { upgradeEditor } from "./editor.js";
import { createCourseNav } from "../course/nav.js";
import { normalize } from "../course/structure.js";

// Two page profiles share this view: "foundation" (Programming Fundamentals: example, editor, final assessment) and
// "foundation-lite" (Computer Basics: reading + one quiz question + practice text). Strings are kept exactly as each
// legacy page showed them (Arabic only; the shared UI-string dictionary replaces them in the localisation milestone).
const LITE_AR = {
  lessonOf: (n, total) => `الدرس ${n} من ${total}`,
  completed: '<i class="fa-solid fa-circle-check"></i> مكتمل', notCompleted: '<i class="fa-regular fa-circle"></i> غير مكتمل',
  completeBtn: '<i class="fa-solid fa-check"></i> إكمال الدرس', completedBtn: '<i class="fa-solid fa-check"></i> تم إكمال الدرس',
  next: 'الدرس التالي <i class="fa-solid fa-arrow-left"></i>', end: 'تم الوصول للنهاية <i class="fa-solid fa-flag-checkered"></i>',
  correct: "إجابة صحيحة! أحسنت، لقد فهمت المفهوم.", wrong: (answer) => `إجابة غير صحيحة. الإجابة الصحيحة هي: ${answer}`,
};
const UI_AR = {
  lessonOf: (n, total) => `الدرس ${String(n).padStart(2, "0")} من ${total}`,
  completed: "✓ مكتمل", notCompleted: "غير مكتمل",
  completeBtn: '<i class="fa-solid fa-check"></i> إتمام الدرس',
  completedBtn: '<i class="fa-solid fa-circle-check"></i> تم إتمام الدرس',
  next: 'الدرس التالي <i class="fa-solid fa-arrow-left"></i>',
  toFinal: 'الاختبار النهائي <i class="fa-solid fa-trophy"></i>',
  correct: "✓ إجابة صحيحة! أحسنت.",
  wrong: "✕ ليست الإجابة الصحيحة. راجع الفكرة وحاول مرة أخرى.",
  notStarted: "لم تبدأ بعد — هيا نبدأ 🚀",
  some: (c, n) => `أكملت ${c} من ${n} دروس`,
  most: (left) => `ممتاز! بقي ${left} دروس`,
  all: "أكملت المسار بالكامل! 🎉",
  placeholder: "نتيجة الكود ستظهر هنا...",
  resetDone: "تم إعادة الكود إلى الحالة الأصلية.",
  running: "⏳ جاري تشغيل الكود...",
  noOutput: "✓ تم تنفيذ الكود بدون Output.",
  timedOut: "✕ تم إيقاف التنفيذ: استغرق الكود وقتًا طويلًا (ربما حلقة لا تنتهي).",
  copy: '<i class="fa-regular fa-copy"></i> نسخ', copied: '<i class="fa-solid fa-check"></i> تم النسخ', copyFailed: "تعذر النسخ",
  nextQuestion: "السؤال التالي", finish: "إنهاء الاختبار", close: "إغلاق", result: "نتيجتك",
  msgs: [[90, "ممتاز جدًا! أساسك البرمجي قوي. 🔥"], [70, "أداء رائع! أنت جاهز للخطوة التالية."], [50, "نتيجة جيدة، لكن من الأفضل مراجعة بعض الدروس."], [0, "لا مشكلة. راجع المسار مرة أخرى وستتحسن."]],
};

const LITE_EN = {
  lessonOf: (n, total) => `Lesson ${n} of ${total}`,
  completed: '<i class="fa-solid fa-circle-check"></i> Completed', notCompleted: '<i class="fa-regular fa-circle"></i> Not completed',
  completeBtn: '<i class="fa-solid fa-check"></i> Complete lesson', completedBtn: '<i class="fa-solid fa-check"></i> Lesson completed',
  next: 'Next lesson <i class="fa-solid fa-arrow-right"></i>', end: 'You reached the end <i class="fa-solid fa-flag-checkered"></i>',
  correct: "Correct! Well done, you understood the concept.", wrong: (answer) => `Not correct. The right answer is: ${answer}`,
};
const UI_EN = {
  lessonOf: (n, total) => `Lesson ${String(n).padStart(2, "0")} of ${total}`,
  completed: "✓ Completed", notCompleted: "Not completed",
  completeBtn: '<i class="fa-solid fa-check"></i> Complete lesson',
  completedBtn: '<i class="fa-solid fa-circle-check"></i> Lesson completed',
  next: 'Next lesson <i class="fa-solid fa-arrow-right"></i>',
  toFinal: 'Final assessment <i class="fa-solid fa-trophy"></i>',
  correct: "✓ Correct! Well done.",
  wrong: "✕ Not the right answer. Review the idea and try again next time.",
  notStarted: "Not started yet — let's begin 🚀",
  some: (c, n) => `You completed ${c} of ${n} lessons`,
  most: (left) => `Great! ${left} lessons left`,
  all: "You completed the whole course! 🎉",
  placeholder: "The code output will appear here...",
  resetDone: "The code was reset to its original state.",
  running: "⏳ Running the code...",
  noOutput: "✓ The code ran without any output.",
  timedOut: "✕ Execution stopped: the code took too long (possibly an endless loop).",
  copy: '<i class="fa-regular fa-copy"></i> Copy', copied: '<i class="fa-solid fa-check"></i> Copied', copyFailed: "Could not copy",
  nextQuestion: "Next question", finish: "Finish quiz", close: "Close", result: "Your result",
  msgs: [[90, "Excellent! Your programming foundation is strong. 🔥"], [70, "Great work! You are ready for the next step."], [50, "A good result, but reviewing a few lessons would help."], [0, "No problem. Go through the course again and you will improve."]],
};

// Static page chrome (headings, button labels, footer) of the two foundation pages; the lesson text itself comes from the content data.
const CHROME_EN = {
  "العودة إلى FAYBIT": "Back to FAYBIT",
  "أساسيات الكمبيوتر": "Computer Fundamentals",
  "تعلّم كيف يعمل الكمبيوتر من الداخل، وافهم مكوّناته وبرمجياته والبيانات والإنترنت وأنظمة التشغيل والأمن السيبراني.": "Learn how a computer works from the inside: its components, software, data, the internet, operating systems and cybersecurity.",
  "أساسيات البرمجة": "Programming Fundamentals",
  "تعلّم كيف يفكر المبرمج، وكيف تتحول الأفكار والخوارزميات إلى تعليمات يستطيع الكمبيوتر تنفيذها.": "Learn how a programmer thinks and how ideas and algorithms become instructions a computer can run.",
  "درسًا": "lessons", "اختبارًا": "quizzes", "تحديات": "challenges", "اختبار نهائي": "final assessment",
  "مسار التعلم": "Learning path", "تقدمك": "Your progress",
  "المفهوم الأساسي": "Core concept", "الفكرة الأساسية": "Core idea", "اختبر فهمك": "Test yourself", "سؤال سريع": "Quick question",
  "تطبيق عملي": "Hands-on practice", "تطبيق": "Practice", "جرّب بنفسك": "Try it yourself", "جرّب الكود بنفسك": "Try the code yourself",
  "مثال عملي": "Worked example", "شاهد الفكرة في كود": "See the idea in code", "تحدَّ نفسك": "Challenge yourself",
  "حاول تطبيق الفكرة بنفسك قبل الانتقال إلى الدرس التالي.": "Try applying the idea yourself before moving to the next lesson.",
  "اكتب مثالًا بسيطًا يطبق المفهوم الذي تعلمته.": "Write a simple example that applies the concept you learned.",
  "نسخ": "Copy", "تشغيل": "Run", "إعادة": "Reset", "إغلاق": "Close", "الدرس السابق": "Previous lesson", "الدرس التالي": "Next lesson",
  "إكمال الدرس": "Complete lesson", "إتمام الدرس": "Complete lesson", "الاختبار النهائي": "Final assessment", "السؤال التالي": "Next question",
  "نتيجة الكود ستظهر هنا...": "The code output will appear here...",
  "أثبت أنك فهمت أساسيات البرمجة قبل الانتقال إلى Web Fundamentals.": "Show you understood the programming fundamentals before moving on to Web Fundamentals.",
  "دروس المسار": "Course lessons", "محرر JavaScript": "JavaScript editor",
  "© 2026 FAYBIT — منصة تعليمية لتعلّم البرمجة": "© 2026 FAYBIT — a platform for learning programming",
  "© 2026 FAYBIT — جميع الحقوق محفوظة": "© 2026 FAYBIT — all rights reserved",
};
const squash = (x) => x.replace(/[\u064B-\u0652\u0640]/g, "").replace(/\s+/g, " ").trim();

const CHROME = Object.fromEntries(Object.entries(CHROME_EN).map(([k, v]) => [squash(k), v]));

export function mountFoundation({ doc = document, track, lessons, progress, lang: initialLang }) {
  const readLang = () => (doc.documentElement.getAttribute("data-lang") === "en" ? "en" : "ar");
  let lang = initialLang || readLang();
  const $ = (id) => doc.getElementById(id);
  const win = doc.defaultView;
  const order = orderedIds(track);
  const byId = new Map(lessons.map((l) => [l.id, l]));
  const total = order.length;
  const assessment = track.assessment;
  const lite = track.layout === "foundation-lite";
  const IDS = lite
    ? ["lesson-nav", "lesson-counter", "lesson-title", "content-title", "lesson-icon", "lesson-content", "key-concept-text", "practice-text", "quiz-question",
      "quiz-options", "quiz-result", "lesson-status", "complete-btn", "prev-btn", "next-btn", "progress-fill", "progress-text"]
    : ["lesson-nav", "lesson-counter", "lesson-title", "lesson-heading", "lesson-content", "lesson-icon", "lesson-level",
      "lesson-status", "key-description", "example-code", "quiz-question", "quiz-options", "quiz-result", "challenge-text", "complete-btn", "prev-btn",
      "next-btn", "progress-fill", "progress-percent", "progress-text", "copy-example", "code-editor", "run-code-btn", "reset-code-btn", "console-output",
      "final-quiz-modal", "close-final-quiz", "final-question-area", "final-progress-fill", "final-next-btn", "playground-section"];
  const el = Object.fromEntries(IDS.map((id) => [id, $(id)]));
  const missing = IDS.filter((id) => !el[id]);
  if (missing.length) throw new Error("page markup lacks: " + missing.join(", "));
  let UI = lang === "en" ? UI_EN : UI_AR;
  let L = lite ? (lang === "en" ? LITE_EN : LITE_AR) : UI;

  let current = order[0];
  let starter = "";
  let runner = null, runId = 0;
  let finalIndex = 0, finalScore = 0, finalChoice = null, finalDone = false, opener = null;

  const numberOf = (id) => order.indexOf(id) + 1;
  const pad2 = (n) => String(n).padStart(2, "0");
  const isDone = (id) => progress.isCompleted(track.id, id);

  // ---------- static chrome (translated in place; the Arabic original is remembered so Arabic can be restored) ----------
  const DYNAMIC = new Set(["lesson-title", "content-title", "lesson-heading", "lesson-content", "lesson-nav", "lesson-counter", "lesson-status", "key-concept-text", "key-description",
    "practice-text", "challenge-text", "quiz-question", "quiz-options", "quiz-result", "complete-btn", "prev-btn", "next-btn", "progress-text", "console-output", "final-question-area", "final-next-btn", "example-code", "copy-example", "lesson-level"]);
  const originals = new WeakMap();
  function translateChrome() {
    const w = doc.createTreeWalker(doc.body, NodeFilter.SHOW_TEXT);
    const nodes = []; let n;
    while ((n = w.nextNode())) nodes.push(n);
    for (const node of nodes) {
      const p = node.parentElement;
      if (!p || p.closest("script,style,noscript") || p.closest("#lesson-content,#lesson-nav,#quiz-options,#final-question-area,#code-editor")) continue;
      if (p.id && DYNAMIC.has(p.id) && !/^(complete-btn|prev-btn|next-btn)$/.test(p.id)) continue;
      const orig = originals.get(node) ?? node.nodeValue;
      const key = squash(orig);
      if (!CHROME[key]) continue;
      originals.set(node, orig);
      node.nodeValue = lang === "en" ? CHROME[key] : orig;
    }
    for (const attr of ["aria-label", "title", "placeholder"]) doc.querySelectorAll(`[${attr}]`).forEach((e) => {
      const k = `__ar_${attr}`; const ar = e[k] ?? e.getAttribute(attr);
      if (!CHROME[squash(ar)]) return;
      e[k] = ar; e.setAttribute(attr, lang === "en" ? CHROME[squash(ar)] : ar);
    });
  }

  // ---------- course navigation (shared component) ----------
  let nav = null;
  const navMods = () => normalize(track, { assessments: assessment ? [{ id: "final", hash: "final", title: assessment.title }] : [] });
  function buildSidebar() {
    if (nav) { nav.setLang(lang); nav.rebuild(navMods()); return; }
    nav = createCourseNav({ doc, mount: el["lesson-nav"], courseId: track.id, courseTitle: t(track.title, lang), mods: navMods(), lang,
      titleOf: (id) => { const l = byId.get(id); return t(l.navTitle || l.title, lang); }, numberOf,
      isDone, isPassed: () => !!progress.assessment?.(track.id)?.passed, current: () => current,
      onSelect: (it) => { if (it.kind === "assessment") { setHash("#final"); openFinal(nav.root.querySelector(`[data-id="${it.id}"]`)); } else go(it.id); } });
  }
  function paintSidebar() { nav.reveal(); paintToggle(); }

  function paintProgress() {
    const done = order.filter(isDone).length;
    const percent = Math.round((done / total) * 100);
    el["progress-fill"].style.width = `${percent}%`;
    if (lite) { el["progress-text"].textContent = `${percent}%`; return; }
    el["progress-percent"].textContent = `${percent}%`;
    el["progress-text"].textContent = percent === 0 ? UI.notStarted : percent < 50 ? UI.some(done, total) : percent < 100 ? UI.most(total - done) : UI.all;
  }

  function paintStatus() {
    const done = isDone(current);
    if (lite) el["lesson-status"].innerHTML = done ? L.completed : L.notCompleted; else el["lesson-status"].textContent = done ? UI.completed : UI.notCompleted;
    el["lesson-status"].classList.toggle("completed", done);
    el["complete-btn"].innerHTML = done ? L.completedBtn : L.completeBtn;
    el["complete-btn"].classList.toggle("completed", done);
  }

  function paintNav() {
    const i = numberOf(current);
    el["prev-btn"].disabled = i <= 1;
    el["next-btn"].disabled = false;
    el["next-btn"].innerHTML = i >= total ? (assessment ? UI.toFinal : L.end) : L.next;
    if (i >= total && !assessment) el["next-btn"].disabled = true;
  }

  // ---------- lesson ----------
  function setHash(h) { if (win.location.hash !== h) win.history.replaceState(null, "", h); }

  const FX = {
    ar: { qOf: (i, n) => `السؤال ${i} من ${n}`, nextQ: "السؤال التالي", why: "لماذا؟", check: "تحقق من حلّي", hint: "تلميح", solution: "اعرض الحل", reset: "استرجاع الكود الأولي", pass: "✓ أحسنت! الحل صحيح.", err: (m) => `✕ في الكود خطأ: ${m}`, timeout: "✕ انتهت مهلة التنفيذ. هل هناك حلقة لا تنتهي؟", nothing: "✕ لم يصل الاختبار إلى نتيجة. تأكد أن الكود يعمل حتى النهاية.", exTitle: "تمرين تفاعلي", solTitle: "الحل المقترح" },
    en: { qOf: (i, n) => `Question ${i} of ${n}`, nextQ: "Next question", why: "Why?", check: "Check my solution", hint: "Hint", solution: "Show solution", reset: "Restore starter code", pass: "✓ Well done! Your solution is correct.", err: (m) => `✕ Your code has an error: ${m}`, timeout: "✕ Execution timed out. Is there a loop that never ends?", nothing: "✕ The test did not reach a result. Make sure your code runs to the end.", exTitle: "Interactive exercise", solTitle: "Suggested solution" },
  };
  const questionsOf = (l) => [l.quiz[0], ...(l.quizMore || [])];

  function renderQuiz(l) {
    const qs = questionsOf(l); let qi = 0;
    const holder = el["quiz-result"].parentNode;
    holder.querySelectorAll(".fd-qmeta, .fd-explain, .fd-qnext").forEach((n) => n.remove());
    function show() {
      const q = qs[qi]; let answered = false;
      holder.querySelectorAll(".fd-qmeta, .fd-explain, .fd-qnext").forEach((n) => n.remove());
      if (qs.length > 1) { const m = doc.createElement("p"); m.className = "fd-qmeta"; m.textContent = FX[lang].qOf(qi + 1, qs.length); el["quiz-question"].before(m); }
      el["quiz-question"].textContent = t(q.question, lang);
      el["quiz-options"].textContent = "";
      el["quiz-result"].textContent = ""; el["quiz-result"].className = "quiz-result";
      q.options.forEach((o, i) => {
        const b = doc.createElement("button");
        b.type = "button"; b.className = "quiz-btn"; b.textContent = t(o, lang);
        b.addEventListener("click", () => {
          if (answered) return;
          answered = true;
          const ok = i === q.correct;
          try { progress.recordAnswer(track.id, l.id, qi, ok); } catch { /* storage problems never block the lesson */ }
          el["quiz-options"].querySelectorAll(".quiz-btn").forEach((x) => { if (lite) x.disabled = true; });
          if (ok) { b.classList.add("correct"); el["quiz-result"].textContent = lite ? L.correct : UI.correct; el["quiz-result"].classList.add("success"); }
          else {
            b.classList.add("wrong"); el["quiz-result"].textContent = lite ? L.wrong(t(q.options[q.correct], lang)) : UI.wrong; el["quiz-result"].classList.add("error");
            el["quiz-options"].children[q.correct]?.classList.add("correct");
          }
          if (q.explain) { const e = doc.createElement("p"); e.className = "fd-explain"; e.setAttribute("role", "note"); const st = doc.createElement("strong"); st.textContent = FX[lang].why + " "; e.append(st, t(q.explain, lang)); el["quiz-result"].after(e); }
          if (qi < qs.length - 1) { const n = doc.createElement("button"); n.type = "button"; n.className = "quiz-btn fd-qnext"; n.textContent = FX[lang].nextQ; n.addEventListener("click", () => { qi += 1; show(); el["quiz-question"].scrollIntoView?.({ block: "nearest" }); }); (el["quiz-result"].nextSibling?.classList?.contains("fd-explain") ? el["quiz-result"].nextSibling : el["quiz-result"]).after(n); n.focus(); }
        });
        el["quiz-options"].appendChild(b);
      });
    }
    show();
  }

  // ---------- auto-checked exercise (runs learner code + the lesson's test in the sandbox; never in this page) ----------
  function mountExercise(l) {
    doc.getElementById("fd-exercise")?.remove();
    const x = l.exercise; if (!x || lite) return;
    const box = doc.createElement("div"); box.id = "fd-exercise"; box.className = "fd-exercise";
    const h = doc.createElement("h4"); h.textContent = FX[lang].exTitle;
    const p = doc.createElement("p"); p.className = "fd-ex-prompt"; p.textContent = t(x.prompt, lang);
    const row = doc.createElement("div"); row.className = "fd-ex-actions";
    const mk = (txt, fn, cls = "") => { const b = doc.createElement("button"); b.type = "button"; b.className = "editor-btn " + cls; b.textContent = txt; b.addEventListener("click", fn); row.appendChild(b); return b; };
    const status = doc.createElement("p"); status.className = "fd-ex-status"; status.setAttribute("role", "status");
    const extra = doc.createElement("div"); extra.className = "fd-ex-extra";
    const say = (kind, msg) => { status.className = "fd-ex-status " + kind; status.textContent = msg; };
    let checker = null, fails = 0;
    mk(FX[lang].check, () => {
      const code = el["code-editor"].value; const lines = []; let err = null, timed = false, finished = false;
      for (const m of x.must || []) if (!new RegExp(m.re).test(code)) { fails += 1; say("bad", "✕ " + t(m.msg, lang)); return; }
      if (checker) checker.destroy();
      say("busy", "…");
      checker = createRunner(el["playground-section"], { runtime: "js", format: "json", title: "Check", timeoutMs: 3000,
        onConsole: (e) => { if (e.level !== "result") lines.push(e.text); }, onError: (e) => { if (err === null) err = e.message; },
        onStatus: (st) => {
          if (finished) return;
          if (st === "timeout") { finished = true; fails += 1; say("bad", FX[lang].timeout); return; }
          if (st !== "done") return; finished = true;
          if (err !== null) { fails += 1; say("bad", FX[lang].err(err)); return; }
          if (lines.includes("__OK")) { say("ok", FX[lang].pass); return; }
          const fb = lines.map((s) => /^__FB:(\d+)$/.exec(s)).find(Boolean);
          fails += 1; say("bad", fb && x.feedback[+fb[1]] ? "✕ " + t(x.feedback[+fb[1]], lang) : FX[lang].nothing);
        } });
      checker.run({ js: code + "\n;\n" + x.test });
    }, "run");
    mk(FX[lang].hint, () => { extra.textContent = ""; const q = doc.createElement("p"); q.className = "fd-ex-hint"; q.textContent = "💡 " + t(x.hint, lang); extra.appendChild(q); });
    mk(FX[lang].solution, () => { extra.textContent = ""; const hd = doc.createElement("p"); hd.className = "fd-ex-hint"; hd.textContent = FX[lang].solTitle; const pre = doc.createElement("pre"); pre.className = "fd-code"; pre.dir = "ltr"; pre.textContent = x.solution; extra.append(hd, pre); });
    mk(FX[lang].reset, () => { el["code-editor"].value = x.starter; say("", ""); });
    box.append(h, p, row, status, extra);
    el["challenge-text"].closest(".challenge-box").after(box);
  }

  function loadEditor(code) {
    starter = code;
    el["code-editor"].value = code;
    setConsole(null, UI.placeholder, true);
  }

  function setConsole(color, text, placeholder) {
    const c = el["console-output"];
    c.textContent = "";
    if (placeholder) { const s = doc.createElement("span"); s.className = "console-placeholder"; s.textContent = text; c.appendChild(s); }
    else c.textContent = text;
    c.style.color = color || "";
  }

  // copy buttons of authored code examples (.code-ex) inside the lesson body
  el["lesson-content"].addEventListener("click", (e) => {
    const b = e.target.closest?.(".code-ex-copy"); if (!b) return;
    const code = b.closest(".code-ex")?.querySelector("code")?.textContent || "";
    const done = () => { const o = b.textContent; b.textContent = lang === "en" ? "Copied" : "تم النسخ"; setTimeout(() => { b.textContent = o; }, 1500); };
    try { win.navigator.clipboard.writeText(code).then(done, () => {}); } catch { /* clipboard unavailable: nothing to do */ }
  });

  function render(scroll) {
    const l = byId.get(current);
    runId += 1; if (runner) { runner.destroy(); runner = null; } // a pending run from the previous lesson must not report here
    el["lesson-counter"].textContent = L.lessonOf(numberOf(current), total);
    el["lesson-title"].textContent = t(l.title, lang);
    el["lesson-content"].innerHTML = t(l.body, lang) + (l.deep ? t(l.deep, lang) : ""); // authored, trusted content
    if (lite) {
      el["content-title"].textContent = t(l.title, lang);
      el["lesson-icon"].innerHTML = `<i class="fa-solid ${l.icon}"></i>`;
      el["key-concept-text"].textContent = t(l.key, lang);
      el["practice-text"].textContent = t(l.practice.prompt, lang);
      renderQuiz(l);
    } else {
      el["lesson-heading"].textContent = t(l.heading, lang);
      el["lesson-icon"].className = `fa-solid ${l.icon}`;
      el["lesson-level"].textContent = t(l.level, lang);
      el["key-description"].textContent = t(l.key, lang);
      el["example-code"].textContent = l.example.code;
      el["challenge-text"].textContent = t(l.challenge, lang);
      if (!l.exercise) doc.getElementById("fd-exercise")?.remove();
      renderQuiz(l); loadEditor(l.exercise ? l.exercise.starter : l.example.code); mountExercise(l);
    }
    paintStatus(); paintNav(); paintSidebar(); paintProgress();
    setHash(`#lesson-${numberOf(current)}`);
    if (scroll) win.scrollTo({ top: 0, behavior: "smooth" });
  }

  function go(id, scroll = true) {
    if (!byId.has(id)) return false;
    current = id;
    try { progress.setCurrent(track.id, id); } catch { /* ignore */ }
    render(scroll);
    return true;
  }

  function completeLesson() {
    try { progress.markCompleted(track.id, current); } catch { /* ignore */ }
    paintProgress(); paintStatus(); paintSidebar();
    if (!lite) setTimeout(() => { if (numberOf(current) < total) el["next-btn"].focus(); }, 300);
  }

  // ---------- sandboxed execution ----------
  function run() {
    const my = ++runId;
    const lines = [];
    let err = null, timedOut = false;
    setConsole("#facc15", UI.running);
    if (runner) runner.destroy();
    runner = createRunner(el["playground-section"], {
      runtime: "js", format: "json", title: "Console", timeoutMs: 3000,
      onConsole: (e) => { if (my !== runId || e.level === "result") return; lines.push(e.level === "error" ? `Error: ${e.text}` : e.text); },
      onError: (e) => { if (my === runId && err === null) err = e.message; },
      onStatus: (st) => {
        if (my !== runId) return;
        if (st === "timeout") { timedOut = true; setConsole("#fca5a5", UI.timedOut); return; }
        if (st !== "done") return;
        if (timedOut) return;
        if (err !== null) setConsole("#fca5a5", `✕ ${err}`);
        else if (!lines.length) setConsole("#34d399", UI.noOutput);
        else setConsole("#34d399", lines.join("\n"));
      },
    });
    runner.run({ js: el["code-editor"].value }); // never executed in this page
  }

  async function copyExample() {
    try {
      await win.navigator.clipboard.writeText(el["example-code"].textContent);
      el["copy-example"].innerHTML = UI.copied;
      setTimeout(() => { el["copy-example"].innerHTML = UI.copy; }, 1500);
    } catch { el["copy-example"].textContent = UI.copyFailed; }
  }

  // ---------- final assessment ----------
  const modal = el["final-quiz-modal"] || null; // only the full profile has the assessment dialog

  function openFinal(from) {
    if (!assessment) return;
    opener = from || doc.activeElement;
    finalIndex = 0; finalScore = 0; finalChoice = null; finalDone = false;
    modal.classList.remove("hidden");
    modal.setAttribute("role", "dialog"); modal.setAttribute("aria-modal", "true"); modal.setAttribute("aria-label", t(assessment.title, lang));
    doc.body.style.overflow = "hidden";
    renderFinal();
    el["final-next-btn"].focus();
  }

  function closeFinal() {
    modal.classList.add("hidden");
    doc.body.style.overflow = "";
    if (win.location.hash === "#final") setHash(`#lesson-${numberOf(current)}`);
    if (opener && opener.focus) opener.focus();
  }

  function renderFinal() {
    const q = assessment.questions[finalIndex];
    finalChoice = null;
    const area = el["final-question-area"];
    area.textContent = "";
    const head = doc.createElement("div"); head.className = "final-question"; head.textContent = `${finalIndex + 1}. ${t(q.question, lang)}`;
    const opts = doc.createElement("div"); opts.className = "final-options";
    q.options.forEach((o, i) => {
      const b = doc.createElement("button");
      b.type = "button"; b.className = "final-option"; b.dataset.index = String(i); b.textContent = t(o, lang);
      b.addEventListener("click", () => {
        opts.querySelectorAll(".final-option").forEach((x) => { x.classList.remove("selected"); x.setAttribute("aria-pressed", "false"); });
        b.classList.add("selected"); b.setAttribute("aria-pressed", "true"); finalChoice = i;
      });
      opts.appendChild(b);
    });
    area.append(head, opts);
    el["final-progress-fill"].style.width = `${(finalIndex / assessment.questions.length) * 100}%`;
    el["final-next-btn"].textContent = finalIndex === assessment.questions.length - 1 ? UI.finish : UI.nextQuestion;
  }

  function nextFinal() {
    if (finalDone) { closeFinal(); return; }
    if (finalChoice === null) {
      el["final-question-area"].animate([{ transform: "translateX(0)" }, { transform: "translateX(-5px)" }, { transform: "translateX(5px)" }, { transform: "translateX(0)" }], { duration: 250 });
      return;
    }
    if (finalChoice === assessment.questions[finalIndex].correct) finalScore += 1;
    finalIndex += 1;
    if (finalIndex >= assessment.questions.length) finishFinal(); else renderFinal();
  }

  function finishFinal() {
    const n = assessment.questions.length;
    const percentage = Math.round((finalScore / n) * 100);
    const message = UI.msgs.find(([min]) => percentage >= min)[1];
    el["final-progress-fill"].style.width = "100%";
    const area = el["final-question-area"];
    area.textContent = "";
    const icon = doc.createElement("div"); icon.className = "final-icon"; icon.innerHTML = '<i class="fa-solid fa-trophy"></i>';
    const h = doc.createElement("h3"); h.style.cssText = "color:#fff;margin-bottom:10px;"; h.textContent = UI.result;
    const score = doc.createElement("p"); score.style.cssText = "color:#34d399;font-size:2rem;font-weight:800;"; score.textContent = `${finalScore} / ${n}`; score.dir = "ltr";
    const pct = doc.createElement("p"); pct.style.cssText = "color:#94a3b8;margin-top:10px;"; pct.textContent = `${percentage}%`;
    const msg = doc.createElement("p"); msg.style.cssText = "color:#d1d5db;margin-top:15px;"; msg.textContent = message; msg.setAttribute("role", "status");
    area.append(icon, h, score, pct, msg);
    el["final-next-btn"].textContent = UI.close;
    finalDone = true;
    try { progress.recordAssessment(track.id, percentage, percentage >= assessment.passPercent); } catch { /* never blocks the result screen */ }
    if (percentage >= assessment.passPercent) {
      // legacy rule: passing the final assessment marks every lesson complete
      for (const id of order) { try { progress.markCompleted(track.id, id); } catch { /* ignore */ } }
      paintProgress(); paintStatus(); paintSidebar();
    }
  }

  // ---------- wiring ----------
  function fromHash() {
    const h = win.location.hash;
    if (h === "#final") return "final";
    const m = /^#lesson-(\d+)$/.exec(h);
    return m && order[Number(m[1]) - 1] ? order[Number(m[1]) - 1] : null;
  }

  // legacy pages ship a plain <aside>: give it the same collapsible behaviour (bottom sheet on phones) as the generic course pages
  function wireSidebarShell() {
    const aside = el["lesson-nav"].closest(".sidebar"); if (!aside) return;
    aside.setAttribute("data-cn", "");
    const panel = doc.createElement("div"); panel.className = "sb-panel"; panel.id = "sidebarPanel";
    const toggle = doc.createElement("button"); toggle.type = "button"; toggle.className = "sidebar-toggle"; toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-controls", "sidebarPanel");
    const lab = doc.createElement("span"); const cur = doc.createElement("strong"); toggle.append(lab, cur);
    el["lesson-nav"].before(panel); panel.appendChild(el["lesson-nav"]); panel.before(toggle);
    const close = () => { aside.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); doc.body.classList.remove("sb-lock"); };
    toggle.addEventListener("click", () => { const o = aside.classList.toggle("open"); toggle.setAttribute("aria-expanded", String(o)); doc.body.classList.toggle("sb-lock", o && win.matchMedia("(max-width:900px)").matches); });
    aside.addEventListener("click", (e) => { if (e.target === aside) close(); });
    doc.addEventListener("keydown", (e) => { if (e.key === "Escape" && aside.classList.contains("open")) { close(); toggle.focus(); } });
    el["lesson-nav"].addEventListener("click", (e) => { if (e.target.closest(".cn-lesson, .cn-continue")) close(); });
    shell = { lab, cur };
  }
  let shell = null;
  function paintToggle() { if (!shell) return; shell.lab.textContent = lang === "en" ? "Lessons" : "الدروس"; shell.cur.textContent = `${pad2(numberOf(current))} · ${t((byId.get(current) || {}).navTitle || (byId.get(current) || {}).title, lang)}`; }

  function start() {
    wireSidebarShell(); buildSidebar();
    el["prev-btn"].addEventListener("click", () => { const i = numberOf(current); if (i > 1) go(order[i - 2]); });
    el["next-btn"].addEventListener("click", () => { const i = numberOf(current); if (i < total) go(order[i]); else { setHash("#final"); openFinal(el["next-btn"]); } });
    el["complete-btn"].addEventListener("click", completeLesson);
    if (!lite) {
      el["run-code-btn"].addEventListener("click", run);
      (win.requestIdleCallback || ((f) => win.setTimeout(f, 200)))(() => upgradeEditor(el["code-editor"], { language: "js", onRun: run }));
      el["reset-code-btn"].addEventListener("click", () => { el["code-editor"].value = starter; runId += 1; if (runner) { runner.destroy(); runner = null; } setConsole(null, UI.resetDone, true); });
      el["copy-example"].addEventListener("click", copyExample);
      el["close-final-quiz"].addEventListener("click", closeFinal);
      el["final-next-btn"].addEventListener("click", nextFinal);
      modal.querySelector(".modal-overlay")?.addEventListener("click", closeFinal);
      doc.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.classList.contains("hidden")) closeFinal(); });
    }
    win.addEventListener("hashchange", () => { const h = fromHash(); if (h === "final") openFinal(); else if (h && h !== current) go(h, false); });
    win.addEventListener("fayad:langchange", () => {
      lang = readLang();
      UI = lang === "en" ? UI_EN : UI_AR; L = lite ? (lang === "en" ? LITE_EN : LITE_AR) : UI;
      buildSidebar(); render(false); translateChrome();
      if (!lite && el["copy-example"]) el["copy-example"].innerHTML = UI.copy;
    });
    translateChrome();
    if (!lite && el["copy-example"]) el["copy-example"].innerHTML = UI.copy;
    const h = fromHash();
    const resume = progress.current(track.id);
    go(h && h !== "final" ? h : byId.has(resume) ? resume : order[0], false);
    if (h === "final") openFinal();
  }

  return { start, go, openFinal, run, get current() { return current; } };
}
