<template><h2 id="video元素无法绑定click事件的解决方案" tabindex="-1"><a class="header-anchor" href="#video元素无法绑定click事件的解决方案" aria-hidden="true">#</a> video元素无法绑定click事件的解决方案</h2>
<h3 id="pc" tabindex="-1"><a class="header-anchor" href="#pc" aria-hidden="true">#</a> pc</h3>
<ol>
<li>不存在此问题</li>
</ol>
<h3 id="mobile" tabindex="-1"><a class="header-anchor" href="#mobile" aria-hidden="true">#</a> mobile</h3>
<ol>
<li>给<code>video</code>元素添加可点击的蒙层元素；</li>
<li>移动端可以将<code>click</code>改为<code>touchstart</code>事件；</li>
</ol>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h3>
<p>用加蒙层的方式能统一解决问题；</p>
</template>
