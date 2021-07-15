## babel(现代js编译器)

* 转换新语法；
* 点上缺失特性；

## 插件

* babel polyfills：能够通过不同策略将不同polyfill注入到编译代码中；`api填补(core.js,regenerator)`
  - polyfill providers: 注入方法；
  - method：
    - entry-global：整个全部导出；
    - usage-global：只导入使用到的api;
    - usage-pure：局部变量不污染全局；

## 作为next javascript的编译器，怎么保证能够及时在项目里使用最新特性？（babel与标准如何同步）

* @babel/preset-env: 编译js代码的编译器预先配置,纯tc39标准的语法，api；

## browserslist的配置项目：

* defaults:
* by usage statistics:
* last versions:
* dead:
* nodejs versions:
* brosers version:
* extends broserslist-config-myproject:
* supports es6-module:
* browserslist config:
* since 2015 or last 2 years
* unreleased versions or unreleased chrome versions:
* not ie<=8

## babel版本
"@babel/core": "^7.14.6"

* 这个版本中支持的ecmascript语法是怎样的，版本情况？

"@babel/preset-env": "^7.14.7"
"core-js@3.8"

* 这个版本中支持ecmascript的api的polyfill是怎样的，版本情况？

## 版本更新

* 早期预设废弃；
* 阶段预设废弃；
* @babel/polyfill中移除提案polyfills;

## 组成部分

* 主要的babel包只转换js语法;
