## babel(现代js编译器)


## 插件

* babel polyfills：能够通过不同策略将不同polyfill注入到编译代码中；`api填补(core.js,regenerator)`
  - polyfill providers: 注入方法；
  - method：
    - entry-global：整个全部导出；
    - usage-global：只导入使用到的api;
    - usage-pure：局部变量不污染全局；

* 