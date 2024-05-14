import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./testSetup.js",
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["src/main.jsx", "tailwind.config.js"]
    },
  }
})
