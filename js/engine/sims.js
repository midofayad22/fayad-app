/*
  Simplified, NON-executing previews for courses whose real runtime (React/Angular build tools) cannot run in a static page.
  They only read the learner's text and describe what would roughly appear; they never evaluate it.
  The view labels these previews as simplified (strings "preview.sim").
*/
const clean = (text) => (text ? text.replace(/\{[^}]*\}/g, "").replace(/\s+/g, " ").trim() : "");

/** React: first h1/h2/p/button text, or an input, exactly as the legacy page did. @returns {{kind:"text"|"input", text:string}} */
export function reactPreview(code) {
  if (!code) return { kind: "text", text: "React Preview" };
  for (const tag of ["h1", "h2", "p", "button"]) {
    const m = code.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
    if (m) return { kind: "text", text: clean(m[1]) };
  }
  if (/<input\b/i.test(code)) return { kind: "input", text: "React Input" };
  return { kind: "text", text: null }; // caller shows the generic "ran" message
}

export const sims = { "sim-react": reactPreview };
