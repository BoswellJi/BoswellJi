function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype)

  const res = fn.apply(obj, args)

  return res || obj
}

function A(a) {
  this.a = a
}

const a = myNew(A, 1, 2)

console.log(a instanceof A, a.a)
