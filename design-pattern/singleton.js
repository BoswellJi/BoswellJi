

// 实现方式1
let instance = null;
function User() {
  if (instance) {
    return instance;
  }
  instance = this;
  this.name = 'dfdf';

  return instance;
}

const u1 = new User();

// 模块模式
const singleton = (() => {
  let instance = null;

  const init = () => {
    return {
      name: 'jmz'
    };
  }

  return {
    getInstance() {
      if (instance) {
        return instance;
      }
      instance = init();
      return instance;
    }
  };
})();

// console.log(singleton.getInstance()===singleton.getInstance());

class Single {
  constructor() {
    this.instance = null
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new Single;
      return this.instance;
    }
  }
}

console.log(Single.getInstance() === Single.getInstance());
