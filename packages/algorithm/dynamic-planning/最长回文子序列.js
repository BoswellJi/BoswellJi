/**
 * 回文：对于一个回文子序列来说，正着读跟倒着读都一样
 */
console.time();
function maxLength(str) {
  let left = 0;
  let right = str.length - 1;
  let cache= new Array(right).fill([]);

  function lenFn(st, left, right) {
    if (left > right) return 0;
    if (left == right) return 1;

    if(cache[left][right]) return cache[left][right];

    if (st[left] == st[right]) {
      return 2 + lenFn(st, ++left, --right);
    }

    let c1 = lenFn(st, ++left, right);
    let c2 = lenFn(st, left, --right);

    cache[left][right] = Math.max(c1, c2);

    return Math.max(c1, c2);
  }

 return lenFn(str, left, right);
}

const len = maxLength('122321894939202949219212312311111');
console.log(len);
console.timeEnd();