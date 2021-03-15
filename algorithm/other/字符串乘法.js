/**
 * 小数值计算没问题；
 * 大数值计算可能会有数据类型溢出；
 * 
 * 替代方案就是用字符串来表示数字；
 */

function multiply(num1Str, num2Str) {
  let m1 = num1Str.length;
  let m2 = num2Str.length;

  let res = [];

  for (let i = m1 - 1; i >= 0; i--) {
    for (let j = m2 - 1; j >= 0; j--) {
      let mul = (num1Str[i] - '0') * (num2Str[j] - '0');
      let p1 = i + j;
      let p2 = i + j + 1;
      let sum = mul + (res[p2] ? res[p2] : 0);
      res[p2] = sum % 10;
      res[p1] += sum / 10;
    }
  }

  let i = 0;
  while (i < res.length && res[i] == 0) {
    i++;
  }

  let str='';
  for (; i<res.length; i++) {

    str += res[i]?res[i]:0;
  }

  return  str.length == 0 ? '0' : str;
}

const num = multiply('123', '45');
console.log(num);