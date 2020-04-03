function SelfNew(fn, ...args) {
  if (typeof fn !== 'function') {
    return;
  }
  // 创建新对象，__proto__指向构造函数原型
  const obj = Object.create(fn.prototype || {});
  // 借用构造函数调用
  fn.call(obj,...args);
  // 返回对象
  return obj;
}

function A() { 
  this.name = 'a';
}

const a = SelfNew(A);
console.log(a.name);