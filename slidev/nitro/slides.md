---
theme: mokkapps
title: Nitro
logo: https://nitro.unjs.io/icon.png
transition: fade
background: https://source.unsplash.com/collection/94734566/1920x1080
mdc: true
selectable: true
colorSchema: light
fonts:
  sans: 'Inter'
  serif: 'Noto Serif'
  mono: 'Fira Code'
---

# Nitro

---

# 什么是 Nitro？

<div class="grid grid-cols-3 gap-6 mt-8">
  <div class="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
    <div class="text-3xl mb-4 text-blue-600">📦</div>
    <div class="text-xl font-bold mb-3 text-black-600">下一代服务端工具包</div>
  </div>

  <div class="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
    <div class="text-3xl mb-4 text-green-600">⚡</div>
    <div class="text-xl font-bold mb-3 text-black-600">服务端引擎</div>
  </div>

  <div class="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
    <div class="text-3xl mb-4 text-purple-600">🚀</div>
    <div class="text-xl font-bold mb-3 text-black-600">服务端框架</div>
  </div>
</div>

---

# 下一代服务端工具包

<div class="grid grid-cols-3 gap-6 mt-8">
  <div class="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
    <div class="text-3xl mb-4 text-blue-600">📦</div>
    <div class="text-xl font-bold mb-3 text-black-600">下一代</div>
    <p class="text-gray-600 text-sm space-y-2">
     在软件工程和开源社区的语境中，当一个工具标榜自己是“下一代（Next-Generation）”时，通常意味着它不是对上一代工具的简单修补，而是从<span v-mark.highlight.yellow="1">底层架构和设计哲学上</span>进行了彻底的范式重构。
    <div v-click="2">1. 运行时的“解耦”</div>
    <div v-click="3">2. 产物形态的重构</div>
    <div v-click="4">3. 开发体验的进化</div>
    <div v-click="5">4. 架构哲学的转变</div>
    </p>
   
  </div>

  <div class="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
    <div class="text-3xl mb-4 text-green-600">⚡</div>
    <div class="text-xl font-bold mb-3 text-black-600">服务器</div>
    <p class="text-gray-600 text-sm space-y-2">
      基于js/ts的服务端运行时  
    </p>
  </div>

  <div class="bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500">
    <div class="text-3xl mb-4 text-purple-600">🚀</div>
    <div class="text-xl font-bold mb-3 text-black-600">工具包</div>
    <p class="text-gray-600 text-sm space-y-2">
      创建你所需一切功能的 Web 服务器，并部署到你喜欢的任何地方
      <div v-click="6">1. 存储</div>
      <div v-click="7">2. 缓存</div>
      <div v-click="8">3. 数据库</div>
      <div v-click="9">4. 后台任务</div>
      <div v-click="10">5.WebSocket</div>
      <div v-click="11">6. Server Send Events</div>
      <div v-click="12">7. 静态文件服务</div>
    </p>
  </div>
</div>

---

# 服务端引擎

<div class="grid grid-cols-2 gap-6 mt-8">
  <div class="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
    <div class="text-xl font-bold mb-3 text-black-600">定位</div>
    <p class="text-gray-600 text-sm space-y-2">
     Nitro 将自己定位为“引擎”。它既可以作为 Nuxt 等全栈元框架的底层动力，也可以被其他新兴框架（如 AnalogJS、SolidStart）直接复用，且它拥抱开放的 Web 标准（如 Request/Response API）。
    </p>
  </div>
  <div class="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
    <div class="text-xl font-bold mb-3 text-black-600">引擎</div>
    <p class="text-gray-600 text-sm space-y-2">
     指在服务器上运行的核心软件组件或程序，用于接收、处理和响应来自客户端的网络请求。
      <div v-click="1" class="mt-[20px]" v-mark.highlight.yellow="1">
       <span v-mark.highlight.yellow="1">1. “动力”（处理请求与渲染）</span>
      </div>
      <div v-click="2" class="mt-[20px]" v-mark.highlight.yellow="2">
       <span v-mark.highlight.yellow="2">2. “通用基础设施”（解耦与复用）</span>
      </div>
      <div v-click="3" class="mt-[20px]" v-mark.highlight.yellow="3">
       <span v-mark.highlight.yellow="3">3. “内部组件”（开箱即用的后端能力）</span>
      </div>
      <div v-click="4" class="mt-[20px]" v-mark.highlight.yellow="4">
       <span v-mark.highlight.yellow="4">4. “环境适应性”（跨平台部署）</span>
      </div>
    </p>
  </div>
</div>

---

# 服务端框架

<div class="grid grid-cols-2 gap-6 mt-8">
  <div class="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
    <div class="text-xl font-bold mb-3 text-black-600">框架</div>
    <p class="text-gray-600 text-sm space-y-2">
     当 Nitro 被单独使用时，它完全具备一个独立后端框架的特征。它提供了完整的生命周期管理、基于文件系统的约定式路由（File-system routing）、中间件机制以及请求处理规范.
    </p>
  </div>
  <div class="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-500">
    <div class="text-xl font-bold mb-3 text-black-600">开发范式</div>
    <p class="text-gray-600 text-sm space-y-2">
     彻底颠覆了传统 Node.js 后端（如 Express、Koa）那种需要手动注册路由、编写大量样板代码的集中式开发模式，转而采用了一种更贴近现代前端开发者习惯的范式
     <div v-click="1" class="mt-[20px]" v-mark.highlight.yellow="1">
      <span v-mark.highlight.yellow="1">1. 基于文件系统的路由</span>
     </div>
     <div v-click="2" class="mt-[20px]" v-mark.highlight.yellow="2">
      <span v-mark.highlight.yellow="2">2. 拥抱原生 Web 标准</span>
     </div>
     <div v-click="3" class="mt-[20px]" v-mark.highlight.yellow="3">
      <span v-mark.highlight.yellow="3">3. 函数组合式的编程模型</span>
     </div>
     <div v-click="4" class="mt-[20px]" v-mark.highlight.yellow="4">
      <span v-mark.highlight.yellow="4">4. 自动化与零样板代码</span>
     </div>
    </p>
  </div>
</div>

---

<div class="bg-white rounded-xl shadow-lg p-8 mt-6">
  <div class="text-xl font-bold mb-4 text-gray-800">📁 项目结构概览</div>
  <img src="./image-1.png" class="rounded-lg shadow-md mx-auto" style="max-height: 60vh;" />
  <div class="text-sm text-gray-500 mt-4 text-center">
    约定式目录结构，降低认知成本
  </div>
</div>

---
layout: cover
---

# Nitro 特性

---
layout: quote
---

# Server Utils


Nitro基于组合式编程思想，提供了一系列的工具类函数，帮助开发者快速处理服务端逻辑。


---

# Server Utils

<div class="grid grid-cols-3 gap-6 mt-8">
  <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md p-6">
    <div class="text-3xl mb-4 text-blue-600">⚡</div>
    <h3 class="text-xl font-bold mb-3 text-gray-800">H3 Utils</h3>
    <p class="text-sm text-gray-600">自动导入的核心工具函数，无需手动导入</p>
  </div>

  <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md p-6">
    <div class="text-3xl mb-4 text-green-600">🚀</div>
    <h3 class="text-xl font-bold mb-3 text-gray-800">Nitro Utils</h3>
    <p class="text-sm text-gray-600">Nitro 特有的内置工具函数</p>
  </div>

  <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md p-6">
    <div class="text-3xl mb-4 text-purple-600">📂</div>
    <h3 class="text-xl font-bold mb-3 text-gray-800">Utils 目录</h3>
    <p class="text-sm text-gray-600">应用程序特定的工具函数，自动导入</p>
  </div>
</div>

---

<div class="bg-white rounded-xl shadow-lg p-8 mt-6">
  <div class="flex items-center mb-6">
    <div class="text-3xl mr-4 text-blue-600">⚡</div>
    <h3 class="text-2xl font-bold text-gray-800">自动导入的核心工具函数</h3>
  </div>

  <p class="text-gray-600 mb-6">Nitro 使所有 H3 utils 自动可用，无需手动导入</p>

  <div class="grid grid-cols-2 gap-4">
    <div class="bg-blue-50 rounded-lg p-4">
      <div class="font-mono text-sm text-blue-800">defineEventHandler</div>
      <p class="text-xs text-gray-600 mt-1">定义事件处理程序，处理 HTTP 请求</p>
    </div>
    <div class="bg-blue-50 rounded-lg p-4">
      <div class="font-mono text-sm text-blue-800">readBody</div>
      <p class="text-xs text-gray-600 mt-1">读取请求体数据</p>
    </div>
    <div class="bg-blue-50 rounded-lg p-4">
      <div class="font-mono text-sm text-blue-800">getQuery</div>
      <p class="text-xs text-gray-600 mt-1">获取 URL 查询参数</p>
    </div>
    <div class="bg-blue-50 rounded-lg p-4">
      <div class="font-mono text-sm text-blue-800">getRouterParam</div>
      <p class="text-xs text-gray-600 mt-1">获取路由参数</p>
    </div>
    <div class="bg-blue-50 rounded-lg p-4">
      <div class="font-mono text-sm text-blue-800">getRequestHeader</div>
      <p class="text-xs text-gray-600 mt-1">获取请求头</p>
    </div>
    <div class="bg-blue-50 rounded-lg p-4">
      <div class="font-mono text-sm text-blue-800">send</div>
      <p class="text-xs text-gray-600 mt-1">发送响应</p>
    </div>
  </div>

  <div class="mt-6 text-sm text-gray-500">
    ✨ <strong>自动导入</strong> - 无需手动导入即可使用
  </div>
</div>

---

<div class="bg-white rounded-xl shadow-lg p-8 mt-6">
  <div class="flex items-center mb-6">
    <div class="text-3xl mr-4 text-green-600">🚀</div>
    <h3 class="text-2xl font-bold text-gray-800">Nitro 特有的内置工具函数</h3>
  </div>

  <p class="text-gray-600 mb-6">Nitro 提供了一系列特有的工具函数，帮助您构建更强大的应用程序</p>

  <div class="grid grid-cols-2 gap-4">
    <div class="bg-green-50 rounded-lg p-4">
      <div class="font-mono text-sm text-green-800">useStorage</div>
      <p class="text-xs text-gray-600 mt-1">访问存储系统</p>
    </div>
    <div class="bg-green-50 rounded-lg p-4">
      <div class="font-mono text-sm text-green-800">useRuntimeConfig</div>
      <p class="text-xs text-gray-600 mt-1">访问运行时配置</p>
    </div>
    <div class="bg-green-50 rounded-lg p-4">
      <div class="font-mono text-sm text-green-800">useAppConfig</div>
      <p class="text-xs text-gray-600 mt-1">访问应用程序配置</p>
    </div>
    <div class="bg-green-50 rounded-lg p-4">
      <div class="font-mono text-sm text-green-800">useNitroApp</div>
      <p class="text-xs text-gray-600 mt-1">访问 Nitro 应用实例</p>
    </div>
    <div class="bg-green-50 rounded-lg p-4">
      <div class="font-mono text-sm text-green-800">useLogger</div>
      <p class="text-xs text-gray-600 mt-1">访问日志系统</p>
    </div>
    <div class="bg-green-50 rounded-lg p-4">
      <div class="font-mono text-sm text-green-800">useCookies</div>
      <p class="text-xs text-gray-600 mt-1">处理 Cookie</p>
    </div>
  </div>

  <div class="mt-6 text-sm text-gray-500">
    📚 更多工具函数请参考 <a href="https://nitro.unjs.io" class="text-green-600 underline">官方文档</a>
  </div>
</div>

---

<div class="bg-white rounded-xl shadow-lg p-8 mt-6">
  <div class="flex items-center mb-6">
    <div class="text-3xl mr-4 text-purple-600">📂</div>
    <h3 class="text-2xl font-bold text-gray-800">应用程序特定的工具函数</h3>
  </div>

  <p class="text-gray-600 mb-6">您可以在 server/utils/ 目录中添加应用程序特定的 utils，它们将在使用时自动导入</p>

  <div class="grid grid-cols-1 gap-4 mb-6">
    <div class="bg-purple-50 rounded-lg p-4">
      <div class="font-mono text-sm text-purple-800">server/utils/</div>
      <p class="text-xs text-gray-600 mt-1">放置应用程序特定的工具函数</p>
    </div>
    <div class="bg-purple-50 rounded-lg p-4">
      <div class="font-mono text-sm text-purple-800">server/utils/auth.ts</div>
      <p class="text-xs text-gray-600 mt-1">身份验证相关工具函数</p>
    </div>
    <div class="bg-purple-50 rounded-lg p-4">
      <div class="font-mono text-sm text-purple-800">server/utils/validation.ts</div>
      <p class="text-xs text-gray-600 mt-1">数据验证相关工具函数</p>
    </div>
  </div>

  <div class="bg-blue-50 rounded-lg p-6">
    <div class="font-bold text-gray-800 mb-2">使用示例</div>
    <div class="font-mono text-sm text-gray-700">
      // 无需导入，直接使用
      const user = await auth.validateToken(token)
      const errors = validation.validateUser(data)
    </div>
  </div>

  <div class="mt-6 text-sm text-gray-500">
    ✨ <strong>自动导入</strong> - 放置在 server/utils/ 目录中的函数会自动可用
  </div>
</div>

---
layout: quote
---

# Task


一种专门用于处理<span v-mark.highlight.yellow="1">后台异步操作的机制</span>，Task 通常用于执行耗时较长、不需要阻塞等待用户请求的后台工作。例如：数据同步、定时清理、生成报表或发送批量邮件等

---

# 实验性功能

<div class="bg-white rounded-xl shadow-lg p-8 mt-6">


  <img src="./image-2.png" class="rounded-lg shadow-md mx-auto" style="max-height: 50vh;" />
  
  <div class="mt-6 text-sm text-gray-500 text-center">
    ⚠️ 实验性功能可能会发生变化，请谨慎在生产环境中使用
  </div>
</div>

---

<div class="bg-white rounded-xl shadow-lg p-8 mt-6">
  <div class="text-center mb-8">
    <div class="text-4xl mb-4 text-blue-600">⚙️</div>
    <h3 class="text-2xl font-bold text-gray-800">运行时任务管理</h3>
    <p class="text-gray-600 mt-2">Nitro 任务允许在运行时进行开关操作</p>
  </div>

  <div class="grid grid-cols-2 gap-6">
    <div class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
      <div class="font-bold text-gray-800 mb-2">任务定义</div>
      <p class="text-sm text-gray-600">在 server/tasks/ 目录中定义任务</p>
    </div>
    <div class="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
      <div class="font-bold text-gray-800 mb-2">任务调度</div>
      <p class="text-sm text-gray-600">使用 cron 表达式或手动触发任务</p>
    </div>
   
  </div>

  <div class="mt-6 text-sm text-gray-500 text-center">
    🚀 任务系统为您的应用程序提供了强大的后台处理能力
  </div>
</div>

---

# 任务定义

<div class="grid grid-cols-1 gap-6">
  <div class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
    <div class="font-bold text-gray-800 mb-2">约定</div>
    <p class="text-sm text-gray-600">在 server/tasks/ 目录中定义任务</p>
  </div>
  <div class="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
    <div class="font-bold text-gray-800 mb-2">定义</div>
   <pre>
    export default defineTask({
      meta: {
        name: "db:migrate",
        description: "Run database migrations",
      },
      run({ payload, context }) {
        console.log("Running DB migration task...");
        return { result: "Success" };
      },
    })
    </pre>
  </div>
</div>


---

# 任务调度1

<div class="grid grid-cols-1 gap-6 mr-6">
  <div class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
    <div class="font-bold text-gray-800 mb-2">定时执行</div>
    <pre>
    export default defineNitroConfig({
      scheduledTasks: {
        // Run `cms:update` task every minute
        '* * * * *': ['cms:update']
      }
    })
    </pre>
  </div>
</div>

---

# 任务调度2

<div class="grid grid-cols-1 gap-6 mr-6">
  <div class="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
    <div class="font-bold text-gray-800 mb-2">手动执行</div>
    <pre>
      export default eventHandler(async (event) => {
        // IMPORTANT: Authenticate user and validate payload!
        const payload = { ...getQuery(event) };
        const { result } = await runTask("db:migrate", { payload });

        return { result };
      });
  </pre>
  </div>
</div>

---
layout: quote
---

# Server Routes

Nitro支持文件系统路由，自动将文件映射到h3路由。


---

# 约定

<div class="bg-white rounded-xl shadow-lg p-8 mt-6">
  <div class="text-center mb-8">
    <div class="text-4xl mb-4 text-green-600">🌐</div>
    <h3 class="text-2xl font-bold text-gray-800">文件系统路由</h3>
  </div>

  <div class="grid grid-cols-2 gap-6">
    <div class="bg-green-50 rounded-lg p-4">
      <div class="font-bold text-gray-800 mb-2">server/api/</div>
      <p class="text-sm text-gray-600">API 路由，自动映射到 /api/*</p>
    </div>
    <div class="bg-green-50 rounded-lg p-4">
      <div class="font-bold text-gray-800 mb-2">server/routes/</div>
      <p class="text-sm text-gray-600">页面路由，自动映射到 /*</p>
    </div>
    <div class="bg-blue-50 rounded-lg p-4">
      <div class="font-bold text-gray-800 mb-2">动态路由</div>
      <p class="text-sm text-gray-600">使用 [param] 定义动态路由参数</p>
    </div>
    <div class="bg-blue-50 rounded-lg p-4">
      <div class="font-bold text-gray-800 mb-2">通配符路由</div>
      <p class="text-sm text-gray-600">使用 [...slug] 定义通配符路由</p>
    </div>
  </div>

  <div class="mt-6 text-sm text-gray-500 text-center">
    📁 约定式目录结构，降低认知成本
  </div>
</div>

---

# 事件处理器

<div class="bg-white rounded-xl shadow-lg p-8 mt-6">
  <div class="flex items-center mb-6">
    <div class="text-3xl mr-4 text-blue-600">⚡</div>
    <h3 class="text-2xl font-bold text-gray-800">处理 HTTP 请求的核心</h3>
  </div>

  <p class="text-gray-600 mb-6">事件处理程序是一个函数，它将被绑定到路由上，并在路由器为传入请求匹配路由时执行</p>

  <div class="bg-gray-50 rounded-lg p-6 border border-gray-200">
    <div class="font-bold text-gray-800 mb-2">基本示例</div>
    <div class="font-mono text-sm text-gray-700" >
      export default defineEventHandler(() => {
        return { hello: 'API' }
      })
    </div>
  </div>

  <div class="mt-6 grid grid-cols-2 gap-4">
    <div class="bg-blue-50 rounded-lg p-4">
      <div class="font-bold text-gray-800 mb-2">接收请求</div>
      <p class="text-sm text-gray-600">获取查询参数、请求体、路由参数等</p>
    </div>
    <div class="bg-green-50 rounded-lg p-4">
      <div class="font-bold text-gray-800 mb-2">发送响应</div>
      <p class="text-sm text-gray-600">返回 JSON、HTML、文件等</p>
    </div>
  </div>
</div>

---

# Routes 目录

<div class="bg-white rounded-xl shadow-lg ">
  <div class="grid grid-cols-1 gap-6">
    <div class="bg-gray-50 rounded-lg  border border-gray-200">
      <div class="font-bold text-gray-800 mb-2">Routes 路由示例</div>
      <pre>
        // routes/hello.ts
        export default defineEventHandler((event) => {
          const name = getQuery(event).name || 'World'
          return {
            message: `Hello ${name}!`,
            timestamp: new Date().toISOString()
          }
        })
      </pre>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-blue-50 rounded-lg ">
        <div class="font-bold text-gray-800 mb-2">访问方式</div>
        <div class="font-mono text-sm text-blue-800">GET /hello?name=Nitro</div>
      </div>
      <div class="bg-green-50 rounded-lg ">
        <div class="font-bold text-gray-800 mb-2">返回结果</div>
        <div class="font-mono text-sm text-green-800">
          {
            "message": "Hello Nitro!",
            "timestamp": "2024-01-01T12:00:00.000Z"
          }
        </div>
      </div>
    </div>
  </div>

  <div class="mt-6 text-sm text-gray-500">
    📁 Route 路由文件放置在 server/routes/ 目录中，自动映射为 /* 路由
  </div>
</div>

---

# api 目录

<div class="bg-white rounded-xl shadow-lg">
  <div class="grid grid-cols-1 gap-6">
    <div class="bg-gray-50 rounded-lg  border border-gray-200">
      <div class="font-bold text-gray-800 mb-2">API 路由示例</div>
      <pre class="font-mono text-sm text-gray-700">
        // api/hello.ts
        export default defineEventHandler((event) => {
          const name = getQuery(event).name || 'World'
          return {
            message: `Hello ${name}!`,
            timestamp: new Date().toISOString()
          }
        })
      </pre>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-blue-50 rounded-lg ">
        <div class="font-bold text-gray-800 mb-2">访问方式</div>
        <div class="font-mono text-sm text-blue-800">GET /api/hello?name=Nitro</div>
      </div>
      <div class="bg-green-50 rounded-lg ">
        <div class="font-bold text-gray-800 mb-2">返回结果</div>
        <div class="font-mono text-sm text-green-800">
          {
            "message": "Hello Nitro!",
            "timestamp": "2024-01-01T12:00:00.000Z"
          }
        </div>
      </div>
    </div>
  </div>

  <div class="mt-6 text-sm text-gray-500">
    📁 API 路由文件放置在 server/api/ 目录中，自动映射为 /api/* 路由
  </div>
</div>

---
layout: quote
---

# WebSocket

Nitro使用CrossWS和H3 WebSocket原生支持与运行时无关的WebSocket API。

---

# 实验性功能

<div class="bg-white rounded-xl shadow-lg p-8 mt-6">

  <img src="./image-3.png" class="rounded-lg shadow-md mx-auto" style="max-height: 50vh;" />
  
  <div class="mt-6 text-sm text-gray-500 text-center">
    ⚠️ 实验性功能可能会发生变化，请谨慎在生产环境中使用
  </div>
</div>

---

# Server-Sent Events (SSE)

作为WebSockets的替代方案，您可以使用服务器发送的事件 (SSE) 。


---
layout: quote
---

# KV Storage

Nitro提供了一个内置的存储层，可以抽象文件系统、数据库或任何其他数据源。

---

# 配置

```ts
export default defineNitroConfig({
  storage: {
    redis: {
      driver: 'redis',
    },
    db: {
      driver: 'fs',
      base: './data/db'
    }
  },
  // Development
  devStorage: {
    db: {
      driver: 'fs',
      base: './data/db'
    }
  }
})
```

---

# 基本用法

```ts
// Default storage is in memory
await useStorage().setItem('test:foo', { hello: 'world' })
await useStorage().getItem('test:foo')

// You can also specify the base in useStorage(base)
await useStorage('test').setItem('foo', { hello: 'world' })

// You can use data storage to write data to default .data/kv directory
const dataStorage = useStorage('data')
await dataStorage.setItem('test', 'works')
await dataStorage.getItem('data:test') // Value persists

// You can use generics to define types
await useStorage<{ hello: string }>('test').getItem('foo')
await useStorage('test').getItem<{ hello: string }>('foo')
```



---
layout: quote
---

# SQL Database

Nitro提供了一个内置的轻量级SQL数据库层。


---

# 实验性功能

<div class="bg-white rounded-xl shadow-lg p-8 mt-6">

  <img src="./image-4.png" class="rounded-lg shadow-md mx-auto" style="max-height: 50vh;" />
  
  <div class="mt-6 text-sm text-gray-500 text-center">
    ⚠️ 实验性功能可能会发生变化，请谨慎在生产环境中使用
  </div>
</div>

---

# 配置

<pre>
export default defineNitroConfig({
  database: {
    default: {
      connector: 'sqlite',
      options: { name: 'db' }
    },
    users: {
      connector: 'postgresql',
      options: {
        url: 'postgresql://username:password@hostname:port/database_name'
      }
    }
  },
  devDatabase:{}
})
</pre>

---
layout: quote
---

# Cache

Nitro提供了一个构建在存储层之上的缓存系统，通过避免重复计算和数据库查询来显著提升应用性能、降低服务器负载

---

# 资源链接

- **官网**: https://nitro.unjs.io
- **GitHub**: https://github.com/unjs/nitro
- **文档**: https://nitro.unjs.io/guide
- **H3**: https://h3.unjs.io

---
layout: center
---

[Presentation Slides for Developers](https://sli.dev)