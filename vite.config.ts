import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';
import TeamCityReporter from 'vitest-teamcity-reporter';

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        oas30: resolve(__dirname, 'src/oas30.ts'),
        oas31: resolve(__dirname, 'src/oas31.ts'),
      },
      name: 'OpenApi3TS',
    },
    rollupOptions: {
      external: ['yaml'],
      output: {
        globals: {
          yaml: 'yaml',
        },
      },
    },
    sourcemap: true,
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
