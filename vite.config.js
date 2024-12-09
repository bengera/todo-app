import { defineConfig } from 'vite';
import purgecss from 'vite-plugin-purgecss';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        mainJS: resolve(__dirname, 'main.js'),
      },
    },
  },
  plugins: [
    purgecss({
      content: ['./index.html', './src/**/*.js', './src/**/*.vue', './src/**/*.jsx'], // Scan these files for used classes
      safelist: ['important-class', /^dynamic-/], // Optional: Safelist classes or patterns
    }),
  ],
});


// import { defineConfig } from 'vite';
// import htmlPurge from 'vite-plugin-purgecss';
// import { resolve } from 'path';

// export default defineConfig({
//   base: '/',
//   css: {
//     preprocessorOptions:{
//       scss: {
//       api: 'modern-compiler' // ?
//       }
//     }
//   },
//   plugins: [
//     htmlPurge(),
//   ],
//   build: {
//     assetsInlineLimit: 0, // Disable inline asset embedding for all asset types
//     rollupOptions: {
//       input: {
//         index: resolve(__dirname, 'index.html'),
//         mainJS: resolve(__dirname, 'main.js')
        
//       }
//     }
//   }
// });

