<template><div><h1 id="vue3" tabindex="-1"><a class="header-anchor" href="#vue3"><span>vue3</span></a></h1>
<h2 id="如何让组件的样式不会影响全局" tabindex="-1"><a class="header-anchor" href="#如何让组件的样式不会影响全局"><span>如何让组件的样式不会影响全局</span></a></h2>
<ol>
<li><code v-pre>&lt;style scope&gt;&lt;/style&gt;</code></li>
</ol>
<h2 id="如何覆盖子组件的样式" tabindex="-1"><a class="header-anchor" href="#如何覆盖子组件的样式"><span>如何覆盖子组件的样式</span></a></h2>
<ol>
<li>v-deep(){}</li>
</ol>
<h2 id="父子组件如何通信" tabindex="-1"><a class="header-anchor" href="#父子组件如何通信"><span>父子组件如何通信？</span></a></h2>
<ol>
<li>defineProps() , defineEmits() ,emit()</li>
<li>ref $parent</li>
<li>pinia</li>
</ol>
<h2 id="定义响应式数据的方法" tabindex="-1"><a class="header-anchor" href="#定义响应式数据的方法"><span>定义响应式数据的方法</span></a></h2>
<ul>
<li>ref,reactive</li>
</ul>
<h2 id="ref-和-reactive-的区别" tabindex="-1"><a class="header-anchor" href="#ref-和-reactive-的区别"><span>ref 和 reactive 的区别</span></a></h2>
<ul>
<li>ref 定义的响应式对象，可以将基本类型数据转换为响应式数据。</li>
<li>rective 定义的响应式对象，可以将引用类型数据转换为响应式数据。</li>
</ul>
<h2 id="组件的生命周期流程是怎样的" tabindex="-1"><a class="header-anchor" href="#组件的生命周期流程是怎样的"><span>组件的生命周期流程是怎样的？</span></a></h2>
<p>setup()</p>
<p>beforeCreate()</p>
<p>init options api: 为了兼容 vue2 写法</p>
<p>created()</p>
<p>是否有预编译的模板，没有，开始编译</p>
<p>onBeforeMount()</p>
<p>initial render create &amp; insert dom node</p>
<p>data changes</p>
<p>re-render &amp; patch</p>
<p>initial render create &amp; insert dom node</p>
<p>onMounted()</p>
<p>data changes</p>
<p>onBeforeUpdate()</p>
<p>re-render &amp; patch</p>
<p>onUpdated()</p>
<p>onBeforeUnmount()</p>
<p>onUnmounted()</p>
<h2 id="什么是-mvvm-mvvm-在-vue-中如何实现" tabindex="-1"><a class="header-anchor" href="#什么是-mvvm-mvvm-在-vue-中如何实现"><span>什么是 mvvm,mvvm 在 vue 中如何实现？</span></a></h2>
<ul>
<li>
<p>mvvm 是一种架构模式，核心思想是通过 vm 将 m 和 v 进行绑定，当 m 更新时 vm 主动刷新 v，v 更新时 vm 主动更新 m</p>
</li>
<li>
<p>View 表示当前页面所渲染的 DOM 结构。</p>
</li>
<li>
<p>Model 表示当前页面渲染时所依赖的数据源。</p>
</li>
<li>
<p>ViewModel 表示 vue 的实例，它是 MVVM 的核心。</p>
</li>
</ul>
<h2 id="单项数据流-双向数据绑定-单向数据绑定" tabindex="-1"><a class="header-anchor" href="#单项数据流-双向数据绑定-单向数据绑定"><span>单项数据流，双向数据绑定，单向数据绑定</span></a></h2>
<ul>
<li>数据只能通过组件的的 props 属性，从父组件中，传到子组件中，不可反向</li>
<li>ui 发生变更，<code v-pre>触发</code>绑定的响应式数据的更新，响应式数据的更新，引起依赖数据的 ui 的重新渲染</li>
<li>ui 变化只能更新 model,model 变化只能更新 ui,两者不同时存在</li>
</ul>
<h2 id="keep-alive-是什么-有什么作用-针对它新增的生命周期有哪些-用法是什么" tabindex="-1"><a class="header-anchor" href="#keep-alive-是什么-有什么作用-针对它新增的生命周期有哪些-用法是什么"><span>keep-alive 是什么，有什么作用，针对它新增的生命周期有哪些，用法是什么？</span></a></h2>
<ul>
<li>虚拟组件，对动态切换的组件进行缓存</li>
<li>onActivated()，onDeactivated()</li>
</ul>
<div class="language-html line-numbers-mode" data-highlighter="prismjs" data-ext="html" data-title="html"><pre v-pre class="language-html"><code><span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>KeepAlive</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>component</span> <span class="token attr-name">:is</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>view<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>component</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>KeepAlive</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>KeepAlive</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>comp-a</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>a > 1<span class="token punctuation">"</span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>comp-a</span><span class="token punctuation">></span></span></span>
<span class="line">  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>comp-b</span> <span class="token attr-name">v-else</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>comp-b</span><span class="token punctuation">></span></span></span>
<span class="line"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>KeepAlive</span><span class="token punctuation">></span></span></span>
<span class="line"></span>
<span class="line">include="a,b" :max="10"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="如何让自定义组件可以实现双向数据绑定-即就是如何让-v-model-在组件上起作用" tabindex="-1"><a class="header-anchor" href="#如何让自定义组件可以实现双向数据绑定-即就是如何让-v-model-在组件上起作用"><span>如何让自定义组件可以实现双向数据绑定,即就是如何让 v-model 在组件上起作用？</span></a></h2>
<ul>
<li>const props = defineProps(['modelValue']);</li>
<li>const emit = defineEmits(['update:modelValue']);</li>
<li>emit('update:modelValue', value);</li>
</ul>
<h2 id="vue-中的性能优化" tabindex="-1"><a class="header-anchor" href="#vue-中的性能优化"><span>Vue 中的性能优化</span></a></h2>
<h3 id="组件中响应式对象" tabindex="-1"><a class="header-anchor" href="#组件中响应式对象"><span>组件中响应式对象</span></a></h3>
<ul>
<li>vue 重写对象的 getter,setter 导致重写属性调用栈变长；</li>
<li>不该作为响应式对象的不要放到 data 中；</li>
</ul>
<h3 id="v-if-v-show" tabindex="-1"><a class="header-anchor" href="#v-if-v-show"><span>v-if v-show</span></a></h3>
<ul>
<li>v-if 每次切换都会重新渲染；执行大量脚本；</li>
</ul>
<h3 id="函数式组件" tabindex="-1"><a class="header-anchor" href="#函数式组件"><span>函数式组件</span></a></h3>
<h3 id="子组件分割" tabindex="-1"><a class="header-anchor" href="#子组件分割"><span>子组件分割</span></a></h3>
<h3 id="本地变量" tabindex="-1"><a class="header-anchor" href="#本地变量"><span>本地变量</span></a></h3>
<h3 id="使用-v-show-复用-dom" tabindex="-1"><a class="header-anchor" href="#使用-v-show-复用-dom"><span>使用 v-show 复用 dom</span></a></h3>
<h3 id="keepalive-组件" tabindex="-1"><a class="header-anchor" href="#keepalive-组件"><span>keepalive 组件</span></a></h3>
<h3 id="延迟特性" tabindex="-1"><a class="header-anchor" href="#延迟特性"><span>延迟特性</span></a></h3>
<h3 id="时间分片" tabindex="-1"><a class="header-anchor" href="#时间分片"><span>时间分片</span></a></h3>
<h3 id="非响应式数据" tabindex="-1"><a class="header-anchor" href="#非响应式数据"><span>非响应式数据</span></a></h3>
<h3 id="虚拟滚动" tabindex="-1"><a class="header-anchor" href="#虚拟滚动"><span>虚拟滚动</span></a></h3>
</div></template>


