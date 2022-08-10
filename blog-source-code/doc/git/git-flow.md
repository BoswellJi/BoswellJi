> 分支管理策略：git flow

## 主分支

  * master
    - 提供给用户使用的正式版本，都是这个主分支上发布；

## 开发分支

  * develop
    - 主分支只用来发布重大版本，日常开发要在develop上；

## 临时性分支，使用完需要删除

  * feature
    - 开发的某个特定功能，从develop分支上面分出来，开发完要并入develop并删除；

  * release(预发)
    - 正式发布版本之前，合并到master分支之前的一个预发布的测试版本分支，测试，修改完成后删除；

  * fixbug
    - 软件正式发布后，出现bug时创建的修补分支，合并到master或者develop并删除；