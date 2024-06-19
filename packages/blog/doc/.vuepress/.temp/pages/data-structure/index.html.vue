<template><div><h2 id="数据类型" tabindex="-1"><a class="header-anchor" href="#数据类型"><span>数据类型</span></a></h2>
<ul>
<li>是指一组值和一组对这些值的操作的集合；原则上所有的程序语言只需要使用原始数据类型即可，为了在更高层次的抽象上编写程序会更加方便；</li>
</ul>
<h3 id="原始类型" tabindex="-1"><a class="header-anchor" href="#原始类型"><span>原始类型</span></a></h3>
<ul>
<li>布尔</li>
<li>字符</li>
<li>浮点</li>
<li>定点数</li>
<li>整型：固定精度的值</li>
<li>引用：指针或者句柄</li>
<li>枚举类型</li>
<li>日期类型</li>
</ul>
<h3 id="组合类型非原始类型" tabindex="-1"><a class="header-anchor" href="#组合类型非原始类型"><span>组合类型非原始类型</span></a></h3>
<ul>
<li>数组</li>
<li>记录：关联数组，映射，结构</li>
<li>联合</li>
</ul>
<h2 id="数据结构" tabindex="-1"><a class="header-anchor" href="#数据结构"><span>数据结构</span></a></h2>
<ul>
<li>
<p>实现了数据类型的物理形式；</p>
</li>
<li>
<p>数据结构决定数据的顺序和位置关系；</p>
</li>
<li>
<p>案例：电话簿的存储方式</p>
</li>
</ul>
<ol>
<li>顺序存储法；</li>
</ol>
<p>优点： 新增快；不用考虑位置；
缺点： 查询满；只能遍历对比；</p>
<ol start="2">
<li>分组存储法；（按照姓名的字面的排序</li>
</ol>
<p>优点： 查询快；
缺点： 新增慢；</p>
<ul>
<li>数据结构的作用： 根据使用的目的来选择合适的数据结构，可以提高内存利用率，以及数据操作效率；</li>
<li>数据在内存中是呈线性排列的，我们可以使用指针等道具，构造出类似的<code v-pre>树形</code>的复杂结构；</li>
</ul>
<h3 id="数据结构分类" tabindex="-1"><a class="header-anchor" href="#数据结构分类"><span>数据结构分类</span></a></h3>
<ul>
<li>线性数据结构</li>
<li>树</li>
<li>基于哈希的结构</li>
<li>图</li>
<li>其他</li>
</ul>
<h3 id="案例" tabindex="-1"><a class="header-anchor" href="#案例"><span>案例：</span></a></h3>
<ul>
<li>关系型数据库使用B-tree索引进行数据检索；</li>
<li>编译器使用哈希表来查找身份；</li>
</ul>
<h4 id="array" tabindex="-1"><a class="header-anchor" href="#array"><span>array</span></a></h4>
<h4 id="linked-list" tabindex="-1"><a class="header-anchor" href="#linked-list"><span>linked list</span></a></h4>
<h4 id="record" tabindex="-1"><a class="header-anchor" href="#record"><span>record</span></a></h4>
<ul>
<li>也被叫做元组或者结构体；是一个集体的数据结构；</li>
</ul>
<h4 id="union" tabindex="-1"><a class="header-anchor" href="#union"><span>union</span></a></h4>
<ul>
<li>指定可以在其实例中存储许多允许的基元类型中的哪一种；</li>
</ul>
<h4 id="tagged-union" tabindex="-1"><a class="header-anchor" href="#tagged-union"><span>tagged union</span></a></h4>
<ul>
<li>也叫做变体，变体记录，可区分的联合，不相交并集</li>
</ul>
<h4 id="object" tabindex="-1"><a class="header-anchor" href="#object"><span>object</span></a></h4>
<ul>
<li>包含数据字段；</li>
</ul>
<h2 id="数据结构的存储模型" tabindex="-1"><a class="header-anchor" href="#数据结构的存储模型"><span>数据结构的存储模型</span></a></h2>
<ol>
<li>只有两种存储数据结构的方式： 数组（序列存储）和链表（链式存储）；</li>
</ol>
<h2 id="各种数据结构的遍历和访问都属于两种类型中的一种" tabindex="-1"><a class="header-anchor" href="#各种数据结构的遍历和访问都属于两种类型中的一种"><span>各种数据结构的遍历和访问都属于两种类型中的一种：</span></a></h2>
<ol>
<li>线性；</li>
</ol>
<ul>
<li>线性代表迭代；</li>
</ul>
<ol start="2">
<li>非线性；</li>
</ol>
<ul>
<li>非线性代表递归；</li>
</ul>
<h2 id="数据结构如何用来解决问题" tabindex="-1"><a class="header-anchor" href="#数据结构如何用来解决问题"><span>数据结构如何用来解决问题</span></a></h2>
<ul>
<li>根据问题分析出需要使用的数据结构（数据模型</li>
</ul>
</div></template>


