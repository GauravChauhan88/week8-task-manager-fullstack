import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 🌟 ADD THIS DEFINE BLOCK
  define: {
    global: 'window',
  },
  server: {
    port: 3000,
  }
})