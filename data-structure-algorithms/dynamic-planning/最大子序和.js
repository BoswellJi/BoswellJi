function maxSum(nums) {
  const dp = [];
  let result = nums[0];
  dp[0] = nums[0];

  for (let i = 1; i < nums.length; i++) {
    dp[i] = max(dp[i - 1] + nums[i], nums[i]);
    result = max(dp[i], result);
  }
  return result;
}

function max(a, b) {
  return a > b ? a : b;
}

console.log(maxSum([1, 2, 3, 1, -1, 4, 4, 3, -4, -6]));