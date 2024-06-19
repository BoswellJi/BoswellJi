<template><div><h2 id="v8" tabindex="-1"><a class="header-anchor" href="#v8"><span>v8</span></a></h2>
<ol>
<li>单线程</li>
</ol>
<ul>
<li>同步任务，异步任务；</li>
<li>执行栈，任务队列（宏任务，微任务），事件循环；</li>
<li>执行机制就是：在上面的特性之上，js 代码的执行顺序是什么样的；</li>
</ul>
<ol start="5">
<li>内存管理</li>
</ol>
<ul>
<li>函数：可调用的对象；</li>
<li>垃圾回收：引用计数算法，标记清除算法；</li>
</ul>
<ol start="6">
<li>脚本引擎</li>
</ol>
<ul>
<li>支持语法与 api；</li>
<li>宿主平台提供宿主 api;</li>
<li><code v-pre>平台对于语言的语法不支持，需要使用编译器来编译</code>；</li>
<li><code v-pre>平台对于语言的api不支持，需要使用corejs/polyfill来填充</code>；</li>
<li>引擎类型：
<ul>
<li>v8</li>
<li>jscore</li>
<li>chakra</li>
</ul>
</li>
</ul>
<ol start="7">
<li>js 宿主环境</li>
</ol>
<ul>
<li>浏览器</li>
<li>nodejs</li>
</ul>
<ol start="8">
<li>
<p>事件循环</p>
</li>
<li>
<p>js 引擎编译流水线</p>
</li>
</ol>
<ul>
<li>parser</li>
<li>interperter</li>
<li>JIT compiler</li>
<li>gc</li>
</ul>
<ol start="10">
<li>
<p>渲染流程</p>
</li>
<li>
<p>requestIdleCallback 什么时候执行</p>
</li>
</ol>
<h2 id="概念" tabindex="-1"><a class="header-anchor" href="#概念"><span>概念</span></a></h2>
<ul>
<li>全局执行上下文</li>
<li>全局作用域</li>
</ul>
<h2 id="引擎-运行时-调用堆栈" tabindex="-1"><a class="header-anchor" href="#引擎-运行时-调用堆栈"><span>引擎，运行时，调用堆栈</span></a></h2>
</div></template>


