/**
 * 阶乘
 * @param {number} num 
 */
function factorial(num) {
  if (num <= 1) {
    return num;
  } else {
    return num * factorial(num - 1);
  }
}

factorial(4);
