/*
  Challenge format (authored data, never learner input):
    { id, level: "beginner"|"intermediate"|"advanced"|"expert", lesson?: number (ordinal of the related lesson),
      title:{ar,en}, goal:{ar,en}, brief:{ar,en},
      runtime: "html" | "js",                       // html: live preview; js: console only
      edit: ["html","css","js"],                    // which tabs the learner can edit
      files: { html, css, js },                     // starter code (must FAIL the checks)
      head?: "<script src=...>",                    // trusted library tags (vendored)
      checks: [{ ar, en, test: "return ..." }],     // function bodies, run INSIDE the sandbox after the learner's code
      hints: [{ar,en}, ...], explain:{ar,en},
      solution: { html?, css?, js? } }              // used by tests to prove every challenge is solvable
  Checks run inside the sandboxed frame/worker; results come back as console lines "@@FY <0|1> <index>".
*/
export const LEVELS = ["beginner", "intermediate", "advanced", "expert"];
export const BASE_POINTS = { beginner: 10, intermediate: 15, advanced: 20, expert: 30 };

// a check may return a Promise (resolved through microtasks only: timers would outlive the run)
const PRELUDE = "function __FYT(i,f){function L(ok){console.log('@@FY '+(ok?1:0)+' '+i)}try{var r=f();if(r&&typeof r.then==='function'){r.then(function(v){L(!!v)},function(){L(false)})}else L(!!r)}catch(e){L(false)}}";

/** The JS that is appended to the learner's JS so the checks run in the same scope. */
export function checkScript(ch) {
  const calls = ch.checks.map((c, i) => `__FYT(${i},function(){${c.test}});`).join("");
  return ch.runtime === "js"
    ? `\n;${PRELUDE}${calls}`
    : `\n;${PRELUDE}window.addEventListener('load',function(){${calls}});`;
}
/** Files for the runner: learner files + checks. */
export function filesFor(ch, learner) {
  const f = { ...ch.files, ...learner };
  const out = { html: f.html || "", css: f.css || "", js: (f.js || "") + checkScript(ch) };
  if (ch.head) out.head = ch.head;
  return out;
}
export function parseChecks(lines, n) {
  const r = new Array(n).fill(null);
  for (const l of lines) { const m = /^@@FY ([01]) (\d+)$/.exec(l); if (m && +m[2] < n) r[+m[2]] = m[1] === "1"; }
  return r;
}
