import {defineConfig, UserConfig} from "vitest/config";
import * as path from "path";
import dts from 'vite-plugin-dts';
import eslintPlugin from "vite-plugin-eslint";
export const viteConfig: UserConfig = {
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
    plugins: [dts(), eslintPlugin()],
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
}
export default defineConfig(viteConfig);
