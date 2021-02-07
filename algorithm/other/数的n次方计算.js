/**
 * 减常量
 * @param {*} num1 底数
 * @param {*} num2 指数
 */
function fn(num1, num2) {
  if (num2 === 0) {
    return 1;
  } else if (num2 === 1) {
    return num1;
  } else {
    return fn(num1, num2 - 1) * num1;
  }
}

const sum = fn(10, 100);

console.log(sum);