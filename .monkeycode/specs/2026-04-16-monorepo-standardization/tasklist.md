# Monorepo 标准化配置实施任务清单

## 文档信息

- **关联需求**: `./requirements.md`
- **关联设计**: `./design.md`
- **创建日期**: 2026-04-16

## 实施阶段

### 阶段 1: 基础设施准备

#### 任务 1.1: 创建配置包目录
- [x] 创建 `packages/config/` 目录
- [ ] 创建 `packages/config/package.json`
- [ ] 创建 `packages/config/tsconfig.base.json`
- [ ] 创建 `packages/config/eslint.config.js`
- [ ] 创建 `packages/config/prettier.config.js`

#### 任务 1.2: 配置 Workspace
- [ ] 创建/更新 `pnpm-workspace.yaml`
- [ ] 声明 `packages/*` 和 `slidev/*` 为 workspace
- [ ] 测试 workspace 配置正确性

#### 任务 1.3: 配置根项目
- [ ] 更新根 `package.json` 的 scripts
- [ ] 移动共享依赖到根 `package.json`
- [ ] 配置 `.npmrc` (如需要)

### 阶段 2: 包配置标准化

#### 任务 2.1: TypeScript 配置
- [ ] 创建 `packages/config/tsconfig.base.json`
- [ ] 为每个包创建 `tsconfig.json`
- [ ] 配置继承关系
- [ ] 验证编译配置

#### 任务 2.2: ESLint 配置迁移
- [ ] 创建共享 ESLint 配置
- [ ] 为每个包创建轻量级 ESLint 配置
- [ ] 测试 lint 命令

#### 任务 2.3: Prettier 配置
- [ ] 创建共享 Prettier 配置
- [ ] 统一格式化规则
- [ ] 配置 `.prettierrc` 和 `.prettierignore`

### 阶段 3: package.json 标准化

#### 任务 3.1: 更新 package.json 模板
- [ ] 定义标准字段结构
- [ ] 统一 scripts 命名
- [ ] 规范 peerDependencies

#### 任务 3.2: 批量更新各包
- [ ] 更新 packages/ 下所有包的 `package.json`
- [ ] 更新 slidev/ 下所有包的 `package.json`
- [ ] 添加 `@workspace/config` 依赖

#### 任务 3.3: 依赖整理
- [ ] 识别重复依赖
- [ ] 将共享依赖移至 root
- [ ] 使用 `workspace:*` 替换内部依赖路径

### 阶段 4: 构建流程标准化

#### 任务 4.1: 配置构建命令
- [ ] 统一 `build` 命令
- [ ] 统一 `dev` 命令
- [ ] 统一 `test` 命令
- [ ] 统一 `lint` 命令

#### 任务 4.2: 测试构建流程
- [ ] 测试 `pnpm install`
- [ ] 测试 `pnpm build`
- [ ] 测试 `pnpm lint`
- [ ] 测试 `pnpm test`

#### 任务 4.3: 优化构建性能
- [ ] 配置增量构建
- [ ] 配置并行构建
- [ ] 配置缓存

### 阶段 5: 文档和验证

#### 任务 5.1: 完善文档
- [x] 创建架构文档
- [x] 创建开发指南
- [x] 创建技术栈文档
- [ ] 创建包开发指南
- [ ] 创建配置说明文档

#### 任务 5.2: 验证和测试
- [ ] 清理并重新安装依赖
- [ ] 完整构建所有包
- [ ] 运行所有测试
- [ ] 文档审查

#### 任务 5.3: 迁移检查
- [ ] 检查是否有遗漏的包
- [ ] 验证向后兼容性
- [ ] 更新 README

## 进度跟踪

| 阶段 | 任务数 | 完成数 | 进度 |
|------|--------|--------|------|
| 阶段 1: 基础设施 | 8 | 1 | 12% |
| 阶段 2: 包配置 | 8 | 0 | 0% |
| 阶段 3: package.json | 6 | 0 | 0% |
| 阶段 4: 构建流程 | 7 | 0 | 0% |
| 阶段 5: 文档验证 | 8 | 3 | 38% |
| **总计** | **37** | **4** | **11%** |

## 下一步行动

1. **立即执行**: 任务 1.1 - 完成配置包创建
2. **短期目标**: 完成阶段 1 和阶段 2
3. **里程碑**: 所有包能正常 `pnpm build`

## 风险项

- 部分旧包可能需要代码调整以适配新配置
- Slidev 项目可能有特殊配置需求
- 依赖版本冲突需要手动解决

## 负责人

- 主要执行：AI Assistant
- 审查确认：用户

## 备注

- 每个阶段完成后需要运行完整测试
- 发现问题及时反馈并记录
- 保持 backward compatibility
