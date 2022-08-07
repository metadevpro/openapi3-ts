import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',
        include: ['src/**/*.spec.ts'],
        watch: false,
        globals: true,
        threads: false,
        testTimeout: 5000,
        isolate: false,
        passWithNoTests: true,
        reporters: ['verbose'],
        coverage: {
            reporter: ['text', 'json', 'html', 'lcov']
        }
    }
});
