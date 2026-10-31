// Writes translation worksheets: scratch/en/<id>.<part>.ar.json = { key: arabicText } for texts that still lack English.
// Usage: node tools/make-en-worksheets.mjs <outDir> <id> [parts=1]
import fs from "node:fs";
import { allTexts } from "../js/engine/with-english.js";
const [, , outDir, id, parts = "1"] = process.argv;
const { track, lessons } = await import(`../content/${id}/index.js`);
const entries = allTexts(track, lessons).filter(([, n]) => n.en === undefined).map(([k, n]) => [k, n.ar]);
fs.mkdirSync(outDir, { recursive: true });
const n = Number(parts), lessonIds = lessons.map((l) => l.id);
const per = Math.ceil(lessonIds.length / n);
for (let p = 0; p < n; p++) {
  const mine = new Set(lessonIds.slice(p * per, (p + 1) * per));
  const part = entries.filter(([k]) => (k.startsWith("track.") ? p === 0 : mine.has(k.split(".")[0])));
  const file = `${outDir}/${id}.${p + 1}.ar.json`;
  fs.writeFileSync(file, JSON.stringify(Object.fromEntries(part), null, 1));
  console.log(file, part.length, "texts,", part.reduce((s, [, v]) => s + v.length, 0), "chars");
}
