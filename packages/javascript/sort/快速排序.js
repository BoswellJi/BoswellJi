function sort(arr) {
  if (arr.length === 0) {
    return []
  }
  if (arr.length === 1) {
    return arr
  }

  const num = arr[0]
  const left = []
  const right = []

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] >= num) {
      right.push(arr[i])
    } else {
      left.push(arr[i])
    }
  }

  return sort(left).concat(num).concat(sort(right))
}

console.log(sort([1, 5, 2, 3, 1]))
