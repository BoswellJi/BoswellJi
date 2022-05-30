module.exports = exports = function () {
  console.log('module.exports','commonjs2');
}

exports.reduce = function (a, b) {
  console.log(a - b,'commonjs2');
}
