/* Flex Quest — game screen. Real CSS in a sandboxed board; win = every crate matches the hidden reference layout. Progress: game id "flex", levels 1–24. */
const F = window.FAYAD;
import { read, award } from "/js/game/store.js";
import { upgradeEditor } from "/js/engine/editor.js";
import { LEVELS, CHAPTERS, BASE_POINTS } from "./levels.js";
import { makeBoard, compare } from "./board.js";

const DICT = {
  ar: { "fq.home": "الرئيسية", "fq.hub": "الألعاب", "fq.dash": "لوحة التقدم", "fq.sub": "أنت مشرف رصيف: اكتب CSS حقيقيًا وشاهد الصناديق تتحرك حتى تطابق الخطة.", "fq.points": "نقاط اللعبة",
    "fq.note": "نقاط اللعبة تُحفظ على هذا الجهاز وتُحسب منفصلة عن نقاط الدروس: 10 نقاط لكل مرحلة تُحلّ لأول مرة (12 للمراحل المتقدمة)، و5 إضافية إن حللتها دون تلميح.",
    "fq.map": "← الخريطة", "fq.target": "الخطة (الهدف)", "fq.yours": "لوحتك", "fq.hint": "تلميح", "fq.sol": "أرني الحل", "fq.reset": "إعادة الضبط", "fq.learn": "تعلّم", "fq.won": "وصلت الشحنة! 🚢", "fq.alts": "طرق أخرى صحيحة", "fq.next": "المرحلة التالية",
    level: "المرحلة {n}", placed: "{a} / {b} في مكانها", locked: "أنهِ المرحلة السابقة أولًا", noHint: "لا مزيد من التلميحات. جرّب «أرني الحل» إن علقت.", solShown: "هذا هو الحل المرجعي. اقرأه ثم اكتبه بنفسك لتفهمه.", pts: "+{p} نقطة", again: "حُلّت من قبل", allDone: "أنهيت كل المراحل! أنت مشرف الرصيف الأول 🏆",
    mapHint: "المرحلة {n} · {s}", done: "محلولة", stars: "{n} من 3 نجوم", starWhy: "نجمة لحلّ المرحلة، نجمة لحلّها دون تلميح أو كشف الحل، ونجمة لحلّ مختصر." },
  en: { "fq.home": "Home", "fq.hub": "Games", "fq.dash": "Progress dashboard", "fq.sub": "You run the harbor: write real CSS and watch the crates move until they match the plan.", "fq.points": "Game points",
    "fq.note": "Game points are saved on this device and counted separately from lesson points: 10 per level solved for the first time (12 for the advanced ones), plus 5 if solved without a hint.",
    "fq.map": "← Map", "fq.target": "The plan (target)", "fq.yours": "Your board", "fq.hint": "Hint", "fq.sol": "Show solution", "fq.reset": "Reset", "fq.learn": "Learn", "fq.won": "Cargo delivered! 🚢", "fq.alts": "Other valid ways", "fq.next": "Next level",
    level: "Level {n}", placed: "{a} / {b} in place", locked: "Finish the previous level first", noHint: "No more hints. Try 'Show solution' if you are stuck.", solShown: "This is the reference solution. Read it, then type it yourself to understand it.", pts: "+{p} points", again: "Already solved", allDone: "You finished every level! Harbor master 🏆",
    mapHint: "Level {n} · {s}", done: "solved", stars: "{n} of 3 stars", starWhy: "One star for solving, one for solving without a hint or the solution, one for a concise solution." },
};
F?.i18n?.extend({ ar: DICT.ar, en: DICT.en });
const lang = () => (F?.i18n?.lang === "en" ? "en" : "ar");
const T = (k, p = {}) => String(DICT[lang()][k] ?? k).replace(/\{(\w+)\}/g, (_, x) => p[x] ?? "");
const $ = (id) => document.getElementById(id);
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

const STAR_KEY = "fayad-fq-stars";
const readStars = () => { try { return JSON.parse(localStorage.getItem(STAR_KEY)) || {}; } catch { return {}; } };
const saveStars = (id, n) => { const d = readStars(); if ((d[id] || 0) < n) { d[id] = n; try { localStorage.setItem(STAR_KEY, JSON.stringify(d)); } catch { /* blocked */ } } };
const solvedMap = () => read().games.flex?.solved || {};
const unlocked = (n) => n === 1 || !!solvedMap()[n - 1] || !!solvedMap()[n];
const starSvg = (on) => `<svg viewBox="0 0 24 24" class="${on ? "on" : ""}" aria-hidden="true"><path d="M12 2.8l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.7l-5.9 3.1 1.2-6.5L2.5 9.7l6.6-.9z"/></svg>`;
const paintStars = (el, n) => { el.innerHTML = [0, 1, 2].map((i) => starSvg(i < n)).join(""); el.setAttribute("aria-label", T("stars", { n })); };
const decls = (css) => (String(css).replace(/\/\*[\s\S]*?\*\//g, "").match(/[\w-]+\s*:\s*[^;{}]+/g) || []).length;

let idx = 0, target = null, mine = null, targetRects = null, hintN = 0, hinted = false, solShown = false, solved = false, timer = 0, editorUp = false;
const lvl = () => LEVELS[idx];

function renderMap() {
  const d = read(), done = d.games.flex?.solved || {}, stars = readStars();
  $("fqPoints").textContent = d.points;
  const box = $("fqChapters"); box.textContent = "";
  CHAPTERS.forEach((c) => {
    const sec = document.createElement("section"); sec.className = "fqg-chap";
    sec.innerHTML = `<header><h2></h2><p></p></header><div class="fqg-lv"></div>`;
    sec.querySelector("h2").textContent = c.name[lang()]; sec.querySelector("p").textContent = c.blurb[lang()];
    const row = sec.querySelector(".fqg-lv");
    LEVELS.filter((l) => l.chapter === c.id).forEach((l) => {
      const b = document.createElement("a"); b.className = "fqg-node" + (done[l.id] ? " is-done" : "") + (unlocked(l.id) ? "" : " is-locked");
      b.href = "#" + l.id; b.setAttribute("aria-label", T("level", { n: l.id }) + (done[l.id] ? " · " + T("done") : unlocked(l.id) ? "" : " · " + T("locked")));
      if (!unlocked(l.id)) { b.setAttribute("aria-disabled", "true"); b.tabIndex = -1; b.addEventListener("click", (e) => e.preventDefault()); }
      b.innerHTML = `<b>${l.id}</b><span class="fqg-st">${[0, 1, 2].map((i) => starSvg(i < (stars[l.id] || (done[l.id] ? 1 : 0)))).join("")}</span>`;
      row.appendChild(b);
    });
    box.appendChild(sec);
  });
}

function show(screen) { $("fqMap").hidden = screen !== "map"; $("fqPlay").hidden = screen !== "play"; window.scrollTo(0, 0); }

async function openLevel(n) {
  const i = LEVELS.findIndex((l) => l.id === n); if (i < 0 || !unlocked(n)) { location.hash = ""; return; }
  idx = i; const l = lvl(); hintN = 0; hinted = false; solShown = false; solved = false;
  clearTimeout(timer); target?.destroy(); mine?.destroy();
  $("fqChap").textContent = CHAPTERS[l.chapter - 1].name[lang()]; $("fqTitle").textContent = T("level", { n: l.id });
  $("fqBrief").textContent = l.brief[lang()]; $("fqTeach").textContent = l.teach[lang()];
  $("fqHintBox").hidden = true; $("fqHints").textContent = ""; $("fqWin").hidden = true; $("fqMsg").textContent = ""; $("fqCount").textContent = ""; $("fqChips").textContent = "";
  paintStars($("fqStarsNow"), readStars()[l.id] || (solvedMap()[l.id] ? 1 : 0));
  show("play");
  target = makeBoard($("fqTarget"), l, { label: T("fq.target") }); mine = makeBoard($("fqMine"), l, { label: T("fq.yours") });
  targetRects = await target.setCss(l.solution, false);
  setCode(l.start); await refresh(false);
}

function setCode(css) {
  const ta = $("fqCss"); ta.value = css;
  if (!editorUp) { editorUp = true; upgradeEditor(ta, { language: "css" }); }
}

async function refresh(animate = true) {
  const l = lvl(), r = await mine.setCss($("fqCss").value, animate); if (!r || !targetRects) return;
  const c = compare(r, targetRects); mine.mark(c.ok);
  $("fqCount").textContent = T("placed", { a: c.ok.filter(Boolean).length, b: c.ok.length });
  const L = "ABCDEF"; $("fqChips").innerHTML = c.ok.map((ok, i) => `<i class="${ok ? "ok" : ""}">${L[i]}</i>`).join("");
  if (c.all && !solved) win();
}

function win() {
  solved = true; const l = lvl(), css = $("fqCss").value;
  const r = award("flex", l.id, hinted || solShown, BASE_POINTS(l.id));
  const stars = 1 + (!hinted && !solShown ? 1 : 0) + (decls(css) <= decls(l.solution) + 1 ? 1 : 0);
  saveStars(l.id, stars); paintStars($("fqStarsNow"), Math.max(stars, readStars()[l.id] || 0)); paintStars($("fqWinStars"), stars);
  $("fqPoints").textContent = r.data.points; $("fqWinPts").textContent = r.earned ? T("pts", { p: r.earned }) : T("again");
  $("fqWinWhy").textContent = l.teach[lang()];
  const alts = $("fqAltList"); alts.textContent = ""; [l.solution, ...l.alts].forEach((a) => { const pre = document.createElement("pre"); pre.textContent = a; alts.appendChild(pre); });
  $("fqNext").hidden = idx >= LEVELS.length - 1; $("fqWin").hidden = false; mine.win();
  if (LEVELS.every((x) => r.data.games.flex?.solved[x.id])) $("fqMsg").textContent = T("allDone");
  $("fqWin").scrollIntoView({ block: "nearest", behavior: reduced() ? "auto" : "smooth" });
  document.dispatchEvent(new CustomEvent("fayad:gamepoints", { detail: { points: r.data.points } }));
}

$("fqCss").addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(() => refresh(true), 180); });
$("fqHint").addEventListener("click", () => {
  const l = lvl(); if (hintN >= l.hints.length) { $("fqMsg").textContent = T("noHint"); return; }
  hinted = true; $("fqHintBox").hidden = false; const li = document.createElement("li"); li.textContent = l.hints[hintN++][lang()]; if (/[;{]/.test(li.textContent)) li.dir = "ltr"; $("fqHints").appendChild(li);
});
$("fqSol").addEventListener("click", () => { solShown = true; $("fqMsg").textContent = T("solShown"); setCode(lvl().solution); refresh(true); });
$("fqReset").addEventListener("click", () => { setCode(lvl().start); $("fqMsg").textContent = ""; refresh(true); });
$("fqNext").addEventListener("click", () => { location.hash = "#" + LEVELS[Math.min(idx + 1, LEVELS.length - 1)].id; });
const toMap = () => { location.hash = ""; };
$("fqBack").addEventListener("click", toMap); $("fqToMap").addEventListener("click", toMap);

function route() { const n = Number(location.hash.slice(1)); if (n) openLevel(n); else { renderMap(); show("map"); } }
window.addEventListener("hashchange", route);
document.addEventListener("fayad:langchange", () => { if (!$("fqPlay").hidden) { const keep = $("fqCss").value; openLevel(lvl().id).then(() => { setCode(keep); refresh(false); }); } else renderMap(); });
window.__fq = { LEVELS, makeBoard, compare };
route();
