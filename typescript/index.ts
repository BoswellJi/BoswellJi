// const num = 0.5 < Math.random() ? 0.5 : 'jmz';

// if (num === 0.5) {
//   console.log(num);
// }

// let obj = 0.5 < Math.random() ? 1 : [1]; // number|number[]

// // 断言, 告诉ts, obj为数组
// (<number[]>obj).push(1);

// //等价
// (obj as number[]).push(1);

// // 索引类型 
// type info = keyof { name: 'jmz', age: 21 };

// class Test {
//   sum<T>(a: T): T {
//     return a;
//   }
// }

// const result = new Test().sum(4);
// const result1 = new Test().sum<string>('2');
// import "reflect-metadata";

@wrapClass
class Test1 {
  @wrapFunction
  TestFn1(name?: string, age: number): void { }

  constructor(age: number, @wrapParams name: string) { }
}

function wrapClass() {
  console.log(arguments, 'class');
}

function wrapParams(target, propertyKey) {
  // let type = Reflect.getMetadata("design:type", target, propertyKey);
  // console.log(type, 'params');
}

function wrapFunction() {
  console.log(arguments, 'function');
}
