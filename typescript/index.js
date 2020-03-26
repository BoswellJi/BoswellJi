"use strict";
var num = 0.5 < Math.random() ? 0.5 : 'jmz';
if (num === 0.5) {
    console.log(num);
}
var obj = 0.5 < Math.random() ? 1 : [1]; // number|number[]
// 断言, 告诉ts, obj为数组
obj.push(1);
//等价
obj.push(1);
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.prototype.sum = function (a) {
        return a;
    };
    return Test;
}());
var result = new Test().sum(4);
var result1 = new Test().sum('2');
console.log(result);
