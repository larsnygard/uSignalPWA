import { defineConfig } from 'vite';
import { copyFileSync } from 'fs';

export default defineConfig({
  // Use relative base path so it works in any directory
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  // Copy service worker and manifest to dist
  publicDir: 'public',
  plugins: [
    {
      name: 'copy-sw',
      closeBundle() {
        // Copy service worker to dist after build
        copyFileSync('sw.js', 'dist/sw.js');
      }
    }
  ]
});
