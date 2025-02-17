// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // Make sure this is '/' if your assets are served from the root
  plugins: [react()]
})
