function throttle(cb, time) {
  let pre = new Date()

  return (...args) => {
    const cur = new Date()
    if (cur - pre < time) {
      return
    }
    pre = new Date()
    setTimeout(() => {
      cb.apply(this, [...args, ...arguments])
    }, time)
  }
}

const fn = throttle(() => {
  console.log(2)
}, 100)

setTimeout(()=>{
  fn()
},2000)

setTimeout(()=>{
  fn()
},2010)
console.log('test');
