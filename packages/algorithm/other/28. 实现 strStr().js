// https://leetcode-cn.com/problems/implement-strstr/

function strStr(s1, s2) {
  if (!s2) return 0;

  let i2 = 0;
  let i1 = 0

  for (; i1 < s1.length; ) {
    if (s1[i1] === s2[i2]) {
      i2++;
      i1++;
      if (i2 === s2.length) {
        return i1 - i2;
      }
    } else {
      i1 = i1-i2+1;
      i2 = 0;
    }
  }

  return -1;
}

const flag = strStr("mississippi", 'issip');
console.log(flag);