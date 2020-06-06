/**
 * 模块导出是一个类
 */

declare namespace Test {
  interface Test1 {
    name: string;
    age: number;
  }
}

interface module5 {
  name: Test.Test1;
  age: number;
}

declare const module6: module5;
export = module6;

