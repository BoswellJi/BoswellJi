import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("E:/code1/BoswellJi/blog-source-code/node_modules/@vuepress/theme-default/lib/client/layouts/404.vue")),
  "Layout": defineAsyncComponent(() => import("E:/code1/BoswellJi/blog-source-code/node_modules/@vuepress/theme-default/lib/client/layouts/Layout.vue")),
}
