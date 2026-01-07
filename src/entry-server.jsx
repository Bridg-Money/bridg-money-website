import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { createMemoryRouter, RouterProvider } from "react-router";
import { routes } from "./routes";
import { HeadProvider } from "react-head";

export async function render(url) {
  const router = createMemoryRouter(routes, {
    initialEntries: [url],
  });
  const headTags = [];

  const app = (
    <HeadProvider headTags={headTags}>
      <RouterProvider router={router} />
    </HeadProvider>
  );

  const appHtml = renderToString(app);
  const head = renderToStaticMarkup(<>{headTags}</>);

  return { appHtml, head };
}
