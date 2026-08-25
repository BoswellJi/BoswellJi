# 公司内部 TurboMQ 接入模板

## 加载时机

| | 条件 |
|--|------|
| **白名单（必须加载本文件）** | 项目从零接入公司内部 MQ；新增 Producer/Consumer `@Configuration`；新建 `TurboMQProducerClient` / `TurboMQConsumerClient` |
| **黑名单（不要加载）** | MQ 配置与 Client 已存在，仅改业务发消息 / 消费逻辑 / Topic 文案 |
| **前置** | 已加载 `java-spring-boot`；本文件叠在其上，不替代通用 Spring 配置规范 |
| **加载标记** | `LOAD: setup / ly-turbomq` |

## 职责边界

- 用 Spring `@Configuration` + `@ConfigurationProperties` 绑定公司 MQ 连接属性。
- Producer / Consumer 各一份 `Properties` Bean + 一份 Client Bean；Client 构造后调用 `build()`。
- **必须同时落地** `TurboMQProducerClient`、`TurboMQConsumerClient`（只接一侧时可只实现对应 Client + 配置 Bean）。
- 业务层只注入 Client Bean，不直接 `new DefaultMQProducer` / `DefaultMQPushConsumer`。

## Maven 依赖

客户端依赖公司 `com.ly.turbomq:turbomq-client`。版本用 `${turbomq-client.version}`（或 BOM/父 POM），**模板不写死具体数字**。

```xml
<properties>
    <!-- 接入时对齐公司基线，勿臆造版本号 -->
    <turbomq-client.version><!-- 由公司基线维护 --></turbomq-client.version>
</properties>

<dependency>
    <groupId>com.ly.turbomq</groupId>
    <artifactId>turbomq-client</artifactId>
    <version>${turbomq-client.version}</version>
    <exclusions>
        <exclusion>
            <groupId>com.alibaba</groupId>
            <artifactId>fastjson</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

说明：工程若已统一管理 `fastjson`，保留上述 exclusion，避免传递依赖版本冲突。

## 配置类骨架

```java
@Configuration
public class TurboConfig {

    @Bean("turboMQProducerConfig")
    @ConfigurationProperties(prefix = "turbomq.producer")
    public Properties turboMQProducerConfig() {
        return new Properties();
    }

    @Bean("turboMQProducer")
    public TurboMQProducerClient turboMQProducerClient(
            @Qualifier("turboMQProducerConfig") Properties properties) {
        TurboMQProducerClient client = new TurboMQProducerClient(properties);
        client.build();
        return client;
    }

    @Bean("turboMQConsumerConfig")
    @ConfigurationProperties(prefix = "turbomq.consumer")
    public Properties turboMQConsumerConfig() {
        return new Properties();
    }

    @Bean("turboMQConsumer")
    public TurboMQConsumerClient turboMQConsumerClient(
            @Qualifier("turboMQConsumerConfig") Properties properties) {
        TurboMQConsumerClient client = new TurboMQConsumerClient(properties);
        client.build();
        return client;
    }
}
```

## TurboMQProducerClient 骨架

包位置建议：`..manager.turbomq.producer`

```java
public class TurboMQProducerClient {

    private DefaultMQProducer producer;
    private final Properties properties;
    private volatile boolean status = false;

    public TurboMQProducerClient(Properties properties) {
        this.properties = properties;
    }

    public void build() {
        if (properties == null || producer != null) {
            return;
        }
        try {
            String group = properties.getProperty("group");
            if (group == null || group.isEmpty()) {
                group = "default";
            }
            String address = properties.getProperty("server-address");
            producer = new DefaultMQProducer(group);
            producer.setNamesrvAddr(address);
            producer.setRetryAnotherBrokerWhenNotStoreOK(true);
            producer.setRetryTimesWhenSendFailed(3);
            producer.start();
            status = true;
        } catch (Throwable ex) {
            close();
        }
    }

    public boolean send(String topic, byte[] message) throws Throwable {
        ensureReady();
        SendResult result = producer.send(new Message(topic, message));
        return SendStatus.SEND_OK.equals(result.getSendStatus());
    }

    public boolean send(String topic, String tag, byte[] message) throws Throwable {
        if (tag == null) {
            return send(topic, message);
        }
        ensureReady();
        SendResult result = producer.send(new Message(topic, tag, message));
        return SendStatus.SEND_OK.equals(result.getSendStatus());
    }

    public boolean send(String topic, String tag, String key, byte[] message) throws Throwable {
        if (tag == null) {
            return send(topic, message);
        }
        ensureReady();
        SendResult result = producer.send(new Message(topic, tag, key, message));
        return SendStatus.SEND_OK.equals(result.getSendStatus());
    }

    public void sendCallback(String topic, byte[] message, SendCallback callback) throws Throwable {
        if (callback == null) {
            send(topic, message);
            return;
        }
        ensureReady();
        producer.send(new Message(topic, message), callback);
    }

    public void sendCallback(String topic, String tag, byte[] message, SendCallback callback) throws Throwable {
        if (callback == null) {
            send(topic, tag, message);
            return;
        }
        if (tag == null) {
            sendCallback(topic, message, callback);
            return;
        }
        ensureReady();
        producer.send(new Message(topic, tag, message), callback);
    }

    public void sendCallback(String topic, String tag, String key, byte[] message, SendCallback callback)
            throws Throwable {
        if (callback == null) {
            send(topic, tag, key, message);
            return;
        }
        if (key == null) {
            sendCallback(topic, tag, message, callback);
            return;
        }
        ensureReady();
        producer.send(new Message(topic, tag, key, message), callback);
    }

    public void close() {
        if (producer != null) {
            producer.shutdown();
            producer = null;
        }
        status = false;
    }

    private void ensureReady() {
        if (!status) {
            throw new RuntimeException("producer已经关闭，不能再次使用");
        }
        if (producer == null) {
            throw new RuntimeException("null producer");
        }
    }
}
```

## TurboMQConsumerClient 骨架

包位置建议：`..manager.turbomq.consumer`

```java
public class TurboMQConsumerClient {

    private DefaultMQPushConsumer consumer;
    private final Properties properties;
    private volatile boolean status = false;

    public TurboMQConsumerClient(Properties properties) {
        this.properties = properties;
    }

    /**
     * 仅组装 Consumer 与消费起点策略；真正 start 在 consume(...) 中。
     */
    public void build() {
        if (properties == null) {
            return;
        }
        String group = properties.getProperty("group");
        if (group == null || group.isEmpty()) {
            group = "default";
        }
        String address = properties.getProperty("server-address");
        consumer = new DefaultMQPushConsumer(group);
        consumer.setNamesrvAddr(address);

        String strategy = properties.getProperty("strategy");
        if (strategy == null || strategy.isEmpty()) {
            // CONSUME_FROM_LAST_OFFSET：从队列尾部开始，跳过历史
            // CONSUME_FROM_FIRST_OFFSET：从最早开始
            // CONSUME_FROM_TIMESTAMP：配合 from-timestamp（毫秒偏移）使用
            strategy = "CONSUME_FROM_LAST_OFFSET";
        }
        ConsumeFromWhere fromWhere = ConsumeFromWhere.valueOf(strategy);
        consumer.setConsumeFromWhere(fromWhere);
        if (ConsumeFromWhere.CONSUME_FROM_TIMESTAMP.equals(fromWhere)) {
            String offsetMs = properties.getProperty("from-timestamp");
            if (offsetMs != null && !offsetMs.isEmpty()) {
                String timestamp = toConsumeTimestamp(offsetMs);
                if (!timestamp.isEmpty()) {
                    consumer.setConsumeTimestamp(timestamp);
                }
            }
        }
        // 按公司现网约定；若业务需集群模式再改
        consumer.setMessageModel(MessageModel.BROADCASTING);
        status = true;
    }

    public void consume(String topic, String tag, MessageListenerConcurrently listener) throws Throwable {
        if (!status || consumer == null) {
            throw new RuntimeException("consumer已经关闭，不能再次使用");
        }
        if (tag == null || tag.isEmpty()) {
            tag = "*";
        }
        consumer.subscribe(topic, tag);
        consumer.registerMessageListener(listener);
        consumer.start();
    }

    public boolean running() {
        return status;
    }

    public void close() {
        status = false;
        if (consumer != null) {
            consumer.shutdown();
            consumer = null;
        }
    }

    /** from-timestamp：距当前的毫秒偏移，转为组件要求的时间串 */
    private String toConsumeTimestamp(String offsetMs) {
        try {
            return UtilAll.timeMillisToHumanString3(
                    System.currentTimeMillis() - Long.parseLong(offsetMs));
        } catch (Throwable e) {
            return "";
        }
    }
}
```

业务侧订阅示例（Client 已 `build()` 后）：

```java
turboMQConsumer.consume(topic, tagOrStar, (msgs, context) -> {
    // 业务处理
    return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
});
```

## 约定

1. **Bean 名**：配置用 `*Config`，客户端用 `turboMQProducer` / `turboMQConsumer`；注入处用 `@Qualifier` 对齐。
2. **配置键**：Client 读取 `group`、`server-address`；Consumer 另可读 `strategy`、`from-timestamp`。缺 `group` 时默认 `default`。
3. **生命周期**：Producer 在 `build()` 内 `start()`；Consumer 在 `build()` 只装配，在 `consume(...)` 内 `start()`。异常时 `close()` 并置 `status=false`。避免重复 `build()` 造出多个底层客户端。
4. **包位置**：`..config.TurboConfig`；Client 分目录 `producer` / `consumer`。
5. **只接一侧时**：可只落地对应 Client + 一对 Config/Bean，勿留空壳。
6. **业务禁止**：直接操作 `DefaultMQProducer` / `DefaultMQPushConsumer`。

## 配置示例（application）

```yaml
turbomq:
  producer:
    group: ${TURBOMQ_PRODUCER_GROUP}
    server-address: ${TURBOMQ_NAMESRV}
  consumer:
    group: ${TURBOMQ_CONSUMER_GROUP}
    server-address: ${TURBOMQ_NAMESRV}
    # strategy: CONSUME_FROM_LAST_OFFSET
    # from-timestamp: "1800000"   # 仅 CONSUME_FROM_TIMESTAMP 时需要
```

## 检查清单

- [ ] 已引入 `com.ly.turbomq:turbomq-client`（含 `fastjson` exclusion），版本来自属性/BOM
- [ ] `TurboConfig` 与两侧 Client 类均已落地（或按需只落一侧）
- [ ] 属性前缀与 `@ConfigurationProperties` 一致；Client 读取的 key 与 yaml 一致
- [ ] Producer Bean 内已 `build()`；Consumer 业务订阅路径调用了 `consume(...)`
- [ ] 业务注入的是 Client，不是裸 `Properties`
- [ ] 未在业务代码里硬编码 NameServer / 直接 new 原生 MQ 客户端
