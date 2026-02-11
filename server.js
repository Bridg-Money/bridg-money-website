import fs from "node:fs/promises";
import path from "node:path";
import express from "express";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 4000;
const BASE = process.env.BASE_URL || "/";

const app = express();
app.set("trust proxy", true);

app.get("/version.json", async (_, res) => {
  try {
    const json = await fs.readFile(
      path.resolve(__dirname, "./dist/version.json"),
      "utf-8"
    );
    res.json(JSON.parse(json));
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "version info not available",
    });
  }
});

let templateHtml;
if (isProd) {
  templateHtml = await fs.readFile(
    path.resolve(__dirname, "dist/client/index.html")
  );
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
  });
  app.use(vite.middlewares);
}

app.use(async (req, res, next) => {
  // skip non-HTML requests (assets, api, etc.)
  const accept = req.headers.accept || "";
  if (!accept.includes("text/html")) {
    return next();
  }

  const url = req.originalUrl;

  try {
    let template, render;

    if (!isProd) {
      template = await fs.readFile(
        path.resolve(__dirname, "index.html"),
        "utf-8"
      );
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.jsx")).render;
    } else {
      template = templateHtml; // must already be a string
      render = (
        await import(path.resolve(__dirname, "dist/server/entry-server.js"))
      ).render;
    }

    // hard guard (prevents silent crashes)
    if (typeof template !== "string") {
      return res.redirect(302, "/");
    }

    const { appHtml, head } = await render(url);

    const html = template
      .replace("<!--app-head-->", head ?? "")
      .replace("<!--app-html-->", appHtml ?? "");

    res.status(200).set("Content-Type", "text/html").send(html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.error(e);
    res.status(500).end(e.stack);
  }
});

app.listen(PORT, () =>
  console.log(
    `${
      isProd ? "Production" : "Development"
    } SSR running at http://localhost:${PORT}`
  )
);
