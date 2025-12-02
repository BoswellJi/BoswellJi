---
# You can also start simply with 'default'
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# background: https://cover.sli.dev
# some information about your slides (markdown enabled)
title: wujie
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
background: ./bg.png
---

# wujie(无界)

## 极致的微前端框架

---

# 微前端的发展历程

```mermaid

timeline
    2002: Single Page Application
    2004: ActiveXObject + Gmail
    2005: Ajax + Google Maps
    2010: AngularJS + SPA
    2014: 微服务
    2016: 微前端

```

---

## layout: center

# 什么是微前端

### 将<span v-mark.highlight.yellow="0">微服务</span>的思想拓展到前端的一种<span v-mark.highlight.yellow="0">新兴架构</span>，背后主要思想是将一个单体项目，拆解为多个较小的部分，以便多个相对独立的团队进行分工写作。

---

## layout: two-cols

# 微前端的三大核心模块

<img src="./image-1.png" class="w-[100%]"/>

::right::

<div class="flex flex-col justify-center h-[100%]">

- 基座应用：作为「容器 + 调度中心」，提供全局路由、公共配置，通过 加载器 管理所有子应用
- 加载器：基座的核心子模块，是「基座与子应用的桥梁」
- 子应用：独立的业务模块

</div>

---

## layout: center

# 微前端的设计原则

<div v-click="1">1. 技术栈无关：基座不限制微应用的技术栈，微应用可使用 React、Vue 等任意框架，甚至无框架</div>
<div v-click="2">2. 独立开发 / 部署: 每个微应用是独立的代码库，有自己的 CI/CD 流程，发布不依赖其他微应用；</div>
<div v-click="3">3. 隔离运行: 微应用的 JS、CSS 不会污染全局环境，运行时状态互不干扰（如全局变量、事件监听、样式冲突）；</div>
<div v-click="4">4. 用户体验一致: 尽管技术栈不同，微应用间的路由切换、样式风格、交互逻辑需保持统一，让用户感知不到「拆分」</div>

---

# 适合使用微前端的场景

- 大型复杂应用的拆分
- 多团队协作开发
- 技术栈多样化
- 渐进式迁移

<img src="./image-2.png" class="display w-[70%] mt-[50px] absolute bottom-0 right-0"/>

---

## layout: center

# 主流的微前端方案有哪些

- iframe
- single-spa
- qiankun
- wujie
- module-federation

---

# iframe

iframe 是 HTML 中的一个内联框架元素，核心作用是在当前页面中嵌入另一个独立的 HTML 文档（可来自同一域名或跨域名），形成「页面嵌套页面」的效果。嵌入的文档拥有独立的 DOM、BOM、CSS 样式环境和 JavaScript 执行上下文，与父页面完全隔离，互不干扰。

<div class="flex">
  <div>
    <div class="text-[20px] font-bold">优点</div>
    <div>非常简单，使用没有任何心智负担</div>
    <div>web应用隔离的非常完美，无论是js、css、dom都完全隔离开来</div>
  </div>
  <div>
    <div class="text-[20px] font-bold">缺点</div>
    <div>路由状态丢失，刷新一下，iframe的url状态就丢失了</div>
    <div>dom割裂严重，弹窗只能在iframe内部展示，无法覆盖全局</div>
    <div>web应用之间通信非常困难</div>
  </div>
</div>

---
layout: center
---

# 我们为什么选用wujie

- 组件方式来使用微前端
- 一个页面可以同时激活多个子应用
- 天然 js 沙箱，不会污染主应用环境
- 天然 css 沙箱，不会污染主应用样式
- 应用切换没有清理成本
- 子应用保活

---
layout: center
---

# wujie的运行机制

- js 沙箱：iframe
- css 沙箱：web component

---

## layout: center

# 基于wujie的系统架构

<div class=" flex items-center justify-center h-[100%] w-[100%]">
  <div class=" flex items-center justify-center h-[100%] w-[70%]">

![alt text](./image.png)

  </div>
</div>

---

## layout: center

[Presentation Slides for Developers](https://sli.dev)
