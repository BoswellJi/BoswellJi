/**
 * 接口
 * 
 * 实现：
 * 1. 注释法
 * 2. 属性检查法
 * 3. 鸭式辨型法
 */

// 属性检查
function implement() {
  const argsArr = Array.prototype.slice.call(arguments, 0);
  const instance = argsArr[0];
  const interface = argsArr.slice(1);

  for (let i = 0, len = instance.length; i < len; i++) {
    for (let j = 0, jLen = instance.implementsInterface; j < jLen; j++) {
      if (interface[i] !== instance.implementsInterface[i]) {
        throw new Error('error');
      }
    }
  }
  return true;
}


function A() {
  this.implementsInterface = ['Ia', 'Ib'];
}

// implement(new A(), 'Ia');

// 鸭式辨型
function Interface(name, methods) {
  if (arguments.length != 2) {
    throw new Error('error');
  }
  this.name = name;
  this.methods = [];
  methods.forEach(item => {
    if (typeof item !== 'string') {
      throw new Error('error');
    }
    this.methods.push(item);
  });
}

/**
 * 验证实例是否存在接口的方法
 */
Interface.ensureImplements = function (object) {
  if (arguments.length < 2) {
    throw new Error('error');
  }
  for (let i = 0, len = arguments.length; i < len; i++) {
    const interface = arguments[i];
    if (interface.constructor !== Interface) {
      throw new Error('error');
    }
    for (let j = 0, jLen = interface.methods.length; j < jLen; j++) {
      const method = interface.methods[i];
      if (!object[method] || typeof object[method] !== 'function') {
        throw new Error('error');
      }
    }
  }
}