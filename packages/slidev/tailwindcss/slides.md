---
# You can also start simply with 'default'
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# background: https://cover.sli.dev
# some information about your slides (markdown enabled)
title: TailwindCss
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
---

# TailwindCss

---
layout: center
---

# TailwindCss是什么

一个utility-first(实用程序优先/工具优先)的CSS框架，包含flex，pt-4，text-center和rotate-90等类，可以直接在标记中组合以构建任何设计。

---
layout: center
---

# TailwindCss解决了什么问题

快速构建现代网站，而无需离开HTML。

---
layout: center
---

# TailwindCss核心理念

Tailwind CSS 的核心设计理念是“工具类优先”（Utility-First），一种通过工具类而非自定义CSS来实现快速样式设计，它开箱即提供颜色、填充、边距、显示等数百种CSS属性的工具，这种方法的好处是可以快速地创建原型，并且可以更直观地理解每个元素的样式，由于所有的样式都直接写在了元素上，实现了真正的所见即所得，不用离开HTML即可快速写出各种样式。

---
layout: image
image: ./images/image.png
backgroundSize: none
---

# 通过一个例子来体验它与传统css开发的不同

---
layout: two-cols
---


```html
<div class="chat-notification">
  <div class="chat-notification-logo-wrapper">
    <img class="chat-notification-logo" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div class="chat-notification-content">
    <h4 class="chat-notification-title">ChitChat</h4>
    <p class="chat-notification-message">You have a new message!</p>
  </div>
</div>
```
<div class="mt-[50px]"></div>

# 传统的CSS写法

::right::


```css
.chat-notification {
  display: flex;
  align-items: center;
  max-width: 24rem;
  margin: 0 auto;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
.chat-notification-logo-wrapper {
  flex-shrink: 0;
}
.chat-notification-logo {
  height: 3rem;
  width: 3rem;
}
.chat-notification-content {
  margin-left: 1.5rem;
}
.chat-notification-title {
  color: #1a202c;
  font-size: 1.25rem;
  line-height: 1.25;
}
.chat-notification-message {
  color: #718096;
  font-size: 1rem;
  line-height: 1.5;
}
```

---
layout: image-left
image: ./images/image1.png
backgroundSize: contain
---

# TailwindCss写法

<v-switch>
<template #1> 

  ```html
  <div>
    <div >
      <img  src="/img/logo.svg" alt="ChitChat Logo">
    </div>
    <div>
      <div >ChitChat</div>
      <p >You have a new message!</p>
    </div>
  </div>
  ```

</template>
<template #2-5> 

  ```html
  <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
    <div class="shrink-0">
      <img class="size-12" src="/img/logo.svg" alt="ChitChat Logo">
    </div>
    <div>
      <div class="text-xl font-medium text-black">ChitChat</div>
      <p class="text-slate-500">You have a new message!</p>
    </div>
  </div>
  ```

</template>
</v-switch>

<div v-click="3" class="mt-1">
其中的每一个类都是tailwindcss工具类。这种方法允许我们实现完全自定义的组件设计，而无需编写一行自定义 CSS。
</div>

---
layout: default
---

# 有哪些好处

<div v-click="1">

1. 不用想选择器名称了

</div>
<div v-click="2">

2. css文件不在随着页面的增加而大大增加

</div>

<div v-click="3">

3. 不用再担心破坏全局样式，编写样式没有心智负担，安全开发

</div>


---
layout: default
---

# 是不是和内联样式有些相似

<div v-click="3" class=" text-[30px] text-red">
  有哪些好处?
</div>

<div v-click.hide="3">
  <div v-click="1" class="flex items-center mt-[50px]">
    内联样式&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    ```html{2}
    <div 
      style="color:red; font-size:12px; font-weight:blod;"
    >
      tailwindcss
    </div>
    ```
  </div>

  <div v-click="2" class="flex items-center mt-[50px]">
    tailwindcss写法&nbsp;&nbsp;
    ```html{2}
    <div 
      class="text-red text-[12px] font-bold"
    >
      tailwindcss
    </div>
    ```
  </div>
</div>


---
layout: image-left
image: ./images/image2.png
backgroundSize: 100% 100%
---

<div v-click="1">
  有约束的设计: 内置主题以及自定义主题
</div>

<div v-click="2">
（页面主题包括色彩方案、排版、布局以及其他视觉元素，这些元素共同定义了用户界面的整体外观和用户体验
</div>

---
layout: image-left
image: ./images/image3.png
backgroundSize: 100% auto
---

<div v-click="1">
响应式设计: 构建自适应用户界面
</div>

---
layout: image-left
image: ./images/image4.png
backgroundSize: 100% auto
---

<div v-click="1">

悬停、聚焦和其他状态

</div>

---
layout: center
---

# 以上体现出来的问题是什么
<div class="text-center text-[red]" v-click>
重复的工具类组合的可维护性问题。
</div>

---
layout: center
---

```html{1-2|all}
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
</button>

<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
</button>

<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
</button>
```

<div v-click="3" class="text-center text-red">
如何解决？
</div>


---
layout: default
---

# 方案一

多光标编辑 

<img src="./images/image6.png" class="h-[90%] mx-auto my-0" />


---
layout: default
---

# 方案二

模板引擎能力: for循环语句

---
layout: default
---

# 方案三


组件提取: 如果你需要在多个文件中重用某些样式，最好的策略是创建一个组件

<img src="./images/image5.png" class="h-[90%] mx-auto my-0" />


---

# 方案四

使用 @apply 提取类：Tailwind 的 @apply 指令在模板部分感觉笨重时将重复的工具模式提取到自定义 CSS 类。

<img src="./images/image7.png" class="h-[90%] mx-auto my-0" />
