<template><div><h2 id="flutter" tabindex="-1"><a class="header-anchor" href="#flutter"><span>flutter</span></a></h2>
<h2 id="渲染流程" tabindex="-1"><a class="header-anchor" href="#渲染流程"><span>渲染流程</span></a></h2>
<ul>
<li>
<p>dart层：dart framework</p>
<ul>
<li>开发层面；</li>
</ul>
</li>
<li>
<p>c++层：c++ engnie：skia, dart runtime,text</p>
<ul>
<li>渲染层面；</li>
<li>dart runtime根据dart层创建element,element tree;</li>
<li>每个节点的render函数调用skia,text的图形api进行绘制；</li>
</ul>
</li>
</ul>
</div></template>


