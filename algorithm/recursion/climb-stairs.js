function climbStairs(n) {
  if (n === 1) {
    return 1;
  } else if (n === 2) {
    return 2;
  }
  return climbStairs(n - 1) + climbStairs(n - 2);
}

function climbStairs(n, sum1 = 1, sum2 = 1) {
  if (n < 2) return sum2;
  return climbStairs(n - 1, sum2, sum1 + sum2);
}

console.log(climbStairs(9));