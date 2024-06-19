<template><div><h2 id="撤销" tabindex="-1"><a class="header-anchor" href="#撤销"><span>撤销:</span></a></h2>
<ul>
<li>未使用 <code v-pre>git add</code> 暂存代码时：<code v-pre>git checkout -- filename</code>;</li>
<li>已经使用了 <code v-pre>git add</code> 缓存了代码：<code v-pre>git reset HEAD filepathname</code>;</li>
<li>已经用 <code v-pre>git commit</code> 提交了代码：<code v-pre>git reset --hard commitid</code><strong>(如果希望完全删除特定的 commit，包括其对应的提交记录，则可以使用 <code v-pre>git reset --hard HEAD~&lt;n&gt;</code> 命令（其中 <code v-pre>&lt;n&gt;</code> 表示要移动的 commit 数量）。该命令会重置当前分支的头部指针，并丢弃最近的 n 次 commit。)</strong>;</li>
</ul>
<h2 id="对比远程与本地分支" tabindex="-1"><a class="header-anchor" href="#对比远程与本地分支"><span>对比远程与本地分支：</span></a></h2>
<ul>
<li><code v-pre>git fetch origin</code>先更新下本地的远程分支;</li>
<li><code v-pre>git diff</code>本地分支<code v-pre>origin/xxxx</code>然后可以比对;</li>
</ul>
<h2 id="清除所有本地-git-缓存" tabindex="-1"><a class="header-anchor" href="#清除所有本地-git-缓存"><span>清除所有本地 git 缓存：</span></a></h2>
<ul>
<li><code v-pre>git rm --cached -r .</code>;</li>
<li><code v-pre>git rm --cached -r Application/App/Conf/config.php</code>;</li>
</ul>
<h2 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h2>
<ul>
<li><code v-pre>git blame filename</code>: 显示上次修改文件每行的修订版本和作者;</li>
<li><code v-pre>git config --unset name</code>: 删除配置文件中的字段；</li>
<li><code v-pre>git config name Boswell</code>: 添加字段到配置文件中；</li>
<li><code v-pre>git diff master origin/master</code> 或 <code v-pre>git diff featureA origin/next</code>: 对比本地远程分支差异;</li>
<li><code v-pre>git remote add name git://github.com/paulboone/ticgit.git</code>: 给当前仓库添加一个新的远程仓库；</li>
<li><code v-pre>git remote remove name </code>: 删除当前仓库中的一个远程仓库；</li>
<li><code v-pre>commit</code>: 每条提交记录，如果 develop 分支已经合进 master 分支，但是 develop 分支提交的代码没了，此时 master 分支已经 push,develop 分支的代码是不能再合进 master 了，因为 develop 分支的 commit 已经合进 master 分支，不能重复合并 commit，只能回退修改被冲突掉的代码;</li>
<li>清除本地提交缓存：<code v-pre>git rm -r --cached .idea/</code>;</li>
<li>生成公钥: <code v-pre>ssh-keygen -o</code>;</li>
</ul>
<h2 id="打补丁" tabindex="-1"><a class="header-anchor" href="#打补丁"><span>打补丁</span></a></h2>
<ul>
<li>
<p><a href="https://blog.csdn.net/weixin_42310154/article/details/119004977" target="_blank" rel="noopener noreferrer">git rebase</a>: 当执行 rebase 操作时，git 会从两个分支的共同祖先开始提取待变基分支上的修改，然后将待变基分支指向基分支的最新提交，最后将刚才提取的修改应用到基分支的最新提交的后面。</p>
</li>
<li>
<p><a href="https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html" target="_blank" rel="noopener noreferrer">git cherry-pick</a>: 这时分两种情况。一种情况是，你需要另一个分支的所有代码变动，那么就采用合并（git merge）。另一种情况是，你只需要部分代码变动（某几个提交），这时可以采用 Cherry pick。</p>
</li>
</ul>
<h2 id="问题" tabindex="-1"><a class="header-anchor" href="#问题"><span>问题</span></a></h2>
<ol>
<li><code v-pre>a/b/c.txt already exists in the index</code>问题？</li>
</ol>
<p>原因是之前手动建过<code v-pre>a/b/c.txt</code>，删除之后，本地缓存也还是存在，所以需要移除掉本地缓存的数据,执行<code v-pre>git rm -r --cached a/b/c.txt</code>;</p>
</div></template>


