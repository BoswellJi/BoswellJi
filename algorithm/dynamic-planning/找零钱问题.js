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

// function coinChange(coins, amount) {
//   let dp = new Array(amount + 1).fill(Infinity);
//   dp[0] = 0;

//   let path = [];

//   // 遍历总金额大小
//   for (let i = 1; i <= amount; i++) {

//     // 遍历硬币数量
//     for (let j = 0; j < coins.length; j++) {
//       let n = i - coins[j];

//       // 当总金额大于硬币的币值
//       if (n >= 0) {
//         if (dp[n] + 1 < dp[i]) {
//           dp[i] = dp[n] + 1;
//           path[i] = coins[j];
//         }
//       }
//     }
//   }

//   let sum = path[amount];
//   let res = [sum];
//   amount = amount - sum;

//   while (amount > 0) {
//     sum = path[amount];
//     res.push(sum);
//     amount = amount - sum;
//   }

//   console.log(dp, res);
// }

const sum = coinChange([ 5,3], 11);
console.log(sum);