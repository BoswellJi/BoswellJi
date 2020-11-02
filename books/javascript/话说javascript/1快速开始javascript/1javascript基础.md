## 概述

这部分是一个自包含的js快速介绍。你不需要阅读这本书的任何其他内容就能理解它，并且，数中没有其他部分依赖它的概念。但是，在'Tips for Reading This book'中应用了如何阅读这本书的技巧。

这章是关于基础js的，我给js子集选择的名字，是尽可能的简洁同时又让你能有收获。当你开始学习js的时候，我推荐前进到语言剩余部分之前，等一等在编程。那样，你可能会困惑不能立刻学习每件事情。

## 背景

* javascript(js) vs ecmascript(es)

ecmascript是js的官方名字。因为js有商标（原始持有的是Sun, 现在是Oracle），所以一个新的名字变得很要紧。当时，Mozilla是几个允许官方使用js名字的公司之一，因为它很久以前接受一个许可证。对于一般的使用，这些规则需要遵循：

1. js意思是编程语言
2. ecmascript是被语言规范使用的名称。因此，无论什么时候涉及到语言的版本，人们都说的是ecmascript。当前的js版本是ecmascript5;es6正在开发当中。

* 语言的影响和本质

js的创始人，Brendan Eich没有选择，所以非常快速的创建了语言（）。他从几种编程语言中借鉴：java(语法，原始值vs对象)，scheme和awk(函数为一等公民)，self(原型继承)，以及perl和python（字符串，数组，和正在表达式）。
直到es3js才有异常处理，这解释了为什么语言常常自动转换值以及常常静默失败，因为他初始化不能抛异常。
一方面，js怪异，还缺失相当多的功能（块级作用域变量，模块，子类支持，等等），另一方面，它有几个允许你围绕这些问题工作的强有力的特性。在其他语言中，你学习语言特性，但在js中，你反而经常学习模式。
鉴于它的影响，js开启了一种函数式编程（高级函数；内置map, reduce, 等等）和面向对象编程（对象，继承）的混合的编程风格。

## 语法

这章解释基础的js语法原则。

* 语法概述

几个语法案例：

``` js
// Two slashes start single-line comments

var x; // declaring a variable

x = 3 + y; // assigning a value to the variable `x`

foo(x, y); // calling function `foo` with parameters `x` and `y`
obj.bar(3); // calling method `bar` of object `obj`

// A conditional statement
if (x === 0) { // Is `x` equal to zero?
    x = 123;
}

// Defining function `baz` with parameters `a` and `b`
function baz(a, b) {
    return a + b;
}
```

注意等号的两种不同用法：

1. 单个等号被用于变量的赋值
2. 三个等号被用于比较两个值

* 声明vs表达式

为了理解js的语法，你应该知道它有两种主要的语法分类：语句和表达式：

1. 语句做的事情，一个程序是语句的序列。这里是语句的案例，它定义了一个变量foo:

``` js
var foo;
```

2. 表达式产生值。它们是函数参数，赋值的右边，等等。这里是表达式的案例。

``` js
3 * 7
```

语句和表达式之间区别最明显的是通过js有两种不同的做if-then-esle的方法-无论是语句：

``` js
var x;
if (y >= 0) {
    x = y;
} else {
    x = -y;
}
```

或是表达式

``` js
var x = y >= 0 ? y : -y;
```

你能使用后者作为函数参数，但是前者不能。

``` js
myFunction(y >= 0 ? y : -y)
```

最后，无论js哪里接收一个语句，你都可以使用表达式。

``` js
foo(7, 1)
```

整行是一个语句（所谓的表达式语句），但是函数调用foo(7, 1)是表达式。

* 分号

在js中，分号是可选的。但是，我建议总是包含它们，因为否则js会猜错语句的结尾。在自动插入分号中，进行详细解释。

分号终止语句，单块不是。有一个案例，你会在一个块之后看到一个分号：一个函数表达式是结尾带有块的表达式。如果这样表达式在语句中谓语最后，它后面要跟上分号。

``` js
// Pattern: var _ = ___;
var x = 3 * 7;
var f = function() {}; // function expr. inside var decl.
```

* 注释

js有两种注释：单行注释和多行注释。单行注释从 `//` 开始，并且被行尾终止：

``` js
x++; // single-line comment
```

多行注释通过 `/*` 和 `*/` 来限制：

``` js
/* This is
   a multiline
   comment.
 */
```

## 变量和赋值

js中的变量在它们使用之前定义：

``` js
var foo; // declare variable `foo`
```

* 赋值

你可以定义一个变量同时给他赋值：

``` js
var foo = 6;
```

你还可以给已经存在的变量赋值：

``` js
foo = 4; // change variable `foo`
```

* 复合赋值操作符

有复合赋值运算符比如：+=。下面两份赋值是相等的：

``` js
x += 1;
x = x + 1;
```

* 标识符和变量名

在js中，标识符是扮演各种句法角色的名称。例如，一个变量的名称是标识符。标识符是大小写敏感的。
粗略地，标识符的第一个字符可以是任何的unicode字母，一个$符号，或者一个下划线。随后的字符可以是任何unicode数字。因此，下面全都是合法标识符

``` js
arg0
_tmp
$elem
π
```

下面标识符是保留字-它们是语法的一部分并且不能作为变量名使用（包含函数名和参数名）：

``` js
arguments

break

case

catch

class

const

continue

debugger

default

delete

do

else

    enum

export

extends

false

finally

for

function

if

implements

import

in

instanceof

interface

let

new

null

package

private

protected

public

return

static

super

switch

this

throw

true

try

typeof

var

    void

while
```

下面的三个标识符不是保留字，但是你应该对待它们一样：

``` js
Infinity

NaN

undefined
```

最后，你还因该与标准的全局变量名保持距离。你能够在局部变量中使用它们，这样不会破坏任何事情，但是你的代码仍然会变得混乱。

## 值

js有许多我们已经料到了的编程语言中的值：布尔值，数值，字符串，数组，和等等。js中的所有值都有属性。每一个属性有一个值。你可以认为属性像记录的字段。你使用 `.` 操作符来读取属性：

``` js
value.propKey
```

例如，字符串'abc'有属性length:

``` js
>
var str = 'abc'; >
str.length
3
```

前面的代码还可以这样写：

``` js
 'abc'.length
 3
```

点操作符还被用来给属性赋值：

```js
> var obj = {};  // empty object
> obj.foo = 123; // create property `foo`, set it to 123
123
> obj.foo
123
```

以及你可以使用它调用函数：

```js
'hello'.toUpperCase()
'HELLO'
```

在前面的例子中，我们已经在值`hello`的toUpperCase()方法。


* 原始值vs对象

js在值之间，做了一些武断的区分：

1. 原始值是：布尔值，数字，字符串，null,和undefined
2. 其他所有的值都是对象

两者之间一个主要不同是如何比较它们；每一个对象有一个唯一标识符并且值等于它自己。

```js
> var obj1 = {};  // an empty object
> var obj2 = {};  // another empty object
> obj1 === obj2
false
> obj1 === obj1
true
```

于此相反：所有编码相同的原始值被认为是相同的。

```js
> var prim1 = 123;
> var prim2 = 123;
> prim1 === prim2
true
```

下面两章更细致的解释了原始值和对象。

* 原始值

下面都是原始值（或者简称为原始）：

1. 布尔值： true,false
2. 数值：12，1.2
3. 字符串：'abc',"abc"
4. 两个非值：undefined,null

原始值有下面的特点：

1. 通过值比较：是内容的比较

```js
> 3 === 3
true
> 'abc' === 'abc'
true
```

2. 总是不可变的：属性不能被改变，增加或者删除

```js
> var str = 'abc';

> str.length = 1; // try to change property `length`
> str.length      // ⇒ no effect
3

> str.foo = 3; // try to create property `foo`
> str.foo      // ⇒ no effect, unknown property
undefined
```

读取一个未知的属性总是返回undefined


* 对象

所有的非原始值是对象。大部分一般类型的对象是：

1. 普通对象，通过对象字面量来创建：

```js
{
    firstName: 'Jane',
    lastName: 'Doe'
}
```

前面的对象有两个属性：属性`firstName`的值是'Jane'以及属性`lastName`的值是`Doe`.

2. 数组，通过数组字面量来创建：

```js
[ 'apple', 'banana', 'cherry' ]
```

前面的属性有能够通过数值索引来访问的三个元素。例如，`apple`的索引是`0`。

3. 正则表达式，通过正则表达式字面量创建：

```js
/^a+b+$/
```

对象有下面的特点：

1. 通过引用比较：标识符比较，每个值有自己的标识：

```js
> ({} === {})  // two different empty objects
false

> var obj1 = {};
> var obj2 = obj1;
> obj1 === obj2
true
```

2. 默认可变的

你通常可以自由改变，新增，以及删除属性。

```js
> var obj = {};
> obj.foo = 123; // add property `foo`
> obj.foo
123
```

* undefined和null

大部分编程语言有值来标识错误信息。js有两个这样的非值，undefined和null:

1. undefined意思是无值

非初始化变量是undefined:

```js
> var foo;
> foo
undefined
```

缺失参数是undefined:

```js
> function f(x) { return x }
> f()
undefined
```

如果你读取一个不存在的属性，你得到undefined:

```js
> var obj = {}; // empty object
> obj.foo
undefined
```

2. null意思是无对象，它被作为一个非值使用，无论一个对象什么时候被期待（参数，对象链的最后，等等）

警告：undefined和null没有属性，甚至都没有标准方法比如toString()

检查undefined或者null

函数通常允许你指定缺失的值，无论是通过undefined还是null。你可以通过显示检查来做相同的事情。

```js
if (x === undefined || x === null) {
    ...
}
```

你还能开发undefined和null两者都被认为false的事实：

```js
if (!x) {
    ...
}
```

警告： false,0,NaN和''也被认为成false.


* 使用typeof和instanceof来给值分类

有两个操作符用来给数组分类：typeof主要用于原始值，而instanceof用于对象。

typeof看起来像这样：

```js
typeof value
```

它返回一个描述值类型的字符串。这里是一些例子：

```js
> typeof true
'boolean'
> typeof 'abc'
'string'
> typeof {} // empty object literal
'object'
> typeof [] // empty array literal
'object'
```

下面的表格列出了所有typeof的结果：

```js
undefined

'undefined'

null

'object'

Boolean value

'boolean'

Number value

'number'

String value

'string'

Function

'function'

All other normal values

'object'

(Engine-created value)

JavaScript engines are allowed to create values for which typeof returns arbitrary strings (different from all results listed in this table).
```

typeof null 返回object,是一个不能修复的bug,因为它会破坏现有代码。它不意味着null是对象。

instanceof看起来像这样：

```js
value instanceof Constr
```

如果值是一个通过构造函数Constr创建的对象，就返回true。这里是一些案例：

```js
> var b = new Bar();  // object created by constructor Bar
> b instanceof Bar
true

> {} instanceof Object
true
> [] instanceof Array
true
> [] instanceof Object  // Array is a subconstructor of Object
true

> undefined instanceof Object
false
> null instanceof Object
false
```


## 布尔值

原始布尔类型有值true和false组成。下面的操作符生产布尔值。

1. 二进制逻辑操作符 && ||
2. 前缀逻辑操作符 !
3. 比较操作符：
    - 等号操作符： === ， !==， !=
    - 顺序操作符： >, >=, <, <=

* 真值和假值
* 二进制逻辑操作符
* 等式操作符

## 数字

## 操作符

## 字符串

* 字符串操作符
* 字符串方法

## 语句

* 条件
* 循环

## 函数

* 函数定义被提升
* 特殊的变量arguments
* 太多或者太少arguments
* 可选参数
* 强制执行
* 转换argument为数组

## 异常处理

## 严格模式

## 变量作用域和闭包

在javascript中，你在使用变量之前通过var来定义它们，你可以使用一个单一的var声明，来定义和初始化几个变量。但是我推荐你给每个变量使用一个声明，（理由会在语法章节解释），所以，我会重写前面的声明。因为提升，通常定义变量最好的方式是在函数的开头。

* 变量的函数作用域

一个变量的作用域总是完整的函数（与当前块相反），我们能看到变量tmp没有被限制在开始行中的块作用域，直到函数结束它都存在。

* 变量被提升

每一个变量定义都被提升：定义被移动到函数开始的位置，但是不会给他赋值。

* 闭包

每个函数都与它周围函数的变量保持连接。甚至离开创建它的作用域。开始在行内的函数离开创建的上下文，但是对于start当前版本都是保持连接的。 `闭包是，一个函数加上它的周围作用域的变量连接` 。所以 `createIncrementor()` 返回一个闭包。

* 立即执行函数表达式模式：引入一个新作用域

有时，你想引入一个新的作用域，例如阻止一个变量成为全局变量。在javascript中，你不能使用块作用域做到这样，你必须使用一个函数。但是有一个在类块作用域方式中使用函数的模式，被称为立即执行函数表达式 `IIFE` 。确保之前输入的案例如实展示。除了注释。一个IIFE是一个你定义之后立即被调用的函数表达式。在函数内部，一个新的作用域存在，阻止tmp变量成为全局变量。

## 对象和构造函数

* 单个对象
* 任意的属性键
* 提取方法
* 方法内部的函数
* 构造函数：对像的工厂

## 数组

* 数组字面量
* 数组方法
* 迭代数组


## 正则表达式

js内置支持正则表达式。它们通过斜杠语法被限制。

```js
/^abc$/
/[A-Za-z0-9]+/
```

* 方法test(): 是否有匹配

```js
> /^a+b+$/.test('aaab')
true
> /^a+b+$/.test('aaa')
false
```

* 方法exec(): 匹配和捕获组
* 方法replace(): 搜索和替换

## 数学

## 标准库的其他功能

js的标准库相当简朴，但是你能使用更多东西：

Date

JSON

console