# Phase 1 audit and execution plan (HEAD 232c572, branch feature/platform-overhaul)

## 1. State verified
- Working tree clean, remote == local. 79 commits. Tests: 437 (436 pass on a clean snapshot; `security.test.mjs` needs `.git` and passes in the repo). All Supabase-facing tests use an in-memory stand-in; RLS was verified separately with real SQL under `authenticated` / `anon` roles in rolled-back transactions.
- Supabase (free tier): tables profiles, lesson_completions, quiz_results, assessment_results, game_solves, game_levels, user_preferences, notifications, notification_prefs, announcements, course_catalog (+ legacy empty `user_progress`); bucket `avatars`; functions submit_solve, get_leaderboard, refresh_notifications, delete_my_account.

## 2. What is there and what is missing
| Area | Today | Gap against the brief |
|---|---|---|
| Course engines | Three page types: generic engine (`course-view`, 9 tracks), `foundation` (prg) and `foundation-lite` (com). The two foundation courses still use legacy markup (`fundamentals/*/prg.html`, `com.html`) and the 6,000-line `css/style.css`. | They look and behave unlike the rest; no course landing page, no module/unit navigation, no on-page outline. |
| Content | prg: 20 lessons (07–11 deep). com: 20 lessons, one question each, short text, no examples/objectives/terminology/revision. | com scope is a short introduction (no architecture, cache/ROM, file systems, number systems, networking depth, security, troubleshooting). prg 01–06, 12–20 are shallow. |
| Assessments | MCQ only. One final exam per foundation course (8 questions, no feedback per question). Client store keeps one aggregate per track; `assessment_results` is one row per (user, track): attempts, best, last, passed. Passing the final marks every lesson complete (legacy rule). | No question types beyond MCQ, no explanations for wrong options, no history of attempts, no module checkpoints, lesson completion and assessment passing are entangled, generic-engine courses have no assessments. |
| Dashboard | `dashboard.html` shows real data from the local progress record (which syncs): points, achievements, per-course progress, quiz stats. | No learning streak, no recent-activity list, no assessment history, no "next step" suggestion. |
| Navigation | Global drawer (done). Generic-engine course sidebar done earlier. Foundation pages keep the legacy sidebar. | One consistent course navigation across all courses. |
| Games | Arena, Flex Quest, Selector Quest, hub, server-scored levels. | Zombie Survival, FAYAD Grand Adventure, Tifo are not built. Games Center needs a pass. |
| PWA | Service worker, offline page, update prompt, tested in headless Chromium only. | Real-device test cannot be done by me; needs your phone (steps will be written). |

## 3. Design decisions
1. **One new course experience for prg and com** (`js/course/*`, `css/course-x.css`), not a restyle of the legacy page. The legacy pages stay at `/legacy/...` as rollback; public URLs `/fundamentals/programming-basics/prg.html` and `/fundamentals/computer-basics/com.html` are kept.
   - Course landing (hero with real progress, module map with unit/lesson state, "continue" button, assessments list).
   - Lesson layout: reading column + sticky outline ("on this page") + objectives strip, terminology, example/playground side-by-side on wide screens and stacked on phones, revision points, lesson quiz, previous/next. Different layouts per content type (reading, worked example, exercise, assessment) rather than repeated cards.
   - Assessment page (full screen, one question at a time, results review with explanations, attempt history).
   - Completion screen.
2. **Content model**: Modules → Units → Lessons in `track.modules[]` (ids keep working: existing `prg-NN` / `com-NN` ids and progress stay valid; new lessons get the next ids; presentation order comes from the module structure, not from the id). `course_catalog.total` and `TOTALS` are updated with each added lesson.
3. **Assessment engine** (shared by all courses): question types `mcq`, `tf`, `output` (what does this code print), `complete` (fill the blank), `debug` (find/fix the bug, checked in the sandbox), `challenge` (code checked by tests in the sandbox). Every question carries: concept tag, explanation of the right answer, per-option reasons for the wrong ones. Assessments are `checkpoint` (per unit/module), `final`. Required assessments gate **course completion**, never lesson completion.
4. **Supabase 0007 (additive)**: `assessment_attempts` (id, user_id → auth.users cascade, track, assessment_id, kind, score_pct, correct, total, passed, duration_s, created_at, answers jsonb ≤ 8 KB), index (user_id, track, created_at desc), RLS: own rows read/insert only, no update/delete; `assessment_results` stays as the per-assessment best/last summary with a new `assessment_id` column (existing rows keep `final`). Honest limit: answers are in public JS, so scores are self-reported; the leaderboard-style integrity work stays in the games track.
5. **Dashboard**: streak and recent activity computed from `lesson_completions.completed_at` + attempts, next step from module structure and unfinished assessments; only real data.
6. Free only: no new services; everything runs on static hosting + Supabase free tier. Row sizes are capped (attempt payload ≤ 8 KB) to stay inside the 500 MB database limit; avatars are already 2 MB max.

## 4. Phases, files, tests
| Phase | Deliverable | First files |
|---|---|---|
| 2 Navigation | One course sidebar/outline component used by every course, module-aware (collapsible modules, progress rings, search, mobile bottom sheet) | `js/course/nav.js`, `css/course-x.css` (tokens + layout), tests `course-nav.test.mjs` |
| 3 Programming Basics | Course landing + lesson layout; modules 1–5 with all 20+ lessons at the depth of 07–11 plus new lessons (e.g. strings, debugging with the console, mini-projects) | `js/course/{landing,lesson}.js`, `content/prg/modules.js`, `content/prg/lessons/*.js` |
| 4 Computer Basics | 12 units / ~45 lessons (fundamentals, architecture, CPU/RAM/ROM/cache, storage, OS, file systems, binary & number systems, data representation, I/O, networking, internet, software, security, troubleshooting), AR+EN, objectives/terminology/examples/common mistakes/revision/quiz, diagrams as inline SVG | `content/com/**`, `assets/diagrams/*.svg` |
| 5 Assessment + Dashboard | Engine, 0007 migration, attempts history, gating, dashboard (streak, activity, scores, next step) | `js/assess/*.js`, `supabase/migrations/0007_*.sql`, `js/account.js` |
| 6 Games | Zombie Survival, FAYAD Grand Adventure (120 levels), Tifo (rule-based, honest), Games Center pass | `js/game/*`, `play/*` |
| 7 QA | Full suite on snapshot, RLS SQL tests with real roles, responsive 320–430, RTL/LTR, offline/PWA headless, device checklist for you | `tests/*`, `docs/qa-report.md` |

Each phase ends with: what changed, files, test results, what needs you, one commit, push.

## 5. What I will need from you (not assumed done)
- Phase 5: nothing in the dashboard (migration 0007 is additive and I can apply it with the access you already approved; I will list the SQL and its expected result first and wait for your OK because you asked for that).
- Phase 7: opening the site on a real phone for the PWA checklist and telling me the results.
