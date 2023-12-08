## 介绍

qiankun 是一个基于 single-spa 的微前端实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统。

## 涉及到的技术

- single-spa
- sandbox
- import-html-entry

## 样式隔离的实现

- 沙箱的`scoped css`功能；
- `Web Component` 的 `Shadow DOM` 隔离；

## 脚本隔离的实现

- 沙盒

## 运行机制

- registerMicroApps():

  - registerApplication()：遍历配置的微应用，调用`Single-spa`的注册
  - loader(): 微应用安装完成之前的加载处理
  - loadApp()：加载微应用
    - genAppInstanceIdByName()：根据子应用名称，生成一个应用实例 id
    - configuration：获取对于框架的全局配置
    - importEntry(): 从应用入口导入 html 和脚本
    - getDefaultTplWrapper(): 获取子应用的入口 html 片段
    - createSandboxContainer(): 创建沙盒
    - parcelConfigGetter(): 子应用启动，安装，卸载生命周期

- start():

  - doPrefetchStrategy(): 默认预加载微应用
  - startSingleSpa(): 调用`Single-spa`的`start()`
