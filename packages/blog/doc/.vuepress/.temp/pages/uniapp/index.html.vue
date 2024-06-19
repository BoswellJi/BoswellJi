<template><div><h2 id="小程序跨端-平台框架" tabindex="-1"><a class="header-anchor" href="#小程序跨端-平台框架"><span>小程序跨端/平台框架</span></a></h2>
<h2 id="两种方案" tabindex="-1"><a class="header-anchor" href="#两种方案"><span>两种方案：</span></a></h2>
<ul>
<li>预编译模式</li>
<li>运行时模式</li>
</ul>
<h2 id="跨平台的内容" tabindex="-1"><a class="header-anchor" href="#跨平台的内容"><span>跨平台的内容：</span></a></h2>
<ul>
<li>api，组件：这些都是为了web平台所作的兼容处理；</li>
</ul>
<h2 id="跨端的内容" tabindex="-1"><a class="header-anchor" href="#跨端的内容"><span>跨端的内容：</span></a></h2>
<ul>
<li>api：都是可以直接代理端的功能的<code v-pre>小程序跨多端只要处理不对齐的api</code>；</li>
<li>组件：</li>
</ul>
<h2 id="uniapp" tabindex="-1"><a class="header-anchor" href="#uniapp"><span>uniapp</span></a></h2>
<ul>
<li>vue是源代码，mini program是目标代码；所以底层重渲染时是setData，vue是dom操作；</li>
</ul>
<h2 id="构建编译流程-构建工具基于通过vue-cli" tabindex="-1"><a class="header-anchor" href="#构建编译流程-构建工具基于通过vue-cli"><span>构建编译流程（构建工具基于通过vue-cli）</span></a></h2>
<ul>
<li>
<p>初始化构建工具的配置参数，Service类的实例化；</p>
<ul>
<li>获取package.json的配置；</li>
<li>解析应用中使用的vue-cli插件，<code v-pre>/^(@vue\/|vue-|@[\w-]+(\.)?[\w-]+\/vue-)cli-plugin-/</code>插件名称的规则</li>
</ul>
</li>
<li>
<p>获取命令行的命令与参数来决定如何构建；</p>
</li>
<li>
<p>执行命令；</p>
<ul>
<li>获取环境类型；</li>
<li>根据<code v-pre>--skip-plugins</code>参数初始化需要被跳过的插件；</li>
<li>加载环境变量，加载用户配置，应用插件,注册命令；</li>
<li>验证命令是否存在；</li>
<li>执行命令的回调函数；
<ul>
<li>获取配置的webpack配置文件，执行webpack函数，进行编译打包；</li>
</ul>
</li>
</ul>
</li>
<li>
<p>编译时插件</p>
<ul>
<li>
<p>webpack</p>
<ul>
<li>webpack-uni-mp-loader: 将vue文件编译到小程序文件；</li>
<li>webpack-uni-pages-loader：生成小程序的./project.config.json文件；</li>
</ul>
</li>
<li>
<p>vue-cli</p>
<ul>
<li>vue-cli-plugin-hbuilderx: hbuilderX的vue-cli插件，用来编译打包；</li>
<li>vue-cli-plugin-uni：vue-cli新增命令；</li>
<li>vue-cli-plugin-uni-optimize：生成代码的优化；</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="运行时流程-依赖于vue" tabindex="-1"><a class="header-anchor" href="#运行时流程-依赖于vue"><span>运行时流程（依赖于vue）</span></a></h2>
<ul>
<li>webpack的模块加载系统；</li>
<li>createApp创建小程序app,createPage创建页面,createComponent创建组件,createSubpackageApp创建子包；</li>
<li>根据响应式属性来触发更新，接着重新渲染；</li>
<li>render不会生成vnode;</li>
<li>patch对比data而不是vnode,接着调用setData;</li>
</ul>
<h2 id="功能" tabindex="-1"><a class="header-anchor" href="#功能"><span>功能</span></a></h2>
<ul>
<li>uniapp不会影响直接使用小程序api,<code v-pre>wx.showLoading()</code>；</li>
<li>底层自动差量数据更新，简单而高性能；</li>
</ul>
<h2 id="跨端小程序的区别和重心" tabindex="-1"><a class="header-anchor" href="#跨端小程序的区别和重心"><span>跨端小程序的区别和重心：</span></a></h2>
<ul>
<li>DSL和多端适配；</li>
</ul>
<h2 id="小程序架构" tabindex="-1"><a class="header-anchor" href="#小程序架构"><span>小程序架构</span></a></h2>
<ul>
<li>
<p>逻辑层 Data</p>
</li>
<li>
<p>视图层 Event</p>
</li>
<li>
<p>原生能力 JSBridge</p>
</li>
<li>
<p>声明周期</p>
</li>
<li>
<p>模板转换</p>
</li>
<li>
<p>数据映射</p>
</li>
<li>
<p>事件代理</p>
</li>
</ul>
<h2 id="运行时模拟" tabindex="-1"><a class="header-anchor" href="#运行时模拟"><span>运行时模拟</span></a></h2>
<ul>
<li>ProvidePlugin,使用webpack插件注入到模块中；</li>
</ul>
<h2 id="跨端框架编译到小程序" tabindex="-1"><a class="header-anchor" href="#跨端框架编译到小程序"><span>跨端框架编译到小程序</span></a></h2>
<ul>
<li>vue -&gt; wxml wxss js json
<ul>
<li>app,page,component</li>
</ul>
</li>
</ul>
<h2 id="跨端框架中的通用内容" tabindex="-1"><a class="header-anchor" href="#跨端框架中的通用内容"><span>跨端框架中的通用内容</span></a></h2>
<ul>
<li>组件跨端；</li>
<li>api跨端；</li>
<li>各端的特色；（每个端都会有不同的</li>
</ul>
<h2 id="uniapp使用了vue的哪些功能" tabindex="-1"><a class="header-anchor" href="#uniapp使用了vue的哪些功能"><span>uniapp使用了vue的哪些功能？</span></a></h2>
<ul>
<li>响应式系统；</li>
<li>组件化系统；</li>
<li>slot组件；</li>
<li>vuex状态管理;</li>
<li>生命周期；</li>
</ul>
<h2 id="没有使用vue的哪些功能" tabindex="-1"><a class="header-anchor" href="#没有使用vue的哪些功能"><span>没有使用vue的哪些功能？</span></a></h2>
<ul>
<li>vnode: vue在小程序中没有vnode的概念，因为直接是vue模板到mini模板;</li>
<li>router: 小程序中是页面与页面之间的跳转的，vue是组件与组件；</li>
<li>diff: 小程序中diff的是data；</li>
</ul>
<p><a href="http://uniapp.dcloud.io/vue-api?id=%E5%85%A8%E5%B1%80%E9%85%8D%E7%BD%AE" target="_blank" rel="noopener noreferrer">vue的支持程度</a></p>
</div></template>


