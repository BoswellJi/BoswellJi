/**
 * 前缀求和法
 * @param {*} arr 
 * @param {*} target 
 */
function prefixSum(arr, target) {

  let n = arr.length;
  let sum = [];
  sum[0] = 0;

  // prefix sum 数组，求数据的每个元素与之和子数组的和
  for (let i = 0; i < n; i++) {
    sum[i + 1] = sum[i] + arr[i];
  }

  let ans = 0;

  // 计算子数组之间差
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (sum[i] - sum[j] === target) {
        ans++;
      }
    }
  }

  return ans;
}

function prefixSum(arr, target) {
  let n = arr.length;
  let map = new Map();

  map.set(0, 1);

  let ans = 0;
  let sumI = 0;

  for (let i = 0; i < n; i++) {
    sumI += arr[i];
    let sumJ = sumI - target;

    if (map.has(sumJ)) {
      ans += map.get(sumJ);
    }

    map.set(sumI, map.get(sumI));
  }

  return ans;
}

const subArr = prefixSum([1, 0, 1, 1, 2, 0], 2);
console.log(subArr);