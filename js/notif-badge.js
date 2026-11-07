/* Signed-in only: asks the server to generate due notifications, then shows the unread count on the menu button. */
import { refresh, unreadCount } from "/js/notifications.js";
const F = (window.FAYAD ||= {});
let busy = false;
export async function update(withRefresh) {
  if (busy) return; busy = true;
  try {
    if (withRefresh) await refresh();
    const n = await unreadCount(); if (n == null) return;
    F.unread = n;
    document.querySelectorAll(".fy-btn-menu").forEach((b) => { if (n > 0) b.dataset.unread = n > 9 ? "9+" : String(n); else delete b.dataset.unread; });
    window.dispatchEvent(new CustomEvent("fayad:unread", { detail: { count: n } }));
  } finally { busy = false; }
}
export function start() {
  update(true);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) update(false); });
  window.addEventListener("fayad:notifchange", () => update(false));
}
