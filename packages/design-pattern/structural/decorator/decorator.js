/**
 * 为对象增添特性
 */

function Bicycle() { }

Bicycle.prototype = {
  assemble: function () { },
  wash: function () { }
};

function BicycleDecorator(bicycle) {
  this.bicycle = bicycle;
}

BicycleDecorator.prototype = {
  assemble() {
    this.bicycle.assemble();
  },
  wash() {
    this.bicycle.wash();
  }
};

const toString = Object.prototype.toString;

Object.prototype.toString = function(){
  // 其他处理
  toString();
}