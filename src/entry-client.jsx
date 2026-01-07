import "./index.css";
import { hydrateRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { StrictMode } from "react";
import { routes } from "./routes";
import { HeadProvider } from "react-head";


const router = createBrowserRouter(routes);

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <HeadProvider>
      <RouterProvider router={router} />
    </HeadProvider>
  </StrictMode>
);
