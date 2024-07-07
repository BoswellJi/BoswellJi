## v8

1. 单线程

- 同步任务，异步任务；
- 执行栈，任务队列（宏任务，微任务），事件循环；
- 执行机制就是：在上面的特性之上，js 代码的执行顺序是什么样的；

5. 内存管理

- 函数：可调用的对象；
- 垃圾回收：引用计数算法，标记清除算法；

6. 脚本引擎

- 支持语法与 api；
- 宿主平台提供宿主 api;
- `平台对于语言的语法不支持，需要使用编译器来编译`；
- `平台对于语言的api不支持，需要使用corejs/polyfill来填充`；
- 引擎类型：
  - v8
  - jscore
  - chakra

7. js 宿主环境

- 浏览器
- nodejs

8. 事件循环

9. js 引擎编译流水线

- parser
- interperter
- JIT compiler
- gc

10. 渲染流程

11. requestIdleCallback 什么时候执行

## 概念

- 全局执行上下文
- 全局作用域

## 引擎，运行时，调用堆栈