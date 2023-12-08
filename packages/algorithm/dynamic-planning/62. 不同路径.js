/**
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

问总共有多少条不同的路径？
 * @param {*} m 
 * @param {*} n 
 * @returns 
 */

function pathNum(m, n) {
  // dp[m-1][n-1]种路经
  // dp[i][j] = dp[i-1][j]+dp[i][j-1];

  if (m <= 0 || n <= 0) {
    return 0;
  }

  let dp = new Array(m).fill([]);

  for (let i = 0; i < m; i++) {
    dp[i][0] = 1
  }
  for (let i = 0; i < n; i++) {
    dp[0][i] = 1
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }

  return dp[m - 1][n - 1];
}

const num = pathNum(3, 4);
console.log(num);