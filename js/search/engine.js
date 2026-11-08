// FAYBIT search engine: pure ES module (browser + Node tests). No network, no dependencies.
// Arabic/English normalisation, light stemming, concept (synonym) matching, prefix + fuzzy matching and field-weighted ranking.
import { SYNONYMS } from "./synonyms.js";

const AR_DIACRITICS = /[ً-ٰٟۖ-ۭ]/g;
const AR_INDIC = { "٠": "0", "١": "1", "٢": "2", "٣": "3", "٤": "4", "٥": "5", "٦": "6", "٧": "7", "٨": "8", "٩": "9", "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4", "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9" };
const HAS_AR = /[؀-ۿ]/;
const AR_PREFIXES = ["وبال", "وال", "بال", "كال", "فال", "لل", "ال"];
const AR_SUFFIXES = ["ات", "ون", "ين", "ان", "ها", "ه"];
const STOP = new Set(["في", "من", "على", "عن", "الى", "الي", "ما", "ماذا", "هو", "هي", "هذا", "هذه", "و", "او", "مع", "كيف", "لماذا", "ما هو", "ما هي",
  "in", "of", "the", "a", "an", "to", "for", "and", "or", "with", "how", "what", "is", "are", "on", "at", "by", "do", "does", "my", "about", "using", "use"]);

/** fold spelling variants so that أ/إ/آ, ى/ي, ة/ه, diacritics and digits compare equal; lowercase Latin */
export function normalize(s) {
  return String(s ?? "").normalize("NFC").replace(AR_DIACRITICS, "").replace(/ـ/g, "")
    .replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/ؤ/g, "و").replace(/ئ/g, "ي").replace(/ک/g, "ك").replace(/ی/g, "ي")
    .replace(/[٠-٩۰-۹]/g, (d) => AR_INDIC[d]).toLowerCase();
}
const WORD = /[\p{L}\p{N}]+/gu;
const words = (s) => normalize(s).match(WORD) || [];

/** light stemmer: strips the Arabic article/prefixes and common plural endings, English plurals and -ing/-ed; short words are left alone */
export function stem(w) {
  if (w.length <= 3 || /\d/.test(w)) return w;
  if (HAS_AR.test(w)) {
    let t = w;
    for (const p of AR_PREFIXES) if (t.startsWith(p) && t.length - p.length >= 3) { t = t.slice(p.length); break; }
    for (const x of AR_SUFFIXES) if (t.endsWith(x) && t.length - x.length >= 3) { t = t.slice(0, -x.length); break; }
    return t;
  }
  if (w.endsWith("ies") && w.length > 4) return w.slice(0, -3) + "y";
  if (w.endsWith("ing") && w.length > 5) return w.slice(0, -3);
  if (w.endsWith("ed") && w.length > 4) return w.slice(0, -2);
  if (w.endsWith("es") && w.length > 4 && /(x|ch|sh|ss|s)es$/.test(w)) return w.slice(0, -2);
  if (w.endsWith("s") && !/(ss|us|is)$/.test(w)) return w.slice(0, -1);
  return w;
}
export const tokenize = (s) => words(s).map(stem);

/** Damerau-Levenshtein distance with an early exit (returns max+1 when above max) */
export function editDistance(a, b, max = 2) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev2 = null, prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i]; let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (prev2 && i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev2[j - 2] + 1);
      cur[j] = v; if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
    prev2 = prev; prev = cur;
  }
  return prev[b.length];
}
const maxEdits = (len) => (len >= 8 ? 2 : len >= 4 ? 1 : 0);

// ---- concept lexicon -------------------------------------------------------------------------------------------------
function buildLexicon(rows) {
  const phrases = new Map(); // normalised stemmed phrase -> Set(conceptId)
  const single = new Map();  // stemmed word -> Set(conceptId)
  rows.forEach((row, id) => {
    for (const p of row) {
      const toks = tokenize(p); if (!toks.length) continue;
      const key = toks.join(" ");
      (phrases.get(key) || phrases.set(key, new Set()).get(key)).add(id);
      if (toks.length === 1) (single.get(key) || single.set(key, new Set()).get(key)).add(id);
    }
  });
  const maxLen = Math.max(...[...phrases.keys()].map((k) => k.split(" ").length));
  return { phrases, single, maxLen };
}
/** concept ids whose phrase appears in the token list (longest phrases first, any position) */
function conceptsIn(tokens, lex) {
  const out = new Set();
  for (let i = 0; i < tokens.length; i++) for (let n = Math.min(lex.maxLen, tokens.length - i); n >= 1; n--) {
    const ids = lex.phrases.get(tokens.slice(i, i + n).join(" "));
    if (ids) { ids.forEach((c) => out.add(c)); i += n - 1; break; } // longest phrase wins and consumes its words ("معالجة الأخطاء" is not the CPU)
  }
  return out;
}

// ---- index -----------------------------------------------------------------------------------------------------------
const FIELD_WEIGHT = { title: 1, kw: 0.8, track: 0.55, heads: 0.6, desc: 0.4, body: 0.22 };
const TYPE_PRIOR = { course: 1.25, module: 1.0, lesson: 1.05, topic: 0.95, exercise: 0.9, game: 1.0, page: 0.85 };
const L2 = ["ar", "en"];

export function createSearch(index, { synonyms = SYNONYMS } = {}) {
  const lex = buildLexicon(synonyms);
  const vocab = new Map(); // stemmed word -> display word (from titles / keywords) for did-you-mean and completion
  const docs = index.docs.map((d) => {
    const f = {};
    const text = (k) => L2.map((l) => (d[k] && d[k][l]) || "").join(" ");
    f.title = tokenize(text("title")); f.kw = tokenize(text("terms")); f.heads = tokenize(text("heads")); f.desc = tokenize(text("desc")); f.body = tokenize(text("body"));
    f.track = tokenize(`${d.track || ""} ${text("track")}`);
    const concepts = conceptsIn(f.title, lex), weakConcepts = conceptsIn([...f.kw, ...f.heads, ...f.desc], lex);
    const titleNorm = L2.map((l) => tokenize((d.title && d.title[l]) || "").join(" ")).filter(Boolean);
    for (const l of L2) for (const w of ((d.title && d.title[l]) || "").split(/[^\p{L}\p{N}+#.]+/u)) { const s = stem(normalize(w)); if (s.length >= 3 && !vocab.has(s)) vocab.set(s, w); }
    return { d, f, concepts, weakConcepts, titleNorm, sets: Object.fromEntries(Object.entries(f).map(([k, v]) => [k, new Set(v)])) };
  });
  const vocabList = [...vocab.keys()];

  const fieldHit = (rec, tok, isLast) => {
    let best = 0;
    for (const field of Object.keys(FIELD_WEIGHT)) {
      const w = FIELD_WEIGHT[field], list = rec.f[field]; if (!list.length) continue;
      let kind = 0;
      if (rec.sets[field].has(tok)) kind = 1;
      else {
        const minPrefix = isLast ? 1 : 3;
        if (tok.length >= minPrefix) for (const t of list) if (t.length > tok.length && t.startsWith(tok)) { kind = 0.8; break; }
        if (!kind && maxEdits(tok.length) && field !== "body") for (const t of list) if (t[0] === tok[0] && Math.abs(t.length - tok.length) <= 2 && editDistance(tok, t, maxEdits(tok.length)) <= maxEdits(tok.length)) { kind = 0.55; break; }
      }
      if (kind * w > best) best = kind * w;
    }
    return best;
  };

  function parse(query) {
    const all = tokenize(query);
    let toks = all.filter((t) => !STOP.has(t));
    if (!toks.length) toks = all;
    return { all, toks, concepts: conceptsIn(all, lex), qnorm: normalize(query).trim() };
  }

  function search(query, { limit = 12, types = null, lang = "ar" } = {}) {
    const q = parse(query);
    if (!q.toks.length) return [];
    const out = [], partial = [];
    for (const rec of docs) {
      if (types && !types.includes(rec.d.type)) continue;
      let sum = 0, matched = 0, conceptScore = 0;
      for (const c of q.concepts) if (rec.concepts.has(c)) conceptScore = Math.max(conceptScore, 0.95); else if (rec.weakConcepts.has(c)) conceptScore = Math.max(conceptScore, 0.5);
      const tokScores = q.toks.map((t, i) => fieldHit(rec, t, i === q.toks.length - 1));
      // a token that is part of a concept phrase is satisfied when the document carries that concept
      const conceptTokens = new Set(); if (conceptScore) for (const c of q.concepts) if (rec.concepts.has(c) || rec.weakConcepts.has(c)) q.toks.forEach((t, i) => { if (lex.single.get(t)?.has(c) || [...lex.phrases].some(([k, ids]) => ids.has(c) && k.split(" ").includes(t))) conceptTokens.add(i); });
      q.toks.forEach((t, i) => { const s = Math.max(tokScores[i], conceptTokens.has(i) ? conceptScore * 0.9 : 0); if (s > 0) { sum += s; matched++; } });
      if (matched < q.toks.length) { if (matched) partial.push({ rec, sum, matched }); continue; } // every meaningful word must match somewhere (AND)
      let score = sum / q.toks.length;
      if (conceptScore >= 0.95) score += 1.0; // the document is *about* the concept the query names (cross-language synonym)
      const qn = q.all.join(" ");
      if (qn && rec.titleNorm.some((t) => t === qn)) score += 1.2;
      else if (qn && rec.titleNorm.some((t) => t.startsWith(qn + " "))) score += 0.6;
      else if (qn && rec.titleNorm.some((t) => (" " + t + " ").includes(" " + qn + " "))) score += 0.35;
      if (q.toks.every((t) => rec.sets.title.has(t))) score += 0.35;
      score *= TYPE_PRIOR[rec.d.type] || 1;
      out.push({ doc: rec.d, score, lang });
    }
    if (out.length < 6 && q.toks.length > 1) // too few exact answers: also offer documents that match some of the words, ranked below
      for (const { rec, sum, matched } of partial) out.push({ doc: rec.d, score: (sum / q.toks.length) * 0.55 * (TYPE_PRIOR[rec.d.type] || 1), lang, partial: true });
    out.sort((a, b) => b.score - a.score || (a.doc.title?.[lang] || "").length - (b.doc.title?.[lang] || "").length || a.doc.id.localeCompare(b.doc.id));
    return out.slice(0, limit);
  }

  /** closest known words for a query that found nothing ("javscript" -> "javascript") */
  function didYouMean(query, n = 3) {
    const res = [];
    for (const t of parse(query).toks) {
      if (t.length < 3) continue;
      let best = null, bd = 99;
      for (const v of vocabList) { if (v[0] !== t[0] && t.length > 3) continue; const d = editDistance(t, v, 3); if (d < bd && d > 0) { bd = d; best = v; } }
      if (best && bd <= (t.length >= 7 ? 3 : 2)) res.push(vocab.get(best));
    }
    return [...new Set(res)].slice(0, n);
  }

  /** split text into {text, hit} runs; a word is hit when it equals/prefixes a query word or shares a concept with the query */
  function highlight(text, query) {
    const q = parse(query), out = []; if (!q.toks.length) return [{ text: String(text), hit: false }];
    const qConcepts = q.concepts;
    const re = /[\p{L}\p{N}]+/gu; let last = 0, m; const s = String(text);
    const isHit = (word) => {
      const w = stem(normalize(word)); if (!w) return false;
      for (const t of q.toks) {
        if (w === t || (t.length >= 1 && w.startsWith(t) && w.length > t.length) || (maxEdits(t.length) && t.length >= 5 && editDistance(t, w, 1) <= 1)) return true;
      }
      if (qConcepts.size) { const ids = lex.single.get(w); if (ids) for (const c of ids) if (qConcepts.has(c)) return true; }
      return false;
    };
    while ((m = re.exec(s))) {
      if (!isHit(m[0])) continue;
      if (m.index > last) out.push({ text: s.slice(last, m.index), hit: false });
      out.push({ text: m[0], hit: true }); last = m.index + m[0].length;
    }
    if (last < s.length) out.push({ text: s.slice(last), hit: false });
    return out.length ? out : [{ text: s, hit: false }];
  }

  const docsOf = (types) => docs.filter((r) => types.includes(r.d.type)).map((r) => r.d);
  return { search, didYouMean, highlight, parse, docsOf, size: docs.length };
}
