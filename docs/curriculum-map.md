# Curriculum map — Computer Basics and Programming Basics

IDs are frozen: existing lesson IDs, routes and saved progress never change. New lessons are appended (`com-21+`, `prg-21+`) and ordered by the groups.
Lessons use the shared documentation components (`css/lesson-doc.css`, authored with `content/_doc.js`): objectives, prerequisites, code examples with copy,
diagrams, tables, common mistakes, exercises with hidden solutions, summary and next step. Arabic and English are authored side by side so markup cannot drift.

## Computer Basics (`com`) — 30 lessons
| Section | Lessons | State |
|---|---|---|
| Computer fundamentals (hardware, software, storage, networks, security intro) | com-01 … com-19 | original, short: **to be deepened** (see review below) |
| Operating Systems in depth | com-21 … com-30 | **done**: architecture, system calls, processes/threads, scheduling, memory, file systems, drivers/interrupts, boot, permissions/security, Linux & Windows lab |
| Final test | com-20 | unchanged, listed last |

Shallow-lesson review (candidates for a deep pass, in priority order): binary and data representation, CPU architecture, networking (IP, DNS, HTTP, ports), security basics, troubleshooting method.

## Programming Basics (`prg`) — 31 lessons + final assessment
| Section | Lessons | State |
|---|---|---|
| Fundamentals: what programming is, how code runs, computational thinking, algorithms, languages, syntax, variables, data types, operators, conditions, loops, functions, parameters, scope, arrays, objects, debugging, problem solving, Git, review | prg-01 … prg-20 | original; prg-07…11 already have deep layers, the rest are **to be deepened** |
| Beyond the basics: recursion, data structures (stack/queue/map/set), complexity (Big-O), paradigms, compilers & interpreters, tokenizer, parser & AST, parser errors & debugging, interpreter & environment, final project: the complete FAY language | prg-21 … prg-31 | **done**, each with a sandbox-checked exercise and 4 quiz questions |
| Final assessment | `prg-final` | unchanged |

Planned next (not started): deep layers for prg-01…06 and prg-12…19; a second project (a tiny stack-based language with variables); computational-thinking lab with decomposition and pattern exercises.
