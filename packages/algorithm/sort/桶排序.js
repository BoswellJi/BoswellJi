/**
 * 桶排序：创建最大数值的数组，将对应的数值放到对应的位置作为标识
 * 
 * O(M+N)
 * @param {*} arr 
 */

function sort(arr) {
  const len = arr.length;
  const arrTemp = [];
  const arrResult = [];

  for (let i = 0; i < len; i++) {
    if (arrTemp[arr[i]]) {
      arrTemp[arr[i]]++
    } else {
      arrTemp[arr[i]] = 1;
    }
  }

  for (let i = arrTemp.length; i > 0; i--) {
    if (arrTemp[i]) {
      for (let j = 0; j < arrTemp[i]; j++) {
        arrResult.push(i);
      }
    }
  }

  console.log(arrResult);
}

sort([1, 2, 3, 4,4,4,1,2]);