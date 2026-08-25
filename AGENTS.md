# AGENTS.md — BoswellJi 个人学习工作区

## 概述

个人学习与实践 monorepo，涵盖前端框架、后端服务、构建工具、算法、演示文稿等多个领域。使用 pnpm workspace 管理，根目录即 Git 元仓。

## 子项目

| ID | 目录 | 职责 | Git | 分支 | Agent 文档 |
|----|------|------|-----|------|------------|
| boswell | `projects/BoswellJi` | 元仓本身（monorepo 根） | git@github.com:BoswellJi/BoswellJi.git | master | `projects/BoswellJi/AGENTS.md` |

## 包清单（packages/）

| 包名 | 职责 | 主要脚本 |
|------|------|----------|
| agent | AI Agent 实验（RAG、Web UI） | start, dev, agent, web, rag:* |
| algorithm | 算法练习 | — |
| astro | Astro 框架实验 | dev, build, preview |
| blog | VuePress 博客 | dev, build, deploy |
| data-structure | 数据结构练习 | test |
| design-pattern | 设计模式练习 | test |
| flutter | Flutter 学习 | — |
| html | HTML 实验 | test |
| javascript | JavaScript 基础 | — |
| nestjs | NestJS 后端服务 | build, start:dev, lint, test |
| nitro | Nitro 服务端 | build, dev, preview |
| nodejs | Node.js 实验（H3 等） | nodejs, h3:* |
| nuxt | Nuxt 前端应用 | dev, build, generate, lint |
| react | React 应用 | start, build, test |
| rollup | Rollup 打包实验 | dev, build |
| rspack | Rspack 打包实验 | dev, build |
| vite | Vite 打包实验 | dev, build, preview |
| vscode-plugin | VS Code 插件 | — |
| webpack | Webpack 打包实验 | dev, build, fix |

## Slidev 演示文稿（slidev/）

18 个独立 Slidev 项目，涵盖 Flutter、Nitro、Nuxt、WebAssembly、WebGL、TailwindCSS、微前端等主题。

## Agent 与插件索引

| 类型 | 路径 / 名称 |
|------|-------------|
| Git 登记表 | `.apprd/git-config.yaml` |
| 初始化进度 | `.apprd/logs/init-progress.yaml` |
| 本地约束 | `.apprd/rules/`（java-spring-boot、mysql-alibaba-standards、ui-design-styles） |
| 组件模板 | `.apprd/templates/`（setup/usage 接入模板） |
| CodeGraph | disabled — CLI 未安装，降级使用 Grep/Read |
| 自动化技能 | `ad-init`、`ad-load`、`ad-setup`（插件提供） |

## CodeGraph 使用约定

未启用：使用 Grep / Read 进行代码搜索与文件阅读，勿调用 codegraph_* 工具。

## 构建与运行

| 操作 | 命令 |
|------|------|
| 安装依赖 | `pnpm install` |
| 开发某个子包 | `pnpm --filter <包名> dev` |
| 构建某个子包 | `pnpm --filter <包名> build` |
| 测试某个子包 | `pnpm --filter <包名> test` |
| Lint | `pnpm --filter <包名> lint` |
| 博客开发 | `pnpm blog` |
| 格式化全部 | `pnpm format:all` |
| 发版 | `pnpm release` |

## 工作区规则

- Git：所有 git 命令在工作区根目录执行（monorepo 结构）
- 提交信息格式：`^(revert: )?(feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip)(\(.+\))?: .{1,50}`
- 提交信息由 `build/verifyCommit.js` 校验，pre-commit 通过 lint-staged 执行格式化
- npm registry：`https://registry.npmmirror.com`

## 任务路由

| 任务类型 | 前往目录 | 详细上下文 |
|----------|----------|------------|
| 前端开发（Nuxt） | `packages/nuxt/` | Nuxt 应用开发 |
| 后端开发（NestJS） | `packages/nestjs/` | NestJS 服务端开发 |
| React 开发 | `packages/react/` | React 应用开发 |
| 构建工具实验 | `packages/vite/`、`packages/webpack/`、`packages/rollup/`、`packages/rspack/` | 打包配置与优化 |
| AI Agent | `packages/agent/` | RAG、Agent 实验 |
| 博客内容 | `packages/blog/` | VuePress 文档与博客 |
| 算法练习 | `packages/algorithm/`、`packages/data-structure/` | 算法与数据结构 |
| Nitro 服务 | `packages/nitro/` | Nitro 服务端开发 |
| Slidev 演示 | `slidev/` | 各主题演示文稿 |
