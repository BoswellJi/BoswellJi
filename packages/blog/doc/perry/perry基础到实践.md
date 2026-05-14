---
navbar: false
sidebar: false
---

# Perry 基础到实践

## Perry 是什么

Perry 是一项 `TypeScript -> Native` 技术。它的目标不是把 TypeScript 先转成 JavaScript 再交给 Node.js、浏览器或 Electron 去运行，而是直接把 TypeScript 编译成原生可执行文件。

官方给它的核心定位可以概括成一句话：

> One codebase. Every platform. Native performance.

更具体一点说，Perry 想解决的是这类问题：

- 我想继续写 TypeScript，而不是切到 Swift、Kotlin、Rust、C# 或 Dart
- 我想做的不是仅仅是 Web 页面，而是真正的原生应用
- 我不想引入 Node.js、Electron、WebView、Hermes 或其他运行时包袱
- 我希望一套代码可以覆盖桌面端、移动端，甚至 Web / WASM

如果你以前接触过这些技术，可以先这样理解 Perry：

- 它不像 Electron：不是浏览器壳，不跑 Chromium
- 它不像 React Native：不是 JS 运行时加桥接层
- 它不像 Flutter：不是自绘渲染引擎，也不是 Dart 生态
- 它也不像 Tauri：不是“前端页面 + Rust 宿主”的双层模型

Perry 更接近“把 TypeScript 当成原生应用开发语言”这件事本身。

## 它和常见跨平台方案有什么不同

Perry 最值得注意的几个点是：

### 1. 没有运行时包袱

Perry 的核心卖点之一是 `no runtime`。默认情况下，它直接输出独立原生二进制：

- 不依赖 Node.js
- 不依赖浏览器内核
- 不依赖 JVM
- 不依赖 Electron

这意味着它在启动速度、包体积和部署模型上都更接近传统原生程序，而不是“把 Web 技术包装一下”。

### 2. 写的还是 TypeScript

Perry 并没有发明一种新语言，而是尽量让你继续使用熟悉的 TypeScript 语法和生态心智，包括：

- class
- generics
- async / await
- interface / union type
- 常见 Node 风格 API，如 `fs`、`path`、`crypto`、`Buffer`

对前端或 Node 开发者来说，这个切换成本比学习一门全新语言低得多。

### 3. UI 走原生控件路线

Perry 的 GUI 不是 HTML/CSS，也不是 WebView，而是直接编译到原生 UI 框架：

- macOS: AppKit
- iOS / iPadOS: UIKit
- Android: Views
- Linux: GTK4
- Windows: Win32
- watchOS / tvOS: SwiftUI / Widget 相关能力

所以它要的不是“跨平台长得一样”，而是“跨平台但仍然是原生应用”。

### 4. 一套代码，多目标输出

Perry 不只支持桌面端，还支持：

- macOS
- iOS
- Android
- Linux
- Windows
- watchOS
- tvOS
- Web
- WASM

## Perry 的工作方式

Perry 的编译链路大致是：

1. 使用 `SWC` 解析 TypeScript
2. 降到 Perry 自己的中间表示
3. 做类型相关和优化相关的变换
4. 使用 `LLVM` 生成原生机器码
5. 链接成最终可执行文件

所以它本质上是一个用 Rust 写的 AOT 编译器。

这也是它为什么会特别强调这些能力：

- 原生性能
- 小体积二进制
- 无需预热
- 可做编译期优化


## 安装 Perry

目前最通用的安装方式是 npm：

```bash
npm install @perryts/perry
```

### 环境要求

Perry 需要系统级工具链，因此不同平台还要准备基础工具链：

- macOS: Xcode Command Line Tools
- Linux: GCC 或 Clang
- Windows: MSVC / Visual Studio Build Tools

安装后先执行：

```bash
perry doctor
```

这个命令可以先帮你检查本地环境是否满足要求。

## 最小上手

### 1. 初始化项目

```bash
perry init hello-perry
cd hello-perry
```

### 2. 编译一个最小程序

创建 `src/main.ts`：

```ts
const greeting = 'Hello Perry'
console.log(greeting)
```

编译：

```bash
perry compile src/main.ts -o hello-perry
```

运行：

```bash
./hello-perry
```

如果你只是想快速试：

```bash
perry run .
```

### 3. 检查兼容性

在正式编译前，可以先检查当前代码是否适合 Perry：

```bash
perry check src/
```

这个命令很实用，因为 Perry 虽然支持很多 TypeScript 特性，但毕竟不是 Node.js 本体，也不是浏览器，所以先检查会比直接编译更稳。

## 写一个原生 CLI

一个简单的文件扫描器，统计某目录下的文件数和总大小。

```ts
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

function walk(dir: string): { files: number; bytes: number } {
	let files = 0
	let bytes = 0

	for (const name of readdirSync(dir)) {
		const fullPath = join(dir, name)
		const stat = statSync(fullPath)

		if ((stat as any).isDirectory?.()) {
			const nested = walk(fullPath)
			files += nested.files
			bytes += nested.bytes
		} else {
			files += 1
			bytes += (stat as any).size
		}
	}

	return { files, bytes }
}

const target = process.argv[2] || '.'
const result = walk(target)

console.log(`Directory: ${target}`)
console.log(`Files: ${result.files}`)
console.log(`Bytes: ${result.bytes}`)
```

编译并运行：

```bash
perry compile src/main.ts -o scanner
./scanner .
```

## 写一个原生 UI 程序

官方文档里的 UI 风格更接近 SwiftUI：通过布局容器和组件组合界面，而不是写 HTML + CSS。


```ts
import { App, VStack, HStack, Text, Button, Spacer } from 'perry/ui'

const header = HStack(8, [Text('Perry Demo'), Spacer(), Button('New', () => {})])
const body = VStack(16, [header, Text('Hello from native TypeScript')])

App({
	title: 'Perry Demo',
	width: 800,
	height: 500,
	body,
})
```


## Perry React 是什么

如果你不想直接写 `perry/ui` 风格的 API，Perry 生态里还有一个 `react` 仓库，提供 React 兼容渲染能力。

也就是说，你可以继续写 React 组件，然后让它编译到 Perry 的原生控件层，而不是 DOM。

这个方向很值得关注，因为它解决的是很多前端开发者的真实阻力：

- 我会 TypeScript
- 我会 React
- 但我不想为跨平台原生应用再学一套完全不同的 UI 编程模型

如果 Perry React 后续成熟，它会是 Perry 真正破圈的关键点之一。

## Perry 不是只能写 GUI

Perry 还给了一个很有意思的例子：直接用 `fastify` 风格写一个 API 服务，再编成原生程序运行。

这说明 Perry 的目标不是“只做 App”，而是更广义地把 TypeScript 编译到原生执行环境。

例如可以有这样的项目结构：

```text
my-api/
├── package.json
├── src/
│   ├── main.ts
│   ├── config.ts
│   └── routes/
│       └── users.ts
```

然后直接：

```bash
perry compile src/main.ts -o my-api
./my-api
```

## npm 生态怎么处理

这是 Perry 最关键的问题之一。

因为你只要说“我支持 TypeScript”，别人下一句一定会问：

> 那 npm 包能不能用？

Perry 的答案不是简单的“全支持”或“全不支持”，而是分层处理：

### 1. 内建原生实现

官方已经给一批常见能力做了原生实现，例如：

- `fastify`
- `axios`
- `mysql2`
- `pg`
- `ioredis`
- `dotenv`
- `uuid`
- `jsonwebtoken`

这意味着你导入这些常见包时，背后不一定是 Node.js 在跑，而可能是 Perry 自己的原生实现。

### 2. 可选 JS 运行时

如果你确实要用纯 JS npm 包，Perry 还支持通过参数开启可选 JS runtime：

```bash
perry compile src/main.ts --enable-js-runtime -o myapp
```

这样会引入额外体积，但能换来更多 npm 兼容性。

### 3. 编译部分纯 JS 包为原生

Perry 还支持通过 `package.json` 配置，把部分纯计算型 npm 包直接编译成原生，而不是交给 JS runtime：

```json
{
	"perry": {
		"compilePackages": [
			"@noble/curves",
			"@noble/hashes",
			"superstruct"
		]
	}
}
```

这比“要么全原生，要么全 JS 运行时”更务实。

## Perry 支持哪些能力

### 语言层

支持的 TypeScript / JS 能力包括：

- class / inheritance / private fields
- generics
- async / await
- generators
- destructuring
- decorators
- BigInt
- ES modules

### 标准库层

支持的常见 API 包括：

- `console`
- `fs`
- `path`
- `process`
- `JSON`
- `Math`
- `Date`
- `crypto`
- `os`
- `Buffer`
- `child_process`
- `Map` / `Set`
- `setTimeout` / `setInterval`

### 平台层

还包括：

- 原生 UI
- 多线程
- i18n
- 插件系统
- UI 自动化测试

在逐渐形成完整平台能力。


## 参考链接

- 官网：https://www.perryts.com/
- 仓库：https://github.com/PerryTS/perry
