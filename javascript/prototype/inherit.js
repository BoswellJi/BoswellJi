
/**
 * 寄生式继承
 */
function Parent() { }

Parent.prototype = {};

function Child() {
  Parent.call(this, arguments);
}

Child.prototype = inherit(Parent.prototype);
Child.prototype.constructor = Child;

function inherit(proto) {
  function F() { }
  F.prototype = proto;
  return new F();
}

