# javascript中的类型强制

## 什么是类型强制？
- 处理类型强制
## 在ecmascript规格中帮助实现强制的操作符
- 转换成原始类型和对象
- 转换成数值类型
- 转换成属性键
- 转换成数组索引
- 转换成类型化数组元素
## 中场休息：在javascript中表达特定的算法
## 强制算法案例
- ToPrimitive()
- ToString() 和相关的操作符
- ToPropertyKey()
- ToNumeric 和相关操作符
## 强制操作符
- 加号操作符
- 抽象相等比较（==）
## 术语：类型转换相关术语

在这章中，我们考察javascript中的类型强制的作用，我们将相对深入的研究这个话题，例如，考察（look into）ecmascript规格如何处理强制。

2.1 什么是类型强制？
每一个操作（function,operator,等）期待他的参数有确定的类型，如果一个值没有正确的参数类型，三个统一选择，例如，函数：
1. 函数能抛出一个异常：
```
function multiply(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new TypeError();
  }
  // ···
}
```

1. 函数能抛出一个异常：
```
function multiply(x, y) {
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new TypeError();
  }
  // ···
}
```