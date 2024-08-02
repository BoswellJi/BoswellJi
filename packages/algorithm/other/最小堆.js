class MinHeap {
  constructor() {
    this.heap = []
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2)
  }

  getLeftChildIndex(i) {
    return 2 * i + 1
  }

  getRightChildIndex(i) {
    return 2 * i + 2
  }

  swap(i, j) {
    ;[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
  }

  push(value) {
    this.heap.push(value)
    this.heapifyUp()
  }

  heapifyUp() {
    let index = this.heap.length - 1
    while (
      this.getParentIndex(index) >= 0 &&
      this.heap[this.getParentIndex(index)] > this.heap[index]
    ) {
      this.swap(this.getParentIndex(index), index)
      index = this.getParentIndex(index)
    }
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop()
    const root = this.heap[0]
    this.heap[0] = this.heap.pop()
    this.heapifyDown(0)
    return root
  }

  heapifyDown(index) {
    while (this.getLeftChildIndex(index) < this.heap.length) {
      let smallerChildIndex = this.getLeftChildIndex(index)
      if (
        this.getRightChildIndex(index) < this.heap.length &&
        this.heap[this.getRightChildIndex(index)] < this.heap[smallerChildIndex]
      ) {
        smallerChildIndex = this.getRightChildIndex(index)
      }
      if (this.heap[index] < this.heap[smallerChildIndex]) break
      this.swap(index, smallerChildIndex)
      index = smallerChildIndex
    }
  }

  peek() {
    return this.heap[0]
  }

  size() {
    return this.heap.length
  }
}

function findKthLargest(nums, k) {
  const minHeap = new MinHeap()
  for (const num of nums) {
    minHeap.push(num)
    if (minHeap.size() > k) {
      minHeap.pop()
    }
  }
  return minHeap.peek()
}

// 示例
const nums = [3, 2, 1, 5, 6, 4]
const k = 2
console.log(findKthLargest(nums, k)) // 输出: 5
