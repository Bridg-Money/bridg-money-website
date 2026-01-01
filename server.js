import 'dotenv/config';
import fs from "node:fs";
import path from "node:path";
import express from "express";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5173;

const isProd = process.env.MODE === "production";

async function createServer() {
  const app = express();

  let vite;

  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
     vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });

    app.use(vite.middlewares);
  } else {
    const compression = (await import("compression")).default;
    const sirv = (await import("sirv")).default;
    app.use(compression());
    app.use(
      sirv(path.resolve(__dirname, "dist/client"), {
        extensions: [],
        maxAge: 31536000,
        immutable: true,
      })
    );
  }

  app.use("*all", async (req, res, next) => {
    const url = req.originalUrl;

    try {

      let template = isProd
        ? fs.readFileSync(
            path.resolve(__dirname, 'dist/client/index.html'),
            'utf-8'
          )
        : fs.readFileSync(
            path.resolve(__dirname, 'index.html'),
            'utf-8'
          );

      if (!isProd) {
        template = await vite.transformIndexHtml(url, template);
      }

      const { render } = isProd
      ? await import("./dist/server/entry-server.js")
        : await vite.ssrLoadModule("/src/entry-server.jsx")

      const { appHtml, head } = await render(url);

      const html = template
        .replace("<!--app-head-->", head)
        .replace("<!--ssr-outlet-->", appHtml);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(PORT, () =>
    console.log(
      `${
        isProd ? "✅ Production" : "⚡ Dev"
      } SSR running at http://localhost:${PORT}`
    )
  );
}

createServer();
