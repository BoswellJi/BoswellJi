import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createMpaPlugin } from 'vite-plugin-virtual-mpa'
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import { pages, rewrites } from './build/page'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    createMpaPlugin({
      pages,
      rewrites,
      scanOptions: {
        scanDirs: 'src/pages',
        entryFile: 'main.ts',
      },
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  server: {
    open: '/Home/Index'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // outDir: '../TC.Dis.Lvcang.Web/Scripts/Lvcang',
    emptyOutDir: true
  }
})
