/**
 * 全局下的 类型定义文件
 * 1. 对象，值 ，就是定义变量
 * 1.1 对象可以使用接口类型定义，还可以使用名称空间定义
 * 
 * 2. 函数，就是函数定义
 */

// global 变量定义

interface test {
  name: string[];
  age: number;
  say(name: string): string;
}

interface test3{
  name: string;
  age: number;
}

// function overload
declare function test(name: string): void;
declare function test(age: number): string;
declare const test2: test;
declare const test1: string;
declare namespace testLib {
  function makeGreeting(name: string): void;
  function makeGreeting(age: number): void;
  const name: string;

  class Test{}
}

interface Content{
  new(value: string): void;
}

declare let Content: Content;

declare namespace GreetingLib {
  interface LogOptions {
    verbose?: boolean;
  }

  interface AlertOptions {
    modal: boolean;
    title?: string;
    color?: string;
  }

  function say(option: AlertOptions): void;
  function Greeter(): void;

  const options: LogOptions;
}