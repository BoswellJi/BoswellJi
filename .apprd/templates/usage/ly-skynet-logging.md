# Skynet 日志 · 调用模板（usage）

> **默认加载：** 凡 Java / Spring 业务开发（写 Service、Controller、DAO、工具类等）均应加载本文件。  
> **不要**在日常开发中加载 `setup/ly-skynet-logging.md`（仅首次接入 logback / Marker 三件套时用 setup）。

| | 条件 |
|--|------|
| **加载标记** | `LOAD: usage / ly-skynet-logging` |
| **前置** | 项目已接入 Skynet（无则先走 setup） |

## MUST

1. 业务日志使用 `SkynetMarker.create(...)` 作为 SLF4J marker，再写 message。
2. `module` / `category` / `subCategory` 用稳定检索维度；`filter1` / `filter2` 放可选业务键（用户 id、订单号等），无则省略或空串。
3. Marker 名必须为 `skynet`（项目 `SkynetMarker.getName()` 已固定则勿改）。

## MUST NOT

- 关键路径只用裸 `log.info("...")` 而不带 SkynetMarker（接入后的默认约定）。
- 改五段 `[]` 输出格式或 Converter 逻辑（属 setup）。

## 调用样例

```java
log.info(SkynetMarker.create("订单", "支付", "回调"), "pay notify orderId={}", orderId);
log.info(SkynetMarker.create(OrderService.class), "create order {}", orderId);
log.warn(SkynetMarker.create("订单", "支付", "回调", orderId, ""), "retry count={}", n);

// error：最后一个参数传 Throwable，才能打出堆栈
log.error(SkynetMarker.create("订单", "支付", "回调", orderId, ""),
        "pay notify failed orderId={}", orderId, ex);
```

## 落地注意

- 先确认项目内 `SkynetMarker` 包路径，按现有类调用，勿另起一套 Marker。
- 异常路径同样带 Marker，便于平台检索。
- **`log.error` 必须把异常对象放在参数列表最后**（SLF4J：`..., msg, arg1, ..., throwable`），不要只 `ex.getMessage()` 而丢掉堆栈。
