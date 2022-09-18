## 介绍

Single-spa 是一个将多个单页面应用聚合为一个整体应用的 JavaScript 微前端框架。

## 拆分应用

- 拆分代码仓库，构建，部署

## 拆分方法

- One code repo, one build
- npm package
- Monorepos
- Dynamic Module Loading

## SystemJS

通用模块加载器

## Import Maps

模块别名

## 生命周期

微应用的安装，都在微应用自身的生命周期之中；

- bootstrap
- mount
- unmount
- unload

## 缺点

- 缺少脚本隔离
- 缺少样式隔离
- 加载的是 `js` 模块'

## 运行机制

- registerApplication(): 注册微应用

  - sanitizeArguments(): 处理参数(边界情况处理)： 参数形式，参数有效性，规范化参数/统一参数格式
  - apps.push(): 新增一个微应用实例

    - `{loadErrorTime,status,parcels,devtools,name,loadApp,activeWhen,customProps}`

  - ensureJQuerySupport(): 为了保证 jquery 注册事件时，`hashchange`,`popstate`两个事件被正确绑定

  - reroute(): 根据路由匹配情况，重新处理子应用

    - getAppChanges(): 将微应用根据状态进行分类

      - appsToLoad: 加载失败，未被加载，正在加载源代码
      - appsToMount: 未被启动，未被安装但路径活跃的
      - appsToUnmount: 已被安装
      - appsToUnload: 未被启动，未被安装并且路径不活跃的

    - loadApps(): （start()前）开始加载微应用

      - toLoadPromise(): 加载微应用并修改微应用状态
      - callAllEventListeners():

    - performAppChanges(): （start()后）开始安装微应用

- start(): 开始处理微应用

  - reroute(): 根据路由匹配情况，重新处理子应用
