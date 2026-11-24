# FAYBIT design system (V2 — teal identity)

> V1 ("ink and signal", vermilion, 18-week map) was rejected and retracted. FAYBIT is an independent educational platform; no homepage section describes a fixed curriculum or timeline.

## References actually opened (text/structure only)
Only Linear (about page), The Odin Project and javascript.info were reachable, as text. No screenshots of Vercel, Stripe, Raycast, Mobbin, Refero, Awwwards, Godly, Siteinspire, freeCodeCamp, MDN or W3Schools were inspected; none are claimed.

## Identity
- **Teal is the brand.** Palette derived from the branding board: teal gradient mark (~#0f8f8a to #00c9b7), deep navy wordmark (#11273b).
- Light: bg `#f4f8f9`, surface `#ffffff`, text `#11273b`, muted `#52687a`, brand `#097570`, brand-strong `#065c58`.
- Dark (designed separately, not inverted): bg `#07121c`, surface `#102236`, text `#e8f1f6`, brand `#1fd1bf`, on-brand `#04211e`.
- Track accents exist only for real tracks (`[data-course]` in tokens.css): HTML coral, CSS blue, JavaScript yellow, Bootstrap purple, Tailwind teal-blue, Angular red, React cyan, Vue green, Computer/Programming fundamentals. Used for glyph, accent line, progress and hover only; never for primary actions.
- Typography: Readex Pro (Arabic display), Plus Jakarta Sans (English display), IBM Plex Sans Arabic / Inter (body), JetBrains Mono (code); unicode-range split, variable files, only needed weights.
- Tokens: all in `css/tokens.css` (`--fy-*`: colour, radius, spacing, type scale, motion durations/easing, focus ring).

## Measured contrast (WCAG 2.x, computed by `node tools/contrast-report.mjs --md` from the real token values)
| Theme | Foreground | Background | Use | Ratio | Needs | Result |
|---|---|---|---|---|---|---|
| light | `course-ink` #a63708 | `bg-soft` #e7eff1 | html accent text on band | 5.68 | 4.5 | pass |
| light | `course-ink` #a63708 | `bg` #f4f8f9 | html accent text on page | 6.19 | 4.5 | pass |
| light | `course-on` #ffffff | `course` #b23a0a | html button label | 6.00 | 4.5 | pass |
| light | `course-ink` #1a56c0 | `bg-soft` #e7eff1 | css accent text on band | 5.74 | 4.5 | pass |
| light | `course-ink` #1a56c0 | `bg` #f4f8f9 | css accent text on page | 6.26 | 4.5 | pass |
| light | `course-on` #ffffff | `course` #1d5fd1 | css button label | 5.82 | 4.5 | pass |
| light | `course-ink` #6f5a00 | `bg-soft` #e7eff1 | js accent text on band | 5.74 | 4.5 | pass |
| light | `course-ink` #6f5a00 | `bg` #f4f8f9 | js accent text on page | 6.26 | 4.5 | pass |
| light | `course-on` #ffffff | `course` #786100 | js button label | 5.99 | 4.5 | pass |
| light | `course-ink` #056a88 | `bg-soft` #e7eff1 | react accent text on band | 5.26 | 4.5 | pass |
| light | `course-ink` #056a88 | `bg` #f4f8f9 | react accent text on page | 5.74 | 4.5 | pass |
| light | `course-on` #ffffff | `course` #06708f | react button label | 5.64 | 4.5 | pass |
| light | `course-ink` #136b45 | `bg-soft` #e7eff1 | vue accent text on band | 5.60 | 4.5 | pass |
| light | `course-ink` #136b45 | `bg` #f4f8f9 | vue accent text on page | 6.11 | 4.5 | pass |
| light | `course-on` #ffffff | `course` #16794f | vue button label | 5.41 | 4.5 | pass |
| light | `course-ink` #a3193d | `bg-soft` #e7eff1 | angular accent text on band | 6.52 | 4.5 | pass |
| light | `course-ink` #a3193d | `bg` #f4f8f9 | angular accent text on page | 7.11 | 4.5 | pass |
| light | `course-on` #ffffff | `course` #a3193d | angular button label | 7.60 | 4.5 | pass |
| light | `course-ink` #6e4c07 | `bg-soft` #e7eff1 | prg accent text on band | 6.67 | 4.5 | pass |
| light | `course-ink` #6e4c07 | `bg` #f4f8f9 | prg accent text on page | 7.28 | 4.5 | pass |
| light | `course-on` #ffffff | `course` #80590a | prg button label | 6.27 | 4.5 | pass |
| light | `course-ink` #6f5a00 | `bg-soft` #e7eff1 | ajs accent text on band | 5.74 | 4.5 | pass |
| light | `course-ink` #6f5a00 | `bg` #f4f8f9 | ajs accent text on page | 6.26 | 4.5 | pass |
| light | `course-on` #ffffff | `course` #786100 | ajs button label | 5.99 | 4.5 | pass |
| light | `course-ink` #6439b0 | `bg-soft` #e7eff1 | bs accent text on band | 6.54 | 4.5 | pass |
| light | `course-ink` #6439b0 | `bg` #f4f8f9 | bs accent text on page | 7.13 | 4.5 | pass |
| light | `course-on` #ffffff | `course` #6f42c1 | bs button label | 6.51 | 4.5 | pass |
| light | `course-ink` #0b6379 | `bg-soft` #e7eff1 | tw accent text on band | 5.86 | 4.5 | pass |
| light | `course-ink` #0b6379 | `bg` #f4f8f9 | tw accent text on page | 6.39 | 4.5 | pass |
| light | `course-on` #ffffff | `course` #0e7490 | tw button label | 5.36 | 4.5 | pass |
| dark | `course-ink` #ff8f68 | `bg-soft` #0b1927 | html accent text on band | 7.93 | 4.5 | pass |
| dark | `course-ink` #ff8f68 | `bg` #07121c | html accent text on page | 8.43 | 4.5 | pass |
| dark | `course-on` #1f0a03 | `course` #f06a3c | html button label | 6.19 | 4.5 | pass |
| dark | `course-ink` #82b4ff | `bg-soft` #0b1927 | css accent text on band | 8.39 | 4.5 | pass |
| dark | `course-ink` #82b4ff | `bg` #07121c | css accent text on page | 8.92 | 4.5 | pass |
| dark | `course-on` #04142e | `course` #5b9bff | css button label | 6.62 | 4.5 | pass |
| dark | `course-ink` #f7df1e | `bg-soft` #0b1927 | js accent text on band | 13.13 | 4.5 | pass |
| dark | `course-ink` #f7df1e | `bg` #07121c | js accent text on page | 13.96 | 4.5 | pass |
| dark | `course-on` #1c1800 | `course` #f7df1e | js button label | 13.16 | 4.5 | pass |
| dark | `course-ink` #61dafb | `bg-soft` #0b1927 | react accent text on band | 10.93 | 4.5 | pass |
| dark | `course-ink` #61dafb | `bg` #07121c | react accent text on page | 11.62 | 4.5 | pass |
| dark | `course-on` #03222b | `course` #61dafb | react button label | 10.20 | 4.5 | pass |
| dark | `course-ink` #5fd9a0 | `bg-soft` #0b1927 | vue accent text on band | 10.08 | 4.5 | pass |
| dark | `course-ink` #5fd9a0 | `bg` #07121c | vue accent text on page | 10.72 | 4.5 | pass |
| dark | `course-on` #03221a | `course` #42b883 | vue button label | 6.75 | 4.5 | pass |
| dark | `course-ink` #ff8aa5 | `bg-soft` #0b1927 | angular accent text on band | 7.97 | 4.5 | pass |
| dark | `course-ink` #ff8aa5 | `bg` #07121c | angular accent text on page | 8.48 | 4.5 | pass |
| dark | `course-on` #2b0510 | `course` #ee6a8d | angular button label | 6.26 | 4.5 | pass |
| dark | `course-ink` #f0d58a | `bg-soft` #0b1927 | prg accent text on band | 12.34 | 4.5 | pass |
| dark | `course-ink` #f0d58a | `bg` #07121c | prg accent text on page | 13.12 | 4.5 | pass |
| dark | `course-on` #231a00 | `course` #e3b94e | prg button label | 9.28 | 4.5 | pass |
| dark | `course-ink` #f7df1e | `bg-soft` #0b1927 | ajs accent text on band | 13.13 | 4.5 | pass |
| dark | `course-ink` #f7df1e | `bg` #07121c | ajs accent text on page | 13.96 | 4.5 | pass |
| dark | `course-on` #1c1800 | `course` #f7df1e | ajs button label | 13.16 | 4.5 | pass |
| dark | `course-ink` #c2adf5 | `bg-soft` #0b1927 | bs accent text on band | 8.95 | 4.5 | pass |
| dark | `course-ink` #c2adf5 | `bg` #07121c | bs accent text on page | 9.52 | 4.5 | pass |
| dark | `course-on` #1a0b3a | `course` #a98bec | bs button label | 6.58 | 4.5 | pass |
| dark | `course-ink` #67e8f9 | `bg-soft` #0b1927 | tw accent text on band | 12.25 | 4.5 | pass |
| dark | `course-ink` #67e8f9 | `bg` #07121c | tw accent text on page | 13.02 | 4.5 | pass |
| dark | `course-on` #012a33 | `course` #22d3ee | tw button label | 8.42 | 4.5 | pass |
| light | `text` #11273b | `bg` #f4f8f9 | body text on page | 14.26 | 4.5 | pass |
| light | `text` #11273b | `surface` #ffffff | text on surface | 15.25 | 4.5 | pass |
| light | `text-soft` #3f566a | `bg` #f4f8f9 | secondary text | 7.14 | 4.5 | pass |
| light | `text-soft` #3f566a | `bg-soft` #e7eff1 | secondary text on roadmap band | 6.55 | 4.5 | pass |
| light | `text-muted` #52687a | `bg` #f4f8f9 | muted text | 5.43 | 4.5 | pass |
| light | `text-muted` #52687a | `surface` #ffffff | muted text on surface | 5.80 | 4.5 | pass |
| light | `text-muted` #52687a | `bg-soft` #e7eff1 | muted text on roadmap band | 4.98 | 4.5 | pass |
| light | `brand` #097570 | `bg` #f4f8f9 | kicker / accent text | 5.18 | 4.5 | pass |
| light | `brand` #097570 | `bg-soft` #e7eff1 | accent text on band | 4.75 | 4.5 | pass |
| light | `on-brand` #ffffff | `brand` #097570 | primary button label | 5.54 | 4.5 | pass |
| light | `on-brand` #ffffff | `brand-strong` #065c58 | primary button hover label | 7.84 | 4.5 | pass |
| light | `accent` #2a44c8 | `bg` #f4f8f9 | secondary accent text | 7.12 | 4.5 | pass |
| light | `success` #237a3b | `bg` #f4f8f9 | success text | 5.01 | 4.5 | pass |
| light | `warning` #8a5a00 | `bg` #f4f8f9 | warning text | 5.54 | 4.5 | pass |
| light | `danger` #b3261e | `bg` #f4f8f9 | error text | 6.11 | 4.5 | pass |
| light | `blue` #1d5fa8 | `bg` #f4f8f9 | info text | 6.04 | 4.5 | pass |
| light | `border-strong` #b4bdc4 | `bg` #f4f8f9 | border (decorative; see note) | 1.78 | 1.4 | pass |
| light | `brand` #097570 | `bg` #f4f8f9 | focus ring vs page (non-text 3:1) | 5.18 | 3 | pass |
| light | `text` #11273b | `surface-3` #e3ecef | text on pressed/track surface | 12.71 | 4.5 | pass |
| light | `ink-text` #eaf2f7 | `ink` #11273b | ink panel: text | 13.46 | 4.5 | pass |
| light | `ink-soft` #b4c6d3 | `ink` #11273b | ink panel: secondary | 8.68 | 4.5 | pass |
| light | `ink-muted` #8fa6b6 | `ink` #11273b | ink panel: muted | 6.03 | 4.5 | pass |
| light | `ink-accent` #1fd1bf | `ink` #11273b | ink panel: accent text / focus ring | 7.94 | 4.5 | pass |
| light | `ink-on-accent` #04211e | `ink-accent` #1fd1bf | ink panel: button label | 8.80 | 4.5 | pass |
| light | `ink-soft` #b4c6d3 | `ink-2` #0b1c2c | ink panel: text in inset | 9.83 | 4.5 | pass |
| dark | `text` #e8f1f6 | `bg` #07121c | body text on page | 16.49 | 4.5 | pass |
| dark | `text` #e8f1f6 | `surface` #102236 | text on surface | 14.07 | 4.5 | pass |
| dark | `text-soft` #a9bdcb | `bg` #07121c | secondary text | 9.73 | 4.5 | pass |
| dark | `text-soft` #a9bdcb | `bg-soft` #0b1927 | secondary text on roadmap band | 9.16 | 4.5 | pass |
| dark | `text-muted` #7f97a8 | `bg` #07121c | muted text | 6.20 | 4.5 | pass |
| dark | `text-muted` #7f97a8 | `surface` #102236 | muted text on surface | 5.29 | 4.5 | pass |
| dark | `text-muted` #7f97a8 | `bg-soft` #0b1927 | muted text on roadmap band | 5.83 | 4.5 | pass |
| dark | `brand` #1fd1bf | `bg` #07121c | kicker / accent text | 9.83 | 4.5 | pass |
| dark | `brand` #1fd1bf | `bg-soft` #0b1927 | accent text on band | 9.24 | 4.5 | pass |
| dark | `on-brand` #04211e | `brand` #1fd1bf | primary button label | 8.80 | 4.5 | pass |
| dark | `on-brand` #04211e | `brand-strong` #12b3a3 | primary button hover label | 6.45 | 4.5 | pass |
| dark | `accent` #9da9ff | `bg` #07121c | secondary accent text | 8.59 | 4.5 | pass |
| dark | `success` #4ade80 | `bg` #07121c | success text | 10.83 | 4.5 | pass |
| dark | `warning` #f2b84b | `bg` #07121c | warning text | 10.55 | 4.5 | pass |
| dark | `danger` #ff7b86 | `bg` #07121c | error text | 7.58 | 4.5 | pass |
| dark | `blue` #6cc4ff | `bg` #07121c | info text | 9.87 | 4.5 | pass |
| dark | `border-strong` #293e4c | `bg` #07121c | border (decorative; see note) | 1.70 | 1.4 | pass |
| dark | `brand` #1fd1bf | `bg` #07121c | focus ring vs page (non-text 3:1) | 9.83 | 3 | pass |
| dark | `text` #e8f1f6 | `surface-3` #1f3a56 | text on pressed/track surface | 10.20 | 4.5 | pass |
| dark | `ink-text` #eaf2f7 | `ink` #112a41 | ink panel: text | 12.95 | 4.5 | pass |
| dark | `ink-soft` #b4c6d3 | `ink` #112a41 | ink panel: secondary | 8.35 | 4.5 | pass |
| dark | `ink-muted` #8fa6b6 | `ink` #112a41 | ink panel: muted | 5.80 | 4.5 | pass |
| dark | `ink-accent` #1fd1bf | `ink` #112a41 | ink panel: accent text / focus ring | 7.64 | 4.5 | pass |
| dark | `ink-on-accent` #04211e | `ink-accent` #1fd1bf | ink panel: button label | 8.80 | 4.5 | pass |
| dark | `ink-soft` #b4c6d3 | `ink-2` #0a1a29 | ink panel: text in inset | 10.03 | 4.5 | pass |

110 pairs measured, 0 text/UI failures


## Motion rules
Native CSS first. Homepage uses **no GSAP/Lenis/Motion** (removed ≈ 120 KB JS and the TBT it cost); GSAP stays available for a future interaction that needs a timeline. Purposeful motion only: detail panel swap on map selection (opacity+8px, 420 ms), segment lift on hover, progress-bar fill, practice-demo checks ticking in once when the demo scrolls into view. Everything is disabled under `prefers-reduced-motion`; no scroll-jacking, no pinned sections, no parallax.
