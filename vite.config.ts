import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      // Fontes e pinturas também entram no cache, para o app abrir completo sem internet
      workbox: { globPatterns: ['**/*.{js,css,html,woff2,jpg,png,svg}'] },
      manifest: {
        name: 'Estudos',
        short_name: 'Estudos',
        lang: 'pt-BR',
        display: 'standalone',
        background_color: '#0d0c0a',
        theme_color: '#0d0c0a',
        icons: [
          { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
      },
    }),
  ],
})
