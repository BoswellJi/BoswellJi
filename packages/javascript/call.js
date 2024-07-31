Function.prototype.callSelf = function (ctx, ...args) {
  const symbol = Symbol()

  Object.assign(ctx, {
    [symbol]: this
  })

  return ctx[symbol](...args)
}

const obj = { a: 1 }
function fn(a, b, c) {
  console.log(a, b, c)
}

fn.callSelf(obj, 1, 1, 3)
