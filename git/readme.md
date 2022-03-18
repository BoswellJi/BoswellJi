## 版本控制系统

## 操作
  + 生成公钥
    - ssh-keygen -o

  + 撤销:
    - 未使用 `git add` 暂存代码时： 
      + `git checkout -- filename`;

    - 已经使用了 `git add` 缓存了代码:
      + `git reset HEAD filepathname`;

    - 已经用 `git commit` 提交了代码:
      + `git reset --hard commitid`;
  
  + 清除本地提交缓存：
    - git rm -r --cached .idea/

## 注意

- commit: 每条提交记录，如果develop分支已经合进master分支，但是develop分支提交的代码没了，此时master分支已经push,develop分支的代码是不能再合进master了，因为develop分支的commit已经合进master分支，不能重复合并commit，只能回退修改被冲突掉的代码。

<!-- test develop1 -->
<!-- test develop2 -->