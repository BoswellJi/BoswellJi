function twoNumToSun(arr, num) {
  let i, j, len = arr.length, arrPair = [];
  for (i = 0; i < len; i++) {
    for (j = i + 1; j < len; j++) {
      if (arr[i] + arr[j] === num) {
        arrPair.push([arr[i], arr[j]]);
      }
    }
  }
  return arrPair;
}

function twoNumtoSun1(arr, num) {
  const temp = {};
  for (let i = 0, len = arr.length; i < len; i++) {
    const dif = num - arr[i];
    if (temp[arr[i]]) {
      return [temp[arr[i]], i];
    } else {
      temp[dif] = i;
    }
  }
}

console.log(twoNumtoSun1([1, 2, 1, 4], 6));