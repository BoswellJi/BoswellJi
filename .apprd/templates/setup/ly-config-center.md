# 公司内部统一配置（configcenterclient）接入模板

## 加载时机

| | 条件 |
|--|------|
| **白名单（必须加载本文件）** | 项目从零接入统一配置；新增 `configcenterclient` 依赖；首次 `ConfigCenterClient.init()`；新增配置读取封装（Helper/Util） |
| **黑名单（不要加载）** | 统一配置已接入，仅增删业务配置 key、改解析逻辑、改默认值 |
| **前置** | 已加载 `java-spring-boot` |
| **加载标记** | `LOAD: setup / ly-config-center` |

## 职责边界

- 公司统一配置组件：`com.ly.tcbase:configcenterclient`（`ConfigCenterClient`）。
- **数据库、Redis 等中间件的连接信息由配置中心下发**；DAL（`RoutableDataSource`）、缓存（`CacheClientHA`）等组件 **内置** 对本组件的依赖与拉取，业务工程 **不要** 在 `application.yml` 里写库地址、Redis 地址等连接配置。
- 本模板只管：依赖声明、启动初始化、业务侧读配置（字符串 / JSON 对象）的封装约定。

## Maven 依赖（版本勿写死）

在 `pom.xml` 声明坐标，**版本号不要硬编码在模板或复制样例里的具体数字**。优先顺序：

1. 公司父 POM / BOM / `dependencyManagement` 已管理版本 → 子模块只写 `groupId` + `artifactId`，不写 `<version>`
2. 否则用 `${...}` 属性，属性值由父工程或公司基线统一维护

```xml
<!-- 推荐：版本已由 dependencyManagement / 父 POM 管理 -->
<dependency>
    <groupId>com.ly.tcbase</groupId>
    <artifactId>configcenterclient</artifactId>
</dependency>
```

若当前工程必须显式写 version，用 properties 占位，**禁止**在规范或复制粘贴时写死某一数字版本：

```xml
<properties>
    <!-- 接入时填入公司基线当前版本；本模板故意不给具体数字 -->
    <configcenterclient.version><!-- 由公司基线维护 --></configcenterclient.version>
</properties>

<dependency>
    <groupId>com.ly.tcbase</groupId>
    <artifactId>configcenterclient</artifactId>
    <version>${configcenterclient.version}</version>
</dependency>
```

XML 注释不能作为有效 version 值；落地时把 properties 改成真实基线版本，或改为不写 version、交给 `dependencyManagement`。

## 启动初始化

在 Spring Boot 启动 **之前** 初始化，保证后续 Bean（含 DAL / Redis）能拉到配置：

```java
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        ConfigCenterClient.init();
        SpringApplication.run(Application.class, args);
    }
}
```

## 读取封装骨架

本项目配置（当前应用 appUk）：

```java
public final class ConfigCenterHelper {

    public static String getSelf(String key, String defaultValue) {
        String fallback = defaultValue == null ? "" : defaultValue;
        try {
            // 本应用：ConfigCenterClient.get(key) 或 get(appUk, key)，按组件 API 选用
            String value = ConfigCenterClient.get(key);
            return (value == null || value.isBlank()) ? fallback : value;
        } catch (Exception ex) {
            // 记录错误日志后返回默认值
            return fallback;
        }
    }

    public static String getProject(String projectName, String key, String defaultValue) {
        String fallback = defaultValue == null ? "" : defaultValue;
        try {
            if (projectName == null || projectName.isBlank() || key == null || key.isBlank()) {
                return fallback;
            }
            String value = ConfigCenterClient.get(projectName, key);
            return (value == null || value.isBlank()) ? fallback : value;
        } catch (Exception ex) {
            return fallback;
        }
    }

    private ConfigCenterHelper() {}
}
```

业务侧可再包一层 JSON 反序列化（`getObject` / `getObjectOrDefault`），失败打日志并回落默认对象；**不要**在业务 Service 里到处直接 `ConfigCenterClient.get` 而不处理异常与空值。

## 约定

1. **先 init 再 run**：漏 `ConfigCenterClient.init()` 会导致库/缓存/业务配置读取异常。
2. **连接类配置不上本地文件**：禁止在模板或业务 `application.yml` 中增加 jdbc url、Redis host/port 等；由配置中心 + 内置组件下发。
3. **业务配置 key**：命名稳定、有默认值；变更可配合公司配置监听（若项目已有 Listener/Pool，沿用现有扩展，不必重复造轮子）。
4. **跨项目读配置**：用 `get(projectName, key)`，`projectName` 与配置中心注册名一致。
5. **与 DB / Redis 模板叠用**：接入库或 Redis 时，统一配置应已就绪（本文件优先或同时加载）；库/Redis 模板不再描述连接配置。

## 检查清单

- [ ] `configcenterclient` 已声明，且版本来自 BOM/父 POM/属性，未写死散落版本号
- [ ] `main` 中 `ConfigCenterClient.init()` 在 `SpringApplication.run` 之前
- [ ] 业务读配置有默认值与异常兜底
- [ ] 未在本地配置文件中写库/Redis 连接信息
