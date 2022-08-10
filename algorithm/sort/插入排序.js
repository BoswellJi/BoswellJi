/**
 * 插入排序
 * 思路: 将未进行排序的元素与排序过的数据进行比较（从后往前
 */

function insertSort(arr) {
  let temp = 0;
  let inner = 0;

  for (let i = 1, len = arr.length; i < len; i++) {
    // 当前对比数
    temp = arr[i];
    inner = i;
    // 从排好的里面与新的进行对比，前面的大于后面的就把大的换过去, 两两对比
    while (i > 0 && arr[inner - 1] > temp) {
      arr[inner] = arr[inner - 1];
      --inner;
    }
    arr[inner] = temp;
  }
  return arr;
}

console.log(insertSort([1,2,4,2,9,2]));