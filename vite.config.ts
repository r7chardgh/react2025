import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import vercel from 'vite-plugin-vercel';

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist/client',
  },
  server: {
    proxy: {
      '/locations': {
        target: 'https://geodata.gov.hk/gs/api/v1.0.0',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/locations/, ''),
      },
    }
  },
  plugins: [react(), tailwindcss(), tsconfigPaths(),vercel()],
})
