// Installed-app (PWA) quality: manifest, icons, iOS standalone meta on EVERY page, safe-area handling, service worker strategy.
import test from "node:test"; import assert from "node:assert/strict"; import { readFileSync, readdirSync, statSync, existsSync } from "node:fs"; import { join } from "node:path";
const root = new URL("../", import.meta.url).pathname;
const read = (p) => readFileSync(join(root, p), "utf8");
const png = (p) => { const b = readFileSync(join(root, p)); return [b.readUInt32BE(16), b.readUInt32BE(20)]; };
test("manifest: standalone, scope, icons exist with the declared sizes, maskable present, shortcuts resolve", () => {
  const m = JSON.parse(read("manifest.json"));
  assert.equal(m.display, "standalone"); assert.equal(m.start_url, "/"); assert.equal(m.scope, "/");
  assert.ok(m.icons.some((i) => i.purpose === "maskable") && m.icons.some((i) => i.purpose === "any"));
  for (const i of m.icons) { const [w, h] = png(i.src.slice(1)); assert.deepEqual([w, h], i.sizes.split("x").map(Number), i.src); }
  assert.deepEqual(png("icons/apple-touch-icon.png"), [180, 180]);
  for (const s of m.shortcuts || []) assert.ok(existsSync(join(root, s.url.split("#")[0].replace(/^\//, "") || "index.html")), s.url);
});
function pages(dir, out = []) {
  for (const n of readdirSync(join(root, dir))) { if (["node_modules", "tests", "docs", ".git", "legacy", "vendor"].includes(n)) continue; const rel = join(dir, n); const st = statSync(join(root, rel)); if (st.isDirectory()) pages(rel, out); else if (n.endsWith(".html") && n !== "offline.html") out.push(rel); }
  return out;
}
test("every page: viewport-fit=cover + iOS standalone meta (translucent status bar) so the safe-area CSS applies everywhere", () => {
  const bad = [];
  for (const p of pages("")) { const s = read(p); if (!/viewport-fit=cover/.test(s) || !/apple-mobile-web-app-capable/.test(s) || !/apple-mobile-web-app-status-bar-style" content="black-translucent"/.test(s)) bad.push(p); }
  assert.deepEqual(bad.slice(0, 10), []);
});
test("safe areas: status-bar strip and sticky bars sit below the notch; service worker is network-first with an offline fallback", () => {
  const css = read("css/shell.css");
  assert.match(css, /body::before\s*\{[^}]*env\(safe-area-inset-top/);
  assert.match(css, /html \.ac-top[^{]*\{[^}]*top: env\(safe-area-inset-top/);
  assert.match(read("css/lesson-page.css"), /\.lp-top[^}]*env\(safe-area-inset-top/);
  const sw = read("service-worker.js");
  assert.match(sw, /fetch\(request\)[\s\S]*caches\.match\(OFFLINE_URL\)/);
});
