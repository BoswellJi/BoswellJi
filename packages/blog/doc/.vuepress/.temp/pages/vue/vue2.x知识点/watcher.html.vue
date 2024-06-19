<template><div><h2 id="内部watcher" tabindex="-1"><a class="header-anchor" href="#内部watcher"><span>内部Watcher</span></a></h2>
<ul>
<li>组件上的每条指令和computed属性（get),通过compile都会变成一个对应的Watcher对象；</li>
</ul>
<h2 id="用户watch" tabindex="-1"><a class="header-anchor" href="#用户watch"><span>用户watch</span></a></h2>
<ul>
<li>监听属性改变了，都会触发定义好的回调函数；</li>
</ul>
<h2 id="渲染watcher" tabindex="-1"><a class="header-anchor" href="#渲染watcher"><span>渲染watcher</span></a></h2>
<ul>
<li>每个组件都会有一个render-watcher，当data中的属性改变时，调用render-watcher来更新组件的视图；</li>
</ul>
</div></template>


