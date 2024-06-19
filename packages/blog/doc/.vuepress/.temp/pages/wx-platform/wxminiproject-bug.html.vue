<template><div><h2 id="小程序分享" tabindex="-1"><a class="header-anchor" href="#小程序分享"><span>小程序分享</span></a></h2>
<p>可以是个空函数，所以不要当作废代码给去掉。</p>
<h2 id="swiper组件的圆角" tabindex="-1"><a class="header-anchor" href="#swiper组件的圆角"><span><code v-pre>swiper</code>组件的圆角</span></a></h2>
<p><a href="https://developers.weixin.qq.com/community/develop/doc/00026658428810dd8c07c062556400?highLine=swiper%2520%25E5%259C%2586%25E8%25A7%2592" target="_blank" rel="noopener noreferrer">解决方案</a></p>
<h2 id="安全区域" tabindex="-1"><a class="header-anchor" href="#安全区域"><span>安全区域</span></a></h2>
<ol>
<li>使用<code v-pre>wx.getSystemInfo()</code>获取屏幕的安全区域，在安全区域中开发页面。</li>
<li>使用<code v-pre>wx.getMenuButtonBoundingClientRect()</code>获取胶囊信息来计算。</li>
</ol>
<h2 id="字体垂直居中问题" tabindex="-1"><a class="header-anchor" href="#字体垂直居中问题"><span>字体垂直居中问题</span></a></h2>
<p>可能是行高带来的问题</p>
<h2 id="webview加载静态html缓存厉害" tabindex="-1"><a class="header-anchor" href="#webview加载静态html缓存厉害"><span><code v-pre>webview</code>加载静态<code v-pre>html</code>缓存厉害</span></a></h2>
<p>利用<code v-pre>url</code>上带时间戳</p>
<h2 id="webview页面的标题" tabindex="-1"><a class="header-anchor" href="#webview页面的标题"><span><code v-pre>webview</code>页面的标题</span></a></h2>
<p><code v-pre>android</code>下，获取的页面<code v-pre>title</code>,空白也一样获取。
<code v-pre>ios</code>下，获取的页面<code v-pre>title</code>,空白就获取小程序自身的兜底标题。</p>
<h2 id="阻止事件冒泡" tabindex="-1"><a class="header-anchor" href="#阻止事件冒泡"><span>阻止事件冒泡</span></a></h2>
<p>使用<code v-pre>view</code>进行溢出滚动同时阻止<code v-pre>touchmove</code>事件(<code v-pre>catchtouchmove</code>)向上冒泡影响<code v-pre>page</code>是不行的，需要使用<code v-pre>scroll-view</code>。</p>
</div></template>


