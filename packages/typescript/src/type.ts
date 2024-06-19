// Pick<T,K>
type MyPick<T, K extends keyof T> = {
  [P in K]: T[K]
}

// Readonly<T>
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

// 元组转对象
type TupleToObject<T extends readonly any[]> = { [P in T[number]]: P }

// 获取数组中第一个元素的类型
type First<T extends any[]> = T extends never[] ? never : T[0]

// 获取元组的长度
type TupleLength1<T extends readonly unknown[]> = T['length']
type TupleLength2<T extends readonly any[]> = T['length']
type TupleLength<T extends any> = T extends { length: number }
  ? T['length']
  : never

// Exclude<T,U>
type MyExclude1<T, U> = T extends U ? never : T
type MyExclude2<T, U> = T extends string | number | symbol
  ? keyof { [Key in T as Key extends U ? never : Key]: any }
  : never

// 获取包装类型中的内部类型
type Awaited1<T extends Promise<any>> = T extends Promise<infer R> ? R : any
type Awaited2<T> = T extends Promise<infer R> ? R : any

// If<A,B,C>:A必须是boolean类型
type If1<A extends Boolean, B, C> = A extends true ? B : C
type If2<A extends boolean, B, C> = A extends true ? B : C

// Function.prototype.concat
type Concat<T extends any[], U extends any[]> = [...T, ...U]

// Function.prototype.includes
type Includes<T extends readonly any[], U> = U extends T[number] ? true : false

// 类型化编程

// 条件类型
// extends：不是class中的继承概念，而是条件表达式（进行类型的关系检测使用  x extends y ? true : false;
type b<U extends string> = U

// keyof类型操作符
type Point = { x: number; y: number }
type P = keyof Point
type P1 = 'x' | 'y'
type B = P extends P1 ? true : false
const p: P = 'x'

// typeof类型操作符
const T1 = 'typeof'
type T2 = typeof T1
const T3: T2 = 'typeof'

// 索引访问类型
type I1 = { name: 'Boswell' }
type I2 = I1['name']
const I3: I2[] = ['Boswell']

// 映射类型 + 修饰符 只读/可选 + 别名
type YS1 = {
  readonly [key: string]: boolean
}
type YS2 = {
  name?: string
  age: 21
}
type YS3<T> = {
  [key in keyof T as `get`]: T[key]
}

// 模板字面量类型
type World = 'hello'
type Greeting = `hello ${World}`
const S1: Greeting = 'hello hello'
