/**
 * 编译器指令：
 * 1. 告知编译器在编译过程中要引入额外的文件；
 * 2. 使用out outFile时，可以作为调整输出内容顺序的一种方式；
 * 
 * 1. 编译器会对所有文件进行预处理，来解析三斜线，在这个过程中，额外的文件会被加到编译过程中；
 * 2. 使用深度有限的方式解析；
 * 3. 三斜线引用的路径，是相对于包含他的文件，而不是根文件；
 */

/**
 * 用于声明文件之间的依赖；
 */
/// <reference path="global.d.ts" />


/**
 * 用来声明对某个包的依赖；
 * 相当于 import 的功能，将模块进行导入进来
 */
/// <reference types="spritejs" />

spritejs.registerNode;

/**
 * 这个指令把一个文件标记为默认库
 * 告诉编译器： 在编译过程中不要包含这个库；
 */
/// <reference no-default-lib="true" />

/// <amd-module />

/// <amd-dependency />