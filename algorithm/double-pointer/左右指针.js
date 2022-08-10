/**
 * 两数之和问题
 * @param {*} arr 
 * @param {*} target 
 * @returns 
 */
function twoSum(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    let sum = arr[left] + arr[right];

    if (sum == target) {
      return [left, right];
    } else if (sum < target) {
      left += 1;
    } else if (sum > target) {
      right -= 1;
    }
  }
  return -1;
}

/**
 * 穷举法
 * @param {*} arr 
 * @param {*} target 
 * @returns 
 */
function twoSum(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
}

/**
 * hashtable方式
 * @param {*} arr 
 * @param {*} target 
 */
function twoSum(arr, target) {
  const map = {};

  for (let i = 0; i < arr.length; i++) {
    map[arr[i]] = i;
  }

  for (let i = 0; i < arr.length; i++) {
    const diffVal = target - arr[i];

    if (map[diffVal] && map[diffVal] != i) {
      return [i, map[diffVal]];
    }
  }

  return [-1,-1];
}

const indexs = twoSum([1, 2, 3, 3, 2], 6);
console.log(indexs);


/**
 * 数组反转问题
 * @param {*} arr 
 * @returns 
 */
function reverse(arr) {
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;

    right--;
    left++;
  }

  return arr;
}

const result = reverse([1, 2, 3, 4, 5, 6]);
console.log(result);