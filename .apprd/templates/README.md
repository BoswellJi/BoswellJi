# 工作区组件接入/调用模板（给真人看）

本目录种子经 `/ad-init` 同步到工作区 **`.apprd/templates/`**（须询问后拷贝）。

| 路径 | 作用 |
|------|------|
| `INDEX.md` | 场景 → 文件映射（可扩展、可关闭） |
| `setup/` | **首次接入**长模板（依赖、Bean、logback 等） |
| `usage/` | **日常调用**短模板；Skynet usage 在 Java 开发时默认加载 |

## 建议

1. 改 `setup/` / `usage/` 正文后宜提交元仓。
2. 新增组件：加 setup 与（可选）usage，并在 `INDEX.md` 加行。
3. 关闭某项：INDEX 中 `启用=no` 或删文件。
4. 插件升级后：再跑 `/ad-init`，选补齐 / 覆盖 / 逐个确认。

Agent 加载时机由插件 `java-spring-boot` 控制；本说明无需给 Agent 阅读。
