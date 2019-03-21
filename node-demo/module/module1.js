const vm = require('vm')
const fs = require('fs')



function Modules() {
    this.exports = {}
}

Modules.prototype._compile = function (src) {
    const warp = source => {
        return `(function(modules){${source}return modules;})`;
    }

    const source = fs.readFileSync('./module.js', 'utf-8')
    const fn = vm.runInThisContext(source);
    return fn;
}
function _Require(src) {
    const newModule = new Modules();       

    const fn = newModule._compile(src);
    return fn(newModule).exports;
}