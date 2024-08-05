function maxSubArray(nums) {
  if (nums.length === 0) {
    return 0
  }

  let maxSoFar = nums[0]
  let maxEndingHere = nums[0]

  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i])
    maxSoFar = Math.max(maxSoFar, maxEndingHere)
  }

  return maxSoFar
}

// 示例
const nums1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
console.log(maxSubArray(nums1)) // 输出 6, 子数组为 [4, -1, 2, 1]

const nums2 = [1]
console.log(maxSubArray(nums2)) // 输出 1

const nums3 = [5, 4, -1, 7, 8]
console.log(maxSubArray(nums3)) // 输出 23, 子数组为 [5, 4, -1, 7, 8]
