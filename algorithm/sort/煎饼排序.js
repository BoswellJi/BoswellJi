/**
 * 反转arr的前K个元素，多少次可以排序成功
 */

const res = new Set();

function pancakeSort(arr) {
  pancake(arr, arr.length);
  return res;
}

/**
 * 反转数组
 * @param {*} arr 
 * @param {*} i 
 * @param {*} j 
 */
function reverse(arr, i, j) {
  while (i < j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    i++;
    j--;
  }
  return arr;
}

function pancake(arr, n) {
  if (n == 1) return;

  let maxCake = 0;
  let maxCakeIndex = 0;

  for (let i = 0; i < n; i++) {
    if (arr[i] > maxCake) {
      maxCakeIndex = i;
      maxCake = arr[i];
    }
  }

  // 从最大值开始反转
  reverse(arr, 0, maxCakeIndex);
  res.add(maxCakeIndex + 1);

  reverse(arr, 0, n - 1);
  res.add(n);

  pancake(arr, n - 1);
}

const sortArr = pancakeSort([3,2,4,1]);
console.log(sortArr);