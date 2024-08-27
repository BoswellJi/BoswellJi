function max(arr) {
  if (!Array.isArray(arr)) {
    return 0
  }
  let depth = 0
  for (let item of arr) {
    const curDepth = max(item)
    if (curDepth > depth) {
      depth = curDepth
    }
  }
  return depth + 1
}

console.log(max([1, 3, 3, [4, 6, 7, [5, 6, 7, 43, [23, 4]]]]))
