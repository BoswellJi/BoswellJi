![Boswell's GitHub stats](https://github-readme-stats.vercel.app/api?username=BoswellJi)

## Open Spec

项目已集成 Open Spec 文档体系，入口位于 `.monkeycode/`：

- 项目索引：`.monkeycode/README.md`
- 功能规格索引：`.monkeycode/specs/README.md`
- 项目架构：`.monkeycode/docs/architecture.md`
- 开发指南：`.monkeycode/docs/development.md`
- 技术栈：`.monkeycode/docs/tech-stack.md`

新增功能或改造时，建议按以下结构补充规格文档：

1. 在 `.monkeycode/specs/` 下创建 `YYYY-MM-DD-feature-name/`
2. 编写 `requirements.md`，需求描述使用 EARS 格式
3. 编写 `design.md`，说明方案、接口、错误处理和部署策略
4. 编写 `tasklist.md`，跟踪实施任务和进度
5. 更新 `.monkeycode/specs/README.md` 中的规格索引

## 提交信息规则

```js
/^(revert: )?(feat|fix|polish|docs|style|refactor|perf|test|workflow|ci|chore|types)(\(.+\))?: .{1,50}/;
```

