## 自我介绍

| 姓名 | 季明壮                                                           |
| ---- | ---------------------------------------------------------------- |
| 网名 | Boswell                                                          |
| 岗位 | 前端工程师                                                       |
| 电话 | 13812872860                                                      |
| 邮箱 | aiyoudqrjmz@163.com                                              |
| 学校 | 沙洲职业工学院（2013-9~2016-6                                    |
| 专业 | 网站开发与网络营销                                               |
| 网站 | https://boswellji.github.io/MyBlog/personal-profile/boswell.html |

## 职业技能

- 阅读过vue2.x/vue3.x的runtime代码，深入理解vue运行时机制，以及阅读过其他vue生态库vue-router,vuex,pinia等源码。
- 深入理解并熟练开发基于 vue + pinia/vuex + typescript/javascript 的应用。
- 有大量单页，多页，微前端架构的应用开发经验，能熟练搭建应用框架，同时对于SSR架构的应用也有一定了解。
- 掌握glup,vite,webpack等构建工具使用，能够基于构建工具自主搭建现代前端应用工程，开发规范，以及构建流程的性能优化。
- 熟悉Node.js及其服务器端框架nest.js，能够基于nest.js开发http服务器。
- 熟练使用微信小程序原生框架，uniapp跨端框架开发微信小程序应用，并理解微信小程序运行原理。
- 对canvas2d,webgl感兴趣，自学过webgl shader，对图形绘制有一定基础。
- 了解跨端框架，uniapp, flutter, react native。

## 工作经历

## 2022-6~至今：同程旅行

### 旅仓PC

> 描述：公司全品类产品，包括旅游，出行，住宿等对外分销业务平台PC端。

- 技术栈：typescript vue3 vue-router pinia tailwindcss vite
- 职责：整个网站的前端架构设计与实现，也是对老网站的一次重构，老网站基于Asp.Net的服务器端渲染的多页架构网站。

  - 实现了基于Typescript,Vue3,Vite的多页架构，支持页面路径重写，html支持ejs模板引擎等。
  - 整个项目的模块拆分，以及模块之间的组织关系的定义，到最后目录结构的创建。
  - 基础工具的封装，http请求的axios模块，文件流下载，js小数计算，本地存储操作等。
  - 组件的职责划分，通过考虑公共组件的原子化，来划分公共组件以及业务公共组件，以提高组件的复用程度。
  - 抽象出hook能力，同样也会划分为公共hook，以及业务hook，赋能业务侧开发。
  - 定义vscode配置文件，统一的编辑器开发环境规范，例如：统一的插件安装，统一格式化工具，统一项目调试等。
  - 基于prttier的格式化规则定义，以及基于eslint的代码风格统一的规则定义。
  - 基于vite的拆包能力，拆分公共chunk,业务chunk,异步chunk，以及tree-shaking能力的利用等
  - 维护Typescript编写的公共的类型，扩展现有类型以及基本的类型工具等。
  - 实现了多页的页面地址重写能力用于在开发环境路径符合老项目的跳转规则。
  - 实现了前后端联调通讯的Http代理服务，解决老项目迁移中的接口代理问题。
  - 实现了编写vite插件将产物构建到老项目的自动化流程。
  - 通过husky执行shell脚本，实现了预发分支合并到开发分支的危险行为检测并回退。
  - 核心的价格日历组件封装，只提供了最底层的价格日历能力，其他业务侧可以封装来满足自身需求。
  - 业务开发侧的核心业务周边游，国内游，出境游等详情页到下单支付的全流程开发。

### 旅仓H5

> 描述：公司全品类产品，包括旅游，出行，住宿等对外分销业务平台移动端，支持嵌入第三方webview中。

- 技术栈：typescript vue2.7 vue-router vuex less vite vant
- 职责：整个网站的前端架构设计与实现，页面UI复用的其他项目代码，原项目为基于传统script引入的，服务器端渲染的，多页架构网站，老项目采用2.6版本，所以为了充分复用我采用了2.7版本，这样我就可以同时给项目后续续升级为3.x版本留下了口子，一举两得。所以为了能够极大的复用原项目的代码能力，做了此次设计与开发。

  - 实现了基于Typescript,Vue2.7,Less,Vite的多页架构。
  - 实现了项目中兼容Commonjs与ESM模块之间的交互。
  - 实现了项目对于不支持原生ESM，原生ESM动态导入和 import.meta的浏览器的兼容。
  - 通过封装入口来让所有页面初始化流程得到统一处理。包括处理url中的参数，用户信息获取，等公共逻辑抽象。
  - 业务开发侧的核心业务详情页到下单支付的所有重构开发。
  - 定义第三方接入方传入的字段规则。
  - 通过阅读vant源码，实现了下拉刷新组件的自动执行。

### 旅仓小程序

> 描述：公司全品类产品，包括旅游，出行，住宿等对外分销业务平台小程序端，整个小程序的所有业务线都通过H5端来提供业务支持。

- 技术栈：原生小程序框架 less glup 
- 职责：整个应用的开发与维护，以及将H5能力融合进小程序。

  - 通过缓存编译产物，优化了基于gulp的构建系统开发时的编译性能优化。
  - 通过修改glup产物，替换常量定义区分开发环境与生产环境。
  - 通过接入旅仓H5来复用整个项目的详情到下单支付流程能力。
  - 定义小程序与H5交互的字段规则，维护之间的基本互操作性。
  - 维护海报分享模块，解决原生canvas的字体宽度测量兼容性。
  - 业务开发侧的日常任务开发与问题解决。

### 旅仓CRM

> 描述：公司全品类产品，包括旅游，出行，住宿等对外分销业务平台的后台管理系统。

- 技术栈：typescript vue3.x element-plus vue-router pinia sass vite

- 职责：整个应用的前端架构设计与实现，以及核心业务逻辑的开发。

  - 通过之前的脚手架项目进行的开发。
  - 实现了基于Typescript,Vue3.x,element-plus,Vue-Router,Pinia,Sass,Vite的单页架构。
  - 实现了基于RBAC的权限控制，路由，按钮级别控制。
  - 实现了Layout的可扩展性。
  - 实现了基于scss变量的主题切换。
  - 封装公共组件(如：弹性文字提示弹框组件，多个element-plus二次封装组件等)，公共工具(axios请求封装，文件下载，小数计算等)，Hooks等。
  - 业务开发侧的核心的订单详情页的开发。

### 部门的后台管理系统前端脚手架

> 描述：为了方便快速开发后台管理系统，搭建了一套基于vue3,vue-router,pinia,element-plus的后台系统脚手架，将后台系统中常用的能力：菜单，权限，基本组件表单，表格，弹框，基础工具，layout等以及公司提供的前端基础能力集成，统一登录等封装为一套后台管理系统的业务框架，加速业务开发。

- 技术栈：typescript vue3.x element-plus vue-router pinia sass vite

- 职责：整个应用的前端架构设计与实现

  - 实现了基于Typescript,Vue3.x,element-plus,Vue-Router,Pinia,Sass,Vite的单页架构。
  - 整个项目的模块拆分，以及模块之间的组织关系的定义，到最后目录结构的创建。
  - 定义vscode配置文件，统一的编辑器开发环境规范，例如：统一的插件安装，统一格式化工具，统一项目调试等。
  - 基于prttier的格式化规则定义，以及基于eslint的代码风格统一的规则定义。
  - 基于vite的拆包能力，拆分公共chunk,业务chunk,异步chunk,按需chunk,以及tree-shaking能力的利用来优化产物等。
  - 通过husky执行shell脚本，实现了预发分支合并到开发分支的危险行为检测并回退。
  - 配置vite的代理服务器，确保开发环境的调试正常。
  - 维护Typescript编写的公共的类型，扩展现有类型以及基本的类型工具等。
  - 前端基于RBAC的权限控制能力，封装指令给按钮加权限。
  - 路由守卫逻辑的封装，错误路由页面逻辑，权限验证逻辑等。
  - 应用的Layout组件开发。
  - 基于scss变量的主题切换。
  - 基础公共组件的开发，弹框，分页，表格，文件上传等。
  - 基础公共工具的开发，axios请求封装，文件下载，小数计算等。
  - 接口的白名单机制。
  - 公司统一登录能力的集成。

### 其他

> 做过面试官，包括社招以及校招；带过几个实习生，带领实习生了解整个研发的工作流，以及基本的任务模块拆分讲解，审核他们的代码，解决他们的业务和技术问题等，带领他们做任务。

## 2021-8~2022-6：研途教育科技

### 学生专属择校报告生成工具

> 描述：预定义多个配置组件，通过拖拽的方式放置到报告页面中进行配置，然后生成pdf报告，项目主要采用：

- 技术栈：vue2.x vuex vue-router element-ui axios lodash vuedraggable echarts less

- 职责：整体设计与开发

  - 实现了`pdf`生成需要用到的全部配置组件；
  - 实现了基于`vuedraggable`组件的拖拽系统；
  - 实现了根据配置报告中的组件是否存在自动生成目录；
  - 实现了编辑完成后的实时草稿存储；
  - 实现了将canva转文件进行上传获取图片url后上传报告；
  - 实现了后端生成pdf的模板html,通过`css`的`@page`特性给打印的文档配置样式；
  - 解决canvas绘制中图片跨域问题；

- 地址
  - [项目图片](https://boswellji.github.io/MyBlog/project/student-report.html)

### 模拟考试

> 描述：这是一个hybrid app,提供给学生用来模拟考试,有多门课程的试卷，项目主要采用：

- 技术栈：vue2.x vuex vue-router vant axios lodash moment compressorjs qs less

- 职责：整体设计与开发

  - 实现了通过与app交互，获取token进行考试登录，未登录情况下，唤起app登录；
  - 实现了首期的考试营销报名页面；
  - 实现了开考60s祝福视频，协商app开启`web video`默认播放声音；
  - 实现了试卷封面页面开发；
  - 实现了考场功能，试卷展示，题目切换，考试时长计算，退出考场提示，查看已做答列表；
  - 实现了与app交互取消app导航条，使用自定义导航条；
  - 实现了恢复考场的功能，例如因为异常app崩溃，再次恢复考试时，重新回到最后一题；
  - 实现了图片上传时，对图片进行压缩后上传；
  - 实现了分享海报；

- 地址
  - [项目图片](https://boswellji.github.io/MyBlog/project/mock-exam.html)

### 订单退费审核流程

> 描述：多级退款审批流程，项目主要采用：

- 技术栈 vue2.x vuex vue-router vant axios lodash moment

- 职责：整体设计与开发

  - 实现了多级审批人配置以及最大审批人限制；
  - 实现了对数据格式整理，符合树组件传值方式，以及初始化时针对选中元素在渲染vnode时对样式改写；
  - 实现了递归组件；

- 地址
  - [项目图片](https://boswellji.github.io/MyBlog/project/order-refund.html)

## 2019-3~2021-8：智能晴雨

### 咪店优选小程序

- 技术栈：uniapp vuex uniapp ui vue vue-router

- 职责

  - 实现了分享海报，购物车，商户上货/下架，优惠支付，商户裂变，卡券核销，会员卡任务，商品分享大厅等多个功能模块；
  - 实现了各种会场专题等业务；
  - 实现了图片下载，地理位置获取，微信支付等核心mixins；
  - 实现了canvas 2d海报工具函数开发；

- 地址
  - [项目图片](https://boswellji.github.io/MyBlog/project/mishop.html)

### 神奇会员小程序

- 技术栈：uniapp vuex uniapp ui vue vue-router

- 职责

  - 实现了线下支付流程，商户详情页交互，商户及用户提现，多入口聚合数据列表，商品详情到下单全流程等功能模块的开发；
  - 实现了自定义价格输入的键盘；
  - 实现了整体项目的接口重构；
  - 实现了项目各个模块日常维护与迭代；
  - 实现了图片下载，地理位置获取，微信支付等核心mixin编写；
  - 实现了canvas 2d海报工具函数开发；
  - 实现了根据日期分页导致列表一屏不够递归继续加载到满足条件的功能；

- 地址
  - [项目图片](https://boswellji.github.io/MyBlog/project/discount.html)

### 喵客云管理后台

- 技术栈：vue vuex vue-roter element-UI axios moment

- 职责

  - 多类型素材分享管理，定制模板，支付码与推广码等功能模块的开发；
  - 项目各个模块日常维护与迭代；

- 地址
  - [项目图片](https://boswellji.github.io/MyBlog/project/cloud.html)

### 供货商管理后台

- 技术栈：vue vuex vue-roter element-UI axios moment

- 职责

  - 供应商入驻流程，商品管理，维护商品上架，上下架卡券商品，等功能模块开发；
  - 项目各个模块日常维护与迭代；

- 地址
  - [项目图片](https://boswellji.github.io/MyBlog/project/pop.html)

## 2017-3~2019-3：苏州爱洛克信息技术有限公司

### 官网

> 描述：游戏平台官网，项目主要采用：

- 技术栈：jquery jquery.s2t jquery.dataTables jquery.page plupload.full swiper-3.4.2.jquery

- 职责：整体开发

- 地址
  - [项目图片](https://boswellji.github.io/MyBlog/project/iclock.html)

### 财喵

> 描述：iphone 平台上的积分墙应用，是一个混合的 app，项目主要采用：

- 技术栈：angular angular-cli rxjs clipboard.js lodash momnet mescroll.js

- 职责

  - 整体项目的结构搭建，组件拆分，公共业务组件，服务等的拆分以及开发，包括独立上线（前后端拆分方式
  - 数据接口定义，以及本地前端并行开发的接口模拟工作与后端沟通协调
  - 根据环境不同，在打包时对项目的不同配置文件区分
  - 根据业务需求封装的公共模块
    - 服务：http 请求，请求拦截，路由守护，等等，以及业务需求服务
    - 组件：弹窗，加载,公共导航等

- 地址
  - [项目图片](https://boswellji.github.io/MyBlog/project/lucky-cat.html)

### 财喵后台管理系统

> 描述：财喵的后台管理系统，项目主要采用：

- 技术栈：angular angular-cli ng-zorro-antd Ng Alain lodash rxjs momnet

- 职责

  - 整体项目的结构搭建，组件拆分，公共业务组件，服务等的拆分以及全部开发任务，包括独立上线（前后端拆分方式
  - 数据接口定义，以及本地前端并行开发的接口模拟工作与后端沟通协调
  - 根据业务需求封装的公共模块
    - 服务：http 请求，请求拦截，路由守护，等等，以及业务需求服务
    - 组件: 基于 ng-zorro-antd 组件的二次封装等，面包屑导航，弹框等等
  - 根据环境不同，在打包时对项目的不同配置文件区分

- 地址
  - [项目图片](https://boswellji.github.io/MyBlog/project/lucky-cat-admin.html)

### 客服聊天系统

> 描述：提供给公司客服部门对用户进行业务反馈，项目主要采用：

- 技术栈：vue axios pinchzoom mescroll.js qqFace.js webscoket

- 职责

  - http 数据接口定义
  - websocket 实时交互接口数据定义
  - 公共函数封装
  - 整体开发

- 地址
  - [项目图片](https://boswellji.github.io/MyBlog/project/customer.html)

### 客服聊天系统

> 描述：客服系统后台，客服管理系统，项目主要采用：

- 技术栈：jquery dot.js qqFace.js layer.js webscoket

- 职责

  - http 数据接口定义
  - websocket 实时交互接口数据定义
  - 公共函数封装
  - 整体开发

- 地址
  - [项目图片](https://boswellji.github.io/MyBlog/project/customer-admin.html)

### 各种营销页面

> 描述：pc+ moblie，项目主要采用：

- 技术栈：jquery zepto seajs requirejs vue animate.css layerjs webpack

- 职责

  - 接口定义
  - 整个专题从切图到开发，测试，上线，维护

- 地址
  - [项目图片](https://boswellji.github.io/MyBlog/project/zhuanti.html)

### 固定资产管理

> 描述：企业内部固定资产管理系统,钉钉 e 应用，项目主要采用：

- 技术栈： e 应用本身的技术框架，与组件库，api

- 职责

  - e 应用的技术调研，积累与开发
  - 项目结构的规划
  - 接口数据的定义
  - 公共方法，组件的封装
  - 项目开发，测试，上线

- 地址
  - [项目图片](https://boswellji.github.io/MyBlog/project/assets.html)

### 描述：固定资产管理

> 描述：固定资产管理后台，项目主要采用：

- 技术栈：angular angular-cli ng-zorro-antd Ng Alain lodash rxjs momnet

- 职责

  - 项目结构的规划
  - 接口数据的定义
  - 公共模块，方法，组件，服务，通道的封装等
  - 项目开发，测试，上线

- 地址
  - [项目图片](https://boswellji.github.io/MyBlog/project/assets-admin.html)

### 企业员工与学生管理系统

> 描述：客户端，钉钉微应用，项目主要采用：

- 技术栈：ionic loadsh momnet dd api animate.css

- 职责

  - 应用的结构框架搭建
  - 公共模块封装数据表格组件，日历组件（二次封装，服务，通道等等
  - 数据接口定义

### 企业员工与学生管理系统

> 描述：后台管理系统，项目主要采用：

- 技术栈：angular angular-cli datatables ngx-bootstrap loadsh momnet

- 职责

  - 应用的结构框架搭建
  - 公共模块封装数据表格组件，日历组件（二次封装，服务，通道等等
  - 数据接口定义

### 看图 app

> 描述：查看图片的 app，项目主要采用：

- 技术栈：angular angular-cli mescroll.js ng-lazyload-image ngx-infinite-scroll ngx-swiper-wrapper ngx-tabset rxjs

- 职责

  - 应用的结构框架搭建
  - 数据接口定义
  - 整体开发

- 地址
  - [项目图片](https://boswellji.github.io/MyBlog/project/meitu.html)

### 游戏管理后台

> 描述：游戏的后台管理系统，项目主要采用：

- 技术栈：angular angular-cli ng-zorro-antd Ng Alain rxjs ngrx

- 职责

  - 应用的结构框架搭建
  - 数据接口定义
  - 整体开发

- 地址
  - [项目图片](https://boswellji.github.io/MyBlog/project/game-admin.html)

## 2016-1~2017-3：同程旅行

### 实习生
