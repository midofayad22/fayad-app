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

const UI = {
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

export function mountFoundation({ doc = document, track, lessons, progress, lang = "ar" }) {
  const $ = (id) => doc.getElementById(id);
  const win = doc.defaultView;
  const order = orderedIds(track);
  const byId = new Map(lessons.map((l) => [l.id, l]));
  const total = order.length;
  const assessment = track.assessment;
  const el = Object.fromEntries(["lesson-nav", "lesson-counter", "lesson-title", "lesson-heading", "lesson-content", "lesson-icon", "lesson-level",
    "lesson-status", "key-description", "example-code", "quiz-question", "quiz-options", "quiz-result", "challenge-text", "complete-btn", "prev-btn",
    "next-btn", "progress-fill", "progress-percent", "progress-text", "copy-example", "code-editor", "run-code-btn", "reset-code-btn", "console-output",
    "final-quiz-modal", "close-final-quiz", "final-question-area", "final-progress-fill", "final-next-btn", "playground-section"].map((id) => [id, $(id)]));

  let current = order[0];
  let starter = "";
  let runner = null, runId = 0;
  let finalIndex = 0, finalScore = 0, finalChoice = null, finalDone = false, opener = null;

  const numberOf = (id) => order.indexOf(id) + 1;
  const pad2 = (n) => String(n).padStart(2, "0");
  const isDone = (id) => progress.isCompleted(track.id, id);

  // ---------- sidebar (built from data: every lesson + the final assessment is reachable) ----------
  function buildSidebar() {
    el["lesson-nav"].textContent = "";
    order.forEach((id, i) => {
      const l = byId.get(id);
      const b = doc.createElement("button");
      b.type = "button"; b.className = "lesson-item"; b.dataset.lesson = String(i + 1);
      const num = doc.createElement("span"); num.className = "lesson-number"; num.textContent = pad2(i + 1);
      const name = doc.createElement("span"); name.textContent = t(l.navTitle || l.title, lang);
      b.append(num, name);
      b.addEventListener("click", () => go(id));
      el["lesson-nav"].appendChild(b);
    });
    if (assessment) {
      const b = doc.createElement("button");
      b.type = "button"; b.className = "lesson-item final-item"; b.dataset.lesson = "final";
      const num = doc.createElement("span"); num.className = "lesson-number"; num.innerHTML = '<i class="fa-solid fa-trophy"></i>';
      const name = doc.createElement("span"); name.textContent = t(assessment.title, lang);
      b.append(num, name);
      b.addEventListener("click", () => { setHash("#final"); openFinal(b); });
      el["lesson-nav"].appendChild(b);
    }
  }

  function paintSidebar() {
    el["lesson-nav"].querySelectorAll(".lesson-item").forEach((b) => {
      const n = b.dataset.lesson;
      if (n === "final") return;
      const id = order[Number(n) - 1];
      const done = isDone(id);
      b.classList.toggle("active", id === current);
      b.classList.toggle("completed", done);
      if (id === current) b.setAttribute("aria-current", "true"); else b.removeAttribute("aria-current");
      const num = b.querySelector(".lesson-number");
      if (done) num.innerHTML = '<i class="fa-solid fa-check"></i>'; else num.textContent = pad2(Number(n));
    });
  }

  function paintProgress() {
    const done = order.filter(isDone).length;
    const percent = Math.round((done / total) * 100);
    el["progress-fill"].style.width = `${percent}%`;
    el["progress-percent"].textContent = `${percent}%`;
    el["progress-text"].textContent = percent === 0 ? UI.notStarted : percent < 50 ? UI.some(done, total) : percent < 100 ? UI.most(total - done) : UI.all;
  }

  function paintStatus() {
    const done = isDone(current);
    el["lesson-status"].textContent = done ? UI.completed : UI.notCompleted;
    el["lesson-status"].classList.toggle("completed", done);
    el["complete-btn"].innerHTML = done ? UI.completedBtn : UI.completeBtn;
    el["complete-btn"].classList.toggle("completed", done);
  }

  function paintNav() {
    const i = numberOf(current);
    el["prev-btn"].disabled = i <= 1;
    el["next-btn"].disabled = false;
    el["next-btn"].innerHTML = i >= total ? UI.toFinal : UI.next;
    if (i >= total && !assessment) el["next-btn"].disabled = true;
  }

  // ---------- lesson ----------
  function setHash(h) { if (win.location.hash !== h) win.history.replaceState(null, "", h); }

  function renderQuiz(l) {
    const q = l.quiz[0];
    el["quiz-question"].textContent = t(q.question, lang);
    el["quiz-options"].textContent = "";
    el["quiz-result"].textContent = ""; el["quiz-result"].className = "quiz-result";
    let answered = false;
    q.options.forEach((o, i) => {
      const b = doc.createElement("button");
      b.type = "button"; b.className = "quiz-btn"; b.textContent = t(o, lang);
      b.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        const ok = i === q.correct;
        try { progress.recordAnswer(track.id, l.id, 0, ok); } catch { /* storage problems never block the lesson */ }
        if (ok) { b.classList.add("correct"); el["quiz-result"].textContent = UI.correct; el["quiz-result"].classList.add("success"); }
        else {
          b.classList.add("wrong"); el["quiz-result"].textContent = UI.wrong; el["quiz-result"].classList.add("error");
          el["quiz-options"].children[q.correct]?.classList.add("correct");
        }
      });
      el["quiz-options"].appendChild(b);
    });
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

  function render(scroll) {
    const l = byId.get(current);
    runId += 1; if (runner) { runner.destroy(); runner = null; } // a pending run from the previous lesson must not report here
    el["lesson-counter"].textContent = UI.lessonOf(numberOf(current), total);
    el["lesson-title"].textContent = t(l.title, lang);
    el["lesson-heading"].textContent = t(l.heading, lang);
    el["lesson-icon"].className = `fa-solid ${l.icon}`;
    el["lesson-level"].textContent = t(l.level, lang);
    el["lesson-content"].innerHTML = t(l.body, lang); // authored, trusted content
    el["key-description"].textContent = t(l.key, lang);
    el["example-code"].textContent = l.example.code;
    el["challenge-text"].textContent = t(l.challenge, lang);
    renderQuiz(l); loadEditor(l.example.code);
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
    setTimeout(() => { if (numberOf(current) < total) el["next-btn"].focus(); }, 300);
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
  const modal = el["final-quiz-modal"];

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

  function start() {
    buildSidebar();
    el["prev-btn"].addEventListener("click", () => { const i = numberOf(current); if (i > 1) go(order[i - 2]); });
    el["next-btn"].addEventListener("click", () => { const i = numberOf(current); if (i < total) go(order[i]); else { setHash("#final"); openFinal(el["next-btn"]); } });
    el["complete-btn"].addEventListener("click", completeLesson);
    el["run-code-btn"].addEventListener("click", run);
    el["reset-code-btn"].addEventListener("click", () => { el["code-editor"].value = starter; runId += 1; if (runner) { runner.destroy(); runner = null; } setConsole(null, UI.resetDone, true); });
    el["copy-example"].addEventListener("click", copyExample);
    el["close-final-quiz"].addEventListener("click", closeFinal);
    el["final-next-btn"].addEventListener("click", nextFinal);
    modal.querySelector(".modal-overlay")?.addEventListener("click", closeFinal);
    doc.addEventListener("keydown", (e) => { if (e.key === "Escape" && !modal.classList.contains("hidden")) closeFinal(); });
    win.addEventListener("hashchange", () => { const h = fromHash(); if (h === "final") openFinal(); else if (h && h !== current) go(h, false); });
    const h = fromHash();
    const resume = progress.current(track.id);
    go(h && h !== "final" ? h : byId.has(resume) ? resume : order[0], false);
    if (h === "final") openFinal();
  }

  return { start, go, openFinal, run, get current() { return current; } };
}
