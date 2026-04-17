过去几年来jq插件开发已经不断发展。我们不再只有一种写插件的方式，而是有很多，实际上，某些插件设计模式可能对于特定问题或者组件会处理的更好比其他的。

许多开发者可能想要使用jq ui 部件工厂；对于复杂，灵活的ui组件非常适合，有些可能不是。一些人可能想要构建它们的插件更像模块(与现代化模块相似)或者使用多个现代化模块形式，比如amd。

有些人可能想要它们的它间使用原型继承的力量。其他人可能希望使用自定事件或者发布/订阅从插件到应用程序的其他部分进行通信。等等。

注意到大量想要创建一个统一的jq插件脚手架之后，我开始思考插件模式。虽然这样的脚手架理论上是好主意，事实上，我们很少写插件使用一种固定方式，一直使用一个单个模式。

让我们假设我们亲自尝试编写我们的jq插件某些时候，并且我们喜欢将一些事情放到一起来处理。它很有用。它会做它需要做的事情，但是，可能我们觉得它能够被构建的更好。也许它能够更灵活，或者能够设计来解决更多开发者中普遍存在的问题。如果这听起来很熟悉，那你可能发现这章很有用。其中，我们打算探索大量已经在其他开发者中广泛工作的很好的jq插件模式。

注意：这章的目标是中级到高级开发者，因此，我们会简短回顾一些jq插件基础。

如果，你没有觉得准备的够充分，我很高兴为你推荐官方的jq插件/写作指南，ben的插件风格指南和remy的这是一个写得很差的jq插件。作为优先开始这章的阅读素材。

## 模式

jq插件没有具体规则，这也是为什么在整个社区中它们的执行方式存在巨大多样性的原因之一。在大多数的基础等级中，我们可以通过在jq的jQuery.fn对象上添加新函数属性来编写简单的插件，如下：

```js
$.fn.myPluginName = function () {
    // our plugin logic
};
```

这个对简洁性来说非常好,但是下面可能是更好的方案来构建它：

```js
(function( $ ){
  $.fn.myPluginName = function () {
    // our plugin logic
  };
})( jQuery );
```

这里，我们已经将我们的插件包裹在一个匿名函数中。为了确保我们使用的$标识符作为简写，不会再jq和其他js库中产生冲突。我们简单的把它传给则个闭包，它会映射到美元符。这个确保了它不会被任何外部的执行作用域影响。

编写这个模式的一个替换方案是使用jQuery.exthend()，它能够让我们一次性定义多个函数，并且有时在语义上更有意义。

```js
(function( $ ){
    $.extend($.fn, {
        myplugin: function(){
            // your plugin logic
        }
    });
})( jQuery );
```

我们现在已经回顾了一些jq插件基础，但是进一步推进这一进程，还有很多工作要做。轻量的开始是我们将探索的第一个完整的插件设计模式，我们能够使用它来做基础日常插件开发的最佳实践，并考虑了一些值得应用的常见陷阱。

## 注意

虽然下面大部分模式将会被解释，我推荐通过代码中的注释来阅读，因为它们将提供更多某个被应用的最佳实践的内部视角。

我还应该提到，如果没有之前的jq社区的其他成员的工作，输入，和建议这一些都是不可能的。我已经列在每个模式中都列出了它们，以至于人们可以根据兴趣来单独的阅读它们。

## 一个轻量的开始模式

让我们通过遵循最佳实践的一些基础来更深入的看看插件模式。（这些包含在jq插件编写指南中）这个模式用来给插件开发新手或者只想获得简单的事情（比如一个功能插件）。轻量的开始使用如下：

1. 普遍的最佳实践比如，函数调用之前，分号的放置（我们将通过下面的评论进行解释原因）
2. window,document,undefined作为参数传递
3. 一个基础的默认值
4. 与初始化创建逻辑有关的一个简单的插件构造器以及要处理的元素的赋值。
5. 扩展默认选项
6. 围绕构造器的轻量包裹器，它有助于避免问题，比如多个实例化。
7. jq代码风格指南的包含最小化可读性。

```js
/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */
 
 
// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {
 
    // undefined is used here as the undefined global
    // variable in ECMAScript 3 and is mutable (i.e. it can
    // be changed by someone else). undefined isn't really
    // being passed in so we can ensure that its value is
    // truly undefined. In ES5, undefined can no longer be
    // modified.
 
    // window and document are passed through as local
    // variables rather than as globals, because this (slightly)
    // quickens the resolution process and can be more
    // efficiently minified (especially when both are
    // regularly referenced in our plugin).
 
    // Create the defaults once
    var pluginName = "defaultPluginName",
        defaults = {
            propertyName: "value"
        };
 
    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;
 
        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;
 
        this._defaults = defaults;
        this._name = pluginName;
 
        this.init();
    }
 
    Plugin.prototype.init = function () {
        // Place initialization logic here
        // We already have access to the DOM element and
        // the options via the instance, e.g. this.element
        // and this.options
    };
 
    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if ( !$.data(this, "plugin_" + pluginName )) {
                $.data( this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    }
 
})( jQuery, window, document );
```

用法：

```js
$("#elem").defaultPluginName({
  propertyName: "a custom value"
});
```

进一步阅读

1. 插件/写作，jq
2. 一个差劲的编写jq插件标识
3. 如何创建自己的jq创建
4. 创建你的第一个jq插件,第二部分


## 完整的部件工厂模式

虽然jq插件写作指南是一个很好的插件开发介绍，这并不能掩盖常见的插件管道任务，我们需要用常规的基础来处理。

jq ui部件工厂是这个问题的解决方案，它帮助我们构建复杂的，有状态的插件，基于面向对象的原则。它还简化了与我们的插件实例的沟通，混淆一些重复的任务，我们能够去编码，在处理基础插件时候。

有状态插件帮助我们对它们当前状态的追踪，还允许我们改变插件的属性在插件初始化之后。

关于部件工厂最好的事情之一是事实上大多数jq ui库使用它作为它的组件的基础。这意味着，如果我们要寻找这个模式之外的结构的进一步指导，我们不必去看github上的jqui库。

这个jq ui部件工厂模式涉及了几乎所有受支持的默认工厂方法，包括触发事件。根据上一个模式，评论包含所有被使用的方法以及被指定在行内注释的进一步指导。

```js
/*!
 * jQuery UI Widget-factory plugin boilerplate (for 1.8/9+)
 * Author: @addyosmani
 * Further changes: @peolanha
 * Licensed under the MIT license
 */
 
 
;(function ( $, window, document, undefined ) {
 
    // define our widget under a namespace of your choice
    // with additional parameters e.g.
    // $.widget( "namespace.widgetname", (optional) - an
    // existing widget prototype to inherit from, an object
    // literal to become the widget's prototype );
 
    $.widget( "namespace.widgetname", {
 
        //Options to be used as defaults
        options: {
            someValue: null
        },
 
        //Setup widget (e.g. element creation, apply theming
        //, bind events etc.)
        _create: function () {
 
            // _create will automatically run the first time
            // this widget is called. Put the initial widget
            // setup code here, then we can access the element
            // on which the widget was called via this.element.
            // The options defined above can be accessed
            // via this.options this.element.addStuff();
        },
 
        // Destroy an instantiated plugin and clean up
        // modifications the widget has made to the DOM
        destroy: function () {
 
            // this.element.removeStuff();
            // For UI 1.8, destroy must be invoked from the
            // base widget
            $.Widget.prototype.destroy.call( this );
            // For UI 1.9, define _destroy instead and don't
            // worry about
            // calling the base widget
        },
 
        methodB: function ( event ) {
            //_trigger dispatches callbacks the plugin user
            // can subscribe to
            // signature: _trigger( "callbackName", [eventObject],
            // [uiObject] )
            // e.g. this._trigger( "hover", e /*where e.type ==
            // "mouseenter"*/, { hovered: $(e.target)});
            this._trigger( "methodA", event, {
                key: value
            });
        },
 
        methodA: function ( event ) {
            this._trigger( "dataChanged", event, {
                key: value
            });
        },
 
        // Respond to any changes the user makes to the
        // option method
        _setOption: function ( key, value ) {
            switch ( key ) {
            case "someValue":
                // this.options.someValue = doSomethingWith( value );
                break;
            default:
                // this.options[ key ] = value;
                break;
            }
 
            // For UI 1.8, _setOption must be manually invoked
            // from the base widget
            $.Widget.prototype._setOption.apply( this, arguments );
            // For UI 1.9 the _super method can be used instead
            // this._super( "_setOption", key, value );
        }
    });
 
})( jQuery, window, document );
```

用法

```js
var collection = $("#elem").widgetName({
  foo: false
});
 
collection.widgetName("methodB");
```

进一步阅读

1. jq ui部件工厂
2. 有状态插件和部件工厂的介绍
3. 部件工厂
4. 理解jq ui 部件：教程

## 嵌套名称空间的插件模式

像我们之前在书中涉及到的，我们代码的名称空间是为了避免与全局名称空间中其他对象和变量冲突的方式。它们很重要，因为我们想保护我们的插件，当页面上的另一个脚本使用与我们相同的变量或者插件名时，我们的插件不会被破坏。作为一个全局名称空间的好公民，我们还必须尽自己最大的努力，不要阻止其他开发人员脚本的执行。