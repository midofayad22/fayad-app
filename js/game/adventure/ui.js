/*
  FAYAD Grand Adventure — game shell: intro, world map, level trail, play screen, block editor (real pointer drag-and-drop + tap-to-add + undo),
  animated execution that mirrors the engine's step list exactly, and explained win/fail feedback.
  The player's program is plain JSON interpreted only by the pure engine (no eval, no HTML from the player). Points are decided by the server (submit_solve).
*/
import { read, award } from "/js/game/store.js";
import { LEVELS, WORLDS } from "./levels.js";
import { run, validate, stars, sizeOf } from "./engine.js";
import { sceneSVG, particles } from "./art.js";
import { armDrag, confetti, countUp, pulse, reduced, sleep } from "/js/game/kit.js";

const F = window.FAYAD, $ = (id) => document.getElementById(id), GAME = "adventure", STAR_KEY = "fayad-adv-stars";
const WD = {
  ar: ["مروج البداية: خطوة بعد خطوة", "الكهوف: مفاتيح وفخاخ", "البحيرة: الحلقات تختصر الطريق", "غابة البلور: القرارات والشروط", "أطلال الصحراء: دوال تُعاد", "قلعة الحمم: الإتقان"],
  en: ["The Meadow: step by step", "The Caverns: keys and traps", "The Lagoon: loops shorten the way", "The Crystal Forest: decisions and conditions", "The Desert Ruins: reusable functions", "The Lava Keep: mastery"],
};
const DICT = {
  ar: { "fq.home": "الرئيسية", "fq.hub": "الألعاب", "fq.dash": "لوحة التقدم", "fq.points": "نقاط اللعبة", "fq.hint": "تلميح", "common.skip": "تخطي إلى المحتوى",
    "adv.eyebrow": "برمجة بالكتل · 120 مستوى", "adv.sub": "ساعد «فاي» على عبور 6 عوالم. ابنِ برنامجًا من الكتل، شاهده يتحرك، وتعلّم التسلسل والحلقات والشروط والدوال.", "adv.start": "ابدأ المغامرة", "adv.continue": "تابع من حيث توقفت", "adv.map": "الخريطة", "adv.worlds": "عوالم المغامرة", "adv.level": "المستوى",
    "adv.how1": "اسحب الكتل إلى البرنامج (أو المسها لإضافتها)", "adv.how2": "اضغط تشغيل وراقب الكتلة المُنفَّذة", "adv.how3": "أقل كتل = ثلاث نجوم", "adv.run": "تشغيل", "adv.stop": "إيقاف", "adv.undo": "تراجع", "adv.clear": "مسح البرنامج", "adv.speed": "السرعة", "adv.blocks": "الكتل",
    F: "تقدّم", L: "استدر يسارًا", R: "استدر يمينًا", repeat: "كرّر", until: "كرّر حتى العلم", if: "إذا", call: "نفّذ الدالة", main: "البرنامج", fn: "الدالة", cMotion: "حركة", cControl: "تحكّم", cFunc: "دوال",
    empty: "اسحب كتلة إلى هنا، أو المس كتلة من الأعلى لإضافتها", emptyFn: "عرّف الدالة هنا ثم استدعها بكتلة «نفّذ الدالة»", wallAhead: "جدار أمامك", openAhead: "الطريق أمامك مفتوح", openLeft: "يسارك مفتوح", openRight: "يمينك مفتوح", else: "وإلا", then: "عندئذٍ",
    world: "العالم {n}", goal: "أوصل «فاي» إلى العلم.", goalKeys: "اجمع المفاتيح كلها ثم أوصل «فاي» إلى العلم.", goalTrap: "تجنّب الفخاخ ✕.", size: "الكتل: {n}", sizeB: "الكتل: {n} / {b}", par: "ثلاث نجوم: {p} كتلة أو أقل", locked: "مقفل: أنهِ المستوى السابق",
    done: "{n} / 20 مستوى", wlocked: "مقفل", lvl: "المستوى {n}", empty0: "البرنامج فارغ: أضف كتلة أولًا.", budget: "كتل كثيرة: الحد الأقصى في هذا المستوى {b}.", "locked-block": "هذه الكتلة غير متاحة في هذا المستوى.",
    hint: "الحل المرجعي يستخدم {n} كتلة من الأنواع: {ops}.", running: "…يعمل", step: "الخطوة {n}",
    wTitle: "أحسنت!", wSub: "وصل «فاي» بأمان.", pts: "+{n} نقطة", ptsOld: "محلول سابقًا", used: "استخدمت {n} كتلة · المرجع {p}", more3: "للنجوم الثلاث جرّب {p} كتلة أو أقل.", unlocked: "فُتح المستوى {n}", worldDone: "اكتمل العالم!", next: "المستوى التالي", replay: "إعادة", toMap: "المسار",
    fTitle: "لم ينجح بعد", fNext: "ما العمل: ", hz: "وقع «فاي» في فخ عند الخطوة {n}.", hzNext: "غيّر الاتجاه قبل الكتلة المعلّمة بالأحمر لتدور حول ✕.", ex: "استغرق البرنامج خطوات أكثر من المسموح.", exNext: "ربما توجد حلقة لا تنتهي: تأكد أن كتلة «كرّر حتى العلم» تتحرك نحو العلم.",
    kl: "بقي {n} مفتاح لم يُجمع.", klNext: "اجعل المسار يمرّ على كل مفتاح قبل العلم.", bp: "اصطدم «فاي» بالجدار {n} مرة (الكتلة المعلّمة بالأحمر أول اصطدام).", bpNext: "أضف استدارة قبلها أو قلّل التقدّم.", ng: "توقف «فاي» على بعد {d} خانات من العلم.", ngNext: "أضف تقدّمًا أو زد عدد التكرار.", again: "جرّب مجددًا" },
  en: { "fq.home": "Home", "fq.hub": "Games", "fq.dash": "Progress dashboard", "fq.points": "Game points", "fq.hint": "Hint", "common.skip": "Skip to content",
    "adv.eyebrow": "Block coding · 120 levels", "adv.sub": "Help Fay cross 6 worlds. Build a program from blocks, watch it run, and learn sequences, loops, conditions and functions.", "adv.start": "Start the adventure", "adv.continue": "Continue where you left off", "adv.map": "Map", "adv.worlds": "Adventure worlds", "adv.level": "Level",
    "adv.how1": "Drag blocks into the program (or tap one to add it)", "adv.how2": "Press Run and watch the active block", "adv.how3": "Fewer blocks = three stars", "adv.run": "Run", "adv.stop": "Stop", "adv.undo": "Undo", "adv.clear": "Clear program", "adv.speed": "Speed", "adv.blocks": "Blocks",
    F: "Move forward", L: "Turn left", R: "Turn right", repeat: "Repeat", until: "Repeat until flag", if: "If", call: "Run function", main: "Program", fn: "Function", cMotion: "Motion", cControl: "Control", cFunc: "Functions",
    empty: "Drag a block here, or tap a block above to add it", emptyFn: "Define the function here, then call it with “Run function”", wallAhead: "wall ahead", openAhead: "path ahead is open", openLeft: "left is open", openRight: "right is open", else: "else", then: "then",
    world: "World {n}", goal: "Bring Fay to the flag.", goalKeys: "Collect every key, then bring Fay to the flag.", goalTrap: "Avoid the traps ✕.", size: "Blocks: {n}", sizeB: "Blocks: {n} / {b}", par: "Three stars: {p} blocks or fewer", locked: "Locked: finish the previous level",
    done: "{n} / 20 levels", wlocked: "Locked", lvl: "Level {n}", empty0: "The program is empty: add a block first.", budget: "Too many blocks: this level allows {b}.", "locked-block": "That block is not available on this level.",
    hint: "The reference solution uses {n} blocks of these types: {ops}.", running: "running…", step: "Step {n}",
    wTitle: "Well done!", wSub: "Fay arrived safely.", pts: "+{n} points", ptsOld: "Already solved", used: "You used {n} blocks · reference {p}", more3: "For three stars try {p} blocks or fewer.", unlocked: "Level {n} unlocked", worldDone: "World cleared!", next: "Next level", replay: "Replay", toMap: "Trail",
    fTitle: "Not yet", fNext: "What to do: ", hz: "Fay stepped on a trap at step {n}.", hzNext: "Change direction before the red block so Fay goes around the ✕.", ex: "The program ran for more steps than allowed.", exNext: "There may be a loop that never ends: make sure “Repeat until flag” moves toward the flag.",
    kl: "{n} key(s) were not collected.", klNext: "Make the path pass over every key before the flag.", bp: "Fay bumped into a wall {n} time(s) (the red block is the first bump).", bpNext: "Add a turn before it or move forward less.", ng: "Fay stopped {d} cells from the flag.", ngNext: "Add more moves or raise the repeat count.", again: "Try again" },
};
DICT.ar["gnav.home"] = "البداية"; DICT.ar["gnav.continue"] = "تابع اللعب"; DICT.ar["gnav.sections"] = "الأقسام";
DICT.en["gnav.home"] = "Start"; DICT.en["gnav.continue"] = "Continue"; DICT.en["gnav.sections"] = "Sections";
F?.i18n?.extend({ ar: DICT.ar, en: DICT.en });
const lang = () => (F?.i18n?.lang === "en" ? "en" : "ar");
const T = (k, p = {}) => String(DICT[lang()][k] ?? k).replace(/\{(\w+)\}/g, (_, x) => p[x] ?? "");

const readStars = () => { try { return JSON.parse(localStorage.getItem(STAR_KEY)) || {}; } catch { return {}; } };
const saveStars = (lv, s) => { const d = readStars(); if (!d[lv] || d[lv] < s) { d[lv] = s; try { localStorage.setItem(STAR_KEY, JSON.stringify(d)); } catch { /* blocked */ } } };
const isDone = (n) => !!read().games[GAME]?.solved[n];
const unlocked = (n) => n === 1 || isDone(n - 1) || isDone(n);
const firstOpen = () => { for (let n = 1; n <= 120; n++) if (!isDone(n)) return n; return 120; };

const NS = "http://www.w3.org/2000/svg";
const svg = (id, cls = "") => { const s = document.createElementNS(NS, "svg"); if (cls) s.setAttribute("class", cls); s.setAttribute("aria-hidden", "true"); const u = document.createElementNS(NS, "use"); u.setAttribute("href", "#" + id); s.appendChild(u); return s; };
const ICONS = { F: "M12 20V5M6 11l6-6 6 6", L: "M18 20v-7a5 5 0 00-5-5H6M10 3L5 8l5 5", R: "M6 20v-7a5 5 0 015-5h7M14 3l5 5-5 5", repeat: "M4 11a6 6 0 016-6h8M15 2l3 3-3 3M20 13a6 6 0 01-6 6H6M9 22l-3-3 3-3", until: "M5 21V4M5 5h11l-2 4 2 4H5M20 17l-3 3 3 3", if: "M12 3v6M12 9L5 15v6M12 9l7 6v6", call: "M8 4C5 4 5 8 5 12s0 8 3 8M16 4c3 0 3 4 3 8s0 8-3 8M9.5 12h5" };
const icon = (op) => { const s = document.createElementNS(NS, "svg"); s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("class", "bi"); s.setAttribute("aria-hidden", "true"); const p = document.createElementNS(NS, "path"); p.setAttribute("d", ICONS[op]); p.setAttribute("fill", "none"); p.setAttribute("stroke", "currentColor"); p.setAttribute("stroke-width", "2.6"); p.setAttribute("stroke-linecap", "round"); p.setAttribute("stroke-linejoin", "round"); s.appendChild(p); return s; };
const el = (tag, cls = "", txt = "") => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; };

/* ---------------- state ---------------- */
let idx = 0, prog = { main: [], fn: [] }, sel = prog.main, hist = [], hinted = false, running = false, token = 0, speed = 1, justUnlocked = 0, screen = "intro";
const lvl = () => LEVELS[idx];
const main = $("main");
const SCREENS = { intro: $("scrIntro"), map: $("scrMap"), world: $("scrWorld"), play: $("scrPlay") };
let curWorld = 1;

let sceneW = 0;
function setScene(w) { if (sceneW === w) return; sceneW = w; $("advScene").innerHTML = sceneSVG(w, "back") + '<div class="fx">' + particles(w) + "</div>"; }
function show(name, world) {
  stopRun(); screen = name; if (world) curWorld = world;
  const bg = name === "play" || name === "world" ? curWorld : LEVELS[firstOpen() - 1].world;
  main.dataset.screen = name; main.dataset.world = bg; setScene(bg);
  for (const [k, s] of Object.entries(SCREENS)) s.hidden = k !== name;
  const back = $("advBack"); back.hidden = false;
  $("advBackTxt").textContent = name === "intro" ? T("fq.hub") : name === "map" ? "" : name === "world" ? T("adv.map") : T("toMap");
  if (name === "map") $("advBackTxt").textContent = T("fq.hub");
  if (name === "map") $("advBackTxt").dataset.k = "";
  try { history.replaceState(null, "", name === "play" ? "#" + lvl().id : name === "world" ? "#w" + curWorld : name === "map" ? "#map" : location.pathname + location.search); } catch { /* ignore */ }
  window.scrollTo({ top: 0, behavior: "instant" });
  header();
}
$("advBack").addEventListener("click", () => {
  if (screen === "play") { renderTrail(curWorld); show("world", curWorld); }
  else if (screen === "world") { renderMap(); show("map"); }
  else if (screen === "map") show("intro");
  else location.href = "/play/index.html";
});

/* in-game navigation: section tabs */
function markNav() { document.querySelectorAll(".gnav-tab[data-go]").forEach((b) => { const k = b.dataset.go; b.setAttribute("aria-current", String(k === screen || (k === "map" && screen === "world"))); }); }
document.querySelectorAll(".gnav-tab[data-go]").forEach((b) => b.addEventListener("click", () => { const k = b.dataset.go; if (k === "continue") go(firstOpen()); else if (k === "map") { renderMap(); show("map"); } else show(k); }));
$("advStart").addEventListener("click", () => go(firstOpen()));
$("advToMap").addEventListener("click", () => { renderMap(); show("map"); });

/* ---------------- header / meta ---------------- */
function header() {
  markNav();
  const d = read(), st = readStars();
  $("advPoints").textContent = d.points;
  $("advStarTotal").textContent = Object.values(st).reduce((a, b) => a + b, 0);
  $("advStartTxt").textContent = Object.keys(d.games[GAME]?.solved || {}).length ? T("adv.continue") : T("adv.start");
}
const WORLD_ICON = ["s-flag", "s-key", "s-hero", "s-star", "s-trap", "s-hero"];
function worldProgress(w) {
  const st = readStars(), lv = LEVELS.filter((l) => l.world === w); let n = 0, s = 0;
  lv.forEach((l) => { if (isDone(l.id)) { n++; s += st[l.id] || 1; } }); return { n, s };
}
function renderMap() {
  const ol = $("advWorldMap"); ol.textContent = ""; const cur = LEVELS[firstOpen() - 1].world;
  WORLDS.forEach((w, i) => {
    const li = el("li"); li.dataset.world = w.id; const b = el("button", "adv-world" + (w.id === cur ? " is-current" : "")); b.type = "button"; b.style.setProperty("--i", i);
    const first = i * 20 + 1, ok = unlocked(first), pr = worldProgress(w.id);
    b.disabled = !ok;
    const art = el("div", "adv-world-art"); art.innerHTML = sceneSVG(w.id, "card-scene");
    art.appendChild(el("span", "adv-world-n", w.id)); art.appendChild(svg(WORLD_ICON[i], "wi")); const lk = el("div", "adv-world-lock"); lk.appendChild(svg("s-lock")); art.appendChild(lk);
    const info = el("div", "adv-world-info"); info.appendChild(el("strong", "", WD[lang()][i])); info.appendChild(el("small", "", ok ? T("done", { n: pr.n }) + " · ★ " + pr.s + "/60" : T("wlocked") + " — " + T("locked")));
    const m = el("div", "adv-world-meter"), f = el("i"); f.style.setProperty("--p", (pr.n / 20) * 100 + "%"); m.appendChild(f); info.appendChild(m);
    b.append(art, info); b.addEventListener("click", () => { renderTrail(w.id); show("world", w.id); }); li.appendChild(b); ol.appendChild(li);
  });
}
function renderTrail(w) {
  curWorld = w; main.dataset.world = w; const ol = $("advTrail"); ol.textContent = ""; const st = readStars(), fo = firstOpen();
  $("advWorldNo").textContent = T("world", { n: w }); $("advWorldTitle").textContent = WD[lang()][w - 1]; $("advWorldDesc").textContent = T("done", { n: worldProgress(w).n });
  LEVELS.filter((l) => l.world === w).forEach((l, i) => {
    const li = el("li", (isDone(l.id) ? "done " : "") + (l.n % 5 === 0 ? "row-end" : "")), ok = unlocked(l.id);
    const b = el("button", "adv-node" + (isDone(l.id) ? " done" : "") + (l.id === fo ? " cur" : "") + (l.n % 5 === 0 ? " boss" : "") + (l.id === justUnlocked ? " is-new" : "")); b.type = "button"; b.style.setProperty("--i", i); b.disabled = !ok;
    b.setAttribute("aria-label", T("lvl", { n: l.n }) + (isDone(l.id) ? " — ★" + (st[l.id] || 1) : ok ? "" : " — " + T("locked")));
    if (ok) b.appendChild(document.createTextNode(l.n)); else { b.appendChild(svg("s-lock", "lk")); }
    if (isDone(l.id)) { const ns = el("span", "ns"); for (let k = 1; k <= 3; k++) { const s = svg("s-star"); if (k > (st[l.id] || 1)) s.setAttribute("class", "off"); ns.appendChild(s); } b.appendChild(ns); }
    b.addEventListener("click", () => go(l.id)); li.appendChild(b); ol.appendChild(li);
  });
  justUnlocked = 0;
}

/* ---------------- board ---------------- */
let H = null; // hero state
function buildBoard() {
  const l = lvl(), rows = l.grid, C = rows[0].length, R = rows.length, board = $("advBoard"); board.textContent = "";
  board.style.setProperty("--c", C); board.style.setProperty("--r", R); board.style.setProperty("--ar", C / R); board.style.setProperty("--w", Math.min(C * 72, 620) + "px");
  const grid = el("div", "adv-grid"); let start = null;
  rows.forEach((row, y) => [...row].forEach((ch, x) => {
    const c = el("div", "adv-c" + ((x + y) % 2 ? " alt" : "")); c.dataset.p = y * C + x;
    const h = (x * 73856093 ^ y * 19349663 ^ l.id * 83492791) >>> 0; if (ch === "." && h % 7 === 0) c.classList.add("d" + (1 + (h % 2)));
    if (ch === "#") c.classList.add("is-wall");
    else if (ch === "G") { c.classList.add("is-goal"); c.appendChild(svg("s-flag", "e")); }
    else if (ch === "k") { c.classList.add("is-key"); c.appendChild(svg("s-key", "e")); }
    else if (ch === "x") { c.classList.add("is-trap"); c.appendChild(svg("s-trap", "e")); }
    else if ("^>v<".includes(ch)) start = { x, y, dir: "^>v<".indexOf(ch) };
    grid.appendChild(c);
  }));
  const hero = el("div", "adv-hero idle"); hero.appendChild(svg("s-hero")); board.append(grid, hero);
  H = { hero, start, C, ang: start.dir * 90, dir: start.dir, grid };
  placeHero(start.x, start.y, 0);
}
function placeHero(x, y, ms) { const h = H.hero; h.style.setProperty("--step", ms + "ms"); h.style.setProperty("--hx", x); h.style.setProperty("--hy", y); h.style.setProperty("--ang", H.ang + "deg"); }
function resetBoard() { if (!H) return; buildBoard(); }

/* ---------------- program editing ---------------- */
const OPS = [["cMotion", ["F", "L", "R"]], ["cControl", ["repeat", "until", "if"]], ["cFunc", ["call"]]];
const mk = (op) => (op === "repeat" ? { op, n: 3, body: [] } : op === "until" ? { op, body: [] } : op === "if" ? { op, cond: "wallAhead", then: [], else: [] } : { op });
const snap = () => JSON.stringify(prog);
function mutate(fn) { hist.push(snap()); if (hist.length > 60) hist.shift(); fn(); afterEdit(); }
function afterEdit() { if (!running) { resetBoard(); $("advMsg").textContent = ""; } renderProg(); }
function undo() { if (!hist.length || running) return; prog = JSON.parse(hist.pop()); sel = prog.main; afterEdit(); }
function listsOf(p) { const out = []; const walk = (a) => a.forEach((b) => { [b.body, b.then, b.else].forEach((s) => s && (out.push(s), walk(s))); }); out.push(p.main, p.fn); walk(p.main); walk(p.fn); return out; }
const within = (block, list) => { const walk = (a) => a.some((b) => [b.body, b.then, b.else].some((s) => s && (s === list || walk(s)))); return walk([block]); };
const zoneList = new WeakMap(), blockEls = new Map();

function ghostFor(op, label) { const g = el("div", "adv-op adv-op-" + op); g.append(icon(op), el("span", "", label)); return g; }
function dropTarget(x, y, block) {
  const t = document.elementFromPoint(x, y); if (!t) return null;
  if (t.closest("#advPalette")) return { trash: true };
  const z = t.closest(".adv-zone"); if (!z) return null;
  const list = zoneList.get(z); if (!list || (block && (list === block.body || list === block.then || list === block.else || within(block, list)))) return null;
  let i = list.length; const kids = [...z.children].filter((c) => c.classList.contains("adv-blk") && !c.classList.contains("is-drag"));
  for (const k of kids) { const r = k.getBoundingClientRect(); if (y < r.top + r.height / 2) { i = +k.dataset.i; break; } }
  return { z, list, i };
}
function mark(tg) { document.querySelectorAll(".is-over,.ins,.ins-end").forEach((n) => n.classList.remove("is-over", "ins", "ins-end")); if (!tg || tg.trash) return; tg.z.classList.add("is-over"); const k = [...tg.z.children].find((c) => c.classList?.contains("adv-blk") && +c.dataset.i === tg.i); if (k) k.classList.add("ins"); else tg.z.classList.add("ins-end"); }
function dragPalette(btn, op) {
  armDrag(btn, () => { if (btn.disabled || running) return null; let tg = null; return { ghost: ghostFor(op, T(op)), move: (x, y) => { tg = dropTarget(x, y); mark(tg); }, drop: (x, y) => { tg = dropTarget(x, y); mark(null); if (tg && !tg.trash) mutate(() => { tg.list.splice(tg.i, 0, mk(op)); sel = tg.list; }); }, cancel: () => mark(null) }; });
}
function dragBlock(handle, b, list, i, node) {
  armDrag(handle, () => {
    if (running) return null; let tg = null; node.classList.add("is-drag");
    return { ghost: ghostFor(b.op, T(b.op)), move: (x, y) => { tg = dropTarget(x, y, b); mark(tg); },
      drop: (x, y) => { tg = dropTarget(x, y, b); mark(null); node.classList.remove("is-drag");
        if (!tg) { renderProg(); return; }
        mutate(() => { const at = list.indexOf(b); list.splice(at, 1); if (tg.trash) return; let k = tg.i; if (tg.list === list && at < k) k--; tg.list.splice(k, 0, b); sel = tg.list; }); },
      cancel: () => { mark(null); node.classList.remove("is-drag"); } };
  });
}
function palette() {
  const p = $("advPalette"); p.textContent = "";
  for (const [cap, ops] of OPS) {
    const usable = ops.filter((o) => lvl().blocks.includes(o)); if (!usable.length && cap !== "cMotion") continue;
    p.appendChild(el("p", "adv-pal-cap", T(cap)));
    for (const op of ops) {
      if (!lvl().blocks.includes(op) && cap !== "cMotion" && !ops.some((o) => lvl().blocks.includes(o))) continue;
      const b = el("button", "adv-op adv-op-" + op); b.type = "button"; b.append(icon(op), el("span", "", T(op))); const ok = lvl().blocks.includes(op); b.disabled = !ok || running; if (!ok) b.title = T("locked-block");
      b.addEventListener("click", () => { if (b.disabled) return; mutate(() => { const nb = mk(op); sel.push(nb); sel = nb.body || nb.then || sel; }); });
      dragPalette(b, op); p.appendChild(b);
    }
  }
}
function zone(list, label, isMain) {
  const z = el("div", "adv-zone" + (list === sel ? " is-sel" : "")); zoneList.set(z, list); z.setAttribute("role", "group"); z.setAttribute("aria-label", label || T("main"));
  z.tabIndex = 0; if (label) z.appendChild(el("p", "adv-zl", label));
  z.addEventListener("click", (e) => { if (e.target === z || e.target.classList.contains("adv-zl") || e.target.classList.contains("adv-empty")) { sel = list; renderProg(); } });
  z.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && e.target === z) { e.preventDefault(); sel = list; renderProg(); } });
  if (!list.length) z.appendChild(el("p", "adv-empty", isMain === "fn" ? T("emptyFn") : T("empty")));
  list.forEach((b, i) => z.appendChild(blockEl(b, list, i)));
  return z;
}
function blockEl(b, list, i) {
  const node = el("div", "adv-blk adv-op-" + b.op); node.dataset.i = i; blockEls.set(b, node);
  const head = el("div", "adv-bh"); head.tabIndex = 0; head.setAttribute("aria-label", T(b.op));
  head.append(el("span", "gr", "⋮⋮"), icon(b.op), el("span", "", T(b.op)));
  if (b.op === "repeat") { const s = el("select"); s.setAttribute("aria-label", T("repeat")); for (let n = 2; n <= 9; n++) { const o = el("option", "", "×" + n); o.value = n; if (n === b.n) o.selected = true; s.appendChild(o); } s.addEventListener("change", () => { hist.push(snap()); b.n = +s.value; afterEdit(); }); head.appendChild(s); }
  if (b.op === "if") { const s = el("select"); s.setAttribute("aria-label", T("if")); for (const c of ["wallAhead", "openAhead", "openLeft", "openRight"]) { const o = el("option", "", T(c)); o.value = c; if (c === b.cond) o.selected = true; s.appendChild(o); } s.addEventListener("change", () => { hist.push(snap()); b.cond = s.value; afterEdit(); }); head.appendChild(s); }
  const x = el("button", "adv-x", "×"); x.type = "button"; x.setAttribute("aria-label", "remove"); x.disabled = running; x.addEventListener("click", () => mutate(() => { if ([b.body, b.then, b.else].includes(sel) || within(b, sel)) sel = list; list.splice(list.indexOf(b), 1); }));
  head.appendChild(x); node.appendChild(head); dragBlock(head, b, list, i, node);
  head.addEventListener("keydown", (e) => {
    if (e.target !== head || running) return;
    if (e.key === "Delete" || e.key === "Backspace") { e.preventDefault(); mutate(() => list.splice(list.indexOf(b), 1)); }
    else if (e.altKey && (e.key === "ArrowUp" || e.key === "ArrowDown")) { e.preventDefault(); const at = list.indexOf(b), to = at + (e.key === "ArrowUp" ? -1 : 1); if (to < 0 || to >= list.length) return; mutate(() => { list.splice(to, 0, list.splice(at, 1)[0]); }); blockEls.get(b)?.querySelector(".adv-bh")?.focus(); }
  });
  if (b.body) node.appendChild(zone(b.body, ""));
  if (b.then) { node.appendChild(zone(b.then, T("then"))); node.appendChild(zone(b.else, T("else"))); }
  return node;
}
function renderProg() {
  const box = $("advProg"); box.textContent = ""; blockEls.clear();
  if (!listsOf(prog).includes(sel)) sel = prog.main;
  box.appendChild(zone(prog.main, lvl().hasFn ? T("main") : "", "main")); if (lvl().hasFn) box.appendChild(zone(prog.fn, T("fn"), "fn"));
  palette(); updateSize(); $("advUndo").disabled = !hist.length || running; $("advClear").disabled = running;
}
function updateSize() { const l = lvl(), n = sizeOf(prog); $("advSize").textContent = (l.budget ? T("sizeB", { n, b: l.budget }) : T("size", { n })) + " · " + T("par", { p: l.par }); }

/* ---------------- level setup ---------------- */
function paintStars(host, n, total = 3) { host.textContent = ""; for (let k = 1; k <= total; k++) { const s = svg("s-star"); if (k > n) s.setAttribute("class", "off"); host.appendChild(s); } host.setAttribute("aria-label", n + "/" + total); }
function go(id) {
  stopRun(); idx = id - 1; curWorld = lvl().world; prog = { main: [], fn: [] }; sel = prog.main; hist = []; hinted = false;
  const l = lvl(), w = WORLDS[l.world - 1];
  $("advWorld").textContent = T("world", { n: w.id }) + " · " + WD[lang()][w.id - 1].split(":")[0]; $("advNo").textContent = l.n + " / 20";
  const hasKeys = l.grid.some((r) => r.includes("k")), hasTrap = l.grid.some((r) => r.includes("x"));
  $("advGoalTxt").textContent = (hasKeys ? T("goalKeys") : T("goal")) + (hasTrap ? " " + T("goalTrap") : "");
  paintStars($("advStars"), readStars()[l.id] || 0); $("advMsg").textContent = ""; $("advLive").textContent = ""; $("advLive").setAttribute("aria-live", "off"); $("advModal").hidden = true;
  show("play", l.world); buildBoard(); renderProg();
  SCREENS.play.style.animation = "none"; void SCREENS.play.offsetWidth; SCREENS.play.style.animation = "";
}

/* ---------------- execution ---------------- */
function setTools(on) { running = on; $("advRun").hidden = on; $("advStop").hidden = !on; $("advHint").disabled = on; renderProg(); }
function stopRun() { token++; if (running) { running = false; $("advRun").hidden = false; $("advStop").hidden = true; $("advHint").disabled = false; } clearHi(); }
function clearHi() { document.querySelectorAll(".adv-blk.is-run,.adv-blk.is-run-p,.adv-blk.is-bad").forEach((n) => n.classList.remove("is-run", "is-run-p", "is-bad")); }
function hi(trail, cls) { clearHi(); trail.forEach((b, k) => blockEls.get(b)?.classList.add(k === trail.length - 1 ? cls : "is-run-p")); const t = blockEls.get(trail[trail.length - 1]); if (t && !reduced()) t.scrollIntoView({ block: "nearest", behavior: "smooth" }); }
function spark(x, y, bad) { const f = el("div", "adv-fx" + (bad ? " bad" : "")); f.style.setProperty("--fx", x); f.style.setProperty("--fy", y); for (let i = 0; i < 6; i++) f.appendChild(el("i")); $("advBoard").appendChild(f); setTimeout(() => f.remove(), 800); }
async function play() {
  const l = lvl();
  if (!sizeOf(prog)) { feedback("bad", T("fTitle"), T("empty0")); return; }
  const v = validate(l, prog); if (!v.ok) { feedback("bad", T("fTitle"), v.reason === "budget" ? T("budget", { b: l.budget }) : T(v.reason)); return; }
  const res = run(l, prog), my = ++token; resetBoard(); setTools(true); $("advMsg").textContent = ""; $("advLive").textContent = T("running");
  const ms = reduced() ? 0 : Math.round(430 / speed), C = H.C; let n = 0;
  for (const s of res.steps.slice(1)) {
    if (my !== token) return; n++;
    hi(s.trail, s.bump ? "is-bad" : "is-run");
    const ddir = (s.dir - H.dir + 4) % 4; if (ddir) { H.ang += ddir === 1 ? 90 : ddir === 3 ? -90 : 180; H.dir = s.dir; }
    const h = H.hero; h.classList.remove("idle", "is-hop", "is-bump"); void h.offsetWidth;
    if (s.bump) { h.classList.add("is-bump"); $("advBoard").classList.add("is-shake"); setTimeout(() => $("advBoard").classList.remove("is-shake"), 400); }
    else { if (s.x !== undefined) h.classList.add("is-hop"); }
    placeHero(s.x, s.y, ms);
    $("advLive").textContent = T("step", { n }) + " · " + T(s.trail[s.trail.length - 1].op);
    if (s.took) { const cell = H.grid.children[s.y * C + s.x]; cell.classList.remove("is-key"); cell.querySelector(".e")?.remove(); spark(s.x, s.y, false); }
    if (res.reason === "hazard" && s === res.steps[res.steps.length - 1]) { spark(s.x, s.y, true); await sleep(ms * 0.8); h.classList.add("is-dead"); }
    if (ms) await sleep(ms); if (my !== token) return;
  }
  if (my !== token) return; clearHi(); $("advLive").textContent = ""; setTools(false);
  if (res.ok) win(res); else fail(res);
}
function feedback(kind, title, ...lines) { const b = $("advMsg"); b.textContent = ""; const d = el("div", "adv-fb " + kind); d.appendChild(el("b", "", title)); lines.filter(Boolean).forEach((t) => d.appendChild(el("p", "", t))); b.appendChild(d); d.scrollIntoView?.({ block: "nearest", behavior: reduced() ? "auto" : "smooth" }); }
function fail(res) {
  const l = lvl(), bumps = res.steps.filter((s) => s.bump);
  let title = T("fTitle"), what, next, bad = null;
  if (res.reason === "hazard") { const s = res.steps[res.steps.length - 1]; what = T("hz", { n: res.steps.length - 1 }); next = T("hzNext"); bad = s.trail.at(-1); }
  else if (res.exhausted) { what = T("ex"); next = T("exNext"); }
  else if (res.reason === "keys-left") { what = T("kl", { n: res.keysLeft }); next = T("klNext"); }
  else if (bumps.length) { what = T("bp", { n: bumps.length }); next = T("bpNext"); bad = bumps[0].trail.at(-1); }
  else { const e = res.steps.at(-1), d = Math.abs(e.x - res.goal.x) + Math.abs(e.y - res.goal.y); what = T("ng", { d }); next = T("ngNext"); }
  if (bad) { blockEls.get(bad)?.classList.add("is-bad"); }
  feedback("bad", title, what, T("fNext") + next);
  $("advLive").setAttribute("aria-live", "off");
}
function win(res) {
  const l = lvl(), s = stars(l, prog), before = isDone(l.id), nextWas = l.id < 120 && unlocked(l.id + 1);
  const r = award(GAME, l.id, hinted, l.base); saveStars(l.id, s);
  const h = H.hero; h.classList.remove("idle", "is-hop"); h.classList.add("is-win"); paintStars($("advStars"), readStars()[l.id]); header();
  confetti($("advBoard").parentElement);
  if (!nextWas && l.id < 120) justUnlocked = l.id + 1;
  const doneWorld = l.n === 20; setTimeout(() => modal(l, s, r.earned, before, !nextWas && l.id < 120, doneWorld), reduced() ? 0 : 1000);
}
function modal(l, s, earned, before, newUnlock, doneWorld) {
  const m = $("advModal"); m.textContent = ""; m.dataset.world = l.world; const sh = el("div", "adv-sheet"); sh.id = "advSheet";
  const hero = svg("s-hero", "adv-intro-hero"); hero.setAttribute("viewBox", "0 0 48 48"); hero.style.width = "86px"; sh.appendChild(hero);
  const h2 = el("h2", "", doneWorld ? T("worldDone") : T("wTitle")); h2.id = "advModalT"; sh.append(h2, el("p", "", T("wSub")));
  const bs = el("div", "adv-bigstars"); bs.setAttribute("role", "img"); bs.setAttribute("aria-label", s + "/3");
  for (let k = 1; k <= 3; k++) { const st = svg("s-star"); st.setAttribute("class", k <= s ? "on" : ""); st.style.setProperty("--k", k - 1); bs.appendChild(st); } sh.appendChild(bs);
  const rw = el("div", "adv-reward"), pc = el("span", "adv-chip"); if (earned) { const nb = el("b", "", "0"); pc.append(document.createTextNode("+"), nb, document.createTextNode(" " + (lang() === "en" ? "points" : "نقطة"))); countUp(nb, earned, 900); } else pc.textContent = T("ptsOld"); rw.appendChild(pc);
  if (newUnlock) rw.appendChild(el("span", "adv-chip new", doneWorld && l.id < 120 ? T("worldDone") + " · " + T("world", { n: l.world + 1 }) : T("unlocked", { n: l.id + 1 })));
  sh.appendChild(rw); sh.appendChild(el("p", "", T("used", { n: sizeOf(prog), p: l.par }) + (s < 3 ? " — " + T("more3", { p: l.par }) : "")));
  const row = el("div", "row");
  if (l.id < 120) { const nx = el("button", "adv-btn adv-btn-primary", T("next")); nx.type = "button"; nx.addEventListener("click", () => go(l.id + 1)); row.appendChild(nx); }
  const rp = el("button", "adv-btn", T("replay")); rp.type = "button"; rp.addEventListener("click", () => { m.hidden = true; resetBoard(); });
  const tr = el("button", "adv-btn", T("toMap")); tr.type = "button"; tr.addEventListener("click", () => { m.hidden = true; renderTrail(l.world); show("world", l.world); });
  row.append(rp, tr); sh.appendChild(row); m.appendChild(sh); m.hidden = false; confetti(sh, 46);
  (row.querySelector(".adv-btn-primary") || rp).focus();
  m.onkeydown = (e) => { if (e.key === "Escape") { m.hidden = true; } else if (e.key === "Tab") { const f = [...sh.querySelectorAll("button")]; const i = f.indexOf(document.activeElement); e.preventDefault(); f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus(); } };
  m.onclick = (e) => { if (e.target === m) m.hidden = true; };
}

/* ---------------- controls ---------------- */
$("advRun").addEventListener("click", play);
$("advStop").addEventListener("click", () => { stopRun(); resetBoard(); renderProg(); $("advLive").textContent = ""; });
$("advUndo").addEventListener("click", undo);
$("advClear").addEventListener("click", () => { if (!sizeOf(prog)) return; mutate(() => { prog = { main: [], fn: [] }; sel = prog.main; }); });
$("advSpeed").addEventListener("click", () => { speed = speed === 1 ? 2 : speed === 2 ? 3 : 1; $("advSpeed").textContent = speed + "×"; });
$("advHint").addEventListener("click", () => {
  hinted = true; const used = new Set(); const walk = (a) => a.forEach((b) => { used.add(b.op); [b.body, b.then, b.else].forEach((s) => s && walk(s)); }); walk(lvl().solution.main); walk(lvl().solution.fn || []);
  feedback("good", T("fq.hint"), T("hint", { n: lvl().par, ops: [...used].map((o) => T(o)).join("، ") }));
});
document.addEventListener("keydown", (e) => { if ((e.ctrlKey || e.metaKey) && e.key === "z" && screen === "play" && !e.target.closest("select,input")) { e.preventDefault(); undo(); } });
document.addEventListener("fayad:langchange", () => { header(); if (screen === "map") renderMap(); else if (screen === "world") renderTrail(curWorld); else if (screen === "play") { go(lvl().id); } });
document.addEventListener("fayad:cloudsync", () => { header(); if (screen === "map") renderMap(); else if (screen === "world") renderTrail(curWorld); });

/* ---------------- boot ---------------- */
function route() {
  header(); const hash = location.hash.slice(1), wm = /^w([1-6])$/.exec(hash), num = parseInt(hash, 10);
  if (wm && unlocked((+wm[1] - 1) * 20 + 1)) { renderTrail(+wm[1]); show("world", +wm[1]); }
  else if (hash === "map") { renderMap(); show("map"); }
  else if (num >= 1 && num <= 120) go(unlocked(num) ? num : firstOpen());
  else show("intro");
}
window.addEventListener("hashchange", route);
route();
