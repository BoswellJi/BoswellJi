# 开发指南

## 环境要求

- Node.js (版本见各包要求)
- pnpm >= 10.33.0

## 快速开始

### 1. 安装依赖

```bash
pnpm install
```

### 2. 代码检查

```bash
pnpm lint
```

### 3. 代码格式化

```bash
pnpm format
```

## 开发流程

### 分支管理

- 从 `master`/`main` 分支创建功能分支
- 分支命名：`YYMMDD-type-description`
  - `feat-`: 新功能
  - `fix-`: Bug 修复
  - `chore-`: 杂项/工具链
  - `refactor-`: 代码重构

### 提交规范

遵循 Conventional Commits 规范：

```
<type>(<scope>): <description>

[optional body]
```

类型包括：
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式
- `refactor`: 重构
- `chore`: 构建/工具/依赖

### Git Hooks

项目配置了 simple-git-hooks，提交前会自动执行代码检查。

## 目录约定

### packages/

每个子目录是一个独立的技术主题包，包含该主题的：
- 代码示例
- 实现
- 测试

### slidev/

每个子目录是一个 Slidev 演示主题。

### blog/doc/

技术文档按主题分类存放。

## 测试

查看各包的 `package.json` 了解具体测试命令。

## 文档

### 代码注释

- TypeScript 使用 TSDoc 格式
- JavaScript 使用 JSDoc 格式

### Markdown 文档

使用标准的 Markdown 语法，存放在 `blog/doc/` 目录。
