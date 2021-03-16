/**
 * 最优解可以从子问题的最优解来有效的构建
 * 
 * 每次可以走1个或者2个台阶，可以有多少种走法
 * 
 * @param {*} n 梯子的阶数
 */

function climbStairs(n) {
  let dp = [];
  // 有1个台阶，有两个台阶
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    // 第三个台阶就是 dp[1] + dp[2]
    // 状态转移方程 
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
}

console.time();
const map = {};
const dp = [];

function climbStairs(n) {
  if (map[n]) return map[n];

  if (n == 1) return 1;
  if (n == 2) return 2;

  dp[n] = climbStairs(n - 1) + climbStairs(n - 2);

  map[n] = dp[n];

  return dp[n];
}
console.log(climbStairs(100));

console.timeEnd();