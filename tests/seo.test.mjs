// Static SEO guarantees: origin migration, canonicals, one h1, titles/descriptions, OG, JSON-LD validity, sitemap/robots/redirect consistency.
import { test } from "node:test"; import assert from "node:assert/strict"; import fs from "node:fs"; import path from "node:path";
const ORIGIN = "https://faybit.vercel.app", OLD = "fayad-learning.vercel.app";
const pages = []; (function w(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (["node_modules", ".git", "legacy", "tests", "docs", "vendor", "tools"].includes(e.name)) continue; const p = path.join(d, e.name); e.isDirectory() ? w(p) : e.name.endsWith(".html") && pages.push(p.replace(/^\.\//, "")); } })(".");
const read = (f) => fs.readFileSync(f, "utf8");
const meta = (s, re) => (s.match(re) || [])[1];
const indexable = (s) => !/name="robots" content="noindex/.test(s) && /rel="canonical"/.test(s);

test("no page, sitemap, robots or manifest still points at the old origin", () => {
  for (const f of [...pages, "sitemap.xml", "robots.txt", "manifest.json"]) assert.ok(!read(f).includes(OLD), `${f} mentions ${OLD}`);
});
test("every indexable page: title, description, 1 h1, canonical on the new origin, OG + twitter, valid JSON-LD", () => {
  let n = 0;
  for (const f of pages) {
    const s = read(f); if (!indexable(s)) continue; n++;
    const canon = meta(s, /rel="canonical" href="([^"]+)"/); assert.ok(canon.startsWith(ORIGIN + "/"), `${f} canonical ${canon}`);
    assert.ok(meta(s, /<title>([^<]{8,})<\/title>/), `${f} title`);
    assert.ok((meta(s, /name="description"\s+content="([^"]+)"/) || "").length >= 40, `${f} description too short`);
    assert.equal((s.match(/<h1[\s>]/g) || []).length, 1, `${f} h1 count`);
    for (const k of ["og:title", "og:description", "og:url", "og:image", "twitter:card"]) assert.ok(s.includes(k), `${f} ${k}`);
    assert.equal(meta(s, /og:url" content="([^"]+)"/), canon, `${f} og:url = canonical`);
    for (const m of s.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) assert.doesNotThrow(() => JSON.parse(m[1]), `${f} JSON-LD`);
  }
  assert.ok(n >= 300, `only ${n} indexable pages`);
});
test("titles and descriptions are unique among indexable pages", () => {
  const t = new Map(), d = new Map();
  for (const f of pages) { const s = read(f); if (!indexable(s)) continue; const L = f.startsWith("en/") ? "en|" : "ar|"; const a = L + meta(s, /<title>([^<]*)<\/title>/), b = L + meta(s, /name="description"\s+content="([^"]*)"/); assert.ok(!t.has(a), `${f} duplicates title of ${t.get(a)}`); assert.ok(!d.has(b), `${f} duplicates description of ${d.get(b)}`); t.set(a, f); d.set(b, f); }
});
test("track pages carry Course JSON-LD without invented fields (no ratings/price)", () => {
  for (const f of pages.filter((p) => /^([a-z-]+-learning)\/\1\.html$|^advanced-javascript\/advanced-javascript\.html$/.test(p))) {
    const m = read(f).match(/id="ld-seo">([\s\S]*?)<\/script>/); assert.ok(m, `${f} ld-seo`);
    const g = JSON.parse(m[1])["@graph"]; assert.ok(g.some((x) => x["@type"] === "BreadcrumbList")); assert.ok(g.some((x) => x["@type"] === "Course"), `${f} Course`);
    assert.ok(!/aggregateRating|review|offers/.test(m[1]));
  }
});
test("sitemap lists exactly the self-canonical indexable pages, all exist", () => {
  const sm = read("sitemap.xml"); const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.equal(new Set(locs).size, locs.length);
  for (const u of locs) { const rel = u.replace(ORIGIN + "/", "") || "index.html"; assert.ok(fs.existsSync(rel), `${u} missing`); assert.ok(indexable(read(rel)), `${u} is noindex`); assert.equal(meta(read(rel), /rel="canonical" href="([^"]+)"/), u); }
  for (const f of pages) { const s = read(f); if (!indexable(s)) continue; const c = meta(s, /rel="canonical" href="([^"]+)"/); if (c === ORIGIN + "/" + f.replace(/^index\.html$/, "")) assert.ok(locs.includes(c), `${f} missing from sitemap`); }
});
test("robots.txt: sitemap on new origin, private areas disallowed, content allowed; noindex pages not in sitemap", () => {
  const r = read("robots.txt"); assert.match(r, /Sitemap: https:\/\/faybit\.vercel\.app\/sitemap\.xml/);
  for (const p of ["/settings/", "/dashboard.html", "/profile.html", "/login.html"]) assert.ok(r.includes("Disallow: " + p), p);
  assert.ok(!/Disallow: \/(play\/$|html-learning|css-learning|about)/m.test(r));
});
test("old domain permanently redirects to the new one, path preserved", () => {
  const v = JSON.parse(read("vercel.json")); const x = v.redirects.find((r) => r.has?.some((h) => h.value === OLD));
  assert.ok(x && x.permanent === true && x.destination === ORIGIN + "/$1");
});
test("arena pages have distinct crawlable intro text and the hub links to them", () => {
  for (const k of ["html", "css", "js"]) { const s = read(`play/${k}-arena.html`); assert.ok(s.includes('class="ar-intro"') && s.includes(`data-arena-track="${k}"`)); }
  const meta = read("js/game/games-meta.js"); for (const k of ["html", "css", "js"]) assert.ok(meta.includes(`/play/${k}-arena.html`));
});

test("lesson pages: every lesson id of every track has an AR and EN page; hreflang is reciprocal; thin pages are noindex and out of the sitemap", async () => {
  const dirs = { html: "html-learning", css: "css-learning", js: "javascript-learning", react: "react-learning", vue: "vue-learning", angular: "angular-learning", ajs: "advanced-javascript", bs: "bootstrap-learning", tw: "tailwind-learning", com: "fundamentals/computer-basics", prg: "fundamentals/programming-basics" };
  const sm = read("sitemap.xml"); let total = 0, indexed = 0;
  for (const [id, dir] of Object.entries(dirs)) {
    const { lessons } = await import(`../content/${id}/index.js`);
    for (const l of lessons) {
      total++;
      const ar = `${dir}/lessons/${l.id}.html`, en = `en/${dir}/lessons/${l.id}.html`;
      assert.ok(fs.existsSync(ar) && fs.existsSync(en), `${l.id} page missing`);
      const a = read(ar), e = read(en);
      assert.match(a, /<html lang="ar" dir="rtl">/); assert.match(e, /<html lang="en" dir="ltr">/);
      assert.equal(meta(a, /rel="canonical" href="([^"]+)"/), `${ORIGIN}/${ar}`); assert.equal(meta(e, /rel="canonical" href="([^"]+)"/), `${ORIGIN}/${en}`);
      for (const [x, own, other] of [[a, ar, en], [e, en, ar]]) {
        assert.ok(x.includes(`hreflang="ar" href="${ORIGIN}/${ar}"`) && x.includes(`hreflang="en" href="${ORIGIN}/${en}"`) && x.includes(`hreflang="x-default" href="${ORIGIN}/${ar}"`), `${own} hreflang`);
        assert.equal((x.match(/<h1[\s>]/g) || []).length, 1, `${own} h1`);
        assert.ok(!/data-s=|<textarea|<button|<script(?! type="application\/ld\+json"|>try)/.test(x.replace(/<script>try[\s\S]*?<\/script>/, "")), `${own} leftover interactive markup`);
      }
      const thin = /noindex/.test(a); assert.equal(thin, /noindex/.test(e), `${l.id} asymmetric noindex`);
      assert.equal(sm.includes(`<loc>${ORIGIN}/${ar}</loc>`), !thin, `${ar} sitemap/noindex mismatch`); assert.equal(sm.includes(`<loc>${ORIGIN}/${en}</loc>`), !thin);
      if (!thin) indexed++;
    }
  }
  assert.equal(total, 292); assert.ok(indexed >= 100, `indexed lessons ${indexed}`);
});
test("lesson pages keep prev/next chain and link to the interactive lesson with the same number", async () => {
  const { lessons } = await import("../content/react/index.js");
  lessons.forEach((l, i) => { const s = read(`react-learning/lessons/${l.id}.html`); assert.ok(s.includes(`/react-learning/react-learning.html#lesson-${i + 1}`)); if (i > 0) assert.ok(s.includes(`href="/react-learning/lessons/${lessons[i - 1].id}.html"`)); if (i < lessons.length - 1) assert.ok(s.includes(`href="/react-learning/lessons/${lessons[i + 1].id}.html"`)); });
});
