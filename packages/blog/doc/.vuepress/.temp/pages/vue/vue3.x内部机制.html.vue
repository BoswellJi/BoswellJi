<template><div><h2 id="框架提供给用户东西" tabindex="-1"><a class="header-anchor" href="#框架提供给用户东西"><span>框架提供给用户东西</span></a></h2>
<ul>
<li>
<p>构建产物，产物模块格式？</p>
</li>
<li>
<p>用户没有按照预期的方式使用框架是否打印合适的警告信息？</p>
</li>
<li>
<p>开发版本与生产版本的区别？</p>
</li>
<li>
<p>是否要支持热更新HMR？</p>
</li>
<li>
<p>是否需要进行tree shaking?</p>
</li>
<li>
<p>提升用户开发体验</p>
</li>
<li>
<p>控制框架代码的体积</p>
</li>
<li>
<p>框架要做到良好的 Tree-Shaking</p>
</li>
<li>
<p>框架应该输出怎样的构建产物</p>
</li>
<li>
<p>特性开关</p>
</li>
<li>
<p>错误处理</p>
</li>
<li>
<p>良好的 Typescript 类型支持</p>
</li>
</ul>
<h2 id="内部类" tabindex="-1"><a class="header-anchor" href="#内部类"><span>内部类</span></a></h2>
<ul>
<li>ReactiveEffect</li>
<li>EffectScope</li>
</ul>
<h2 id="实例" tabindex="-1"><a class="header-anchor" href="#实例"><span>实例</span></a></h2>
<ul>
<li>vnode: createBaseVNode</li>
<li>app: createApp</li>
<li>appContext: createAppContext</li>
</ul>
<h2 id="定义响应式对象" tabindex="-1"><a class="header-anchor" href="#定义响应式对象"><span>定义响应式对象</span></a></h2>
<ul>
<li>setupComponent</li>
<li>setupStatefulComponent
<ul>
<li>callWithErrorHandling(setup)</li>
</ul>
</li>
</ul>
<h2 id="依赖追踪-进行的时机" tabindex="-1"><a class="header-anchor" href="#依赖追踪-进行的时机"><span>依赖追踪(进行的时机)</span></a></h2>
<ul>
<li>
<p>render function</p>
<ul>
<li>PublicInstanceProxyHandlers
<ul>
<li>get
<ul>
<li>trackEffects</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
<li>
<p>effect function</p>
<ul>
<li>new ReactiveEffect()</li>
<li>effect.run</li>
</ul>
</li>
<li>
<p>computed function</p>
<ul>
<li>ComputedRefImpl
<ul>
<li>new ReactiveEffect()</li>
<li>get value(){}</li>
<li>effect.run</li>
</ul>
</li>
</ul>
</li>
<li>
<p>watch function</p>
<ul>
<li>new ReactiveEffect()</li>
<li>effect.run</li>
</ul>
</li>
</ul>
<h2 id="effectscope" tabindex="-1"><a class="header-anchor" href="#effectscope"><span>EffectScope</span></a></h2>
<ul>
<li>组件的实例属性<code v-pre>scope</code>为<code v-pre>EffectScope</code>实例；</li>
</ul>
<h2 id="副作用调度-effect-scheduling" tabindex="-1"><a class="header-anchor" href="#副作用调度-effect-scheduling"><span>副作用调度(effect scheduling)</span></a></h2>
<ul>
<li>todo...</li>
</ul>
<h2 id="安装过程" tabindex="-1"><a class="header-anchor" href="#安装过程"><span>安装过程</span></a></h2>
<blockquote>
<p>Patch: root vnode 开始，判断传入的vnode类型，进行不同类型的处理，组件，片段进行递归处理；</p>
</blockquote>
<ul>
<li>mount</li>
<li>render</li>
<li>patch
<ul>
<li>processComponent</li>
<li>mountComponent</li>
<li>setupRenderEffect
<ul>
<li>componentUpdateFn
<ul>
<li>renderComponentRoot: 执行组件的 render function</li>
<li>patch
<ul>
<li>因为没有old vnode,所以走的都是安装方法（mountElement</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="更新过程" tabindex="-1"><a class="header-anchor" href="#更新过程"><span>更新过程</span></a></h2>
<ul>
<li>triggerEffects</li>
<li>run(ReactiveEffect)
<ul>
<li>fn</li>
<li>componentUpdateFn
<ul>
<li>renderComponentRoot: 执行组件的 render function</li>
<li>patch</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="对比vnode" tabindex="-1"><a class="header-anchor" href="#对比vnode"><span>对比vnode</span></a></h2>
<blockquote>
<p>diff核心：判断是否有节点需要移动，以及应该如何移动和寻找出那些需要被添加或移除的节点</p>
</blockquote>
<ol>
<li>首先进行预处理，比较相同的前缀和后缀元素<code v-pre>j,prevEnd,nextEnd</code>
<ul>
<li>j &gt; prevEnd &amp;&amp; j &lt;= nextEnd:  j -&gt; nextEnd 之间的节点应该被添加</li>
<li>j &gt; nextEnd: j -&gt; prevEnd 之间的节点应该被移除</li>
</ul>
</li>
<li>判断是否需要进行dom移动</li>
<li>dom移动的方式</li>
</ol>
<h2 id="编译模板时的优化" tabindex="-1"><a class="header-anchor" href="#编译模板时的优化"><span>编译模板时的优化</span></a></h2>
<ol>
<li>
<p>Block Tree 和 PatchFlag</p>
<ul>
<li>Block Tree: 需要更新的vnode tree</li>
<li>PatchFlag: 动态vnode需要修改的类型
<code v-pre>总结：可以利用以上特性，在diff时精确更新vnode</code></li>
</ul>
</li>
<li>
<p>静态提升</p>
<ul>
<li>将静态vnode创建流程提取，不需要每次render都创建</li>
</ul>
</li>
<li>
<p>不会静态提升</p>
<ul>
<li>元素带有动态key</li>
<li>使用ref的元素</li>
<li>使用自定义指令的元素</li>
</ul>
</li>
<li>
<p>提升静态 PROPS</p>
</li>
<li>
<p>预字符串化</p>
</li>
<li>
<p>Cache Event handler</p>
</li>
<li>
<p>v-once</p>
</li>
</ol>
<h2 id="如何进行高性能渲染" tabindex="-1"><a class="header-anchor" href="#如何进行高性能渲染"><span>如何进行高性能渲染</span></a></h2>
<ul>
<li>利用v-show缓存组件,避免大量销毁创建组件</li>
<li>dom数量太大，导致渲染卡顿，可以利用css，将元素渲染计算交给GPU</li>
</ul>
<ol>
<li>
<p>vue2.x</p>
<ul>
<li>简洁的模板标签</li>
<li>拆分组件<code v-pre>(diff算法只进行当前组件的vnode对比)</code></li>
<li>children vnode添加key标识</li>
<li>减少模板中使用不必要的响应式属性</li>
</ul>
</li>
<li>
<p>vue3.x</p>
<ul>
<li>正确地使用 PatchFlags</li>
<li>NEED_PATCH</li>
<li>该使用 Block 的地方必须用</li>
<li>分支判断使用 Block</li>
<li>列表使用 Block</li>
<li>使用动态 key 的元素应该是 Block</li>
<li>使用 Slot hint</li>
<li>为组件正确地使用 DYNAMIC_SLOTS</li>
<li>使用 $stable hint</li>
</ul>
</li>
</ol>
<h2 id="运行时编译的vue渲染" tabindex="-1"><a class="header-anchor" href="#运行时编译的vue渲染"><span>运行时编译的vue渲染</span></a></h2>
<ul>
<li>同步渲染，从父组件开始到子组件递归渲染，整个过程是同步的；</li>
<li><code v-pre>patch</code>方法执行开始：从根组件开始作为一个组件进行处理，生成<code v-pre>vnode</code>,进行遍历安装；</li>
</ul>
<h2 id="预编译后的vue渲染" tabindex="-1"><a class="header-anchor" href="#预编译后的vue渲染"><span>预编译后的Vue渲染</span></a></h2>
<ul>
<li>每个<code v-pre>.vue</code>文件，编译之后都会为带有<code v-pre>render function</code>的<code v-pre>options</code>对象；</li>
</ul>
<h2 id="slot组件" tabindex="-1"><a class="header-anchor" href="#slot组件"><span>slot组件</span></a></h2>
<blockquote>
<p>编译后的slot组件。也就是说，如果不适用<code v-pre>&lt;slot&gt;&lt;/slot&gt;</code>组件的话，想要展示<code v-pre>&lt;test&gt;text&lt;/test&gt;</code>中的插槽内容，使用<code v-pre>vm.slots.default()</code>获取vnode,传入<code v-pre>h/createVnode</code>中。</p>
</blockquote>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token comment">// slot</span></span>
<span class="line"><span class="token keyword">const</span> slot <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token function-variable function">render</span><span class="token operator">:</span> <span class="token keyword">function</span> <span class="token function">_sfc_render</span><span class="token punctuation">(</span><span class="token parameter">_ctx<span class="token punctuation">,</span> _cache</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token function">renderSlot</span><span class="token punctuation">(</span>_ctx<span class="token punctuation">.</span>$slots<span class="token punctuation">,</span> <span class="token string">"default"</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line">  <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="模板ref" tabindex="-1"><a class="header-anchor" href="#模板ref"><span>模板ref</span></a></h2>
<ul>
<li>被编译为vnode的<code v-pre>props</code>；</li>
<li>创建vnode的处理中即组件的<code v-pre>render function</code>，会将<code v-pre>props</code>中的<code v-pre>ref</code>处理为<code v-pre>{ i: currentRenderingInstance, r: ref, k: ref_key, f: !!ref_for }</code></li>
</ul>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js" data-title="js"><pre v-pre class="language-javascript"><code><span class="line"><span class="token comment">// html标签</span></span>
<span class="line"><span class="token function">_createElementVNode</span><span class="token punctuation">(</span><span class="token string">"button"</span><span class="token punctuation">,</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token literal-property property">ref</span><span class="token operator">:</span> <span class="token string">"el"</span><span class="token punctuation">,</span></span>
<span class="line">  <span class="token literal-property property">onClick</span><span class="token operator">:</span> onClick</span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// vue组件</span></span>
<span class="line"><span class="token function">_createVNode</span><span class="token punctuation">(</span>_component_com1<span class="token punctuation">,</span> <span class="token punctuation">{</span> <span class="token literal-property property">ref</span><span class="token operator">:</span> <span class="token string">"el"</span> <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


