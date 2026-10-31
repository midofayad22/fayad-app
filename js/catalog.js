/*
  FAYAD course catalog + read-only progress reader.

  Single source of truth for "which tracks exist, where they live, and how each one stores progress today".
  Each track still owns its own localStorage format (the shared lesson engine / Supabase persistence arrive in
  later milestones); this module only READS those formats, defensively, and never writes to them.

  FAYAD.catalog.tracks      ordered list of tracks
  FAYAD.catalog.progress()  -> { [id]: { total, done, current, started, percent } }
  FAYAD.catalog.lastTrack() -> id of the track page most recently opened on this device (or null)
*/
(function () {
  window.FAYAD = window.FAYAD || {};

  // en: how much of the LESSON CONTENT (titles, explanations, quiz) exists in English: "full" | "partial" | "none".
  // tests/language-coverage.test.mjs checks these flags against content/<id>/index.js, so they cannot overstate.
  // kind "list": a JSON array of completed lesson ids.  current: 0-based index of the last lesson opened.
  var tracks = [
    { id: "com", group: "fundamentals", en: "none", path: "/fundamentals/computer-basics/com.html", total: 20, list: "fayad-computer-progress" },
    { id: "prg", group: "fundamentals", en: "none", path: "/fundamentals/programming-basics/prg.html", total: 20, list: "fayad-programming-fundamentals-progress" },
    { id: "html", group: "web", en: "none", path: "/html-learning/html-learning.html", total: 30, list: "fayad-html-progress" },
    { id: "css", group: "web", en: "full", path: "/css-learning/css-learning.html", total: 30, current: "fayad-css-current-lesson" },
    {
      id: "js", group: "web", en: "none", path: "/javascript-learning/javascript-learning.html", total: 25,
      list: "fayad-js-completed-lessons", current: "fayad-js-current-lesson",
    },
    {
      id: "ajs", group: "web", en: "none", path: "/advanced-javascript/advanced-javascript.html", total: 22,
      list: "fayad-ajs-completed-lessons", current: "fayad-ajs-current-lesson",
    },
    {
      id: "bs", group: "web", en: "none", path: "/bootstrap-learning/bootstrap-learning.html", total: 20,
      list: "fayad-bs-completed-lessons", current: "fayad-bs-current-lesson",
    },
    {
      id: "tw", group: "web", en: "none", path: "/tailwind-learning/tailwind-learning.html", total: 20,
      list: "fayad-tw-completed-lessons", current: "fayad-tw-current-lesson",
    },
    {
      id: "react", group: "frameworks", en: "none", path: "/react-learning/react-learning.html", total: 30,
      list: "fayad-react-completed-lessons", current: "fayad-react-current-lesson",
    },
    { id: "vue", group: "frameworks", en: "none", path: "/vue-learning/vue-learning.html", total: 22, list: "fayad-vue-learning-progress" },
    { id: "angular", group: "frameworks", en: "full", path: "/angular-learning/angular-learning.html", total: 32, current: "fayad-angular-current-lesson" },
  ];

  function read(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }

  function readList(key, total) {
    var raw = read(key);
    if (!raw) return [];
    try {
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      var seen = {};
      parsed.forEach(function (v) {
        var n = Number(v);
        if (Number.isInteger(n) && n >= 0 && n <= total) seen[n] = true;
      });
      return Object.keys(seen);
    } catch (e) {
      return [];
    }
  }

  function readCurrent(key, total) {
    if (!key) return null;
    var raw = read(key);
    if (raw === null || raw === "") return null;
    var n = Number(raw);
    return Number.isInteger(n) && n >= 0 && n < total ? n : null;
  }

  function progress() {
    var out = {};
    tracks.forEach(function (t) {
      var done = t.list ? Math.min(readList(t.list, t.total).length, t.total) : null;
      var current = readCurrent(t.current, t.total);
      out[t.id] = {
        total: t.total,
        done: done,
        current: current,
        started: (done !== null && done > 0) || current !== null,
        percent: done !== null ? Math.round((done / t.total) * 100) : null,
      };
    });
    return out;
  }

  var LAST_KEY = "fayad-last-track";

  function lastTrack() {
    var raw = read(LAST_KEY);
    if (!raw) return null;
    try {
      var v = JSON.parse(raw);
      return v && typeof v.id === "string" && tracks.some(function (t) { return t.id === v.id; }) ? v.id : null;
    } catch (e) {
      return null;
    }
  }

  function markVisited(id) {
    if (!tracks.some(function (t) { return t.id === id; })) return;
    try { window.localStorage.setItem(LAST_KEY, JSON.stringify({ id: id, ts: Date.now() })); } catch (e) {}
  }

  window.FAYAD.catalog = {
    tracks: tracks,
    progress: progress,
    lastTrack: lastTrack,
    markVisited: markVisited,
    totalLessons: function () { return tracks.reduce(function (s, t) { return s + t.total; }, 0); },
  };
})();
