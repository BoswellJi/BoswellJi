# uniapp

* vue是源代码，mini program是目标代码；所以底层重渲染时是setData，vue是dom操作；

## 构建编译流程（构建工具基于通过vue-cli）

* 初始化构建工具的配置参数，Service类的实例化；
  - 获取package.json的配置；
  - 解析应用中使用的vue-cli插件，`/^(@vue\/|vue-|@[\w-]+(\.)?[\w-]+\/vue-)cli-plugin-/`插件名称的规则

* 获取命令行的命令与参数来决定如何构建；

* 执行命令；
  + 获取环境类型；
  + 根据`--skip-plugins`参数初始化需要被跳过的插件；
  + 加载环境变量，加载用户配置，应用插件,注册命令；
  + 验证命令是否存在；
  + 执行命令的回调函数；
    - 获取配置的webpack配置文件，执行webpack函数，进行编译打包；


* 编译时插件
  + webpack
    - webpack-uni-mp-loader: 将vue文件编译到小程序文件；
    - webpack-uni-pages-loader：生成小程序的./project.config.json文件；

  + vue-cli
    - vue-cli-plugin-hbuilderx: hbuilderX的vue-cli插件，用来编译打包；
    - vue-cli-plugin-uni：vue-cli新增命令；
    - vue-cli-plugin-uni-optimize：生成代码的优化；


## 运行时流程（依赖于vue）

* createApp创建小程序app,createPage创建页面,createComponent创建组件,createSubpackageApp创建子包；
* 根据响应式属性来触发更新，接着重新渲染；
* render不会生成vnode;
* patch对比data而不是vnode,接着调用setData;
 

## 功能

* uniapp不会影响直接使用小程序api,`wx.showLoading()`；
* 底层自动差量数据更新，简单而高性能；

## 跨端小程序的区别和重心：

* DSL和多端适配；

## 小程序架构

* 逻辑层 Data
* 视图层 Event
* 原生能力 JSBridge

* 声明周期
* 模板转换
* 数据映射
* 事件代理

## 运行时模拟

* ProvidePlugin,使用webpack插件注入到模块中；


## 跨端框架编译到小程序

* vue -> wxml wxss js json
  - app,page,component

## 跨端框架中的通用内容

* 组件跨端；
* api跨端；
* 各端的特色；（每个端都会有不同的

## uniapp使用了vue的哪些功能？

* 响应式系统；
* 组件化系统；
* slot组件；
* vuex状态管理;
* 生命周期；

## 没有使用vue的哪些功能？

* vnode: vue在小程序中没有vnode的概念，因为直接是vue模板到mini模板;
* router: 小程序中是页面与页面之间的跳转的，vue是组件与组件；
* diff: 小程序中diff的是data；

[vue的支持程度](http://uniapp.dcloud.io/vue-api?id=%E5%85%A8%E5%B1%80%E9%85%8D%E7%BD%AE)