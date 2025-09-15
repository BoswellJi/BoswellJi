---
# You can also start simply with 'default'
theme: bricks
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# background: https://cover.sli.dev
# some information about your slides (markdown enabled)
title: Nuxt 全栈框架新技术调研
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: slide-left
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
background: rgba(255,255,255,1)
selectable: true
lineNumbers: true
---

<div class="text-center">

# Nuxt 全栈框架新技术调研

</div>

---
layout: center
---

# 什么是 Nuxt

 
Nuxt.js 是一个基于 <span v-mark.highlight.red="0">Vue.js 组件化开发</span> 的、<span v-mark.highlight.red="0">多渲染模式</span>的、<span v-mark.highlight.red="0">约定优于配置原则</span>的Web开发框架。


*“约定优于配置” 是一种软件设计原则，强调通过预定义的约定来简化配置过程。Nuxt.js 采用这种理念，通过约定的目录结构和文件命名，减少了开发者需要手动配置的内容。例如，页面组件放在 `pages` 目录下，路由会自动生成，无需手动配置路由文件。这种方式不仅提高了开发效率，还降低了出错的可能性。*


---

# Nuxt 项目架构图

<div class="h-[100%] overflow-scroll">

```text
┌─────────────────────────────────────────────────────────────────────┐
│                         客户端（浏览器）                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐  │
│  │  页面组件        │  │  公共组件        │  │  客户端交互逻辑      │  │
│  │  (pages/*.vue)   │  │  (components/*)  │  │  (composables/*.ts) │  │
│  └────────┬────────┘  └────────┬────────┘  └──────────┬────────────┘  │
│           │                    │                      │               │
│           ▼                    ▼                      ▼               │
│  ┌─────────────────────────────────────────────────────────────┐     │
│  │                  客户端框架核心（Vue 3 + Nuxt 运行时）        │     │
│  │  - 路由管理（自动路由 + 动态路由）                           │     │
│  │  - 水合过程（Hydration）：激活服务端渲染的 DOM 交互           │     │
│  │  - 状态管理（Pinia / useState）                             │     │
│  │  - 数据请求（useFetch / useAsyncData）                       │     │
│  └────────────────────────────────────────────────────────────┘     │
└──────────────────────────────────────────────────────────────────────┘
                             |    ▲
                             |    |
                             |    |
                             ▼    |
┌─────────────────────────────────────────────────────────────────────┐
│                         服务端（Node.js）              │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                  服务端入口（Nitro 引擎）                    │   │
│  │  - 处理请求路由分发（客户端页面 / 服务端 API）                │   │
│  │  - 渲染模式控制（SSR / SSG / CSR / 混合渲染）                │   │
│  │  - 中间件执行（服务端中间件 + 路由中间件）                   │   │
│  └────────┬──────────────────────────────┬────────────────────┘   │
│           │                              │                         │
│           ▼                              ▼                         │
│  ┌─────────────────────┐        ┌─────────────────────────────┐   │
│  │  服务端页面渲染      │        │  服务端 API / 逻辑          │   │
│  │  （SSR / SSG 核心）  │        │  （server/ 目录）           │   │
│  │  - 服务端解析 Vue 组件 │        │  ┌─────────────────────┐   │   │
│  │  - 生成完整 HTML 输出  │        │  │  API 路由           │   │   │
│  │  - 预获取页面数据      │        │  │  (server/api/*.js)   │   │   │
│  └─────────────────────┘        │  ├─────────────────────┤   │   │
│                                 │  │  服务端中间件       │   │   │
│                                 │  │  (server/middleware)│   │   │
│                                 │  ├─────────────────────┤   │   │
│                                 │  │  数据库交互         │   │   │
│                                 │  │  （Prisma / 其他ORM）│   │   │
│                                 │  └─────────────────────┘   │   │
│                                 └─────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────┐  ┌─────────────────────┐  ┌─────────────┐ │
│  │  静态资源处理        │  │  配置文件           │  │  工具函数    │ │
│  │  (public/ / assets/) │  │  (nuxt.config.ts)   │  │  (utils/*)  │ │
│  └─────────────────────┘  └─────────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────────────┘

```
</div>

---

# Nuxt 目录结构

<div class="h-[100%] overflow-scroll">

```text
your-nuxt-project/          # 项目根目录
├── .nuxt/                  # Nuxt 开发时自动生成的临时文件（构建缓存、编译产物，无需手动修改）
├── .output/                # 生产构建输出目录（SSR/混合渲染模式，包含服务端代码和客户端静态资源）
├── assets/                 # 客户端静态资源（需编译/处理）
│   ├── css/                # 全局 CSS/SCSS 样式（如 main.scss、variables.scss）
│   ├── images/             # 图片资源（如 logo.png，构建时会被优化）
│   └── fonts/              # 字体文件（如 custom-font.ttf）
├── components/             # 公共 Vue 组件（自动导入，无需手动 import）
│   ├── common/             # 通用基础组件（如 Button.vue、Input.vue）
│   ├── layout/             # 布局相关组件（如 Header.vue、Footer.vue）
│   └── [业务模块]/         # 按业务划分的组件（如 product/ProductCard.vue）
├── composables/            # 可复用的组合式函数（自动导入，前后端通用）
│   ├── useUser.ts          # 用户状态相关逻辑（如登录、权限判断）
│   ├── useRequest.ts       # 封装请求逻辑（如二次封装 useFetch）
│   └── useToast.ts         # 全局提示组件逻辑
├── content/                # Nuxt Content 模块目录（用于管理 Markdown/JSON 等内容文件，需安装 @nuxt/content）
│   ├── blog/               # 博客文章（如 2024-01-01-first-post.md）
│   └── docs/               # 文档内容（如 installation.md）
├── layouts/                # 页面布局组件（控制页面整体结构，默认使用 default.vue）
│   ├── default.vue         # 默认布局（包含 <NuxtPage /> 渲染页面内容）
│   ├── auth.vue            # 登录/注册页面布局（无 Header/Footer）
│   └── admin.vue           # 后台管理页面布局（侧边栏+主体）
├── middleware/             # 路由中间件（控制页面跳转权限，分全局/页面/组级别）
│   ├── auth.global.ts      # 全局中间件（所有页面跳转前执行，需加 .global 后缀）
│   └── admin.ts            # 页面级中间件（仅指定页面使用，如 admin 相关页面）
├── node_modules/           # 项目依赖包（npm/yarn/pnpm 安装，无需手动修改）
├── pages/                  # 页面组件目录（文件即路由，自动生成 vue-router 路由表）
│   ├── index.vue           # 首页（对应路由 /）
│   ├── about.vue           # 关于页（对应路由 /about）
│   ├── blog/               # 博客模块页面
│   │   ├── index.vue       # 博客列表页（对应路由 /blog）
│   │   └── [slug].vue      # 博客详情页（动态路由，对应 /blog/xxx）
│   ├── admin/              # 后台管理页面
│   │   ├── index.vue       # 后台首页（/admin）
│   │   └── products/       # 商品管理页面
│   │       ├── index.vue   # 商品列表（/admin/products）
│   │       └── [id].vue    # 商品编辑页（/admin/products/123）
│   └── api/                # 客户端 API 路由（仅 Nuxt 2，Nuxt 3 移至 server/api）
├── public/                 # 静态资源根目录（无需编译，直接复制到输出目录）
│   ├── favicon.ico         # 网站图标
│   ├── robots.txt          # 搜索引擎爬虫规则
│   └── images/             # 无需优化的图片（如二维码、图标）
├── server/                 # Nuxt 3 服务端目录（存放服务端逻辑，仅在服务端运行）
│   ├── api/                # 服务端 API 路由（文件即接口，对应 /api/xxx）
│   │   ├── user.ts         # 用户相关接口（/api/user，支持 GET/POST）
│   │   └── products/       # 商品接口（/api/products）
│   ├── middleware/         # 服务端中间件（所有服务端请求前执行，如权限校验、日志）
│   │   └── auth.ts         # 服务端权限中间件（验证 Token 等）
│   ├── routes/             # 服务端自定义路由（补充 API 路由，支持更复杂的路由规则）
│   └── utils/              # 服务端工具函数（如数据库连接、敏感数据加密）
├── stores/                 # Pinia 状态管理目录（Nuxt 3 官方推荐，替代 Vuex）
│   ├── user.ts             # 用户状态 store（useUserStore）
│   └── cart.ts             # 购物车状态 store（useCartStore）
├── types/                  # TypeScript 类型定义目录（全局类型、接口声明）
│   ├── user.ts             # 用户相关类型（如 User、LoginParams）
│   └── product.ts          # 商品相关类型（如 Product、ProductListRes）
├── utils/                  # 通用工具函数（前后端通用，如格式化时间、数据验证）
│   ├── format.ts           # 格式化工具（如 formatDate、formatPrice）
│   └── validate.ts         # 验证工具（如 validateEmail、validatePhone）
├── .env                    # 环境变量文件（本地开发用，不提交到 Git）
├── .env.production         # 生产环境变量文件（构建时生效）
├── .eslintrc.js            # ESLint 配置文件（代码规范检查）
├── .gitignore              # Git 忽略文件配置（如 node_modules、.nuxt、.env）
├── nuxt.config.ts          # Nuxt 项目核心配置文件（渲染模式、模块、路由等）
├── package.json            # 项目依赖配置（脚本、依赖包版本）
├── pnpm-lock.yaml          # 依赖锁文件（pnpm 专用，确保依赖版本一致）
├── README.md               # 项目说明文档（安装、运行、部署步骤）
└── tsconfig.json           # TypeScript 配置文件（类型检查、编译选项）
```
</div>

---

# Nuxt 核心价值

## Nuxt 提供多种渲染模式

- 服务端渲染（SSR）：
  - 每次请求时，服务端动态生成 HTML 并返回，SEO 友好、首屏加载快。

- 静态站点生成（SSG）：
  - 构建时预先生成所有页面的静态 HTML，部署后直接返回，极致加载速度。

- 混合渲染（Nuxt 3 新增）：
  - 同一项目中，部分页面用 SSR（如用户中心），部分用 SSG（如首页），按需选择最优模式。

- 客户端渲染（CSR）：
  - 兼容传统 SPA 模式，适合纯交互型应用，像后台管理系统。

---

# 工程化增强

- 自动导入：组件（components 目录）、工具函数（composables 目录）无需 import 即可直接使用。

- 代码分割：自动按页面分割 JS 包，减少首次加载体积。

- CSS 支持：内置 SCSS、PostCSS，支持全局样式（assets/css）和组件样式隔离（scoped）。

- TypeScript 友好：默认支持 TS，类型提示完善。

- 热重载：开发时修改文件，浏览器，服务器自动刷新，提升开发效率。



---
layout: center
---

[Presentation Slides for Developers](https://sli.dev)