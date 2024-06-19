<template><div><h2 id="主要部分" tabindex="-1"><a class="header-anchor" href="#主要部分"><span>主要部分</span></a></h2>
<ul>
<li>
<p>每个文件都是一个模块</p>
</li>
<li>
<p>互相引用，会形成一个ModuleGraph，数据结构</p>
</li>
<li>
<p>模块会被合并成chunk, chunk被合并成chunk组</p>
</li>
</ul>
<h2 id="chunk类型" tabindex="-1"><a class="header-anchor" href="#chunk类型"><span>chunk类型</span></a></h2>
<ul>
<li>
<p>initial：入口main chunk,</p>
</li>
<li>
<p>non-initial: 可以延迟加载的块</p>
<ul>
<li>可以在动态导入的时候，使用 <code v-pre>魔术注释</code> ，指定chunk名称；</li>
<li>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre class="language-text"><code><span class="line">  import(</span>
<span class="line">  /* webpackChunkName: "app" */</span>
<span class="line">  './app.jsx'</span>
<span class="line">  ).then(App => ReactDOM.render(&lt;App />, root));</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li>
</ul>
</li>
<li>
<p>结构：<code v-pre>[['chunkIds'],[{ module1Name: function(){}} ]]</code></p>
</li>
</ul>
<h2 id="webpack加载模块" tabindex="-1"><a class="header-anchor" href="#webpack加载模块"><span>webpack加载模块</span></a></h2>
<ul>
<li><code v-pre>const module = __webpack_require__(moduleId)</code>：加载模块
<ul>
<li><code v-pre>__webpack_modules__[moduleId](module, module.exports, __webpack_require__)</code>: 执行模块</li>
</ul>
</li>
<li>module: 创建的新模块
<ul>
<li>格式：<code v-pre>{ exports:{} }</code></li>
</ul>
</li>
</ul>
<h2 id="output" tabindex="-1"><a class="header-anchor" href="#output"><span>output</span></a></h2>
<ul>
<li>
<p>输出文件的名称会受配置中的两个字段的影响：</p>
<ul>
<li>output.filename - 用于 initial chunk 文件</li>
<li>output.chunkFilename - 用于 non-initial chunk 文件</li>
</ul>
</li>
</ul>
</div></template>


