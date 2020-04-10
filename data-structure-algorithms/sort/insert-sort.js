/**
 * 插入排序
 */

function insertSort(arr) {
  let temp = 0;
  let inner = 0;

  for (let i = 1, len = arr.length; i < len; i++) {
    temp = arr[i];
    inner = i;
    // 从排好的里面与新的进行对比
    while (i > 0 && arr[inner - 1] > temp) {
      arr[inner] = arr[inner - 1];
      --inner;
    }
    arr[inner] = temp;
  }
  return arr;
}

console.log(insertSort([1,2,4,2,9,2]));