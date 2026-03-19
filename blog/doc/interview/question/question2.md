HTML部分：

1. 将 HTML5 看作成开放的网络平台，什么是 HTML5 的基本构件（building block）？

语义 - 提供更准确地描述内容。
连接 - 提供新的方式与服务器通信。
离线和存储 - 允许网页在本地存储数据并有效地离线运行。
多媒体 - 在 Open Web 中，视频和音频被视为一等公民（first-class citizens）。
2D/3D 图形和特效 - 提供更多种演示选项。
性能和集成 - 提供更快的访问速度和性能更好的计算机硬件。
设备访问 - 允许使用各种输入、输出设备。
外观 - 可以开发丰富的主题。

2. 请描述`<script>`、`<script async>`和`<script defer>`的区别？

1. `<script>` - HTML 解析中断，脚本被提取并立即执行。执行结束后，HTML 解析继续。
1. `<script async>` - 脚本的提取、执行的过程与 HTML 解析过程并行，脚本执行完毕可能在 HTML 解析完毕之前。当脚本与页面上其他脚本独立时，可以使用 async，比如用作页面统计分析。
1. `<script defer>` 脚本仅提取过程与 HTML 解析过程并行，脚本的执行将在 HTML 解析完毕后进行。如果有多个含 defer 的脚本，脚本的执行顺序将按照在 document 中出现的位置，从上到下顺序执行。

1. 为什么在`<img>`标签中使用srcset属性？请描述浏览器遇到该属性后的处理过程？

因为需要设计响应式图片。我们可以使用两个新的属性——srcset 和 sizes——来提供更多额外的资源图像和提示，帮助浏览器选择正确的一个资源。
srcset 定义了我们允许浏览器选择的图像集，以及每个图像的大小。
sizes 定义了一组媒体条件（例如屏幕宽度）并且指明当某些媒体条件为真时，什么样的图片尺寸是最佳选择。
所以，有了这些属性，浏览器会：

1. 查看设备宽度
2. 检查 sizes 列表中哪个媒体条件是第一个为真
3. 查看给予该媒体查询的槽大小
4. 加载 srcset 列表中引用的最接近所选的槽大小的图像

5. HTML5 有哪些新特性？

6. 引入了语义化标签
7. 媒体标签
8. input 标签的扩展
9. 数据存储
10. 绘画canvas
11. webworker
12. websockt
13. Geolocation
14. webRTC
    10.webGL
15. 等

16. 行内元素和块级元素是什么?img算什么?行内元素怎么转化为块级元素?

行内元素：和有他元素都在一行上，高度、行高及外边距和内边距都不可改变，文字图片的宽度不可改变，只能容纳文本或者其他行内元素；
块级元素：总是在新行上开始，高度、行高及外边距和内边距都可控制，可以容纳内敛元素和其他元素；
其中img是行元素
给行内元素设置display:block;

CSS部分：

1. CSS3 新增了那些东西？

- 选择器
- 盒子模型属性：border-radius、box-shadow、border-image
- 背景：background-size、background-origin、background-clip
- 文本效果：text-shadow、word-wrap
- 颜色：新增 RGBA，HSLA 模式
- 渐变：线性渐变、径向渐变
- 字体：@font-face
- 2D/3D 转换：transform、transform-origin
- 过渡与动画：transition、@keyframes、animation
- 多列布局
- 媒体查询
- 等

2. tranistion 和 animation 的区别

- 过渡没法精准控制动画每一帧，动画可以
- 过渡只能触发一次，动画可以无限循环

3. css盒模型有哪些及区别?

- content-box:这是默认样式指定CSS标准。测量width和height属性只包括的内容，但不包含border, margin, 或者 padding。
- border-box:IE使用的怪异模式，width和height属性包括padding和border，但不包含margin。

4. css 中的选择器权重大小是怎样的？

- 每种 css 的选择器都有自己的权重值，important>style>id>class>elemnt,当选择器组合起来时，权重值的累加之和最大的选择器起作用。

5. css 中的响应式单位？

- rem：相对于网页的 html 节点的`font-size`的大小来计算的，`1rem = 100px`,可以根据页面视口大小来调整 html 节点`font-size`的大小，从而控制页面元素的大小。
- em: 相对于父元素的`font-size`的大小来计算的。
- vw: 相对于视口`width`的`1%`。
- vh: 相对于视口`height`的`1%`。
- vmin: 视口的宽度和高度中的较小值
- vmax: 视口的宽度和高度中的较大值

6. css 中的布局技术

- float
- position
- flex
- grid

7. 介绍 Flex 布局

- 弹性盒子布局：是一种用于按行或按列布局元素的一维布局方法，元素可以膨胀以填充额外的空间，收缩以适应更小的空间。

8. 容器属性

- 如何设置主轴方向：flex-direction
- 如何让子元素换行： flex-wrap
- 说出 space-between 和 space-around 的区别？

这个是 flex 布局的内容，其实就是一个边距的区别，按水平布局来说，space-between 是两端对齐，在左右两侧没有边距，而 space-around 是每个 子项目左右方向的 margin 相等，所以两个 item 中间的间距会比较大

9. 子元素属性

- flex 是什么属性的缩写： flex-grow、flex-shrink 和 flex-basis
- align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性

10. CSS 外边距重叠问题及解决办法

- 只有块级元素`(display:block)`会发生外边距重叠
- 外边距叠加存在两种情况：一是父子外边距叠加；二是兄弟外边距叠加。

```css
.box1 {
  height: 300px;
  width: 300px;
  background-color: antiquewhite;
  margin-bottom: 100px;
}
.box2 {
  height: 100px;
  width: 100px;
  background-color: aqua;
}
.box2 {
  margin-top: 100px;
}
```

```html
<div class="box1">
  <div class="box2"></div>
</div>
```

- 解决方案

1. 给父元素或子元素开启 BFC
2. 用点东西将父子元素的边缘隔开

3. 水平垂直居中

```css
 {
  display: flex;
  align-items: center;
  justify-content: center;

  poasition: absolte;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

12. 使用 flex 布局开发一个一行两列，左边固定宽度，不会缩放，右边自适应的布局

```css
.left {
  flex: 0 100px;
}
.right {
  flex: 1;
}
```

13. 两列等高（使多列布局中的所有列采用相同的高度，即使它们包含的内容量不同）

```css
 {
  align-items: stretch;
}
```

14. 多行文本溢出省略效果

```css
 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; //行数
  overflow: hidden;
}
```

15. 如何用 CSS 实现一个三角形

```html
<div></div>
```

```css
div {
  width: 0;
  height: 0;
  border: 10px solid red;
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
}
```

16. 如何实现一个自适应的正方形

```css
.square {
  width: 10vw;
  height: 10vw;
  background: red;
}

.square {
  width: 10%;
  padding-bottom: 10%;
  height: 0; // 防止内容撑开多余的高度
  background: red;
}
```

17. 如果一个元素出现滚动条，你想去掉这个滚动条，你该如何排查

- 首先查看是否元素中的子元素宽度超出
- 如果不超出，就看子元素的子元素宽度是否超出

18. 块级格式化上下文（block formatting context）

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

1. float 的值不为 none;
2. position 的值不是 static 或者 relative;
3. display 的值是 inline-block,table-cell,flex,table-caption 或者 inline-flex;
4. overflow 的值不是 visible;

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

JavaScript部分：

1. es6 及其以后的所有被加到标准中的新特性罗列，想到多少说多少,不能少于15个？

- let const
- 箭头函数
- 模板字符串
- 增强对象
- Promise
- async await
- 解构赋值
- 展开运算符
- for of
- 可选链操作符
- bigInt
- symbol
- .....

参考：https://github.com/tc39/proposals/blob/HEAD/finished-proposals.md

2. 声明变量的三个关键字是什么？var、const 和 let 的主要区别是什么？

- var、const 和 let
- let 是变量，const 是常量
- 用 let 和 const 声明的变量是块范围的；用 var 声明的变量是全局范围的或函数范围的。
- var 变量可以在其范围内更新和重新声明；让变量可以更新但不能重新声明；const 变量既不能更新也不能重新声明。
- var 可以提升到其作用域的顶部。其中 var 变量初始化为未定义，let 和 const 变量未初始化（临时死区，TDZ）。
- 虽然可以在不初始化的情况下声明 var 和 let，但必须在声明期间初始化 const。

3. ==和===的区别

- ==两边的操作项会发生隐式类型转换再进行值比对
- ===两边的操作项会比对类型和值

4. js 中的小数计算会有什么问题？如何解决

- 精度缺失问题
- 因为js整数计算没问题，所以要往整数上靠，转换为整数后再计算,然后再换算回来。

5. 箭头函数的 this 指向？

- 指向父级作用域的 this 对象
- 箭头函数不会受到 call,apply,bind 的影响

6. 如何修改一个函数中的 this 指向

- bind(obj),call(obj,a,b),apply(obj,[])

7. Vue2,3 中的响应式功能，依赖了 js 的什么特性

1. Object.defineProperty(obj,'x',{get(){},set(){}})
1. new Proxy(obj,{get(){},set(){}})

1. 模块的导入导出用法

- export const a = 0; export default {}
- import { a }; import a

9. 什么是跨域?解决方案?

浏览器的同源策略，同源是指"协议+域名+端口"三者相同，有一个不相同即为跨域。

解决方案

- 代理
- cors
- jsonp

请描述一下cookies、sessionStorage和localStorage区别？

- cookie是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）。
- cookie数据始终在同源的http请求中携带（即使不需要），即会在浏览器和服务器间来回传递。
- sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存
  存储大小：
- cookie数据大小不能超过4K。
- sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。
  有期时间：
- localStorage：存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；
- sessionStorage：数据在当前浏览器窗口关闭后自动删除
- cookie：设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭

10. jsonp 的原理

- 利用 script 跨域机制，将数据包裹再 js 函数调用中，传递给已经定义好的函数,但限于script只能发起get请求，没办法发送post请求。

11. 什么是原型

- 构造函数的prototype指向的一个对象，也叫原型对象，是每一个从构造函数中实例化来的实例对象的原型。每个实例对象存在一个**proto**属性指向自己的原型对象。

12. 什么是原型链

- 原型对象也是一个实例对象也会指向自己的原型对象，一层一层向上指向形成的链路

13. 如何创建一个没有原型的对象

- Object.create(null)
- 将构造函数的prototype属性设置为null

14. 原型的使用场景

- 面向对象编程
- 利用继承，扩展对象的原型能力

15. 什么是闭包，闭包在项目中的应用场景？

- 能够访问外部函数作用域中的变量的函数，叫做闭包
  应用
- 防抖，节流
- 内部成员变量

16 一个 Promise 实例有哪些状态？

1. resolved
2. pending
3. rejected

17 Promise 中异常处理方式

- new Promise().catch()
- new Promise((reslove,reject)=>{},(err)=>{})
- async awiat，使用 try{}catch(e){}finally{}

18. `catch`方法后的`then`方法还会执行吗

- 会

19 如何进行异步编程，串行，并行

串行：

- then(): 等待上一个promise实例结束，返回下一个promise实例
- async await

- 并行：

- Promise().all()
- 同步顺序调用即可

20 数组去重

- 原生方法：[...new Set([1,2,3,4,1])]
- 利用js对象的数据结构，key的唯一性
- 不可暴力算法

21 冒泡排序

- 思路： 从第一位开始与相邻元素进行比对，大数两方交换，一直对比到最后。

function bubbleSort(arr) {
for (let i = 0, len = arr.length; i < len; i++) {
for (let j = 0; j < len - 1 - i; j++) {
if (arr[j] > arr[j + 1]) {
const temp = arr[j];
arr[j] = arr[j + 1];
arr[j + 1] = temp;
}
}
}
return arr;
}

22 快速排序

- 思路：选取一个中间数，将数组根据中间数分为两组，进行递归。

function quickSort(arr) {
if (arr.length < 2) {
return arr;
}

let less = [];
let great = [];
let max = arr[0];

for (let i = 1, len = arr.length; i < len; i++) {
if (arr[i] > max) {
great.push(arr[i]);
} else {
less.push(arr[i]);
}
}

return quickSort(less).concat([max], quickSort(great));
}

23. 给出一个字符串如下aaaa{0}bbbb{1}cccc{2}ccc，再给出一个数组[1,2,3]，将字符串的占位符替换为数组对应索引的值

'aaaa{0}bbbb{1}cccc{2}ccc'.replace(/{(\d+)}/ig,function(...args){
return [1,2,3]args[1]];
})

Vue3部分：

1. 如何创建一个全局组件？

- Vue.create.component()

2. 如何覆盖子组件的样式

- v-deep(选择器){}/:deep(选择器){}

3. 父子组件如何通信？

- defineProps() , defineEmits() ：输入属性和事件回调
- ref $parent：父子组件实例
- pinia：状态管理工具
- ......
