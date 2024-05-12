function sameElement(arr1, arr2) {
  const map = new Map();
  const sameEl = [];

  for (let i = 0; i < arr1.length; i++) {
    map.set(arr1[i], arr1[i]);
  }

  for (let i = 0; i < arr2.length; i++) {
    if (map.has(arr2[i])) {
      sameEl.push(arr2[i]);
    }
  }

  return sameEl;
}

/**
 * 排序后的数组
 * @param {*} arr1 
 * @param {*} arr2 
 */
function  sameElement(arr1, arr2) {
  const sameEl = [];

  

  return sameEl;
}

console.log(sameElement([1, 2, 3], [1, 2, 4, 5, 6, 3]));