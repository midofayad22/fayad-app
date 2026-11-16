/*
  Web Lab: the shared play screen for the games that teach real HTML / CSS / JavaScript (Zombie, and the next ones).
  A mission = authored scene + learner-editable HTML/CSS/JS + checks that read real computed styles / geometry / DOM state inside the sandbox.
  Flow: mini lesson (6 questions) → edit → run → checks → outcome class on the scene (fy-win / fy-lose) → points. Hints go idea → property → example → full solution.
*/
import { create as createRunner } from "/js/playground/playground.js";
import { upgradeEditor } from "/js/engine/editor.js";
import { read, award } from "/js/game/store.js";
import { BASE_POINTS, labFiles, parseChecks } from "/js/game/lab-lib.js";

const F = window.FAYAD;
const $ = (id) => document.getElementById(id);
const DICT = {
  ar: { "fq.home": "الرئيسية", "fq.hub": "الألعاب", "fq.dash": "لوحة التقدم", "fq.points": "نقاط اللعبة", "fq.hint": "تلميح", "fq.reset": "إعادة الضبط", "fq.next": "المهمة التالية",
    "ar.goal": "الهدف التعليمي:", "ar.checks": "المتطلبات", "ar.run": "تشغيل", "ar.preview": "المعاينة", "ar.empty": "شغّل الكود لترى النتيجة هنا", "ar.replay": "أعد المحاولة",
    "lab.lesson": "درس قصير", "lab.sol": "اعرض الحل", "lab.apply": "ضع الحل في المحرر", "lab.solT": "الحل المرجعي", "lab.alts": "توجد حلول أخرى صحيحة أيضًا: المهم أن تتحقق المتطلبات.", "lab.tut": "كيف تلعب", "lab.tutBody": "1) اقرأ الدرس القصير. 2) عدّل الكود في المحرر. 3) اضغط تشغيل: تتحول المتطلبات إلى ✓ عندما تتحقق، وعندها يتفاعل المشهد.",
    "lab.q.what": "ما هذا؟", "lab.q.does": "ماذا يفعل؟", "lab.q.why": "لماذا نستخدمه؟", "lab.q.how": "كيف أكتبه؟", "lab.q.expect": "ماذا أتوقع أن أرى؟", "lab.q.mistake": "الخطأ الشائع",
    sub: "{n} مهام من المبتدئ إلى الخبير", solved: "محلولة", running: "جارٍ التشغيل…", pass: "نجحت كل المتطلبات", fail: "لم تتحقق كل المتطلبات بعد", err: "خطأ: {m}", timeout: "توقف التنفيذ: حلقة لا تنتهي؟",
    win: "أحسنت! نجت الشخصيات", pts: "+{p} نقطة", again: "سبق أن حللتها، لا نقاط إضافية", noHint: "(+5 لأنك لم تستخدم تلميحًا)", hintLeft: "تلميح {i} من {n}", noMore: "لا مزيد من التلميحات",
    beginner: "مبتدئ", intermediate: "متوسط", advanced: "متقدم", expert: "خبير", missing: "المهمة غير موجودة", ctrl: "Ctrl+Enter للتشغيل" },
  en: { "fq.home": "Home", "fq.hub": "Games", "fq.dash": "Progress dashboard", "fq.points": "Game points", "fq.hint": "Hint", "fq.reset": "Reset", "fq.next": "Next mission",
    "ar.goal": "Learning goal:", "ar.checks": "Requirements", "ar.run": "Run", "ar.preview": "Preview", "ar.empty": "Run the code to see the result here", "ar.replay": "Try again",
    "lab.lesson": "Mini lesson", "lab.sol": "Show solution", "lab.apply": "Put the solution in the editor", "lab.solT": "Reference solution", "lab.alts": "Other correct solutions exist too: what matters is that the requirements pass.", "lab.tut": "How to play", "lab.tutBody": "1) Read the mini lesson. 2) Edit the code. 3) Press Run: requirements turn to ✓ when they pass, and the scene reacts.",
    "lab.q.what": "What is it?", "lab.q.does": "What does it do?", "lab.q.why": "Why use it?", "lab.q.how": "How do I write it?", "lab.q.expect": "What should I see?", "lab.q.mistake": "Common mistake",
    sub: "{n} missions from beginner to expert", solved: "solved", running: "Running…", pass: "All requirements passed", fail: "Not all requirements pass yet", err: "Error: {m}", timeout: "Execution stopped: endless loop?",
    win: "Well done! They survive", pts: "+{p} points", again: "Already solved, no extra points", noHint: "(+5 for no hints)", hintLeft: "Hint {i} of {n}", noMore: "No more hints",
    beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced", expert: "Expert", missing: "Mission not found", ctrl: "Ctrl+Enter to run" },
};
F?.i18n?.extend({ ar: DICT.ar, en: DICT.en });
const lang = () => (F?.i18n?.lang === "en" ? "en" : "ar");
const T = (k, p = {}) => String(DICT[lang()][k] ?? k).replace(/\{(\w+)\}/g, (_, x) => p[x] ?? "");
const L = (o) => (o && (o[lang()] ?? o.ar)) || "";
const Q = ["what", "does", "why", "how", "expect", "mistake"];

/** cfg: { game, missions, base(ch,i) } */
export function startLab(cfg) {
  const q = new URLSearchParams(location.search);
  let list = cfg.missions, idx = 0, ch = null, hints = 0, runner = null, runToken = 0, solved = false, usedSol = false;
  const areas = {};
  const base = cfg.base || ((c) => BASE_POINTS[c.level] || 10);

  function init() {
    $("arSub").textContent = T("sub", { n: list.length });
    const want = Number(q.get("c"));
    idx = want >= 1 && want <= list.length ? want - 1 : Math.max(0, list.findIndex((_, i) => !read().games[cfg.game]?.solved[i + 1]));
    paintLevels(); open(idx);
  }
  function paintLevels() {
    const d = read(), done = d.games[cfg.game]?.solved || {}, box = $("arLevels"); box.textContent = "";
    $("arPoints").textContent = d.points;
    list.forEach((c, i) => {
      const b = document.createElement("button"); b.type = "button"; b.setAttribute("role", "listitem");
      b.className = `ar-lv ar-lv-${c.level}` + (i === idx ? " is-cur" : "") + (done[i + 1] ? " is-done" : "");
      b.textContent = i + 1; b.title = `${T(c.level)} — ${L(c.title)}` + (done[i + 1] ? ` (${T("solved")})` : "");
      b.setAttribute("aria-label", b.title); b.addEventListener("click", () => open(i)); box.appendChild(b);
    });
  }
  function open(i) {
    idx = i; ch = list[i]; hints = 0; solved = false; usedSol = false; runToken++;
    history.replaceState(null, "", `?c=${i + 1}`);
    $("arGrid").hidden = false; $("arWin").hidden = true;
    $("arBadge").textContent = `${T(ch.level)} · ${ch.tech.toUpperCase()}`; $("arBadge").className = `ar-badge ar-lv-${ch.level}`;
    $("arTitle").textContent = L(ch.title); $("arGoal").textContent = L(ch.goal); $("arBrief").textContent = L(ch.brief);
    paintTeach(); paintChecks(null); $("arHints").textContent = ""; $("arStatus").textContent = ""; $("arConsole").textContent = "";
    buildEditors(); paintLevels(); stopRunner(); $("arPreview").classList.remove("is-live"); $("arEmpty").hidden = false;
    $("arHint").disabled = false; $("arSol").hidden = true;
  }
  function paintTeach() {
    const box = $("labTeach"); box.textContent = "";
    Q.forEach((k) => {
      const dt = document.createElement("dt"); dt.textContent = T("lab.q." + k);
      const dd = document.createElement("dd"); dd.textContent = L(ch.teach[k]);
      if (k === "how" || k === "mistake") dd.classList.add("lab-code");
      box.append(dt, dd);
    });
  }
  function paintChecks(res) {
    const ul = $("arChecks"); ul.textContent = "";
    ch.checks.forEach((c, i) => { const li = document.createElement("li"); li.textContent = L(c); const s = res ? res[i] : null; li.className = s === true ? "ok" : s === false ? "bad" : ""; ul.appendChild(li); });
  }
  function buildEditors() {
    const tabs = $("arTabs"), box = $("arEditors"); tabs.textContent = ""; box.textContent = "";
    ch.edit.forEach((name, n) => {
      const tab = document.createElement("button"); tab.type = "button"; tab.className = "ar-tab" + (n === 0 ? " is-on" : ""); tab.setAttribute("role", "tab"); tab.textContent = name === "js" ? "JavaScript" : name.toUpperCase(); tab.dataset.name = name;
      const pane = document.createElement("div"); pane.className = "ar-pane"; pane.hidden = n !== 0; pane.dataset.name = name;
      const ta = document.createElement("textarea"); ta.value = ch.files[name] || ""; ta.spellcheck = false; ta.dir = "ltr"; ta.className = "ar-ta"; ta.setAttribute("aria-label", name);
      ta.addEventListener("keydown", (e) => { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); run(); } });
      pane.appendChild(ta); box.appendChild(pane); tabs.appendChild(tab); areas[name] = ta;
      tab.addEventListener("click", () => { tabs.querySelectorAll(".ar-tab").forEach((t) => t.classList.toggle("is-on", t === tab)); box.querySelectorAll(".ar-pane").forEach((p) => (p.hidden = p.dataset.name !== name)); });
      upgradeEditor(ta, { language: name, onRun: run });
    });
  }
  const learner = () => Object.fromEntries(ch.edit.map((n) => [n, areas[n].value]));
  function setCode(name, text) { const ta = areas[name]; if (ta.__fyEditor) ta.__fyEditor.dispatch({ changes: { from: 0, to: ta.__fyEditor.state.doc.length, insert: text } }); ta.value = text; }
  function stopRunner() { if (runner) { runner.destroy(); runner = null; } $("arPreview").querySelectorAll("iframe").forEach((f) => f.remove()); }

  function run() {
    const my = ++runToken; stopRunner(); solved = false;
    const lines = []; let err = null, timedOut = false;
    $("arConsole").textContent = ""; $("arStatus").textContent = T("running"); $("arEmpty").hidden = true; $("arPreview").classList.add("is-live");
    runner = createRunner($("arPreview"), {
      runtime: "html", format: "text", title: T("ar.preview"), timeoutMs: 3000, loopBudget: 2000000,
      onConsole: (e) => { if (my === runToken) lines.push(e.text); },
      onError: (e) => { if (my === runToken && err === null) err = e.message; },
      onStatus: (st) => {
        if (my !== runToken) return;
        if (st === "timeout") { timedOut = true; $("arStatus").textContent = T("timeout"); return; }
        if (st !== "done" || timedOut) return;
        setTimeout(() => { if (my === runToken) finish(lines, err); }, 150);
      },
    });
    runner.run(labFiles(ch, learner()));
  }
  function finish(lines, err) {
    const res = parseChecks(lines, ch.checks.length); paintChecks(res);
    $("arConsole").textContent = lines.filter((l) => !l.startsWith("@@FY ")).join("\n");
    const ok = err === null && res.every((r) => r === true);
    $("arStatus").textContent = err !== null ? T("err", { m: err }) : ok ? T("pass") : T("fail");
    $("arStatus").className = "ar-status " + (ok ? "ok" : "bad");
    if (ok && !solved) { solved = true; setTimeout(() => { if (solved) win(); }, F?.reduced || matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1500); }
  }
  function win() {
    const hinted = hints > 0 || usedSol;
    const r = award(cfg.game, idx + 1, hinted, base(ch, idx));
    $("arPoints").textContent = r.data.points; paintLevels();
    $("arWinT").textContent = T("win");
    $("arWinPts").textContent = r.earned ? `${T("pts", { p: r.earned })} ${hinted ? "" : T("noHint")}` : T("again");
    $("arWinExplain").textContent = L(ch.explain) + (ch.alts?.length ? " " + T("lab.alts") : "");
    $("arWinNext").hidden = idx >= list.length - 1; $("arWin").hidden = false; $("arWin").classList.add("is-in");
    $("arWinNext").focus?.();
  }
  function showHints() {
    const hs = ch.hints || [], box = $("arHints"); box.textContent = "";
    for (let i = 0; i < Math.min(hints, hs.length); i++) { const p = document.createElement("p"); p.textContent = `${T("hintLeft", { i: i + 1, n: hs.length })}: ${L(hs[i])}`; box.appendChild(p); }
    if (hints >= hs.length) { $("arSol").hidden = false; $("arHint").disabled = true; }
  }
  $("arRun").addEventListener("click", run);
  $("arReset").addEventListener("click", () => open(idx));
  $("arHint").addEventListener("click", () => { if (hints < (ch.hints || []).length) hints++; showHints(); });
  $("arSol").addEventListener("click", () => {
    usedSol = true; const box = $("labSolution"); box.textContent = ""; box.hidden = false;
    const h = document.createElement("h4"); h.textContent = T("lab.solT"); box.appendChild(h);
    ch.edit.forEach((n) => { const pre = document.createElement("pre"); pre.dir = "ltr"; pre.textContent = (ch.solution[n] ?? ch.files[n] ?? ""); const lab = document.createElement("b"); lab.textContent = n.toUpperCase(); box.append(lab, pre); });
    const ex = document.createElement("p"); ex.textContent = L(ch.explain); box.appendChild(ex);
    const ap = document.createElement("button"); ap.type = "button"; ap.className = "ac-btn"; ap.id = "labApply"; ap.textContent = T("lab.apply");
    ap.addEventListener("click", () => { ch.edit.forEach((n) => setCode(n, ch.solution[n] ?? ch.files[n] ?? "")); run(); }); box.appendChild(ap);
  });
  $("arWinNext").addEventListener("click", () => { $("labSolution").hidden = true; open(idx + 1); });
  $("arWinStay").addEventListener("click", () => { $("arWin").hidden = true; });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("arWin").hidden) $("arWin").hidden = true; });
  document.addEventListener("fayad:langchange", () => { if (ch) { const keep = learner(); $("arSub").textContent = T("sub", { n: list.length }); open(idx); ch.edit.forEach((n) => setCode(n, keep[n])); } });
  init();
}
