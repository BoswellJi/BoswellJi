## pnpm的问题

- 在某些情况下不能使用，例如：源码编译出来的代码再次需要打包，这时候可能会找不到编译出来的代码里导入的包，因为没有按照编译后的代码需求安装，vuepress的使用会遇到这个问题。