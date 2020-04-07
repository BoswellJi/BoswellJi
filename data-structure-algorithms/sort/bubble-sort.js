
/**
 * 冒泡排序：
 * 比较 len-1次
 * 每次都会把最大的放最后
 * @param {} arr
 */
function bubbleSort(arr) {
    for (let i = 0, len = arr.length; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

console.log(bubbleSort([1, 2, 3, 1, 1, 34]));
