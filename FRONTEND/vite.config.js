import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/admin': 'http://localhost:5006',
      '/user': 'http://localhost:5006',
      '/appoint': 'http://localhost:5006',
      '/doctor': 'http://localhost:5006'
    }
  }
})
