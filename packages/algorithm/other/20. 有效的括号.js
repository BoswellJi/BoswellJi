// https://leetcode-cn.com/problems/valid-parentheses/

function isValid(s) {
  if (s.length % 2 === 1) {
    return false;
  }

  const pairs = {
    ")": "(",
    "]": "[",
    "}": "{",
  };
  const arr = [];

  for (let key of s) {
    if (pairs[key]) {
      if (!arr.length || arr[arr.length - 1] != pairs[key]) {
        return false;
      }
      arr.pop();
    } else {
      arr.push(key);
    }
  }
  return !arr.length;
}

const flag = isValid("()");
console.log(flag);
