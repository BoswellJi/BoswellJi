<template><div><h2 id="过程" tabindex="-1"><a class="header-anchor" href="#过程"><span>过程</span></a></h2>
<ul>
<li>schedule(在并发模式下，setState会触发多次，但不会立即更新视图) =&gt; reconcile(对比vdom的过程) =&gt; commit(根据diff对比结果，真实操作dom的过程)</li>
</ul>
</div></template>


