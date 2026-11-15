/*
  Zombie Survival — tactical JavaScript game. The player writes a real act(s) function; it runs in the hardened sandbox (sandbox.js), the recorded
  actions are replayed by the pure engine on the main thread, and every engine event is animated 1:1. Points are decided by the server.
*/
import { read, award } from "/js/game/store.js";
import { LEVELS } from "./levels.js";
import { run, stars, bonusMet, SIZE, MAX_HP, MAG, TYPES } from "./engine.js";
import { runLearner } from "./sandbox.js";
import { HELPER_DOCS } from "./helpers.js";
import { upgradeEditor } from "/js/engine/editor.js";
import { confetti, countUp, reduced, sleep } from "/js/game/kit.js";

const F = window.FAYAD, $ = (id) => document.getElementById(id), GAME = "zombie", STAR_KEY = "fayad-zb-stars", CODE_KEY = "fayad-zb-code-";
const DICT = {
  ar: { "fq.home": "الرئيسية", "fq.hub": "الألعاب", "fq.dash": "لوحة التقدم", "fq.hint": "تلميح", "common.skip": "تخطي إلى المحتوى", "adv.run": "تشغيل", "adv.stop": "إيقاف", "adv.undo": "تراجع", "adv.speed": "السرعة",
    "gnav.home": "البداية", "gnav.continue": "تابع اللعب", "gnav.sections": "الأقسام",
    "zb.eyebrow": "JavaScript تكتيكي · 15 ليلة", "zb.sub": "لا تحرّك الناجي بيدك: اكتب دالة act(s) بجافاسكربت حقيقية. تُنادى كل دور وترى حالة اللعبة s وتُعيد فعلًا واحدًا. الذخيرة محدودة والزومبي أنواع، فالتفكير أهم من السرعة.",
    "zb.nights": "الليالي", "zb.mapSub": "كل ليلة مشكلة جديدة: أنواع زومبي، فخاخ، متاريس، حلفاء، ضجيج وموجات.", "zb.night": "الليلة",
    "zb.how1": "اقرأ حالة اللعبة s وقرّر", "zb.how2": "أعد فعلًا نصيًا مثل \"shoot N\"", "zb.how3": "شاهد النتيجة وحسّن استراتيجيتك", "zb.code": "كودك — دالة act(s) تُنادى كل دور", "zb.api": "مرجع الـ API (ما تراه وما تستطيع فعله)", "zb.reset": "أعد الكود الابتدائي",
    start: "ابدأ البقاء", cont: "تابع من حيث توقفت", back: "الألعاب", lvl: "الليلة {n}", locked: "مقفلة: أنهِ الليلة السابقة", turn: "الدور {t}", turnOf: "الدور {t}/{m}",
    hp: "الصحة", ammo: "الذخيرة", med: "إسعاف", goal_clear: "اقضِ على كل الزومبي وأنت حي.", goal_survive: "ابقَ حيًا حتى الدور {n}.", goal_exit: "اصل إلى المخرج E.", goal_escort: "اصل إلى المخرج E ومعك كل الناجين (بجانبك).",
    "b.clean": "هدف إضافي: بلا أي إصابة", "b.hp": "هدف إضافي: أنهِ بصحة {n} أو أكثر", "b.shots": "هدف إضافي: {n} طلقات أو أقل", "b.turns": "هدف إضافي: خلال {n} دورًا", "b.ammo": "هدف إضافي: أبقِ {n} طلقات",
    run: "يعمل كودك…", dawn: "نجوتَ حتى الفجر!", dawnSub: "كانت استراتيجيتك كافية لهذه الليلة.", pts: "+{n} نقطة", ptsOld: "محلولة سابقًا", unlocked: "الليلة {n} مفتوحة", all: "نجوتَ من كل الليالي!", next: "الليلة التالية", replay: "أعد المحاولة", toMap: "الليالي",
    stat: "{t} دورًا · صحة {h} · {s} طلقات", bonusOk: "✓ الهدف الإضافي تحقق", bonusNo: "الهدف الإضافي لم يتحقق بعد",
    fTitle: "لم تنجح هذه المحاولة", fNext: "فكّر: ", hint1: "تلميح", sol: "الحل المرجعي (يقلل النقاط)", useSol: "ضعه في المحرر",
    eEmpty: "اكتب شيئًا أولًا.", eLong: "الكود طويل جدًا.", eTimeout: "استغرق كودك وقتًا طويلًا (حلقة لا تنتهي؟). أُوقف التنفيذ.", eNone: "لم يُنتج الكود نتيجة.", eRuntime: "خطأ في كودك عند الدور {t}: {e}", eSyntax: "خطأ في كتابة الكود: {e}",
    fInvalid: "في الدور {t} أعادت act القيمة «{v}» وهي ليست فعلًا صالحًا (استخدم مثل \"shoot N\" أو \"move E\").", fClick: "نفدت الذخيرة في الدور {t} فلم تنطلق الرصاصة (click).", fBite: "عضّك {z} في الدور {t}.", fSpit: "بصق عليك {z} في الدور {t} من بعيد.", fAlly: "قُتل ناجٍ في الدور {t}.",
    fDead: "سقطتَ في الدور {t}.", fTime: "انتهت الأدوار ({n}) دون تحقيق الهدف.", fLeft: "بقي {n} زومبي حيًا.", fMiss: "{n} طلقات لم تصب أحدًا.", fBump: "اصطدمتَ بعائق {n} مرات.",
    "t.walker": "زومبي عادي", "t.runner": "عدّاء", "t.brute": "وحش", "t.spitter": "بصّاق",
    api_s: "s — حالة اللعبة (للقراءة فقط)", api_act: "الأفعال التي تعيدها act", ap_turn: "رقم الدور، و s.turnsLeft في مستويات الصمود", ap_me: "ناجيك: x, y, hp, ammo (في المخزن), reserve, med, noise, can.N/E/S/W (الخانة حرة؟)", ap_z: "الزومبي الحيّ مرتبًا بالأقرب: x, y, hp, type, dist, line (اتجاه خط الرمي أو null)", ap_al: "الناجون: x, y, hp, dist", ap_ex: "المخرج {x, y, dist} أو null", ap_it: "الأغراض الملقاة: x, y, type (\"ammo\" أو \"med\"), dist", ap_tr: "الفخاخ المتبقية والمتاريس {x, y, hp}", ap_no: "موضع الضجيج النشط", a_wait: "لا تفعل شيئًا", a_reload: "املأ المخزن (4 طلقات) من الجيب", a_heal: "استخدم حقيبة إسعاف: +2 صحة", a_melee: "اضرب أضعف زومبي ملاصق", a_shoot: "\"shoot\" أقرب هدف في خط، أو \"shoot N|E|S|W\" (مدى 4)", a_move: "\"move N|E|S|W\" خطوة واحدة", a_throw: "\"throw N|E|S|W\" ضجيج على بعد 3 خانات يجذب كل الزومبي ويمنع عضّهم لـ4 أدوار",
    chipsNote: "اختصارات للكتابة" },
  en: { "fq.home": "Home", "fq.hub": "Games", "fq.dash": "Progress dashboard", "fq.hint": "Hint", "common.skip": "Skip to content", "adv.run": "Run", "adv.stop": "Stop", "adv.undo": "Undo", "adv.speed": "Speed",
    "gnav.home": "Start", "gnav.continue": "Continue", "gnav.sections": "Sections",
    "zb.eyebrow": "Tactical JavaScript · 15 nights", "zb.sub": "You do not move the survivor by hand: write a real JavaScript function act(s). It is called every turn, sees the game state s and returns one action. Ammo is limited and zombies differ, so thinking beats speed.",
    "zb.nights": "Nights", "zb.mapSub": "Every night is a new problem: zombie types, traps, barricades, allies, noise and waves.", "zb.night": "Night",
    "zb.how1": "Read the game state s and decide", "zb.how2": "Return a text action such as \"shoot N\"", "zb.how3": "Watch the result and improve your strategy", "zb.code": "Your code — act(s) is called every turn", "zb.api": "API reference (what you can see and do)", "zb.reset": "Reset to starter code",
    start: "Start surviving", cont: "Continue where you left off", back: "Games", lvl: "Night {n}", locked: "Locked: finish the previous night", turn: "Turn {t}", turnOf: "Turn {t}/{m}",
    hp: "Health", ammo: "Ammo", med: "Medkit", goal_clear: "Defeat every zombie and stay alive.", goal_survive: "Stay alive until turn {n}.", goal_exit: "Reach the exit E.", goal_escort: "Reach the exit E with every survivor next to you.",
    "b.clean": "Bonus: take no damage", "b.hp": "Bonus: finish with {n}+ health", "b.shots": "Bonus: {n} shots or fewer", "b.turns": "Bonus: within {n} turns", "b.ammo": "Bonus: keep {n} rounds",
    run: "Running your code…", dawn: "You made it to dawn!", dawnSub: "Your strategy was enough for this night.", pts: "+{n} points", ptsOld: "Already solved", unlocked: "Night {n} unlocked", all: "You survived every night!", next: "Next night", replay: "Try again", toMap: "Nights",
    stat: "{t} turns · health {h} · {s} shots", bonusOk: "✓ Bonus objective met", bonusNo: "Bonus objective not met yet",
    fTitle: "That attempt did not work", fNext: "Think: ", hint1: "Hint", sol: "Reference solution (costs points)", useSol: "Put it in the editor",
    eEmpty: "Write some code first.", eLong: "The code is too long.", eTimeout: "Your code took too long (an endless loop?). Execution was stopped.", eNone: "The code produced no result.", eRuntime: "Error in your code at turn {t}: {e}", eSyntax: "Syntax problem: {e}",
    fInvalid: "On turn {t} act returned “{v}”, which is not a valid action (use e.g. \"shoot N\" or \"move E\").", fClick: "You ran out of ammo on turn {t}: the trigger only clicked.", fBite: "A {z} bit you on turn {t}.", fSpit: "A {z} spat at you from range on turn {t}.", fAlly: "A survivor was killed on turn {t}.",
    fDead: "You went down on turn {t}.", fTime: "The turns ran out ({n}) before the goal was met.", fLeft: "{n} zombies were still alive.", fMiss: "{n} shots hit nobody.", fBump: "You bumped into obstacles {n} times.",
    "t.walker": "walker", "t.runner": "runner", "t.brute": "brute", "t.spitter": "spitter",
    api_s: "s — the game state (read only)", api_act: "Actions act can return", ap_turn: "the turn number, and s.turnsLeft in survival levels", ap_me: "your survivor: x, y, hp, ammo (magazine), reserve, med, noise, can.N/E/S/W (is the cell free?)", ap_z: "living zombies, nearest first: x, y, hp, type, dist, line (firing-line direction or null)", ap_al: "survivors: x, y, hp, dist", ap_ex: "the exit {x, y, dist} or null", ap_it: "items on the floor: x, y, type (\"ammo\" or \"med\"), dist", ap_tr: "remaining traps and barricades {x, y, hp}", ap_no: "position of the active noise", a_wait: "do nothing", a_reload: "refill the magazine (4 rounds) from your pocket", a_heal: "use a medkit: +2 health", a_melee: "hit the weakest adjacent zombie", a_shoot: "\"shoot\" the nearest target in line, or \"shoot N|E|S|W\" (range 4)", a_move: "\"move N|E|S|W\" one cell", a_throw: "\"throw N|E|S|W\" noise 3 cells away: lures every zombie and stops their bites for 4 turns",
    chipsNote: "typing shortcuts" },
};
F?.i18n?.extend({ ar: DICT.ar, en: DICT.en });
const lang = () => (F?.i18n?.lang === "en" ? "en" : "ar");
const T = (k, p = {}) => String(DICT[lang()][k] ?? k).replace(/\{(\w+)\}/g, (_, x) => p[x] ?? "");
const el = (tag, cls = "", txt = "") => { const e = document.createElement(tag); if (cls) e.className = cls; if (txt) e.textContent = txt; return e; };
const NS = "http://www.w3.org/2000/svg";
const svg = (id, cls = "") => { const s = document.createElementNS(NS, "svg"); if (cls) s.setAttribute("class", cls); s.setAttribute("aria-hidden", "true"); s.setAttribute("viewBox", "0 0 24 24"); const u = document.createElementNS(NS, "use"); u.setAttribute("href", "#" + id); s.appendChild(u); return s; };
const sprite = (id) => { const s = svg(id, "sp"); s.setAttribute("viewBox", "0 0 48 48"); return s; };


const readStars = () => { try { return JSON.parse(localStorage.getItem(STAR_KEY)) || {}; } catch { return {}; } };
const saveStars = (lv, s) => { const d = readStars(); if (!d[lv] || d[lv] < s) { d[lv] = s; try { localStorage.setItem(STAR_KEY, JSON.stringify(d)); } catch { /* blocked */ } } };
const isDone = (n) => !!read().games[GAME]?.solved[n];
const unlocked = (n) => n === 1 || isDone(n - 1) || isDone(n);
const firstOpen = () => { for (let n = 1; n <= LEVELS.length; n++) if (!isDone(n)) return n; return LEVELS.length; };
const getCode = (l) => { try { return localStorage.getItem(CODE_KEY + l.id) || l.starter; } catch { return l.starter; } };
const putCode = (l, c) => { try { localStorage.setItem(CODE_KEY + l.id, c); } catch { /* blocked */ } };

/* ---------- night scene (dead forest + a lit cabin) ---------- */
(function scene() {
  let a = 7; const r = () => ((a = (a * 16807) % 2147483647) / 2147483647); let s = `<path d="M0 600V430c120-40 230-10 340-30s220-60 360-30 330-10 500 20V600z" fill="#0b1b20"/>`;
  for (let i = 0; i < 26; i++) { const x = r() * 1200, h = 120 + r() * 200, y = 560; s += `<g stroke="#050b10" stroke-width="${4 + r() * 5}" stroke-linecap="round" fill="none"><path d="M${x} ${y} V${y - h}"/><path d="M${x} ${y - h * 0.5} l${-30 - r() * 30} ${-40 - r() * 30}M${x} ${y - h * 0.7} l${26 + r() * 30} ${-34 - r() * 30}M${x} ${y - h * 0.3} l${24 + r() * 26} ${-22}"/></g>`; }
  s += `<g><rect x="860" y="468" width="120" height="70" fill="#07121a"/><path d="M850 470 L920 420 L990 470z" fill="#050d14"/><rect x="884" y="492" width="22" height="26" fill="#ffb02e"/><rect x="930" y="492" width="22" height="26" fill="#ff9a1f" opacity=".85"/><ellipse cx="920" cy="540" rx="150" ry="34" fill="#ffb02e" opacity=".12"/></g>`;
  s += `<path d="M0 600V540c200 20 400-10 600 6s400 10 600-6V600z" fill="#050b10"/>`;
  document.querySelector(".zb-forest").innerHTML = s;
})();


/* ---------- state ---------- */
let idx = 0, hinted = false, hintStep = 0, running = false, token = 0, speed = 1, justUnlocked = 0, screen = "intro", editorReady = false;
const lvl = () => LEVELS[idx];
const main = $("main"), code = $("zbCode");
const SCREENS = { intro: $("scrIntro"), map: $("scrMap"), play: $("scrPlay") };
function show(name) {
  stopRun(); screen = name; main.dataset.screen = name; main.dataset.dawn = "0";
  for (const [k, s] of Object.entries(SCREENS)) s.hidden = k !== name;
  $("zbBackTxt").textContent = name === "play" ? T("zb.nights") : T("back");
  try { history.replaceState(null, "", name === "play" ? "#" + lvl().id : name === "map" ? "#map" : location.pathname + location.search); } catch { /* ignore */ }
  window.scrollTo({ top: 0, behavior: "instant" }); header();
}
$("zbBack").addEventListener("click", () => { if (screen === "play") { renderMap(); show("map"); } else if (screen === "map") show("intro"); else location.href = "/play/index.html"; });
function markNav() { document.querySelectorAll(".gnav-tab[data-go]").forEach((b) => { const k = b.dataset.go; b.setAttribute("aria-current", String(k === screen)); }); }
document.querySelectorAll(".gnav-tab[data-go]").forEach((b) => b.addEventListener("click", () => { const k = b.dataset.go; if (k === "continue") go(firstOpen()); else if (k === "map") { renderMap(); show("map"); } else show(k); }));
$("zbStart").addEventListener("click", () => go(firstOpen()));
$("zbToMap").addEventListener("click", () => { renderMap(); show("map"); });
function header() {
  markNav();
  const d = read(), st = readStars(); $("zbPoints").textContent = d.points; $("zbStarTotal").textContent = Object.values(st).reduce((a, b) => a + b, 0);
  $("zbStartTxt").textContent = Object.keys(d.games[GAME]?.solved || {}).length ? T("cont") : T("start");
}
function renderMap() {
  const ol = $("zbNights"); ol.textContent = ""; const st = readStars(), fo = firstOpen();
  LEVELS.forEach((l, i) => {
    const li = el("li"), ok = unlocked(l.id), b = el("button", "zb-night-n" + (isDone(l.id) ? " done" : "") + (l.id === fo ? " cur" : "") + (l.id === justUnlocked ? " is-new" : "")); b.type = "button"; b.style.setProperty("--i", i); b.disabled = !ok;
    b.setAttribute("aria-label", T("lvl", { n: l.id }) + " — " + l.name[lang()] + (isDone(l.id) ? " — ★" + (st[l.id] || 1) : ok ? "" : " — " + T("locked")));
    if (ok) b.appendChild(document.createTextNode(l.id)); else b.appendChild(svg("z-lock", "lk"));
    b.addEventListener("click", () => go(l.id)); li.appendChild(b);
    const nm = el("div", "zb-nm", ok ? l.name[lang()] : ""); li.appendChild(nm);
    const meta = el("div", "meta"); const sk = Math.ceil(l.id / 5); for (let k = 0; k < 3; k++) { const s = svg("z-skull"); s.setAttribute("class", k < sk ? "sk" : "off"); meta.appendChild(s); }
    if (isDone(l.id)) { meta.textContent = ""; for (let k = 1; k <= 3; k++) { const s = svg("z-star"); if (k > (st[l.id] || 1)) s.setAttribute("class", "off"); meta.appendChild(s); } }
    li.appendChild(meta); ol.appendChild(li);
  });
  justUnlocked = 0;
}

/* ---------- board ---------- */
let B = null;
const cellId = (x, y) => y * SIZE + x;
const initState = (l) => run({ ...l, limit: 0 }, () => "wait").frames[0].state;
function buildBoard() {
  const l = lvl(), board = $("zbBoard"); board.textContent = ""; board.style.setProperty("--c", SIZE);
  const objs = new Map();
  for (let y = 0; y < SIZE; y++) for (let x = 0; x < SIZE; x++) {
    const ch = l.grid[y][x], c = el("div", "zb-c" + ((x + y) % 2 ? " alt" : "")); c.dataset.x = x; c.dataset.y = y;
    const mk = (id, cls) => { const s = sprite(id); s.setAttribute("class", "sp zb-obj " + cls); c.appendChild(s); return s; };
    if (ch === "#") mk("z-wall", "wall"); else if (ch === "B") objs.set(cellId(x, y), { k: "B", e: mk("z-bar", "bar") }); else if (ch === "^") objs.set(cellId(x, y), { k: "^", e: mk("z-spike", "trap") });
    else if (ch === "A") objs.set(cellId(x, y), { k: "A", e: mk("z-ammobox", "item") }); else if (ch === "M") objs.set(cellId(x, y), { k: "M", e: mk("z-medbox", "item") }); else if (ch === "E") { c.classList.add("exit"); mk("z-exit", "exit"); }
    board.appendChild(c);
  }
  const ent = (cls, sym, extra) => { const e = el("div", "zb-ent " + cls); e.appendChild(sprite(sym)); if (extra) e.appendChild(extra); board.appendChild(e); return e; };
  const me = ent("me", "z-me");
  const zs = l.zombies.map((z) => { const pips = el("div", "zb-hpips"); for (let k = 0; k < TYPES[z.t].hp; k++) pips.appendChild(el("i")); const e = ent("z idle t-" + z.t, "z-zom", pips); e.title = T("t." + z.t); return { e, pips }; });
  const als = (l.allies || []).map(() => { const pips = el("div", "zb-hpips"); for (let k = 0; k < 2; k++) pips.appendChild(el("i")); return { e: ent("ally", "z-me", pips), pips }; });
  const noise = el("div", "zb-noise"); noise.appendChild(sprite("z-noise")); board.appendChild(noise);
  const fx = el("div", "zb-fx"); board.appendChild(fx);
  const wrap = board.parentElement; wrap.classList.remove("dawn", "lost", "shake"); $("zbVig").classList.remove("hit");
  let light = wrap.querySelector(".zb-light"); if (!light) { light = el("div", "zb-light"); wrap.insertBefore(light, $("zbVig")); } light.style.setProperty("--c", SIZE);
  B = { me, zs, als, objs, noise, fx, light, face: 1 };
  paint(initState(l), 0, 0); $("zbLog").textContent = "";
}
const cell = (x, y) => ({ l: ((x + 0.5) / SIZE) * 100, t: ((y + 0.5) / SIZE) * 100 });
const place = (e, x, y, ms) => { e.style.setProperty("--step", ms + "ms"); e.style.setProperty("--ex", x); e.style.setProperty("--ey", y); };
function paint(st, ms, turn) {
  const l = lvl(); place(B.me, st.x, st.y, ms); B.me.style.setProperty("--face", B.face); B.light.style.setProperty("--lx", st.x); B.light.style.setProperty("--ly", st.y);
  st.zs.forEach((z, i) => { const o = B.zs[i]; place(o.e, z.x, z.y, ms); [...o.pips.children].forEach((p, k) => p.classList.toggle("off", k >= z.hp)); o.e.classList.toggle("gone", !z.here); o.e.classList.toggle("dead", !z.alive); });
  st.allies.forEach((a, i) => { const o = B.als[i]; place(o.e, a.x, a.y, ms); [...o.pips.children].forEach((p, k) => p.classList.toggle("off", k >= a.hp)); o.e.classList.toggle("dead", !a.alive); });
  const bars = new Map(st.bars), traps = new Set(st.traps), items = new Map(st.items);
  for (const [id, o] of B.objs) { const on = o.k === "B" ? bars.has(id) : o.k === "^" ? traps.has(id) : items.has(id); o.e.classList.toggle("gone", !on); if (o.k === "B" && on) o.e.dataset.hp = bars.get(id); }
  if (st.noise) { place(B.noise, st.noise.x, st.noise.y, 0); B.noise.classList.add("on"); } else B.noise.classList.remove("on");
  const hp = $("zbHp"); hp.textContent = ""; hp.append(...Array.from({ length: MAX_HP }, (_, k) => { const s = svg("z-heart"); if (k >= st.hp) s.setAttribute("class", "off"); return s; }));
  hp.setAttribute("aria-label", T("hp") + " " + Math.max(0, st.hp));
  const am = $("zbAmmo"); am.textContent = ""; am.append(...Array.from({ length: MAG }, (_, k) => { const s = svg("z-bullet"); if (k >= st.ammo) s.setAttribute("class", "off"); return s; }), el("span", "res", "+" + st.reserve));
  am.setAttribute("aria-label", T("ammo") + " " + st.ammo + " + " + st.reserve);
  const md = $("zbMed"); md.textContent = ""; md.append(svg("z-med"), el("span", "", "×" + st.med));
  const tn = $("zbTurn"); tn.textContent = l.goal === "survive" ? T("turnOf", { t: Math.min(turn, l.turns), m: l.turns }) : T("turn", { t: turn });
}
function fxAt(cls, x, y, rot, len) { const f = el("div", cls); const c = cell(x, y); f.style.left = c.l + "%"; f.style.top = c.t + "%"; if (len) { f.style.width = len + "%"; f.style.transform = `rotate(${rot}deg)`; } B.fx.appendChild(f); setTimeout(() => f.remove(), 1700); return f; }
function pop(text, x, y, color) { const p = fxAt("zb-pop", x, y); p.textContent = text; p.style.setProperty("--c", color); }
const DIRV = { N: [0, -1], E: [1, 0], S: [0, 1], W: [-1, 0] };
function bolt(x0, y0, x1, y1, cls = "zb-bolt") { const a = cell(x0, y0), b = cell(x1, y1); const len = Math.hypot(b.l - a.l, b.t - a.t), rot = (Math.atan2(b.t - a.t, b.l - a.l) * 180) / Math.PI; fxAt(cls, x0, y0, rot, len); }
const restart = (e, cls) => { e.classList.remove(cls); void e.offsetWidth; e.classList.add(cls); };
async function animate(prev, f, ms) {
  const st = f.state, killed = [];
  for (const ev of f.ev) {
    if (ev.k === "shot" || ev.k === "miss") {
      const d = ev.d, dv = DIRV[d]; B.face = dv[0] < 0 ? -1 : dv[0] > 0 ? 1 : B.face; restart(B.me, "recoil");
      if (ev.k === "shot") { const z = prev.zs[ev.z]; bolt(prev.x, prev.y, z.x, z.y); fxAt("zb-flash", z.x, z.y); pop("−1", z.x, z.y, "#ffe27a"); if (ev.kill) killed.push(z); }
      else { bolt(prev.x, prev.y, Math.max(0, Math.min(SIZE - 1, prev.x + dv[0] * 4)), Math.max(0, Math.min(SIZE - 1, prev.y + dv[1] * 4))); pop("miss", prev.x, prev.y, "#a9b8cc"); }
    } else if (ev.k === "click") { pop("click!", prev.x, prev.y, "#ff8a8a"); restart(B.me, "recoil"); }
    else if (ev.k === "melee") { const z = prev.zs[ev.z]; B.face = z.x < prev.x ? -1 : 1; fxAt("zb-slash", z.x, z.y); pop("−1", z.x, z.y, "#fff"); if (ev.kill) killed.push(z); }
    else if (ev.k === "swing") pop("…", prev.x, prev.y, "#a9b8cc");
    else if (ev.k === "move") B.face = ev.d === "W" ? -1 : ev.d === "E" ? 1 : B.face;
    else if (ev.k === "bump") { pop("✕", prev.x + DIRV[ev.d][0], prev.y + DIRV[ev.d][1], "#ff8a8a"); restart(B.me, "bumped"); }
    else if (ev.k === "heal") pop("+2 ♥", st.x, st.y, "#34d27b"); else if (ev.k === "noheal") pop("✕ ♥", st.x, st.y, "#ff8a8a");
    else if (ev.k === "reload") pop("↻ " + ev.n, st.x, st.y, "#e8c32b"); else if (ev.k === "noreload") pop("✕ ↻", st.x, st.y, "#ff8a8a");
    else if (ev.k === "pick") pop(ev.what === "ammo" ? "+3" : "+✚", st.x, st.y, ev.what === "ammo" ? "#ffb02e" : "#34d27b");
    else if (ev.k === "throw") { const o = fxAt("zb-throw", ev.x, ev.y); o.style.setProperty("--from-x", (prev.x - ev.x) * 100 + "%"); o.style.setProperty("--from-y", (prev.y - ev.y) * 100 + "%"); pop("♪", ev.x, ev.y, "#ffb02e"); }
    else if (ev.k === "nonoise") pop("✕ ♪", st.x, st.y, "#ff8a8a"); else if (ev.k === "invalid") pop("?", st.x, st.y, "#ff8a8a");
    else if (ev.k === "trap" && ev.me) { fxAt("zb-spark", ev.x, ev.y); pop("−2", ev.x, ev.y, "#ff5a60"); restart(B.me, "hurt"); }
  }
  killed.forEach((z) => fxAt("zb-splat", z.x, z.y));
  const dead = new Set(f.ev.filter((e) => (e.k === "shot" || e.k === "melee") && e.kill).map((e) => e.z));
  const mid = { ...st, zs: st.zs.map((z, i) => ({ ...z, x: prev.zs[i].x, y: prev.zs[i].y, alive: prev.zs[i].alive && !dead.has(i) })), allies: st.allies.map((a, i) => ({ ...a, x: prev.allies[i].x, y: prev.allies[i].y, alive: prev.allies[i].alive })) };
  paint(mid, Math.round(ms * 0.35), f.turn);
  await sleep(ms * 0.45);
  paint(st, Math.round(ms * 0.4), f.turn);
  st.zs.forEach((z, i) => { if (z.alive && z.here && (z.x !== prev.zs[i].x || z.y !== prev.zs[i].y)) restart(B.zs[i].e, "walk"); });
  let hit = false;
  for (const ev of f.ev) {
    if (ev.k === "bite" || ev.k === "spit") {
      const z = st.zs[ev.z], tx = ev.me ? st.x : st.allies[ev.ally].x, ty = ev.me ? st.y : st.allies[ev.ally].y, o = B.zs[ev.z].e;
      if (ev.k === "spit") { bolt(z.x, z.y, tx, ty, "zb-spit"); } else { o.style.setProperty("--lx", (tx - z.x) * 14 + "%"); o.style.setProperty("--ly", (ty - z.y) * 14 + "%"); restart(o, "lunge"); }
      if (ev.me) { hit = true; restart(B.me, "hurt"); pop("−" + ev.dmg, st.x, st.y, "#ff5a60"); } else { restart(B.als[ev.ally].e, "hurt"); pop("−" + ev.dmg, tx, ty, "#ff5a60"); }
    } else if (ev.k === "bar") { const o = B.objs.get(cellId(ev.x, ev.y)); if (o) restart(o.e, "hit"); pop(ev.hp > 0 ? "✕" : "💥", ev.x, ev.y, "#ffb02e"); }
    else if (ev.k === "trap" && ev.z !== undefined) { fxAt("zb-spark", ev.x, ev.y); pop("−3", ev.x, ev.y, "#ffe27a"); if (ev.kill) fxAt("zb-splat", ev.x, ev.y); }
  }
  if (hit) { $("zbVig").classList.add("hit"); setTimeout(() => $("zbVig").classList.remove("hit"), 320); const bw = $("zbBoard").parentElement; restart(bw, "shake"); }
  await sleep(ms * 0.35);
}

/* ---------- editor + help ---------- */
function insert(text) {
  const v = code.__fyEditor;
  if (v) { const r = v.state.selection.main; v.dispatch({ changes: { from: r.from, to: r.to, insert: text }, selection: { anchor: r.from + text.length } }); v.focus(); }
  else { code.setRangeText(text, code.selectionStart, code.selectionEnd, "end"); code.focus(); code.dispatchEvent(new Event("input", { bubbles: true })); }
}
const CHIPS = ["if (", ") {", "}", "else", "return ", "\"shoot \" + ", "\"move \" + ", "z.line", "z.dist", "z.type", "z.hp", "s.me.ammo", "s.me.hp", "s.zombies[0]", "s.allies", "s.exit", "dirTo(", "===", "&&", "||", "\"wait\"", ";"];
(function chips() { const h = $("zbChips"); CHIPS.forEach((c) => { const b = el("button", "zb-chip-b", c.trim() || c); b.type = "button"; b.addEventListener("click", () => insert(c)); h.appendChild(b); }); })();
function renderApi() {
  const b = $("zbApiBody"); b.textContent = ""; const code2 = (t) => el("code", "", t);
  const row = (k, v) => { const r = el("div", "zb-api-r"); r.append(code2(k), el("span", "", v)); return r; };
  b.append(el("h4", "", T("api_s")), row("s.turn", T("ap_turn")), row("s.me", T("ap_me")), row("s.zombies", T("ap_z")), row("s.allies", T("ap_al")), row("s.exit", T("ap_ex")), row("s.items", T("ap_it")), row("s.traps / s.barricades", T("ap_tr")), row("s.noiseAt", T("ap_no")));
  b.append(el("h4", "", T("api_act")), row("\"wait\"", T("a_wait")), row("\"reload\"", T("a_reload")), row("\"heal\"", T("a_heal")), row("\"melee\"", T("a_melee")), row("\"shoot N\"", T("a_shoot")), row("\"move E\"", T("a_move")), row("\"throw N\"", T("a_throw")));
  b.append(el("h4", "", "helpers")); HELPER_DOCS.forEach(([sig, d]) => b.appendChild(row(sig, d[lang()])));
}
async function ensureEditor() { if (editorReady) return; editorReady = true; try { await upgradeEditor(code, { language: "js", onRun: () => play() }); } catch { /* plain textarea stays */ } }
code.addEventListener("input", () => { if (!running) putCode(lvl(), code.value); });

function paintStars(host, n) { host.textContent = ""; for (let k = 1; k <= 3; k++) { const s = svg("z-star"); if (k > n) s.setAttribute("class", "off"); host.appendChild(s); } host.setAttribute("aria-label", n + "/3"); }
const goalText = (l) => T("goal_" + l.goal, { n: l.turns });
const bonusText = (l) => (l.bonus ? T("b." + l.bonus.kind, { n: l.bonus.n }) : "");
function go(id) {
  stopRun(); idx = id - 1; hinted = false; hintStep = 0; $("zbModal").hidden = true; const l = lvl();
  $("zbNo").textContent = l.id; $("zbName").textContent = "· " + l.name[lang()]; $("zbConcept").textContent = l.concept[lang()]; $("zbGoal").textContent = l.brief[lang()] + " " + goalText(l); $("zbBonus").textContent = bonusText(l); $("zbBonus").dataset.ok = "";
  paintStars($("zbStars"), readStars()[l.id] || 0); $("zbMsg").textContent = ""; show("play"); buildBoard(); renderApi();
  code.value = getCode(l); ensureEditor().then(() => { code.value = getCode(l); });
  SCREENS.play.style.animation = "none"; void SCREENS.play.offsetWidth; SCREENS.play.style.animation = "";
}

/* ---------- execution ---------- */
function stopRun() { token++; if (running) { running = false; $("zbRun").hidden = false; $("zbStop").hidden = true; $("zbHint").disabled = false; $("zbReset").disabled = false; } }
function setRunning(on) { running = on; $("zbRun").hidden = on; $("zbStop").hidden = !on; $("zbHint").disabled = on; $("zbReset").disabled = on; }
function feedback(kind, title, lines, extra) { const b = $("zbMsg"); b.textContent = ""; const d = el("div", "zb-fb " + kind); d.appendChild(el("b", "", title)); lines.filter(Boolean).forEach((t) => d.appendChild(el("p", "", t))); if (extra) d.appendChild(extra); b.appendChild(d); d.scrollIntoView({ block: "nearest", behavior: reduced() ? "auto" : "smooth" }); }
function codeError(r) { const e = r.error || ""; if (r.timeout) return T("eTimeout"); if (/^(Syntax|Unexpected|Invalid)/i.test(e) || /SyntaxError/.test(e)) return T("eSyntax", { e: e.replace(/^SyntaxError:\s*/, "") }); if (!e) return T("eNone"); return e === "Write some code first." ? T("eEmpty") : e.startsWith("Code is too long") ? T("eLong") : T("eSyntax", { e }); }
async function play() {
  if (running) return; const l = lvl(); putCode(l, code.value);
  setRunning(true); buildBoard(); $("zbMsg").textContent = ""; $("zbLog").textContent = T("run"); const my = ++token;
  const r = await runLearner(l, code.value);
  if (my !== token) return;
  if (!r.res) { setRunning(false); feedback("bad", T("fTitle"), [codeError(r)]); $("zbLog").textContent = ""; return; }
  const res = r.res, ms = reduced() ? 0 : Math.round(820 / speed);
  for (let i = 1; i < res.frames.length; i++) {
    if (my !== token) return; const f = res.frames[i], prev = res.frames[i - 1].state;
    $("zbLog").textContent = T("turn", { t: i }) + ": " + (f.action || "—");
    if (!ms) paint(f.state, 0, f.turn); else await animate(prev, f, ms);
    if (my !== token) return;
  }
  setRunning(false); $("zbLog").textContent = "";
  const wrap = $("zbBoard").parentElement;
  if (res.ok) win(res); else { wrap.classList.add("lost"); B.me.classList.add("dead"); fail(res); }
}
function facts(res) {
  const fr = res.frames, out = { bites: [], spit: [], click: -1, invalid: null, ally: -1, miss: 0, bump: 0 };
  fr.forEach((f, t) => f.ev.forEach((e) => {
    if (e.k === "bite" && e.me) out.bites.push({ t, z: fr[t - 1].state.zs[e.z].t }); else if (e.k === "spit" && e.me) out.spit.push({ t, z: "spitter" });
    else if (e.k === "click" && out.click < 0) out.click = t; else if (e.k === "invalid" && !out.invalid) out.invalid = { t, v: e.text }; else if (e.k === "miss") out.miss++; else if (e.k === "bump") out.bump++;
    else if ((e.k === "bite" || e.k === "spit") && e.ally !== undefined && out.ally < 0 && !fr[t].state.allies[e.ally].alive) out.ally = t;
  }));
  return out;
}
function fail(res) {
  const l = lvl(), f = facts(res), lines = [];
  if (res.reason === "error") lines.push(T("eRuntime", { t: res.turns + 1, e: res.error }));
  if (f.invalid) lines.push(T("fInvalid", { t: f.invalid.t, v: String(f.invalid.v).replace(/^!/, "") }));
  if (res.reason === "ally") lines.push(T("fAlly", { t: f.ally > 0 ? f.ally : res.turns }));
  const dmg = [...f.bites, ...f.spit].sort((a, b) => a.t - b.t)[0];
  if (res.reason === "dead") { lines.push(T("fDead", { t: res.turns })); if (dmg) lines.push(T(dmg.z === "spitter" && f.spit.length && f.spit[0].t === dmg.t ? "fSpit" : "fBite", { z: T("t." + dmg.z), t: dmg.t })); }
  if (f.click > 0) lines.push(T("fClick", { t: f.click }));
  if (f.miss >= 2) lines.push(T("fMiss", { n: f.miss })); if (f.bump >= 2) lines.push(T("fBump", { n: f.bump }));
  if (res.reason === "timeout") { lines.push(T("fTime", { n: res.turns })); const left = res.frames.at(-1).state.zs.filter((z) => z.alive && z.here).length; if (l.goal === "clear" && left) lines.push(T("fLeft", { n: left })); }
  const hint = el("p", "zb-fb-hint", T("fNext") + l.hints[0][lang()]);
  feedback("bad", T("fTitle"), lines.slice(0, 4), hint);
}
function win(res) {
  const l = lvl(), s = stars(l, res), nextWas = l.id < LEVELS.length && unlocked(l.id + 1), r = award(GAME, l.id, hinted, l.base); saveStars(l.id, s);
  paintStars($("zbStars"), readStars()[l.id]); header(); main.dataset.dawn = "1"; $("zbBoard").parentElement.classList.add("dawn"); B.me.classList.add("win"); confetti($("zbBoard").parentElement, 30, ["#ffe27a", "#ffb02e", "#b6f23a", "#fff"]);
  $("zbBonus").dataset.ok = res.bonus ? "1" : "0";
  if (!nextWas && l.id < LEVELS.length) justUnlocked = l.id + 1;
  setTimeout(() => modal(l, s, r.earned, !nextWas && l.id < LEVELS.length, res), reduced() ? 0 : 900);
}
function modal(l, s, earned, newUnlock, res) {
  const m = $("zbModal"); m.textContent = ""; const sh = el("div", "zb-sheet"); const last = l.id === LEVELS.length;
  sh.appendChild(el("div", "sun")); const h = el("h2", "", last ? T("all") : T("dawn")); h.id = "zbModalT"; sh.append(h, el("p", "", T("dawnSub")));
  const bs = el("div", "zb-bigstars"); bs.setAttribute("role", "img"); bs.setAttribute("aria-label", s + "/3"); for (let k = 1; k <= 3; k++) { const st = svg("z-star"); st.setAttribute("class", k <= s ? "on" : ""); st.style.setProperty("--k", k - 1); bs.appendChild(st); } sh.appendChild(bs);
  const rw = el("div", "zb-reward"), pc = el("span", "zb-chip"); if (earned) { const nb = el("b", "", "0"); pc.append(document.createTextNode("+"), nb, document.createTextNode(" " + (lang() === "en" ? "points" : "نقطة"))); countUp(nb, earned, 900); } else pc.textContent = T("ptsOld"); rw.appendChild(pc);
  if (newUnlock) rw.appendChild(el("span", "zb-chip new", T("unlocked", { n: l.id + 1 }))); sh.appendChild(rw);
  sh.appendChild(el("p", "", T("stat", { t: res.turns, h: res.hp, s: res.stats.shots }))); if (l.bonus) sh.appendChild(el("p", "zb-bn " + (res.bonus ? "ok" : "no"), res.bonus ? T("bonusOk") : T("bonusNo") + " — " + bonusText(l)));
  const row = el("div", "row"); if (!last) { const nx = el("button", "zb-btn zb-btn-primary", T("next")); nx.type = "button"; nx.addEventListener("click", () => go(l.id + 1)); row.appendChild(nx); }
  const rp = el("button", "zb-btn", T("replay")); rp.type = "button"; rp.addEventListener("click", () => { m.hidden = true; main.dataset.dawn = "0"; buildBoard(); });
  const tr = el("button", "zb-btn", T("toMap")); tr.type = "button"; tr.addEventListener("click", () => { m.hidden = true; renderMap(); show("map"); }); row.append(rp, tr); sh.appendChild(row); m.appendChild(sh); m.hidden = false; confetti(sh, 40, ["#ffe27a", "#b6f23a", "#fff"]);
  (row.querySelector(".zb-btn-primary") || rp).focus();
  m.onkeydown = (e) => { if (e.key === "Escape") m.hidden = true; else if (e.key === "Tab") { const f = [...sh.querySelectorAll("button")], i = f.indexOf(document.activeElement); e.preventDefault(); f[(i + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus(); } };
  m.onclick = (e) => { if (e.target === m) m.hidden = true; };
}

/* ---------- controls ---------- */
$("zbRun").addEventListener("click", play);
$("zbStop").addEventListener("click", () => { stopRun(); buildBoard(); });
$("zbReset").addEventListener("click", () => { const l = lvl(); code.value = l.starter; putCode(l, l.starter); buildBoard(); $("zbMsg").textContent = ""; });
$("zbSpeed").addEventListener("click", () => { speed = speed === 1 ? 2 : speed === 2 ? 3 : 1; $("zbSpeed").textContent = speed + "×"; });
$("zbHint").addEventListener("click", () => {
  const l = lvl(); hinted = true;
  if (hintStep < l.hints.length) { feedback("good", T("hint1") + " " + (hintStep + 1) + "/" + l.hints.length, [l.hints[hintStep][lang()]]); hintStep++; return; }
  const pre = el("pre", "zb-sol"); pre.dir = "ltr"; pre.textContent = l.solution; const use = el("button", "zb-btn", T("useSol")); use.type = "button"; use.addEventListener("click", () => { code.value = l.solution; putCode(l, l.solution); buildBoard(); });
  const w = el("div"); w.append(pre, use); feedback("good", T("sol"), [], w);
});
document.addEventListener("fayad:langchange", () => { header(); if (screen === "map") renderMap(); else if (screen === "play") go(lvl().id); else show("intro"); });
document.addEventListener("fayad:cloudsync", () => { header(); if (screen === "map") renderMap(); });
function route() {
  header(); const h = location.hash.slice(1), n = parseInt(h, 10);
  if (h === "map") { renderMap(); show("map"); } else if (n >= 1 && n <= LEVELS.length) go(unlocked(n) ? n : firstOpen()); else show("intro");
}
window.addEventListener("hashchange", route); route();
