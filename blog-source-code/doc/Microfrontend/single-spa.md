## 拆分应用

- 拆分代码仓库，构建，部署

## 拆分方法

- One code repo, one build
- npm package
- Monorepos
- Dynamic Module Loading

## Import Maps

## SystemJS

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

## 运行流程

- registerApplication(): 注册微应用
  - sanitizeArguments(): 处理参数(边界情况处理)： 参数形式，参数有效性，规范化参数/统一参数格式
  - apps.push(): 新增一个微应用实例
    - `{loadErrorTime,status,parcels,devtools,name,loadApp,activeWhen,customProps}`
  - ensureJQuerySupport():
  - reroute():
