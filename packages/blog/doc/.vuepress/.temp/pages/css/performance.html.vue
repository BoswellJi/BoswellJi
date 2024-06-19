<template><div><h2 id="选择器的使用" tabindex="-1"><a class="header-anchor" href="#选择器的使用"><span>选择器的使用</span></a></h2>
<ul>
<li>不要使用后代，标签选择器，因为 css 选择器的解析是从后向前的，这样会不精准<code v-pre>.a div:先找所有div</code>；</li>
</ul>
<h2 id="减少触发重排-重绘-合并的属性" tabindex="-1"><a class="header-anchor" href="#减少触发重排-重绘-合并的属性"><span>减少触发重排，重绘，合并的属性</span></a></h2>
<h2 id="通过使用独立图层来触发gpu" tabindex="-1"><a class="header-anchor" href="#通过使用独立图层来触发gpu"><span>通过使用独立图层来触发GPU</span></a></h2>
<ul>
<li><code v-pre>position:absolute;</code></li>
</ul>
</div></template>


