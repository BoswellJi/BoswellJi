<template><div><h2 id="并发模型" tabindex="-1"><a class="header-anchor" href="#并发模型"><span>并发模型</span></a></h2>
<ul>
<li>帮助app保持响应并且根据用户设备能力和网络速度降级调整；</li>
<li>可以同时处理几个状态更新，就像是不同分支可以由不同团队处理；</li>
</ul>
<h2 id="可中断的渲染-interruptible-rendering" tabindex="-1"><a class="header-anchor" href="#可中断的渲染-interruptible-rendering"><span>可中断的渲染(interruptible rendering</span></a></h2>
<ul>
<li>
<p>不会阻止更新输入框文本；一边让浏览器绘制更新到输入框中，一边渲染列表的更新到内存中；当下面渲染完成更新DOM，将变更映射到屏幕上；</p>
</li>
<li>
<p>每次更新在一个分支上；</p>
</li>
</ul>
<h2 id="阻塞式渲染-blocking-rendering" tabindex="-1"><a class="header-anchor" href="#阻塞式渲染-blocking-rendering"><span>阻塞式渲染（blocking rendering</span></a></h2>
<ul>
<li>
<p>因为每次渲染开始（创建新DOM和浏览器布局计算）就不会被中断；这个叫做阻塞式渲染；</p>
</li>
<li>
<p>案例：输入框输入，实时查看筛选列表问题？</p>
<ul>
<li>一般我们会使用debounce，防抖/节流来优化，但是一旦渲染开始就不会被中断；</li>
</ul>
</li>
</ul>
<h2 id="故意的加载序列" tabindex="-1"><a class="header-anchor" href="#故意的加载序列"><span>故意的加载序列</span></a></h2>
<h2 id="浏览器调度函数" tabindex="-1"><a class="header-anchor" href="#浏览器调度函数"><span>浏览器调度函数</span></a></h2>
<ul>
<li>requestAnimationFrame：帧数控制调用</li>
<li>requestIdleCallback：闲时调用</li>
<li>web worker：多线程调用</li>
<li>intersecionObserver: 进入可视区域调用</li>
</ul>
</div></template>


