# H3 框架技术分享

## 什么是 H3？

是一个轻量级、快速、可组合、可移植的服务器端框架，用于现代JavaScript运行时（如 Node.js、Cloudflare Workers、Vercel Edge、Deno，Bun 等）。提供了极简的 API 和跨运行时的兼容性，使得开发者能够轻松构建高性能的服务端应用。

## 核心特性

- **跨运行时支持**：一套代码，适配多种 JavaScript 运行时环境。
- **尺寸小并且支持 Tree-shakable**: H3核心是超轻量级的，并且是可摇树的，只有你使用的东西才会包含在最终的包中。
- **可组合**：扩展服务器并添加功能。您的代码库将随着项目的扩展而扩展。
- **快速路由器**: 使用unjs/radix3的超快速路由匹配。
- **兼容Web标准**：优雅的最小API实现与web标准兼容的HTTP处理程序。
- **兼容Express/Connect框架的中间件**：node/connect/express中间件的兼容层。
- **类型安全**：使用TypeScript编写，提供完整的类型定义。
- **实时通信支持**：H3内置了跨平台的WebSocket和SSE支持。

## 为什么选择 H3？（对比 Express/Koa）
| 维度 | H3 | Express/Koa |
|------|----|-------------|
| 运行时支持 | Node.js/Cloudflare Workers/Vercel Edge/Deno 等 | 仅 Node.js |
| 体积 | 无依赖少，轻量 | 依赖众多，体积较大 |
| 边缘计算适配 | 原生支持，极致优化 | 不支持，需重写适配 |
| 核心场景 | 边缘 API、轻量微服务 | 传统 Node.js 后端、大型单体服务 |

##  H3 的核心设计理念

- **去运行时锁定**：一套代码，适配所有 JS 运行时；
- **极简 API**：降低学习成本，聚焦业务开发；
- **安全优先**：内置请求校验、错误标准化等基础安全能力；
- **性能优化**：基于 Fetch API 设计，异步性能拉满。

---

## H3 核心基础

####  核心概念
- **事件驱动模型**：以 `Event` 为核心，封装请求/响应上下文；
- **洋葱模型中间件**：支持前置拦截、后置处理，与 Koa 一脉相承；
- **处理器（Handler）**：核心执行单元，对应单个路由的业务逻辑。

####  核心模块

#####  逻辑处理（Controller）
- `defineEventHandler`：定义 H3 处理器（核心入口）。
- 入参：`event`（请求上下文）。
- 出参：支持直接返回 JSON/字符串/流，自动序列化。

#####  请求解析
- `getQuery`：获取 URL 查询参数；
- `readBody`：解析 POST/PUT 请求体（支持 JSON/表单/FormData）；
- `getHeader`/`getHeaders`：获取请求头；
- `getRouterParams`：获取动态路由参数。

#####  响应控制
- `setHeader`/`setHeaders`：设置响应头；
- `sendRedirect`：页面重定向；
- `sendError`：发送标准化错误响应；
- `createError`：创建符合 H3 规范的错误对象。

##### 编写第一个 H3 服务

```typescript
import { createApp, createRouter, defineEventHandler } from "h3";

export const app = createApp();

const router = createRouter();
app.use(router);

router.get(
  "/",
  defineEventHandler((event) => {
    return { message: "⚡️ Tadaa!" };
  }),
);
```

```bash
# 运行 H3 服务
listhen -w ./h3/index.ts
# 访问 http://localhost:3000/，返回 {"message":"⚡️ Tadaa!"}
```

## H3 路由开发

- **路由定义**：基于 HTTP 方法（GET/POST/PUT/DELETE）和路径定义；

```ts
// 基础写法
router.get(
  "/hello",
  defineEventHandler((event) => {
    return "Hello world!";
  }),
);

// 链式写法
router
  .get(
    "/hello",
    defineEventHandler((event) => {
      return "GET Hello world!";
    }),
  )
  .post(
    "/hello",
    defineEventHandler((event) => {
      return "POST Hello world!";
    }),
  );

```

- **动态路由**：支持路径参数（如 `/users/:id`）和通配符（如 `/files/*`）；

```ts
router.get(
  "/hello/:name",
  defineEventHandler((event) => {
    return `Hello ${event.context.params.name}!`;
  }),
);

```

- **路由嵌套**：支持路由分组和嵌套，提升代码组织性。

```ts
import { createApp, createRouter, defineEventHandler, useBase } from "h3";

export const app = createApp();

const websiteRouter = createRouter().get(
  "/",
  defineEventHandler((event) => {
    return "Hello world!";
  }),
);

const apiRouter = createRouter().get(
  "/hello",
  defineEventHandler((event) => {
    return "Hello API!";
  }),
);

websiteRouter.use("/api/**", useBase("/api", apiRouter.handler));

app.use(websiteRouter);

```

##  H3 中间件开发
- **中间件类型**：全局中间件、路由级中间件；
- **核心写法**：
```typescript
// 全局鉴权中间件
app.use(
  defineEventHandler(async (event, next) => {
    // 前置拦截：校验 Token
    const token = getHeader(event, 'authorization')?.replace('Bearer ', '');
    if (!token) {
      sendError(event, createError({ statusCode: 401, statusMessage: '未授权' }));
      return;
    }
    // 挂载数据到 event，供后续处理器使用
    event.context.user = { id: '1', username: 'test' };
    // 执行下一个中间件/处理器
    await next();
    // 后置处理：添加响应头
    setHeader(event, 'X-Request-Id', crypto.randomUUID());
  })
);

// 路由级中间件
app.use(
  "/abc",
  defineEventHandler((event) => {
    return "First";
  }),
);

// 懒加载中间件
app.use("/abc", () => import("./big-handler"), { lazy: true });

```
- **执行顺序**：全局中间件 → 路由级中间件 → 处理器。

---

## H3 Utils 工具函数

#### 与传统的插件/中间件方法相比，可组合程序具有巨大的优势：

- ✅您的服务器只包含并运行所需的代码
- ✅您可以轻松扩展服务器功能，而无需添加全局插件
- ✅使用清晰明了，少了全局中间件和插件
- ✅更好的性能和更小的内存占用，因为没有不必要的代码被加载或执行

#### H3 Utils 是一套实用工具函数，旨在简化 H3 开发中的常见任务。它提供了以下核心功能：

- 请求数据处理
- 响应控制
- 错误处理
- Session 
- Cookie 
- CORS
- Route
- Proxy
- 等等

---

## H3 适配器

#### 使用适配器在任何地方运行h3,夸运行时部署

- Node.js
- Bun
- Deno
- Cloudflare Workers

---

## H3运行机制

H3 基于 **Web Fetch API** 的请求/响应模型，核心是 `H3Event`（请求上下文）。  
一次请求从进入到返回，大致经历以下阶段：

1. **请求进入**
   - 运行时（Node/Bun/Deno/Workers）接收 HTTP 请求；
   - H3 创建 `H3Event`，封装 `req`、`res`、`context` 等上下文。

2. **全局中间件执行**
   - 按注册顺序执行；
   - 常用于日志、鉴权、限流、CORS、上下文注入。

3. **路由匹配**
   - 根据请求方法和路径进行匹配（支持动态路由和通配符）；
   - 命中后进入对应路由链路。

4. **路由级中间件**
   - 仅对命中的路由生效；
   - 适合做模块级校验（如 `/api/admin/**` 权限控制）。

5. **处理器执行**
   - 执行业务逻辑并返回结果；
   - 可返回 JSON、字符串、`Response`、流等；
   - H3 会按返回值类型进行响应封装与序列化。

6. **响应输出**
   - 写入状态码、响应头、响应体并返回客户端；
   - 若有“后置逻辑”（洋葱模型中的 next 之后代码），会在响应前完成。

7. **错误处理**
   - 任一阶段抛错会进入统一错误处理流程；
   - 推荐使用 `createError` + `sendError` 生成标准化错误响应；
   - 未捕获异常会被转换为规范错误输出，避免泄露内部细节。

