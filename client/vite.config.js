import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure:false
      },
      '/posts': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      },
      '/users': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      },
      '/assets': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
