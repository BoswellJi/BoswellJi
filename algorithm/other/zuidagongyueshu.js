/**
 * 两个不全为0的非负整数 m 和 n 的最大公约数记为gcd(m,n),代表能够整除m和n的最大正整数；
 * 
 * 5 10 => 5
 * 
 * 1. 因为m和n最大公约数能够同时整除他们，显然，公约数不会大于两数中的最小的；
 */

//  解法1：
function gcd(m, n) {
  // n = 0; 0可以被任何数整除，m即为最大公约数
  if (n === 0) {
    return m;
  }

  // m能够被n整除；n即为最大公约数；因为是模，所以总是比n小；
  // 当r = 0 时，算法也就结束了；
  const r = m % n;
  m = n;
  n = r;

  return gcd(m, n);
}

// 解法2：
function gcd(m, n) {
  const t = Math.min(m, n);
  const r = m % t;

  if (t == 0) {
    return 0;
  }

  if (r == 0) {
    return t;
  }

  n--;

  return gcd(m, n);
}

console.log(gcd(140, 0));