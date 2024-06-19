<template><div><ul>
<li>
<p>用于移除js上下文中的未引用代码 <code v-pre>（dead-code）</code> ;</p>
</li>
<li>
<p>依赖于 <code v-pre>es2015模块系统</code> 中的静态结构特性；</p>
<ul>
<li>import: 导入；</li>
<li>export: 导出；</li>
</ul>
</li>
<li>
<p>兴起于2015年的rollup中；</p>
</li>
<li>
<p>从bundle中移除他们（dead-code) <code v-pre>即为压缩输出</code></p>
<ul>
<li>启用 <code v-pre>uglifyjs</code> 压缩插件；</li>
<li>这是一个必须的步骤，需要引入压缩工具来删除死代码；</li>
</ul>
</li>
<li>
<p>模块的副作用</p>
<ul>
<li>导入时会执行特殊行为的代码，不仅仅暴露 <code v-pre>一个export</code> 或者 <code v-pre>多个export</code> , 它影响全局作用域，并且通常 <code v-pre>不提共export</code> ;</li>
<li>有副作用的模块，需要在 <code v-pre>package.json</code> 中的 <code v-pre>sideEffects</code> 中添加文件路径；或者是 <code v-pre>module选项的rules</code> 中；</li>
</ul>
</li>
</ul>
<h2 id="使用步骤" tabindex="-1"><a class="header-anchor" href="#使用步骤"><span>使用步骤</span></a></h2>
<ul>
<li>
<p>配置 <code v-pre>sideEffects</code> ，使得 <code v-pre>babel编译</code> 时，不会将使用 <code v-pre>import,export</code> 语法的模块，打包未 <code v-pre>commonjs</code> 的 <code v-pre>require</code> 语法；</p>
</li>
<li>
<p>webpack打包处理，将import, export模块，标识未是否是tree-shaking对象；</p>
</li>
<li>
<p>压缩文件 <code v-pre>uglifyjs</code> , 同时进行tree-shaking操作；</p>
</li>
</ul>
</div></template>


