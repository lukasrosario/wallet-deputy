import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      all: false,
      include: ['**/wallet-deputy/**'],
      provider: 'v8',
      reporter: process.env.CI ? ['lcov'] : ['text', 'json', 'html'],
    },
    include: ['wallet-deputy/**/*.test.ts'],
    passWithNoTests: true,
  },
});
