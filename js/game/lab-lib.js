/*
  Shared helpers for the "lab" games (Zombie, Flex Quest, ...): missions are challenge-format objects (see challenge-lib.js) plus
    teach: { what, does, why, how, expect, mistake }  (each {ar,en})  — the six-question mini lesson shown before the editor
    alts?: [{css?,html?,js?}]                         — other valid solutions (tests prove they pass too)
  The checks are authored data and run inside the sandboxed preview. After they ran, the preview gets class fy-win / fy-lose so the scene's
  own (authored) CSS can play the consequence (zombies retreat, the gate closes...).
*/
import { parseChecks } from "./challenge-lib.js";
export { parseChecks };
export const BASE_POINTS = { beginner: 10, intermediate: 15, advanced: 20, expert: 30 };
export function labScript(ch) {
  const calls = ch.checks.map((c, i) => `__T(${i},function(){${c.test}});`).join("");
  const win = ch.onWin ? `if(__R.every(Boolean)){${ch.onWin}}` : "";
  return `\n;var __R=[];function __T(i,f){var ok=false;try{ok=!!f()}catch(e){}__R[i]=ok;console.log('@@FY '+(ok?1:0)+' '+i)}` +
    `window.addEventListener('load',function(){${calls}${win}document.body.classList.add(__R.every(Boolean)?'fy-win':'fy-lose')});`;
}
export function labFiles(ch, learner) {
  const f = { ...ch.files, ...learner };
  const out = { html: f.html || "", css: f.css || "", js: (f.js || "") + labScript(ch) };
  if (ch.head) out.head = ch.head;
  return out;
}
