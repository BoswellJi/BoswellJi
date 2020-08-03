* 用于移除js上下文中的未引用代码 `（dead-code）` ; 

* 依赖于 `es2015模块系统` 中的静态结构特性；
  + import: 导入；
  + export: 导出；

* 兴起于2015年的rollup中；

* 从bundle中移除他们（dead-code) `即为压缩输出`
  + 启用 `uglifyjs` 压缩插件；
  + 这是一个必须的步骤，需要引入压缩工具来删除死代码；

* 模块的副作用
  + 导入时会执行特殊行为的代码，不仅仅暴露 `一个export` 或者 `多个export` , 它影响全局作用域，并且通常 `不提共export` ; 
  + 有副作用的模块，需要在 `package.json` 中的 `sideEffects` 中添加文件路径；或者是 `module选项的rules` 中；

## 使用步骤

* 配置 `sideEffects` ，使得 `babel编译` 时，不会将使用 `import,export` 语法的模块，打包未 `commonjs` 的 `require` 语法；

* webpack打包处理，将import, export模块，标识未是否是tree-shaking对象；

* 压缩文件 `uglifyjs` , 同时进行tree-shaking操作；
