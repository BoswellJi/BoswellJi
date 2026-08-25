# 公司内部数据源（RoutableDataSource）接入模板

## 加载时机

| | 条件 |
|--|------|
| **白名单（必须加载本文件）** | 项目从零接入公司库组件；新增 `RoutableDataSource` / `DataSourceConfig`；为新库新增独立 DataSource Bean |
| **黑名单（不要加载）** | DataSource 已存在，仅写 Mapper/SQL、改 Repository、改业务查询 |
| **前置** | 已加载 `java-spring-boot`；统一配置已接入或同时加载 [ly-config-center.md](ly-config-center.md)；建表/SQL 另叠 `mysql-alibaba-standards` |
| **加载标记** | `LOAD: setup / ly-datasource` |

## 职责边界

- 使用公司组件 `com.ly.dal.datasource.RoutableDataSource`，不要用裸 `DriverManagerDataSource` 直连生产库。
- 代码侧声明：`env`、`projectId`（通常来自 `appUk`）、`dbName`；调用 `init()`。
- **库连接信息由统一配置中心下发**；`RoutableDataSource` **内置** 对 `configcenterclient` 的使用。  
  **禁止** 在本模板或 `application.yml` 中增加 jdbc url、账号、密码、主机端口等数据库连接配置。
- 一个逻辑库（`dbName`）对应一个 `@Bean`；多库则多 Bean，命名可区分。

## Maven 依赖

`RoutableDataSource` 来自 `com.ly.dal:dal-new`，并配套 `com.alibaba:druid`。版本用 `${dal.version}` / `${druid.version}`（或 BOM/父 POM），**模板不写死具体数字**。

```xml
<properties>
    <!-- 接入时对齐公司基线，勿臆造版本号 -->
    <dal.version><!-- 由公司基线维护 --></dal.version>
    <druid.version><!-- 由公司基线维护 --></druid.version>
</properties>

<dependency>
    <groupId>com.ly.dal</groupId>
    <artifactId>dal-new</artifactId>
    <version>${dal.version}</version>
    <exclusions>
        <exclusion>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
        </exclusion>
    </exclusions>
</dependency>
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid</artifactId>
    <version>${druid.version}</version>
</dependency>
```

前置：统一配置见 [ly-config-center.md](ly-config-center.md)；DAL 内置拉取库连接，本地勿加 jdbc 配置。

## 配置类骨架

```java
@Configuration
public class DataSourceConfig {

    /** 逻辑库名：按业务替换，与公司 DAL / 配置中心注册名一致 */
    private static final String DB_NAME = "${YOUR_DB_NAME}";

    @Value("${env}")
    private String env;

    @Value("${appUk}")
    private String appUk;

    @Bean(name = "primaryDataSource")
    public DataSource getDataSource() {
        RoutableDataSource ds = new RoutableDataSource();
        ds.setEnv(env);
        ds.setProjectId(appUk);
        ds.setDbName(DB_NAME);
        ds.init();
        return ds;
    }
}
```

若需包装为项目内 Client：

```java
@Bean(name = "xxxClient")
public DataSourceClient dataSourceClient() {
    RoutableDataSource ds = new RoutableDataSource();
    ds.setEnv(env);
    ds.setProjectId(appUk);
    ds.setDbName(DB_NAME);
    ds.init();
    return new DataSourceClient(ds);
}
```

## 约定

1. **`env` / `appUk`**：应用身份，从既有启动/部署配置注入；禁止写死环境串（测试桩除外）。它们不是「数据库连接串」。
2. **`dbName`**：逻辑库标识；注释标明业务含义。
3. **初始化**：需要连库时调用 `init()`；延迟初始化须在注释中写明原因与触发条件。
4. **多数据源**：Bean 名唯一；下游用 `@Qualifier`；事务按库声明。
5. **配置来源**：连接细节只走配置中心；缺统一配置时先按 `ly-config-center` 接入，勿在本地 yaml 补库配置。
6. **与 MySQL 规约**：表结构/索引/SQL 走 `mysql-alibaba-standards`。

## 检查清单

- [ ] 已引入 `com.ly.dal:dal-new` 与 `com.alibaba:druid`，版本来自属性/BOM
- [ ] `env`、`projectId`、`dbName` 均已设置
- [ ] 需要连库的路径已 `init()`
- [ ] Bean 名与注入点一致
- [ ] 本地配置中无 jdbc 连接信息
- [ ] 统一配置已 `ConfigCenterClient.init()`（或等价启动路径）
