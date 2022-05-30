
Function.prototype.apply = function(context){
  context.fn = this;
  let args = [...arguments].slice(1);
  let result = context.fn(...args[1]);
  delete context.fn();
  return result;
}


console.log(Math.max.apply([],[2,3,4]));