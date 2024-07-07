# 思考

## 学习上的缺点

- 对编程语言的掌握（api+语法）
  - 不全面：API 认识不全，很多基本 API 都没记住；
  - 不严谨：API 使用方式掌握不全；
  - 不深入：底层实现原理不了解`执行流程`，导致出现异常情况，例如：浮点数计算，导致结果的浮点数精度不准确；

## 编程范式

在 js 中，通过封装的工具，拓展 js 的函数式编程能力，例如：lodash，underscore，ramda 等，通过封装的工具，拓展 js 的响应式编程能力，例如：rxjs

- 命令式编程

  - 面向过程：
  - 面向对象：暴露面向对象特性，类，对象等
  - 响应式编程：通过底层封装，暴露出响应式 api

- 声明式编程：通过底层封装，暴露出声明式 api
  - 函数式：暴露函数特性，函数等

## 前端的底层

前端的底层是浏览器

## 后端的底层

后端的底层是 node.js

## 高质量程序的特点

1. 代码执行要符合直觉，不要有歧义，因该先定义才能执行的代码，不要写成先执行才定义的代码；
2. 代码不要有副作用，副作用会引入不确定性，给程序阅读和调试带来麻烦；
3. 委托模式的使用，也会给程序阅读和调试带来麻烦，没法直观了解程序的流程；
4. 字符串拼接可读性差，可读性差带来不可维护性，使用声明式编程编写，例如1.`url?a=b&b=c`中的查询字符串，2.正则表达式的编写`/\s+aoo/`；

## 程序测试的重要性

1. 覆盖全部场景的测试，保证功能的`正确性`
2. 不同平台的测试，保证功能的`兼容性`
3. 压力的测试，保证功能的`流畅性/高性能`

## 编写程序的思路

1. 熟练使用
2. 知道原理
3. 理解设计思想

## 事物演化的过程

是形态的变化