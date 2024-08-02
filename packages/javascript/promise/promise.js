class MyPromise {
  constructor(executor) {
    this.state = 'pending'
    this.value = undefined
    this.reason = undefined
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = value => {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.value = value
        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }

    const reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    if (this.state === 'fulfilled') {
      onFulfilled(this.value)
    } else if (this.state === 'rejected') {
      onRejected(this.reason)
    } else if (this.state === 'pending') {
      this.onFulfilledCallbacks.push(() => onFulfilled(this.value))
      this.onRejectedCallbacks.push(() => onRejected(this.reason))
    }
  }
}

MyPromise.all = function (promises) {
  return new MyPromise((resolve, reject) => {
    let count = 0
    let results = []

    promises.forEach((promise, index) => {
      MyPromise.resolve(promise).then(
        value => {
          count++
          results[index] = value
          if (count === promises.length) {
            resolve(results)
          }
        },
        reason => {
          reject(reason)
        }
      )
    })
  })
}

MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    promises.forEach(promise => {
      MyPromise.resolve(promise).then(resolve, reject)
    })
  })
}

MyPromise.allSettled = function (promises) {
  return new MyPromise(resolve => {
    let count = 0
    let results = []

    promises.forEach((promise, index) => {
      MyPromise.resolve(promise).then(
        value => {
          results[index] = { status: 'fulfilled', value }
          count++
          if (count === promises.length) {
            resolve(results)
          }
        },
        reason => {
          results[index] = { status: 'rejected', reason }
          count++
          if (count === promises.length) {
            resolve(results)
          }
        }
      )
    })
  })
}

MyPromise.any = function (promises) {
  return new MyPromise((resolve, reject) => {
    let count = 0
    let errors = []

    promises.forEach((promise, index) => {
      MyPromise.resolve(promise).then(resolve, reason => {
        count++
        errors[index] = reason
        if (count === promises.length) {
          reject(new AggregateError(errors, 'All promises were rejected'))
        }
      })
    })
  })
}

MyPromise.resolve = function (value) {
  return new MyPromise(resolve => resolve(value))
}

MyPromise.reject = function (reason) {
  return new MyPromise((_, reject) => reject(reason))
}
