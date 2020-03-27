/**
 * 简单工厂： 一个创建对象的工厂，可以根据用户需要的类型创建对应的对象，隔离了对象之前的耦合；
 * 抽象工厂： 一个创建不同工厂的工厂，对工厂进行抽象，具体工厂给子类进行实现，进而创建对应工厂的对象实例；
 */

class Cat {
  constructor(options) {
    this.name = options.name || 'cat1';
  }
}

class Dog {
  constructor(options) {
    this.name = options.name || 'dog1';
  }
}

class Animal {
  createAn(options) {
    if (options.type === 'cat') {
      return new Cat(options);
    } else if (options.type === 'dog') {
      return new Cat(options);
    }
  }
}

const an = new Animal().createAn({
  type: 'cat',
  name: 'hhh'
}).name;


// 抽象工厂
const BicycleShop = function () { }

BicycleShop.prototype = {
  sellBicycle(model) {
    const bicycle = this.createBicycle(model);
    console.log(bicycle);

    return bicycle;
  },
  createBicycle() {
    throw new Error('抽象类方法不支持调用')
  }
};


// 实例工厂
const Test1BicycleShop = function () {

}

Test1BicycleShop.prototype = new BicycleShop();
Test1BicycleShop.prototype.createBicycle = function (model) {
  let bicycle = null;
  switch (model) {
    case 1:
      bicycle = new Number();
      break;
    case '1':
      bicycle = new String();
      break;
    default:
      bicycle = new Object();
  }
  return bicycle;
}

new Test1BicycleShop().sellBicycle('1');

