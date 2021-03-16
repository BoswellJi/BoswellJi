/**
 * DP[k][i] 第i天最多k笔交易下的最大利润
 *
 * 这样就可以根据初始状态一步一步地推到目标状态
 *
 * DP[0][0] = 0;
 *
 * DP[k][i] = max(DP[k][i-1],DP[k-1][i-1]+prices[i]);
 */

function maxProfit(prices, times) {
  let DP = new Array(times+1).fill([]);

  for (let k = 1; k < times + 1; k++) {
    let tempMax = -prices[0];
    for (let i = 1; i < prices.length; i++) {
      DP[k][i] = Math.max(DP[k][i - 1], prices[i] + tempMax);
      tempMax = Math.max(tempMax, DP[k - 1][i - 1] - prices[i]);
    }
  }

  return DP[times][prices.length - 1];
}

const profit = maxProfit([1, 2, 3], 3);
console.log(profit);