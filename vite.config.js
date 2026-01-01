import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ command, ssrBuild }) => {
  return {
    plugins: [react(), tailwindcss()],
    ssr: {
      noExternal: ["react-helmet-async", "react-router"],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: ssrBuild
      ? {
          ssr: "src/entry-server.jsx",
          outDir: "dist/server",
        }
      : {
          outDir: "dist/client",
          manifest: true,
        },
  };
});
