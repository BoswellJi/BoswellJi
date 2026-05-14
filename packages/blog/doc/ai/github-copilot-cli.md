# GitHub Copilot CLI

## GitHub Copilot CLI 是什么

GitHub Copilot CLI 是 GitHub Copilot 在终端里的命令行形态。你可以直接在 terminal 中用自然语言和它协作，让它帮助你完成以下事情：

- 理解代码：解释项目结构、梳理调用链、总结最近变更
- 编写和修改代码：生成文件、重构代码、补文档、补测试
- 调试问题：分析报错、定位失败原因、给出修复方案
- 操作 GitHub：查看 issue、处理 PR、创建分支和拉取请求
- 执行本地任务：运行 shell 命令、编辑文件、调用已配置的 MCP 工具

如果你已经习惯在 VS Code 里使用 Copilot Chat，那么 Copilot CLI 可以理解为“把 Copilot 的代理式能力带到了命令行里”。它的优势不是替代编辑器，而是在以下场景里特别顺手：

- 你本来就长期在 terminal 中工作
- 你要边看命令输出边迭代解决问题
- 你希望把 AI 能力接进脚本、自动化流程或远程环境
- 你需要同时使用本地仓库上下文和 GitHub 上的 issue、PR、Actions 信息

## 和旧版 gh copilot 的关系

GitHub 早期提供过基于 GitHub CLI 的 Copilot 扩展，常见命令是 `gh copilot suggest`、`gh copilot explain`。这套扩展现在已经不再维护，官方推荐迁移到新的 `copilot` 命令。

简单理解：

- 旧方案：更像是 GitHub CLI 的一个附加插件，偏“问一句，答一句”
- 新方案：是完整的 Copilot CLI，支持交互式代理、计划模式、工具调用、MCP 扩展、上下文压缩和模型切换

如果你现在开始使用，建议直接学习新的 `copilot` 命令，不需要再围绕旧版 `gh copilot` 建立工作流。

## 适用条件

官方文档显示，GitHub Copilot CLI 可用于所有 Copilot 计划，但如果你的 Copilot 权限来自组织或企业，还需要管理员没有禁用 CLI 相关策略。

当前支持的平台：

- Linux
- macOS
- Windows

Windows 场景下，优先推荐：

- PowerShell 7+
- 或 WSL（Windows Subsystem for Linux，Windows 下的 Linux 子系统）

如果你在传统 `cmd.exe` 里使用，体验通常不如 PowerShell 或 WSL 完整。

## 安装方式

### Windows 推荐安装

使用 WinGet：

```powershell
winget install GitHub.Copilot
```

如果你希望尝鲜预发布版本：

```powershell
winget install GitHub.Copilot.Prerelease
```

安装完成后，验证版本：

```powershell
copilot --version
```

### 跨平台安装

如果你的环境已经有 Node.js，也可以通过 npm 全局安装：

```bash
npm install -g @github/copilot
```

安装预发布版：

```bash
npm install -g @github/copilot@prerelease
```

macOS 或 Linux 还可以使用 Homebrew 或官方安装脚本，这里不展开，建议直接看官方安装文档。

## 首次启动与登录

直接启动：

```bash
copilot
```

首次进入通常会提示登录。最常见的方式是输入：

```text
/login
```

然后按界面提示完成 GitHub 账号认证。

### 使用 Token 登录

如果你在远程服务器、容器或 CI 类环境中工作，可以使用 Token 方式。官方说明里提到，使用 Fine-grained PAT 时需要开启 `Copilot Requests` 权限。

常见做法：

```powershell
$env:GH_TOKEN = 'your_token_here'
copilot
```

或者：

```bash
export GH_TOKEN=your_token_here
copilot
```

通常也可使用 `GITHUB_TOKEN`，但优先级低于 `GH_TOKEN`。

## 两种使用方式

GitHub Copilot CLI 主要有两种模式。

### 1. 交互式模式

直接执行：

```bash
copilot
```

进入交互界面后，你可以持续对话、多轮追问、让它查看文件、修改代码、执行命令。这个模式最适合日常开发。

典型示例：

```text
帮我解释这个仓库的目录结构
```

```text
分析 packages/react 下最近两次提交做了什么
```

```text
把 README 改写成更适合新人的版本
```

```text
帮我修复当前测试失败，但先给计划，不要直接改代码
```

### 2. 程序化模式

一次性执行单个任务后退出：

```bash
copilot -p "Show me this week's commits and summarize them"
```

这个模式适合：

- shell 脚本调用
- 自动化流水线
- 快速完成一次性查询或分析

如果你希望它在程序化模式下直接改文件或执行命令，通常还要配合工具授权参数使用，下面会单独说明。

## 交互界面里最值得掌握的能力

### 1. Ask/Execute 模式

这是默认模式。你提任务，Copilot 会根据需要阅读文件、提出修改建议、请求你批准执行命令或写文件。

适合：

- 代码问答
- 小范围改动
- 调试和验证

### 2. Plan 模式

官方文档提到，交互界面里可以切到 plan mode。这个模式会优先帮你拆任务、确认范围、列实施步骤，而不是立刻写代码。

它适合：

- 需求还没完全想清楚
- 改动会跨多个目录或多个子系统
- 你想先审计划再让它执行

复杂需求建议先走 Plan，再进入执行。

### 3. 在它思考时继续纠偏

Copilot CLI 支持在响应过程中追加消息，或者在拒绝工具权限时给出替代指令，这一点很实用。它不是“等一轮彻底结束后才能继续下一轮”，你可以像带一个工程助手一样实时纠偏。

例如：

```text
先不要跑测试，只分析失败原因
```

```text
不要改接口定义，只改调用方
```

```text
不要动根目录配置，限制在 packages/blog 下处理
```

## 常用命令与实用操作

下面这些命令和操作最值得优先掌握。

### 启动与帮助

```bash
copilot
copilot --help
copilot help
```

### 指定单次 Prompt

```bash
copilot -p "Summarize the latest changes in this repository"
```

### 切换模型

交互模式中使用：

```text
/model
```

程序化模式中使用：

```bash
copilot --model <model-name> -p "Explain this project"
```

官方文档当前说明，默认模型是 `Claude Sonnet 4.5`，可选模型列表会随着计划类型和 GitHub 配置变化而变化，通常也可以看到 `GPT-5` 等模型。

### 查看上下文占用

```text
/context
```

当你对话很长、任务很复杂时，这个命令能帮你判断上下文是否已经拥挤。

### 手动压缩上下文

```text
/compact
```

官方说明中提到，当上下文接近上限时，CLI 会自动压缩历史；但如果你已经知道当前话题结束了，主动 compact 通常更干净。

### 登录、反馈、实验功能

```text
/login
/feedback
/experimental
```

### MCP 与 LSP 状态

```text
/mcp
/lsp
```

`/mcp` 用来看已接入的 MCP 服务器，`/lsp` 用来看语言服务配置和状态。

## 最实用的 6 类使用场景

### 1. 理解陌生仓库

刚进入一个项目时，你可以直接问：

```text
先阅读当前仓库，告诉我目录结构、构建方式、主要模块以及我应该先看哪些文件
```

这类问题 Copilot CLI 非常擅长，因为它可以结合当前目录文件、Git 历史和项目配置一起回答。

### 2. 调试一个具体问题

例如：

```text
分析为什么 pnpm test 在 packages/react 下失败，先不要改代码，给出结论和修复方案
```

如果你愿意让它继续执行：

```text
现在按最小改动修复，并补上回归测试
```

### 3. 快速做一轮文档整理

例如：

```text
把这个 README 改写成适合新人的版本，要求补充安装、启动、目录说明和常见问题
```

这类工作非常适合放在 CLI 里做，因为它能边读文件边改文档。

### 4. 批量做本地工程任务

例如：

```text
找出仓库里所有没有被引用的图片资源，并给出删除建议，但先不要删除
```

```text
检查 packages/blog/doc 下所有 Markdown 链接是否失效，输出需要修复的列表
```

### 5. 处理 Git 与 GitHub 工作流

例如：

```text
列出我当前打开的 PR
```

```text
读取这个 issue 的内容，帮我在本地新建一个合适命名的分支并开始实现
```

```text
基于当前改动生成一份清晰的 commit message 和 PR 描述
```

### 6. 和脚本或自动化流程结合

例如：

```bash
copilot -p "Check the latest CI failures in this repo and summarize probable causes"
```

这种模式适合临时分析、日报生成、变更总结，甚至可以接入团队内部工具。

## 权限机制与安全边界

这是 Copilot CLI 最需要认真对待的部分。

因为它不是纯聊天工具，而是可以：

- 读取文件
- 修改文件
- 执行 shell 命令
- 调用 GitHub 或 MCP 工具

所以你要像管理一个“有执行能力的代理”一样使用它。

### 1. 信任目录

官方特别强调，不要在你不信任的目录中启动 Copilot CLI，也不要在包含敏感文件、机密信息、未知脚本的目录中随便运行。

一个很实用的原则是：

- 在具体项目根目录启动它
- 不要在家目录直接启动
- 不要在包含生产密钥、数据库导出文件的目录里直接跑高权限任务

### 2. 工具审批

当 Copilot 需要执行命令或修改文件时，通常会向你请求批准。这个默认行为是合理的，不建议一上来就全放开。

常见批准选项的含义可以理解为：

- 只批准这一次
- 本次会话内持续批准这个工具
- 拒绝并要求它换一种方式

### 3. 自动授权参数

如果你明确知道自己在做什么，可以在启动时加自动授权参数。

允许所有工具：

```bash
copilot --allow-all-tools
```

只允许特定工具：

```bash
copilot --allow-tool='write'
copilot --allow-tool='shell(git)'
copilot --allow-tool='shell(pnpm)'
```

禁止特定工具：

```bash
copilot --deny-tool='shell(rm)'
copilot --deny-tool='shell(git push)'
```

组合使用：

```bash
copilot --allow-all-tools --deny-tool='shell(rm)' --deny-tool='shell(git push)'
```

这里最重要的一点是：

如果你授权了某个工具，就不是只授权某一条命令文本，而是授权该类能力在当前规则下持续可用。比如你允许 `rm`，它就不只是能删一个文件。

### 4. 安全建议

如果任务比较激进，比如：

- 批量改文件
- 自动运行构建与部署脚本
- 会访问网络或第三方服务
- 会推送分支、创建 PR、关闭 issue

建议在以下环境里运行：

- 容器
- 虚拟机
- 权限隔离的开发环境
- 专门的测试仓库或镜像分支

## 实战工作流建议

下面是一套比较稳的用法。

### 工作流 1：先理解，再执行

```text
先解释这个项目的结构、构建流程和测试入口，不要修改任何文件
```

等它给出结论后，再继续：

```text
根据刚才的分析，给我一个最小可行修改方案
```

最后再进入执行：

```text
现在开始修改，只改 packages/blog，改完后运行对应校验
```

### 工作流 2：先计划，再落地

适合复杂任务：

```text
我要把这个模块拆成三层架构。先给计划、风险和迁移顺序，不要写代码
```

确认计划可行后，再逐步放权执行。

### 工作流 3：把限制说清楚

Copilot CLI 的效果高度依赖约束是否明确。下面这种提示词明显比“帮我修一下”更可靠：

```text
修复当前测试失败，限制在 packages/react 下处理；不要升级依赖；不要改公共 API；先说明根因，再修改代码并补测试
```

## Prompt 怎么写更有效

高质量提示词通常包含 4 个部分：

- 目标：你要它完成什么
- 范围：可以改哪里，不可以改哪里
- 约束：是否允许联网、是否允许跑命令、是否允许重构
- 验证：改完用什么方式证明结果有效

例如：

```text
在当前仓库里整理 packages/blog/doc/README.md 的模块顺序。
要求：
1. 只调整一级话题模块顺序，按首字母排序
2. 不修改模块内部条目内容
3. 如果 Books 下有二级模块，也按首字母排序
4. 改完检查 Markdown 结构是否正常
```

再比如：

```text
为当前 Node 项目的 README 补充一节“本地开发”。
要求：
1. 先读取 package.json 确认真实命令
2. 不编造脚本
3. 文风偏工程化、简洁
4. 改完后给出我最应该关注的两条使用说明
```

## 模型、额度与成本意识

官方文档提到，Copilot CLI 每提交一次 prompt，都会消耗 Copilot 请求额度；不同模型可能有不同倍率。对日常使用来说，有三个建议：

- 复杂任务先在脑中想清楚再发问，减少来回试探
- 长对话在阶段结束后及时 `/compact`
- 需要深度推理时再切更强模型，不要所有任务都默认高成本模型

如果你只是：

- 查项目结构
- 总结改动
- 改一段文档

默认模型通常已经够用。

## 自定义能力

Copilot CLI 不只是一个聊天壳，它还有一套逐渐完整的扩展能力。

### 1. 自定义指令

你可以为 CLI 提供自定义指令，告诉它：

- 当前仓库怎么构建
- 怎么测试
- 什么是团队代码风格
- 哪些目录不能碰

这非常适合团队内部约束和仓库级规范沉淀。

### 2. MCP 服务器

Copilot CLI 支持 MCP，可以把额外的数据源和工具接进来。典型用途包括：

- 查询内部文档
- 访问私有 API
- 连接任务系统
- 调用浏览器、数据库或其他自动化工具

如果你已经在编辑器或内部平台里使用 MCP，那么 CLI 是一个很自然的延展点。

### 3. LSP 语言服务

官方仓库 README 提到，Copilot CLI 支持配置 LSP，用于增强代码智能能力，例如：

- 跳转定义
- 悬停信息
- 诊断信息

但它不会内置所有语言服务器，你需要自行安装对应语言的 LSP，并通过配置文件接入。

常见配置位置：

- 用户级：`~/.copilot/lsp-config.json`
- 仓库级：`.github/lsp.json`

比如 TypeScript，可以安装：

```bash
npm install -g typescript-language-server
```

然后在 LSP 配置文件里声明命令与文件扩展名映射。

## 常见问题

### 1. `copilot` 命令找不到

通常是以下几种原因：

- 没安装成功
- 可执行目录没进 `PATH`
- PowerShell 终端没重开
- npm 全局安装目录未加入环境变量

先检查：

```powershell
Get-Command copilot
```

### 2. 登录成功但无法使用

优先排查：

- 当前账号是否有 Copilot 权限
- 组织是否禁用了 Copilot CLI
- Token 是否带了 `Copilot Requests` 权限
- 代理或网络是否拦截了请求

### 3. 它老想动不该动的文件

通常是因为你的约束不够明确，或者启动目录过大。解决办法：

- 在更小的项目目录下启动
- 明确写出允许变更的路径范围
- 不要直接开 `--allow-all-tools`
- 必要时用 `--deny-tool` 禁止高风险命令

### 4. 长对话越来越笨

这通常是上下文被污染了，而不是模型突然变差。解决办法：

- 用 `/compact`
- 开新会话
- 把新的任务描述得更完整，不要默认它“还记得全部细节”

## 一组可以直接拿来用的 Prompt 模板

### 仓库理解

```text
阅读当前仓库并总结：目录结构、技术栈、启动方式、测试方式、核心模块，以及我第一次接手时最应该先看的 5 个文件。
```

### 文档整理

```text
重写当前 README，使其更适合新人阅读。
要求：保留现有事实信息；补充安装、运行、目录说明、常见问题；不要编造命令；写完后自查链接和标题结构。
```

### Bug 排查

```text
分析当前报错的根因。
要求：先不要改代码；先读取相关文件并总结问题；然后给出最小改动修复方案；如果需要跑命令，先说明原因。
```

### 小范围改造

```text
在 packages/blog 下完成这项改动。
要求：
1. 不修改其他 package
2. 保持现有风格
3. 改完执行最小必要校验
4. 输出改动摘要和残留风险
```

### GitHub 协作

```text
读取这个 issue 的内容，给出实现方案，并在当前仓库创建一个合适命名的分支开始处理。不要推送，除非我确认。
```

## 我的使用建议

如果你是第一次用 GitHub Copilot CLI，可以按这个顺序上手：

1. 先学会 `copilot` 交互模式，不着急自动授权
2. 先让它做“解释、总结、计划”类低风险任务
3. 再逐步放开“改文件、跑测试、生成 PR”类任务
4. 大任务优先用计划模式，小任务直接交互执行
5. 始终把范围、限制和验证条件写清楚

一句话概括：Copilot CLI 最有价值的地方，不是把 shell 变成聊天窗口，而是把“理解代码、修改代码、运行验证、连接 GitHub 工作流”这些动作串成一个连续的命令行协作闭环。

## 参考链接

- 官方概念说明：https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli
- 官方安装文档：https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli
- 官方使用文档：https://docs.github.com/en/copilot/how-tos/use-copilot-agents/use-copilot-cli
- 官方仓库：https://github.com/github/copilot-cli

