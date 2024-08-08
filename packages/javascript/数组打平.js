const arrFlat = arr => {
  const result = []

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (Array.isArray(item)) {
      result.push(...arrFlat(item))
    } else {
      result.push(item)
    }
  }
  return result
}

console.log(arrFlat([1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]))
