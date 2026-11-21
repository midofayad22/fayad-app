/* CSS specificity (a,b,c) of a selector list — the highest part wins, like the cascade does for the part that matches. Pure, no DOM. */
const splitTop = (s) => { const out = []; let d = 0, cur = ""; for (const ch of s) { if (ch === "(" || ch === "[") d++; else if (ch === ")" || ch === "]") d--; if (ch === "," && d === 0) { out.push(cur); cur = ""; } else cur += ch; } out.push(cur); return out.map((x) => x.trim()).filter(Boolean); };
const max = (x, y) => (x[0] !== y[0] ? (x[0] > y[0] ? x : y) : x[1] !== y[1] ? (x[1] > y[1] ? x : y) : x[2] >= y[2] ? x : y);
const list = (s) => splitTop(s).map(one).reduce(max, [0, 0, 0]);
function one(sel) {
  let a = 0, b = 0, c = 0, s = sel.replace(/"[^"]*"|'[^']*'/g, '""');
  const add = (r) => { a += r[0]; b += r[1]; c += r[2]; };
  s = s.replace(/:(is|not|has|matches|where)\(((?:[^()]|\((?:[^()]|\([^()]*\))*\))*)\)/gi, (m, fn, args) => { if (fn.toLowerCase() !== "where") add(list(args.replace(/^\s*>\s*/, ""))); return ""; });
  s = s.replace(/:nth-(?:last-)?child\(([^)]*)\)/gi, (m, arg) => { b++; const o = /\bof\s+(.*)$/i.exec(arg); if (o) add(list(o[1])); return ""; });
  s = s.replace(/:nth-(?:last-)?of-type\([^)]*\)/gi, () => { b++; return ""; });
  s = s.replace(/::[\w-]+/g, () => { c++; return ""; }).replace(/:(before|after|first-line|first-letter)\b/gi, () => { c++; return ""; });
  s = s.replace(/#[\w-]+/g, () => { a++; return ""; }).replace(/\[[^\]]*\]/g, () => { b++; return ""; }).replace(/\.[\w-]+/g, () => { b++; return ""; }).replace(/:[\w-]+(\([^)]*\))?/g, () => { b++; return ""; });
  s = s.replace(/[>+~*]/g, " "); c += (s.match(/[a-zA-Z][\w-]*/g) || []).length;
  return [a, b, c];
}
export const specificity = list;
export const specPerPart = (sel) => splitTop(sel).map((p) => ({ part: p, spec: one(p) }));
export const splitSelector = splitTop;
