/* Shared game kit: motion helpers, confetti, count-up and a pointer-based drag helper that works with mouse, pen and touch. No dependencies. */
export const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export function confetti(host, n = 34, colors = ["#14b8a6", "#f59e0b", "#6366f1", "#ef4444", "#22c55e", "#ec4899"]) {
  if (reduced() || !host) return;
  const box = document.createElement("div"); box.className = "gk-confetti"; box.setAttribute("aria-hidden", "true");
  for (let i = 0; i < n; i++) {
    const s = document.createElement("i"), a = Math.random() * Math.PI * 2, d = 90 + Math.random() * 190;
    s.style.cssText = `--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d - 110}px;--r:${Math.random() * 720 - 360}deg;--c:${colors[i % colors.length]};animation-delay:${Math.random() * 120}ms`;
    box.appendChild(s);
  }
  host.appendChild(box); setTimeout(() => box.remove(), 1900);
}
export function countUp(el, to, ms = 700) {
  if (reduced() || to <= 0) { el.textContent = to; return; }
  const t0 = performance.now();
  const f = (t) => { const k = Math.min(1, (t - t0) / ms); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); };
  requestAnimationFrame(f);
}
/** Brief pulse of a class (restarts the CSS animation if it is already playing). */
export function pulse(el, cls, ms = 600) { if (!el) return; el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); setTimeout(() => el.classList.remove(cls), ms); }

/**
 * armDrag(el, begin): pointer-drag with a movement threshold so plain taps still produce a normal click.
 *  begin(ev) -> null (do not drag) or { ghost: HTMLElement, move(x, y), drop(x, y) , cancel() }.
 *  The element should have touch-action:none (CSS) so touch scrolling does not steal the gesture.
 */
export function armDrag(el, begin, threshold = 7) {
  el.addEventListener("pointerdown", (e) => {
    if (e.button > 0 || e.target.closest("select,input,[data-nodrag]")) return;
    const sx = e.clientX, sy = e.clientY; let cfg = null, ghost = null;
    const onMove = (m) => {
      if (!cfg) {
        if (Math.hypot(m.clientX - sx, m.clientY - sy) < threshold) return;
        cfg = begin(e); if (!cfg) return cleanup();
        ghost = cfg.ghost; ghost.classList.add("gk-ghost"); document.body.appendChild(ghost); document.body.classList.add("gk-dragging");
      }
      m.preventDefault(); ghost.style.transform = `translate(${m.clientX + 8}px, ${m.clientY + 8}px)`; cfg.move(m.clientX, m.clientY);
    };
    const end = (m) => { const was = cfg; cleanup(); if (was) { suppress = true; setTimeout(() => (suppress = false), 0); was.drop(m.clientX, m.clientY); } };
    const abort = () => { const was = cfg; cleanup(); was?.cancel?.(); };
    const key = (k) => { if (k.key === "Escape") abort(); };
    function cleanup() {
      document.removeEventListener("pointermove", onMove); document.removeEventListener("pointerup", end); document.removeEventListener("pointercancel", abort); document.removeEventListener("keydown", key);
      ghost?.remove(); document.body.classList.remove("gk-dragging"); cfg = null;
    }
    document.addEventListener("pointermove", onMove, { passive: false }); document.addEventListener("pointerup", end); document.addEventListener("pointercancel", abort); document.addEventListener("keydown", key);
  });
  let suppress = false;
  el.addEventListener("click", (e) => { if (suppress) { e.stopImmediatePropagation(); e.preventDefault(); } }, true);
}
