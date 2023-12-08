/**
 * 计算尝试次数，找出鸡蛋不会被打破的地板；
 * 
 * 1. 先使用二分搜索，保证速度；
 * 2. 在只剩一个鸡蛋的情况下使用线性搜索保证安全性；
 */

function superEggDrop(k, n) {
  const dp = new Array(n + 1).fill(0).map(() => new Array(k + 1).fill(0));

  let m = 0;
  while (dp[m][k] < n) {
    m++;
    for (let i = 1; i <= k; i++) {
      dp[m][i] = dp[m - 1][i - 1] + 1 + dp[m - 1][i];
    }
  }
  return m;
}

const f = superEggDrop(3, 14);
console.log(f);