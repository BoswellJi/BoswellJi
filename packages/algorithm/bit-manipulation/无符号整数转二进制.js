function hammingWeight(n) {
  let res = 0;
  while (n != 0) {
    n = n & (n - 1);
    res++;
  }
  return res;
}

const num = hammingWeight('');
console.log(num);