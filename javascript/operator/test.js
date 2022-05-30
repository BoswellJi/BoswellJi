var a = {n:1};
var preA = a;
a = a.b = a.x = {n:2};

console.log(preA,a.x);