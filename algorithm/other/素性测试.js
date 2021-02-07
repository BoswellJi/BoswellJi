
/**
 * 判断一个自然数是否为素数
 * 素数：只能被1和其自身整除，且大于1的自然数
 * 
 * 方法一：从2开始遍历取模，为0的，且不为自身的，就不是素数
 * 
 * 方法二： 费马测试
 * 
 * 确认num和余数的次数一致越多，num为素数的可能性越大
 */
function fn(num) {
  const num1 = num - 1;
  const num2 = num - 7;
  const num3 = num - 10;

  const modNum1 = Math.pow(num1, num) % num;
  const modNum2 = Math.pow(num2, num) % num;
  const modNum3 = Math.pow(num3, num) % num;

  if (modNum1 == num1 && modNum2 == num2 && modNum3 == num3) {
    return true;
  } else {
    return false;
  }
}

const isTure = fn(17);

console.log(isTure);

