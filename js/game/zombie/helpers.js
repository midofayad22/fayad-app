/* Small helper functions the learner can call inside act(s). Shown in the in-game reference; inlined into the sandbox. */
export const HELPERS = [
  "function dist(a, b) { return Math.abs(a.x - b.x) + Math.abs(a.y - b.y); }",
  "function dirTo(a, b) { var dx = b.x - a.x, dy = b.y - a.y; if (Math.abs(dx) >= Math.abs(dy)) return dx > 0 ? 'E' : 'W'; return dy > 0 ? 'S' : 'N'; }",
  "function opposite(d) { return { N: 'S', S: 'N', E: 'W', W: 'E' }[d]; }",
  "function sameLine(a, b) { return a.x === b.x || a.y === b.y; }",
].join("\n");
export const HELPER_DOCS = [
  ["dist(a, b)", { ar: "المسافة بين نقطتين (عدد الخطوات).", en: "Steps between two points." }],
  ["dirTo(a, b)", { ar: "اتجاه الحركة من a نحو b: \"N\" أو \"E\" أو \"S\" أو \"W\".", en: "The direction from a toward b: \"N\", \"E\", \"S\" or \"W\"." }],
  ["opposite(d)", { ar: "الاتجاه المعاكس لـ d.", en: "The opposite of direction d." }],
  ["sameLine(a, b)", { ar: "هل النقطتان في صف أو عمود واحد؟", en: "Are the two points in the same row or column?" }],
];
/** compiles learner code into act(s) (tests and the replay checker only; the game itself uses the sandbox) */
export function compile(code) { return new Function(HELPERS + "\n" + code + "\n;return typeof act === 'function' ? act : null;")(); }
