/**
 * 创建大量类产生的内存占用导致的性能问题
 * 1. 一连用上几天也不会重新加载的大型应用系统
 * 
 * 主要是将类的内部数据与外部数据进行拆分，组合，减少产生的实例
 */

function Car() {
  this.brandName = '';
  this.make = '';
  this.year = '';
  this.own = '';
  this.address = '';
}

//  每个人一辆车
new Car();

// 抽出一个类型
function Car() {
  this.brandName = '';
  this.make = '';
  this.year = '';
}

function Person() {
  this.name = '';
  this.address = '';
  this.car = '';
}


const car = new Car();
const person = new Person();

// 车可以被不同的人共享

const carFactory = (function () {
  const createdCars = [];

  return {
    createCar(brandName, make, year) {
      if (createdCars[brandName + make + year]) {
        return createdCars[brandName + make + year];
      } else {
        createdCars[brandName + make + year] = new Car();
      }
    }
  };
})();

const CarRecordManager = (function () {
  const carRecordDatabase = {};

  return {
    addCarRecord(brandName,make,year,name,address){
      const car = carFactory(brandName,make,year);
      carRecordDatabase[tag] = {
        name: name,
        address: address,
        car: car
      }
    },
    transferOwnership(){},
  };
})();