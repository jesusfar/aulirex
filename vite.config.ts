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
      // El service worker rompía la navegación del iframe del selector VHS
      // (NavigationRoute + redirect 307 de /vhs/index.html → net::ERR_FAILED) y
      // causó pantallas en negro. Se auto-destruye: desregistra el SW de todos
      // los usuarios y limpia sus caches, dejando una web app normal (sin offline
      // de assets). Todas las optimizaciones de bundle/imágenes se conservan.
      selfDestroying: true,
      workbox: {
        // Precache el "app shell" + el selector VHS (es la puerta de entrada y se
        // carga como navegación en un iframe). Lo pesado y esporádico (bancos JSON
        // de Medicina, 3Dmol, imágenes) se cachea en runtime, on-demand.
        globPatterns: ['**/*.{js,css,html,woff2}'],
        globIgnores: ['assets/banco-*.js', 'assets/*3Dmol*.js'],
        maximumFileSizeToCacheInBytes: 700 * 1024,
        // El iframe del VHS navega a /vhs/index.html: NO debe recibir el fallback
        // SPA (que devolvía el index.html de la app y rompía el selector → negro).
        navigateFallbackDenylist: [/^\/vhs\//],
        cleanupOutdatedCaches: true,
        // El SW nuevo toma control de inmediato: los usuarios con un SW viejo
        // (que podia servir un shell/assets desactualizados) se recuperan solos.
        skipWaiting: true,
        clientsClaim: true,
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
            urlPattern: /\.(?:png|jpe?g|svg|webp|gif|mp3)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'aulirex-media',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
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
