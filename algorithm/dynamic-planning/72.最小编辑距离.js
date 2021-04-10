/**
 * 给出两个字符串，s1 = 'horse' s2 = 'ros'，用最少的步骤将s1转换成s2?
 * 
 * s1，s2只有三个操作，增，删，改，其实还有一个跳过；
 * 
 * 通常使用两个指针i,j指向两个字符串的结尾，之后一步一步向前来减少问题的大小？
 */

/**
 * 优化前
 * @param {*} s1 
 * @param {*} s2 
 * @returns 
 */
function minDistance(s1, s2) {
  function dp(i, j) {
    if (i == -1) return j + 1;
    if (j == -1) return i + 1;

    if (s1[i] == s2[j]) {
      return dp(i - 1, j - 1);
    } else {
      return Math.min(dp(i, j - 1) + 1, dp(i - 1, j) + 1, dp(i - 1, j - 1) + 1);
    }
  }
  return dp(s1.length - 1, s2.length - 1);
}

/**
 * 优化后，为了避免重复计算
 * @param {*} s1 
 * @param {*} s2 
 * @returns 
 */
 function minDistance(s1, s2) {
  const dp = new Array(s1.length + 1);
  for (let i = 0; i < s1.length + 1; i++) {
    dp[i] = new Array(s2.length + 1);
  }
  for (let i = 0; i <= s1.length; i++) {
    dp[i][0] = i;
  }
  for (let i = 0; i <= s2.length; i++) {
    dp[0][i] = i;
  }
  console.log(dp);
  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1[i - 1] == s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i][j - 1]+1, dp[i - 1][j]+1, dp[i - 1][j - 1]+1)
      }
    }
  }
  console.log(dp);
  return dp[s1.length][s2.length];
}

console.time();
const min = minDistance('horseabc', 'rosbacsdfdfdf');
console.log(min);
console.timeEnd();