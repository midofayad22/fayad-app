/*
  Selector Quest — type a CSS selector that matches exactly the dotted-outline elements.
  The typed text is only ever passed to querySelectorAll inside try/catch (no eval, no innerHTML from the player).
  The sandbox markup is a constant defined here. A level is solved when the matched set equals the target set.
*/
import { read, award } from "/js/game/store.js";
const F = window.FAYAD;
const $ = (id) => document.getElementById(id);

const LEVELS = [
  { html: '<p>p</p><p>p</p><span>span</span><p>p</p>', want: "p", hint: "p" },
  { html: '<p class="a">p.a</p><p>p</p><span class="a">span.a</span><p class="a">p.a</p>', want: ".a", hint: ".a" },
  { html: '<p>p</p><p id="x">p#x</p><p>p</p><span id="y">span#y</span>', want: "#x", hint: "#x" },
  { html: '<p class="a">p.a</p><span class="a">span.a</span><p>p</p><p class="a">p.a</p>', want: "p.a", hint: "p.a" },
  { html: '<div>div</div><ul><li>li</li><li>li</li></ul><ol><li>li</li></ol>', want: "ul li", hint: "ul li" },
  { html: '<ul><li>li<ol><li>li</li><li>li</li></ol></li><li>li</li></ul>', want: "ul > li", hint: "ul > li" },
  { html: '<ul><li>li</li><li>li</li><li>li</li></ul><ol><li>li</li><li>li</li></ol>', want: "li:first-child", hint: "li:first-child" },
  { html: '<button disabled>button</button><button>button</button><input disabled><input>', want: ":disabled", hint: ":disabled" },
  { html: '<ul><li class="a">li.a</li><li>li</li><li class="a">li.a</li><li>li</li></ul>', want: "li:not(.a)", hint: "li:not(.a)" },
  { html: '<h2>h2</h2><p>p</p><p>p</p><h3>h3</h3><p>p</p>', want: "h2 + p", hint: "h2 + p" },
];
const DICT = {
  ar: { "fq.home": "الرئيسية", "fq.hub": "الألعاب", "fq.dash": "لوحة التقدم", "fq.points": "نقاط اللعبة", "fq.hint": "تلميح", "fq.reset": "إعادة الضبط", "fq.next": "المرحلة التالية",
    "fq.note": "نقاط اللعبة تُحفظ على هذا الجهاز فقط وتُحسب منفصلة عن نقاط الدروس: 10 نقاط لكل مرحلة تُحلّ لأول مرة، و5 إضافية إن حللتها بدون تلميح.",
    "sq.label": "المحدد (CSS selector)", task: "المرحلة {n}: اختر العناصر ذات الإطار المنقّط فقط", ok: "أحسنت! +{p} نقطة.", again: "حُلّت من قبل.", done: "أنهيت كل المراحل. عمل رائع!", hintTxt: "جرّب: {h}",
    count: "يطابق {m} من {t} مطلوبة، و{x} زائدة", bad: "محدد غير صالح", lvl: "المرحلة {n}", solved: "محلولة" },
  en: { "fq.home": "Home", "fq.hub": "Games", "fq.dash": "Progress dashboard", "fq.points": "Game points", "fq.hint": "Hint", "fq.reset": "Reset", "fq.next": "Next level",
    "fq.note": "Game points are saved on this device only and counted separately from lesson points: 10 per level solved for the first time, plus 5 if solved without a hint.",
    "sq.label": "Selector (CSS selector)", task: "Level {n}: select only the dotted-outline elements", ok: "Nice! +{p} points.", again: "Already solved.", done: "You finished every level. Great work!", hintTxt: "Try: {h}",
    count: "Matches {m} of {t} wanted, {x} extra", bad: "Invalid selector", lvl: "Level {n}", solved: "solved" },
};
F?.i18n?.extend({ ar: DICT.ar, en: DICT.en });
const lang = () => (F?.i18n?.lang === "en" ? "en" : "ar");
const T = (k, p = {}) => String(DICT[lang()][k] ?? k).replace(/\{(\w+)\}/g, (_, x) => p[x] ?? "");

let idx = 0, hinted = false, solved = false, target = [];
const box = () => $("fqBoard");
const all = () => [...box().querySelectorAll("*")].filter((n) => !n.classList.contains("sq-keep"));

function load() {
  const lv = LEVELS[idx], d = read(), done = d.games.sel?.solved || {};
  box().innerHTML = lv.html; // constant markup from LEVELS
  all().forEach((n) => { n.className = n.className ? n.className : ""; });
  target = [...box().querySelectorAll(lv.want)];
  all().forEach((n) => { n.classList.add("sq-el"); if (target.includes(n)) n.classList.add("sq-want"); });
  $("fqTask").textContent = T("task", { n: idx + 1 });
  $("fqLevelNo").textContent = idx + 1; $("fqTotal").textContent = LEVELS.length; $("fqPoints").textContent = d.points;
  $("sqInput").value = ""; hinted = false; solved = false; $("fqNext").hidden = true; $("fqMsg").textContent = "";
  const dots = $("fqDots"); dots.textContent = "";
  LEVELS.forEach((_, i) => { const b = document.createElement("button"); b.type = "button"; b.className = "fq-dot" + (i === idx ? " is-cur" : "") + (done[i + 1] ? " is-done" : ""); b.textContent = i + 1; b.setAttribute("role", "listitem"); b.setAttribute("aria-label", T("lvl", { n: i + 1 }) + (done[i + 1] ? " — " + T("solved") : "")); b.addEventListener("click", () => { idx = i; load(); check(); }); dots.appendChild(b); });
  check();
}
function check() {
  const q = $("sqInput").value.trim();
  all().forEach((n) => n.classList.remove("sq-hit"));
  if (!q) { $("sqCount").textContent = ""; return; }
  let hit;
  try { hit = [...box().querySelectorAll(q)]; } catch { $("sqCount").textContent = T("bad"); return; }
  hit.forEach((n) => n.classList.add("sq-hit"));
  const m = hit.filter((n) => target.includes(n)).length, x = hit.length - m;
  $("sqCount").textContent = T("count", { m, t: target.length, x });
  if (solved || m !== target.length || x !== 0) return;
  solved = true;
  const r = award("sel", idx + 1, hinted), d = r.data;
  $("fqPoints").textContent = d.points;
  $("fqMsg").textContent = LEVELS.every((_, i) => d.games.sel?.solved[i + 1]) ? T("done") : r.earned ? T("ok", { p: r.earned }) : T("again");
  $("fqNext").hidden = idx >= LEVELS.length - 1;
  document.querySelectorAll(".fq-dot")[idx]?.classList.add("is-done");
  box().classList.add("is-win"); setTimeout(() => box().classList.remove("is-win"), 900);
}
$("sqInput").addEventListener("input", check);
$("fqHint").addEventListener("click", () => { hinted = true; $("fqMsg").textContent = T("hintTxt", { h: LEVELS[idx].hint }); });
$("fqReset").addEventListener("click", load);
$("fqNext").addEventListener("click", () => { if (idx < LEVELS.length - 1) { idx++; load(); } });
document.addEventListener("fayad:langchange", () => { const v = $("sqInput").value; load(); $("sqInput").value = v; check(); });
load();
