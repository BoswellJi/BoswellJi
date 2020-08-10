
/**
 * 判断对象是否为构造函数的实例
 * @param {*} left 实例
 * @param {*} right 构造函数
 */
function _instanceof(left, right) {
  // 构造函数存在 && Symbol对象存在 && 构造函数的Symbol.hasInstance属性存在(function)
  if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
    // Symbol.hasInstance判断left(实例对象)是否为right(构造函数)的实例
    return !!right[Symbol.hasInstance](left);
  } else {
    // 这个是instanceof运算符的判断方法
    return left instanceof right;
  }
}

/**
 * 类调用检查
 * @param {*} instance 
 * @param {*} Constructor 
 */
function _classCallCheck(instance, Constructor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/**
 * 定义属性
 * @param {*} obj 
 * @param {*} key 
 * @param {*} value 
 */
function _defineProperty(obj, key, value) {
  // 如果是已经存在的属性
  if (key in obj) {
    // 修改它的描述对象
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  } return obj;
}

var A = function A() {
  _classCallCheck(this, A);

  _defineProperty(this, "age", 21);

  this.name = '';
};


class A {
  age = 21;
  constructor() {
    this.name = '';
  }
}