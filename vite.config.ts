import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Aulirex es un servicio web (NO una PWA instalable). Mantenemos el service
    // worker de Workbox para cacheo offline, pero sin manifest → el navegador no
    // ofrece "instalar app".
    VitePWA({
      registerType: 'autoUpdate',
      manifest: false,
      workbox: {
        // Precache solo el "app shell" liviano. Lo pesado y de uso esporádico
        // (bancos JSON de Medicina, 3Dmol, assets del VHS, imágenes) se cachea
        // en runtime, on-demand, en vez de bajarse todo en la primera visita.
        globPatterns: ['**/*.{js,css,html,woff2}'],
        globIgnores: ['**/vhs/**', 'assets/banco-*.js', 'assets/*3Dmol*.js'],
        maximumFileSizeToCacheInBytes: 600 * 1024,
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            // Bancos de preguntas y 3Dmol: pesados y no siempre necesarios.
            urlPattern: /\/assets\/(?:banco-|[^/]*3Dmol)[^/]*\.js$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'aulirex-heavy-js',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: /\.(?:png|jpe?g|svg|webp|gif)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'aulirex-images',
              expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            // Selector VHS (Three.js) y sus assets.
            urlPattern: /\/vhs\//,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'aulirex-vhs' },
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // Vendors en chunks propios: se cachean entre deploys de código de app y
        // no inflan el chunk principal.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('react-router') || id.includes('/@remix-run/')) return 'vendor-router'
          if (id.includes('react-dom') || id.includes('/react/') || id.includes('/scheduler/'))
            return 'vendor-react'
          if (id.includes('katex')) return 'vendor-katex'
          if (id.includes('@supabase')) return 'vendor-supabase'
          if (id.includes('dexie')) return 'vendor-dexie'
        },
      },
    },
  },
})
