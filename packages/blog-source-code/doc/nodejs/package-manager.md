# 包管理器

## pnpm 的问题

- 在某些情况下不能使用，例如：源码编译出来的代码再次需要打包，这时候可能会找不到编译出来的代码里导入的包，因为没有按照编译后的代码需求安装，vuepress 的使用会遇到这个问题。

## npm 的问题

- 由于`npm`大版本升级，所以在安装项目的时候需要根据`package-lock.json`注意之前使用的`npm`版本,使用对应的版本会避免版本问题。
- `package-lock.json`机制只锁定了项目依赖版本，并没有锁定依赖的依赖版本，`yarn,pnpm`没有这个问题