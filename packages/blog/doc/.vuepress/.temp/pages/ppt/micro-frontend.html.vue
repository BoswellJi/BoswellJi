<template><div><h2 id="什么是微前端" tabindex="-1"><a class="header-anchor" href="#什么是微前端"><span>什么是微前端？</span></a></h2>
<ol>
<li>将微服务的思想拓展到前端的一种新兴架构，背后主要思想是将一个单体代码库，拆解为多个较小的部分，以便多个相对独立的团队进行分工写作。</li>
<li>与使用不同 JavaScript 框架的多个团队一起构建现代 Web 应用程序的技术、策略和秘诀。</li>
</ol>
<p>提示：实际项目开发过程中，直接考虑到用微前端架构的应该是比较少的，大多都是项目发展到了一定程度后再进行架构升级。</p>
<h2 id="为什么需要微前端" tabindex="-1"><a class="header-anchor" href="#为什么需要微前端"><span>为什么需要微前端？</span></a></h2>
<h4 id="当前问题" tabindex="-1"><a class="header-anchor" href="#当前问题"><span>当前问题</span></a></h4>
<ul>
<li>MPA 方案的优点在于 部署简单、各应用之间硬隔离，天生具备技术栈无关、独立开发、独立部署的特性。缺点则也很明显，应用之间切换会造成浏览器重刷，cookie 不通用问题，由于产品域名之间相互跳转，流程体验上会存在断点。</li>
<li>SPA 则天生具备体验上的优势，应用直接无刷新切换，能极大的保证多产品之间流程操作串联时的流程性。缺点则在于各应用技术栈之间是强耦合的。</li>
</ul>
<p>提示：MPA 满足微前端的要求，但是体验太差，SPA 体验好，但是不满足微前端要求，<code v-pre>所以，取个中</code>。</p>
<h4 id="核心价值" tabindex="-1"><a class="header-anchor" href="#核心价值"><span>核心价值</span></a></h4>
<ol>
<li>我认为微前端的核心价值在于 &quot;技术栈无关&quot;，这才是它诞生的理由，或者说这才是能说服我采用微前端方案的理由。 --qiankun 作者</li>
<li>事实上如果所有的 web 技术栈能做到统一，所有 library 的升级都能做到向下兼容，我们确实就不需要微前端了。 --qiankun 作者</li>
</ol>
<p>提示：这里的关键字<code v-pre>兼容</code>，不同框架的兼容，框架不同版本的兼容。</p>
<h4 id="技术价值" tabindex="-1"><a class="header-anchor" href="#技术价值"><span>技术价值</span></a></h4>
<ul>
<li>技术无关</li>
<li>独立开发、独立部署 子应用仓库独立</li>
<li>独立运行时 每个子应用之间状态隔离，运行时状态不共享</li>
</ul>
<p>提示：可以尝试不同的技术方案。</p>
<h4 id="业务价值" tabindex="-1"><a class="header-anchor" href="#业务价值"><span>业务价值</span></a></h4>
<ul>
<li>解构巨石应用</li>
<li>团队协作方便</li>
</ul>
<p>提示：降本提效。</p>
<h2 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案"><span>解决方案</span></a></h2>
<ul>
<li>MPA(多页应用程序):</li>
<li>Iframe:</li>
<li>Web Component:</li>
<li>ESM(ecmascript module):</li>
</ul>
<p>提示：实现了微前端思想的方案即可称为微前端，殊途同归。</p>
<h2 id="架构图" tabindex="-1"><a class="header-anchor" href="#架构图"><span>架构图</span></a></h2>
<p><img src="https://pic1.zhimg.com/v2-49e29d35de9548c02b0d48782714e914_r.jpg" alt=""></p>
<h2 id="实现方案" tabindex="-1"><a class="header-anchor" href="#实现方案"><span>实现方案</span></a></h2>
<h4 id="single-spa" tabindex="-1"><a class="header-anchor" href="#single-spa"><span>Single-spa：</span></a></h4>
<ul>
<li>介绍</li>
</ul>
<p>Single-spa 是一个将多个单页面应用聚合为一个整体应用的 JavaScript 微前端框架。核心就是定义了一套协议。协议包含主应用的配置信息(注册子应用)和子应用的生命周期(启动，安装，卸载)，通过这套协议，主应用可以方便的知道在什么情况下（路由匹配）激活哪个子应用。</p>
<p>提示：只能是单页应用，这取决于 Single-spa 加载子应用的方式为 js 模块作为入口的。</p>
<p>由此可见，Single-spa 并不参与子应用的任何流程，主要是根据路由匹配情况来管理子应用的安装，卸载。</p>
<ul>
<li>基本用法</li>
</ul>
<p>参看代码</p>
<ul>
<li>运行机制</li>
</ul>
<p>参看博客:<a href="https://boswellji.github.io/MyBlog/Microfrontend/single-spa.html#%E8%BF%90%E8%A1%8C%E6%9C%BA%E5%88%B6" target="_blank" rel="noopener noreferrer">https://boswellji.github.io/MyBlog/Microfrontend/single-spa.html#%E8%BF%90%E8%A1%8C%E6%9C%BA%E5%88%B6</a></p>
<ul>
<li>缺点</li>
</ul>
<ol>
<li>single-spa 是通过 js 文件去加载子应用。</li>
</ol>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token punctuation">{</span></span>
<span class="line">  <span class="token string-property property">"imports"</span><span class="token operator">:</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token string-property property">"@vue-mf/root-config"</span><span class="token operator">:</span> <span class="token string">"https://vue.microfrontends.app/root-config/685cb799969ab697700620a8663570a87834fdc7/vue-mf-root-config.js"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">"single-spa"</span><span class="token operator">:</span> <span class="token string">"https://cdn.jsdelivr.net/npm/single-spa@5.5.1/lib/system/single-spa.min.js"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">"@vue-mf/styleguide"</span><span class="token operator">:</span> <span class="token string">"https://vue.microfrontends.app/styleguide/566ace2deeba4ca56b38fca7fa52d4d89ac32634/vue-mf-styleguide.js"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">"@vue-mf/navbar"</span><span class="token operator">:</span> <span class="token string">"https://vue.microfrontends.app/navbar/01794334ef10fb4059f6658465f42597d24cb9d1/js/app.js"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">"vue"</span><span class="token operator">:</span> <span class="token string">"https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">"@vue-mf/dogs-dashboard"</span><span class="token operator">:</span> <span class="token string">"https://vue.microfrontends.app/dogs-dashboard/48cef902e48d293e1588320c0d855f7252742ab6/js/app.js"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">"@vue-mf/rate-dogs"</span><span class="token operator">:</span> <span class="token string">"https://vue.microfrontends.app/rate-dogs/f5951b9fe7521f1134394244e239a47929239efb/js/app.js"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">"vue-router"</span><span class="token operator">:</span> <span class="token string">"https://cdn.jsdelivr.net/npm/vue-router@3.1.6/dist/vue-router.min.js"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">"@vue-mf/root-config/"</span><span class="token operator">:</span> <span class="token string">"https://vue.microfrontends.app/root-config/685cb799969ab697700620a8663570a87834fdc7/"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">"@vue-mf/navbar/"</span><span class="token operator">:</span> <span class="token string">"https://vue.microfrontends.app/navbar/01794334ef10fb4059f6658465f42597d24cb9d1/js/"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">"@vue-mf/dogs-dashboard/"</span><span class="token operator">:</span> <span class="token string">"https://vue.microfrontends.app/dogs-dashboard/48cef902e48d293e1588320c0d855f7252742ab6/js/"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">"@vue-mf/styleguide/"</span><span class="token operator">:</span> <span class="token string">"https://vue.microfrontends.app/styleguide/566ace2deeba4ca56b38fca7fa52d4d89ac32634/"</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token string-property property">"@vue-mf/rate-dogs/"</span><span class="token operator">:</span> <span class="token string">"https://vue.microfrontends.app/rate-dogs/f5951b9fe7521f1134394244e239a47929239efb/js/"</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>single-spa 本身缺少 js 隔离和 css 隔离。</li>
</ol>
<h4 id="qiankun" tabindex="-1"><a class="header-anchor" href="#qiankun"><span>qiankun</span></a></h4>
<ul>
<li>介绍</li>
</ul>
<p>qiankun 是基于 single-spa 提出的微前端框架, 提供了更加开箱即用的 API（single-spa+sandbox+import-html-entry）。</p>
<ul>
<li>基本用法</li>
</ul>
<p>参看代码</p>
<ul>
<li>
<p>运行机制</p>
<ul>
<li>参看博客:<a href="https://boswellji.github.io/MyBlog/Microfrontend/qiankun.html#%E8%BF%90%E8%A1%8C%E6%9C%BA%E5%88%B6" target="_blank" rel="noopener noreferrer">https://boswellji.github.io/MyBlog/Microfrontend/qiankun.html#%E8%BF%90%E8%A1%8C%E6%9C%BA%E5%88%B6</a></li>
<li>沙盒：快照沙盒，遗留沙盒，代理沙盒</li>
<li>样式隔离：</li>
<li>通信：主子应用通信</li>
<li>import-html-entry</li>
</ul>
</li>
</ul>
<h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>
<ul>
<li><a href="https://zhuanlan.zhihu.com/p/365113639" target="_blank" rel="noopener noreferrer">新一代 Web 建站技术栈的演进：SSR、SSG、ISR、DPR 都在做什么？</a></li>
<li><a href="https://micro-frontends.org/" target="_blank" rel="noopener noreferrer">Micro Frontends</a></li>
<li><a href="https://www.yuque.com/kuitos/gky7yw/gesexv" target="_blank" rel="noopener noreferrer">Why Not Iframe</a></li>
<li><a href="https://www.yuque.com/kuitos/gky7yw/rhduwc" target="_blank" rel="noopener noreferrer">微前端的核心价值</a></li>
<li><a href="https://mp.weixin.qq.com/s/u9F1IUJfsuJBseOsPIK5qQ" target="_blank" rel="noopener noreferrer">微前端究竟是什么？微前端核心技术揭秘！</a></li>
<li><a href="https://www.jianshu.com/p/9703726b4c9f" target="_blank" rel="noopener noreferrer">qiankun 源码深挖</a></li>
<li><a href="https://zhuanlan.zhihu.com/p/356225293" target="_blank" rel="noopener noreferrer">基于 qiankun 的微前端应用实践</a></li>
<li><a href="https://zhuanlan.zhihu.com/p/78362028" target="_blank" rel="noopener noreferrer">可能是你见过最完善的微前端解决方案</a></li>
<li><a href="https://juejin.cn/post/6862661545592111111" target="_blank" rel="noopener noreferrer">微前端框架 之 single-spa 从入门到精通</a></li>
<li><a href="https://juejin.cn/post/6885211340999229454" target="_blank" rel="noopener noreferrer">微前端框架 之 qiankun 从入门到源码分析</a></li>
</ul>
</div></template>


