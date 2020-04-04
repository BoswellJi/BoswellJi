function step(n) {
  if (n === 1) {
    return 1;
  } else if (n === 2) {
    return 2;
  } 
  return step(n - 1) + step(n - 2);
}

function climbStairs(n) {
  let dp = []
  dp[1] = 1
  dp[2] = 2
  for (let i = 3; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
};

var climbStairs = function(n, sum1=1, sum2=1) {
  if (n < 2) return sum2;
  return climbStairs(n-1, sum2, sum1 + sum2);
};