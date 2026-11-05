# Game scoring: what is and is not verified

## What the server enforces (migration 0003, `submit_solve`)
- Only signed-in users can submit; `anon` cannot execute the function and nobody can INSERT/UPDATE/DELETE `game_solves` directly.
- The browser sends `(game, level, hinted)` only. Points come from the server table `game_levels` (+5 when no hint was used).
- The level must exist; each `(user, game, level)` counts once; at most 20 new solves per minute and 300 per day per user.
- Reads are own-rows only; the public leaderboard exposes display name, points and counts, never ids/emails.
- Verified in a rolled-back transaction on the live project: valid submit, repeat = 0 points, unknown level rejected, anonymous rejected, forged `user_id`, direct insert and cross-user read/update/delete all blocked.

## What it does NOT prove
`submit_solve` does **not** prove the player actually completed the gameplay challenge. Challenge checks run inside the browser sandbox, so anyone who calls the RPC directly (or edits the page) can claim any existing level once. The effect is bounded: total points can never exceed what a legitimate player could earn, and the rate limits slow bulk abuse. The leaderboard is therefore a friendly ranking, not a tamper-proof contest, and must not carry real prizes.

## Options for a stronger, server-verifiable mechanism (free-tier compatible)
| Option | What the server can verify | Cost / limits |
|---|---|---|
| 1. Attempt gate: `start_attempt(game, level)` stores a server timestamp; `submit_solve` requires a minimum elapsed time per level and an unlocked order | A solve cannot arrive before a plausible time; bulk scripts are slowed | SQL only, easy. Still no proof of solving |
| 2. Edge Function runs JS challenges: learner code + hidden tests execute in a permission-less Deno Worker on the server; the function (service role kept server-side) writes the solve | Real proof for the `runtime:"js"` challenges (about 10 per track) | Free tier has CPU/time limits; sandboxing untrusted code needs care (timeouts, no network, memory) |
| 3. Server-held answers for deterministic puzzles (logic, memory, pattern, quiz-style): the server picks a seeded puzzle, stores the expected answer, and grades the submission | Real proof, no code execution needed | Only fits games whose answers are data, so it suits the new logic/memory games |
| 4. Gameplay replays (movement/input log for the platformer/zombie game) re-simulated by a deterministic server-side simulation | Strong proof for arcade-style games | Large effort; only worth it if real prizes are ever offered |
| 5. HTML/CSS challenges (need a DOM) | Not feasible on free infrastructure (needs a headless browser) | Keep as friendly-ranking only |

## Recommendation
1. Add option 1 now (cheap), 2. build option 3 into the new puzzle/memory games from the start, 3. add option 2 for the JS arena track, 4. leave HTML/CSS arena points unranked on any prize-bearing board. Until then, label every board as friendly.
