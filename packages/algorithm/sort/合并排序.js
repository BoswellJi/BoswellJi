/**
 * 归并排序
 * 
 * 思路:
 * 1. 一个个的排序好的子序列合并成一个大的完整有序序列
 * 2. 将数组拆分成单个元素,进而左右合并, 1个 2,个 4个,依次合并
 */
function mergeSort(arr) {
  let a = arr;
  let b = [];
  let len = arr.length;
  let seg, start;

  for (seg = 1; seg < len; seg += seg) {
    for (start = 0; start < len; start += seg + seg) {
      let low = start;
      let mid = Math.min(start + seg, len);
      let high = Math.min(start + seg + seg, len);
      let k = low;
      let start1 = low;
      let end1 = mid;
      let start2 = mid;
      let end2 = high;

      while (start1 < end1 && start2 < end2) {
        b[k++] = a[start1] < a[start2] ? a[start1++] : a[start2++];
      }

      while (start1 < end1) {
        b[k++] = a[start1++];
      }

      while (start2 < end2) {
        b[k++] = a[start2++];
      }
    }

    let temp = a;
    a = b;
    b = temp;
  }

  if (a != arr) {
    for (i = 0; i < len; i++) {
      b[i] = a[i];
    }
    b = a;
  }
  return b;
}

console.log(mergeSort([1, 2, 3, 9, 1, 2, 1, 3]));