import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap' // 1. Import the sitemap plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({ presets: [reactCompilerPreset()] }),
    // 2. Add the sitemap configuration
    sitemap({
      hostname: 'https://tools.acestuffs.in', // Your live domain
      dynamicRoutes: [
        '/json-tool',
        '/qr-generator',
        '/barcode-generator',
        '/pdf-merger',
        '/pdf-splitter'
      ]
    })
  ],
  build: {
    target: ['es2015'],
  }
})