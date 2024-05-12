function maxNum(arr) {
  let max = arr[0];
  for (let i = 1, len = arr.length; i < len; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

console.log(maxNum([1, 2, 3, 4, 3, 1, 3, 5, 7]));