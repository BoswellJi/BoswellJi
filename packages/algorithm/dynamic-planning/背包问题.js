function backPack(value, size, total, n) {
  const k = [];
  // 给背包每一个尺寸都添加一个数组
  for (let i = 0; i <= total + 1; i++) {
    k[i] = [];
  }
  for (let i = 0; i <= n; i++) {
    for (let w = 0; w <= total; w++) {
      if (i === 0 || w === 0) {
        return 0;
      } else if (size[i - 1] <= w) {
        k[i][w] = max(value[i - 1] + k[i - 1][w - size[i - 1]], k[i - 1][w]);
      } else {
        k[i][w] = k[i - 1][w];
      }
    }
  }
  return k[n][total];
}

function max(a, b) {
  return a > b ? a : b;
}

// 宝贝
const value = [4, 5, 10, 11, 13];
// 尺寸
const size = [3, 4, 7, 8, 9];
// 总尺寸（背包尺寸
const total = 16;
// 宝贝个数
const n = 5;

// 动态规划解决的背包问题
// 问： 怎么装（价值）的方式最后和最大还不能超过总尺寸
console.log(backPack(value, size, total, n));