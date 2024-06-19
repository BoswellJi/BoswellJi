<template><div><h2 id="数学相关" tabindex="-1"><a class="header-anchor" href="#数学相关"><span>数学相关</span></a></h2>
<h3 id="" tabindex="-1"><a class="header-anchor" href="#"><span></span></a></h3>
<ul>
<li>求解代数方程</li>
<li>三角函数</li>
</ul>
<h3 id="向量运算" tabindex="-1"><a class="header-anchor" href="#向量运算"><span>向量运算</span></a></h3>
<ul>
<li>二维向量都包含两个值：方向，大小（这两个值可以表达出各种各样的物理特性来；比如：力和运动</li>
<li>向量数学运算</li>
</ul>
<ul>
<li>
<p>问题引出：</p>
<ul>
<li>碰撞检测中：顶部多边形向底部多边形前进；（ <code v-pre>顶部的碰撞之前速度</code> 与 <code v-pre>碰撞之后被弹开速度</code> 都是以向量来建模的；</li>
<li>即将与顶部发生碰撞的那条边，也是以向量来建模，我们称之为 <code v-pre>向量边</code> ；</li>
<li>问题：给定的前进速度与碰撞边界上的两个点，来计算碰撞之后被弹走的速度；</li>
</ul>
</li>
<li>
<p>向量的大小</p>
</li>
<li>
<p>根据勾股定理，来计算出向量的大小； <code v-pre>const len = Math.sqrt(Math.pow(vector.x,2) + Math.pow(vertor.y,2))</code> ;</p>
</li>
<li>
<p>向量的方向</p>
</li>
<li>
<p>单位向量： 是用来指示方向的向量；它的长度永远是单位1;</p>
</li>
<li>
<p>根据给定的向量计算单位向量：</p>
<ul>
<li>先把原来的向量的大小去掉，只留下方向</li>
</ul>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre class="language-text"><code><span class="line">公式：</span>
<span class="line">const len = Math.sqrt(Math.pow(vector.x,2) + Math.pow(vertor.y,2));</span>
<span class="line">unitVector = new Vector();</span>
<span class="line"></span>
<span class="line">unitVector.x = vector.x / len;</span>
<span class="line">unitVector.y = vector.y / len;</span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>向量的加法与减法</li>
<li>应用：
<ul>
<li>如果有两个力同时作用于某个物体上，可以将代表两个力的向量相加，计算出两个力的合力；</li>
<li>一个方位向量减去另一个，求两点之间的边界；</li>
</ul>
</li>
<li>公式：</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre class="language-text"><code><span class="line">加法：</span>
<span class="line">vectorSum.x = vectorOne.x + vectorTwo.x;</span>
<span class="line">vectorSum.y = vectorOne.y + vectorTwo.y;</span>
<span class="line"></span>
<span class="line">减法：</span>
<span class="line">vectorSum.x = vectorOne.x - vectorTwo.x;</span>
<span class="line">vectorSum.y = vectorOne.y - vectorTwo.y;</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>两个向量的 点积（又叫标量，纯量）</li>
<li>应用：
<ul>
<li>主要在于 <code v-pre>大于0</code> 这个事实;
<ul>
<li>如果点积大于0，说明两个向量方向基本相同</li>
<li>如果点积小于0，说明两个向量方向基本不相同</li>
</ul>
</li>
<li>所以，碰撞检测中，判断两个矢量的终点是不是大致指向同一个方向，这个很关键；</li>
</ul>
</li>
<li>公式</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre class="language-text"><code><span class="line">vector = vectorOne.x * vectorTwo.x + vectorOne.y + vectorTwo.y;</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="根据计量单位来推到等式" tabindex="-1"><a class="header-anchor" href="#根据计量单位来推到等式"><span>根据计量单位来推到等式</span></a></h3>
<ul>
<li>
<p>动画的移动应该是以时间为基准的；</p>
</li>
<li>
<p>一个物体的移动频率不应该随着动画的帧速率而改变；</p>
</li>
<li>
<p>为了实现这个目标：我们要使用<code v-pre>每秒移动的像素数</code>作为计量移动速度的单位；</p>
</li>
<li>
<p>需要的信息： <code v-pre>物体的移动速度是每秒多少像素</code>，<code v-pre>当前动画的帧速率是每帧持续多少毫秒</code>；</p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre class="language-text"><code><span class="line">一帧移动多少像素 = 一帧多少毫秒 / 1000 * 物体每秒钟移动的像素数 </span>
<span class="line"></span>
<span class="line">帧速率： 一帧多少毫秒；</span>
<span class="line">速度： 一秒多少像素；</span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="三角函数" tabindex="-1"><a class="header-anchor" href="#三角函数"><span>三角函数</span></a></h3>
<ol>
<li>
<p>以角 A 为相对元素(非直角)</p>
</li>
<li>
<p>正弦函数(sin(A))：对边比斜边的比值</p>
</li>
<li>
<p>余弦函数(cos(A))：临边比斜边的比值</p>
</li>
<li>
<p>正切函数(tan(A))：对边比临边的比值</p>
</li>
<li>
<p>反正切(atan()):对边/临边的反正切值，为这个夹角的弧长</p>
</li>
</ol>
<h3 id="代数方程" tabindex="-1"><a class="header-anchor" href="#代数方程"><span>代数方程</span></a></h3>
<h3 id="向量运算-1" tabindex="-1"><a class="header-anchor" href="#向量运算-1"><span>向量运算</span></a></h3>
<h2 id="物理相关" tabindex="-1"><a class="header-anchor" href="#物理相关"><span>物理相关</span></a></h2>
<h3 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念"><span>基本概念</span></a></h3>
<ol>
<li>力</li>
<li>矢量</li>
<li>质量</li>
<li>重力</li>
<li>摩擦力</li>
<li>速度</li>
<li>速率</li>
<li>加速度</li>
</ol>
<h2 id="canvas相关" tabindex="-1"><a class="header-anchor" href="#canvas相关"><span>canvas相关</span></a></h2>
<h3 id="绘图环境" tabindex="-1"><a class="header-anchor" href="#绘图环境"><span>绘图环境</span></a></h3>
<h3 id="坐标系" tabindex="-1"><a class="header-anchor" href="#坐标系"><span>坐标系</span></a></h3>
<ol>
<li>canvas元素实际上有两套尺寸，一个是元素本身的大小，还有一个是元素绘图表面的大小；</li>
<li>当设置元素的width和height属性时，实际上是同时修改该元素本身的大小，与元素绘图表面的大小。设置css来设定canvas元素的大小，只会改变元素本身的大小，不会影响到绘图表面；</li>
<li>使用css这是canvas大小等于缩放了坐标系；</li>
</ol>
<div class="language-公式 line-numbers-mode" data-highlighter="prismjs" data-ext="公式" data-title="公式"><pre v-pre class="language-公式"><code><span class="line">  转换一些限制左，右，上，下的实数坐标系为范围从左边为0右边为800以及上边为0下边为600的像素坐标系。</span>
<span class="line"></span>
<span class="line">  newX = ((oldX-left)/(right-left)) * 800；</span>
<span class="line">  newY = ((oldY-top)/(bottom-top))* 600; </span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="绘制模型" tabindex="-1"><a class="header-anchor" href="#绘制模型"><span>绘制模型</span></a></h3>
<ol>
<li>理解canvas如何绘制图形，图像，文本，需要理解阴影，alpha通道，剪辑区域及图像合成等内容；</li>
<li>填充模式，描边模式，线条样式</li>
</ol>
<h3 id="dom对象的属性与方法" tabindex="-1"><a class="header-anchor" href="#dom对象的属性与方法"><span>dom对象的属性与方法</span></a></h3>
<p>属性</p>
<ul>
<li>width</li>
<li>height</li>
</ul>
<p>方法：</p>
<ul>
<li>getContext()</li>
<li>toDataURL(mime-type, quality)</li>
<li>toBlob(callback, mime-type)</li>
</ul>
<h3 id="绘图环境对象-getcontext-2d" tabindex="-1"><a class="header-anchor" href="#绘图环境对象-getcontext-2d"><span>绘图环境对象 getContext('2d')</span></a></h3>
<h3 id="性能" tabindex="-1"><a class="header-anchor" href="#性能"><span>性能</span></a></h3>
<ul>
<li>性能分析器</li>
<li>时间轴工具</li>
</ul>
<h3 id="canvas" tabindex="-1"><a class="header-anchor" href="#canvas"><span>canvas</span></a></h3>
<ul>
<li>
<p><a href="https://github.com/spritejs/spritejs" target="_blank" rel="noopener noreferrer">spritejs</a></p>
</li>
<li>
<p><a href="https://github.com/apache/incubator-echarts" target="_blank" rel="noopener noreferrer">incubator-echarts/echarts</a></p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre class="language-text"><code><span class="line"></span>
<span class="line">图表与可视化库</span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><a href="https://github.com/ecomfe/zrender" target="_blank" rel="noopener noreferrer">zrender</a></li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre class="language-text"><code><span class="line"></span>
<span class="line">一个轻量的提供给echart的2d绘制的canvas库</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


