/**
 * 所有可以使用递归的地方都可以使用动态规划 
 * 动态规划版本的斐波那契数列
 * 
 * 0 1 1 2 3 5 8 第一个数位1
 * 
 * @param {*} n 从0开始
 */
function recurFib(n) {
  const val = [];

  if (n === 0) {
    return 0;
  } else {
    val[0] = 0;
    val[1] = 1;
    for (var i = 2; i <= n; i++) {
      // 开始根据斐波那契数列规则进行计算(保存到对应的元素中去)
      // 使用动态规划，分解操作
      val[i] = val[i - 1] + val[i - 2];
    }
    return val[n];
  }
}

/**
 * 只存前两个状态
 * 从下到上 从小到大
 * 斐波那契数列之和
 * @param {*} n 数列长度
 */
function recurFib(n) {
  let sum = 1;
  let last = 0;
  let next = 1;
  for (var i = 2; i <= n; i++) {
    // 开始根据斐波那契数列规则进行计算
    sum = last + next;
    last = next;
    next = sum;
  }
  return sum;
}

/**
 * 斐波那契数列之和，递归版本
 * @param {*} n 数列长度
 */
console.time();
function recurFib1(n) {
  if (n == 0 || n == 1) return n;
  return recurFib1(n - 2) + recurFib1(n - 1);
}
recurFib1(20);
console.timeEnd();


/**
 * 从上到下 从大到小
 */
console.time();
const memo = [];
function recurFib(n) {
  if (n == 0 || n == 1) return n;

  if (!memo[n]) {
    memo[n] = recurFib(n - 2) + recurFib(n - 1);
  }

  return memo[n];
}
recurFib(20);
console.timeEnd();


