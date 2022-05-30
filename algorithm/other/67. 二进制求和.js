// https://leetcode-cn.com/problems/add-binary/
var addBinary = function (a, b) {
  a = a.split('');
  b = b.split('');

  const aLen = a.length;
  const bLen = b.length;
  const diffLen = Math.abs(aLen - bLen);
  const arr = [];

  if (aLen > bLen) {
    for (let i = 0; i < diffLen; i++) {
      b.unshift('0');
    }
  } else {
    for (let i = 0; i < diffLen; i++) {
      a.unshift('0');
    }
  }

  
 let bLen1 = b.length - 1;

  for (let i = a.length - 1; i >= 0; i--) {
    const el1 = a[i];
    const el2 = b[bLen1--];
    let sum = (+ el1) + (+ el2);

    if (sum < 2) {
      arr.unshift(sum);
      sum = 0;
    } else {
      arr.unshift((sum - 2));
      sum = 0;
      if (i == 0) {
        arr.unshift('1');
      } else {
        a[i - 1] = parseInt(a[i - 1]) + 1;
      }
    }
  }

  return arr.join('');
};

const sum = addBinary('11', '1');
console.log(sum);