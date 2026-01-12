# TypeScript Project References 配置

本项目已经配置了 TypeScript Project References 以优化 IDE 的类型检查性能。

## 主要优化

### 1. 启用 Composite 模式
所有包的 `tsconfig.json` 已配置：
- `"composite": true` - 启用项目引用
- `"declaration": true` - 生成声明文件
- `"declarationMap": true` - 生成声明文件的 source map
- `"rootDir"` 和 `"outDir"` - 明确的输入输出目录

### 2. 根目录配置
根目录的 `tsconfig.json` 使用 `references` 引用所有子项目，实现项目之间的依赖关系。

### 3. 增量构建
使用 `tsc --build` 模式进行增量编译，只重新编译有变化的项目。

## 使用方式

### 构建所有项目
```bash
pnpm build
# 或
npm run build
```

### 监听模式（开发时使用）
```bash
pnpm build:watch
# 或
npm run build:watch
```

### 清理构建产物
```bash
pnpm build:clean
# 或
npm run build:clean
```

## 性能优势

1. **增量编译**：只编译有变化的项目和依赖它的项目
2. **并行构建**：多个独立项目可以并行编译
3. **缓存优化**：TypeScript 会缓存构建信息（.tsbuildinfo 文件）
4. **IDE 性能**：VS Code 可以更智能地处理项目间的类型检查
5. **更快的跳转**：通过 declarationMap 实现更精确的代码导航

## IDE 配置

`.vscode/settings.json` 已配置：
- 启用实验性的项目诊断功能
- 使用工作区的 TypeScript 版本
- 优化自动导入

## 注意事项

1. 首次构建可能需要较长时间，后续增量构建会很快
2. 如果遇到类型检查问题，可以运行 `pnpm build:clean` 后重新构建
3. Git 应该忽略 `.tsbuildinfo` 和 `dist/` 目录
4. 建议在根目录安装 TypeScript：`pnpm add -D -w typescript`
