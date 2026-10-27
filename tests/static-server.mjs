// Minimal static file server used by the tests (mirrors Vercel's static behaviour).
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp",
  ".ico": "image/x-icon", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml",
};

export function startServer(port = 0) {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
    let file = path.join(ROOT, urlPath === "/" ? "index.html" : urlPath);
    if (!file.startsWith(ROOT) || file.includes(`${path.sep}.git${path.sep}`)) { res.writeHead(403).end(); return; }
    fs.readFile(file, (err, data) => {
      if (err) { res.writeHead(404, { "content-type": "text/plain" }).end("Not found"); return; }
      res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream" }).end(data);
    });
  });
  return new Promise((resolve) => server.listen(port, "127.0.0.1", () => resolve(server)));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const s = await startServer(Number(process.env.PORT) || 4173);
  console.log(`http://127.0.0.1:${s.address().port}`);
}
