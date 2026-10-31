// Usage: node tools/check-en.mjs <x.ar.json> <x.en.json>   -> lists every problem (exit 1 if any)
import fs from "node:fs";
import { checkWorksheet } from "./lib/check-en.js";
const [, , a, e] = process.argv;
const ar = JSON.parse(fs.readFileSync(a, "utf8"));
let en; try { en = JSON.parse(fs.readFileSync(e, "utf8")); } catch (err) { console.log("cannot read", e, err.message); process.exit(1); }
const problems = checkWorksheet(ar, en);
console.log(problems.length ? problems.slice(0, 60).join("\n") + (problems.length > 60 ? `\n… ${problems.length - 60} more` : "") : `OK: ${Object.keys(ar).length} texts`);
console.log(`${Object.keys(en).length}/${Object.keys(ar).length} keys translated, ${problems.length} problems`);
process.exit(problems.length ? 1 : 0);
