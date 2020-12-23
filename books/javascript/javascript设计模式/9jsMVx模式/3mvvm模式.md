



## MVVM

mvvm是一个基于mvc和mvp的架构模式，它想要更清晰的划分业务逻辑中的用户接口开发和应用程序中的行为。为了这个目的，这个模式的许多实现使得定义数据绑定的用途允许视图上的工作从其他层分离。

这个促使UI和开发工作几乎同时在相同的代码基础中发生。ui开发在它们的文档标签中编写vm的绑定，其中的model和vm由工作在应用程序逻辑的开发者来维护。

## 历史

mvvm最初是由微软定义用在wpf和silverlight中使用的。2005年由jhon crossman官方在博客宣布关于avalon。它还在adobe flex社区流行起来，成为简单使用mvc的一种替代方法。

微软在采用mvvm名称之前，然而，社区出现了一场从mvp到mvpm的运动：模型，视图，模型展现。Martin Fowler早在2004年就写过一篇关于演示模型的文章，专们为那些有兴趣阅读着方面文章的人写的。模型呈现的概念出现的时间比本文长的多，但是，它被认为是这个想法的重大突破，并极大的促进了它的普及。

微软宣布mvvm作为mvpm的替代者后，在alt.net圈引起了相当大的反应。许多人声称，该公司在gui领域的主导地位给了它们一个机会来接管整个社区，并根据市场需求对现有概念进行重新命名。一群进步的人认识到，虽然mvvm和mvpm实际上是相同的想法，但它们在不同的包中出现。

最近几年，mvvm已经以结构框架的形式在js中实现，例如KnockoutJS, Kendo MVVM and Knockback.js，并且在社区总体取得了积极的响应。

现在，让我们回顾组成mvvm的三个组件。

## 模型

与mv*家庭的其他成员一样，mvvm中的模型代表我们应用程序将一起工作的特定领域数据或者信息。一个典型的特定领域数据可能是一个用户账户（例如，名称，头像，电子邮件），或者一个音乐轨迹（例如，标题，年，相册）。

模型持有信息，但是典型地不能处理行为。它们不能格式化信息或者影响数据如何在浏览器中出现，因为这不是它们的责任。反而，数据的格式化由视图来处理，尽管行为被认为是应该被封装在与模型交互的另一个层的业务逻辑（viewmodel）。

这个规则的唯一例外是验证，模型验证用于定义或更新现有模型的数据被认为是可以接受的。（输入的电子邮件地址是否满足特定正则表达式的要求）

在KnockoutJS中，模型属于上述定义，但是经常使用ajax调用服务端服务来读取和写入模型数据。

如果我们构建一个简单的todo应用程序，代表单个todo事项的KnockoutJS模型看着像下面这样：

```js
var Todo = function ( content, done ) {
    this.content = ko.observable(content);
    this.done = ko.observable(done);
    this.editing = ko.observable(false);
};
```

注意：你可能会注意到上面的代码片段，我们正调用了一个KnockoutJS 命名空间ko上的方法observable()。在KnockoutJS中，可观察者是特定的js对象，它能够通知订阅者关于变更和自动化侦测依赖。这个允许我们在模型属性的值被修改的时候，同步模型和viewmodel。

## 视图

和mvc一样，视图是用户真实与应用程序交互的唯一部分。他们是代表viewmodel状态的交互式用户界面。在这个意义上，视图被认为是主动而不是被动。在mvc和mvp中的视图也是如此。在mvc,mvp和mvvm中，一个视图还可以是被动的，但是这个意味着什么呢？

一个被动的视图只能输入展示并且不能接收任何用户输入。

在我们的应用程序中，这样的视图也许还对模型没有真正的了解并且能够由提出人来操作。mvvm的活跃视图包含需要viewmodel的理解的数据绑定，事件和行为。虽然这些行为能够被映射到属性上，视图仍然负责处理viewmodel中的事件。

记住视图在这里不负责处理状态很重要。保持与viewmodel同步。

KnockoutJS视图是简单的带有连接到viewmodel的指定绑定的html文档。KnockoutJS视图展示viewmodel中的信息，给它传递命令（元素上的用户点击）以及随着viewmodel的状态变化而更新。然而，使用viewmodel中的数据生成标记的模板还能被用于这个目的。

给一个简单的初始案例，我们可以注意到jsmvvm框架KnockoutJS，如何允许viewmodel的定义以及它在标签中的相关绑定。

viewmodel

```js
var aViewModel = {
    contactName: ko.observable("John")
};
ko.applyBindings(aViewModel);
```

view

```js
<p><input id="source" data-bind="value: contactName, valueUpdate: 'keyup'" /></p>
<div data-bind="visible: contactName().length > 10">
    You have a really long name!
</div>
<p>Contact name: <strong data-bind="text: contactName"></strong></p>

```

我们的输入文本框从contactName获取它的初始值，无论contactName什么时候改变都会自动更新这个值。因为数据绑定是双向的，键入文本框会更新contactName响应的所以值总是同步。

尽管实现特定于KnockoutJS，<div>包含文本’you have a really long name‘,还包含简单的验证。如果输入超过了10个字符，它才会展示，否则它一直隐藏。

下面有一个更高级的案例。我们回到我们的代办应用程序。这是一个修剪的KnockoutJS视图，包括所有必要的数据绑定，或许看起来像下面这样。

```js
<div id="todoapp">
    <header>
        <h1>Todos</h1>
        <input id="new-todo" type="text" data-bind="value: current, valueUpdate: 'afterkeydown', enterKey: add"
               placeholder="What needs to be done?"/>
    </header>
    <section id="main" data-bind="block: todos().length">
 
        <input id="toggle-all" type="checkbox" data-bind="checked: allCompleted">
        <label for="toggle-all">Mark all as complete</label>
 
        <ul id="todo-list" data-bind="foreach: todos">
 
           <!-- item -->
            <li data-bind="css: { done: done, editing: editing }">
                <div class="view" data-bind="event: { dblclick: $root.editItem }">
                    <input class="toggle" type="checkbox" data-bind="checked: done">
                    <label data-bind="text: content"></label>
                    <a class="destroy" href="#" data-bind="click: $root.remove"></a>
                </div>
                <input class="edit" type="text"
                       data-bind="value: content, valueUpdate: 'afterkeydown', enterKey: $root.stopEditing, selectAndFocus: editing, event: { blur: $root.stopEditing }"/>
            </li>
 
        </ul>
 
    </section>
</div>
```

注意，基础的标签布局相对直接，包含了一个添加新项目的输入框，用于将项目标记为完整的切换器和使用li格式的代办项目的模板列表。

在上面标签中的数据绑定能够被分解像下面这样：

## ViweModel

viwemodel被认为是一个行为像一个数据转换器的特定控制器。它更改模型信息到视图信息中，从视图传递命令到模型。

例如，让我们想想一下，我们有一个包含unix格式的数据属性的模型。而不是用户的日期视角的数据。转换属性到它的展示格式在当中是很重要的，我们的模型简单的保存数据的原生格式。我们的视图包含格式化的日期以及我们的viewmodel行为像两者的中间人。

从这个意义上来说，viewmodel更像是一个模型，而不是视图，但是它处理大部分的视图展示逻辑。viewmodel也许还暴露出帮助维护视图状态的方法，基于视图上的行为更新模型以及触发视图上的事件。

总的来说（总之），viwemodel位于我们的ui层之后。通过视图暴露需要的数据，可以被视为视图的数据和操作源。

KnockoutJS解释viewmodel作为数据和操作的代表，它能够在ui上执行。这个不是ui本身，也不是持久化的数据模型，而宁可说是，一个层，它还可以保存用户正在使用的尚未保存的数据。Knockout的viewmodel由不了解html标签的js对象来实现。它的实现的抽象方法允许它们保持简单，意味着更多复杂的行为可以根据需要更容易地在顶层管理。

因此，我们地代办应用程序地部分KnockoutJS viewmodel可能看起来像下面这样。

```js
// our main ViewModel
    var ViewModel = function ( todos ) {
        var self = this;
 
    // map array of passed in todos to an observableArray of Todo objects
    self.todos = ko.observableArray(
    ko.utils.arrayMap( todos, function ( todo ) {
        return new Todo( todo.content, todo.done );
    }));
 
    // store the new todo value being entered
    self.current = ko.observable();
 
    // add a new todo, when enter key is pressed
    self.add = function ( data, event ) {
        var newTodo, current = self.current().trim();
        if ( current ) {
            newTodo = new Todo( current );
            self.todos.push( newTodo );
            self.current("");
        }
    };
 
    // remove a single todo
    self.remove = function ( todo ) {
        self.todos.remove( todo );
    };
 
    // remove all completed todos
    self.removeCompleted = function () {
        self.todos.remove(function (todo) {
            return todo.done();
        });
    };
 
    // writeable computed observable to handle marking all complete/incomplete
    self.allCompleted = ko.computed({
 
        // always return true/false based on the done flag of all todos
        read:function () {
            return !self.remainingCount();
        },
 
        // set all todos to the written value (true/false)
        write:function ( newValue ) {
            ko.utils.arrayForEach( self.todos(), function ( todo ) {
                //set even if value is the same, as subscribers are not notified in that case
                todo.done( newValue );
            });
        }
    });
 
    // edit an item
    self.editItem = function( item ) {
        item.editing( true );
    };
 ..
```

上面，我们基础地提供了需要添加地方法，编辑或者删除以及标记所有剩余项目为正在完成地逻辑。与前面地例子相比，viewmodel中唯一值得注意地真正区别是，可观察数组。在KnockoutJS中，如果我们想要在单独地对象上侦测和响应变更，我们能够使用可观察者。但是如果我们希望侦测和响应事物集合地变更，我们能是使用可观察着数组替代。一个如何使用可观察对象数据的更简单的案例也许看起来像这样：

```js
// Define an initially an empty array
var myObservableArray = ko.observableArray();
 
// Add a value to the array and notify our observers
myObservableArray.push( 'A new todo item' );
```

如果感兴趣，我们能够从上面的TodoMVC查看完整的Knockout.js代办应用程序 。

## 扼要重述：视图和viewmodel

视图和视图模型使用事件绑定和事件来通信。正如我们在我们的初始化视图模型案例中看到的，视图模型不仅暴露模型属性而且访问其他方法和特性，例如验证。

我们的视图处理它们自己的用户界面事件，必要时，映射它们到视图模型。视图模型上的模型和属性是同步的以及通过双向数据绑定来更新。

触发器还允许我们进一步响应在我们的模型属性的状态中的变更。

## 扼要重述：视图模型和模型

尽管可能会出现，视图模型完整的负责mvvm中的模型，有一些值得注意的微妙的关系。视图模型能够暴露以数据绑定为目的的模型或者还可以包含暴露在视图中的获取和操作的属性的界面。

## 赞成和反对

现在，我们有希望能够更好的鉴赏mvvm是什么以及它是如何工作的。让我们查看使用这个模式的优点和缺点：

优点：

mvvm促进更容易并行ui的开发，以及构建驱动它的块。
抽象视图而因此减少在它背后的代码中的业务逻辑的数量。
视图模型比事件驱动的代码更容易单元测试。
视图模型可以被测试，而不用关系ui自动化和交互。

缺点：

对于简单的ui，mvvm可能被过度使用。
尽管数据绑定能够被定义并且很好的进行工作，但是它们比命令代码更难调试，在命令代码中，我们设置断点很简单。
在重大应用程序中的数据绑定会创建大量薄记。我们也不想出现绑定比被绑定到的对象更重的情况。
在巨大的应用程序中，预先设计视图模型以获得必要的泛化量可能更加困难。

## 更宽松的数据绑定的mvvm

具有mvc或者mvp的背景的js开发者审查mvvm是很普遍的并且抱怨它真正的分离关注。换句话说，行内数据绑定数量，在视图的html标签中维护。

我必须承认，当我第一次看到mvvm的实现的时候，所有的开发者想要回到过去的日子让我很吃惊。在那里，我们在我们的标签中混合逻辑并且很快发现它不可维护。但是，事实是，mvvm有大量好的理由处理这个问题，包括促进设计是更容易给它们的标签绑定逻辑。

对于我们中的纯粹主义来说，我们很高兴了解到，现在我们还可以极大的减少我们对数据绑定有多么依赖，感谢一个被称为自定义绑定提供器的特定，KnockoutJS在1.3中引入，并且可以从之后的所有版本中获得。

KnockoutJS默认有一个数据绑定提供器，它搜索任何带有data-bind属性的元素，比如，像下面的案例：

```js
<input id="new-todo" type="text" data-bind="value: current, valueUpdate: 'afterkeydown', enterKey: add" placeholder="What needs to be done?"/>
```

当提供器定位到一个带有这个属性的元素，它会解析它，并以把它变进一个使用当前数据上下文的绑定对象。这个是KnockoutJS一直工作的方式，允许我们给元素声明地添加绑定。KnockoutJS绑定数据在那层。

一旦我们开始构建不再繁琐的视图，我们可能最终会遇到大量的元素和属性，它们在标记中的绑定可能会变得难以管理。但是有了自定义的绑定提供器，这就不再是问题了。

一个绑定提供器主要感兴趣的是两件事情：

当给出一个dom节点，它是否包含任意data-bindings。
如果节点通过了第一个问题，在当前数据上下文中，绑定对象看起来像什么。

绑定提供器实现两个函数：

nodeHasBindings：获取一个dom节点，不是必须是元素
getBindings：返回一个代表应用到当前数据上下文的绑定的对象

因此，一个骨架绑定器可能看起来像下面这样：

```js
var ourBindingProvider = {
  nodeHasBindings: function( node ) {
      // returns true/false
  },
 
  getBindings: function( node, bindingContext ) {
      // returns a binding object
  }
};
```