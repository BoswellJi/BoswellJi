<template><div><h2 id="diff的应用场景" tabindex="-1"><a class="header-anchor" href="#diff的应用场景"><span>diff的应用场景</span></a></h2>
<ul>
<li>新vnode和旧vnode的子节点都是多个的时候；</li>
</ul>
<h2 id="dom操作的性能问题" tabindex="-1"><a class="header-anchor" href="#dom操作的性能问题"><span>DOM操作的性能问题</span></a></h2>
<ul>
<li>创建，移除；</li>
</ul>
<h2 id="children对比方案" tabindex="-1"><a class="header-anchor" href="#children对比方案"><span>children对比方案</span></a></h2>
<ul>
<li>对比children中相同位置的vnode作为一对新旧对vnode对比；</li>
<li>根据新children和旧children长度中较短的进行遍历patch，之后根据当前children的长度大于旧children就新增，少于就删除；</li>
</ul>
<h2 id="diff中的优化" tabindex="-1"><a class="header-anchor" href="#diff中的优化"><span>diff中的优化</span></a></h2>
<ul>
<li>这里的优化需要注意DOM的复用，因为有时候可以看出，vnode列表只是位置发生变化；</li>
<li>移动元素的关键在于：我们需要在新旧children的节点中保存映射关系；</li>
<li>vnode中key的作用是映射到vnode,因为vnode中没有key的情况下，没法知道新children中节点是否在旧vnode下找到可复用节点;</li>
</ul>
</div></template>


