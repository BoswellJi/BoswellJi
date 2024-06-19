<template><div><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span>介绍</span></a></h2>
<p>qiankun 是一个基于 single-spa 的微前端实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统。</p>
<h2 id="涉及到的技术" tabindex="-1"><a class="header-anchor" href="#涉及到的技术"><span>涉及到的技术</span></a></h2>
<ul>
<li>single-spa</li>
<li>sandbox</li>
<li>import-html-entry</li>
</ul>
<h2 id="样式隔离的实现" tabindex="-1"><a class="header-anchor" href="#样式隔离的实现"><span>样式隔离的实现</span></a></h2>
<ul>
<li>沙箱的<code v-pre>scoped css</code>功能；</li>
<li><code v-pre>Web Component</code> 的 <code v-pre>Shadow DOM</code> 隔离；</li>
</ul>
<h2 id="脚本隔离的实现" tabindex="-1"><a class="header-anchor" href="#脚本隔离的实现"><span>脚本隔离的实现</span></a></h2>
<ul>
<li>沙盒</li>
</ul>
<h2 id="运行机制" tabindex="-1"><a class="header-anchor" href="#运行机制"><span>运行机制</span></a></h2>
<ul>
<li>
<p>registerMicroApps():</p>
<ul>
<li>registerApplication()：遍历配置的微应用，调用<code v-pre>Single-spa</code>的注册</li>
<li>loader(): 微应用安装完成之前的加载处理</li>
<li>loadApp()：加载微应用
<ul>
<li>genAppInstanceIdByName()：根据子应用名称，生成一个应用实例 id</li>
<li>configuration：获取对于框架的全局配置</li>
<li>importEntry(): 从应用入口导入 html 和脚本</li>
<li>getDefaultTplWrapper(): 获取子应用的入口 html 片段</li>
<li>createSandboxContainer(): 创建沙盒</li>
<li>parcelConfigGetter(): 子应用启动，安装，卸载生命周期</li>
</ul>
</li>
</ul>
</li>
<li>
<p>start():</p>
<ul>
<li>doPrefetchStrategy(): 默认预加载微应用</li>
<li>startSingleSpa(): 调用<code v-pre>Single-spa</code>的<code v-pre>start()</code></li>
</ul>
</li>
</ul>
</div></template>


