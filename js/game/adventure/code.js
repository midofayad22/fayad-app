/*
  FAYAD Grand Adventure — real JavaScript mode.
  The learner writes ordinary JavaScript (for / while / if / function …) against a tiny hero API. It runs in the sandboxed playground iframe
  (opaque origin, loop guard, timeout) next to a private copy of the pure engine that answers the sensors (wallAhead() …).
  The sandbox reports ONLY the action string it asked for; the host replays it with the real engine (runActions), so the outcome is never trusted.
  The same level rules apply as for blocks: a world without "repeat" blocks cannot use for-loops, and so on (see `allowed`).
*/
import { create } from "/js/playground/playground.js";
import { API, allowed, lockedUse, codeSize, toJS } from "./code-lang.js";

let ENGINE = null;
async function engineSource() {
  if (ENGINE) return ENGINE;
  const t = await (await fetch("/js/game/adventure/engine.js")).text();
  ENGINE = t.replace(/^export\s+(const|function|async function)\s/gm, "$1 ").replace(/^export\s*\{[^}]*\};?/gm, "");
  return ENGINE;
}

export { API, allowed, lockedUse, codeSize, toJS };

const bootHead = (engine, grid) => `<script>
(function () {
${engine}
  var __g = parseGrid(${JSON.stringify(grid)}), __s = initState(__g), __a = "", __stop = { __adv: 1 };
  function __do(c) { if (__s.dead || __a.length >= MAX_STEPS) throw __stop; act(__g, __s, c); __a += c; if (__s.dead) throw __stop; }
  window.forward = function () { __do("F"); }; window.turnLeft = function () { __do("L"); }; window.turnRight = function () { __do("R"); };
  window.wallAhead = function () { return sense(__g, __s, "wallAhead"); }; window.openAhead = function () { return sense(__g, __s, "openAhead"); };
  window.openLeft = function () { return sense(__g, __s, "openLeft"); }; window.openRight = function () { return sense(__g, __s, "openRight"); };
  window.dangerAhead = function () { return sense(__g, __s, "dangerAhead"); }; window.crateAhead = function () { return sense(__g, __s, "crateAhead"); };
  window.atGoal = function () { return atGoal(__g, __s); };
  window.addEventListener("error", function (e) { if (e && e.error === __stop) e.preventDefault(); });
  window.addEventListener("load", function () { console.log("@@RUN " + JSON.stringify({ a: __a })); });
})();
<\/script>`;

/** Runs the learner's code. Resolves { actions, error } — never rejects. */
export async function runCode(level, source, { timeoutMs = 4000 } = {}) {
  const engine = await engineSource();
  return await new Promise((resolve) => {
    const host = document.createElement("div"); host.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none"; document.body.appendChild(host);
    let actions = null, error = null, done = false;
    const finish = () => { if (done) return; done = true; setTimeout(() => { try { r.destroy(); } catch {} host.remove(); resolve({ actions: actions ?? "", error }); }, 30); };
    const r = create(host, { runtime: "html", format: "text", timeoutMs, loopBudget: 2000000,
      onConsole: (e) => { if (typeof e.text === "string" && e.text.startsWith("@@RUN ")) { try { actions = JSON.parse(e.text.slice(6)).a; } catch {} finish(); } },
      onError: (e) => { if (!error && !/__adv|\[object Object\]/.test(String(e.message))) error = String(e.message || e); },
      onStatus: (s) => { if (s && (s.state === "timeout" || s === "timeout")) { error = error || "timeout"; finish(); } } });
    r.run({ head: bootHead(engine, level.grid), html: "", css: "", js: source });
    setTimeout(() => { if (!done) { error = error || "timeout"; finish(); } }, timeoutMs + 1500);
  });
}
