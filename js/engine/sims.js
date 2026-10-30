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

const esc = (v) => v.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function resolveExpression(expression, code) {
  const e = expression.trim().replace(/;$/, "");
  const str = code.match(new RegExp(`${esc(e)}\\s*=\\s*['"]([^'"]*)['"]`)); if (str) return str[1];
  const sig = code.match(new RegExp(`${esc(e)}\\s*=\\s*signal\\(([^)]*)\\)`)); if (sig) return sig[1].trim().replace(/^['"]|['"]$/g, "");
  const num = code.match(new RegExp(`${esc(e)}\\s*=\\s*(-?\\d+(?:\\.\\d+)?)`)); if (num) return num[1];
  return e;
}
function visibleText(code) {
  const html = code.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
  const m = html.match(/>([^<]+)</g);
  return m ? m.map((x) => x.slice(1, -1).trim()).filter(Boolean).join(" • ") : "";
}
const ANGULAR_FEATURES = [
  ["component", (c) => /@Component\s*\(/.test(c)],
  // interpolation is handled separately (it also changes the preview text), but keeps its place in the order
  ["interpolation", (c) => /\{\{\s*([^}]+?)\s*\}\}/.test(c)],
  ["conditionalRendering", (c) => c.includes("*ngIf")],
  ["listRendering", (c) => c.includes("*ngFor") || c.includes("@for")],
  ["twoWayBinding", (c) => c.includes("[(ngModel)]")],
  ["propertyBinding", (c) => /\[[a-zA-Z0-9_-]+\]\s*=/.test(c)],
  ["eventBinding", (c) => /\([a-zA-Z0-9_-]+\)\s*=/.test(c)],
  ["uppercasePipe", (c) => /\|\s*uppercase\b/.test(c)],
  ["currencyPipe", (c) => /\|\s*currency\b/.test(c)],
  ["inputOutput", (c) => /@Input\s*\(/.test(c) || /@Output\s*\(/.test(c)],
  ["service", (c) => /@Injectable\s*\(/.test(c) || /Service\b/.test(c)],
  ["dependencyInjection", (c) => /constructor\s*\(/.test(c) || /\binject\s*\(/.test(c)],
  ["routing", (c) => /\bRoutes\b/.test(c) || /\bRouter\b/.test(c) || /path\s*:/.test(c)],
  ["routeParameter", (c) => /:[a-zA-Z_$][\w$]*/.test(c)],
  ["forms", (c) => /\bngModel\b/.test(c) || /ngSubmit/.test(c) || /<form\b/i.test(c)],
  ["validation", (c) => /\brequired\b/.test(c) || /\bminlength\b/.test(c) || /\bmaxlength\b/.test(c) || /\.invalid\b/.test(c)],
  ["httpClient", (c) => /\bHttpClient\b/.test(c) || /\.get\s*\(/.test(c) || /\.post\s*\(/.test(c)],
  ["observable", (c) => /\bObservable\b/.test(c) || /\.subscribe\s*\(/.test(c)],
  ["rxjs", (c) => /\.pipe\s*\(/.test(c) || /\bmap\s*\(/.test(c) || /\bfilter\s*\(/.test(c) || /\bswitchMap\s*\(/.test(c)],
  ["lifecycle", (c) => /\bngOnInit\b/.test(c) || /\bngOnDestroy\b/.test(c) || /\bngOnChanges\b/.test(c)],
  ["signals", (c) => /\bsignal\s*\(/.test(c) || /\.set\s*\(/.test(c) || /\.update\s*\(/.test(c)],
  ["standalone", (c) => /standalone\s*:\s*true/.test(c)],
];
const KNOWN_TEXTS = ["Hello Angular", "Product Card", "Welcome to Angular", "Welcome back!", "Please log in.", "Dashboard", "Home"];

/**
 * Angular: feature detection by regular expressions, same rules as the legacy page. NEVER evaluates code.
 * `ctx.labels` maps keys (writeCode, nothingPreview, angularPreview, codeLoaded, detected, <feature>) to the display text (already in the viewer's language).
 * @returns {{kind:"text", text:string, output:string}}
 */
export function angularPreview(code, ctx = {}) {
  const L = ctx.labels || {};
  const src = (code || "").trim();
  if (!src) return { kind: "text", text: L.writeCode || "", output: L.nothingPreview || "" };
  let text = L.angularPreview || "Angular Preview";
  const interp = [...src.matchAll(/\{\{\s*([^}]+?)\s*\}\}/g)];
  if (interp.length) text = interp.map((m) => resolveExpression(m[1], src)).join(" • ");
  const vis = visibleText(src); if (vis) text = vis;
  for (const k of KNOWN_TEXTS) if (src.includes(k)) { text = k; break; }
  const found = [...new Set(ANGULAR_FEATURES.filter(([, test]) => test(src)).map(([key]) => L[key] ?? key))];
  return { kind: "text", text, output: found.length ? `${L.detected} ${found.join(", ")}` : L.codeLoaded || "" };
}

export const sims = { "sim-react": reactPreview, "sim-angular": angularPreview };
