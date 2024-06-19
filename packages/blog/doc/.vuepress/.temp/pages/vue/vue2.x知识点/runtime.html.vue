<template><div><h2 id="chunk" tabindex="-1"><a class="header-anchor" href="#chunk"><span>chunk</span></a></h2>
<ul>
<li>获取 chunk 的 id;</li>
<li>获取 chunk 中的模块;</li>
</ul>
<h2 id="jsonparray" tabindex="-1"><a class="header-anchor" href="#jsonparray"><span>jsonpArray</span></a></h2>
<ul>
<li>数组中的每个元素都是一个 chunk;</li>
</ul>
<h2 id="installedchunks" tabindex="-1"><a class="header-anchor" href="#installedchunks"><span>installedChunks</span></a></h2>
<ul>
<li>chunk 被加载之后，状态改为 0；</li>
</ul>
<h2 id="modules" tabindex="-1"><a class="header-anchor" href="#modules"><span>modules</span></a></h2>
<ul>
<li>收集每个 chunk 中的模块；</li>
</ul>
<h2 id="deferredmodules" tabindex="-1"><a class="header-anchor" href="#deferredmodules"><span>deferredModules</span></a></h2>
<ul>
<li>延迟模块；</li>
</ul>
<h2 id="checkdeferredmodules" tabindex="-1"><a class="header-anchor" href="#checkdeferredmodules"><span>checkDeferredModules</span></a></h2>
<ul>
<li>开始执行安装好的延迟模块；</li>
</ul>
<h2 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤"><span>步骤</span></a></h2>
<ul>
<li>获取 window.webpackJsonp 数组的值；</li>
<li>保存 jsonpArray 的 push 方法的引用，其中方法的 this 值绑定到 jsonArray;</li>
<li>给 jsonpArray 添加 push 方法（重写）；</li>
<li>复制 jsonpArray;</li>
<li>收集每个 chunk 中的模块；</li>
<li>将延迟执行模块添加到延迟列表中；</li>
<li>checkDeferredModules：执行加载好的 chunk;</li>
</ul>
<h2 id="组件实例" tabindex="-1"><a class="header-anchor" href="#组件实例"><span>组件实例</span></a></h2>
<ul>
<li>new Vue(): Vue</li>
<li>Vue.extend(): Component</li>
</ul>
<h2 id="vue初始化的组件渲染过程" tabindex="-1"><a class="header-anchor" href="#vue初始化的组件渲染过程"><span>vue初始化的组件渲染过程：</span></a></h2>
<ul>
<li>app.$mount</li>
<li>compile(template 编译为 render function)</li>
<li>render
<ul>
<li>createElement
<ul>
<li>createComponent
<ul>
<li>baseCtor.extend(Ctor)</li>
<li>installComponentHooks</li>
<li>实例化 vnode:
<ul>
<li><code v-pre>这里会将子组件的构造函数，设置给componentOptions属性</code>；</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li>update
<ul>
<li>patch
<ul>
<li>createEle
<ul>
<li>createComponent
<ul>
<li>init（vnode init hook）</li>
<li>createComponentInstanceForVnode()
<ul>
<li>new vnode.componentOptions.Ctor(): 通过 vnode 创建组件实例</li>
</ul>
</li>
<li>child.$mount</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="render-function" tabindex="-1"><a class="header-anchor" href="#render-function"><span>render function</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">var</span> <span class="token function-variable function">render</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">var</span> _vm <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">var</span> _h <span class="token operator">=</span> _vm<span class="token punctuation">.</span>$createElement<span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">var</span> _c <span class="token operator">=</span> _vm<span class="token punctuation">.</span>_self<span class="token punctuation">.</span>_c <span class="token operator">||</span> _h<span class="token punctuation">;</span> <span class="token comment">// createElement</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token function">_c</span><span class="token punctuation">(</span></span>
<span class="line">    <span class="token string">"div"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">[</span></span>
<span class="line">      <span class="token function">_c</span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">on</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token literal-property property">testClickHandle</span><span class="token operator">:</span> _vm<span class="token punctuation">.</span>appClickhandle <span class="token punctuation">}</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">      <span class="token function">_c</span><span class="token punctuation">(</span><span class="token string">"async-example"</span><span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token punctuation">]</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token number">1</span></span>
<span class="line">  <span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


