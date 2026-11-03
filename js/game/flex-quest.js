/*
  Flex Quest — a Flexbox puzzle game. The player picks values for real CSS properties (select elements only,
  no eval, no user-typed code). A level is solved when every item of the player's board sits at the same
  position as in a hidden reference board built from the level's solution (compared with getBoundingClientRect).
  Game points are stored under "fayad-game-v1" on this device only and are labelled separately from lesson points.
*/
const F = window.FAYAD;
const POINTS = { solve: 10, noHint: 5 };
const KEY = "fayad-game-v1";

const OPTS = {
  "flex-direction": ["row", "row-reverse", "column", "column-reverse"],
  "justify-content": ["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"],
  "align-items": ["flex-start", "center", "flex-end", "stretch"],
};
const LEVELS = [
  { use: ["justify-content"], sol: { "justify-content": "flex-end" }, learn: "justify-content: flex-end" },
  { use: ["justify-content"], sol: { "justify-content": "center" }, learn: "justify-content: center" },
  { use: ["align-items"], sol: { "align-items": "flex-end" }, learn: "align-items: flex-end" },
  { use: ["justify-content", "align-items"], sol: { "justify-content": "center", "align-items": "center" }, learn: "center / center" },
  { use: ["justify-content"], sol: { "justify-content": "space-between" }, learn: "space-between" },
  { use: ["justify-content", "align-items"], sol: { "justify-content": "space-around", "align-items": "flex-end" }, learn: "space-around" },
  { use: ["flex-direction", "justify-content"], sol: { "flex-direction": "column", "justify-content": "center" }, learn: "flex-direction: column" },
  { use: ["flex-direction", "justify-content", "align-items"], sol: { "flex-direction": "row-reverse", "justify-content": "flex-start", "align-items": "flex-end" }, learn: "row-reverse" },
];
const SIZES = [[44, 44], [44, 64], [44, 34]]; // different sizes so only one arrangement matches
const COLORS = ["var(--fy-course, #22d3ee)", "#f4c95d", "#f472b6"];

const DICT = {
  ar: {
    "fq.home": "الرئيسية", "fq.dash": "لوحة التقدم", "fq.sub": "اجعل العناصر تتطابق مع الهدف بضبط خصائص Flexbox. كل مرحلة تُعلّمك خاصية جديدة.",
    "fq.points": "نقاط اللعبة", "fq.target": "الهدف", "fq.yours": "لوحتك", "fq.hint": "تلميح", "fq.reset": "إعادة الضبط", "fq.next": "المرحلة التالية",
    "fq.note": "نقاط اللعبة تُحفظ على هذا الجهاز فقط وتُحسب منفصلة عن نقاط الدروس: 10 نقاط لكل مرحلة تُحلّ لأول مرة، و5 إضافية إن حللتها بدون تلميح.",
    task: "المرحلة {n}: طابق الهدف", ok: "أحسنت! تطابقت العناصر.", okPts: "أحسنت! +{p} نقطة.", again: "حُلّت من قبل. جرّب مرحلة أخرى.", hintTxt: "جرّب: {h}", done: "أنهيت كل المراحل. عمل رائع!",
    lvl: "المرحلة {n}", solved: "محلولة",
  },
  en: {
    "fq.home": "Home", "fq.dash": "Progress dashboard", "fq.sub": "Match the target by setting Flexbox properties. Each level teaches one new property.",
    "fq.points": "Game points", "fq.target": "Target", "fq.yours": "Your board", "fq.hint": "Hint", "fq.reset": "Reset", "fq.next": "Next level",
    "fq.note": "Game points are saved on this device only and counted separately from lesson points: 10 per level solved for the first time, plus 5 if solved without a hint.",
    task: "Level {n}: match the target", ok: "Nice! The items match.", okPts: "Nice! +{p} points.", again: "Already solved. Try another level.", hintTxt: "Try: {h}", done: "You finished every level. Great work!",
    lvl: "Level {n}", solved: "solved",
  },
};
F?.i18n?.extend({ ar: DICT.ar, en: DICT.en });
const lang = () => (F?.i18n?.lang === "en" ? "en" : "ar");
const T = (k, p = {}) => String(DICT[lang()][k] ?? k).replace(/\{(\w+)\}/g, (_, x) => p[x] ?? "");

const $ = (id) => document.getElementById(id);
const save = (() => {
  const read = () => { try { const d = JSON.parse(localStorage.getItem(KEY)); return d && d.v === 1 && d.flex ? d : null; } catch { return null; } };
  return {
    get() { return read() || { v: 1, flex: { solved: {} }, points: 0 }; },
    put(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); return true; } catch { return false; } },
  };
})();

let idx = 0, state = {}, hinted = false, solved = false;

function board(el, level, props) {
  el.textContent = "";
  el.style.cssText = "";
  el.style.display = "flex";
  for (const [k, v] of Object.entries({ "flex-direction": "row", "justify-content": "flex-start", "align-items": "flex-start", ...props })) el.style.setProperty(k, v);
  SIZES.forEach(([w, h], i) => { const b = document.createElement("span"); b.className = "fq-item"; b.style.width = w + "px"; b.style.height = h + "px"; b.style.background = COLORS[i]; el.appendChild(b); });
}
function same(a, b) {
  const A = [...a.children], B = [...b.children];
  const ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
  return A.every((n, i) => { const x = n.getBoundingClientRect(), y = B[i].getBoundingClientRect(); return Math.abs((x.left - ra.left) - (y.left - rb.left)) < 2 && Math.abs((x.top - ra.top) - (y.top - rb.top)) < 2; });
}
function codeText() {
  const keys = ["flex-direction", "justify-content", "align-items"].filter((k) => k in state || LEVELS[idx].use.includes(k));
  return ".board {\n  display: flex;\n" + keys.map((k) => `  ${k}: ${state[k] ?? defaults(k)};`).join("\n") + "\n}";
}
const defaults = (k) => ({ "flex-direction": "row", "justify-content": "flex-start", "align-items": "flex-start" }[k]);

function render() {
  const lv = LEVELS[idx], d = save.get();
  $("fqTask").textContent = T("task", { n: idx + 1 });
  $("fqLevelNo").textContent = idx + 1; $("fqTotal").textContent = LEVELS.length; $("fqPoints").textContent = d.points;
  board($("fqTarget"), lv, lv.sol);
  state = {}; lv.use.forEach((k) => (state[k] = defaults(k)));
  board($("fqBoard"), lv, state);
  const box = $("fqControls"); box.textContent = "";
  for (const k of lv.use) {
    const wrap = document.createElement("label"); wrap.className = "fq-field";
    const s = document.createElement("span"); s.textContent = k; s.dir = "ltr";
    const sel = document.createElement("select"); sel.dir = "ltr"; sel.dataset.prop = k;
    for (const o of OPTS[k]) { const op = document.createElement("option"); op.value = o; op.textContent = o; sel.appendChild(op); }
    sel.addEventListener("change", () => { state[k] = sel.value; apply(); });
    wrap.append(s, sel); box.appendChild(wrap);
  }
  hinted = false; solved = false; $("fqNext").hidden = true; $("fqMsg").textContent = "";
  $("fqCode").textContent = codeText();
  const dots = $("fqDots"); dots.textContent = "";
  LEVELS.forEach((_, i) => { const b = document.createElement("button"); b.type = "button"; b.className = "fq-dot" + (i === idx ? " is-cur" : "") + (d.flex.solved[i + 1] ? " is-done" : ""); b.textContent = i + 1; b.setAttribute("role", "listitem"); b.setAttribute("aria-label", T("lvl", { n: i + 1 }) + (d.flex.solved[i + 1] ? " — " + T("solved") : "")); b.addEventListener("click", () => { idx = i; render(); }); dots.appendChild(b); });
}
function apply() {
  const lv = LEVELS[idx];
  board($("fqBoard"), lv, state);
  $("fqCode").textContent = codeText();
  if (solved || !same($("fqBoard"), $("fqTarget"))) return;
  solved = true;
  const d = save.get(); let msg;
  if (!d.flex.solved[idx + 1]) {
    const p = POINTS.solve + (hinted ? 0 : POINTS.noHint);
    d.flex.solved[idx + 1] = { at: Date.now(), hint: hinted }; d.points += p; save.put(d); msg = T("okPts", { p });
  } else msg = T("again");
  $("fqPoints").textContent = d.points;
  const all = LEVELS.every((_, i) => d.flex.solved[i + 1]);
  $("fqMsg").textContent = all ? T("done") : msg;
  $("fqBoard").classList.add("is-win"); setTimeout(() => $("fqBoard").classList.remove("is-win"), 900);
  $("fqNext").hidden = idx >= LEVELS.length - 1;
  document.querySelectorAll(".fq-dot")[idx]?.classList.add("is-done");
  document.dispatchEvent(new CustomEvent("fayad:gamepoints", { detail: { points: d.points } }));
}
$("fqHint").addEventListener("click", () => { hinted = true; $("fqMsg").textContent = T("hintTxt", { h: LEVELS[idx].learn }); });
$("fqReset").addEventListener("click", render);
$("fqNext").addEventListener("click", () => { if (idx < LEVELS.length - 1) { idx++; render(); } });
document.addEventListener("fayad:langchange", () => { const keep = { ...state }; render(); Object.assign(state, keep); document.querySelectorAll(".fq-field select").forEach((s) => (s.value = state[s.dataset.prop])); });
render();
