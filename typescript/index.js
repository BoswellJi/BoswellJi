"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jquery_1 = require("./jquery");
a = 0;
b = { name: 1 };
b.name;
jquery_1.a;
var num = 0.5 < Math.random() ? 0.5 : 'jmz';
if (num === 0.5) {
    console.log(num);
}
var obj = 0.5 < Math.random() ? 1 : [1]; // number|number[]
// 断言, 告诉ts, obj为数组
obj.push(1);
//等价
obj.push(1);
var name = 'name';
