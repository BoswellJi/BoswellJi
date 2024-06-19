<template><div><h2 id="webgl的渲染流程" tabindex="-1"><a class="header-anchor" href="#webgl的渲染流程"><span>webgl的渲染流程</span></a></h2>
<ul>
<li>渲染管线流程图</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre class="language-text"><code><span class="line">           uniform数据                                                  uniform数据+纹理缓冲区</span>
<span class="line">顶点缓冲区   ------->   顶点着色器 ---->  图元装配  ---->  光栅器  ----->  片元着色器</span>
<span class="line"></span>
<span class="line">                                                                         深度缓冲区</span>
<span class="line">------> 归属/剪裁测试 ------> 多重采样，片段运算 ------> 模板测试 ------->  深度测试 ------->  融合 -------->  抖动 -------> 颜色缓冲区</span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


