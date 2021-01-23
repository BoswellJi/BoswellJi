import 'reflect-metadata';

/**
 * 装饰器中会定义装饰对象的元数据（函数对象，参数，）
 */

@a
class A {
  constructor(public name: string, age: number) {
    // 使用反射获取到元数据
  }

  @b
  a(a: number, b: string) {
    return a + b;
  }
}



function a(target: any) {
  // 构造函数的元数据
  console.log(Reflect.getMetadata("design:paramtypes", target), 'af');
  console.log(target, 'a');
}

function b(target: any, key: string) {
  // 构造函数的属性的元数据
  console.log(Reflect.getMetadata("design:paramtypes", target, key), 'bf');
  console.log(arguments, 'b');
}


