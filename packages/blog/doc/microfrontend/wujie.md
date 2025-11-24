# 微前端框架Wujie(无界)技术实践

## 目录

- 什么是微前端
- 微前端的应用场景有哪些
- 主流的微前端方案有哪些
- 我们为什么选用wujie
- wujie的基本用法
- wujie的运行机制
- 基于wujie的系统架构

## 什么是微前端

微前端是一种多个团队通过独立发布功能的方式来共同构建现代化 web 应用的技术手段及方法策略。

## 微前端的应用场景有哪些

- 平台级别集成各个分散的子系统。
- 巨大的应用，为了降低开发和维护成本，分拆成多个小应用进行开发和部署。
- 在现有系统中做新技术尝试。

## 主流的微前端方案有哪些

- iframe
- single-spa
- qiankun
- wujie
- module-federation

## 我们为什么选用wujie

- 组件方式来使用微前端
- 一个页面可以同时激活多个子应用
- 天然 js 沙箱，不会污染主应用环境
- 应用切换没有清理成本

## wujie的基本用法

### 主应用

#### 非框架用法

```ts
import { bus, setupApp, preloadApp, startApp, destroyApp } from 'wujie'

// 注册子应用
setupApp({
  name: '唯一id',
  url: '子应用地址',
  exec: true,
  el: '容器',
  sync: true
})

// 启动子应用
startApp({ name: '唯一id' })
```

#### 框架用法(Vue示例)

```ts
import { WujieVue } from "wujie-vue3";

// 注册子应用
setupApp({
  name: "唯一id",
  url: "子应用地址",
});

// 启动子应用
<WujieVue  name="唯一id" :url="子应用地址"></WujieVue>
```

#### 框架用法(React示例)

```ts
import { WujieReact } from "wujie-react";

// 注册子应用
setupApp({
  name: "唯一id",
  url: "子应用地址",
});

// 启动子应用
<WujieReact name="唯一id" url="子应用地址" />
```

### 子应用

无界对子应用注入了$wujie对象，可以通过$wujie或者window.$wujie获取

## wujie的运行机制

- js 沙箱：iframe
- css 沙箱：web component

## 基于wujie的系统架构

![alt text](image-10.png)
