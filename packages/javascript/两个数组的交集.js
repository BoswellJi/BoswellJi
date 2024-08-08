function intersection(arr1, arr2) {
  const set2 = new Set(arr2)
  return arr1.filter(item => set2.has(item))
}

// 示例
const array1 = [1, 2, 2, 4]
const array2 = [2, 3, 4]
console.log(intersection(array1, array2)) // 输出: [2, 4]

function union(arr1, arr2) {
  return [...new Set([...arr1, ...arr2])]
}

// 示例
const array3 = [1, 2, 2, 4]
const array4 = [2, 3, 4]
console.log(union(array3, array4)) // 输出: [1, 2, 4, 3]
