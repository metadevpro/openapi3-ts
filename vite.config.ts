import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import TeamCityReporter from 'vitest-teamcity-reporter';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'OpenApi3TS',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['yaml'],
      output: {
        globals: {
          yaml: 'yaml',
        },
      },
    },
  },
    test: {
        environment: 'node',
        include: ['src/**/*.spec.ts'],
        watch: false,
        globals: true,
        threads: false,
        testTimeout: 5000,
        isolate: false,
        passWithNoTests: true,
        reporters: ['verbose', new TeamCityReporter()],
        coverage: {
            reporter: ['text', 'json', 'html', 'lcov']
        }
    }
});
