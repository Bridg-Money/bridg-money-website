import fs from "node:fs/promises";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const isProd = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 4000;
const BASE = process.env.BASE_URL || "/";

const app = express();

let templateHtml;
if (isProd) {
  templateHtml = await fs.readFile("./dist/client/index.html", "utf-8");
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;

  app.use(compression());
  app.use(
    BASE,
    sirv("./dist/client", {
      extensions: ["html"],
      single: false,
    })
  );
}

let vite;

if (!isProd) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    BASE,
  });
  app.use(vite.middlewares);
}

app.use("*all", async (req, res) => {
  const url = req.originalUrl;
  if (url === "/favicon.ico") return res.status(204).end();

  try {
    let template, render;
    if (!isProd) {
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.jsx")).render;
    } else {
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }

    const { appHtml, head } = await render(url);

    const html = template
      .replace(`<!--app-head-->`, head ?? "")
      .replace(`<!--app-html-->`, appHtml ?? "");

      console.log(head)

    res.status(200).set({ "Content-Type": "text/html" }).send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

app.listen(PORT, () =>
  console.log(
    `${
      isProd ? "✅ Production" : "⚡ Development"
    } SSR running at http://localhost:${PORT}`
  )
);
