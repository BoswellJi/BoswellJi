<template><div><h1 id="块级格式化上下文-block-formatting-context" tabindex="-1"><a class="header-anchor" href="#块级格式化上下文-block-formatting-context"><span>块级格式化上下文（block formatting context）</span></a></h1>
<h2 id="什么是-box" tabindex="-1"><a class="header-anchor" href="#什么是-box"><span>什么是 Box?</span></a></h2>
<ul>
<li>盒模型，每个 html 元素有自己的盒模型;</li>
<li>不同类型的 box 会参与不同的 Formatting Context;</li>
</ul>
<h2 id="什么是-formatting-context" tabindex="-1"><a class="header-anchor" href="#什么是-formatting-context"><span>什么是 formatting context</span></a></h2>
<ul>
<li>页面的一块渲染区域，有一套自己的渲染规则，它决定着子元素将如何定位，以及与其他元素的关系和相互作用；</li>
<li>常见的<code v-pre>formatting context</code>有<code v-pre>block formatting context(BFC)</code>,<code v-pre>inline formatting context(IFC)</code>,css3 中有<code v-pre>GFC,FFC</code>；</li>
<li>容器内的子元素不会影响到外面的元素；</li>
</ul>
<h2 id="bfc-中的布局规则" tabindex="-1"><a class="header-anchor" href="#bfc-中的布局规则"><span>BFC 中的布局规则</span></a></h2>
<ul>
<li>内部 box 会垂直方向，一个接一个放置；</li>
<li><strong>box 垂直方向的距离有 margin 决定，属于同一个 BFC 的两个相邻 margin 会发生重叠</strong></li>
<li>BFC 的区域不会与 float box 重叠；</li>
<li>计算 BFC 的高度时，浮动元素也参与计算；</li>
<li>BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此；</li>
<li>每个盒子（块盒与行盒）的 margin box 的左边，与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此；</li>
</ul>
<h2 id="创建-bfc" tabindex="-1"><a class="header-anchor" href="#创建-bfc"><span>创建 BFC</span></a></h2>
<div class="language-txt line-numbers-mode" data-highlighter="prismjs" data-ext="txt" data-title="txt"><pre v-pre class="language-txt"><code><span class="line">1. float 的值不为 none;</span>
<span class="line">2. position 的值不是 static 或者 relative;</span>
<span class="line">3. display 的值是 inline-block,table-cell,flex,table-caption 或者 inline-flex;</span>
<span class="line">4. overflow 的值不是 visible;</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="bfc-的作用" tabindex="-1"><a class="header-anchor" href="#bfc-的作用"><span>BFC 的作用</span></a></h2>
<p>根据 BFC 容器的布局规则，在需要的时候，创建 BFC 容器来布局。</p>
<ol>
<li>避免 margin 重叠，父子元素的 margin 重叠。由于 BFC 是一个独立的区域，内部的元素和外部的元素互不影响，将两个元素变为两个 BFC，就解决了 margin 重叠的问题，兄弟元素的 margin 重叠。</li>
<li>自适应两栏布局；可以用来创建自适应两栏布局：左边的宽度固定，右边的宽度自适应。</li>
</ol>
<div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="line"><span class="token selector">.left</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">height</span><span class="token punctuation">:</span> 200px<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">float</span><span class="token punctuation">:</span> left<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token selector">.right</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">background</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>left<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>right<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>清除浮动，父元素高度塌陷问题</li>
</ol>
</div></template>


