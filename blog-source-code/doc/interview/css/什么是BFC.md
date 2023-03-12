## 块级格式化上下文（block formatting context）

## 什么是Box?

* 盒模型，每个html元素有自己的盒模型;
* 不同类型的box会参与不同的Formatting Context;

## 什么是formatting context

* 页面的一块渲染区域，有一套自己的渲染规则，它决定着子元素将如何定位，以及与其他元素的关系和相互作用；
* 常见的`formatting context`有`block formatting context(BFC)`,`inline formatting context(IFC)`,css3中有`GFC,FFC`；
* 容器内的子元素不会影响到外面的元素；

## BFC中的布局规则

* 内部box会垂直方向，一个接一个放置；
* box垂直方向的距离有margin决定，属于同一个BFC的两个相邻margin会发生重叠；
* BFC的区域不会与float box重叠；
* 计算BFC的高度时，浮动元素也参与计算；
* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此；
* 每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此；

## 创建BFC

1. float的值不为none;
2. position的值不是static或者relative;
3. display的值是inline-block,table-cell,flex,table-caption或者inline-flex;
4. overflow的值不是visible;

## BFC的作用

根据BFC容器的布局规则，在需要的时候，创建BFC容器来布局。

1. 避免margin重叠；
2. 自适应两栏布局；
3. 清除浮动；