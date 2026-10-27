/*
  Loop guard: inserts a call to a guard function at the start of every BRACED loop body so that runaway loops in
  learner code are stopped with an error instead of freezing the tab.

    for (...) {  ->  for (...) { __g();
    while (...) { ->  while (...) { __g();
    do {          ->  do { __g();

  Why this exists: a sandboxed iframe cannot be pre-empted (it shares the page's process in most browsers), so code
  that needs the DOM cannot run in a killable Worker. The guard turns "infinite loop" into a catchable error.

  It is a tokenizer-based source transform, deliberately conservative:
    - strings, template literals (incl. ${} nesting), comments and regex literals are skipped, never edited
    - loops with a non-braced body (`for (;;) step();`) are left alone (documented limitation)
    - if anything looks unbalanced the ORIGINAL source is returned unchanged
  It protects against loops only, not against other long computation or deep recursion.
*/

const isIdStart = (c) => /[A-Za-z_$]/.test(c);
const isIdPart = (c) => /[A-Za-z0-9_$]/.test(c);

/** Skip a string / comment / template starting at i. Returns the index after it, or -1 if not one. */
function skipLiteral(s, i) {
  const c = s[i];
  if (c === "'" || c === '"') {
    let j = i + 1;
    while (j < s.length && s[j] !== c) { if (s[j] === "\\") j++; if (s[j] === "\n") return -2; j++; }
    return j < s.length ? j + 1 : -2;
  }
  if (c === "`") return skipTemplate(s, i);
  if (c === "/" && s[i + 1] === "/") { const j = s.indexOf("\n", i); return j === -1 ? s.length : j; }
  if (c === "/" && s[i + 1] === "*") { const j = s.indexOf("*/", i + 2); return j === -1 ? -2 : j + 2; }
  return -1;
}

function skipTemplate(s, i) {
  let j = i + 1;
  while (j < s.length) {
    if (s[j] === "\\") { j += 2; continue; }
    if (s[j] === "`") return j + 1;
    if (s[j] === "$" && s[j + 1] === "{") {
      let depth = 1; j += 2;
      while (j < s.length && depth > 0) {
        const k = skipLiteral(s, j);
        if (k === -2) return -2;
        if (k > -1) { j = k; continue; }
        if (s[j] === "{") depth++;
        else if (s[j] === "}") depth--;
        j++;
      }
      if (depth > 0) return -2;
      continue;
    }
    j++;
  }
  return -2;
}

/** Heuristic: does a regex literal start at i, given the previous significant character? */
function regexStartsAt(s, i, prevSig) {
  if (s[i] !== "/" || s[i + 1] === "/" || s[i + 1] === "*") return false;
  return !prevSig || /[(,=:[!&|?{};+\-*%<>~^]/.test(prevSig) || prevSig === "\n";
}

function skipRegex(s, i) {
  let j = i + 1, inClass = false;
  while (j < s.length && s[j] !== "\n") {
    if (s[j] === "\\") { j += 2; continue; }
    if (s[j] === "[") inClass = true;
    else if (s[j] === "]") inClass = false;
    else if (s[j] === "/" && !inClass) { j++; while (j < s.length && isIdPart(s[j])) j++; return j; }
    j++;
  }
  return -2;
}

/** From the "(" at i, return the index just after its matching ")" or -2. */
function skipParens(s, i) {
  let depth = 0, j = i, prev = "(";
  while (j < s.length) {
    const k = skipLiteral(s, j);
    if (k === -2) return -2;
    if (k > -1) { j = k; prev = "a"; continue; }
    if (regexStartsAt(s, j, prev)) { const r = skipRegex(s, j); if (r === -2) return -2; j = r; prev = "a"; continue; }
    const c = s[j];
    if (c === "(") depth++;
    else if (c === ")") { depth--; if (depth === 0) return j + 1; }
    if (!/\s/.test(c)) prev = c;
    j++;
  }
  return -2;
}

function skipSpaceAndComments(s, i) {
  for (;;) {
    while (i < s.length && /\s/.test(s[i])) i++;
    if (s[i] === "/" && s[i + 1] === "/") { const j = s.indexOf("\n", i); i = j === -1 ? s.length : j; continue; }
    if (s[i] === "/" && s[i + 1] === "*") { const j = s.indexOf("*/", i + 2); if (j === -1) return -2; i = j + 2; continue; }
    return i;
  }
}

/** @returns {{ code: string, guards: number }} */
export function guardLoops(source, guardName = "__g") {
  const s = String(source);
  const inserts = [];
  let i = 0, prev = "";
  const callText = `${guardName}();`;
  while (i < s.length) {
    const lit = skipLiteral(s, i);
    if (lit === -2) return { code: s, guards: 0 };
    if (lit > -1) { i = lit; prev = "a"; continue; }
    if (regexStartsAt(s, i, prev)) { const r = skipRegex(s, i); if (r === -2) return { code: s, guards: 0 }; i = r; prev = "a"; continue; }
    const c = s[i];
    if (isIdStart(c)) {
      let j = i + 1;
      while (j < s.length && isIdPart(s[j])) j++;
      const word = s.slice(i, j);
      const afterDot = prev === ".";
      if (!afterDot && (word === "for" || word === "while" || word === "do")) {
        let k = skipSpaceAndComments(s, j);
        if (k === -2) return { code: s, guards: 0 };
        if (word !== "do") {
          if (word === "for" && s.startsWith("await", k) && !isIdPart(s[k + 5] || " ")) k = skipSpaceAndComments(s, k + 5);
          if (s[k] === "(") {
            const end = skipParens(s, k);
            if (end === -2) return { code: s, guards: 0 };
            const b = skipSpaceAndComments(s, end);
            if (b === -2) return { code: s, guards: 0 };
            if (s[b] === "{") inserts.push(b + 1);
            // else: braceless body or the `while (cond);` tail of a do-while: left alone
          }
        } else if (s[k] === "{") {
          inserts.push(k + 1);
        }
      }
      i = j; prev = "a";
      continue;
    }
    if (!/\s/.test(c)) prev = c;
    i++;
  }
  if (!inserts.length) return { code: s, guards: 0 };
  let out = "", last = 0;
  for (const at of [...new Set(inserts)].sort((a, b) => a - b)) { out += s.slice(last, at) + callText; last = at; }
  out += s.slice(last);
  return { code: out, guards: inserts.length };
}
