/**
 * 模块导出多个类型的变量
 * 主要用来解决： 模块的文件类型定义
 */

export function module1(name: string): void;
export const module2: string;
export namespace module3 {
  export function a(name: string): void;
}

declare class module4 {
  name: string;
  age: number;
}

declare namespace module4 {
  interface options {
    name: string;
    age: number;
  }
}


/**
 * 导出是对象的模块：
 * 1. 直接使用导出对象来作为名称空间来定义；
 * 2. 所有类型都定义在名称空间下面；
 * 3. 变量，函数都可以定义在里面
 */

declare namespace GreetingLib {
  // 当作类型使用
  interface LogOptions {
    verbose?: boolean;
  }

  interface AlertOptions {
    modal: boolean;
    title?: string;
    color?: string;
  }

  namespace Greeting {

  }

  function say(option: AlertOptions): void;
  const options: LogOptions;
}

declare class Greeter {
  constructor(greeting: GreetingLib.AlertOptions);
  greeting: string;
  showGreeting(): void;
}

interface Module5 {
  id: string;
}