<template><div><ul>
<li>组件的产出是<code v-pre>vnode</code>,渲染器的渲染目标也是<code v-pre>vnode</code>(意思是渲染器要将vnode渲染到平台);</li>
<li>vdom需要渲染为真实dom, 这个过程可以理解为模板引擎年代的完全替换html, 但是vdom=&gt;dom不是完全替换，而是叫做patch;</li>
<li><code v-pre>想要把vnode渲染成真实dom，需要渲染器，也就是将vnode渲染到平台(dom,android,ssr,canvas)</code>;</li>
</ul>
<h2 id="vnode描述抽象内容" tabindex="-1"><a class="header-anchor" href="#vnode描述抽象内容"><span>vnode描述抽象内容</span></a></h2>
<ul>
<li>
<p>组件就是一个抽象的内容；因为你的意图不是要在页面中渲染<code v-pre>&lt;component&gt;&lt;/component&gt;</code>，而是要渲染组件的内容；</p>
</li>
<li>
<p>除了组件之外还有两种抽象内容需要描述：<code v-pre>Fragment</code>,<code v-pre>portal</code>;</p>
</li>
<li>
<p>Fragment: 当一块模板有多个元素没有容器时，创建Fragment节点；</p>
</li>
<li>
<p>Portal: 将想要的内容渲染到任何地方；</p>
</li>
</ul>
<h2 id="怎样区分vnode" tabindex="-1"><a class="header-anchor" href="#怎样区分vnode"><span>怎样区分vnode</span></a></h2>
<ul>
<li>使用flags属性作为vnode的标识；进而优化diff算法；</li>
</ul>
</div></template>


