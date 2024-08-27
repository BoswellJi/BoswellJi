function isValid(s) {
  const stack = []
  const map = {
    '(': ')',
    '[': ']',
    '{': '}'
  }

  for (let char of s) {
    if (char in map) {
      // 是开括号，入栈
      stack.push(char)
    } else {
      // 是闭括号，检查栈顶
      const top = stack.pop()
      if (map[top] !== char) {
        return false
      }
    }
  }

  // 栈为空则括号匹配，否则不匹配
  return stack.length === 0
}

// 示例
console.log(isValid('()')) // 输出: true
console.log(isValid('()[]{}')) // 输出: true
console.log(isValid('(]')) // 输出: false
console.log(isValid('([)]')) // 输出: false
console.log(isValid('{[]}')) // 输出: true
