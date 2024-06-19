<template><div><h1 id="包管理器" tabindex="-1"><a class="header-anchor" href="#包管理器"><span>包管理器</span></a></h1>
<h2 id="pnpm-的问题" tabindex="-1"><a class="header-anchor" href="#pnpm-的问题"><span>pnpm 的问题</span></a></h2>
<ul>
<li>在某些情况下不能使用，例如：源码编译出来的代码再次需要打包，这时候可能会找不到编译出来的代码里导入的包，因为没有按照编译后的代码需求安装，vuepress 的使用会遇到这个问题。</li>
</ul>
<h2 id="npm-的问题" tabindex="-1"><a class="header-anchor" href="#npm-的问题"><span>npm 的问题</span></a></h2>
<ul>
<li>由于<code v-pre>npm</code>大版本升级，所以在安装项目的时候需要根据<code v-pre>package-lock.json</code>注意之前使用的<code v-pre>npm</code>版本,使用对应的版本会避免版本问题。</li>
<li><code v-pre>package-lock.json</code>机制只锁定了项目依赖版本，并没有锁定依赖的依赖版本，<code v-pre>yarn,pnpm</code>没有这个问题</li>
</ul>
</div></template>


