## 微信登录

1. 根据参数`公众平台账号的后台`生成登录二维码；
2. 扫码登录，微信服务器添加登录信息参数，通知页面重定向指定页面；
3. 自己服务器拿到登录参数信息后，获取用户的`token`进行存储，这个`token`可以获取微信信息，登录成功；


## 微信分享

* 微信对话窗口中打开的字符串链接，分享都为字符串链接，不会为卡片，尽管配置了`wx jssdk`;