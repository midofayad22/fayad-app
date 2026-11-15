/* One-line strategies that must NOT clear a level (used by the generator to reject trivial boards and by tests/adventure-diversity). */
import { run } from "../../js/game/adventure/engine.js";
const F = { op: "F" }, L = { op: "L" }, R = { op: "R" };
const rep = (n, ...body) => ({ op: "repeat", n, body });
const until = (...body) => ({ op: "until", body });
const ifc = (cond, then, els = []) => ({ op: "if", cond, then, else: els });
export const NAIVE = {
  followLeft: { main: [until(ifc("wallAhead", [ifc("openLeft", [L], [R])], [F]))] },
  followRight: { main: [until(ifc("wallAhead", [ifc("openRight", [R], [L])], [F]))] },
  forward: { main: [until(F)] },
  spiral: { main: [until(ifc("wallAhead", [R], [F]))] },
  spiralLeft: { main: [until(ifc("wallAhead", [L], [F]))] },
  square: { main: [rep(9, rep(4, F), R)] },
  zigzag: { main: [rep(9, F, L, F, R)] },
  zagzig: { main: [rep(9, F, R, F, L)] },
  sensor: { main: [until(ifc("dangerAhead", [R], [ifc("wallAhead", [L], [F])]))] },
};
/** names of the naive strategies that clear this grid (followers are allowed to in world 4) */
export const trivial = (grid, world) => Object.entries(NAIVE).filter(([n]) => !(world === 4 && (n === "followLeft" || n === "followRight"))).filter(([, p]) => run({ grid }, p).ok).map(([n]) => n);
