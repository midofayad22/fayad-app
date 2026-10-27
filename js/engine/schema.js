/* Lesson schema validator (docs/lesson-schema.md). Pure; used by tests and available to the engine in dev. */

const isObj = (v) => v && typeof v === "object" && !Array.isArray(v);
const nonEmpty = (s) => typeof s === "string" && s.trim().length > 0;

function checkText(errors, path, v, { optional = false } = {}) {
  if (v === undefined && optional) return;
  if (!isObj(v) || !nonEmpty(v.ar)) { errors.push(`${path}: expected { ar: non-empty string }`); return; }
  for (const [k, val] of Object.entries(v)) if (!/^[a-z]{2}$/.test(k) || !nonEmpty(val)) errors.push(`${path}.${k}: bad language key or empty text`);
}

/** @returns {string[]} list of problems (empty = valid) */
export function validateTrack(track, lessons) {
  const errors = [];
  if (!isObj(track) || !nonEmpty(track.id)) return ["track.id missing"];
  if (track.layout !== undefined && track.layout !== "foundation") errors.push(`track.layout invalid: ${track.layout}`);
  if (!["dom-js", "js", "html", "none"].includes(track.runtime)) errors.push(`track.runtime invalid: ${track.runtime}`);
  if (!Array.isArray(lessons) || !lessons.length) return [...errors, "lessons must be a non-empty array"];

  const ids = new Set();
  lessons.forEach((l, i) => {
    const at = `lesson[${i}]`;
    const want = `${track.id}-${String(i + 1).padStart(2, "0")}`;
    if (l.id !== want) errors.push(`${at}.id: expected "${want}" (ids are contiguous and ordered), got "${l.id}"`);
    if (ids.has(l.id)) errors.push(`${at}.id duplicated`);
    ids.add(l.id);
    checkText(errors, `${at}.title`, l.title);
    checkText(errors, `${at}.description`, l.description, { optional: true });
    // optional "foundation" fields (Programming Fundamentals layout): see docs/lesson-schema.md
    checkText(errors, `${at}.navTitle`, l.navTitle, { optional: true });
    checkText(errors, `${at}.heading`, l.heading, { optional: true });
    checkText(errors, `${at}.level`, l.level, { optional: true });
    checkText(errors, `${at}.body`, l.body, { optional: true });
    checkText(errors, `${at}.key`, l.key, { optional: true });
    checkText(errors, `${at}.challenge`, l.challenge, { optional: true });
    if (l.icon !== undefined && !(typeof l.icon === "string" && /^fa-[a-z0-9-]+$/.test(l.icon))) errors.push(`${at}.icon must be a Font Awesome class like "fa-terminal"`);
    (l.sections || []).forEach((s, j) => { checkText(errors, `${at}.sections[${j}].title`, s.title); checkText(errors, `${at}.sections[${j}].html`, s.html); checkText(errors, `${at}.sections[${j}].label`, s.label, { optional: true }); });
    if (l.example !== undefined) {
      if (!isObj(l.example) || typeof l.example.code !== "string") errors.push(`${at}.example.code must be a string`);
      else checkText(errors, `${at}.example.explanation`, l.example.explanation, { optional: true });
    }
    if (track.layout === "foundation") {
      for (const f of ["heading", "level", "body", "key", "challenge", "icon"]) if (l[f] === undefined) errors.push(`${at}.${f} is required by the foundation layout`);
      if (!l.example || typeof l.example.code !== "string") errors.push(`${at}.example.code is required by the foundation layout`);
      if (Array.isArray(l.quiz) && l.quiz.length !== 1) errors.push(`${at}.quiz must have exactly one question in the foundation layout`);
    }
    if (!Array.isArray(l.quiz) || !l.quiz.length) errors.push(`${at}.quiz must have at least one question`);
    else l.quiz.forEach((q, j) => {
      const qa = `${at}.quiz[${j}]`;
      checkText(errors, `${qa}.question`, q.question);
      if (!Array.isArray(q.options) || q.options.length < 2) errors.push(`${qa}.options needs >= 2`);
      else q.options.forEach((o, k) => checkText(errors, `${qa}.options[${k}]`, o));
      if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct >= (q.options?.length || 0)) errors.push(`${qa}.correct out of range`);
    });
  });

  if (track.assessment !== undefined) {
    const a = track.assessment;
    if (!isObj(a) || !nonEmpty(a.id)) errors.push("track.assessment.id missing");
    else {
      checkText(errors, "assessment.title", a.title);
      if (!(Number.isInteger(a.passPercent) && a.passPercent >= 1 && a.passPercent <= 100)) errors.push("assessment.passPercent must be an integer 1-100");
      if (!Array.isArray(a.questions) || !a.questions.length) errors.push("assessment.questions must be non-empty");
      else a.questions.forEach((q, j) => {
        const qa = `assessment.questions[${j}]`;
        checkText(errors, `${qa}.question`, q.question);
        if (!Array.isArray(q.options) || q.options.length < 2) errors.push(`${qa}.options needs >= 2`);
        else q.options.forEach((o, k) => checkText(errors, `${qa}.options[${k}]`, o));
        if (!Number.isInteger(q.correct) || q.correct < 0 || q.correct >= (q.options?.length || 0)) errors.push(`${qa}.correct out of range`);
      });
    }
  }

  const seen = new Map();
  (track.groups || []).forEach((g, gi) => {
    checkText(errors, `group[${gi}].title`, g.title);
    (g.lessons || []).forEach((id) => {
      if (!ids.has(id)) errors.push(`group[${gi}] references unknown lesson ${id}`);
      if (seen.has(id)) errors.push(`lesson ${id} is in more than one group`);
      seen.set(id, gi);
    });
  });
  for (const id of ids) if (!seen.has(id)) errors.push(`lesson ${id} is not in any group (would be unreachable from the sidebar)`);
  return errors;
}

/** Sidebar order == group order. Previous/next navigation follows the same order, so every lesson is reachable. */
export function orderedIds(track) { return track.groups.flatMap((g) => g.lessons); }

/** Pick text for a language with Arabic fallback. */
export function t(obj, lang) { return obj ? (obj[lang] && obj[lang].trim() ? obj[lang] : obj.ar) : ""; }
