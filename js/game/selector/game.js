/*
  Selector Quest — game screen. The learner's selector is only ever passed to querySelectorAll / CSSStyleSheet.insertRule (one rule at a time, so nothing can
  escape the rule); the scene markup is constant data from levels.js. Solved = the elements hit are exactly the targets (war levels: the real cascade paints them lime).
*/
const F = window.FAYAD;
import { read, award } from "/js/game/store.js";
import { LEVELS, CHAPTERS, BASE_POINTS, LIME, PAINT } from "./levels.js";
import { specificity, specPerPart, splitSelector } from "./specificity.js";

const DICT = {
  ar: { "fq.home": "الرئيسية", "fq.hub": "الألعاب", "fq.dash": "لوحة التقدم", "fq.points": "نقاط اللعبة", "fq.map": "← الخريطة", "fq.hint": "تلميح", "fq.sol": "أرني الحل", "fq.reset": "إعادة الضبط", "fq.learn": "تعلّم", "fq.next": "المرحلة التالية",
    "sq.sub": "أنت صائد عناصر: اكتب محدد CSS حقيقيًا وراقب الرادار وهو يضيء العناصر التي أصبتها.", "sq.note": "نقاط اللعبة تُحفظ على هذا الجهاز وتُحسب منفصلة عن نقاط الدروس: 10 نقاط لكل مرحلة تُحلّ لأول مرة (12 للمراحل المتقدمة)، و5 إضافية إن حللتها دون تلميح.",
    "sq.scene": "الرادار: مشهد الصفحة", "sq.want": "هدف", "sq.hit": "إصابة", "sq.extra": "زائد", "sq.tree": "شجرة DOM", "sq.label": "المحدد (CSS selector)", "sq.won": "إصابة مباشرة! 🎯", "sq.alts": "محددات أخرى صحيحة",
    level: "المرحلة {n}", locked: "أنهِ المرحلة السابقة أولًا", done: "محلولة", stars: "{n} من 3 نجوم", pts: "+{p} نقطة", again: "حُلّت من قبل", noHint: "لا مزيد من التلميحات. جرّب «أرني الحل» إن علقت.", solShown: "هذا محدد مرجعي: جرّبه وافهم لماذا يعمل.", allDone: "أنهيت كل المراحل! أنت صائد المحددات الأول 🏆",
    count: "أصبتَ {m} من {t} هدفًا، و{x} عنصرًا زائدًا", none: "اكتب محددًا لتبدأ الصيد", bad: "محدد غير صالح: تحقق من الأقواس والنقاط والعلامات", spec: "الأولوية (Specificity)", specLine: "أولوية محددك: ({a},{b},{c})",
    miss: "ما زال هناك {n} هدف لم يُصَب", extraMsg: "محددك يصيب {n} عنصرًا ليس هدفًا. اجعله أدق", warOk: "كل الأهداف أصبحت ليمونية", warCount: "{m} من {t} هدفًا أصبح ليمونيًا", warLost: "قاعدة «{sel}» (أولويتها {theirs}) ما زالت تتفوق على محددك ({mine}). ارفع أولوية محددك.", warRules: "قواعد منافسة (مكتوبة قبل قاعدتك)", warYours: "قاعدتك تُكتب أخيرًا وتلوّن بالليموني" },
  en: { "fq.home": "Home", "fq.hub": "Games", "fq.dash": "Progress dashboard", "fq.points": "Game points", "fq.map": "← Map", "fq.hint": "Hint", "fq.sol": "Show solution", "fq.reset": "Reset", "fq.learn": "Learn", "fq.next": "Next level",
    "sq.sub": "You are an element hunter: write a real CSS selector and watch the radar light up what you hit.", "sq.note": "Game points are saved on this device and counted separately from lesson points: 10 per level solved for the first time (12 for the advanced ones), plus 5 if solved without a hint.",
    "sq.scene": "Radar: the page scene", "sq.want": "target", "sq.hit": "hit", "sq.extra": "extra", "sq.tree": "DOM tree", "sq.label": "Selector (CSS selector)", "sq.won": "Direct hit! 🎯", "sq.alts": "Other valid selectors",
    level: "Level {n}", locked: "Finish the previous level first", done: "solved", stars: "{n} of 3 stars", pts: "+{p} points", again: "Already solved", noHint: "No more hints. Try 'Show solution' if you are stuck.", solShown: "This is a reference selector: try it and understand why it works.", allDone: "You finished every level! Selector master 🏆",
    count: "You hit {m} of {t} targets and {x} extra elements", none: "Type a selector to start hunting", bad: "Invalid selector: check brackets, dots and signs", spec: "Specificity", specLine: "Your selector's specificity: ({a},{b},{c})",
    miss: "{n} target(s) still not hit", extraMsg: "Your selector hits {n} element(s) that are not targets. Make it more precise", warOk: "Every target is now lime", warCount: "{m} of {t} targets are lime", warLost: "The rule '{sel}' (specificity {theirs}) still beats your selector ({mine}). Raise your specificity.", warRules: "Rival rules (written before yours)", warYours: "Your rule is written last and paints lime" },
};
F?.i18n?.extend({ ar: DICT.ar, en: DICT.en });
const lang = () => (F?.i18n?.lang === "en" ? "en" : "ar");
const T = (k, p = {}) => String(DICT[lang()][k] ?? k).replace(/\{(\w+)\}/g, (_, x) => p[x] ?? "");
const $ = (id) => document.getElementById(id);
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const WHY = { ar: { tag: "عنصر <{v}>", cls: "له الفئة {v}", id: "معرّفه {v}", attr: "خاصية {v}", pseudo: "الحالة {v}", any: "أي عنصر", desc: "داخل", child: "ابن مباشر لـ", next: "يأتي مباشرة بعد", sib: "يأتي بعد (أخ لاحق لـ)", and: "و" },
  en: { tag: "a <{v}> element", cls: "with class {v}", id: "with id {v}", attr: "attribute {v}", pseudo: "state {v}", any: "any element", desc: "inside", child: "a direct child of", next: "right after", sib: "later sibling of", and: "and" } };
/** Plain-language reading of a selector, right to left like the browser reads it: "li:first-child ← a <li> and state :first-child". */
function explain(q) {
  const w = WHY[lang()], out = [];
  for (const part of splitSelector(q)) {
    const bits = part.replace(/\s*([>+~])\s*/g, " $1 ").trim().split(/\s+/).filter(Boolean), line = [];
    for (const b of bits) {
      if (b === ">") line.push(w.child); else if (b === "+") line.push(w.next); else if (b === "~") line.push(w.sib);
      else { const toks = b.match(/\[[^\]]*\]|:{1,2}[\w-]+(?:\((?:[^()]|\([^()]*\))*\))?|[.#][\w-]+|\*|[a-zA-Z][\w-]*/g) || [b]; line.push(toks.map((t) => t === "*" ? w.any : t[0] === "." ? w.cls.replace("{v}", t.slice(1)) : t[0] === "#" ? w.id.replace("{v}", t.slice(1)) : t[0] === "[" ? w.attr.replace("{v}", t) : t[0] === ":" ? w.pseudo.replace("{v}", t) : w.tag.replace("{v}", t)).join(" " + w.and + " ")); }
    }
    out.push(line.join(" · "));
  }
  return out;
}
const specTxt = (s) => `(${s[0]},${s[1]},${s[2]})`;

const STAR_KEY = "fayad-sq-stars";
const readStars = () => { try { return JSON.parse(localStorage.getItem(STAR_KEY)) || {}; } catch { return {}; } };
const saveStars = (id, n) => { const d = readStars(); if ((d[id] || 0) < n) { d[id] = n; try { localStorage.setItem(STAR_KEY, JSON.stringify(d)); } catch { /* blocked */ } } };
const solvedMap = () => read().games.sel?.solved || {};
const unlocked = (n) => n === 1 || !!solvedMap()[n - 1] || !!solvedMap()[n];
const starSvg = (on) => `<svg viewBox="0 0 24 24" class="${on ? "on" : ""}" aria-hidden="true"><path d="M12 2.8l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.7l-5.9 3.1 1.2-6.5L2.5 9.7l6.6-.9z"/></svg>`;
const paintStars = (el, n) => { el.innerHTML = [0, 1, 2].map((i) => starSvg(i < n)).join(""); el.setAttribute("aria-label", T("stars", { n })); };

let idx = 0, hinted = false, solShown = false, solved = false, target = [], warSheet = null;
const lvl = () => LEVELS[idx];
const scene = () => $("sqScene");
const els = () => [...scene().querySelectorAll("*")];

function renderMap() {
  const d = read(), done = d.games.sel?.solved || {}, stars = readStars(); $("sqPoints").textContent = d.points;
  const box = $("sqChapters"); box.textContent = "";
  CHAPTERS.forEach((c) => {
    const sec = document.createElement("section"); sec.className = "sqg-chap"; sec.innerHTML = `<header><h2></h2><p></p></header><div class="sqg-lv"></div>`;
    sec.querySelector("h2").textContent = c.name[lang()]; sec.querySelector("p").textContent = c.blurb[lang()];
    LEVELS.filter((l) => l.chapter === c.id).forEach((l) => {
      const a = document.createElement("a"); a.className = "sqg-node" + (done[l.id] ? " is-done" : "") + (unlocked(l.id) ? "" : " is-locked"); a.href = "#" + l.id;
      a.setAttribute("aria-label", T("level", { n: l.id }) + (done[l.id] ? " · " + T("done") : unlocked(l.id) ? "" : " · " + T("locked")));
      if (!unlocked(l.id)) { a.setAttribute("aria-disabled", "true"); a.tabIndex = -1; a.addEventListener("click", (e) => e.preventDefault()); }
      a.innerHTML = `<b>${l.id}</b><span class="sqg-st">${[0, 1, 2].map((i) => starSvg(i < (stars[l.id] || (done[l.id] ? 1 : 0)))).join("")}</span>`;
      sec.querySelector(".sqg-lv").appendChild(a);
    });
    box.appendChild(sec);
  });
}
function show(s) { $("sqMap").hidden = s !== "map"; $("sqPlay").hidden = s !== "play"; window.scrollTo(0, 0); }

const attrs = (n) => ["id", "class", "href", "target", "type", "disabled"].filter((a) => n.hasAttribute(a)).map((a) => (a === "disabled" ? " disabled" : ` ${a}="${n.getAttribute(a)}"`)).join("");
function buildTree() {
  const t = $("sqTree"); t.textContent = "";
  const walk = (parent, depth) => [...parent.children].forEach((n) => {
    const ln = document.createElement("div"); ln.className = "sqg-ln"; ln.style.paddingInlineStart = depth * 16 + 8 + "px"; ln.textContent = `<${n.localName}${attrs(n)}>`; t.appendChild(ln); walk(n, depth + 1);
  });
  walk(scene(), 0);
}

function setWar(rules) { // rivals first, learner's rule appended later by paint()
  let st = $("sqWarStyle"); if (!st) { st = document.createElement("style"); st.id = "sqWarStyle"; document.head.appendChild(st); } warSheet = st.sheet;
  while (warSheet.cssRules.length) warSheet.deleteRule(0);
  const l = lvl(); l.war?.forEach((r) => warSheet.insertRule(`.sqg-scene ${r.sel} { background-color: ${PAINT[r.color]}; }`, warSheet.cssRules.length));
  return warSheet.cssRules.length;
}

async function openLevel(n) {
  const i = LEVELS.findIndex((l) => l.id === n); if (i < 0 || !unlocked(n)) { location.hash = ""; return; }
  idx = i; const l = lvl(); hinted = false; solShown = false; solved = false;
  $("sqChap").textContent = CHAPTERS[l.chapter - 1].name[lang()]; $("sqTitle").textContent = T("level", { n: l.id }); $("sqBrief").textContent = l.brief[lang()]; $("sqTeach").textContent = l.teach[lang()];
  $("sqHintBox").hidden = true; $("sqHints").textContent = ""; $("sqWin").hidden = true; $("sqMsg").textContent = ""; $("sqInput").value = ""; $("sqSpec").textContent = "";
  paintStars($("sqStarsNow"), readStars()[l.id] || (solvedMap()[l.id] ? 1 : 0));
  scene().innerHTML = l.html; // constant markup from levels.js
  target = [...scene().querySelectorAll(l.want)];
  const ws = $("sqWar"); ws.hidden = !l.war; ws.textContent = "";
  if (l.war) {
    setWar(l.war); const h = document.createElement("div"); h.className = "sqg-war-h"; h.textContent = T("warRules"); ws.appendChild(h);
    l.war.forEach((r) => { const c = document.createElement("code"); c.dir = "ltr"; c.innerHTML = `<i style="background:${PAINT[r.color]}"></i>`; c.append(`${r.sel} { background: ${r.color}; }`); const sp = document.createElement("em"); sp.textContent = specTxt(specificity(r.sel)); c.appendChild(sp); ws.appendChild(c); });
    const y = document.createElement("div"); y.className = "sqg-war-y"; y.textContent = T("warYours"); ws.appendChild(y);
  }
  buildTree(); els().forEach((e) => { if (target.includes(e)) e.setAttribute("data-sq-want", ""); }); markTree([], []);
  show("play"); check();
}
function markTree(hit, extra) {
  const lines = [...$("sqTree").children], all = els();
  all.forEach((e, k) => { const w = target.includes(e), h = hit.includes(e); lines[k]?.classList.toggle("want", w); lines[k]?.classList.toggle("hit", h && w); lines[k]?.classList.toggle("extra", extra.includes(e)); lines[k]?.classList.toggle("miss", w && !h); });
}

function paintWar(q) { // real cascade: rivals then the learner's parts, each its own rule
  const base = lvl().war.length; while (warSheet.cssRules.length > base) warSheet.deleteRule(warSheet.cssRules.length - 1);
  for (const p of splitSelector(q)) warSheet.insertRule(`.sqg-scene ${p} { background-color: ${LIME}; }`, warSheet.cssRules.length); // throws for anything but ONE valid rule
}
function check() {
  const l = lvl(), q = $("sqInput").value.trim(), all = els(); all.forEach((e) => { e.removeAttribute("data-sq-hit"); e.removeAttribute("data-sq-extra"); });
  $("sqSpec").textContent = ""; $("sqWhy").textContent = "";
  if (l.war && warSheet) { while (warSheet.cssRules.length > l.war.length) warSheet.deleteRule(warSheet.cssRules.length - 1); }
  if (!q) { $("sqCount").textContent = T("none"); markTree([], []); return; }
  let hit;
  try { if (/data-sq/i.test(q)) throw new Error("reserved"); hit = [...scene().querySelectorAll(q)]; if (l.war) paintWar(q); } catch { $("sqCount").textContent = T("bad"); markTree([], []); if (l.war) while (warSheet.cssRules.length > l.war.length) warSheet.deleteRule(warSheet.cssRules.length - 1); return; }
  $("sqWhy").textContent = explain(q).join("  |  "); const sp = specificity(q); $("sqSpec").textContent = T("specLine", { a: sp[0], b: sp[1], c: sp[2] });
  const extra = hit.filter((n) => !target.includes(n)), got = hit.filter((n) => target.includes(n));
  hit.forEach((n) => n.setAttribute(target.includes(n) ? "data-sq-hit" : "data-sq-extra", "")); markTree(got, extra);
  let ok;
  if (l.war) {
    const lime = all.filter((e) => getComputedStyle(e).backgroundColor === LIME), limeT = target.filter((e) => lime.includes(e)), limeX = lime.filter((e) => !target.includes(e));
    ok = limeT.length === target.length && limeX.length === 0;
    all.forEach((e) => e.toggleAttribute("data-sq-lime", lime.includes(e)));
    let msg = T("warCount", { m: limeT.length, t: target.length });
    if (limeX.length) msg += " · " + T("extraMsg", { n: limeX.length });
    else if (!ok) { const lost = target.find((e) => !lime.includes(e)); const col = lost && getComputedStyle(lost).backgroundColor; const rule = l.war.find((r) => PAINT[r.color] === col); if (rule) msg += " · " + T("warLost", { sel: rule.sel, theirs: specTxt(specificity(rule.sel)), mine: specTxt(sp) }); }
    $("sqCount").textContent = msg;
  } else {
    ok = got.length === target.length && extra.length === 0;
    $("sqCount").textContent = T("count", { m: got.length, t: target.length, x: extra.length }) + (ok ? "" : extra.length ? " · " + T("extraMsg", { n: extra.length }) : got.length < target.length ? " · " + T("miss", { n: target.length - got.length }) : "");
  }
  if (ok && !solved) win(q, sp);
}
function win(q, sp) {
  solved = true; const l = lvl(), ref = specificity(l.want);
  const cmp = (a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
  const r = award("sel", l.id, hinted || solShown, BASE_POINTS(l.id));
  const stars = 1 + (!hinted && !solShown ? 1 : 0) + (cmp(sp, ref) <= 0 ? 1 : 0);
  saveStars(l.id, stars); paintStars($("sqStarsNow"), Math.max(stars, readStars()[l.id] || 0)); paintStars($("sqWinStars"), stars);
  $("sqPoints").textContent = r.data.points; $("sqWinPts").textContent = r.earned ? T("pts", { p: r.earned }) : T("again");
  $("sqWinWhy").textContent = l.teach[lang()] + " " + T("specLine", { a: sp[0], b: sp[1], c: sp[2] });
  const alts = $("sqAltList"); alts.textContent = ""; [l.want, ...l.alts].forEach((a) => { const c = document.createElement("code"); c.textContent = a; alts.appendChild(c); });
  $("sqNext").hidden = idx >= LEVELS.length - 1; $("sqWin").hidden = false; scene().classList.add("won"); setTimeout(() => scene().classList.remove("won"), 900);
  if (LEVELS.every((x) => r.data.games.sel?.solved[x.id])) $("sqMsg").textContent = T("allDone");
  $("sqWin").scrollIntoView({ block: "nearest", behavior: reduced() ? "auto" : "smooth" });
  document.dispatchEvent(new CustomEvent("fayad:gamepoints", { detail: { points: r.data.points } }));
}

$("sqInput").addEventListener("input", check);
$("sqHint").addEventListener("click", () => { const l = lvl(), n = $("sqHints").children.length; if (n >= l.hints.length) { $("sqMsg").textContent = T("noHint"); return; } hinted = true; $("sqHintBox").hidden = false; const li = document.createElement("li"); li.textContent = l.hints[n][lang()]; if (/[.#:\[>+~(]/.test(li.textContent) && li.textContent.length < 40 && !/[ء-ي]/.test(li.textContent)) li.dir = "ltr"; $("sqHints").appendChild(li); });
$("sqSol").addEventListener("click", () => { solShown = true; $("sqMsg").textContent = T("solShown"); $("sqInput").value = lvl().want; check(); });
$("sqReset").addEventListener("click", () => openLevel(lvl().id));
$("sqNext").addEventListener("click", () => { location.hash = "#" + LEVELS[Math.min(idx + 1, LEVELS.length - 1)].id; });
const toMap = () => { location.hash = ""; }; $("sqBack").addEventListener("click", toMap); $("sqToMap").addEventListener("click", toMap);
function route() { const n = Number(location.hash.slice(1)); if (n) openLevel(n); else { renderMap(); show("map"); } }
window.addEventListener("hashchange", route);
document.addEventListener("fayad:langchange", () => { if (!$("sqPlay").hidden) { const v = $("sqInput").value; openLevel(lvl().id).then?.(() => {}); $("sqInput").value = v; check(); } else renderMap(); });
window.__sq = { LEVELS, specificity, evaluate(levelId, sel) { location.hash = "#" + levelId; return new Promise((res) => setTimeout(() => { $("sqInput").value = sel; check(); res({ solved, msg: $("sqCount").textContent }); }, 30)); } };
route();
