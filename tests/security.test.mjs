import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { execSync } from "node:child_process";

const files = execSync("git ls-files", { encoding: "utf8" }).split("\n").filter((f) => f && !/^(vendor|node_modules)\//.test(f) && !/package-lock\.json$|\.(webp|png|ico|svg|jpg)$/.test(f));
test("no secrets are committed (service-role keys, JWTs, tokens, private keys)", () => {
  const re = /service_role|sb_secret|eyJhbGciOi[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY|ghp_[A-Za-z0-9]{30,}|sk-[A-Za-z0-9]{30,}/;
  const hits = files.filter((f) => !/^(docs\/|tests\/security)/.test(f) && re.test(fs.readFileSync(f, "utf8")));
  assert.deepEqual(hits, []);
});
test("vercel.json is valid, sets safe headers and long-lived caching only for versioned vendor files", () => {
  const cfg = JSON.parse(fs.readFileSync("vercel.json", "utf8"));
  const h = (src) => Object.fromEntries(cfg.headers.find((x) => x.source === src).headers.map((x) => [x.key, x.value]));
  assert.equal(h("/(.*)")["X-Content-Type-Options"], "nosniff");
  assert.match(h("/vendor/(.*)")["Cache-Control"], /immutable/);
  assert.doesNotMatch(h("/(css|js|content)/(.*)")["Cache-Control"], /immutable/);
  assert.match(h("/service-worker.js")["Cache-Control"], /max-age=0/);
});
test("no eval or new Function in site-origin scripts", () => {
  const bad = files.filter((f) => /^js\/.*\.js$|^(about|content)\/.*\.js$/.test(f) && !/^js\/playground\//.test(f) && /\beval\s*\(|new Function\s*\(/.test(fs.readFileSync(f, "utf8")));
  assert.deepEqual(bad, []);
});
