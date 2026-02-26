# H3 框架技术分享

## 什么是 H3？

是一个轻量级、快速、可组合的服务器框架，用于现代JavaScript运行时（如 Node.js、Cloudflare Workers、Vercel Edge、Deno，Bun 等）。提供了极简的 API 和跨运行时的兼容性，使得开发者能够轻松构建高性能的服务端应用。

## 为什么选择 H3？（对比 Express/Koa）
| 维度 | H3 | Express/Koa |
|------|----|-------------|
| 运行时支持 | Node.js/Cloudflare Workers/Vercel Edge/Deno 等 | 仅 Node.js |
| 体积 | 无依赖，核心体积 < 10KB | 依赖众多，体积较大 |
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

#####  路由处理
- `defineEventHandler`：定义 H3 处理器（核心入口）；
- 入参：`event`（请求上下文）、`next`（中间件执行函数）；
- 出参：支持直接返回 JSON/字符串/流，自动序列化。

#####  请求解析
- `getQuery`：获取 URL 查询参数（自动解析类型）；
- `readBody`：解析 POST/PUT 请求体（支持 JSON/表单/FormData）；
- `getHeader`/`getHeaders`：获取请求头；
- `getRouterParams`：获取动态路由参数（Nuxt 中自动集成）。

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
npx h3 --port 3000
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

####  H3 中间件开发
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


```
- **执行顺序**：全局中间件 → 路由级中间件 → 处理器。

---

## H3 适配器

#### 使用适配器在任何地方运行h3

- Node.js
- Bun
- Deno
- Cloudflare Workers

---

## 运行机制
