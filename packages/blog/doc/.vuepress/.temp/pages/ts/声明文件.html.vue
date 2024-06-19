<template><div><h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述"><span>概述</span></a></h2>
<ul>
<li>
<p>在ts中使用js；</p>
</li>
<li>
<p>加载库的方式：</p>
<ul>
<li><code v-pre>npm</code>或者<code v-pre>cdn</code>;</li>
</ul>
</li>
<li>
<p>导入库到代码的方式：</p>
<ul>
<li><code v-pre>全局对象</code>或者<code v-pre>require</code>或者<code v-pre>import</code>;</li>
</ul>
</li>
</ul>
<h2 id="如何定义-js-文件的-xxx-d-ts-文件" tabindex="-1"><a class="header-anchor" href="#如何定义-js-文件的-xxx-d-ts-文件"><span>如何定义 js 文件的 xxx.d.ts 文件</span></a></h2>
<ul>
<li>ts 项目中使用 js 代码包</li>
</ul>
<div class="language-.d.ts line-numbers-mode" data-highlighter="prismjs" data-ext=".d.ts" data-title=".d.ts"><pre v-pre class="language-.d.ts"><code><span class="line">{</span>
<span class="line">  &quot;compilerOptions&quot;:{</span>
<span class="line">    &quot;paths&quot;: {</span>
<span class="line">      &quot;fbgraph&quot;: [</span>
<span class="line">        &quot;src/type/fbgraph.d.ts&quot;</span>
<span class="line">      ]</span>
<span class="line">    }</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>ts 项目中直接使用 js 代码（从其他地方拷贝到项目中的 js 代码</li>
</ul>
<div class="language-.d.ts line-numbers-mode" data-highlighter="prismjs" data-ext=".d.ts" data-title=".d.ts"><pre v-pre class="language-.d.ts"><code><span class="line">test.js文件的同级目录定义一个test.d.ts文件</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


