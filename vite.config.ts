import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

function parseEnvFile(contents: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const rawLine of contents.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

function loadEnvForMode(mode: string): Record<string, string> {
  // Local uses env.local only. UAT/prod use their own files.
  // Vite dev server uses mode="development" by default.
  const filename =
    mode === "uat"
      ? "env.uat"
      : mode === "production"
        ? "env.production"
        : "env.local";

  const root = path.dirname(fileURLToPath(import.meta.url));
  const envPath = path.join(root, filename);
  if (!fs.existsSync(envPath)) return {};
  return parseEnvFile(fs.readFileSync(envPath, "utf8"));
}

export default defineConfig(({ mode }) => {
  const env = loadEnvForMode(mode);
  const apiBaseUrl = env.VITE_API_BASE_URL ?? "";

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    define: {
      // Force this value to come from env.<mode> file
      "import.meta.env.VITE_API_BASE_URL": JSON.stringify(apiBaseUrl),
    },
    server: {
      // Optional: allow relative /api calls via dev proxy when apiBaseUrl is empty.
      proxy: apiBaseUrl
        ? undefined
        : {
            "/api": {
              target: "https://localhost:7024",
              changeOrigin: true,
              secure: false,
            },
          },
    },
  };
});
