# 技术栈说明

## 编程语言

### TypeScript 5.9.3
- 主要开发语言
- 启用严格模式
- ES Module 格式

### JavaScript
- ES6+ 语法
- 用于简单示例和部分工具脚本

## 包管理

### pnpm 10.33.0
- 使用 workspace 管理 Monorepo
- 配置文件：`pnpm-workspace.yaml`
- 优势：节省磁盘空间，快速安装

## 代码质量工具

### ESLint 8.56.0
- 代码 linting
- 配合 TypeScript 使用

### Prettier 3.1.1
- 代码格式化
- 统一代码风格

### lint-staged
- Git staged 文件检查
- 提交前自动执行

### simple-git-hooks
- Git hooks 管理

## 前端技术栈

### 框架
- React (Hooks, Fiber)
- Vue 3 (Nuxt)
- Astro
- Backbone.js (遗留)

### 构建工具
- Vite
- Webpack 5
- Rollup
- Rspack

### 样式
- PostCSS
- TailwindCSS
- SVG

## 后端技术栈

### Node.js
- 运行时环境
- 服务端开发

### NestJS
- 企业级 Node.js 框架
- TypeScript 优先

## 测试工具

### Jest
- 单元测试
- 集成测试

### Cypress
- E2E 测试

## 演示工具

### Slidev
- 基于 Markdown 的演示工具
- 支持 Vue 组件
- 代码高亮和动画

## 其他工具

### Babel
- JavaScript 编译

### Prisma
- ORM 工具

### H3
- HTTP 框架

## 架构模式

### Monorepo
- pnpm workspace
- 多包管理

### 微前端
- qiankun
- 微前端架构实践

### 插件化架构
- 模块化设计
- 可插拔组件
