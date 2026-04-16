# 项目架构说明

## 项目概述

本项目是一个大型个人技术学习/练习 Monorepo 项目，涵盖了前端、后端、构建工具、算法等多个技术主题。

## 技术栈

### 核心栈
- **语言**: TypeScript 5.9.3, JavaScript (ES Module)
- **包管理**: pnpm 10.33.0
- **代码质量**: ESLint 8.56.0, Prettier 3.1.1
- **Git Hooks**: simple-git-hooks + lint-staged

### 项目类型
- **Monorepo**: 使用 pnpm workspace 管理多个包
- **个人学习项目**: 包含大量技术主题的代码示例和文档

## 目录结构

```
/workspace
├── packages/          # 主要代码包（26 个子目录）
│   ├── algorithm/     # 算法实现
│   ├── data-structure/# 数据结构
│   ├── design-pattern/# 设计模式
│   ├── javascript/    # JavaScript
│   ├── typescript/    # TypeScript
│   ├── react/         # React
│   ├── nodejs/        # Node.js
│   ├── nestjs/        # NestJS
│   ├── nuxt/          # Nuxt
│   ├── vite/          # Vite
│   ├── webpack/       # Webpack
│   └── ...            # 更多技术主题
├── slidev/            # Slidev 演示项目（19 个子目录）
├── blog/doc/          # 技术文档目录
├── build/             # 构建脚本
├── .vscode/           # VS Code 配置
└── .github/           # GitHub 配置
```

## 包组织方式

### packages/ 目录
按技术主题组织的独立包，每个包包含相关主题的代码示例和实践。

### slidev/ 目录
按技术演讲主题组织的 Slidev 演示项目。

### blog/doc/ 目录
Markdown 格式的技术学习笔记，包括：
- 前端基础（HTML, CSS, JavaScript, TypeScript）
- 框架（React, Vue）
- 构建工具（Webpack, Vite, Rollup）
- 面试题资料
- 英语语法笔记
- 渲染技术（Canvas, WebGL, Three.js）
- 微信平台（小程序，公众号）
- 架构模式（Monorepo, 微前端）

## 依赖关系

### Workspace 依赖
使用 pnpm workspace 在包之间共享依赖和代码。

### 外部依赖
详见各包目录下的 `package.json` 文件。

## 构建和开发

### 安装依赖
```bash
pnpm install
```

### 代码检查
```bash
pnpm lint
```

### 格式化
```bash
pnpm format
```
