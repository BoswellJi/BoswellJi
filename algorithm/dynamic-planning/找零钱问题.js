/**
 * 不同面值的硬币和总金额，怎样配置硬币最小化数量来匹配总金额；
 * @param {*} coins 
 * @param {*} amount 
 * @returns 
 */
function coinChange(coins, amount) {
  // 数组的索引就是总金额的从0到amount
  // 意味着目标金额为i时，至少有dp[i]个硬币需要
  const dp = new Array(amount + 1).fill(amount + 1);
  dp[0] = 0;

  // 当总金额为x时，对应的值为硬币个数
  for (let j = 0, lenj = dp.length; j < lenj; j++) {
    for (let i = 0, len = coins.length; i < len; i++) {

      // 总金额-币值
      const sub = j - coins[i];

      // 小于0，就换个币
      if (sub < 0) continue;

      // 不同总金额对应的硬币数量
      dp[j] = Math.min(dp[j], 1 + dp[sub]);
    }
  }

  console.log(dp);

  return (dp[amount] === amount + 1) ? -1 : dp[amount];
}

function coinChange(coins, amount) {

  // 加了备忘录
  const cache = {};

  function dp(n) {

    if(n in cache) return cache[n];

    if (n == 0) return 0;
    if (n < 0) return -1;

    let res = Infinity;

    for (let coin of coins) {
      let subProblem = dp(n - coin);
      if (subProblem == -1) continue;
      res = Math.min(res, 1 + subProblem);
    }

    cache[n] = res ? res : -1
    return cache[n];
  }

  return dp(amount);
}

const sum = coinChange([10, 1, 5, 3], 10);
console.log(sum);