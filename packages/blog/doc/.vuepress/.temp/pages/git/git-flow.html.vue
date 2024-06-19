<template><div><blockquote>
<p>分支管理策略：git flow</p>
</blockquote>
<h2 id="主分支" tabindex="-1"><a class="header-anchor" href="#主分支"><span>主分支</span></a></h2>
<ul>
<li>master
<ul>
<li>提供给用户使用的正式版本，都是这个主分支上发布；</li>
</ul>
</li>
</ul>
<h2 id="开发分支" tabindex="-1"><a class="header-anchor" href="#开发分支"><span>开发分支</span></a></h2>
<ul>
<li>develop
<ul>
<li>主分支只用来发布重大版本，日常开发要在develop上；</li>
</ul>
</li>
</ul>
<h2 id="临时性分支-使用完需要删除" tabindex="-1"><a class="header-anchor" href="#临时性分支-使用完需要删除"><span>临时性分支，使用完需要删除</span></a></h2>
<ul>
<li>
<p>feature</p>
<ul>
<li>开发的某个特定功能，从develop分支上面分出来，开发完要并入develop并删除；</li>
</ul>
</li>
<li>
<p>release(预发)</p>
<ul>
<li>正式发布版本之前，合并到master分支之前的一个预发布的测试版本分支，测试，修改完成后删除；</li>
</ul>
</li>
<li>
<p>fixbug</p>
<ul>
<li>软件正式发布后，出现bug时创建的修补分支，合并到master或者develop并删除；</li>
</ul>
</li>
</ul>
</div></template>


