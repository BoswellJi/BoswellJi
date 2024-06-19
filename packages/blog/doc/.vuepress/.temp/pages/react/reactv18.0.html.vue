<template><div><h2 id="并发react" tabindex="-1"><a class="header-anchor" href="#并发react"><span>并发react</span></a></h2>
<ul>
<li><code v-pre>协作多任务处理</code>、<code v-pre>基于优先级的渲染</code>、<code v-pre>调度</code>、<code v-pre>中断</code>;</li>
<li>react保证即使渲染中断，UI也会显示一致；</li>
<li>UI可以立即响应用户输入，即使它是在一个大型渲染任务的中间；</li>
</ul>
<h2 id="渲染" tabindex="-1"><a class="header-anchor" href="#渲染"><span>渲染</span></a></h2>
<ul>
<li><code v-pre>渲染中断</code>中的<code v-pre>渲染</code>指的是什么：就是用户触发数据更新后，对组件进行的<code v-pre>新vnode创建，新老vnode对比，创建、删除、移动、更新dom</code>过程；</li>
<li>之前只有 vdom 的 render 和 patch，现在却变成了 vdom 转 fiber 的 reconcile，空闲调度 reconcile 的 schedule，最后把 fiber 渲染的 commit 三个阶段；</li>
</ul>
</div></template>


