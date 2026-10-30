/*
  Engine entry point. A course page loads this module with data-track="<id>".
  It imports /content/<id>/index.js, validates it, wires progress + state + view, and starts.
  If anything fails the page shows a visible error instead of a silent blank course.
*/
import { validateTrack } from "./schema.js";
import { createProgress } from "./progress.js";
import { createState } from "./state.js";

// Lesson counts of every course. Only the migrated course is authoritative from its content module; the others are the
// legacy counts (verified against the legacy pages by tests/home.test.mjs) so progress validation never drops their data.
const OTHER_TOTALS = { com: 20, prg: 20, html: 30, css: 30, react: 30, vue: 22, angular: 32, ajs: 22, bs: 20, tw: 20 };

async function main() {
  const script = document.querySelector("script[data-track]");
  const id = script && script.getAttribute("data-track");
  try {
    if (!id || !/^[a-z]+$/.test(id)) throw new Error("missing data-track");
    const { track, lessons } = await import(`/content/${id}/index.js`);
    const problems = validateTrack(track, lessons);
    if (problems.length) throw new Error("invalid course content: " + problems.slice(0, 3).join("; "));
    const progress = createProgress({ totals: { ...OTHER_TOTALS, [id]: lessons.length } });
    let state = null, view;
    if (track.layout === "foundation" || track.layout === "foundation-lite") {
      const { mountFoundation } = await import("./foundation-view.js");
      view = mountFoundation({ track, lessons, progress, lang: "ar" }); // Arabic-only layouts until their English content exists
    } else {
      const { mountCourse } = await import("./course-view.js");
      state = createState({ track, lessons, progress });
      view = mountCourse({ track, lessons, state });
    }
    view.start();
    window.FAYAD = window.FAYAD || {};
    window.FAYAD.course = { track, state, progress, view };
    document.documentElement.setAttribute("data-engine", "ready");
  } catch (err) {
    console.error("[FAYAD engine]", err);
    document.documentElement.setAttribute("data-engine", "error");
    const box = document.createElement("div");
    box.setAttribute("role", "alert");
    box.style.cssText = "margin:24px;padding:16px;border:1px solid #c0354a;border-radius:12px";
    box.textContent = "تعذّر تحميل الدروس. أعد تحميل الصفحة. إذا استمرت المشكلة فتأكد من اتصالك بالإنترنت";
    (document.querySelector("main") || document.body).prepend(box);
  }
}
main();
