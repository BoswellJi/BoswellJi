---
title: Slidev 介绍
subtitle: 由浅入深的 Slidev 分享
author: 你的名字
date: 2026-02-05
---

# 什么是 Slidev？

- Slidev (slide + dev, /slaɪdɪv/) 是一个为开发者设计的<span v-mark.highlight.yellow="1">基于 Web</span> 的幻灯片制作工具。
- 以 <span v-mark.highlight.yellow="1">Markdown</span> 的形式专注于编写幻灯片的内容，并制作出具有<span v-mark.highlight.yellow="1">交互式演示功能的</span>、<span v-mark.highlight.yellow="1">高度可自定义</span>的幻灯片

---

# 为什么选择 Slidev？

- Microsoft PowerPoint 
- Apple Keynote 

--- 

# 特性

<div class="flex items-center justify-center mt-[100px] text-[20px]">
通过一些特性来了解Slidev
</div>

---

# 开源且免费

<div class="flex items-center justify-center mt-[100px] text-[20px]">
从项目本身到生态，Slidev 都是完全开源且免费的。
</div>

--- 

# 使用熟悉的技术

```
slidev/
├── slides.md          # 主幻灯片文件
├── package.json       # 项目依赖配置
├── vercel.json        # 部署配置（可选）
├── components/        # 自定义 Vue 组件
├── public/            # 静态资源（图片、字体等）
├── layouts/           # 自定义布局
└── styles/            # 自定义样式
```

---

# Markdown 语法支持

- 标题、列表、图片、链接
- 代码块、引用、表格
- 数学公式（KaTeX 支持）

---

# HTML+Tailwind CSS

```html
<div class="flex items-center justify-center mt-[100px] text-[20px]">
从项目本身到生态，Slidev 都是完全开源且免费的。
</div>
```

---

# Vue

```vue
<template>
  <button @click="increment">点击计数：{{ count }}</button>
</template>
<script setup lang="ts">
// 可以直接在幻灯片中运行 JavaScript 代码
const greeting = 'Hello, Slidev!'
console.log(greeting)

// 使用 Vue 响应式数据
import { ref } from 'vue'
const count = ref(0)
const increment = () => count.value++
</script>
```

---

# 支持代码高亮

```js {1|2-3}
function hello(name) {
  console.log('Hello, ' + name)
}
hello('Slidev')
```

---

# 代码运行

<btn />

---

# 动画-点击动画


<!-- 组件用法：
     在你按下"下一步"之前，这将是不可见的 -->
<v-click> Hello World! </v-click>

<!-- 指令用法：
     在你第二次按下"下一步"之后，这将变为可见 -->
<div v-click class="text-xl"> Hey! </div>

---
transition: fade
---

# 动画-motion动画

<div
  v-motion
  :initial="{ x: -80 }"
  :enter="{ x: 0 }"
  :leave="{ x: 80 }"
>
  Slidev
</div>

---
transition: fade
---

# 动画-幻灯片过渡

- fade - 淡入/淡出
- fade-out - 淡出然后淡入
- slide-left - 向左滑动（向后时向右滑动）
- slide-right - 向右滑动（向后时向左滑动）
- slide-up - 向上滑动（向后时向下滑动）
- slide-down - 向下滑动（向后时向上滑动）
- view-transition - 通过 View Transitions API

---

# Vue 组件支持

```
your-slidev/
  ├── ...
  ├── slides.md
  └── components/
      ├── ...
      └── MyComponent.vue
```

<btn class="mt-[100px]"/>

---
layout: quote
---

# 布局-quote（引用）

> 希望是附丽在存在上的，有存在，便有希望。
>
> —— 鲁迅

---
layout: quote
---

# 布局-quote（引用）

> 希望是附丽在存在上的，有存在，便有希望。
>
> —— 鲁迅


---

# 布局-预设布局

- default - 默认布局
- title - 标题页
- intro - 介绍页
- image - 图片布局
- image-right - 右侧图片
- statement - 声明页
- section - 分节
- two-cols - 两列布局
- two-cols-header - 带标题的两列
- center - 居中布局
- end - 结束页
- cover - 封面

---

# 导出与部署

- 导出 PDF：`slidev export`
- 导出图片：`slidev export --format png`


---

# 线上部署

- 构建为静态网页

```bash
slidev build
```

---

# Slidev 的基本用法

1. 安装 Slidev：
   ```bash
   npm i -g @slidev/cli
   ```
2. 创建项目：
   ```bash
   slidev create my-slides
   ```
3. 启动预览：
   ```bash
   npm run dev
   ```


---

# 资源与社区

- 官方文档：https://sli.dev
- 主题市场：https://sli.dev/themes
- 插件市场：https://sli.dev/plugins
- GitHub：https://github.com/slidevjs/slidev


