import 'reflect-metadata';
import { Test, Injectable, InjectionToken, Inject } from '@sigi/di';

const requiredMetadataKey = Symbol("required");

// 令牌
const token = new InjectionToken<typeof B>('B')

// 注册给ioc容器
/**
 * 没有传providers的，将函数作为token，函数作为useClass
 */
@Injectable()
class B {
}

const provider = {
  provide: token,
  useClass: B
};

@Injectable({
  providers: [
    provider
  ]
})
class A {
  // 这个注入是指定注册的provider对应token的value
  // 从ioc容器中找到对应的token的provider的value
  constructor(@Inject(token) public b: B) {
    console.log(b, 'constructor');
  }

  @b
  c: string = '';

  @a
  a(a: number, b: string) {
    return a + b;
  }
}


const testModule = Test.createTestingModule().compile()
const aTest = testModule.getInstance(A)
console.log(aTest instanceof A);
console.log(aTest.b instanceof B);

function a(target: any, key: any) {
  console.log(arguments, 'a');
}

function b(target: any, key: any) {
  console.log(arguments, 'b');
}

function classDecorator(
  constructor: any
) {
  console.log(arguments, 'classDecorator');
}

/**
 * @param target 目标函数
 * @param propertyKey 键
 * @param parameterIndex 参数索引 
 */
function required(
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) {
  const deps = Reflect.getMetadata('design:paramtypes', target)
  deps[parameterIndex] = new B();
  console.log(arguments, deps, 'required');
}

