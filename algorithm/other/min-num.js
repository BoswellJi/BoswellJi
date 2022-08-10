function minNum(arr) {
  let min = arr[0];
  for (let i = 1, len = arr.length; i < len; i++) {
    if (arr[i] < min) {
      min = arr[i];
    }
  }
  return min;
}

console.log(minNum([1, 2, 3, 4, 3, 1, 3, 5, 7]));