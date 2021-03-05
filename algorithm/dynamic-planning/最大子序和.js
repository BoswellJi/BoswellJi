/**
 * 子序列中和最大的子序
 * @param {*} nums 
 */
function maxSum(nums) {
  const dp = [];
  let result = nums[0];

  dp[0] = nums[0];

  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
    result = Math.max(dp[i], result);
  }

  return result;
}

console.log(maxSum([1, 2, 3, 1, -1, 4, 4, 3, -4, -6]));