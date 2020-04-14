
/**
 * 斐波那契数列（规律：每个数都是前两个数之和，从第三个数开始），求到n的斐波那契数列的和； 
 * 0 1 1 2 3 5 8
 * 
 * @param {*} n 
 */
function recurFib(n) {
  if (n < 2) {
    return n;
  }
  // 将问题进行分解
  return recurFib(n - 1) + recurFib(n - 2)
}

/**
 * 动态规划版本的斐波那契数列
 * @param {*} n 
 */
function recurFib(n) {
  // 通常需要将结果保存起来
  const val = [];
  // 设置一个数值长度的数组，初始值为0
  for (let i = 0; i < n; i++) {
    val[i] = 0;
  }
  // 当n为1，或者2时 ，和为2，直接返回（边界情况
  if (n === 1 || n === 2) {
    return 1;
  } else {
    // 给第二个，第三个元素设置初始值
    val[1] = 1;
    val[2] = 2;
    for (var i = 3; i <= n; i++) {
      // 开始根据斐波那契数列规则进行计算
      val[i] = val[i - 1] + val[i - 2];
    }
    // 返回数组的最后一个
    return val[n - 1];
  }
}

/**
 * 
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

console.log(recurFib(10));