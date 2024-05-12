> 在模块打包器中，每种资源，vue文件，js文件，html文件等都是模块，根据不同文件类型加载器进行处理，打包成js模块

- `*`.vue文件，.js文件，在进行`import M from '.vue/.js文件名' `时，名字相同的导致模块查找失败；这样就会导致打包失败；

> 对于不同模块的处理：

- `commonjs`: 
  - `module.exports = function`: `_commonjs2__WEBPACK_IMPORTED_MODULE_4___default()(2, 1)`
  - `exports.fn = function`: `(0,_commonjs1__WEBPACK_IMPORTED_MODULE_3__.reduce)(2, 1)`

- `esm`:
  - `export function`: `(0,_esm__WEBPACK_IMPORTED_MODULE_5__.esmAdd)('ss')`
  - `export default function`: `(0,_esm__WEBPACK_IMPORTED_MODULE_5__.default)(2, 3)`

# 什么是模块

* 模块化编程中，开发者将程序分解为`功能离散的chunk`，并称之为`模块`;

* 每个模块都拥有小于完整程序的体积，验证，测试，调试变得轻松；

* 可靠的抽象和封装界限，模块，具备了条理清晰的设计和明确的目的；

## 何为webpack模块

* 任何加载能够被加载进来的资源，都可以是webpack的模块

* es2015 import

* commonjs require()

* ADM define require

* css/less/sass 文件的 @import

* stylesheet 属性 url()， html 属性 src

## 支持的模块类型

* 通过loader可以使得webpack支持多种语言和预处理器

## 模块加载流程

- todo...

# 模块热替换

* 在应用程序运行过程中，替换，添加，删除模块；

## 在应用程序中

- todo...

## 在compiler中

- todo...

## 在模块中

- todo...

## 在runtime中

- todo...
