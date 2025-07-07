import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
       '/locations': {
        target: 'https://geodata.gov.hk/gs/api/v1.0.0',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/locations/, ''),
      },
    }
  },
  plugins: [react(), tailwindcss()],
})
