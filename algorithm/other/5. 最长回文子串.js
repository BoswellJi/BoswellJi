/**
 * 回文： abba  aba
 */

/**
 * 找到中间值
 * @param {*} s 
 * @param {*} l 
 * @param {*} r 
 * @returns 
 */
function palindrome(s, l, r) {
  while (l >= 0 && r < s.length && s[l] == s[r]) {
    l--;
    r++;
  }
  return s.substr(l + 1, r - l - 1);
}
/**
 * 暴力枚举
 * @param {*} s 
 * @returns 
 */
function longestPalindrome(s) {
  let res = '';
  let n = s.length;
  for (let i = 0; i < n; i++) {
    // 这里表示回文子串长度为奇数/偶数
    let s1 = palindrome(s, i, i);
    let s2 = palindrome(s, i, i+1);
    res = res.length > s1.length ? res : s1;
    res = res.length > s2.length ? res : s2;
  }
  return res;
}

console.time();
const result = longestPalindrome('abssba');
console.log(result);
console.timeEnd();
/**
 * 动态规划
 * @param {*} s 
 * @returns 
 */
function longestPalindrome(s)  {
  if(!s || s.length < 2){
      return s;
  }
  var s_f = s.split('').reverse().join('');
  var resultStr = s[0];
  var maxLen = 1;
  var tmpLen = 1;
  var maxStrIndex = 0;
  var len = s.length;
  //判断字符串是否回文
  function isPalinerome(i,r){
      if(len - i - 1 == r -tmpLen + 1){
          return true
      }
      return false;
  }
  //初始化二维数组
  var len = s.length;
  var arr = new Array(len);
  for(var i = 0;i<len;i++){
      arr[i] = [];
      for(var r = 0;r<len;r++){
          arr[i][r] = 0
      }
  }
  for(var i = 0;i<len;i++){
      for(var r=0;r<len;r++){
          if(s[i] == s_f[r]){
              if(i==0 || r==0){
                  arr[i][r] = 1
              }else{
                  arr[i][r] = arr[i-1][r-1] + 1
                  tmpLen = arr[i][r]
              }
              if(tmpLen > maxLen && isPalinerome(i,r)){
                  maxStrIndex = r;
                  maxLen = tmpLen;
                  resultStr =  s.substring(i-tmpLen+1,i+1);
              }
          }
      }
  }
  return resultStr;
}

console.time();
const result1 = longestPalindrome('abssba');
console.log(result1);
console.timeEnd();