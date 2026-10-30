// Release guard: the old implementations (which evaluate learner code with new Function / eval) must never be deployed or reachable.
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const SKIP = new Set(["legacy", "node_modules", ".git", "tests", "tools", "docs"]);
function* walk(dir) { for (const e of fs.readdirSync(dir, { withFileTypes: true })) { if (SKIP.has(e.name)) continue; const p = path.join(dir, e.name); if (e.isDirectory()) yield* walk(p); else yield p; } }

test("legacy/ is excluded from the Vercel deployment", () => {
  assert.match(fs.readFileSync(".vercelignore", "utf8"), /^legacy\/$/m);
});

test("no deployed file links to or redirects into legacy/, and none offers ?engine=legacy", () => {
  for (const f of walk(".")) {
    if (!/\.(html|js|json|xml|txt|webmanifest)$/.test(f)) continue;
    const s = fs.readFileSync(f, "utf8");
    assert.ok(!/engine=legacy/.test(s), `${f} mentions engine=legacy`);
    if (f !== "robots.txt") assert.ok(!/["'`(]\/?legacy\//.test(s), `${f} references legacy/`);
  }
});

// js/playground/playground.js is the one sanctioned exception: its eval/new Function strings are emitted INTO the sandboxed iframe / Worker only (learner code never runs in the site origin).
test("no site-origin code uses eval / new Function (only the sandbox bootstrap strings in the playground)", () => {
  for (const f of walk("js")) {
    if (!f.endsWith(".js") || f.endsWith("playground.js")) continue;
    const code = fs.readFileSync(f, "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");
    assert.ok(!/\beval\s*\(|new\s+Function\s*\(/.test(code), `${f} uses eval/new Function`);
  }
});
