import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distClient = path.resolve(__dirname, "dist/client");

const template = fs.readFileSync(path.join(distClient, "index.html"), "utf-8");

const { render } = await import("./dist/server/entry-server.js");

const routes = [
  "/",
  "/about",
  "/bridg-pay",
  "/bridg-connect",
  "/bridg-collect",
  "/contact",
  "/faq",
];

for (const route of routes) {
  const { appHtml, head } = await render(route);

  const html = template
    .replace("<!--app-head-->", head)
    .replace("<!--ssr-outlet-->", appHtml);

  const out =
    route === "/"
      ? path.join(distClient, "index.html")
      : path.join(distClient, route, "index.html");

  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);

  console.log(`✅ Prerendered ${route}`);
}
