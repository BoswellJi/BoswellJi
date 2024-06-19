<template><div><h2 id="映射" tabindex="-1"><a class="header-anchor" href="#映射"><span>映射</span></a></h2>
<ul>
<li><code v-pre>template =&gt; view</code></li>
<li><code v-pre>data =&gt; state</code></li>
<li><code v-pre>methods =&gt; actions</code></li>
</ul>
<h2 id="当多个组件共享同一份数据" tabindex="-1"><a class="header-anchor" href="#当多个组件共享同一份数据"><span>当多个组件共享同一份数据</span></a></h2>
<ul>
<li>
<p>多个视图依赖同一块数据；</p>
</li>
<li>
<p>不同的视图行为可能需要变更同一块数据；</p>
</li>
<li>
<p>第一个问题：</p>
<ol>
<li>传递属性在遇到深度嵌套组件的时候会变得乏味的；</li>
<li>在兄弟组件之间不能工作；</li>
</ol>
</li>
<li>
<p>第二个问题：</p>
<ol>
<li>直接去拿父组件和子组件的实例引用；</li>
<li>尝试通过事件来修改和同步多个状态副本；</li>
</ol>
</li>
<li>
<p>以上的解决方案，都会导致不可维护；</p>
</li>
</ul>
<h2 id="终极解决方案" tabindex="-1"><a class="header-anchor" href="#终极解决方案"><span>终极解决方案</span></a></h2>
<ul>
<li>
<p>提取出组件的共享状态，并且用全局单例进行管理，所有的组件树变成一个大的视图，任何组件都能访问状态和触发行为，无论他们在树中的哪里；</p>
</li>
<li>
<p>通过定义和分离状态管理中设计的概念以及强制在视图和状态之间维护独立的规则；</p>
</li>
</ul>
<h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2>
<ul>
<li>Flex就像眼镜，当你需要的时候，你会知道的；</li>
</ul>
<h2 id="使用vuex不意味着你应该放所有的状态在vuex终" tabindex="-1"><a class="header-anchor" href="#使用vuex不意味着你应该放所有的状态在vuex终"><span>使用vuex不意味着你应该放所有的状态在vuex终</span></a></h2>
<ul>
<li>它会使得你的状态变化更明显以及可调式，但是它也会使得你的代码更加的繁琐和间接；</li>
<li>如果状态是属于单个组件，应该把它放到本地状态中去，这个需要在开发过程中开发者自己做权衡；</li>
</ul>
<h2 id="state" tabindex="-1"><a class="header-anchor" href="#state"><span>state</span></a></h2>
<h2 id="getter" tabindex="-1"><a class="header-anchor" href="#getter"><span>getter</span></a></h2>
<ul>
<li>与组件的computed option相同，为了组合data中的数据的使用，getter中的data就是state;</li>
</ul>
<h2 id="mutation" tabindex="-1"><a class="header-anchor" href="#mutation"><span>mutation</span></a></h2>
<ul>
<li>只能通过store的commit方法触发，为了是状态变化过程的可预测；</li>
<li>执行的只能是同步程序，这样才可以获取到程序之前和之后state;</li>
</ul>
<h2 id="action" tabindex="-1"><a class="header-anchor" href="#action"><span>action</span></a></h2>
<ul>
<li>处理异步操作；</li>
<li>可以访问到回调函数中的<code v-pre>{state,getters,mutations,actions}</code>;</li>
<li>多action组合，这就需要action中返回Promise;</li>
</ul>
<h2 id="module" tabindex="-1"><a class="header-anchor" href="#module"><span>module</span></a></h2>
<ul>
<li>有单独的state,getter,mutation,action;</li>
<li>注意namespaced option,没有的情况下，<code v-pre>state是不会添加到根模块上的</code>；</li>
</ul>
</div></template>


