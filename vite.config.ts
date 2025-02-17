import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/My-Portfolio/', // Adjust to match your repository name
  plugins: [react()]
})
