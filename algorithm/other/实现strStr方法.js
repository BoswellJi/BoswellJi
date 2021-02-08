var strStr = function (haystack, needle) {
  if (!needle) return 0;
  let lenSecond = needle.length;
  let index1 = 0;

  for (let i = 0, len = haystack.length; i < len;) {
    if (haystack[i] == needle[index1]) {
      index1++;
      i++;

      if (lenSecond == index1) {
        return i - index1;
      }
    } else {
      i = i - index1 + 1 ;
      index1 = 0;
    }
  }
  return -1;
};

console.log(strStr('12671244', '1244'));
