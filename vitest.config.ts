import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: { port: 3005 },
  test: {
    exclude: [
      String.raw`.*\\/node_modules\\/.*`,
      String.raw`.*\\/build\\/.*`,
      String.raw`.*\\/postgres-data\\/.*`,
      String.raw`.*\\/.next\\/.*`,
      String.raw`.*\\/.vscode\\/.*`,
      String.raw`.*\\/public\\/.*`,
    ],
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./test/setup-test-environment.ts'],
    include: ['./src/**/*.{spec,test}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
