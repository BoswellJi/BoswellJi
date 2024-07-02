## ecma2023特性

- Array find from last	
- Daniel Rosenwasser	
- Hashbang Grammar	
- Symbols as WeakMap keys	

## js中的数据类型

- Null：	"object"	
- Undefined：	"undefined"
- Boolean：	"boolean"	
- Number：	"number"	
- BigInt：	"bigint"	
- String：	"string"	
- Symbol：	"symbol"
- function(){}： "function"

## 操作符的优先级

|| < &&

## 什么是原型

- `构造函数的prototype`指向的一个对象，也叫原型对象

## 什么是原型链

- 原型对象也会指向自己的原型对象，一层一层向上指向形成的链路

## 如何创建一个没有原型的对象

- Object.create(null)

## 什么是闭包函数

- 能够外部作用域的函数，叫做闭包函数

## 一个 Promise 实例有哪些状态？

1. resolved
2. pending
3. rejected

## Promise 中异常处理方式

- new Promise().catch()
- new Promise((reslove,reject)=>{},(err)=>{})
- async awiat，使用 try{}catch(e){}finally{}

## `catch`方法后的`then`方法还会执行吗

- 会执行

## 什么是浅拷贝和深拷贝

- 浅拷贝：引用拷贝
- 深拷贝： 值拷贝


## 什么是跨域

浏览器的同源策略，同源是指"协议+域名+端口"三者相同

## 解决方案

- 代理
- cors
- jsonp

## 快速排序

- 选取一个中间数，将数组根据中间数分为两组，进行递归。

## Ts相对Js的优点

1. 类型安全
2. 代码重构
3. 代码导航
4. 代码文档
5. ......

## 如果你使用的一个依赖包没有类型声明怎么办

- 下载第三方的类型定义包
- 自己写声明文件，如何写

## 获取数组第一个元素的类型

- `declare type FirstArray<T extends any[]> = T extends [] ? never : T[0];`

## 浏览器的事件轮询机制

## node的事件轮询机制

## 你理解的前端标准化

## 你一般是如何做技术选项的

## 脚手架能力有哪些

## 兼容性处理的经验