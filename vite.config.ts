import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/stardew-valley-checklist/',
  css: {
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      localsConvention: 'camelCaseOnly',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@styles': path.resolve(__dirname, 'src/style'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'i18n-vendor': [
            'i18next',
            'react-i18next',
            'i18next-browser-languagedetector',
            'i18next-http-backend',
          ],
          // Feature chunks
          pages: ['./src/pages/home', './src/pages/room'],
          entities: ['./src/entities/bundle', './src/entities/room'],
        },
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
  },
});
