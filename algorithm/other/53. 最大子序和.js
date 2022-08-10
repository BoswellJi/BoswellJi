// https://leetcode-cn.com/problems/maximum-subarray/

var maxSubArray = function (nums) {
    let ans = nums[0];
    let sum = 0;
    for (const num of nums) {
        if (sum > 0) {
            sum += num;
        } else {
            sum = num;
        }
        // 第一个值和第一个和第二个计算的值
        ans = Math.max(ans, sum);
    }
    return ans;
};

const sum = maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
console.log(sum);