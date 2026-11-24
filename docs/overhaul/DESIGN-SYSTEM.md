# FAYBIT design system — Homepage milestone (visual direction v1)

Status: **homepage under review; not approved.** About/Settings/Profile/Dashboard/lessons untouched until approval.

## References actually opened (text/structure only)
Reachable through the sandbox allowlist: Linear (about page), The Odin Project (Foundations path), javascript.info. Everything else on the brief's list (Awwwards, Vercel, Stripe, Raycast, MDN, freeCodeCamp…) was blocked, so **no visual study of those was done**; nothing here claims it. Principles taken from what was read: javascript.info — very dense, tabbed parts, optional parts flagged; Odin — a single ordered path with explicit prerequisites; Linear — restrained, typographic product pages. The decisions below are original choices, not copies.

## Identity: "ink and signal"
- **Light = warm paper + ink + one signal colour (vermilion).** Dark = midnight blue-black + coral, with a faint blueprint grid on the hero only. The two themes use different surfaces, different accent lightness and different atmosphere (not an inversion).
- Teal is no longer the brand colour (the logo keeps its own colours). Green appears only for success; each track keeps its own accent (`[data-course]`).
- "Ink" surfaces (hero progress panel, practice band) are dark in both themes so the page has real depth changes, not just white sections.

## Typography (compared in Chromium on real samples: headings, paragraph, mixed AR/EN, `fetch()` inline code, UI meta line)
Arabic compared: IBM Plex Sans Arabic, Alexandria, Readex Pro, Noto Sans Arabic, Tajawal, Markazi Text. English: Manrope, Plus Jakarta Sans, Inter, IBM Plex Sans. Code: JetBrains Mono, IBM Plex Mono (JetBrains kept, already shipped).
| Role | Arabic | English | Why |
|---|---|---|---|
| Display + h1–h3 | Readex Pro (variable, 23 KB) | Plus Jakarta Sans (variable, 27 KB) | Distinct heading character; Readex's wide, geometric Arabic pairs with Jakarta's geometric Latin. Alexandria was heavier/wider; Markazi (serif) too small-x-height for UI; Tajawal condensed; Noto neutral. |
| Body + UI | IBM Plex Sans Arabic 400/500/600 | Inter (variable) | Readable at 15 px, strong technical feel, already cached. |
| Code | JetBrains Mono | JetBrains Mono | unchanged |
Loading: all `font-display: swap`, unicode-range split so Arabic pages do not download the Latin display face and vice versa. Net new weight ≈ 50 KB (two variable files), no new weights beyond what is declared. Honest gap: mixed-script sample used fallback glyphs for Latin inside the Arabic-only specimen fonts; real pages stack Latin faces, verified in screenshots, not isolated per-font.

## Colour tokens (single source: `css/tokens.css`)
Light: bg `#f4efe6`, bg-soft `#ebe5d8`, surface `#fbf9f4`, text `#17130e`, soft `#4a4337`, muted `#665e50`, brand `#b73618`, accent `#2a44c8`. Dark: bg `#0a0c12`, bg-soft `#0e111a`, surface `#131722`, text `#eceaf4`, soft `#b4b8c8`, muted `#8e93a8`, brand `#ff7a59`, accent `#9da9ff`. Ink panel: `#17130e` (light) / `#161a28` (dark) with `#ff7a59` accent.

## Measured contrast (WCAG 2.x, computed by `node tools/contrast-report.mjs --md` from the real token values; borders composited over page bg)
| Theme | Foreground | Background | Use | Ratio | Needs | Result |
|---|---|---|---|---|---|---|
| light | `course-ink` #a63708 | `bg-soft` #ebe5d8 | html accent text on band | 5.28 | 4.5 | pass |
| light | `course-ink` #a63708 | `bg` #f4efe6 | html accent text on page | 5.78 | 4.5 | pass |
| light | `course-on` #ffffff | `course` #b23a0a | html button label | 6.00 | 4.5 | pass |
| light | `course-ink` #1a56c0 | `bg-soft` #ebe5d8 | css accent text on band | 5.34 | 4.5 | pass |
| light | `course-ink` #1a56c0 | `bg` #f4efe6 | css accent text on page | 5.85 | 4.5 | pass |
| light | `course-on` #ffffff | `course` #1d5fd1 | css button label | 5.82 | 4.5 | pass |
| light | `course-ink` #6f5a00 | `bg-soft` #ebe5d8 | js accent text on band | 5.33 | 4.5 | pass |
| light | `course-ink` #6f5a00 | `bg` #f4efe6 | js accent text on page | 5.84 | 4.5 | pass |
| light | `course-on` #ffffff | `course` #786100 | js button label | 5.99 | 4.5 | pass |
| light | `course-ink` #056a88 | `bg-soft` #ebe5d8 | react accent text on band | 4.89 | 4.5 | pass |
| light | `course-ink` #056a88 | `bg` #f4efe6 | react accent text on page | 5.36 | 4.5 | pass |
| light | `course-on` #ffffff | `course` #06708f | react button label | 5.64 | 4.5 | pass |
| light | `course-ink` #136b45 | `bg-soft` #ebe5d8 | vue accent text on band | 5.20 | 4.5 | pass |
| light | `course-ink` #136b45 | `bg` #f4efe6 | vue accent text on page | 5.70 | 4.5 | pass |
| light | `course-on` #ffffff | `course` #16794f | vue button label | 5.41 | 4.5 | pass |
| light | `course-ink` #a3193d | `bg-soft` #ebe5d8 | angular accent text on band | 6.05 | 4.5 | pass |
| light | `course-ink` #a3193d | `bg` #f4efe6 | angular accent text on page | 6.63 | 4.5 | pass |
| light | `course-on` #ffffff | `course` #a3193d | angular button label | 7.60 | 4.5 | pass |
| light | `course-ink` #6e4c07 | `bg-soft` #ebe5d8 | prg accent text on band | 6.20 | 4.5 | pass |
| light | `course-ink` #6e4c07 | `bg` #f4efe6 | prg accent text on page | 6.79 | 4.5 | pass |
| light | `course-on` #ffffff | `course` #80590a | prg button label | 6.27 | 4.5 | pass |
| light | `course-ink` #6f5a00 | `bg-soft` #ebe5d8 | ajs accent text on band | 5.33 | 4.5 | pass |
| light | `course-ink` #6f5a00 | `bg` #f4efe6 | ajs accent text on page | 5.84 | 4.5 | pass |
| light | `course-on` #ffffff | `course` #786100 | ajs button label | 5.99 | 4.5 | pass |
| light | `course-ink` #6439b0 | `bg-soft` #ebe5d8 | bs accent text on band | 6.08 | 4.5 | pass |
| light | `course-ink` #6439b0 | `bg` #f4efe6 | bs accent text on page | 6.66 | 4.5 | pass |
| light | `course-on` #ffffff | `course` #6f42c1 | bs button label | 6.51 | 4.5 | pass |
| light | `course-ink` #0b6379 | `bg-soft` #ebe5d8 | tw accent text on band | 5.44 | 4.5 | pass |
| light | `course-ink` #0b6379 | `bg` #f4efe6 | tw accent text on page | 5.96 | 4.5 | pass |
| light | `course-on` #ffffff | `course` #0e7490 | tw button label | 5.36 | 4.5 | pass |
| dark | `course-ink` #ff8f68 | `bg-soft` #0e111a | html accent text on band | 8.42 | 4.5 | pass |
| dark | `course-ink` #ff8f68 | `bg` #0a0c12 | html accent text on page | 8.73 | 4.5 | pass |
| dark | `course-on` #1f0a03 | `course` #f06a3c | html button label | 6.19 | 4.5 | pass |
| dark | `course-ink` #82b4ff | `bg-soft` #0e111a | css accent text on band | 8.91 | 4.5 | pass |
| dark | `course-ink` #82b4ff | `bg` #0a0c12 | css accent text on page | 9.24 | 4.5 | pass |
| dark | `course-on` #04142e | `course` #5b9bff | css button label | 6.62 | 4.5 | pass |
| dark | `course-ink` #f7df1e | `bg-soft` #0e111a | js accent text on band | 13.94 | 4.5 | pass |
| dark | `course-ink` #f7df1e | `bg` #0a0c12 | js accent text on page | 14.46 | 4.5 | pass |
| dark | `course-on` #1c1800 | `course` #f7df1e | js button label | 13.16 | 4.5 | pass |
| dark | `course-ink` #61dafb | `bg-soft` #0e111a | react accent text on band | 11.61 | 4.5 | pass |
| dark | `course-ink` #61dafb | `bg` #0a0c12 | react accent text on page | 12.04 | 4.5 | pass |
| dark | `course-on` #03222b | `course` #61dafb | react button label | 10.20 | 4.5 | pass |
| dark | `course-ink` #5fd9a0 | `bg-soft` #0e111a | vue accent text on band | 10.70 | 4.5 | pass |
| dark | `course-ink` #5fd9a0 | `bg` #0a0c12 | vue accent text on page | 11.10 | 4.5 | pass |
| dark | `course-on` #03221a | `course` #42b883 | vue button label | 6.75 | 4.5 | pass |
| dark | `course-ink` #ff8aa5 | `bg-soft` #0e111a | angular accent text on band | 8.47 | 4.5 | pass |
| dark | `course-ink` #ff8aa5 | `bg` #0a0c12 | angular accent text on page | 8.78 | 4.5 | pass |
| dark | `course-on` #2b0510 | `course` #ee6a8d | angular button label | 6.26 | 4.5 | pass |
| dark | `course-ink` #f0d58a | `bg-soft` #0e111a | prg accent text on band | 13.10 | 4.5 | pass |
| dark | `course-ink` #f0d58a | `bg` #0a0c12 | prg accent text on page | 13.58 | 4.5 | pass |
| dark | `course-on` #231a00 | `course` #e3b94e | prg button label | 9.28 | 4.5 | pass |
| dark | `course-ink` #f7df1e | `bg-soft` #0e111a | ajs accent text on band | 13.94 | 4.5 | pass |
| dark | `course-ink` #f7df1e | `bg` #0a0c12 | ajs accent text on page | 14.46 | 4.5 | pass |
| dark | `course-on` #1c1800 | `course` #f7df1e | ajs button label | 13.16 | 4.5 | pass |
| dark | `course-ink` #c2adf5 | `bg-soft` #0e111a | bs accent text on band | 9.51 | 4.5 | pass |
| dark | `course-ink` #c2adf5 | `bg` #0a0c12 | bs accent text on page | 9.86 | 4.5 | pass |
| dark | `course-on` #1a0b3a | `course` #a98bec | bs button label | 6.58 | 4.5 | pass |
| dark | `course-ink` #67e8f9 | `bg-soft` #0e111a | tw accent text on band | 13.01 | 4.5 | pass |
| dark | `course-ink` #67e8f9 | `bg` #0a0c12 | tw accent text on page | 13.49 | 4.5 | pass |
| dark | `course-on` #012a33 | `course` #22d3ee | tw button label | 8.42 | 4.5 | pass |
| light | `text` #17130e | `bg` #f4efe6 | body text on page | 16.14 | 4.5 | pass |
| light | `text` #17130e | `surface` #fbf9f4 | text on surface | 17.57 | 4.5 | pass |
| light | `text-soft` #4a4337 | `bg` #f4efe6 | secondary text | 8.53 | 4.5 | pass |
| light | `text-soft` #4a4337 | `bg-soft` #ebe5d8 | secondary text on roadmap band | 7.79 | 4.5 | pass |
| light | `text-muted` #665e50 | `bg` #f4efe6 | muted text | 5.59 | 4.5 | pass |
| light | `text-muted` #665e50 | `surface` #fbf9f4 | muted text on surface | 6.08 | 4.5 | pass |
| light | `text-muted` #665e50 | `bg-soft` #ebe5d8 | muted text on roadmap band | 5.10 | 4.5 | pass |
| light | `brand` #b73618 | `bg` #f4efe6 | kicker / accent text | 5.16 | 4.5 | pass |
| light | `brand` #b73618 | `bg-soft` #ebe5d8 | accent text on band | 4.71 | 4.5 | pass |
| light | `on-brand` #ffffff | `brand` #b73618 | primary button label | 5.91 | 4.5 | pass |
| light | `on-brand` #ffffff | `brand-strong` #9c2c11 | primary button hover label | 7.55 | 4.5 | pass |
| light | `accent` #2a44c8 | `bg` #f4efe6 | secondary accent text | 6.65 | 4.5 | pass |
| light | `success` #1b7048 | `bg` #f4efe6 | success text | 5.30 | 4.5 | pass |
| light | `warning` #8a5a00 | `bg` #f4efe6 | warning text | 5.18 | 4.5 | pass |
| light | `danger` #b3261e | `bg` #f4efe6 | error text | 5.71 | 4.5 | pass |
| light | `blue` #1d5fa8 | `bg` #f4efe6 | info text | 5.63 | 4.5 | pass |
| light | `border-strong` #b6b1aa | `bg` #f4efe6 | border (decorative; see note) | 1.86 | 1.4 | pass |
| light | `brand` #b73618 | `bg` #f4efe6 | focus ring vs page (non-text 3:1) | 5.16 | 3 | pass |
| light | `text` #17130e | `surface-3` #e4ddcc | text on pressed/track surface | 13.66 | 4.5 | pass |
| light | `ink-text` #f3eee3 | `ink` #17130e | ink panel: text | 15.98 | 4.5 | pass |
| light | `ink-soft` #c9c0af | `ink` #17130e | ink panel: secondary | 10.25 | 4.5 | pass |
| light | `ink-muted` #a39984 | `ink` #17130e | ink panel: muted | 6.56 | 4.5 | pass |
| light | `ink-accent` #ff7a59 | `ink` #17130e | ink panel: accent text / focus ring | 7.20 | 4.5 | pass |
| light | `ink-on-accent` #1a0802 | `ink-accent` #ff7a59 | ink panel: button label | 7.58 | 4.5 | pass |
| light | `ink-soft` #c9c0af | `ink-2` #231e17 | ink panel: text in inset | 9.17 | 4.5 | pass |
| dark | `text` #eceaf4 | `bg` #0a0c12 | body text on page | 16.42 | 4.5 | pass |
| dark | `text` #eceaf4 | `surface` #131722 | text on surface | 15.04 | 4.5 | pass |
| dark | `text-soft` #b4b8c8 | `bg` #0a0c12 | secondary text | 9.90 | 4.5 | pass |
| dark | `text-soft` #b4b8c8 | `bg-soft` #0e111a | secondary text on roadmap band | 9.54 | 4.5 | pass |
| dark | `text-muted` #8e93a8 | `bg` #0a0c12 | muted text | 6.41 | 4.5 | pass |
| dark | `text-muted` #8e93a8 | `surface` #131722 | muted text on surface | 5.87 | 4.5 | pass |
| dark | `text-muted` #8e93a8 | `bg-soft` #0e111a | muted text on roadmap band | 6.19 | 4.5 | pass |
| dark | `brand` #ff7a59 | `bg` #0a0c12 | kicker / accent text | 7.61 | 4.5 | pass |
| dark | `brand` #ff7a59 | `bg-soft` #0e111a | accent text on band | 7.34 | 4.5 | pass |
| dark | `on-brand` #1a0802 | `brand` #ff7a59 | primary button label | 7.58 | 4.5 | pass |
| dark | `on-brand` #1a0802 | `brand-strong` #e8613f | primary button hover label | 5.76 | 4.5 | pass |
| dark | `accent` #9da9ff | `bg` #0a0c12 | secondary accent text | 8.89 | 4.5 | pass |
| dark | `success` #4ade9a | `bg` #0a0c12 | success text | 11.36 | 4.5 | pass |
| dark | `warning` #f2b84b | `bg` #0a0c12 | warning text | 10.92 | 4.5 | pass |
| dark | `danger` #ff7b86 | `bg` #0a0c12 | error text | 7.85 | 4.5 | pass |
| dark | `blue` #6cc4ff | `bg` #0a0c12 | info text | 10.22 | 4.5 | pass |
| dark | `border-strong` #2a2e3d | `bg` #0a0c12 | border (decorative; see note) | 1.45 | 1.4 | pass |
| dark | `brand` #ff7a59 | `bg` #0a0c12 | focus ring vs page (non-text 3:1) | 7.61 | 3 | pass |
| dark | `text` #eceaf4 | `surface-3` #262c3f | text on pressed/track surface | 11.65 | 4.5 | pass |
| dark | `ink-text` #eceaf4 | `ink` #161a28 | ink panel: text | 14.55 | 4.5 | pass |
| dark | `ink-soft` #b4b8c8 | `ink` #161a28 | ink panel: secondary | 8.77 | 4.5 | pass |
| dark | `ink-muted` #8e93a8 | `ink` #161a28 | ink panel: muted | 5.68 | 4.5 | pass |
| dark | `ink-accent` #ff7a59 | `ink` #161a28 | ink panel: accent text / focus ring | 6.75 | 4.5 | pass |
| dark | `ink-on-accent` #1a0802 | `ink-accent` #ff7a59 | ink panel: button label | 7.58 | 4.5 | pass |
| dark | `ink-soft` #b4b8c8 | `ink-2` #0b0e16 | ink panel: text in inset | 9.77 | 4.5 | pass |
110 pairs measured, 0 text/UI failures

Notes: decorative borders (`border-strong`) are not text; their ratio is shown for transparency and is intentionally below 3:1 on hairlines (every interactive control additionally has a visible fill, label or focus ring). Focus ring = brand on page background, measured ≥3:1. Hover states: primary button hover label measured (`on-brand` on `brand-strong`). Not yet measured: syntax-highlight colours, chart colours, disabled states (later milestones).

## Motion rules
Native CSS first. Homepage uses **no GSAP/Lenis/Motion** (removed ≈ 120 KB JS and the TBT it cost); GSAP stays available for a future interaction that needs a timeline. Purposeful motion only: detail panel swap on map selection (opacity+8px, 420 ms), segment lift on hover, progress-bar fill, practice-demo checks ticking in once when the demo scrolls into view. Everything is disabled under `prefers-reduced-motion`; no scroll-jacking, no pinned sections, no parallax.
