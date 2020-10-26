你典型的引入一个新作用域来限制变量的生存周期。你可能想要做这样的一个例子是，if声明的部分：只有条件成立时，才会执行；并且如果它只使用辅助变量，我们不想它们泄露到周围的作用域：

``` javascript
function f() {
    if (condition) {
        var tmp = ...;
        ...
    }
    // tmp still exists here
    // => not what we want
}
```

如果你想要给then块引入一个新的作用域，你可以定义一个函数，并且立即调用它。这个是块级作用域的模拟变通方法。

``` javascript
function f() {
    if (condition) {
        (function() { // open block
            var tmp = ...;
            ...
        }()); // close block
    }
}
```

这个是javascript中的一个普通模式。Ben Alman建议把他称为立即执行函数表达式，（IIFE）, 一般来说，一个IIFE像这样：

``` javascript
(function() { // open IIFE
    // inside IIFE
}()); // close IIFE
```

这里是关于IIFE的一些注意事项：

## 它是立即执行的

函数右大括号后的括号立即调用它。那意味着他的函数体被立即执行。

## 它一定是一个表达式

如果使用关键字function声明开始，解析器期待它是一个函数定义。但是一个函数定义不能被立即调用。因此，我们告诉解析器关键字function是函数表达式的开始，以左括号开始语句。在括号内部，只能是表达式。

## 尾部的分号是必须的

如果你在两个IIFE之间忘记了它，之后，你的代码将不会工作：

``` javascript
(function () {
    ...
}()) // no semicolon
(function () {
    ...
}());
```

上面的代码作为函数调用被打断，第一个IIFE是被调用的函数，以及第二个IIFE是参数。


## IIFE变种：前缀操作符

通过前缀表达式，你还能强迫表达式上下文。例如，通过逻辑非操作符，你能这样做：

``` javascript
! function() { // open IIFE
    // inside IIFE
}(); // close IIFE
```

或者通过void操作符

``` javascript
void

function() { // open IIFE
    // inside IIFE
}(); // close IIFE
```

使用前缀表达式的优点是忘记终止分号不会引起问题。

## IIFE变种：已经在表达式上下文中

注意，强制给IIFE表达式上下文不必要，如果你是已经在表达式上下文中，之后你不需要圆括号或者前缀操作符，例如：

``` javascript
var File = function() { // open IIFE
    var UNTITLED = 'Untitled';

    function File(name) {
        this.name = name || UNTITLED;
    }
    return File;
}(); // close IIFE
```

在前面的例子中，有两个名字为File的不同变量。一边，有只直接在IIFE内部访问的函数。另一边，有在第一行被定义的变量。它被附上在IIFE中返回的值。

## IIFE变种：带有参数的立即执行环境

你能使用参数来定义IIFE内部的变量；

``` javascript
var x = 23;
(function(twice) {
    console.log(twice);
}(x * 2));
```

这个是相似的：

``` javascript
var x = 23;
(function() {
    var twice = x * 2;
    console.log(twice);
}());
```

## IIFE应用程序

一个IIFE让你能够链接函数的私有数据。之后，你不能定义全局变量，并且能够紧密的将函数和它的状态封装起来。你避免污染全局变量的命名空间。

```javascript
var setValue = function () {
    var prevValue;
    return function (value) { // define setValue
        if (value !== prevValue) {
            console.log('Changed: ' + value);
            prevValue = value;
        }
    };
}();
```

其他IIFE的应用程序在这本数的其他地方被提到：

* 避免全局变量；隐藏全局变量；
* 创建新鲜环境；避免共享；
* 保持全局数据对所有构造函数私有；
* 附加全局数据到一个单例对象；
* 附加全局数据到一个方法；