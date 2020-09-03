Function.prototype.bind2 = function (context) {
  if (typeof this !== 'function') {
    throw new Error('非函数');
  }
  let fn = this;
  let args = [...arguments].slice(1);
  let resFn = function () {
    return fn.apply(this instanceof resFn ? this : context, args.concat(...arguments));
  }
  function tmp() { }
  tmp.prototype = this.prototype;
  resFn.prototype = new TextMetrics();
  return resFn;
}