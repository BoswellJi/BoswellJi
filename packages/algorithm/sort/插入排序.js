/**
 * 插入排序
 * 思路: 将未进行排序的元素与排序过的数据进行比较（从后往前
 */

function insertionSort(arr) {
  // 从第二个元素开始，因为第一个元素可以认为已排序
  for (let i = 1; i < arr.length; i++) {
    // 保存当前元素的值
    let current = arr[i]

    // 设置已排序部分的最后一个元素的索引
    let j = i - 1

    // 从后向前扫描已排序的部分
    while (j >= 0 && arr[j] > current) {
      // 如果已排序的元素大于当前元素，将该元素移到下一个位置
      arr[j + 1] = arr[j]
      j--
    }

    // 将当前元素插入到合适的位置
    arr[j + 1] = current
  }

  return arr
}

// 示例
const array = [5, 2, 9, 1, 5, 6]
console.log('排序前:', array)
const sortedArray = insertionSort(array)
console.log('排序后:', sortedArray)
