## 问题列表

- 撤销:
  - 未使用 `git add` 暂存代码时：`git checkout -- filename`;
  - 已经使用了 `git add` 缓存了代码：`git reset HEAD filepathname`;
  - 已经用 `git commit` 提交了代码：`git reset --hard commitid`;

- 对比远程与本地分支：
  - `git fetch origin`先更新下本地的远程分支;
  - `git diff`本地分支`origin/xxxx`然后可以比对;
  
- 清除所有本地git缓存：
  - `git rm --cached -r .`;
  - `git rm --cached -r Application/App/Conf/config.php`;

* `git blame filename`: 显示上次修改文件每行的修订版本和作者;
* `git config --unset name`: 删除配置文件中的字段；
* `git config name Boswell`: 添加字段到配置文件中；
* `git diff master origin/master` 或 `git diff featureA origin/next`: 对比本地远程分支差异;
* `git remote add name git://github.com/paulboone/ticgit.git`: 给当前仓库添加一个新的远程仓库；
* `git remote remove name `: 删除当前仓库中的一个远程仓库；
* `commit`: 每条提交记录，如果develop分支已经合进master分支，但是develop分支提交的代码没了，此时master分支已经push,develop分支的代码是不能再合进master了，因为develop分支的commit已经合进master分支，不能重复合并commit，只能回退修改被冲突掉的代码;
* 清除本地提交缓存：`git rm -r --cached .idea/`;
* 生成公钥: `ssh-keygen -o`;
  
## git flow

> 分支管理策略

### 主分支

* master
  - 提供给用户使用的正式版本，都是这个主分支上发布；

### 开发分支

* develop
  - 主分支只用来发布重大版本，日常开发要在develop上；

### 临时性分支，使用完需要删除

* feature
  - 开发的某个特定功能，从develop分支上面分出来，开发完要并入develop并删除；

* release(预发)
  - 正式发布版本之前，合并到master分支之前的一个预发布的测试版本分支，测试，修改完成后删除；

* fixbug
  - 软件正式发布后，出现bug时创建的修补分支，合并到master或者develop并删除；