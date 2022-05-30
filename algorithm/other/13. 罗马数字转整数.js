// https://leetcode-cn.com/problems/roman-to-integer/

function romanToInt(s) {
  const numStrMap = {
    IV: 4,
    IX: 9,
    XL: 40,
    XC: 90,
    CD: 400,
    CM: 900,

    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let sum = 0;

  Object.keys(numStrMap).forEach((key) => {
    const val = numStrMap[key];
    const reg = new RegExp(key, "g");
    const arr = s.match(reg) || [];
    const len = arr.length;
    
    sum += val * len;
    s = s.replace(reg,'');
  });

  return sum;
}

const sum = romanToInt('IVIXIIIV');
console.log(sum);

