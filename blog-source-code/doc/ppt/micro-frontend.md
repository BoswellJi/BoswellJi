## 什么是微前端？

1. 将微服务的思想拓展到前端的一种新兴架构，背后主要思想是将一个单体代码库，拆解为多个较小的部分，以便多个相对独立的团队进行分工写作。
2. 与使用不同 JavaScript 框架的多个团队一起构建现代 Web 应用程序的技术、策略和秘诀。

提示：实际项目开发过程中，直接考虑到用微前端架构的应该是比较少的，大多都是项目发展到了一定程度后再进行架构升级。

## 为什么需要微前端？

#### 当前问题

- MPA 方案的优点在于 部署简单、各应用之间硬隔离，天生具备技术栈无关、独立开发、独立部署的特性。缺点则也很明显，应用之间切换会造成浏览器重刷，cookie 不通用问题，由于产品域名之间相互跳转，流程体验上会存在断点。
- SPA 则天生具备体验上的优势，应用直接无刷新切换，能极大的保证多产品之间流程操作串联时的流程性。缺点则在于各应用技术栈之间是强耦合的。

提示：MPA 满足微前端的要求，但是体验太差，SPA 体验好，但是不满足微前端要求，`所以，取个中`。

#### 核心价值

1. 我认为微前端的核心价值在于 "技术栈无关"，这才是它诞生的理由，或者说这才是能说服我采用微前端方案的理由。 --qiankun 作者
2. 事实上如果所有的 web 技术栈能做到统一，所有 library 的升级都能做到向下兼容，我们确实就不需要微前端了。 --qiankun 作者

提示：这里的关键字`兼容`，不同框架的兼容，框架不同版本的兼容。

#### 技术价值

- 技术无关
- 独立开发、独立部署 子应用仓库独立
- 独立运行时 每个子应用之间状态隔离，运行时状态不共享

提示：可以尝试不同的技术方案。

#### 业务价值

- 解构巨石应用
- 团队协作方便

提示：降本提效。

## 解决方案

- MPA(多页应用程序):
- Iframe:
- Web Component:
- ESM(ecmascript module):

提示：实现了微前端思想的方案即可称为微前端，殊途同归。

## 架构图

![](https://pic1.zhimg.com/v2-49e29d35de9548c02b0d48782714e914_r.jpg)

## 实现方案

#### Single-spa：

- 介绍

Single-spa 是一个将多个单页面应用聚合为一个整体应用的 JavaScript 微前端框架。核心就是定义了一套协议。协议包含主应用的配置信息(注册子应用)和子应用的生命周期(启动，安装，卸载)，通过这套协议，主应用可以方便的知道在什么情况下（路由匹配）激活哪个子应用。

```js
// 注册子应用
registerApplication({
  name: '@vue-mf/navbar',
  app: () => System.import('@vue-mf/navbar'),
  activeWhen: '/',
  customProps: {
    githubLink: 'https://github.com/vue-microfrontends/root-config',
  },
});

// 子应用导出的生命周期
export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
```

提示：只能是单页应用，这取决于 Single-spa 加载子应用的方式为 js 模块作为入口的。

由此可见，Single-spa 并不参与子应用的任何流程，主要是根据路由匹配情况来管理子应用的安装，卸载。

- 运行机制

[参看博客:](https://boswellji.github.io/MyBlog/Microfrontend/single-spa.html#%E8%BF%90%E8%A1%8C%E6%9C%BA%E5%88%B6)

- 缺点

1. single-spa 是通过 js 文件去加载子应用。

```js
{
  "imports": {
    "@vue-mf/root-config": "https://vue.microfrontends.app/root-config/685cb799969ab697700620a8663570a87834fdc7/vue-mf-root-config.js",
    "single-spa": "https://cdn.jsdelivr.net/npm/single-spa@5.5.1/lib/system/single-spa.min.js",
    "@vue-mf/styleguide": "https://vue.microfrontends.app/styleguide/566ace2deeba4ca56b38fca7fa52d4d89ac32634/vue-mf-styleguide.js",
    "@vue-mf/navbar": "https://vue.microfrontends.app/navbar/01794334ef10fb4059f6658465f42597d24cb9d1/js/app.js",
    "vue": "https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js",
    "@vue-mf/dogs-dashboard": "https://vue.microfrontends.app/dogs-dashboard/48cef902e48d293e1588320c0d855f7252742ab6/js/app.js",
    "@vue-mf/rate-dogs": "https://vue.microfrontends.app/rate-dogs/f5951b9fe7521f1134394244e239a47929239efb/js/app.js",
    "vue-router": "https://cdn.jsdelivr.net/npm/vue-router@3.1.6/dist/vue-router.min.js",
    "@vue-mf/root-config/": "https://vue.microfrontends.app/root-config/685cb799969ab697700620a8663570a87834fdc7/",
    "@vue-mf/navbar/": "https://vue.microfrontends.app/navbar/01794334ef10fb4059f6658465f42597d24cb9d1/js/",
    "@vue-mf/dogs-dashboard/": "https://vue.microfrontends.app/dogs-dashboard/48cef902e48d293e1588320c0d855f7252742ab6/js/",
    "@vue-mf/styleguide/": "https://vue.microfrontends.app/styleguide/566ace2deeba4ca56b38fca7fa52d4d89ac32634/",
    "@vue-mf/rate-dogs/": "https://vue.microfrontends.app/rate-dogs/f5951b9fe7521f1134394244e239a47929239efb/js/"
  }
}
```

2. single-spa 本身缺少 js 隔离和 css 隔离。

#### qiankun

- 介绍

qiankun 是基于 single-spa 提出的微前端框架, 提供了更加开箱即用的 API（single-spa+sandbox+import-html-entry）。

- 运行机制

  - 运行流程： [https://boswellji.github.io/MyBlog/Microfrontend/qiankun.html#%E8%BF%90%E8%A1%8C%E6%9C%BA%E5%88%B6](https://boswellji.github.io/MyBlog/Microfrontend/qiankun.html#%E8%BF%90%E8%A1%8C%E6%9C%BA%E5%88%B6)
  - 沙盒：快照沙盒，遗留沙盒，代理沙盒
  - 样式隔离：
  - 通信：主子应用通信
  - import-html-entry

## 参考

- [新一代 Web 建站技术栈的演进：SSR、SSG、ISR、DPR 都在做什么？](https://zhuanlan.zhihu.com/p/365113639)
- [Micro Frontends](https://micro-frontends.org/)
- [Why Not Iframe](https://www.yuque.com/kuitos/gky7yw/gesexv)
- [微前端的核心价值](https://www.yuque.com/kuitos/gky7yw/rhduwc)
- [微前端究竟是什么？微前端核心技术揭秘！](https://mp.weixin.qq.com/s/u9F1IUJfsuJBseOsPIK5qQ)
- [qiankun 源码深挖](https://www.jianshu.com/p/9703726b4c9f)
- [基于 qiankun 的微前端应用实践](https://zhuanlan.zhihu.com/p/356225293)
- [可能是你见过最完善的微前端解决方案](https://zhuanlan.zhihu.com/p/78362028)
- [微前端框架 之 single-spa 从入门到精通](https://juejin.cn/post/6862661545592111111)
- [微前端框架 之 qiankun 从入门到源码分析](https://juejin.cn/post/6885211340999229454)
