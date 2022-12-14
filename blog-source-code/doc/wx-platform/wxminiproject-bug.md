## 小程序分享

可以是个空函数，所以不要当作废代码给去掉。

## swiper组件的圆角

[解决方案](https://developers.weixin.qq.com/community/develop/doc/00026658428810dd8c07c062556400?highLine=swiper%2520%25E5%259C%2586%25E8%25A7%2592)

## 安全区域

1. 使用`wx.getSystemInfo()`获取屏幕的安全区域，在安全区域中开发页面。
2. 使用`wx.getMenuButtonBoundingClientRect()`获取胶囊信息来计算。

## 字体垂直居中问题

可能是行高带来的问题

## webview加载静态html缓存厉害

利用url上带时间戳