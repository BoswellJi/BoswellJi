## uniapp 是如何让 vue 在小程序运行时运行的

## 依赖模块
- ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js：uni core
  - 暴露的api:
    - createApp
    - createPage
    - createComponent
    - createPlugin
    - createSubpackageApp
    - uni: baseApi,todoApis,extraApi,eventApi,api,wx

- ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js：vue core 修改后的
  - 暴露的api:
    - Vue

- ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js： component core

- ./node_modules/@babel/runtime/regenerator/index.js: ployfill
- ./node_modules/regenerator-runtime/runtime.js: ployfill
- (webpack)/buildin/global.js:

## 文件
- runtime.js: webpack 的模块加载器
- vendor.js: 运行时的依赖库(mpvue)
- main.js: app.js

## 小程序初始化

- 从main.js模块开始执行，这里会执行
  - new Vue()
  - createApp()根组件没有视图，所以不需要amount方法

- 接着是页面的初始化
  - createPage()
  - Vue.extend()
  - attached中实例化组件：将组件中的data初始化为响应式对象
  - amount实例化观察者Watcher来观察数据变更

- 没有安装组件的步骤`mountComponent`:
  - 因为模板是直接编译为 wxml 文件;

- 创建组件实例：
  - 从 new Vue()开始，这个是根实例；App.wxml`createApp`,在main.js中，_init方法初始化的是当前组件的各种功能；
  - 从 Vue.extend()开始，这个是组件；Page.wxml`createPage`
  - 从 Vue.extend()开始，这个是组件；Component.wxml`createComponent`

- 依赖注入（provide/inject）:
  - Vue.component()创建组件时，`this.init()`调用初始化方法中处理；
  - 每个组件有$parent,从当前组件开始，一层一层向上找;

## 修改响应式数据

- this.props = 'value';
  - watcher.run();
    - vm._update(vm_render(),hydrating);

