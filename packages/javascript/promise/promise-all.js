const promiseAll = promises => {
  return new Promise((reslove, reject) => {
    const result = []
    let count = 0
    promises.forEach((promise, index) => {
      Promise.reslove(promise)
        .then(value => {
          result[index] = value
          count++
          if (count === promises.length) {
            reslove(result)
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  })
}

promiseAll([
  new Promise(reslove => {
    setTimeout(() => {
      reslove(1)
    }, 1000)
  }),
  new Promise(reslove => {
    setTimeout(() => {
      reslove(2)
    }, 2000)
  }),
  new Promise(reslove => {
    setTimeout(() => {
      reslove(3)
    }, 3000)
  })
]).then(res => {
  console.log(res)
})
