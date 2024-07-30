class PromiseQueue {
  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent
    this.currentCount = 0
    this.queue = []
  }

  enqueue(promiseGenerator) {
    return new Promise((resolve, reject) => {
      this.queue.push({ promiseGenerator, resolve, reject })
      this.dequeue()
    })
  }

  dequeue() {
    if (this.currentCount >= this.maxConcurrent || this.queue.length === 0) {
      return
    }

    const { promiseGenerator, resolve, reject } = this.queue.shift()
    this.currentCount++

    promiseGenerator()
      .then(result => {
        resolve(result)
      })
      .catch(error => {
        reject(error)
      })
      .finally(() => {
        this.currentCount--
        this.dequeue()
      })
  }
}
