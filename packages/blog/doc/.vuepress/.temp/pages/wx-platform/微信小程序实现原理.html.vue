<template><div><h2 id="微信小程序" tabindex="-1"><a class="header-anchor" href="#微信小程序"><span>微信小程序</span></a></h2>
<h2 id="packages" tabindex="-1"><a class="header-anchor" href="#packages"><span>packages</span></a></h2>
<ul>
<li><a href="https://github.com/Z-HNAN/wxmp-qrcode" target="_blank" rel="noopener noreferrer">wxmp-qrcode</a></li>
</ul>
<h2 id="底层原理" tabindex="-1"><a class="header-anchor" href="#底层原理"><span>底层原理</span></a></h2>
<h2 id="架构" tabindex="-1"><a class="header-anchor" href="#架构"><span>架构</span></a></h2>
<ul>
<li>
<p>web woker + iframe</p>
<ul>
<li>防止跳转页面之后，当前页面的会被擦除掉：
<ul>
<li>浏览器：将iframe盖在最上面；</li>
<li>超级app: 将webview盖在最上面；</li>
</ul>
</li>
</ul>
</li>
<li>
<p>web worker : 逻辑层（线程</p>
</li>
<li>
<p>iframe： 渲染层（线程</p>
</li>
</ul>
<h2 id="运行时" tabindex="-1"><a class="header-anchor" href="#运行时"><span>运行时</span></a></h2>
<ul>
<li>小程序对js的支持程度：
<ul>
<li>语法：babel</li>
<li>api: polyfill</li>
</ul>
</li>
</ul>
<h2 id="页面生命周期" tabindex="-1"><a class="header-anchor" href="#页面生命周期"><span>页面生命周期</span></a></h2>
<h3 id="视图线程" tabindex="-1"><a class="header-anchor" href="#视图线程"><span>视图线程</span></a></h3>
<ul>
<li>初始化 -&gt; 初始化完成(通知) -&gt; 等待数据通知 -&gt; 首次渲染(通知) -&gt; 空闲 -&gt; 重新渲染 (重复)；</li>
</ul>
<h3 id="服务线程" tabindex="-1"><a class="header-anchor" href="#服务线程"><span>服务线程</span></a></h3>
<ul>
<li>创建 -&gt; onLoad 创建完成 onShow (等待通知) -&gt; 发送初始数据 -&gt; onReady -&gt; 交互 send data -&gt; onHide 存活 -&gt; onShow 活跃 -&gt; onUnload；</li>
</ul>
</div></template>


