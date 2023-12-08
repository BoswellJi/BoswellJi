var canThreePartsEqualSum = function (arr) {
  const sum = arr.reduce((a, b) => a + b, 0);
  const avg = sum / 3;

  let temp = 0;
  let num = 0;

  if (sum % 3 !== 0) return false;

  for (let i = 0; i < arr.length; i++) {
    temp += arr[i];

    if (temp === avg) {
      num++;

      // 已经存在两个就算成立
      if (num === 2 && i !== arr.length - 1) {
        return true;
      } else {
        temp = 0;
      }
    }
  }

  return false;
}

const flag = canThreePartsEqualSum([0,0,0,0]);

console.log(flag);