<template><div><blockquote>
<p>在模块打包器中，每种资源，vue文件，js文件，html文件等都是模块，根据不同文件类型加载器进行处理，打包成js模块</p>
</blockquote>
<ul>
<li><code v-pre>*</code>.vue文件，.js文件，在进行<code v-pre>import M from '.vue/.js文件名' </code>时，名字相同的导致模块查找失败；这样就会导致打包失败；</li>
</ul>
<blockquote>
<p>对于不同模块的处理：</p>
</blockquote>
<ul>
<li>
<p><code v-pre>commonjs</code>:</p>
<ul>
<li><code v-pre>module.exports = function</code>: <code v-pre>_commonjs2__WEBPACK_IMPORTED_MODULE_4___default()(2, 1)</code></li>
<li><code v-pre>exports.fn = function</code>: <code v-pre>(0,_commonjs1__WEBPACK_IMPORTED_MODULE_3__.reduce)(2, 1)</code></li>
</ul>
</li>
<li>
<p><code v-pre>esm</code>:</p>
<ul>
<li><code v-pre>export function</code>: <code v-pre>(0,_esm__WEBPACK_IMPORTED_MODULE_5__.esmAdd)('ss')</code></li>
<li><code v-pre>export default function</code>: <code v-pre>(0,_esm__WEBPACK_IMPORTED_MODULE_5__.default)(2, 3)</code></li>
</ul>
</li>
</ul>
<h1 id="什么是模块" tabindex="-1"><a class="header-anchor" href="#什么是模块"><span>什么是模块</span></a></h1>
<ul>
<li>
<p>模块化编程中，开发者将程序分解为<code v-pre>功能离散的chunk</code>，并称之为<code v-pre>模块</code>;</p>
</li>
<li>
<p>每个模块都拥有小于完整程序的体积，验证，测试，调试变得轻松；</p>
</li>
<li>
<p>可靠的抽象和封装界限，模块，具备了条理清晰的设计和明确的目的；</p>
</li>
</ul>
<h2 id="何为webpack模块" tabindex="-1"><a class="header-anchor" href="#何为webpack模块"><span>何为webpack模块</span></a></h2>
<ul>
<li>
<p>任何加载能够被加载进来的资源，都可以是webpack的模块</p>
</li>
<li>
<p>es2015 import</p>
</li>
<li>
<p>commonjs require()</p>
</li>
<li>
<p>ADM define require</p>
</li>
<li>
<p>css/less/sass 文件的 @import</p>
</li>
<li>
<p>stylesheet 属性 url()， html 属性 src</p>
</li>
</ul>
<h2 id="支持的模块类型" tabindex="-1"><a class="header-anchor" href="#支持的模块类型"><span>支持的模块类型</span></a></h2>
<ul>
<li>通过loader可以使得webpack支持多种语言和预处理器</li>
</ul>
<h2 id="模块加载流程" tabindex="-1"><a class="header-anchor" href="#模块加载流程"><span>模块加载流程</span></a></h2>
<ul>
<li>todo...</li>
</ul>
<h1 id="模块热替换" tabindex="-1"><a class="header-anchor" href="#模块热替换"><span>模块热替换</span></a></h1>
<ul>
<li>在应用程序运行过程中，替换，添加，删除模块；</li>
</ul>
<h2 id="在应用程序中" tabindex="-1"><a class="header-anchor" href="#在应用程序中"><span>在应用程序中</span></a></h2>
<ul>
<li>todo...</li>
</ul>
<h2 id="在compiler中" tabindex="-1"><a class="header-anchor" href="#在compiler中"><span>在compiler中</span></a></h2>
<ul>
<li>todo...</li>
</ul>
<h2 id="在模块中" tabindex="-1"><a class="header-anchor" href="#在模块中"><span>在模块中</span></a></h2>
<ul>
<li>todo...</li>
</ul>
<h2 id="在runtime中" tabindex="-1"><a class="header-anchor" href="#在runtime中"><span>在runtime中</span></a></h2>
<ul>
<li>todo...</li>
</ul>
</div></template>


