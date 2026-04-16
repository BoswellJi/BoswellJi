# Copilot 仓库说明

## 构建、测试与检查命令

本仓库是 pnpm workspace，但**根目录没有统一的 `build`、`test`、`lint` script**。运行命令前，先看目标目录下的 `package.json`，默认使用 `pnpm --filter <package-name> <script>`。

### 安装依赖

```bash
pnpm install
```

根目录 `postinstall` 会安装 `simple-git-hooks`。

### 常用包级命令

| 范围 | 命令 |
| --- | --- |
| VuePress 博客 | `pnpm --filter blog dev` / `pnpm --filter blog build` |
| Nuxt 示例 | `pnpm --filter @boswell/nuxt dev` / `build` / `lint` |
| NestJS 示例 | `pnpm --filter @boswell/nestjs start:dev` / `build` / `lint` / `test` / `test:cov` |
| React 示例 | `pnpm --filter @boswell/react start` / `build` / `test` |
| Jest 示例 | `pnpm --filter @boswell/jest test` |
| Webpack 示例 | `pnpm --filter @boswell/webpack dev` / `build` / `serve` / `fix` |
| Vite 示例 | `pnpm --filter vite dev` / `build` / `preview` |
| Slidev 演示 | `pnpm --filter <slidev-package-name> dev` / `build`，例如 `pnpm --filter @slidev/plugin dev` |
| VS Code 插件 | `pnpm --filter @vscode/json2tscopy compile` |

### 运行单个测试

仅少数包有测试能力。优先透传测试文件路径或框架参数，不要假设存在仓库级测试入口：

```bash
# packages/jest 中已有 __tests__/sum.spec.js
pnpm --filter @boswell/jest test -- __tests__/sum.spec.js

# 其他 Jest 包沿用同一形式
pnpm --filter @boswell/nestjs test -- --runInBand <spec-file>

# React / react-scripts 包
pnpm --filter @boswell/react test -- --runTestsByPath <test-file>
```

如果目标包没有 `test` / `lint` / `build` script，就不要假设它支持这些命令。

## 高层架构

这是一个**个人技术学习型 monorepo**，不是单一产品应用。工作时要先判断自己在处理哪一类子项目，再进入对应目录查看本地配置。

- `packages/`：按技术主题划分的独立实验/样例包，例如 `nuxt`、`nestjs`、`react`、`webpack`、`vite`、`algorithm`。这些包彼此大多是并列关系，不要假设存在统一的运行入口或共享应用层。
- `slidev/`：每个子目录都是独立的 Slidev 演示项目，通常包含 `slides.md`、图片资源和本地 `.npmrc`。例如 `slidev/plugin-architecture/` 直接以 `slides.md` 作为演示入口。
- `blog/`：VuePress 文档站，内容源在 `blog/doc/`，站点配置在 `blog/vuepress.config.ts`。
- `vscode/`：独立工具/插件目录，目前可见的是 `plugin1`，通过 `tsc` 编译扩展代码。
- `.monkeycode/`：项目级上下文中心，包含架构说明、开发指南、技术栈，以及正在推进的 Open Spec 文档。遇到结构性变更、规范补充、仓库级改造时，先读这里再动手。

根目录主要提供 workspace、格式化/校验基础设施和提交规范，而不是统一业务入口。

## 关键约定

### 先读 `.monkeycode/`，再决定改动范围

`readme.md` 明确把 `.monkeycode/README.md`、`.monkeycode/docs/*.md` 和 `.monkeycode/specs/README.md` 作为项目文档入口。未来 Copilot 会话在做仓库级调整前，应优先检查这些文件，确认是否已有相关规格或设计文档。

### 以“最近的配置文件”为准

根目录有通用配置，但很多子包会覆盖它们：

- 根目录 `.eslintrc.json` 使用 `@typescript-eslint`，并禁止 `any`
- 根目录 `.prettierrc.json` 约定 **无分号、单引号、80 列**
- 但 `packages/nuxt/`、`packages/nestjs/`、`packages/webpack/` 都有自己的 ESLint/Prettier 配置

因此修改代码时，先遵循目标包自己的配置；只有缺少本地配置时，才回退到根目录约定。

### 根目录文档和实际脚本可能不同步

`.monkeycode/docs/development.md` 与 `architecture.md` 提到了 `pnpm lint`、`pnpm format` 这类根命令，但根 `package.json` 当前并没有对应 script。给出命令建议时，应以真实 `package.json` 为准，而不是照抄项目文档。

### 提交信息会被 hook 强校验

根目录启用了：

- `pre-commit`: `pnpm lint-staged`
- `commit-msg`: `node build/verifyCommit.js`

提交信息必须符合 Conventional Commits 风格；权威校验逻辑在 `build/verifyCommit.js`。允许的类型包含 `feat`、`fix`、`docs`、`dx`、`style`、`refactor`、`perf`、`test`、`workflow`、`build`、`ci`、`chore`、`types`、`wip`、`release`。

### 默认 registry 走 npmmirror

根目录 `.npmrc` 设置了：

```ini
registry=https://registry.npmmirror.com
```

若新增依赖、排查安装问题或比较锁文件差异，需要考虑镜像源环境。
