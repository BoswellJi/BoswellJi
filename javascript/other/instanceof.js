/**
 * 根据实例的构造函数的元数据信息，以及类型的名称，进行字符串匹配
 * @param {*} value 
 * @param {*} type 
 */
function instanceOf(value, type) {
  const conStr = value.constructor.toString();
  return conStr.indexOf(type.name) > 0;
}

/**
 * 根据实例的原型对象以及构造函数的原型属性（对象），如果是同一个就是实例
 * @param {*} value 
 * @param {*} type 
 */
function instanceOf(value, type) {
  let prototype1 = value.__proto__;
  let prototype2 = type.prototype;

  // 原始类型不是任何构造函数的实例 （1 instanceof Number）
  if (typeof value !== 'object') {
    return false;
  }

  // 实例原型为null
  while (prototype1) {
    if (prototype1 === null) return false;
    if (prototype1 === prototype2) return true;
    // 跟着原型链向上找
    prototype1 = prototype1.__proto__;
  }
  return false;
}

console.log(instanceOf(1, Object));
console.log(1 instanceof Object);
// 如果原型对象为null,这个实例没有构造函数
// console.log(Function.__proto__.__proto__ instanceof Object);