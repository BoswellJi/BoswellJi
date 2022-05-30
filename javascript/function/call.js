Function.prototype.call2 = function (context) {
  context.fn = this;
  let args = [...arguments].slice(1);
  let result = context.fn(...args);
  delete context.fn;
  return result;
}

Function.prototype.apply2 = function(context){
  context.fn = this;
  let args = [...arguments].slice(1);
  let result = context.fn(...args[1]);
  delete context.fn();
  return result;
}