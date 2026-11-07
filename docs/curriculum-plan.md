# Curriculum plan: Programming Basics and Computer Basics

Status after the platform-overhaul branch. Engine features are shared, so every lesson written later uses the same experience.

## What exists now (shipped)
Foundation engine (`js/engine/foundation-view.js`, schema in `js/engine/schema.js`) now supports, as optional lesson fields:
- `deep` – extra reading after the original body (AR + EN).
- `quiz[0].explain` and `quizMore[]` – several questions per lesson; after every answer the learner sees right/wrong, the correct option and a "Why?" explanation; answers are recorded per question index in the existing progress store (`recordAnswer`), so Supabase sync is unchanged.
- `exercise` – `{ prompt, starter, must[], test, feedback[], hint, solution }`. The learner's code plus `test` run only in the sandboxed runner; the test prints `__OK` or `__FB:<n>`; `must` are cheap source checks (e.g. "use a loop"). Buttons: Check, Hint, Show solution, Restore starter. Infinite loops end in a clear timeout message.
The original legacy fields are untouched, so the migration-parity tests still guard them.

Programming Basics lessons upgraded so far: prg-07 Variables, prg-08 Data types, prg-09 Operators, prg-10 Conditions, prg-11 Loops (content in `content/prg/deep.js`).

## Programming Basics – remaining work
| Module | Lessons | State |
|---|---|---|
| 1. How computers think | 01–06 | original short lessons; add `deep`, 3 more questions each, one thinking exercise (tracing/ordering) |
| 2. Core building blocks | 07–11 | done (deep + 4 questions + exercise) |
| 3. Reusable code | 12–14 (functions, parameters, scope) | to do: same pattern, exercises = write a function (tests call it with several inputs) |
| 4. Data structures | 15–16 (arrays, objects) | to do |
| 5. Working like a developer | 17–20 (errors, problem solving, Git, review) | to do |
Module checkpoints (≈6 questions after each module) and a larger final exam (target 25 questions with explanations; the current final has 8 and no per-question feedback) need a small engine step: allow `track.assessments[]` and store each result under its own id in `assessment_results` (the table already has an assessment id column).

## Computer Basics – inspection and plan
Current state: `foundation-lite` layout, 20 lessons, one quiz question per lesson, no per-question explanation, no module checks, no final assessment (lesson 20 is a one-question "Final Quiz"). Text is short, no worked examples.

Proposed structure (same lesson count, no route or id changes so progress is preserved):
1. Understanding the computer (com-01–03): what it is, how it works, hardware vs software.
2. Inside the machine (com-04–09): CPU, RAM, storage, motherboard, GPU, input/output.
3. Software and data (com-10–14): operating systems, files and folders, binary, bits and bytes, how a program runs.
4. Connected world (com-15–17): internet, browser and web, cybersecurity basics.
5. The bigger picture (com-18–20): history, modern computing, final review.
Per lesson: a worked real-life example, a "common mistake" note, 3–4 questions with explanations (`quizMore`), and where useful a small interactive check instead of code (match the component to its job, order the steps of "what happens when you open a program", convert 5 to binary). Those interactive checks need one more optional field (`activity`) rendered by the lite layout; the quiz/explanation work can start immediately with the engine already shipped (the lite layout needs `quizMore` rendering, which `renderQuiz` already provides for both layouts).
Assessments: one checkpoint per module and a 25-question final exam, pass mark 70%, using the same `assessments[]` step as Programming Basics.

## Suggested order
1. Engine: `assessments[]` (module checkpoints + final) for both layouts.
2. Programming Basics modules 3–5, then module 1.
3. Computer Basics modules 1–5 (explanations first, activities second).
4. Tests per module (content valid, explanations present, exercises accept solution / reject starter, English has no Arabic).
