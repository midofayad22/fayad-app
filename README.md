# FAYAD Learning

Interactive, Arabic-first web development learning platform. Live: https://fayad-learning.vercel.app/

## Architecture
Static site (no build step) hosted on Vercel. Each learning track is a folder with its own HTML/CSS/JS.
Authentication uses Supabase (`js/main-auth.js`). Progress is currently stored in the browser (localStorage);
account-linked persistence is planned (see the roadmap).

## Local development
```bash
npm install          # installs the test tooling only
npm start            # serves the site at http://127.0.0.1:4173
npm test             # route / metadata / asset smoke tests (needs Playwright's Chromium)
```
If Chromium is missing: `npx playwright install chromium`.

## Routes
`/`, `/login.html`, `/about/about.html`, `/html-learning/html-learning.html`, `/css-learning/css-learning.html`,
`/javascript-learning/javascript-learning.html`, `/react-learning/react-learning.html`, `/vue-learning/vue-learning.html`,
`/angular-learning/angular-learning.html`, `/fundamentals/computer-basics/com.html`,
`/fundamentals/programming-basics/prg.html`, plus `/offline.html` (service-worker fallback).
Existing `.html` URLs must keep working.

## Service worker
`service-worker.js` is network-first, same-origin only, never touches Supabase/CDN/`/_vercel/` requests.
Bump `CACHE_VERSION` when changing its strategy.

## Secrets
The Supabase URL and *publishable* key in `js/main-auth.js` are public by design; security relies on Row Level Security.
Never commit service-role keys or `.env` files.
