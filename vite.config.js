import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // TODO: voltar para '/' quando o DNS de curaeai.tech estiver configurado
  base: '/curae-website/',
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: false,
  },
})
