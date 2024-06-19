<template><div><h2 id="微信登录" tabindex="-1"><a class="header-anchor" href="#微信登录"><span>微信登录</span></a></h2>
<ol>
<li>根据参数<code v-pre>公众平台账号的后台</code>生成登录二维码；</li>
<li>扫码登录，微信服务器添加登录信息参数，通知页面重定向指定页面；</li>
<li>自己服务器拿到登录参数信息后，获取用户的<code v-pre>token</code>进行存储，这个<code v-pre>token</code>可以获取微信信息，登录成功；</li>
</ol>
<h2 id="微信分享" tabindex="-1"><a class="header-anchor" href="#微信分享"><span>微信分享</span></a></h2>
<ul>
<li>微信对话窗口中打开的字符串链接，分享都为字符串链接，不会为卡片，尽管配置了<code v-pre>wx jssdk</code>;</li>
</ul>
</div></template>


