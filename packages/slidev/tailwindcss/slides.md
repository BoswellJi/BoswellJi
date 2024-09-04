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

# 看一个例子

---
layout: two-cols
---

# HTML

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

# 传统的CSS编写方式

::right::

# CSS

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
layout: default
---

# TailwindCss写法

<div v-click.hide>

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

</div>


<div v-click>

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

</div>

---
layout: center
---

<v-switch>
  <template #1> show at click 1, hide at click 2. </template>
  <template #2> show at click 2, hide at click 5. </template>
  <template #5-7> show at click 5, hide at click 7. </template>
</v-switch>



