function binary(arr, target) {
  let c = center(arr.length );
  while (target !== arr[c]) {
    if (target > arr[c]) {
      c = c + center(c);
    } else {
      c = c - center(c);
    }
  }
  return c;
}

function center(num) {
  return Math.floor(num / 2);
}

console.log(binary([1, 2, 3, 4, 5, 6, 7, 8], 8));