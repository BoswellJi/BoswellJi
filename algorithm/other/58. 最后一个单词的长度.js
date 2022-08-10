// https://leetcode-cn.com/problems/length-of-last-word/

var lengthOfLastWord = function(s) {
  s = s.trim();
  if(!s)return 0;
  const arr = s.split(/\s+/g);
  return arr[arr.length-1].length;
};

const len = lengthOfLastWord('a ');
console.log(len);