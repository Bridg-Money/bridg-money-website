import "./index.css";
import { renderToString } from "react-dom/server";
import { createMemoryRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { routes } from "./routes";
import App from "./App";

export function render(url) {
  const helmetContext = {};
  const router = createMemoryRouter(routes, {
    initialEntries: [url],
  });
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <App router={router} />
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  const head = `
    ${helmet.title.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
  `;

  return { appHtml: html, head };
}
