import { test } from "node:test";
import assert from "node:assert/strict";
import { angularPreview, reactPreview } from "../js/engine/sims.js";
import { createProgress } from "../js/engine/progress.js";

const labels = { writeCode: "w", nothingPreview: "n", angularPreview: "AP", codeLoaded: "loaded", detected: "D:", component: "Component", signals: "Signals", interpolation: "Interp", standalone: "Standalone" };

test("angularPreview: empty code, known text, interpolation resolution, features, no evaluation", () => {
  assert.deepEqual(angularPreview("  ", { labels }), { kind: "text", text: "w", output: "n" });
  assert.equal(angularPreview("class A {}", { labels }).output, "loaded");
  const r = angularPreview("@Component({standalone: true, template: 'x'}) class A { n = signal(1); }", { labels });
  assert.equal(r.text, "AP"); assert.equal(r.output, "D: Component, Signals, Standalone");
  assert.equal(angularPreview("{{ title }} title = 'Hi'", { labels }).text, "Hi");
  assert.equal(angularPreview("<h1>Dashboard</h1>", { labels }).text, "Dashboard");
  let ran = false; globalThis.__x = () => { ran = true; };
  angularPreview("__x(); <p>a</p>", { labels }); assert.equal(ran, false);
});

test("reactPreview unchanged", () => { assert.deepEqual(reactPreview("<h1>Hi {x}</h1>"), { kind: "text", text: "Hi" }); });

test("Angular legacy quiz map: imported (all 6 true only), mirrored on completion, removed on reset", () => {
  const store = new Map([["fayad-angular-quiz-progress-v2", JSON.stringify({ 1: [true, true, true, true, true, true], 2: [true, true] })]]);
  const storage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)), removeItem: (k) => store.delete(k) };
  const p = createProgress({ totals: { angular: 32 }, storage });
  assert.deepEqual(p.snapshot().tracks.angular.completed, ["angular-02"]);
  p.markCompleted("angular", "angular-05");
  const m = JSON.parse(store.get("fayad-angular-quiz-progress-v2"));
  assert.deepEqual(m[4], [true, true, true, true, true, true]); assert.deepEqual(m[2], [true, true]);
  p.reset("angular"); assert.equal(store.has("fayad-angular-quiz-progress-v2"), false);
});
