/**
 * 构造函数模式
 */

function Car(model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;
}

/**
 * 使用原型对象，实例之间共享方法
 */
Car.prototype.toString = function () {
  return this.model + "  " + this.miles + " ";
};


var civic = new Car("1", 2009, 20000);
var mondeo = new Car("2", 2010, 5000);