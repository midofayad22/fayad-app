/*
  One description of a course's shape for every course screen (navigation, landing page, dashboard).

  New courses declare   track.modules = [{ id, title, units: [{ id?, title?, lessons: [lessonId…] }] }]
  Existing courses keep  track.groups  = [{ id, title, lessons: [lessonId…] }]   (each group becomes one module with one untitled unit)
  Lesson ids never change: order comes from the structure, not from the id.

  normalize(track, { assessments }) -> [{ id, title, units: [{ id, title|null, items: [{ kind: "lesson"|"assessment", id, … }] }] }]
*/
export function normalize(track, { assessments = [] } = {}) {
  const src = Array.isArray(track.modules) && track.modules.length ? track.modules : (track.groups || []).map((g) => ({ id: g.id, title: g.title, units: [{ lessons: g.lessons }] }));
  const mods = src.map((m, mi) => ({
    id: m.id || `m${mi + 1}`, title: m.title,
    units: (m.units || []).map((u, ui) => ({ id: u.id || `${m.id || "m" + (mi + 1)}-u${ui + 1}`, title: u.title || null, items: (u.lessons || []).map((id) => ({ kind: "lesson", id })) })),
  }));
  // assessments that belong to a module are appended to its last unit; the rest (final exam) form their own closing module
  const tail = [];
  for (const a of assessments) {
    const host = a.module && mods.find((m) => m.id === a.module);
    if (host) host.units[host.units.length - 1].items.push({ kind: "assessment", ...a });
    else tail.push({ kind: "assessment", ...a });
  }
  if (tail.length) mods.push({ id: "assessments", title: { ar: "التقييم", en: "Assessment" }, units: [{ id: "assessments-u1", title: null, items: tail }], isAssessment: true });
  return mods;
}

/** every lesson id in presentation order */
export function lessonOrder(mods) { return mods.flatMap((m) => m.units.flatMap((u) => u.items.filter((i) => i.kind === "lesson").map((i) => i.id))); }

/** per-module counts; `isDone(id)` decides lesson completion, `isPassed(item)` assessment pass */
export function moduleStats(mod, isDone, isPassed = () => false) {
  let total = 0, done = 0;
  for (const u of mod.units) for (const it of u.items) { total += 1; if (it.kind === "lesson" ? isDone(it.id) : isPassed(it)) done += 1; }
  return { total, done, percent: total ? Math.round((done / total) * 100) : 0 };
}

/** first unfinished lesson in presentation order (falls back to the first lesson) */
export function nextUp(mods, isDone) { const o = lessonOrder(mods); return o.find((id) => !isDone(id)) || o[0] || null; }
