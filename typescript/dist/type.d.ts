interface A {
    name: string;
    age: number;
}
interface B {
    name: string;
    sex: boolean;
}
declare type C = B & A;
declare type C1 = B | A;
declare const D: C;
declare const D1: C1;
interface D2 {
    new (name: string): any;
}
interface D21 {
}
declare class D3 implements D21 {
    constructor(name: string);
}
declare function createInstance(ctor: D2): D3;
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
    tick(): void;
}
declare function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface;
declare class DigitalClock implements ClockInterface {
    constructor(h: number, m: number);
    tick(): void;
}
declare class AnalogClock implements ClockInterface {
    constructor(h: number, m: number);
    tick(): void;
}
declare let digital: ClockInterface;
declare let analog: ClockInterface;
interface info {
    name: 'jmz';
    age: 21;
}
declare type keys = keyof info;
declare const myName: keys;
declare const age: keys;
