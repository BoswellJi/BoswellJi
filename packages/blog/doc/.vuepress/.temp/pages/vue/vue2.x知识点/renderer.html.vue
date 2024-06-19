<template><div><h2 id="渲染器的作用" tabindex="-1"><a class="header-anchor" href="#渲染器的作用"><span>渲染器的作用</span></a></h2>
<ul>
<li>
<p>渲染器至少知道vnode与存储它的容器；</p>
</li>
<li>
<p>控制部分组件生命周期钩子的调用；（挂载，卸载</p>
</li>
<li>
<p>多端渲染的桥梁；</p>
</li>
<li>
<p>与异步渲染有关；</p>
</li>
<li>
<p>最核心的diff算法；</p>
</li>
<li>
<p>将各种类型的vnode挂载为真实的DOM;</p>
</li>
<li>
<p>挂载：创建DOM,设置相关属性，时间等，不会插入页面中；</p>
</li>
</ul>
<h2 id="工作阶段" tabindex="-1"><a class="header-anchor" href="#工作阶段"><span>工作阶段</span></a></h2>
<ul>
<li>安装(mount: 不存在老vnode时；</li>
<li>补丁(patch: 以最小的开销完成DOM更新；</li>
</ul>
<h2 id="挂载普通元素标签" tabindex="-1"><a class="header-anchor" href="#挂载普通元素标签"><span>挂载普通元素标签</span></a></h2>
<ul>
<li>mount函数将vnode渲染成真实dom,根据vnode类型不同需要的挂载方式不同；</li>
</ul>
<h2 id="挂载纯文本" tabindex="-1"><a class="header-anchor" href="#挂载纯文本"><span>挂载纯文本</span></a></h2>
<h2 id="挂载fragment" tabindex="-1"><a class="header-anchor" href="#挂载fragment"><span>挂载Fragment</span></a></h2>
<ul>
<li>没有最外层容器元素的容器组件；</li>
<li>vnode的tag为空；</li>
</ul>
<h2 id="挂载portal" tabindex="-1"><a class="header-anchor" href="#挂载portal"><span>挂载Portal</span></a></h2>
<ul>
<li>可以将组件渲染到任何地方的组件；</li>
<li>vnode的tag为挂载点元素的tag;</li>
</ul>
<h2 id="挂载有状态的组件" tabindex="-1"><a class="header-anchor" href="#挂载有状态的组件"><span>挂载有状态的组件</span></a></h2>
<ul>
<li>实例化-&gt;vnode-&gt;挂载-&gt;将自身真实dom的引用设置到实例属性$el;</li>
</ul>
<h2 id="挂载函数式组件-也就是无状态组件" tabindex="-1"><a class="header-anchor" href="#挂载函数式组件-也就是无状态组件"><span>挂载函数式组件（也就是无状态组件）</span></a></h2>
<ul>
<li>是一个没有状态,不需要实例化的函数；</li>
</ul>
<h2 id="异步渲染" tabindex="-1"><a class="header-anchor" href="#异步渲染"><span>异步渲染</span></a></h2>
<ul>
<li>vue默认时异步渲染的方式，触发数据更新后，会将运行渲染任务，通过nextTick函数放到任务队列中，所以</li>
</ul>
</div></template>


