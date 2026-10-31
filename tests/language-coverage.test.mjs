// The "en" coverage flags in js/catalog.js (shown on the About page and course lists) must match the real content: no overstating.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const src = fs.readFileSync("js/catalog.js", "utf8");
const sandbox = { window: { localStorage: null } }; vm.createContext(sandbox); vm.runInContext(src, sandbox);
const tracks = sandbox.window.FAYAD.catalog.tracks;

function texts(node, out = []) {
  if (Array.isArray(node)) node.forEach((x) => texts(x, out));
  else if (node && typeof node === "object") {
    if (typeof node.ar === "string") out.push(node);
    else for (const v of Object.values(node)) texts(v, out);
  }
  return out;
}
async function measure(id) {
  const { lessons } = await import(`../content/${id}/index.js`);
  const all = lessons.flatMap((l) => texts(l)); // every {ar, en?} text of every lesson (titles, bodies, explanations, quiz)
  const en = all.filter((t) => typeof t.en === "string" && t.en.trim()).length;
  return { total: all.length, en };
}

test("every track declares a valid English-coverage flag", () => {
  for (const t of tracks) assert.ok(["full", "partial", "none"].includes(t.en), `${t.id}: en flag`);
});

test("English flags match the real lesson content", async () => {
  for (const t of tracks) {
    if (!fs.existsSync(`content/${t.id}/index.js`)) continue;
    const m = await measure(t.id);
    const expected = m.en === 0 ? "none" : m.en === m.total ? "full" : "partial";
    assert.equal(t.en, expected, `${t.id}: flag "${t.en}" but content has ${m.en}/${m.total} English texts`);
  }
});
