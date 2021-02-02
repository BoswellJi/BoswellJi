/**
 * 最优解可以从子问题的最优解来有效的构建
 * 
 * @param {*} n 梯子的阶数
 */

function climbStairs(n) {
  let dp = []
  // 有1个台阶，有两个台阶
  dp[1] = 1
  dp[2] = 2
  // 第三个台阶就是 dp[1] + dp[2]

  for (let i = 3; i <= n; i++) {
    // 状态转移方程 
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
};

console.log(climbStairs(1));