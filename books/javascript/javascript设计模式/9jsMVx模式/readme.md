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

## views 

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

控制器是models和view之间的中间人，它经典的责任是在用户操作views时，用来更新model。

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

## MVP Model-view-presenter

mvp是mvc设计模式的派生，它聚焦在改善展示逻辑上。在1990年初，它在一个叫做Taligent的公司被发明，当时他们正在为c++通用点环境开发模型。尽管mvc和mvp目的都是跨多组件的关注点分离，它们之间还是有一些基本的不同的。

对于这个总结的目的，我们将会聚焦在最适合web基础架构的mvp版本。

## Models,Views,Presenters

mvp中的p表示呈现者。它是一个包含视图的用户接口业务逻辑的组件。不像mvc,调用视图被委托给呈现者，它从视图中解耦，而是通过接口与它对话。这个对所有有用的事情友好，比如：能够在单元测试中模拟视图。

mvp最常见的实现是使用一个包含没有逻辑的标题的被动视图。如果mvc和mvp不同，那是因为c和p做不同得事情。在mvp中，p观察models并且当models改变的时候更新views。p高效的绑定models到views,这是以前由mvc中的controllers持有的责任。

通过视图请求，表现者执行任何处理用户请求的工作，并且把数据回传给视图。在这个层面，他们保留数据，维护它以及和持久化数据的服务层进行交互（模型）。模型可能会触发事件，但是模型是订阅它们的表现者的角色以至于它能更新视图。在这个被动的架构中，我们没有直接数据绑定的概念。视图暴露了表现者能够用来设置数据的设置器（setters）。

mvc中的这个改变的好处是增加了我们应用程序的可测试性以及以及给视图和模型之间提供了一个更加干净的分离。但是这个不是没有代价的，因为在这个模式中缺少数据绑定的支持通常意味着必须关照这个分离的任务。

尽管被动视图的常用实现是用来实现一个界面的视图，也有不同的版本，包括事件的用法，它可以更能够从展现者中解耦视图。因为在js中我们没有界面结构，所以这里我们使用协议比使用一个显示的界面更多。从技术上讲，它仍然是一个api，并且从这个视角来看。称它为界面可能它对我们是公平的。

还有一个mvp的超级版本控制器变种，它更接近mvc和mvvm模式，因为它提供模型直接从视图中数据绑定。`键值观察(KVO)插件(如Derick Bailey的Backbone)。倾向于从被动视图中提取Backbone，更多地进入监督控制器或MVVM变体`。

## mvp或者mvc

mvp一般最通常被用在企业级应用程序中，尽可能多的复用展现逻辑在其中是很必要的。非常复杂的视图的应用程序和大量用户交互可能发现这里mvc不太适合这个需求作为需要重度依赖多控制器的问题的解决方案。在mvp中，所有复杂逻辑都能够被封装到展现者中，它能够更好简化维护。

因为mvp视图通过界面被定义，以及技术上来说，界面只是系统和视图之间的联系人（除了展现者以外），这个模式还允许开发者编写展现逻辑，不需要等待设计者产出应用程序的布局和图形。

取决于实现，mvp或许比mvc更容易自动化单元测试。经常被引用的理由是展现者能够被用作完整的用户界面的模拟以及它能够独立于其他组件进行单元测试。在我的经验中，这个真的取决于我们实现mvp使用的语言（在js项目中选择mvp和asp.net选择mvp有很大不同。）

最终，考虑到mvc和mvp的之间的不同是语义上的，所以mvc担忧的问题，mvp可能同样会有。只要我们干净地分离关注到模型，视图和控制器（或者展现者）中，尽管我们选择变种，我们也能够获取相同的最大收益。

## mvc,mvp和backbone.js

非常少的，如果任何架构js框架宣称使用它们经典格式实现mvc或者mvp模式，许多开发人员并不认为mvc和mvp是互斥的。（事实上，在我们了解像asp.net或者gwt的web框架时，更可能了解严格实现的mvp）。这是因为它能够有额外的展现者/视图逻辑在我们的应用程序中，但是仍然认为它是一种mvc的风格。

backbone贡献者赞同这种思维方式，当她将视图分离成各自不同的组成部分时，她需要一些东西来把它们组装起来。这可以是一个控制器路由，或者一个回调来响应正在获取的数据。

那就是说，不管怎样，一些开发者感觉backbone.js更适合mvp的描述比用mvc。他们的观点是这样：

* mvp中的展现者比控制器能更好的描述Backbone.View（在视图模板与绑定它的数据之间的层）
* 模型适合Backbone.Model（它和mvc中的模型根本不同）
* 试图最能代表模板


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