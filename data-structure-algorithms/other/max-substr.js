var lengthOfLongestSubstring = function (s) {
  let longSubstring = "";
  let len = 0;
  let substring = "";
  let sLen = s.length;
  let i;
  for (i = 0; i < sLen; i++) {
    // 当前子串中没有此字符
    if (!substring.includes(s.charAt(i))) {
      // 加到子串中
      substring += s.charAt(i);
    } else {
      // 如果有，查看子串长度是否大于之前子串长度
      if (len < substring.length) {
        // 将当前子串给到最长串
        longSubstring = substring;
        // 以及长度
        len = longSubstring.length;
        // 重新开始新子串
        substring = s.charAt(i);
      }
    }
  }
  if (substring.length > longSubstring.length) {
    longSubstring = substring;
    len = longSubstring.length;
  }
  return len;
};
lengthOfLongestSubstring("dvdf");