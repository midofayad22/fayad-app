/*
  FAYAD Grand Adventure — block editor UI. The player's program is a plain JSON tree; it is only ever interpreted by the pure
  engine (no eval, no innerHTML from the player). Points are decided by the server (submit_solve); locally we only record solves.
*/
import { read, award } from "/js/game/store.js";
import { LEVELS, WORLDS } from "./levels.js";
import { run, validate, stars, sizeOf } from "./engine.js";

const F = window.FAYAD;
const $ = (id) => document.getElementById(id);
const GAME = "adventure", STAR_KEY = "fayad-adv-stars";

const DICT = {
  ar: { "fq.home": "الرئيسية", "fq.hub": "الألعاب", "fq.dash": "لوحة التقدم", "fq.points": "نقاط اللعبة", "fq.hint": "تلميح", "fq.next": "المرحلة التالية", "adv.sub": "قُد البطل إلى الهدف ببرنامج تبنيه من الكتل. 6 عوالم، 120 مستوى.", "adv.run": "تشغيل", "adv.stop": "إيقاف", "adv.clear": "مسح", "adv.blocks": "الكتل",
    "adv.note": "النقاط تُسجَّل على الخادم عند الحل لأول مرة، والنجوم تعتمد على قلة الكتل. استخدام التلميح يلغي نقاط الخمس الإضافية.",
    F: "تقدّم", L: "يسار", R: "يمين", repeat: "كرّر", until: "كرّر حتى الهدف", if: "إذا", call: "نفّذ الدالة", main: "البرنامج", fn: "الدالة", empty: "أضف كتلًا من الأعلى",
    wallAhead: "جدار أمامك", openAhead: "الطريق أمامك مفتوح", openLeft: "يسارك مفتوح", openRight: "يمينك مفتوح", else: "وإلا", then: "عندئذٍ",
    ok: "أحسنت! +{p} نقطة، {s} نجوم.", again: "حُلّت من قبل ({s} نجوم).", hazard: "وقع البطل في فخ.", "not-at-goal": "لم يصل البطل إلى الهدف.", "keys-left": "بقيت مفاتيح لم تُجمع.", budget: "كتل كثيرة: الحد الأقصى {b}.", "locked-block": "هذه الكتلة غير متاحة في هذا المستوى.",
    goal: "أوصل البطل إلى العلم", goalKeys: "اجمع كل المفاتيح ثم أوصل البطل إلى العلم", hint: "الحل المرجعي يستخدم {n} كتلة: {ops}.", size: "الكتل: {n}", sizeB: "الكتل: {n} / {b}", par: "للنجوم الثلاث: {p} كتلة أو أقل", locked: "مقفل: أنهِ المرحلة السابقة", world: "العالم {n}: {t}", lvl: "المرحلة {n}", empty0: "البرنامج فارغ." },
  en: { "fq.home": "Home", "fq.hub": "Games", "fq.dash": "Progress dashboard", "fq.points": "Game points", "fq.hint": "Hint", "fq.next": "Next level", "adv.sub": "Guide the hero to the goal with a program built from blocks. 6 worlds, 120 levels.", "adv.run": "Run", "adv.stop": "Stop", "adv.clear": "Clear", "adv.blocks": "Blocks",
    "adv.note": "Points are recorded by the server the first time you solve a level; stars depend on using few blocks. Using the hint removes the 5 bonus points.",
    F: "Forward", L: "Left", R: "Right", repeat: "Repeat", until: "Repeat until goal", if: "If", call: "Run function", main: "Program", fn: "Function", empty: "Add blocks from above",
    wallAhead: "wall ahead", openAhead: "path ahead is open", openLeft: "left is open", openRight: "right is open", else: "else", then: "then",
    ok: "Well done! +{p} points, {s} stars.", again: "Already solved ({s} stars).", hazard: "The hero fell into a trap.", "not-at-goal": "The hero did not reach the goal.", "keys-left": "Some keys are still uncollected.", budget: "Too many blocks: the limit is {b}.", "locked-block": "That block is not available on this level.",
    goal: "Bring the hero to the flag", goalKeys: "Collect every key, then bring the hero to the flag", hint: "The reference solution uses {n} blocks: {ops}.", size: "Blocks: {n}", sizeB: "Blocks: {n} / {b}", par: "Three stars: {p} blocks or fewer", locked: "Locked: finish the previous level", world: "World {n}: {t}", lvl: "Level {n}", empty0: "The program is empty." },
};
F?.i18n?.extend({ ar: DICT.ar, en: DICT.en });
const lang = () => (F?.i18n?.lang === "en" ? "en" : "ar");
const T = (k, p = {}) => String(DICT[lang()][k] ?? k).replace(/\{(\w+)\}/g, (_, x) => p[x] ?? "");

const readStars = () => { try { return JSON.parse(localStorage.getItem(STAR_KEY)) || {}; } catch { return {}; } };
const saveStars = (lv, s) => { const d = readStars(); if (!d[lv] || d[lv] < s) { d[lv] = s; try { localStorage.setItem(STAR_KEY, JSON.stringify(d)); } catch { /* storage blocked */ } } };
const isDone = (n) => !!read().games[GAME]?.solved[n];
const unlocked = (n) => n === 1 || isDone(n - 1) || isDone(n);

let idx = 0, prog = { main: [], fn: [] }, sel = prog.main, hinted = false, timer = 0, running = false, curSteps = null;
const lvl = () => LEVELS[idx];
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- board ---------- */
const ARROW = ["▲", "▶", "▼", "◀"];
function drawBoard(stepNo = 0, steps = null) {
  const l = lvl(), board = $("advBoard"), rows = l.grid, C = rows[0].length;
  const st = steps ? steps[Math.min(stepNo, steps.length - 1)] : null;
  board.style.setProperty("--c", C);
  board.style.setProperty("--w", Math.min(C * 36, 640) + "px");
  const picked = new Set();
  if (steps) for (let i = 0; i <= Math.min(stepNo, steps.length - 1); i++) picked.add(steps[i].y * C + steps[i].x);
  let hero = null;
  const frag = document.createDocumentFragment();
  rows.forEach((row, y) => [...row].forEach((c, x) => {
    const d = document.createElement("div"); d.className = "adv-c";
    if (c === "#") d.classList.add("is-wall");
    else if (c === "G") { d.classList.add("is-goal"); d.textContent = "⚑"; }
    else if (c === "k") { if (!picked.has(y * C + x)) { d.classList.add("is-key"); d.textContent = "⚿"; } }
    else if (c === "x") { d.classList.add("is-trap"); d.textContent = "✕"; }
    if ("^>v<".includes(c)) hero = { x, y, dir: "^>v<".indexOf(c) };
    frag.appendChild(d);
  }));
  board.textContent = ""; board.appendChild(frag);
  const h = st ? { x: st.x, y: st.y, dir: st.dir } : hero;
  const cell = board.children[h.y * C + h.x];
  cell.classList.add("has-hero");
  const e = document.createElement("span"); e.className = "adv-hero"; e.textContent = ARROW[h.dir]; cell.appendChild(e);
}

/* ---------- program editor ---------- */
const OPS = ["F", "L", "R", "repeat", "until", "if", "call"];
function mk(op) {
  if (op === "repeat") return { op, n: 3, body: [] };
  if (op === "until") return { op, body: [] };
  if (op === "if") return { op, cond: "wallAhead", then: [], else: [] };
  return { op };
}
function palette() {
  const p = $("advPalette"); p.textContent = "";
  for (const op of OPS) {
    const b = document.createElement("button"); b.type = "button"; b.className = "adv-op adv-op-" + op; b.textContent = T(op);
    const ok = lvl().blocks.includes(op); b.disabled = !ok || running;
    b.addEventListener("click", () => { sel.push(mk(op)); if (op === "repeat" || op === "until") sel = sel[sel.length - 1].body; else if (op === "if") sel = sel[sel.length - 1].then; renderProg(); });
    p.appendChild(b);
  }
}
function zone(list, label) {
  const z = document.createElement("div"); z.className = "adv-zone" + (list === sel ? " is-sel" : ""); z.tabIndex = 0;
  z.setAttribute("role", "group"); z.setAttribute("aria-label", label);
  const pick = (e) => { if (e.target === z || e.target.classList.contains("adv-zl")) { sel = list; renderProg(); } };
  z.addEventListener("click", pick); z.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && e.target === z) { e.preventDefault(); sel = list; renderProg(); } });
  const lab = document.createElement("span"); lab.className = "adv-zl"; lab.textContent = label; z.appendChild(lab);
  if (!list.length) { const m = document.createElement("span"); m.className = "adv-empty"; m.textContent = "…"; z.appendChild(m); }
  list.forEach((b, i) => z.appendChild(blockEl(b, list, i)));
  return z;
}
function blockEl(b, list, i) {
  const el = document.createElement("div"); el.className = "adv-blk adv-op-" + b.op;
  const head = document.createElement("div"); head.className = "adv-bh";
  const name = document.createElement("span"); name.textContent = T(b.op); head.appendChild(name);
  if (b.op === "repeat") {
    const s = document.createElement("select"); s.setAttribute("aria-label", T("repeat"));
    for (let n = 2; n <= 9; n++) { const o = document.createElement("option"); o.value = n; o.textContent = "×" + n; if (n === b.n) o.selected = true; s.appendChild(o); }
    s.addEventListener("change", () => { b.n = +s.value; updateSize(); }); head.appendChild(s);
  }
  if (b.op === "if") {
    const s = document.createElement("select"); s.setAttribute("aria-label", T("if"));
    for (const c of ["wallAhead", "openAhead", "openLeft", "openRight"]) { const o = document.createElement("option"); o.value = c; o.textContent = T(c); if (c === b.cond) o.selected = true; s.appendChild(o); }
    s.addEventListener("change", () => { b.cond = s.value; }); head.appendChild(s);
  }
  const x = document.createElement("button"); x.type = "button"; x.className = "adv-x"; x.textContent = "×"; x.setAttribute("aria-label", "remove");
  x.addEventListener("click", () => { const inside = (a) => a === b.body || a === b.then || a === b.else; if (inside(sel)) sel = list; list.splice(i, 1); renderProg(); });
  head.appendChild(x); el.appendChild(head);
  if (b.body) el.appendChild(zone(b.body, ""));
  if (b.then) { el.appendChild(zone(b.then, T("then"))); el.appendChild(zone(b.else, T("else"))); }
  return el;
}
function renderProg() {
  const box = $("advProg"); box.textContent = "";
  if (![prog.main, prog.fn].includes(sel) && !contains(prog, sel)) sel = prog.main;
  box.appendChild(zone(prog.main, T("main")));
  if (lvl().hasFn) box.appendChild(zone(prog.fn, T("fn")));
  palette(); updateSize();
}
function contains(root, list) {
  const walk = (a) => a.some((b) => [b.body, b.then, b.else].some((s) => s && (s === list || walk(s))));
  return walk(root.main) || walk(root.fn);
}
function updateSize() {
  const l = lvl(), n = sizeOf(prog);
  $("advSize").textContent = (l.budget ? T("sizeB", { n, b: l.budget }) : T("size", { n })) + " · " + T("par", { p: l.par });
}

/* ---------- levels / worlds ---------- */
function header() {
  const l = lvl(), w = WORLDS[l.world - 1], d = read();
  $("advWorld").textContent = T("world", { n: w.id, t: lang() === "en" ? w.en : w.ar });
  $("advNo").textContent = l.id; $("advPoints").textContent = d.points;
  const s = readStars()[l.id] || 0; $("advStars").textContent = "★".repeat(s) + "☆".repeat(3 - s);
  const hasKeys = l.grid.some((r) => r.includes("k"));
  $("advGoalTxt").textContent = hasKeys ? T("goalKeys") : T("goal");
  const tabs = $("advWorlds"); tabs.textContent = "";
  WORLDS.forEach((ww) => {
    const first = (ww.id - 1) * 20 + 1, b = document.createElement("button"); b.type = "button"; b.className = "adv-wt" + (ww.id === l.world ? " is-cur" : "");
    b.textContent = ww.id; b.title = lang() === "en" ? ww.en : ww.ar; b.setAttribute("aria-label", T("world", { n: ww.id, t: b.title })); b.disabled = !unlocked(first);
    b.addEventListener("click", () => { go(first); }); tabs.appendChild(b);
  });
  const box = $("advLevels"); box.textContent = ""; const stars_ = readStars();
  LEVELS.filter((x) => x.world === l.world).forEach((x) => {
    const b = document.createElement("button"); b.type = "button"; b.className = "fq-dot" + (x.id === l.id ? " is-cur" : "") + (isDone(x.id) ? " is-done" : "");
    b.textContent = x.n; b.setAttribute("role", "listitem"); const ok = unlocked(x.id); b.disabled = !ok;
    b.setAttribute("aria-label", T("lvl", { n: x.n }) + (isDone(x.id) ? " — " + "★".repeat(stars_[x.id] || 1) : ok ? "" : " — " + T("locked")));
    b.addEventListener("click", () => go(x.id)); box.appendChild(b);
  });
}
function go(id) {
  stop(); idx = id - 1; prog = { main: [], fn: [] }; sel = prog.main; hinted = false;
  $("advMsg").textContent = ""; $("advNext").hidden = true; $("advHint").disabled = false;
  drawBoard(); header(); renderProg();
  try { history.replaceState(null, "", "#" + id); } catch { /* ignore */ }
}

/* ---------- running ---------- */
function stop() { clearTimeout(timer); timer = 0; running = false; $("advRun").hidden = false; $("advStop").hidden = true; }
function finish(res) {
  const l = lvl(), msg = $("advMsg");
  stop(); palette();
  if (!res.ok) { msg.textContent = T(res.reason); return; }
  const s = stars(l, prog), r = award(GAME, l.id, hinted, l.base);
  saveStars(l.id, s);
  msg.textContent = r.earned ? T("ok", { p: r.earned, s }) : T("again", { s: readStars()[l.id] || s });
  $("advNext").hidden = l.id >= LEVELS.length; $("advBoard").classList.add("is-win"); setTimeout(() => $("advBoard").classList.remove("is-win"), 900);
  header();
}
function play() {
  const l = lvl(), v = validate(l, prog);
  if (!sizeOf(prog)) { $("advMsg").textContent = T("empty0"); return; }
  if (!v.ok) { $("advMsg").textContent = v.reason === "budget" ? T("budget", { b: l.budget }) : T(v.reason); return; }
  const res = run(l, prog); curSteps = res.steps;
  running = true; $("advRun").hidden = true; $("advStop").hidden = false; $("advMsg").textContent = ""; palette();
  if (reduced()) { drawBoard(res.steps.length - 1, res.steps); return finish(res); }
  let i = 0;
  const tick = () => { drawBoard(i, res.steps); if (++i < res.steps.length) timer = setTimeout(tick, 220); else timer = setTimeout(() => finish(res), 300); };
  tick();
}
$("advRun").addEventListener("click", play);
$("advStop").addEventListener("click", () => { stop(); drawBoard(); palette(); });
$("advClear").addEventListener("click", () => { stop(); prog = { main: [], fn: [] }; sel = prog.main; drawBoard(); renderProg(); $("advMsg").textContent = ""; });
$("advNext").addEventListener("click", () => { if (idx < LEVELS.length - 1) go(idx + 2); });
$("advHint").addEventListener("click", () => {
  hinted = true; const used = new Set(); const walk = (a) => a.forEach((b) => { used.add(b.op); [b.body, b.then, b.else].forEach((s) => s && walk(s)); });
  walk(lvl().solution.main); walk(lvl().solution.fn || []);
  $("advMsg").textContent = T("hint", { n: lvl().par, ops: [...used].map((o) => T(o)).join("، ") });
});
document.addEventListener("fayad:langchange", () => { header(); renderProg(); });
document.addEventListener("fayad:cloudsync", () => header());

const start = Math.min(120, Math.max(1, parseInt(location.hash.slice(1), 10) || 0));
const firstOpen = (() => { for (let n = 1; n <= 120; n++) if (!isDone(n)) return n; return 120; })();
go(start && unlocked(start) ? start : firstOpen);
