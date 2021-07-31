// https://leetcode-cn.com/problems/sqrtx/

var mySqrt = function (x) {
  let l = 0;
  let r = x;
  let mid = 0;
  let ans = 0;

  if (x == 1) {
    return 1;
  }
  if (x == 0) {
    return 0;
  }

  while (l <= r) {
    mid = l + (r - l) / 2;

    if (mid * mid <= x) {
      l = mid + 1;
      ans = mid;
    } else {
      r = mid - 1;
    }
  }

  return parseInt(ans);
};

const num = mySqrt(9);
console.log(num);