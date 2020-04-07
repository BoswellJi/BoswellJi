/**
 * 选择排序
 * @param {*} arr 
 */
function selectSort(arr) {
  if (!arr || !(arr instanceof Array)) {
    throw new TypeError('非数组类型');
  }
  let minIndex;

  for (let i = 0, len = arr.length; i < len; i++) {
    minIndex = i; for (let j = i + 1; j < len; j++) {
      if (arr[minIndex] >
        arr[j]) {
        minIndex = j;
      }
    }
    let temp = arr[minIndex];
    arr[minIndex] = arr[i];
    arr[i] = temp;
  }
  
  return arr;
}

console.log(selectSort([1, 2, 3, 2, 1, 2, 34, 1]));