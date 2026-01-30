import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    // When VITE_API_BASE_URL is empty, frontend calls /api/* (same-origin). This proxy forwards to backend.
    proxy: {
      "/api": {
        target: "https://localhost:7024", // backend URL is defined here in dev
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
