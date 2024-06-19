<template><div><h2 id="插槽" tabindex="-1"><a class="header-anchor" href="#插槽"><span>插槽</span></a></h2>
<ul>
<li>
<p>默认插槽：</p>
<ul>
<li>生成普通的vnode(使用内部的元素);</li>
</ul>
</li>
<li>
<p>作用域插槽：</p>
<ul>
<li>生成render函数；</li>
</ul>
</li>
<li>
<p>生成的vnode中不存在slot，只会留下slot中的内容，也就是说slot组件在生成vnode时不是节点；</p>
</li>
<li>
<p>解析slot，先解析default，在解析存在name的；</p>
<ul>
<li>v-slot: 使用这个指令的插槽内容都会在<code v-pre>normalizeScopedSlots</code>方法中解析；其他内容都会<code v-pre>resolveSlots</code>方法中解析；</li>
</ul>
</li>
</ul>
</div></template>


