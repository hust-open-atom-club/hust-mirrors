import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@theme': fileURLToPath(new URL('./node_modules/@docusaurus/theme-classic/src/theme', import.meta.url)),
      '@site': fileURLToPath(new URL('./', import.meta.url)),
      '@docusaurus/useIsBrowser': fileURLToPath(new URL('./node_modules/@docusaurus/core/lib/client/exports/useIsBrowser.js', import.meta.url)),
      '@docusaurus/router': fileURLToPath(new URL('./node_modules/@docusaurus/core/lib/client/exports/router.js', import.meta.url)),
    },
  },
});
