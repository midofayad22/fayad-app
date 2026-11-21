/*
  A Flex Quest board: a sandboxed iframe (srcdoc, sandbox="allow-scripts", opaque origin, CSP that blocks every network load) that renders the dock and
  applies the learner's CSS. The learner writes CSS only — no JavaScript of theirs ever runs. The iframe's own trusted script receives the CSS by
  postMessage, slides the crates to their new places (FLIP animation, skipped for prefers-reduced-motion) and reports every crate's size and position.
*/
import { boardHtml, baseCss } from "./levels.js";

const SCRIPT = `
(function () {
  var st = document.getElementById("u"), crates = [].slice.call(document.querySelectorAll(".crate")), dock = document.querySelector(".dock");
  var calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function rects() { var d = dock.getBoundingClientRect(); return crates.map(function (c) { var r = c.getBoundingClientRect(); return [r.left - d.left, r.top - d.top, r.width, r.height]; }); }
  addEventListener("message", function (e) {
    if (e.source !== parent) return; var m = e.data || {};
    if (m.t === "css") {
      var before = crates.map(function (c) { return c.getBoundingClientRect(); });
      st.textContent = String(m.css || "");
      if (m.animate && !calm) crates.forEach(function (c, i) { var a = before[i], b = c.getBoundingClientRect(), dx = a.left - b.left, dy = a.top - b.top; if (Math.abs(dx) + Math.abs(dy) > 1) c.animate([{ transform: "translate(" + dx + "px," + dy + "px)" }, { transform: "none" }], { duration: 280, easing: "cubic-bezier(.2,.8,.2,1)" }); });
      parent.postMessage({ t: "rects", id: m.id, r: rects() }, "*");
    } else if (m.t === "mark") {
      crates.forEach(function (c, i) { c.classList.toggle("ok", !!(m.ok && m.ok[i])); });
    } else if (m.t === "win") { dock.classList.add("won"); setTimeout(function () { dock.classList.remove("won"); }, 900); }
  });
  parent.postMessage({ t: "ready" }, "*");
})();`;

const FRAME_CSS = `.crate{transition:box-shadow .2s ease,outline-color .2s ease;outline:3px solid transparent;outline-offset:2px}.crate.ok{outline-color:#4ade80}.dock.won{animation:won .9s ease}@keyframes won{40%{box-shadow:0 0 0 4px rgba(74,222,128,.55),0 0 28px rgba(74,222,128,.45)}}@media(prefers-reduced-motion:reduce){.dock.won{animation:none}}`;

export function makeBoard(host, level, { label = "" } = {}) {
  const frame = document.createElement("iframe");
  frame.setAttribute("sandbox", "allow-scripts"); frame.setAttribute("title", label); frame.setAttribute("scrolling", "no"); frame.className = "fq-frame";
  frame.srcdoc = `<!doctype html><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'"><style>${baseCss(level)}${FRAME_CSS}</style><style id="u"></style><body>${boardHtml(level)}<script>${SCRIPT}<\/script>`;
  host.textContent = ""; host.appendChild(frame);
  let ready = false, seq = 0; const waiters = new Map(); const queue = [];
  const onMsg = (e) => {
    if (e.source !== frame.contentWindow) return; const m = e.data || {};
    if (m.t === "ready") { ready = true; queue.splice(0).forEach((f) => f()); }
    else if (m.t === "rects") { const w = waiters.get(m.id); if (w) { waiters.delete(m.id); w(m.r); } }
  };
  window.addEventListener("message", onMsg);
  const post = (m) => { const go = () => frame.contentWindow.postMessage(m, "*"); ready ? go() : queue.push(go); };
  return {
    frame,
    /** Applies CSS and resolves with every crate's [x, y, w, h] relative to the dock. */
    setCss(css, animate = true) {
      const id = ++seq; return new Promise((res) => {
        const t = setTimeout(() => { waiters.delete(id); res(null); }, 3000);
        waiters.set(id, (r) => { clearTimeout(t); res(r); }); post({ t: "css", css: String(css).replace(/@import[^;]*;?/gi, ""), id, animate });
      });
    },
    mark(ok) { post({ t: "mark", ok }); }, win() { post({ t: "win" }); },
    destroy() { window.removeEventListener("message", onMsg); frame.remove(); },
  };
}

/** Per-crate comparison of two rect lists (size and position, 1.5px tolerance). */
export function compare(mine, target) {
  if (!mine || !target || mine.length !== target.length) return { ok: [], all: false };
  const ok = mine.map((r, i) => r.every((v, k) => Math.abs(v - target[i][k]) <= 1.5));
  return { ok, all: ok.every(Boolean) };
}
