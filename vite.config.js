import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: `../${process.env.backend}/public/dist`,
    emptyOutDir: true, // also necessary
  },
  base: "/dist",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
