# 统一配置 · 调用模板（usage）

> **按需加载：** 业务要读/解析配置中心 key、跨项目 get 配置时加载。  
> **不要**加载本文件来做 `ConfigCenterClient.init` 或加依赖（走 `setup/ly-config-center.md`）。

| | 条件 |
|--|------|
| **加载标记** | `LOAD: usage / ly-config-center` |
| **前置** | 统一配置已接入；优先用项目已有 Helper/封装 |

## MUST

1. 通过项目封装读配置（如 `ConfigCenterHelper.getSelf` / `getProject`）；处理 null/blank 与异常，**必须有默认值**。
2. 跨应用读配置用 `get(projectName, key)`，`projectName` 与配置中心注册名一致。
3. JSON 配置：封装反序列化，失败打日志（带 SkynetMarker）并回落默认对象。

## MUST NOT

- 业务 Service 到处直接 `ConfigCenterClient.get` 且无兜底。
- 在 `application.yml` 写库 / Redis **连接**信息（连接只走配置中心）。
- 再次 `ConfigCenterClient.init()`（启动期 setup 已完成）。

## 调用样例

```java
String timeout = ConfigCenterHelper.getSelf("order.pay.timeoutMs", "3000");
String shared = ConfigCenterHelper.getProject("shared-config", "feature.x", "false");
```

## 落地注意

- 先搜仓库是否已有 Helper；有则沿用，勿新建第二套。
- 仅增删业务 key / 改默认值 → 只加载本 usage，不加载 setup。
