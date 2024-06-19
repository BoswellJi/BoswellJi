<template><div><h1 id="移动端-1-像素问题及解决办法" tabindex="-1"><a class="header-anchor" href="#移动端-1-像素问题及解决办法"><span>移动端 1 像素问题及解决办法</span></a></h1>
<h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题"><span>问题</span></a></h2>
<p>在移动端 web 开发中，UI 设计稿中设置边框为 1 像素，前端在开发过程中如果出现 border:1px，测试会发现在某些机型上，1px 会比较粗，即是较经典的移动端 1px 像素问题？</p>
<h2 id="原因" tabindex="-1"><a class="header-anchor" href="#原因"><span>原因</span></a></h2>
<ol>
<li>当设备像素比不为 1 时，1css 像素不再是 1 物理像素；</li>
</ol>
<h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案"><span>解决方案</span></a></h2>
<ol>
<li>
<p>使用背景颜色；</p>
</li>
<li>
<p>获取机器的设备像素比，使用 js 动态设置像素大小；</p>
</li>
<li>
<p>设置 1px 的渐变背景，50%有颜色，50%透明</p>
</li>
</ol>
<div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="line"><span class="token selector">.border</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">background</span><span class="token punctuation">:</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span>180deg<span class="token punctuation">,</span> black<span class="token punctuation">,</span> black 50%<span class="token punctuation">,</span> transparent 50%<span class="token punctuation">)</span> top left /</span>
<span class="line">      100% 1px no-repeat<span class="token punctuation">,</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span></span>
<span class="line">        90deg<span class="token punctuation">,</span></span>
<span class="line">        black<span class="token punctuation">,</span></span>
<span class="line">        black 50%<span class="token punctuation">,</span></span>
<span class="line">        transparent 50%</span>
<span class="line">      <span class="token punctuation">)</span> top right / 1px 100% no-repeat<span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">linear-gradient</span><span class="token punctuation">(</span>0<span class="token punctuation">,</span> black<span class="token punctuation">,</span> black 50%<span class="token punctuation">,</span> transparent 50%<span class="token punctuation">)</span> bottom right / 100% 1px</span>
<span class="line">      no-repeat<span class="token punctuation">,</span> <span class="token function">linear-gradient</span><span class="token punctuation">(</span>-90deg<span class="token punctuation">,</span> black<span class="token punctuation">,</span> black 50%<span class="token punctuation">,</span> transparent 50%<span class="token punctuation">)</span> bottom</span>
<span class="line">      left / 1px 100% no-repeat<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>box-shadow</li>
</ol>
<div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="line"><span class="token selector">.shadow</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">-webkit-box-shadow</span><span class="token punctuation">:</span> 0 1px 1px -1px <span class="token function">rgba</span><span class="token punctuation">(</span>255<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0.5<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">box-shadow</span><span class="token punctuation">:</span> 0 1px 1px -1px <span class="token function">rgba</span><span class="token punctuation">(</span>255<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0<span class="token punctuation">,</span> 0.5<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5">
<li>viewport 合 rem 结合</li>
</ol>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span></span>
<span class="line">  <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no<span class="token punctuation">"</span></span></span>
<span class="line"><span class="token punctuation">/></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>meta</span></span>
<span class="line">  <span class="token attr-name">name</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>viewport<span class="token punctuation">"</span></span></span>
<span class="line">  <span class="token attr-name">content</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>initial-scale=0.3333333333333333, maximum-scale=0.3333333333333333, minimum-scale=0.3333333333333333, user-scalable=no<span class="token punctuation">"</span></span></span>
<span class="line"><span class="token punctuation">/></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6">
<li>使用:before，或者:after 伪元素来模拟边框</li>
</ol>
<div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="line"><span class="token selector">.scale-1px</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">position</span><span class="token punctuation">:</span> relative<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token selector">.scale-1px:after</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">''</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">background</span><span class="token punctuation">:</span> #000<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">width</span><span class="token punctuation">:</span> 100%<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">height</span><span class="token punctuation">:</span> 1px<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">-webkit-transform</span><span class="token punctuation">:</span> <span class="token function">scaleY</span><span class="token punctuation">(</span>0.5<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">scaleY</span><span class="token punctuation">(</span>0.5<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">-webkit-transform-origin</span><span class="token punctuation">:</span> 0 0<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">transform-origin</span><span class="token punctuation">:</span> 0 0<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="line"><span class="token selector">.scale-1px</span> <span class="token punctuation">{</span></span>
<span class="line">      position<span class="token punctuation">:</span> relative<span class="token punctuation">;</span></span>
<span class="line">      margin-bottom<span class="token punctuation">:</span> 20px<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">border</span><span class="token punctuation">:</span> none<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token selector">.scale-1px:after</span> <span class="token punctuation">{</span></span>
<span class="line">      content<span class="token punctuation">:</span> <span class="token string">''</span><span class="token punctuation">;</span></span>
<span class="line">      position<span class="token punctuation">:</span> absolute<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span></span>
<span class="line">      left<span class="token punctuation">:</span> 0<span class="token punctuation">;</span></span>
<span class="line">      border<span class="token punctuation">:</span> 1px solid #000<span class="token punctuation">;</span></span>
<span class="line">      -webkit-box-sizing<span class="token punctuation">:</span> border-box<span class="token punctuation">;</span></span>
<span class="line">      box-sizing<span class="token punctuation">:</span> border-box<span class="token punctuation">;</span></span>
<span class="line">      width<span class="token punctuation">:</span> 200%<span class="token punctuation">;</span></span>
<span class="line">      height<span class="token punctuation">:</span> 200%<span class="token punctuation">;</span></span>
<span class="line">      -webkit-transform<span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>0.5<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      transform<span class="token punctuation">:</span> <span class="token function">scale</span><span class="token punctuation">(</span>0.5<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">      -webkit-transform-origin<span class="token punctuation">:</span> left top<span class="token punctuation">;</span></span>
<span class="line">      transform-origin<span class="token punctuation">:</span> left top<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>还是要根据设备像素比来处理：</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">if</span> <span class="token punctuation">(</span>window<span class="token punctuation">.</span>devicePixelRatio <span class="token operator">&amp;&amp;</span> devicePixelRatio <span class="token operator">>=</span> <span class="token number">2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'div'</span><span class="token punctuation">)</span><span class="token punctuation">.</span>className <span class="token operator">=</span> <span class="token string">'scale-1px'</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


