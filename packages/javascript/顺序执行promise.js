async function p(arrPromise) {
  const data = []
  await new Promise(resolve => {
    arrPromise.reduce((p, p1) => {
      return p.then(d => {
        data.push(d)
        if (arrPromise.length <= data.length) {
          resolve(data)
          return
        }
        return p1
      })
    })
  })

  console.log(data)
}

p([Promise.resolve(1), Promise.resolve(2), Promise.resolve(7)])
