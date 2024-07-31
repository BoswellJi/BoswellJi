function asyncFunction(genFunc) {
  return function (...args) {
    const generator = genFunc(...args)

    function handle(result) {
      if (result.done) return Promise.resolve(result.value)

      return Promise.resolve(result.value).then(
        res => handle(generator.next(res)),
        err => handle(generator.throw(err))
      )
    }

    try {
      return handle(generator.next())
    } catch (ex) {
      return Promise.reject(ex)
    }
  }
}

// 使用示例
const fetchData = asyncFunction(function* () {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('data'), 1000)
  })

  let data = yield promise
  console.log(data) // 打印 'data'，延迟 1 秒
})

fetchData()
