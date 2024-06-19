<template><div><h1 id="编译器" tabindex="-1"><a class="header-anchor" href="#编译器"><span>编译器</span></a></h1>
<h2 id="主要部分" tabindex="-1"><a class="header-anchor" href="#主要部分"><span>主要部分</span></a></h2>
<ul>
<li>Scanner 扫描器</li>
<li>Parser 解析器</li>
<li>Binder 绑定器</li>
<li>Checker 检查器</li>
<li>Emitter 发射器</li>
</ul>
<h2 id="编译过程" tabindex="-1"><a class="header-anchor" href="#编译过程"><span>编译过程</span></a></h2>
<ol>
<li>Token : 流，单词</li>
<li>AST: 抽象语法树</li>
<li>Symbols: 符号</li>
</ol>
<ul>
<li>SourceCode -&gt; Scanner -&gt; Token</li>
<li>Token -&gt; Parser -&gt; AST</li>
<li>AST -&gt; Binder -&gt; Symbols</li>
<li>AST + Symbols -&gt; Checker -&gt; 类型验证</li>
<li>AST + Checker -&gt; Emitter -&gt; js SourceCode</li>
</ul>
<h2 id="语用" tabindex="-1"><a class="header-anchor" href="#语用"><span>语用</span></a></h2>
<ul>
<li>todo...</li>
</ul>
<h2 id="pl" tabindex="-1"><a class="header-anchor" href="#pl"><span>PL</span></a></h2>
<ul>
<li>语法</li>
</ul>
<p>字符组合成合法语句排列规则，指用字符组合成合法语句的规则集（KEMIN:字符先通过词法,组词或字串，再由代表不同句子成分的词组合成语句）。语法定义语言的各种要素间的形式关系（KEMIN：什么要素，什么关系？），因此给出了语言中各种不同的合法的语句的结构描述。语法只关注句法结构，不管其含义，那是语义的事。</p>
<ul>
<li>语义</li>
</ul>
<p>合法语句的含义<code v-pre>就是程序的含义</code>。 对于编程语言来说，描述了计算机执行一个程序时所表现的行为。 揭示语义的行为包括描述程序输入输出之间的关系，逐步解说程序如何在真实或抽象机器的<code v-pre>执行过程</code>等。 考虑程序含义的最实际方法是思考它做了些什么：在运行程序的时候，我们期望发生什么呢？在运行时编程语言中不同的结构都是如何表现的？把它们放到一起组成更大的程序时会是什么效果？这是操作语义学（ operational semantic）的基础，这种方法为程序在某种机器上的执行定义一些规则，以此来捕捉编程语言的含义。这个机器常常是一种抽象的机器。</p>
<ul>
<li>
<p>编译时</p>
<ul>
<li>
<p>类型安全</p>
<ul>
<li>类型系统
<ul>
<li>类型推断</li>
<li>模式匹配</li>
</ul>
</li>
</ul>
</li>
<li>
<p>内存安全</p>
</li>
</ul>
</li>
<li>
<p>运行时</p>
<ul>
<li>标准库</li>
</ul>
</li>
</ul>
</div></template>


