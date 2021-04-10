/**
 * 二分搜索的前提：有序的数组；
 * @param {*} arr 
 * @param {*} target 
 * @returns 
 */

function searchNumber(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    // 计算中间位置
    let mid = left + (right - left) / 2;

    if (arr[mid] == target) {
      return mid;
    } else if (arr[mid] < target) {
      // 
      left = mid + 1;
    } else if (arr[mid] > target) {
      // 
      right = mid - 1;
    }
  }
  
  return -1;
}

/**
 * 问题：有N堆香蕉，每小时可以吃K个，H小时可以吃完, 问最少吃多少个可以在指定的H小时内吃完？如果一堆香蕉小于K个，他会吃掉所有，并且在这个小时内不会再吃香蕉；
 */

const index = searchNumber([1, 2, 3, 4, 5, 6, 7], 3);

console.log(index);