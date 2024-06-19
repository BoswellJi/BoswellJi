<template><div><h1 id="js" tabindex="-1"><a class="header-anchor" href="#js"><span>js</span></a></h1>
<h2 id="es6-及其以后的所有被加到标准中的新特性罗列-想到多少说多少" tabindex="-1"><a class="header-anchor" href="#es6-及其以后的所有被加到标准中的新特性罗列-想到多少说多少"><span>es6 及其以后的所有被加到标准中的新特性罗列，想到多少说多少</span></a></h2>
<ul>
<li>let const</li>
<li>箭头函数</li>
<li>模板字符串</li>
<li>增强对象</li>
<li>Promise</li>
<li>async await</li>
<li>解构赋值</li>
<li>展开运算符</li>
<li>......</li>
</ul>
<h2 id="声明变量的三个关键字是什么-var、const-和-let-的主要区别是什么" tabindex="-1"><a class="header-anchor" href="#声明变量的三个关键字是什么-var、const-和-let-的主要区别是什么"><span>声明变量的三个关键字是什么？var、const 和 let 的主要区别是什么？</span></a></h2>
<ul>
<li>var、const 和 let</li>
<li>let 是变量，const 是常量</li>
<li>用 let 和 const 声明的变量是块范围的；用 var 声明的变量是全局范围的或函数范围的。</li>
<li>var 变量可以在其范围内更新和重新声明；让变量可以更新但不能重新声明；const 变量既不能更新也不能重新声明。</li>
<li>var 可以提升到其作用域的顶部。其中 var 变量初始化为未定义，let 和 const 变量未初始化（临时死区，TDZ）。</li>
<li>虽然可以在不初始化的情况下声明 var 和 let，但必须在声明期间初始化 const。</li>
</ul>
<h2 id="和-的区别" tabindex="-1"><a class="header-anchor" href="#和-的区别"><span>==和===的区别</span></a></h2>
<ul>
<li>==两边的操作项会发生隐式类型转换再进行值比对</li>
<li>===两边的操作项会比对类型和值</li>
</ul>
<h2 id="js-中的小数计算会有什么问题" tabindex="-1"><a class="header-anchor" href="#js-中的小数计算会有什么问题"><span>js 中的小数计算会有什么问题</span></a></h2>
<ul>
<li>精度缺失问题</li>
</ul>
<h2 id="如何解决" tabindex="-1"><a class="header-anchor" href="#如何解决"><span>如何解决</span></a></h2>
<ul>
<li>转换为整数后再计算,然后除以 10 的（小数位数的）指数</li>
</ul>
<h2 id="与-操作符的优先级" tabindex="-1"><a class="header-anchor" href="#与-操作符的优先级"><span>&amp;&amp; 与 || 操作符的优先级</span></a></h2>
<p>|| &lt; &amp;&amp;</p>
<h2 id="箭头函数的-this-指向" tabindex="-1"><a class="header-anchor" href="#箭头函数的-this-指向"><span>箭头函数的 this 指向？</span></a></h2>
<ul>
<li>指向父级作用域的 this 对象</li>
<li>箭头函数不会受到 call,apply,bind 的影响</li>
</ul>
<h2 id="如何修改一个函数中的-this-指向" tabindex="-1"><a class="header-anchor" href="#如何修改一个函数中的-this-指向"><span>如何修改一个函数中的 this 指向</span></a></h2>
<ul>
<li>bind(obj),call(obj,a,b),apply(obj,[])</li>
</ul>
<h2 id="vue2-3-中的响应式功能-依赖了-js-的什么特性" tabindex="-1"><a class="header-anchor" href="#vue2-3-中的响应式功能-依赖了-js-的什么特性"><span>Vue2,3 中的响应式功能，依赖了 js 的什么特性</span></a></h2>
<ol>
<li>Object.defineProperty(obj,'x',{get(){},set(){}})</li>
<li>new Proxy(obj,{get(){},set(){}})</li>
</ol>
<h2 id="模块的导入导出用法" tabindex="-1"><a class="header-anchor" href="#模块的导入导出用法"><span>模块的导入导出用法</span></a></h2>
<ul>
<li>export const a = 0; export default {}</li>
<li>import { a }; import a</li>
</ul>
<h2 id="打包工具中的树摇是做什么用的" tabindex="-1"><a class="header-anchor" href="#打包工具中的树摇是做什么用的"><span>打包工具中的树摇是做什么用的</span></a></h2>
<ul>
<li>将代码中的死代码，无用代码，去掉，减少打包产物的体积</li>
</ul>
<h2 id="什么是浅拷贝和深拷贝" tabindex="-1"><a class="header-anchor" href="#什么是浅拷贝和深拷贝"><span>什么是浅拷贝和深拷贝</span></a></h2>
<ul>
<li>浅拷贝：引用拷贝</li>
<li>深拷贝： 值拷贝</li>
</ul>
<h2 id="节流和防抖" tabindex="-1"><a class="header-anchor" href="#节流和防抖"><span>节流和防抖</span></a></h2>
<ul>
<li>节流：一段时间执行一次。</li>
<li>防抖：最后一次才执行。有一个提交订单的按钮，由于用户快速，多次点击导致提交多个重复订单，如何解决？</li>
</ul>
<h2 id="什么是跨域" tabindex="-1"><a class="header-anchor" href="#什么是跨域"><span>什么是跨域</span></a></h2>
<p>浏览器的同源策略，同源是指&quot;协议+域名+端口&quot;三者相同</p>
<h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案"><span>解决方案</span></a></h2>
<ul>
<li>代理</li>
<li>cors</li>
<li>jsonp</li>
</ul>
<h2 id="jsonp-的原理" tabindex="-1"><a class="header-anchor" href="#jsonp-的原理"><span>jsonp 的原理</span></a></h2>
<ul>
<li>利用 script 跨域机制，将数据包裹再 js 函数调用中，传递给已经定义好的函数</li>
</ul>
<h2 id="什么是原型" tabindex="-1"><a class="header-anchor" href="#什么是原型"><span>什么是原型</span></a></h2>
<ul>
<li><code v-pre>构造函数的prototype</code>指向的一个对象，也叫原型对象</li>
</ul>
<h2 id="什么是原型链" tabindex="-1"><a class="header-anchor" href="#什么是原型链"><span>什么是原型链</span></a></h2>
<ul>
<li>原型对象也会指向自己的原型对象，一层一层向上指向形成的链路</li>
</ul>
<h2 id="如何创建一个没有原型的对象" tabindex="-1"><a class="header-anchor" href="#如何创建一个没有原型的对象"><span>如何创建一个没有原型的对象</span></a></h2>
<ul>
<li>Object.create(null)</li>
</ul>
<h2 id="什么是闭包函数" tabindex="-1"><a class="header-anchor" href="#什么是闭包函数"><span>什么是闭包函数</span></a></h2>
<ul>
<li>能够外部作用域的函数，叫做闭包函数</li>
</ul>
<h2 id="动手来实现一下-new" tabindex="-1"><a class="header-anchor" href="#动手来实现一下-new"><span>动手来实现一下 new</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">function</span> <span class="token function">mynew</span><span class="token punctuation">(</span><span class="token parameter">Func<span class="token punctuation">,</span> <span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// 1.创建一个新对象</span></span>
<span class="line">  <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">// 2.新对象原型指向构造函数原型对象</span></span>
<span class="line">  obj<span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> <span class="token class-name">Func</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">// 3.将构建函数的this指向新对象</span></span>
<span class="line">  <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token function">Func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">// 4.根据返回值判断</span></span>
<span class="line">  <span class="token keyword">return</span> result <span class="token keyword">instanceof</span> <span class="token class-name">Object</span> <span class="token operator">?</span> result <span class="token operator">:</span> obj<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="闭包在项目中的应用场景" tabindex="-1"><a class="header-anchor" href="#闭包在项目中的应用场景"><span>闭包在项目中的应用场景</span></a></h2>
<ul>
<li>防抖</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">function</span> <span class="token function">debounce</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> time</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">clearTimeout</span><span class="token punctuation">(</span>timer<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token number">300</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>节流</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">function</span> <span class="token function">throttling</span><span class="token punctuation">(</span><span class="token parameter">fn<span class="token punctuation">,</span> time</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">let</span> timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>timer<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      timer <span class="token operator">=</span> <span class="token function">setTimeout</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">fn</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">        timer <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span></span>
<span class="line">      <span class="token punctuation">}</span><span class="token punctuation">,</span> time<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">  <span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>内部成员变量</li>
</ul>
<h2 id="动手来实现一下-new-1" tabindex="-1"><a class="header-anchor" href="#动手来实现一下-new-1"><span>动手来实现一下 new</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">function</span> <span class="token function">mynew</span><span class="token punctuation">(</span><span class="token parameter">Func<span class="token punctuation">,</span> <span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token comment">// 1.创建一个新对象</span></span>
<span class="line">  <span class="token keyword">const</span> obj <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">// 2.新对象原型指向构造函数原型对象</span></span>
<span class="line">  obj<span class="token punctuation">.</span>__proto__ <span class="token operator">=</span> <span class="token class-name">Func</span><span class="token punctuation">.</span>prototype<span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">// 3.将构建函数的this指向新对象</span></span>
<span class="line">  <span class="token keyword">let</span> result <span class="token operator">=</span> <span class="token function">Func</span><span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>obj<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token comment">// 4.根据返回值判断</span></span>
<span class="line">  <span class="token keyword">return</span> result <span class="token keyword">instanceof</span> <span class="token class-name">Object</span> <span class="token operator">?</span> result <span class="token operator">:</span> obj<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="一个-promise-实例有哪些状态" tabindex="-1"><a class="header-anchor" href="#一个-promise-实例有哪些状态"><span>一个 Promise 实例有哪些状态？</span></a></h2>
<ol>
<li>resolved</li>
<li>pending</li>
<li>rejected</li>
</ol>
<h2 id="promise-中异常处理方式" tabindex="-1"><a class="header-anchor" href="#promise-中异常处理方式"><span>Promise 中异常处理方式</span></a></h2>
<ul>
<li>new Promise().catch()</li>
<li>new Promise((reslove,reject)=&gt;{},(err)=&gt;{})</li>
<li>async awiat，使用 try{}catch(e){}finally{}</li>
</ul>
<h2 id="catch方法后的then方法还会执行吗" tabindex="-1"><a class="header-anchor" href="#catch方法后的then方法还会执行吗"><span><code v-pre>catch</code>方法后的<code v-pre>then</code>方法还会执行吗</span></a></h2>
<ul>
<li>会</li>
</ul>
<h2 id="如何进行异步编程-串行-并行" tabindex="-1"><a class="header-anchor" href="#如何进行异步编程-串行-并行"><span>如何进行异步编程，串行，并行</span></a></h2>
<ul>
<li>promise</li>
<li>async await</li>
</ul>
<h2 id="promise值穿透" tabindex="-1"><a class="header-anchor" href="#promise值穿透"><span>Promise值穿透</span></a></h2>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="line">Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>Promise<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span>console<span class="token punctuation">.</span>log<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Promise.resolve(1)会返回一个promise对象并且会将1当做then的参数。而.then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透。所以最后会输出：1。</p>
<h2 id="题目" tabindex="-1"><a class="header-anchor" href="#题目"><span>题目</span></a></h2>
<h3 id="数组去重" tabindex="-1"><a class="header-anchor" href="#数组去重"><span>数组去重</span></a></h3>
<ul>
<li>原生方法：[...new Set([1,2,3,4,1])]</li>
</ul>
<h3 id="冒泡排序" tabindex="-1"><a class="header-anchor" href="#冒泡排序"><span>冒泡排序</span></a></h3>
<ul>
<li>从第一位开始与相邻元素进行比对，大数两方交换，一直对比到最后。</li>
</ul>
<h3 id="快速排序" tabindex="-1"><a class="header-anchor" href="#快速排序"><span>快速排序</span></a></h3>
<ul>
<li>选取一个中间数，将数组根据中间数分为两组，进行递归。</li>
</ul>
</div></template>


