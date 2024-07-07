## http 安全

## xss（跨站点脚本

* 向数据库中注入js脚本代码，用户访问到浏览器中执行脚本，获取用户信息；

## csrf/xsrf/sea surf/session riding（跨站点请求伪造

* 行为：用户访问正常服务器，服务器返回身份认证信息，之后用户打开恶意网站，恶意网站`（利用用户的登陆状态）`自动发送用户对正常服务器的请求，获取用信息；
  - 主要在于cookie的samesite`同源策略,即:站点cookie所存的samesite字段的值被恶意网站匹配到,所以可以拿到用户的信息`

## 跨域

* 请求头自定义字段需要配置到cors的响应头中；