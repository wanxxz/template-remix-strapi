import { vitePlugin as remix } from '@remix-run/dev'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  resolve: {
    alias: {
      '@booth/ui': fileURLToPath(new URL('../ui/src', import.meta.url)),
      '@booth/db': fileURLToPath(new URL('../db/src', import.meta.url))
    }
  },
  plugins: [remix({ appDirectory: './src' }), tsconfigPaths({ root: __dirname })]
})
