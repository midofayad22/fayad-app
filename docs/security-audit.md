# Security & release audit (feature/platform-overhaul)

## Secrets
- Scan of all tracked files (excluding `vendor/`, `node_modules/`) for service-role keys, JWTs, AWS/GitHub/OpenAI-style tokens and private keys: **no matches**. Enforced by `tests/security.test.mjs`.
- The only Supabase values in the client are the project URL and the public (anon/publishable) key. The service-role key is never in the repository; server-side secrets must stay in Vercel/Supabase settings.

## Learner-code execution
- Learner code runs only in the sandboxed runner (`js/playground/playground.js`): opaque-origin iframe (`sandbox="allow-scripts"`) and, for JS, a killable Worker. No `eval`/`new Function` runs on the site origin.
- Legacy rollback pages are not deployed (`.vercelignore`), see `docs/rollback.md` and `tests/no-legacy.test.mjs`.

## HTTP headers (`vercel.json`)
- `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera, microphone, geolocation, payment disabled).
- Caching: `/vendor/*` immutable (versioned folders), `/assets` and `/icons` 1 day + SWR, `/css` `/js` `/content` 5 min + SWR, `service-worker.js` always revalidated, HTML uses Vercel's default revalidation.

## Content-Security-Policy — NOT enabled yet (deliberate)
A policy was drafted but is not shipped because it cannot be validated without a deployed preview:
- Sandboxed `srcdoc` iframes and Worker blobs inherit the page CSP, so the runner needs `script-src 'unsafe-eval'` inside the sandbox only; a page-wide policy would break learner code.
- Inline scripts in `<head>` (theme/direction bootstrap, Vercel analytics stub) need hashes or `'unsafe-inline'`.
- Allowed origins to list: `fonts.googleapis.com`, `fonts.gstatic.com`, `cdn.jsdelivr.net` (Supabase client), `cdnjs.cloudflare.com` (Font Awesome on login/foundation pages), `*.supabase.co` (connect), `va.vercel-scripts.com`.
Next step: ship it as `Content-Security-Policy-Report-Only` on the Preview deployment, review violations, then enforce.

## Service worker (`service-worker.js`, cache `v2`)
- Same-origin GET only; network-first; never caches cross-origin, `/_vercel/`, range or authorised requests; offline fallback `/offline.html`; no automatic `skipWaiting` (a new worker never replaces code while a learner is typing).
- Authenticated data (Supabase) is cross-origin, so it is never cached by the worker.
