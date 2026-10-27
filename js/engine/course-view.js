/*
  Course view: binds a course state machine to the existing course page markup (same ids/classes as the legacy
  JavaScript course, so the existing stylesheet keeps working) and runs learner code ONLY through the sandboxed
  runner. Nothing here uses eval / new Function, and learner text is only ever inserted with textContent.
  Authored lesson HTML (lesson.sections[].html, example.explanation) is trusted site content, never user input.
*/
import { t } from "./schema.js";
import { create as createRunner } from "../playground/playground.js";

const UI = {
  lesson: "الدرس",
  question: "السؤال",
  nextQuestion: "السؤال التالي",
  completeLesson: "إكمال الدرس",
  courseDone: "اكتمل المسار ✓",
  courseDoneMsg: (title) => `🎉 ممتاز! لقد أكملت جميع دروس ${title}.`,
  correct: "✓ إجابة صحيحة! أحسنت.",
  wrong: "✗ إجابة غير صحيحة، حاول مرة أخرى.",
  prevCourse: "CSS Learning",
  doneLabel: "اكتمل المسار",
  running: "جاري التشغيل...",
  ran: "تم تشغيل الكود بنجاح.",
  placeholder: "ستظهر النتيجة هنا.",
  error: (m) => `خطأ: ${m}`,
  copy: "نسخ", copied: "تم النسخ ✓", copyFailed: "فشل النسخ",
  stageButton: "زر تجريبي",
  timedOut: "تم إيقاف التنفيذ: استغرق الكود وقتًا طويلًا.",
};
const DEFAULT_RESULT = "Hello FAYAD";

export function mountCourse({ doc = document, track, lessons, state, lang = "ar" }) {
  const $ = (id) => doc.getElementById(id);
  const el = {
    groups: $("sidebarGroups"), sections: $("lessonSections"), lessonNumber: $("lessonNumber"), title: $("lessonTitle"),
    description: $("lessonDescription"), code: $("exampleCode"), explanation: $("exampleExplanation"), editor: $("jsEditor"),
    run: $("runButton"), reset: $("resetButton"), copy: $("copyButton"), output: $("output"), stage: $("jsResultStage"),
    progressText: $("progressText"), progressFill: $("progressFill"), prev: $("previousButton"), next: $("nextButton"),
    qNumber: $("quizQuestionNumber"), qTotal: $("quizTotalQuestions"), qTitle: $("questionTitle"), options: $("answerOptions"),
    feedback: $("answerFeedback"), quizNext: $("quizNextButton"),
  };
  const lessonTitle = (id) => t(lessons.find((l) => l.id === id)?.title, lang);
  const numberOf = (id) => state.order.indexOf(id) + 1;
  const pad = (n) => String(n).padStart(2, "0");

  // ---------- sidebar (built from data: every lesson is reachable) ----------
  const links = new Map();
  function buildSidebar() {
    el.groups.textContent = "";
    for (const g of track.groups) {
      const wrap = doc.createElement("div"); wrap.className = "topic-group";
      const h = doc.createElement("h3"); h.textContent = t(g.title, lang); wrap.appendChild(h);
      for (const id of g.lessons) {
        const n = numberOf(id);
        const a = doc.createElement("a");
        a.className = "lesson"; a.href = `#lesson-${n}`; a.dataset.lesson = String(n); a.dataset.id = id;
        const st = doc.createElement("span"); st.className = "lesson-status"; st.textContent = pad(n);
        const nm = doc.createElement("span"); nm.className = "lesson-name"; nm.textContent = lessonTitle(id);
        a.append(st, nm);
        a.addEventListener("click", (e) => { e.preventDefault(); go(id); window.scrollTo({ top: 0, behavior: "smooth" }); });
        wrap.appendChild(a); links.set(id, a);
      }
      el.groups.appendChild(wrap);
    }
  }

  function paintSidebar() {
    for (const [id, a] of links) {
      const active = id === state.current;
      a.classList.toggle("active", active);
      if (active) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      const st = a.querySelector(".lesson-status");
      st.classList.toggle("current", active);
      const done = state.isCompleted(id);
      st.classList.toggle("completed", done);
      st.textContent = done ? "✓" : pad(numberOf(id));
    }
  }

  function paintProgress() {
    el.progressText.textContent = `${state.percent}%`;
    el.progressFill.style.width = `${state.percent}%`;
  }

  function paintNav() {
    const prev = state.prevId(), next = state.nextId();
    el.prev.disabled = !prev; el.next.disabled = !next;
    el.prev.querySelector("strong").textContent = prev ? lessonTitle(prev) : UI.prevCourse;
    el.next.querySelector("strong").textContent = next ? lessonTitle(next) : UI.doneLabel;
  }

  // ---------- lesson content ----------
  function renderSections(lesson) {
    el.sections.textContent = "";
    for (const s of lesson.sections || []) {
      const card = doc.createElement("article"); card.className = "content-card";
      if (s.label) { const lab = doc.createElement("div"); lab.className = "info-label"; lab.textContent = t(s.label, lang); card.appendChild(lab); }
      const h2 = doc.createElement("h2"); h2.textContent = t(s.title, lang); card.appendChild(h2);
      const body = doc.createElement("div"); body.innerHTML = t(s.html, lang); // authored, trusted content
      while (body.firstChild) card.appendChild(body.firstChild);
      el.sections.appendChild(card);
    }
  }

  function renderLesson() {
    const l = state.lesson;
    el.lessonNumber.textContent = `${UI.lesson} ${pad(numberOf(l.id))}`;
    el.title.textContent = t(l.title, lang);
    el.description.textContent = t(l.description, lang);
    renderSections(l);
    const code = l.example?.code ?? "";
    el.code.textContent = code;
    el.explanation.innerHTML = l.example?.explanation ? t(l.example.explanation, lang) : ""; // authored, trusted content
    el.editor.value = l.practice?.starterCode ?? code;
    paintSidebar(); paintProgress(); paintNav(); renderQuestion();
    if (doc.defaultView.location.hash !== `#lesson-${numberOf(l.id)}`) doc.defaultView.history.replaceState(null, "", `#lesson-${numberOf(l.id)}`);
    run();
  }

  function go(id) {
    if (state.open(id)) renderLesson();
  }

  // ---------- quiz ----------
  function renderQuestion() {
    const q = state.questionData;
    el.qNumber.textContent = `${UI.question} ${state.question + 1}`;
    el.qTotal.textContent = String(state.questionCount);
    el.qTitle.textContent = t(q.question, lang);
    el.options.textContent = "";
    q.options.forEach((o, i) => {
      const b = doc.createElement("button"); b.type = "button"; b.textContent = t(o, lang); b.dataset.index = String(i);
      b.addEventListener("click", () => onAnswer(i, b));
      el.options.appendChild(b);
    });
    el.feedback.textContent = ""; el.feedback.className = "answer-feedback";
    el.quizNext.disabled = true;
    el.quizNext.textContent = state.isLastQuestion ? UI.completeLesson : UI.nextQuestion;
  }

  function onAnswer(i, button) {
    const r = state.answer(i);
    if (r.ignored) return;
    if (!r.correct) {
      button.classList.add("wrong", "wrong-answer");
      el.feedback.textContent = UI.wrong; el.feedback.className = "answer-feedback check-feedback wrong wrong-answer";
      return;
    }
    el.options.querySelectorAll("button").forEach((b) => { b.disabled = true; });
    button.classList.add("correct", "correct-answer");
    el.feedback.textContent = UI.correct; el.feedback.className = "answer-feedback check-feedback correct correct-answer";
    el.quizNext.disabled = false;
  }

  function onQuizNext() {
    const r = state.advance();
    if (r.type === "noop") return;
    if (r.type === "question") { renderQuestion(); return; }
    if (r.courseDone) {
      paintSidebar(); paintProgress();
      el.quizNext.disabled = true; el.quizNext.textContent = UI.courseDone;
      el.feedback.textContent = UI.courseDoneMsg(t(track.title, lang) || "JavaScript"); el.feedback.className = "answer-feedback check-feedback correct correct-answer";
      return;
    }
    renderLesson();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- sandboxed execution ----------
  let runner = null, runId = 0;
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  function stageDocument() {
    const cs = doc.defaultView.getComputedStyle(doc.documentElement);
    const color = (cs.getPropertyValue("--fy-text").trim() || "#0d2830").replace(/[^#a-zA-Z0-9(),.%\s-]/g, "");
    const css = `body{margin:0;padding:14px;font:16px/1.6 system-ui,"Segoe UI",Tahoma,sans-serif;color:${color};background:transparent;direction:${doc.dir || "rtl"}}` +
      "h1{font-size:1.15rem;margin:0 0 10px}p{margin:0 0 10px}button{font:inherit;padding:6px 14px;cursor:pointer}";
    // The DOM that learner code operates on (lessons use #lessonTitle, h1, #jsResult and the first button).
    const html = `<h1 id="lessonTitle">${esc(t(state.lesson.title, lang))}</h1><p id="jsResult">${DEFAULT_RESULT}</p><button type="button" id="demoButton">${esc(UI.stageButton)}</button>`;
    return { css, html };
  }

  function run() {
    const my = ++runId;
    const lines = [];
    let errorMsg = null, resultText = null;
    el.output.textContent = UI.running;
    if (runner) runner.destroy();
    el.stage.textContent = "";
    runner = createRunner(el.stage, {
      runtime: "html", title: "نتيجة الكود", collect: ["#jsResult"], loopBudget: 5000000,
      onConsole: (e) => { if (my === runId) lines.push(e.text); },
      onError: (e) => { if (my === runId && errorMsg === null) errorMsg = e.message; },
      onDom: (v) => { if (my === runId) resultText = v["#jsResult"]; },
      onStatus: (st) => {
        if (my !== runId || st !== "done") return;
        // legacy precedence: a changed result element wins over console output; otherwise console; otherwise generic success
        let text;
        if (errorMsg !== null) text = UI.error(errorMsg);
        else if (resultText !== null && resultText !== DEFAULT_RESULT) text = resultText;
        else text = lines.join("\n") || UI.ran;
        el.output.textContent = text;
      },
    });
    const { css, html } = stageDocument();
    runner.run({ css, html, js: el.editor.value }); // learner code runs in the sandbox, never in this page
  }

  // ---------- wiring ----------
  async function copyCode() {
    const text = el.code.textContent;
    if (!text) return;
    const flash = (label) => { el.copy.textContent = label; setTimeout(() => { el.copy.textContent = UI.copy; }, 1500); };
    try { await doc.defaultView.navigator.clipboard.writeText(text); flash(UI.copied); } catch { flash(UI.copyFailed); }
  }

  function lessonFromHash() {
    const m = /^#lesson-(\d+)$/.exec(doc.defaultView.location.hash);
    const id = m ? state.order[Number(m[1]) - 1] : null;
    return id || null;
  }

  function start() {
    buildSidebar();
    el.prev.addEventListener("click", () => { const id = state.prevId(); if (id) { go(id); window.scrollTo({ top: 0, behavior: "smooth" }); } });
    el.next.addEventListener("click", () => { const id = state.nextId(); if (id) { go(id); window.scrollTo({ top: 0, behavior: "smooth" }); } });
    el.quizNext.addEventListener("click", onQuizNext);
    el.run.addEventListener("click", run);
    el.reset.addEventListener("click", () => { el.editor.value = state.lesson.practice?.starterCode ?? state.lesson.example?.code ?? ""; el.output.textContent = UI.placeholder; run(); });
    el.copy.addEventListener("click", copyCode);
    doc.addEventListener("keydown", (e) => {
      if (e.target && (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT")) return;
      const rtl = doc.dir === "rtl";
      const prev = rtl ? "ArrowLeft" : "ArrowRight", next = rtl ? "ArrowRight" : "ArrowLeft";
      if (e.key === prev && state.prevId()) go(state.prevId());
      else if (e.key === next && state.nextId()) go(state.nextId());
    });
    doc.defaultView.addEventListener("hashchange", () => { const id = lessonFromHash(); if (id && id !== state.current) go(id); });
    go(lessonFromHash() || state.resumeId()); // deep links (#lesson-N) win over the saved resume position
  }

  return { start, go, run, destroy: () => runner && runner.destroy() };
}
