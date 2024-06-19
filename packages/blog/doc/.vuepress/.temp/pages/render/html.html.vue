<template><div><h2 id="用户界面的渲染类型" tabindex="-1"><a class="header-anchor" href="#用户界面的渲染类型"><span>用户界面的渲染类型</span></a></h2>
<ul>
<li>中断渲染：先将<code v-pre>渲染任务</code>进行分割<code v-pre>fiber</code>，数据更新后，为了不影响<code v-pre>ui线程</code>将渲染任务暂停，之后继续执行；</li>
<li>同步渲染：数据更新后，立即执行<code v-pre>渲染任务</code>；</li>
<li>异步渲染：数据更新后，将<code v-pre>渲染任务</code>放到<code v-pre>下个任务队列</code>中，等待<code v-pre>当前任务栈</code>被清空；</li>
</ul>
<h2 id="渲染器" tabindex="-1"><a class="header-anchor" href="#渲染器"><span>渲染器</span></a></h2>
<ul>
<li>svg</li>
<li>html</li>
<li>canvas</li>
<li>webgl</li>
<li>native</li>
</ul>
<h2 id="mvvm" tabindex="-1"><a class="header-anchor" href="#mvvm"><span>mvvm</span></a></h2>
<ul>
<li>Object.defineProperty()</li>
<li>依赖收集</li>
<li>状态变更，视图更新</li>
</ul>
<h2 id="diff" tabindex="-1"><a class="header-anchor" href="#diff"><span>diff</span></a></h2>
<ul>
<li>算法的核心在于两个vnode相同时多个子节点的比较</li>
<li>对比算法是渲染的性能所在；[对比的次数，操作dom的次数]</li>
</ul>
<h2 id="组件化" tabindex="-1"><a class="header-anchor" href="#组件化"><span>组件化</span></a></h2>
<ul>
<li>组件的本质没有变化<code v-pre>模板+数据</code>，但是组件产出<code v-pre>=&gt;完整html</code>却变化了，现在组件的产出变成了<code v-pre>vdom</code>;</li>
<li>一个组件最重要的是render,借助snabbdom api我们可以很容易获得vdom；</li>
</ul>
<h2 id="复用方式" tabindex="-1"><a class="header-anchor" href="#复用方式"><span>复用方式</span></a></h2>
<ul>
<li>mixins</li>
<li>hoc</li>
<li>render prop</li>
<li>hook：逻辑复用和组件表达进行一定程度的解耦；</li>
</ul>
<h2 id="性能优化" tabindex="-1"><a class="header-anchor" href="#性能优化"><span>性能优化</span></a></h2>
<ul>
<li>给绑定v-for指令的节点的子节点添加key，使得oldVnode children在对比过程中可以复用节点；</li>
</ul>
<h2 id="packages" tabindex="-1"><a class="header-anchor" href="#packages"><span>packages</span></a></h2>
<ul>
<li>
<p><a href="https://github.com/vuejs/vue" target="_blank" rel="noopener noreferrer">vue</a></p>
</li>
<li>
<p><a href="https://github.com/vuejs/vue-router" target="_blank" rel="noopener noreferrer">vue-router</a></p>
</li>
<li>
<p><a href="https://github.com/vuejs/vuex" target="_blank" rel="noopener noreferrer">vuex</a></p>
</li>
<li>
<p><a href="https://github.com/vuejs/vue-template-es2015-compiler" target="_blank" rel="noopener noreferrer">vue-template-es2015-compiler</a></p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre class="language-text"><code><span class="line">在vue2.0模板中支持，方便的es2015特性子集</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li><a href="https://github.com/vuejs/vue/tree/dev/packages/vue-template-compiler" target="_blank" rel="noopener noreferrer">vue-template-compiler</a></li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre class="language-text"><code><span class="line">用来预编译vue2.0模板到渲染函数中</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h3 id="components" tabindex="-1"><a class="header-anchor" href="#components"><span>components</span></a></h3>
<ul>
<li><a href="https://github.com/xiaokaike/vue-color" target="_blank" rel="noopener noreferrer">vue-color</a></li>
<li><a href="https://github.com/ElemeFE/mint-ui" target="_blank" rel="noopener noreferrer">mint-ui</a></li>
<li><a href="https://github.com/ElemeFE/element" target="_blank" rel="noopener noreferrer">element</a></li>
<li><a href="https://github.com/naihe138/vue-picker" target="_blank" rel="noopener noreferrer">vue-picker</a></li>
</ul>
<h3 id="libary" tabindex="-1"><a class="header-anchor" href="#libary"><span>libary</span></a></h3>
<ul>
<li><a href="https://github.com/Inndy/vue-clipboard2" target="_blank" rel="noopener noreferrer">vue-clipboard2</a></li>
<li><a href="https://github.com/alfhen/vue-cookie" target="_blank" rel="noopener noreferrer">vue-cookie</a></li>
<li><a href="https://github.com/vue-html5plus/vue-html5plus" target="_blank" rel="noopener noreferrer">vue-html5plus</a></li>
</ul>
<h3 id="build-tool" tabindex="-1"><a class="header-anchor" href="#build-tool"><span>build tool</span></a></h3>
<ul>
<li><a href="https://github.com/vuejs/vue-cli" target="_blank" rel="noopener noreferrer">vue-cli</a></li>
</ul>
<h3 id="server-render" tabindex="-1"><a class="header-anchor" href="#server-render"><span>server render</span></a></h3>
<ul>
<li>
<p><a href="https://github.com/ream/ream" target="_blank" rel="noopener noreferrer">ream</a></p>
</li>
<li>
<p><a href="https://github.com/conventional-changelog/conventional-changelog" target="_blank" rel="noopener noreferrer">conventional-changelog</a></p>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre class="language-text"><code><span class="line">从一个项目的提交信息合元数据中生成日志和发布笔记</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


