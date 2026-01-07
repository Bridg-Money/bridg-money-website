import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routes = [
  "/",
  "/about",
  "/bridg-pay",
  "/bridg-connect",
  "/bridg-collect",
  "/contact",
  "/faq",
];

async function prerender() {
  const template = fs.readFileSync(
    path.resolve(__dirname, "dist/client/index.html"),
    "utf-8"
  );

  const { render } = await import("./dist/server/entry-server.js");

  for (const route of routes) {
    const { appHtml, head } = await render(route);

    const html = template
      .replace("<!--app-head-->", head)
      .replace("<!--app-html-->", appHtml);

    const outputDir =
      route === "/"
        ? path.resolve(__dirname, "dist/client")
        : path.resolve(__dirname, "dist/client", route.slice(1));

    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, "index.html"), html);

    console.log(`✅ Prerendered ${route}`);
  }
}

prerender();
