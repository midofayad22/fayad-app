/*
  Challenge Arena: real, practical coding challenges with a VS Code-like editor, live preview, instant validation, progressive hints,
  an explanation after solving, replay and game points (kept separate from lesson progress, see store.js).
  Learner code only ever runs inside the sandboxed runner (opaque-origin iframe / Worker). The checks are authored data.
*/
import { create as createRunner } from "/js/playground/playground.js";
import { upgradeEditor } from "/js/engine/editor.js";
import { read, award } from "/js/game/store.js";
import { TRACKS, loadChallenges } from "/js/game/tracks.js";
import { BASE_POINTS, filesFor, parseChecks } from "/js/game/challenge-lib.js";

const F = window.FAYAD;
const $ = (id) => document.getElementById(id);
const DICT = {
  ar: { "fq.home": "الرئيسية", "fq.hub": "الألعاب", "fq.dash": "لوحة التقدم", "fq.points": "نقاط اللعبة", "fq.hint": "تلميح", "fq.reset": "إعادة الضبط", "fq.next": "المرحلة التالية",
    "ar.goal": "الهدف التعليمي:", "ar.checks": "المتطلبات", "ar.run": "تشغيل", "ar.preview": "المعاينة", "ar.empty": "شغّل الكود لترى النتيجة هنا", "ar.replay": "أعد المحاولة",
    sub: "{n} تحديات من المبتدئ إلى الخبير", solved: "محلول", running: "جارٍ التشغيل…", pass: "نجحت كل المتطلبات", fail: "لم تتحقق كل المتطلبات بعد", err: "خطأ: {m}", timeout: "توقف التنفيذ: حلقة لا تنتهي؟",
    win: "أحسنت! حللت التحدي", pts: "+{p} نقطة", again: "سبق أن حللته، لا نقاط إضافية", noHint: "(+5 لأنك لم تستخدم تلميحًا)", hintLeft: "تلميح {i} من {n}", noMore: "لا مزيد من التلميحات",
    beginner: "مبتدئ", intermediate: "متوسط", advanced: "متقدم", expert: "خبير", missing: "التحدي غير موجود", ctrl: "Ctrl+Enter للتشغيل" },
  en: { "fq.home": "Home", "fq.hub": "Games", "fq.dash": "Progress dashboard", "fq.points": "Game points", "fq.hint": "Hint", "fq.reset": "Reset", "fq.next": "Next level",
    "ar.goal": "Learning goal:", "ar.checks": "Requirements", "ar.run": "Run", "ar.preview": "Preview", "ar.empty": "Run the code to see the result here", "ar.replay": "Try again",
    sub: "{n} challenges from beginner to expert", solved: "solved", running: "Running…", pass: "All requirements passed", fail: "Not all requirements pass yet", err: "Error: {m}", timeout: "Execution stopped: endless loop?",
    win: "Well done! Challenge solved", pts: "+{p} points", again: "Already solved, no extra points", noHint: "(+5 for no hints)", hintLeft: "Hint {i} of {n}", noMore: "No more hints",
    beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced", expert: "Expert", missing: "Challenge not found", ctrl: "Ctrl+Enter to run" },
};
F?.i18n?.extend({ ar: DICT.ar, en: DICT.en });
const lang = () => (F?.i18n?.lang === "en" ? "en" : "ar");
const T = (k, p = {}) => String(DICT[lang()][k] ?? k).replace(/\{(\w+)\}/g, (_, x) => p[x] ?? "");
const L = (o) => (o && (o[lang()] ?? o.ar)) || "";

const q = new URLSearchParams(location.search);
const track = TRACKS.find((t) => t.id === q.get("track")) || TRACKS[0];
let list = [], idx = 0, ch = null, hints = 0, runner = null, runToken = 0, solved = false;
const areas = {};

async function init() {
  $("arTrack").textContent = track.name;
  try { list = await loadChallenges(track.id); } catch { list = []; }
  if (!list.length) { $("arSub").textContent = T("missing"); return; }
  $("arSub").textContent = T("sub", { n: list.length });
  const want = Number(q.get("c"));
  idx = want >= 1 && want <= list.length ? want - 1 : Math.max(0, list.findIndex((_, i) => !read().games[track.id]?.solved[i + 1]));
  paintLevels(); open(idx);
}
function paintLevels() {
  const d = read(), done = d.games[track.id]?.solved || {}, box = $("arLevels"); box.textContent = "";
  $("arPoints").textContent = d.points;
  list.forEach((c, i) => {
    const b = document.createElement("button"); b.type = "button"; b.setAttribute("role", "listitem");
    b.className = `ar-lv ar-lv-${c.level}` + (i === idx ? " is-cur" : "") + (done[i + 1] ? " is-done" : "");
    b.textContent = i + 1; b.title = `${T(c.level)} — ${L(c.title)}` + (done[i + 1] ? ` (${T("solved")})` : "");
    b.setAttribute("aria-label", b.title); b.addEventListener("click", () => open(i)); box.appendChild(b);
  });
}
function open(i) {
  idx = i; ch = list[i]; hints = 0; solved = false; runToken++;
  history.replaceState(null, "", `?track=${track.id}&c=${i + 1}`);
  $("arGrid").hidden = false; $("arWin").hidden = true;
  $("arBadge").textContent = T(ch.level); $("arBadge").className = `ar-badge ar-lv-${ch.level}`;
  $("arTitle").textContent = L(ch.title); $("arGoal").textContent = L(ch.goal); $("arBrief").textContent = L(ch.brief);
  paintChecks(null); $("arHints").textContent = ""; $("arStatus").textContent = ""; $("arConsole").textContent = "";
  buildEditors(); paintLevels(); stopRunner(); $("arPreview").classList.remove("is-live"); $("arEmpty").hidden = false;
  $("arHint").disabled = !(ch.hints || []).length;
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
function stopRunner() { if (runner) { runner.destroy(); runner = null; } $("arPreview").querySelectorAll("iframe").forEach((f) => f.remove()); }

function run() {
  const my = ++runToken; stopRunner(); solved = false;
  const lines = []; let err = null, timedOut = false;
  $("arConsole").textContent = ""; $("arStatus").textContent = T("running"); $("arEmpty").hidden = ch.runtime !== "js" ? true : false;
  $("arPreview").classList.toggle("is-live", ch.runtime !== "js");
  runner = createRunner($("arPreview"), {
    runtime: ch.runtime === "js" ? "js" : "html", format: "text", title: T("ar.preview"), timeoutMs: 3000, loopBudget: 2000000,
    onConsole: (e) => { if (my === runToken) lines.push(e.text); },
    onError: (e) => { if (my === runToken && err === null) err = e.message; },
    onStatus: (st) => {
      if (my !== runToken) return;
      if (st === "timeout") { timedOut = true; $("arStatus").textContent = T("timeout"); return; }
      if (st !== "done" || timedOut) return;
      setTimeout(() => { if (my === runToken) finish(lines, err); }, 120);
    },
  });
  runner.run(filesFor(ch, learner()));
}
function finish(lines, err) {
  const res = parseChecks(lines, ch.checks.length); paintChecks(res);
  $("arConsole").textContent = lines.filter((l) => !l.startsWith("@@FY ")).join("\n");
  const ok = err === null && res.every((r) => r === true);
  $("arStatus").textContent = err !== null ? T("err", { m: err }) : ok ? T("pass") : T("fail");
  $("arStatus").className = "ar-status " + (ok ? "ok" : "bad");
  if (ok && !solved) { solved = true; win(); }
}
function win() {
  const r = award(track.id, idx + 1, hints > 0, BASE_POINTS[ch.level] || 10);
  $("arPoints").textContent = r.data.points; paintLevels();
  $("arWinT").textContent = T("win");
  $("arWinPts").textContent = r.earned ? `${T("pts", { p: r.earned })} ${hints === 0 ? T("noHint") : ""}` : T("again");
  $("arWinExplain").textContent = L(ch.explain);
  $("arWinNext").hidden = idx >= list.length - 1; $("arWin").hidden = false; $("arWin").classList.add("is-in");
  $("arWinNext").focus?.();
}
$("arRun").addEventListener("click", run);
$("arReset").addEventListener("click", () => open(idx));
$("arHint").addEventListener("click", () => {
  const hs = ch.hints || []; if (hints < hs.length) hints++;
  const box = $("arHints"); box.textContent = "";
  for (let i = 0; i < hints; i++) { const p = document.createElement("p"); p.textContent = `${T("hintLeft", { i: i + 1, n: hs.length })}: ${L(hs[i])}`; box.appendChild(p); }
  if (hints >= hs.length) $("arHint").disabled = true;
});
$("arWinNext").addEventListener("click", () => open(idx + 1));
$("arWinStay").addEventListener("click", () => { $("arWin").hidden = true; });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("arWin").hidden) $("arWin").hidden = true; });
document.addEventListener("fayad:langchange", () => { if (ch) { const keep = learner(); open(idx); ch.edit.forEach((n) => (areas[n].value = keep[n])); } });
init();
