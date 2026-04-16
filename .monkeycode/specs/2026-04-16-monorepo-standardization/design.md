# Monorepo 标准化配置技术设计

## 文档信息

- **版本**: 1.0
- **日期**: 2026-04-16
- **状态**: 草案
- **关联需求**: `./requirements.md`

## 1. 架构设计

### 1.1 总体架构

```
┌─────────────────────────────────────┐
│         Root Workspace              │
│  (pnpm-workspace.yaml + config)     │
└─────────────────────────────────────┘
              │
    ┌─────────┴─────────┐
    │                   │
┌───▼───────┐    ┌──────▼────┐
│ packages/ │    │ slidev/   │
│  (26 包)   │    │  (19 包)   │
└───────────┘    └───────────┘
```

### 1.2 分层设计

**Root Layer (根层级)**
- workspace 配置
- 共享依赖管理
- 全局工具链配置

**Package Layer (包层级)**
- 独立的技术主题实现
- 本地依赖管理
- 包特定配置

## 2. 技术方案

### 2.1 Workspace 配置设计

#### 2.1.1 pnpm-workspace.yaml

```yaml
packages:
  - 'packages/*'
  - 'slidev/*'
  # 可选：排除某些目录
  - '!packages/deprecated/*'
```

**设计说明**:
- 使用通配符自动包含所有子包
- 支持排除模式处理废弃包
- 扁平化结构，易于扩展

### 2.2 包配置模板设计

#### 2.2.1 package.json 模板

```json
{
  "name": "@workspace/package-name",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc",
    "test": "vitest",
    "lint": "eslint src/"
  },
  "peerDependencies": {
    "typescript": "^5.0.0"
  },
  "devDependencies": {
    "@workspace/config": "workspace:*",
    "typescript": "^5.9.3"
  }
}
```

#### 2.2.2 tsconfig.json 模板

```json
{
  "extends": "@workspace/config/tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 2.3 配置共享设计

#### 2.3.1 创建配置包

在 `packages/config/` 下创建共享配置：

```
packages/config/
├── tsconfig.base.json    # TypeScript 基础配置
├── eslint.config.js      # ESLint 配置
├── prettier.config.js    # Prettier 配置
└── package.json          # 配置包声明
```

#### 2.3.2 配置继承

各包通过 `extends` 字段继承基础配置：

```json
{
  "extends": "@workspace/config/tsconfig.base.json"
}
```

### 2.4 依赖管理设计

#### 2.4.1 依赖分层

**Root package.json**
- DevDependencies: 工具链（eslint, prettier, typescript）
- peerDependencies: 框架类依赖

**Package package.json**
- dependencies: 运行时依赖
- devDependencies: 开发和测试依赖
- workspace:* 引用内部包

#### 2.4.2 依赖解析策略

```
外部依赖 → Root 锁定版本
内部依赖 → workspace:* 协议
```

## 3. 构建流程设计

### 3.1 构建命令链

```bash
pnpm install
  ↓
pnpm lint
  ↓
pnpm build
  ↓
pnpm test
```

### 3.2 增量构建

利用 pnpm 的依赖图，仅构建变更的包及其依赖：

```bash
pnpm --filter='...@workspace/package-name' build
```

### 3.3 并行构建

```bash
pnpm -r --parallel build
```

## 4. 接口设计

### 4.1 包导出接口

所有包遵循统一的导出模式：

```typescript
// packages/package-name/src/index.ts
export * from './module-a';
export * from './module-b';
export { default as MainClass } from './main';
```

### 4.2 内部依赖接口

包之间通过 `workspace:*` 协议引用：

```json
{
  "dependencies": {
    "@workspace/utils": "workspace:*"
  }
}
```

## 5. 目录结构设计

```
/workspace
├── packages/
│   ├── config/              # 配置包
│   ├── utils/               # 工具包
│   ├── algorithm/           # 算法包
│   └── ...
├── slidev/
│   ├── flutter-intro/       # Flutter 演示
│   └── ...
├── .monkeycode/
│   ├── docs/                # 文档
│   └── specs/               # 规格
└── package.json             # Root package
```

## 6. 错误处理

### 6.1 构建失败

- 输出详细的错误日志
- 标出失败的包和具体原因
- 提供修复建议

### 6.2 依赖冲突

- pnpm 自动处理版本冲突
- root 配置优先原则
- workspace 协议确保一致性

## 7. 部署策略

### 7.1 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发模式
pnpm -r --parallel dev
```

### 7.2 生产构建

```bash
# 构建所有包
pnpm -r build

# 验证构建
pnpm -r test
```

## 8. 测试策略

### 8.1 单元测试

每个包自行维护测试用例，使用 Vitest 或 Jest。

### 8.2 集成测试

测试包之间的依赖关系和接口调用。

## 9. 迁移计划

### 9.1 阶段 1: 创建配置包

- [ ] 创建 `packages/config/`
- [ ] 迁移共享配置
- [ ] 发布配置包

### 9.2 阶段 2: 更新包配置

- [ ] 为每个包添加 `tsconfig.json`
- [ ] 统一 `package.json` 结构
- [ ] 更新导出接口

### 9.3 阶段 3: 依赖整理

- [ ] 整理 root 依赖
- [ ] 清理包内重复依赖
- [ ] 使用 workspace:* 协议

## 10. 风险评估

### 10.1 技术风险

- **风险**: 配置变更导致现有代码不兼容
- **缓解**: 逐步迁移，充分测试

### 10.2 维护风险

- **风险**: 配置复杂化增加维护成本
- **缓解**: 详细文档，简化管理

## 11. 参考资料

- pnpm workspace: https://pnpm.io/workspaces
- TypeScript project references
- ESLint shared configs
