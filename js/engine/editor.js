/*
  VS Code-like lesson editor. Progressive enhancement of an existing <textarea>: the textarea stays in the DOM (hidden, still focusable and
  fillable) and remains the single source of truth for the rest of the engine, so `textarea.value` and the "input" event keep working.
  CodeMirror 6 (vendored, MIT) is loaded lazily; if it fails to load the plain textarea is simply left visible.
  Features: line numbers, active line, syntax highlighting (HTML/CSS/JS/JSX), bracket + tag auto-close, autocomplete, indent/outdent with Tab,
  undo/redo, Ctrl/Cmd+Enter to run, Esc to leave the editor (keyboard-trap safe), live Ln/Col status bar.
*/
let cmPromise = null;
const loadCM = () => (cmPromise ||= import("/vendor/codemirror-6/cm.js"));
const rawGet = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").get;
const rawSet = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value").set;

const LANG_NAME = { html: "HTML", css: "CSS", js: "JavaScript", jsx: "JSX" };

export async function upgradeEditor(textarea, { language = "js", onRun, labelOf } = {}) {
  if (!textarea || textarea.__fyEditor) return null;
  let cm;
  try { cm = await loadCM(); } catch { return null; }
  if (textarea.__fyEditor) return null;

  const doc = textarea.ownerDocument;
  const host = doc.createElement("div");
  host.className = "fy-cm";
  host.dir = "ltr";
  const status = doc.createElement("div");
  status.className = "fy-cm-status";
  status.setAttribute("aria-hidden", "true");
  const pos = doc.createElement("span"), hint = doc.createElement("span");
  status.append(pos, hint);

  const highlight = cm.HighlightStyle.define([
    { tag: [cm.tags.keyword, cm.tags.modifier, cm.tags.controlKeyword, cm.tags.operatorKeyword], color: "var(--fy-tok-kw, #c6a0ff)" },
    { tag: [cm.tags.tagName, cm.tags.angleBracket], color: "var(--fy-tok-tag, #7fdce8)" },
    { tag: [cm.tags.attributeName, cm.tags.propertyName, cm.tags.className], color: "var(--fy-tok-attr, #f0d58a)" },
    { tag: [cm.tags.string, cm.tags.attributeValue, cm.tags.regexp], color: "var(--fy-tok-str, #8fe3b0)" },
    { tag: [cm.tags.number, cm.tags.bool, cm.tags.null, cm.tags.atom], color: "var(--fy-tok-num, #ffae78)" },
    { tag: [cm.tags.function(cm.tags.variableName), cm.tags.function(cm.tags.propertyName), cm.tags.definition(cm.tags.variableName)], color: "var(--fy-tok-fn, #8ab4ff)" },
    { tag: [cm.tags.comment, cm.tags.lineComment, cm.tags.blockComment], color: "var(--fy-tok-cmt, #7c94a0)", fontStyle: "italic" },
    { tag: [cm.tags.operator, cm.tags.punctuation, cm.tags.separator], color: "var(--fy-tok-op, #9db4bb)" },
    { tag: [cm.tags.typeName, cm.tags.namespace], color: "var(--fy-tok-type, #ff8fa8)" },
    { tag: cm.tags.invalid, color: "var(--fy-tok-bad, #ff6b7a)" },
  ]);
  const theme = cm.EditorView.theme({
    "&": { color: "var(--fy-code-text)", backgroundColor: "var(--fy-code-bg)", fontSize: "var(--fy-editor-size, 14px)", maxHeight: "520px" },
    ".cm-scroller": { fontFamily: "var(--fy-font-code, ui-monospace, Menlo, Consolas, monospace)", lineHeight: "1.75", minHeight: "220px" },
    ".cm-content": { caretColor: "var(--fy-course, #7fdce8)", padding: "10px 0" },
    ".cm-cursor": { borderLeftColor: "var(--fy-course, #7fdce8)", borderLeftWidth: "2px" },
    ".cm-gutters": { backgroundColor: "var(--fy-code-surface)", color: "var(--fy-code-muted, #6f8793)", border: "none", borderRight: "1px solid var(--fy-code-border)" },
    ".cm-activeLine": { backgroundColor: "var(--fy-code-line, rgba(255,255,255,.045))" },
    ".cm-activeLineGutter": { backgroundColor: "rgba(255,255,255,.06)", color: "#d8e6ea" },
    "&.cm-focused": { outline: "none" },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection": { backgroundColor: "rgba(127,220,232,.25)" },
    ".cm-matchingBracket": { backgroundColor: "rgba(127,220,232,.22)", outline: "1px solid rgba(127,220,232,.5)" },
    ".cm-tooltip": { backgroundColor: "var(--fy-code-surface)", border: "1px solid var(--fy-code-border)", color: "var(--fy-code-text)", borderRadius: "10px", overflow: "hidden" },
    ".cm-tooltip-autocomplete ul li[aria-selected]": { backgroundColor: "var(--fy-course, #1d6f82)", color: "var(--fy-course-on, #fff)" },
    ".cm-foldPlaceholder": { backgroundColor: "transparent", border: "none", color: "#9db4bb" },
  }, { dark: true });

  const lang = language === "html" ? cm.html() : language === "css" ? cm.css() : cm.javascript({ jsx: language === "jsx" });
  let applyingExternal = false;
  const runKey = { key: "Mod-Enter", preventDefault: true, run: () => { if (onRun) onRun(); return true; } };
  const leaveKey = { key: "Escape", run: (v) => { v.contentDOM.blur(); textarea.dispatchEvent(new CustomEvent("fy-editor-escape")); return true; } };

  const updateStatus = (state) => {
    const sel = state.selection.main, line = state.doc.lineAt(sel.head);
    pos.textContent = `Ln ${line.number}, Col ${sel.head - line.from + 1}${sel.empty ? "" : ` (${Math.abs(sel.to - sel.from)})`}`;
  };

  const view = new cm.EditorView({
    parent: host,
    doc: rawGet.call(textarea),
    extensions: [
      cm.lineNumbers(), cm.highlightActiveLineGutter(), cm.foldGutter(), cm.history(), cm.drawSelection(), cm.dropCursor(),
      cm.indentOnInput(), cm.bracketMatching(), cm.closeBrackets(), cm.autocompletion({ activateOnTyping: true }), cm.highlightActiveLine(),
      cm.indentUnit.of("  "), cm.EditorState.tabSize.of(2),
      cm.keymap.of([runKey, leaveKey, ...cm.closeBracketsKeymap, ...cm.defaultKeymap, ...cm.historyKeymap, ...cm.foldKeymap, ...cm.completionKeymap, cm.indentWithTab]),
      lang, cm.syntaxHighlighting(highlight), theme,
      cm.EditorView.contentAttributes.of({ "aria-label": labelOf ? labelOf() : (textarea.getAttribute("aria-label") || "Code editor"), spellcheck: "false", autocorrect: "off", autocapitalize: "off" }),
      cm.EditorView.updateListener.of((u) => {
        if (u.selectionSet || u.docChanged) updateStatus(u.state);
        if (u.docChanged && !applyingExternal) {
          rawSet.call(textarea, u.state.doc.toString());
          textarea.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }),
    ],
  });
  hint.textContent = `${LANG_NAME[language] || "Code"} · Ctrl+Enter ▶ · Esc`;
  updateStatus(view.state);

  // external writes (starter code, reset) go through textarea.value; native edits (autofill, tests) arrive as "input" events
  const setDoc = (v) => {
    if (v === view.state.doc.toString()) return;
    applyingExternal = true;
    view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: v } });
    applyingExternal = false;
  };
  Object.defineProperty(textarea, "value", {
    configurable: true,
    get() { return view.state.doc.toString(); },
    set(v) { rawSet.call(this, v); setDoc(String(v)); },
  });
  textarea.addEventListener("input", () => { const raw = rawGet.call(textarea); if (raw !== view.state.doc.toString()) setDoc(raw); });

  textarea.classList.add("fy-cm-source");
  textarea.tabIndex = -1;
  textarea.parentNode.insertBefore(host, textarea);
  textarea.parentNode.insertBefore(status, textarea);
  textarea.parentNode.classList.add("fy-cm-wrap");
  textarea.__fyEditor = view;
  return view;
}
