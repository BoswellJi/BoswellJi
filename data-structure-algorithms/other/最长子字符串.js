var lengthOfLongestSubstring = function (s) {
  // 最长子字符串
  let longSubstring = "";
  // 最长子字符串的长度
  let len = 0;
  let substring = "";
  let sLen = s.length;
  let i;
  for (i = 0; i < sLen; i++) {
    if (!substring.includes(s.charAt(i))) {
      substring += s.charAt(i);
    } else {
      if (len < substring.length) {
        longSubstring = substring;
        len = longSubstring.length;
        substring = s.charAt(i);
      }
    }
  }
  if (substring.length > longSubstring.length) {
    longSubstring = substring;
    len = longSubstring.length;
  }
  console.log(longSubstring,len);
  return len;
};


function lengthOfLongestSubstring(s) {
  const map = {};
  let left = 0;
  
  return s.split('').reduce((max, v, i) => {
      left = map[v] >= left ? map[v] + 1 : left;
      map[v] = i;
      return Math.max(max, i - left + 1);
  }, 0);
}

lengthOfLongestSubstring("dvdf");