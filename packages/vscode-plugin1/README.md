# json2tscopy

`json2tscopy` 是一个 VS Code 扩展，用来把 JSON 快速转换成 TypeScript `interface` 定义，并直接插入到当前编辑器中。

当前扩展提供两种能力：

- 把剪贴板里的 JSON 转成 TypeScript 接口
- 读取一个 REST 接口返回的 JSON，再转成 TypeScript 接口

## 功能说明

### 1. 剪贴板 JSON 转 TypeScript

命令：`将剪贴板中的 JSON 转换为 TypeScript 接口`

快捷键：`Ctrl + Alt + V`

使用场景：

- 你已经复制了一段 JSON
- 想快速生成对应的 TypeScript 接口定义
- 想直接把结果插入到当前文件里

### 2. REST 接口结果转 TypeScript

命令：`将 REST 接口返回的 JSON 转换为 TypeScript 接口`

快捷键：`Ctrl + Alt + X`

使用场景：

- 你手里有一个返回 JSON 的接口地址
- 想直接根据接口返回结果生成 TypeScript 接口

## 安装与运行

### 开发环境运行

进入当前目录后执行：

```bash
pnpm install
pnpm run compile
```

然后在 VS Code 中打开该目录，按 `F5` 启动 Extension Development Host 进行调试。

### 构建

```bash
pnpm run compile
```

编译输出入口为：

- `out/extension.js`

## 使用方法

### 方式一：从剪贴板转换 JSON

1. 复制一段合法 JSON，例如：

```json
{
	"id": 1,
	"name": "Boswell",
	"active": true,
	"tags": ["ts", "vscode"],
	"profile": {
		"age": 18,
		"city": "Suzhou"
	}
}
```

2. 打开一个 TypeScript 文件
3. 将光标放到你希望插入接口的位置
4. 执行命令：`将剪贴板中的 JSON 转换为 TypeScript 接口`
5. 扩展会把生成结果插入到当前光标所在行的行尾

示例输出：

```ts
export interface Profile {
	age: number;
	city: string;
}

export interface RootObject {
	id: number;
	name: string;
	active: boolean;
	tags: string[];
	profile: Profile;
}
```

### 方式二：从 REST 接口生成 TypeScript

推荐做法：

1. 先把接口地址复制到剪贴板，例如：`https://example.com/api/user`
2. 打开一个 TypeScript 文件
3. 把光标放到目标插入位置
4. 执行命令：`将 REST 接口返回的 JSON 转换为 TypeScript 接口`
5. 扩展会请求该地址，并把返回的 JSON 转成接口定义后插入编辑器

## 命令列表

| 命令 ID | 命令标题 | 快捷键 |
| --- | --- | --- |
| `convert.json2ts` | 将剪贴板中的 JSON 转换为 TypeScript 接口 | `Ctrl + Alt + V` |
| `rest.json2ts` | 将 REST 接口返回的 JSON 转换为 TypeScript 接口 | `Ctrl + Alt + X` |

## 转换规则

当前实现的大致规则如下：

- 普通对象会转换成独立的 `interface`
- 顶层对象默认命名为 `RootObject`
- 字符串转换为 `string`
- 数字转换为 `number`
- 布尔值转换为 `boolean`
- 对象数组会根据第一个元素生成子接口
- 基础类型数组会转换成 `string[]`、`number[]`、`boolean[]`
- 空值或无法明确识别的字段会降级为 `any`，并标记为可选字段 `?:`
- 复数对象名会尝试转成单数，例如 `users` -> `User`、`categories` -> `Category`

## 输出位置说明

生成结果会插入到当前活动编辑器中，并且插入点是：

- 当前选中行
- 该行末尾位置

这意味着它不是“替换当前选区”，而是“在当前行尾部追加内容”。使用前建议把光标放到一个空白行，避免和现有代码粘在一起。

## 已知限制

当前版本比较轻量，使用时需要注意这些限制：

- REST 转换更适合“剪贴板里已经有 URL”的场景
- 若接口返回的不是合法 JSON，会直接报错
- 对数组对象的推断基于第一个元素，不能覆盖所有变体结构
- 复杂联合类型不会被精确推断，可能退化为 `any`
- 结果命名规则比较简单，生成的接口名可能还需要手动调整
- 插入位置是当前行尾，不会自动帮你整理格式

## 常见问题

### 1. 为什么提示 `Clipboard has no valid JSON content.`

说明剪贴板里的内容不是合法 JSON。请先确认复制的是完整 JSON，而不是 JavaScript 对象字面量、注释内容或不完整片段。

### 2. 为什么提示 `REST-Service has no valid JSON result.`

说明接口返回的不是 JSON，或者接口请求失败后返回了 HTML、文本、鉴权页等内容。

### 3. 为什么执行后没有插入到预期位置

因为扩展会把结果插入到当前光标所在行的末尾。建议先新建一个空白区域，再执行命令。

## 适用场景

这个扩展适合这些场景：

- 根据后端返回结果快速补齐前端类型定义
- 调试接口时快速生成临时 `interface`
- 在写 DTO、Mock 类型、接口响应类型时提升效率

如果你需要更复杂的能力，比如自定义根接口名、联合类型推断、批量转换或格式化输出，当前版本还需要继续增强。
