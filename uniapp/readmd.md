# uniapp

* vue是源代码，mini program是目标代码；所以底层重渲染时是setData，vue是dom操作；

## 构建

* 使用vue-cli插件将vue dsl转换为小程序 dsl;
* 将小程序wx对象包装成uni对象；
* vue-cli-service uni-build：自定vue-cli命令与插件；
* 根据平台类型编译模板；
* 使用webpack作为打包工具，添加插件，模块等处理源码；
* 插件
  - WebpackUniAppPlugin
  - WebpackUniMPPlugin

## 响应式

* 使用Vue处理；

## diff

* 对比data,而不是vnode;


