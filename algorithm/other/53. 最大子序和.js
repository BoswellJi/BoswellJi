// https://leetcode-cn.com/problems/maximum-subarray/

var maxSubArray = function(nums) {
  let ans = nums[0];
  let sum = 0;
  for(const num of nums) {
      if(sum > 0) {
          sum += num;
      } else {
          sum = num;
      }
      ans = Math.max(ans, sum);
  }
  return ans;
};

const sum = maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
console.log(sum);