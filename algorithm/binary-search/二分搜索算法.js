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

const index = searchNumber([1, 2, 3, 4, 5, 6, 7], 3);

console.log(index);