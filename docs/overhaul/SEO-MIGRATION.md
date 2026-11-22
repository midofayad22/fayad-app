# Search Console migration runbook (Fayad Learning → FAYBIT)

Status: **nothing in this document is live.** All changes are on `feature/platform-overhaul` (Vercel Preview). The 301 in `vercel.json` only acts on the old host and only on a Production deployment from `main`; it must not be shipped without the owner's approval.

## 0. Before the merge (baseline — owner has Search Console access, I do not)
Export and keep (date-stamped) from the property of `https://fayad-learning.vercel.app/`:
1. Performance → last 16 months, dimensions *Pages*, *Queries*, *Countries*, *Devices* (CSV). Record clicks, impressions, CTR, avg position for the top 20 pages and top 50 queries.
2. Indexing → Pages: counts of Indexed / Not indexed with each reason; export the list of indexed URLs.
3. Sitemaps: submitted vs discovered count. Experience → Core Web Vitals (mobile): Good/Needs improvement/Poor URL counts.
4. Settings → Crawl stats (requests/day, avg response time). Links → top linked pages.
No improvement may be claimed later without comparing against these exports.

## 1. Properties
- Keep the old property. Add `https://faybit.vercel.app/` as a **URL-prefix** property (verify with the HTML tag or the DNS-less file method; the current `google-site-verification` meta belongs to the old property and does not verify the new one).
- Both hosts are `*.vercel.app` subdomains, so Google may not offer the **Change of Address** tool for them (it is meant for domain-level moves). If the option is greyed out, the 301s + sitemap below are the migration signal; do not use workarounds.

## 2. Go-live order (after explicit approval, in one release)
1. Merge to `main` → Production deploys with canonicals/OG/sitemap/robots on `faybit.vercel.app` and the host-based 301 `fayad-learning.vercel.app/* → faybit.vercel.app/*`.
2. Check: `curl -sI https://fayad-learning.vercel.app/html-learning/html-learning.html` → `308/301` with `location: https://faybit.vercel.app/html-learning/html-learning.html`; `curl -s https://faybit.vercel.app/robots.txt`; sitemap loads and every `<loc>` returns 200.
3. New property → Sitemaps → submit `https://faybit.vercel.app/sitemap.xml`. Keep the old property's sitemap submitted for ~1 month so Google recrawls old URLs and sees the redirects.
4. URL Inspection on: home, one track, one lesson (AR + EN), one game → "Request indexing". Confirm *User-declared canonical = Google-selected canonical*.
5. Do not remove the old domain or the redirect for at least 6–12 months.

## 3. Monitoring (weeks 1–8)
Weekly: Indexing → Pages (new property should grow, old should shrink), Performance (compare to the section-0 baseline: expect a temporary dip), Core Web Vitals, *Page indexing → Alternate page with proper canonical* (expected for old host), hreflang errors (International targeting is deprecated; use URL Inspection + the sitemap `xhtml:link` data), Crawl stats 5xx/redirect errors. Rollback = remove the redirect block and redeploy (canonicals would then need reverting via `tools/seo-apply.mjs` constants).

## 4. What the repo guarantees (tested in `tests/seo.test.mjs`)
Self-canonical, reciprocal hreflang + x-default on 584 lesson pages and 22 indexes, unique titles/descriptions per language, one H1, valid JSON-LD (BreadcrumbList, Course, LearningResource, ItemList — no ratings/prices), sitemap lists exactly the indexable self-canonical pages (307 URLs), thin lessons are `noindex, follow` and absent from the sitemap, robots disallows private areas only.

## 5. Known SEO gaps
- 160+ lessons (most of HTML/CSS/JS/Angular/Vue and part of React) have almost no explanatory prose (description + one example + quiz). Their static pages are generated but `noindex` until content is enriched; re-run `node tools/gen-lesson-pages.mjs && node tools/gen-sitemap.mjs` and they join the sitemap automatically once they pass the 80-word prose threshold.
- Static lesson pages are a reading/crawl layer; practice, quiz and progress live on the interactive track page (linked from each lesson with the same lesson number).
- No custom domain; `*.vercel.app` hosts share reputation signals poorly — a custom domain would be the durable fix.
