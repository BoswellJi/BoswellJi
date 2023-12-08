function backPack(value, size, total, n) {
  // 边界条件
  if (n === 0 || total === 0) {
    return 0;
  }
  // 如果从后向前数，尺寸大于了背包的尺寸，向前一个
  if (size[n - 1] > total) {
    return backPack(value, size, total, n - 1);
  } else {
    // 
    return max(value[n - 1] + backPack(value, size, total-size[n-1], n - 1), backPack(value, size, total, n - 1));
  }
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
console.log(backPack(value,size,total,n));