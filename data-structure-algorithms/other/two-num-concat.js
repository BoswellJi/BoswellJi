function twoNumConcat(num1, num2) {
  if (!(num1 instanceof Array)) {
    num1 = []
  }

  if (!(num2 instanceof Array)) {
    num2 = []
  }

  return num1.concat(num2).filter(item => item).sort((a, b) => a - b);
}

console.log(twoNumConcat([1, 2, 3, 0, 0, 0], [0, 2, 2, 4, 5]));