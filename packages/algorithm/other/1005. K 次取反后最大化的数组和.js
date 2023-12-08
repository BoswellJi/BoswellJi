var largestSumAfterKNegations = function (A, K) {
  let sum = 0;
  A = A.sort((a, b) => a - b);

  const positivNumber = A.filter(item => item >= 0);
  const negativeNumber = A.filter(item => item < 0);
  const len = K - negativeNumber.length;

  if(negativeNumber.length>0){
    new Array(K).fill('').forEach((item, index) => {
      if (negativeNumber[index]) {
        negativeNumber[index] = -1 * negativeNumber[index];
      }
    });
  }

  A = positivNumber.concat(negativeNumber);
  
  if (len > 0) {
    A = A.sort((a, b) => a - b);
    new Array(len).fill('').forEach(() => {
      A[0] = A[0] * -1;
    });
  }

  for (let i = 0; i < A.length; i++) {
    sum += A[i];
  }

  return sum;

};

console.log(largestSumAfterKNegations(
  [-2,5,0,2,-2],
  3
));