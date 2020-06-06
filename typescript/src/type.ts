interface A {
  name: string;
  age: number;
}

interface B {
  name: string;
  sex: boolean;
}

type C = B & A;
type C1 = B | A;

const D: C = { name: '', age: 1, sex: true };
const D1: C1 = { name: '', age: 1 };

interface D2 {
  new(name: string): any;
};

interface D21 {
}

class D3 implements D21 {
  constructor(name: string) { }
}

function createInstance(ctor: D2): D3 {
  return new ctor('');
}

createInstance(D3);

interface ClockConstructor {
  new(hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
  tick(): void;
}
function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute);
}
class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log("beep beep");
  }
}
class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) { }
  tick() {
    console.log("tick tock");
  }
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);


// keyof
interface info {
  name: 'jmz',
  age: 21
};
type keys = keyof info;

const myName: keys = 'name';
const age: keys = 'age';

// typeof 
// instanceof
// in
// is

// type one = 'name' in { name: '' };

// 定义泛型函数
function say<T>(arg: T[]): T[] {
  return arg;
}

// 给泛型函数，添加类型
interface syaInterface {
  <T>(arg: T[]): T[];
}

const say1: syaInterface = say;

// 类型约束 extends T 类型继承了A 类型
interface A {
  length: number;
  version: number;
}

function aFn<T extends A>(arg: T): T {
  console.log(arg.length);
  return arg;
}

function create<T>(c: { new(): T; }): T {
  return new c();
}

// 泛型中的默认类型
class A4<T = string>{
  say(arg: T): T {
    return arg;
  }
}

new A4().say('');

interface A4Fn {
  (name: string): string;
  // (num: number): number;
}

function a4Fn(name: string): string {
  return name;
}

function a4Fn2(num: number): number {
  return num;
}

const a4Fn1: A4Fn = a4Fn;
// const a4Fn3: A4Fn = a4Fn2;


// 赋值类型和值
namespace importing {
  export class A { }
}
class A66 {
}
// let a66 = A66;
import a66 = importing.A;
let aa66: a66;

// 捕获键的名称 keyof
const colors = {
  red: 'red',
  blue: 'blue'
};
type Colors = keyof typeof colors; // 'red' | 'blue'
const color1: Colors = 'red';

// 索引签名
const foo: {
  [index: string]: { [key: string]: string }
} = {};

foo['a'] = { message: '' };

// 所有成员都必须符合字符串的索引签名
interface Foo {
  [key: string]: number; // 表明，所有成员值都是number类型的
  a: number;
}

const fooType: Foo = {
  a: 1
};

// 定义构造函数的类型
type Contructor<T = {}> = new (...args: any[]) => T;
function TimesTamped<TBase extends Contructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  }
}

class Test {
  name: string = 'jmz';
}

const Times = TimesTamped(Test);
const times = new Times();
times.timestamp;