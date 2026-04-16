# 前端脚手架模板实施任务清单

## 文档信息

- **关联需求**: `./requirements.md`
- **关联设计**: `./design.md`
- **创建日期**: 2026-04-16

## 实施阶段

### 阶段 1: 基础设施准备

#### 任务 1.1: 创建模板目录结构
- [ ] 创建 `packages/templates/` 目录
- [ ] 创建 `packages/templates/nuxt-base/` 目录
- [ ] 创建 `packages/templates/vite-react-base/` 目录
- [ ] 创建 `packages/templates/vite-vue-base/` 目录
- [ ] （可选）创建 `packages/templates/scaffold-cli/` 目录

#### 任务 1.2: 配置 Workspace
- [ ] 更新根目录 `pnpm-workspace.yaml`
- [ ] 添加 `packages/templates/*` 到 workspace
- [ ] 测试 workspace 配置

### 阶段 2: Nuxt 基础模板

#### 任务 2.1: 创建 Nuxt 项目结构
- [ ] 创建 `nuxt.config.ts`
- [ ] 创建 `tsconfig.json`
- [ ] 创建 `tailwind.config.js`
- [ ] 创建 `app.vue`
- [ ] 创建基础目录结构

#### 任务 2.2: 配置 Nuxt 模块
- [ ] 配置 `@nuxtjs/tailwindcss`
- [ ] 配置 `@pinia/nuxt`
- [ ] 配置 `@vueuse/nuxt`
- [ ] 配置 TypeScript

#### 任务 2.3: 创建示例代码
- [ ] 创建示例页面 (`pages/index.vue`)
- [ ] 创建示例组件
- [ ] 创建示例 composable
- [ ] 创建示例 store

#### 任务 2.4: 配置开发工具
- [ ] 配置 ESLint
- [ ] 配置 Prettier
- [ ] 配置 .gitignore
- [ ] 配置 .vscode settings
- [ ] 创建 package.json

#### 任务 2.5: 创建文档
- [ ] 编写 README.md
- [ ] 编写使用说明
- [ ] 添加示例截图（可选）

### 阶段 3: Vite + React 模板

#### 任务 3.1: 创建 React 项目结构
- [ ] 创建 `vite.config.ts`
- [ ] 创建 `tsconfig.json`
- [ ] 创建 `tsconfig.node.json`
- [ ] 创建 `tailwind.config.js`
- [ ] 创建 `index.html`
- [ ] 创建 `src/main.tsx`

#### 任务 3.2: 配置 React 核心功能
- [ ] 配置 React Router
- [ ] 配置状态管理 (Zustand)
- [ ] 配置 TailwindCSS
- [ ] 配置 TypeScript

#### 任务 3.3: 创建示例代码
- [ ] 创建示例页面组件
- [ ] 创建示例组件
- [ ] 创建示例 hooks
- [ ] 创建示例 store
- [ ] 创建示例 utils

#### 任务 3.4: 配置开发工具
- [ ] 配置 ESLint
- [ ] 配置 Prettier
- [ ] 配置 .gitignore
- [ ] 配置 .vscode settings
- [ ] 创建 package.json

#### 任务 3.5: 创建文档
- [ ] 编写 README.md
- [ ] 编写使用说明
- [ ] 添加示例截图（可选）

### 阶段 4: Vite + Vue 模板

#### 任务 4.1: 创建 Vue 项目结构
- [ ] 创建 `vite.config.ts`
- [ ] 创建 `tsconfig.json`
- [ ] 创建 `tailwind.config.js`
- [ ] 创建 `index.html`
- [ ] 创建 `src/main.ts`

#### 任务 4.2: 配置 Vue 核心功能
- [ ] 配置 Vue Router
- [ ] 配置 Pinia
- [ ] 配置 TailwindCSS
- [ ] 配置 TypeScript

#### 任务 4.3: 创建示例代码
- [ ] 创建示例页面组件
- [ ] 创建示例组件
- [ ] 创建示例 composables
- [ ] 创建示例 store
- [ ] 创建示例 utils

#### 任务 4.4: 配置开发工具
- [ ] 配置 ESLint
- [ ] 配置 Prettier
- [ ] 配置 .gitignore
- [ ] 配置 .vscode settings
- [ ] 创建 package.json

#### 任务 4.5: 创建文档
- [ ] 编写 README.md
- [ ] 编写使用说明
- [ ] 添加示例截图（可选）

### 阶段 5: 共享配置

#### 任务 5.1: 创建共享 ESLint 配置
- [ ] 创建 `packages/config/eslint.config.js`
- [ ] 配置基础规则
- [ ] 配置 TypeScript 规则
- [ ] 配置 Vue 规则
- [ ] 配置 React 规则

#### 任务 5.2: 创建共享 Prettier 配置
- [ ] 创建 `packages/config/prettier.config.js`
- [ ] 统一格式化规则
- [ ] 配置 TailwindCSS 插件

#### 任务 5.3: 创建共享 TypeScript 配置
- [ ] 创建 `packages/config/tsconfig.base.json`
- [ ] 配置通用编译选项
- [ ] 配置路径别名

### 阶段 6: 测试验证

#### 任务 6.1: Nuxt 模板测试
- [ ] 复制模板创建测试项目
- [ ] 安装依赖
- [ ] 启动开发服务器
- [ ] 运行构建
- [ ] 检查输出质量

#### 任务 6.2: React 模板测试
- [ ] 复制模板创建测试项目
- [ ] 安装依赖
- [ ] 启动开发服务器
- [ ] 运行构建
- [ ] 检查输出质量

#### 任务 6.3: Vue 模板测试
- [ ] 复制模板创建测试项目
- [ ] 安装依赖
- [ ] 启动开发服务器
- [ ] 运行构建
- [ ] 检查输出质量

#### 任务 6.4: 跨平台测试
- [ ] Windows 测试（如适用）
- [ ] macOS 测试（如适用）
- [ ] Linux 测试（如适用）

### 阶段 7: 可选 CLI 工具

#### 任务 7.1: CLI 开发
- [ ] 创建 CLI 入口文件
- [ ] 实现 create 命令
- [ ] 实现 list 命令
- [ ] 实现交互式提示

#### 任务 7.2: 模板集成
- [ ] 集成 Nuxt 模板
- [ ] 集成 React 模板
- [ ] 集成 Vue 模板
- [ ] 实现变量替换

#### 任务 7.3: CLI 测试
- [ ] 测试命令解析
- [ ] 测试文件生成
- [ ] 测试依赖安装
- [ ] 测试错误处理

### 阶段 8: 文档和发布

#### 任务 8.1: 完善文档
- [ ] 创建索引文档
- [ ] 编写使用指南
- [ ] 创建常见问题 FAQ
- [ ] 编写贡献指南

#### 任务 8.2: 发布准备
- [ ] 配置版本号
- [ ] 编写 CHANGELOG
- [ ] 准备发布说明

#### 任务 8.3: 发布模板
- [ ] 发布 @workspace/nuxt-base
- [ ] 发布 @workspace/vite-react-base
- [ ] 发布 @workspace/vite-vue-base
- [ ] （可选）发布 @workspace/create-app

## 进度跟踪

| 阶段 | 任务数 | 完成数 | 进度 |
|------|--------|--------|------|
| 阶段 1: 基础设施 | 5 | 0 | 0% |
| 阶段 2: Nuxt 模板 | 12 | 0 | 0% |
| 阶段 3: React 模板 | 12 | 0 | 0% |
| 阶段 4: Vue 模板 | 12 | 0 | 0% |
| 阶段 5: 共享配置 | 6 | 0 | 0% |
| 阶段 6: 测试验证 | 10 | 0 | 0% |
| 阶段 7: CLI 工具 | 9 | 0 | 0% |
| 阶段 8: 文档发布 | 7 | 0 | 0% |
| **总计** | **73** | **0** | **0%** |

## 下一步行动

1. **立即执行**: 任务 1.1 - 创建模板目录结构
2. **短期目标**: 完成阶段 1-4，创建三个基础模板
3. **里程碑**: 所有模板能正常创建、构建和运行

## 风险项

- 依赖版本冲突需要处理
- 跨平台兼容性问题
- CLI 工具开发工作量较大
- 需要持续更新维护

## 负责人

- 主要执行：AI Assistant
- 审查确认：用户

## 质量要求

### 代码质量
- [ ] TypeScript 编译无错误
- [ ] ESLint 检查无警告
- [ ] 代码格式化一致

### 功能质量
- [ ] 模板创建流程顺畅
- [ ] 依赖安装成功
- [ ] 开发服务器正常启动
- [ ] 构建无错误

### 文档质量
- [ ] README 清晰完整
- [ ] 配置有注释说明
- [ ] 示例代码正确

## 备注

- 每个模板完成后需要单独测试
- 保持模板之间的配置一致性
- 及时更新依赖版本
- 考虑添加更多模板变体（如 API 模板、全栈模板等）
