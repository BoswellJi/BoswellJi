/**
 * 解决问题：
 * 1. 创建大量类似对象产生的内存占用导致的性能问题；
 * 
 * 方法：
 * 1. 将独立对象转换为少量的共享对象；
 * 2. 主要是将类的内部数据与外部数据进行拆分，组合，减少产生的实例；
 * 2.1. 内部数据： 类的内在必须数据；（内在状态相同的对象进行共用
 * 2.2. 外部数据： 
 * 
 */

/**
 * 所有信息混在一起，多少辆车，就有多少对象
 * @param {*} make 
 * @param {*} model 
 * @param {*} year 
 * @param {*} owner 
 * @param {*} tag 
 * @param {*} renewDate 
 */
function Car(make, model, year, owner, tag, renewDate) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.owner = owner;
  this.tag = tag;
  this.renewDate = renewDate;
}

//  每辆车都在登记
new Car();

/**
 * 抽出一个类型
 * 同类型汽车为一个实例
 */
function Car(model, make, year) {
  this.model = model;
  this.make = make;
  this.year = year;
}

function Person(owner, tag, renewDate) {
  this.owner = owner;
  this.tag = tag;
  this.renewDate = renewDate;
}

/**
 * 车可以被不同的人共享
 * 同一种内在状态的车子
 */
const carFactory = (function () {
  const createdCars = [];

  return {
    createCar(model, make, year) {
      if (createdCars[model + make + year]) {
        return createdCars[model + make + year];
      } else {
        createdCars[model + make + year] = new Car(model, make, year);
      }
    }
  };
})();

/**
 * 每个人登记
 */
const CarRecordManager = (function () {
  const carRecordDatabase = {};

  return {
    addCarRecord(model, make, year, owner, tag, renewDate) {
      const car = carFactory(model,make,year);
      carRecordDatabase[tag] = {
        owner: owner,
        renewDate: renewDate,
        car: car
      }
    }
  };
})();