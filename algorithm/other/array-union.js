// O(n^2)

function arrayUnion(arr1, arr2) {
  let len1 = arr1.length,
    len2 = arr2.length,
    targetArr = [],
    n = 0;

  for (let j = 0; j < len2; j++) {
    for (let i = 0; i < len1; i++) {
      if (arr1[i] === arr2[j]) {
        targetArr[n] = arr1[i];
        n++;
        break;
      }
    }
  }

  return targetArr;
}

// O(n+m+m)
function arrayUnion(arr1, arr2) {
  const set1 = arr1.length > arr2.length ? new Set(arr1) : new Set(arr2);
  const set2 = arr1.length > arr2.length ? new Set(arr2) : new Set(arr1);
  const targetArr = [];

  for (let item of set2) {
    if (set1.has(item)) {
      targetArr.push(item);
    }
  }

  return targetArr;
}

console.log(arrayUnion([1, 2, 3, 1, 2], [1, 2, 3]));