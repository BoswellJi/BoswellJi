/**
 * 给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 */

function pathSum(m, n, arr) {
  // dp[m-1][n-1]种路经
  // dp[i][j] = dp[i-1][j]+dp[i][j-1];

  if (m <= 0 || n <= 0) {
    return 0;
  }

  let dp = new Array(m).fill([]);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + arr[i][j];
    }
  }

  return dp[m - 1][n - 1];
}

const sum = pathSum(3, 3,[
  [1,2,3],
  [1,2,3],
  [1,2,3],
]);
console.log(sum);