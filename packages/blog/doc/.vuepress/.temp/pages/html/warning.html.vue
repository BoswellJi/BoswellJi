<template><div><h1 id="警告" tabindex="-1"><a class="header-anchor" href="#警告"><span>警告</span></a></h1>
<h2 id="video-元素无法绑定-click-事件的解决方案" tabindex="-1"><a class="header-anchor" href="#video-元素无法绑定-click-事件的解决方案"><span>video 元素无法绑定 click 事件的解决方案</span></a></h2>
<h3 id="pc" tabindex="-1"><a class="header-anchor" href="#pc"><span>pc</span></a></h3>
<ol>
<li>不存在此问题</li>
</ol>
<h3 id="mobile" tabindex="-1"><a class="header-anchor" href="#mobile"><span>mobile</span></a></h3>
<ol>
<li>给<code v-pre>video</code>元素添加可点击的蒙层元素；</li>
<li>移动端可以将<code v-pre>click</code>改为<code v-pre>touchstart</code>事件；</li>
</ol>
<h3 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h3>
<p>用加蒙层的方式能统一解决问题；</p>
<h2 id="小米手机浏览器中" tabindex="-1"><a class="header-anchor" href="#小米手机浏览器中"><span>小米手机浏览器中</span></a></h2>
<ul>
<li>给<code v-pre>video</code>元素的<code v-pre>body,html</code>等元素设置<code v-pre>overflow-x:hidden</code>样式后，播放<code v-pre>video</code>视频会自动脱离文档流，其他浏览器不会；</li>
</ul>
</div></template>


