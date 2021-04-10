
/**
 * 简单排序
 * 比较len-1次
 * 找到最小值
 * 跟第一位交换
 */
function simpleSort(arr) {
    var min;
    for (var i = 0, len = arr.length; i < len - 1; i++) {
        min = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[min] > arr[j]) {
                min = j;
            }
        }
        if (min !== i) {
            var temp = arr[min];
            arr[min] = arr[i];
            arr[i] = temp;
        }
    }
    return arr;
}

console.log(simpleSort([3, 4, 2, 1, 3, 4, 56]));
