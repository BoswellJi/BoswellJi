Function.prototype.callSelf = function (ctx, ...args) {
  const fn = this

  Object.assign(ctx, {
    fn
  })

  return ctx.fn(...args)
}

const obj = { a: 1 }
function fn(a, b, c) {
  console.log(this, a, b, c)
}

fn.callSelf(obj, 1, 1, 3)
