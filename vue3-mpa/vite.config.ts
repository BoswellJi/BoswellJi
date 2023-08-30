import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createMpaPlugin } from 'vite-plugin-virtual-mpa'

import pages from './build/page'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    createMpaPlugin({
      pages,
      scanOptions: {
        scanDirs: 'src/pages',
        entryFile: 'main.ts'
      }
    })
  ],
  server: {
    open: '/home'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
