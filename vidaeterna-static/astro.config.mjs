// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import AstroPWA from '@vite-pwa/astro';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // URL de producción — requerida por sitemap y canonical URL
  site: 'https://epicchurchintl.org',

  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap(),
    AstroPWA({
      registerType: 'autoUpdate',

      // Archivos estáticos a precachear
      includeAssets: [
        'favicon.ico',
        'favicon.svg',
        'apple-touch-icon-180x180.png',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'maskable-icon-512x512.png',
      ],

      // Manifiesto de la app
      manifest: {
        name: 'Epic Church',
        short_name: 'Epic Church',
        description: 'Epic Church — A community of faith in Sayreville, NJ',
        theme_color: '#10375B',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        lang: 'en',
        categories: ['religion', 'lifestyle'],
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        shortcuts: [
          {
            name: 'Watch Live',
            short_name: 'Watch Live',
            url: '/watch-live',
            icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
          },
          {
            name: 'Sermons',
            short_name: 'Sermons',
            url: '/sermons',
            icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
          },
          {
            name: 'Give',
            short_name: 'Give',
            url: '/give',
            icons: [{ src: 'pwa-192x192.png', sizes: '192x192' }],
          },
        ],
        screenshots: [
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Epic Church',
          },
        ],
      },

      // Estrategias de caché con Workbox
      workbox: {
        // Precachear todos los assets estáticos del build
        globPatterns: ['**/*.{css,js,html,svg,png,jpg,jpeg,ico,webp,woff,woff2,txt}'],

        // No usar fallback de navegación (sitio estático multi-página)
        navigateFallback: null,

        runtimeCaching: [
          // Fuentes e íconos externos — CacheFirst (larga duración)
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 año
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },

          // CDN externo (AOS, etc.) — CacheFirst
          {
            urlPattern: /^https:\/\/unpkg\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unpkg-cdn',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },

          // Imágenes de Unsplash — CacheFirst
          {
            urlPattern: /^https:\/\/images\.unsplash\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'unsplash-images',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 días
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },

          // Imágenes de Epic Church — CacheFirst
          {
            urlPattern: /^https:\/\/www\.epicchurchintl\.org\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'epic-church-assets',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 días
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },

          // Videos — NetworkFirst (demasiado grandes para cachear completamente)
          {
            urlPattern: /\.(mp4|webm|ogg|mp3)$/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'media-files',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24, // 1 día
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },

      // Solo en producción
      devOptions: {
        enabled: false,
      },
    }),
  ],
});
