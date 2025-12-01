## 你想要买一本关于angular内部机制的书吗？

> 原文：[Would you buy a book on Angular internals?](https://blog.angularindepth.com/would-you-buy-a-book-on-angular-change-detection-8239a8ef64b7) 作者：Max Koretskyi 原技术博文由 Max Koretskyi 撰写发布，他目前于 ag-Grid 担任开发大使(Developer Advocate) 译者：google翻译 整理：Boswell 

在过去的6个月里，我花了大部分的空闲时间对Angular进行逆向工程并撰写相关文章。我探索不同的主题，如调试Angular应用程序，ExpressionChangedAfterItHasBeenCheckedError错误的原因，什么是forwardRef和组件装饰器等。但我花费大部分时间的主题是@angular/core包的一部分-  视图，DI，编译器和变更检测（CD）。到目前为止，我的大多数文章都关注变化检测。这是一个引人入胜的机制，实际上是框架中第二个最重要的部分（在编译器之后），它完成框架中的大部分“可见”工作 - DOM更新，子组件的输入属性更新和查询列表更新。以下是我关于更改检测的一些博客帖子，这些帖子在google结果的前5位，具体取决于查询的措辞：

- 您需要了解的有关Angular中的更改检测的所有信息
- Angular的$ digest在较新版本的Angular中重生
- Angular中DOM更新的机制
- Angular中的属性绑定机制更新
我也是一个stackoverflow用户，我看到的大多数非平凡问题都与CD和DI有关。许多问题也与动态组件有关，要理解该主题，掌握视图是很重要的。网上有很多文章提供了这些主题的高级概述，但是他们没有深入了解这些机制的内部工作原理。而且我觉得需要以易于理解和使用的结构方式提供的那种信息。

所以我一直在考虑编写一本关于Angular内部的综合性书籍，它将深入解释编译器，视图，DI和CD机制如何在幕后工作。我还将讨论Zones，特别是NgZone，并展示它在变化检测机制中扮演的角色。它还将包含一些实际示例，说明在调试或处理优化时，底层实现的知识可能有何帮助。这本书将长约150-200页，并将有大量的图表，以方便理解材料。

这是 我到目前为止提出的粗略目录：
- 查看编译器
- 组件工厂（视图定义）
- 组件视图（查看数据）
- 模块工厂
- 主机和嵌入式视图
- 组件树的内部表示
- 模块编译器
- 模块工厂
- 依赖注入
- 模块和组件注入器
- 静态注射器
- 改变检测
- DOM更新（插值）
- 子组件和DOM元素绑定更新
- 查询列表更新（ViewChildren和ContentChildren）
- 管道加工
- 区域的作用
- 组件的内部表示（Angular视图）
- 现实世界的例子：
- 避免混淆和意外结果
- 利用这些知识设计出有效的应用程序
- 如果您认为缺少重要的东西，请告诉我！