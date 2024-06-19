<template><div><h2 id="介绍" tabindex="-1"><a class="header-anchor" href="#介绍"><span>介绍</span></a></h2>
<p>Single-spa 是一个将多个单页面应用聚合为一个整体应用的 JavaScript 微前端框架。</p>
<h2 id="拆分应用" tabindex="-1"><a class="header-anchor" href="#拆分应用"><span>拆分应用</span></a></h2>
<ul>
<li>拆分代码仓库，构建，部署</li>
</ul>
<h2 id="拆分方法" tabindex="-1"><a class="header-anchor" href="#拆分方法"><span>拆分方法</span></a></h2>
<ul>
<li>One code repo, one build</li>
<li>npm package</li>
<li>Monorepos</li>
<li>Dynamic Module Loading</li>
</ul>
<h2 id="systemjs" tabindex="-1"><a class="header-anchor" href="#systemjs"><span>SystemJS</span></a></h2>
<p>通用模块加载器</p>
<h2 id="import-maps" tabindex="-1"><a class="header-anchor" href="#import-maps"><span>Import Maps</span></a></h2>
<p>模块别名</p>
<h2 id="生命周期" tabindex="-1"><a class="header-anchor" href="#生命周期"><span>生命周期</span></a></h2>
<p>微应用的安装，都在微应用自身的生命周期之中；</p>
<ul>
<li>bootstrap</li>
<li>mount</li>
<li>unmount</li>
<li>unload</li>
</ul>
<h2 id="缺点" tabindex="-1"><a class="header-anchor" href="#缺点"><span>缺点</span></a></h2>
<ul>
<li>缺少脚本隔离</li>
<li>缺少样式隔离</li>
<li>加载的是 <code v-pre>js</code> 模块'</li>
</ul>
<h2 id="运行机制" tabindex="-1"><a class="header-anchor" href="#运行机制"><span>运行机制</span></a></h2>
<ul>
<li>
<p>registerApplication(): 注册微应用</p>
<ul>
<li>
<p>sanitizeArguments(): 处理参数(边界情况处理)： 参数形式，参数有效性，规范化参数/统一参数格式</p>
</li>
<li>
<p>apps.push(): 新增一个微应用实例， <code v-pre>{loadErrorTime,status,parcels,devtools,name,loadApp,activeWhen,customProps}</code></p>
</li>
<li>
<p>ensureJQuerySupport(): 为了保证 jquery 注册事件时，<code v-pre>hashchange</code>,<code v-pre>popstate</code>两个事件被正确绑定</p>
</li>
<li>
<p>reroute(): 根据路由匹配情况，重新处理子应用</p>
<ul>
<li>
<p>getAppChanges(): 将微应用根据状态进行分类</p>
<ul>
<li>appsToLoad: 加载失败，未被加载，正在加载源代码</li>
<li>appsToMount: 未被启动，未被安装但路径活跃的</li>
<li>appsToUnmount: 已被安装</li>
<li>appsToUnload: 未被启动，未被安装并且路径不活跃的</li>
</ul>
</li>
<li>
<p>loadApps(): （start()前）开始加载微应用</p>
<ul>
<li>toLoadPromise(): 加载微应用并修改微应用状态</li>
<li>callAllEventListeners():</li>
</ul>
</li>
<li>
<p>performAppChanges(): （start()后）开始安装微应用</p>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p>start(): 开始处理微应用</p>
<ul>
<li>reroute(): 根据路由匹配情况，重新处理子应用</li>
</ul>
</li>
</ul>
</div></template>


