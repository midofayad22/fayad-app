/*
  Course navigation — ONE component for every course (generic engine and the foundation courses).
  Its job is the inside of a course: modules → units → lessons (+ assessments), progress, search, jump to where you stopped.
  Site-level navigation (home, all courses, games, account) belongs to the global drawer (js/nav-drawer.js) and is not repeated here.

  Markup contract (used by tests): .cn > .cn-mod[data-module] > button.cn-mod-h[aria-expanded] + .cn-mod-b > a.cn-lesson[data-lesson|data-id|data-state]
  Styles: css/course-nav.css (everything is scoped under .cn).
*/
import { moduleStats, nextUp, lessonOrder } from "/js/course/structure.js";

const STR = {
  ar: { search: "ابحث عن درس", clear: "مسح البحث", cont: "تابع من حيث توقفت", start: "ابدأ الكورس", again: "راجع الكورس", module: "الوحدة", assessment: "التقييم", results: (n) => `${n} نتيجة`, none: "لا توجد دروس مطابقة", openAll: "فتح الكل", closeAll: "طي الكل", aria: (c) => `محتوى الكورس: ${c}`, done: "مكتمل", current: "الدرس الحالي", passed: "ناجح", todo: "لم يبدأ" },
  en: { search: "Search lessons", clear: "Clear search", cont: "Continue where you stopped", start: "Start the course", again: "Review the course", module: "Module", assessment: "Assessment", results: (n) => `${n} result${n === 1 ? "" : "s"}`, none: "No matching lessons", openAll: "Expand all", closeAll: "Collapse all", aria: (c) => `Course contents: ${c}`, done: "completed", current: "current lesson", passed: "passed", todo: "not started" },
};
const SVG = "http://www.w3.org/2000/svg";
const pad = (n) => String(n).padStart(2, "0");

export function createCourseNav({ doc = document, mount, courseId, courseTitle = "", mods, lang = "ar", titleOf, numberOf, isDone, isPassed = () => false, current, onSelect, ids = {}, persist = true }) {
  const win = doc.defaultView;
  let S = STR[lang === "en" ? "en" : "ar"];
  let L = lang === "en" ? "en" : "ar";
  const key = `fayad-cn:${courseId}`;
  const open = new Map();                       // module id -> boolean
  const refs = { mods: [], items: new Map() };  // built DOM references
  let query = "", built = false;

  const el = (tag, cls, txt) => { const n = doc.createElement(tag); if (cls) n.className = cls; if (txt != null) n.textContent = txt; return n; };
  const tx = (o) => (o ? (o[L] && String(o[L]).trim() ? o[L] : o.ar) : "");
  const saved = () => { if (!persist) return null; try { return JSON.parse(win.localStorage.getItem(key) || "null"); } catch { return null; } };
  const save = () => { if (!persist) return; try { win.localStorage.setItem(key, JSON.stringify({ open: [...open].filter(([, v]) => v).map(([k]) => k) })); } catch { /* optional convenience */ } };

  const root = el("div", "cn"); root.setAttribute("role", "navigation");
  const head = el("div", "cn-top");
  const searchWrap = el("div", "cn-search");
  const input = el("input"); input.type = "search"; input.autocomplete = "off"; input.spellcheck = false; input.id = ids.search || ""; if (!ids.search) input.removeAttribute("id");
  const clearBtn = el("button", "cn-clear"); clearBtn.type = "button"; clearBtn.hidden = true; clearBtn.innerHTML = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  const status = el("p", "cn-status"); status.setAttribute("role", "status"); status.setAttribute("aria-live", "polite"); if (ids.empty) status.id = ids.empty;
  searchWrap.append(input, clearBtn);
  const cont = el("a", "cn-continue");
  const bulk = el("div", "cn-bulk"); const bOpen = el("button", "cn-link"); const bClose = el("button", "cn-link"); bOpen.type = bClose.type = "button"; bulk.append(bOpen, bClose);
  // the lesson filter is a compact on-demand control (global search lives in the header); it opens from a small icon button
  searchWrap.hidden = true;
  const find = el("button", "cn-find"); find.type = "button"; find.setAttribute("aria-expanded", "false");
  find.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';
  find.addEventListener("click", () => { const o = searchWrap.hidden; searchWrap.hidden = !o; find.setAttribute("aria-expanded", String(o)); if (o) input.focus(); else if (input.value) { input.value = ""; input.dispatchEvent(new Event("input")); } });
  bulk.append(find);
  head.append(cont, bulk, searchWrap, status);
  const list = el("ol", "cn-mods");
  root.append(head, list);
  mount.textContent = ""; mount.appendChild(root);

  function ring(percent) {
    const s = doc.createElementNS(SVG, "svg"); s.setAttribute("viewBox", "0 0 32 32"); s.setAttribute("class", "cn-ring"); s.setAttribute("aria-hidden", "true");
    const bg = doc.createElementNS(SVG, "circle"), fg = doc.createElementNS(SVG, "circle");
    for (const c of [bg, fg]) { c.setAttribute("cx", "16"); c.setAttribute("cy", "16"); c.setAttribute("r", "13"); c.setAttribute("fill", "none"); c.setAttribute("stroke-width", "3"); }
    bg.setAttribute("class", "cn-ring-bg"); fg.setAttribute("class", "cn-ring-fg"); fg.setAttribute("stroke-linecap", "round"); fg.setAttribute("transform", "rotate(-90 16 16)");
    fg.setAttribute("stroke-dasharray", "81.68"); fg.setAttribute("stroke-dashoffset", String(81.68 * (1 - percent / 100)));
    s.append(bg, fg); return s;
  }

  function build() {
    list.textContent = ""; refs.mods = []; refs.items.clear();
    const memo = saved();
    mods.forEach((m, mi) => {
      const li = el("li", "cn-mod"); li.dataset.module = m.id; if (m.isAssessment) li.classList.add("is-assess");
      const h = el("button", "cn-mod-h"); h.type = "button";
      const bid = `cn-${courseId}-${m.id}`; h.setAttribute("aria-controls", bid);
      const num = el("span", "cn-mod-n"); const txt = el("span", "cn-mod-t"); const eyebrow = el("small"); const ttl = el("strong"); txt.append(eyebrow, ttl);
      const cnt = el("span", "cn-mod-c"); const chev = el("i", "cn-chev"); chev.setAttribute("aria-hidden", "true");
      h.append(num, txt, cnt, chev);
      const body = el("div", "cn-mod-b"); body.id = bid; const inner = el("div", "cn-mod-i"); body.appendChild(inner);
      const unitRefs = [];
      for (const u of m.units) {
        const ul = el("div", "cn-unit"); let ut = null; if (u.title) { ut = el("h4", "cn-unit-t"); ul.appendChild(ut); }
        const ol = el("ol", "cn-lessons");
        for (const it of u.items) {
          const row = el("li"); const a = el("a", "cn-lesson"); a.dataset.id = it.id; a.dataset.kind = it.kind;
          const mark = el("span", "cn-mark"); const nm = el("span", "cn-name");
          if (it.kind === "lesson") { const n = numberOf(it.id); a.href = `#lesson-${n}`; a.dataset.lesson = String(n); }
          else { a.href = `#${it.hash || it.id}`; a.classList.add("cn-assess"); a.dataset.lesson = it.hash || it.id; }
          a.append(mark, nm); row.appendChild(a); ol.appendChild(row);
          a.addEventListener("click", (e) => { e.preventDefault(); onSelect(it); });
          refs.items.set(it.id, { a, mark, nm, it, row });
        }
        ul.appendChild(ol); inner.appendChild(ul); unitRefs.push({ ut, u });
      }
      li.append(h, body); list.appendChild(li);
      h.addEventListener("click", () => toggle(m.id));
      refs.mods.push({ li, h, body, inner, num, eyebrow, ttl, cnt, m, mi, units: unitRefs, ringHost: num });
      const stored = memo?.open ? memo.open.includes(m.id) : null;
      open.set(m.id, open.has(m.id) ? open.get(m.id) : stored !== null ? stored : mods.length <= 3);
    });
    // first visit with many modules: open only the module that holds the current lesson
    if (!memo) { const cur = moduleOf(current()); if (cur && mods.length > 3) for (const m of mods) open.set(m.id, m.id === cur); }
    built = true; label(); paint(true);
  }

  function moduleOf(id) { for (const m of mods) for (const u of m.units) if (u.items.some((i) => i.id === id)) return m.id; return null; }

  function label() {
    S = STR[L]; root.setAttribute("aria-label", S.aria(courseTitle));
    input.placeholder = S.search; input.setAttribute("aria-label", S.search); find.setAttribute("aria-label", S.search); find.title = S.search; clearBtn.setAttribute("aria-label", S.clear); clearBtn.title = S.clear;
    bOpen.textContent = S.openAll; bClose.textContent = S.closeAll;
    refs.mods.forEach((r) => {
      r.eyebrow.textContent = r.m.isAssessment ? S.assessment : `${S.module} ${pad(r.mi + 1)}`; r.ttl.textContent = tx(r.m.title);
      r.units.forEach(({ ut, u }) => { if (ut) ut.textContent = tx(u.title); });
    });
    for (const { nm, it } of refs.items.values()) renderName(nm, it);
  }

  function renderName(nm, it) {
    const t = it.kind === "lesson" ? titleOf(it.id) : tx(it.title); nm.textContent = "";
    const i = query ? t.toLowerCase().indexOf(query) : -1;
    if (i < 0) { nm.textContent = t; return; }
    nm.append(doc.createTextNode(t.slice(0, i)), Object.assign(el("mark"), { textContent: t.slice(i, i + query.length) }), doc.createTextNode(t.slice(i + query.length)));
  }

  function setOpen(id, v, quiet) { open.set(id, v); const r = refs.mods.find((x) => x.m.id === id); if (r) applyOpen(r); if (!quiet) save(); }
  function toggle(id) { setOpen(id, !open.get(id)); }
  function applyOpen(r) { const o = !!open.get(r.m.id) || !!query; r.li.classList.toggle("is-open", o); r.h.setAttribute("aria-expanded", String(o)); if (o) r.body.removeAttribute("inert"); else r.body.setAttribute("inert", ""); }

  /** repaint states; cheap enough to run on every lesson change (one pass over the items) */
  function paint(reveal) {
    const cur = current(); let all = 0, doneAll = 0;
    for (const { a, mark, it } of refs.items.values()) {
      const done = it.kind === "lesson" ? isDone(it.id) : isPassed(it); const isCur = it.id === cur;
      const state = isCur ? "current" : done ? "done" : "todo";
      a.dataset.state = state; a.dataset.done = done ? "true" : "false";
      if (isCur) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      a.classList.toggle("active", isCur);
      mark.textContent = done ? "✓" : it.kind === "lesson" ? pad(numberOf(it.id)) : "★";
      mark.setAttribute("aria-label", `${done ? (it.kind === "lesson" ? S.done : S.passed) : S.todo}${isCur ? ", " + S.current : ""}`);
      if (it.kind === "lesson") { all += 1; if (done) doneAll += 1; }
    }
    for (const r of refs.mods) {
      const st = moduleStats(r.m, isDone, isPassed);
      r.cnt.textContent = `${st.done}/${st.total}`; r.li.classList.toggle("is-complete", st.total > 0 && st.done === st.total); r.li.classList.toggle("has-current", moduleOf(cur) === r.m.id);
      r.num.textContent = ""; r.num.append(ring(st.percent)); const n = el("b", "", st.done === st.total && st.total ? "✓" : r.m.isAssessment ? "★" : String(r.mi + 1)); r.num.append(n);
      r.h.setAttribute("aria-label", `${r.eyebrow.textContent}: ${r.ttl.textContent}, ${st.done}/${st.total}`);
    }
    const nx = nextUp(mods, isDone), started = doneAll > 0, finished = all > 0 && doneAll === all;
    const target = cur && refs.items.get(cur) && !finished && started ? (isDone(cur) ? nx : cur) : nx;
    cont.textContent = finished ? S.again : started ? S.cont : S.start;
    if (target) { cont.href = `#lesson-${numberOf(target)}`; cont.dataset.id = target; }
    cont.onclick = (e) => { e.preventDefault(); const t = refs.items.get(cont.dataset.id); if (t) { onSelect(t.it); } };
    if (reveal !== false) { const m = moduleOf(cur); if (m && !open.get(m)) setOpen(m, true, true); }
    refs.mods.forEach(applyOpen);
    if (reveal) scrollToCurrent();
  }

  function scrollToCurrent() {
    const r = refs.items.get(current()); if (!r || query) return;
    const sc = root.closest(".sidebar, .cn-scroll, .sb-panel") || root; const a = r.a.getBoundingClientRect(), b = sc.getBoundingClientRect();
    if (sc.scrollHeight > sc.clientHeight && (a.top < b.top + 70 || a.bottom > b.bottom - 20)) sc.scrollTop += a.top - b.top - b.height / 3;
  }

  function filter() {
    query = input.value.trim().toLowerCase(); clearBtn.hidden = !query; let shown = 0;
    for (const r of refs.mods) {
      let any = false;
      for (const u of r.units) { let ua = false; for (const it of u.u.items) { const x = refs.items.get(it.id); const t = it.kind === "lesson" ? titleOf(it.id) : tx(it.title); const hit = !query || (t + " " + (it.kind === "lesson" ? numberOf(it.id) : "")).toLowerCase().includes(query); x.row.hidden = !hit; renderName(x.nm, it); if (hit) { ua = true; any = true; shown++; } } if (u.ut) u.ut.parentElement.hidden = !ua; else u.u && 0; }
      r.li.hidden = !any; applyOpen(r);
    }
    for (const r of refs.mods) for (const u of r.units) { const wrap = u.ut ? u.ut.parentElement : null; if (wrap) wrap.hidden = !u.u.items.some((it) => !refs.items.get(it.id).row.hidden); }
    status.textContent = query ? (shown ? S.results(shown) : S.none) : ""; status.dataset.empty = query && !shown ? "true" : "false";
    bulk.hidden = !!query;
  }

  input.addEventListener("input", filter);
  input.addEventListener("keydown", (e) => { if (e.key === "Escape" && input.value) { e.stopPropagation(); input.value = ""; filter(); } else if (e.key === "ArrowDown") { e.preventDefault(); focusables()[0]?.focus(); } });
  clearBtn.addEventListener("click", () => { input.value = ""; filter(); input.focus(); });
  bOpen.addEventListener("click", () => { mods.forEach((m) => open.set(m.id, true)); refs.mods.forEach(applyOpen); save(); });
  bClose.addEventListener("click", () => { const cur = moduleOf(current()); mods.forEach((m) => open.set(m.id, m.id === cur)); refs.mods.forEach(applyOpen); save(); });

  const focusables = () => [...root.querySelectorAll(".cn-mod:not([hidden]) > .cn-mod-h, .cn-mod.is-open:not([hidden]) .cn-lesson")].filter((n) => !n.closest("[hidden]"));
  root.addEventListener("keydown", (e) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key) || e.target === input) return;
    const f = focusables(), i = f.indexOf(doc.activeElement); if (i < 0) return;
    e.preventDefault(); const n = e.key === "Home" ? 0 : e.key === "End" ? f.length - 1 : Math.max(0, Math.min(f.length - 1, i + (e.key === "ArrowDown" ? 1 : -1))); f[n].focus();
  });

  build();
  return {
    root, paint: () => paint(false), reveal: () => { paint(true); }, focusSearch: () => input.focus(),
    setLang(l) { L = l === "en" ? "en" : "ar"; label(); paint(false); filter(); },
    rebuild(newMods) { mods = newMods; build(); filter(); },
    get query() { return query; }, order: () => lessonOrder(mods),
  };
}
