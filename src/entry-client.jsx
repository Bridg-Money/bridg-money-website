import "./index.css";
import { hydrateRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { StrictMode, startTransition } from "react";
import { routes } from "./routes";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter(routes);

function appRender() {
  return new Promise((resolve) => {
    if (document.readyState === "complete") return resolve();

    const onReady = () => setTimeout(resolve, 0);
    window.addEventListener("load", onReady);
  });
}

const showApp = () => {
  const root = document.getElementById("root");
  if (root) root.style.display = "block";
};

appRender().then(() => {
  startTransition(() => {
    hydrateRoot(
      document.getElementById("root"),
      <StrictMode>
        <HelmetProvider>
          <App router={router} />
        </HelmetProvider>
      </StrictMode>
    );
  });
  showApp();
});
