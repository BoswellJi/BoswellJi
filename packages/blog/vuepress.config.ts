import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  base: '/MyBlog/',
  lang: 'en-US',
  title: 'Hello, Boswell!',
  description: "Boswell's blog",
  theme: defaultTheme()
})
