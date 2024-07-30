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

0. 精通 `javascript`,`vue2.x/3.x`；
1. 熟练 `typescript`,`html`,`css`,`vue router`,`pinia`,`vuex`,`elementui/elementplus`,`wx mini program`,`uniapp`,`less`,`tailwindcss`,`git`等；
2. 掌握 `vite`,`webpack`,`http`等；
3. 熟悉 `frontend engineering`,`nodejs`,`design pattern`,`algorithm`,`data structure`等；
4. 了解 `react`,`angular`,`canvas`,`webgl`等；

## 2022-6~至今：同程旅行

### 旅仓PC

> 描述：公司全品类产品，包括旅游，出行，住宿等对外分销业务平台PC端。

- 职责

整个网站的前端架构设计与实现，也是对老网站的一次重构，老网站基于Asp.Net的服务器端渲染的多页架构网站：

- 实现了基于Typescript,Vue3,TailWindCss,Vite的多页架构。
- 实现了多页的页面地址重写能力用于在开发环境页面符合老项目的跳转规则。
- 实现了前后端联调通讯的Http代理服务，解决老项目迁移中的接口代理问题。
- 实现了编写vite插件将产物构建到老项目的自动化流程。
- 实现了预发分支合并到开发分支的危险行为检测并回退。
- 核心业务详情页到下单支付的所有开发。

- 总结：[旅仓PC前端项目复盘](https://boswellji.github.io/MyBlog/ppt/旅仓PC前端架构设计与实现.html)

### 旅仓H5

> 描述：公司全品类产品，包括旅游，出行，住宿等对外分销业务平台移动端，支持嵌入第三方webview中。

- 职责

整个网站的前端架构设计与实现，页面UI复用的其他项目代码，原项目为基于传统script引入的，服务器端渲染的，多页架构网站。所以为了能够极大的复用原项目的代码能力，做了此次设计与开发：

- 实现了基于Typescript,Vue2.7,Less,Vite的多页架构。
- 实现了项目中兼容Commonjs与ESM模块之间的交互。
- 实现了项目对于不支持原生ESM，原生ESM动态导入和 import.meta的浏览器的兼容。
- 核心业务详情页到下单支付的所有重构开发。
- 通过封装入口来所有页面初始化流程。包括处理url中的参数，用户信息获取，等公共逻辑抽象。
- 定义第三方接入方传入的字段规则。

### 旅仓小程序

> 描述：公司全品类产品，包括旅游，出行，住宿等对外分销业务平台小程序端，整个小程序的所有业务线都通过H5端来提供业务支持。

- 职责

整个应用的开发与维护：

- 通过缓存编译产物，优化了基于gulp的构建系统开发时的编译性能优化。
- 通过接入旅仓H5来复用整个项目的详情到下单支付流程能力。
- 定义小程序与H5交互的字段规则。
- 维护海报分享模块。

### 旅仓CRM

> 描述：公司全品类产品，包括旅游，出行，住宿等对外分销业务平台的后台管理系统。

- 职责

整个应用的前端架构设计与实现：

- 实现了基于Typescript,Vue3.x,element-plus,Vue-Router,Pinia,Sass,Vite的单页架构。
- 实现了基于RBAC的权限控制，路由，按钮级别控制。
- 实现了Layout的可扩展性。
- 实现了基于css变量的主题切换。
- 封装公共组件，公共工具，Hooks等。
- 核心的订单详情页的开发。

### 其他

> 做过面试官，包括社招以及校招；带过几个实习生，带领实习生了解整个研发的工作流，以及基本的任务模块拆分讲解，审核他们的代码等，带领他们做任务。

## 2021-8~2022-6：研途教育科技

### 学生专属择校报告生成工具

> 描述：预定义多个配置组件，通过拖拽的方式放置到报告页面中进行配置，然后生成pdf报告，项目主要采用：

- 技术栈

  - vue2.x
  - vuex
  - vue-router
  - element-ui
  - axios
  - lodash
  - vuedraggable
  - echarts
  - less

- 职责

  - 实现了`pdf`生成需要用到的全部配置组件；
  - 实现了基于`vuedraggable`组件的拖拽系统；
  - 实现了根据配置报告中的组件是否存在自动生成目录；
  - 实现了编辑完成后的实时草稿存储；
  - 实现了将canva转文件进行上传获取图片url后上传报告；
  - 实现了后端生成pdf的模板html,通过`css`的`@page`特性给打印的文档配置样式；

- 地址
  - [项目](https://boswellji.github.io/MyBlog/project/student-report.html)

### 模拟考试

> 描述：这是一个hybrid app,提供给学生用来模拟考试,有多门课程的试卷，项目主要采用：

- 技术栈

  - vue2.x
  - vuex
  - vue-router
  - vant
  - axios
  - lodash
  - moment
  - compressorjs
  - qs
  - less

- 职责

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
  - [项目](https://boswellji.github.io/MyBlog/project/mock-exam.html)

### 订单退费审核流程

> 描述：多级退款审批流程，项目主要采用：

- 技术栈

  - vue2.x
  - vuex
  - vue-router
  - vant
  - axios
  - lodash
  - moment

- 职责

  - 实现了多级审批人配置以及最大审批人限制；
  - 实现了对数据格式整理，符合树组件传值方式，以及初始化时针对选中元素在渲染vnode时对样式改写；
  - 实现了数据驱动的动态表单，增加了程序的扩展性；

- 地址
  - [项目](https://boswellji.github.io/MyBlog/project/order-refund.html)


## 2019-3~2021-8：智能晴雨

### 咪店优选小程序

- 技术栈

  - uniapp
  - vuex
  - uniapp ui
  - vue
  - vue-router

- 职责

  - 实现了分享海报，购物车，商户上货/下架，优惠支付，商户裂变，卡券核销，会员卡任务，商品分享大厅等多个功能模块；
  - 实现了各种会场专题等业务；
  - 实现了图片下载，地理位置获取，微信支付等核心mixins；
  - 实现了canvas 2d海报工具函数开发；

- 地址
  - [项目](https://github.com/BoswellJi/BoswellJi/tree/master/blog-source-code/doc/project/mishop.md)

### 神奇会员小程序

- 技术栈

  - uniapp
  - vuex
  - uniapp ui
  - vue
  - vue-router

- 职责

  - 实现了线下支付流程，商户详情页交互，商户及用户提现，多入口聚合数据列表，商品详情到下单全流程等功能模块的开发；
  - 实现了自定义价格输入的键盘；
  - 实现了整体项目的接口重构；
  - 实现了项目各个模块日常维护与迭代；
  - 实现了图片下载，地理位置获取，微信支付等核心mixin编写；
  - 实现了canvas 2d海报工具函数开发；
  - 实现了根据日期分页导致列表一屏不够递归继续加载到满足条件的功能；

- 地址
  - [项目](https://github.com/BoswellJi/BoswellJi/blob/master/blog-source-code/doc/project/discount.md)

### 喵客云管理后台

- 技术栈

  - vue
  - vuex
  - vue-roter
  - element UI
  - axios
  - moment

- 职责

  - 多类型素材分享管理，定制模板，支付码与推广码等功能模块的开发；
  - 项目各个模块日常维护与迭代；

- 地址
  - [项目](https://github.com/BoswellJi/BoswellJi/tree/master/blog-source-code/doc/project/cloud.md)

### 供货商管理后台

- 技术栈

  - vue
  - vuex
  - vue-roter
  - element UI
  - axios
  - moment

- 职责

  - 供应商入驻流程，商品管理，维护商品上架，上下架卡券商品，等功能模块开发；
  - 项目各个模块日常维护与迭代；

- 地址
  - [项目](https://github.com/BoswellJi/BoswellJi/tree/master/blog-source-code/doc/project/pop.md)

## 2017-3~2019-3：苏州爱洛克信息技术有限公司

### 官网

> 描述：游戏平台官网，项目主要采用：

- 技术栈

  - jquery
  - jquery.s2t
  - jquery.dataTables
  - jquery.page
  - plupload.full
  - swiper-3.4.2.jquery

- 职责

  - 整体开发

- 地址
  - [图片](https://github.com/BoswellJi/BoswellJi/tree/master/blog-source-code/doc/project/iclock.md)

### 财喵

> 描述：iphone 平台上的积分墙应用，是一个混合的 app，项目主要采用：

- 技术栈

  - angular
  - angular-cli
  - rxjs
  - clipboard.js
  - lodash
  - momnet
  - mescroll.js

- 职责

  - 整体项目的结构搭建，组件拆分，公共业务组件，服务等的拆分以及开发，包括独立上线（前后端拆分方式
  - 数据接口定义，以及本地前端并行开发的接口模拟工作与后端沟通协调
  - 根据环境不同，在打包时对项目的不同配置文件区分
  - 根据业务需求封装的公共模块
    - 服务：http 请求，请求拦截，路由守护，等等，以及业务需求服务
    - 组件：弹窗，加载,公共导航等

- 地址
  - [图片](https://github.com/BoswellJi/BoswellJi/tree/master/blog-source-code/doc/project/lucky-cat.md)

### 财喵后台管理系统

> 描述：财喵的后台管理系统，项目主要采用：

- 技术栈

  - angular
  - angular-cli
  - ng-zorro-antd
  - Ng Alain
  - lodash
  - rxjs
  - momnet

- 职责

  - 整体项目的结构搭建，组件拆分，公共业务组件，服务等的拆分以及全部开发任务，包括独立上线（前后端拆分方式
  - 数据接口定义，以及本地前端并行开发的接口模拟工作与后端沟通协调
  - 根据业务需求封装的公共模块
    - 服务：http 请求，请求拦截，路由守护，等等，以及业务需求服务
    - 组件: 基于 ng-zorro-antd 组件的二次封装等，面包屑导航，弹框等等
  - 根据环境不同，在打包时对项目的不同配置文件区分

- 地址
  - [图片](https://github.com/BoswellJi/BoswellJi/tree/master/blog-source-code/doc/project/lucky-cat-admin.md)

### 客服聊天系统

> 描述：提供给公司客服部门对用户进行业务反馈，项目主要采用：

- 技术栈

  - vue
  - axios
  - pinchzoom （图片预览
  - mescroll.js （滚动加载
  - qqFace.js （表情包
  - webscoket

- 职责

  - http 数据接口定义
  - websocket 实时交互接口数据定义
  - 公共函数封装
  - 整体开发

- 地址
  - [图片](https://github.com/BoswellJi/BoswellJi/tree/master/blog-source-code/doc/project/customer.md)

### 客服聊天系统

> 描述：客服系统后台，客服管理系统，项目主要采用：

- 技术栈

  - jquery
  - dot.js
  - qqFace.js （表情包
  - layer.js （弹框
  - webscoket

- 职责

  - http 数据接口定义
  - websocket 实时交互接口数据定义
  - 公共函数封装
  - 整体开发

- 地址
  - [图片](https://github.com/BoswellJi/BoswellJi/tree/master/blog-source-code/doc/project/customer-admin.md)

### 各种营销页面

> 描述：pc+ moblie，项目主要采用：

- 库技术栈

  - jquery
  - zepto
  - seajs
  - requirejs
  - vue
  - animate.css
  - layerjs
  - 各种组件，插件（例如：轮播，转盘抽奖，九宫格,分页 等等
  - webpack

- 职责

  - 接口定义
  - 整个专题从切图到开发，测试，上线，维护

- 地址
  - [图片](https://github.com/BoswellJi/BoswellJi/tree/master/blog-source-code/doc/project/zhuanti.md)

### 固定资产管理

> 描述：企业内部固定资产管理系统,钉钉 e 应用，项目主要采用：

- e 应用本身的技术框架，与组件库
- api

- 职责

  - e 应用的技术调研，积累与开发
  - 项目结构的规划
  - 接口数据的定义
  - 公共方法，组件的封装
  - 项目开发，测试，上线

- 地址
  - [图片](https://github.com/BoswellJi/BoswellJi/tree/master/blog-source-code/doc/project/assets.md)

### 描述：固定资产管理

> 描述：固定资产管理后台，项目主要采用：

- 技术栈

  - angular
  - angular-cli
  - ng-zorro-antd
  - Ng Alain
  - lodash
  - rxjs
  - momnet

- 职责

  - 项目结构的规划
  - 接口数据的定义
  - 公共模块，方法，组件，服务，通道的封装等
  - 项目开发，测试，上线

- 地址
  - [项目](https://github.com/BoswellJi/BoswellJi/tree/master/blog-source-code/doc/project/assets-admin.md)

### 企业员工与学生管理系统

> 描述：客户端，钉钉微应用，项目主要采用：

- 技术栈

  - ionic
  - loadsh
  - momnet
  - dd api
  - animate.css

- 职责

  - 应用的结构框架搭建
  - 公共模块封装数据表格组件，日历组件（二次封装，服务，通道等等
  - 数据接口定义

### 企业员工与学生管理系统

> 描述：后台管理系统，项目主要采用：

- 技术栈

  - angular
  - angular-cli
  - datatables
  - ngx-bootstrap
  - loadsh
  - momnet

- 职责

  - 应用的结构框架搭建
  - 公共模块封装数据表格组件，日历组件（二次封装，服务，通道等等
  - 数据接口定义

### 看图 app

> 描述：查看图片的 app，项目主要采用：

- 技术栈

  - angular
  - angular-cli
  - mescroll.js
  - ng-lazyload-image
  - ngx-infinite-scroll
  - ngx-swiper-wrapper
  - ngx-tabset
  - rxjs

- 职责

  - 应用的结构框架搭建
  - 数据接口定义
  - 整体开发

- 地址
  - [项目](https://github.com/BoswellJi/BoswellJi/tree/master/blog-source-code/doc/project/meitu.md)

### 游戏管理后台

> 描述：游戏的后台管理系统，项目主要采用：

- 技术栈

  - angular
  - angular-cli
  - ng-zorro-antd
  - Ng Alain
  - rxjs
  - ngrx

- 职责

  - 应用的结构框架搭建
  - 数据接口定义
  - 整体开发

- 地址
  - [项目](https://github.com/BoswellJi/BoswellJi/tree/master/blog-source-code/doc/project/game-admin.md)

## 2016-1~2017-3：同程旅行

### 实习生
