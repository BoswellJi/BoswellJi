const obj = {
  _name: 'ddf',
  set name(newVal) {
    this._name = newVal;
  },
  get name() {
    return this._name;
  }
};

// console.log(obj.name);
obj.name = 'jmz';
// console.log(obj.name);

// 重写属性的get ,set方法
const proxy = new Proxy({
  say() {
    console.log('df');
  }
}, {
  get(target, key, value) {
    // console.log(target, key);
    // return 'dfd';
    console.log('dfdf');
    return target[key]
  },
  set(target, key, value, re) {
    // console.log(target, key, value);
    target[key] = value
  }
});
proxy.name = 'jmz';
// console.log(proxy.name);

console.log(proxy.say());

