# Phase A report — design foundations

## Done
- One global sidebar (`js/nav-drawer.js`, `css/sidebar.css`): opens from the physical left edge, groups Main / My Account / Platform, Lucide icons (`js/ui/icons.js`), active/hover/focus/expanded states, mobile drawer with backdrop + safe-area. The old home `site-menu` aside, `#menuToggle` and overlay were removed; course navigation stays contextual (`cn-*`).
- Navbar search icon + command-palette overlay (`js/search/*`, `css/search.css`) built on the generated index `search/index.json` (`node tools/build-search-index.mjs`; `--check` detects staleness). Ctrl/⌘+K and `/` shortcuts, grouped results, highlighting, keyboard nav, recent searches, idle/no-results/error states, AR/EN.
- Hero motion: GSAP word-split replaced by a CSS entrance (no flash, reduced-motion respected).
- Layout/type/icon tokens in `css/tokens.css`; floating-control overlap fixed (shell controls in the header slot); 320px header overflow fixed.

## Tests (real browser + real files; no mocks except blocked external network)
Full suite: 486 tests, 485 pass, 1 fail (search "recent searches" stored a partial query; fixed, re-run 20/20). After the fix: search 20/20, account-menu + home 22/22.

## Known gaps
- "Computer Architecture" has no dedicated lesson (Computer Basics rebuild is Phase D).
- Real-device testing not performed. Service-worker caching of `/search/index.json` not yet verified (Phase B/F).
