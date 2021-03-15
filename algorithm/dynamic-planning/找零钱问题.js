/**
 * 不同面值的硬币和总金额，怎样配置硬币最小化数量来匹配总金额；
 * @param {*} coins 
 * @param {*} amount 
 * @returns 
 */
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(10);
  dp[0] = 0;

  // 当总金额为x时，对应的值为硬币个数
  for (let j = 0, lenj = dp.length; j < lenj; j++) {
    for (let i = 0, len = coins.length; i < len; i++) {

      // 总金额-币值
      const sub = j - coins[i];

      // 小于0，就换个币
      if (sub < 0) continue;

      // 当前币数量和
      dp[j] = Math.min(dp[j], 1 + dp[sub]);
    }
  }

  return (dp[amount] === amount + 1) ? -1 : dp[amount];
}

const sum = coinChange([ 5,3], 11);
console.log(sum);