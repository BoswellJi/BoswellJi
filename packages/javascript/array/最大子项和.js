// 相连的最大子数组和，
function maxSubArray(arr) {
  if (!arr.length) {
    return 0
  }

  let a = arr[0]
  let b = arr[0]

  for (let i = 1; i < arr.length; i++) {
    b = Math.max(arr[i], a + arr[i])
    a = Math.max(b, a)
  }

  return a
}

// 示例
const nums1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
console.log(maxSubArray(nums1)) // 输出 6, 子数组为 [4, -1, 2, 1]

const nums2 = [1]
console.log(maxSubArray(nums2)) // 输出 1

const nums3 = [5, 4, -1, 7, 8]
console.log(maxSubArray(nums3)) // 输出 23, 子数组为 [5, 4, -1, 7, 8]

/**
 * 元素位置与相连无关不需要相连最大子数组之和
 * @param {*} arr
 * @returns
 */
function maxSubarraySumNonContiguous(arr) {
  let maxSum = 0
  let hasPositive = false // 标记数组中是否存在正数

  // 计算所有正数的和
  for (const num of arr) {
    if (num > 0) {
      maxSum += num
      hasPositive = true
    }
  }

  // 如果没有正数，则返回数组中的最大值
  if (!hasPositive) {
    return Math.max(...arr)
  }

  return maxSum
}

// 示例
console.log(maxSubarraySumNonContiguous([3, -2, 5, -1])) // 输出 8（选择 3 和 5）
console.log(maxSubarraySumNonContiguous([-3, -2, -1])) // 输出 -1（选择 -1，因为没有正数）
console.log(maxSubarraySumNonContiguous([1, 2, 3, 4])) // 输出 10（选择所有正数）

/**
 * 非相连数组元素最大和
 * @param {*} arr
 */
function maxNonAdjacentSum(arr) {
  if (arr.length === 0) return 0
  if (arr.length === 1) return arr[0]

  let prev1 = arr[0]
  let prev2 = 0
  let current

  for (let i = 1; i < arr.length; i++) {
    current = Math.max(prev1, arr[i] + prev2)
    prev2 = prev1
    prev1 = current
  }

  return current
}

console.log('maxNonAdjacentSum------------')

console.log(maxNonAdjacentSum([1, 2, -1, 2, 1]))
