import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/cdn-timepass': {
        target: 'https://cdn.timepass.games',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn-timepass/, ''),
      },
      '/cdn-svg': {
        target: 'https://cdn.simpleviralgames.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn-svg/, ''),
      },
      '/cdn-media': {
        target: 'https://media.simpleviralgames.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn-media/, ''),
      },
    },
  },
})
