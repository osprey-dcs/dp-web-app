import path from "path";
import react from "@vitejs/plugin-react";
// import commonjs from 'vite-plugin-commonjs'
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // commonjs()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTest.js',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: ['src/main.jsx']
    },
  }
})
