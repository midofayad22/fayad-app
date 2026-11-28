// Deep-dive layer (content/_deep.js + content/<track>/dive*.js): structure, bilingual parity and reference hygiene.
import test from "node:test"; import assert from "node:assert/strict"; import { readdirSync } from "node:fs"; import { pathToFileURL } from "node:url"; import { join } from "node:path";
const root = new URL("../content/", import.meta.url).pathname;
const ALLOWED = /^https:\/\/(developer\.mozilla\.org|web\.dev|www\.w3schools\.com|html\.spec\.whatwg\.org|www\.w3\.org|javascript\.info|react\.dev|angular\.dev|vuejs\.org|getbootstrap\.com|tailwindcss\.com|tc39\.es|developer\.chrome\.com|git-scm\.com|docs\.github\.com|css-tricks\.com|www\.typescriptlang\.org|vueuse\.org|router\.vuejs\.org|pinia\.vuejs\.org|reactrouter\.com|nodejs\.org|angular\.io)\//;
const shape = (h) => (String(h).match(/<[^>]+>/g) || []).join("");
const codeBlocks = (h) => (String(h).match(/<code>[\s\S]*?<\/code>/g) || []).join("|");
const files = [];
for (const t of readdirSync(root, { withFileTypes: true })) if (t.isDirectory()) for (const f of readdirSync(join(root, t.name))) if (/^dive(-[a-z0-9]+)?\.js$/.test(f)) files.push([t.name, f]);
test("there is deep content", () => assert.ok(files.length >= 1));
for (const [track, f] of files) test(`${track}/${f}: bilingual pairs, tag parity, interview levels, allowed references`, async () => {
  const { DEEP } = await import(pathToFileURL(join(root, track, f)).href);
  for (const [id, e] of Object.entries(DEEP)) {
    assert.match(id, new RegExp("^" + track + "-\\d{2}$"), id);
    const pair = (p, where) => { assert.ok(p && typeof p.ar === "string" && p.ar.trim() && typeof p.en === "string" && p.en.trim(), `${id} ${where}: needs non-empty ar+en`); assert.equal(shape(p.ar), shape(p.en), `${id} ${where}: ar/en markup differs`); assert.equal(codeBlocks(p.ar), codeBlocks(p.en), `${id} ${where}: <code> must be identical`); };
    assert.ok((e.interview || []).length >= 4, `${id}: at least 4 interview questions`);
    assert.ok((e.refs || []).length >= 2, `${id}: at least 2 references`);
    assert.ok((e.deep || []).length >= 1, `${id}: at least one deep-dive card`);
    (e.deep || []).forEach((d, i) => { pair(d.t, `deep[${i}].t`); pair(d.html, `deep[${i}].html`); assert.ok(d.html.en.length > 250, `${id} deep[${i}] too thin`); });
    (e.interview || []).forEach((q, i) => { assert.ok(["junior", "mid", "senior"].includes(q.lv), `${id} q${i} level`); pair(q.q, `q${i}`); pair(q.a, `a${i}`); assert.ok(q.a.en.length > 80, `${id} a${i} too thin`); });
    (e.refs || []).forEach((r, i) => { assert.match(r.u, ALLOWED, `${id} ref${i} domain: ${r.u}`); pair(r.t, `ref${i}`); });
    assert.equal(new Set((e.refs || []).map((r) => r.u)).size, (e.refs || []).length, `${id}: duplicate reference urls`);
  }
});
