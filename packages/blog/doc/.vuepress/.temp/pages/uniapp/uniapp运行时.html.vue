<template><div><h2 id="uniapp-是如何让-vue-在小程序运行时运行的" tabindex="-1"><a class="header-anchor" href="#uniapp-是如何让-vue-在小程序运行时运行的"><span>uniapp 是如何让 vue 在小程序运行时运行的</span></a></h2>
<h2 id="依赖模块" tabindex="-1"><a class="header-anchor" href="#依赖模块"><span>依赖模块</span></a></h2>
<ul>
<li>
<p>./node_modules/@dcloudio/uni-mp-weixin/dist/index.js：uni core</p>
<ul>
<li>暴露的api:
<ul>
<li>createApp</li>
<li>createPage</li>
<li>createComponent</li>
<li>createPlugin</li>
<li>createSubpackageApp</li>
<li>uni: baseApi,todoApis,extraApi,eventApi,api,wx</li>
</ul>
</li>
</ul>
</li>
<li>
<p>./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js：vue core 修改后的</p>
<ul>
<li>暴露的api:
<ul>
<li>Vue</li>
</ul>
</li>
</ul>
</li>
<li>
<p>./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js： component core</p>
</li>
<li>
<p>./node_modules/@babel/runtime/regenerator/index.js: ployfill</p>
</li>
<li>
<p>./node_modules/regenerator-runtime/runtime.js: ployfill</p>
</li>
<li>
<p>(webpack)/buildin/global.js:</p>
</li>
</ul>
<h2 id="文件" tabindex="-1"><a class="header-anchor" href="#文件"><span>文件</span></a></h2>
<ul>
<li>runtime.js: webpack 的模块加载器</li>
<li>vendor.js: 运行时的依赖库(mpvue)</li>
<li>main.js: app.js</li>
</ul>
<h2 id="小程序初始化" tabindex="-1"><a class="header-anchor" href="#小程序初始化"><span>小程序初始化</span></a></h2>
<ul>
<li>
<p>从main.js模块开始执行，这里会执行</p>
<ul>
<li>new Vue()</li>
<li>createApp()根组件没有视图，所以不需要amount方法</li>
</ul>
</li>
<li>
<p>接着是页面的初始化</p>
<ul>
<li>createPage()</li>
<li>Vue.extend()</li>
<li>attached中实例化组件：将组件中的data初始化为响应式对象</li>
<li>amount实例化观察者Watcher来观察数据变更</li>
</ul>
</li>
<li>
<p>没有安装组件的步骤<code v-pre>mountComponent</code>:</p>
<ul>
<li>因为模板是直接编译为 wxml 文件;</li>
</ul>
</li>
<li>
<p>创建组件实例：</p>
<ul>
<li>从 new Vue()开始，这个是根实例；App.wxml<code v-pre>createApp</code>,在main.js中，_init方法初始化的是当前组件的各种功能；</li>
<li>从 Vue.extend()开始，这个是组件；Page.wxml<code v-pre>createPage</code></li>
<li>从 Vue.extend()开始，这个是组件；Component.wxml<code v-pre>createComponent</code></li>
</ul>
</li>
<li>
<p>依赖注入（provide/inject）:</p>
<ul>
<li>Vue.component()创建组件时，<code v-pre>this.init()</code>调用初始化方法中处理；</li>
<li>每个组件有$parent,从当前组件开始，一层一层向上找;</li>
</ul>
</li>
</ul>
<h2 id="修改响应式数据" tabindex="-1"><a class="header-anchor" href="#修改响应式数据"><span>修改响应式数据</span></a></h2>
<ul>
<li>this.props = 'value';
<ul>
<li>watcher.run();
<ul>
<li>vm._update(vm_render(),hydrating);</li>
</ul>
</li>
</ul>
</li>
</ul>
</div></template>


