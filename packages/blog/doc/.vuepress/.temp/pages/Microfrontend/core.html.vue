<template><div><h2 id="微前端" tabindex="-1"><a class="header-anchor" href="#微前端"><span>微前端</span></a></h2>
<p>组织应用规模的解决方案，将应用相互拆分独立，使得开发者不会干涉其他应用。</p>
<h3 id="微应用" tabindex="-1"><a class="header-anchor" href="#微应用"><span>微应用</span></a></h3>
<ul>
<li>所有普通的 spa</li>
</ul>
<h4 id="微前端框架的必备特性" tabindex="-1"><a class="header-anchor" href="#微前端框架的必备特性"><span>微前端框架的必备特性</span></a></h4>
<ul>
<li>
<p>注册微应用</p>
<ul>
<li>先给每个微应用设置初始状态</li>
<li>重写监听器注册函数</li>
<li>重写用户导航的会话记录状态</li>
<li>重定向路由
<ul>
<li>获取微应用的状态</li>
<li>执行卸载，加载，安装微应用</li>
</ul>
</li>
</ul>
</li>
<li>
<p>资源加载: 加载微应用代码</p>
<ul>
<li>html 入口访问：通过<code v-pre>import-entry-html</code>获取页面源码字符串；</li>
<li>js 入口访问：当作 ES 模块来使用；</li>
</ul>
</li>
<li>
<p>环境隔离(沙盒)：执行代码<code v-pre>css,js</code></p>
<ul>
<li>iframe</li>
<li>ShadowDOM</li>
<li>快照沙箱</li>
<li>代理沙箱</li>
</ul>
</li>
<li>
<p>应用内通信</p>
<ul>
<li>首先原则是：保持微前端解耦</li>
</ul>
</li>
</ul>
<h4 id="涉及到的技术" tabindex="-1"><a class="header-anchor" href="#涉及到的技术"><span>涉及到的技术</span></a></h4>
<ul>
<li>Web Component
<ul>
<li>Shadow DOM</li>
<li>CustomEvent</li>
</ul>
</li>
<li>JS SandBox
<ul>
<li>Proxy</li>
<li>通过给执行的 js 包一层<code v-pre>with(global){}</code>实现</li>
<li><code v-pre>iframe</code>实现</li>
<li>根据当前微应用，生成一份<code v-pre>window</code>状态,离开后还原<code v-pre>指定微应用</code>状态实现</li>
</ul>
</li>
<li>样式隔离
<ul>
<li>通过添加选择器实现</li>
<li>通过切换样式<code v-pre>删除，添加</code>实现</li>
</ul>
</li>
<li>元素隔离</li>
<li>预加载</li>
<li>多框架兼容</li>
<li>应用间通信</li>
<li>渲染原理</li>
<li>资源地址补全</li>
<li>插件系统</li>
<li>数据通信</li>
</ul>
<h4 id="沙箱" tabindex="-1"><a class="header-anchor" href="#沙箱"><span>沙箱</span></a></h4>
<ul>
<li>浏览器沙箱</li>
<li>js 沙箱</li>
</ul>
</div></template>


