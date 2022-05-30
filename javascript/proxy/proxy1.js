const person = {
  name: 'jmz',
  age: 21
};

const personProxy = new Proxy(person, {
  set(trapTarget, key, value, receiver) {

    // 对象实例没有的属性
    if (!trapTarget.hasOwnProperty(key)) {
      // 必须是数值
      if (isNaN(value)) {
        throw new TypeError("Property must be a number.");
      }
    }

    console.log(arguments);

    // 获取对象原生set方法的能力，保留对象原生set方法的能力，因为对象的set被proxy对象给拦截了
    return Reflect.set(trapTarget, key, value, receiver);
  }
});

// personProxy.count = 1;
// console.log(personProxy.count);
// console.log(personProxy.count);

personProxy.name = "proxy";
console.log(personProxy.name);       
console.log(person.name); 

// personProxy.anotherName = "11proxy";

// 返回定义属性之后的对象
console.log(
  Object.defineProperty({}, 'property1', {
    value: 42,
    writable: false
  })
);