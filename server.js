import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

/** The files the page needs, each with the content type to serve it as. */
const files = new Map([
  ["/", ["index.html", "text/html; charset=utf-8"]],
  ["/index.html", ["index.html", "text/html; charset=utf-8"]],
  ["/app.js", ["app.js", "text/javascript; charset=utf-8"]],
  ["/src/display-sum.js", ["src/display-sum.js", "text/javascript; charset=utf-8"]],
  ["/src/sum.js", ["src/sum.js", "text/javascript; charset=utf-8"]],
]);

/** Starts the page's web server on a port, returning the server and the URL to open. */
export const startServer = ({ port = 3000 } = {}) => {
  const server = createServer(async (request, response) => {
    const path = new URL(request.url, "http://localhost").pathname;
    const file = files.get(path);
    if (file === undefined) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }
    const [name, contentType] = file;
    try {
      const body = await readFile(new URL(name, import.meta.url));
      response.writeHead(200, { "content-type": contentType });
      response.end(body);
    } catch {
      response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      response.end("Could not read the page");
    }
  });
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => {
      resolve({ server, url: `http://localhost:${server.address().port}` });
    });
  });
};

if (process.argv[1] !== undefined && process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT) || 3000;
  const { url } = await startServer({ port });
  console.log(`Sum page running at ${url}`);
}
