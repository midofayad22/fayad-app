// Computes WCAG contrast for the real token values in css/tokens.css + css/home.css (ink surfaces). Usage: node tools/contrast-report.mjs [--md]
import fs from "node:fs";
const css = fs.readFileSync("css/tokens.css", "utf8") + "\n" + fs.readFileSync("css/home.css", "utf8");
const block = (sel) => { const i = css.indexOf(sel); const j = css.indexOf("}", i); return css.slice(i, j); };
const vars = (b) => Object.fromEntries([...b.matchAll(/--([\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const themes = { light: { ...vars(block('html[data-theme="light"] {')), ...vars(block(":root { --ink")) }, dark: { ...vars(block('html[data-theme="dark"] {')), ...vars(block(":root { --ink")), ...vars(block('html[data-theme="dark"] { --ink')) } };
const hex = (v) => { v = v.trim(); return /^#[0-9a-f]{6}$/i.test(v) ? v : null; };
const lum = (h) => { const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const cr = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
// alpha colours (borders) are composited over the page background
const over = (rgba, bg) => { const m = rgba.match(/rgba\(([\d.]+),\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)\)/); if (!m) return hex(rgba); const a = +m[4], b = [1, 3, 5].map((i) => parseInt(bg.slice(i, i + 2), 16)); const o = [m[1], m[2], m[3]].map((v, i) => Math.round(+v * a + b[i] * (1 - a))); return "#" + o.map((n) => n.toString(16).padStart(2, "0")).join(""); };
const pairs = [
  ["text", "bg", 4.5, "body text on page"], ["text", "surface", 4.5, "text on surface"], ["text-soft", "bg", 4.5, "secondary text"], ["text-soft", "bg-soft", 4.5, "secondary text on roadmap band"], ["text-muted", "bg", 4.5, "muted text"], ["text-muted", "surface", 4.5, "muted text on surface"], ["text-muted", "bg-soft", 4.5, "muted text on roadmap band"],
  ["brand", "bg", 4.5, "kicker / accent text"], ["brand", "bg-soft", 4.5, "accent text on band"], ["on-brand", "brand", 4.5, "primary button label"], ["on-brand", "brand-strong", 4.5, "primary button hover label"],
  ["accent", "bg", 4.5, "secondary accent text"], ["success", "bg", 4.5, "success text"], ["warning", "bg", 4.5, "warning text"], ["danger", "bg", 4.5, "error text"], ["blue", "bg", 4.5, "info text"],
  ["border-strong", "bg", 1.4, "border (decorative; see note)"], ["brand", "bg", 3, "focus ring vs page (non-text 3:1)"], ["text", "surface-3", 4.5, "text on pressed/track surface"],
  ["ink-text", "ink", 4.5, "ink panel: text"], ["ink-soft", "ink", 4.5, "ink panel: secondary"], ["ink-muted", "ink", 4.5, "ink panel: muted"], ["ink-accent", "ink", 4.5, "ink panel: accent text / focus ring"], ["ink-on-accent", "ink-accent", 4.5, "ink panel: button label"], ["ink-soft", "ink-2", 4.5, "ink panel: text in inset"],
];
const rows = []; let fails = 0;
// per-track accents: ink text on page/band, button label on fill
for (const th of ["light", "dark"]) for (const m of css.matchAll(new RegExp(`html\\[data-theme="${th}"\\] \\[data-course="(\\w+)"\\]\\s*\\{([^}]*)\\}`, "g"))) {
  const cv = vars(m[2]), v = themes[th];
  for (const [fg, bg, min, what] of [["fy-course-ink", "fy-bg-soft", 4.5, `${m[1]} accent text on band`], ["fy-course-ink", "fy-bg", 4.5, `${m[1]} accent text on page`], ["fy-course-on", "fy-course", 4.5, `${m[1]} button label`]]) {
    const f = hex(cv[fg]), b = hex(cv[bg] || v[bg]); if (!f || !b) continue; const r = cr(f, b), ok = r >= min; if (!ok) fails++;
    rows.push({ th, fg: fg.replace("fy-", ""), bg: bg.replace("fy-", ""), what, fgHex: f, bgHex: b, r: r.toFixed(2), min, ok });
  }
}
for (const [th, v] of Object.entries(themes)) for (const [fg, bg, min, what] of pairs) {
  const bgHex = hex(v[`fy-${bg}`] || v[bg] || ""), fgRaw = v[`fy-${fg}`] || v[fg]; if (!bgHex || !fgRaw) continue;
  const fgHex = fg.startsWith("border") ? over(fgRaw, bgHex) : hex(fgRaw); if (!fgHex) continue;
  const r = cr(fgHex, bgHex); const ok = r >= min; if (!ok && !what.startsWith("border")) fails++;
  rows.push({ th, fg, bg, what, fgHex, bgHex, r: r.toFixed(2), min, ok });
}
if (process.argv.includes("--md")) { console.log("| Theme | Foreground | Background | Use | Ratio | Needs | Result |\n|---|---|---|---|---|---|---|"); for (const r of rows) console.log(`| ${r.th} | \`${r.fg}\` ${r.fgHex} | \`${r.bg}\` ${r.bgHex} | ${r.what} | ${r.r} | ${r.min} | ${r.ok ? "pass" : "FAIL"} |`); }
else for (const r of rows) if (!r.ok) console.log("FAIL", r.th, r.fg, "on", r.bg, r.r, "<", r.min, r.what);
console.log(`\n${rows.length} pairs measured, ${fails} text/UI failures`); process.exit(fails ? 1 : 0);
