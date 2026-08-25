# 公司内部 Skynet 日志规范模板

## 加载时机

| | 条件 |
|--|------|
| **白名单（必须加载本文件）** | 项目从零接入 Skynet；新增 `SkynetMarker` / `SkynetConverter` / `SkynetPatternLayout`；首次改 logback 使用 `%skynet` |
| **黑名单（不要加载）** | 三件套与 logback 已就绪，仅在业务里补 `log.info(SkynetMarker.create(...), "...")` |
| **前置** | 已加载 `java-spring-boot`；可与 `observability-and-instrumentation` 叠加，本文件只定公司 Skynet 格式 |
| **加载标记** | `LOAD: setup / ly-skynet-logging` |

## 三件套职责

| 类 | 职责 |
|----|------|
| `SkynetMarker` | 实现 SLF4J `Marker`；承载 module/category/subCategory/filter1/filter2 |
| `SkynetConverter` | Logback `ClassicConverter`；从 event 取名为 `skynet` 的 Marker，格式化为日志片段 |
| `SkynetPatternLayout` | 扩展 `PatternLayout`，静态注册转换字 `%skynet` → `SkynetConverter` |

## Marker 骨架

```java
@Data
public class SkynetMarker implements Marker {
    private String module = "默认";
    private String category = "默认";
    private String subCategory = "默认";
    private String filter1 = "";
    private String filter2 = "";

    private SkynetMarker() {}

    public static SkynetMarker create(Class<?> clazz) {
        return create("类日志", clazz.getName());
    }

    public static SkynetMarker create(String module, String category) {
        return new SkynetMarker().module(module).category(category);
    }

    public static SkynetMarker create(String module, String category, String subCategory) {
        return create(module, category).subCategory(subCategory);
    }

    public static SkynetMarker create(String module, String category, String subCategory,
                                      String filter1, String filter2) {
        return create(module, category, subCategory).filter1(filter1).filter2(filter2);
    }

    // fluent setters 省略…

    @Override
    public String getName() {
        return "skynet";
    }

    @Override
    public String toString() {
        return String.format("[%s][%s][%s][%s][%s]",
                module, category, subCategory, filter1, filter2);
    }

    // Marker 其余接口可空实现（与现网一致）
}
```

## Converter / PatternLayout

```java
public class SkynetConverter extends ClassicConverter {
    private static final String SKYNET = "skynet";

    @Override
    public String convert(ILoggingEvent event) {
        Marker marker = event.getMarker();
        if (marker != null && SKYNET.equalsIgnoreCase(marker.getName())) {
            return marker.toString();
        }
        return "[默认][默认][默认][][]";
    }
}

public class SkynetPatternLayout extends PatternLayout {
    static {
        defaultConverterMap.put("skynet", SkynetConverter.class.getName());
    }
}
```

## logback 接入（标准模板）

- layout 使用本项目 `SkynetPatternLayout` 的**全限定类名**（下例包名请替换）。
- pattern 中必须包含 `%skynet`（紧挨 `%message`）。
- 日志路径使用 `skynet-${app-uk}`；`app-uk` 由 `springProperty` 从配置 `app-uk` 注入。
- 各环境可复制本模板为 `logback-product.xml` / `logback-qa.xml` 等，仅按需微调 pattern 细节，**路径与 `%skynet` 结构保持一致**。

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<configuration debug="true">
    <contextName>live</contextName>
    <springProperty scope="context" name="app-uk" source="app-uk"/>
    <appender name="ROLLING_FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>/data/logs/skynet-${app-uk}/app/logback.log</file>
        <encoder class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
            <!-- 将 class 换成项目内 SkynetPatternLayout 全限定名 -->
            <layout class="${YOUR_BASE_PACKAGE}.util.SkynetPatternLayout">
                <pattern>%date{yyyy-MM-dd HH:mm:ss.SSS} %-5level &lt;%class&gt; %X{apmTrace} %skynet%message%n</pattern>
            </layout>
        </encoder>
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <fileNamePattern>/data/logs/skynet-${app-uk}/logback-%d{yyyy-MM-dd-HH}-%i.log
            </fileNamePattern>
            <maxHistory>7</maxHistory>
            <maxFileSize>64MB</maxFileSize>
        </rollingPolicy>
    </appender>
    <root>
        <appender-ref ref="ROLLING_FILE"/>
    </root>
</configuration>
```

约定：

1. 需使用 `springProperty` 时，保证 Logback 能解析 Spring 扩展（如 `logback-spring.xml`，或工程已具备等价能力）。
2. `debug="true"` 仅作接入排查；稳定后可按环境改为 `false`。
3. 勿把业务工程的具体包名写进可复用公共模块；落地时替换 `${YOUR_BASE_PACKAGE}`。

## 业务打点约定

```java
log.info(SkynetMarker.create("模块", "类别", "子类别"), "消息 body={}", value);
log.info(SkynetMarker.create(FooService.class), "类级日志 {}", id);
```

1. **字段语义**：`module` / `category` / `subCategory` 用于检索维度；`filter1` / `filter2` 放可选过滤键（用户 id、订单号等），无则空串。
2. **无 Marker**：Converter 输出 `[默认][默认][默认][][]`，保证格式列对齐。
3. **Marker 名固定**：`getName()` 必须为 `skynet`，否则 Converter 不识别。
4. **包位置建议**：`..util`；各环境 `logback-*.xml` 同步使用同一 Layout。

## 检查清单

- [ ] 三件套齐全且 Converter 已注册到 PatternLayout
- [ ] logback 使用上表标准 ROLLING_FILE 模板；路径为 `/data/logs/skynet-${app-uk}/...`
- [ ] layout 类名为本项目 `SkynetPatternLayout`；pattern 含 `%skynet`
- [ ] `springProperty` 的 `app-uk` 与应用配置一致
- [ ] 关键路径日志带 `SkynetMarker.create(...)`
- [ ] 未改 Marker 输出格式（五段 `[]`），以免破坏日志平台解析
