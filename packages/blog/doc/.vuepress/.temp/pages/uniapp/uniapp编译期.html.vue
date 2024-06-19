<template><div><h2 id="uniapp与vue编译结果的异同" tabindex="-1"><a class="header-anchor" href="#uniapp与vue编译结果的异同"><span>uniapp与vue编译结果的异同</span></a></h2>
<h2 id="模板" tabindex="-1"><a class="header-anchor" href="#模板"><span>模板</span></a></h2>
<ul>
<li>uniapp编译到<code v-pre>wxml</code>;vue编译到<code v-pre>渲染函数（render function</code>;</li>
</ul>
<h2 id="main-js的选项-参数option" tabindex="-1"><a class="header-anchor" href="#main-js的选项-参数option"><span>main.js的选项（参数option</span></a></h2>
<ul>
<li>uniapp的是App的选项；vue的是Vue构造函数的选项;</li>
</ul>
<div class="language-uniapp line-numbers-mode" data-highlighter="prismjs" data-ext="uniapp" data-title="uniapp"><pre v-pre class="language-uniapp"><code><span class="line">1. app.$mount()</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><div class="language-mini line-numbers-mode" data-highlighter="prismjs" data-ext="mini" data-title="mini"><pre v-pre class="language-mini"><code><span class="line">1. createApp(app).$mount();</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="样式" tabindex="-1"><a class="header-anchor" href="#样式"><span>样式</span></a></h2>
<ul>
<li>uniapp编译到<code v-pre>wxss</code>；vue编译到<code v-pre>css</code>;</li>
</ul>
<h2 id="app-vue" tabindex="-1"><a class="header-anchor" href="#app-vue"><span>App.vue</span></a></h2>
<ul>
<li>uniapp编译到<code v-pre>pages</code>；vue编译到<code v-pre>component/createComponent</code>;</li>
</ul>
<h2 id="page-vue" tabindex="-1"><a class="header-anchor" href="#page-vue"><span>page.vue</span></a></h2>
<div class="language-uniapp line-numbers-mode" data-highlighter="prismjs" data-ext="uniapp" data-title="uniapp"><pre v-pre class="language-uniapp"><code><span class="line">1. export default {};</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><div class="language-mini line-numbers-mode" data-highlighter="prismjs" data-ext="mini" data-title="mini"><pre v-pre class="language-mini"><code><span class="line">1. createPage({});</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="component-vue" tabindex="-1"><a class="header-anchor" href="#component-vue"><span>component.vue</span></a></h2>
<div class="language-uniapp line-numbers-mode" data-highlighter="prismjs" data-ext="uniapp" data-title="uniapp"><pre v-pre class="language-uniapp"><code><span class="line">1. export default {};</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><div class="language-mini line-numbers-mode" data-highlighter="prismjs" data-ext="mini" data-title="mini"><pre v-pre class="language-mini"><code><span class="line">1. createComponent({});</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


