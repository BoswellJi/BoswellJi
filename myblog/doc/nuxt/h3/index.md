# H3 框架技术分享

## 什么是 H3？

- 官方定义：无依赖、跨运行时的 HTTP 框架；
- 核心关键词：轻量、高性能、可移植、TypeScript 原生。。

## 为什么选择 H3？（对比 Express/Koa）
| 维度 | H3 | Express/Koa |
|------|----|-------------|
| 运行时支持 | Node.js/Cloudflare Workers/Vercel Edge/Deno 等 | 仅 Node.js |
| 体积 | 无依赖，核心体积 < 10KB | 依赖众多，体积较大 |
| Nuxt 集成度 | 原生无缝，零配置接入 | 需适配器，适配成本高 |
| 边缘计算适配 | 原生支持，极致优化 | 不支持，需重写适配 |
| 核心场景 | 边缘 API、轻量微服务 | 传统 Node.js 后端、大型单体服务 |

##  H3 的核心设计理念
- **去运行时锁定**：一套代码，适配所有 JS 运行时；
- **极简 API**：降低学习成本，聚焦业务开发；
- **安全优先**：内置请求校验、错误标准化等基础安全能力；
- **性能优化**：基于 Fetch API 设计，异步性能拉满。

---

## H3 核心基础

#### 2.1 核心概念与运行机制
- **事件驱动模型**：以 `Event` 为核心，封装请求/响应上下文；
- **洋葱模型中间件**：支持前置拦截、后置处理，与 Koa 一脉相承；
- **处理器（Handler）**：核心执行单元，对应单个路由的业务逻辑。

#### 2.2 必掌握的核心 API（实战演示重点）
##### 2.2.1 基础处理器 API
- `defineEventHandler`：定义 H3 处理器（核心入口）；
- 入参：`event`（请求上下文）、`next`（中间件执行函数）；
- 出参：支持直接返回 JSON/字符串/流，自动序列化。

##### 2.2.2 请求解析 API
- `getQuery`：获取 URL 查询参数（自动解析类型）；
- `readBody`：解析 POST/PUT 请求体（支持 JSON/表单/FormData）；
- `getHeader`/`getHeaders`：获取请求头；
- `getRouterParams`：获取动态路由参数（Nuxt 中自动集成）。

##### 2.2.3 响应控制 API
- `setHeader`/`setHeaders`：设置响应头；
- `sendRedirect`：页面重定向；
- `sendError`：发送标准化错误响应；
- `createError`：创建符合 H3 规范的错误对象。

##### 2.2.4 实战小演示：编写第一个 H3 接口

```typescript
export default defineEventHandler((event) => {
  const { name } = getQuery(event);
  return { message: `Hello, ${name || 'H3'}` };
});

export default defineEventHandler(async (event) => {
  const { username } = await readBody(event);
  if (!username) {
    sendError(event, createError({ statusCode: 400, statusMessage: '用户名不能为空' }));
  }
  return { success: true, data: { userId: crypto.randomUUID() } };
});
```

#### 2.3 H3 中间件开发
- **中间件类型**：全局中间件、路由级中间件；
- **核心写法**：
```typescript
// 全局鉴权中间件
export default defineEventHandler(async (event, next) => {
  // 前置拦截：校验 Token
  const token = getHeader(event, 'authorization')?.replace('Bearer ', '');
  if (!token) {
    sendError(event, createError({ statusCode: 401, statusMessage: '未授权' }));
  }
  // 挂载数据到 event，供后续处理器使用
  event.context.user = { id: '1', username: 'test' };
  // 执行下一个中间件/处理器
  await next();
  // 后置处理：添加响应头
  setHeader(event, 'X-Request-Id', crypto.randomUUID());
});
```
- **执行顺序**：全局中间件 → 路由级中间件 → 处理器。

---

### 第三部分：H3 × Nuxt 实战落地（10 分钟）
#### 3.1 Nuxt 中 H3 的默认集成方式
- `server/api`：自动映射为 H3 路由，文件名即接口路径；
- `server/middleware`：自动注册为 H3 全局中间件；
- `server/routes`：自定义 H3 路由（支持复杂路由规则）。

#### 3.2 实战场景 1：数据库集成（结合 Sequelize）
- 核心要点：服务端隔离、单例连接、错误处理；
- 演示代码：基于 H3 编写用户 CRUD API，集成 Sequelize 操作数据库。

#### 3.3 实战场景 2：OAuth 授权回调（结合第三方登录）
- 核心要点：服务端接收授权码、兑换 Token、获取用户信息；
- 演示代码：基于 H3 处理 GitHub 登录回调，完成鉴权流程。

#### 3.4 实战场景 3：路由鉴权（结合 Pinia）
- 核心要点：服务端校验登录态，与客户端状态联动；
- 演示代码：H3 中间件校验 Token 有效性，为 Nuxt 页面鉴权提供支撑。

---

### 第四部分：H3 进阶能力与部署（8 分钟）
#### 4.1 跨运行时部署（核心优势）
- **部署原理**：Nitro 适配器将 H3 代码适配到不同运行时；
- **常用部署预设**：
  - Node.js：`nitro.preset: 'node-server'`；
  - Cloudflare Workers：`nitro.preset: 'cloudflare-workers'`；
  - Vercel Edge：`nitro.preset: 'vercel-edge'`；
- **部署演示**：一键将 H3 服务部署到 Cloudflare Workers（无代码修改）。

#### 4.2 高级特性：请求拦截与缓存
- **内置缓存**：H3 结合 Nitro 提供多层缓存（内存/Redis/CDN）；
- **请求拦截**：自定义请求处理逻辑，如跨域、限流、日志记录。

#### 4.3 H3 与现有 Node.js 服务集成
- **适配 Express 中间件**：使用 `composeMiddleware` 将 Express 中间件转为 H3 中间件；
- **反向代理**：基于 H3 实现轻量反向代理，对接现有后端服务。

---

### 第五部分：企业级最佳实践与避坑指南（5 分钟）
#### 5.1 最佳实践
1. 核心 API 集中封装：统一请求解析、错误处理、响应格式；
2. 中间件分层设计：鉴权、日志、跨域、限流分离，职责单一；
3. 运行时适配：开发用 Node.js，生产用边缘计算，根据场景选择；
4. 安全加固：校验请求体、过滤敏感参数、启用 HTTPS。

#### 5.2 常见坑点
1. 服务端 vs 客户端环境混淆：H3 代码仅运行在服务端，不可使用 `window`/`document`；
2. 依赖兼容性：避免使用仅支持 Node.js 的依赖（如 `fs`），适配边缘运行时；
3. 缓存策略错误：边缘运行时需避免使用内存缓存，优先选择分布式缓存。

---

### 第六部分：总结与答疑（7 分钟）
#### 6.1 核心总结
1. H3 是 Nuxt 服务端的“心脏”，日常开发无需额外学习即可上手；
2. 核心价值是**跨运行时可移植性**，完美适配边缘计算场景；
3. 极简 API + 洋葱模型，降低服务端开发成本，提升开发效率；
4. 与 Nuxt 生态无缝集成，是 Nuxt 全栈开发的最佳选择。

#### 6.2 未来展望
- H3 持续迭代，新增更多边缘计算优化能力；
- 与 AI 生态深度融合，支撑 Nuxt AI 代理的服务端能力；
- 生态持续完善，更多第三方中间件与工具链支持。

#### 6.3 答疑环节
- 解答听众关于 H3 开发、部署、性能优化的问题。