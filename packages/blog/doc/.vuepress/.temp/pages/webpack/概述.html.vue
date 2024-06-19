<template><div><h2 id="webpack-模块打包器" tabindex="-1"><a class="header-anchor" href="#webpack-模块打包器"><span>webpack 模块打包器</span></a></h2>
<ul>
<li>将每个依赖项按照自己的规则模块化，然后通过打包器来管理模块之间依赖；</li>
</ul>
<h2 id="webpack打包产物的运行机制" tabindex="-1"><a class="header-anchor" href="#webpack打包产物的运行机制"><span>webpack打包产物的运行机制</span></a></h2>
<ol>
<li>开始加载入口模块，为的是执行模块；</li>
</ol>
<ul>
<li>加载时，创建新模块；</li>
<li>新模块加入缓存中；</li>
</ul>
<p>创建模块中：</p>
<ul>
<li>找缓存中的模块，有就返回，没有就下一步；</li>
<li>新建模块；</li>
<li>执行模块；</li>
</ul>
<ol start="2">
<li>执行入口模块时，加载依赖模块；</li>
</ol>
<ul>
<li>重复 1；</li>
</ul>
<h2 id="模块加载执行" tabindex="-1"><a class="header-anchor" href="#模块加载执行"><span>模块加载执行</span></a></h2>
<ol>
<li>webpack 的产物维护了 js 模块加载的模块化库；</li>
<li>webpack 的产物维护了 js 文件模块之间的依赖关系，然后逐个一次执行，在模块加载的时候；</li>
</ol>
<h2 id="打包基础" tabindex="-1"><a class="header-anchor" href="#打包基础"><span>打包基础</span></a></h2>
<ul>
<li>模块</li>
<li>捆绑</li>
</ul>
<h2 id="打包器的流程" tabindex="-1"><a class="header-anchor" href="#打包器的流程"><span>打包器的流程</span></a></h2>
<ul>
<li>
<p>解析入口文件，获取所有的依赖项；</p>
<ul>
<li>
<p>@babel/parser 解析入口文件，获取 ast;</p>
<ul>
<li>读取入口文件内容；</li>
<li>使用@babel/parser(js 解析器)解析代码，生成 ast;</li>
</ul>
</li>
<li>
<p>获取入口文件内容；</p>
</li>
<li>
<p>获取它所有的依赖模块；</p>
<ul>
<li>数组存放 ast 中解析出来的依赖；</li>
<li>使用@babel/traverse，它和 babel 解析器配合使用，可以用来遍历及更新每个子节点；</li>
</ul>
</li>
</ul>
</li>
<li>
<p>递归解析所有的依赖项，生成一个依赖关系图；</p>
</li>
<li>
<p>使用依赖图返回一个可运行的 js 文件；</p>
</li>
</ul>
<h2 id="模块的依赖关系-依赖图-数据结构-图" tabindex="-1"><a class="header-anchor" href="#模块的依赖关系-依赖图-数据结构-图"><span>模块的依赖关系（依赖图/数据结构/图）</span></a></h2>
<ol>
<li>定义模块；</li>
</ol>
<h2 id="插件" tabindex="-1"><a class="header-anchor" href="#插件"><span>插件</span></a></h2>
<ul>
<li>解决加载器不能解决的事情；</li>
</ul>
<h2 id="加载器" tabindex="-1"><a class="header-anchor" href="#加载器"><span>加载器</span></a></h2>
<ul>
<li>应用于模块源代码的转换；</li>
</ul>
</div></template>


