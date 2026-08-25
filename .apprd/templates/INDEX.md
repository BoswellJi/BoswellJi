# 公司组件接入/调用模板 · 索引

> 工作区路径：`.apprd/templates/INDEX.md`（由 `/ad-init` 从插件种子同步，可改）。  
> **本文件只做映射。** 加载**时机与纪律**由插件 `java-spring-boot` 规定。

## 类型说明

| 类型 | 目录 | 何时加载 |
|------|------|----------|
| **setup** | `setup/` | **首次接入**（加依赖、Configuration、封装类、logback 三件套等） |
| **usage** | `usage/` | **日常调用**；其中 **Skynet usage 在 Java 开发时默认加载**，配置/Redis/MQ usage **按需** |

同一组件：判为 setup 时只加载 setup；否则才考虑 usage。禁止为日常调用加载 setup 全文。

## 如何扩展 / 关闭

- **扩展：** 在 `setup/` 或 `usage/` 新增 md，并在下表加行（`启用` = `yes`）。
- **关闭：** `启用` = `no`，或删行 / 删文件。
- **关闭全部 usage 默认日志：** 将 `ly-skynet-logging` usage 行设为 `no`（不推荐）。

## 索引表

| id | 启用 | 类型 | 场景信号（匹配用） | 文件（相对本目录） | 加载标记 |
|----|------|------|-------------------|-------------------|----------|
| ly-config-center-setup | yes | setup | 接入统一配置 / `configcenterclient` / `ConfigCenterClient.init` / 新增 Helper | setup/ly-config-center.md | `LOAD: setup / ly-config-center` |
| ly-turbomq-setup | yes | setup | 接入 TurboMQ / 新增 Producer·Consumer `@Configuration` / Client | setup/ly-turbomq.md | `LOAD: setup / ly-turbomq` |
| ly-datasource-setup | yes | setup | 接入 `RoutableDataSource` / 公司库 / `DataSourceConfig` | setup/ly-datasource.md | `LOAD: setup / ly-datasource` |
| ly-redis-setup | yes | setup | 接入 Redis / 新增 `CacheClientHA` 分组封装 | setup/ly-redis.md | `LOAD: setup / ly-redis` |
| ly-skynet-logging-setup | yes | setup | 接入 Skynet 三件套 / `%skynet` / 首次改 logback | setup/ly-skynet-logging.md | `LOAD: setup / ly-skynet-logging` |
| ly-skynet-logging-usage | yes | usage | **默认：** 任意 Java/Spring 业务开发打日志 | usage/ly-skynet-logging.md | `LOAD: usage / ly-skynet-logging` |
| ly-config-center-usage | yes | usage | **按需：** 读配置 key / 跨项目 get / JSON 配置 | usage/ly-config-center.md | `LOAD: usage / ly-config-center` |
| ly-redis-usage | yes | usage | **按需：** 缓存 get/set、改 key/TTL | usage/ly-redis.md | `LOAD: usage / ly-redis` |
| ly-turbomq-usage | yes | usage | **按需：** 发消息 / 消费监听业务逻辑 | usage/ly-turbomq.md | `LOAD: usage / ly-turbomq` |

## 启用判定

- `启用`：`yes` / `y` / `true` / `1` / `是` → 启用；其它 → 不加载。
- 文件缺失 → **不加载、不臆造**；提示补文件或将 `启用` 设为 `no`。
