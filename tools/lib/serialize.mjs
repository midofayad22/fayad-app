// Deterministic JS-source serializer for content files: readable diffs (multi-line strings as template literals).
const ID = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

export function str(s) {
  if (!s.includes("\n")) return JSON.stringify(s);
  const esc = s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${").replace(/\r/g, "\\r");
  return "`" + esc + "`";
}

export function ser(v, indent = 0) {
  const pad = "  ".repeat(indent), pad1 = "  ".repeat(indent + 1);
  if (v === null) return "null";
  if (typeof v === "string") return str(v);
  if (typeof v === "number" || typeof v === "boolean") return String(v);
  if (Array.isArray(v)) {
    if (!v.length) return "[]";
    if (v.every((x) => typeof x === "number")) return "[" + v.join(", ") + "]";
    if (v.every((x) => typeof x === "string" && !x.includes("\n"))) { const line = "[" + v.map(str).join(", ") + "]"; if (line.length <= 90) return line; }
    return "[\n" + v.map((x) => pad1 + ser(x, indent + 1)).join(",\n") + ",\n" + pad + "]";
  }
  const keys = Object.keys(v);
  if (!keys.length) return "{}";
  return "{\n" + keys.map((k) => `${pad1}${ID.test(k) ? k : JSON.stringify(k)}: ${ser(v[k], indent + 1)}`).join(",\n") + ",\n" + pad + "}";
}
