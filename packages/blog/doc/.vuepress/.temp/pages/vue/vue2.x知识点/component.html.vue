<template><div><ul>
<li>只有组件才有生命周期；</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token keyword">const</span> option <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  parent：parentComponent</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>函数组件没有内部状态，没有响应式更新，状态都是外部传入的，所以父组件更新也会跟着更新；</p>
</li>
<li>
<p>组件更新时，会根据组件的<code v-pre>新老vnode tree</code>进行对比，而函数组件无脑更新；</p>
</li>
</ul>
</div></template>


