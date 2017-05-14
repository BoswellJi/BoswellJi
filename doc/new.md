## 前端部分重构任务

### 目标
- 对项目进行模块化，组件化，压缩、优化静态资源部分体积,使用es6来写代码，有一个清晰的项目结构，便于维护，统一编码风格；

### 需要做的事情
0. 规定下css,js,html以及angular的编码规范
1. 设计基于angular+webpack+gulp的项目基本架构 
2. 抽取公共模块，与公共组件
3. 维护与优化业务组件与模块
4. 利用gulp+webpack进行资源打包压缩，资源基本优化（图片）
5. 使用babel支持es6/7


### 最后
```
预计两到三周内能够将项目重构结束投入生产环境；
```


### 坑
1. 依赖的路径如果不适用导入的方式，使用字符串，不会被webpack解析
```
templateUrl:'../views/index.html'

使用
import index from 'index.html'
``` 

2. 空格问题
```
build:set process.env.NODE_ENV=production && ...
npm run build 时候process.env.NODE_ENV=='production' 为false
因为production与&&之间有空格
https://segmentfault.com/q/1010000007560766
```