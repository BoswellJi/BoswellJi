Function.prototype.bindSelf = function (ctx, ...args) {
  const that = this
  return function (...newArgs) {
    const symbol = Symbol()
    Object.assign(ctx, {
      [symbol]: that
    })
    return ctx[symbol](...[...args, ...newArgs])
  }
}

function fn1(a, b) {
  console.log(this.a, a, b)
}

const obj1 = {
  a: 3
}

fn1.bindSelf(obj1, 1, 2)()
