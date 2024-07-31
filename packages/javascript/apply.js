Function.prototype.applySelf = function (ctx, args) {
  const symbol = Symbol()

  Object.assign(ctx, {
    [symbol]: this
  })

  return ctx[symbol](...args)
}

function fn1(a, b) {
  console.log(this.a, a, b)
}

const obj1 = {
  a: 3
}

console.log(fn1.applySelf(obj1, [1, 2]))
