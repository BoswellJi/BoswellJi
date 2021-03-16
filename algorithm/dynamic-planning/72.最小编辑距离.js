/**
 * 给出两个字符串，s1 = 'horse' s2 = 'ros'，用最少的步骤将s1转换成s2?
 * 
 * s1，s2只有三个操作，增，删，改；
 * 
 * 通常使用两个指针i,j指向两个字符串的结尾，之后一步一步向前来减少问题的大小？
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

  return dp(s1.length, s2.length);
}

const min = minDistance('horse', 'ros');

console.log(min);