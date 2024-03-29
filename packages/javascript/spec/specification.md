#! https://zhuanlan.zhihu.com/p/383289991
## 1 范围

## 2 一致性

- 规范中的类型，值，对象，属性，函数，程序语法和语义都需要被实现；

## 3 引用标准

## 4 概述

- 网页脚本
- 宿主和实现

## 5 符号约定

- 句法和词法语法
- 算法约定
  - 运行时语义
    - 必须在运行时调用的语义的算法称为运行时语义；

## 6-10 执行环境(虚拟机语义)

- 数据类型和值
- 抽象操作
- 语法制导操作
- 可执行代码和执行上下文
- 普通对象行为和外来对象行为
  + 对象的来源：宿主，引擎，程序
  + 对象类型：
    + 对象
    + 原生对象
    + 标准对象
    + 内置对象
    + 宿主对象

## 11-17 真实的 ECMAScript 编程语言（语法编码和所有语言特性的执行语义）

- 源代码
  - 源文本
  - 源代码类型

- 词法语法（scanner
  + ECMAScript 脚本或者模块的源代码首先转换为符号，行终止符，注释和空格的输入序列，作为下一步的输入元素；
  - 统一码格式控制字符；
  - 空白格；
  - 行终止符；
  - 注释；
  - 符号；
  - 名称和关键字；
  - 标点符号；
  - 字面量；
  - 自动分号插值；

- 表达式
  - 标识符；
  - 原始表达式；
  - 左边表达式；
  - 更新表达式；
  - 一元操作符；
  - 指数操作符；
  - 乘法操作符；
  - 加法操作符；
  - 位移操作符；
  - 关系操作符；
  - 相等操作符；
  - 二进制位移操作符；
  - 二进制逻辑操作符；
  - 条件操作符；
  - 赋值操作符；
  - 逗号操作符；

- 语句和声明
  - 语句的语义
  - 块
  - 声明和变量语句
  - 空语句
  - 表达式语句
  - if语句
  - 遍历语句
  - continue语句
  - break语句
  - return语句
  - with语句
  - switch语句
  - 标签语句
  - throw语句
  - try语句
  - debugger语句

- 函数和类
  - 参数列表
  - 函数定义
  - 箭头函数定义
  - 方法定义
  - 生成器函数定义
  - 类型定义
  - 异步函数定义
  - 异步箭头函数定义
  - 尾调用

- 脚本和模块
  - 脚本
  - 模块

- 错误处理和语言扩展
  - 进制扩展

## 18-28 标准库

- 标准内置对象
- 全局对象
- 基础对象
- 数字和日期
- 文本处理
- 索引集合
- 键集合
- 结构化数据
- 管理内存
- 控制抽象对象
- 反射

## 29 内存一致性模型

- 内存模型

## 实现

- js引擎
- js虚拟机: 这是将js引擎用高级语言虚拟机的角度看待
- js运行时