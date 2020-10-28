## 概述

javascript中的异常处理和大部分的编程语言的工作一样：一个组织语句的try语句，并且让你在那些语句中打断异常。

## throw

throw的语法像下面这样：

```javascript
throw «value»;
```

任何的javascript都能被抛出。出于简单为目的，许多javascript程序员只抛出字符串：

```javascript
// Don't do this
if (somethingBadHappened) {
    throw 'Something bad happened';
}
```

不要这样做，javascript已经制定了异常对象的构造函数。使用那些或者它们的子类。它们的有优点是，javascript自动添加了栈追踪并且它们有房间来容纳额外的上下文特定属性。最简单的解决方案是使用内置的Error()构造函数。

```javascript
if (somethingBadHappened) {
    throw new Error('Something bad happened');
}
```

## try-catch-finally

try-catch-finally的语法看起来像下面这样。try是强制性的，并且，至少有一个catch,yiji finally必须在那个位置：

```javascript
try {
    «try_statements»
}
⟦catch («exceptionVar») {
   «catch_statements»
}⟧
⟦finally {
   «finally_statements»
}⟧
```

这里它是如何工作的：

* catch: 捕获任何从try语句中抛出的异常，无论是直接还是它们调用的函数。提示：如果你想要区分不同种类异常之间的区别，你可以使用构造函数属性来切换异常构造函数。
* finally: 总是会被执行，无论try语句中发生了什么。无论在try语句中发生了什么,使用它用于那些总是被执行的操作：

```javascript
var resource = allocateResource();
try {
    ...
} finally {
    resource.deallocate();
}
```

如果try语句中的一个是return,finally块之后会被执行。（离开函数或者方法之前立即执行）。

例子：
任何值都能被抛出：

```javascript
function throwIt(exception) {
    try {
        throw exception;
    } catch (e) {
        console.log('Caught: '+e);
    }
}
```

这里是一个交互：

```javascript
> throwIt(3);
Caught: 3
> throwIt('hello');
Caught: hello
> throwIt(new Error('An error happened'));
Caught: Error: An error happened
```

finally总是被执行：

```javascript
function throwsError() {
    throw new Error('Sorry...');
}
function cleansUp() {
    try {
        throwsError();
    } finally {
        console.log('Performing clean-up');
    }
}
```

这里是一个交互：

```javascript
> cleansUp();
Performing clean-up
Error: Sorry...
```

一个return语句之后执行finally:

```javascript
function idLog(x) {
    try {
        console.log(x);
        return 'result';
    } finally {
        console.log("FINALLY");
    }
}
```

这里是一个交互：

```javascript
> idLog('arg')
arg
FINALLY
'result'
```

执行finally之前，返回值已在排队：

```javascript
var count = 0;
function countUp() {
    try {
        return count;
    } finally {
        count++;  // (1)
    }
}
```

通过这次语句1被执行，count的值已经在排队等待返回：

```javascript
countUp()
0
> count
1
```