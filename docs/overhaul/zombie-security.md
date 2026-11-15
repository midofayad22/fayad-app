# Zombie Survival — learner-code execution: threat model

**What runs:** the player writes JavaScript (`function act(s)`), which is *arbitrary untrusted code*. A Web Worker alone is not a security boundary, so the code is layered as follows.

| Layer | Control |
|---|---|
| Isolation | `js/playground` mounts a hidden `<iframe sandbox="allow-scripts">` (no `allow-same-origin`): opaque origin, so no access to localStorage, IndexedDB, cookies, the Supabase session (`fayad-supabase-auth`), parent DOM or navigation. The learner code runs in a blob Worker inside it. |
| Network | The frame carries a CSP (`default-src 'none'; connect-src 'none'; worker-src blob:; script-src 'unsafe-inline' 'unsafe-eval' blob:`), inherited by the Worker: `fetch`, XHR, WebSocket, `importScripts(remote)` all fail (tested; no request leaves the browser). |
| Data in | Only the level map (`grid`, `zombies`, `start`…). No solution, no hints, no user/account data, no tokens. |
| Data out | One console line (`@@ZB{…}`), parsed strictly on the main thread: ≤ 60 actions, each matched against a whitelist regex; everything else becomes `invalid`. |
| Trust | The Worker's own verdict is **never used**. The sanitized actions are replayed by the real engine on the main thread; that replay is what is animated, scored and shown. |
| Resources | Watchdog terminates the Worker after 2.5 s (endless loops); code length cap 6000 chars; console output capped (500 entries / 4000 chars); the game ends after 60 turns. |
| Rewards | Points are awarded by the server (`submit_solve`, `xp_ledger`), never by the sandbox. |

**Residual risks (documented, not hidden)**
- A memory bomb (`new Array(1e9)`) can crash the hidden frame/Worker and possibly stall the tab until the browser kills it; there is no per-Worker memory quota in browsers. Impact: self-DoS of the player's own tab.
- Cheating: `submit_solve` currently trusts the client's claim that a level was solved (same as every game on the platform). A player can call it directly. A future hardening is to submit the code + actions and re-simulate server-side (the engine is pure and deterministic, so an Edge Function could verify it).
- The learner can tamper with the simulation *inside* the Worker; this only changes the recorded actions, which the main-thread engine then judges honestly.

**Tests:** `tests/zombie-sandbox.test.mjs` (real Chromium): no outbound request, storage/DOM/parent/top undefined, `importScripts` and WebSocket blocked, endless loop terminated, bad return type and syntax errors reported, honest solution wins.
