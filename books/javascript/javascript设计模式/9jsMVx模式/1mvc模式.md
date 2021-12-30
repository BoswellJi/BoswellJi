在这章中，我们打算回顾三个非常重要的架构模式-mvc,mvp和mvvm。过去，这些设计模式已经重度被使用于组织桌面和服务端应用，直到最近几年，才被应用于js中。

因为许多js开发者当前使用这些模式来选择实用的库，比如用mvc类的结构实现的Backbone.js，我们会比较现代解决方案如何，比如，与传统模式相比，它们对于mvc的解释有什么不同。

## MVC Model-view-controller

mvc鼓励通过关注点分离来改善应用程序组织的架构模式。它强迫从用户接口中（view）隔离业务数据（models）,以及一个传统的第三方组件（controllers）来管理逻辑和用户输入。此模式起初被TR设计，在他工作在smalltalk-80期间，它在那里起初被叫做Model-view-controller-Editor。在1995年的软件模式：可复用的面向对象软件元素中被深入描述，这对推广它的使用起到了作用。

## js开发者的mvc

我们已经回顾了70年代，但是让我们回到这里和当前。在现代，mvc模式已经被应用与不同的编程语言范畴，包括我们最熟知的：js。js现在有大量拥有mcv支持的框架（或者它的变种，我们成它为mv*家族），允许开发者轻松的添加结构到它的应用程序中，而不会有大影响。一个因为缺乏结构，非常难读，难维护的描述代码的术语。

这些框架包括，像Backbone,Ember.js和angularjs。指出避免意大利面条代码的价值。现代js开发者理解这个模式提供了什么是重要的。这个允许我们高效的领会，这些框架能够使我们做到什么不同的。

我们直到mvc由三个核心组件组成：

## 模型

模型管理一个应用程序的数据。它们既不关注用户接口也不关注呈现层，反而代表应用程序可能需要的唯一的数据格式。当模型改变的时候，它将会代表性的通知它的观察者（例如：views,我们之后会涉及的概念），以至于发生改变它们可以进行相应的反应。

为了进一步理解models，让我们想想一下，我们有一个js图片画廊应用程序。在图片画廊中，图片的概念值得有自己的模型，因为它代表唯一的特定领域数据的类型。比如一个模型可能包含相关的属性，比如标题，图片地址，以及额外的元数据。一个特定的图片会被存储在一个模型实例中以及模型还可以重用。下面我们能够看到一个使用backbone实现的非常简单的模型的案例。

```js
var Photo = Backbone.Model.extend({
    // Default attributes for the photo
    defaults: {
      src: "placeholder.jpg",
      caption: "A default image",
      viewed: false
    },
 
    // Ensure that each photo created has an `src`.
    initialize: function() {
       this.set( { "src": this.defaults.src} );
    }
});
```

模型内置的能力因框架而异，但是对于它们支持属性验证却相当统一的，其中的属性代表模型属性，比如模型的标识符。当我们在真实世界的应用程序中使用模型时，我们一般还希望模型持久化。持久化允许我们编辑和更新模型，了解模型的最新状态将保存在内存中，用户的本地存储数据存储中或与数据库同步。

另外，一个模型还可能被多个视图观察。如果说，我们的图片模型包含像它的位置（经度和纬度），在图片中出现的朋友以及标签列表等数据，一个开发者可能决定提供一个单一的视图来展示这三个方面的每个。

现代化MVC/MV*框架所提供的模型分组的方法这并不少见（例如：在backbone中，这些组被称为集合）。通过分组管理模型，我们可以根据来自组的通知编写应用程序逻辑，如果组中包含的任何模型发生了更改。这个避免了需要手动观察独立的模型实例。

一个模型分组进到简化的backbone集合的案例展示在下面。

```js
var PhotoGallery = Backbone.Collection.extend({
 
    // Reference to this collection's model.
    model: Photo,
 
    // Filter down the list of all photos
    // that have been viewed
    viewed: function() {
        return this.filter(function( photo ){
           return photo.get( "viewed" );
        });
    },
 
    // Filter down the list to only photos that
    // have not yet been viewed
    unviewed: function() {
      return this.without.apply( this, this.viewed() );
    }
});
```

关于mvc更老的文本可能还包含称为模型关系应用程序的概念`state`。在js应用程序中state有不同的含义，一般称为当前state,例如，在固定点上的用户屏幕的视图或者子视图（带有特定数据）。state是一个当你在了解单页应用程序时候才会正规讨论的话题，其中state的概念需要被模拟。

所以总的来说，models主要于业务数据有关。

## 视图 

views是一个可见的模型呈现，它呈现一个被过滤的它们当前状态的view。尽管smallTalk视图是关于绘制和维护位图，js视图是关于构建和维护dom元素。

一个视图一般监听一个模型并且当模型改变时被通知，允许视图进行相应的更新。设计模式文化一般称视图为哑，因为它们对于应用程序中的模型和控制器的了解很有限。

用户能够和视图交互，并且这个包括读取和编辑模型的能力。因为视图是呈现层，我们一般以用户友好的方式呈现编辑和更新的能力。例如，在我们更早讨论的图片走廊应用程序的样板中，模板编辑能够通过编辑视图来简化，在视图中，选择特定图片的用户能够编辑它的元数据。

更新模型的真实任务开始在控制器中。（我们之后将会涉及到。

让我们使用一个原生的js简单模板来进一步探索视图。下面我们能够看到一个创建了单个图片视图的函数。同时使用一个model实例和一个controller实例。

我们定义了一个实用的render()在我们视图中，它的责任是使用js模板引擎来渲染photoModel的内容，以及更新由phonoEl涉及到的我们视图的内容。

phonoModel添加了我们的render()回调作为他订阅者之一，以至于通过观察者模式我们能够触发视图的更新，在模型改变的时候。

有人可能想知道用户交互起到什么作用在这里。当用户点击点击视图中的任意元素时，直到下一步要做什么不是视图的责任。他依赖于控制器给他做决定。在我们的简单实现中，这是通过给photoEl添加事件监听器来完成的，他将委托给控制器来处理点击行为，传递模型信息以备不时之需。

这个架构的好处是，每个组件在开发应用程序功能中按需扮演着它自己的独立角色。

```js
var buildPhotoView = function ( photoModel, photoController ) {
 
  var base = document.createElement( "div" ),
      photoEl = document.createElement( "div" );
 
  base.appendChild(photoEl);
 
  var render = function () {
    // We use a templating library such as Underscore
    // templating which generates the HTML for our
    // photo entry
    photoEl.innerHTML = _.template( "#photoTemplate", {
        src: photoModel.getSrc()
    });
  };
 
  photoModel.addSubscriber( render );
 
  photoEl.addEventListener( "click", function () {
    photoController.handleEvent( "click", photoModel );
  });
 
  var show = function () {
    photoEl.style.display = "";
  };
 
  var hide = function () {
    photoEl.style.display = "none";
  };
 
  return {
    showView: show,
    hideView: hide
  };
};
```

## 模板

在支持MVC/MV*的js框架的上下文中，js模板和它相关的视图值得简短讨论一下，就像我们在上一章简短的谈及。

手动通过字符串拼接在内存中创建的大量html标签块，长期被认为是一个性能差的实践。这样做的开发人员陷入了低效地遍历数据地困境，包裹嵌套在div中地数据，以及使用过时的document.write技术，来注射模板到dom中。这通常意味着保持脚本标签内联和我们的标准标签，代码很快会变得难以阅读，并且更重要的是，维护像是灾难，尤其是在构建非平凡大小的应用程序。

js模板解决方案，经常被用来定义视图的模板作为包含模板变量的标签（要么存储外部要么带有像text/template的自定义类型的脚本标签）。变量可能使用变量语法来划定界限（例如：{{name}}）以及框架一般足够聪明的接收json格式的数据（模式形式能够转换成json数据）,以至于我们只需要关注和维护整洁的模型和模板。大部分与入口有关的繁重工作都由矿建本身来关照。这有大量好处，特别是在选择外部存储模板时，因为在构建较大的应用程序时，这可以让位于根据需要动态加载模板。

下面我们看到两个html模板的例子，一个使用流行的Handlebars.js框架的实现和使用Underscore的模板另一个实现。

Handlebars.js

```js
<li class="photo">
  <h2>{{caption}}</h2>
  <img class="source" src="{{src}}"/>
  <div class="meta-data">
    {{metadata}}
  </div>
</li>
```

Underscore.js Microtemplates

```js
<li class="photo">
  <h2><%= caption %></h2>
  <img class="source" src="<%= src %>"/>
  <div class="meta-data">
    <%= metadata %>
  </div>
</li>
```

注意模板不是它们本身视图，来自Struts Model2架构的开发人员可能觉得一个模板是一个视图，但是它不是。一个视图是一个观察一个模型的对象，并且持续更新可视的呈现。模板可能会成为一个指定一个视图对象的部分或者甚至全部的定义方式，以至于它能够从模板规格中被生成。

在经典的web开发中，它还值得注意，独立视图之间导航需要页面刷新的用法。但是在单页应js用程序中,一旦数据通过ajax从服务器获取到，它能在相同页面的新视图中被动态的刷新，没有任何必要的刷新。

因此导航的角色就落在了路由器身上，它坚持管理应用程序状态（例如：允许用户标记一个它们已经导航过的特定视图）。然而作为路由器，既不是mvc一部分，也不是在每个类mvc框架中，这章中，我不会继续深入更多的细节。

总的来说，视图是我们的应用程序数据的可视化呈现。

## 控制器

控制器是models和view之间的中间人，它通常的责任是在用户操作views时，用来更新model。

在我们的图片画廊应用程序中，控制器的责任是处理用户编辑特定图片视图的改变，当用户完成编辑时，会更新特定图片模型。

记住，控制器在mvc中担任一个角色：视图策略模式的简化。在策略模式方面，视图根据视图的考量委托给控制器。所以，那是策略模式如何工作。当视图觉得合适的时候，它会将处理用户事件委托给控制器。如果视图觉得合适，它会委托控制器来处理模型改变事件，但是这不是控制器的传统角色。

依据大部分mvc框架与传统的mvc的区别而言，它与控制器有关。这个变化的理由，然而在我看来，框架作者最初了解服务端mvc解释，意识到不能1：1的在客户端翻译，以及重新解释mvc中的c表示它们觉得更有意义的事情。然而这个这个问题时主观的，既增加了理解经典mvc模式的复杂度，当然又增加了现代化框架的控制器角色的复杂度。

作为案例，让我们简要回顾下流行架构框架backbon.js的架构。backbone包含模型和视图，（有点类似于我们前面回顾的内容）但是事实上，它没有真实的控制器。它的视图和路由器行为和控制器有点相似，但是，事实上也不是自己的控制器。

在这方面，在官方文档或者在博客文章中，可能与提到的相反，backbone既不是一个真实的MVC/MVP框架也不是一个MVVM框架。事实上，最好把它看作mv*家族的一员，它以自己的方式处理架构。当然这个没有错误，但区分经典mvc和 mv *是很重要的，我们是否应该开始依赖于关于前者的经典文献的建议来帮助后者。

## 另一个库（spine.js）中的控制器vs backbone.js

spine.js

我们现在知道了控制器的传统责任是用来更新模型在用户更新视图的时候。有趣的是，在撰写本文时，最流行的jsMVC/MV*框架（backbone.js）并没有它自己明确的控制器概念。

因此，复查另一个mvc矿建的控制器来鉴别不同的实现对我们来说是有用的，以及进一步演示，非传统的框架如何扮演控制器的角色。对于这个，让我们看看spine.js中的控制器案例。

在这个案例中，我们将会有一个叫做PhotoController的控制器，它会管理应用程序中的单独图片。当视图更新的时候，它会确保相应的模型也会被更新。（例如，一个用户编辑的图片元数据）

注意：我们一点也没有深入研究spine.js，但是我们只要稍微看看控制器中能做做什么：

```js
// Controllers in Spine are created by inheriting from Spine.Controller
 
var PhotosController = Spine.Controller.sub({
 
  init: function () {
    this.item.bind( "update", this.proxy( this.render ));
    this.item.bind( "destroy", this.proxy( this.remove ));
  },
 
  render: function () {
    // Handle templating
    this.replace( $( "#photoTemplate" ).tmpl( this.item ) );
    return this;
  },
 
  remove: function () {
    this.el.remove();
    this.release();
  }
});
```

在spine中，控制器被认为是应用程序的胶水，添加和相应dom事件，渲染模板，以及视图和模型保持同步。（在我们知道什么是控制器的上下文中，这很有意义）

我们正在上面的例子中使用render()和remove()来安装update和destroy监听器事件。当一个照片条目开始更新，我们重新渲染视图来相应元数据的改变。相似的，如果照片被从画廊中删除掉，我们会从视图中移除它。在render()函数中，我们正在使用underscore为模板（通过_template()）来渲染ID为phoneTemplate的js模板。这个简单返回一个被用来填充photoEl内容的被编译的html字符串。

这个提供给我们一个非常轻量，简单的管理模型与视图之间改变的方法。

Backbone.js

之后在这章，我们将会重新再访Backbone和传统mvc之间的不同，但是现在让我们聚焦在控制器。

在Backbone中，Backbone.View和Backbone.Router都共享控制器的责任。不久之前，Backbone曾经出现过它自己的Backbone.Controller,但是因为这个组件的命名对于它所使用的上下文没有意义，之后被重命名为Router。

路由器处理了更多的控制器职责，因为它能够为模型绑定事件，并让我们的视图相应dom事件和渲染。因为Tim Branyen之前还指出，可能根本不需要Backbone.Router，所以，思考使用Router范例的方式是可行的：

```js
var PhotoRouter = Backbone.Router.extend({
  routes: { "photos/:id": "route" },
 
  route: function( id ) {
    var item = photoCollection.get( id );
    var view = new PhotoView( { model: item } );
 
    $('.content').html( view.render().el );
  }
});
```

总的来说，这章的要点是控制器管理逻辑和应用程序中模型与视图之间的合作。

## mvc给了我们什么？

在mvc中关注点分离促进一个应用程序功能和启用的简单模块化。

1. 更容易整体维护。当需要对应用程序进行更新时，很明显，这些更改是以数据为中心，意味着对模型（可能还有控制器）的更改，或者仅仅是可视化的，意味着对视图的更改。
2. 解耦模型和视图意味着，给业务逻辑编写单元测试明显更直接。
3. 在整个应用程序中消除低级模型和控制器代码的重复。
4. 依赖应用程序的尺寸和角色的分离，这个模块化允许开发者负责核心逻辑，以及开发人员在用户界面上同时工作。

## js中的smalltalk-80 mvc

虽然大多现代js框架努力演化mvc的流程来更好的符合web应用程序开发的不同需求。有一个框架，它努力坚持在smalltalk-80中创造的模式的纯格式。由Peter Michaux 提供的一个实现Maria.js，他是忠诚于mvc的起源。Models是模型，Views是视图，控制器就是控制器。尽管一些开发者可能感觉一个mv*框架应该获取更多注意力，万一你想要一个原始的mvc的js实现，这是一个值得注意的有用的参考。

## 深入研究

在书的这一点上，我们应该对mvc模式提供了什么有了一个基础的理解。但是仍然有一些迷人的信息值得关注。

GoF没有把MVC称为一种设计模式，而宁可说是构建一个用户界面的类的集合。在他们看来，它实际上是三种经典设计模式的变种：`观察者模式`，`策略模式`，以及`组合模式`。取决于mvc如何在框架中实现，他可能还使用`工厂模式`和`模板模式`。Gof中提到的这些模式当使用mvc时非常有用。

像我们已经讨论过的，模型代表应用程序的数据，然而视图是呈现在用户的屏幕上的。例如，mvc依赖观察者模式进行一些它的核心的交流（令人吃惊的是，没有在许多关于mvc模式的文章中被谈及）。`当一个模型被更改时，它通知它的观察者，更新某些东西-这个可能是mvc种最重要的关系`。这个关系的观察者本质是促进多个视图联合到相同的模型上。

开发人员对了解更多解耦的mvc本质感兴趣（一旦开始，取决于实现），这个模式的目标之一是帮助定义`话题(数据对象)`和`它的观察者`之间的一对多的关系。当话题改变时，它的观察者被更新，视图和控制器有稍微不同的关系。控制器促进视图响应不同用户输入以及是策略模式的案例。

## 总结

回顾了经典mvc模式，我们现在应该理解了它是如何允许我们在应用程序种干净地分离关注点的。我们现在还应该能鉴别jsmvc框架在对mvc模式的解释是如何不同的，尽管它很容易发生变化，仍然分享了一些原始模式提供的基本概念。

当评估一个新的jsmvc/mv*框架，记住，回顾一下它是如何选择处理架构的，这很有用。（尤其是，它如何支持实现模型，视图，控制器或者其他替代品）因为这能更好的帮助我们深刻了解，框架期待如何被使用。
