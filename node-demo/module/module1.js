// const vm = require('vm')
// const fs = require('fs')

// function Modules() {
//     this.exports = {}
// }

// Modules.prototype._compile = function (src) {
//     const warp = source => {
//         return `(function(modules){${source}return modules;})`;
//     }

//     const source = fs.readFileSync('./module.js', 'utf-8')
//     const fn = vm.runInThisContext(source);
//     return fn;
// }

// function _Require(src) {
//     const newModule = new Modules();       

//     const fn = newModule._compile(src);
//     return fn(newModule).exports;
// }
const mod1 = require('./mod1');

const mod2 = require('./mod1');
require('./module');

console.log(mod1===mod2);