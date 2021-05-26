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