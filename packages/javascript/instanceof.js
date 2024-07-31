const instanceofSelf = (instance, constructor) => {
  const proto1 = Object.getPrototypeOf(instance)

  while (proto1) {
    if (proto1 === constructor.prototype) {
      return true
    } else {
      proto1 = Object.getPrototypeOf(proto1)
    }
  }
  return false
}

console.log(instanceofSelf([1, 2, 3], Array)) // true
console.log(instanceofSelf({}, Object)) // tru
