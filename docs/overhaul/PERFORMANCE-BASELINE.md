# Performance baseline (before the redesign) — 2026-11-22, commit dd904b2

Method: Lighthouse 12, mobile emulation (Moto G-class, simulated slow-4G, 4× CPU), headless Chromium, **local static server with brotli + immutable caching for assets** (`/tmp/lh/serve.mjs`, not Vercel's CDN), single run per page. Lab data only: treat ±10 % as noise. **No field data** (CrUX/Search Console) was available; the pages load `/_vercel/speed-insights/script.js`, so Vercel Speed Insights will collect real LCP/INP/CLS once traffic hits a deployment — read those before claiming anything.

| Page | Perf | A11y | Best-pr. | SEO | LCP | CLS | TBT | FCP |
|---|---|---|---|---|---|---|---|---|
| Home `/index.html` | 79 | 100 | 96 | 100 | **3.78 s** | 0.001 | 355 ms | 1.42 s |
| Course `/html-learning/html-learning.html` | 78 | 98 | 96 | 100 | **3.85 s** | 0 | 388 ms | 1.65 s |
| Static lesson `/react-learning/lessons/react-02.html` | 100 | 100 | 100 | 100 | 1.55 s | 0 | 0 | 1.55 s |
| Game hub `/play/index.html` | 99 | 100 | 96 | 100 | 1.93 s | 0 | 0 | 1.33 s |

INP proxy (Pixel 5 emulation, 4× CPU, PerformanceObserver `event` timing): course page — 3 measured interactions (sidebar toggle ×2, next lesson), worst 104 ms (Good < 200 ms). Home: no interaction registered, no number. A real INP needs field data.

Findings to fix in the redesign: home and course LCP > 2.5 s and TBT ≈ 350–390 ms (JS-rendered shell: boot module → content import → render). The new static lesson pages already score 100 because they are server-rendered HTML + one CSS stack.
Re-measure with the same script after the redesign and compare against this table.
