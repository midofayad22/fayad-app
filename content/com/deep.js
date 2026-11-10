// Computer Basics com-01 … com-19: deep documentation-style bodies, authored once as AR/EN pairs (content/_doc.js).
// Titles, ids, key/practice/quiz stay in index.js/en.js; only the lesson BODY is replaced (ids and routes unchanged).
import { render } from "../_doc.js";
import { defs as a } from "./deep-a.js";
import { defs as b } from "./deep-b.js";
import { defs as c } from "./deep-c.js";
import { defs as d } from "./deep-d.js";

export const deepDefs = [...a, ...b, ...c, ...d];
export function applyDeepBodies(lessons, EN) {
  for (const def of deepDefs) {
    const l = lessons.find((x) => x.id === def.id);
    if (!l) throw new Error("deep body for unknown lesson " + def.id);
    l.body = { ar: render(def.body, "ar") };
    EN[`${def.id}.body`] = render(def.body, "en");
  }
}
