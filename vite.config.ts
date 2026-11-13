import { defineConfig } from 'vite';
export default defineConfig({
  base: './',
  server: { host: '0.0.0.0' },
  build: { rollupOptions: { output: { manualChunks(id) {
    if (id.includes('/three/build/three.core.js')) return 'three-core';
    if (id.includes('/three/')) return 'three-renderer';
  } } } }
});
