## 微信小程序

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

## 页面生命周期

### 视图线程

* 初始化 -> 初始化完成(通知) -> 等待数据通知 -> 首次渲染(通知) -> 空闲 -> 重新渲染 (重复)；

### 服务线程

* 创建 -> onLoad 创建完成 onShow (等待通知) -> 发送初始数据 -> onReady -> 交互 send data -> onHide 存活 -> onShow 活跃 -> onUnload；