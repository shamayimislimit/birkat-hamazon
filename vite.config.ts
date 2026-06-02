import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { VitePWA } from 'vite-plugin-pwa';
import config from './src/config.json';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/birkat-hamazon/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    mode === "development" && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico'],
      manifest: {
        name: `${config.app.title.hebrew} - ${config.dedication.hebrew}`,
        short_name: 'ברכת המזון',
        description: `${config.app.title.english} - ${config.dedication.english}`,
        theme_color: '#1f2937',
        background_color: '#fafaf9',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/birkat-hamazon/',
        scope: '/birkat-hamazon/',
        icons: [
          {
            src: '/birkat-hamazon/app-icon.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          },
          {
            src: '/birkat-hamazon/app-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
