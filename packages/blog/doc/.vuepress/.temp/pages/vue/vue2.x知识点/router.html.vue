<template><div><h2 id="重要概念" tabindex="-1"><a class="header-anchor" href="#重要概念"><span>重要概念</span></a></h2>
<ul>
<li>RouteRecord：路由记录</li>
</ul>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="line"><span class="token keyword">interface</span> <span class="token class-name">RouteRecord</span> <span class="token punctuation">{</span></span>
<span class="line">  path<span class="token operator">:</span> <span class="token builtin">string</span></span>
<span class="line">  regex<span class="token operator">:</span> RegExp</span>
<span class="line">  components<span class="token operator">:</span> Dictionary<span class="token operator">&lt;</span>Component<span class="token operator">></span></span>
<span class="line">  instances<span class="token operator">:</span> Dictionary<span class="token operator">&lt;</span>Vue<span class="token operator">></span></span>
<span class="line">  name<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span></span>
<span class="line">  parent<span class="token operator">?</span><span class="token operator">:</span> RouteRecord</span>
<span class="line">  redirect<span class="token operator">?</span><span class="token operator">:</span> RedirectOption</span>
<span class="line">  matchAs<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span></span>
<span class="line">  meta<span class="token operator">:</span> <span class="token builtin">any</span></span>
<span class="line">  beforeEnter<span class="token operator">?</span><span class="token operator">:</span> <span class="token punctuation">(</span></span>
<span class="line">    route<span class="token operator">:</span> Route<span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">redirect</span><span class="token operator">:</span> <span class="token punctuation">(</span>location<span class="token operator">:</span> RawLocation<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function-variable function">next</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token keyword">void</span></span>
<span class="line">  <span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token builtin">any</span></span>
<span class="line">  props<span class="token operator">:</span></span>
<span class="line">    <span class="token operator">|</span> <span class="token builtin">boolean</span></span>
<span class="line">    <span class="token operator">|</span> Object</span>
<span class="line">    <span class="token operator">|</span> RoutePropsFunction</span>
<span class="line">    <span class="token operator">|</span> Dictionary<span class="token operator">&lt;</span><span class="token builtin">boolean</span> <span class="token operator">|</span> Object <span class="token operator">|</span> RoutePropsFunction<span class="token operator">></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Route: 路线/路由
<ul>
<li>路由中的一条线路；</li>
</ul>
</li>
</ul>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="line"><span class="token keyword">interface</span> <span class="token class-name">Route</span> <span class="token punctuation">{</span></span>
<span class="line">  path<span class="token operator">:</span> <span class="token builtin">string</span></span>
<span class="line">  name<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span></span>
<span class="line">  hash<span class="token operator">:</span> <span class="token builtin">string</span></span>
<span class="line">  query<span class="token operator">:</span> Dictionary<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">></span></span>
<span class="line">  params<span class="token operator">:</span> Dictionary<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span></span>
<span class="line">  fullPath<span class="token operator">:</span> <span class="token builtin">string</span></span>
<span class="line">  matched<span class="token operator">:</span> RouteRecord<span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token comment">// 匹配到路线记录</span></span>
<span class="line">  redirectedFrom<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span></span>
<span class="line">  meta<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">any</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Location：位置/地点
<ul>
<li>对url的结构化描述；</li>
</ul>
</li>
</ul>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="line"><span class="token keyword">interface</span> <span class="token class-name">Location</span> <span class="token punctuation">{</span></span>
<span class="line">  name<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span></span>
<span class="line">  path<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span></span>
<span class="line">  hash<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">string</span></span>
<span class="line">  query<span class="token operator">?</span><span class="token operator">:</span> Dictionary<span class="token operator">&lt;</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token punctuation">(</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token operator">|</span> <span class="token keyword">null</span> <span class="token operator">|</span> <span class="token keyword">undefined</span><span class="token operator">></span></span>
<span class="line">  params<span class="token operator">?</span><span class="token operator">:</span> Dictionary<span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span></span>
<span class="line">  append<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span></span>
<span class="line">  replace<span class="token operator">?</span><span class="token operator">:</span> <span class="token builtin">boolean</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>match: function</p>
<ul>
<li>找到匹配的Route</li>
</ul>
</li>
<li>
<p>路由的跳转有两种方式触发：</p>
<ul>
<li>手动route.push，改写history stack，触发route的响应式，重新渲染视图；</li>
<li>浏览器的前进，自动触发popstate事件，后退按钮，触发route的响应式，重新渲染视图；</li>
</ul>
</li>
</ul>
<h2 id="初始化路由表" tabindex="-1"><a class="header-anchor" href="#初始化路由表"><span>初始化路由表</span></a></h2>
<ul>
<li>createMatcher();</li>
<li>createRouteMap()
<ul>
<li>pathList：路径列表</li>
<li>pathMap: 路径与RouteRecord映射，别名当作路径</li>
<li>nameMap：名字/路径别名与RouteRecord映射</li>
</ul>
</li>
<li>addRouteRecord();
<ul>
<li>record instance</li>
<li>children</li>
<li>alias</li>
<li>name</li>
</ul>
</li>
</ul>
<h2 id="初始化路由跳转流程" tabindex="-1"><a class="header-anchor" href="#初始化路由跳转流程"><span>初始化路由跳转流程</span></a></h2>
<ul>
<li>new VueRouter()</li>
<li>new Vue()</li>
<li>beforeCreate</li>
<li>_router.init</li>
<li>transitionTo</li>
</ul>
<h2 id="手动路由跳转流程" tabindex="-1"><a class="header-anchor" href="#手动路由跳转流程"><span>手动路由跳转流程</span></a></h2>
<ul>
<li>this.$router.push:</li>
<li>history.push</li>
<li>history.transitionTo</li>
<li>this.$router.match：获取目标路由</li>
<li>normalizeLocation：获取目标地址</li>
<li>history.confirmTransition</li>
<li>守护任务</li>
<li>history.confirmTransition回调</li>
<li>updateRoute</li>
<li>replaceState</li>
<li>pushState</li>
<li>handleScroll</li>
<li>afterHook</li>
</ul>
<h2 id="匹配目标路由的使用地方" tabindex="-1"><a class="header-anchor" href="#匹配目标路由的使用地方"><span>匹配目标路由的使用地方</span></a></h2>
<ol>
<li><code v-pre>&lt;view-link&gt;</code>组件，每次数据发生变化都要调用；</li>
<li><code v-pre>history.transitionTo</code>跳转;</li>
</ol>
<h2 id="路由导航" tabindex="-1"><a class="header-anchor" href="#路由导航"><span>路由导航</span></a></h2>
<p><em>这里提一下，跟测试代码类似</em></p>
<ul>
<li>全局</li>
<li>每个路由</li>
<li>组件</li>
</ul>
</div></template>


