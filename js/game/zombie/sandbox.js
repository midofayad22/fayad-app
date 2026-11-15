/*
  Runs the learner's act(s) function safely, then hands the recorded actions back to be replayed by the real engine on the main thread.

  Threat model (see docs/overhaul/zombie-security.md):
    - learner code only ever runs inside js/playground: sandboxed iframe (opaque origin, no allow-same-origin) -> blob Worker, under a CSP with
      connect-src 'none'. It has no DOM of the site, no storage, no cookies, no Supabase session, no network.
    - the only data going in is the level's map (no solution, no user data); the only data coming out is ONE console line, parsed strictly:
      at most MAX_TURNS action strings, each matched against a whitelist.
    - CPU: the frame watchdog terminates the Worker after TIMEOUT_MS. Code length is capped. Console output is capped by the playground.
    - the learner can tamper with the simulation inside the Worker, but the result the player sees (and any reward claim) comes from the
      main-thread replay of the sanitised actions through the real engine; the Worker's own verdict is never trusted.
*/
import { create } from "../../playground/playground.js";
import { MAX_TURNS, replay, validate } from "./engine.js";
import { HELPERS } from "./helpers.js";

export const TIMEOUT_MS = 2500, MAX_CODE = 6000;
const ACTION = /^(wait|reload|heal|melee|shoot|shoot [NESW]|move [NESW]|throw [NESW])$/i;
let engineSrc = null;
async function loadEngine() {
  if (engineSrc) return engineSrc;
  const text = await (await fetch(new URL("./engine.js", import.meta.url))).text();
  engineSrc = text.replace(/^export\s+/gm, "");
  return engineSrc;
}
const strip = (l) => ({ goal: l.goal, turns: l.turns, hp: l.hp, grid: l.grid, start: l.start, ammo: l.ammo, reserve: l.reserve, med: l.med, noise: l.noise, allies: l.allies, zombies: l.zombies, limit: l.limit });

export function workerProgram(level, code, engine) {
  // The learner code is compiled with `new Function` so it sees only the Worker globals, not the engine's locals.
  return `"use strict";(function(){
var __post=self.postMessage.bind(self);
${engine}
var __level=${JSON.stringify(strip(level)).replace(/</g, "\\u003c")};
var __code=${JSON.stringify(HELPERS + "\n" + code + "\n;return typeof act === 'function' ? act : null;").replace(/</g, "\\u003c")};
var __act=null,__err=null,__out=[];
try{__act=new Function(__code)();if(typeof __act!=="function")__err="Define a function named act(s)."}catch(e){__err=(e&&e.name?e.name+": ":"")+(e&&e.message?e.message:String(e))}
if(!__err){
  var __r=run(__level,function(v){var a=__act(v);if(typeof a!=="string")throw new TypeError("act(s) must return a string such as \\"shoot N\\" — it returned "+(a===undefined?"undefined (did you forget return?)":typeof a));__out.push(a.slice(0,24));return a});
  __err=__r.error;
}
console.log("@@ZB"+JSON.stringify({a:__out,e:__err||null}));
})();`;
}

/** parses the single result line coming out of the sandbox; anything unexpected becomes an error */
export function parseResult(lines) {
  const line = lines.find((t) => t.startsWith("@@ZB")); if (!line) return null;
  let d; try { d = JSON.parse(line.slice(4)); } catch { return null; }
  if (!d || !Array.isArray(d.a)) return null;
  const actions = d.a.slice(0, MAX_TURNS).map((a) => {
    const t = typeof a === "string" ? a.trim() : "";
    // anything that is not exactly an action becomes "!text": the engine treats the unknown verb as an invalid action and the UI can still quote it
    return ACTION.test(t) ? t : "!" + t.replace(/[^\w "'.\-+]/g, "_").slice(0, 22);
  });
  const error = typeof d.e === "string" ? d.e.slice(0, 300) : null;
  return { actions, error };
}

/** Runs learner code; resolves { res, error, timeout } where res is the engine replay (the only thing the UI trusts). */
export async function runLearner(level, code) {
  const v = validate(level, code);
  if (!v.ok) return { res: null, error: v.reason === "long" ? "Code is too long (max " + MAX_CODE + " characters)." : "Write some code first.", timeout: false };
  const engine = await loadEngine();
  return new Promise((resolve) => {
    const host = document.createElement("div"); host.hidden = true; document.body.appendChild(host);
    const lines = []; let errorMsg = null, finished = false, timeout = false;
    const done = () => {
      if (finished) return; finished = true; pg.destroy(); host.remove();
      const parsed = parseResult(lines);
      if (timeout) return resolve({ res: null, error: "Your code took too long (an endless loop?). Execution was stopped.", timeout: true });
      if (!parsed) return resolve({ res: null, error: errorMsg || "The code produced no result.", timeout: false });
      const res = replay(level, parsed.actions, parsed.error);
      resolve({ res, error: parsed.error, timeout: false });
    };
    const pg = create(host, { runtime: "js", timeoutMs: TIMEOUT_MS, title: "Zombie code runner",
      onConsole: (e) => lines.push(e.text), onError: (e) => { errorMsg = e.message; },
      onStatus: (s) => { if (s === "timeout") { timeout = true; done(); } else if (s === "done" || (s === "error" && !lines.length && false)) done(); } });
    pg.run({ js: workerProgram(level, code, engine) });
  });
}
