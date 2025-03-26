import { resolve, join } from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: resolve("./"),
  base: "/static/",
  build: {
    manifest: "manifest.json",
    sourcemap: true,
    outDir: resolve("./staticfiles/"),
    assetsDir: "",
    // manifest: true,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve("src/main.jsx"),
      },
    }
  },
  server: {
    cors: {
      origin: true
    },
  },
})
