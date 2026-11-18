/* Pure helpers of the real-JavaScript mode (no DOM, no imports): hero API list, construct locks, code size, blocks→JavaScript. */
export const API = [
  { n: "forward()", ar: "تقدّم خانة واحدة", en: "move one cell forward" },
  { n: "turnLeft()", ar: "استدر يسارًا", en: "turn left" },
  { n: "turnRight()", ar: "استدر يمينًا", en: "turn right" },
  { n: "wallAhead()", ar: "true إن كان أمامك عائق", en: "true if something blocks the way" },
  { n: "openAhead()", ar: "true إن كان الطريق أمامك مفتوحًا", en: "true if the way ahead is open" },
  { n: "openLeft() / openRight()", ar: "هل الطريق مفتوح يسارًا / يمينًا؟", en: "is the way left / right open?" },
  { n: "dangerAhead()", ar: "true إن كان أمامك ماء أو أشواك", en: "true if water or spikes are ahead" },
  { n: "crateAhead()", ar: "true إن كان أمامك صندوق", en: "true if a crate is ahead" },
  { n: "atGoal()", ar: "هل وصلت إلى العلم؟", en: "have you reached the flag?" },
];

/** Which language constructs a level's world allows (mirrors its block palette). */
export function allowed(level) {
  const b = level.blocks;
  return { loops: b.includes("repeat"), whiles: b.includes("until"), ifs: b.includes("if"), fns: b.includes("call") };
}
const strip = (src) => src.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/.*$/gm, " ").replace(/(["'`])(?:\\.|(?!\1).)*\1/g, '""');
/** Returns null when fine, otherwise { code, word } for the first construct this world has not unlocked yet. */
export function lockedUse(level, src) {
  const a = allowed(level), s = strip(src);
  if (!a.loops && /\bfor\b/.test(s)) return { code: "for", word: "for" };
  if (!a.whiles && /\b(while|do)\b/.test(s)) return { code: "while", word: "while" };
  if (!a.ifs && (/\b(if|else|switch)\b/.test(s) || /\?[^?.]/.test(s) && /:/.test(s))) return { code: "if", word: "if" };
  if (!a.fns && (/\bfunction\b/.test(s) || /=>/.test(s))) return { code: "function", word: "function" };
  if (/\b(import|eval|fetch|XMLHttpRequest|document|window|Function)\b/.test(s)) return { code: "api", word: "window / document" };
  return null;
}
/** Code size for the star rule: every API call, loop, condition and function counts one (like blocks). */
export function codeSize(src) {
  const s = strip(src);
  const calls = (s.match(/\b(forward|turnLeft|turnRight)\s*\(/g) || []).length;
  const ctl = (s.match(/\b(for|while|if)\b/g) || []).length;
  const own = [...s.matchAll(/function\s+([A-Za-z_$][\w$]*)/g)].map((m) => m[1]);
  const userCalls = own.reduce((a, n) => a + (s.match(new RegExp("\\b" + n + "\\s*\\(", "g")) || []).length - 1, 0);
  return calls + ctl + userCalls;
}

/** Turn a block program into the equivalent JavaScript (shown to the learner when they switch from blocks). */
export function toJS(p) {
  const COND = { wallAhead: "wallAhead()", openAhead: "openAhead()", openLeft: "openLeft()", openRight: "openRight()", dangerAhead: "dangerAhead()", crateAhead: "crateAhead()" };
  const ind = (n) => "  ".repeat(n);
  const lst = (a, d) => (a || []).map((b) => one(b, d)).join("");
  const one = (b, d) => {
    if (b.op === "F") return ind(d) + "forward();\n";
    if (b.op === "L") return ind(d) + "turnLeft();\n";
    if (b.op === "R") return ind(d) + "turnRight();\n";
    if (b.op === "call") return ind(d) + "step();\n";
    if (b.op === "repeat") return ind(d) + `for (let i = 0; i < ${b.n}; i++) {\n${lst(b.body, d + 1)}${ind(d)}}\n`;
    if (b.op === "until") return ind(d) + `while (!atGoal()) {\n${lst(b.body, d + 1)}${ind(d)}}\n`;
    if (b.op === "if") return ind(d) + `if (${COND[b.cond] || "wallAhead()"}) {\n${lst(b.then, d + 1)}${ind(d)}}` + (b.else && b.else.length ? ` else {\n${lst(b.else, d + 1)}${ind(d)}}` : "") + "\n";
    return "";
  };
  const fn = p.fn && p.fn.length ? `function step() {\n${lst(p.fn, 1)}}\n\n` : "";
  return fn + lst(p.main, 0);
}

