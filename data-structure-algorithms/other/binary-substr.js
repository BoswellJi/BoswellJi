function binarySubstr(value) {
  const len = value.length;
  let n = 0, pre = 0, current = 1, i;
  for (i = 0; i < len; i++) {
    // 当前的和下一个
    if (value[i] === value[i + 1]) {
      current++;
    } else {
      if (pre > 0) {
        n += Math.min(pre, current);
      }
      pre = current;
      current = 1;
    }
  }
  return n;
}

const a = s => {
  const sA = s.split('');
  const zeroStack = [];
  const oneStack = [];
  let result = 0;
  sA.forEach(char => {
    if (char === '0') {
      zeroStack.push('0');
      if (oneStack.length > 0) {
        oneStack.pop();
        result++;
      }
    }
    if (char === '1') {
      oneStack.push('1');
      if (zeroStack.length > 0) {
        zeroStack.pop();
        result++;
      }
    }
  });
  return result;
}

console.log(binarySubstr('00011000110'));

// 0101
//=> 01 01 2