// Loop guard: tokenizer-based source transform (pure unit tests, plus behaviour of transformed code).
import { test } from "node:test";
import assert from "node:assert/strict";
import { guardLoops } from "../js/playground/loop-guard.js";

const g = (s) => guardLoops(s);
const run = (code, budget = 1e9) => { let n = 0; const __g = () => { if (++n > budget) throw new Error("LOOP"); }; new Function("__g", code)(__g); return n; };

test("guards for / while / do / for-await with braced bodies", () => {
  assert.equal(g("while(true){x()}").code, "while(true){__g();x()}");
  assert.equal(g("for(;;){}").code, "for(;;){__g();}");
  assert.equal(g("do{x()}while(true)").code, "do{__g();x()}while(true)");
  assert.equal(g("for await (const a of b) { y() }").code, "for await (const a of b) {__g(); y() }");
  assert.equal(g("for (let i = 0; i < (f(1,(2))); i++)\n{ z }").code, "for (let i = 0; i < (f(1,(2))); i++)\n{__g(); z }");
  assert.equal(g("while (a) /*c*/ { b }").guards, 1);
});

test("nested loops are all guarded", () => {
  assert.equal(g("for(;;){while(1){do{}while(0)}}").guards, 3);
});

test("does not touch loop-like text in strings, templates, comments or regex literals", () => {
  const src = [
    'const a = "while(true){}";', "const b = 'for(;;){}';", "const c = `do { ${ 'while(1){}' } }`;",
    "// while(true){ }", "/* for(;;){ } */", "const r = /while\\(x\\)\\{/.test(s);", "obj.while(x){}", "const w = a.for(1) ? 1 : 2;",
  ].join("\n");
  assert.equal(g(src).guards, 0);
  assert.equal(g(src).code, src);
});

test("braceless loops and the while-tail of do/while are left alone (documented limitation)", () => {
  assert.equal(g("for(;;) step();").guards, 0);
  assert.equal(g("do step(); while(x);").guards, 0);
  assert.equal(g("do { a() } while (x);").guards, 1);
});

test("unbalanced or odd input returns the original source unchanged", () => {
  for (const src of ["while(true){ 'unterminated", "for(;;){ `x ${ ", "/* open", "while(x"]) assert.equal(g(src).code, src, src);
});

test("transformed code behaves identically for ordinary loops", () => {
  assert.equal(new Function("__g", g("let s=0; for(let i=1;i<=100;i++){ s+=i } return s").code)(() => {}), 5050);
  assert.equal(new Function("__g", g("let n=0; do { n++ } while(n<5); let w=0; while(w<3){w++} return n+w").code)(() => {}), 8);
});

test("a runaway loop throws once the budget is exceeded; long legitimate loops are fine", () => {
  assert.throws(() => run(g("while(true){}").code, 1000), /LOOP/);
  assert.throws(() => run(g("for(;;){}").code, 1000), /LOOP/);
  assert.throws(() => run(g("do{}while(true)").code, 1000), /LOOP/);
  assert.ok(run(g("for(let i=0;i<200000;i++){}").code, 5e6) === 200000);
});
