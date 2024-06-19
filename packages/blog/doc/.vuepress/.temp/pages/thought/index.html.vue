<template><div><h1 id="思考" tabindex="-1"><a class="header-anchor" href="#思考"><span>思考</span></a></h1>
<h2 id="学习上的缺点" tabindex="-1"><a class="header-anchor" href="#学习上的缺点"><span>学习上的缺点</span></a></h2>
<ul>
<li>对编程语言的掌握（api+语法）
<ul>
<li>不全面：API 认识不全，很多基本 API 都没记住；</li>
<li>不严谨：API 使用方式掌握不全；</li>
<li>不深入：底层实现原理不了解<code v-pre>执行流程</code>，导致出现异常情况，例如：浮点数计算，导致结果的浮点数精度不准确；</li>
</ul>
</li>
</ul>
<h2 id="编程范式" tabindex="-1"><a class="header-anchor" href="#编程范式"><span>编程范式</span></a></h2>
<p>在 js 中，通过封装的工具，拓展 js 的函数式编程能力，例如：lodash，underscore，ramda 等，通过封装的工具，拓展 js 的响应式编程能力，例如：rxjs</p>
<ul>
<li>
<p>命令式编程</p>
<ul>
<li>面向过程：</li>
<li>面向对象：暴露面向对象特性，类，对象等</li>
<li>响应式编程：通过底层封装，暴露出响应式 api</li>
</ul>
</li>
<li>
<p>声明式编程：通过底层封装，暴露出声明式 api</p>
<ul>
<li>函数式：暴露函数特性，函数等</li>
</ul>
</li>
</ul>
<h2 id="前端的底层" tabindex="-1"><a class="header-anchor" href="#前端的底层"><span>前端的底层</span></a></h2>
<p>前端的底层是浏览器</p>
<h2 id="后端的底层" tabindex="-1"><a class="header-anchor" href="#后端的底层"><span>后端的底层</span></a></h2>
<p>后端的底层是 node.js</p>
<h2 id="高质量程序的特点" tabindex="-1"><a class="header-anchor" href="#高质量程序的特点"><span>高质量程序的特点</span></a></h2>
<ol>
<li>代码执行要符合直觉，不要有歧义，因该先定义才能执行的代码，不要写成先执行才定义的代码；</li>
<li>代码不要有副作用，副作用会引入不确定性，给程序阅读和调试带来麻烦；</li>
<li>委托模式的使用，也会给程序阅读和调试带来麻烦，没法直观了解程序的流程；</li>
<li>字符串拼接可读性差，可读性差带来不可维护性，使用声明式编程编写，例如1.<code v-pre>url?a=b&amp;b=c</code>中的查询字符串，2.正则表达式的编写<code v-pre>/\s+aoo/</code>；</li>
</ol>
<h2 id="程序测试的重要性" tabindex="-1"><a class="header-anchor" href="#程序测试的重要性"><span>程序测试的重要性</span></a></h2>
<ol>
<li>覆盖全部场景的测试，保证功能的<code v-pre>正确性</code></li>
<li>不同平台的测试，保证功能的<code v-pre>兼容性</code></li>
<li>压力的测试，保证功能的<code v-pre>流畅性/高性能</code></li>
</ol>
<h2 id="编写程序的思路" tabindex="-1"><a class="header-anchor" href="#编写程序的思路"><span>编写程序的思路</span></a></h2>
<ol>
<li>熟练使用</li>
<li>知道原理</li>
<li>理解设计思想</li>
</ol>
<h2 id="事物演化的过程" tabindex="-1"><a class="header-anchor" href="#事物演化的过程"><span>事物演化的过程</span></a></h2>
<p>是形态的变化</p>
</div></template>


