## 小程序分享

可以是个空函数，所以不要当作废代码给去掉。

## `swiper`组件的圆角

[解决方案](https://developers.weixin.qq.com/community/develop/doc/00026658428810dd8c07c062556400?highLine=swiper%2520%25E5%259C%2586%25E8%25A7%2592)

## 安全区域

1. 使用`wx.getSystemInfo()`获取屏幕的安全区域，在安全区域中开发页面。
2. 使用`wx.getMenuButtonBoundingClientRect()`获取胶囊信息来计算。

## 字体垂直居中问题

可能是行高带来的问题

## `webview`加载静态`html`缓存厉害

利用`url`上带时间戳

## `webview`页面的标题

`android`下，获取的页面`title`,空白也一样获取。
`ios`下，获取的页面`title`,空白就获取小程序自身的兜底标题。

## 阻止事件冒泡

使用`view`进行溢出滚动同时阻止`touchmove`事件(`catchtouchmove`)向上冒泡影响`page`是不行的，需要使用`scroll-view`。