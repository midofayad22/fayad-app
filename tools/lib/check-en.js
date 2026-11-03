// Structural checks for an English translation of Arabic lesson text (shared by tools/check-en.mjs and the tests).
const AR = /[؀-ۿ]/;
const blocks = (s) => [...s.matchAll(/<(code|pre)\b[^>]*>[\s\S]*?<\/\1>/gi)].map((m) => m[0]);
const sameCode = (ar, en) => { const a = blocks(ar), e = blocks(en); return a.length === e.length && a.every((b, i) => AR.test(b) || b === e[i]); };
// human-readable attribute values (placeholder, title, alt, aria-label) may be translated, so they are blanked before comparing
const tags = (s) => [...s.matchAll(/<\/?[a-zA-Z][^>]*>/g)].map((m) => m[0].replace(/\b(placeholder|title|alt|aria-label|value)=("[^"]*"|'[^']*')/gi, "$1=\"\""));
const mustache = (s) => [...s.matchAll(/\{\{[\s\S]*?\}\}/g)].map((m) => m[0]);

/** @returns {string[]} problems for one text pair */
export function checkPair(ar, en) {
  const p = [];
  if (typeof en !== "string" || !en.trim()) return ["missing or empty"];
  if (JSON.stringify(tags(ar)) !== JSON.stringify(tags(en))) p.push("HTML tags differ (same tags, attributes and order are required)");
  if (!sameCode(ar, en)) p.push("<code>/<pre> content must be copied unchanged");
  if (JSON.stringify(mustache(ar)) !== JSON.stringify(mustache(en))) p.push("{{ }} expressions differ");
  const prose = en.replace(/<(code|pre)\b[^>]*>[\s\S]*?<\/\1>/gi, "");
  if (AR.test(prose)) p.push("Arabic characters left outside <code>/<pre>");
  // a translation that is byte-identical to a long Arabic source was not translated
  return p;
}

/** @returns {string[]} problems for a whole worksheet */
export function checkWorksheet(arMap, enMap) {
  const out = [];
  for (const [k, ar] of Object.entries(arMap)) for (const msg of checkPair(ar, enMap[k])) out.push(`${k}: ${msg}`);
  for (const k of Object.keys(enMap)) if (!(k in arMap)) out.push(`${k}: unknown key`);
  return out;
}
