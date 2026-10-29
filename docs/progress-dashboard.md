# Progress dashboard and profile

`/dashboard.html` and `/profile.html` (noindex, not in the sitemap) read the learner's `fayad-progress-v1` record through `js/engine/stats.js`.
Nothing is invented: a new learner sees zeros and an empty state.

Points: 10 per completed lesson, 2 per distinct quiz question answered correctly, 50 per fully completed course, 25 per passed final assessment.
Achievements are thresholds over those same counts (1/10/50/100 lessons, 1/3 courses, 25/100 correct answers, a passed assessment).
Accuracy = distinct correct answers / recorded attempts. Final-assessment results are stored per track in v1 (`assessment`: attempts, best %, last %, passed).

The profile shows the account (Supabase session when reachable, otherwise a signed-out state), lets the learner download a JSON copy of their progress and
erase it on this device (clears v1 and the mirrored legacy keys). Syncing progress to the account is NOT implemented yet: it waits for the reviewed Supabase schema.
