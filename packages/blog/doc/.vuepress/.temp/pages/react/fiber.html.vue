<template><div><h2 id="fiber-纤维" tabindex="-1"><a class="header-anchor" href="#fiber-纤维"><span>Fiber(纤维)</span></a></h2>
<ul>
<li>比线程更细的线，也就是比线程控制的更加细致的并发处理机制；</li>
<li>一个<code v-pre>fiber</code>就是一个<code v-pre>虚拟调用帧</code>；</li>
<li><code v-pre>Reconciliation</code>是react的diff算法；</li>
</ul>
<h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题"><span>问题</span></a></h2>
<ul>
<li>之前变化更新是同步的，这会导致性能问题；</li>
<li>组件多了之后，因为同步会带来卡顿；</li>
</ul>
<h2 id="更新组件的流程" tabindex="-1"><a class="header-anchor" href="#更新组件的流程"><span>更新组件的流程</span></a></h2>
<ul>
<li>生命周期-&gt;计算和对比vdom-&gt;更新dom;(如上面所说，这个过程是同步的)</li>
</ul>
<h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案"><span>解决方案</span></a></h2>
<ul>
<li>将同步分割为多个同步任务，每个同步任务异步来执行；</li>
<li><code v-pre>reconciler</code>来调度，开始，暂停<code v-pre>fiber</code>;</li>
</ul>
</div></template>


