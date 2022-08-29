### 拆分应用

- 拆分代码仓库，构建，部署

#### 拆分方法

- One code repo, one build
- npm package
- Monorepos
- Dynamic Module Loading

## Import Maps

## SystemJS

## 配置信息

- registerApplication: 参数
  - 应用名
  - 加载函数
  - 激活函数
    - hashchange 和 popstate 事件触发时
    - pushState 和 replaceState 被调用时
    - single-spa 手动调用`triggerAppChanges`方法
    - `checkActivityFunction`方法被调用时
  - 自定义参数

## 生命周期

- bootstrap
- mount
- unmount
- unload
