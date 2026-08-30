import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@theme': './node_modules/@docusaurus/theme-classic/src/theme',
      '@site': './',
    },
  },
});