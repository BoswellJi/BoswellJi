## 撤销:

- 未使用 `git add` 暂存代码时：`git checkout -- filename`;
- 已经使用了 `git add` 缓存了代码：`git reset HEAD filepathname`;
- 已经用 `git commit` 提交了代码：`git reset --hard commitid`**(如果希望完全删除特定的 commit，包括其对应的提交记录，则可以使用 `git reset --hard HEAD~<n>` 命令（其中 `<n>` 表示要移动的 commit 数量）。该命令会重置当前分支的头部指针，并丢弃最近的 n 次 commit。)**;

## 对比远程与本地分支：

- `git fetch origin`先更新下本地的远程分支;
- `git diff`本地分支`origin/xxxx`然后可以比对;

## 清除所有本地 git 缓存：

- `git rm --cached -r .`;
- `git rm --cached -r Application/App/Conf/config.php`;

## 其他

- `git blame filename`: 显示上次修改文件每行的修订版本和作者;
- `git config --unset name`: 删除配置文件中的字段；
- `git config name Boswell`: 添加字段到配置文件中；
- `git diff master origin/master` 或 `git diff featureA origin/next`: 对比本地远程分支差异;
- `git remote add name git://github.com/paulboone/ticgit.git`: 给当前仓库添加一个新的远程仓库；
- `git remote remove name `: 删除当前仓库中的一个远程仓库；
- `commit`: 每条提交记录，如果 develop 分支已经合进 master 分支，但是 develop 分支提交的代码没了，此时 master 分支已经 push,develop 分支的代码是不能再合进 master 了，因为 develop 分支的 commit 已经合进 master 分支，不能重复合并 commit，只能回退修改被冲突掉的代码;
- 清除本地提交缓存：`git rm -r --cached .idea/`;
- 生成公钥: `ssh-keygen -o`;

## 打补丁

- [git rebase](https://blog.csdn.net/weixin_42310154/article/details/119004977): 当执行 rebase 操作时，git 会从两个分支的共同祖先开始提取待变基分支上的修改，然后将待变基分支指向基分支的最新提交，最后将刚才提取的修改应用到基分支的最新提交的后面。

- [git cherry-pick](https://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html): 这时分两种情况。一种情况是，你需要另一个分支的所有代码变动，那么就采用合并（git merge）。另一种情况是，你只需要部分代码变动（某几个提交），这时可以采用 Cherry pick。

## 问题

1. `a/b/c.txt already exists in the index`问题？

原因是之前手动建过`a/b/c.txt`，删除之后，本地缓存也还是存在，所以需要移除掉本地缓存的数据,执行`git rm -r --cached a/b/c.txt`;
