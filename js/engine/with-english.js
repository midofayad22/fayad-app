/*
  Injects English text into lesson/track text objects ({ ar } -> { ar, en }) from a separate translation map.
  The Arabic sources stay untouched; English lives in content/<id>/en.js as { "<lessonId>.<path>": "English text" }.
  Path = dot-joined object keys / array indexes from the lesson root, e.g. "html-01.quiz.0.options.2" or "track.groups.0.title".
  A text is any object with a string `ar`. Existing `en` values are never overwritten.
*/
const isText = (n) => n && typeof n === "object" && !Array.isArray(n) && typeof n.ar === "string";

/** @returns {Array<[string, object]>} every text object under `node` with its path */
export function textPaths(node, prefix, out = []) {
  if (Array.isArray(node)) node.forEach((x, i) => textPaths(x, `${prefix}.${i}`, out));
  else if (isText(node)) out.push([prefix, node]);
  else if (node && typeof node === "object") for (const [k, v] of Object.entries(node)) textPaths(v, `${prefix}.${k}`, out);
  return out;
}

/** every text of a track and its lessons, keyed as described above */
export function allTexts(track, lessons) {
  const out = textPaths(track, "track");
  for (const l of lessons) for (const [k, v] of Object.entries(l)) if (k !== "id") textPaths(v, `${l.id}.${k}`, out);
  return out;
}

/* Code fields are plain strings (not { ar, en }) and the views read them directly, so an English override
   ("<lessonId>.example.code" / "<lessonId>.practice.starterCode") is installed as a getter that follows the page language. */
const CODE_FIELDS = [["example", "code"], ["practice", "starterCode"]];
const pageIsEnglish = () => typeof document !== "undefined" && document.documentElement?.getAttribute("data-lang") === "en";

export function withEnglish(track, lessons, EN) {
  for (const [key, node] of allTexts(track, lessons)) if (node.en === undefined && typeof EN[key] === "string" && EN[key].trim()) node.en = EN[key];
  for (const l of lessons) for (const [obj, field] of CODE_FIELDS) {
    const en = EN[`${l.id}.${obj}.${field}`], host = l[obj];
    if (typeof en !== "string" || !en.trim() || !host || typeof host[field] !== "string") continue;
    const ar = host[field];
    Object.defineProperty(host, field, { enumerable: true, configurable: true, get: () => (pageIsEnglish() ? en : ar) });
  }
  return { track, lessons };
}
