<template><div><h2 id="类型操作" tabindex="-1"><a class="header-anchor" href="#类型操作"><span>类型操作</span></a></h2>
<ul>
<li><code v-pre>Generics</code>范型：传递参数的类型</li>
<li><code v-pre>Keyof</code>类型操作符：使用 keyof 操作符来创建新类型</li>
<li><code v-pre>Typeof</code>类型操作符：使用 typeof 操作符来创建新类型</li>
<li><code v-pre>Indexed Access Types</code>索引访问类型：使用<code v-pre>Type['a']</code>语法来访问类型的子类型</li>
<li><code v-pre>Conditional Types</code>条件类型：在类型系统中行为向 if 语句<code v-pre>x extends y?true:false</code></li>
<li><code v-pre>Mapped Types</code>映射类型：通过在现存类型中映射每个属性来创建类型</li>
<li><code v-pre>Template Literal Types</code>模板字面量类型：通过模板字面量字符串改变属性的映射类型</li>
</ul>
<h2 id="工具类型" tabindex="-1"><a class="header-anchor" href="#工具类型"><span>工具类型</span></a></h2>
<ul>
<li><code v-pre>Partial&lt;T&gt;</code></li>
<li><code v-pre>Required&lt;T&gt;</code></li>
<li><code v-pre>Readonly&lt;T&gt;</code></li>
<li><code v-pre>Record&lt;K,T&gt;</code></li>
<li><code v-pre>Pick&lt;T&gt; </code></li>
<li><code v-pre>Omit&lt;T&gt; </code></li>
<li><code v-pre>Exclude&lt;T&gt;</code></li>
<li><code v-pre>Extract&lt;T&gt;</code></li>
<li><code v-pre>NonNullable&lt;T&gt;</code></li>
<li><code v-pre>Parameters&lt;T&gt; </code></li>
<li><code v-pre>ConstructorParameters&lt;T&gt;</code></li>
<li><code v-pre>RetureType&lt;T&gt; </code></li>
<li><code v-pre>InstanceType&lt;T&gt; </code></li>
<li><code v-pre>ThisParameters&lt;T&gt; </code></li>
<li><code v-pre>OmitThisParameters&lt;T&gt; </code></li>
<li><code v-pre>ThisType&lt;T&gt; </code></li>
</ul>
<p><strong>字符串的基本操作</strong></p>
<ul>
<li><code v-pre>Uppercase&lt;StringT&gt;</code></li>
<li><code v-pre>Lowercase&lt;StringT&gt;</code></li>
<li><code v-pre>Capitalize&lt;StringT&gt;</code></li>
<li><code v-pre>Uncapitalize&lt;String&gt;</code></li>
</ul>
<ol start="0">
<li>
<p>类型是所有满足某些特征的 JS 值的集合</p>
</li>
<li>
<p>静态索引签名：</p>
</li>
</ol>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">Foo</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">static</span> hello <span class="token operator">=</span> <span class="token string">'hello'</span></span>
<span class="line">  <span class="token keyword">static</span> world <span class="token operator">=</span> <span class="token number">1234</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">static</span> <span class="token punctuation">[</span>propName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token keyword">undefined</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Valid.</span></span>
<span class="line">Foo<span class="token punctuation">[</span><span class="token string">'whatever'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">42</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Has type 'string | number | undefined'</span></span>
<span class="line"><span class="token keyword">let</span> x <span class="token operator">=</span> Foo<span class="token punctuation">[</span><span class="token string">'something'</span><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>实例索引签名：</li>
</ol>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">Foo</span> <span class="token punctuation">{</span></span>
<span class="line">  hello <span class="token operator">=</span> <span class="token string">'hello'</span></span>
<span class="line">  world <span class="token operator">=</span> <span class="token number">1234</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line">  <span class="token comment">// This is an index signature:</span></span>
<span class="line">  <span class="token punctuation">[</span>propName<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token keyword">undefined</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">let</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Valid assigment</span></span>
<span class="line">instance<span class="token punctuation">[</span><span class="token string">'whatever'</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">42</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Has type 'string | number | undefined'.</span></span>
<span class="line"><span class="token keyword">let</span> x <span class="token operator">=</span> instance<span class="token punctuation">[</span><span class="token string">'something'</span><span class="token punctuation">]</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>检查Promise真值：</li>
</ol>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="line"><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">boolean</span><span class="token operator">></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token boolean">false</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">async</span> <span class="token keyword">function</span> <span class="token function">bar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">Promise</span><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">></span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">//  ~~~~~</span></span>
<span class="line">    <span class="token comment">// Error!</span></span>
<span class="line">    <span class="token comment">// This condition will always return true since</span></span>
<span class="line">    <span class="token comment">// this 'Promise&lt;boolean>' appears to always be defined.</span></span>
<span class="line">    <span class="token comment">// Did you forget to use 'await'?</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token string">'true'</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line">  <span class="token keyword">return</span> <span class="token string">'false'</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4">
<li>检查实例私有属性：</li>
</ol>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">Foo</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function">#someMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">//...</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">get</span> <span class="token function">#someValue</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token number">100</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token function">publicMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// These work.</span></span>
<span class="line">    <span class="token comment">// We can access private-named members inside this class.</span></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">#someMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>#someValue</span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">new</span> <span class="token class-name">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">#someMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">//        ~~~~~~~~~~~</span></span>
<span class="line"><span class="token comment">// error!</span></span>
<span class="line"><span class="token comment">// Property '#someMethod' is not accessible</span></span>
<span class="line"><span class="token comment">// outside class 'Foo' because it has a private identifier.</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">new</span> <span class="token class-name">Foo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>#someValue</span>
<span class="line"><span class="token comment">//        ~~~~~~~~~~</span></span>
<span class="line"><span class="token comment">// error!</span></span>
<span class="line"><span class="token comment">// Property '#someValue' is not accessible</span></span>
<span class="line"><span class="token comment">// outside class 'Foo' because it has a private identifier.</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5">
<li>静态成员私有名称：</li>
</ol>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">Foo</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">static</span> <span class="token function">#someMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// ...</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">Foo<span class="token punctuation">.</span><span class="token function">#someMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">//  ~~~~~~~~~~~</span></span>
<span class="line"><span class="token comment">// error!</span></span>
<span class="line"><span class="token comment">// Property '#someMethod' is not accessible</span></span>
<span class="line"><span class="token comment">// outside class 'Foo' because it has a private identifier.</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="6">
<li>模板字符串类型</li>
</ol>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="line"><span class="token keyword">type</span> <span class="token class-name">Color</span> <span class="token operator">=</span> <span class="token string">'red'</span> <span class="token operator">|</span> <span class="token string">'blue'</span></span>
<span class="line"><span class="token keyword">type</span> <span class="token class-name">Quantity</span> <span class="token operator">=</span> <span class="token string">'one'</span> <span class="token operator">|</span> <span class="token string">'two'</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> <span class="token class-name">SeussFish</span> <span class="token operator">=</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>Quantity <span class="token operator">|</span> Color<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> fish</span><span class="token template-punctuation string">`</span></span></span>
<span class="line"><span class="token comment">// same as</span></span>
<span class="line"><span class="token comment">//   type SeussFish = "one fish" | "two fish"</span></span>
<span class="line"><span class="token comment">//                  | "red fish" | "blue fish";</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">declare</span> <span class="token keyword">let</span> s1<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token builtin">number</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token builtin">number</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">-</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token builtin">number</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token template-punctuation string">`</span></span></span>
<span class="line"><span class="token keyword">declare</span> <span class="token keyword">let</span> s2<span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">1-2-3</span><span class="token template-punctuation string">`</span></span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// Works!</span></span>
<span class="line">s1 <span class="token operator">=</span> s2</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="7">
<li>属性上的写类型：</li>
</ol>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts" data-title="ts"><pre v-pre class="language-typescript"><code><span class="line"><span class="token keyword">class</span> <span class="token class-name">Thing</span> <span class="token punctuation">{</span></span>
<span class="line">  #size <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">get</span> <span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token builtin">number</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>#size</span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">  <span class="token keyword">set</span> <span class="token function">size</span><span class="token punctuation">(</span>value<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">number</span> <span class="token operator">|</span> <span class="token builtin">boolean</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">let</span> num <span class="token operator">=</span> <span class="token function">Number</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token comment">// Don't allow NaN and stuff.</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Number<span class="token punctuation">.</span><span class="token function">isFinite</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">      <span class="token keyword">this</span><span class="token punctuation">.</span>#size <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">      <span class="token keyword">return</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">this</span><span class="token punctuation">.</span>#size <span class="token operator">=</span> num</span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="8">
<li>
<p>空类型 never: 函数不返回</p>
</li>
<li>
<p>void: 没有返回一个值的函数值的类型</p>
</li>
</ol>
</div></template>


