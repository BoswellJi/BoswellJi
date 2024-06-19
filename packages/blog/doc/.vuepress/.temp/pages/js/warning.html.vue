<template><div><h2 id="对象的遍历" tabindex="-1"><a class="header-anchor" href="#对象的遍历"><span>对象的遍历?</span></a></h2>
<ul>
<li>for ... in: 自身属性以及继承来的属性，你可以使用 obj.hasOwnProperty(key)来检查；</li>
<li>Object.keys(obj): 只会列出可枚举的属性；</li>
<li>Object.getOwnPropertyName(): 列出可枚举和不可枚举的属性；</li>
</ul>
<h2 id="浮点数计算" tabindex="-1"><a class="header-anchor" href="#浮点数计算"><span>浮点数计算?</span></a></h2>
<ul>
<li>不要相信所有 js 的浮点数计算；</li>
</ul>
<h2 id="正则表达式" tabindex="-1"><a class="header-anchor" href="#正则表达式"><span>正则表达式</span></a></h2>
<ul>
<li>正则中的斜杠是特殊字符，需要转义；js 中的斜杠也是特殊字符，需要转义；</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span><span class="token string">'\\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>字符串中的斜杠加字符<code v-pre>\n</code>是一个字符，不是两个字符,<strong>转义字符是一个字符</strong>；</li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token comment">// '\n'.length;  1  转义字符是一个整体，输出为斜杠+字符 \n</span></span>
<span class="line"><span class="token comment">// '\a'.length;  1  \a 不是转义字符，输出为 a,斜杠取消转义字符的作用</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


