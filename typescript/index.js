// const num = 0.5 < Math.random() ? 0.5 : 'jmz';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
var Test1 = /** @class */ (function () {
    function Test1(age, name) {
    }
    Test1.prototype.TestFn1 = function (name, age) { };
    __decorate([
        wrapFunction,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Number]),
        __metadata("design:returntype", void 0)
    ], Test1.prototype, "TestFn1", null);
    Test1 = __decorate([
        wrapClass,
        __param(1, wrapParams),
        __metadata("design:paramtypes", [Number, String])
    ], Test1);
    return Test1;
}());
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
