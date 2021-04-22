## packages

* [wxmp-qrcode](https://github.com/Z-HNAN/wxmp-qrcode)

## 底层原理

## 架构

* web woker + iframe
  - 防止跳转页面之后，当前页面的会被擦除掉：
    - 浏览器：将iframe盖在最上面；
    - 超级app: 将webview盖在最上面；

* web worker : 逻辑层（线程

* iframe： 渲染层（线程

## 运行时

* 小程序对js的支持程度：
  - 语法：babel
  - api: polyfill