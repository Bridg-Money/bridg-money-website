import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { execSync } from "child_process";
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import os from "os";

/* ===================== HELPERS ===================== */

function safeRun(cmd, fallbackEnv) {
  try {
    const value = execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    if (value) return value;
  } catch (error) {
    console.warn(`Command failed: ${cmd}`, error);
  }

  return fallbackEnv && process.env[fallbackEnv]
    ? process.env[fallbackEnv]
    : "unknown";
}

function getEnvironment() {
  const script = process.env.npm_lifecycle_event || "";
  if (script.includes("prod")) return "prod";
  if (script.includes("beta")) return "beta";

  return "dev";
}
export default defineConfig(({ ssrBuild }) => {
  return {
    base: "/",
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "version-generator",
        closeBundle() {
          try {
            if (process.env.VITE_SSR_BUILD === "true") return;

            const cacheFile = ".build/version.cache.json";
            mkdirSync(".build", { recursive: true });

            // Auto-increment build number
            let buildNumber = 1;
            if (existsSync(cacheFile)) {
              const prev = JSON.parse(readFileSync(cacheFile, "utf-8"));
              buildNumber = (prev?.buildNumber ?? 0) + 1;
            }
            writeFileSync(cacheFile, JSON.stringify({ buildNumber }, null, 2));

            const pkg = JSON.parse(
              readFileSync(new URL("./package.json", import.meta.url), "utf-8")
            );

            const versionInfo = {
              name: pkg.name,
              version: pkg.version,
              environment: getEnvironment(),
              buildNumber,
              commitHash: safeRun(
                "git rev-parse --short HEAD",
                "CI_COMMIT_SHA"
              ),
              branch: safeRun(
                "git rev-parse --abbrev-ref HEAD",
                "CI_COMMIT_REF_NAME"
              ),
              commitMessage: safeRun(
                "git log -1 --pretty=%B",
                "CI_COMMIT_MESSAGE"
              )
                .replace(/[\r\n]+/g, " ")
                .replace(/"/g, "'")
                .trim(),
              buildDate: new Date().toISOString(),
              meta: {
                host: os.hostname(),
                node: process.version,
                platform: os.platform(),
              },
            };

            writeFileSync(
              "dist/version.json",
              JSON.stringify(versionInfo, null, 2)
            );
            // mkdirSync("public", { recursive: true });
            // writeFileSync(
            //   "public/version.json",
            //   JSON.stringify(versionInfo, null, 2)
            // );

            //console.log("CI-SAFE version.json generated");
            console.table(versionInfo);
          } catch (err) {
            console.error("Version generation failed", err);
          }
        },
      },
    ],
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
