function permute(str) {
  const result = []

  function backtrack(path, used) {
    if (path.length === str.length) {
      result.push(path.join(''))
      return
    }

    for (let i = 0; i < str.length; i++) {
      if (used[i]) continue

      // 选择字符
      path.push(str[i])
      used[i] = true

      // 递归调用
      backtrack(path, used)

      // 回溯
      path.pop()
      used[i] = false
    }
  }

  backtrack([], Array(str.length).fill(false))
  return result
}

const inputString = 'abc'
const permutations = permute(inputString)
console.log(permutations)
