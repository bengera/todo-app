import { defineConfig } from 'vite';
import htmlPurge from 'vite-plugin-purgecss';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  css: {
    preprocessorOptions:{
      scss: {
      api: 'modern-compiler'
      }
    }
  },
  plugins: [
    htmlPurge(),
  ],
  build: {
    assetsInlineLimit: 0, // Disable inline asset embedding for all asset types
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        mainJS: resolve(__dirname, 'main.js')
        
      }
    }
  }
});

