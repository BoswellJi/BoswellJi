import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import mpa from 'vite-plugin-mpa'
import htmlTemplate from 'vite-plugin-html-template-mpa'

const env = process.env.NODE_ENV || ''
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    mpa({
      open: '/home',
      rewrites: [
        // { from: /\/home/, to: '/src/pages/home/index.html' },
        // { from: /\/list/, to: '/src/pages/list/index.html' }
      ]
    }),
    htmlTemplate({
      // pagesDir: 'src/pages',
      pages: {
        home: {
          injectOptions: {
            data: {
              env
            }
          }
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
