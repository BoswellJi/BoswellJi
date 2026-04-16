---
name: matrix
description: Matrix项目管理系统，基于Matrix（matrix.17usoft.com）对项目迭代、需求、任务与缺陷进行管理。
metadata:
  publish: "true"
  version: 0.0.1
---

# Matrix 技能

## 概述

  Matrix项目管理系统，登录同程 Matrix（matrix.17usoft.com）调用任务/项目相关 API。
  
  子命令按功能域大致为：项目 → 需求 → 任务 → 缺陷；
  
  另含状态枚举与当前用户。
  
  完整列表（按序）：
  queryMatrixProjects、
  createMatrixProject、   
  queryMatrixProjectSprints、
  createMatrixSprint、
  queryMatrixItemsStatus、
  queryMatrixProjectRequirements、
  queryMatrixTasks、
  createMatrixTask、
  createMatrixBug、
  queryMatrixBugs、
  updateMatrixBugStatus、
  getLoginUser

 [安装/更新手册](https://wiki.17u.cn/wiki?fid=7c75390b0fe34c929bc64ad00ba89580 "安装/更新手册")


## 使用手册

通过直接执行 `matrix` 脚本进行操作，无需依赖 npm：

```bash
matrix [--verbose] -- <子命令> [--参数=值 ...]

```

或项目根目录下：`./bin/matrix [--verbose] -- <子命令>`。未带子命令或参数错误时脚本会提示用法。

- **--verbose / -v**：开启调试输出。仅在此模式下会打印「data.result 简化结果」及每条记录的 id/name/projectName 等；同时打印本次命令中所有 fetch 的请求 url 与 body。默认关闭。

### 认证

- 首次运行会启动 Chrome 并打开 Matrix 登录页；登录后从 Cookie 解析 `access_token` 并写入本地缓存（7 天有效）。
- 之后优先使用缓存；若校验失败则清除缓存并重新走浏览器登录。
- 接口返回 `code=0000` 表示成功，其他为失败。

### 子命令与参数

功能顺序：**项目 → 状态枚举 → 需求 → 任务 → 缺陷**；`getLoginUser` 为辅助。

| 子命令 | 说明 | 常用参数 |
|--------|------|----------|
| **项目** | | |
| queryMatrixProjects | 查询有权限的项目列表 | `--page=1` `--pageSize=15` `--projectName=名称` `--ids=2884` 或 `--ids=1,2,3` |
| createMatrixProject | 创建 Matrix 项目 | `--projectName=项目名称`（必填） |
| queryMatrixProjectSprints | 查询项目迭代列表 | `--page=1` `--pageSize=15` `--projectId=` `--sprintName=` `--statusCondition=0,1`（数值或状态名，逗号分隔） |
| createMatrixSprint | 创建 Matrix 迭代 | `--sprintName=迭代名称`、`--projectId=项目id`（必填），`--beginTime=开始时间`（可选） |
| **枚举** | | |
| queryMatrixItemsStatus | 查询需求/任务/缺陷状态码与类型枚举 | 无参数 |
| **需求** | | |
| queryMatrixProjectRequirements | 项目内/迭代内需求列表查询 | `--projectId=`（必填，数字或项目名），`--page=1`、`--pageSize=10`，`--sIds`（数字或迭代名），`--requireName`、`--id`、`--creator`、`--priority`、`--demander`、`--proposer`、`--rpType` 等 |
| **任务** | | |
| queryMatrixTasks | 任务多维度查询 | `--page=1`、`--pageSize=10`；`--projectIds`、`--sIds`、`--statusCondition=0,1` 支持逗号分隔数组（数字原样，字符串按名称解析，statusCondition 含 0）；`--processor`/`--creator`/`--rd`/`--qa`、`--type` 及时间范围等 |
| createMatrixTask | 创建任务/拆分任务 | `--taskName`（必填）；`--projectId` 必填（数字或项目名）；`--requirementId`、`--sprintId` 可选（数字或名称）；`--type` 默认开发任务；`--priority` 默认中；`--ifTest`、`--expectRdHours`、时间参数可选 |
| **缺陷** | | |
| createMatrixBug | 创建缺陷 | `--bugName`、`--assigner=姓名-工号`、`--completionTime=yyyy-MM-dd HH:mm:ss`、`--sprintId`（必填；数字直接用；字符串须与 `queryMatrixProjectSprints` 的 **sprintName 精确一致**，否则报错）；`--projectId` 必填（数字直接使用；字符串须与 `queryMatrixProjects` 的 **projectName 精确一致**，否则报错）；`--requirementId` 可选；`--description` 可选（未传则用接口默认模板）；`--type`（`bugType`）、`--level`（`bugLevel`）、`--priority`（`bugPriority`）可选 |
| queryMatrixBugs | 仅「与我相关」的缺陷查询 | getLoginUser 取「姓名-工号」，依次按 assigner/creator/owner 三维度各查一页；可选 `--assigner` / `--creator` / `--owner` 覆盖对应维度查询人（逗号分隔多人时**须含本人**）；不可关闭「与我相关」；`--bugName`、`--bSolvers`、`--projectIds`、`--sIds`、`--statusCondition`、`--levels`、`--priority` 及时间范围等 |
| updateMatrixBugStatus | 缺陷状态变更（修复/验证/关闭等） | `--status=`（必填，码或 `bugStatus` 状态名）、`--assigner=`（必填，下一阶段处理人 姓名-工号）、`--bugId=`（可选；未传时按 `queryMatrixBugs` 规则列出与我相关缺陷后退出，需带上 id 再执行） |
| **辅助** | | |
| getLoginUser | 获取当前登录用户信息 | 无参数 |

**数组与名称解析**：`projectIds`、`sIds`、`statusCondition` 等支持逗号分隔；纯数字（含 0）直接作为数值，含非数字时按名称通过 matrix-api 的 resolve 方法解析（如项目名→projectId、迭代名→sprintId、状态名→code）。sIds 为名称时需同时指定 projectIds。

### 各子命令使用场景和参数中文含义

顺序与上表一致：**项目 → 枚举 → 需求 → 任务 → 缺陷 → 辅助**。

- **queryMatrixProjects**（查询有权限的项目列表）
  - `page`：页码，默认 1
  - `pageSize`：每页条数，默认 15
  - `projectName`：项目名称（模糊筛选）
  - `ids`：项目 id 列表，逗号或 JSON 数组，如 `2884` 或 `1,2,3`

- **createMatrixProject**（创建 Matrix 项目）
  - `projectName`：项目名称（必填）

- **queryMatrixProjectSprints**（查询项目迭代列表）
  - `page`：页码，默认 1
  - `pageSize`：每页条数，默认 15
  - `projectId`：项目 id 或项目名称（必填时用于按项目查迭代）
  - `sprintName`：迭代名称（模糊筛选）
  - `statusCondition`：迭代状态码或状态名，逗号分隔，如 `0,1` 或状态名

- **createMatrixSprint**（创建 Matrix 迭代）
  - `sprintName`：迭代名称（必填）
  - `projectId`：所属项目 id 或项目名称（必填）
  - `beginTime`：迭代开始时间（可选）

- **queryMatrixItemsStatus**（查询需求/任务/缺陷状态码与类型枚举）
  - 无参数

- **queryMatrixProjectRequirements**（项目内/迭代内需求列表查询）
  - `projectId`：项目 id 或项目名称（必填）
  - `page`：页码，默认 1
  - `pageSize`：每页条数，默认 10
  - `sIds`：迭代 id 或迭代名，逗号分隔（可选）
  - `requireName`：需求名称（模糊筛选）
  - `id`：需求 id（精确）
  - `creator`：创建人，姓名-工号
  - `priority`：需求优先级，数字或优先级名
  - `demander`：需求方，姓名-工号
  - `proposer`：提出人，姓名-工号
  - `rpType`：需求类型，数字或类型名

- **queryMatrixTasks**（任务多维度查询）
  - `page`：页码，默认 1
  - `pageSize`：每页条数，默认 10
  - `processor`：处理人，姓名-工号（待我处理）
  - `creator`：创建人，姓名-工号
  - `rd`：研发负责人，姓名-工号
  - `qa`：测试负责人，姓名-工号
  - `projectIds`：项目 id 或项目名，逗号分隔
  - `sIds`：迭代 id 或迭代名，逗号分隔（为名称时需同时传 projectIds）
  - `statusCondition`：任务状态码或状态名，逗号分隔，如 `0,1`
  - `type`：任务类型，数字或类型名
  - `cCreateTimeS` / `cCreateTimeE`：创建时间起/止
  - `cExpectFinishTimeS` / `cExpectFinishTimeE`：计划完成时间起/止
  - `cExpectQaEndTimeS` / `cExpectQaEndTimeE`：计划测试完成时间起/止
  - `cRealEndTimeS` / `cRealEndTimeE`：实际完成时间起/止
  - `cTestEndTimeS` / `cTestEndTimeE`：测试完成时间起/止
  - `cExpectDeployTimeS` / `cExpectDeployTimeE`：计划上线时间起/止
  - `cRealDeployTimeS` / `cRealDeployTimeE`：实际上线时间起/止

- **createMatrixTask**（创建任务/拆分任务）
  - `projectId`：所属项目 id 或项目名称（必填）
  - `taskName`：任务名称（必填）
  - `requirementId`：所属需求 id 或需求名称（可选）
  - `type`：任务类型，数字或类型名，默认「开发任务」
  - `sprintId`：所属迭代 id 或迭代名称（可选）
  - `expectBeginTime`：计划开始时间（可选）
  - `expectEndTime`：计划结束时间（可选）
  - `priority`：优先级，数字或优先级名，默认「中」
  - `ifTest`：是否测试任务，0/1（可选）
  - `expectRdHours`：预计研发工时（可选）

- **createMatrixBug**（创建缺陷，POST `/api/bug/create`）
  - `projectId`：所属项目 id（数字直接使用）或项目名称（必填；字符串时通过 `queryMatrixProjects` 对应接口按 **projectName 精确匹配**，不存在或不唯一则报错）
  - `bugName`：缺陷名称（必填）
  - `assigner`：缺陷处理人，格式：姓名-工号（必填）
  - `completionTime`：期望修复时间，格式：`yyyy-MM-dd HH:mm:ss`（必填）
  - `sprintId`：所属迭代 id（数字直接使用）或迭代名称（必填；字符串时通过 `queryMatrixProjectSprints` 按 **sprintName 精确匹配**，不存在或不唯一则报错）
  - `description`：缺陷描述 HTML（可选；未传时使用默认模板：相关模块/重现步骤/预期结果等占位）
  - `type`：缺陷类型，数字或类型名（可选；名称通过 `queryMatrixItemsStatus` / custom-status 的 `bugType` 解析）
  - `level`：严重程度，数字或等级名如 P0–P4（可选；对应 `bugLevel`）
  - `priority`：优先级，数字或高中低等（可选；对应 `bugPriority`）
  - `requirementId`：关联需求 id 或需求名称（可选）

- **queryMatrixBugs**（仅与当前登录用户相关的缺陷，POST `/api/bug/selectAllBugWithPage/:page/:pageSize`）
  - 行为固定：通过 getLoginUser 取「姓名-工号」（工号优先 `userInfo.newWorkId`，无则 `workId`），依次查询（1）待我处理 `assigner`（2）我创建 `creator`（3）我负责 `owner`，各使用同一分页与其它筛选条件；可选 `--assigner` / `--creator` / `--owner` 覆盖**对应维度**的接口人字段（格式同接口，逗号分隔多人），且**必须包含当前登录用户「姓名-工号」**，否则报错；未传的维度仍用本人；**不支持**关闭「与我相关」（勿传 `--relatedToMe=0`）
  - `page`：页码，默认 1
  - `pageSize`：每页条数，默认 20
  - `bugName`：缺陷名称（模糊）
  - `bSolvers`：解决人，多个为逗号分隔的「姓名-工号」
  - `projectIds`：项目 id 或项目名，逗号分隔（字符串走项目解析，不唯一则报错）
  - `sIds`：迭代 id 或迭代名，逗号分隔（名称为字符串时需同时传 `projectIds`）
  - `statusCondition`：缺陷状态码或状态名（`bugStatus`），逗号分隔
  - `levels`：严重程度，码或 P0–P4 等名（`bugLevel`），逗号分隔
  - `priority`：优先级，码或高中低等（`bugPriority`）
  - `startCreateTime` / `endCreateTime`：创建时间范围（`yyyy-MM-dd 00:00:00` / `yyyy-MM-dd 23:59:59`）
  - `startCompletionTime` / `endCompletionTime`：计划完成时间范围
  - `startWaitVerificationTime`：待验证时间（接口字段名如上）
  - `startRealResolveTime`：实际完成/修复时间（接口字段名如上）

- **updateMatrixBugStatus**（缺陷状态变更，PUT `/api/bug/{bugId}/statusChange`）
  - `status`：目标缺陷状态，**必填**；非负整数直接作为枚举码，否则按 `queryMatrixItemsStatus` / custom-status 的 `bugStatus` 名称解析（修复、待验证、关闭等均对应各自码值）
  - `assigner`：缺陷下一阶段处理人，**必填**，格式：姓名-工号
  - `bugId`：缺陷 id，可选；**未传**时脚本会按与 `queryMatrixBugs` 相同的「与我相关」规则（三维度均为当前登录用户、合并去重）列出候选并提示带上 `--bugId` 再执行；列出时可配合与 `queryMatrixBugs` 相同的筛选参数（如 `--page`、`--bugName`、`--projectIds` 等）；**未传 bugId 时 `--assigner` 不参与列表筛选**（仅在你带上 `--bugId` 调用 PUT 时作为下一阶段处理人；与 `queryMatrixBugs` 的 `--assigner` 同名故列表阶段刻意忽略，避免歧义）

- **getLoginUser**（获取当前登录用户信息）
  - 无参数

完整参数见各子命令脚本；公用 API 与 resolve 见 `scripts/matrix-api.ts`，参数解析公用见 `scripts/parse-arg.ts`；入口与 CDP 见 `scripts/matrix.ts`，token 缓存见 `scripts/access-token.ts`；缺陷查询见 `scripts/query-matrix-bugs.ts`；缺陷状态变更见 `scripts/update-matrix-bug-status.ts`。

### 注意

- `--ids=[2884]` 在 zsh 下需加引号：`"--ids=[2884]"`，或直接写 `--ids=2884`。
- `--statusCondition=0,1` 等为数值时直接传整型；与项目名/迭代名/状态名混用时字符串会按名称解析。
- 需 Node 22+（内置 WebSocket）。可选环境变量：`CHROME_PATH`、`CHROME_USER_DATA_DIR`、`USE_EXISTING_CHROME=1`、`DEBUG_COOKIE=1`。

## 使用场景

顺序：**项目 → 迭代 → 需求 → 任务 → 缺陷**。

### 1. 基于项目名称查询我的项目列表

```
  matrix -- queryMatrixProjects --page=1 --pageSize=15 --projectName=项目名称关键字
```

### 2. 基于状态查询项目下迭代列表

```
  matrix -- queryMatrixProjectSprints --page=1 --pageSize=15 --projectId=4285  --sprintName=迭代 --statusCondition=1,2
  matrix -- queryMatrixProjectSprints --page=1 --pageSize=15 --projectId=matrix赵玲测试项目  --sprintName=迭代 --statusCondition=进行中,已完成
```

### 3. 查询项目下某个迭代下的包含某个关键词的需求列表

```
matrix -- queryMatrixProjectRequirements --projectId=精确项目名称 --sIds=迭代名 --requireName=需求名关键字
matrix -- queryMatrixProjectRequirements --projectId=精确项目id --sIds=迭代id --requireName=需求名关键字
```

### 4. 基于项目和迭代的查询创建时间区间内的待我开发的新建或开发中状态的任务

```
matrix -- queryMatrixTasks --page=1 --pageSize=10 --projectIds=项目id1，项目id2 --rd=姓名-工号 --sIds=迭代id --statusCondition=0,1 --cCreateTimeS="2026-03-10 00:00:00" --cCreateTimeE="2026-03-11 00:00:00"

matrix -- queryMatrixTasks --page=1 --pageSize=10 --projectIds=项目名称1，项目名称2 --rd=姓名-工号 --sIds=迭代1 --statusCondition=新建,开发中 --cCreateTimeS="2026-03-10 00:00:00" --cCreateTimeE="2026-03-11 00:00:00" --verbose
```

### 5. 查询与我相关的缺陷（待我处理 / 我创建 / 我负责，可叠加筛选）

先看缺陷状态码与类型名，再按项目、迭代、状态、时间等筛选「与我相关」列表：

```
matrix -- queryMatrixBugs --page=1 --pageSize=20 --projectIds=项目名或id --sIds=迭代名或id --statusCondition=待修复,待验证 --bugName=关键字
```

### 6. 新建缺陷并指派处理人与期望修复时间

项目名称、迭代名称须与各查询接口中的名称**完全一致**（或通过 id 传入）：

```
matrix -- createMatrixBug --projectId=精确项目名称 --sprintId=精确迭代名称 --bugName=缺陷标题 --assigner=姓名-工号 --completionTime="2026-04-15 18:00:00"
```

可选关联需求、严重程度、优先级等：`--requirementId=` `--level=` `--priority=` `--type=` `--description=`。

### 7. 缺陷流转（状态修改）

未带 `--bugId` 时脚本会按「与我相关」列出候选缺陷，便于复制 id；带上 id 与目标状态、下一阶段处理人执行变更：

```
matrix -- updateMatrixBugStatus --bugId=12345 --status=待验证 --assigner=下一处理人-工号
```

若需先缩小列表，可与 `queryMatrixBugs` 相同条件配合 `--page`  `--bugName`  `--projectIds` 等（见 `updateMatrixBugStatus` 说明）。
