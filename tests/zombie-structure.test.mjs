// Static checks of the 15 survival missions: bilingual text, six lesson fields, three hints, solutions only edit editable files.
import { test } from "node:test";
import assert from "node:assert/strict";
const { MISSIONS, LOCS } = await import("../js/game/zombie/missions.js");
const bi = (v) => v && typeof v.ar === "string" && v.ar.length > 3 && typeof v.en === "string" && v.en.length > 3;
test("15 missions in 5 locations with unique ids", () => {
  assert.equal(MISSIONS.length, 15); assert.equal(new Set(MISSIONS.map((m) => m.id)).size, 15);
  assert.equal(new Set(MISSIONS.map((m) => m.loc)).size, 5); assert.ok(Object.keys(LOCS).length >= 5);
});
test("every mission is complete and bilingual", () => {
  for (const m of MISSIONS) {
    for (const k of ["title", "goal", "brief", "explain"]) assert.ok(bi(m[k]), `${m.id}.${k}`);
    for (const k of ["what", "does", "why", "how", "expect", "mistake"]) assert.ok(bi(m.teach[k]), `${m.id}.teach.${k}`);
    assert.equal(m.hints.length, 3, m.id); m.hints.forEach((h, i) => assert.ok(bi(h), `${m.id}.hint${i}`));
    assert.ok(m.waves.length >= 1 && m.ammo >= 0 && m.shelterHp > 0 && m.time > 0, m.id);
    for (const e of m.edit) assert.ok(typeof m.solution[e] === "string", `${m.id} solution.${e}`);
    for (const a of m.alts || []) for (const k of Object.keys(a)) assert.ok(m.edit.includes(k), `${m.id} alt edits ${k}`);
  }
});
test("zombie types are varied, and barrel/medkit/crawler appear", () => {
  const types = new Set(MISSIONS.flatMap((m) => m.waves.map((w) => w.type)));
  for (const t of ["walker", "runner", "crawler", "brute", "spitter"]) assert.ok(types.has(t), t);
  const html = MISSIONS.map((m) => m.files.html || "").join("\n"); assert.ok(html.includes('class="barrel"') && html.includes('class="medkit"'));
});
