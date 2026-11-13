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
      '@docusaurus/Link': fileURLToPath(new URL('./node_modules/@docusaurus/core/lib/client/exports/Link.js', import.meta.url)),
      '@docusaurus/Translate': fileURLToPath(new URL('./node_modules/@docusaurus/core/lib/client/exports/Translate.js', import.meta.url)),
      '@docusaurus/useDocusaurusContext': fileURLToPath(new URL('./node_modules/@docusaurus/core/lib/client/exports/useDocusaurusContext.js', import.meta.url)),
      '@docusaurus/useIsBrowser': fileURLToPath(new URL('./node_modules/@docusaurus/core/lib/client/exports/useIsBrowser.js', import.meta.url)),
      '@docusaurus/router': fileURLToPath(new URL('./node_modules/@docusaurus/core/lib/client/exports/router.js', import.meta.url)),
    },
  },
});
