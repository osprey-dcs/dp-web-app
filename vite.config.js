import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from 'vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    commonjs()
  ],
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
