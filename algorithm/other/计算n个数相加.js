/**
 * 计算n个数的和
 * @param {*} num 
 */
function fn(num) {
  if (num <= 1) {
    return num;
  } else {
    return fn(num - 1) + num;
  }
}

const sum = fn(2);
console.log(sum);