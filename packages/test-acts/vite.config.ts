import {defineConfig} from "vitest/config";
import * as path from "path";
import dts from 'vite-plugin-dts';

export default defineConfig({
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, './src')

        }
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, './src/index.ts'),
            name: 'test-acts',
            fileName: 'test-acts',
        },
        rollupOptions: {
            external: ['./tests']
        }
    },
    plugins: [dts()],
    test: {
        include: ['**/*.test.tsx', '**/*.test.ts'],
        setupFiles: [
            'tests/utils/setup.ts'
        ],
        coverage: {
            provider: 'v8',
            include: ['**/*.ts'],
        }
    },
});
