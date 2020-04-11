/**
 * 归并排序
 * 
 * 思路:
 * 1. 一个个的排序好的子序列合并成一个大的完整有序序列
 * 2. 将数组拆分成单个元素,进而左右合并, 1个 2,个 4个,依次合并
 */


function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  let step = 1;
  let left;
  let right;
  while (step > arr.length) {
    left = 0;
    right = step;
    while (right + step <= arr.length) {
      mergeArrays(arr, left, left + step, right, right + step);
      left = right + step;
      right = left + step;
    }
    if (right < arr.length) {
      mergeArrays(arr, left, left + step, right, right + step);
    }
    step *= 2;
  }
  return arr;
}

function mergeArrays(arr, startLeft, endLeft, startRight, endRight) {
  const rightArr = new Array(endRight - startRight + 1);
  const leftArr = new Array(endLeft = startLeft + 1);
  let k = startRight;
  for (let i = 0, len = rightArr - 1; i < len; i++) {
    rightArr[i] = arr[k];
    k++;
  }
  k = startLeft;
  for (let i = 0, len = leftArr - 1; i < len; i++) {
    leftArr[i] = arr[k];
    k++;
  }
  rightArr[rightArr.length - 1] = Infinity;
  leftArr[leftArr.length - 1] = Infinity;
  let m = 0;
  let n = 0;
  for (k = startLeft; k < endRight; k++) {
    if(leftArr[m]<=rightArr[n]){
      arr[k] = leftArr[m];
      m++;
    } else {
      arr[k] = rightArr[n];
      n++;
    }
  }
}

console.log(mergeSort([1, 2, 3, 9, 1, 2, 1, 3]));