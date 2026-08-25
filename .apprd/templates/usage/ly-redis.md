# Redis（CacheClientHA）· 调用模板（usage）

> **按需加载：** 业务 get/set、改 key、过期、选 group 封装时加载。  
> **不要**加载本文件来新建 `CacheClientHA` 分组封装或加依赖（走 `setup/ly-redis.md`）。

| | 条件 |
|--|------|
| **加载标记** | `LOAD: usage / ly-redis` |
| **前置** | Redis 封装已存在；统一配置已初始化 |

## MUST

1. 通过项目已有封装取 Client，例如 `RedisTcXxx.Instance()`；先搜 `aop.redis` / cache 包下现有类。
2. key 命名稳定、带业务前缀；设置过期时间有据可依。
3. 日志用 SkynetMarker（解析 group / 缓存异常路径）。

## MUST NOT

- 业务代码 `new CacheClientHA(...)`。
- 在本地 yaml 写 Redis host/port/password。
- 生产/预发误用测试环境 Elong group 回退。

## 调用样例

```java
CacheClientHA client = RedisTcXxx.Instance();
client.set(key, value, ttlSeconds);
String cached = client.get(key);
```

（具体 API 以项目依赖的 `CacheClientHA` 版本为准；以仓库现有调用为准对齐。）

## 落地注意

- 多 group 时用已有枚举/多个封装类选择，勿在业务里拼 groupName 连接串。
- 仅改 key/TTL/读写逻辑 → 只加载本 usage。
