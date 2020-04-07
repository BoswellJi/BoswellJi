/**
 * 快速排序
 * max 基准值
 * 边界： 少于2位数组，就不用排序
 * 分治： 大于基准值，小于基准值
 * 递归： 
 * @param {*} arr 
 */

function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const less = [],
    great = [],
    max = arr[0];

  for (let i = 1, len = arr.length; i < len; i++) {
    if (arr[i] > max) {
      great.push(arr[i]);
    } else {
      less.push(arr[i]);
    }
  }

  return quickSort(less).concat([max],quickSort(great));
}

console.log(quickSort([1, 2, 3, 4, 5, 1, 2,1,3,4,5,6,7]));