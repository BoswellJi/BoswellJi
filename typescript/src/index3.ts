import 'reflect-metadata';

/**
 * 装饰器中会定义装饰对象的元数据（函数对象，参数，）
 */

class B { }

@a
class A {
  @c
  c: string = '';

  constructor(@c public b: B) {
    // 使用反射获取到元数据
  }

  @b
  a(a: number, b: string) {
    return a + b;
  }
}


const aClass = new A(new B());

/**
 * 构造函数的元数据
 * 构造函数的装饰器
 * @param target 构造函数
 */
function a(target: any) {
  console.log(Reflect.getMetadata("design:paramtypes", target), 'af');
  console.log(target, 'a');
}

/**
 * 构造函数的属性的元数据
 * 构造函数的方法的装饰器
 * @param target 构造函数实例的原型对象
 * @param key 键
 * @param desc 属性的描述
 */
function b(target: any, key: string, desc: any) {
  console.log(Reflect.getMetadata("design:paramtypes", target, key), 'bf');
  console.log(target, key, desc, 'b');
}

/**
 * 构造函数的属性装饰器
 * @param target 原型对象
 * @param key 键
 */
function c(target: any, key: string, index?: number) {
  console.log(target, key,index, 'c');
}


