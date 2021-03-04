## git问题列表

- 对比远程与本地分支：

  - git fetch origin `先更新下本地的远程分支`
  - git diff 本地分支 origin/xxxx `然后可以比对`

- 清除所有本地git缓存

  - git rm --cached -r .
  - git rm --cached -r Application/App/Conf/config.php