<template><div><h2 id="页面性能的衡量标准" tabindex="-1"><a class="header-anchor" href="#页面性能的衡量标准"><span>页面性能的衡量标准</span></a></h2>
<ul>
<li>加载性能（尽量快速的将当前需要的资源加载进来）</li>
<li>渲染性能（页面在操作的过程中，反应有没有延时，出现卡顿现象）</li>
</ul>
<ol>
<li>它在发生吗？  FP(first paint),FCP(first content paint)</li>
<li>它是否有用？ FMP(first meaningful paint)</li>
<li>它是否可用？ TTI(Time to interactive)</li>
</ol>
<ul>
<li>时机：js脚本都被加载并处理完了，主线程处于空闲状态了的时间；</li>
</ul>
<ol start="4">
<li>它是否令人愉快？（Long Tasks）</li>
</ol>
<ul>
<li>js的事件循环中的任务队列会放入相应的异步完成后的回调任务，他们是同步执行的，当任务计算量比较大的时候，会阻塞渲染线程；</li>
<li>这时候需要将<strong>大任务</strong>进行分割（将长任务改为短任务，并配上优先级，对这些任务进行调度执行）；</li>
</ul>
<h2 id="编程语言中的内存的存-取-清除" tabindex="-1"><a class="header-anchor" href="#编程语言中的内存的存-取-清除"><span>编程语言中的内存的存，取，清除</span></a></h2>
<ul>
<li>内存分配器；</li>
<li>内存垃圾收集器；</li>
</ul>
<p>他们主要都是处理堆上的内存；</p>
</div></template>


