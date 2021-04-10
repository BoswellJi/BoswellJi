/**
 * 希尔排序
 * @param {array} arr 待排序数组
 * @param {array} gaps 排序间隔 ，当gps数组为[1]时，排序变为插入排序
 */
function shellSort(arr, gaps) {
  for (let g = 0, len = gaps.length; g < len; g++) {
    for (let i = gaps[g], aLen = arr.length; i < aLen; i++) {
      let temp = arr[i];
      let inner = i;

      while (inner >= gaps[g] && arr[inner - gaps[g]] > temp) {
        arr[inner] = arr[inner - gaps[g]];
        inner = inner - gaps[g];
      }

      arr[inner] = temp;
    }
  }
  return arr;
}

/**
 * 计算间隔序列
 * @param {*} arr 
 */
function shellSort1(arr) {
  const len = arr.length;
  let h = 1;

  while (len / 3 > h) {
    h = 3 * h + 1;
  }

  while (h >= 1) {

    for (let i = h; i < len; i++) {
      let j = i;

      for (; j >= h && arr[j - h] > arr[j]; ) {
        arr[j] = arr[j - h];
        j = j- h;
      }

      arr[j] = arr[i];
    }

    h = (h - 1) / 3;
  }

  return arr;
}

console.log(shellSort([1, 2, 3,8,4,6, 8, 3, 4, 5, 1], [1]));