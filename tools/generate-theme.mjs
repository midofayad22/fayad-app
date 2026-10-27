// Generates css/theme.css: maps each page's legacy CSS variables onto the shared --fy-* tokens.
// Run:  node tools/generate-theme.mjs        (output is committed; re-run after editing the maps)
import fs from "node:fs";

const mix = (name, pct = 12) => `color-mix(in srgb, var(--fy-${name}) ${pct}%, transparent)`;
const v = (name) => `var(--fy-${name})`;
const T = {
  bg: v("bg"), soft: v("bg-soft"), s1: v("surface"), s2: v("surface-2"), s3: v("surface-3"), glass: v("glass"),
  border: v("border"), borderStrong: v("border-strong"), text: v("text"), textSoft: v("text-soft"), muted: v("text-muted"),
  brand: v("brand"), brandLight: v("brand-light"), brandStrong: v("brand-strong"), gold: v("gold"), goldLight: v("gold-light"),
  goldSoft: v("gold-soft"), danger: v("danger"), success: v("success"), warning: v("warning"), blue: v("blue"),
  course: v("course"), courseInk: v("course-ink"), courseStrong: v("course-strong"), courseSoft: v("course-soft"), courseGlow: v("course-glow"),
  code: v("code-bg"), codeSurf: v("code-surface"), codeBorder: v("code-border"), shadow: v("shadow"), shadowLg: v("shadow-lg"), hover: v("hover"),
  successSoft: mix("success"), dangerSoft: mix("danger"), blueSoft: mix("blue", 10),
};

const maps = {
  home: { "--bg": T.bg, "--bg-soft": T.soft, "--surface": T.s1, "--surface-2": T.s2, "--surface-3": T.s3, "--border": T.border, "--border-strong": T.borderStrong, "--text": T.text, "--text-soft": T.textSoft, "--text-muted": T.muted, "--green": T.brand, "--green-light": T.brandLight, "--green-dark": T.brandStrong, "--gold": T.gold, "--gold-light": T.goldLight, "--danger": T.danger, "--shadow": T.shadowLg },
  about: { "--bg": T.bg, "--bg-secondary": T.soft, "--card": T.glass, "--green": T.brand, "--green-dark": T.brandStrong, "--blue": T.blue, "--gold": T.gold, "--text": T.text, "--muted": T.muted, "--border": T.border },
  html: { "--fayad-bg": T.bg, "--fayad-surface": T.s1, "--fayad-surface-light": T.s2, "--text-primary": T.text, "--text-secondary": T.textSoft, "--text-muted": T.muted, "--border": T.border, "--html-orange": T.course, "--html-orange-light": T.courseInk, "--html-orange-soft": T.courseInk, "--html-orange-dark": T.courseStrong, "--html-glow": T.courseSoft, "--html-glow-strong": T.courseGlow, "--html-yellow": T.warning, "--html-red": T.danger, "--html-success": T.success, "--html-bg": T.bg, "--html-surface": T.s1, "--html-surface-light": T.s2, "--html-code-bg": T.code },
  css: { "--bg-main": T.bg, "--bg-soft": T.soft, "--bg-card": T.glass, "--bg-card-solid": T.s1, "--blue-dark": T.courseStrong, "--blue": T.course, "--blue-light": T.courseInk, "--teal-dark": T.brandStrong, "--teal": T.brand, "--teal-light": T.brandLight, "--gold": T.gold, "--gold-light": T.goldLight, "--text-primary": T.text, "--text-secondary": T.textSoft, "--text-muted": T.muted, "--border": T.border, "--border-strong": T.borderStrong, "--success": T.success, "--success-bg": T.successSoft, "--danger": T.danger, "--danger-bg": T.dangerSoft, "--code-bg": T.code, "--code-bg-soft": T.codeSurf, "--shadow-sm": T.shadow, "--shadow": T.shadow, "--shadow-hover": T.shadowLg, "--shadow-colored": T.shadowLg },
  js: { "--js-yellow": T.course, "--js-yellow-light": T.courseInk, "--js-yellow-dark": T.courseStrong, "--bg-main": T.bg, "--bg-secondary": T.soft, "--bg-tertiary": T.s2, "--accent": T.course, "--accent-light": T.courseInk, "--accent-dark": T.courseStrong, "--text-primary": T.text, "--text-secondary": T.textSoft, "--text-muted": T.muted, "--border": T.border, "--border-light": T.border, "--card-bg": T.s1, "--code-bg": T.code, "--success": T.success, "--success-bg": T.successSoft, "--danger": T.danger, "--danger-bg": T.dangerSoft },
  react: { "--primary": T.course, "--primary-dark": T.courseStrong, "--primary-deep": T.courseStrong, "--bg": T.bg, "--surface": T.s1, "--surface-soft": T.s2, "--surface-hover": T.s3, "--text": T.text, "--text-soft": T.textSoft, "--muted": T.muted, "--border": T.border, "--border-strong": T.borderStrong, "--success": T.success, "--success-soft": T.successSoft, "--danger": T.danger, "--danger-soft": T.dangerSoft, "--dark": T.code, "--dark-soft": T.codeSurf, "--dark-border": T.codeBorder, "--shadow-sm": T.shadow, "--shadow": T.shadow, "--shadow-lg": T.shadowLg },
  vue: { "--bg-main": T.bg, "--bg-sidebar": T.soft, "--bg-card": T.s1, "--bg-card-2": T.s2, "--border": T.border, "--border-light": T.borderStrong, "--text": T.text, "--text-secondary": T.textSoft, "--text-muted": T.muted, "--accent": T.course, "--accent-dark": T.courseStrong, "--accent-light": T.courseInk, "--danger": T.danger, "--success": T.success, "--warning": T.warning },
  angular: { "--primary": T.course, "--primary-dark": T.courseStrong, "--primary-deep": T.courseStrong, "--primary-soft": T.courseSoft, "--primary-soft-strong": T.courseSoft, "--primary-glow": T.courseGlow, "--bg": T.bg, "--bg-soft": T.soft, "--surface": T.s1, "--surface-soft": T.s2, "--surface-hover": T.s3, "--text": T.text, "--text-soft": T.textSoft, "--muted": T.muted, "--muted-light": T.muted, "--border": T.border, "--border-dark": T.borderStrong, "--success": T.success, "--success-soft": T.successSoft, "--danger": T.danger, "--danger-soft": T.dangerSoft, "--dark": T.code, "--dark-soft": T.codeSurf, "--dark-border": T.codeBorder, "--shadow-xs": T.shadow, "--shadow-sm": T.shadow, "--shadow": T.shadow, "--shadow-lg": T.shadowLg },
  login: { "--auth-bg": T.bg, "--auth-green": T.brand, "--auth-green-light": T.brandLight, "--auth-green-dark": T.brandStrong, "--auth-gold": T.gold, "--auth-text": T.text, "--auth-muted": T.muted, "--auth-soft": T.muted, "--auth-border": T.border },
  com: { "--bg-color": T.bg, "--bg-secondary": T.soft, "--card-bg": T.s1, "--card-hover": T.s2, "--accent-color": T.course, "--accent-hover": T.courseStrong, "--accent-soft": T.courseSoft, "--text-main": T.text, "--text-muted": T.muted, "--text-soft": T.textSoft, "--border-color": T.border, "--danger": T.danger, "--warning": T.warning, "--shadow": T.shadowLg },
  prg: { "--bg-main": T.bg, "--bg-deep": T.bg, "--bg-secondary": T.soft, "--bg-card": T.s1, "--bg-card-hover": T.s2, "--surface": T.s1, "--surface-light": T.s2, "--surface-soft": T.hover, "--accent": T.course, "--accent-dark": T.courseStrong, "--accent-deep": T.courseStrong, "--accent-light": T.courseInk, "--accent-soft": T.courseSoft, "--accent-border": T.courseGlow, "--accent-glow": T.courseGlow, "--gold": T.gold, "--gold-soft": T.goldSoft, "--success": T.success, "--success-soft": T.successSoft, "--blue": T.blue, "--blue-soft": T.blueSoft, "--text-main": T.text, "--text-soft": T.textSoft, "--text-muted": T.muted, "--text-dark": T.muted, "--border": T.border, "--border-strong": T.borderStrong, "--shadow": T.shadowLg, "--shadow-red": T.shadowLg },
};

// Dark "islands": containers that stay dark in the light theme (code panels). Inside them every token is
// re-declared with its dark value, and the page's legacy variables are re-mapped, so text/borders resolve dark-theme.
const ISLANDS = {
  home: ".code-window",
  about: ".developer-card",
  html: ".example-card, .editor-panel",
  css: ".example-card, .editor-panel",
  js: ".example-card, #jsEditor, .practice-output",
  vue: ".example-card, .editor-top, .preview-top, .content-card code, #code-editor",
  react: ".example-card",
  angular: ".example-card",
  prg: ".code-block, .editor-wrapper",
};
// Light islands: preview/result panes that stay light in the dark theme (they imitate a browser viewport).
const LIGHT_ISLANDS = {
  html: ".result-preview, .preview-panel",
  css: ".result-card, .preview-panel",
  vue: ".result-preview, .preview-panel",
  react: "#reactResult, .practice-output",
  angular: "#angularResult, .practice-output",
};
const tokens = fs.readFileSync(new URL("../css/tokens.css", import.meta.url), "utf8");
const darkBlock = tokens.match(/html\[data-theme="dark"\] \{([\s\S]*?)\n\}/)[1].split("\n").filter((l) => l.trim() && !l.includes("color-scheme")).join("\n");
const defaultCourse = tokens.match(/html\[data-track\] \{([\s\S]*?)\n\}/)[1].split("\n").filter((l) => l.trim()).join("\n");
const lightBlock = tokens.match(/html\[data-theme="light"\] \{([\s\S]*?)\n\}/)[1].split("\n").filter((l) => l.trim() && !l.includes("color-scheme")).join("\n");
const lightCourse = (track) => { const m = tokens.match(new RegExp(`html\\[data-theme="light"\\]\\[data-track="${track}"\\] \\{([^}]*)\\}`)); return m ? m[1].trim().split(";").filter((x) => x.trim()).map((x) => `  ${x.trim()};`).join("\n") : ""; };
const darkCourse = (track) => { const m = tokens.match(new RegExp(`html\\[data-theme="dark"\\]\\[data-track="${track}"\\] \\{([^}]*)\\}`)); return m ? m[1].trim().split(";").filter((x) => x.trim()).map((x) => `  ${x.trim()};`).join("\n") : ""; };

let css = `/* GENERATED by tools/generate-theme.mjs — do not edit by hand.
   Maps each page's legacy variables onto the shared --fy-* tokens (css/tokens.css), so one
   data-theme switch re-skins every page. Page-specific fixes live in css/theme-overrides.css. */\n\n`;
for (const [track, vars] of Object.entries(maps)) {
  const legacy = Object.entries(vars).map(([k, val]) => `  ${k}: ${val};`).join("\n");
  css += `html[data-track="${track}"] {\n${legacy}\n}\n\n`;
  if (ISLANDS[track]) {
    css += `/* dark island: code panels stay dark in the light theme */\nhtml[data-theme="light"][data-track="${track}"] :is(${ISLANDS[track]}) {\n  color-scheme: dark;\n${darkBlock}\n${defaultCourse}\n${darkCourse(track)}\n${legacy}\n  color: var(--fy-text);\n}\n\n`;
  }
  if (LIGHT_ISLANDS[track]) {
    css += `/* light island: preview/result panes stay light in the dark theme */\nhtml[data-theme="dark"][data-track="${track}"] :is(${LIGHT_ISLANDS[track]}) {\n  color-scheme: light;\n${lightBlock}\n${defaultCourse}\n${lightCourse(track)}\n${legacy}\n  color: var(--fy-text);\n}\n\n`;
  }
}
css += `/* base */
html[data-track] body {
  background-color: var(--fy-bg);
  color: var(--fy-text);
}
html[lang="en"][data-track] body { font-family: var(--fy-font-en); }
html[lang="ar"][data-track] body { font-family: var(--fy-font-ar); }
`;
fs.writeFileSync(new URL("../css/theme.css", import.meta.url), css);
console.log("wrote css/theme.css", css.length, "bytes");
