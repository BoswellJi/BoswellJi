<template><div><h2 id="http-安全" tabindex="-1"><a class="header-anchor" href="#http-安全"><span>http 安全</span></a></h2>
<h2 id="xss-跨站点脚本" tabindex="-1"><a class="header-anchor" href="#xss-跨站点脚本"><span>xss（跨站点脚本</span></a></h2>
<ul>
<li>向数据库中注入js脚本代码，用户访问到浏览器中执行脚本，获取用户信息；</li>
</ul>
<h2 id="csrf-xsrf-sea-surf-session-riding-跨站点请求伪造" tabindex="-1"><a class="header-anchor" href="#csrf-xsrf-sea-surf-session-riding-跨站点请求伪造"><span>csrf/xsrf/sea surf/session riding（跨站点请求伪造</span></a></h2>
<ul>
<li>行为：用户访问正常服务器，服务器返回身份认证信息，之后用户打开恶意网站，恶意网站<code v-pre>（利用用户的登陆状态）</code>自动发送用户对正常服务器的请求，获取用信息；
<ul>
<li>主要在于cookie的samesite<code v-pre>同源策略,即:站点cookie所存的samesite字段的值被恶意网站匹配到,所以可以拿到用户的信息</code></li>
</ul>
</li>
</ul>
<h2 id="跨域" tabindex="-1"><a class="header-anchor" href="#跨域"><span>跨域</span></a></h2>
<ul>
<li>请求头自定义字段需要配置到cors的响应头中；</li>
</ul>
</div></template>


