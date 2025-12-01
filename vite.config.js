import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimisations de build
    minify: 'esbuild', // Utiliser esbuild (déjà inclus) au lieu de terser
    // Note: pour supprimer console.log, on peut utiliser esbuild drop
    rollupOptions: {
      output: {
        // Code splitting optimisé
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
        },
      },
    },
    // Augmenter la limite de chunk size warning
    chunkSizeWarningLimit: 1000,
  },
  // Optimisations serveur de dev
  server: {
    hmr: true,
  },
  // Optimisations de préchargement
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
  // Configuration Vitest
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.config.js',
        '**/*.spec.js',
        '**/mockData.js',
      ],
    },
  },
})
