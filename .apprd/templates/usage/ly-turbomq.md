# TurboMQ · 调用模板（usage）

> **按需加载：** 业务发消息、注册/编写消费监听时加载。  
> **不要**加载本文件来新建 `TurboConfig` / Producer·Consumer Client（走 `setup/ly-turbomq.md`）。

| | 条件 |
|--|------|
| **加载标记** | `LOAD: usage / ly-turbomq` |
| **前置** | TurboMQ Client Bean 已存在 |

## MUST

1. 只注入项目已有的 `TurboMQProducerClient` / `TurboMQConsumerClient`（或 `@Qualifier` 对齐的 Bean 名）。
2. 发送/订阅走 Client API；消费 listener 返回组件要求的状态（如 `CONSUME_SUCCESS`）。
3. topic / tag 与现网约定一致；异常路径打 SkynetMarker 日志。

## MUST NOT

- 业务里 `new DefaultMQProducer` / `new DefaultMQPushConsumer`。
- 重复 `build()` / `start()` 造出多个底层客户端（生命周期属 setup/已有 Client）。
- 在 usage 任务里改 `TurboConfig` 全量连接装配（属 setup）。

## 调用样例

```java
// 发送：以项目 Producer Client 实际方法名为准
turboMQProducer.send(topic, tag, body);

// 消费：Client 已 build 后
turboMQConsumer.consume(topic, tagOrStar, (msgs, context) -> {
    // 业务处理
    return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
});
```

## 落地注意

- 先搜现有 `turboMQProducer` / `turboMQConsumer` 注入点，对齐包名与方法签名。
- 只改业务报文 / 消费逻辑 → 只加载本 usage。
