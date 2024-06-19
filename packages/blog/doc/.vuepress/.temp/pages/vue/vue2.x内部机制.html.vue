<template><div><h2 id="const-app-new-vue" tabindex="-1"><a class="header-anchor" href="#const-app-new-vue"><span>const app = new Vue()</span></a></h2>
<h2 id="app-mount" tabindex="-1"><a class="header-anchor" href="#app-mount"><span>app.$mount()</span></a></h2>
<ul>
<li>new Watcher()
<ul>
<li>直接调用 updateComponent,在 Watcher 中执行组件的渲染
<ul>
<li>patch
<ul>
<li>createElement
<ul>
<li>createComponent
<ul>
<li>Vue.extend()</li>
<li>创建 vue-component-id-name 的 vnode</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="patch" tabindex="-1"><a class="header-anchor" href="#patch"><span>patch</span></a></h2>
<ul>
<li>
<p>核心逻辑为 vnode 的同层比较；</p>
</li>
<li>
<p>完全相同的 vnode 才会去深度比较内部 vnode;</p>
</li>
<li>
<p>diff 的核心逻辑 updateChildren;</p>
</li>
<li>
<p>期间 vnode 为 component 时，会调用 vnode 的 init hook，的 vm.$mount;</p>
</li>
<li>
<p>createElm</p>
<ul>
<li>createComponent</li>
<li>createElement</li>
</ul>
</li>
<li>
<p>patchVnode</p>
<ul>
<li>updateChildren: vnode 的 child vnode 不同，需要再进行比对</li>
<li>addVnodes：oldVnodeChild 不存在，直接添加</li>
<li>removeVnodes：newVnodeChild 不存在，直接删除</li>
</ul>
</li>
</ul>
<h2 id="new-watcher" tabindex="-1"><a class="header-anchor" href="#new-watcher"><span>new Watcher()</span></a></h2>
<blockquote>
<p>将getter函数作为监听器，响应式数据变化时，执行监听器。</p>
</blockquote>
<ul>
<li>updateComponent</li>
<li>initWatch</li>
<li>initComputed</li>
</ul>
<h2 id="reactive-mvvm" tabindex="-1"><a class="header-anchor" href="#reactive-mvvm"><span>reactive（MVVM</span></a></h2>
<p><code v-pre>响应式的核心就是，给带有响应式数据的回调函数，根据其中的响应式数据来创建Watcher,在触发响应式时更新这些回调函数</code></p>
<ul>
<li>只能通过修改 model 来更新 view,触发 view 事件来修改 model</li>
<li><strong>一个组件模板中多个响应式属性的 dep 的 Watcher 都是同一个</strong>；</li>
<li>一个 watcher 有多个响应式属性的 Dep 实例(组件本身响应式属性；</li>
<li><strong>一个响应式属性的依赖可能存在多个 Watcher 中，每个依赖就是一个 Watcher</strong>;</li>
</ul>
<h2 id="component-system" tabindex="-1"><a class="header-anchor" href="#component-system"><span>component system</span></a></h2>
<ul>
<li>
<p>模板编译到 render 函数执行创建 render 函数创建 vnode 元素；</p>
</li>
<li>
<p>createElement-&gt;createComponent(构造子类/组件 Vue.extend({...options})，安装组件钩子函数，实例化 vnode);</p>
</li>
<li>
<p>通过模板来创建树状的 vnode；</p>
</li>
<li>
<p>流程：</p>
<ul>
<li>vm.<em>render()-&gt;h/createElement-&gt;createComponent-&gt;Vue.extend(...)<code v-pre>mergeOptions()-&gt;installComponentHooks(vnode的hook)-&gt;vnode</code>-&gt;vm._update()-&gt;vm._patch</em>()<code v-pre>createElem,patchVnode</code>，从 createElement 会重新执行；</li>
</ul>
</li>
</ul>
<h2 id="render-function-只要依赖发生变化就会重新调用" tabindex="-1"><a class="header-anchor" href="#render-function-只要依赖发生变化就会重新调用"><span>render function 只要依赖发生变化就会重新调用</span></a></h2>
<h2 id="computed-option" tabindex="-1"><a class="header-anchor" href="#computed-option"><span>computed option</span></a></h2>
<ul>
<li>会 new Watcher 对 computed 中的响应式属性进行监听，没有变化就会使用上次缓存的值，变化了重新执行并缓存下来；</li>
</ul>
<h2 id="nexttick" tabindex="-1"><a class="header-anchor" href="#nexttick"><span>nextTick</span></a></h2>
<h2 id="keep-alive" tabindex="-1"><a class="header-anchor" href="#keep-alive"><span>keep-alive</span></a></h2>
<h2 id="transition" tabindex="-1"><a class="header-anchor" href="#transition"><span>transition</span></a></h2>
<h2 id="transition-group" tabindex="-1"><a class="header-anchor" href="#transition-group"><span>transition-group</span></a></h2>
<h2 id="event-system" tabindex="-1"><a class="header-anchor" href="#event-system"><span>event system</span></a></h2>
<ul>
<li>每个Vue实例以及Vue子类实例，都存在一个_event = {}的私有事件容器属性，<code v-pre>$on,$emit</code>方法会在当前调用组件上查找，是否存在当前事件名的事件；</li>
</ul>
</div></template>


