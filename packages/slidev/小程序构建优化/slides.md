---
# You can also start simply with 'default'
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# background: https://cover.sli.dev
# some information about your slides (markdown enabled)
title: 小程序构建优化工作报告
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
---

# 小程序构建优化工作报告

---
layout: center
---

<h1 class="text-center"> 背景 </h1>


基于`gulp`构建的旅仓小程序，每次启动项目耗时严重，且开发过程中项目变更也同样如此，使得开发过程痛苦不堪。

---
layout: center
---
 
<h1 class="text-center">什么是gulp?</h1>

Gulp 是一个基于 Node.js 的流式构建工具，主要用于前端开发中的自动化任务管理。它允许开发者定义一系列的任务来自动化常见的工作流程，如代码压缩、文件合并、CSS 预处理、浏览器自动刷新等。Gulp 通过编写简单且可读的任务代码，显著提高了开发效率。
 

---
layout: center
---

<h1 class="text-center">基本运行机制演示图</h1>

<img src="/images/1.png" class="block m-auto  w-[70%]"  />


---
layout: center
---

<h1 class="text-center">构建流程</h1>

<img src="./images/旅仓构建流程图.png" />
---
layout: center
---

<h1 class="text-center">gulp构建流程</h1>

<img src="./images/gulp构建流程图.png" class="w-[50%] m-auto" />


---
layout: center
---

<h1 class="text-center">启动项目耗时</h1>

<img src="/images/2.png" class="block m-auto  w-[70%]"  />

---
layout: center
---

<h1 class="text-center">更新项目耗时</h1>


<h4 class="m-auto  w-[70%] my-[10px]">js更新</h4>

<img src="/images/3.png" class="block m-auto  w-[70%]"  />

<h4  class="m-auto  w-[70%] my-[10px]">css更新</h4>

<img src="/images/4.png" class="block m-auto  w-[70%]"  />

---
layout: center
---

<h1 v-click="0" class="text-center">我们要解决的问题？</h1>

<h3 v-click="1">1. 启动过程中的构建系统优化</h3>
<h3 v-click="2">2. 开发过程中的构建系统优化</h3>


---

# 开发过程中的构建优化



---
layout: center
---

[Presentation Slides for Developers](https://sli.dev)