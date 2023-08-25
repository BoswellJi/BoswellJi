import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import mpa from 'vite-plugin-multi-pages'
import htmlTemplate from 'vite-plugin-html-template-mpa'

const env = process.env.NODE_ENV || ''
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    mpa({
      scanDir: 'src/pages'
    }),
    htmlTemplate({
      pagesDir: 'src/pages',
      pages: {
        home: {
          filename: '${pageName}/index.html',
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
