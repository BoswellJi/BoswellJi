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

// 示例使用
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const queue = new PromiseQueue(2) // 设置并发数为2

const task1 = () => sleep(1000).then(() => console.log('Task 1 done'))
const task2 = () => sleep(5000).then(() => console.log('Task 2 done'))
const task3 = () => sleep(3000).then(() => console.log('Task 3 done'))
const task4 = () => sleep(4000).then(() => console.log('Task 4 done'))

queue.enqueue(task1)
queue.enqueue(task2)
queue.enqueue(task3)
queue.enqueue(task4)
