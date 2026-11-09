// Computer Basics — Operating Systems in depth (com-21 … com-30): authored as AR/EN pairs, built once.
import { build } from "../_doc.js";
import { defs as a } from "./os-a.js";
import { defs as b } from "./os-b.js";

export const { lessons: osLessons, EN: osEN } = build([...a, ...b]);
