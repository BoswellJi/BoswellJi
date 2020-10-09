/**
 * 模块导出多个类型的变量
 * 主要用来解决： 模块的文件类型定义

 * 导出是对象的模块：
 * 1. 直接使用导出对象来作为名称空间来定义；
 * 2. 所有类型都定义在名称空间下面；
 * 3. 变量，函数都可以定义在里面
 */
export as namespace myClassLib;

export const name: 'jmz';
export function add(a: number, b: number): number;

// export default MyClass;
export = MyClass;

declare class MyClass {
  constructor(customGreeting?: string);

  greet: void;

  myMethod(opts: MyClass.MyClassMethodOptions): number;
}

declare namespace MyClass {
  export interface MyClassMethodOptions {
    width?: number;
    height?: number;
  }
}