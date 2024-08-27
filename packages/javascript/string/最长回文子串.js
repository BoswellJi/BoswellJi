function longestPalindrome(s) {
  if (s.length === 0) return ''

  let start = 0
  let end = 0

  for (let i = 0; i < s.length; i++) {
    const len1 = expandAroundCenter(s, i, i) // 奇数长度回文
    const len2 = expandAroundCenter(s, i, i + 1) // 偶数长度回文
    const len = Math.max(len1, len2)

    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2)
      end = i + Math.floor(len / 2)
    }
  }

  return s.substring(start, end + 1)
}

function expandAroundCenter(s, left, right) {
  while (left >= 0 && right < s.length && s[left] === s[right]) {
    left--
    right++
  }
  return right - left - 1
}

// 示例
const s1 = 'babad'
console.log(longestPalindrome(s1)) // 输出 "bab" 或 "aba"

const s2 = 'cbbd'
console.log(longestPalindrome(s2)) // 输出 "bb"

const s3 = 'a'
console.log(longestPalindrome(s3)) // 输出 "a"

const s4 = 'ac'
console.log(longestPalindrome(s4)) // 输出 "a" 或 "c"
