import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' lets the built site work on Vercel, Netlify and GitHub Pages (even under a sub-path)
export default defineConfig({
  plugins: [react()],
  base: './',
})
