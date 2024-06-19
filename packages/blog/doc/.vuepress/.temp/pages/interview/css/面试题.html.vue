<template><div><h1 id="css" tabindex="-1"><a class="header-anchor" href="#css"><span>css</span></a></h1>
<h2 id="css3-新增了那些东西" tabindex="-1"><a class="header-anchor" href="#css3-新增了那些东西"><span>CSS3 新增了那些东西？</span></a></h2>
<div class="language-txt line-numbers-mode" data-highlighter="prismjs" data-ext="txt" data-title="txt"><pre v-pre class="language-txt"><code><span class="line">- 选择器</span>
<span class="line"></span>
<span class="line">- 盒子模型属性：border-radius、box-shadow、border-image</span>
<span class="line"></span>
<span class="line">- 背景：background-size、background-origin、background-clip</span>
<span class="line"></span>
<span class="line">- 文本效果：text-shadow、word-wrap</span>
<span class="line"></span>
<span class="line">- 颜色：新增 RGBA，HSLA 模式</span>
<span class="line"></span>
<span class="line">- 渐变：线性渐变、径向渐变</span>
<span class="line"></span>
<span class="line">- 字体：`@font-face`</span>
<span class="line"></span>
<span class="line">- 2D/3D 转换：transform、transform-origin</span>
<span class="line"></span>
<span class="line">- 过渡与动画：transition、`@keyframes`、animation</span>
<span class="line"></span>
<span class="line">- 多列布局</span>
<span class="line"></span>
<span class="line">- 媒体查询</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="动画" tabindex="-1"><a class="header-anchor" href="#动画"><span>动画</span></a></h2>
<h3 id="css-中如何开发动画" tabindex="-1"><a class="header-anchor" href="#css-中如何开发动画"><span>css 中如何开发动画</span></a></h3>
<div class="language-txt line-numbers-mode" data-highlighter="prismjs" data-ext="txt" data-title="txt"><pre v-pre class="language-txt"><code><span class="line">ransition 过渡动画：</span>
<span class="line"></span>
<span class="line">transition-property：指定过渡的 CSS 属性</span>
<span class="line">transition-duration：指定过渡所需的完成时间</span>
<span class="line">transition-timing-function：指定过渡函数</span>
<span class="line">transition-delay：指定过渡的延迟时间</span>
<span class="line"></span>
<span class="line">animation 关键帧动画：</span>
<span class="line"></span>
<span class="line">animation-name：指定要绑定到选择器的关键帧的名称</span>
<span class="line">animation-duration：动画指定需要多少秒或毫秒完成</span>
<span class="line">animation-timing-function：设置动画将如何完成一个周期</span>
<span class="line">animation-delay：设置动画在启动前的延迟间隔</span>
<span class="line">animation-iteration-count：定义动画的播放次数</span>
<span class="line">animation-direction：指定是否应该轮流反向播放动画</span>
<span class="line">animation-fill-mode：规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式</span>
<span class="line">animation-play-state：指定动画是否正在运行或已暂停</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="tranistion-和-animation-的区别" tabindex="-1"><a class="header-anchor" href="#tranistion-和-animation-的区别"><span>tranistion 和 animation 的区别</span></a></h3>
<ul>
<li>过渡没法精准控制动画每一帧，动画可以</li>
<li>过渡只能触发一次，动画可以无限循环</li>
</ul>
<h2 id="盒模型" tabindex="-1"><a class="header-anchor" href="#盒模型"><span>盒模型</span></a></h2>
<h3 id="css-中的盒模型有几种" tabindex="-1"><a class="header-anchor" href="#css-中的盒模型有几种"><span>css 中的盒模型有几种</span></a></h3>
<div class="language-txt line-numbers-mode" data-highlighter="prismjs" data-ext="txt" data-title="txt"><pre v-pre class="language-txt"><code><span class="line">- content-box：clientWidth = width+padding+border</span>
<span class="line">- border-box：clientWidth = width</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="选择器" tabindex="-1"><a class="header-anchor" href="#选择器"><span>选择器</span></a></h2>
<h3 id="css-中的选择器权重大小是怎样的" tabindex="-1"><a class="header-anchor" href="#css-中的选择器权重大小是怎样的"><span>css 中的选择器权重大小是怎样的</span></a></h3>
<p>每种 css 的选择器都有自己的权重值，<code v-pre>important&gt;style&gt;id&gt;class&gt;elemnt</code>,当选择器组合起来时，权重值的累加之和最大的选择器起作用。</p>
<h2 id="单位" tabindex="-1"><a class="header-anchor" href="#单位"><span>单位</span></a></h2>
<h3 id="css-中的响应式单位" tabindex="-1"><a class="header-anchor" href="#css-中的响应式单位"><span>css 中的响应式单位</span></a></h3>
<ul>
<li>rem：相对于网页的 html 节点的<code v-pre>font-size</code>的大小来计算的，<code v-pre>1rem = 100px</code>,可以根据页面视口大小来调整 html 节点<code v-pre>font-size</code>的大小，从而控制页面元素的大小。</li>
<li>em: 相对于父元素的<code v-pre>font-size</code>的大小来计算的。</li>
<li>vw: 相对于视口<code v-pre>width</code>的<code v-pre>1%</code>。</li>
<li>vh: 相对于视口<code v-pre>height</code>的<code v-pre>1%</code>。</li>
<li>vmin: 视口的宽度和高度中的较小值</li>
<li>vmax: 视口的宽度和高度中的较大值</li>
</ul>
<h2 id="布局" tabindex="-1"><a class="header-anchor" href="#布局"><span>布局</span></a></h2>
<h3 id="css-中的布局技术" tabindex="-1"><a class="header-anchor" href="#css-中的布局技术"><span>css 中的布局技术</span></a></h3>
<ul>
<li>float</li>
<li>position</li>
<li>flex</li>
<li>grid</li>
</ul>
<h3 id="介绍-flex-布局" tabindex="-1"><a class="header-anchor" href="#介绍-flex-布局"><span>介绍 Flex 布局</span></a></h3>
<ul>
<li>弹性盒子布局：是一种用于按行或按列布局元素的一维布局方法，元素可以膨胀以填充额外的空间，收缩以适应更小的空间。</li>
</ul>
<h3 id="容器属性" tabindex="-1"><a class="header-anchor" href="#容器属性"><span>容器属性</span></a></h3>
<div class="language-txt line-numbers-mode" data-highlighter="prismjs" data-ext="txt" data-title="txt"><pre v-pre class="language-txt"><code><span class="line">- 如何设置主轴方向：flex-direction</span>
<span class="line">- 如何让子元素换行： flex-wrap</span>
<span class="line">- 说出 space-between 和 space-around 的区别？</span>
<span class="line"></span>
<span class="line">这个是 flex 布局的内容，其实就是一个边距的区别，按水平布局来说，space-between 是两端对齐，在左右两侧没有边距，而 space-around 是每个 子项目左右方向的 margin 相等，所以两个 item 中间的间距会比较大</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="子元素属性" tabindex="-1"><a class="header-anchor" href="#子元素属性"><span>子元素属性</span></a></h3>
<div class="language-txt line-numbers-mode" data-highlighter="prismjs" data-ext="txt" data-title="txt"><pre v-pre class="language-txt"><code><span class="line">- flex 是什么属性的缩写： flex-grow、flex-shrink 和 flex-basis</span>
<span class="line">- align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实践" tabindex="-1"><a class="header-anchor" href="#实践"><span>实践</span></a></h2>
<h3 id="css-外边距重叠问题及解决办法" tabindex="-1"><a class="header-anchor" href="#css-外边距重叠问题及解决办法"><span>CSS 外边距重叠问题及解决办法</span></a></h3>
<ul>
<li>只有块级元素<code v-pre>(display:block)</code>会发生外边距重叠</li>
<li>外边距叠加存在两种情况：一是父子外边距叠加；二是兄弟外边距叠加。</li>
</ul>
<div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="line"><span class="token selector">.box1</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">height</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">width</span><span class="token punctuation">:</span> 300px<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">background-color</span><span class="token punctuation">:</span> antiquewhite<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">margin-bottom</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token selector">.box2</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">height</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">width</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">background-color</span><span class="token punctuation">:</span> aqua<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token selector">.box2</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">margin-top</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>box2<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>解决方案</li>
</ul>
<ol>
<li>给父元素或子元素开启 BFC</li>
<li>用点东西将父子元素的边缘隔开</li>
</ol>
<h3 id="水平垂直居中" tabindex="-1"><a class="header-anchor" href="#水平垂直居中"><span>水平垂直居中</span></a></h3>
<div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="line"> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">display</span><span class="token punctuation">:</span> flex<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">align-items</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">justify-content</span><span class="token punctuation">:</span> center<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token property">poasition</span><span class="token punctuation">:</span> absolte<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">left</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">top</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">right</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">bottom</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">margin</span><span class="token punctuation">:</span> auto<span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token property">position</span><span class="token punctuation">:</span> absolute<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">left</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">top</span><span class="token punctuation">:</span> 50%<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">transform</span><span class="token punctuation">:</span> <span class="token function">translate</span><span class="token punctuation">(</span>-50%<span class="token punctuation">,</span> -50%<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用-flex-布局开发一个一行两列-左边固定宽度-不会缩放-右边自适应的布局" tabindex="-1"><a class="header-anchor" href="#使用-flex-布局开发一个一行两列-左边固定宽度-不会缩放-右边自适应的布局"><span>使用 flex 布局开发一个一行两列，左边固定宽度，不会缩放，右边自适应的布局</span></a></h3>
<div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="line"><span class="token selector">.left</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">flex</span><span class="token punctuation">:</span> 0 100px<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token selector">.right</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">flex</span><span class="token punctuation">:</span> 1<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="两列等高-使多列布局中的所有列采用相同的高度-即使它们包含的内容量不同" tabindex="-1"><a class="header-anchor" href="#两列等高-使多列布局中的所有列采用相同的高度-即使它们包含的内容量不同"><span>两列等高（使多列布局中的所有列采用相同的高度，即使它们包含的内容量不同）</span></a></h3>
<div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="line"> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">align-items</span><span class="token punctuation">:</span> stretch<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="多行文本溢出省略效果" tabindex="-1"><a class="header-anchor" href="#多行文本溢出省略效果"><span>多行文本溢出省略效果</span></a></h3>
<div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="line"> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">display</span><span class="token punctuation">:</span> -webkit-box<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">-webkit-box-orient</span><span class="token punctuation">:</span> vertical<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">-webkit-line-clamp</span><span class="token punctuation">:</span> 3<span class="token punctuation">;</span> //行数</span>
<span class="line">  <span class="token property">overflow</span><span class="token punctuation">:</span> hidden<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="如何用-css-实现一个三角形" tabindex="-1"><a class="header-anchor" href="#如何用-css-实现一个三角形"><span>如何用 CSS 实现一个三角形</span></a></h3>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="line"><span class="token selector">div</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">width</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">border</span><span class="token punctuation">:</span> 10px solid red<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">border-top-color</span><span class="token punctuation">:</span> transparent<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">border-left-color</span><span class="token punctuation">:</span> transparent<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">border-right-color</span><span class="token punctuation">:</span> transparent<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="如何实现一个自适应的正方形" tabindex="-1"><a class="header-anchor" href="#如何实现一个自适应的正方形"><span>如何实现一个自适应的正方形</span></a></h3>
<div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="line"><span class="token selector">.square</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">width</span><span class="token punctuation">:</span> 10vw<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">height</span><span class="token punctuation">:</span> 10vw<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token selector">.square</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">width</span><span class="token punctuation">:</span> 10%<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">padding-bottom</span><span class="token punctuation">:</span> 10%<span class="token punctuation">;</span></span>
<span class="line">  <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span> // 防止内容撑开多余的高度</span>
<span class="line">  <span class="token property">background</span><span class="token punctuation">:</span> red<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="如果一个元素出现滚动条-你想去掉这个滚动条-你该如何排查" tabindex="-1"><a class="header-anchor" href="#如果一个元素出现滚动条-你想去掉这个滚动条-你该如何排查"><span>如果一个元素出现滚动条，你想去掉这个滚动条，你该如何排查</span></a></h3>
<ul>
<li>首先查看是否元素中的子元素宽度超出</li>
<li>如果不超出，就看子元素的子元素宽度是否超出</li>
</ul>
<h3 id="移动端自适应布局方案" tabindex="-1"><a class="header-anchor" href="#移动端自适应布局方案"><span>移动端自适应布局方案</span></a></h3>
<ul>
<li>rem</li>
<li>em+%</li>
</ul>
<h3 id="font-size-10px-不起效果" tabindex="-1"><a class="header-anchor" href="#font-size-10px-不起效果"><span>font-size：10px 不起效果</span></a></h3>
<ul>
<li>原因：谷歌浏览器的字体最小限制为 font-size:12px；</li>
<li>解决方案：</li>
</ul>
<p>手机端设置 rem 为单位：</p>
<div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="line"><span class="token selector">html</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">font-size</span><span class="token punctuation">:</span> 100px<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token selector">.a</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token property">font-size</span><span class="token punctuation">:</span> 0.1rem；<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 transform:scale(0.8):</p>
<div class="language-css line-numbers-mode" data-highlighter="prismjs" data-ext="css" data-title="css"><pre v-pre class="language-css"><code><span class="line"><span class="token selector">.a</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token property">font-size</span><span class="token punctuation">:</span> <span class="token property">transform</span><span class="token punctuation">:</span><span class="token function">scale</span><span class="token punctuation">(</span>0.8<span class="token punctuation">)</span>；</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


