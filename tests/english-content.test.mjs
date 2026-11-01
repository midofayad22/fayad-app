// English lesson content: every text of every translated course has an English version that keeps the structure of the Arabic source.
import { test } from "node:test";
import assert from "node:assert/strict";
import { allTexts } from "../js/engine/with-english.js";
import { checkPair } from "../tools/lib/check-en.js";

for (const id of ["com", "prg", "html", "css", "js", "ajs", "bs", "tw", "react", "vue", "angular"]) {
  test(`${id}: all text exists in English and keeps tags, code and expressions`, async () => {
    const { track, lessons } = await import(`../content/${id}/index.js`);
    const texts = allTexts(track, lessons);
    assert.ok(texts.length > 50);
    const problems = [];
    for (const [key, node] of texts) {
      if (node.en === undefined) { problems.push(`${key}: no English`); continue; }
      if (node.en === node.ar && /[\u0600-\u06ff]/.test(node.ar.replace(/<(code|pre)\b[^>]*>[\s\S]*?<\/\1>/gi, ""))) problems.push(`${key}: identical to Arabic`);
      for (const p of checkPair(node.ar, node.en)) problems.push(`${key}: ${p}`);
    }
    assert.deepEqual(problems.slice(0, 10), []);
  });
}
