/*
  FAYAD progress store, schema "fayad-progress-v1".

  One localStorage record for every course, validated on every read and write:

    {
      "v": 1,
      "tracks": {
        "js": {
          "completed": ["js-01", "js-02"],          // lesson ids, sorted, unique. "Opened" is NOT "completed".
          "current":   "js-03" | null,               // last lesson the learner was on (resume pointer)
          "quiz":      { "js-03": { "passed": [0, 1], "attempts": 4, "lastAt": 1730000000000 } },
          "updatedAt": 1730000000000
        }
      },
      "imported": { "js": { "at": 1730000000000, "keys": ["fayad-js-completed-lessons"] } }
    }

  Compatibility (one release): every mutation is mirrored to the track's legacy localStorage keys in the exact
  legacy format, and every load() union-merges the legacy keys into v1. The merge is idempotent and never removes
  anything, so (a) opening the page twice cannot duplicate or lose progress and (b) rolling back to the previous
  course implementation and forward again keeps whatever was completed in either version.
  Resetting a track clears BOTH representations (otherwise the merge would resurrect it).

  Storage can be missing, full, blocked or corrupt. Nothing here throws to the caller: reads fall back to an empty
  record; writes report success as a boolean.
*/

export const KEY = "fayad-progress-v1";

/** Lesson ids are frozen at conversion time: <track>-<1-based ordinal, zero padded>. */
export function lessonId(track, ordinal) {
  return `${track}-${String(ordinal).padStart(2, "0")}`;
}

export function ordinalOf(track, id) {
  const m = typeof id === "string" && id.startsWith(track + "-") ? /^\d+$/.exec(id.slice(track.length + 1)) : null;
  return m ? Number(m[0]) : null;
}

/**
 * Legacy storage map. For every track: which keys hold what, and whether the stored numbers are 0- or 1-based.
 *   list:    key of a JSON array of completed lessons          listBase: 0|1 (value of the FIRST lesson)
 *   current: key holding the last-opened lesson index           currentBase: 0|1
 * Verified against each track's source (see docs/migration-matrix.md). Tracks without a completion list
 * (CSS, Angular) never stored completion before; their quiz/current data is imported where it exists.
 */
export const LEGACY = {
  com: { list: "fayad-computer-progress", listBase: 0 },
  prg: { list: "fayad-programming-fundamentals-progress", listBase: 1 },
  html: { list: "fayad-html-progress", listBase: 1 },
  css: { current: "fayad-css-current-lesson", currentBase: 0 },
  js: { list: "fayad-js-completed-lessons", listBase: 0, current: "fayad-js-current-lesson", currentBase: 0 },
  react: { list: "fayad-react-completed-lessons", listBase: 0, current: "fayad-react-current-lesson", currentBase: 0 },
  vue: { list: "fayad-vue-learning-progress", listBase: 1 },
  angular: { current: "fayad-angular-current-lesson", currentBase: 0 },
  // New courses never had a previous implementation; these keys only keep js/catalog.js (homepage progress) working.
  ajs: { list: "fayad-ajs-completed-lessons", listBase: 0, current: "fayad-ajs-current-lesson", currentBase: 0 },
  bs: { list: "fayad-bs-completed-lessons", listBase: 0, current: "fayad-bs-current-lesson", currentBase: 0 },
  tw: { list: "fayad-tw-completed-lessons", listBase: 0, current: "fayad-tw-current-lesson", currentBase: 0 },
};

function emptyTrack() {
  return { completed: [], current: null, quiz: {}, updatedAt: 0 };
}

function emptyAssessment() {
  return { attempts: 0, bestPct: 0, lastPct: 0, passed: false, lastAt: 0 };
}

function emptyDoc() {
  return { v: 1, tracks: {}, imported: {} };
}

const isInt = (n) => Number.isInteger(n);
// ids sort by their numeric tail so "js-100" follows "js-99"
const byOrdinal = (a, b) => Number(a.slice(a.lastIndexOf("-") + 1)) - Number(b.slice(b.lastIndexOf("-") + 1));

/** Validate / normalise a parsed document. `totals` = { track: lessonCount } (unknown tracks are dropped). */
export function normalize(raw, totals) {
  const doc = emptyDoc();
  if (!raw || typeof raw !== "object" || raw.v !== 1 || typeof raw.tracks !== "object" || !raw.tracks) return doc;
  for (const track of Object.keys(totals)) {
    const src = raw.tracks[track];
    if (!src || typeof src !== "object") continue;
    const total = totals[track];
    const valid = (id) => { const n = ordinalOf(track, id); return n !== null && n >= 1 && n <= total; };
    const t = emptyTrack();
    if (Array.isArray(src.completed)) t.completed = [...new Set(src.completed.filter(valid))].sort(byOrdinal);
    if (valid(src.current)) t.current = src.current;
    if (src.quiz && typeof src.quiz === "object") {
      for (const [id, q] of Object.entries(src.quiz)) {
        if (!valid(id) || !q || typeof q !== "object") continue;
        const passed = Array.isArray(q.passed) ? [...new Set(q.passed.filter((i) => isInt(i) && i >= 0 && i < 50))].sort((a, b) => a - b) : [];
        t.quiz[id] = { passed, attempts: isInt(q.attempts) && q.attempts >= 0 ? q.attempts : 0, lastAt: isInt(q.lastAt) ? q.lastAt : 0 };
      }
    }
    t.updatedAt = isInt(src.updatedAt) ? src.updatedAt : 0;
    const a = src.assessment;
    if (a && typeof a === "object") {
      const pct = (n) => (isInt(n) && n >= 0 && n <= 100 ? n : 0);
      t.assessment = { attempts: isInt(a.attempts) && a.attempts >= 0 ? a.attempts : 0, bestPct: pct(a.bestPct), lastPct: pct(a.lastPct), passed: a.passed === true, lastAt: isInt(a.lastAt) ? a.lastAt : 0 };
    }
    doc.tracks[track] = t;
  }
  if (raw.imported && typeof raw.imported === "object") {
    for (const [track, meta] of Object.entries(raw.imported)) {
      if (track in totals && meta && typeof meta === "object") {
        doc.imported[track] = { at: isInt(meta.at) ? meta.at : 0, keys: Array.isArray(meta.keys) ? meta.keys.filter((k) => typeof k === "string") : [] };
      }
    }
  }
  return doc;
}

/** Parse a legacy "completed" array into canonical ids (drops duplicates, non-integers, out-of-range). */
export function legacyListToIds(track, raw, base, total) {
  let arr;
  try { arr = JSON.parse(raw); } catch { return []; }
  if (!Array.isArray(arr)) return [];
  const out = new Set();
  for (const v of arr) {
    if (typeof v !== "number" && !(typeof v === "string" && /^\d+$/.test(v))) continue; // "final" etc. ignored
    const n = Number(v) + (1 - base);
    if (isInt(n) && n >= 1 && n <= total) out.add(lessonId(track, n));
  }
  return [...out];
}

/**
 * @param {{storage?: Storage, totals: Record<string, number>, now?: () => number, mirror?: boolean}} opts
 */
export function createProgress(opts) {
  const totals = opts.totals;
  const now = opts.now || (() => Date.now());
  const mirror = opts.mirror !== false;
  let storage = opts.storage;
  if (storage === undefined) { try { storage = globalThis.localStorage; } catch { storage = null; } }

  const memory = {}; // fallback when storage is unavailable: progress works for the session
  const get = (k) => { try { return storage ? storage.getItem(k) : memory[k] ?? null; } catch { return memory[k] ?? null; } };
  const set = (k, v) => { try { if (storage) { storage.setItem(k, v); return true; } } catch { /* quota / blocked */ } memory[k] = v; return false; };
  const del = (k) => { try { storage?.removeItem(k); } catch { /* ignore */ } delete memory[k]; };

  let doc = null;
  let passthrough = { tracks: {}, imported: {} }; // data for tracks not in `totals`: preserved verbatim, never dropped

  function readDoc() {
    let parsed = null;
    try { const raw = get(KEY); parsed = raw ? JSON.parse(raw) : null; } catch { parsed = null; }
    passthrough = { tracks: {}, imported: {} };
    if (parsed && parsed.v === 1 && parsed.tracks && typeof parsed.tracks === "object") {
      for (const [k, v] of Object.entries(parsed.tracks)) if (!(k in totals)) passthrough.tracks[k] = v;
      if (parsed.imported && typeof parsed.imported === "object") for (const [k, v] of Object.entries(parsed.imported)) if (!(k in totals)) passthrough.imported[k] = v;
    }
    return normalize(parsed, totals);
  }

  function ensure(track) { return (doc.tracks[track] ||= emptyTrack()); }

  /** union-merge legacy keys into the document; returns true if anything changed */
  function mergeLegacy() {
    let changed = false;
    for (const track of Object.keys(totals)) {
      const map = LEGACY[track];
      if (!map) continue;
      const usedKeys = [];
      if (map.list) {
        const raw = get(map.list);
        if (raw !== null) {
          usedKeys.push(map.list);
          const ids = legacyListToIds(track, raw, map.listBase, totals[track]);
          const t = ensure(track);
          const before = t.completed.length;
          t.completed = [...new Set([...t.completed, ...ids])].sort(byOrdinal);
          if (t.completed.length !== before) { changed = true; t.updatedAt = now(); }
        }
      }
      if (map.current) {
        const raw = get(map.current);
        if (raw !== null && /^\d+$/.test(raw)) {
          usedKeys.push(map.current);
          const n = Number(raw) + (1 - map.currentBase);
          const t = ensure(track);
          if (isInt(n) && n >= 1 && n <= totals[track] && t.current === null) { t.current = lessonId(track, n); changed = true; t.updatedAt = now(); }
        }
      }
      if (usedKeys.length && !doc.imported[track]) { doc.imported[track] = { at: now(), keys: usedKeys }; changed = true; }
    }
    return changed;
  }

  function persist() {
    const out = { ...doc, tracks: { ...passthrough.tracks, ...doc.tracks }, imported: { ...passthrough.imported, ...doc.imported } };
    return set(KEY, JSON.stringify(out));
  }

  function mirrorLegacy(track) {
    if (!mirror) return;
    const map = LEGACY[track];
    const t = doc.tracks[track];
    if (!map || !t) return;
    if (map.list) {
      const values = t.completed.map((id) => ordinalOf(track, id) - 1 + map.listBase).sort((a, b) => a - b);
      // do not create an empty legacy list that the previous implementation never wrote
      if (values.length || get(map.list) !== null) set(map.list, JSON.stringify(values));
    }
    if (map.current && t.current) set(map.current, String(ordinalOf(track, t.current) - 1 + map.currentBase));
  }

  function load() {
    if (doc) return doc;
    doc = readDoc();
    if (mergeLegacy()) persist();
    return doc;
  }

  function checkId(track, id) {
    const n = ordinalOf(track, id);
    if (!(track in totals) || n === null || n < 1 || n > totals[track]) throw new RangeError(`invalid lesson id ${id} for ${track}`);
  }

  return {
    KEY,
    /** full normalised document (copy) */
    snapshot() { return JSON.parse(JSON.stringify(load())); },
    completed(track) { load(); return new Set(doc.tracks[track]?.completed || []); },
    isCompleted(track, id) { load(); return !!doc.tracks[track]?.completed.includes(id); },
    current(track) { load(); return doc.tracks[track]?.current ?? null; },
    quiz(track, id) { load(); return doc.tracks[track]?.quiz[id] || { passed: [], attempts: 0, lastAt: 0 }; },
    /** Mark complete. Callers must apply the track's completion rule (e.g. all quiz questions passed) first. */
    markCompleted(track, id) {
      load(); checkId(track, id);
      const t = ensure(track);
      if (!t.completed.includes(id)) { t.completed = [...t.completed, id].sort(byOrdinal); t.updatedAt = now(); }
      const ok = persist(); mirrorLegacy(track); return ok;
    },
    /** Resume pointer only: does NOT complete anything. */
    setCurrent(track, id) {
      load(); checkId(track, id);
      const t = ensure(track);
      if (t.current !== id) { t.current = id; t.updatedAt = now(); }
      const ok = persist(); mirrorLegacy(track); return ok;
    },
    /** Record the outcome of answering a question. A correct answer is remembered; a wrong one only counts an attempt. */
    recordAnswer(track, id, questionIndex, correct) {
      load(); checkId(track, id);
      if (!isInt(questionIndex) || questionIndex < 0 || questionIndex >= 50) throw new RangeError("invalid question index");
      const t = ensure(track);
      const q = (t.quiz[id] ||= { passed: [], attempts: 0, lastAt: 0 });
      q.attempts += 1; q.lastAt = now();
      if (correct && !q.passed.includes(questionIndex)) q.passed = [...q.passed, questionIndex].sort((a, b) => a - b);
      t.updatedAt = now();
      return persist();
    },
    /** Final-assessment result (percentage 0-100). Best score and pass state are kept; nothing is ever lowered. */
    recordAssessment(track, percent, passed) {
      load();
      if (!(track in totals)) throw new RangeError(`unknown track ${track}`);
      if (!isInt(percent) || percent < 0 || percent > 100) throw new RangeError("invalid percentage");
      const t = ensure(track);
      const a = (t.assessment ||= emptyAssessment());
      a.attempts += 1; a.lastPct = percent; a.bestPct = Math.max(a.bestPct, percent); a.passed = a.passed || passed === true; a.lastAt = now();
      t.updatedAt = now();
      return persist();
    },
    assessment(track) { load(); return doc.tracks[track]?.assessment ? { ...doc.tracks[track].assessment } : null; },
    /** Explicit learner reset of one track: clears v1 AND the legacy mirror so the merge cannot resurrect it. */
    reset(track) {
      load();
      delete doc.tracks[track]; delete doc.imported[track];
      const map = LEGACY[track];
      if (map?.list) del(map.list);
      if (map?.current) del(map.current);
      return persist();
    },
    /**
     * Union-merge another v1 document (e.g. rows downloaded from the account). Never removes or lowers anything local:
     * completed = union, quiz.passed = union, attempts/best score = max, passed flags = OR, local resume pointer wins.
     * Returns true if the local record changed.
     */
    mergeSnapshot(remote) {
      load();
      const clean = normalize(remote, totals);
      let changed = false;
      for (const [track, r] of Object.entries(clean.tracks)) {
        const t = ensure(track);
        const before = JSON.stringify(t);
        t.completed = [...new Set([...t.completed, ...r.completed])].sort(byOrdinal);
        for (const [id, q] of Object.entries(r.quiz)) {
          const l = (t.quiz[id] ||= { passed: [], attempts: 0, lastAt: 0 });
          l.passed = [...new Set([...l.passed, ...q.passed])].sort((a, b) => a - b);
          l.attempts = Math.max(l.attempts, q.attempts); l.lastAt = Math.max(l.lastAt, q.lastAt);
        }
        if (r.assessment) {
          const a = (t.assessment ||= emptyAssessment());
          const newer = r.assessment.lastAt > a.lastAt;
          a.attempts = Math.max(a.attempts, r.assessment.attempts); a.bestPct = Math.max(a.bestPct, r.assessment.bestPct);
          a.passed = a.passed || r.assessment.passed;
          if (newer) { a.lastPct = r.assessment.lastPct; a.lastAt = r.assessment.lastAt; }
        }
        if (t.current === null && r.current) t.current = r.current;
        if (JSON.stringify(t) !== before) { changed = true; t.updatedAt = Math.max(t.updatedAt, r.updatedAt, now()); }
      }
      if (changed) { persist(); for (const track of Object.keys(clean.tracks)) mirrorLegacy(track); }
      return changed;
    },
    /** Re-read storage (e.g. after the `storage` event from another tab). */
    reload() { doc = null; return load(); },
  };
}
