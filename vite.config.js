import { defineConfig } from 'vite';

export default defineConfig({
  // Base public path when served in development or production
  base: './',
  
  // Development server options
  server: {
    port: 8000,
    open: true,
    cors: true,
  },
  
  // Build options
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: true,
    sourcemap: true,
    // Generate manifest for asset fingerprinting
    manifest: true,
    rollupOptions: {
      // Externalize deps that shouldn't be bundled
      external: [],
      output: {
        // Add hash to files for cache busting
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
  },
  
  // CSS options
  css: {
    // Process CSS with custom preprocessor options
    preprocessorOptions: {
      scss: {
        // Silence deprecation warnings
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
});
