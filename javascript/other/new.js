function SelfNew(fn, ...args) {
  if (typeof fn !== 'function') {
    return;
  }
  // 创建新对象，__proto__指向构造函数原型
  const obj = Object.create(fn.prototype || {});
  // 借用构造函数调用
  fn.call(obj, ...args);
  // 返回对象
  return obj;
}

function SelfNew(func) {
  const res = {};
  if (func.prototype !== null) {
    res.__proto__ = func.prototype;
  }
  // 直接调用构造函数
  const ret = func.apply(res, Array.prototype.slice.call(arguments, 1));
  // 构造函数返回object类型与function类型的,直接作为返回值使用
  if ((typeof ret === 'object' || typeof ret === 'function') && ret !== null) {
    return ret;
  }
  return res;
}

function A() {
  this.name = 'a';
}

const a = SelfNew(A);
console.log(a.name);