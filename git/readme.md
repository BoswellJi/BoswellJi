## 版本控制系统

## 操作

  + 撤销:
    - 未使用 `git add` 暂存代码时： 
      + `git checkout -- filename`;

    - 已经使用了 `git add` 缓存了代码:
      + `git reset HEAD filepathname`;

    - 已经用 `git commit` 提交了代码:
      + `git reset --hard commitid`;
