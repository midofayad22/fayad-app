/* Zombie Survival — the game screen: world map, live HUD, the real simulation, build (code) panel, results. */
import { create as createRunner } from "/js/playground/playground.js";
import { upgradeEditor } from "/js/engine/editor.js";
import { read, award } from "/js/game/store.js";
import { MISSIONS, LOCS, threats, BASE } from "/js/game/zombie/missions.js";
import { worldFiles } from "/js/game/zombie/world.js";

const F = window.FAYAD, $ = (id) => document.getElementById(id), STAR_KEY = "fayad-zb-stars";
const SIM = await (await fetch("/js/game/zombie/sim.js")).text();
const TYPE = {
  walker: { ar: "ماشٍ", en: "Walker", color: "#a9d36c", d: { ar: "بطيء. يمشي مباشرة نحو الملجأ ويهاجم أي متراس يعترضه.", en: "Slow. Walks straight at the shelter and attacks any barricade in the way." } },
  runner: { ar: "عدّاء", en: "Runner", color: "#d9d65a", d: { ar: "سريع وضعيف. يطارد الناجين المكشوفين أولًا، ولا يهاجم الجدران بل يلتف حولها بحثًا عن ثغرة.", en: "Fast and frail. Hunts exposed survivors first and never attacks walls: it slides around them looking for a gap." } },
  crawler: { ar: "زاحف", en: "Crawler", color: "#6fb7a6", d: { ar: "صغير جدًا: يمر من فجوات لا يمر منها غيره.", en: "Tiny: squeezes through gaps nothing else fits." } },
  brute: { ar: "وحش", en: "Brute", color: "#7f8f63", d: { ar: "ضخم وبطيء وقوي: يحطم المتاريس بسرعة. يحتاج فخًا أو نيرانًا مركّزة.", en: "Huge, slow, strong: smashes barricades fast. Needs a trap or focused fire." } },
  spitter: { ar: "قاذف", en: "Spitter", color: "#b883d6", d: { ar: "يقف على مسافة ويقذف الملجأ فوق كل المتاريس. اقتله بالرصاص.", en: "Stops at range and spits at the shelter over every barricade. Shoot it down." } },
};
const LOC_ID = {
  farm: { ar: "حظيرة وسياج خشبي: الدفاع بالتخطيط (Flexbox). مشاة بطيئون وصمود حتى الفجر.", en: "Barns and wooden fences: defend by layout (Flexbox). Slow walkers, hold until dawn." },
  gas: { ar: "محطة وقود: الموقع هو الاستراتيجية (Grid وposition). أبراج ومداها، وسياج بثغرات، وزاحفون.", en: "A fuel station: position is strategy (Grid, position). Turret range, fences with holes and crawlers." },
  clinic: { ar: "عيادة: الإنقاذ بالبنية (HTML). أدخل الناجين، وابنِ نموذج راديو سليمًا يجلب الإمدادات.", en: "A clinic: rescue through structure (HTML). Get survivors in, build a valid radio form that brings supplies." },
  school: { ar: "مدرسة: الأحداث والمنطق (JavaScript). حساسات وفخاخ وأبواب تتحكم بها بالشروط والحلقات.", en: "A school: events and logic (JavaScript). Sensors, traps and doors driven by conditions and loops." },
  bunker: { ar: "المخبأ: كل شيء معًا. عدّاؤون ووحش وقاذف، وموارد شحيحة.", en: "The bunker: everything together. Runners, a brute, a spitter and scarce resources." },
};
const DICT = {
  ar: { "fq.home": "الرئيسية", "fq.hub": "الألعاب", "fq.dash": "لوحة التقدم", "zg.eyebrow": "لعبة بقاء", "zg.map": "← الخريطة", "zg.points": "نقاط", "zg.hp": "صحة الملجأ", "zg.sv": "الناجون", "zg.ammo": "الذخيرة", "zg.sup": "إمدادات", "zg.zombies": "زومبي", "zg.dawn": "حتى الفجر",
    "zg.start": "▶ ابدأ الموجة", "zg.reset": "↺ أعد العالم", "zg.tBrief": "الإحاطة", "zg.tBuild": "البناء (كود)", "zg.tLearn": "تعلّم", "zg.obj": "الأهداف", "zg.hint": "تلميح", "zg.sol": "اعرض الحل", "zg.next": "المهمة التالية", "zg.retry": "أعد المحاولة", "zg.edit": "عدّل الكود",
    lead: "الليل طويل والعالم خطر. دافع عن الملجأ حتى الفجر، أنقذ الناجين، وأدِر ذخيرتك. HTML وCSS وJavaScript هي أدوات بقائك.", locked: "أنهِ «{x}» أولًا", solved: "مكتملة", mission: "مهمة", of: "من",
    how: "كيف تلعب: 1) اقرأ الإحاطة وشاهد الأخطار. 2) ابنِ الدفاع بالكود (تبويب البناء) وشاهد المعاينة. 3) ابدأ الموجة وانقر/المس الزومبي لتطلق عليه (ذخيرتك محدودة ومداك حلقة متقطعة حول الملجأ). 4) اصمد حتى الفجر.",
    tip: "انقر/المس زومبي لتطلق عليه · الصناديق الخضراء تعطيك ذخيرة · الحلقة المتقطعة هي مدى مسدسك", tipPrep: "عدّل الكود في «البناء» ثم ابدأ الموجة",
    prep: "التحضير: ابنِ دفاعك ثم ابدأ الموجة", running: "الموجة قادمة… دافع!", won: "فجر جديد! نجوتم", lost: "سقط الملجأ",
    hpT: "صحة الملجأ", threat: "الأخطار القادمة", need: "أبقِ {n} ناجين على الأقل أحياء", hold: "اصمد حتى الفجر ({s} ثانية) والملجأ سليم", bonusOk: "✓ مُفعَّل", bonusNo: "✗ غير مُفعَّل",
    stats: "الملجأ {hp}/{max} · الناجون {sv}/{svT} · الذخيرة المستعملة {a} · الزومبي المقتولون {k}", pts: "+{p} نقطة", again: "سبق حلّها: لا نقاط إضافية", noHint: "(+5 دون تلميح)",
    c_slipped: "تسلّل {t} من فجوة وصل منها إلى الملجأ: دفاعك ترك ممرًا مفتوحًا. راجع تخطيط المتاريس (CSS) أو مكانها.", c_broke: "حطّم {t} المتراس/الباب ودخل: لم يكن كافيًا أو لم يُبطئه شيء. أضف حاجزًا أقوى أو فخًا أو نيرانًا، أو أغلق قبل وصوله.", c_shelter: "دمّر {t} الملجأ. الأعداء الذين يصلون يضربون الملجأ مباشرة.", c_survivor: "قُتل ناجٍ بيد {t}. الناجون خارج الملجأ فريسة سهلة: أدخلهم قبل أن يصل العدّاؤون.", c_nosupply: " فعّلتَ فخًا بلا إمدادات كافية.", c_noammo: " نفدت ذخيرتك: اختر أهدافك.",
    adv_walker: "الماشي يهاجم الجدار: ثبّته حيث يصل مدى مسدسك.", adv_runner: "العدّاء يتجاوز الجدران عبر الثغرات: أغلقها أو أدخل الناجين.", adv_crawler: "الزاحف يمر من فجوة ضيقة: صغّر المسافة بين العناصر.", adv_brute: "الوحش يحتاج فخًا مفعّلًا في الوقت المناسب.", adv_spitter: "القاذف لا تصده الجدران: اقتله بالرصاص.",
    hintOf: "تلميح {i} من {n}", solT: "الحل المرجعي", apply: "ضع الحل في المحرر", edited: "عدّلتَ الكود: الموجة أُعيد ضبطها", whyShow: "ماذا حدث:", spawn: "نقطة ظهور", pre: "معاينة" },
  en: { "fq.home": "Home", "fq.hub": "Games", "fq.dash": "Progress dashboard", "zg.eyebrow": "Survival game", "zg.map": "← Map", "zg.points": "Points", "zg.hp": "Shelter health", "zg.sv": "Survivors", "zg.ammo": "Ammo", "zg.sup": "Supplies", "zg.zombies": "Zombies", "zg.dawn": "Until dawn",
    "zg.start": "▶ Start wave", "zg.reset": "↺ Reset world", "zg.tBrief": "Briefing", "zg.tBuild": "Build (code)", "zg.tLearn": "Learn", "zg.obj": "Objectives", "zg.hint": "Hint", "zg.sol": "Show solution", "zg.next": "Next mission", "zg.retry": "Try again", "zg.edit": "Edit code",
    lead: "The night is long and the world is dangerous. Hold the shelter until dawn, rescue survivors and manage your ammo. HTML, CSS and JavaScript are your survival tools.", locked: "Finish “{x}” first", solved: "done", mission: "Mission", of: "of",
    how: "How to play: 1) Read the briefing and spot the threats. 2) Build your defence with code (Build tab) and watch the preview. 3) Start the wave and click/tap zombies to shoot them (ammo is limited; your range is the dashed ring around the shelter). 4) Hold out until dawn.",
    tip: "Click/tap a zombie to shoot · green crates give ammo · the dashed ring is your gun range", tipPrep: "Edit the code in Build, then start the wave",
    prep: "Prepare: build your defence, then start the wave", running: "The wave is coming… defend!", won: "A new dawn! You survived", lost: "The shelter fell",
    hpT: "Shelter health", threat: "Incoming threats", need: "Keep at least {n} survivors alive", hold: "Hold until dawn ({s}s) with the shelter standing", bonusOk: "✓ active", bonusNo: "✗ not active",
    stats: "Shelter {hp}/{max} · Survivors {sv}/{svT} · Ammo used {a} · Zombies killed {k}", pts: "+{p} points", again: "Already solved: no extra points", noHint: "(+5 for no hints)",
    c_slipped: "A {t} slipped through a gap and reached the shelter: your defence left a lane open. Check the layout (CSS) or position of the barricades.", c_broke: "A {t} broke the barricade/door and got in: it was not strong enough or nothing slowed it. Add a stronger barrier, a trap or fire, or close before it arrives.", c_shelter: "A {t} destroyed the shelter. Enemies that arrive hit the shelter directly.", c_survivor: "A survivor was killed by a {t}. Survivors outside the shelter are easy prey: get them in before the runners arrive.", c_nosupply: " You armed a trap without enough supplies.", c_noammo: " You ran out of ammo: pick your targets.",
    adv_walker: "Walkers attack the wall: hold them where your gun range reaches.", adv_runner: "Runners slip past walls through gaps: close them or move survivors inside.", adv_crawler: "Crawlers squeeze through narrow gaps: shrink the spacing.", adv_brute: "A brute needs a trap armed at the right moment.", adv_spitter: "Spitters ignore walls: shoot them down.",
    hintOf: "Hint {i} of {n}", solT: "Reference solution", apply: "Put the solution in the editor", edited: "You edited the code: the wave was reset", whyShow: "What happened:", spawn: "Spawn point", pre: "Preview" },
};
F?.i18n?.extend({ ar: DICT.ar, en: DICT.en });
const lang = () => (F?.i18n?.lang === "en" ? "en" : "ar");
const T = (k, p = {}) => String(DICT[lang()][k] ?? k).replace(/\{(\w+)\}/g, (_, x) => p[x] ?? "");
const L = (o) => (o && (o[lang()] ?? o.ar)) || "";
const typeName = (ty) => (TYPE[ty] ? TYPE[ty][lang()] : ty || "");
const Q = ["what", "does", "why", "how", "expect", "mistake"], QL = { ar: { what: "ما هذا؟", does: "ماذا يفعل؟", why: "لماذا نستخدمه؟", how: "كيف أكتبه؟", expect: "ماذا أتوقع أن أرى؟", mistake: "الخطأ الشائع" }, en: { what: "What is it?", does: "What does it do?", why: "Why use it?", how: "How do I write it?", expect: "What should I see?", mistake: "Common mistake" } };
const ART = {
  farm: '<svg viewBox="0 0 120 70" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="120" height="70" fill="#27402d"/><path d="M20 70V34l22-16 22 16v36z" fill="#8a3b2a"/><path d="M14 36l28-20 28 20" fill="none" stroke="#e9c9a0" stroke-width="3"/><rect x="36" y="46" width="12" height="24" fill="#4a1f14"/><path d="M78 70v-22h4v22M92 70v-22h4v22M76 54h24M76 62h24" stroke="#c9a46a" stroke-width="3"/></svg>',
  gas: '<svg viewBox="0 0 120 70" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="120" height="70" fill="#34363a"/><rect x="26" y="20" width="26" height="42" rx="3" fill="#d1485a"/><rect x="31" y="26" width="16" height="12" fill="#ffe9a8"/><path d="M52 30c10 0 10 12 10 22" fill="none" stroke="#222" stroke-width="3"/><rect x="72" y="14" width="30" height="8" fill="#ffd166"/><rect x="78" y="22" width="4" height="40" fill="#777"/><rect x="92" y="22" width="4" height="40" fill="#777"/></svg>',
  clinic: '<svg viewBox="0 0 120 70" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="120" height="70" fill="#243842"/><rect x="24" y="16" width="72" height="46" fill="#e9f3f6"/><rect x="54" y="22" width="12" height="30" fill="#e5393f"/><rect x="45" y="31" width="30" height="12" fill="#e5393f"/><rect x="52" y="52" width="16" height="10" fill="#4aa3c7"/></svg>',
  school: '<svg viewBox="0 0 120 70" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="120" height="70" fill="#3a3624"/><rect x="18" y="26" width="84" height="36" fill="#b5654a"/><path d="M18 26L60 8l42 18z" fill="#6b3a2c"/><rect x="52" y="42" width="16" height="20" fill="#3a1f16"/><circle cx="60" cy="22" r="5" fill="#ffd166"/><rect x="28" y="34" width="12" height="10" fill="#cfe9ff"/><rect x="80" y="34" width="12" height="10" fill="#cfe9ff"/></svg>',
  bunker: '<svg viewBox="0 0 120 70" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="120" height="70" fill="#2f2428"/><path d="M10 70c0-26 20-40 50-40s50 14 50 40z" fill="#4a4a50"/><rect x="42" y="38" width="36" height="32" rx="3" fill="#2b2b30" stroke="#8b94a1" stroke-width="3"/><circle cx="60" cy="54" r="6" fill="#d1485a"/></svg>',
};

let idx = 0, m = null, mode = "prep", runner = null, hints = 0, usedSol = false, areas = {}, token = 0, previewTimer = null, last = null, res = null;
const SIM_CACHE = SIM;
const solvedMap = () => read().games.zombie?.solved || {};
const starsMap = () => { try { return JSON.parse(localStorage.getItem(STAR_KEY)) || {}; } catch { return {}; } };
const saveStars = (id, n) => { const s = starsMap(); s[id] = Math.max(s[id] || 0, n); try { localStorage.setItem(STAR_KEY, JSON.stringify(s)); } catch { /* ignore */ } };
const unlocked = (i) => i === 0 || !!solvedMap()[i];

// ───────── map ─────────
function renderMap() {
  $("zbLead").textContent = T("lead"); $("zbHow").textContent = T("how"); $("zbPoints") && ($("zbPoints").textContent = read().points);
  const ol = $("zbLocs"); ol.textContent = ""; const done = solvedMap(), st = starsMap();
  LOCS.forEach((loc, li) => {
    const ms = MISSIONS.map((x, i) => [x, i]).filter(([x]) => x.loc === loc.id), first = ms[0][1];
    const open = unlocked(first), li2 = document.createElement("li"); li2.className = `zg-loc-card loc-${loc.id}` + (open ? "" : " locked");
    const prev = LOCS[li - 1], need = prev ? L(prev) : "";
    li2.innerHTML = `<div class="art">${ART[loc.id]}</div><div class="body"><h3></h3><p class="idn"></p><div class="ms"></div></div>`;
    li2.querySelector("h3").textContent = `${li + 1}. ${L(loc)}`; li2.querySelector(".idn").textContent = L(LOC_ID[loc.id]);
    const box = li2.querySelector(".ms");
    ms.forEach(([x, i]) => {
      const b = document.createElement("button"); b.type = "button"; b.className = "zg-ms" + (done[i + 1] ? " done" : "") + (unlocked(i) ? "" : " lock"); b.disabled = !unlocked(i);
      const stars = "★".repeat(st[x.id] || 0) + "☆".repeat(done[i + 1] ? 3 - (st[x.id] || 0) : 0);
      b.innerHTML = `<b>${i + 1}</b><span class="n"></span><span class="s">${done[i + 1] ? stars : unlocked(i) ? "" : "🔒"}</span>`; b.querySelector(".n").textContent = L(x.title);
      b.title = unlocked(i) ? `${L(x.title)} — ${L(x.goal)}` : T("locked", { x: L(MISSIONS[i - 1].title) });
      b.addEventListener("click", () => openMission(i)); box.appendChild(b);
    });
    ol.appendChild(li2);
  });
}

// ───────── mission ─────────
function openMission(i, keep) {
  idx = i; m = MISSIONS[i]; hints = 0; usedSol = false; res = null; token++;
  history.replaceState(null, "", `?m=${i + 1}`);
  $("zbMap").hidden = true; $("zbPlay").hidden = false; $("zbResult").hidden = true; window.scrollTo(0, 0);
  const loc = LOCS.find((l) => l.id === m.loc);
  $("zbLocName").textContent = `${L(loc)} · ${T("mission")} ${i + 1}/${MISSIONS.length}`; $("zbTitle").textContent = L(m.title); $("zbPoints").textContent = read().points;
  $("zbBrief").textContent = L(m.brief); $("zbGoal").textContent = L(m.goal); $("zbTip").textContent = T("tipPrep");
  $("zbStage").className = "zg-stage loc-" + m.loc; document.body.dataset.loc = m.loc;
  $("zbSupBox").hidden = !m.supplies && !(m.bonuses || []).some((b) => b.supplies);
  paintTeach(); paintObjectives(null); paintLegend(); $("zbHints").textContent = ""; $("zbSolution").hidden = true; $("zbSol").hidden = true; $("zbHint").disabled = false;
  buildEditors(keep); setTab(i === 0 ? "brief" : "build"); toPrep();
}
function toPrep() { mode = "prep"; token++; $("zbResult").hidden = true; setBanner("prep"); $("zbStart").disabled = false; $("zbTip").textContent = T("tipPrep"); hud({ hp: m.shelterHp, hpMax: m.shelterHp, sv: surv(), svT: surv(), ammo: m.ammo || 0, sup: m.supplies || 0, z: 0, t: 0 }, true); preview(); }
const surv = () => (m.files.html.match(/class="survivor"/g) || []).length;
function setBanner(k) { const b = $("zbBanner"); b.className = "zg-banner " + k; b.textContent = k === "prep" ? T("prep") : k === "running" ? T("running") : k === "won" ? T("won") : k === "lost" ? T("lost") : ""; b.hidden = !k || k === "running"; if (k === "running") { b.hidden = false; setTimeout(() => { if (mode === "running") b.hidden = true; }, 2200); } }
function learner() { return Object.fromEntries(m.edit.map((n) => [n, areas[n].value])); }
function mountRunner(files) {
  stopRunner(); const my = ++token;
  runner = createRunner($("zbStage"), { runtime: "html", format: "text", title: T("pre"), timeoutMs: 6000, loopBudget: 3000000, onConsole: (e) => onLine(e.text, my), onError: () => {}, onStatus: () => {} });
  runner.run(files);
}
function stopRunner() { if (runner) { runner.destroy(); runner = null; } $("zbStage").textContent = ""; }
function preview() { clearTimeout(previewTimer); mountRunner(worldFiles(m, learner(), "preview", SIM_CACHE)); }
function start() {
  if (mode === "running") return; mode = "running"; res = null; $("zbResult").hidden = true; setBanner("running"); $("zbStart").disabled = true; $("zbTip").textContent = T("tip");
  mountRunner(worldFiles(m, learner(), "play", SIM_CACHE)); setTab("brief", true);
}
function onLine(text, my) {
  if (my !== token) return;
  if (text.startsWith("@@ST ")) { try { const st = JSON.parse(text.slice(5)); last = st; hud(st); if (st.preview) paintObjectives(st.bn); } catch { /* ignore */ } }
  else if (text.startsWith("@@END ")) { try { finish(JSON.parse(text.slice(6))); } catch { /* ignore */ } }
}

// ───────── HUD ─────────
function hud(st, init) {
  $("zbHp").textContent = `${Math.max(0, Math.ceil(st.hp))}/${st.hpMax}`; $("zbHpBar").style.width = Math.max(0, (st.hp / st.hpMax) * 100) + "%";
  $("zbHpBar").className = st.hp / st.hpMax < 0.3 ? "low" : st.hp / st.hpMax < 0.6 ? "mid" : "";
  const pips = $("zbSv"); pips.textContent = ""; for (let i = 0; i < st.svT; i++) { const p = document.createElement("i"); p.className = i < st.sv ? "on" : "off"; pips.appendChild(p); }
  $("zbAmmo").textContent = st.ammo; $("zbAmmo").className = st.ammo === 0 ? "zero" : ""; $("zbSup").textContent = st.sup; $("zbZ").textContent = init ? "–" : st.z + (st.left ? ` (+${st.left})` : "");
  $("zbDawn").textContent = init ? `${m.time}s` : `${Math.max(0, Math.ceil(m.time - st.t))}s`;
}
function paintObjectives(bn) {
  const ul = $("zbObj"); ul.textContent = "";
  const add = (txt, cls) => { const li = document.createElement("li"); li.textContent = txt; if (cls) li.className = cls; ul.appendChild(li); };
  add(T("need", { n: m.need ?? surv() })); add(T("hold", { s: m.time }));
  (m.bonuses || []).forEach((b, i) => add(`${bonusText(b)} — ${bn && bn[i] ? T("bonusOk") : T("bonusNo")}`, bn && bn[i] ? "ok" : "no"));
  if (m.supplies) add(lang() === "ar" ? `الإمدادات (${m.supplies}): كل فخ تُفعّله يستهلك واحدًا` : `Supplies (${m.supplies}): every trap you arm uses one`);
}
function bonusText(b) { const a = []; if (b.ammo) a.push(lang() === "ar" ? `+${b.ammo} ذخيرة` : `+${b.ammo} ammo`); if (b.hp) a.push(lang() === "ar" ? `+${b.hp} صحة للملجأ` : `+${b.hp} shelter health`); return (lang() === "ar" ? "مكافأة HTML صحيح: " : "Valid-HTML bonus: ") + a.join(" · "); }
function paintLegend() {
  const ul = $("zbLegend"); ul.textContent = ""; const h = document.createElement("li"); h.className = "h"; h.textContent = T("threat"); ul.appendChild(h);
  threats(m).forEach(({ type, n }) => { const li = document.createElement("li"); li.innerHTML = `<i class="dot" style="background:${TYPE[type].color}"></i><b></b><span></span>`; li.querySelector("b").textContent = `${typeName(type)} ×${n}`; li.querySelector("span").textContent = L(TYPE[type].d); ul.appendChild(li); });
}
function paintTeach() { const dl = $("zbTeach"); dl.textContent = ""; Q.forEach((k) => { const dt = document.createElement("dt"); dt.textContent = QL[lang()][k]; const dd = document.createElement("dd"); dd.textContent = L(m.teach[k]); if (k === "how" || k === "mistake") dd.className = "code"; dl.append(dt, dd); }); }

// ───────── editors / tabs ─────────
function buildEditors(keep) {
  const tabs = $("zbTabs"), box = $("zbEditors"); tabs.textContent = ""; box.textContent = ""; areas = {};
  m.edit.forEach((name, n) => {
    const tab = document.createElement("button"); tab.type = "button"; tab.className = "ar-tab" + (n ? "" : " is-on"); tab.textContent = name === "js" ? "JavaScript" : name.toUpperCase();
    const pane = document.createElement("div"); pane.className = "ar-pane"; pane.hidden = n !== 0; pane.dataset.name = name;
    const ta = document.createElement("textarea"); ta.value = keep?.[name] ?? m.files[name] ?? ""; ta.spellcheck = false; ta.dir = "ltr"; ta.className = "ar-ta"; ta.setAttribute("aria-label", name);
    pane.appendChild(ta); box.appendChild(pane); tabs.appendChild(tab); areas[name] = ta;
    tab.addEventListener("click", () => { tabs.querySelectorAll(".ar-tab").forEach((x) => x.classList.toggle("is-on", x === tab)); box.querySelectorAll(".ar-pane").forEach((p) => (p.hidden = p.dataset.name !== name)); });
    ta.addEventListener("input", edited);
    upgradeEditor(ta, { language: name === "html" ? "html" : name, onRun: start });
  });
  $("zbRunNote").textContent = lang() === "ar" ? "تتحدث المعاينة تلقائيًا. «ابدأ الموجة» يبدأ الخطر الحقيقي." : "The preview updates automatically. “Start wave” begins the real danger.";
}
function edited() { clearTimeout(previewTimer); previewTimer = setTimeout(() => { if (mode === "running") { mode = "prep"; $("zbStart").disabled = false; setBanner("prep"); $("zbTip").textContent = T("edited"); } if (mode === "prep") { hud({ hp: m.shelterHp, hpMax: m.shelterHp, sv: surv(), svT: surv(), ammo: m.ammo || 0, sup: m.supplies || 0, z: 0, t: 0 }, true); preview(); } }, 500); }
function setCode(name, text) { const ta = areas[name]; if (ta.__fyEditor) ta.__fyEditor.dispatch({ changes: { from: 0, to: ta.__fyEditor.state.doc.length, insert: text } }); ta.value = text; }
function setTab(name, quiet) { document.querySelectorAll(".zg-tabs button").forEach((b) => b.classList.toggle("on", b.dataset.tab === name)); document.querySelectorAll(".zg-panel").forEach((p) => (p.hidden = p.dataset.panel !== name)); }

// ───────── result ─────────
function finish(r) {
  if (mode !== "running") return; mode = "over"; res = r; setBanner(r.win ? "won" : "lost"); $("zbStart").disabled = false;
  setTimeout(() => showResult(r), 1100);
}
function showResult(r) {
  if (mode !== "over") return; const card = $("zbResult"); const hinted = hints > 0 || usedSol;
  $("zbResT").textContent = r.win ? T("won") : T("lost");
  let why = ""; let stars = 0, earned = 0;
  if (r.win) {
    stars = 1 + (r.hp / r.hpMax >= 0.6 ? 1 : 0) + (r.hp / r.hpMax >= 0.6 && r.sv === r.svT && !hinted ? 1 : 0); saveStars(m.id, stars);
    const a = award("zombie", idx + 1, hinted, BASE(idx)); earned = a.earned; $("zbPoints").textContent = a.data.points;
    why = earned ? `${T("pts", { p: earned })} ${hinted ? "" : T("noHint")}` : T("again");
  } else {
    const c = r.cause || {}; why = T("whyShow") + " " + (c.code === "survivor" ? T("c_survivor", { t: typeName(c.type) }) : c.code === "slipped" ? T("c_slipped", { t: typeName(c.type) }) : c.code === "broke" ? T("c_broke", { t: typeName(c.type) }) : T("c_shelter", { t: typeName(c.type) }));
    if (r.ammo === 0) why += T("c_noammo"); if (r.note?.code === "nosupply") why += T("c_nosupply"); if (c.type && DICT[lang()]["adv_" + c.type]) why += " " + T("adv_" + c.type);
  }
  const sb = $("zbStars"); sb.textContent = ""; sb.setAttribute("aria-label", stars + "/3"); for (let k = 1; k <= 3; k++) { const s = document.createElement("i"); s.textContent = "★"; s.className = k <= stars ? "on" : ""; sb.appendChild(s); } sb.hidden = !r.win;
  $("zbResWhy").textContent = why;
  $("zbResStats").innerHTML = ""; const li = document.createElement("li"); li.textContent = T("stats", { hp: Math.ceil(r.hp), max: r.hpMax, sv: r.sv, svT: r.svT, a: r.ammoUsed, k: r.kills }); $("zbResStats").appendChild(li);
  $("zbResExplain").textContent = r.win ? L(m.explain) : ""; $("zbNext").hidden = !(r.win && idx < MISSIONS.length - 1);
  card.hidden = false; card.dataset.win = r.win ? "1" : "0"; ($("zbNext").hidden ? $("zbRetry") : $("zbNext")).focus?.();
}

// ───────── wiring ─────────
$("zbStart").addEventListener("click", start);
$("zbReset").addEventListener("click", () => { toPrep(); });
$("zbRetry").addEventListener("click", () => { toPrep(); start(); });
$("zbEdit").addEventListener("click", () => { toPrep(); setTab("build"); });
$("zbNext").addEventListener("click", () => openMission(idx + 1));
$("zbBack").addEventListener("click", () => { stopRunner(); token++; $("zbPlay").hidden = true; $("zbMap").hidden = false; history.replaceState(null, "", location.pathname); renderMap(); window.scrollTo(0, 0); });
document.querySelectorAll(".zg-tabs button").forEach((b) => b.addEventListener("click", () => setTab(b.dataset.tab)));
$("zbHint").addEventListener("click", () => { const hs = m.hints; if (hints < hs.length) hints++; const box = $("zbHints"); box.textContent = ""; for (let i = 0; i < hints; i++) { const p = document.createElement("p"); p.textContent = `${T("hintOf", { i: i + 1, n: hs.length })}: ${L(hs[i])}`; box.appendChild(p); } if (hints >= hs.length) { $("zbSol").hidden = false; $("zbHint").disabled = true; } });
$("zbSol").addEventListener("click", () => {
  usedSol = true; const box = $("zbSolution"); box.textContent = ""; box.hidden = false; const h = document.createElement("h4"); h.textContent = T("solT"); box.appendChild(h);
  m.edit.forEach((n) => { const lab = document.createElement("b"); lab.textContent = n.toUpperCase(); const pre = document.createElement("pre"); pre.dir = "ltr"; pre.textContent = m.solution[n] ?? m.files[n] ?? ""; box.append(lab, pre); });
  const ex = document.createElement("p"); ex.textContent = L(m.explain); box.appendChild(ex);
  const ap = document.createElement("button"); ap.type = "button"; ap.className = "zg-btn go"; ap.id = "zbApply"; ap.textContent = T("apply");
  ap.addEventListener("click", () => { m.edit.forEach((n) => setCode(n, m.solution[n] ?? m.files[n] ?? "")); toPrep(); setTab("brief"); }); box.appendChild(ap);
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("zbResult").hidden) $("zbResult").hidden = true; });
document.addEventListener("fayad:langchange", () => { if (!$("zbPlay").hidden) { const keep = learner(); const was = mode; openMission(idx, keep); if (was === "over") $("zbResult").hidden = true; } renderMap(); });

renderMap();
const q = Number(new URLSearchParams(location.search).get("m"));
if (q >= 1 && q <= MISSIONS.length && unlocked(q - 1)) openMission(q - 1);
window.__zg = { MISSIONS, openMission, start };
