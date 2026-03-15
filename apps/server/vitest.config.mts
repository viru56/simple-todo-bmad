import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: import.meta.dirname,
  test: {
    name: '@simple-todo-bmad/server',
    watch: false,
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: './test-output/vitest/coverage',
      provider: 'v8',
      exclude: ['src/main.ts', 'src/app/buildServer.ts', 'src/config/env.ts', '**/*.spec.ts', '**/*.test.ts'],
      thresholds: { statements: 90, branches: 70, functions: 90, lines: 90 },
    },
  },
});
