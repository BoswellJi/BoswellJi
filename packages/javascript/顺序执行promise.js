async function p(arrPromise) {
  const data = [];
    arrPromise.reduce((p, p1) => {
      return p.then((d)=>{
        return p1.then(d1=>{
          data.push(d1)
        })
      })
    },Promise.resolve())
    .then((d)=>{
      console.log(data)
    })
  }

p([Promise.resolve(1), Promise.resolve(2), Promise.resolve(7)])
