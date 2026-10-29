/*
  Shared course view (all "classic" lesson pages). Builds the page skeleton (course-shell.js), then binds state + progress.

  Runtimes (track.runtime):
    "dom-js"   learner JavaScript runs in the sandboxed runner against a small stage document; text output pane
    "js"       console-only JavaScript (Worker runtime)
    "html"     learner HTML is previewed live in the sandboxed runner
    "css"      learner CSS is applied to the track's demo markup (track.preview.html) in the sandboxed runner
    "sim-*"    simplified non-executing preview (js/engine/sims.js)
    "none"     no playground
  Learner code NEVER runs in this page. Authored lesson HTML (body, sections, explanation, result) is trusted site content
  shipped with the repo; everything else (titles, questions, options, learner output) is inserted as text.
  Language: content text objects ({ar, en}) fall back to Arabic; the interface comes from strings.js. Re-renders on "fayad:langchange".
*/
import { t } from "./schema.js";
import { strings } from "./strings.js";
import { buildShell } from "./course-shell.js";
import { sims } from "./sims.js";
import { create as createRunner } from "../playground/playground.js";

const DEFAULT_RESULT = "Hello FAYAD";
const BASE_PREVIEW_CSS = "body{font-family:Arial,Helvetica,sans-serif;padding:16px;line-height:1.7;color:#1b2b34;background:#fff}img{max-width:100%;height:auto}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ccc;padding:8px}a{color:#0066cc}";

export function mountCourse({ doc = document, track, lessons, state, lang: initialLang }) {
  const win = doc.defaultView;
  const readLang = () => (doc.documentElement.getAttribute("data-lang") === "en" ? "en" : "ar");
  let lang = initialLang || readLang();
  let S = strings(lang);
  const runtime = track.runtime;
  const hasPlayground = ["dom-js", "js", "html", "css"].includes(runtime) || runtime.startsWith("sim-");
  const livePreview = runtime === "html" || runtime === "css" || runtime.startsWith("sim-");

  const root = doc.getElementById("courseRoot");
  buildShell(doc, root, { editorLabel: track.editorLabel || "Code", multiPane: livePreview });
  const $ = (id) => doc.getElementById(id);
  const el = {};
  for (const id of ["sidebarGroups", "courseName", "progressLabel", "progressText", "progressFill", "lessonKicker", "lessonNumber", "lessonTitle", "lessonDescription",
    "lessonSections", "bodyCard", "lessonBody", "keyCard", "keyLabel", "keyText", "exampleCard", "exampleHeading", "copyButton", "exampleCode", "resultCard", "exampleResult",
    "jsResultStage", "explainCard", "exampleExplanation", "practiceCard", "practiceHeading", "practiceText", "jsEditor", "previewPanel", "previewHost", "previewNote",
    "runButton", "resetButton", "outputWrap", "output", "quizQuestionNumber", "quizTotalQuestions", "questionTitle", "answerOptions", "answerFeedback", "quizNextButton",
    "previousButton", "nextButton", "sidebar", "sidebarToggle", "sidebarCurrent"]) el[id] = $(id);

  const text = (v) => t(v, lang);
  const lessonTitle = (id) => text(lessons.find((l) => l.id === id)?.title);
  const navTitle = (id) => { const l = lessons.find((x) => x.id === id); return text(l?.navTitle || l?.title); };
  const numberOf = (id) => state.order.indexOf(id) + 1;
  const pad = (n) => String(n).padStart(2, "0");
  const courseName = () => text(track.title) || track.id;

  // ---------- chrome (interface text) ----------
  function applyChrome() {
    doc.querySelectorAll("[data-s]").forEach((n) => { n.textContent = S(n.getAttribute("data-s")); });
    doc.querySelectorAll("[data-s-attr]").forEach((n) => n.getAttribute("data-s-attr").split(";").forEach((p) => { const [a, k] = p.split(":"); n.setAttribute(a, S(k)); }));
    el.courseName.textContent = courseName();
    const pt = $("pathTitle"); if (pt) pt.textContent = S("path.title", { course: courseName() });
    doc.title = S("page.title", { course: courseName() });
    el.progressLabel.textContent = S("progress.label", { course: courseName() });
    el.sidebar.setAttribute("aria-label", S("sidebar.aria", { course: courseName() }));
    el.copyButton.textContent = S("copy"); el.runButton.textContent = S("run"); el.resetButton.textContent = S("reset");
    el.exampleHeading.textContent = text(track.exampleHeading) || S("example.heading");
    el.practiceHeading.textContent = text(track.practiceHeading) || "";
    el.practiceHeading.hidden = !el.practiceHeading.textContent;
    el.jsEditor.setAttribute("aria-label", S("editor.aria"));
  }

  // ---------- sidebar (built from data: every lesson is reachable) ----------
  const links = new Map();
  function buildSidebar() {
    el.sidebarGroups.textContent = ""; links.clear();
    for (const g of track.groups) {
      const wrap = doc.createElement("div"); wrap.className = "topic-group";
      const h = doc.createElement("h3"); h.textContent = text(g.title); wrap.appendChild(h);
      for (const id of g.lessons) {
        const n = numberOf(id);
        const a = doc.createElement("a");
        a.className = "lesson"; a.href = `#lesson-${n}`; a.dataset.lesson = String(n); a.dataset.id = id;
        const st = doc.createElement("span"); st.className = "lesson-status"; st.textContent = pad(n);
        const nm = doc.createElement("span"); nm.className = "lesson-name"; nm.textContent = navTitle(id);
        a.append(st, nm);
        a.addEventListener("click", (e) => { e.preventDefault(); go(id); closeSidebar(); win.scrollTo({ top: 0, behavior: "smooth" }); });
        wrap.appendChild(a); links.set(id, a);
      }
      el.sidebarGroups.appendChild(wrap);
    }
  }

  function paintSidebar() {
    el.sidebarCurrent.textContent = `${pad(numberOf(state.current))} · ${navTitle(state.current)}`;
    for (const [id, a] of links) {
      const active = id === state.current;
      a.classList.toggle("active", active);
      if (active) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      const st = a.querySelector(".lesson-status");
      st.classList.toggle("current", active);
      const done = state.isCompleted(id);
      st.classList.toggle("completed", done);
      st.textContent = done ? "✓" : pad(numberOf(id));
      a.dataset.done = done ? "true" : "false";
    }
  }

  function closeSidebar() { el.sidebar.classList.remove("open"); el.sidebarToggle.setAttribute("aria-expanded", "false"); }

  function paintProgress() { el.progressText.textContent = `${state.percent}%`; el.progressFill.style.width = `${state.percent}%`; }

  function paintNav() {
    const prev = state.prevId(), next = state.nextId();
    el.previousButton.disabled = !prev; el.nextButton.disabled = !next;
    el.previousButton.querySelector("strong").textContent = prev ? lessonTitle(prev) : S("nav.start");
    el.nextButton.querySelector("strong").textContent = next ? lessonTitle(next) : S("nav.end");
  }

  // ---------- lesson content ----------
  function renderSections(lesson) {
    el.lessonSections.textContent = "";
    for (const s of lesson.sections || []) {
      const card = doc.createElement("article"); card.className = "content-card";
      if (s.label) { const lab = doc.createElement("div"); lab.className = "info-label"; lab.textContent = text(s.label); card.appendChild(lab); }
      const h2 = doc.createElement("h2"); h2.textContent = text(s.title); card.appendChild(h2);
      const body = doc.createElement("div"); body.innerHTML = text(s.html); // authored, trusted content
      while (body.firstChild) card.appendChild(body.firstChild);
      el.lessonSections.appendChild(card);
    }
  }

  const starterOf = (l) => l.practice?.starterCode ?? l.example?.code ?? "";

  function renderLesson() {
    const l = state.lesson;
    stopRunners();
    el.lessonNumber.textContent = `${S("lesson.label")} ${pad(numberOf(l.id))}`;
    el.lessonKicker.textContent = l.kicker || ""; el.lessonKicker.hidden = !l.kicker;
    el.lessonTitle.textContent = text(l.title);
    el.lessonDescription.textContent = text(l.description); el.lessonDescription.hidden = !l.description;
    renderSections(l);
    el.lessonBody.innerHTML = l.body ? text(l.body) : ""; el.bodyCard.hidden = !l.body; // authored, trusted content
    el.keyLabel.textContent = l.key?.title ? text(l.key.title) : ""; el.keyLabel.hidden = !l.key?.title;
    el.keyText.textContent = l.key ? text(l.key.text ?? l.key) : ""; el.keyCard.hidden = !l.key;

    const ex = l.example;
    el.exampleCard.hidden = !ex;
    el.exampleCode.textContent = ex?.code ?? "";
    if (ex?.title) el.exampleHeading.textContent = text(ex.title); else el.exampleHeading.textContent = text(track.exampleHeading) || S("example.heading");

    const staticResult = ex?.result ? text(ex.result) : "";
    el.exampleResult.hidden = !staticResult; el.exampleResult.innerHTML = staticResult; // authored, trusted content
    el.jsResultStage.hidden = runtime !== "dom-js" && runtime !== "css";
    el.resultCard.hidden = !staticResult && el.jsResultStage.hidden;
    el.explainCard.hidden = !ex?.explanation;
    el.exampleExplanation.innerHTML = ex?.explanation ? text(ex.explanation) : ""; // authored, trusted content

    const showPractice = hasPlayground && (ex || l.practice);
    el.practiceCard.hidden = !showPractice;
    el.practiceText.textContent = l.practice?.prompt ? text(l.practice.prompt) : S("practice.hint");
    el.jsEditor.value = starterOf(l);
    el.previewPanel.hidden = !livePreview;
    el.outputWrap.hidden = livePreview;
    el.output.textContent = S("output.placeholder");

    paintSidebar(); paintProgress(); paintNav(); renderQuestion();
    if (win.location.hash !== `#lesson-${numberOf(l.id)}`) win.history.replaceState(null, "", `#lesson-${numberOf(l.id)}`);
    if (showPractice) run();
    if (runtime === "css" && ex) runExampleStage();
  }

  function go(id) { if (state.open(id)) renderLesson(); }

  // ---------- quiz ----------
  let order = []; // displayed order of option indexes (shuffled when track.quiz.shuffle)
  function renderQuestion() {
    const q = state.questionData;
    el.quizQuestionNumber.textContent = S("quiz.question", { n: state.question + 1 });
    el.quizTotalQuestions.textContent = String(state.questionCount);
    el.questionTitle.textContent = text(q.question);
    el.answerOptions.textContent = "";
    order = q.options.map((_, i) => i);
    if (track.quiz?.shuffle) for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    for (const i of order) {
      const b = doc.createElement("button"); b.type = "button"; b.textContent = text(q.options[i]); b.dataset.index = String(i);
      b.addEventListener("click", () => onAnswer(i, b));
      el.answerOptions.appendChild(b);
    }
    el.answerFeedback.textContent = ""; el.answerFeedback.className = "answer-feedback";
    el.quizNextButton.disabled = true;
    el.quizNextButton.textContent = state.isLastQuestion ? S("quiz.complete") : S("quiz.next");
  }

  function onAnswer(i, button) {
    const r = state.answer(i);
    if (r.ignored) return;
    if (!r.correct) {
      button.classList.add("wrong", "wrong-answer"); button.disabled = true;
      el.answerFeedback.textContent = S("quiz.wrong"); el.answerFeedback.className = "answer-feedback check-feedback wrong wrong-answer";
      return;
    }
    el.answerOptions.querySelectorAll("button").forEach((b) => { b.disabled = true; });
    button.classList.add("correct", "correct-answer");
    el.answerFeedback.textContent = S("quiz.correct"); el.answerFeedback.className = "answer-feedback check-feedback correct correct-answer";
    el.quizNextButton.disabled = false;
  }

  function onQuizNext() {
    const r = state.advance();
    if (r.type === "noop") return;
    if (r.type === "question") { renderQuestion(); return; }
    if (r.courseDone) {
      paintSidebar(); paintProgress();
      el.quizNextButton.disabled = true; el.quizNextButton.textContent = S("quiz.done");
      el.answerFeedback.textContent = S("quiz.doneMsg", { course: courseName() }); el.answerFeedback.className = "answer-feedback check-feedback correct correct-answer";
      return;
    }
    renderLesson();
    win.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- sandboxed execution ----------
  let runner = null, exampleRunner = null, runId = 0, inputTimer = null;
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  function stopRunners() { runId += 1; clearTimeout(inputTimer); if (runner) { runner.destroy(); runner = null; } if (exampleRunner) { exampleRunner.destroy(); exampleRunner = null; } }

  function themeColors() {
    const cs = win.getComputedStyle(doc.documentElement);
    return (cs.getPropertyValue("--fy-text").trim() || "#0d2830").replace(/[^#a-zA-Z0-9(),.%\s-]/g, "");
  }

  function stageDocument() {
    const css = `body{margin:0;padding:14px;font:16px/1.6 system-ui,"Segoe UI",Tahoma,sans-serif;color:${themeColors()};background:transparent;direction:${doc.dir || "rtl"}}` +
      "h1{font-size:1.15rem;margin:0 0 10px}p{margin:0 0 10px}button{font:inherit;padding:6px 14px;cursor:pointer}";
    const html = `<h1 id="lessonTitle">${esc(text(state.lesson.title))}</h1><p id="jsResult">${DEFAULT_RESULT}</p><button type="button" id="demoButton">${esc(S("stage.button"))}</button>`;
    return { css, html };
  }

  const demoHtml = () => (track.preview?.html ? text(track.preview.html) : "");

  function showOutput(msg) { el.output.textContent = msg; }

  function run() {
    const my = ++runId;
    clearTimeout(inputTimer);
    if (runner) { runner.destroy(); runner = null; }
    const code = el.jsEditor.value;

    if (runtime.startsWith("sim-")) { runSim(code); return; }

    if (runtime === "dom-js") { runDomJs(my, code); return; }

    if (runtime === "js") {
      const lines = []; let err = null, timedOut = false;
      showOutput(S("output.running"));
      runner = createRunner(el.previewHost, {
        runtime: "js", format: "text", title: S("preview.title"), timeoutMs: 3000,
        onConsole: (e) => { if (my === runId && e.level !== "result") lines.push(e.text); },
        onError: (e) => { if (my === runId && err === null) err = e.message; },
        onStatus: (st) => {
          if (my !== runId) return;
          if (st === "timeout") { timedOut = true; showOutput(S("output.timeout")); return; }
          if (st === "done" && !timedOut) showOutput(err !== null ? S("output.error", { message: err }) : lines.join("\n") || S("output.ran"));
        },
      });
      runner.run({ js: code });
      return;
    }

    // html / css: live preview, errors from the preview are shown in the output pane only when they happen
    el.outputWrap.hidden = true;
    runner = createRunner(el.previewHost, {
      runtime: "html", title: S("preview.title"), loopBudget: 5000000,
      onError: (e) => { if (my !== runId) return; el.outputWrap.hidden = false; showOutput(S("output.error", { message: e.message })); },
      onConsole: (e) => { if (my !== runId || e.level === "result") return; el.outputWrap.hidden = false; showOutput(e.text); },
    });
    if (runtime === "css") runner.run({ css: BASE_PREVIEW_CSS + code, html: demoHtml() });
    else runner.run({ css: BASE_PREVIEW_CSS, html: code });
  }

  function runDomJs(my, code) {
    const lines = []; let errorMsg = null, resultText = null, timedOut = false;
    showOutput(S("output.running"));
    el.jsResultStage.textContent = "";
    runner = createRunner(el.jsResultStage, {
      runtime: "html", title: S("preview.title"), collect: ["#jsResult"], loopBudget: 5000000,
      onConsole: (e) => { if (my === runId) lines.push(e.text); },
      onError: (e) => { if (my === runId && errorMsg === null) errorMsg = e.message; },
      onDom: (v) => { if (my === runId) resultText = v["#jsResult"]; },
      onStatus: (st) => {
        if (my !== runId) return;
        if (st === "timeout") { timedOut = true; showOutput(S("output.timeout")); return; }
        if (st !== "done" || timedOut) return;
        // a changed result element wins over console output; otherwise console; otherwise generic success
        let msg;
        if (errorMsg !== null) msg = S("output.error", { message: errorMsg });
        else if (resultText !== null && resultText !== DEFAULT_RESULT) msg = resultText;
        else msg = lines.join("\n") || S("output.ran");
        showOutput(msg);
      },
    });
    const { css, html } = stageDocument();
    runner.run({ css, html, js: code }); // learner code runs in the sandbox, never in this page
  }

  function runSim(code) {
    const r = sims[runtime](code);
    el.previewHost.textContent = "";
    el.previewNote.hidden = false; el.previewNote.textContent = S("preview.sim");
    const box = doc.createElement("div"); box.className = "sim-box";
    if (r.kind === "input") { const i = doc.createElement("input"); i.placeholder = r.text; i.setAttribute("aria-label", r.text); box.appendChild(i); }
    else box.textContent = r.text ?? S("output.ran");
    el.previewHost.appendChild(box);
    el.outputWrap.hidden = true;
  }

  // css lessons: the example itself is rendered (read-only) in the result card, in its own sandbox
  function runExampleStage() {
    if (exampleRunner) exampleRunner.destroy();
    el.jsResultStage.textContent = "";
    exampleRunner = createRunner(el.jsResultStage, { runtime: "html", title: S("preview.title") });
    exampleRunner.run({ css: BASE_PREVIEW_CSS + (state.lesson.example?.code ?? ""), html: demoHtml() });
    el.resultCard.hidden = false;
  }

  // ---------- wiring ----------
  async function copyCode() {
    const textToCopy = el.exampleCode.textContent;
    if (!textToCopy) return;
    const flash = (label) => { el.copyButton.textContent = label; setTimeout(() => { el.copyButton.textContent = S("copy"); }, 1500); };
    try { await win.navigator.clipboard.writeText(textToCopy); flash(S("copied")); } catch { flash(S("copyFailed")); }
  }

  function lessonFromHash() {
    const m = /^#lesson-(\d+)$/.exec(win.location.hash);
    return (m && state.order[Number(m[1]) - 1]) || null;
  }

  function start() {
    applyChrome(); buildSidebar();
    el.previousButton.addEventListener("click", () => { const id = state.prevId(); if (id) { go(id); win.scrollTo({ top: 0, behavior: "smooth" }); } });
    el.nextButton.addEventListener("click", () => { const id = state.nextId(); if (id) { go(id); win.scrollTo({ top: 0, behavior: "smooth" }); } });
    el.quizNextButton.addEventListener("click", onQuizNext);
    el.runButton.addEventListener("click", run);
    el.resetButton.addEventListener("click", () => { el.jsEditor.value = starterOf(state.lesson); el.output.textContent = S("output.placeholder"); run(); });
    el.copyButton.addEventListener("click", copyCode);
    el.sidebarToggle.addEventListener("click", () => { const open = el.sidebar.classList.toggle("open"); el.sidebarToggle.setAttribute("aria-expanded", String(open)); });
    doc.addEventListener("keydown", (e) => { if (e.key === "Escape") closeSidebar(); });
    if (livePreview) el.jsEditor.addEventListener("input", () => { clearTimeout(inputTimer); inputTimer = setTimeout(run, 450); });
    doc.addEventListener("keydown", (e) => {
      if (e.target && (e.target.tagName === "TEXTAREA" || e.target.tagName === "INPUT")) return;
      const rtl = doc.dir === "rtl";
      const prev = rtl ? "ArrowLeft" : "ArrowRight", next = rtl ? "ArrowRight" : "ArrowLeft";
      if (e.key === prev && state.prevId()) go(state.prevId());
      else if (e.key === next && state.nextId()) go(state.nextId());
    });
    win.addEventListener("hashchange", () => { const id = lessonFromHash(); if (id && id !== state.current) go(id); });
    win.addEventListener("fayad:langchange", () => { lang = readLang(); S = strings(lang); applyChrome(); buildSidebar(); renderLesson(); });
    go(lessonFromHash() || state.resumeId()); // deep links (#lesson-N) win over the saved resume position
  }

  return { start, go, run, destroy: stopRunners };
}
