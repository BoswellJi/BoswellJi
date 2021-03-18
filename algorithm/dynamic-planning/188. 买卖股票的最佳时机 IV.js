/**
 * buy[i][j] 进行恰好j笔交易，手上恰好持有一支股票，这种情况下的最大利润；
 *
 * sell[i][j] 进行j笔交易，手上恰好不持股票，这种情况下的最大利润；
 */

function maxProfit(k, prices) {
  if (prices.length <= 0) {
    return 0;
  }

  const n = prices.length;
  k = Math.min(k, Math.floor(n / 2));
  const buy = new Array(n).fill(0).map(() => new Array(k + 1).fill(0));
  const sell = new Array(n).fill(0).map(() => new Array(k + 1).fill(0));

  buy[0][0] = -prices[0];
  sell[0][0] = 0;
  for (let i = 1; i <= k; i++) {
    buy[0][i] = sell[0][i] = -Number.MAX_VALUE;
  }

  for (let i = 1; i < n; i++) {
    buy[i][0] = Math.max(buy[i - 1][0], sell[i - 1][0] - prices[i]);
    for (let j = 1; j <= k; j++) {
      buy[i][j] = Math.max(buy[i - 1][j], sell[i - 1][j] - prices[i]);
      sell[i][j] = Math.max(sell[i - 1][j], buy[i - 1][j - 1] + prices[i]);
    }
  }

  return Math.max(...sell[n - 1]);
}

const profit = maxProfit(5, [2,4,1,9,10]);
console.log(profit);