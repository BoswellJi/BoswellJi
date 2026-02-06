# Sequelize ORM

## 1. ORM 是什么，为什么用 Sequelize

- ORM 定义：用代码对象表达表结构与数据访问，让业务层少写重复 SQL
- Sequelize 优势：
  - 多数据库方言（MySQL/PostgreSQL/SQLite/MSSQL）
  - 关联关系、事务、迁移（Migration）能力完整
  - 生态成熟，上手成本低
- 什么时候不适合：
  - 极致性能/极复杂 SQL：建议原生 SQL 或按需混用
  - 强类型优先、偏生成式开发：可对比 Prisma（作为选型讨论）

---

## 2. 核心概念速览

### 2.1 关键对象

- `Sequelize`：连接配置、连接池、日志、方言
- `Model`：表结构映射 + 查询能力（静态方法）
- Instance：表中一行数据的对象（实例方法、`toJSON()`）

### 2.2 常用配置

- `logging`：开发环境输出 SQL，生产可切换为结构化日志/慢查询
- `pool`：连接池参数
- `timezone` / `dialectOptions`：时区与驱动参数
- 模型层：`timestamps`、`paranoid`、`underscored`、`freezeTableName`

### 2.3 常用类型与陷阱

- `DataTypes.DATE`：时区、序列化
- `DataTypes.DECIMAL`：金额建议 DECIMAL，JS 侧注意字符串/精度
- `DataTypes.JSON`：不同数据库支持差异

---

## 3. 从 0 到 1：最小可运行示例

### 3.1 初始化连接

- 环境变量：`DB_HOST/DB_PORT/DB_USER/DB_PASS/DB_NAME`
- 连接池：最大连接数、空闲回收、超时
- 日志策略：dev 打印 SQL，prod 记录慢查询

### 3.2 定义模型（以 User 为例）

- 字段：`id`、`email`（唯一）、`nickname`、`status`、`createdAt/updatedAt`
- 约束：唯一键、非空、默认值
- 索引：按查询条件建立（如 `email`）

### 3.3 基础 CRUD

- `create`：创建记录
- `findOne`/`findByPk`：单条
- `findAll`：列表
- `update`：更新（注意返回值）
- `destroy`：删除（结合 `paranoid` 说明软删）
- 字段选择：`attributes`（只取需要字段）
- 返回形态：Instance vs `raw: true`（讲清楚序列化差异）

---

## 4. 查询能力进阶

### 4.1 条件查询与运算符

- `where` 基础
- `Op`：`Op.like`、`Op.in`、`Op.or`、`Op.between`、`Op.gt/gte/lt/lte`
- 模糊搜索与索引：`LIKE '%xxx%'` 的性能问题（引出搜索方案或前缀匹配）

### 4.2 分页

- `limit/offset`：简单易用，但 offset 大会慢
- 游标分页（概念讲解即可）：用 `id` 或时间字段做 cursor

### 4.3 排序、聚合与分组

- `order`：多字段排序
- `group` + `fn/col`：聚合统计
- 谨慎使用 `literal`（强调 SQL 注入风险与可维护性）

### 4.4 原生 SQL（混用策略）

- `sequelize.query()` 使用场景：复杂报表/窗口函数/方言特性
- 安全绑定：`replacements` / `bind`，避免字符串拼接

---

## 5. 关联关系

### 5.1 四类关联

- 一对一：`hasOne` / `belongsTo`
- 一对多：`hasMany` / `belongsTo`
- 多对多：`belongsToMany`（through 中间表）

### 5.2 关联定义关键参数

- `foreignKey`：外键字段名
- `as`：别名（避免同表多关联冲突）
- `through`：中间表配置
- `constraints`：是否启用外键约束

### 5.3 预加载 include 与 N+1

- `include`：一次查询拉取关联数据
- `required: true`：inner join 行为
- 嵌套 include：多层关联（谨慎，容易产生复杂 SQL）
- N+1 问题：什么是、怎么发现、怎么通过 include/批量查询解决

---

## 6. 事务与一致性

### 6.1 事务的正确姿势

- `sequelize.transaction(async (t) => { ... })`
- 所有查询都要传 `transaction: t`（最常见坑）

### 6.2 并发控制

- 悲观锁：`LOCK.UPDATE`（适合库存/余额等强一致）
- 乐观锁：版本号/更新时间校验（适合冲突概率较低场景）
- 隔离级别：按业务需求点到即可

---

## 7. Schema 管理：Migration & Seeder

- 为什么生产不要依赖 `sync({ alter: true })`：不可控、风险大
- Migration：`up/down`，新增字段、索引、约束
- Seeder：初始化数据/演示数据

---

## 8. 工程化最佳实践

### 8.1 分层与可维护性

- Model 只放结构与基础关系
- 业务访问建议抽 `repository/service`：聚合查询、事务边界、复用

### 8.2 错误处理

- 唯一键冲突、外键约束、not null 等错误映射成业务错误码
- 统一处理：避免把数据库错误直接透传给前端

### 8.3 日志与可观测性

- 记录慢查询与关键 SQL
- 链路追踪/错误上报（如 Sentry/APM）：把 SQL/耗时放进上下文（注意脱敏）

### 8.4 安全

- 参数化查询，避免 `literal` 拼接
- 敏感字段脱敏（手机号/邮箱/身份证等）

### 8.5 TypeScript（如果团队使用 TS）

- 模型类型推导：`InferAttributes` / `InferCreationAttributes`
- DTO/Entity 分离：避免把 ORM Instance 当作 API 返回类型

---

## 10. 结尾与 Q&A

- 总结：Sequelize 解决“高效组织数据访问”，但不替代数据库设计与性能优化
- 关联 include 避免 N+1
- 事务边界清晰、传递 `transaction`
- 生产用 migration 管理 schema
- 关键查询加索引、监控慢查询

---
