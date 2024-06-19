<template><div><h2 id="补丁" tabindex="-1"><a class="header-anchor" href="#补丁"><span>补丁</span></a></h2>
<ul>
<li>渲染器的第二个工作阶段；</li>
<li>对比新vnode与旧vnode,做出最小的修改；</li>
</ul>
<h2 id="组件的重新渲染的原因" tabindex="-1"><a class="header-anchor" href="#组件的重新渲染的原因"><span>组件的重新渲染的原因</span></a></h2>
<ul>
<li>重渲染是由组件的更新引起的；</li>
</ul>
<h2 id="新老vnode对比的条件" tabindex="-1"><a class="header-anchor" href="#新老vnode对比的条件"><span>新老vnode对比的条件：</span></a></h2>
<ul>
<li>凡是节点类型不同的vnode都会采用直接replace；</li>
<li>vnode类型相同后进行其他的比较；</li>
</ul>
<h2 id="vnode类型相同下的对比方法" tabindex="-1"><a class="header-anchor" href="#vnode类型相同下的对比方法"><span>vnode类型相同下的对比方法：</span></a></h2>
<ul>
<li>不同tag渲染的内容不同，直接替换；如果tag相同，vnode之间的差异就在于VNodeData和children;</li>
</ul>
<h2 id="有状态组件的更新" tabindex="-1"><a class="header-anchor" href="#有状态组件的更新"><span>有状态组件的更新</span></a></h2>
<ul>
<li>触发组件更新的情况；</li>
<li>组件更新的方式；</li>
</ul>
<h2 id="主动更新-组件自身状态发生变化引起的组件渲染" tabindex="-1"><a class="header-anchor" href="#主动更新-组件自身状态发生变化引起的组件渲染"><span>主动更新：组件自身状态发生变化引起的组件渲染；</span></a></h2>
<ul>
<li>组件状态变化需要重新执行渲染函数得到新的vnode,进而进行diff计算；</li>
<li>组件挂载的核心步骤：创建组件实例-调用render拿vnode-将vnode挂载到容器元素；</li>
</ul>
<h2 id="被动更新-由外部状态发生变换引起的组件渲染" tabindex="-1"><a class="header-anchor" href="#被动更新-由外部状态发生变换引起的组件渲染"><span>被动更新：由外部状态发生变换引起的组件渲染；</span></a></h2>
</div></template>


