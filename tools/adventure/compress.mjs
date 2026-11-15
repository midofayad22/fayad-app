/* Compresses a BFS action string into blocks (repeat / function) — offline generator helper. */
/* ---------------- compression of an action string into blocks ---------------- */
const atom = (c) => (c === "C" ? { op: "call" } : { op: c });
export function compress(seq, allowRepeat) {
  const n = seq.length, memo = new Map();
  function best(i, j) {
    const k = i * 1000 + j; if (memo.has(k)) return memo.get(k);
    let res;
    if (j - i === 1) res = { size: 1, prog: [atom(seq[i])] };
    else {
      res = null;
      for (let m = i + 1; m < j; m++) { const a = best(i, m), b = best(m, j), sz = a.size + b.size; if (!res || sz < res.size) res = { size: sz, prog: [...a.prog, ...b.prog] }; }
      if (allowRepeat) {
        const len = j - i;
        for (let p = 1; p <= len / 2; p++) {
          if (len % p) continue; const times = len / p; if (times < 2 || times > 9) continue;
          const body = seq.slice(i, i + p); let same = true; for (let t = 1; t < times && same; t++) same = seq.slice(i + t * p, i + (t + 1) * p) === body;
          if (!same) continue; const inner = best(i, i + p), sz = 1 + inner.size;
          if (sz < res.size) res = { size: sz, prog: [{ op: "repeat", n: times, body: inner.prog }] };
        }
      }
    }
    memo.set(k, res); return res;
  }
  return best(0, n);
}
export function program(seq, { repeat, fn }) {
  let bestP = compress(seq, repeat); let out = { main: bestP.prog, fn: [] }, size = bestP.size;
  if (fn) {
    const seen = new Set();
    for (let len = 3; len <= Math.min(24, seq.length >> 1); len++) for (let i = 0; i + len <= seq.length; i++) {
      const sub = seq.slice(i, i + len); if (seen.has(sub)) continue; seen.add(sub);
      let main = "", cnt = 0, p = 0; while (p < seq.length) { if (seq.startsWith(sub, p)) { main += "C"; p += len; cnt++; } else main += seq[p++]; }
      if (cnt < 2) continue;
      const m = compress(main, repeat), f = compress(sub, repeat), total = m.size + f.size;
      if (total < size) { size = total; out = { main: m.prog, fn: f.prog }; }
    }
  }
  return out;
}

