# 前端脚手架模板技术设计

## 文档信息

- **版本**: 1.0
- **日期**: 2026-04-16
- **状态**: 草案
- **关联需求**: `./requirements.md`

## 1. 架构设计

### 1.1 总体架构

```
┌─────────────────────────────────────┐
│       Scaffold Templates Root       │
│       (packages/templates/)         │
└─────────────────────────────────────┘
              │
    ┌─────────┴─────────┬─────────────┐
    │                   │             │
┌───▼───────┐    ┌──────▼──────┐ ┌───▼───────┐
│   Nuxt    │    │ Vite+React  │ │ Vite+Vue  │
│ Template  │    │  Template   │ │ Template  │
└───────────┘    └─────────────┘ └───────────┘
```

### 1.2 目录结构

```
packages/templates/
├── nuxt-base/              # Nuxt 3 基础模板
│   ├── components/         # Vue 组件
│   ├── composables/        # Composables
│   ├── layouts/            # 布局组件
│   ├── pages/              # 页面组件
│   ├── public/             # 静态资源
│   ├── nuxt.config.ts      # Nuxt 配置
│   ├── tsconfig.json       # TS 配置
│   ├── tailwind.config.js  # Tailwind 配置
│   ├── package.json        # 依赖配置
│   └── README.md           # 使用说明
├── vite-react-base/        # Vite + React 模板
│   ├── src/
│   │   ├── components/     # React 组件
│   │   ├── hooks/          # Custom Hooks
│   │   ├── pages/          # 页面组件
│   │   ├── router/         # 路由配置
│   │   ├── store/          # 状态管理
│   │   ├── styles/         # 样式文件
│   │   └── utils/          # 工具函数
│   ├── vite.config.ts      # Vite 配置
│   ├── tsconfig.json       # TS 配置
│   ├── tailwind.config.js  # Tailwind 配置
│   ├── package.json        # 依赖配置
│   └── README.md
├── vite-vue-base/          # Vite + Vue 模板
│   ├── src/
│   │   ├── components/     # Vue 组件
│   │   ├── composables/    # Composables
│   │   ├── pages/          # 页面组件
│   │   ├── router/         # 路由配置
│   │   ├── store/          # Pinia Store
│   │   └── styles/         # 样式文件
│   ├── vite.config.ts      # Vite 配置
│   ├── tsconfig.json       # TS 配置
│   ├── tailwind.config.js  # Tailwind 配置
│   ├── package.json        # 依赖配置
│   └── README.md
└── scaffold-cli/           # 脚手架 CLI 工具（可选）
    ├── src/
    │   ├── commands/       # 命令实现
    │   ├── templates/      # 模板配置
    │   └── utils/          # 工具函数
    ├── bin/                # CLI 入口
    └── package.json
```

## 2. 技术方案

### 2.1 Nuxt 模板设计

#### 2.1.1 项目结构

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt'
  ],
  typescript: {
    strict: true,
    tsConfig: {
      compilerOptions: {
        baseUrl: '.',
        paths: {
          '@/*': ['./*']
        }
      }
    }
  }
})
```

#### 2.1.2 核心文件

**App Structure**:
- `app.vue` - 根组件
- `nuxt.config.ts` - Nuxt 配置
- `tsconfig.json` - TypeScript 配置
- `tailwind.config.js` - TailwindCSS 配置

**目录约定**:
- `components/` - 自动导入的组件
- `composables/` - 自动导入的 composables
- `pages/` - 基于文件的路由
- `layouts/` - 布局组件
- `public/` - 静态资源

#### 2.1.3 Scripts 配置

```json
{
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write ."
  }
}
```

### 2.2 Vite + React 模板设计

#### 2.2.1 项目结构

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

#### 2.2.2 核心文件

**React Structure**:
- `vite.config.ts` - Vite 配置
- `tsconfig.json` - TypeScript 配置
- `tailwind.config.js` - TailwindCSS 配置
- `postcss.config.js` - PostCSS 配置

**目录约定**:
- `src/components/` - React 组件
- `src/hooks/` - Custom Hooks
- `src/pages/` - 页面组件
- `src/router/` - 路由配置
- `src/store/` - 状态管理 (Zustand/Redux)
- `src/utils/` - 工具函数

#### 2.2.3 路由配置示例

```typescript
// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import AboutPage from '@/pages/AboutPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/about',
    element: <AboutPage />
  }
])
```

#### 2.2.4 状态管理示例 (Zustand)

```typescript
// src/store/counter.ts
import { create } from 'zustand'

interface CounterState {
  count: number
  increment: () => void
  decrement: () => void
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 }))
}))
```

#### 2.2.5 Scripts 配置

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx",
    "lint:fix": "eslint src --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx}\""
  }
}
```

### 2.3 Vite + Vue 模板设计

#### 2.3.1 项目结构

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

#### 2.3.2 核心配置

**Vue Structure**:
- `vite.config.ts` - Vite 配置
- `tsconfig.json` - TypeScript 配置
- `tailwind.config.js` - TailwindCSS 配置

**目录约定**:
- `src/components/` - Vue 组件
- `src/composables/` - Composables
- `src/pages/` - 页面组件
- `src/router/` - Vue Router 配置
- `src/store/` - Pinia Store
- `src/styles/` - 样式文件

#### 2.3.3 路由配置示例

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import AboutPage from '@/pages/AboutPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPage
    }
  ]
})
```

#### 2.3.4 状态管理示例 (Pinia)

```typescript
// src/store/counter.ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    }
  }
})
```

#### 2.3.5 Scripts 配置

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx,vue",
    "lint:fix": "eslint src --ext ts,tsx,vue --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,vue}\""
  }
}
```

### 2.4 通用配置设计

#### 2.4.1 ESLint 配置

```javascript
// eslint.config.js
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx,vue}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
  {
    rules: {
      // 自定义规则
    }
  }
];
```

#### 2.4.2 Prettier 配置

```javascript
// prettier.config.js
export default {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  printWidth: 100,
  plugins: ['prettier-plugin-tailwindcss']
}
```

#### 2.4.3 .gitignore

```
# Dependencies
node_modules/
.pnpm-store/

# Build output
dist/
dist-ssr/
*.local

# Editor
.vscode/*
!.vscode/extensions.json
.idea/
*.swp
*.swo
*~

# Environment
.env
.env.local
.env.*.local

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# OS
.DS_Store
Thumbs.db

# Test
coverage/
```

#### 2.4.4 .vscode/settings.json

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "vue.languageFeatures.definitions": "project",
  "vue.languageFeatures.references": "project",
  "vue.languageFeatures.implementations": "project"
}
```

## 3. 脚手架 CLI 设计（可选增强）

### 3.1 CLI 架构

```
scaffold-cli/
├── bin/
│   └── cli.js          # CLI 入口
├── src/
│   ├── commands/
│   │   ├── create.js   # create 命令
│   │   └── list.js     # list 命令
│   ├── templates/
│   │   └── index.js    # 模板配置
│   ├── utils/
│   │   ├── prompts.js  # 交互式提示
│   │   └── generator.js # 文件生成
│   └── index.js
└── package.json
```

### 3.2 CLI 使用流程

```bash
# 创建新项目
npx @workspace/create-app

# 交互式选择
? 选择模板类型:
  ❯ nuxt-base
    vite-react-base
    vite-vue-base

? 项目名称: my-app

? 使用包管理器:
  ❯ pnpm
    npm
    yarn
    bun

# 自动创建项目并安装依赖
```

## 4. 接口设计

### 4.1 模板文件接口

所有模板文件使用 `.template` 后缀标识可替换变量：

```
# package.json.template
{
  "name": "{{PROJECT_NAME}}",
  "version": "1.0.0",
  "description": "{{PROJECT_DESCRIPTION}}"
}
```

### 4.2 变量替换

```javascript
// 变量列表
{
  PROJECT_NAME: 'my-app',
  PROJECT_DESCRIPTION: 'My awesome app',
  AUTHOR_NAME: 'Author',
  CREATED_YEAR: '2026'
}
```

## 5. 错误处理

### 5.1 创建失败

- 清理已创建的文件
- 输出详细的错误信息
- 提供可能的解决方案

### 5.2 依赖安装失败

- 重试机制（最多 3 次）
- 提供降级方案（切换包管理器）
- 输出错误日志

## 6. 测试策略

### 6.1 单元测试

- 测试 CLI 命令
- 测试文件生成逻辑
- 测试变量替换

### 6.2 集成测试

- 完整创建流程测试
- 依赖安装测试
- 构建测试

### 6.3 手动测试

- 创建 Nuxt 项目并验证
- 创建 React 项目并验证
- 创建 Vue 项目并验证

## 7. 部署策略

### 7.1 模板发布

- 每个模板作为独立 npm 包
- 使用 `@workspace/` scope
- 版本号管理遵循 SemVer

### 7.2 CLI 发布

- 发布到 npm registry
- 配置 bin 字段
- 全局安装使用

## 8. 迁移计划

### 8.1 阶段 1: 创建基础模板
- [ ] 创建 Nuxt 基础模板
- [ ] 创建 Vite + React 基础模板
- [ ] 创建 Vite + Vue 基础模板

### 8.2 阶段 2: 配置标准化
- [ ] 统一 ESLint 配置
- [ ] 统一 Prettier 配置
- [ ] 统一 TypeScript 配置
- [ ] 统一 TailwindCSS 配置

### 8.3 阶段 3: 可选 CLI 工具
- [ ] 开发脚手架 CLI
- [ ] 测试模板创建流程
- [ ] 发布到 npm

### 8.4 阶段 4: 文档和示例
- [ ] 编写使用文档
- [ ] 创建示例项目
- [ ] 录制使用教程

## 9. 风险评估

### 9.1 技术风险

- **风险**: 模板过时而需要频繁更新
- **缓解**: 定期审查和更新依赖版本
- **缓解**: 使用灵活的依赖版本范围

### 9.2 维护风险

- **风险**: 多个模板增加维护成本
- **缓解**: 共享配置文件
- **缓解**: 自动化测试保障

## 10. 参考资料

- Nuxt 3: https://nuxt.com
- Vite: https://vitejs.dev
- Vue 3: https://vuejs.org
- React: https://react.dev
- TailwindCSS: https://tailwindcss.com
- Pinia: https://pinia.vuejs.org
- Zustand: https://zustand-demo.pmnd.rs
