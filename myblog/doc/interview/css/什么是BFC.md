# 块级格式化上下文（block formatting context）

## 什么是 Box?

- 盒模型，每个 html 元素有自己的盒模型;
- 不同类型的 box 会参与不同的 Formatting Context;

## 什么是 formatting context

- 页面的一块渲染区域，有一套自己的渲染规则，它决定着子元素将如何定位，以及与其他元素的关系和相互作用；
- 常见的`formatting context`有`block formatting context(BFC)`,`inline formatting context(IFC)`,css3 中有`GFC,FFC`；
- 容器内的子元素不会影响到外面的元素；

## BFC 中的布局规则

- 内部 box 会垂直方向，一个接一个放置；
- **box 垂直方向的距离有 margin 决定，属于同一个 BFC 的两个相邻 margin 会发生重叠**
- BFC 的区域不会与 float box 重叠；
- 计算 BFC 的高度时，浮动元素也参与计算；
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此；
- 每个盒子（块盒与行盒）的 margin box 的左边，与包含块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此；

## 创建 BFC

```txt
1. float 的值不为 none;
2. position 的值不是 static 或者 relative;
3. display 的值是 inline-block,table-cell,flex,table-caption 或者 inline-flex;
4. overflow 的值不是 visible;
```

## BFC 的作用

根据 BFC 容器的布局规则，在需要的时候，创建 BFC 容器来布局。

1. 避免 margin 重叠，父子元素的 margin 重叠。由于 BFC 是一个独立的区域，内部的元素和外部的元素互不影响，将两个元素变为两个 BFC，就解决了 margin 重叠的问题，兄弟元素的 margin 重叠。
2. 自适应两栏布局；可以用来创建自适应两栏布局：左边的宽度固定，右边的宽度自适应。

```css
.left {
  width: 100px;
  height: 200px;
  background: red;
  float: left;
}
.right {
  height: 300px;
  background: blue;
  overflow: hidden;
}
```

```html
<div class="left"></div>
<div class="right"></div>
```

3. 清除浮动，父元素高度塌陷问题
