// https://leetcode-cn.com/problems/plus-one/

var plusOne = function (digits) {
  const len = digits.length;

  for (let i= len-1; i >= 0; i--) {
    digits[i]++;
    digits[i] = digits[i] % 10;

    if (digits[i] !== 0) {
      return digits;
    }

    if(i===0 && digits[i]===0){
      digits[i] = 0;
      digits.unshift(1);
    }
  }
 
  return digits;
};

const arr = plusOne([9, 9, 9]);
console.log(arr);