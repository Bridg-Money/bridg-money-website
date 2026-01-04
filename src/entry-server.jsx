import "./index.css";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter } from "react-router";
import { routes } from "./routes";
import App from "./App";
import { HeadProvider } from "react-head";

export async function render(url) {
  const router = createMemoryRouter(routes, {
    initialEntries: [url],
  });
  const headTags = [];

  const app = (
    <HeadProvider headTags={headTags}>
      <App router={router} />
    </HeadProvider>
  );

  const appHtml = renderToString(app);
  const head = renderToStaticMarkup(<>{headTags}</>);

  return { appHtml, head };
}
