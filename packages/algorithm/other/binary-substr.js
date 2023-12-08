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

console.log(binarySubstr('00011000110'));

// 0101
//=> 01 01 2