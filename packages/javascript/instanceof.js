const instanceofSelf = (instance, constructor) => {
  const proto1 = Object.getPrototypeOf(instance) // instance.__proto__;
  let proto2 = constructor.prototype;

  while(proto2){
    if(proto1===proto2){
      return true;
    }else{
      proto2= Object.getPrototypeOf(proto2)
    }
  }
  return false;
}

console.log(instanceofSelf([1, 2, 3], Array)); // true
console.log(instanceofSelf({}, Object)); // tru