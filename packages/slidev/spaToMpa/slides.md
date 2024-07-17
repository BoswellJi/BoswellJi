---
theme: seriph
background: https://source.unsplash.com/collection/94734566/1920x1080
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
drawings:
  persist: false
transition: slide-left
title: 从单页应用到多页应用
mdc: true
---

# 从单页应用到多页应用


---

旅仓pc从用户交互形式上更是web网站，比如有打开多窗口需求（从产品列表页打开详情页希望能够从新窗口打开），有关闭当前页面并清除历史记录栈需求（下单之后希望清除下单页历史记录），有通过一个链接直接进去某个页面的需求

所以我就想旅仓应该是多页的，但是最终形态肯定是服务端渲染更好了(nuxt,时间紧，任务重)，但是因为有频繁新窗口的交互，这个肯定不是单页能接受的，每次从重加载，重新执行，所以我就尝试了多页（客户端渲染）

1. 应对多窗口交互
2. 控制资源加载
3. 防止应用崩溃
4. 刚好vite对多页也是开箱即用的
5. 给构建带来并行的想象空间

---

# 什么是单页应用

<div class="my-100px mx-auto w-600px">
  单页应用（英语：single-page application，缩写SPA）是一种网络应用程序或网站的模型，它通过动态重写当前页面来与用户交互，而非传统的从服务器重新加载整个新页面。
</div>

---

# 单页结构视图

<img class="my-0 mx-auto " src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/17/15fc93562b418a6e~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp" />

---

# 什么是多页应用

<div class="my-100px mx-auto w-600px">
  多页应用又称 MPA（Multi Page Application）指有多个独立的页面的应用，每个页面必须重复加载 js,css 等相关资源。多页应用跳转，需要整页资源刷新。
</div>
---

# 多页结构视图

<img class="my-0 mx-auto" src="https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/17/15fc93684b5f10e1~tplv-t2oaga2asx-jj-mark:3024:0:0:0:q75.awebp" />

---

<img class="my-0 mx-auto h-100%" src="/images/diff.png" />

---

# 为什么单页转多页

- 背景：

PC 旅仓系统是传统的 Web 网站应用，这类应用一般交互方式为页面之间通过超链接的方式进行互相连接，且为了用户查看方便，跳转之间不会覆盖上一个页面，而是在新的页面打开，所以网站的架构应当是多页的，页面的资源加载，逻辑执行应当控制在独立的页面依赖范围。

然而，当前采用的单页架构，入口单一，尽管可以打开新页面，但因为只有一个入口，所以存在资源重复加载，逻辑重复执行的不小开销，所以我们决定从单页架构改变到多页架构。

- 目的：

页面隔离，每个页面的资源加载，逻辑执行都在独立的页面依赖范围内，不会和其他页面的资源，逻辑混在一起

---

# 多页构建

- vite开箱即用的多页构建能力<span class="text-red">（配置构建入口）</span>

<img class="my-0 mx-auto h-100%" src="/images/1.png" />

---

# 当前单页应用功能

- 通过路由能力，页面之间跳转与老项目一致`(路径一致问题)`
- 公共模块，组件，样式，类型等等的维护与开发`(公共模块开发维护问题)`
- 模板如何动态修改`(模板维护问题)`
- 构建产物目标的更改`(构建产物问题)`

---

<div class="flex justify-center items-center h-[100%]">
  <h1>多页如何实现单页的功能<span class="text-red">（拉齐功能）?</span></h1>
</div>

---

# 路径一致问题

- 利用给开发服务器中添加一个拥有代理能力的中间件<span class="text-red">`connect-history-api-fallback`</span>来实现，相当于路由做到后端了。

<img class="my-0 mx-auto h-100%" src="/images/2.png" />
---

# 公共模块开发维护问题

<div class="flex justify-center items-center h-[70%]">
  和之前的用法一致，不同是每个页面都是一个Vue应用实例，需要每个入口都添加（冗余问题，可以通过抽象模块来减轻）
</div>
<span class="text-red">简洁，可维护（程序的设计要看场景）</span>


---

# 模板维护问题

- 在构建流程中通过ejs渲染引擎对html进行模板增强
<img class="my-0 mx-auto h-100%" src="/images/3.png" />

---

# 构建产物问题

- 在构建流程中通过对html进行进行目标写入，同时修改.net配置文件
<img class="my-0 mx-auto h-100%" src="/images/4.png" />


## layout: center

---

# 什么是TailwindCSS？

<div class="my-100px mx-auto w-600px text-[30px]">
  一个实用性优先的 CSS 框架，用于快速构建定制的用户界面
</div>

---

# 语法预览

<img src="https://file.40017.cn/elongclub/tail-boswell.png" />

---

# 特点

<div class="flex flex-wrap justify-between  gap-y-[20px]">
  <div class="w-[50%]">
    <h3 class="text-red">不用担心全局样式冲突</h3>
    <div class="">每个类名都是唯一的</div>
  </div>

   <div class="w-[50%]">
    <h3 class="text-red">较好的语义化</h3>
    <div class="">使用 TailwindCss 你不用花精力来定义类名，你可以使用内置具有良好语义化的类名，实现样式效果。</div>
  </div>

  <div class="w-[50%]">
    <h3 class="text-red">开发阶段极度流畅</h3>
    <div class="">搭配补全插件，极速开发</div>
  </div>

  <div class="w-[50%]">
    <h3 class="text-red">代码片段复用能力增强</h3>
    <div class="">一段html，随处可复制粘贴（也是一种复用）。</div>
  </div>

  <div class="w-[50%]">
    <h3 class="text-red">项目的侵入性可控</h3>
    <div class="">给所有类名添加前缀：<span class="text-red">tw-bg-[#fff]</span></div>
  </div>

  <div class="w-[50%]">
    <h3 class="text-red">可渐进式使用</h3>
    <div class="">和老项目一起使用，less,sass,css</div>
  </div>
  
</div>
---

# 缺点

<div class="flex flex-wrap justify-between  gap-y-[20px]">
  <div class="w-[45%]">
    <h3 class="text-red">冗余代码</h3>
    <div>传统的css类的编写一个类可以有多个样式规则，这里都要体现在css的类里面</div>
    <div class="italic text-red">解决方案：利用css的继承特性，html标签的层级嵌套组织（抽象）</div>
  </div>

  <div class="w-[45%]">
    <h3 class="text-red">外部项目组件共享</h3>
    <div>不支持tailwind css的项目，没法使用</div>
    <div class="italic text-red">解决方案：将组件构建出来</div>
  </div>

  <div class="w-[45%]">
    <h3 class="text-red">记忆成本</h3>
    <div>规则很多</div>
    <div class="italic text-red">解决方案：搭配补全插件</div>
  </div>
</div>

---
layout: center
---

[Presentation Slides for Developers](https://sli.dev)
