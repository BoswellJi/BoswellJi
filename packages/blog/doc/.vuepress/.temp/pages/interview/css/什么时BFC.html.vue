<template><h2 id="块级格式化上下文-block-formatting-context" tabindex="-1"><a class="header-anchor" href="#块级格式化上下文-block-formatting-context" aria-hidden="true">#</a> 块级格式化上下文（block formatting context）</h2>
<h2 id="什么是box" tabindex="-1"><a class="header-anchor" href="#什么是box" aria-hidden="true">#</a> 什么是Box?</h2>
<ul>
<li>盒模型，每个html元素有自己的盒模型;</li>
<li>不同类型的box会参与不同的Formatting Context;</li>
</ul>
<h2 id="什么是formatting-context" tabindex="-1"><a class="header-anchor" href="#什么是formatting-context" aria-hidden="true">#</a> 什么是formatting context</h2>
<ul>
<li>页面的一块渲染区域，有一套自己的渲染规则，它决定着子元素将如何定位，以及与其他元素的关系和相互作用；</li>
<li>常见的<code>formatting context</code>有<code>block formatting context(BFC)</code>,<code>inline formatting context(IFC)</code>,css3中有<code>GFC,FFC</code>；</li>
<li>容器内的子元素不会影响到外面的元素；</li>
</ul>
<h2 id="bfc中的布局规则" tabindex="-1"><a class="header-anchor" href="#bfc中的布局规则" aria-hidden="true">#</a> BFC中的布局规则</h2>
<ul>
<li>内部box会垂直方向，一个接一个放置；</li>
<li>box垂直方向的距离有margin决定，属于同一个BFC的两个相邻margin会发生重叠；</li>
<li>BFC的区域不会与float box重叠；</li>
<li>计算BFC的高度时，浮动元素也参与计算；</li>
<li>BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此；</li>
<li>每个盒子（块盒与行盒）的margin box的左边，与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此；</li>
</ul>
<h2 id="创建bfc" tabindex="-1"><a class="header-anchor" href="#创建bfc" aria-hidden="true">#</a> 创建BFC</h2>
<ol>
<li>float的值不为none;</li>
<li>position的值不是static或者relative;</li>
<li>display的值是inline-block,table-cell,flex,table-caption或者inline-flex;</li>
<li>overflow的值不是visible;</li>
</ol>
<h2 id="bfc的作用" tabindex="-1"><a class="header-anchor" href="#bfc的作用" aria-hidden="true">#</a> BFC的作用</h2>
<p>根据BFC容器的布局规则，在需要的时候，创建BFC容器来布局。</p>
<ol>
<li>避免margin重叠；</li>
<li>自适应两栏布局；</li>
<li>清除浮动；</li>
</ol>
</template>
