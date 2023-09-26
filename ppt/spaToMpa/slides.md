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

# 当前单页应用功能

- 通路由实现页面地址，使得页面之间跳转与老项目一致`(路径一致问题)`
- 公共模块，组件，样式，类型等等的维护与开发`(公共模块开发维护问题)`
- 模板如何动态修改`(模板维护问题)`
- 构建产物目标的更改`(构建产物问题)`

---

<div class="flex justify-center items-center h-[100%]">
  <h1>多页如何实现单页的功能?</h1>
</div>

---

# 路径一致问题

<div class="flex justify-center items-center h-[70%]">
  利用给开发服务器中添加一个拥有代理能力的中间件来实现，相当于路由做到后端了。
</div>

---

# 公共模块开发维护问题

<div class="flex justify-center items-center h-[70%]">
  和之前的用法一致，不同是每个页面都是一个Vue应用实例，需要每个入口都添加（冗余问题，可以通过抽象模块来减轻）
</div>

---

# 模板维护问题

<div class="flex justify-center items-center h-[70%]">
  在构建流程中通过ejs渲染引擎对html进行模板增强
</div>

---

# 构建产物问题

<div class="flex justify-center items-center h-[70%]">
  在构建流程中通过对html进行进行目标写入，同时修改.net配置文件
</div>


---

<div class="flex justify-center items-center h-[100%]">
  <h1>最重要的多页构建能力如何做?</h1>
</div>

---

<div class="flex justify-center items-center h-[100%]">
  <h1>多页能力其实是vite的内置能力，通过修改vite的构建输入参数即可获得，从多页配置中获取到对应的输入关系</h1>
</div>