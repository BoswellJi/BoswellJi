# 公司内部 Redis（CacheClientHA）接入模板

## 加载时机

| | 条件 |
|--|------|
| **白名单（必须加载本文件）** | 项目从零接入公司 Redis；新增 `CacheClientHA` 分组封装（如 `RedisTcXxx`）；新增 Elong/测试环境 group 回退 |
| **黑名单（不要加载）** | 封装已存在，仅在 DAO/Service 里 get/set、改 key、改过期时间 |
| **前置** | 已加载 `java-spring-boot`；统一配置已接入或同时加载 [ly-config-center.md](ly-config-center.md)；打点若尚无 Skynet 可叠 [ly-skynet-logging.md](ly-skynet-logging.md) |
| **加载标记** | `LOAD: setup / ly-redis` |

## 职责边界

- 使用 `com.ly.tcbase.cacheclient.CacheClientHA`，按 **groupName** 区分业务分组。
- 每个 group 一个封装类 + 双重检查锁单例 `Instance()`；业务通过封装取 Client，不散落 `new CacheClientHA`。
- **Redis 连接信息由统一配置中心下发**；`CacheClientHA` **内置** 对配置组件的依赖。  
  **禁止** 在本模板或 `application.yml` 中增加 Redis host/port/password 等连接配置。
- 测试环境若只有一套 Elong Redis，可在 `resolveGroupName()` 中回退到 Elong group。

## Maven 依赖

`CacheClientHA` 来自公司缓存组件 `com.ly.tcbase:cache`。版本用 `${cache.version}`（或 BOM/父 POM），**模板不写死具体数字**。

```xml
<properties>
    <!-- 接入时对齐公司基线，勿臆造版本号 -->
    <cache.version><!-- 由公司基线维护 --></cache.version>
</properties>

<dependency>
    <groupId>com.ly.tcbase</groupId>
    <artifactId>cache</artifactId>
    <version>${cache.version}</version>
</dependency>
```

`exclusions` 按各项目依赖冲突自行处理，本模板不固定排除项。

同时在 `dependencyManagement` 中约束 Lettuce（避免与 Spring Boot 等传递依赖冲突）；版本优先走属性/基线，勿在业务模块散落写死：

```xml
<properties>
    <lettuce.version><!-- 由公司基线维护；需与 cache 组件兼容 --></lettuce.version>
</properties>

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>io.lettuce</groupId>
            <artifactId>lettuce-core</artifactId>
            <version>${lettuce.version}</version>
            <exclusions>
                <exclusion>
                    <groupId>io.reactivex</groupId>
                    <artifactId>rxjava</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>
</dependencyManagement>
```

说明：若父 POM 已管理 `lettuce-core`，只保留 exclusions 所需覆盖，避免重复冲突声明。

## 单例封装骨架

```java
@Slf4j
public class RedisTcXxx {

    /** 缓存平台注册的 group 名，非连接地址 */
    private static final String GROUP_NAME = "${YOUR_GROUP}";

    private static volatile CacheClientHA cacheClientHA;
    private static final Object LOCK = new Object();

    public static CacheClientHA Instance() {
        if (cacheClientHA == null) {
            synchronized (LOCK) {
                if (cacheClientHA == null) {
                    cacheClientHA = new CacheClientHA(resolveGroupName(), true);
                }
            }
        }
        return cacheClientHA;
    }

    private static String resolveGroupName() {
        String group = GROUP_NAME;
        // 测试环境仅一套 Elong 时：
        // if ("test".equals(AppProfile.getEnvironment())) {
        //     group = RedisElongConfig.GROUP_NAME;
        // }
        log.info(SkynetMarker.create("RedisTcXxx", "resolveGroupName", "resolveGroupName"),
                "Tc Redis groupName={}, env={}", group, AppProfile.getEnvironment());
        return group;
    }
}
```

Elong / 共享测试集群（仅 group 名，仍无连接配置）：

```java
public final class RedisElongConfig {
    public static final String GROUP_NAME = "${YOUR_ELONG_GROUP}";

    private static volatile CacheClientHA cacheClientHA;
    private static final Object LOCK = new Object();

    public static CacheClientHA Instance() {
        if (cacheClientHA == null) {
            synchronized (LOCK) {
                if (cacheClientHA == null) {
                    cacheClientHA = new CacheClientHA(GROUP_NAME, true);
                }
            }
        }
        return cacheClientHA;
    }

    private RedisElongConfig() {}
}
```

## 约定

1. **包位置建议**：`..aop.redis`（或项目约定的 cache 包）；一类一文件，类名体现业务分组。
2. **构造**：`new CacheClientHA(groupName, true)`；第二个参数与现网组件语义一致。
3. **线程安全**：`volatile` + 双重检查；锁对象私有静态。
4. **环境回退**：仅在「测试环境无独立 group」时回退 Elong；生产/预发禁止误切。
5. **日志**：解析 group 时用 `SkynetMarker`。
6. **配置来源**：连接细节只走配置中心；缺统一配置时先按 `ly-config-center` 接入。
7. **使用侧**：DAO 调用 `RedisTcXxx.Instance()`；多 Client 用枚举/参数选择。

## 检查清单

- [ ] 已引入 `com.ly.tcbase:cache`，版本来自属性/BOM；冲突 exclusion 按项目自定
- [ ] 已按需声明 `lettuce-core` 的 `dependencyManagement`（含排除 `rxjava`）
- [ ] 每个 group 只有一个单例入口
- [ ] groupName 与公司缓存平台注册一致（不是 host）
- [ ] 本地配置中无 Redis 连接信息
- [ ] 统一配置已初始化
- [ ] 业务代码无直接 `new CacheClientHA`
