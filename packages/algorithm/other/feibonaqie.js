/**
 * 斐波那契数列
 * 
 * 0 1 1 2 3
 */

/**
 * 第n个斐波那契数
 * @param {*} n 
 */
function fbn(n) {
  if (n == 1) {
    return 0;
  }

  if (n == 2) {
    return 1;
  }

  // 分治： 前面的两数之和
  return fbn(n - 2) + fbn(n - 1);
}

console.log(fbn(5));