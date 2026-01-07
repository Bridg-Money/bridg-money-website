import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ ssrBuild }) => {
  return {
    base: "/",
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      __SITE_NAME__: JSON.stringify(process.env.VITE_DOMAIN),
    },
    ssr: {
      noExternal: ssrBuild
        ? ["react-router", "react-router-dom", "react-head"]
        : [],
    },
    build: {
      outDir: "dist/client",
      ssrManifest: true,
    },
  };
});
