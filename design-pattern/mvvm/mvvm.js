
// 检测数据变更
class Observer {
  constructor(data) {
    let keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(data, keys[i], data[keys[i]]);
    }
  }
}

/**
 * 定义响应式对象
 * @param {Object} data 数据源
 * @param {String} key 键
 * @param {String} val 值
 */
function defineReactive(data, key, val) {
  // 验证是否为对象
  observer(val);
  // 每个属性的依赖收集对象
  let dep = new Dep();
  // 劫持数据
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    get() {
      dep.addSup();
      return val;
    },
    set(newVal) {
      if (val === newVal) {
        return;
      } else {
        data[key] = newVal;
        observer(newVal);
        // 属性修改通知所有依赖
        dep.notify();
      }
    }
  });
}

/**
 * 检查是否为对象，为对象进行递归监听
 * @params data 被观察的对象
 */
function observer(data) {
  if (Object.prototype.toString.call(data) === '[object,Object]') {
    new Observer(data);
  } else {
    return;
  }
}

// 观察属性变化
class Watch {
  constructor(exp, cb) {
    this.exp = exp;
    this.cb = cb;
    data[exp];
    Dep.target = this;
  }
}

// 收集每个key的依赖
class Dep {
  constructor() {
    this.subs = [];
  }

  addSup() {
    this.subs.push(Dep.target);
  }

  notify() {
    for (let i = 0, len = this.subs.length; i < len; i++) {
      this.subs[i].cb();
    }
  }
}

Dep.target = null;


// model
const data = {
  name: 'jmz',
  age: 25,
  address: {
    pro: 'js',
    city: 'sz',
    company: 'jx'
  }
};

observer(data);

new Watch('name', () => { })

