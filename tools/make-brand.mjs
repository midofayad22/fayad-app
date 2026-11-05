// Generates the FAYBIT brand SVGs (symbol, wordmark, horizontal logo, per-course accent variants). Run: node tools/make-brand.mjs
import fs from "node:fs";
const OUT = "assets/brand/";
const ACCENTS = { default: "#14B8A6", html: "#F97316", css: "#2563EB", js: "#EAB308", ajs: "#F59E0B", react: "#06B6D4", vue: "#22C55E", angular: "#EF4444", bs: "#7C3AED", tw: "#0EA5E9" };
const mark = (accent, id = "m") => `<defs><linearGradient id="${id}a" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0F766E"/><stop offset="1" stop-color="#0D9488"/></linearGradient><linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0D9488"/><stop offset="1" stop-color="#0B5F59"/></linearGradient></defs>
<path fill="url(#${id}a)" d="M18 22Q18 8 33 8H78L68 24Q66 27 62 27H37Q33 27 30 30L18 43Z"/>
<path fill="url(#${id}b)" d="M18 62 30 46Q33 42 38 42H64Q74 42 74 52Q74 62 64 62H46V80Q46 84 43 86L24 98Q18 101 18 94Z"/>
<path fill="${accent}" stroke="${accent}" stroke-width="3" stroke-linejoin="round" d="M83 41 96 51 83 61Z"/>
<rect x="3" y="41" width="8" height="8" fill="${accent}"/><rect x="0" y="55" width="6" height="6" fill="#0F766E"/><rect x="7" y="69" width="7" height="7" fill="#0D9488"/>`;
const sym = (a, id) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="FAYBIT"><title>FAYBIT</title>${mark(a, id)}</svg>\n`;
fs.writeFileSync(OUT + "faybit-mark.svg", sym(ACCENTS.default, "m"));
for (const [k, a] of Object.entries(ACCENTS)) if (k !== "default") fs.writeFileSync(`${OUT}mark-${k}.svg`, sym(a, k));
const letters = (fill, dot) => `<path fill="${fill}" fill-rule="evenodd" d="M0 0H46V13H15V25H42V37H15V60H0ZM72 0H86L112 60H96L84 31 72 60H56ZM114 0H130L141 20 152 0H168L148 34V60H134V34ZM178 0H210C220 0 226 6 226 14C226 20 223 24 219 26C224 28 228 33 228 41C228 53 220 60 208 60H178ZM192 12V22H206C210 22 212 20 212 17C212 14 210 12 206 12ZM192 36V48H207C212 48 214 45 214 42C214 38 212 36 207 36ZM240 14H254V60H240ZM262 0H312V13H294V60H280V13H262Z"/><path fill="${dot}" d="M240 2 254-3V11L240 16Z"/>`;
fs.writeFileSync(OUT + "faybit-wordmark.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -8 312 70" role="img" aria-label="FAYBIT"><title>FAYBIT</title>${letters("#102A43", "#14B8A6")}</svg>\n`);
fs.writeFileSync(OUT + "faybit-wordmark-light.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -8 312 70" role="img" aria-label="FAYBIT"><title>FAYBIT</title>${letters("#FFFFFF", "#14B8A6")}</svg>\n`);
fs.writeFileSync(OUT + "faybit-logo.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430 100" role="img" aria-label="FAYBIT"><title>FAYBIT</title>${mark(ACCENTS.default, "l")}<g transform="translate(116 28) scale(1.02)">${letters("#102A43", "#14B8A6")}</g></svg>\n`);
fs.writeFileSync(OUT + "faybit-logo-light.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 430 100" role="img" aria-label="FAYBIT"><title>FAYBIT</title>${mark("#2DD4BF", "d")}<g transform="translate(116 28) scale(1.02)">${letters("#FFFFFF", "#2DD4BF")}</g></svg>\n`);
fs.copyFileSync(OUT + "faybit-mark.svg", OUT + "logo-mark.svg"); fs.copyFileSync(OUT + "faybit-mark.svg", "assets/images/favicon.svg");
