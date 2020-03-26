const a = require('./index1');
a.a.name='hhh';

const b = require('./index1');
// 被修改，因为nodejs module加载后被缓存，每次再加载是之前的引用
console.log(b);

