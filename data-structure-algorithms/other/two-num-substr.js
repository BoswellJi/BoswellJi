function twoNumSubstr(str1, str2) {
  let max = 0;
  let index = 0;
  let str1Arr = new Array(str1.length + 1);

  for (let i = 0, len = str1.length; i < len; i++) {
    str1Arr[i] = new Array(str2.length + 1);
    for (let j = 0, lenj = str2.length; j < lenj; j++) {
      str1Arr[i][j] = 0;
    }
  }

  for (let i = 0, len = str1.length; i < len; i++) {
    for (let j = 0, lenj = str2.length; j < lenj; j++) {
      if (i === 0 || j === 0) {
        str1Arr[i][j] = 0;
      } else {
        if (str1[i - 1] === str2[j - 1]) {
          str1Arr[i][j] = str1Arr[i - 1][j - 1] + 1;
        } else {
          str1Arr[i][j] = 0;
        }
      }
      if (max < str1Arr[i][j]) {
        max = str1Arr[i][j];
        index = i;
      }
    }
  }
  let str = '';
  if (max === 0) {
    return '';
  } else {
    for (let i = index - max; i <= max; i++) {
      str += str2[i];
    }
    return str;
  }
}

console.log(twoNumSubstr('abcda', 'abcad'));