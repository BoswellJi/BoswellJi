/**
 * 求两个数的最大公约数
 * @param {*} maxNum 
 * @param {*} minNum 
 */
function fn(maxNum, minNum) {
  const modNum = maxNum % minNum;

  if (modNum == 0) {
    return minNum;
  } else {
    return fn(minNum, modNum);
  }
}

const num = fn(100, 70);

console.log(num);